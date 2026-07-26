"""Config flow for Radio Panel."""

from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries

from .const import DOMAIN, PANEL_TITLE


class RadioPanelConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Allow Radio Panel to be added from the Home Assistant UI."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, object] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Create the single Radio Panel instance."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title=PANEL_TITLE, data={})

        return self.async_show_form(step_id="user", data_schema=vol.Schema({}))
