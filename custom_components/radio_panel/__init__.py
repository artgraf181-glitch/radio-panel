"""Radio Browser panel with shared favorites for Home Assistant."""

from __future__ import annotations

from collections import deque
from copy import deepcopy
from datetime import UTC, datetime
from pathlib import Path
from time import monotonic
from typing import Any
from urllib.parse import quote, urlsplit

import asyncio
import logging
import re

from aiohttp import ClientError, ClientResponseError, ClientTimeout, web
import voluptuous as vol

from homeassistant.components import panel_custom, websocket_api
from homeassistant.components.http import HomeAssistantView, StaticPathConfig
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.const import CONF_NAME, EVENT_HOMEASSISTANT_STOP
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.storage import Store

from .hls import RadioHlsManager, RadioHlsView

from .const import (
    API_BASE_URL,
    DEFAULT_AUTO_FAVORITE_MINUTES,
    DEFAULT_AUTO_FAVORITE_PLAYS,
    DEFAULT_SEARCH_LIMIT,
    DOMAIN,
    FRONTEND_URL,
    LOGO_URL,
    LOGO_PNG_URL,
    LOGO_PROXY_URL,
    MAX_SEARCH_LIMIT,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL,
    STORAGE_KEY,
    STORAGE_VERSION,
    STREAM_URL,
    VERSION,
)


_LOGGER = logging.getLogger(__name__)


def _clean_diagnostic_value(value: Any, depth: int = 0) -> Any:
    """Limit diagnostic payload size and keep it JSON serializable."""
    if depth > 4:
        return str(value)[:300]
    if value is None or isinstance(value, (bool, int, float)):
        return value
    if isinstance(value, str):
        return value[:600]
    if isinstance(value, dict):
        return {
            str(key)[:80]: _clean_diagnostic_value(item, depth + 1)
            for key, item in list(value.items())[:40]
        }
    if isinstance(value, (list, tuple)):
        return [_clean_diagnostic_value(item, depth + 1) for item in list(value)[:50]]
    return str(value)[:300]


def _empty_now_playing(station_name: str = "") -> dict[str, Any]:
    return {
        "title": "",
        "artist": "",
        "raw_title": "",
        "station_name": station_name,
        "metadata_available": False,
    }


def _parse_icy_metadata(raw_metadata: bytes, station_name: str = "") -> dict[str, Any]:
    """Decode one ICY metadata block into the public now-playing format."""
    result = _empty_now_playing(station_name)
    clean_bytes = raw_metadata.rstrip(b"\x00")
    metadata_text = ""
    for encoding in ("utf-8", "cp1250", "latin-1"):
        try:
            metadata_text = clean_bytes.decode(encoding)
            break
        except UnicodeDecodeError:
            continue

    match = re.search(r"StreamTitle=['\"](.*?)['\"];", metadata_text, re.DOTALL)
    stream_title = match.group(1).strip() if match else ""
    if not stream_title:
        return result

    artist = ""
    title = stream_title
    if " - " in stream_title:
        artist, title = (part.strip() for part in stream_title.split(" - ", 1))
    result.update(
        {
            "title": title or stream_title,
            "artist": artist,
            "raw_title": stream_title,
            "metadata_available": True,
        }
    )
    return result

CONFIG_SCHEMA = vol.Schema(
    {DOMAIN: vol.Schema({vol.Optional(CONF_NAME, default=PANEL_TITLE): cv.string})},
    extra=vol.ALLOW_EXTRA,
)

STATION_SCHEMA = vol.Schema(
    {
        vol.Required("stationuuid"): str,
        vol.Required("name"): str,
        vol.Optional("url", default=""): str,
        vol.Optional("url_resolved", default=""): str,
        vol.Optional("homepage", default=""): str,
        vol.Optional("favicon", default=""): str,
        vol.Optional("tags", default=""): str,
        vol.Optional("country", default=""): str,
        vol.Optional("countrycode", default=""): str,
        vol.Optional("language", default=""): str,
        vol.Optional("codec", default=""): str,
        vol.Optional("bitrate", default=0): vol.Coerce(int),
        vol.Optional("hls", default=0): vol.Coerce(int),
        vol.Optional("lastcheckok", default=1): vol.Coerce(int),
        vol.Optional("clickcount", default=0): vol.Coerce(int),
        vol.Optional("votes", default=0): vol.Coerce(int),
        vol.Optional("favorite_source", default=""): str,
        vol.Optional("favorite_added_at", default=""): str,
    },
    extra=vol.ALLOW_EXTRA,
)


def _default_data() -> dict[str, Any]:
    return {
        "favorites": {},
        "stats": {},
        "settings": {
            "auto_favorite": True,
            "auto_favorite_plays": DEFAULT_AUTO_FAVORITE_PLAYS,
            "auto_favorite_minutes": DEFAULT_AUTO_FAVORITE_MINUTES,
        },
    }


def _clean_station(station: dict[str, Any]) -> dict[str, Any]:
    """Keep fields used by the frontend and storage."""
    return {
        "stationuuid": str(station.get("stationuuid", "")),
        "name": str(station.get("name", "")).strip() or "Nieznana stacja",
        "url": str(station.get("url", "")),
        "url_resolved": str(station.get("url_resolved", "")),
        "homepage": str(station.get("homepage", "")),
        "favicon": str(station.get("favicon", "")),
        "tags": str(station.get("tags", "")),
        "country": str(station.get("country", "")),
        "countrycode": str(station.get("countrycode", "")),
        "language": str(station.get("language", "")),
        "codec": str(station.get("codec", "")),
        "bitrate": int(station.get("bitrate") or 0),
        "hls": int(station.get("hls") or 0),
        "lastcheckok": int(station.get("lastcheckok") or 0),
        "clickcount": int(station.get("clickcount") or 0),
        "votes": int(station.get("votes") or 0),
    }


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


class RadioPanelManager:
    """Manage Radio Panel data and Radio Browser requests."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.data: dict[str, Any] = _default_data()
        self.station_cache: dict[str, dict[str, Any]] = {}
        self.now_playing_cache: dict[str, tuple[float, dict[str, Any]]] = {}
        self.active_streams: dict[str, int] = {}
        self.diagnostics: deque[dict[str, Any]] = deque(maxlen=1200)
        self._diagnostic_id = 0

    async def async_load(self) -> None:
        """Load and normalize persisted favorites, stats and settings."""
        loaded = await self.store.async_load()
        if not isinstance(loaded, dict):
            return

        normalized = _default_data()

        favorites = loaded.get("favorites", {})
        if isinstance(favorites, dict):
            for uuid, raw in favorites.items():
                if not isinstance(raw, dict):
                    continue
                station = _clean_station(raw)
                station_uuid = station["stationuuid"] or str(uuid)
                if not station_uuid:
                    continue
                station["stationuuid"] = station_uuid
                station["favorite_source"] = (
                    "automatic" if raw.get("favorite_source") == "automatic" else "manual"
                )
                station["favorite_added_at"] = str(
                    raw.get("favorite_added_at") or _now_iso()
                )
                normalized["favorites"][station_uuid] = station

        stats = loaded.get("stats", {})
        if isinstance(stats, dict):
            for uuid, raw in stats.items():
                if not isinstance(raw, dict):
                    continue
                normalized["stats"][str(uuid)] = {
                    "play_count": max(int(raw.get("play_count") or 0), 0),
                    "listened_seconds": max(int(raw.get("listened_seconds") or 0), 0),
                    "station": _clean_station(raw.get("station", {}))
                    if isinstance(raw.get("station"), dict)
                    else {},
                }

        settings = loaded.get("settings", {})
        if isinstance(settings, dict):
            normalized["settings"].update(
                {
                    "auto_favorite": bool(settings.get("auto_favorite", True)),
                    "auto_favorite_plays": min(
                        max(int(settings.get("auto_favorite_plays") or 3), 1), 100
                    ),
                    "auto_favorite_minutes": min(
                        max(int(settings.get("auto_favorite_minutes") or 20), 1),
                        1440,
                    ),
                }
            )

        self.data = normalized
        for station in normalized["favorites"].values():
            self.remember_station(station)
        for stats in normalized["stats"].values():
            station = stats.get("station", {})
            if isinstance(station, dict):
                self.remember_station(station)

    def remember_station(self, station: dict[str, Any]) -> dict[str, Any]:
        """Remember a station returned by Radio Browser for secure streaming."""
        cleaned = _clean_station(station)
        station_uuid = cleaned["stationuuid"]
        if station_uuid and (cleaned["url_resolved"] or cleaned["url"]):
            self.station_cache[station_uuid] = cleaned
        return cleaned

    def get_station(self, station_uuid: str) -> dict[str, Any] | None:
        """Return a cached or persisted station."""
        station = self.station_cache.get(station_uuid)
        if station:
            return station
        favorite = self.data.get("favorites", {}).get(station_uuid)
        if isinstance(favorite, dict):
            return self.remember_station(favorite)
        stats = self.data.get("stats", {}).get(station_uuid, {})
        if isinstance(stats, dict) and isinstance(stats.get("station"), dict):
            return self.remember_station(stats["station"])
        return None

    async def async_save(self) -> None:
        """Persist data."""
        await self.store.async_save(self.data)

    def public_data(self) -> dict[str, Any]:
        """Return serializable frontend data."""
        return deepcopy(self.data)

    async def async_search(self, msg: dict[str, Any]) -> list[dict[str, Any]]:
        """Search Radio Browser."""
        limit = min(max(int(msg.get("limit", DEFAULT_SEARCH_LIMIT)), 1), MAX_SEARCH_LIMIT)
        params: dict[str, str] = {
            "hidebroken": "true",
            "order": "clickcount",
            "reverse": "true",
            "limit": str(limit),
            "offset": str(max(int(msg.get("offset", 0)), 0)),
        }

        filters = {
            "name": msg.get("query", ""),
            "countrycode": msg.get("countrycode", ""),
            "language": msg.get("language", ""),
            "tag": msg.get("tag", ""),
        }
        for key, value in filters.items():
            text = str(value).strip()
            if text:
                params[key] = text.upper() if key == "countrycode" else text

        if bool(msg.get("https_only", False)):
            params["is_https"] = "true"

        session = async_get_clientsession(self.hass)
        headers = {"User-Agent": f"HomeAssistant-RadioPanel/{VERSION}"}
        url = f"{API_BASE_URL}/json/stations/search"

        try:
            async with session.get(url, params=params, headers=headers, timeout=20) as response:
                response.raise_for_status()
                payload = await response.json(content_type=None)
        except (ClientError, ClientResponseError, TimeoutError, ValueError) as err:
            raise RuntimeError(f"Radio Browser request failed: {err}") from err

        if not isinstance(payload, list):
            return []

        stations: list[dict[str, Any]] = []
        seen: set[str] = set()
        for item in payload:
            if not isinstance(item, dict):
                continue
            station = _clean_station(item)
            uuid = station["stationuuid"]
            if not uuid or uuid in seen:
                continue
            if not station["url_resolved"] and not station["url"]:
                continue
            seen.add(uuid)
            self.remember_station(station)
            stations.append(station)

        # Zachowaj popularność jako główne kryterium API, ale przesuń wyżej
        # strumienie, które najczęściej działają stabilnie w przeglądarkach.
        def stability_key(item: dict[str, Any]) -> tuple[int, int, int, int, int, int]:
            stream_url = str(item.get("url_resolved") or item.get("url") or "")
            codec = str(item.get("codec") or "").upper()
            bitrate = int(item.get("bitrate") or 0)
            return (
                0 if int(item.get("lastcheckok") or 0) == 1 else 1,
                0 if codec in {"MP3", "AAC", "AAC+"} else 1,
                0 if int(item.get("hls") or 0) == 0 else 1,
                0 if stream_url.startswith("https://") else 1,
                0 if 32 <= bitrate <= 320 else 1,
                -int(item.get("clickcount") or 0),
            )

        stations.sort(key=stability_key)
        return stations

    async def async_refresh_station(self, station_uuid: str) -> dict[str, Any]:
        """Fetch the newest station URL and metadata by UUID."""
        safe_uuid = quote(str(station_uuid).strip(), safe="")
        if not safe_uuid:
            raise RuntimeError("Brak identyfikatora stacji.")

        session = async_get_clientsession(self.hass)
        headers = {"User-Agent": f"HomeAssistant-RadioPanel/{VERSION}"}
        url = f"{API_BASE_URL}/json/stations/byuuid/{safe_uuid}"
        try:
            async with session.get(
                url,
                params={"hidebroken": "true"},
                headers=headers,
                timeout=20,
            ) as response:
                response.raise_for_status()
                payload = await response.json(content_type=None)
        except (ClientError, ClientResponseError, TimeoutError, ValueError) as err:
            raise RuntimeError(f"Nie udało się odświeżyć stacji: {err}") from err

        if not isinstance(payload, list) or not payload or not isinstance(payload[0], dict):
            raise RuntimeError("Radio Browser nie zwrócił aktualnych danych stacji.")

        station = self.remember_station(payload[0])
        if not station["url_resolved"] and not station["url"]:
            raise RuntimeError("Stacja nie ma aktualnego adresu strumienia.")

        changed_persisted_data = False
        favorite = self.data.get("favorites", {}).get(station_uuid)
        if isinstance(favorite, dict):
            updated_favorite = {
                **station,
                "favorite_source": favorite.get("favorite_source", "manual"),
                "favorite_added_at": favorite.get("favorite_added_at", _now_iso()),
            }
            self.data["favorites"][station_uuid] = updated_favorite
            changed_persisted_data = True

        stats = self.data.get("stats", {}).get(station_uuid)
        if isinstance(stats, dict):
            stats["station"] = station
            changed_persisted_data = True

        if changed_persisted_data:
            await self.async_save()
        return station

    def add_diagnostic(
        self, source: str, event: str, details: dict[str, Any] | None = None
    ) -> dict[str, Any]:
        """Record a compact diagnostic event in Home Assistant memory."""
        self._diagnostic_id += 1
        entry = {
            "id": self._diagnostic_id,
            "time": _now_iso(),
            "source": str(source)[:40],
            "event": str(event)[:120],
            "details": _clean_diagnostic_value(details or {}),
        }
        self.diagnostics.append(entry)
        if event in {
            "proxy_stream_closed",
            "proxy_upstream_error",
            "frontend_audio_error",
            "frontend_audio_ended",
            "frontend_unexpected_pause",
        }:
            _LOGGER.warning("Radio Panel diagnostics: %s", entry)
        else:
            _LOGGER.debug("Radio Panel diagnostics: %s", entry)
        return entry

    def get_diagnostics(self, limit: int = 500) -> list[dict[str, Any]]:
        """Return the newest diagnostics in chronological order."""
        safe_limit = min(max(int(limit), 1), 1200)
        return list(self.diagnostics)[-safe_limit:]

    def clear_diagnostics(self) -> None:
        """Clear collected diagnostics."""
        self.diagnostics.clear()
        self._diagnostic_id = 0

    def stream_opened(self, station_uuid: str) -> None:
        """Track active proxy listeners for a station."""
        self.active_streams[station_uuid] = self.active_streams.get(station_uuid, 0) + 1

    def stream_closed(self, station_uuid: str) -> None:
        """Stop tracking an active proxy listener."""
        remaining = self.active_streams.get(station_uuid, 0) - 1
        if remaining > 0:
            self.active_streams[station_uuid] = remaining
        else:
            self.active_streams.pop(station_uuid, None)

    def cache_stream_metadata(
        self, station_uuid: str, raw_metadata: bytes, station_name: str = ""
    ) -> None:
        """Cache metadata extracted from the same connection used for audio."""
        parsed = _parse_icy_metadata(raw_metadata, station_name)
        if parsed["metadata_available"]:
            self.now_playing_cache[station_uuid] = (monotonic(), parsed)

    async def async_now_playing(self, station_uuid: str) -> dict[str, Any]:
        """Read the first ICY metadata block exposed by a station."""
        cached = self.now_playing_cache.get(station_uuid)
        active_stream = self.active_streams.get(station_uuid, 0) > 0
        if cached and (active_stream or monotonic() - cached[0] < 10):
            return deepcopy(cached[1])

        station = self.get_station(station_uuid)
        if not station:
            raise RuntimeError("Nie znaleziono stacji w pamięci panelu.")

        stream_url = str(station.get("url_resolved") or station.get("url") or "")
        if not stream_url.startswith(("http://", "https://")):
            raise RuntimeError("Nieobsługiwany adres strumienia.")

        headers = {
            "User-Agent": f"HomeAssistant-RadioPanel/{VERSION}",
            "Accept": "*/*",
            "Accept-Encoding": "identity",
            "Icy-MetaData": "1",
            "Cache-Control": "no-cache",
        }
        timeout = ClientTimeout(total=12, connect=10, sock_connect=10, sock_read=10)
        session = async_get_clientsession(self.hass)
        result = _empty_now_playing(str(station.get("name", "")))

        # While audio is flowing through our proxy, metadata is parsed from that
        # same connection. Do not open a second radio connection every 15 seconds.
        if active_stream:
            return deepcopy(result)

        try:
            async with session.get(
                stream_url,
                headers=headers,
                timeout=timeout,
                allow_redirects=True,
            ) as response:
                if response.status not in (200, 206):
                    raise RuntimeError(f"Serwer radia zwrócił kod HTTP {response.status}.")

                result["station_name"] = (
                    response.headers.get("icy-name")
                    or response.headers.get("x-audiocast-name")
                    or result["station_name"]
                )
                metaint_text = response.headers.get("icy-metaint", "")
                try:
                    metaint = int(metaint_text)
                except (TypeError, ValueError):
                    metaint = 0

                if metaint <= 0 or metaint > 10_000_000:
                    self.now_playing_cache[station_uuid] = (monotonic(), result)
                    return deepcopy(result)

                await response.content.readexactly(metaint)
                length_byte = await response.content.readexactly(1)
                metadata_length = length_byte[0] * 16
                if metadata_length <= 0:
                    self.now_playing_cache[station_uuid] = (monotonic(), result)
                    return deepcopy(result)

                raw_metadata = await response.content.readexactly(metadata_length)
        except asyncio.IncompleteReadError:
            self.now_playing_cache[station_uuid] = (monotonic(), result)
            return deepcopy(result)
        except (ClientError, TimeoutError) as err:
            raise RuntimeError(f"Nie udało się odczytać informacji o utworze: {err}") from err

        result = _parse_icy_metadata(raw_metadata, result["station_name"])
        self.now_playing_cache[station_uuid] = (monotonic(), result)
        return deepcopy(result)

    def _add_favorite(self, station: dict[str, Any], source: str) -> None:
        favorite = self.remember_station(station)
        favorite["favorite_source"] = "automatic" if source == "automatic" else "manual"
        favorite["favorite_added_at"] = _now_iso()
        self.data["favorites"][favorite["stationuuid"]] = favorite

    def _maybe_auto_favorite(
        self, station: dict[str, Any], stats: dict[str, Any]
    ) -> bool:
        settings = self.data["settings"]
        uuid = station["stationuuid"]
        if not settings.get("auto_favorite", True) or uuid in self.data["favorites"]:
            return False

        play_threshold = max(int(settings.get("auto_favorite_plays", 3)), 1)
        seconds_threshold = max(int(settings.get("auto_favorite_minutes", 20)), 1) * 60
        qualifies = (
            int(stats.get("play_count", 0)) >= play_threshold
            or int(stats.get("listened_seconds", 0)) >= seconds_threshold
        )
        if not qualifies:
            return False

        self._add_favorite(station, "automatic")
        return True

    async def async_toggle_favorite(self, station: dict[str, Any]) -> bool:
        """Add a manual favorite or remove an existing favorite."""
        station = self.remember_station(station)
        uuid = station["stationuuid"]
        favorites = self.data["favorites"]
        if uuid in favorites:
            del favorites[uuid]
            is_favorite = False
        else:
            self._add_favorite(station, "manual")
            is_favorite = True
        await self.async_save()
        return is_favorite

    async def async_register_play(self, station: dict[str, Any]) -> dict[str, Any]:
        """Register playback and optionally auto-add a station."""
        station = self.remember_station(station)
        uuid = station["stationuuid"]
        stats = self.data["stats"].setdefault(
            uuid, {"play_count": 0, "listened_seconds": 0, "station": station}
        )
        stats["play_count"] = int(stats.get("play_count", 0)) + 1
        stats["listened_seconds"] = max(int(stats.get("listened_seconds", 0)), 0)
        stats["station"] = station
        auto_added = self._maybe_auto_favorite(station, stats)
        await self.async_save()
        return {
            "play_count": stats["play_count"],
            "listened_seconds": stats["listened_seconds"],
            "auto_added": auto_added,
            "is_favorite": uuid in self.data["favorites"],
        }

    async def async_register_listen(
        self, station: dict[str, Any], seconds: int
    ) -> dict[str, Any]:
        """Add listened time reported by the active panel session."""
        station = self.remember_station(station)
        uuid = station["stationuuid"]
        safe_seconds = min(max(int(seconds), 1), 300)
        stats = self.data["stats"].setdefault(
            uuid, {"play_count": 0, "listened_seconds": 0, "station": station}
        )
        stats["play_count"] = max(int(stats.get("play_count", 0)), 0)
        stats["listened_seconds"] = int(stats.get("listened_seconds", 0)) + safe_seconds
        stats["station"] = station
        auto_added = self._maybe_auto_favorite(station, stats)
        await self.async_save()
        return {
            "play_count": stats["play_count"],
            "listened_seconds": stats["listened_seconds"],
            "auto_added": auto_added,
            "is_favorite": uuid in self.data["favorites"],
        }

    async def async_update_settings(self, msg: dict[str, Any]) -> dict[str, Any]:
        """Update automatic favorite settings."""
        settings = self.data["settings"]
        if "auto_favorite" in msg:
            settings["auto_favorite"] = bool(msg["auto_favorite"])
        if "auto_favorite_plays" in msg:
            settings["auto_favorite_plays"] = min(
                max(int(msg["auto_favorite_plays"]), 1), 100
            )
        if "auto_favorite_minutes" in msg:
            settings["auto_favorite_minutes"] = min(
                max(int(msg["auto_favorite_minutes"]), 1), 1440
            )
        await self.async_save()
        return deepcopy(settings)


class RadioLogoView(HomeAssistantView):
    """Serve station artwork through Home Assistant for iOS Media Session."""

    url = LOGO_PROXY_URL
    name = "api:radio_panel:logo"
    requires_auth = True

    def __init__(self, manager: RadioPanelManager, fallback_path: Path) -> None:
        self.manager = manager
        self.fallback_path = fallback_path

    async def _fallback(self) -> web.Response:
        data = await self.manager.hass.async_add_executor_job(self.fallback_path.read_bytes)
        return web.Response(
            body=data,
            content_type="image/png",
            headers={"Cache-Control": "public, max-age=86400"},
        )

    async def get(
        self, request: web.Request, station_uuid: str, cache_key: str
    ) -> web.Response:
        station = self.manager.get_station(station_uuid)
        logo_url = str((station or {}).get("favicon") or "").strip()
        if not logo_url.startswith(("http://", "https://")):
            return await self._fallback()

        session = async_get_clientsession(self.manager.hass)
        headers = {
            "User-Agent": f"HomeAssistant-RadioPanel/{VERSION}",
            "Accept": "image/png,image/jpeg,image/webp,image/*;q=0.8,*/*;q=0.1",
            "Accept-Encoding": "identity",
        }
        timeout = ClientTimeout(total=12, connect=8, sock_connect=8, sock_read=10)
        try:
            async with session.get(
                logo_url,
                headers=headers,
                timeout=timeout,
                allow_redirects=True,
                auto_decompress=True,
            ) as response:
                if response.status != 200:
                    return await self._fallback()
                content_type = response.headers.get("Content-Type", "").split(";", 1)[0].lower()
                # Lock-screen artwork on iOS is substantially more reliable with
                # raster images. SVG and unknown payloads use our local PNG logo.
                if content_type not in {"image/png", "image/jpeg", "image/webp"}:
                    return await self._fallback()
                data = await response.content.read(2 * 1024 * 1024 + 1)
                if not data or len(data) > 2 * 1024 * 1024:
                    return await self._fallback()
                return web.Response(
                    body=data,
                    content_type=content_type,
                    headers={"Cache-Control": "public, max-age=3600"},
                )
        except (ClientError, TimeoutError, asyncio.TimeoutError):
            return await self._fallback()


class RadioStreamView(HomeAssistantView):
    """Authenticated resilient same-origin proxy for radio audio streams."""

    url = STREAM_URL
    name = "api:radio_panel:stream"
    requires_auth = True

    def __init__(self, manager: RadioPanelManager) -> None:
        self.manager = manager

    async def _open_upstream(self, station_uuid: str):
        """Open the current station URL, refreshing Radio Browser data if needed."""
        station = self.manager.get_station(station_uuid)
        if not station:
            raise RuntimeError("Nie znaleziono stacji w pamięci panelu.")

        stream_url = str(station.get("url_resolved") or station.get("url") or "")
        if not stream_url.startswith(("http://", "https://")):
            raise RuntimeError("Nieobsługiwany adres strumienia.")

        headers = {
            "User-Agent": f"HomeAssistant-RadioPanel/{VERSION}",
            "Accept": "*/*",
            "Accept-Encoding": "identity",
            "Icy-MetaData": "1",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
        timeout = ClientTimeout(total=None, connect=20, sock_connect=20, sock_read=45)
        session = async_get_clientsession(self.manager.hass)
        try:
            upstream = await session.get(
                stream_url,
                headers=headers,
                timeout=timeout,
                allow_redirects=True,
                auto_decompress=False,
            )
        except (ClientError, TimeoutError) as err:
            raise RuntimeError(f"Nie udało się połączyć ze stacją: {err}") from err

        if upstream.status not in (200, 206):
            status = upstream.status
            upstream.release()
            raise RuntimeError(f"Serwer radia zwrócił kod HTTP {status}.")
        return station, upstream

    async def _relay_upstream(
        self,
        station_uuid: str,
        station: dict[str, Any],
        upstream: Any,
        response: web.StreamResponse,
    ) -> int:
        """Relay audio while stripping and caching interleaved ICY metadata."""
        relayed_bytes = 0
        metaint_text = upstream.headers.get("icy-metaint", "")
        try:
            metaint = int(metaint_text)
        except (TypeError, ValueError):
            metaint = 0

        if metaint <= 0 or metaint > 10_000_000:
            async for chunk in upstream.content.iter_chunked(32 * 1024):
                if chunk:
                    await response.write(chunk)
                    relayed_bytes += len(chunk)
            return relayed_bytes

        station_name = (
            upstream.headers.get("icy-name")
            or upstream.headers.get("x-audiocast-name")
            or str(station.get("name", ""))
        )
        while True:
            try:
                audio_block = await upstream.content.readexactly(metaint)
            except asyncio.IncompleteReadError as err:
                if err.partial:
                    await response.write(err.partial)
                    relayed_bytes += len(err.partial)
                return relayed_bytes
            if audio_block:
                await response.write(audio_block)
                relayed_bytes += len(audio_block)

            try:
                length_byte = await upstream.content.readexactly(1)
            except asyncio.IncompleteReadError:
                return relayed_bytes
            metadata_length = length_byte[0] * 16
            if metadata_length <= 0:
                continue
            try:
                raw_metadata = await upstream.content.readexactly(metadata_length)
            except asyncio.IncompleteReadError:
                return relayed_bytes
            self.manager.cache_stream_metadata(
                station_uuid, raw_metadata, station_name
            )

    async def get(
        self, request: web.Request, station_uuid: str, session_id: str
    ) -> web.StreamResponse:
        started_at = monotonic()
        total_relayed = 0
        close_reason = "unknown"
        consecutive_failures = 0
        short_session = str(session_id)[:18]
        station = self.manager.get_station(station_uuid) or {}
        stream_url = str(station.get("url_resolved") or station.get("url") or "")
        stream_host = (urlsplit(stream_url).hostname or "") if stream_url else ""
        self.manager.add_diagnostic(
            "backend",
            "proxy_request_started",
            {
                "station_uuid": station_uuid,
                "station_name": station.get("name", ""),
                "session_id": short_session,
                "upstream_host": stream_host,
                "user_agent": request.headers.get("User-Agent", "")[:250],
            },
        )

        try:
            station, upstream = await self._open_upstream(station_uuid)
        except RuntimeError as err:
            self.manager.add_diagnostic(
                "backend",
                "proxy_open_failed",
                {
                    "station_uuid": station_uuid,
                    "session_id": short_session,
                    "error": str(err),
                },
            )
            raise web.HTTPBadGateway(text=str(err)) from err

        content_type = upstream.headers.get("Content-Type", "").split(";", 1)[0].strip()
        if not content_type or content_type in {"application/octet-stream", "text/plain"}:
            codec = str(station.get("codec", "")).upper()
            content_type = {
                "MP3": "audio/mpeg",
                "AAC": "audio/aac",
                "AAC+": "audio/aac",
                "OGG": "audio/ogg",
                "OPUS": "audio/ogg",
                "FLAC": "audio/flac",
            }.get(codec, "audio/mpeg")

        response_headers = {
            "Content-Type": content_type,
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache",
            "X-Accel-Buffering": "no",
            "Accept-Ranges": "none",
        }
        for header_name in ("icy-name", "icy-description", "icy-genre", "icy-br"):
            value = upstream.headers.get(header_name)
            if value:
                response_headers[header_name] = value

        response = web.StreamResponse(status=200, headers=response_headers)
        try:
            await response.prepare(request)
        except (ConnectionResetError, BrokenPipeError, RuntimeError) as err:
            upstream.close()
            self.manager.add_diagnostic(
                "backend",
                "proxy_prepare_failed",
                {
                    "station_uuid": station_uuid,
                    "session_id": short_session,
                    "error_type": type(err).__name__,
                    "error": str(err),
                },
            )
            raise

        self.manager.stream_opened(station_uuid)
        self.manager.add_diagnostic(
            "backend",
            "proxy_stream_opened",
            {
                "station_uuid": station_uuid,
                "station_name": station.get("name", ""),
                "session_id": short_session,
                "content_type": content_type,
                "icy_metaint": upstream.headers.get("icy-metaint", ""),
                "icy_br": upstream.headers.get("icy-br", ""),
            },
        )

        reconnect_delay = 0.15
        try:
            while True:
                relayed_bytes = 0
                relay_error = ""
                relay_error_type = ""
                try:
                    relayed_bytes = await self._relay_upstream(
                        station_uuid, station, upstream, response
                    )
                    relay_error_type = "eof"
                except (ClientError, TimeoutError, asyncio.TimeoutError) as err:
                    relay_error_type = type(err).__name__
                    relay_error = str(err)
                finally:
                    upstream.close()

                total_relayed += relayed_bytes
                if relayed_bytes >= 64 * 1024:
                    consecutive_failures = 0
                    reconnect_delay = 0.15

                consecutive_failures += 1
                self.manager.add_diagnostic(
                    "backend",
                    "proxy_upstream_interrupted",
                    {
                        "station_uuid": station_uuid,
                        "session_id": short_session,
                        "bytes_this_connection": relayed_bytes,
                        "bytes_total": total_relayed,
                        "failure_count": consecutive_failures,
                        "reason_type": relay_error_type,
                        "reason": relay_error,
                        "elapsed_seconds": round(monotonic() - started_at, 2),
                    },
                )
                # Nie zamykamy odpowiedzi do iPhone'a po kilku błędach upstreamu.
                # Przy zablokowanym ekranie frontend nie ma możliwości niezawodnie
                # otworzyć kolejnego elementu audio. Utrzymujemy więc tę samą
                # odpowiedź HTTP i bez limitu ponawiamy połączenie do stacji.
                transport = request.transport
                if transport is None or transport.is_closing():
                    close_reason = "client_transport_closed_during_reconnect"
                    break

                await asyncio.sleep(reconnect_delay)
                reconnect_delay = min(reconnect_delay * 2, 15)

                transport = request.transport
                if transport is None or transport.is_closing():
                    close_reason = "client_transport_closed_during_reconnect"
                    break

                try:
                    if consecutive_failures >= 2:
                        try:
                            station = await self.manager.async_refresh_station(
                                station_uuid
                            )
                        except Exception as err:  # Best effort; cached URL may still work.
                            self.manager.add_diagnostic(
                                "backend",
                                "proxy_station_refresh_failed",
                                {
                                    "station_uuid": station_uuid,
                                    "session_id": short_session,
                                    "error_type": type(err).__name__,
                                    "error": str(err),
                                },
                            )
                            station = self.manager.get_station(station_uuid) or station
                    station, upstream = await self._open_upstream(station_uuid)
                    self.manager.add_diagnostic(
                        "backend",
                        "proxy_upstream_reopened",
                        {
                            "station_uuid": station_uuid,
                            "session_id": short_session,
                            "failure_count": consecutive_failures,
                        },
                    )
                except RuntimeError as err:
                    self.manager.add_diagnostic(
                        "backend",
                        "proxy_upstream_reopen_failed",
                        {
                            "station_uuid": station_uuid,
                            "session_id": short_session,
                            "failure_count": consecutive_failures,
                            "error": str(err),
                        },
                    )
                    continue
        except ConnectionResetError as err:
            close_reason = "client_connection_reset"
            self.manager.add_diagnostic(
                "backend",
                "proxy_client_disconnected",
                {
                    "station_uuid": station_uuid,
                    "session_id": short_session,
                    "error_type": type(err).__name__,
                    "error": str(err),
                },
            )
        except BrokenPipeError as err:
            close_reason = "client_broken_pipe"
            self.manager.add_diagnostic(
                "backend",
                "proxy_client_disconnected",
                {
                    "station_uuid": station_uuid,
                    "session_id": short_session,
                    "error_type": type(err).__name__,
                    "error": str(err),
                },
            )
        except asyncio.CancelledError:
            close_reason = "request_cancelled"
            self.manager.add_diagnostic(
                "backend",
                "proxy_request_cancelled",
                {
                    "station_uuid": station_uuid,
                    "session_id": short_session,
                },
            )
        except RuntimeError as err:
            close_reason = "runtime_error"
            self.manager.add_diagnostic(
                "backend",
                "proxy_runtime_error",
                {
                    "station_uuid": station_uuid,
                    "session_id": short_session,
                    "error": str(err),
                },
            )
        finally:
            upstream.close()
            self.manager.stream_closed(station_uuid)
            elapsed = round(monotonic() - started_at, 2)
            self.manager.add_diagnostic(
                "backend",
                "proxy_stream_closed",
                {
                    "station_uuid": station_uuid,
                    "station_name": station.get("name", ""),
                    "session_id": short_session,
                    "reason": close_reason,
                    "duration_seconds": elapsed,
                    "bytes_total": total_relayed,
                    "failure_count": consecutive_failures,
                },
            )
            try:
                await response.write_eof()
            except (ConnectionResetError, BrokenPipeError, RuntimeError):
                pass

        return response



async def _async_setup_runtime(hass: HomeAssistant, title: str) -> bool:
    """Initialize the panel once for YAML or a UI config entry."""
    if DOMAIN in hass.data:
        return True

    manager = RadioPanelManager(hass)
    await manager.async_load()
    hass.data[DOMAIN] = manager
    hls_manager = RadioHlsManager(hass, manager)
    hass.data[f"{DOMAIN}_hls"] = hls_manager
    await hls_manager.async_start()
    frontend_dir = Path(__file__).parent / "frontend"
    logo_png_path = frontend_dir / "radio-play-logo.png"
    hass.http.register_view(RadioStreamView(manager))
    hass.http.register_view(RadioLogoView(manager, logo_png_path))
    hass.http.register_view(RadioHlsView(hls_manager))

    frontend_path = frontend_dir / "radio-panel.js"
    logo_path = frontend_dir / "radio-play-logo.svg"
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(FRONTEND_URL, str(frontend_path), False),
            StaticPathConfig(LOGO_URL, str(logo_path), False),
            StaticPathConfig(LOGO_PNG_URL, str(logo_png_path), False),
        ]
    )

    # Register as a real custom panel so Home Assistant loads the module
    # before creating the web component. Registering it as a built-in panel
    # can leave a blank screen on a cold browser load.
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL,
        webcomponent_name="radio-panel",
        sidebar_title=title,
        sidebar_icon=PANEL_ICON,
        module_url=f"{FRONTEND_URL}?v={VERSION}",
        require_admin=False,
    )

    websocket_api.async_register_command(hass, websocket_radio_browser_status)
    websocket_api.async_register_command(hass, websocket_get_data)
    websocket_api.async_register_command(hass, websocket_search)
    websocket_api.async_register_command(hass, websocket_refresh_station)
    websocket_api.async_register_command(hass, websocket_now_playing)
    websocket_api.async_register_command(hass, websocket_toggle_favorite)
    websocket_api.async_register_command(hass, websocket_register_play)
    websocket_api.async_register_command(hass, websocket_register_listen)
    websocket_api.async_register_command(hass, websocket_update_settings)
    websocket_api.async_register_command(hass, websocket_diagnostics_event)
    websocket_api.async_register_command(hass, websocket_get_diagnostics)
    websocket_api.async_register_command(hass, websocket_clear_diagnostics)
    websocket_api.async_register_command(hass, websocket_prepare_hls)
    websocket_api.async_register_command(hass, websocket_stop_hls)

    async def _shutdown_hls(_event: Any) -> None:
        await hls_manager.async_shutdown()

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, _shutdown_hls)
    return True


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up Radio Panel from YAML or before config-entry setup."""
    title = config.get(DOMAIN, {}).get(CONF_NAME, PANEL_TITLE)
    return await _async_setup_runtime(hass, title)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up a Radio Panel entry added from the Home Assistant UI."""
    return await _async_setup_runtime(hass, entry.title or PANEL_TITLE)


@websocket_api.websocket_command(
    {vol.Required("type"): "radio_panel/radio_browser_status"}
)
@websocket_api.async_response
async def websocket_radio_browser_status(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Report whether the built-in Radio Browser integration is configured."""
    entries = hass.config_entries.async_entries("radio_browser")
    loaded_entries = [
        entry for entry in entries if entry.state is ConfigEntryState.LOADED
    ]
    connection.send_result(
        msg["id"],
        {
            "available": True,
            "configured": bool(entries),
            "loaded": bool(loaded_entries)
            or "radio_browser" in hass.config.components,
            "entry_count": len(entries),
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "radio_panel/get_data"})
@websocket_api.async_response
async def websocket_get_data(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return favorites, stats and settings."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    connection.send_result(msg["id"], manager.public_data())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/search",
        vol.Optional("query", default=""): str,
        vol.Optional("countrycode", default=""): str,
        vol.Optional("language", default=""): str,
        vol.Optional("tag", default=""): str,
        vol.Optional("https_only", default=False): bool,
        vol.Optional("limit", default=DEFAULT_SEARCH_LIMIT): vol.Coerce(int),
        vol.Optional("offset", default=0): vol.Coerce(int),
    }
)
@websocket_api.async_response
async def websocket_search(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Search stations."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    try:
        stations = await manager.async_search(msg)
    except RuntimeError as err:
        connection.send_error(msg["id"], "radio_browser_error", str(err))
        return
    connection.send_result(msg["id"], {"stations": stations})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/refresh_station",
        vol.Required("station_uuid"): str,
    }
)
@websocket_api.async_response
async def websocket_refresh_station(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return fresh Radio Browser metadata for one station."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    try:
        station = await manager.async_refresh_station(msg["station_uuid"])
    except RuntimeError as err:
        connection.send_error(msg["id"], "station_refresh_error", str(err))
        return
    connection.send_result(msg["id"], {"station": station})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/now_playing",
        vol.Required("station_uuid"): str,
    }
)
@websocket_api.async_response
async def websocket_now_playing(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return current ICY stream metadata when the station exposes it."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    try:
        metadata = await manager.async_now_playing(msg["station_uuid"])
    except RuntimeError as err:
        connection.send_error(msg["id"], "now_playing_error", str(err))
        return
    connection.send_result(msg["id"], metadata)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/toggle_favorite",
        vol.Required("station"): STATION_SCHEMA,
    }
)
@websocket_api.async_response
async def websocket_toggle_favorite(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Toggle a favorite station."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    is_favorite = await manager.async_toggle_favorite(msg["station"])
    connection.send_result(
        msg["id"], {"is_favorite": is_favorite, "data": manager.public_data()}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/register_play",
        vol.Required("station"): STATION_SCHEMA,
    }
)
@websocket_api.async_response
async def websocket_register_play(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Register a station playback."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    result = await manager.async_register_play(msg["station"])
    result["data"] = manager.public_data()
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/register_listen",
        vol.Required("station"): STATION_SCHEMA,
        vol.Required("seconds"): vol.All(vol.Coerce(int), vol.Range(min=1, max=300)),
    }
)
@websocket_api.async_response
async def websocket_register_listen(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Register listening time."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    result = await manager.async_register_listen(msg["station"], msg["seconds"])
    result["data"] = manager.public_data()
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/update_settings",
        vol.Optional("auto_favorite"): bool,
        vol.Optional("auto_favorite_plays"): vol.Coerce(int),
        vol.Optional("auto_favorite_minutes"): vol.Coerce(int),
    }
)
@websocket_api.async_response
async def websocket_update_settings(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update settings."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    settings = await manager.async_update_settings(msg)
    connection.send_result(msg["id"], {"settings": settings})

@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/prepare_hls",
        vol.Required("station"): STATION_SCHEMA,
    }
)
@websocket_api.async_response
async def websocket_prepare_hls(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Prepare an audio-only HLS session for native iOS background playback."""
    hls_manager: RadioHlsManager = hass.data[f"{DOMAIN}_hls"]
    try:
        result = await hls_manager.async_prepare(msg["station"])
    except RuntimeError as err:
        connection.send_error(msg["id"], "hls_prepare_error", str(err))
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/stop_hls",
        vol.Required("token"): str,
    }
)
@websocket_api.async_response
async def websocket_stop_hls(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Stop one temporary HLS encoder."""
    hls_manager: RadioHlsManager = hass.data[f"{DOMAIN}_hls"]
    await hls_manager.async_stop(msg["token"], reason="frontend_stop")
    connection.send_result(msg["id"], {"stopped": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/diagnostics_event",
        vol.Required("events"): [dict],
    }
)
@websocket_api.async_response
async def websocket_diagnostics_event(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Store diagnostic events sent by the browser."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    accepted = 0
    for raw in msg.get("events", [])[:50]:
        if not isinstance(raw, dict):
            continue
        manager.add_diagnostic(
            "frontend",
            str(raw.get("event", "frontend_event")),
            {
                "client_time": raw.get("time", ""),
                "client_id": raw.get("client_id", ""),
                **(raw.get("details", {}) if isinstance(raw.get("details"), dict) else {}),
            },
        )
        accepted += 1
    connection.send_result(msg["id"], {"accepted": accepted})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "radio_panel/get_diagnostics",
        vol.Optional("limit", default=500): vol.Coerce(int),
    }
)
@websocket_api.async_response
async def websocket_get_diagnostics(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return collected diagnostics."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    connection.send_result(
        msg["id"],
        {
            "version": VERSION,
            "generated_at": _now_iso(),
            "events": manager.get_diagnostics(msg.get("limit", 500)),
        },
    )


@websocket_api.websocket_command(
    {vol.Required("type"): "radio_panel/clear_diagnostics"}
)
@websocket_api.async_response
async def websocket_clear_diagnostics(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Clear collected diagnostics."""
    manager: RadioPanelManager = hass.data[DOMAIN]
    manager.clear_diagnostics()
    connection.send_result(msg["id"], {"cleared": True})

