# Lista przed publikacją

## 1. Uzupełnij właściciela repozytorium

Uruchom w katalogu projektu:

```bash
python scripts/configure_repository.py --owner TWOJ_LOGIN_GITHUB --repo radio-panel
```

Skrypt podmieni placeholdery w manifeście, README, licencji i CODEOWNERS.

## 2. Utwórz publiczne repozytorium GitHub

Zalecana nazwa: `radio-panel`.

Opis repozytorium:

```text
Internet radio panel for Home Assistant with Radio Browser and iOS HLS support.
```

Zalecane tematy:

```text
home-assistant hacs radio internet-radio radio-browser ios hls custom-integration
```

Włącz zakładkę **Issues**.

## 3. Sprawdź pliki lokalnie

```bash
python scripts/validate_release.py
python -m compileall -q custom_components/radio_panel
node --check custom_components/radio_panel/frontend/radio-panel.js
```

## 4. Wgraj zawartość katalogu głównego

Na GitHub powinny znaleźć się bezpośrednio `custom_components`, `.github`, `README.md`, `hacs.json` i pozostałe pliki. Nie wgrywaj nadrzędnego katalogu jako dodatkowego poziomu.

## 5. Poczekaj na GitHub Actions

Workflow sprawdza repozytorium przez HACS Action i Hassfest. HACS może zgłaszać brak opisu lub tematów repozytorium, dopóki nie zostaną ustawione w panelu GitHub.

## 6. Utwórz wydanie

Utwórz pełne GitHub Release z tagiem:

```text
1.7.13
```

Nie wystarczy utworzyć samego tagu.
