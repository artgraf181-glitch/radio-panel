#!/usr/bin/env python3
"""Validate the repository structure and synchronized release version."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INTEGRATION = ROOT / "custom_components" / "radio_panel"
ERRORS: list[str] = []


def error(message: str) -> None:
    ERRORS.append(message)


required = [
    ROOT / "README.md",
    ROOT / "hacs.json",
    INTEGRATION / "__init__.py",
    INTEGRATION / "manifest.json",
    INTEGRATION / "config_flow.py",
    INTEGRATION / "brand" / "icon.png",
]
for path in required:
    if not path.exists():
        error(f"Brak wymaganego pliku: {path.relative_to(ROOT)}")

try:
    manifest = json.loads((INTEGRATION / "manifest.json").read_text(encoding="utf-8"))
except Exception as exc:  # noqa: BLE001
    error(f"Nieprawidłowy manifest.json: {exc}")
    manifest = {}

for key in ("domain", "documentation", "issue_tracker", "codeowners", "name", "version"):
    if not manifest.get(key):
        error(f"manifest.json: brak wartości {key}")

if manifest.get("domain") != "radio_panel":
    error("manifest.json: domain musi mieć wartość radio_panel")

version = str(manifest.get("version", ""))
const_text = (INTEGRATION / "const.py").read_text(encoding="utf-8")
js_text = (INTEGRATION / "frontend" / "radio-panel.js").read_text(encoding="utf-8")
const_match = re.search(r'^VERSION\s*=\s*"([^"]+)"', const_text, re.MULTILINE)
js_match = re.search(r'^const RADIO_PANEL_VERSION\s*=\s*"([^"]+)";', js_text, re.MULTILINE)
if not const_match or const_match.group(1) != version:
    error("Numer VERSION w const.py nie zgadza się z manifest.json")
if not js_match or js_match.group(1) != version:
    error("RADIO_PANEL_VERSION w JavaScript nie zgadza się z manifest.json")

for path in ROOT.rglob("*"):
    if path.name == "__pycache__" or path.suffix == ".pyc":
        error(f"Niedozwolony artefakt Pythona: {path.relative_to(ROOT)}")

text_files = [
    INTEGRATION / "manifest.json",
    ROOT / "README.md",
    ROOT / "LICENSE",
    ROOT / ".github" / "CODEOWNERS",
]
for path in text_files:
    text = path.read_text(encoding="utf-8")
    if "YOUR_GITHUB_USERNAME" in text or "YOUR_REPOSITORY_NAME" in text:
        error(f"Nieuzupełniony placeholder: {path.relative_to(ROOT)}")

if ERRORS:
    print("Walidacja zakończona błędami:")
    for item in ERRORS:
        print(f"- {item}")
    sys.exit(1)

print(f"Radio Panel {version}: struktura repozytorium jest poprawna.")
