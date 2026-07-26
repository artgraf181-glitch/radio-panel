"""Short-request HLS audio transport for Radio Panel on iOS."""

from __future__ import annotations

from collections import deque
from dataclasses import dataclass, field
from pathlib import Path
from functools import partial
from time import monotonic
from typing import TYPE_CHECKING, Any

import asyncio
import logging
import re
import secrets
import shutil
import tempfile

from aiohttp import web

from homeassistant.components.ffmpeg import get_ffmpeg_manager
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

if TYPE_CHECKING:
    from . import RadioPanelManager

_LOGGER = logging.getLogger(__name__)

HLS_URL = "/api/radio_panel/hls/{token}/{filename}"
HLS_IDLE_TIMEOUT = 90.0
HLS_START_TIMEOUT = 18.0
HLS_MAX_SESSIONS = 6
_SEGMENT_RE = re.compile(r"segment_[0-9]+\.ts\Z")


def _playlist_ready(path: Path) -> bool:
    try:
        return path.is_file() and path.stat().st_size > 40
    except OSError:
        return False


def _regular_file_size(path: Path) -> int | None:
    try:
        if not path.is_file():
            return None
        return path.stat().st_size
    except OSError:
        return None


@dataclass(slots=True)
class RadioHlsSession:
    """One temporary audio-only HLS session."""

    token: str
    station_uuid: str
    station_name: str
    stream_url: str
    directory: Path
    playlist_path: Path
    segment_pattern: Path
    created_at: float = field(default_factory=monotonic)
    last_access: float = field(default_factory=monotonic)
    process: asyncio.subprocess.Process | None = None
    worker_task: asyncio.Task[None] | None = None
    stopping: bool = False
    restarts: int = 0
    playlist_requests: int = 0
    segment_requests: int = 0
    bytes_served: int = 0
    stderr_lines: deque[str] = field(default_factory=lambda: deque(maxlen=30))


class RadioHlsManager:
    """Create and serve temporary HLS sessions backed by FFmpeg."""

    def __init__(self, hass: HomeAssistant, manager: RadioPanelManager) -> None:
        self.hass = hass
        self.manager = manager
        self.sessions: dict[str, RadioHlsSession] = {}
        self._cleanup_task: asyncio.Task[None] | None = None
        self._stopping = False
        self._ffmpeg_binary = get_ffmpeg_manager(hass).binary

    async def async_start(self) -> None:
        """Start periodic cleanup."""
        if self._cleanup_task is None:
            self._cleanup_task = self.hass.async_create_task(
                self._cleanup_loop(), "radio_panel_hls_cleanup"
            )

    async def async_shutdown(self) -> None:
        """Stop every encoder and remove temporary files."""
        self._stopping = True
        if self._cleanup_task:
            self._cleanup_task.cancel()
            try:
                await self._cleanup_task
            except asyncio.CancelledError:
                pass
            self._cleanup_task = None
        await asyncio.gather(
            *(self.async_stop(token, reason="home_assistant_stop") for token in list(self.sessions)),
            return_exceptions=True,
        )

    async def async_prepare(self, station: dict[str, Any]) -> dict[str, str]:
        """Start an HLS encoder and wait until its first playlist is ready."""
        cleaned = self.manager.remember_station(station)
        station_uuid = cleaned.get("stationuuid", "")
        stream_url = str(cleaned.get("url_resolved") or cleaned.get("url") or "")
        if not station_uuid or not stream_url.startswith(("http://", "https://")):
            raise RuntimeError("Stacja nie ma prawidłowego adresu strumienia.")

        await self._make_room()
        token = secrets.token_urlsafe(32)
        directory = Path(
            await self.hass.async_add_executor_job(
                partial(tempfile.mkdtemp, prefix="radio_panel_hls_")
            )
        )
        session = RadioHlsSession(
            token=token,
            station_uuid=station_uuid,
            station_name=str(cleaned.get("name") or "Nieznana stacja"),
            stream_url=stream_url,
            directory=directory,
            playlist_path=directory / "playlist.m3u8",
            segment_pattern=directory / "segment_%010d.ts",
        )
        self.sessions[token] = session
        session.worker_task = self.hass.async_create_task(
            self._session_worker(session), f"radio_panel_hls_{token[:8]}"
        )
        self.manager.stream_opened(station_uuid)
        self.manager.add_diagnostic(
            "backend",
            "hls_session_starting",
            {
                "station_uuid": station_uuid,
                "station_name": session.station_name,
                "token": token[:10],
                "ffmpeg_binary": Path(self._ffmpeg_binary).name,
            },
        )

        # Return immediately so the frontend can call HTMLMediaElement.play()
        # while iOS still associates it with the user's tap. The first playlist
        # request waits briefly for FFmpeg to write its initial segment.
        return {
            "token": token,
            "url": f"/api/radio_panel/hls/{token}/playlist.m3u8",
            "mode": "hls",
        }

    async def async_stop(self, token: str, reason: str = "requested") -> None:
        """Stop and forget one HLS session."""
        session = self.sessions.pop(token, None)
        if session is None:
            return
        session.stopping = True
        process = session.process
        if process and process.returncode is None:
            process.terminate()
            try:
                await asyncio.wait_for(process.wait(), timeout=4)
            except TimeoutError:
                process.kill()
                try:
                    await asyncio.wait_for(process.wait(), timeout=2)
                except TimeoutError:
                    pass
        task = session.worker_task
        if task and task is not asyncio.current_task() and not task.done():
            try:
                await asyncio.wait_for(task, timeout=5)
            except TimeoutError:
                task.cancel()
            except asyncio.CancelledError:
                pass
        self.manager.stream_closed(session.station_uuid)
        self.manager.add_diagnostic(
            "backend",
            "hls_session_stopped",
            {
                "station_uuid": session.station_uuid,
                "station_name": session.station_name,
                "token": token[:10],
                "reason": reason,
                "duration_seconds": round(monotonic() - session.created_at, 2),
                "restarts": session.restarts,
                "playlist_requests": session.playlist_requests,
                "segment_requests": session.segment_requests,
                "bytes_served": session.bytes_served,
            },
        )
        await self.hass.async_add_executor_job(shutil.rmtree, session.directory, True)

    def get_session(self, token: str) -> RadioHlsSession | None:
        """Return and touch a valid session."""
        session = self.sessions.get(token)
        if session is not None and not session.stopping:
            session.last_access = monotonic()
            return session
        return None

    async def _make_room(self) -> None:
        if len(self.sessions) < HLS_MAX_SESSIONS:
            return
        oldest = min(self.sessions.values(), key=lambda item: item.last_access)
        await self.async_stop(oldest.token, reason="session_limit")

    async def _cleanup_loop(self) -> None:
        try:
            while not self._stopping:
                await asyncio.sleep(20)
                now = monotonic()
                expired = [
                    session.token
                    for session in self.sessions.values()
                    if now - session.last_access > HLS_IDLE_TIMEOUT
                ]
                for token in expired:
                    await self.async_stop(token, reason="idle_timeout")
        except asyncio.CancelledError:
            raise

    def _command(self, session: RadioHlsSession) -> list[str]:
        """Build an audio-only HLS command using short MPEG-TS segments."""
        return [
            self._ffmpeg_binary,
            "-hide_banner",
            "-loglevel",
            "warning",
            "-nostdin",
            "-reconnect",
            "1",
            "-reconnect_streamed",
            "1",
            "-reconnect_at_eof",
            "1",
            "-reconnect_delay_max",
            "5",
            "-headers",
            "Icy-MetaData: 0\r\nCache-Control: no-cache\r\n",
            "-i",
            session.stream_url,
            "-map",
            "0:a:0",
            "-vn",
            "-c:a",
            "aac",
            "-profile:a",
            "aac_low",
            "-ar",
            "44100",
            "-ac",
            "2",
            "-b:a",
            "128k",
            "-max_muxing_queue_size",
            "1024",
            "-f",
            "hls",
            "-hls_time",
            "4",
            "-hls_list_size",
            "12",
            "-hls_delete_threshold",
            "6",
            "-hls_start_number_source",
            "epoch",
            "-hls_flags",
            "delete_segments+append_list+omit_endlist+program_date_time+temp_file+discont_start",
            "-hls_segment_filename",
            str(session.segment_pattern),
            str(session.playlist_path),
        ]

    async def _session_worker(self, session: RadioHlsSession) -> None:
        """Keep the encoder alive while the native player requests segments."""
        restart_delay = 0.5
        while not session.stopping and not self._stopping:
            try:
                process = await asyncio.create_subprocess_exec(
                    *self._command(session),
                    stdout=asyncio.subprocess.DEVNULL,
                    stderr=asyncio.subprocess.PIPE,
                )
            except (OSError, RuntimeError) as err:
                session.stderr_lines.append(f"start: {type(err).__name__}: {err}")
                self.manager.add_diagnostic(
                    "backend",
                    "hls_ffmpeg_start_failed",
                    {
                        "station_uuid": session.station_uuid,
                        "token": session.token[:10],
                        "error_type": type(err).__name__,
                        "error": str(err),
                    },
                )
                return

            session.process = process
            stderr_task = self.hass.async_create_task(
                self._read_stderr(session, process),
                f"radio_panel_hls_stderr_{session.token[:8]}",
            )
            return_code = await process.wait()
            try:
                await asyncio.wait_for(stderr_task, timeout=1)
            except TimeoutError:
                stderr_task.cancel()
            session.process = None

            if session.stopping or self._stopping:
                return

            self.manager.add_diagnostic(
                "backend",
                "hls_ffmpeg_exited",
                {
                    "station_uuid": session.station_uuid,
                    "token": session.token[:10],
                    "return_code": return_code,
                    "restart_number": session.restarts + 1,
                    "stderr": " | ".join(session.stderr_lines)[-900:],
                },
            )
            # If the player is still polling, restart the encoder behind the same
            # HLS URL. The epoch sequence number prevents segment-name collisions.
            if monotonic() - session.last_access > HLS_IDLE_TIMEOUT:
                return
            session.restarts += 1
            await asyncio.sleep(restart_delay)
            restart_delay = min(restart_delay * 2, 8)

    async def _read_stderr(
        self, session: RadioHlsSession, process: asyncio.subprocess.Process
    ) -> None:
        if process.stderr is None:
            return
        while True:
            line = await process.stderr.readline()
            if not line:
                return
            text = line.decode("utf-8", errors="replace").strip()
            if text:
                session.stderr_lines.append(text[:500])


class RadioHlsView(HomeAssistantView):
    """Serve an expiring HLS playlist and its short media segments."""

    url = HLS_URL
    name = "api:radio_panel:hls"
    # The random 256-bit token in the path is the temporary authorization.
    # Native HLS segment requests cannot use Home Assistant WebSocket authSig.
    requires_auth = False

    def __init__(self, hls_manager: RadioHlsManager) -> None:
        self.hls_manager = hls_manager

    async def get(
        self, request: web.Request, token: str, filename: str
    ) -> web.StreamResponse:
        session = self.hls_manager.get_session(token)
        if session is None:
            raise web.HTTPGone(text="Sesja HLS wygasła.")

        if filename == "playlist.m3u8":
            path = session.playlist_path
            session.playlist_requests += 1
            deadline = monotonic() + HLS_START_TIMEOUT
            body = ""
            while monotonic() < deadline:
                try:
                    body = await self.hls_manager.hass.async_add_executor_job(
                        path.read_text, "utf-8"
                    )
                except FileNotFoundError:
                    body = ""
                except OSError as err:
                    raise web.HTTPServiceUnavailable(
                        text="Nie udało się odczytać listy HLS."
                    ) from err
                if body.strip().startswith("#EXTM3U") and "#EXTINF" in body:
                    break
                if session.worker_task and session.worker_task.done():
                    break
                await asyncio.sleep(0.2)
            if not body.strip().startswith("#EXTM3U") or "#EXTINF" not in body:
                details = " | ".join(session.stderr_lines)[-700:]
                self.hls_manager.manager.add_diagnostic(
                    "backend",
                    "hls_playlist_not_ready",
                    {
                        "station_uuid": session.station_uuid,
                        "token": token[:10],
                        "stderr": details,
                    },
                )
                raise web.HTTPServiceUnavailable(
                    text="Lista HLS nie została przygotowana przez FFmpeg.",
                    headers={"Retry-After": "1"},
                )
            if session.playlist_requests in {1, 2} or session.playlist_requests % 25 == 0:
                self.hls_manager.manager.add_diagnostic(
                    "backend",
                    "hls_playlist_served",
                    {
                        "station_uuid": session.station_uuid,
                        "token": token[:10],
                        "request_number": session.playlist_requests,
                        "segment_requests": session.segment_requests,
                    },
                )
            return web.Response(
                text=body,
                content_type="application/vnd.apple.mpegurl",
                charset="utf-8",
                headers={
                    "Cache-Control": "no-store, no-cache, must-revalidate",
                    "Pragma": "no-cache",
                    "Access-Control-Allow-Origin": "*",
                },
            )

        if not _SEGMENT_RE.fullmatch(filename):
            raise web.HTTPNotFound()
        path = session.directory / filename
        size = await self.hls_manager.hass.async_add_executor_job(
            _regular_file_size, path
        )
        if size is None:
            raise web.HTTPNotFound()
        session.segment_requests += 1
        session.bytes_served += size
        response = web.FileResponse(
            path,
            headers={
                "Cache-Control": "public, max-age=120, immutable",
                "Access-Control-Allow-Origin": "*",
                "Accept-Ranges": "bytes",
            },
        )
        response.content_type = "video/mp2t"
        return response
