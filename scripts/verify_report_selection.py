"""Verify that the public source has exactly the registered report PDFs."""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import stat
import unicodedata

EXPECTED = (
    "assets/reports/sphere-rigidity/draft-r1/sphere-rigidity-brief-report.pdf",
    "assets/reports/sphere-rigidity/prior-art/r2/sphere-rigidity-prior-art-search.pdf",
)


def verify(root: Path, tracked: set[str] | None = None) -> tuple[str, ...]:
    root = root.resolve()
    registry = json.loads((root / "publication/pdf-selection.json").read_text(encoding="utf-8"))
    if registry.get("schema") != "exact.selected-pdfs.v1":
        raise ValueError("unexpected report selection schema")
    rows = registry.get("files")
    if not isinstance(rows, list) or len(rows) != 2:
        raise ValueError("report selection must contain exactly two rows")
    paths = []
    identities = set()
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError("invalid report selection row")
        logical = row.get("logical_path")
        if not isinstance(logical, str) or not logical.startswith("reports/"):
            raise ValueError("invalid report logical path")
        path = "assets/" + logical
        if path not in EXPECTED or path in paths:
            raise ValueError("unregistered or duplicate report PDF: " + path)
        if row.get("package_path") != "ASSETS/" + logical or row.get("url") != "/" + logical:
            raise ValueError("report path binding mismatch: " + path)
        if row.get("mime") != "application/pdf" or not isinstance(row.get("bytes"), int):
            raise ValueError("invalid report PDF row: " + path)
        digest = row.get("sha256")
        if not isinstance(digest, str) or len(digest) != 64:
            raise ValueError("invalid report SHA-256: " + path)
        identity = (row["bytes"], digest)
        if identity in identities:
            raise ValueError("duplicate report PDF bytes")
        identities.add(identity)
        paths.append(path)
        file = root.joinpath(*path.split("/"))
        if file.is_symlink() or not file.is_file():
            raise ValueError("missing or linked selected report PDF: " + path)
        data = file.read_bytes()
        if len(data) != row["bytes"] or hashlib.sha256(data).hexdigest() != digest:
            raise ValueError("selected report PDF bytes mismatch: " + path)
    if set(paths) != set(EXPECTED):
        raise ValueError("report selection differs from the two approved paths")

    base = root / "assets/reports"
    actual = set()
    for parent, dirs, files in os.walk(base, followlinks=False):
        for name in dirs + files:
            item = Path(parent) / name
            mode = item.lstat().st_mode
            if stat.S_ISLNK(mode) or not (stat.S_ISDIR(mode) or stat.S_ISREG(mode)):
                raise ValueError("linked or special report item: " + str(item))
        for name in files:
            rel = (Path(parent) / name).relative_to(root).as_posix()
            actual.add(rel)
    if actual != set(EXPECTED):
        raise ValueError("unregistered or missing report PDF: " + repr(sorted(actual ^ set(EXPECTED))))
    if any(unicodedata.normalize("NFKC", p).casefold() != p for p in actual):
        raise ValueError("report path Unicode or case collision")
    if tracked is not None:
        tracked_reports = {p for p in tracked if p.startswith("assets/reports/")}
        if tracked_reports != set(EXPECTED):
            raise ValueError("tracked report inventory differs from selection")
    return tuple(sorted(paths))


if __name__ == "__main__":
    verify(Path(__file__).resolve().parents[1])
    print("PASS_EXACT_SELECTED_REPORT_PDFS_R1")
