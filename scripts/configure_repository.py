#!/usr/bin/env python3
"""Replace repository placeholders before the first GitHub push."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OWNER_PLACEHOLDER = "YOUR_GITHUB_USERNAME"
REPO_PLACEHOLDER = "YOUR_REPOSITORY_NAME"


def _valid_owner(value: str) -> str:
    if not re.fullmatch(r"[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?", value):
        raise argparse.ArgumentTypeError("Nieprawidłowy login GitHub.")
    return value


def _valid_repo(value: str) -> str:
    if not re.fullmatch(r"[A-Za-z0-9._-]+", value):
        raise argparse.ArgumentTypeError("Nieprawidłowa nazwa repozytorium.")
    return value


def replace_text(path: Path, owner: str, repo: str) -> None:
    text = path.read_text(encoding="utf-8")
    text = text.replace(OWNER_PLACEHOLDER, owner).replace(REPO_PLACEHOLDER, repo)
    path.write_text(text, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--owner", required=True, type=_valid_owner, help="Login GitHub bez znaku @")
    parser.add_argument("--repo", default="radio-panel", type=_valid_repo, help="Nazwa repozytorium")
    args = parser.parse_args()

    manifest_path = ROOT / "custom_components" / "radio_panel" / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["codeowners"] = [f"@{args.owner}"]
    manifest["documentation"] = f"https://github.com/{args.owner}/{args.repo}#readme"
    manifest["issue_tracker"] = f"https://github.com/{args.owner}/{args.repo}/issues"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for relative in (
        "README.md",
        "LICENSE",
        ".github/CODEOWNERS",
    ):
        replace_text(ROOT / relative, args.owner, args.repo)

    print(f"Repozytorium skonfigurowane dla https://github.com/{args.owner}/{args.repo}")
    print("Uruchom teraz: python scripts/validate_release.py")


if __name__ == "__main__":
    main()
