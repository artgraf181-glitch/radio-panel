# Współtworzenie projektu

1. Utwórz fork repozytorium i osobną gałąź dla zmiany.
2. Nie dołączaj `__pycache__`, plików `.pyc`, logów ani danych prywatnej instancji Home Assistanta.
3. Zachowaj zgodność numerów wersji w:
   - `custom_components/radio_panel/manifest.json`,
   - `custom_components/radio_panel/const.py`,
   - `custom_components/radio_panel/frontend/radio-panel.js`.
4. Uruchom lokalną walidację:

   ```bash
   python scripts/validate_release.py
   python -m compileall -q custom_components/radio_panel
   node --check custom_components/radio_panel/frontend/radio-panel.js
   ```

5. Opisz sposób testowania i wersję Home Assistanta w Pull Request.

Zmiany dotyczące odtwarzania na iOS powinny być testowane zarówno przy aktywnym, jak i zablokowanym ekranie.
