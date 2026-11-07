#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Link checker for the ReWoo static site.

Crawls every shipped HTML file, collects internal href/src targets
(pages, assets, in-page anchors) and verifies each resolves to a real
file (and, for #anchors, to a real id= in the target page).
External URLs are skipped (not our responsibility here).

Usage: python3 scripts/check_links.py
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

HTML_FILES = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in (".git", "scripts", "node_modules")]
    for fn in filenames:
        if fn.endswith(".html"):
            HTML_FILES.append(os.path.join(dirpath, fn))

HREF_RE = re.compile(r'(?:href|src)="([^"#]+)(#[A-Za-z][\w:-]*)?"')
ANCHOR_RE = re.compile(r'(?:href|src|id)="[^"]*#[A-Za-z][\w:-]*"')
PURE_ANCHOR_RE = re.compile(r'(?:href|src)="#([A-Za-z][\w:-]*)"')
ID_RE = re.compile(r'id="([^"]+)"')
COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)

errors = 0
checked = 0

for path in sorted(HTML_FILES):
    rel = os.path.relpath(path, ROOT)
    with open(path, encoding="utf-8") as fh:
        content = fh.read()

    # HTML comments (e.g. commented-out TODO blocks) are not shipped markup.
    content = COMMENT_RE.sub("", content)

    ids = set(ID_RE.findall(content))

    for match in HREF_RE.finditer(content):
        target, frag = match.group(1), match.group(2)
        checked += 1
        if target.startswith(("http://", "https://", "mailto:", "tel:", "data:")):
            continue
        # Resolve: root-relative ("/x") from the site root, else relative to the file
        if target.startswith("/"):
            resolved = os.path.normpath(os.path.join(ROOT, target.lstrip("/")))
        else:
            base = os.path.dirname(path)
            resolved = os.path.normpath(os.path.join(base, target))
        if not os.path.exists(resolved):
            print("BROKEN LINK  %s -> %s" % (rel, target))
            errors += 1
            continue
        if frag:
            frag_id = frag[1:]
            if os.path.isdir(resolved):
                resolved = os.path.join(resolved, "index.html")
            with open(resolved, encoding="utf-8") as fh2:
                target_ids = set(ID_RE.findall(fh2.read()))
            if frag_id not in target_ids:
                print("BROKEN ANCHOR %s -> %s (no id=%s)" % (rel, target + frag, frag_id))
                errors += 1

    # Pure in-page anchors href="#x"
    for match in PURE_ANCHOR_RE.finditer(content):
        frag_id = match.group(1)
        checked += 1
        if frag_id not in ids and frag_id != "top":
            print("BROKEN ANCHOR %s -> #%s" % (rel, frag_id))
            errors += 1

print("\nChecked %d links across %d HTML files: %d broken" % (checked, len(HTML_FILES), errors))
sys.exit(1 if errors else 0)
