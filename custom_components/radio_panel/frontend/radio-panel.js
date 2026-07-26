const RADIO_PANEL_COUNTRIES = [["PL","Polska"],["AF","Afganistan"],["AL","Albania"],["DZ","Algieria"],["AD","Andora"],["AO","Angola"],["AI","Anguilla"],["AQ","Antarktyda"],["AG","Antigua i Barbuda"],["SA","Arabia Saudyjska"],["AR","Argentyna"],["AM","Armenia"],["AW","Aruba"],["AU","Australia"],["AT","Austria"],["AZ","Azerbejdżan"],["BS","Bahamy"],["BH","Bahrajn"],["BD","Bangladesz"],["BB","Barbados"],["BE","Belgia"],["BZ","Belize"],["BJ","Benin"],["BM","Bermudy"],["BT","Bhutan"],["BY","Białoruś"],["BO","Boliwia"],["BW","Botswana"],["BA","Bośnia i Hercegowina"],["BR","Brazylia"],["BN","Brunei"],["IO","Brytyjskie Terytorium Oceanu Indyjskiego"],["VG","Brytyjskie Wyspy Dziewicze"],["BF","Burkina Faso"],["BI","Burundi"],["BG","Bułgaria"],["CL","Chile"],["CN","Chiny"],["HR","Chorwacja"],["CW","Curaçao"],["CY","Cypr"],["TD","Czad"],["ME","Czarnogóra"],["CZ","Czechy"],["CI","Côte d’Ivoire"],["UM","Dalekie Wyspy Mniejsze Stanów Zjednoczonych"],["DK","Dania"],["CD","Demokratyczna Republika Konga"],["DM","Dominika"],["DO","Dominikana"],["DJ","Dżibuti"],["EG","Egipt"],["EC","Ekwador"],["ER","Erytrea"],["EE","Estonia"],["SZ","Eswatini"],["ET","Etiopia"],["FK","Falklandy"],["FJ","Fidżi"],["PH","Filipiny"],["FI","Finlandia"],["FR","Francja"],["TF","Francuskie Terytoria Południowe i Antarktyczne"],["GA","Gabon"],["GM","Gambia"],["GS","Georgia Południowa i Sandwich Południowy"],["GH","Ghana"],["GI","Gibraltar"],["GR","Grecja"],["GD","Grenada"],["GL","Grenlandia"],["GE","Gruzja"],["GU","Guam"],["GG","Guernsey"],["GY","Gujana"],["GF","Gujana Francuska"],["GP","Gwadelupa"],["GT","Gwatemala"],["GN","Gwinea"],["GW","Gwinea Bissau"],["GQ","Gwinea Równikowa"],["HT","Haiti"],["ES","Hiszpania"],["NL","Holandia"],["HN","Honduras"],["IN","Indie"],["ID","Indonezja"],["IQ","Irak"],["IR","Iran"],["IE","Irlandia"],["IS","Islandia"],["IL","Izrael"],["JM","Jamajka"],["JP","Japonia"],["YE","Jemen"],["JE","Jersey"],["JO","Jordania"],["KY","Kajmany"],["KH","Kambodża"],["CM","Kamerun"],["CA","Kanada"],["QA","Katar"],["KZ","Kazachstan"],["KE","Kenia"],["KG","Kirgistan"],["KI","Kiribati"],["CO","Kolumbia"],["KM","Komory"],["CG","Kongo"],["KR","Korea Południowa"],["KP","Korea Północna"],["CR","Kostaryka"],["CU","Kuba"],["KW","Kuwejt"],["LA","Laos"],["LS","Lesotho"],["LB","Liban"],["LR","Liberia"],["LY","Libia"],["LI","Liechtenstein"],["LT","Litwa"],["LU","Luksemburg"],["MK","Macedonia Północna"],["MG","Madagaskar"],["YT","Majotta"],["MW","Malawi"],["MV","Malediwy"],["MY","Malezja"],["ML","Mali"],["MT","Malta"],["MP","Mariany Północne"],["MA","Maroko"],["MQ","Martynika"],["MR","Mauretania"],["MU","Mauritius"],["MX","Meksyk"],["FM","Mikronezja"],["MM","Mjanma (Birma)"],["MC","Monako"],["MN","Mongolia"],["MS","Montserrat"],["MZ","Mozambik"],["MD","Mołdawia"],["NA","Namibia"],["NR","Nauru"],["NP","Nepal"],["BQ","Niderlandy Karaibskie"],["DE","Niemcy"],["NE","Niger"],["NG","Nigeria"],["NI","Nikaragua"],["NU","Niue"],["NF","Norfolk"],["NO","Norwegia"],["NC","Nowa Kaledonia"],["NZ","Nowa Zelandia"],["OM","Oman"],["PK","Pakistan"],["PW","Palau"],["PA","Panama"],["PG","Papua-Nowa Gwinea"],["PY","Paragwaj"],["PE","Peru"],["PN","Pitcairn"],["PF","Polinezja Francuska"],["PR","Portoryko"],["PT","Portugalia"],["ZA","Republika Południowej Afryki"],["CV","Republika Zielonego Przylądka"],["CF","Republika Środkowoafrykańska"],["RE","Reunion"],["RU","Rosja"],["RO","Rumunia"],["RW","Rwanda"],["EH","Sahara Zachodnia"],["KN","Saint Kitts i Nevis"],["LC","Saint Lucia"],["VC","Saint Vincent i Grenadyny"],["BL","Saint-Barthélemy"],["MF","Saint-Martin"],["PM","Saint-Pierre i Miquelon"],["SV","Salwador"],["WS","Samoa"],["AS","Samoa Amerykańskie"],["SM","San Marino"],["SN","Senegal"],["RS","Serbia"],["SC","Seszele"],["SL","Sierra Leone"],["SG","Singapur"],["SX","Sint Maarten"],["SO","Somalia"],["HK","SRA Hongkong (Chiny)"],["MO","SRA Makau (Chiny)"],["LK","Sri Lanka"],["US","Stany Zjednoczone"],["SD","Sudan"],["SS","Sudan Południowy"],["SR","Surinam"],["SJ","Svalbard i Jan Mayen"],["SY","Syria"],["CH","Szwajcaria"],["SE","Szwecja"],["SK","Słowacja"],["SI","Słowenia"],["TJ","Tadżykistan"],["TH","Tajlandia"],["TW","Tajwan"],["TZ","Tanzania"],["PS","Terytoria Palestyńskie"],["TL","Timor Wschodni"],["TG","Togo"],["TK","Tokelau"],["TO","Tonga"],["TT","Trynidad i Tobago"],["TN","Tunezja"],["TR","Turcja"],["TM","Turkmenistan"],["TC","Turks i Caicos"],["TV","Tuvalu"],["UG","Uganda"],["UA","Ukraina"],["UY","Urugwaj"],["UZ","Uzbekistan"],["VU","Vanuatu"],["WF","Wallis i Futuna"],["VA","Watykan"],["VE","Wenezuela"],["GB","Wielka Brytania"],["VN","Wietnam"],["BV","Wyspa Bouveta"],["CX","Wyspa Bożego Narodzenia"],["IM","Wyspa Man"],["SH","Wyspa Świętej Heleny"],["AX","Wyspy Alandzkie"],["CK","Wyspy Cooka"],["VI","Wyspy Dziewicze Stanów Zjednoczonych"],["HM","Wyspy Heard i McDonalda"],["CC","Wyspy Kokosowe"],["MH","Wyspy Marshalla"],["FO","Wyspy Owcze"],["SB","Wyspy Salomona"],["ST","Wyspy Świętego Tomasza i Książęca"],["HU","Węgry"],["IT","Włochy"],["ZM","Zambia"],["ZW","Zimbabwe"],["AE","Zjednoczone Emiraty Arabskie"],["LV","Łotwa"]];
const RADIO_PANEL_LANGUAGES = [["","Dowolny język"],["polish","polski"],["english","angielski"],["german","niemiecki"],["french","francuski"],["spanish","hiszpański"],["italian","włoski"],["ukrainian","ukraiński"],["russian","rosyjski"],["czech","czeski"],["slovak","słowacki"],["dutch","niderlandzki"],["portuguese","portugalski"],["swedish","szwedzki"],["norwegian","norweski"],["danish","duński"],["finnish","fiński"],["greek","grecki"],["turkish","turecki"],["arabic","arabski"]];
const RADIO_PANEL_VERSION = "1.7.15";
const RADIO_PLAY_LOGO_URL = `/radio_panel/radio-play-logo.png?v=${RADIO_PANEL_VERSION}`;


class RadioPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._loaded = false;
    this._loading = false;
    this._stations = [];
    this._data = {
      favorites: {},
      stats: {},
      settings: {
        auto_favorite: true,
        auto_favorite_plays: 3,
        auto_favorite_minutes: 20,
      },
    };
    this._section = "discover";
    this._discoverMode = "popular";
    this._message = "";
    this._messageKind = "info";
    this._currentStation = null;
    this._sessionActive = false;
    this._listenSecondsPending = 0;
    this._listenTimer = null;
    this._messageTimer = null;
    this._metadataTimer = null;
    this._metadataLoading = false;
    this._playerClockTimer = null;
    this._externalPlayerSignature = "";
    this._nowPlaying = {
      title: "",
      artist: "",
      rawTitle: "",
      metadataAvailable: false,
    };
    this._trackElapsedBase = 0;
    this._trackClockStartedAt = 0;

    // Stan stabilnego odtwarzania i automatycznego ponownego łączenia.
    this._wantsPlayback = false;
    this._manualStop = true;
    this._connectionState = "idle";
    this._connectionDetail = "";
    this._playbackMode = "";
    this._hlsToken = "";
    this._changingSource = false;
    this._ignorePauseUntil = 0;
    this._preferProxyForCurrent = false;
    this._pendingPlayRegistration = false;
    this._playToken = 0;
    this._reconnectAttempt = 0;
    this._reconnectTimer = null;
    this._reconnectInProgress = false;
    this._reconnectDelays = [1000, 3000, 7000, 15000, 30000]; // po tej sekwencji ponawiaj co 30 s bez limitu
    this._watchdogTimer = null;
    this._lastMediaProgressAt = 0;
    this._lastMediaTime = 0;
    this._lastBufferedEnd = 0;
    this._volumeChangeTimer = null;
    this._playerDismissed = false;
    this._failedLogoUrls = new Set();
    this._globalPlayerHost = null;
    this._radioBrowserStatus = null;
    this._radioBrowserPromptVisible = false;
    this._radioBrowserPromptHandled = false;
    this._backgroundPlaybackInterrupted = false;
    this._wasHiddenDuringPlayback = false;
    this._resumeAfterVisibilityPromise = null;
    this._mediaArtworkCache = new Map();
    this._mediaArtworkLoading = new Set();
    this._diagnosticClientId = sessionStorage.getItem("radio_panel_diagnostic_client_id")
      || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("radio_panel_diagnostic_client_id", this._diagnosticClientId);
    this._diagnosticQueue = [];
    this._diagnosticFlushTimer = null;
    this._diagnosticFlushPromise = null;
    this._diagnosticsText = "";
    this._diagnosticsLoading = false;
    this._loadDiagnosticQueue();

    this._searchFilters = {
      query: "",
      countrycode: localStorage.getItem("radio_panel_country") || "PL",
      language: localStorage.getItem("radio_panel_language") || "",
      tag: "",
      httpsOnly: localStorage.getItem("radio_panel_https_only") === "true",
    };

    const previousController = window.__radioPanelController;
    if (previousController && previousController !== this) {
      this._adoptControllerState(previousController);
    } else {
      this._audio = new Audio();
    }
    this._prepareSharedAudioElement();
    this._configureBrowserAudioSession();
    this._installSharedAudioListeners();
    this._installPageLifecycleListeners();
    this._installMediaSessionHandlers();
    window.__radioPanelController = this;
    this._diag("frontend_panel_constructed", {
      version: RADIO_PANEL_VERSION,
      ios_device: this._isIOSDevice(),
      user_agent: navigator.userAgent || "",
    });
    window.queueMicrotask(() => {
      this._ensureGlobalPlayer();
      this._updateGlobalPlayerContent();
    });
  }


  _adoptControllerState(previous) {
    const timerFields = [
      "_listenTimer",
      "_messageTimer",
      "_metadataTimer",
      "_playerClockTimer",
      "_reconnectTimer",
      "_watchdogTimer",
      "_volumeChangeTimer",
      "_diagnosticFlushTimer",
    ];
    for (const field of timerFields) {
      const timer = previous[field];
      if (timer) {
        window.clearTimeout(timer);
        window.clearInterval(timer);
      }
      previous[field] = null;
    }

    const stateFields = [
      "_hass", "_loaded", "_loading", "_stations", "_data", "_section", "_discoverMode",
      "_message", "_messageKind", "_currentStation", "_sessionActive", "_listenSecondsPending",
      "_externalPlayerSignature", "_nowPlaying", "_trackElapsedBase", "_trackClockStartedAt",
      "_wantsPlayback", "_manualStop", "_connectionState", "_connectionDetail", "_playbackMode", "_hlsToken",
      "_changingSource", "_ignorePauseUntil", "_preferProxyForCurrent", "_pendingPlayRegistration",
      "_playToken", "_reconnectAttempt", "_lastMediaProgressAt", "_lastMediaTime",
      "_lastBufferedEnd", "_playerDismissed", "_failedLogoUrls", "_searchFilters",
      "_radioBrowserStatus", "_radioBrowserPromptVisible", "_radioBrowserPromptHandled",
      "_backgroundPlaybackInterrupted", "_wasHiddenDuringPlayback",
      "_mediaArtworkCache", "_mediaArtworkLoading", "_diagnosticClientId",
      "_diagnosticQueue", "_diagnosticsText",
    ];
    for (const field of stateFields) {
      if (previous[field] !== undefined) this[field] = previous[field];
    }
    this._audio = previous._audio || new Audio();
    this._metadataLoading = false;
    this._reconnectInProgress = false;
    this._listenTimer = null;
    this._messageTimer = null;
    this._metadataTimer = null;
    this._playerClockTimer = null;
    this._reconnectTimer = null;
    this._watchdogTimer = null;
    this._volumeChangeTimer = null;
    this._diagnosticFlushTimer = null;
    this._diagnosticFlushPromise = null;
    this._diagnosticsLoading = false;
    this._resumeAfterVisibilityPromise = null;
  }

  _isIOSDevice() {
    const userAgent = navigator.userAgent || "";
    return /iPad|iPhone|iPod/i.test(userAgent)
      || (navigator.platform === "MacIntel" && Number(navigator.maxTouchPoints || 0) > 1);
  }

  _loadDiagnosticQueue() {
    try {
      const stored = JSON.parse(localStorage.getItem("radio_panel_diagnostic_queue") || "[]");
      if (Array.isArray(stored)) this._diagnosticQueue = stored.slice(-250);
    } catch (_error) {
      this._diagnosticQueue = [];
    }
  }

  _persistDiagnosticQueue() {
    try {
      localStorage.setItem(
        "radio_panel_diagnostic_queue",
        JSON.stringify(this._diagnosticQueue.slice(-250))
      );
    } catch (_error) {}
  }

  _diagnosticSnapshot() {
    const audio = this._audio;
    let bufferedEnd = 0;
    try {
      if (audio?.buffered?.length) bufferedEnd = Number(audio.buffered.end(audio.buffered.length - 1) || 0);
    } catch (_error) {}
    let sourceKind = "none";
    let sourceHost = "";
    try {
      if (audio?.src) {
        const parsed = new URL(audio.src, window.location.href);
        sourceHost = parsed.host;
        sourceKind = parsed.pathname.includes("/api/radio_panel/hls/")
          ? "home_assistant_hls"
          : parsed.pathname.includes("/api/radio_panel/stream/")
            ? "home_assistant_proxy"
            : "direct_station";
      }
    } catch (_error) {
      sourceKind = audio?.src ? "unknown" : "none";
    }
    return {
      visibility: document.visibilityState,
      online: navigator.onLine,
      output: this._selectedOutput?.() || "browser",
      wants_playback: Boolean(this._wantsPlayback),
      manual_stop: Boolean(this._manualStop),
      session_active: Boolean(this._sessionActive),
      connection_state: this._connectionState || "",
      playback_mode: this._playbackMode || "",
      source_kind: sourceKind,
      source_host: sourceHost,
      station_uuid: this._currentStation?.stationuuid || "",
      station_name: this._currentStation?.name || "",
      audio_paused: audio ? Boolean(audio.paused) : null,
      audio_ended: audio ? Boolean(audio.ended) : null,
      audio_ready_state: audio?.readyState ?? null,
      audio_network_state: audio?.networkState ?? null,
      audio_current_time: audio ? Number(audio.currentTime || 0) : 0,
      audio_buffered_end: bufferedEnd,
      audio_error_code: audio?.error?.code ?? null,
      audio_error_message: audio?.error?.message || "",
      audio_session_supported: Boolean(navigator.audioSession),
      audio_session_type: navigator.audioSession?.type || "",
      audio_session_state: navigator.audioSession?.state || "",
      media_session_state: navigator.mediaSession?.playbackState || "",
      page_frozen: Boolean(document.wasDiscarded),
    };
  }

  _diag(event, details = {}) {
    const record = {
      time: new Date().toISOString(),
      client_id: this._diagnosticClientId || "unknown",
      event: String(event || "frontend_event"),
      details: { ...this._diagnosticSnapshot(), ...details },
    };
    this._diagnosticQueue.push(record);
    if (this._diagnosticQueue.length > 250) this._diagnosticQueue.splice(0, this._diagnosticQueue.length - 250);
    this._persistDiagnosticQueue();
    this._scheduleDiagnosticFlush();
  }

  _scheduleDiagnosticFlush(delay = 700) {
    if (!this._hass || this._diagnosticFlushTimer || this._diagnosticFlushPromise) return;
    this._diagnosticFlushTimer = window.setTimeout(() => {
      this._diagnosticFlushTimer = null;
      this._flushDiagnosticQueue();
    }, delay);
  }

  async _flushDiagnosticQueue() {
    if (!this._hass || !this._diagnosticQueue.length) return;
    if (this._diagnosticFlushPromise) return this._diagnosticFlushPromise;
    const batch = this._diagnosticQueue.slice(0, 40);
    this._diagnosticFlushPromise = this._hass.callWS({
      type: "radio_panel/diagnostics_event",
      events: batch,
    }).then(() => {
      this._diagnosticQueue.splice(0, batch.length);
      this._persistDiagnosticQueue();
    }).catch(() => {
      // Keep the local queue. It will be sent after the iPhone wakes up.
    }).finally(() => {
      this._diagnosticFlushPromise = null;
      if (this._diagnosticQueue.length) this._scheduleDiagnosticFlush(1500);
    });
    return this._diagnosticFlushPromise;
  }

  _setDiagnosticOutput(value) {
    this._diagnosticsText = String(value || "");
    const output = this.shadowRoot?.querySelector("#diagnostics-output");
    if (output) output.value = this._diagnosticsText;
    const status = this.shadowRoot?.querySelector("#diagnostics-status");
    if (status) status.textContent = this._diagnosticsLoading ? "Pobieranie…" : "";
  }

  async _startDiagnosticTest() {
    if (!this._hass) return;
    this._diagnosticsLoading = true;
    this._setDiagnosticOutput("Czyszczenie poprzednich danych…");
    try {
      await this._hass.callWS({ type: "radio_panel/clear_diagnostics" });
      this._diagnosticQueue = [];
      this._persistDiagnosticQueue();
      this._diag("frontend_diagnostic_test_started", {
        test_instruction: "start radio, lock screen for more than 6 minutes, unlock and collect report",
      });
      await this._flushDiagnosticQueue();
      this._setDiagnosticOutput(
        "Test rozpoczęty. Włącz stację, zablokuj ekran na co najmniej 6–7 minut, " +
        "odblokuj telefon, wróć do Ustawień i wybierz „Pobierz wynik”."
      );
    } catch (error) {
      this._setDiagnosticOutput(`Nie udało się rozpocząć testu: ${this._errorText(error)}`);
    } finally {
      this._diagnosticsLoading = false;
      this._setDiagnosticOutput(this._diagnosticsText);
    }
  }

  async _refreshDiagnostics() {
    if (!this._hass || this._diagnosticsLoading) return;
    this._diagnosticsLoading = true;
    this._setDiagnosticOutput("Pobieranie diagnostyki…");
    try {
      this._diag("frontend_diagnostic_report_requested");
      await this._flushDiagnosticQueue();
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      const result = await this._hass.callWS({
        type: "radio_panel/get_diagnostics",
        limit: 1000,
      });
      const report = {
        radio_panel_version: RADIO_PANEL_VERSION,
        generated_at: new Date().toISOString(),
        client: {
          user_agent: navigator.userAgent || "",
          platform: navigator.platform || "",
          language: navigator.language || "",
          ios_device: this._isIOSDevice(),
          screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
          device_pixel_ratio: window.devicePixelRatio || 1,
          snapshot: this._diagnosticSnapshot(),
        },
        pending_frontend_events: this._diagnosticQueue,
        home_assistant_diagnostics: result,
      };
      this._setDiagnosticOutput(JSON.stringify(report, null, 2));
    } catch (error) {
      this._setDiagnosticOutput(`Nie udało się pobrać diagnostyki: ${this._errorText(error)}`);
    } finally {
      this._diagnosticsLoading = false;
      this._setDiagnosticOutput(this._diagnosticsText);
    }
  }

  async _copyDiagnostics() {
    if (!this._diagnosticsText || !this._diagnosticsText.trim().startsWith("{")) {
      await this._refreshDiagnostics();
    }
    const text = this._diagnosticsText || "";
    try {
      await navigator.clipboard.writeText(text);
      this._setMessage("Raport diagnostyczny skopiowany do schowka.", "success");
    } catch (_error) {
      const output = this.shadowRoot?.querySelector("#diagnostics-output");
      output?.focus();
      output?.select();
      try {
        document.execCommand("copy");
        this._setMessage("Raport diagnostyczny skopiowany do schowka.", "success");
      } catch (_copyError) {
        this._setMessage("Zaznacz raport i skopiuj go ręcznie.", "error");
      }
    }
  }

  _configureBrowserAudioSession() {
    // Od iOS 17 WebKit udostępnia Audio Session API. Domyślny tryb
    // „ambient” może zostać zawieszony po zablokowaniu ekranu. Tryb
    // „playback” informuje system, że radio jest głównym dźwiękiem i ma
    // kontynuować pracę w tle oraz na ekranie blokady.
    const audioSession = navigator.audioSession;
    if (!audioSession) return false;
    try {
      if (audioSession.type !== "playback") audioSession.type = "playback";
      if (
        !window.__radioPanelAudioSessionListenerInstalled
        && typeof audioSession.addEventListener === "function"
      ) {
        window.__radioPanelAudioSessionListenerInstalled = true;
        audioSession.addEventListener("statechange", () => {
          const panel = window.__radioPanelController;
          if (!panel) return;
          const state = String(navigator.audioSession?.state || "");
          panel._diag("frontend_audio_session_statechange", { new_state: state });
          if (state === "active") {
            panel._backgroundPlaybackInterrupted = false;
            panel._lastMediaProgressAt = Date.now();
          } else if (
            state === "interrupted"
            && panel._selectedOutput() === "browser"
            && panel._wantsPlayback
            && !panel._manualStop
          ) {
            panel._backgroundPlaybackInterrupted = true;
          }
          panel._updateMediaSession();
        });
      }
      return audioSession.type === "playback";
    } catch (error) {
      console.debug("Radio Panel: Audio Session API nie jest dostępne", error);
      return false;
    }
  }

  _prepareSharedAudioElement() {
    const audio = this._audio;
    if (!audio) return;
    audio.preload = "auto";
    audio.playsInline = true;
    audio.controls = false;
    audio.setAttribute("playsinline", "");
    audio.setAttribute("webkit-playsinline", "");
    audio.setAttribute("x-webkit-airplay", "allow");
    audio.setAttribute("aria-hidden", "true");
    audio.dataset.radioPanelAudio = "true";

    const attach = () => {
      if (!document.body || audio.isConnected) return;
      // Na iOS element audio pozostawiony wyłącznie w pamięci bywa zawieszany
      // po zablokowaniu ekranu. Trzymamy go w DOM, ale poza widocznym obszarem.
      Object.assign(audio.style, {
        position: "fixed",
        left: "-20px",
        bottom: "0",
        width: "1px",
        height: "1px",
        opacity: "0.001",
        pointerEvents: "none",
        zIndex: "-1",
      });
      document.body.appendChild(audio);
    };
    if (document.body) attach();
    else document.addEventListener("DOMContentLoaded", attach, { once: true });
  }

  _installPageLifecycleListeners() {
    if (window.__radioPanelLifecycleListenersInstalled) return;
    window.__radioPanelLifecycleListenersInstalled = true;
    const current = () => window.__radioPanelController;
    const logAndHandle = (eventName, event = null) => {
      const panel = current();
      if (!panel) return;
      panel._diag(`frontend_lifecycle_${eventName}`, {
        persisted: Boolean(event?.persisted),
      });
      panel._handlePageVisibilityChange();
    };
    document.addEventListener("visibilitychange", (event) => logAndHandle("visibilitychange", event), { passive: true });
    window.addEventListener("pageshow", (event) => logAndHandle("pageshow", event), { passive: true });
    window.addEventListener("pagehide", (event) => {
      const panel = current();
      panel?._diag("frontend_lifecycle_pagehide", { persisted: Boolean(event.persisted) });
      panel?._flushDiagnosticQueue();
    }, { passive: true });
    window.addEventListener("focus", (event) => logAndHandle("focus", event), { passive: true });
    window.addEventListener("blur", () => current()?._diag("frontend_lifecycle_blur"), { passive: true });
    window.addEventListener("online", (event) => logAndHandle("online", event), { passive: true });
    window.addEventListener("offline", () => current()?._diag("frontend_lifecycle_offline"), { passive: true });
    document.addEventListener("freeze", () => {
      const panel = current();
      panel?._diag("frontend_lifecycle_freeze");
      panel?._flushDiagnosticQueue();
    }, { passive: true });
    document.addEventListener("resume", (event) => logAndHandle("resume", event), { passive: true });
  }

  _handlePageVisibilityChange() {
    this._configureBrowserAudioSession();
    const hidden = document.visibilityState !== "visible";
    this._diag("frontend_visibility_snapshot", { hidden });
    const browserPlayback = this._selectedOutput() === "browser";
    if (hidden) {
      this._wasHiddenDuringPlayback = Boolean(
        browserPlayback && this._wantsPlayback && !this._manualStop
      );
      if (this._isIOSDevice() && this._wasHiddenDuringPlayback) {
        // iOS ogranicza timery oraz odświeżanie currentTime w WKWebView.
        // Watchdog uruchomiony w tym stanie mógł błędnie uznać działający
        // strumień za zawieszony i samodzielnie go zamknąć.
        this._stopPlaybackWatchdog();
        this._stopMetadataPolling();
        this._lastMediaProgressAt = Date.now();
        this._updateMediaSession();
      }
      return;
    }

    this._lastMediaProgressAt = Date.now();
    if (
      this._isIOSDevice()
      && this._wasHiddenDuringPlayback
      && browserPlayback
      && this._wantsPlayback
      && !this._manualStop
    ) {
      this._restoreAfterIOSBackground();
    } else if (browserPlayback && this._wantsPlayback && !this._manualStop) {
      this._startPlaybackWatchdog();
      this._startMetadataPolling(true);
    }
    this._wasHiddenDuringPlayback = false;
  }

  async _restoreAfterIOSBackground() {
    if (this._resumeAfterVisibilityPromise) return this._resumeAfterVisibilityPromise;
    this._resumeAfterVisibilityPromise = (async () => {
      if (!this._currentStation || !this._wantsPlayback || this._manualStop) return;
      this._prepareSharedAudioElement();

      if (!this._audio.paused && !this._audio.error) {
        this._backgroundPlaybackInterrupted = false;
        this._sessionActive = true;
        this._connectionState = "playing";
        this._connectionDetail = "";
        this._markMediaProgress();
        this._resumeTrackClock();
        this._startListenTimer();
        this._startPlaybackWatchdog();
        this._startMetadataPolling(true);
        this._updatePlayerContent();
        this._updateMediaSession();
        return;
      }

      this._connectionState = "reconnecting";
      this._connectionDetail = "wznawianie po odblokowaniu ekranu…";
      this._updatePlayerContent();
      try {
        if (this._audio.src && !this._audio.error) {
          await this._audio.play();
        } else {
          const token = this._playToken;
          await this._playBrowserStation(this._currentStation, {
            forceProxy: false,
            reconnect: true,
            token,
          });
        }
        this._backgroundPlaybackInterrupted = false;
      } catch (error) {
        console.warn("Radio Panel: iOS nie wznowił odtwarzania po odblokowaniu", error);
        this._connectionState = "paused";
        this._connectionDetail = "dotknij Play, aby wznowić";
        this._updatePlayerContent();
      }
    })().finally(() => {
      this._resumeAfterVisibilityPromise = null;
    });
    return this._resumeAfterVisibilityPromise;
  }

  _deferIOSBackgroundFailure(reason) {
    if (
      !this._isIOSDevice()
      || document.visibilityState === "visible"
      || this._selectedOutput() !== "browser"
      || !this._wantsPlayback
      || this._manualStop
    ) return false;
    this._backgroundPlaybackInterrupted = true;
    this._wasHiddenDuringPlayback = true;
    this._sessionActive = false;
    this._pauseTrackClock();
    this._stopListenTimer(true);
    this._stopPlaybackWatchdog();
    this._stopMetadataPolling();
    console.debug(`Radio Panel: odroczono reakcję na zdarzenie iOS w tle: ${reason}`);
    this._updateMediaSession();
    return true;
  }

  _installMediaSessionHandlers() {
    if (!("mediaSession" in navigator) || window.__radioPanelMediaSessionHandlersInstalled) return;
    window.__radioPanelMediaSessionHandlersInstalled = true;
    const run = (action) => {
      const panel = window.__radioPanelController;
      if (!panel) return;
      Promise.resolve(action(panel)).catch((error) => {
        console.warn("Radio Panel: błąd Media Session", error);
      });
    };
    const handlers = {
      play: (panel) => panel._playFromSystemControls(),
      pause: (panel) => panel._pause(),
      stop: (panel) => panel._stop(),
    };
    for (const [action, handler] of Object.entries(handlers)) {
      try {
        navigator.mediaSession.setActionHandler(action, () => run(handler));
      } catch (_error) {
        // Starsze wersje iOS nie udostępniają wszystkich akcji.
      }
    }
  }

  async _playFromSystemControls() {
    if (!this._currentStation) return;
    this._configureBrowserAudioSession();
    this._wantsPlayback = true;
    this._manualStop = false;
    if (this._selectedOutput() !== "browser") {
      await this._resume();
      return;
    }
    try {
      if (this._audio.src && !this._audio.error) await this._audio.play();
      else await this._playBrowserStation(this._currentStation, {
        forceProxy: false,
        reconnect: true,
        token: this._playToken,
      });
    } catch (_error) {
      await this._play(this._currentStation);
    }
  }

  _applyMediaSessionMetadata(artworkUrl = RADIO_PLAY_LOGO_URL) {
    if (!("mediaSession" in navigator) || !("MediaMetadata" in window) || !this._currentStation) return;
    const data = this._playerData();
    const logo = this._absoluteLogoUrl(artworkUrl || RADIO_PLAY_LOGO_URL);
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.title || data.stationName,
        artist: data.artist || data.stationName,
        album: data.stationName || "Radio Play",
        artwork: logo ? [{ src: logo, sizes: "512x512" }] : [],
      });
    } catch (_error) {}
  }

  async _prepareMediaSessionArtwork(station) {
    if (!station?.stationuuid || !station.favicon || !this._hass) return;
    const uuid = station.stationuuid;
    if (this._mediaArtworkCache.has(uuid) || this._mediaArtworkLoading.has(uuid)) return;
    this._mediaArtworkLoading.add(uuid);
    try {
      const cacheKey = String(Math.abs(this._hashText(station.favicon)));
      const unsignedPath = `/api/radio_panel/logo/${encodeURIComponent(uuid)}/${cacheKey}`;
      const signed = await this._hass.callWS({
        type: "auth/sign_path",
        path: unsignedPath,
        expires: 43200,
      });
      if (!signed?.path) return;
      const url = this._absoluteLogoUrl(signed.path);
      this._mediaArtworkCache.set(uuid, url);
      if (this._currentStation?.stationuuid === uuid) this._applyMediaSessionMetadata(url);
    } catch (error) {
      console.debug("Radio Panel: nie udało się przygotować grafiki Media Session", error);
    } finally {
      this._mediaArtworkLoading.delete(uuid);
    }
  }

  _hashText(value) {
    let hash = 0;
    for (const char of String(value || "")) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    return hash;
  }

  _updateMediaSession() {
    if (!("mediaSession" in navigator)) return;
    const station = this._currentStation;
    if (!station) {
      try { navigator.mediaSession.metadata = null; } catch (_error) {}
      try { navigator.mediaSession.playbackState = "none"; } catch (_error) {}
      return;
    }
    const artwork = this._mediaArtworkCache.get(station.stationuuid) || RADIO_PLAY_LOGO_URL;
    this._applyMediaSessionMetadata(artwork);
    if (station.favicon && !this._mediaArtworkCache.has(station.stationuuid)) {
      this._prepareMediaSessionArtwork(station);
    }
    try {
      const iosBackgroundPlayback = Boolean(
        this._isIOSDevice()
        && document.visibilityState !== "visible"
        && this._selectedOutput() === "browser"
        && this._wantsPlayback
        && !this._manualStop
      );
      navigator.mediaSession.playbackState = iosBackgroundPlayback || (this._wantsPlayback && !this._audio.paused)
        ? "playing"
        : this._connectionState === "paused" || this._backgroundPlaybackInterrupted
          ? "paused"
          : "none";
    } catch (_error) {}
  }

  _installSharedAudioListeners() {
    const audio = this._audio;
    if (!audio || audio.__radioPanelSharedListeners) return;
    Object.defineProperty(audio, "__radioPanelSharedListeners", {
      value: true,
      configurable: false,
      enumerable: false,
      writable: false,
    });
    const current = () => window.__radioPanelController;

    audio.addEventListener("playing", () => {
      const panel = current();
      if (!panel) return;
      const restored = panel._connectionState === "reconnecting" || panel._reconnectAttempt > 0;
      panel._diag("frontend_audio_playing", { restored });
      panel._sessionActive = true;
      panel._connectionState = "playing";
      panel._connectionDetail = panel._playbackMode === "direct" ? "połączenie bezpośrednie" : "przez Home Assistant";
      panel._reconnectAttempt = 0;
      panel._reconnectInProgress = false;
      panel._backgroundPlaybackInterrupted = false;
      panel._clearReconnectTimer();
      panel._markMediaProgress();
      panel._startListenTimer();
      panel._startPlaybackWatchdog();
      panel._resumeTrackClock();
      panel._startMetadataPolling(true);
      panel._startPlayerClock();
      panel._updatePlayerContent();
      panel._updatePlayerDynamic();
      panel._updateMediaSession();
      if (restored) panel._setMessage("Połączenie z radiem zostało przywrócone.", "success");
    });

    for (const eventName of ["timeupdate", "progress", "canplay", "loadeddata"]) {
      audio.addEventListener(eventName, () => {
        const panel = current();
        if (!panel) return;
        panel._markMediaProgress();
        panel._updatePlayerDynamic();
      });
    }

    for (const eventName of ["loadstart", "loadedmetadata", "canplay", "suspend", "abort", "emptied"]) {
      audio.addEventListener(eventName, () => {
        const panel = current();
        panel?._diag(`frontend_audio_${eventName}`);
      });
    }

    for (const eventName of ["waiting", "stalled"]) {
      audio.addEventListener(eventName, () => {
        const panel = current();
        if (!panel || !panel._wantsPlayback || panel._manualStop || panel._changingSource) return;
        panel._diag(`frontend_audio_${eventName}`);
        if (panel._isIOSDevice() && document.visibilityState !== "visible") return;
        panel._connectionState = "buffering";
        panel._connectionDetail = "buforowanie strumienia…";
        panel._updatePlayerContent();
        panel._startPlaybackWatchdog();
      });
    }

    audio.addEventListener("pause", () => {
      const panel = current();
      if (!panel) return;
      const unexpected = Boolean(
        panel._wantsPlayback
        && !panel._manualStop
        && !panel._changingSource
        && Date.now() >= panel._ignorePauseUntil
        && panel._selectedOutput() === "browser"
      );
      panel._diag(unexpected ? "frontend_unexpected_pause" : "frontend_audio_pause", {
        unexpected,
        changing_source: panel._changingSource,
        ignore_pause_until: panel._ignorePauseUntil,
      });
      if (
        panel._changingSource ||
        Date.now() < panel._ignorePauseUntil ||
        panel._selectedOutput() !== "browser"
      ) return;
      if (panel._wantsPlayback && !panel._manualStop) {
        if (panel._deferIOSBackgroundFailure("odtwarzanie zostało wstrzymane przez system")) return;
        panel._handlePlaybackFailure("odtwarzanie zostało nieoczekiwanie wstrzymane");
        return;
      }
      panel._sessionActive = false;
      panel._pauseTrackClock();
      panel._stopListenTimer(true);
      panel._stopPlaybackWatchdog();
      panel._stopMetadataPolling();
      panel._render();
      panel._updateGlobalPlayerContent();
    });

    audio.addEventListener("ended", () => {
      const panel = current();
      if (!panel) return;
      panel._diag("frontend_audio_ended");
      if (!panel._wantsPlayback || panel._manualStop || panel._changingSource) return;
      const reason = "strumień został zakończony przez serwer";
      if (panel._deferIOSBackgroundFailure(reason)) return;
      panel._handlePlaybackFailure(reason);
    });

    audio.addEventListener("error", () => {
      const panel = current();
      if (!panel) return;
      const code = audio.error?.code;
      panel._diag("frontend_audio_error", {
        media_error_code: code ?? null,
        media_error_message: audio.error?.message || "",
      });
      if (!panel._wantsPlayback || panel._manualStop || panel._changingSource) return;
      const reason = code ? `błąd odtwarzacza (kod ${code})` : "błąd odtwarzacza";
      if (panel._deferIOSBackgroundFailure(reason)) return;
      panel._handlePlaybackFailure(reason);
    });
  }

  set hass(value) {
    this._hass = value;
    window.__radioPanelController = this;
    this._scheduleDiagnosticFlush(50);
    this._ensureGlobalPlayer();
    if (!this._loaded) this._initialize();
    else this._syncExternalPlayerState();
    this._updateGlobalPlayerContent();
  }

  get hass() {
    return this._hass;
  }

  connectedCallback() {
    window.__radioPanelController = this;
    this._configureBrowserAudioSession();
    this._ensureGlobalPlayer();
    if (this._hass && !this._loaded) this._initialize();
    if (this._sessionActive) {
      this._startListenTimer();
      this._startPlaybackWatchdog();
      this._startMetadataPolling();
    }
    if (this._currentStation) this._startPlayerClock();
    if (this._wantsPlayback && this._connectionState === "reconnecting" && !this._reconnectTimer) {
      this._scheduleReconnect("powrót do panelu");
    }
    this._render();
    this._updateGlobalPlayerContent();
  }

  disconnectedCallback() {
    // Odtwarzacz jest globalny. Nie zatrzymujemy strumienia ani liczników przy
    // przejściu do innego panelu Home Assistanta.
    this._ensureGlobalPlayer();
    this._updateGlobalPlayerContent();
  }

  async _initialize(skipRadioBrowserCheck = false) {
    if (!this._hass || this._loading) return;
    this._loading = true;
    this._render();
    try {
      if (!skipRadioBrowserCheck && !this._radioBrowserPromptHandled) {
        this._radioBrowserStatus = await this._hass.callWS({
          type: "radio_panel/radio_browser_status",
        });
        if (!this._radioBrowserStatus?.configured) {
          this._radioBrowserPromptVisible = true;
          return;
        }
      }

      this._radioBrowserPromptVisible = false;
      this._data = await this._hass.callWS({ type: "radio_panel/get_data" });
      this._loaded = true;
      await this._loadPopular();
    } catch (error) {
      // Starsze wersje Home Assistanta mogą nie rozpoznać nowego polecenia
      // WebSocket. W takim przypadku nie blokujemy panelu i próbujemy go
      // uruchomić normalnie.
      if (!skipRadioBrowserCheck && !this._radioBrowserPromptHandled && !this._loaded) {
        this._radioBrowserPromptHandled = true;
        this._radioBrowserPromptVisible = false;
        this._loading = false;
        await this._initialize(true);
        return;
      }
      this._setMessage(this._errorText(error), "error");
    } finally {
      this._loading = false;
      this._render();
    }
  }

  _radioBrowserStartupDialog() {
    if (!this._radioBrowserPromptVisible) return "";
    return `
      <div class="startup-overlay" role="dialog" aria-modal="true" aria-labelledby="radio-browser-dialog-title">
        <section class="startup-dialog">
          <div class="startup-icon">${this._icon("radio")}</div>
          <h2 id="radio-browser-dialog-title">Brak integracji Radio Browser</h2>
          <p>Integracja <strong>Radio Browser</strong> nie jest skonfigurowana w Home Assistant.</p>
          <p class="startup-note">Panel może działać bez niej, ponieważ korzysta bezpośrednio z internetowego katalogu Radio Browser. Dodanie integracji jest jednak zalecane.</p>
          <div class="startup-actions">
            <button class="ghost-button" data-action="radio-browser-continue">Uruchom mimo to</button>
            <button class="primary-button" data-action="radio-browser-install">Dodaj Radio Browser</button>
          </div>
        </section>
      </div>
    `;
  }

  _openRadioBrowserSetup() {
    this._radioBrowserPromptVisible = false;
    this._render();
    const path = "/config/integrations/dashboard/add?domain=radio_browser";
    window.history.pushState(null, "", path);
    window.dispatchEvent(new Event("location-changed"));
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  _absoluteLogoUrl(value) {
    try {
      return new URL(value || RADIO_PLAY_LOGO_URL, window.location.href).href;
    } catch (_error) {
      return new URL(RADIO_PLAY_LOGO_URL, window.location.href).href;
    }
  }


  _icon(name, className = "") {
    const common = `class="rp-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"`;
    const icons = {
      play: `<svg ${common}><path d="M8.1 5.35c0-1.07 1.18-1.72 2.08-1.15l9.05 5.78a1.36 1.36 0 0 1 0 2.3l-9.05 5.77c-.9.58-2.08-.07-2.08-1.14V5.35Z" fill="currentColor"/></svg>`,
      pause: `<svg ${common}><rect x="6.3" y="4.6" width="4.2" height="14.8" rx="1.8" fill="currentColor"/><rect x="13.5" y="4.6" width="4.2" height="14.8" rx="1.8" fill="currentColor"/></svg>`,
      stop: `<svg ${common}><rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3.1" fill="currentColor"/></svg>`,
      heart: `<svg ${common}><path d="M12 20.1S3.8 15.2 3.8 9.3A4.45 4.45 0 0 1 12 6.9a4.45 4.45 0 0 1 8.2 2.4c0 5.9-8.2 10.8-8.2 10.8Z" fill="currentColor"/></svg>`,
      heartOutline: `<svg ${common}><path d="M12 20.1S3.8 15.2 3.8 9.3A4.45 4.45 0 0 1 12 6.9a4.45 4.45 0 0 1 8.2 2.4c0 5.9-8.2 10.8-8.2 10.8Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      radio: `<svg ${common}><rect x="3.5" y="7.2" width="17" height="12.2" rx="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m6.2 7.2 10.7-3.1" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="8.3" cy="13.3" r="2.5" fill="currentColor"/><path d="M14 11.3h3.8M14 14.1h3.8M14 16.9h2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
      search: `<svg ${common}><circle cx="10.7" cy="10.7" r="6.2" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="m15.4 15.4 4.2 4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      settings: `<svg ${common}><path d="M12 8.1a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M19.3 13.5c.08-.5.08-1 0-1.5l2-1.55-2-3.45-2.5 1a8 8 0 0 0-1.3-.75L15.1 4h-4l-.4 3.25c-.47.2-.9.45-1.3.75L6.9 7l-2 3.45 2 1.55a7.8 7.8 0 0 0 0 1.5l-2 1.55 2 3.45 2.5-1c.4.3.83.55 1.3.75l.4 3.25h4l.4-3.25c.47-.2.9-.45 1.3-.75l2.5 1 2-3.45-2-1.55Z" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/></svg>`,
      close: `<svg ${common}><path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>`,
      drag: `<svg ${common}><circle cx="8" cy="8" r="1.15" fill="currentColor"/><circle cx="12" cy="8" r="1.15" fill="currentColor"/><circle cx="16" cy="8" r="1.15" fill="currentColor"/><circle cx="8" cy="16" r="1.15" fill="currentColor"/><circle cx="12" cy="16" r="1.15" fill="currentColor"/><circle cx="16" cy="16" r="1.15" fill="currentColor"/></svg>`,
      volume: `<svg ${common}><path d="M4.2 9.3h3.15l4.2-3.45c.72-.59 1.8-.08 1.8.85v10.6c0 .93-1.08 1.44-1.8.85l-4.2-3.45H4.2A1.7 1.7 0 0 1 2.5 13V11a1.7 1.7 0 0 1 1.7-1.7Z" fill="currentColor"/><path d="M16 8.25a5.2 5.2 0 0 1 0 7.5M18.55 5.8a8.65 8.65 0 0 1 0 12.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      star: `<svg ${common}><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" fill="currentColor"/></svg>`,
    };
    return icons[name] || icons.radio;
  }

  _ensureGlobalPlayer() {
    if (!document.body) return null;
    let host = document.getElementById("radio-panel-global-player-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "radio-panel-global-player-host";
      document.body.appendChild(host);
      const root = host.attachShadow({ mode: "open" });
      root.innerHTML = `
        <style>
          :host { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif; }
          * { box-sizing: border-box; }
          [hidden] { display: none !important; }
          button { font: inherit; }
          .rp-icon { width: 22px; height: 22px; display: block; }
          .player {
            position: absolute; left: 50%; bottom: max(82px, calc(18px + env(safe-area-inset-bottom)));
            transform: translateX(-50%); width: min(820px, calc(100vw - 24px)); min-height: 104px;
            display: grid; grid-template-columns: 66px minmax(0, 1fr) auto; align-items: center; gap: 14px;
            padding: 15px 48px 15px 15px; color: #f8fafc; pointer-events: auto; touch-action: auto;
            border: 1px solid rgba(255,255,255,.16); border-radius: 24px;
            background: linear-gradient(145deg, rgba(32,35,43,.965), rgba(13,16,22,.975));
            box-shadow: 0 22px 60px rgba(0,0,0,.48), inset 0 1px 0 rgba(255,255,255,.08);
            -webkit-backdrop-filter: blur(26px) saturate(145%); backdrop-filter: blur(26px) saturate(145%);
            transition: opacity .2s ease, transform .2s ease, box-shadow .2s ease;
          }
          .player.dragging { transition: none; box-shadow: 0 28px 72px rgba(0,0,0,.58), 0 0 0 2px rgba(75,158,255,.3); }
          .drag-handle { position: absolute; top: 5px; left: 50%; transform: translateX(-50%); width: 48px; height: 22px; display: grid; place-items: center; border: 0; border-radius: 999px; background: transparent; color: rgba(226,232,240,.42); cursor: grab; pointer-events: auto; touch-action: none; }
          .drag-handle:active { cursor: grabbing; color: rgba(226,232,240,.85); }
          .drag-handle .rp-icon { width: 21px; height: 21px; }
          .close { position: absolute; top: 9px; right: 10px; width: 31px; height: 31px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.1); border-radius: 50%; background: rgba(255,255,255,.08); color: rgba(248,250,252,.82); cursor: pointer; }
          .close:hover { background: rgba(255,255,255,.16); color: #fff; }
          .close .rp-icon { width: 17px; height: 17px; }
          .logo-wrap { width: 66px; height: 66px; padding: 3px; border-radius: 17px; background: linear-gradient(145deg, rgba(255,255,255,.95), rgba(224,231,239,.86)); box-shadow: 0 8px 22px rgba(0,0,0,.28); }
          .logo-wrap img { width: 100%; height: 100%; display: block; object-fit: contain; border-radius: 14px; background: #fff; }
          .details { min-width: 0; }
          .heading { display: flex; align-items: center; gap: 10px; min-width: 0; }
          .station { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; font-weight: 760; letter-spacing: -.01em; }
          .status { margin-left: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: rgba(226,232,240,.68); }
          .status.reconnecting, .status.buffering { color: #ffd166; }
          .status.failed { color: #ff8585; }
          .track { margin-top: 7px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 16px; font-weight: 700; letter-spacing: -.012em; }
          .artist { color: rgba(226,232,240,.72); font-weight: 500; }
          .time-row { display: grid; grid-template-columns: auto minmax(80px, 1fr) auto; align-items: center; gap: 9px; margin-top: 9px; font-size: 11px; font-variant-numeric: tabular-nums; color: rgba(226,232,240,.67); }
          .progress { position: relative; height: 4px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.15); }
          .progress > i { display: block; height: 100%; width: 0; border-radius: inherit; background: linear-gradient(90deg, #46a3ff, #7fc3ff); transition: width .3s linear; }
          .progress.live::after { content: ""; position: absolute; top: 0; bottom: 0; width: 30%; border-radius: inherit; background: linear-gradient(90deg, transparent, #65b4ff, transparent); animation: rp-live 1.8s ease-in-out infinite; }
          @keyframes rp-live { from { left: -35%; } to { left: 105%; } }
          .control-stack { min-width: 224px; display: flex; flex-direction: column; align-items: stretch; gap: 9px; }
          .controls { display: flex; align-items: center; justify-content: center; gap: 8px; }
          .volume-control { display: grid; grid-template-columns: 20px minmax(90px, 1fr) 38px; align-items: center; gap: 8px; min-height: 28px; padding: 3px 7px; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; background: rgba(255,255,255,.055); color: rgba(226,232,240,.82); touch-action: pan-x; }
          .volume-control .rp-icon { width: 17px; height: 17px; }
          .volume-control input { width: 100%; min-width: 0; margin: 0; accent-color: #58adff; cursor: pointer; touch-action: pan-x; }
          .volume-control input:disabled { cursor: default; opacity: .38; }
          .volume-control output { min-width: 36px; text-align: right; color: rgba(226,232,240,.72); font-size: 11px; font-variant-numeric: tabular-nums; }
          .control { width: 43px; height: 43px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.11); border-radius: 50%; background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.065)); color: #f8fafc; box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 5px 12px rgba(0,0,0,.18); cursor: pointer; transition: transform .12s ease, background .12s ease; }
          .control:hover:not(:disabled) { transform: translateY(-1px); background: rgba(255,255,255,.19); }
          .control:active:not(:disabled) { transform: scale(.94); }
          .control:disabled { opacity: .34; cursor: default; }
          .control.primary { background: linear-gradient(145deg, #64b5ff, #1677ee); border-color: rgba(156,211,255,.6); box-shadow: 0 7px 18px rgba(17,119,238,.34), inset 0 1px 0 rgba(255,255,255,.35); }
          .control.favorite { width: 37px; height: 37px; color: rgba(248,250,252,.82); }
          .control.favorite.active { color: #ff6f91; }
          .control .rp-icon { width: 20px; height: 20px; }
          .reopen { position: absolute; right: 18px; bottom: max(22px, calc(14px + env(safe-area-inset-bottom))); width: 54px; height: 54px; display: grid; place-items: center; pointer-events: auto; border: 1px solid rgba(255,255,255,.16); border-radius: 18px; background: linear-gradient(145deg, rgba(48,53,65,.97), rgba(14,17,23,.98)); color: #79bdff; box-shadow: 0 14px 35px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.1); cursor: pointer; }
          .reopen .rp-icon { width: 28px; height: 28px; }
          @media (max-width: 640px) {
            .player { width: calc(100vw - 16px); min-height: 160px; grid-template-columns: 54px minmax(0,1fr); align-items: start; gap: 11px; padding: 28px 42px 13px 12px; border-radius: 22px; }
            .logo-wrap { width: 54px; height: 54px; border-radius: 15px; }
            .logo-wrap img { border-radius: 12px; }
            .heading { display: block; }
            .status { display: block; margin: 4px 0 0; }
            .track { font-size: 14px; }
            .control-stack { grid-column: 1 / -1; width: min(310px, 100%); justify-self: center; margin-top: 2px; }
            .controls { justify-content: center; }
            .control { width: 42px; height: 42px; }
          }
        </style>
        <section id="player" class="player" hidden aria-label="Odtwarzacz Radio Play">
          <button class="drag-handle" data-action="drag" title="Przeciągnij odtwarzacz. Kliknij dwukrotnie, aby przywrócić położenie.">${this._icon("drag")}</button>
          <button class="close" data-action="close" title="Ukryj odtwarzacz" aria-label="Ukryj odtwarzacz">${this._icon("close")}</button>
          <div class="logo-wrap"><img data-role="logo" src="${RADIO_PLAY_LOGO_URL}" alt="Logo stacji" referrerpolicy="no-referrer"></div>
          <div class="details">
            <div class="heading"><strong class="station" data-role="station"></strong><span class="status" data-role="status"></span></div>
            <div class="track" data-role="track"><span class="artist" data-role="artist"></span><span data-role="title"></span></div>
            <div class="time-row"><span data-role="position">00:00</span><div class="progress live" data-role="progress-track"><i data-role="progress"></i></div><span data-role="duration">LIVE</span></div>
          </div>
          <div class="control-stack">
            <div class="controls">
              <button class="control primary" data-action="play" title="Odtwórz" aria-label="Odtwórz">${this._icon("play")}</button>
              <button class="control" data-action="pause" title="Pauza" aria-label="Pauza">${this._icon("pause")}</button>
              <button class="control" data-action="stop" title="Stop" aria-label="Stop">${this._icon("stop")}</button>
              <button class="control favorite" data-action="favorite" title="Ulubione" aria-label="Ulubione">${this._icon("heartOutline")}</button>
            </div>
            <label class="volume-control" title="Głośność">
              ${this._icon("volume")}
              <input data-action="volume" type="range" min="0" max="100" step="1" value="80" aria-label="Głośność">
              <output data-role="volume-value">80%</output>
            </label>
          </div>
        </section>
        <button id="reopen" class="reopen" data-action="reopen" hidden title="Pokaż odtwarzacz" aria-label="Pokaż odtwarzacz">${this._icon("radio")}</button>
      `;
      this._bindGlobalPlayerEvents(host);
    }
    this._globalPlayerHost = host;
    return host;
  }

  _bindGlobalPlayerEvents(host) {
    if (host.__radioPanelBound) return;
    host.__radioPanelBound = true;
    const root = host.shadowRoot;
    const controller = () => window.__radioPanelController;
    root.querySelector('[data-action="play"]')?.addEventListener("click", () => controller()?._playOrResume());
    root.querySelector('[data-action="pause"]')?.addEventListener("click", () => controller()?._pause());
    root.querySelector('[data-action="stop"]')?.addEventListener("click", () => controller()?._stop());
    root.querySelector('[data-action="favorite"]')?.addEventListener("click", () => {
      const panel = controller();
      if (panel?._currentStation) panel._toggleFavorite(panel._currentStation);
    });
    const volumeInput = root.querySelector('[data-action="volume"]');
    volumeInput?.addEventListener("input", (event) => {
      const panel = controller();
      if (!panel) return;
      const value = Number(event.currentTarget.value || 0);
      const output = panel._selectedOutput();
      event.currentTarget.dataset.volumeOutput = output;
      const valueNode = root.querySelector('[data-role="volume-value"]');
      if (valueNode) valueNode.textContent = `${value}%`;
      panel._queueVolumeChange(output, value);
    });
    volumeInput?.addEventListener("change", (event) => {
      const panel = controller();
      if (!panel) return;
      const value = Number(event.currentTarget.value || 0);
      const output = event.currentTarget.dataset.volumeOutput || panel._selectedOutput();
      if (panel._volumeChangeTimer) {
        window.clearTimeout(panel._volumeChangeTimer);
        panel._volumeChangeTimer = null;
      }
      panel._applyVolume(output, value).catch((error) => {
        panel._setMessage(`Nie udało się zmienić głośności: ${panel._errorText(error)}`, "error");
      });
    });
    root.querySelector('[data-action="close"]')?.addEventListener("click", () => {
      const panel = controller();
      if (!panel) return;
      panel._playerDismissed = true;
      panel._updateGlobalPlayerContent();
    });
    root.querySelector('[data-action="reopen"]')?.addEventListener("click", () => {
      const panel = controller();
      if (!panel) return;
      panel._playerDismissed = false;
      panel._updateGlobalPlayerContent();
    });

    const player = root.getElementById("player");
    const handle = root.querySelector('[data-action="drag"]');
    let drag = null;
    const move = (event) => {
      if (!drag) return;
      const width = player.offsetWidth;
      const height = player.offsetHeight;
      const left = Math.min(Math.max(8, event.clientX - drag.offsetX), Math.max(8, window.innerWidth - width - 8));
      const top = Math.min(Math.max(8, event.clientY - drag.offsetY), Math.max(8, window.innerHeight - height - 8));
      player.style.left = `${left}px`;
      player.style.top = `${top}px`;
      player.style.right = "auto";
      player.style.bottom = "auto";
      player.style.transform = "none";
    };
    const end = (event) => {
      if (!drag) return;
      move(event);
      drag = null;
      player.classList.remove("dragging");
      try { handle.releasePointerCapture(event.pointerId); } catch (_error) {}
      const rect = player.getBoundingClientRect();
      localStorage.setItem("radio_panel_player_position", JSON.stringify({ left: Math.round(rect.left), top: Math.round(rect.top) }));
    };
    handle?.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      const rect = player.getBoundingClientRect();
      drag = { offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
      player.classList.add("dragging");
      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    handle?.addEventListener("pointermove", move);
    handle?.addEventListener("pointerup", end);
    handle?.addEventListener("pointercancel", end);
    handle?.addEventListener("dblclick", () => {
      localStorage.removeItem("radio_panel_player_position");
      const panel = controller();
      panel?._applyGlobalPlayerPosition(host, true);
    });
    root.querySelector('[data-role="logo"]')?.addEventListener("error", (event) => {
      const panel = controller();
      const image = event.currentTarget;
      const fallback = panel?._absoluteLogoUrl(RADIO_PLAY_LOGO_URL) || RADIO_PLAY_LOGO_URL;
      if (image.src === fallback) return;
      panel?._failedLogoUrls.add(image.src);
      image.src = RADIO_PLAY_LOGO_URL;
    });
    host.__radioPanelResize = () => controller()?._applyGlobalPlayerPosition(host);
    window.addEventListener("resize", host.__radioPanelResize, { passive: true });
  }

  _applyGlobalPlayerPosition(host = this._globalPlayerHost, forceDefault = false) {
    const player = host?.shadowRoot?.getElementById("player");
    if (!player) return;
    let saved = null;
    if (!forceDefault) {
      try { saved = JSON.parse(localStorage.getItem("radio_panel_player_position") || "null"); } catch (_error) {}
    }
    if (!saved || !Number.isFinite(saved.left) || !Number.isFinite(saved.top)) {
      player.style.left = "50%";
      player.style.top = "auto";
      player.style.right = "auto";
      player.style.bottom = "max(82px, calc(18px + env(safe-area-inset-bottom)))";
      player.style.transform = "translateX(-50%)";
      return;
    }
    const width = player.offsetWidth || Math.min(820, window.innerWidth - 24);
    const height = player.offsetHeight || 112;
    const left = Math.min(Math.max(8, saved.left), Math.max(8, window.innerWidth - width - 8));
    const top = Math.min(Math.max(8, saved.top), Math.max(8, window.innerHeight - height - 8));
    player.style.left = `${left}px`;
    player.style.top = `${top}px`;
    player.style.right = "auto";
    player.style.bottom = "auto";
    player.style.transform = "none";
  }

  _updateGlobalPlayerContent() {
    const host = this._ensureGlobalPlayer();
    const root = host?.shadowRoot;
    if (!root) return;
    const station = this._currentStation;
    const player = root.getElementById("player");
    const reopen = root.getElementById("reopen");
    const visible = Boolean(station && !this._playerDismissed);
    player.hidden = !visible;
    reopen.hidden = !(station && this._playerDismissed);
    if (!station) {
      this._updateMediaSession();
      return;
    }

    const data = this._playerData();
    const favorite = this._data.favorites?.[station.stationuuid];
    const statusClass = ["reconnecting", "buffering", "failed"].includes(this._connectionState) ? this._connectionState : "";
    const stationNode = root.querySelector('[data-role="station"]');
    const statusNode = root.querySelector('[data-role="status"]');
    const artistNode = root.querySelector('[data-role="artist"]');
    const titleNode = root.querySelector('[data-role="title"]');
    const logoNode = root.querySelector('[data-role="logo"]');
    const favoriteButton = root.querySelector('[data-action="favorite"]');
    const playButton = root.querySelector('[data-action="play"]');
    const pauseButton = root.querySelector('[data-action="pause"]');
    const stopButton = root.querySelector('[data-action="stop"]');
    const volumeInput = root.querySelector('[data-action="volume"]');
    const volumeValue = root.querySelector('[data-role="volume-value"]');
    const volumeControl = root.querySelector('.volume-control');

    stationNode.textContent = data.stationName;
    const statusText = this._playerStatusLabel();
    statusNode.className = `status ${statusClass}`.trim();
    statusNode.textContent = statusText;
    statusNode.hidden = !statusText;
    artistNode.textContent = data.artist ? `${data.artist} — ` : "";
    titleNode.textContent = data.title;
    root.querySelector('[data-role="track"]').title = data.artist ? `${data.artist} — ${data.title}` : data.title;

    const requestedLogo = this._absoluteLogoUrl(data.logo);
    const fallbackLogo = this._absoluteLogoUrl(RADIO_PLAY_LOGO_URL);
    const nextLogo = this._failedLogoUrls.has(requestedLogo) ? fallbackLogo : requestedLogo;
    if (logoNode.src !== nextLogo) logoNode.src = nextLogo;

    playButton.disabled = !station || this._wantsPlayback;
    pauseButton.disabled = !station || !this._wantsPlayback;
    stopButton.disabled = !station || this._connectionState === "stopped";
    favoriteButton.disabled = !station;
    favoriteButton.classList.toggle("active", Boolean(favorite));
    favoriteButton.innerHTML = favorite ? this._icon("heart") : this._icon("heartOutline");

    const selectedOutput = this._selectedOutput();
    const volumeSupported = this._volumeSupported(selectedOutput);
    const volumePercent = this._volumePercent(selectedOutput);
    if (volumeInput) {
      volumeInput.dataset.volumeOutput = selectedOutput;
      volumeInput.disabled = !volumeSupported;
      if (root.activeElement !== volumeInput) volumeInput.value = String(volumePercent);
      volumeInput.title = volumeSupported ? `Głośność ${volumePercent}%` : "Wybrany odtwarzacz nie obsługuje regulacji głośności";
    }
    if (volumeValue && root.activeElement !== volumeInput) volumeValue.textContent = `${volumePercent}%`;
    if (volumeControl) volumeControl.title = volumeSupported ? `Głośność ${volumePercent}%` : "Regulacja głośności niedostępna";

    player.classList.toggle("is-playing", Boolean(this._wantsPlayback));
    this._updateGlobalPlayerDynamic(host);
    this._updateMediaSession();
    window.requestAnimationFrame(() => this._applyGlobalPlayerPosition(host));
  }

  _updateGlobalPlayerDynamic(host = this._globalPlayerHost) {
    const root = host?.shadowRoot;
    if (!root || !this._currentStation) return;
    const data = this._playerData();
    const position = data.duration ? Math.min(data.position, data.duration) : data.position;
    const progress = data.duration ? Math.min(100, Math.max(0, (position / data.duration) * 100)) : 0;
    const positionNode = root.querySelector('[data-role="position"]');
    const durationNode = root.querySelector('[data-role="duration"]');
    const progressNode = root.querySelector('[data-role="progress"]');
    const progressTrack = root.querySelector('[data-role="progress-track"]');
    if (positionNode) positionNode.textContent = this._formatClock(position);
    if (durationNode) durationNode.textContent = data.duration ? this._formatClock(data.duration) : "LIVE";
    if (progressNode) progressNode.style.width = `${progress}%`;
    progressTrack?.classList.toggle("live", Boolean(data.live));
  }

  _errorText(error) {
    return error?.message || error?.error?.message || String(error || "Nieznany błąd");
  }

  _setMessage(message, kind = "info") {
    this._message = message;
    this._messageKind = kind;
    this._render();
    window.clearTimeout(this._messageTimer);
    this._messageTimer = window.setTimeout(() => {
      this._message = "";
      this._render();
    }, 6500);
  }

  _formatClock(totalSeconds) {
    const safe = Math.max(0, Math.floor(Number(totalSeconds || 0)));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;
    if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  _browserTrackPosition() {
    const running = this._trackClockStartedAt
      ? (Date.now() - this._trackClockStartedAt) / 1000
      : 0;
    return Math.max(0, this._trackElapsedBase + running);
  }

  _resetTrackClock(start = this._wantsPlayback) {
    this._trackElapsedBase = 0;
    this._trackClockStartedAt = start ? Date.now() : 0;
  }

  _pauseTrackClock() {
    this._trackElapsedBase = this._browserTrackPosition();
    this._trackClockStartedAt = 0;
  }

  _resumeTrackClock() {
    if (!this._trackClockStartedAt) this._trackClockStartedAt = Date.now();
  }

  _externalPlayerData() {
    const output = this._selectedOutput();
    if (output === "browser") return null;
    const state = this._hass?.states?.[output];
    if (!state) return null;
    const attrs = state.attributes || {};
    let position = Number(attrs.media_position || 0);
    if (state.state === "playing" && attrs.media_position_updated_at) {
      const updatedAt = Date.parse(attrs.media_position_updated_at);
      if (Number.isFinite(updatedAt)) position += Math.max(0, (Date.now() - updatedAt) / 1000);
    }
    return {
      state: state.state,
      title: String(attrs.media_title || attrs.media_series_title || ""),
      artist: String(attrs.media_artist || attrs.media_album_name || ""),
      duration: Math.max(0, Number(attrs.media_duration || 0)),
      position: Math.max(0, position),
      picture: String(attrs.entity_picture || ""),
    };
  }

  _playerData() {
    const station = this._currentStation;
    const external = this._externalPlayerData();
    if (external) {
      return {
        stationName: station?.name || this._outputName(),
        title: external.title || "Brak informacji o utworze",
        artist: external.artist,
        // Czas na pasku jest czasem całej sesji słuchania. Nie korzystamy z
        // media_position, ponieważ radio lub urządzenie zeruje je przy zmianie utworu.
        position: this._browserTrackPosition(),
        duration: 0,
        logo: station?.favicon || external.picture || RADIO_PLAY_LOGO_URL,
        live: true,
      };
    }
    return {
      stationName: station?.name || "Wybierz stację",
      title: this._nowPlaying.title || (this._wantsPlayback ? "Pobieranie informacji o utworze…" : "Brak informacji o utworze"),
      artist: this._nowPlaying.artist || "",
      position: this._browserTrackPosition(),
      duration: 0,
      logo: station?.favicon || RADIO_PLAY_LOGO_URL,
      live: true,
    };
  }

  _startPlayerClock() {
    if (this._playerClockTimer) return;
    this._playerClockTimer = window.setInterval(() => this._updatePlayerDynamic(), 1000);
  }

  _stopPlayerClock() {
    if (this._playerClockTimer) {
      window.clearInterval(this._playerClockTimer);
      this._playerClockTimer = null;
    }
  }

  _updatePlayerDynamic() {
    this._updateGlobalPlayerDynamic();
    const root = this.shadowRoot;
    if (!root || !this._currentStation) return;
    const data = this._playerData();
    const position = data.duration ? Math.min(data.position, data.duration) : data.position;
    const progress = data.duration ? Math.min(100, Math.max(0, (position / data.duration) * 100)) : 0;
    const positionNode = root.querySelector('[data-role="track-position"]');
    const durationNode = root.querySelector('[data-role="track-duration"]');
    const progressNode = root.querySelector('[data-role="track-progress"]');
    if (positionNode) positionNode.textContent = this._formatClock(position);
    if (durationNode) durationNode.textContent = data.duration ? this._formatClock(data.duration) : "LIVE";
    if (progressNode) progressNode.style.width = `${progress}%`;
  }

  _updatePlayerContent() {
    this._updateGlobalPlayerContent();
    const root = this.shadowRoot;
    if (!root || !this._currentStation) return;
    const data = this._playerData();
    const statusClass = ["reconnecting", "buffering", "failed"].includes(this._connectionState)
      ? this._connectionState
      : "";

    const stationNode = root.querySelector('[data-role="player-station"]');
    const statusNode = root.querySelector('[data-role="player-status"]');
    const trackNode = root.querySelector('[data-role="player-track"]');
    const logoNode = root.querySelector('[data-role="player-logo"]');
    const playButton = root.querySelector('[data-action="current-play"]');
    const pauseButton = root.querySelector('[data-action="current-pause"]');
    const stopButton = root.querySelector('[data-action="current-stop"]');

    if (stationNode) stationNode.textContent = data.stationName;
    if (statusNode) {
      statusNode.className = `player-status ${statusClass}`.trim();
      statusNode.textContent = this._playerStatusLabel();
      statusNode.hidden = !statusNode.textContent;
    }
    if (trackNode) {
      trackNode.replaceChildren();
      if (data.artist) {
        const artist = document.createElement("span");
        artist.textContent = data.artist;
        const title = document.createElement("b");
        title.textContent = ` — ${data.title}`;
        trackNode.append(artist, title);
      } else {
        const title = document.createElement("b");
        title.textContent = data.title;
        trackNode.append(title);
      }
      trackNode.title = data.artist ? `${data.artist} — ${data.title}` : data.title;
    }
    if (logoNode) {
      const requestedLogo = this._absoluteLogoUrl(data.logo);
      const fallbackLogo = this._absoluteLogoUrl(RADIO_PLAY_LOGO_URL);
      const nextLogo = this._failedLogoUrls.has(requestedLogo) ? fallbackLogo : requestedLogo;
      if (logoNode.src !== nextLogo) logoNode.src = nextLogo;
    }
    if (playButton) playButton.disabled = !this._currentStation || this._wantsPlayback;
    if (pauseButton) pauseButton.disabled = !this._currentStation || !this._wantsPlayback;
    if (stopButton) stopButton.disabled = !this._currentStation || this._connectionState === "stopped";
  }

  _stopMetadataPolling() {
    if (this._metadataTimer) {
      window.clearInterval(this._metadataTimer);
      this._metadataTimer = null;
    }
  }

  _startMetadataPolling(immediate = false) {
    this._stopMetadataPolling();
    if (this._selectedOutput() !== "browser" || !this._currentStation || !this._wantsPlayback) return;
    if (this._isIOSDevice() && document.visibilityState !== "visible") return;
    if (immediate) this._fetchNowPlaying();
    this._metadataTimer = window.setInterval(() => this._fetchNowPlaying(), 15000);
  }

  async _fetchNowPlaying() {
    if (this._metadataLoading || !this._hass || !this._currentStation || this._selectedOutput() !== "browser") return;
    this._metadataLoading = true;
    try {
      const result = await this._hass.callWS({
        type: "radio_panel/now_playing",
        station_uuid: this._currentStation.stationuuid,
      });
      const rawTitle = String(result?.raw_title || "");
      this._nowPlaying = {
        title: String(result?.title || ""),
        artist: String(result?.artist || ""),
        rawTitle,
        metadataAvailable: Boolean(result?.metadata_available),
      };
      // Zmiana utworu nie zeruje czasu sesji i nie przebudowuje całego panelu.
      // Dzięki temu logo nie jest ponownie pobierane co kilka–kilkanaście sekund.
      this._updatePlayerContent();
      this._updatePlayerDynamic();
    } catch (error) {
      console.debug("Radio Panel: stacja nie udostępniła metadanych ICY", error);
    } finally {
      this._metadataLoading = false;
    }
  }

  _syncExternalPlayerState() {
    const output = this._selectedOutput();
    if (output === "browser") return;
    const state = this._hass?.states?.[output];
    if (!state) return;
    const attrs = state.attributes || {};
    const signature = JSON.stringify([
      state.state,
      attrs.media_title,
      attrs.media_artist,
      attrs.media_album_name,
      attrs.entity_picture,
    ]);
    if (signature === this._externalPlayerSignature) return;
    this._externalPlayerSignature = signature;
    if (state.state === "playing") {
      this._wantsPlayback = true;
      this._manualStop = false;
      this._sessionActive = true;
      this._connectionState = "playing";
      this._connectionDetail = `odtwarzanie na ${this._outputName()}`;
      this._resumeTrackClock();
      this._startListenTimer();
    } else if (state.state === "paused") {
      this._wantsPlayback = false;
      this._manualStop = true;
      this._sessionActive = false;
      this._connectionState = "paused";
      this._connectionDetail = "wstrzymane";
      this._pauseTrackClock();
      this._stopListenTimer(true);
    } else if (["idle", "off", "standby"].includes(state.state)) {
      this._wantsPlayback = false;
      this._manualStop = true;
      this._sessionActive = false;
      this._connectionState = "stopped";
      this._connectionDetail = "zatrzymane";
      this._resetTrackClock(false);
      this._stopListenTimer(true);
    }
    this._startPlayerClock();
    this._updatePlayerContent();
    this._updatePlayerDynamic();
  }

  _autoReconnectEnabled() {
    return localStorage.getItem("radio_panel_auto_reconnect") !== "false";
  }

  _preferDirectHttps() {
    return localStorage.getItem("radio_panel_direct_https") === "true";
  }

  _stallTimeoutMs() {
    const seconds = Number(localStorage.getItem("radio_panel_stall_seconds") || 15);
    return Math.min(Math.max(seconds, 8), 60) * 1000;
  }

  _clearReconnectTimer() {
    if (this._reconnectTimer) {
      window.clearTimeout(this._reconnectTimer);
      this._reconnectTimer = null;
    }
  }

  _cancelReconnect(resetAttempts = true) {
    this._clearReconnectTimer();
    this._reconnectInProgress = false;
    if (resetAttempts) this._reconnectAttempt = 0;
  }

  _markMediaProgress() {
    let progressed = false;
    const currentTime = Number(this._audio.currentTime || 0);
    if (Number.isFinite(currentTime) && currentTime > this._lastMediaTime + 0.05) {
      this._lastMediaTime = currentTime;
      progressed = true;
    }

    try {
      const ranges = this._audio.buffered;
      if (ranges?.length) {
        const bufferedEnd = Number(ranges.end(ranges.length - 1));
        if (Number.isFinite(bufferedEnd) && bufferedEnd > this._lastBufferedEnd + 0.05) {
          this._lastBufferedEnd = bufferedEnd;
          progressed = true;
        }
      }
    } catch (_error) {
      // Some WebViews can temporarily invalidate TimeRanges while changing source.
    }

    if (progressed || !this._lastMediaProgressAt) this._lastMediaProgressAt = Date.now();
  }

  _startPlaybackWatchdog() {
    if (this._watchdogTimer || this._selectedOutput() !== "browser") return;
    if (this._isIOSDevice() && document.visibilityState !== "visible") return;
    if (!this._lastMediaProgressAt) this._lastMediaProgressAt = Date.now();
    this._watchdogTimer = window.setInterval(() => {
      if (!this._wantsPlayback || this._manualStop || this._selectedOutput() !== "browser") return;
      if (this._isIOSDevice() && document.visibilityState !== "visible") return;
      if (this._changingSource || this._reconnectTimer || this._reconnectInProgress) return;
      if (this._audio.error) {
        this._handlePlaybackFailure(`błąd odtwarzacza (kod ${this._audio.error.code || "?"})`);
        return;
      }
      if (this._audio.paused && this._connectionState === "playing") {
        this._handlePlaybackFailure("odtwarzacz przestał odtwarzać strumień");
        return;
      }

      const currentTime = Number(this._audio.currentTime || 0);
      if (Number.isFinite(currentTime) && currentTime > this._lastMediaTime + 0.2) {
        this._lastMediaTime = currentTime;
        this._lastMediaProgressAt = Date.now();
        return;
      }

      if (Date.now() - this._lastMediaProgressAt >= this._stallTimeoutMs()) {
        this._handlePlaybackFailure("brak danych ze stacji przez zbyt długi czas");
      }
    }, 3000);
  }

  _stopPlaybackWatchdog() {
    if (this._watchdogTimer) {
      window.clearInterval(this._watchdogTimer);
      this._watchdogTimer = null;
    }
  }



  _connectionLabel() {
    if (this._connectionDetail) return this._connectionDetail;
    if (this._connectionState === "connecting") return "łączenie…";
    if (this._connectionState === "buffering") return "buforowanie…";
    if (this._connectionState === "reconnecting") return "ponowne łączenie…";
    if (this._connectionState === "failed") return "połączenie przerwane";
    if (this._connectionState === "playing") return "odtwarzanie";
    if (this._connectionState === "paused") return "wstrzymane";
    return "zatrzymane";
  }

  _playerStatusLabel() {
    if (this._connectionState === "connecting") return "Łączenie…";
    if (this._connectionState === "buffering") return "Buforowanie…";
    if (this._connectionState === "reconnecting") return `Ponowne łączenie${this._reconnectAttempt ? ` · próba ${this._reconnectAttempt}` : ""}…`;
    if (this._connectionState === "failed") return "Połączenie przerwane";
    if (this._connectionState === "paused") return "Pauza";
    return "";
  }

  _isDirectCandidate(sourceUrl) {
    try {
      const url = new URL(sourceUrl, window.location.href);
      if (url.protocol !== "https:") return false;
      // Na iOS nie używamy połączenia bezpośredniego. Część serwerów stacji
      // kończy pojedynczą odpowiedź po około 5 minutach. Gdy ekran jest
      // zablokowany, JavaScript nie może wtedy niezawodnie uruchomić nowego
      // żądania. Proxy Home Assistanta utrzymuje jedno połączenie z elementem
      // audio i samodzielnie otwiera kolejne połączenia do stacji po jej EOF.
      if (this._isIOSDevice()) return false;
      return this._preferDirectHttps();
    } catch (_error) {
      return false;
    }
  }

  async _signedProxyUrl(stationUuid) {
    const sessionId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    const unsignedPath = `/api/radio_panel/stream/${encodeURIComponent(stationUuid)}/${sessionId}`;
    const signed = await this._hass.callWS({
      type: "auth/sign_path",
      path: unsignedPath,
      expires: 43200,
    });
    if (!signed?.path) throw new Error("Nie udało się przygotować bezpiecznego adresu strumienia.");
    // Zwracamy dokładnie ścieżkę podpisaną przez Home Assistanta. Każdy dopisany
    // parametr zmienia żądanie i może unieważnić authSig, powodując błąd 401.
    return signed.path;
  }

  async _stopHlsSession(reason = "requested") {
    const token = this._hlsToken;
    this._hlsToken = "";
    if (!token || !this._hass) return;
    try {
      await this._hass.callWS({
        type: "radio_panel/stop_hls",
        token,
      });
      this._diag("frontend_hls_stopped", { reason, token: token.slice(0, 10) });
    } catch (error) {
      // Sesja ma krótki czas bezczynności i zostanie usunięta także wtedy,
      // gdy aplikacja utraci połączenie w trakcie zatrzymywania.
      this._diag("frontend_hls_stop_failed", {
        reason,
        error_name: error?.name || "",
        error_message: error?.message || String(error),
      });
    }
  }

  async _prepareHlsUrl(station) {
    await this._stopHlsSession("replace");
    const result = await this._hass.callWS({
      type: "radio_panel/prepare_hls",
      station,
    });
    if (!result?.url || !result?.token) {
      throw new Error("Home Assistant nie przygotował strumienia HLS.");
    }
    this._hlsToken = result.token;
    this._diag("frontend_hls_prepared", {
      token: result.token.slice(0, 10),
      url_path: result.url,
    });
    return result.url;
  }

  async _playBrowserStation(
    station,
    { forceProxy = false, reconnect = false, token = this._playToken } = {}
  ) {
    if (token !== this._playToken || !this._wantsPlayback || this._manualStop) return false;
    this._configureBrowserAudioSession();
    const sourceUrl = station.url_resolved || station.url;
    if (!sourceUrl) throw new Error("Stacja nie ma adresu strumienia.");

    let useHls = this._isIOSDevice();
    const useDirect = !useHls && !forceProxy && this._isDirectCandidate(sourceUrl);
    this._playbackMode = useHls ? "hls" : (useDirect ? "direct" : "proxy");
    this._connectionState = reconnect ? "reconnecting" : "connecting";
    this._connectionDetail = useHls
      ? reconnect
        ? `ponowne łączenie · próba ${this._reconnectAttempt} · HLS dla iPhone’a`
        : "przygotowywanie strumienia HLS dla iPhone’a…"
      : useDirect
        ? reconnect
          ? `ponowne łączenie · próba ${this._reconnectAttempt} · bezpośrednio`
          : "łączenie bezpośrednie…"
        : reconnect
          ? `ponowne łączenie · próba ${this._reconnectAttempt} · przez Home Assistant`
          : "łączenie przez Home Assistant…";
    this._sessionActive = false;
    this._lastMediaProgressAt = Date.now();
    this._lastMediaTime = 0;
    this._lastBufferedEnd = 0;
    this._updatePlayerContent();

    let playbackUrl = "";
    if (useHls) {
      try {
        playbackUrl = await this._prepareHlsUrl(station);
      } catch (error) {
        // Bez FFmpeg panel nadal może działać w poprzednim trybie proxy.
        // Diagnostyka pokaże przyczynę, a odtwarzanie na pierwszym planie
        // nie zostanie całkowicie zablokowane.
        this._diag("frontend_hls_prepare_failed", {
          error_name: error?.name || "",
          error_message: error?.message || String(error),
        });
        useHls = false;
        this._playbackMode = "proxy";
        this._connectionDetail = "HLS niedostępny · łączenie przez Home Assistant…";
        this._updatePlayerContent();
        playbackUrl = await this._signedProxyUrl(station.stationuuid);
      }
    } else {
      playbackUrl = useDirect ? sourceUrl : await this._signedProxyUrl(station.stationuuid);
    }
    if (token !== this._playToken || !this._wantsPlayback || this._manualStop) {
      if (useHls) await this._stopHlsSession("cancelled_before_play");
      return false;
    }
    let sourceHost = "";
    try { sourceHost = new URL(sourceUrl, window.location.href).host; } catch (_error) {}
    this._diag("frontend_source_selected", {
      mode: this._playbackMode,
      reconnect,
      force_proxy: forceProxy,
      hls_transport: useHls,
      station_stream_host: sourceHost,
    });

    this._prepareSharedAudioElement();
    this._changingSource = true;
    this._ignorePauseUntil = Date.now() + 1800;
    try {
      this._audio.pause();
      this._audio.removeAttribute("src");
      this._audio.load();
      this._audio.src = playbackUrl;
      this._audio.volume = this._volumePercent("browser") / 100;
      this._audio.load();
      await this._audio.play();
      this._diag("frontend_play_promise_resolved", { mode: this._playbackMode });
      return token === this._playToken && this._wantsPlayback && !this._manualStop;
    } catch (error) {
      this._diag("frontend_play_promise_rejected", {
        mode: this._playbackMode,
        error_name: error?.name || "",
        error_message: error?.message || String(error),
      });
      throw error;
    } finally {
      this._changingSource = false;
    }
  }

  _updateStationReferences(station) {
    if (!station?.stationuuid) return this._currentStation;
    const uuid = station.stationuuid;
    const merged = { ...(this._currentStation || {}), ...station };
    this._currentStation = merged;
    this._stations = this._stations.map((item) =>
      item.stationuuid === uuid ? { ...item, ...station } : item
    );

    if (this._data.favorites?.[uuid]) {
      this._data.favorites[uuid] = {
        ...this._data.favorites[uuid],
        ...station,
        favorite_source: this._data.favorites[uuid].favorite_source,
        favorite_added_at: this._data.favorites[uuid].favorite_added_at,
      };
    }
    if (this._data.stats?.[uuid]) this._data.stats[uuid].station = merged;
    return merged;
  }

  async _refreshCurrentStation() {
    const station = this._currentStation;
    if (!station?.stationuuid || !this._hass) return station;
    try {
      const result = await this._hass.callWS({
        type: "radio_panel/refresh_station",
        station_uuid: station.stationuuid,
      });
      if (result?.station) return this._updateStationReferences(result.station);
    } catch (error) {
      console.warn("Radio Panel: nie udało się odświeżyć adresu stacji", error);
    }
    return station;
  }

  _releaseBrowserStream() {
    this._changingSource = true;
    this._ignorePauseUntil = Date.now() + 1800;
    try {
      this._audio.pause();
      this._audio.removeAttribute("src");
      this._audio.load();
    } finally {
      this._changingSource = false;
    }
  }

  _handlePlaybackFailure(reason) {
    this._diag("frontend_playback_failure", { reason: String(reason || "") });
    if (!this._wantsPlayback || this._manualStop || this._selectedOutput() !== "browser") return;
    if (this._playbackMode === "direct") this._preferProxyForCurrent = true;
    this._sessionActive = false;
    this._reconnectInProgress = false;
    this._pauseTrackClock();
    this._stopListenTimer(true);
    this._stopPlaybackWatchdog();
    this._releaseBrowserStream();

    if (!this._autoReconnectEnabled()) {
      this._wantsPlayback = false;
      this._connectionState = "failed";
      this._connectionDetail = "połączenie przerwane";
      this._setMessage(`Radio zostało przerwane: ${reason}.`, "error");
      return;
    }
    this._scheduleReconnect(reason);
  }

  _scheduleReconnect(reason) {
    if (!this._wantsPlayback || this._manualStop) return;
    if (this._reconnectTimer || this._reconnectInProgress) return;

    const delay = this._reconnectDelays[Math.min(this._reconnectAttempt, this._reconnectDelays.length - 1)];
    const nextAttempt = this._reconnectAttempt + 1;
    this._diag("frontend_reconnect_scheduled", {
      reason: String(reason || ""),
      next_attempt: nextAttempt,
      delay_ms: delay,
    });
    this._connectionState = "reconnecting";
    this._connectionDetail = `utracono połączenie · próba ${nextAttempt} za ${Math.ceil(delay / 1000)} s`;
    this._updatePlayerContent();
    this._reconnectTimer = window.setTimeout(() => {
      this._reconnectTimer = null;
      this._runReconnect(reason);
    }, delay);
  }

  async _runReconnect(reason) {
    if (!this._wantsPlayback || this._manualStop || this._reconnectInProgress) return;
    this._reconnectInProgress = true;
    const token = this._playToken;
    this._reconnectAttempt += 1;
    this._diag("frontend_reconnect_started", {
      reason: String(reason || ""),
      attempt: this._reconnectAttempt,
    });
    this._connectionState = "reconnecting";
    this._connectionDetail = `ponowne łączenie · próba ${this._reconnectAttempt}…`;
    this._updatePlayerContent();

    try {
      const station = await this._refreshCurrentStation();
      if (token !== this._playToken || !this._wantsPlayback || this._manualStop) return;
      if (!station) throw new Error("Brak danych stacji.");
      const started = await this._playBrowserStation(station, {
        forceProxy: this._preferProxyForCurrent,
        reconnect: true,
        token,
      });
      if (token !== this._playToken || !this._wantsPlayback || this._manualStop) {
        this._reconnectInProgress = false;
        return;
      }
      if (!started) throw new Error("Odtwarzacz nie rozpoczął nowego strumienia.");
      await this._registerCurrentPlayIfNeeded();
      // Zdarzenie „playing” wyzeruje licznik prób po faktycznym wznowieniu dźwięku.
    } catch (error) {
      this._reconnectInProgress = false;
      if (!this._wantsPlayback || this._manualStop) return;
      console.warn(`Radio Panel: próba wznowienia nie powiodła się (${reason})`, error);
      this._scheduleReconnect(this._errorText(error));
    }
  }

  _mediaPlayers() {
    if (!this._hass) return [];
    return Object.values(this._hass.states)
      .filter(
        (state) =>
          state.entity_id.startsWith("media_player.") &&
          !["unavailable", "unknown"].includes(state.state)
      )
      .sort((a, b) =>
        String(a.attributes.friendly_name || a.entity_id).localeCompare(
          String(b.attributes.friendly_name || b.entity_id),
          "pl"
        )
      );
  }

  _selectedOutput() {
    const saved = localStorage.getItem("radio_panel_output") || "browser";
    if (saved === "browser") return saved;
    return this._mediaPlayers().some((item) => item.entity_id === saved)
      ? saved
      : "browser";
  }

  _outputName() {
    const output = this._selectedOutput();
    if (output === "browser") return "To urządzenie";
    const state = this._hass?.states?.[output];
    return state?.attributes?.friendly_name || output;
  }

  _volumeStorageKey(output = this._selectedOutput()) {
    return output === "browser" ? "radio_panel_volume" : `radio_panel_volume:${output}`;
  }

  _volumeSupported(output = this._selectedOutput()) {
    if (output === "browser") return true;
    const attrs = this._hass?.states?.[output]?.attributes || {};
    const supportedFeatures = Number(attrs.supported_features || 0);
    const volumeLevel = attrs.volume_level;
    const hasVolumeLevel = volumeLevel !== null && volumeLevel !== undefined && Number.isFinite(Number(volumeLevel));
    return hasVolumeLevel || Boolean(supportedFeatures & 4);
  }

  _volumePercent(output = this._selectedOutput()) {
    if (output !== "browser") {
      const rawCurrentLevel = this._hass?.states?.[output]?.attributes?.volume_level;
      const currentLevel = rawCurrentLevel === null || rawCurrentLevel === undefined
        ? Number.NaN
        : Number(rawCurrentLevel);
      if (Number.isFinite(currentLevel)) {
        return Math.round(Math.min(Math.max(currentLevel, 0), 1) * 100);
      }
    }

    const storedValue = localStorage.getItem(this._volumeStorageKey(output));
    const storedLevel = storedValue === null ? Number.NaN : Number(storedValue);
    const level = Number.isFinite(storedLevel) ? storedLevel : 0.8;
    return Math.round(Math.min(Math.max(level, 0), 1) * 100);
  }

  async _applyVolume(output, percent) {
    const safePercent = Math.min(Math.max(Number(percent) || 0, 0), 100);
    const level = safePercent / 100;
    localStorage.setItem(this._volumeStorageKey(output), String(level));

    if (output === "browser") {
      this._audio.volume = level;
      return;
    }

    if (!this._volumeSupported(output)) {
      throw new Error("Wybrany odtwarzacz nie obsługuje zmiany głośności.");
    }

    await this._hass.callService("media_player", "volume_set", {
      entity_id: output,
      volume_level: level,
    });
  }

  _queueVolumeChange(output, percent) {
    if (this._volumeChangeTimer) {
      window.clearTimeout(this._volumeChangeTimer);
      this._volumeChangeTimer = null;
    }

    if (output === "browser") {
      this._applyVolume(output, percent).catch((error) => {
        this._setMessage(`Nie udało się zmienić głośności: ${this._errorText(error)}`, "error");
      });
      return;
    }

    this._volumeChangeTimer = window.setTimeout(() => {
      this._volumeChangeTimer = null;
      this._applyVolume(output, percent).catch((error) => {
        this._setMessage(`Nie udało się zmienić głośności: ${this._errorText(error)}`, "error");
      });
    }, 180);
  }

  _mimeType(station) {
    const codec = String(station.codec || "").toUpperCase();
    if (codec === "MP3") return "audio/mpeg";
    if (codec === "AAC" || codec === "AAC+") return "audio/aac";
    if (codec === "OGG") return "application/ogg";
    return "music";
  }

  _formatDuration(totalSeconds) {
    const seconds = Math.max(Number(totalSeconds || 0), 0);
    if (seconds < 60) return `${Math.floor(seconds)} s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours} godz. ${rest} min` : `${hours} godz.`;
  }

  _countryName(countryCode, fallback = "") {
    const code = String(countryCode || "").trim().toUpperCase();
    const match = RADIO_PANEL_COUNTRIES.find(([itemCode]) => itemCode === code);
    return match?.[1] || fallback || code;
  }

  _countryOptions(selectedCode = "PL") {
    const selected = String(selectedCode || "").toUpperCase();
    return `
      <option value="" ${selected ? "" : "selected"}>Wszystkie kraje</option>
      ${RADIO_PANEL_COUNTRIES.map(
        ([code, name]) => `<option value="${code}" ${selected === code ? "selected" : ""}>${this._escape(name)}</option>`
      ).join("")}
    `;
  }

  _languageOptions(selectedLanguage = "") {
    const selected = String(selectedLanguage || "").toLowerCase();
    return RADIO_PANEL_LANGUAGES.map(
      ([value, label]) => `<option value="${this._escape(value)}" ${selected === value ? "selected" : ""}>${this._escape(label)}</option>`
    ).join("");
  }

  _favoriteValues() {
    return Object.values(this._data.favorites || {}).sort((a, b) =>
      String(a.name).localeCompare(String(b.name), "pl")
    );
  }

  _findStation(uuid) {
    if (this._currentStation?.stationuuid === uuid) return this._currentStation;
    return (
      this._stations.find((item) => item.stationuuid === uuid) ||
      this._data.favorites?.[uuid] ||
      null
    );
  }

  async _loadPopular() {
    this._searchFilters = {
      ...this._searchFilters,
      query: "",
      countrycode: "PL",
      language: "",
      tag: "",
    };
    localStorage.setItem("radio_panel_country", "PL");
    localStorage.setItem("radio_panel_language", "");
    await this._search({
      countrycode: "PL",
      isUserSearch: false,
      httpsOnly: this._searchFilters.httpsOnly,
    });
  }

  async _search(filters) {
    if (!this._hass) return;
    this._searchFilters = {
      query: filters.query ?? this._searchFilters.query ?? "",
      countrycode: filters.countrycode ?? this._searchFilters.countrycode ?? "PL",
      language: filters.language ?? this._searchFilters.language ?? "",
      tag: filters.tag ?? this._searchFilters.tag ?? "",
      httpsOnly: filters.httpsOnly ?? this._searchFilters.httpsOnly ?? false,
    };
    this._loading = true;
    this._section = "discover";
    this._render();
    try {
      const result = await this._hass.callWS({
        type: "radio_panel/search",
        query: filters.query || "",
        countrycode: filters.countrycode || "",
        language: filters.language || "",
        tag: filters.tag || "",
        https_only: Boolean(filters.httpsOnly),
        limit: 60,
      });
      this._stations = result.stations || [];
      this._discoverMode = filters.isUserSearch ? "results" : "popular";
      if (!this._stations.length) this._setMessage("Nie znaleziono pasujących stacji.");
    } catch (error) {
      this._setMessage(`Błąd wyszukiwania: ${this._errorText(error)}`, "error");
    } finally {
      this._loading = false;
      this._render();
    }
  }

  _startListenTimer() {
    if (!this._currentStation || this._listenTimer) return;
    this._listenTimer = window.setInterval(() => {
      if (!this._sessionActive || !this._currentStation) return;
      this._listenSecondsPending += 1;
      if (this._listenSecondsPending >= 30) this._flushListening();
    }, 1000);
  }

  _stopListenTimer(flush = false) {
    if (this._listenTimer) {
      window.clearInterval(this._listenTimer);
      this._listenTimer = null;
    }
    if (flush) this._flushListening();
  }

  async _flushListening() {
    const seconds = Math.floor(this._listenSecondsPending);
    const station = this._currentStation;
    if (!this._hass || !station || seconds < 1) return;
    this._listenSecondsPending = 0;
    try {
      const result = await this._hass.callWS({
        type: "radio_panel/register_listen",
        station,
        seconds: Math.min(seconds, 300),
      });
      this._data = result.data || this._data;
      if (result.auto_added) {
        this._setMessage(
          `Dodano „${station.name}” automatycznie do ulubionych po osiągnięciu czasu słuchania.`,
          "success"
        );
      }
    } catch (error) {
      this._listenSecondsPending += seconds;
      console.warn("Radio Panel: nie zapisano czasu słuchania", error);
    }
  }

  async _registerCurrentPlayIfNeeded() {
    if (!this._pendingPlayRegistration || !this._currentStation || !this._hass) return;
    const station = this._currentStation;
    try {
      const result = await this._hass.callWS({
        type: "radio_panel/register_play",
        station,
      });
      this._pendingPlayRegistration = false;
      this._data = result.data || this._data;
      if (result.auto_added) {
        this._setMessage(`Dodano „${station.name}” automatycznie do ulubionych.`, "success");
      }
    } catch (error) {
      console.warn("Radio Panel: nie zapisano uruchomienia stacji", error);
    }
  }

  async _play(station) {
    if (!station) return;
    this._diag("frontend_user_play", {
      requested_station_uuid: station.stationuuid || "",
      requested_station_name: station.name || "",
    });
    const oldStation = this._currentStation;
    if (oldStation && oldStation.stationuuid !== station.stationuuid) {
      this._sessionActive = false;
      await this._flushListening();
    }

    this._cancelReconnect();
    this._stopPlaybackWatchdog();
    const token = ++this._playToken;
    this._wantsPlayback = true;
    this._manualStop = false;
    this._preferProxyForCurrent = false;
    this._pendingPlayRegistration = true;
    this._currentStation = station;
    this._playerDismissed = false;
    this._nowPlaying = { title: "", artist: "", rawTitle: "", metadataAvailable: false };
    this._stopMetadataPolling();
    this._startPlayerClock();
    this._connectionState = "connecting";
    this._connectionDetail = "łączenie…";
    this._render();

    const output = this._selectedOutput();
    if (output !== "browser") await this._stopHlsSession("external_output");
    try {
      if (output === "browser") {
        const started = await this._playBrowserStation(station, { token });
        if (!started || token !== this._playToken) return;
      } else {
        await this._hass.callService("media_player", "play_media", {
          entity_id: output,
          media_content_id: `media-source://radio_browser/${station.stationuuid}`,
          media_content_type: this._mimeType(station),
        });
        this._playbackMode = "media_player";
        this._connectionState = "playing";
        this._connectionDetail = `odtwarzanie na ${this._outputName()}`;
        this._sessionActive = true;
        this._resumeTrackClock();
        this._startListenTimer();
        this._startPlayerClock();
      }

      await this._registerCurrentPlayIfNeeded();
    } catch (error) {
      if (token !== this._playToken || this._manualStop) return;
      this._sessionActive = false;
      this._stopListenTimer(false);
      if (output === "browser" && this._wantsPlayback && !this._manualStop) {
        this._handlePlaybackFailure(this._errorText(error));
      } else {
        this._wantsPlayback = false;
        this._connectionState = "failed";
        this._connectionDetail = "nie udało się uruchomić";
        this._setMessage(`Nie udało się uruchomić radia: ${this._errorText(error)}`, "error");
      }
    }
  }

  async _stop() {
    this._diag("frontend_user_stop");
    const output = this._selectedOutput();
    this._playToken += 1;
    this._wantsPlayback = false;
    this._manualStop = true;
    this._sessionActive = false;
    this._connectionState = "stopped";
    this._connectionDetail = "zatrzymane";
    this._resetTrackClock(false);
    this._stopMetadataPolling();
    this._cancelReconnect();
    this._stopPlaybackWatchdog();
    this._stopListenTimer(true);
    this._backgroundPlaybackInterrupted = false;
    this._updateMediaSession();

    try {
      if (output === "browser") {
        this._releaseBrowserStream();
        await this._stopHlsSession("user_stop");
      } else {
        await this._hass.callService("media_player", "media_stop", {
          entity_id: output,
        });
      }
      this._render();
    } catch (error) {
      this._setMessage(`Nie udało się zatrzymać: ${this._errorText(error)}`, "error");
    }
  }

  async _pause() {
    if (!this._currentStation) return;
    this._diag("frontend_user_pause");
    const output = this._selectedOutput();
    this._wantsPlayback = false;
    this._manualStop = true;
    this._sessionActive = false;
    this._connectionState = "paused";
    this._connectionDetail = "wstrzymane";
    this._cancelReconnect();
    this._stopPlaybackWatchdog();
    this._stopMetadataPolling();
    this._stopListenTimer(true);
    this._pauseTrackClock();
    this._backgroundPlaybackInterrupted = false;
    this._updateMediaSession();
    try {
      if (output === "browser") {
        this._ignorePauseUntil = Date.now() + 1800;
        this._audio.pause();
      } else {
        await this._hass.callService("media_player", "media_pause", { entity_id: output });
      }
      this._render();
    } catch (error) {
      this._setMessage(`Nie udało się wstrzymać: ${this._errorText(error)}`, "error");
    }
  }

  async _resume() {
    if (!this._currentStation) return;
    this._configureBrowserAudioSession();
    const output = this._selectedOutput();
    this._wantsPlayback = true;
    this._manualStop = false;
    this._connectionState = "connecting";
    this._connectionDetail = "wznawianie…";
    this._render();
    try {
      if (output === "browser") {
        if (this._audio.src) await this._audio.play();
        else await this._play(this._currentStation);
      } else {
        await this._hass.callService("media_player", "media_play", { entity_id: output });
        this._connectionState = "playing";
        this._connectionDetail = `odtwarzanie na ${this._outputName()}`;
        this._sessionActive = true;
        this._resumeTrackClock();
        this._startListenTimer();
        this._updatePlayerContent();
        this._updatePlayerDynamic();
      }
    } catch (error) {
      if (output === "browser") await this._play(this._currentStation);
      else this._setMessage(`Nie udało się wznowić: ${this._errorText(error)}`, "error");
    }
  }

  async _playOrResume() {
    if (!this._currentStation || this._wantsPlayback) return;
    if (this._connectionState === "paused") await this._resume();
    else await this._play(this._currentStation);
  }

  async _toggleCurrentPlayback() {
    if (this._wantsPlayback) await this._pause();
    else await this._playOrResume();
  }

  async _toggleFavorite(station) {
    try {
      const result = await this._hass.callWS({
        type: "radio_panel/toggle_favorite",
        station,
      });
      this._data = result.data || this._data;
      this._render();
    } catch (error) {
      this._setMessage(`Nie udało się zmienić ulubionych: ${this._errorText(error)}`, "error");
    }
  }

  async _changeOutput(value) {
    if (value === this._selectedOutput()) return;
    if (this._wantsPlayback || this._sessionActive) await this._stop();
    localStorage.setItem("radio_panel_output", value);
    this._render();
  }

  async _saveSettings() {
    const root = this.shadowRoot;
    const enabled = root.querySelector("#auto-favorite")?.checked ?? true;
    const plays = Number(root.querySelector("#auto-plays")?.value || 3);
    const minutes = Number(root.querySelector("#auto-minutes")?.value || 20);
    const output = this._selectedOutput();
    const volumePercent = Number(root.querySelector("#output-volume")?.value || 80);
    const autoReconnect = root.querySelector("#auto-reconnect")?.checked ?? true;
    const directHttps = root.querySelector("#direct-https")?.checked ?? false;
    const stallSeconds = Math.min(
      Math.max(Number(root.querySelector("#stall-seconds")?.value || 15), 8),
      60
    );

    localStorage.setItem("radio_panel_auto_reconnect", String(autoReconnect));
    localStorage.setItem("radio_panel_direct_https", String(directHttps));
    localStorage.setItem("radio_panel_stall_seconds", String(stallSeconds));

    if (this._volumeChangeTimer) {
      window.clearTimeout(this._volumeChangeTimer);
      this._volumeChangeTimer = null;
    }

    let volumeError = null;
    try {
      await this._applyVolume(output, volumePercent);
    } catch (error) {
      volumeError = error;
    }

    if (!autoReconnect && (this._reconnectTimer || this._reconnectInProgress)) {
      this._cancelReconnect();
      this._wantsPlayback = false;
      this._connectionState = "failed";
      this._connectionDetail = "automatyczne wznawianie wyłączone";
    }

    try {
      const result = await this._hass.callWS({
        type: "radio_panel/update_settings",
        auto_favorite: enabled,
        auto_favorite_plays: plays,
        auto_favorite_minutes: minutes,
      });
      this._data.settings = result.settings;
      if (volumeError) {
        this._setMessage(
          `Pozostałe ustawienia zapisano, ale nie udało się ustawić głośności: ${this._errorText(volumeError)}`,
          "error"
        );
      } else {
        this._setMessage("Ustawienia zapisane.", "success");
      }
    } catch (error) {
      this._setMessage(`Nie udało się zapisać ustawień: ${this._errorText(error)}`, "error");
    }
  }

  _stationCard(station) {
    const uuid = station.stationuuid;
    const favorite = this._data.favorites?.[uuid];
    const stats = this._data.stats?.[uuid] || {};
    const metadata = [
      this._countryName(station.countrycode, station.country),
      station.codec,
      station.bitrate ? `${station.bitrate} kb/s` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    const stationLogo = station.favicon && !this._failedLogoUrls.has(this._absoluteLogoUrl(station.favicon))
      ? station.favicon
      : RADIO_PLAY_LOGO_URL;
    const favicon = `<img class="logo station-logo" src="${this._escape(stationLogo)}" alt="Logo ${this._escape(station.name)}" loading="lazy" referrerpolicy="no-referrer" data-logo-fallback="true">`;
    const sourceBadge = favorite
      ? `<span class="badge ${favorite.favorite_source === "automatic" ? "auto" : "manual"}">${
          favorite.favorite_source === "automatic" ? "Automatyczne" : "Ręczne"
        }</span>`
      : "";

    return `
      <article class="station" data-uuid="${this._escape(uuid)}">
        ${favicon}
        <div class="station-main">
          <div class="station-title-row">
            <div class="station-name">${this._escape(station.name)}</div>
            ${sourceBadge}
          </div>
          <div class="station-meta">${this._escape(metadata || "Radio internetowe")}</div>
          <div class="station-tags">${this._escape(station.tags || station.language || "")}</div>
          <div class="station-stats">
            ${stats.play_count ? `<span class="stat-icon">${this._icon("play")} ${Number(stats.play_count)}</span>` : ""}
            ${stats.listened_seconds ? `<span>◷ ${this._escape(this._formatDuration(stats.listened_seconds))}</span>` : ""}
          </div>
        </div>
        <div class="station-actions">
          <button class="round-button play" data-action="play" aria-label="Odtwórz">${this._icon("play")}</button>
          <button class="round-button favorite ${favorite ? "active" : ""}" data-action="favorite" aria-label="Ulubione">${favorite ? this._icon("heart") : this._icon("heartOutline")}</button>
        </div>
      </article>
    `;
  }

  _stationList(stations, emptyText) {
    if (this._loading) return `<div class="surface empty">Ładowanie stacji…</div>`;
    if (!stations.length) return `<div class="surface empty">${this._escape(emptyText)}</div>`;
    return `<div class="station-list">${stations.map((station) => this._stationCard(station)).join("")}</div>`;
  }

  _discoverView() {
    const filters = this._searchFilters || {};
    return `
      <section class="surface search-surface">
        <div class="section-heading">
          <div class="brand-heading">
            <img class="brand-logo" src="${RADIO_PLAY_LOGO_URL}" alt="Logo Radio Play">
            <div>
              <h1>Radio Play</h1>
              <p>Znajdź stację po nazwie, kraju, języku lub gatunku.</p>
            </div>
          </div>
          <button class="ghost-button" data-action="popular">Polskie stacje</button>
        </div>
        <form id="search-form" class="search-grid">
          <div class="field wide">
            <label for="query">Nazwa stacji</label>
            <input id="query" type="text" value="${this._escape(filters.query || "")}" placeholder="np. RMF, BBC, jazz">
          </div>
          <div class="field">
            <label for="country">Kraj</label>
            <select id="country">${this._countryOptions(filters.countrycode || "PL")}</select>
          </div>
          <div class="field">
            <label for="language">Język audycji</label>
            <select id="language">${this._languageOptions(filters.language || "")}</select>
          </div>
          <div class="field">
            <label for="tag">Gatunek</label>
            <input id="tag" type="text" value="${this._escape(filters.tag || "")}" placeholder="np. rock, wiadomości, jazz">
          </div>
          <label class="check-field">
            <input id="https-only" type="checkbox" ${filters.httpsOnly ? "checked" : ""}>
            Tylko HTTPS
          </label>
          <button class="primary-button" type="submit">Szukaj</button>
        </form>
      </section>

      <div class="subnav">
        <button class="subnav-button ${this._discoverMode === "popular" ? "active" : ""}" data-action="popular">Popularne w Polsce</button>
        <button class="subnav-button ${this._discoverMode === "results" ? "active" : ""}" data-action="results">Wyniki wyszukiwania</button>
      </div>

      ${this._stationList(
        this._stations,
        this._discoverMode === "results"
          ? "Brak wyników. Zmień filtry i spróbuj ponownie."
          : "Nie udało się pobrać popularnych polskich stacji."
      )}
    `;
  }

  _favoritesView() {
    const favorites = this._favoriteValues();
    const manual = favorites.filter((item) => item.favorite_source !== "automatic");
    const automatic = favorites.filter((item) => item.favorite_source === "automatic");
    return `
      <section class="section-heading page-heading">
        <div>
          <h1>Ulubione</h1>
          <p>Stacje zapisane ręcznie i dodane automatycznie.</p>
        </div>
        <span class="count-pill">${favorites.length}</span>
      </section>

      <section class="favorite-group">
        <div class="group-title">
          <div><span class="group-icon">${this._icon("heart")}</span><h2>Dodane ręcznie</h2></div>
          <span>${manual.length}</span>
        </div>
        ${this._stationList(manual, "Nie masz jeszcze ręcznie dodanych stacji.")}
      </section>

      <section class="favorite-group">
        <div class="group-title">
          <div><span class="group-icon auto">${this._icon("star")}</span><h2>Dodane automatycznie</h2></div>
          <span>${automatic.length}</span>
        </div>
        ${this._stationList(automatic, "Żadna stacja nie osiągnęła jeszcze ustawionego progu.")}
      </section>
    `;
  }

  _outputOptions(selectedOutput) {
    return `
      <option value="browser" ${selectedOutput === "browser" ? "selected" : ""}>To urządzenie</option>
      ${this._mediaPlayers()
        .map(
          (player) => `<option value="${this._escape(player.entity_id)}" ${
            selectedOutput === player.entity_id ? "selected" : ""
          }>${this._escape(player.attributes.friendly_name || player.entity_id)}</option>`
        )
        .join("")}
    `;
  }

  _settingsView() {
    const settings = this._data.settings || {};
    const selectedOutput = this._selectedOutput();
    const volume = this._volumePercent(selectedOutput);
    const volumeSupported = this._volumeSupported(selectedOutput);
    const volumeHint = selectedOutput === "browser"
      ? "Suwak zmienia głośność od razu na tym urządzeniu. Na iPhonie i iPadzie system może wymagać użycia fizycznych przycisków głośności."
      : volumeSupported
        ? `Suwak steruje głośnością urządzenia „${this._escape(this._outputName())}” przez usługę media_player.volume_set.`
        : `Urządzenie „${this._escape(this._outputName())}” nie udostępnia sterowania głośnością w Home Assistant.`;
    const autoReconnect = this._autoReconnectEnabled();
    const directHttps = this._preferDirectHttps();
    const stallSeconds = Math.round(this._stallTimeoutMs() / 1000);
    return `
      <section class="section-heading page-heading">
        <div>
          <h1>Ustawienia</h1>
          <p>Wybierz urządzenie, stabilność połączenia i zasady automatycznych ulubionych.</p>
        </div>
      </section>

      <section class="surface settings-card">
        <h2>Odtwarzanie</h2>
        <div class="settings-grid">
          <div class="field">
            <label for="settings-output">Odtwarzaj na</label>
            <select id="settings-output" data-output-select>${this._outputOptions(selectedOutput)}</select>
          </div>
          <div class="field">
            <label for="output-volume">Głośność — ${this._escape(this._outputName())}: <strong id="volume-value">${volume}%</strong></label>
            <input id="output-volume" data-volume-output="${this._escape(selectedOutput)}" type="range" min="0" max="100" step="1" value="${volume}" ${volumeSupported ? "" : "disabled"}>
          </div>
        </div>
        <p class="hint">${volumeHint}</p>
      </section>

      <section class="surface settings-card">
        <h2>Stabilność połączenia</h2>
        <label class="toggle-row">
          <div>
            <strong>Automatycznie wznawiaj radio</strong>
            <span>Po zerwaniu panel ponawia połączenie bez limitu: po 1, 3, 7, 15 sekundach, a następnie co 30 sekund.</span>
          </div>
          <input id="auto-reconnect" type="checkbox" ${autoReconnect ? "checked" : ""}>
        </label>
        <label class="toggle-row stability-row">
          <div>
            <strong>Bezpośrednie HTTPS</strong>
            <span>Opcja mniej stabilna i na iPhonie zawsze pomijana. Proxy Home Assistanta może ponownie otworzyć strumień po stronie serwera bez zamykania odtwarzacza podczas blokady ekranu.</span>
          </div>
          <input id="direct-https" type="checkbox" ${directHttps ? "checked" : ""}>
        </label>
        <div class="settings-grid thresholds">
          <div class="field">
            <label for="stall-seconds">Wznów po braku dźwięku (sekundy)</label>
            <input id="stall-seconds" type="number" min="8" max="60" value="${stallSeconds}">
          </div>
          <div class="connection-info">
            <strong>Aktualny stan</strong>
            <span>${this._escape(this._connectionLabel())}</span>
          </div>
        </div>
      </section>

      <section class="surface settings-card">
        <h2>Automatyczne ulubione</h2>
        <label class="toggle-row">
          <div>
            <strong>Automatyczne dodawanie</strong>
            <span>Dodaj stację, gdy spełni jeden z poniższych progów.</span>
          </div>
          <input id="auto-favorite" type="checkbox" ${settings.auto_favorite ? "checked" : ""}>
        </label>
        <div class="settings-grid thresholds">
          <div class="field">
            <label for="auto-plays">Próg uruchomień</label>
            <input id="auto-plays" type="number" min="1" max="100" value="${Number(settings.auto_favorite_plays || 3)}">
          </div>
          <div class="field">
            <label for="auto-minutes">Próg czasu słuchania (minuty)</label>
            <input id="auto-minutes" type="number" min="1" max="1440" value="${Number(settings.auto_favorite_minutes || 20)}">
          </div>
        </div>
        <button id="save-settings" class="primary-button save-button">Zapisz wszystkie ustawienia</button>
      </section>

      <footer class="version-footer" aria-label="Informacje o zainstalowanej wersji">
        <span>Radio Panel</span>
        <strong>Wersja ${this._escape(RADIO_PANEL_VERSION)}</strong>
      </footer>
    `;
  }

  _playerBar() {
    const station = this._currentStation;
    const favorite = station ? this._data.favorites?.[station.stationuuid] : null;
    const data = this._playerData();
    const requestedLogo = this._absoluteLogoUrl(data.logo);
    const playerLogo = this._failedLogoUrls.has(requestedLogo) ? RADIO_PLAY_LOGO_URL : (data.logo || RADIO_PLAY_LOGO_URL);
    const favicon = `<img data-role="player-logo" src="${this._escape(playerLogo)}" alt="Logo stacji" referrerpolicy="no-referrer" data-logo-fallback="true">`;
    const statusClass = ["reconnecting", "buffering", "failed"].includes(this._connectionState)
      ? this._connectionState
      : "";
    const position = data.duration ? Math.min(data.position, data.duration) : data.position;
    const progress = data.duration ? Math.min(100, Math.max(0, (position / data.duration) * 100)) : 0;
    const visible = station && !this._playerDismissed;
    const reopenVisible = station && this._playerDismissed;
    return `
      <aside class="player-bar ${visible ? "visible" : ""}" aria-hidden="${visible ? "false" : "true"}">
        <div class="player-inner">
          <button class="player-close" data-action="player-close" title="Ukryj panel odtwarzania" aria-label="Ukryj panel odtwarzania">×</button>
          <div class="now-playing-logo">${favicon}</div>
          <div class="now-playing-details">
            <div class="player-heading-row">
              <strong class="player-station" data-role="player-station">${this._escape(data.stationName)}</strong>
              <span class="player-status ${statusClass}" data-role="player-status">${this._escape(this._playerStatusLabel())}</span>
            </div>
            <div class="player-track" data-role="player-track" title="${this._escape(data.artist ? `${data.artist} — ${data.title}` : data.title)}">
              ${data.artist ? `<span>${this._escape(data.artist)}</span><b> — ${this._escape(data.title)}</b>` : `<b>${this._escape(data.title)}</b>`}
            </div>
            <div class="track-time-row">
              <span data-role="track-position">${this._formatClock(position)}</span>
              <div class="track-progress ${data.live ? "live" : ""}"><i data-role="track-progress" style="width:${progress}%"></i></div>
              <span data-role="track-duration">${data.duration ? this._formatClock(data.duration) : "LIVE"}</span>
            </div>
          </div>
          <div class="player-controls">
            <button class="control-button play-control" data-action="current-play" title="Odtwórz" aria-label="Odtwórz" ${!station || this._wantsPlayback ? "disabled" : ""}>▶</button>
            <button class="control-button" data-action="current-pause" title="Pauza" aria-label="Pauza" ${!station || !this._wantsPlayback ? "disabled" : ""}>Ⅱ</button>
            <button class="control-button stop-control" data-action="current-stop" title="Stop" aria-label="Stop" ${!station || this._connectionState === "stopped" ? "disabled" : ""}>■</button>
            <button class="favorite-control ${favorite ? "active" : ""}" data-action="current-favorite" title="Ulubione" aria-label="Ulubione" ${station ? "" : "disabled"}>${favorite ? "♥" : "♡"}</button>
          </div>
        </div>
      </aside>
      <button class="player-reopen ${reopenVisible ? "visible" : ""}" data-action="player-reopen" title="Pokaż panel odtwarzania" aria-label="Pokaż panel odtwarzania">♫</button>
    `;
  }
  _bottomNav() {
    const favoriteCount = Object.keys(this._data.favorites || {}).length;
    return `
      <nav class="bottom-nav" aria-label="Radio">
        <button class="nav-item ${this._section === "discover" ? "active" : ""}" data-section="discover">
          <span class="nav-icon">${this._icon("radio")}</span><span>Radio</span>
        </button>
        <button class="nav-item ${this._section === "favorites" ? "active" : ""}" data-section="favorites">
          <span class="nav-icon">${this._icon("heart")}</span><span>Ulubione</span>${favoriteCount ? `<b>${favoriteCount}</b>` : ""}
        </button>
        <button class="nav-item ${this._section === "settings" ? "active" : ""}" data-section="settings">
          <span class="nav-icon">${this._icon("settings")}</span><span>Ustawienia</span>
        </button>
      </nav>
    `;
  }

  _render() {
    if (!this.shadowRoot) return;
    const sectionContent =
      this._section === "favorites"
        ? this._favoritesView()
        : this._section === "settings"
          ? this._settingsView()
          : this._discoverView();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          min-height: 100%;
          background: var(--primary-background-color, #f4f6f8);
          color: var(--primary-text-color, #1f2937);
          font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
        }
        * { box-sizing: border-box; }
        button, input, select { font: inherit; }
        button { cursor: pointer; }
        .rp-icon { width: 21px; height: 21px; display: block; }
        button:disabled { opacity: .45; cursor: default; }
        .app-shell { min-height: 100vh; padding-bottom: 92px; }
        .content { width: min(1120px, 100%); margin: 0 auto; padding: 22px 18px 30px; }
        h1, h2, p { margin-top: 0; }
        h1 { margin-bottom: 5px; font-size: clamp(25px, 4vw, 34px); letter-spacing: -.03em; }
        h2 { margin-bottom: 14px; font-size: 19px; }
        p { color: var(--secondary-text-color, #667085); line-height: 1.5; }
        .surface {
          background: var(--card-background-color, white);
          border-radius: 19px;
          padding: 18px;
          box-shadow: var(--ha-card-box-shadow, 0 2px 14px rgba(15,23,42,.08));
        }
        .section-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .section-heading p { margin-bottom: 0; }
        .brand-heading { display: flex; align-items: center; gap: 14px; min-width: 0; }
        .brand-heading > div { min-width: 0; }
        .brand-logo { width: 62px; height: 62px; flex: 0 0 auto; border-radius: 17px; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(2, 55, 120, .28)); }
        .page-heading { margin: 4px 2px 20px; }
        .count-pill { min-width: 42px; padding: 7px 12px; text-align: center; border-radius: 999px; background: var(--primary-color, #03a9f4); color: white; font-weight: 750; }
        .search-surface { margin-bottom: 16px; }
        .search-grid { display: grid; grid-template-columns: 2fr 110px 1fr 1fr auto auto; gap: 10px; align-items: end; margin-top: 18px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        label { color: var(--secondary-text-color, #667085); font-size: 13px; }
        input[type="text"], input[type="number"], select {
          width: 100%; min-height: 44px; padding: 9px 12px;
          border: 1px solid var(--divider-color, #d7dce2); border-radius: 11px;
          background: var(--card-background-color, white); color: var(--primary-text-color, #1f2937);
        }
        input[type="range"] { width: 100%; accent-color: var(--primary-color, #03a9f4); }
        .check-field { min-height: 44px; display: flex; align-items: center; gap: 7px; white-space: nowrap; }
        .primary-button, .ghost-button {
          min-height: 44px; border: 0; border-radius: 11px; padding: 9px 16px; font-weight: 750;
        }
        .primary-button { background: var(--primary-color, #03a9f4); color: white; }
        .ghost-button { background: var(--secondary-background-color, #edf1f4); color: var(--primary-text-color, #1f2937); }
        .subnav { display: flex; gap: 8px; margin: 0 0 14px; overflow-x: auto; }
        .subnav-button { border: 0; padding: 9px 15px; border-radius: 999px; white-space: nowrap; background: var(--secondary-background-color, #e9edf1); color: var(--primary-text-color, #1f2937); }
        .subnav-button.active { background: var(--primary-color, #03a9f4); color: white; }
        .message { position: sticky; top: 8px; z-index: 5; margin: 0 auto 14px; max-width: 1120px; padding: 11px 14px; border-radius: 12px; background: var(--secondary-background-color, #edf1f4); box-shadow: 0 2px 12px rgba(0,0,0,.08); }
        .message.error { background: #feeceb; color: var(--error-color, #c62828); }
        .message.success { background: #e7f7ea; color: #237a39; }
        .station-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        .station { display: grid; grid-template-columns: 58px minmax(0,1fr) auto; gap: 12px; align-items: center; padding: 13px; border-radius: 16px; background: var(--card-background-color, white); box-shadow: var(--ha-card-box-shadow, 0 1px 8px rgba(15,23,42,.07)); }
        .logo { width: 58px; height: 58px; border-radius: 13px; object-fit: contain; background: white; }
        .placeholder { display: grid; place-items: center; font-size: 27px; background: var(--secondary-background-color, #edf1f4); }
        .station-logo[data-fallback-active="true"] { padding: 3px; }
        .station-main { min-width: 0; }
        .station-title-row { display: flex; gap: 7px; align-items: center; min-width: 0; }
        .station-name { min-width: 0; font-weight: 780; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .badge { flex: 0 0 auto; font-size: 10px; padding: 3px 6px; border-radius: 999px; background: rgba(3,169,244,.13); color: var(--primary-color, #0277bd); }
        .badge.auto { background: rgba(255,152,0,.16); color: #b25f00; }
        .station-meta, .station-tags { margin-top: 3px; font-size: 12px; color: var(--secondary-text-color, #667085); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .station-stats { display: flex; gap: 10px; margin-top: 5px; font-size: 11px; color: var(--secondary-text-color, #667085); }
        .stat-icon { display: inline-flex; align-items: center; gap: 3px; }
        .stat-icon .rp-icon { width: 11px; height: 11px; }
        .station-actions { display: flex; gap: 6px; }
        .round-button { width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid rgba(127,138,153,.16); border-radius: 50%; background: linear-gradient(145deg, rgba(255,255,255,.9), var(--secondary-background-color, #e9edf1)); color: var(--primary-text-color, #1f2937); box-shadow: 0 5px 12px rgba(15,23,42,.10), inset 0 1px 0 rgba(255,255,255,.7); transition: transform .12s ease; }
        .round-button:hover { transform: translateY(-1px); }
        .round-button .rp-icon { width: 20px; height: 20px; }
        .round-button.play { background: linear-gradient(145deg, #68bdff, var(--primary-color, #1688ef)); color: white; box-shadow: 0 7px 16px rgba(22,136,239,.28), inset 0 1px 0 rgba(255,255,255,.4); }
        .round-button.favorite.active, .player-favorite.active { color: #e53935; }
        .empty { text-align: center; padding: 42px 16px; color: var(--secondary-text-color, #667085); }
        .favorite-group { margin-bottom: 24px; }
        .group-title { display: flex; align-items: center; justify-content: space-between; margin: 0 3px 10px; color: var(--secondary-text-color, #667085); }
        .group-title > div { display: flex; align-items: center; gap: 8px; }
        .group-title h2 { margin: 0; color: var(--primary-text-color, #1f2937); }
        .group-icon { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 9px; background: rgba(229,57,53,.12); color: #e53935; }
        .group-icon .rp-icon { width: 17px; height: 17px; }
        .group-icon.auto { background: rgba(255,152,0,.14); color: #d97706; }
        .settings-card { margin-bottom: 14px; }
        .diagnostic-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; margin: 12px 0; }
        .diagnostic-actions #diagnostics-status { font-size: 12px; color: var(--secondary-text-color, #667085); }
        .diagnostics-output {
          width: 100%;
          min-height: 220px;
          resize: vertical;
          border: 1px solid var(--divider-color, #d7dce2);
          border-radius: 12px;
          padding: 12px;
          background: var(--secondary-background-color, #edf1f4);
          color: var(--primary-text-color, #1f2937);
          font: 11px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }
        .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 18px; }
        .thresholds { margin-top: 17px; }
        .toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 4px 0; }
        .stability-row { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--divider-color, #e1e5e9); }
        .connection-info { min-height: 68px; display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 10px 12px; border-radius: 11px; background: var(--secondary-background-color, #edf1f4); }
        .connection-info span { color: var(--secondary-text-color, #667085); font-size: 13px; }
        .toggle-row div { display: flex; flex-direction: column; gap: 3px; }
        .toggle-row span { font-size: 12px; }
        .toggle-row input { width: 22px; height: 22px; accent-color: var(--primary-color, #03a9f4); }
        .save-button { margin-top: 18px; }
        .hint, .info-card p { margin: 12px 0 0; font-size: 13px; }
        .version-footer { display: flex; justify-content: center; align-items: center; gap: 7px; padding: 12px 8px 4px; color: var(--secondary-text-color, #667085); font-size: 12px; line-height: 1.4; }
        .version-footer strong { color: var(--primary-text-color, #1f2937); font-weight: 700; }
        .startup-overlay { position: fixed; inset: 0; z-index: 2147482500; display: grid; place-items: center; padding: 20px; background: rgba(6,10,16,.68); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); }
        .startup-dialog { width: min(470px, 100%); padding: 28px; border: 1px solid rgba(255,255,255,.13); border-radius: 24px; color: #f8fafc; text-align: center; background: linear-gradient(145deg, rgba(32,35,43,.985), rgba(13,16,22,.99)); box-shadow: 0 28px 80px rgba(0,0,0,.55); }
        .startup-dialog h2 { margin: 14px 0 10px; font-size: 23px; }
        .startup-dialog p { margin: 0 0 10px; color: rgba(226,232,240,.86); }
        .startup-dialog .startup-note { font-size: 13px; color: rgba(203,213,225,.72); }
        .startup-icon { width: 64px; height: 64px; margin: 0 auto; display: grid; place-items: center; border-radius: 20px; color: white; background: linear-gradient(145deg, #68bdff, var(--primary-color, #1688ef)); box-shadow: 0 12px 28px rgba(22,136,239,.34), inset 0 1px 0 rgba(255,255,255,.35); }
        .startup-icon .rp-icon { width: 34px; height: 34px; }
        .startup-actions { display: flex; justify-content: center; gap: 10px; margin-top: 22px; }
        .startup-actions .ghost-button { background: rgba(255,255,255,.10); color: #f8fafc; }
        .player-bar { position: fixed; z-index: 1000; left: 0; right: 0; bottom: calc(67px + env(safe-area-inset-bottom)); padding: 0 12px; pointer-events: none; transform: translateY(18px); opacity: 0; transition: .18s ease; }
        .player-bar.visible { pointer-events: auto; transform: translateY(0); opacity: 1; }
        .player-inner { position: relative; width: min(920px, 100%); min-height: 112px; margin: 0 auto; padding: 14px 52px 14px 14px; display: grid; grid-template-columns: 72px minmax(0,1fr) auto; align-items: center; gap: 14px; border: 1px solid rgba(255,255,255,.10); border-radius: 18px; color: #f8fafc; background: rgba(24, 29, 36, .97); box-shadow: 0 12px 36px rgba(0,0,0,.48); backdrop-filter: blur(14px); }
        .now-playing-logo img, .mini-placeholder { width: 68px; height: 68px; border-radius: 14px; object-fit: contain; background: white; }
        .now-playing-details { min-width: 0; }
        .player-heading-row { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .player-station { min-width: 0; font-size: 14px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .player-status { margin-left: auto; font-size: 11px; color: rgba(226,232,240,.76); white-space: nowrap; }
        .player-status.reconnecting, .player-status.buffering { color: #fbbf24; }
        .player-status.failed { color: #f87171; }
        .player-track { margin-top: 7px; color: #f8fafc; font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .player-track span { color: rgba(226,232,240,.76); }
        .track-time-row { display: grid; grid-template-columns: auto minmax(80px,1fr) auto; align-items: center; gap: 9px; margin-top: 9px; font-variant-numeric: tabular-nums; font-size: 11px; color: rgba(226,232,240,.76); }
        .track-progress { position: relative; height: 4px; overflow: hidden; border-radius: 999px; background: rgba(255,255,255,.18); }
        .track-progress i { display: block; height: 100%; border-radius: inherit; background: var(--primary-color, #03a9f4); transition: width .3s linear; }
        .track-progress.live::after { content: ""; position: absolute; top: 0; bottom: 0; width: 28%; border-radius: inherit; background: var(--primary-color, #03a9f4); opacity: .7; animation: live-progress 1.8s ease-in-out infinite; }
        @keyframes live-progress { from { left: -30%; } to { left: 102%; } }
        .player-controls { display: flex; align-items: center; gap: 8px; }
        .control-button, .favorite-control { width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.08); border-radius: 50%; background: rgba(255,255,255,.10); color: #f8fafc; font-size: 17px; }
        .control-button:hover, .favorite-control:hover, .player-close:hover, .player-reopen:hover { background: rgba(255,255,255,.18); }
        .play-control { background: var(--primary-color, #03a9f4); color: white; }
        .stop-control { font-size: 15px; }
        .favorite-control { width: 36px; height: 36px; font-size: 18px; }
        .favorite-control.active { color: #fb7185; }
        .player-close { position: absolute; z-index: 2; top: 8px; right: 9px; width: 32px; height: 32px; display: grid; place-items: center; border: 0; border-radius: 50%; background: rgba(255,255,255,.08); color: rgba(255,255,255,.82); font-size: 23px; line-height: 1; }
        .player-reopen { position: fixed; z-index: 1001; right: 16px; bottom: calc(78px + env(safe-area-inset-bottom)); width: 48px; height: 48px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.12); border-radius: 50%; background: rgba(24,29,36,.97); color: white; box-shadow: 0 8px 24px rgba(0,0,0,.38); font-size: 22px; pointer-events: none; opacity: 0; transform: scale(.85); transition: .18s ease; }
        .player-reopen.visible { pointer-events: auto; opacity: 1; transform: scale(1); }
        .bottom-nav { position: fixed; z-index: 25; left: 0; right: 0; bottom: 0; min-height: calc(68px + env(safe-area-inset-bottom)); padding: 6px max(10px, env(safe-area-inset-left)) env(safe-area-inset-bottom) max(10px, env(safe-area-inset-right)); display: grid; grid-template-columns: repeat(3, 1fr); background: var(--card-background-color, rgba(255,255,255,.94)); background: color-mix(in srgb, var(--card-background-color, white) 88%, transparent); border-top: 1px solid var(--divider-color, #e1e5e9); box-shadow: 0 -4px 18px rgba(15,23,42,.08); backdrop-filter: blur(18px) saturate(145%); }
        .nav-item { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; border: 0; background: transparent; color: var(--secondary-text-color, #667085); font-size: 11px; font-weight: 650; }
        .nav-item.active { color: var(--primary-color, #03a9f4); }
        .nav-icon { line-height: 1; }
        .nav-icon .rp-icon { width: 24px; height: 24px; }
        .nav-item b { position: absolute; top: 1px; left: calc(50% + 9px); min-width: 18px; padding: 2px 5px; border-radius: 999px; background: #e53935; color: white; font-size: 10px; }
        @media (max-width: 900px) {
          .content { padding: 14px 12px 24px; }
          .search-grid { grid-template-columns: 1fr 1fr; }
          .search-grid .wide { grid-column: 1 / -1; }
          .station-list { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .app-shell { padding-bottom: 96px; }
          .surface { border-radius: 15px; padding: 14px; }
          .search-grid, .settings-grid { grid-template-columns: 1fr; }
          .search-grid .wide { grid-column: auto; }
          .section-heading { align-items: flex-start; }
          .brand-heading { gap: 10px; }
          .brand-logo { width: 52px; height: 52px; }
          .station { grid-template-columns: 50px minmax(0,1fr); }
          .logo { width: 50px; height: 50px; }
          .station-actions { grid-column: 1 / -1; justify-content: flex-end; }
          .player-inner { min-height: 166px; padding: 14px 44px 14px 14px; grid-template-columns: 54px minmax(0,1fr); align-items: start; }
          .now-playing-logo img, .mini-placeholder { width: 52px; height: 52px; }
          .player-controls { grid-column: 1 / -1; justify-content: center; }
          .player-heading-row { display: block; }
          .player-status { display: block; margin: 3px 0 0; overflow: hidden; text-overflow: ellipsis; }
          .player-track { font-size: 14px; }
          .favorite-control { display: none; }
          .startup-dialog { padding: 22px 18px; border-radius: 20px; }
          .startup-actions { flex-direction: column-reverse; }
          .startup-actions button { width: 100%; }
        }
      </style>
      ${this._radioBrowserStartupDialog()}
      <div class="app-shell">
        ${this._message ? `<div class="message ${this._escape(this._messageKind)}">${this._escape(this._message)}</div>` : ""}
        <main class="content">${sectionContent}</main>
        ${this._bottomNav()}
      </div>
    `;

    this._bindEvents();
    this._updateGlobalPlayerContent();
    if (this._currentStation) {
      this._startPlayerClock();
      this._updatePlayerDynamic();
    }
  }

  _bindEvents() {
    const root = this.shadowRoot;
    if (!root) return;

    root.querySelector('[data-action="radio-browser-continue"]')?.addEventListener("click", () => {
      this._radioBrowserPromptHandled = true;
      this._radioBrowserPromptVisible = false;
      this._initialize(true);
    });

    root.querySelector('[data-action="radio-browser-install"]')?.addEventListener("click", () => {
      this._openRadioBrowserSetup();
    });

    root.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", () => {
        this._section = button.dataset.section;
        this._render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    root.querySelector("#search-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const httpsOnly = root.querySelector("#https-only")?.checked ?? false;
      const countrycode = root.querySelector("#country")?.value || "";
      const language = root.querySelector("#language")?.value || "";
      localStorage.setItem("radio_panel_https_only", String(httpsOnly));
      localStorage.setItem("radio_panel_country", countrycode || "PL");
      localStorage.setItem("radio_panel_language", language);
      this._search({
        query: root.querySelector("#query")?.value || "",
        countrycode,
        language,
        tag: root.querySelector("#tag")?.value || "",
        httpsOnly,
        isUserSearch: true,
      });
    });

    root.querySelectorAll('[data-action="popular"]').forEach((button) => {
      button.addEventListener("click", () => this._loadPopular());
    });

    root.querySelector('[data-action="results"]')?.addEventListener("click", () => {
      this._discoverMode = "results";
      this._render();
    });

    root.querySelectorAll(".station").forEach((card) => {
      const station = this._findStation(card.dataset.uuid);
      if (!station) return;
      card.querySelector('[data-action="play"]')?.addEventListener("click", () => this._play(station));
      card.querySelector('[data-action="favorite"]')?.addEventListener("click", () => this._toggleFavorite(station));
      card.querySelector("img.station-logo")?.addEventListener("error", (event) => {
        const image = event.currentTarget;
        const fallbackLogo = this._absoluteLogoUrl(RADIO_PLAY_LOGO_URL);
        if (image.src === fallbackLogo) return;
        this._failedLogoUrls.add(image.src);
        image.dataset.fallbackActive = "true";
        image.src = RADIO_PLAY_LOGO_URL;
      });
    });

    root.querySelector('[data-action="current-play"]')?.addEventListener("click", () => this._playOrResume());
    root.querySelector('[data-action="current-pause"]')?.addEventListener("click", () => this._pause());
    root.querySelector('[data-action="current-stop"]')?.addEventListener("click", () => this._stop());
    root.querySelector('[data-action="player-close"]')?.addEventListener("click", () => {
      this._playerDismissed = true;
      this._render();
      this._updateGlobalPlayerContent();
    });
    root.querySelector('[data-action="player-reopen"]')?.addEventListener("click", () => {
      this._playerDismissed = false;
      this._render();
      this._updateGlobalPlayerContent();
    });
    root.querySelector('[data-action="current-favorite"]')?.addEventListener("click", () => {
      if (this._currentStation) this._toggleFavorite(this._currentStation);
    });

    root.querySelectorAll("[data-output-select]").forEach((select) => {
      select.addEventListener("change", (event) => this._changeOutput(event.target.value));
    });

    const volumeInput = root.querySelector("#output-volume");
    volumeInput?.addEventListener("input", (event) => {
      const value = Number(event.target.value || 80);
      const output = event.target.dataset.volumeOutput || this._selectedOutput();
      const label = root.querySelector("#volume-value");
      if (label) label.textContent = `${value}%`;
      this._queueVolumeChange(output, value);
    });
    volumeInput?.addEventListener("change", (event) => {
      const value = Number(event.target.value || 80);
      const output = event.target.dataset.volumeOutput || this._selectedOutput();
      if (this._volumeChangeTimer) {
        window.clearTimeout(this._volumeChangeTimer);
        this._volumeChangeTimer = null;
      }
      this._applyVolume(output, value).catch((error) => {
        this._setMessage(`Nie udało się zmienić głośności: ${this._errorText(error)}`, "error");
      });
    });

    root.querySelector("#save-settings")?.addEventListener("click", () => this._saveSettings());

    root.querySelectorAll(".now-playing-logo img").forEach((image) => {
      image.addEventListener("load", () => {
        image.dataset.loadedLogo = image.currentSrc || image.src;
      });
      image.addEventListener("error", () => {
        const fallbackLogo = this._absoluteLogoUrl(RADIO_PLAY_LOGO_URL);
        if (image.src === fallbackLogo) return;
        this._failedLogoUrls.add(image.src);
        image.dataset.fallbackActive = "true";
        image.src = RADIO_PLAY_LOGO_URL;
      });
    });
  }
}

if (!customElements.get("radio-panel")) {
  customElements.define("radio-panel", RadioPanel);
}
