"""Offline, standard-library checker copied as CHECK.py into the terminal Return."""
from __future__ import annotations

import argparse
import collections
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TOKEN = "PASS_MATHLIBANNEX_PROJECT_READER_EXPERIENCE_RESTORATION_RETURN_R1"


def need(value: bool, message: str) -> None:
    if not value:
        raise RuntimeError(message)


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load(path: str) -> dict:
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def inventory() -> None:
    manifest = load("MANIFEST.json")
    expected = {r["path"]: r for r in manifest["files"]}
    need(len(expected) == manifest["file_count"], "manifest row count")
    actual = {p.relative_to(ROOT).as_posix(): p for p in ROOT.rglob("*") if p.is_file() and p.name != "MANIFEST.json"}
    need(set(expected) == set(actual), "file inventory mismatch")
    for name, p in actual.items():
        data = p.read_bytes()
        need(len(data) == expected[name]["bytes"] and sha(data) == expected[name]["sha256"], "file identity: " + name)


def deep() -> None:
    binding = load("PRESENTATION_BINDING.json")
    routes = load("ROUTE_MANIFEST.json")
    inputs = load("INPUT_BINDINGS.json")
    need(binding["projects"] == routes["routes"], "binding/route disagreement")
    need(binding["source_release"]["tag"] == "v0.2.0", "source tag")
    need(binding["external_effects"] == "NONE", "external effects")
    need(inputs["new_build_or_extraction"] is False and inputs["card_bodies_changed"] is False, "scope")
    golden_bytes = (ROOT / "INPUTS/golden-p2lf10-mankiewicz-overview.html").read_bytes()
    need(len(golden_bytes) == inputs["golden_html"]["bytes"] and sha(golden_bytes) == inputs["golden_html"]["sha256"], "golden input binding")
    expected = {"mankiewicz": (11, 9, 8, 11, 10), "sphere-rigidity": (467, 28, 27, 0, 773)}
    for slug, (tiles, levels, maxlevel, cards, edges) in expected.items():
        original = load("INPUTS/" + slug + "-project.json")
        product = load("projects/" + slug + "/project.json")
        reader = product.pop("reader_experience")
        need(product == original, "source projection mutation: " + slug)
        need(original["source_binding"]["tag"] == "v0.2.0", "source identity: " + slug)
        original_bytes = (ROOT / "INPUTS" / (slug + "-project.json")).read_bytes()
        exact = inputs["current_json"][slug]
        need(len(original_bytes) == exact["bytes"] and sha(original_bytes) == exact["sha256"], "input binding: " + slug)
        rows = reader["navigation"]
        need(len(rows) == reader["tile_count"] == tiles, "tile count: " + slug)
        need(reader["level_count"] == levels and max(r["level"] for r in rows) == maxlevel, "level count: " + slug)
        need(reader["canonical_card_action_count"] == cards, "Card count: " + slug)
        need(reader["exact_source_action_count"] == tiles, "source count: " + slug)
        need(reader["display_edge_count"] == edges == sum(len(r["prerequisites"]) for r in rows), "edge count: " + slug)
        by = {r["anchor"]: r for r in rows}
        need(len(by) == tiles and set(r["level"] for r in rows) == set(range(levels)), "anchor/level uniqueness: " + slug)
        for row in rows:
            need(row["source_url"].startswith("https://github.com/r-tanaka-math/mathlib-annex/blob/v0.2.0/"), "exact source: " + slug)
            for p in row["prerequisites"]:
                need(p in by and row["anchor"] in by[p]["used_by"] and by[p]["level"] < row["level"], "prerequisite: " + slug)
            for u in row["used_by"]:
                need(u in by and row["anchor"] in by[u]["prerequisites"], "used by: " + slug)
        html = (ROOT / "projects" / slug / "index.html").read_text(encoding="utf-8")
        ids = re.findall(r'<section class="tile" id="(decl-[^" ]+)"', html)
        need(collections.Counter(ids) == collections.Counter(by.keys()), "HTML tile anchors: " + slug)
        need(len(re.findall(r'<section class="level" id="level-\d+"', html)) == levels, "HTML level bands: " + slug)
        need(len(re.findall(r'<div class="grid">', html)) == levels, "HTML level grids: " + slug)
        need(html.count('class="card-action"') == cards, "HTML Card actions: " + slug)
        need(html.count('>Read exact source</a>') == tiles, "HTML exact source actions: " + slug)
        pieces = re.findall(r'<section class="tile" id="(decl-[^" ]+)"[^>]*>(.*?)</section>', html, re.DOTALL)
        need(len(pieces) == tiles, "HTML tile parsing: " + slug)
        for anchor, chunk in pieces:
            hrefs = re.findall(r'href="#(decl-[^"]+)"', chunk)
            need(collections.Counter(hrefs) == collections.Counter(by[anchor]["prerequisites"] + by[anchor]["used_by"]), "HTML relation targets: " + slug + "/" + anchor)
        for anchor in re.findall(r'href="#(decl-[^"]+)"', html):
            need(anchor in by, "orphan fragment: " + slug)
        spec = binding["projects"][slug]
        need(spec["node_count"] == tiles and spec["level_count"] == levels and spec["canonical_card_actions"] == cards and spec["exact_source_actions"] == tiles, "binding counts: " + slug)
        for name, identity in spec["file_identity"].items():
            data = (ROOT / "projects" / slug / name).read_bytes()
            need(len(data) == identity["bytes"] and sha(data) == identity["sha256"], "binding file: " + slug + "/" + name)
        if slug == "mankiewicz":
            need(all(c["card_resolution"] == "PUBLIC" and c["canonical_card_link"] for c in original["cards"]), "Mankiewicz Card resolution")
            need(collections.Counter(r["level"] for r in rows) == {0:2,1:1,2:1,3:1,4:1,5:1,6:1,7:2,8:1}, "Mankiewicz level counts")
            card_by_ref = {c["card_ref"]["sha256"]: c for c in original["cards"]}
            golden = (ROOT / "INPUTS/golden-p2lf10-mankiewicz-overview.html").read_text(encoding="utf-8")
            golden_tiles = re.findall(r'<section class="tile" id="project-([a-f0-9]{64})">(.*?)</section>', golden, re.DOTALL)
            need(len(golden_tiles) == 11, "golden tile inventory")
            for key, chunk in golden_tiles:
                card = card_by_ref[key]
                row = by["decl-" + card["stable_card_id"]]
                before = re.search(r"Immediate predecessors: (.*?)</p>", chunk, re.DOTALL)
                after = re.search(r"Immediate dependents: (.*?)</p>", chunk, re.DOTALL)
                need(before is not None and after is not None, "golden relations")
                golden_preds = ["decl-" + card_by_ref[x]["stable_card_id"] for x in re.findall(r'href="#project-([a-f0-9]{64})"', before.group(1))]
                golden_users = ["decl-" + card_by_ref[x]["stable_card_id"] for x in re.findall(r'href="#project-([a-f0-9]{64})"', after.group(1))]
                need(row["prerequisites"] == golden_preds and row["used_by"] == golden_users, "golden graph: " + key)
                need(row["source_url"] == card["source_url"], "Mankiewicz source URL")
        else:
            need(all(n["card_resolution"] == "NOT_STARTED" and n["canonical_card_link"] is None for n in original["nodes"]), "Sphere Card state")
            need(len(original["routes"]) == 9, "Sphere routes")
            nodes = {n["node_id"]: n for n in original["nodes"]}
            for row in rows:
                node = nodes[row["id"]]
                need(row["level"] == node["level"] and row["prerequisites"] == ["decl-" + x for x in node["prerequisites"]]
                     and row["used_by"] == ["decl-" + x for x in node["used_by"]], "Sphere graph/levels: " + row["id"])
                need(row["source_url"] == node["source_url"], "Sphere source URL")
    css = (ROOT / "projects/assets/project.css").read_text(encoding="utf-8")
    js = (ROOT / "projects/assets/project.js").read_text(encoding="utf-8")
    need(".tile:target" in css and "scroll-margin-top" in css and ".grid{display:grid" in css, "visual grammar")
    need("hashchange" in js and "target.hidden" in js and "filter()" in js, "filter/hash interaction")
    browser = load("EVIDENCE/VIEWPORT_QA.json")
    need(browser["status"] == "PASS" and browser["hash_filter_reveal"] == "PASS" and len(browser["rows"]) == 12, "browser QA")
    need(all(r["scrollWidth"] <= r["clientWidth"] and r["fontLoaded"] for r in browser["rows"]), "viewport/font QA")
    for name in ("PDF_QA", "GLYPH_QA", "PRIVATE_LEAKAGE_QA", "LINK_FRAGMENT_QA", "MUTATION_QA"):
        need(load("EVIDENCE/" + name + ".json")["status"] == "PASS", name)
    forbidden = [re.compile(rb"[A-Za-z]:[\\/](?:Users|Windows|Program Files)[\\/]", re.I),
                 re.compile(rb"/Users/[^/\s]+/", re.I), re.compile(rb"AppData[\\/]Local", re.I),
                 re.compile(rb"BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY")]
    for p in ROOT.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".html", ".json", ".js", ".css", ".txt", ".md"}:
            need(not any(pattern.search(p.read_bytes()) for pattern in forbidden), "private leakage: " + p.relative_to(ROOT).as_posix())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--deep", action="store_true")
    args = parser.parse_args()
    inventory()
    if args.deep:
        deep()
    print(TOKEN)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("FAIL_" + TOKEN + ": " + str(exc))
        raise SystemExit(1)
