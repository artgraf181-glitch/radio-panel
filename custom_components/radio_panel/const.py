"""Constants for Radio Panel."""

DOMAIN = "radio_panel"
VERSION = "1.7.14"
STORAGE_KEY = DOMAIN
STORAGE_VERSION = 1
PANEL_URL = "radio-panel"
PANEL_TITLE = "Radio"
PANEL_ICON = "mdi:radio-tower"
FRONTEND_URL = "/radio_panel/radio-panel.js"
LOGO_URL = "/radio_panel/radio-play-logo.svg"
LOGO_PNG_URL = "/radio_panel/radio-play-logo.png"
LOGO_PROXY_URL = "/api/radio_panel/logo/{station_uuid}/{cache_key}"
API_BASE_URL = "https://all.api.radio-browser.info"
DEFAULT_AUTO_FAVORITE_PLAYS = 3
DEFAULT_AUTO_FAVORITE_MINUTES = 20
DEFAULT_SEARCH_LIMIT = 50
MAX_SEARCH_LIMIT = 100

STREAM_URL = "/api/radio_panel/stream/{station_uuid}/{session_id}"
