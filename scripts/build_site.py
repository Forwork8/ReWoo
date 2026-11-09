#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ReWoo site generator.

Builds every catalog page, the sitemap, and robots.txt as plain static HTML
using the existing ReWoo design system (styles.css tokens) plus the new
component layer (site.css). Zero runtime dependencies beyond site.js.

Run from the repository root:  python3 scripts/build_site.py
"""

import html
import json
import os
import sys
import urllib.parse
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

from data_systems import SYSTEMS, FORMAT_NOTE                      # noqa: E402
from data_capabilities import CAPABILITIES, CAPABILITY_GROUPS      # noqa: E402
from data_industries import INDUSTRIES                            # noqa: E402
from data_packages import PACKAGES, AUDIENCES, DEPARTMENTS, PRICING_NOTE  # noqa: E402
from data_site import SITE, HOME, ABOUT, RESOURCES, CONTACT       # noqa: E402
from data_depth import PLAIN, TECH                                # noqa: E402

TODAY = date.today().isoformat()
OUT = ROOT

SYS_BY = {s["slug"]: s for s in SYSTEMS}
CAP_BY = {c["slug"]: c for c in CAPABILITIES}
IND_BY = {i["slug"]: i for i in INDUSTRIES}
PKG_BY = {p["slug"]: p for p in PACKAGES}

FONTS = ("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200..500;"
         "1,9..144,200..500&family=Inter:wght@300;400;500;600&display=swap")

# ---------------------------------------------------------------- icons -----

ICONS = {
    "bot": '<path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="3"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M9 18h6"/>',
    "chat": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
    "mic": '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1"/><path d="M12 18v4"/>',
    "sparkles": '<path d="M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
    "grid": '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    "compass": '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    "flow": '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/><path d="M6 9v3a3 3 0 0 0 3 3h3"/>',
    "brain": '<path d="M9.5 3A2.5 2.5 0 0 0 7 5.5 2.5 2.5 0 0 0 4.5 8 2.5 2.5 0 0 0 6 12.2 2.5 2.5 0 0 0 7.5 16.5 2.5 2.5 0 0 0 12 18V4a2.5 2.5 0 0 0-2.5-1z" transform="translate(1 2)"/><path d="M14.5 3A2.5 2.5 0 0 1 17 5.5 2.5 2.5 0 0 1 19.5 8 2.5 2.5 0 0 1 18 12.2 2.5 2.5 0 0 1 16.5 16.5 2.5 2.5 0 0 1 12 18V4a2.5 2.5 0 0 1 2.5-1z" transform="translate(-1 2)"/>',
    "eye": '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    "film": '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"/>',
    "plug": '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
    "rocket": '<path d="M5 15c-1.5 1.5-2 6-2 6s4.5-.5 6-2"/><path d="M12 15l-3-3c.5-2.5 2-6.5 7-9 2 5-1 9.5-4 12z"/><circle cx="14.5" cy="9.5" r="1.5"/>',
    "book": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    "layers": '<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>',
    "pen": '<path d="M17 3l4 4L8 20l-5 1 1-5z"/><path d="M15 5l4 4"/>',
    "file": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>',
    "cart": '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
    "chart": '<path d="M3 3v18h18"/><path d="M7 15v-4M12 15V7M17 15v-7"/>',
    "heart": '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
    "wrench": '<path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6l-2.8 2.8-2.2-2.2z"/>',
    "building": '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M10 22v-3h4v3"/>',
    "code": '<path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
    "trophy": '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/>',
    "clipboard": '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4a3 3 0 0 1 6 0"/><path d="M9 12h6M9 16h4"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4.5-6.2"/>',
    "megaphone": '<path d="M3 11v3l14 5V6L3 11z"/><path d="M7 12.5V19a2 2 0 0 0 4 0v-5.4"/><path d="M17 8a4 4 0 0 1 0 8"/>',
    "wallet": '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M16 12h5"/><circle cx="16" cy="12" r="1"/>',
    "shield": '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "check": '<path d="M20 6L9 17l-5-5"/>',
}


def icon(name, cls="icon"):
    path = ICONS.get(name, ICONS["arrow"])
    return '<svg class="%s" viewBox="0 0 24 24" aria-hidden="true" focusable="false">%s</svg>' % (cls, path)


def esc(s):
    return html.escape(str(s), quote=True)


def wa(text):
    return "https://wa.me/%s?text=%s" % (SITE["whatsapp"].lstrip("+"), urllib.parse.quote(text))


# ------------------------------------------------------------- snippets -----

def brief_btn(kind, ident, label, compact=False):
    cls = "brief-add" if compact else "btn btn--outline brief-add"
    return ('<button type="button" class="%s" data-brief-add data-brief-kind="%s" '
            'data-brief-id="%s" data-brief-label="%s">Add to brief</button>'
            % (cls, kind, esc(ident), esc(label)))


def link_card(href, title, sub, num=None, ic=None, extra=""):
    badge = ('<span class="l-card__num">%s</span>' % num) if num else ""
    icn = ('<span class="l-card__icon">%s</span>' % icon(ic, "icon")) if ic else ""
    return ('<a class="l-card" href="%s">%s%s<div class="l-card__body">'
            '<h3 class="l-card__title">%s</h3><p class="l-card__sub">%s</p>%s</div>'
            '<span class="l-card__go" aria-hidden="true">%s</span></a>'
            % (esc(href), icn, badge, esc(title), esc(sub), extra, icon("arrow", "icon")))


def section_header(overline, headline, sub=None, center=True, link=None, link_label=None):
    out = ['<div class="sec-head%s">' % (" sec-head--center" if center else "")]
    out.append('<p class="overline overline--accent">%s</p>' % esc(overline))
    out.append('<h2 class="s-headline">%s</h2>' % headline)
    if sub:
        out.append('<p class="s-subhead%s">%s</p>' % (" s-subhead--centered" if center else "", esc(sub)))
    if link:
        out.append('<p class="sec-head__link"><a class="btn btn--ghost" href="%s">%s →</a></p>'
                   % (esc(link), esc(link_label or "View all")))
    out.append("</div>")
    return "\n".join(out)


def steps(items):
    rows = []
    for i, s in enumerate(items, 1):
        rows.append('<li class="step"><span class="step__num" aria-hidden="true">%02d</span>'
                    '<div class="step__body"><h3 class="step__t">%s</h3>'
                    '<p class="step__d">%s</p></div></li>' % (i, esc(s["t"]), esc(s["d"])))
    return '<ol class="steps">%s</ol>' % "".join(rows)


def card_grid(cards, cls="card-grid"):
    return '<div class="%s">%s</div>' % (cls, "".join(cards))


def mini_card(title, desc, ic=None):
    icn = '<span class="m-card__icon">%s</span>' % icon(ic, "icon") if ic else ""
    return ('<div class="m-card">%s<div><h3 class="m-card__t">%s</h3>'
            '<p class="m-card__d">%s</p></div></div>' % (icn, esc(title), esc(desc)))


def chips(items, label=""):
    chips_html = "".join('<li class="chip">%s</li>' % esc(c) for c in items)
    aria = ' aria-label="%s"' % esc(label) if label else ""
    return '<ul class="chips"%s>%s</ul>' % (aria, chips_html)


def checks(items, label="Included"):
    lis = "".join('<li>%s<span>%s</span></li>' % (icon("check", "icon icon--check"), esc(i)) for i in items)
    return '<ul class="checks" aria-label="%s">%s</ul>' % (esc(label), lis)


def crosses(items, label="Not included"):
    lis = "".join('<li><span class="checks__x" aria-hidden="true">×</span><span>%s</span></li>' % esc(i) for i in items)
    return '<ul class="checks checks--cross" aria-label="%s">%s</ul>' % (esc(label), lis)


def faq_block(items, jsonld_id=None):
    ds = []
    for f in items:
        ds.append('<details class="faq__item"><summary class="faq__q">%s</summary>'
                  '<div class="faq__a"><p>%s</p></div></details>' % (esc(f["q"]), esc(f["a"])))
    return '<div class="faq">%s</div>' % "".join(ds)


def cta_band(title, sub, primary=None, secondary=None):
    btns = []
    if primary:
        btns.append('<a class="btn btn--primary" href="%s">%s</a>' % (esc(primary["href"]), esc(primary["label"])))
    if secondary:
        btns.append('<a class="btn btn--outline" href="%s">%s</a>' % (esc(secondary["href"]), esc(secondary["label"])))
    return ('<section class="cta-band" aria-label="Next step"><div class="wrap cta-band__inner">'
            '<h2 class="cta-band__t">%s</h2><p class="cta-band__s">%s</p>'
            '<div class="cta-band__btns">%s</div></div></section>'
            % (title, esc(sub), "".join(btns)))


def crumbs(items, path=None):
    lis = []
    for i, (label, href) in enumerate(items):
        if href and i < len(items) - 1:
            real = linkto(href, path) if path else href
            lis.append('<li><a href="%s">%s</a></li>' % (esc(real), esc(label)))
        else:
            lis.append('<li aria-current="page">%s</li>' % esc(label))
    return ('<nav class="crumbs" aria-label="Breadcrumb"><ol>%s</ol></nav>' % "".join(lis))


def page_hero(eyebrow, title_html, sub, badges=None, ctas=None, breadcrumb=None):
    parts = ['<header class="page-hero"><div class="wrap">']
    if breadcrumb:
        parts.append(breadcrumb)
    parts.append('<p class="overline overline--accent">%s</p>' % esc(eyebrow))
    parts.append('<h1 class="page-hero__title">%s</h1>' % title_html)
    if sub:
        parts.append('<p class="page-hero__sub">%s</p>' % esc(sub))
    if badges:
        parts.append('<div class="page-hero__badges">%s</div>'
                     % "".join('<span class="badge">%s</span>' % esc(b) for b in badges))
    if ctas:
        parts.append('<div class="page-hero__ctas">%s</div>' % ctas)
    parts.append("</div></header>")
    return "\n".join(parts)


def note_band(text, label=None, variant=""):
    label_html = '<span class="note__label">%s</span>' % esc(label) if label else ""
    cls = 'note' + (' note--%s' % variant if variant else '')
    return ('<div class="%s"><div class="wrap note__inner">%s<p>%s</p></div></div>'
            % (cls, label_html, esc(text)))


# ------------------------------------------------------- depth layers -----

def plain_band(slug, path):
    """Beginner layer: plain-words intro + mini glossary. Renders nothing if
    the slug has no PLAIN entry (missing entries fail the build earlier)."""
    d = PLAIN.get(slug)
    if not d:
        return ""
    terms = "".join('<div class="plain__term"><dt>%s</dt><dd>%s</dd></div>'
                    % (esc(t), esc(defn)) for t, defn in d["terms"])
    return ('<section class="section section--surface plain" aria-label="Start here — in plain words">'
            '<div class="wrap"><div class="plain__card" data-animate>'
            '<div class="plain__head"><span class="plain__badge">%s</span>'
            '<h2 class="plain__t">In plain words</h2></div>'
            '<p class="plain__what">%s</p>'
            '<p class="plain__like"><span class="plain__like-label">An easy way to picture it</span>%s</p>'
            '<dl class="plain__terms">%s</dl>'
            '<p class="plain__more">New to AI systems? Every page on this site opens with one of these summaries — '
            'or start with the <a href="%s">studio guides</a>, written for beginners.</p>'
            '</div></div></section>'
            % (esc("Start here"), esc(d["what"]), esc(d["like"]), terms,
               esc(linkto("resources.html", path))))


def tech_section(slug, path, kind="system"):
    """Expert layer for technical evaluators: architecture/approach, evaluation
    & acceptance, operations. For packages the labels shift to method framing."""
    d = TECH.get(slug)
    if not d:
        return ""
    if kind == "package":
        heads = (("Method", d["stack"]), ("Acceptance criteria", d["eval"]), ("You receive", d["ops"]))
        overline, title, sub = ("For technical evaluators", "How this engagement actually runs.",
                                "The method behind the offer — what is measured, what “done” means, and what lands in your hands. Terms are finalized per engagement in the written scope.")
    else:
        heads = (("Architecture", d["stack"]), ("Evaluation & acceptance", d["eval"]), ("Operations", d["ops"]))
        overline, title, sub = ("For technical evaluators", "Under the hood.",
                                "Architecture, evaluation and operations — the engineering substance behind the offer. Final choices are set per engagement, in the written scope.")
    cards = []
    for head, items in heads:
        lis = "".join('<li><strong>%s.</strong> %s</li>' % (esc(t), esc(x)) for t, x in items)
        cards.append('<div class="tech-card"><h3 class="tech-card__t">%s</h3><ul class="tech-card__list">%s</ul></div>'
                     % (esc(head), lis))
    return ('<section class="section tech" aria-label="For technical evaluators"><div class="wrap">'
            '<div class="sec-head" data-animate>'
            '<p class="overline overline--accent">%s</p>'
            '<h2 class="s-headline">%s</h2>'
            '<p class="s-subhead">%s</p></div>'
            '<div class="tech-grid">%s</div></div></section>'
            % (esc(overline), title, esc(sub), "".join(cards)))


def related_section(title, cards, note=None):
    return ('<section class="section section--surface" aria-label="%s"><div class="wrap">'
            '%s<div class="card-grid card-grid--3">%s</div>%s</div></section>'
            % (esc(title),
               section_header("Related", title, None, center=False),
               "".join(cards),
               ('<p class="related-note">%s</p>' % esc(note)) if note else ""))


def arch_flow(s, path):
    """A compact architecture diagram generated from the system's workflow steps —
    rendered above the detailed steps on every system page."""
    nodes = []
    for st in s["workflow"]["steps"]:
        nodes.append('<li class="arch-node"><span class="arch-node__dot" aria-hidden="true"></span>'
                     '<span class="arch-node__t">%s</span></li>' % esc(st["t"]))
    return ('<ol class="arch-flow" aria-label="Pipeline stages at a glance">%s</ol>'
            % "".join(nodes))


def demo_strip(s, path):
    """Flagship systems carry a live demo — this band links it."""
    if s["slug"] not in FLAGSHIPS:
        return ""
    if s["slug"] == "voice-intelligence":
        href, label, sub = "demo-voice.html", "Open the Voice Intelligence demo", \
            "Real browser transcription in Bangla and English, measured latency, and a full pipeline walkthrough — no signup."
    else:
        href, label, sub = "demo-search.html", "Open the Knowledge Search demo", \
            "Citation-first retrieval you can interrogate, plus a published benchmark you re-run yourself — failures included."
    return ('<section class="demo-strip" aria-label="Live demo"><div class="wrap demo-strip__inner">'
            '<div><p class="overline overline--accent">Live demo</p>'
            '<h2 class="demo-strip__t">This system, running now.</h2>'
            '<p class="demo-strip__d">%s</p></div>'
            '<a class="btn btn--primary" href="%s">%s →</a></div></section>'
            % (esc(sub), esc(linkto(href, path)), esc(label)))


def faq_jsonld(items):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": f["q"],
                            "acceptedAnswer": {"@type": "Answer", "text": f["a"]}} for f in items]}


# ------------------------------------------------------------- head/nav ----

THEME_INIT = (
    "<script>(function () { try { var t = localStorage.getItem('rewoo-theme');"
    " if (!t) t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)"
    " ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', t);"
    " } catch (e) { document.documentElement.setAttribute('data-theme', 'dark'); } })();</script>"
)

ORG_JSONLD = {
    "@context": "https://schema.org", "@type": "Organization",
    "name": "ReWoo", "url": SITE["url"], "email": SITE["email"],
    "slogan": SITE["tagline"], "description": SITE["description"],
    "address": {"@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD"},
    "sameAs": [s["url"] for s in SITE["socials"]],
}


def head(title, desc, path, jsonld=None, extra_meta=""):
    canonical = SITE["url"] + "/" + path if path else SITE["url"] + "/"
    blocks = []
    if jsonld:
        for j in jsonld:
            blocks.append('<script type="application/ld+json">%s</script>' % json.dumps(j, ensure_ascii=False))
    og_title = title
    return """<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{canonical}">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{og_image}">
<meta property="og:site_name" content="ReWoo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{og_title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{og_image}">
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)">
<link rel="icon" type="image/jpeg" href="{icon_href}">
<link rel="apple-touch-icon" href="{icon_href}">
<link rel="manifest" href="{manifest_href}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{fonts}" rel="stylesheet">
<link rel="stylesheet" href="{styles_href}">
<link rel="stylesheet" href="{site_css_href}">
{theme_init}
<noscript><style>[data-animate]{{opacity:1 !important;transform:none !important}}</style></noscript>
{jsonld_blocks}
{extra_meta}
</head>
<body>
<a href="#main-content" class="skip-link">Skip to content</a>
""".format(title=esc(title), desc=esc(desc), canonical=esc(canonical), og_title=esc(og_title),
           og_image=SITE["url"] + "/assets/og-image.png", icon_href=asset("assets/logo.jpg", path),
           manifest_href=asset("manifest.json", path), fonts=FONTS,
           styles_href=asset("styles.css", path), site_css_href=asset("site.css", path),
           theme_init=THEME_INIT, jsonld_blocks="\n".join(blocks), extra_meta=extra_meta)


def asset(href, path):
    """Prefix a root-relative asset with the right number of ../ for the page depth."""
    depth = 0 if not path else path.count("/")
    return ("../" * depth) + href


def linkto(target, path):
    """Link from page `path` to a root-relative page target."""
    depth = 0 if not path else path.count("/")
    return ("../" * depth) + target


def mega_panel(items, panel_id, footer_href, footer_label, path, columns_class="mega__grid"):
    lis = []
    for it in items:
        sub = '<span class="mega__sub">%s</span>' % esc(it["sub"]) if it.get("sub") else ""
        lis.append('<li><a class="mega__item" href="%s">%s</a></li>'
                   % (esc(linkto(it["href"], path)), esc(it["label"]) + sub))
    foot = ('<div class="mega__foot"><a href="%s">%s →</a></div>'
            % (esc(linkto(footer_href, path)), esc(footer_label)))
    return ('<div class="mega__panel" id="%s">%s<ul class="%s">%s</ul>%s</div>'
            % (panel_id, "", columns_class, "".join(lis), foot))


FLAGSHIPS = ("voice-intelligence", "knowledge-retrieval")


def nav(path, active=None):
    systems_items = [{"label": s["name"], "sub": ("★ Live demo" if s["slug"] in FLAGSHIPS else s["category"]),
                      "href": "systems/%s.html" % s["slug"]} for s in SYSTEMS]
    pkgs_items = [{"label": p["name"], "sub": "%s · %s (est.)" % (p["duration"], p["range"]),
                   "href": "packages/%s.html" % p["slug"]} for p in PACKAGES]
    proof_items = [
        {"label": "Voice Intelligence demo", "sub": "Live — runs in your browser", "href": "demo-voice.html"},
        {"label": "Knowledge Search demo", "sub": "Live — clickable citations", "href": "demo-search.html"},
        {"label": "Retrieval benchmark", "sub": "19 questions — re-run it yourself", "href": "demo-search.html#benchmark"},
        {"label": "AI Scope Generator", "sub": "Draft a written scope in 60 seconds", "href": "scope-generator.html"},
        {"label": "Case study — UK first client", "sub": "In preparation, pending sign-off", "href": "proof.html#case-study"},
        {"label": "Security & data handling", "sub": "Where your data lives, in writing", "href": "security.html"},
        {"label": "Public roadmap", "sub": "What ships next, in the open", "href": "roadmap.html"},
    ]

    def top(label, key, panel, href=None):
        if href:
            return ('<li><a class="nav__link%s" href="%s">%s</a></li>'
                    % (" is-current" if active == key else "", esc(linkto(href, path)), esc(label)))
        return ('<li class="has-mega%s"><button type="button" class="nav__link nav__link--btn%s" '
                'aria-expanded="false" aria-controls="%s">%s<span class="nav__caret" aria-hidden="true">'
                '▾</span></button>%s</li>'
                % (" is-current" if active == key else "", " is-current" if active == key else "",
                   "panel-" + key, esc(label), panel))

    systems_panel = (
        '<div class="mega__panel" id="panel-systems">'
        '<ul class="mega__grid">'
        + "".join('<li><a class="mega__item" href="%s">%s</a></li>'
                  % (esc(linkto(it["href"], path)),
                     esc(it["label"]) + '<span class="mega__sub">%s</span>' % esc(it["sub"]))
                  for it in systems_items)
        + '</ul>'
        '<div class="mega__foot mega__foot--multi"><a href="' + esc(linkto("systems.html", path))
        + '">All systems →</a><a href="' + esc(linkto("capabilities.html", path))
        + '">Capabilities</a><a href="' + esc(linkto("industries.html", path))
        + '">Industries</a></div></div>'
    )

    nav_links = "".join([
        top("Systems", "systems", systems_panel),
        top("Packages", "packages",
            mega_panel(pkgs_items, "panel-packages", "packages.html", "Compare engagements", path)),
        top("Proof", "proof",
            mega_panel(proof_items, "panel-proof", "proof.html", "Everything checkable, one page", path)),
        top("About", "about", None, href="about.html"),
        top("Contact", "contact", None, href="contact.html"),
    ])

    # Mobile drawer: grouped native <details> sections (works without JS)
    def mobile_group(label, items_):
        return ('<details class="mgroup"><summary>%s</summary><div class="mgroup__list">%s</div></details>'
                % (esc(label), "".join('<a href="%s">%s</a>' % (esc(linkto(i["href"], path)), esc(i["label"]))
                                       for i in items_)))

    def mobile_link(label, href):
        return '<a class="mdirect" href="%s">%s →</a>' % (esc(linkto(href, path)), esc(label))

    more_items = [{"label": c["name"], "href": "capabilities/%s.html" % c["slug"]} for c in CAPABILITIES] \
        + [{"label": "All capabilities", "href": "capabilities.html"}] \
        + [{"label": i["name"], "href": "industries/%s.html" % i["slug"]} for i in INDUSTRIES] \
        + [{"label": "All industries", "href": "industries.html"}] \
        + [
            {"label": "Who we build for", "href": "who-we-build-for.html"},
            {"label": "Departments", "href": "departments.html"},
            {"label": "Resources", "href": "resources.html"},
            {"label": "Privacy Policy", "href": "privacy.html"},
            {"label": "Terms of Service", "href": "terms.html"},
        ]

    mobile = [
        mobile_group("Systems", systems_items + [{"label": "All systems", "href": "systems.html"}]),
        mobile_group("Packages", pkgs_items + [{"label": "Compare engagements", "href": "packages.html"}]),
        mobile_group("Proof", proof_items),
        mobile_link("About the studio", "about.html"),
        mobile_link("Contact — talk to the founder", "contact.html"),
        mobile_group("Explore more", more_items),
    ]

    sun = ('<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7'
           'l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>')

    return """
<nav class="nav" id="site-nav" aria-label="Primary navigation">
  <div class="nav__inner">
    <a href="{home}" class="nav__logo" aria-label="ReWoo — Home">
      <img src="{logo}" alt="ReWoo" class="nav__logo-img" width="28" height="28">
      <span class="nav__wordmark">ReWoo</span>
    </a>
    <ul class="nav__links nav__links--site" aria-label="Site sections">
      {links}
    </ul>
    <div class="nav__right nav__right--site">
      <button class="theme-toggle" id="theme-toggle" aria-label="Switch to light mode" title="Toggle theme">
        <svg id="theme-icon" viewBox="0 0 24 24">{sun}</svg>
      </button>
      <a href="{scope_link}" class="nav__cta">Start a scope →</a>
    </div>
    <button class="nav__hamburger" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav__overlay" id="nav-overlay" aria-hidden="true"></div>
<div class="nav__mobile" id="mobile-menu" role="dialog" aria-label="Mobile navigation" aria-modal="true">
  <div class="mobile-nav-inner">
    <span class="mobile-section-label">Explore</span>
    {mobile}
    <div class="mobile-theme-row">
      <button class="mobile-theme-btn" id="mobile-theme-toggle" aria-label="Toggle theme">
        <svg class="mobile-theme-icon" id="mobile-theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">{sun}</svg>
        <span id="mobile-theme-text">Switch to Light Mode</span>
      </button>
    </div>
    <a href="{scope_link}" class="nav__cta" id="mn-cta">Start a scope →</a>
  </div>
</div>
""".format(home=esc(linkto("index.html", path)), logo=esc(asset("assets/logo.jpg", path)),
           links=nav_links, scope_link=esc(linkto("scope-generator.html", path)), sun=sun,
           mobile="".join(mobile))


def footer(path):
    def col(label, items_):
        lis = "".join('<li><a href="%s">%s</a></li>' % (esc(linkto(href, path)), esc(lbl)) for lbl, href in items_)
        return ('<div class="footer__col"><span class="footer__col-label">%s</span>'
                '<ul class="footer__links">%s</ul></div>' % (esc(label), lis))

    systems_col = col("Systems", [(s["name"], "systems/%s.html" % s["slug"]) for s in SYSTEMS]
                      + [("All systems", "systems.html")])
    caps_col = col("Capabilities", [(c["name"], "capabilities/%s.html" % c["slug"]) for c in CAPABILITIES]
                   + [("All capabilities", "capabilities.html")])
    inds_col = col("Industries", [(i["name"], "industries/%s.html" % i["slug"]) for i in INDUSTRIES]
                   + [("All industries", "industries.html")])
    pkg_col = col("Engagements", [(p["name"], "packages/%s.html" % p["slug"]) for p in PACKAGES]
                  + [("Compare all", "packages.html")])
    company_col = col("Company", [
        ("About the studio", "about.html"),
        ("The founder", "about.html#founder"),
        ("Proof — demos & benchmark", "proof.html"),
        ("AI Scope Generator", "scope-generator.html"),
        ("Security & data handling", "security.html"),
        ("Public roadmap", "roadmap.html"),
        ("Resources", "resources.html"),
        ("Contact", "contact.html"),
        ("Privacy Policy", "privacy.html"),
        ("Terms of Service", "terms.html"),
    ])

    socials = "".join(
        '<a href="%s" target="_blank" rel="noopener noreferrer" aria-label="ReWoo on %s">'
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="%s"/></svg></a>'
        % (esc(s["url"]), esc(s["label"]),
           "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-.01z"
           if s["label"] == "LinkedIn" else "M4 4l16 16M4 20L20 4")
        for s in SITE["socials"])

    return """
<footer class="footer footer--site" aria-label="Footer">
  <div class="footer__inner footer__inner--site">
    <div class="footer__brand">
      <a href="{home}" class="footer__logo" aria-label="ReWoo — Home">
        <img src="{logo}" alt="ReWoo" class="footer__logo-img" width="22" height="22">
        <span class="footer__wordmark">ReWoo</span>
      </a>
      <p class="footer__tagline">AI systems, scoped and shipped. An independent studio in Dhaka, building for teams anywhere.</p>
      <a href="mailto:{email}" class="footer__email">{email}</a>
      <div class="footer__social">{socials}</div>
    </div>
    {systems_col}
    {caps_col}
    {inds_col}
    {pkg_col}
    {company_col}
  </div>
  <div class="footer__bottom">© {year} ReWoo · Dhaka, Bangladesh · Systems designed and built to order — this site is the studio's own work.</div>
</footer>
<script src="{sitejs}" defer></script>
</body>
</html>
""".format(home=esc(linkto("index.html", path)), logo=esc(asset("assets/logo.jpg", path)),
           email=esc(SITE["email"]), socials=socials, systems_col=systems_col, caps_col=caps_col,
           inds_col=inds_col, pkg_col=pkg_col, company_col=company_col,
           year=TODAY[:4], sitejs=esc(asset("site.js", path)))


def write_page(path, body_html, title, desc, jsonld=None, active=None):
    doc = head(title, desc, path, jsonld) + nav(path, active) + body_html + footer(path)
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as fh:
        fh.write(doc)
    return path


def contact_ctas(prefix="", with_brief=None):
    primary = {"label": "Discuss this %s" % prefix if prefix else "Book an intro call", "href": "contact.html"}
    return primary


# ------------------------------------------------------------ templates -----

def system_page(s):
    b = []
    crumb = crumbs([("Home", "index.html"), ("Systems", "systems.html"), (s["name"], None)],
                   "systems/%s.html" % s["slug"])
    ctas = ('<a class="btn btn--primary" href="%s">Discuss this system →</a>'
            '<a class="btn btn--outline" href="%s">Related capabilities</a>'
            % (esc(linkto("contact.html", "systems/%s.html" % s["slug"])),
               "#" + "related"))
    b.append(page_hero(s["category"], esc(s["name"]), s["lede"],
                       badges=["Scoped build", "Your stack, your data rules"], ctas=ctas, breadcrumb=crumb))
    b.append(demo_strip(s, "systems/%s.html" % s["slug"]))
    b.append(note_band(FORMAT_NOTE, "Format"))
    b.append(plain_band(s["slug"], "systems/%s.html" % s["slug"]))

    b.append('<section class="section" aria-label="Who it is for"><div class="wrap">'
             + section_header("Who it is for", "Built for teams that live this problem.", None, center=False)
             + card_grid([mini_card(c["t"], c["d"]) for c in s["customers"]], "card-grid card-grid--3")
             + "</div></section>")

    b.append('<section class="section section--surface" aria-label="The problem"><div class="wrap">'
             + section_header("The problem", "What this replaces.", None, center=False)
             + card_grid([mini_card(p["t"], p["d"]) for p in s["problems"]], "card-grid card-grid--3")
             + "</div></section>")

    b.append('<section class="section" aria-label="What it does"><div class="wrap">'
             + section_header("What it does", "The system, feature by feature.", None, center=False)
             + card_grid([mini_card(f["t"], f["d"]) for f in s["features"]], "card-grid card-grid--3")
             + "</div></section>")

    b.append(tech_section(s["slug"], "systems/%s.html" % s["slug"], kind="system"))

    b.append('<section class="section section--surface" aria-label="Example workflow"><div class="wrap">'
             + section_header("Example workflow", esc(s["workflow"]["title"]),
                              "Illustrative pipeline — the real architecture, models, and integration points "
                              "are scope decisions, written down before any build.", center=False)
             + arch_flow(s, "systems/%s.html" % s["slug"])
             + steps(s["workflow"]["steps"])
             + '<p class="workflow-note">Illustrative flow — the real sequence is set in your written scope.</p>'
             + "</div></section>")

    ind_links = "".join('<li><a class="chip chip--link" href="%s">%s</a></li>'
                        % (esc(linkto("industries/%s.html" % i, "systems/%s.html" % s["slug"])), esc(IND_BY[i]["name"]))
                        for i in s["industries"])
    cap_cards = [link_card(linkto("capabilities/%s.html" % c, "systems/%s.html" % s["slug"]),
                           CAP_BY[c]["name"], CAP_BY[c]["short"], num=CAP_BY[c]["num"]) for c in s["capabilities"]]
    b.append('<section class="section" aria-label="Where it fits"><div class="wrap">'
             + section_header("Where it fits", "Industries where this system earns its keep.", None, center=False)
             + '<ul class="chips chips--links">' + ind_links + "</ul>"
             + '<div class="split"><div><h3 class="split__t">Integration possibilities</h3>'
             + chips(s["integrations"], "Integration possibilities")
             + '<p class="split__d">Possibilities, finalized per engagement — connectors are scoped against your actual systems, permissions included.</p></div>'
             + '<div><h3 class="split__t">Next step</h3><p class="split__d">A short call about whether this family fits your workflow — with an honest no if it does not.</p>'
             + '<a class="btn btn--primary" href="%s">Discuss this system →</a> %s</div></div>'
             % (esc(linkto("contact.html", "systems/%s.html" % s["slug"])),
                brief_btn("system", s["slug"], s["name"]))
             + "</div></section>")

    b.append(related_section("Related capabilities", cap_cards)[:0] or related_section(
        "Related capabilities",
        cap_cards,
        note="Capabilities are the build disciplines behind every system family."))
    b.append('<section class="section section--surface" aria-label="FAQ"><div class="wrap" id="related">'
             + section_header("FAQ", "Asked about this system.", None, center=False)
             + faq_block(s["faqs"]) + "</div></section>")
    b.append(cta_band("Bring this system to your stack.",
                      "Start with a conversation about your workflow — the scope comes next, in writing.",
                      {"label": "Book an intro call", "href": linkto("contact.html", "systems/%s.html" % s["slug"])},
                      {"label": "Explore all systems", "href": linkto("systems.html", "systems/%s.html" % s["slug"])}))
    return "\n".join(b), s["name"] + " — ReWoo Systems", (
        "ReWoo %s: %s Scoped engagement — designed and built around your stack."
        % (s["name"], s["short"])), [faq_jsonld(s["faqs"])]


def capability_page(c):
    p = "capabilities/%s.html" % c["slug"]
    b = []
    group_name = dict(CAPABILITY_GROUPS)[c["group"]]
    crumb = crumbs([("Home", "index.html"), ("Capabilities", "capabilities.html"), (c["name"], None)], p)
    ctas = ('<a class="btn btn--primary" href="%s">Discuss this project →</a>'
            '<a class="btn btn--outline" href="%s#process">See the process</a>'
            % (esc(linkto("contact.html", p)), esc(linkto("capabilities/%s.html" % c["slug"], p))))
    b.append(page_hero("%s · %s of 12" % (group_name, c["num"]), esc(c["name"]), c["lede"],
                       badges=["Scoped engagement", "Fixed quote after discovery"], ctas=ctas, breadcrumb=crumb))
    b.append(plain_band(c["slug"], p))

    b.append('<section class="section" aria-label="The problem"><div class="wrap">'
             + section_header("The problem", "The gap this fills.", None, center=False)
             + '<div class="prose"><p>%s</p></div>' % esc(c["problem"]) + "</div></section>")

    b.append('<section class="section section--surface" aria-label="Example applications"><div class="wrap">'
             + section_header("Example applications", "What teams build with this.", None, center=False)
             + card_grid([mini_card(a["t"], a["d"]) for a in c["applications"]], "card-grid card-grid--3")
             + "</div></section>")

    b.append(tech_section(c["slug"], p, kind="system"))

    b.append('<section class="section" aria-label="Scope"><div class="wrap">'
             + section_header("Scope", "What the engagement covers.", None, center=False)
             + '<div class="scope-grid">'
             + '<div class="scope-card scope-card--in"><h3 class="scope-card__t">In scope</h3>'
             + checks(c["scope_in"], "Included in scope") + "</div>"
             + '<div class="scope-card scope-card--out"><h3 class="scope-card__t">Not included</h3>'
             + crosses(c["scope_out"], "Excluded from scope") + "</div></div></div></section>")

    b.append('<section class="section section--surface" aria-label="Inputs and deliverables"><div class="wrap">'
             + section_header("Inputs and deliverables", "What you bring. What you get.", None, center=False)
             + '<div class="scope-grid">'
             + '<div class="scope-card"><h3 class="scope-card__t">What we need from you</h3>'
             + '<ul class="inputs">' + "".join("<li>%s</li>" % esc(i) for i in c["inputs"]) + "</ul></div>"
             + '<div class="scope-card scope-card--in"><h3 class="scope-card__t">Deliverables</h3>'
             + checks(c["deliverables"], "Deliverables") + "</div></div>"
             + '<div class="split"><div><h3 class="split__t">Integration notes</h3>'
             + chips(c["integrations"], "Integration notes")
             + '<p class="split__d">Final connector list is scoped per engagement against your systems and permissions.</p></div>'
             + '<div><h3 class="split__t">Next step</h3><p class="split__d">Describe the workflow on a call; the written scope follows.</p>'
             + '<a class="btn btn--primary" href="%s">Discuss this project →</a> %s</div></div>'
             % (esc(linkto("contact.html", p)), brief_btn("capability", c["slug"], c["name"]))
             + "</div></section>")

    b.append('<section class="section" id="process" aria-label="Process"><div class="wrap">'
             + section_header("Process", "How the engagement runs.", None, center=False)
             + steps(c["process"]) + "</div></section>")

    rel_cards = [link_card(linkto("capabilities/%s.html" % r, p), CAP_BY[r]["name"], CAP_BY[r]["short"],
                           num=CAP_BY[r]["num"]) for r in c["related"]]
    b.append(related_section("Related capabilities", rel_cards,
                             note="Pairs well with these disciplines — the scope says which are actually needed."))
    b.append('<section class="section section--surface" aria-label="FAQ"><div class="wrap">'
             + section_header("FAQ", "Asked about this capability.", None, center=False)
             + faq_block(c["faqs"]) + "</div></section>")
    b.append(cta_band("Scope this capability for your workflow.",
                      "One conversation about the work — then a written scope, a fixed quote, and milestones you can demo.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "All capabilities", "href": linkto("capabilities.html", p)}))
    return "\n".join(b), c["name"] + " — ReWoo Capabilities", (
        "ReWoo %s: %s Scoped engagement with defined inputs, deliverables, and boundaries."
        % (c["name"], c["short"])), [faq_jsonld(c["faqs"])]


def industry_page(i):
    p = "industries/%s.html" % i["slug"]
    b = []
    crumb = crumbs([("Home", "index.html"), ("Industries", "industries.html"), (i["name"], None)], p)
    ctas = ('<a class="btn btn--primary" href="%s">Discuss a %s workflow →</a>'
            % (esc(linkto("contact.html", p)), esc(i["name"].split(" &")[0].lower())))
    b.append(page_hero("Industry", "AI systems for " + esc(i["name"]), i["short"], ctas=ctas, breadcrumb=crumb))
    b.append(note_band("These are possible workflows, not a client list — a discovery aid for mapping "
                       "ReWoo's systems and capabilities onto your operation.", "Note"))

    b.append('<section class="section" aria-label="Context"><div class="wrap">'
             + section_header("Context", "Where the pressure sits.", None, center=False)
             + '<div class="prose"><p>%s</p></div>' % esc(i["context"]) + "</div></section>")

    wf_html = []
    for w in i["workflows"]:
        wf_html.append('<div class="wf-card"><h3 class="wf-card__t">%s</h3>'
                       '<ol class="wf-steps">%s</ol><p class="wf-card__note">%s</p></div>'
                       % (esc(w["t"]),
                          "".join("<li>%s</li>" % esc(st) for st in w["steps"]),
                          esc(w["note"])))
    b.append('<section class="section section--surface" aria-label="Possible workflows"><div class="wrap">'
             + section_header("Possible workflows", "Three places systems typically fit.", None, center=False)
             + '<div class="wf-grid">%s</div></div></section>' % "".join(wf_html))

    cap_cards = [link_card(linkto("capabilities/%s.html" % c, p), CAP_BY[c]["name"], CAP_BY[c]["short"], num=CAP_BY[c]["num"])
                 for c in i["capabilities"]]
    sys_cards = [link_card(linkto("systems/%s.html" % s, p), SYS_BY[s]["name"], SYS_BY[s]["short"], ic=SYS_BY[s]["icon"])
                 for s in i["systems"]]
    b.append('<section class="section" aria-label="Relevant capabilities"><div class="wrap">'
             + section_header("Relevant capabilities", "Build disciplines for this industry.", None, center=False)
             + card_grid(cap_cards, "card-grid card-grid--3") + "</div></section>")
    b.append('<section class="section section--surface" aria-label="Relevant systems"><div class="wrap">'
             + section_header("Relevant systems", "Solution families that fit.", None, center=False)
             + card_grid(sys_cards, "card-grid card-grid--3") + "</div></section>")
    b.append(note_band(i["considerations"], "Considerations"))
    b.append(cta_band("Map this to your operation.",
                      "Bring the workflow that hurts most — the honest fit assessment is free.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "All industries", "href": linkto("industries.html", p)}))
    return "\n".join(b), "AI Systems for " + i["name"] + " — ReWoo", (
        "Possible AI workflows for %s: %s Discovery aid from ReWoo's systems and capabilities."
        % (i["name"], i["short"])), []


def package_page(p):
    path = "packages/%s.html" % p["slug"]
    b = []
    crumb = crumbs([("Home", "index.html"), ("Packages", "packages.html"), (p["name"], None)], path)
    ctas = ('<a class="btn btn--primary" href="%s">Request scope →</a>'
            '<a class="btn btn--outline" href="%s#compare">Compare engagements</a>'
            % (esc(linkto("contact.html", path)), esc(linkto("packages.html", path))))
    b.append(page_hero("%s engagement" % p["archetype"], esc(p["name"]), p["short"],
                       badges=[p["chip"], p["duration"], "%s · estimate" % p["range"], "Written scope", "Fixed quote after discovery"],
                       ctas=ctas, breadcrumb=crumb))
    b.append(note_band(p["summary"] + " " + PRICING_NOTE, "Terms"))
    b.append(plain_band(p["slug"], path))

    b.append('<section class="section" aria-label="Who it is for"><div class="wrap">'
             + section_header("Who it is for", "The buyers this fits.", None, center=False)
             + card_grid([mini_card(x, "") for x in p["buyers"]], "card-grid card-grid--3")
             + "</div></section>")

    b.append('<section class="section section--surface" aria-label="What is included"><div class="wrap">'
             + section_header("What is included", "The engagement, end to end.", None, center=False)
             + '<ol class="includes">' + "".join("<li>%s</li>" % esc(x) for x in p["includes"]) + "</ol>"
             + "</div></section>")

    b.append(tech_section(p["slug"], path, kind="package"))

    b.append('<section class="section" aria-label="Outputs"><div class="wrap">'
             + section_header("Outputs", "What you walk away with.", None, center=False)
             + card_grid([mini_card(o["t"], o["d"], ic="check") for o in p["outputs"]], "card-grid card-grid--3")
             + "</div></section>")

    b.append('<section class="section section--surface" aria-label="Exclusions"><div class="wrap">'
             + section_header("Exclusions", "What this is not.", None, center=False)
             + '<div class="scope-card scope-card--out scope-card--solo">' + crosses(p["exclusions"], "Exclusions") + "</div>"
             + "</div></section>")

    b.append('<section class="section" aria-label="How it runs"><div class="wrap">'
             + section_header("How it runs", "The shape of the engagement.", None, center=False)
             + steps(p["process"]) + "</div></section>")

    after_cards = []
    for a in p["after"]:
        pk = PKG_BY[a["slug"]]
        after_cards.append(link_card(linkto("packages/%s.html" % a["slug"], path), pk["name"], a["why"], ic=pk["icon"]))
    b.append('<section class="section section--surface" aria-label="After this"><div class="wrap">'
             + section_header("After this", "Natural next steps.", None, center=False)
             + card_grid(after_cards, "card-grid card-grid--3") + "</div></section>")

    b.append('<section class="section" aria-label="FAQ"><div class="wrap">'
             + section_header("FAQ", "Asked about this engagement.", None, center=False)
             + faq_block(p["faqs"]) + "</div></section>")
    b.append(cta_band("Start with a request for scope.",
                      "Describe the workflow on a call or in writing — the scope, milestones, and fixed quote follow.",
                      {"label": "Request scope", "href": linkto("contact.html", path)},
                      {"label": "Compare engagements", "href": linkto("packages.html", path)}))
    return "\n".join(b), p["name"] + " — ReWoo Engagements", (
        "ReWoo %s: %s Scoped engagement with defined outputs and exclusions; terms per engagement."
        % (p["name"], p["short"])), [faq_jsonld(p["faqs"])]


# ------------------------------------------------------------------ hubs ----

def systems_hub():
    p = "systems.html"
    b = []
    b.append(page_hero("System families", "Two flagships you can open. <em>Five more on request.</em>",
                       "ReWoo leads with the systems it can prove — voice intelligence and knowledge search both "
                       "run live on this site. The other five families are scoped builds, engineered around your "
                       "stack with review gates, integrations, and honest limits."))
    b.append(note_band(FORMAT_NOTE, "Format"))
    b.append(note_band("New to AI systems? Every family page opens with an “In plain words” summary for beginners, "
                       "plus a “For technical evaluators” section with the engineering substance — start with the "
                       "studio guides if you want the ground floor first.", "Start here", variant="start"))

    def sys_card(s, n):
        feats = "".join('<li>%s</li>' % esc(f["t"]) for f in s["features"][:3])
        return ('<article class="sys-card"><div class="sys-card__head">'
                '<span class="sys-card__num">%02d</span><span class="sys-card__icon">%s</span></div>'
                '<h2 class="sys-card__t"><a href="%s">%s</a></h2>'
                '<p class="sys-card__cat">%s</p><p class="sys-card__d">%s</p>'
                '<ul class="sys-card__feats">%s</ul>'
                '<div class="sys-card__ctas"><a class="btn btn--outline" href="%s">Explore the system</a>%s</div>'
                "</article>"
                % (n, icon(s["icon"], "icon"), esc(linkto("systems/%s.html" % s["slug"], p)),
                   esc(s["name"]), esc(s["category"]), esc(s["short"]), feats,
                   esc(linkto("systems/%s.html" % s["slug"], p)),
                   brief_btn("system", s["slug"], s["name"], compact=True)))

    flagship = [s for s in SYSTEMS if s["slug"] in FLAGSHIPS]
    others = [s for s in SYSTEMS if s["slug"] not in FLAGSHIPS]

    # Flagship cards — bigger, with live-demo links
    def flagship_card(s):
        demo_href = "demo-voice.html" if s["slug"] == "voice-intelligence" else "demo-search.html"
        feats = "".join('<li>%s</li>' % esc(f["t"]) for f in s["features"][:4])
        return ('<article class="flag-card"><div class="flag-card__head">'
                '<span class="flag-card__icon">%s</span>'
                '<span class="badge badge--live">Live demo</span></div>'
                '<h2 class="flag-card__t"><a href="%s">%s</a></h2>'
                '<p class="flag-card__cat">%s</p><p class="flag-card__d">%s</p>'
                '<ul class="sys-card__feats">%s</ul>'
                '<div class="flag-card__ctas"><a class="btn btn--primary" href="%s">Open the live demo →</a>'
                '<a class="btn btn--outline" href="%s">Explore the system</a>%s</div></article>'
                % (icon(s["icon"], "icon"),
                   esc(linkto("systems/%s.html" % s["slug"], p)), esc(s["name"]),
                   esc(s["category"]), esc(s["lede"]), feats,
                   esc(linkto(demo_href, p)),
                   esc(linkto("systems/%s.html" % s["slug"], p)),
                   brief_btn("system", s["slug"], s["name"], compact=True)))

    b.append('<section class="section" aria-label="Flagship systems"><div class="wrap">'
             + '<div class="sec-head" data-animate>'
             + '<p class="overline overline--accent">Flagships</p>'
             + '<h2 class="s-headline">The two we can <em>prove today.</em></h2>'
             + '<p class="s-subhead">Both families run as live, openable demos on this site — proof before any '
               'sales conversation.</p></div>'
             + '<div class="flag-grid">' + "".join(flagship_card(s) for s in flagship) + "</div></div></section>")

    b.append('<section class="section section--surface" aria-label="Also built on request"><div class="wrap">'
             + '<div class="sec-head" data-animate>'
             + '<p class="overline overline--accent">Also built on request</p>'
             + '<h2 class="s-headline">Five more families. <em>Scoped, not shelved.</em></h2>'
             + '<p class="s-subhead">Each is a designed-to-order engagement with the same review gates, '
               'evaluation, and handover — built when the workflow calls for it.</p></div>'
             + '<div class="sys-grid sys-grid--five">' + "".join(sys_card(s, i) for i, s in enumerate(others, 1))
             + "</div></div></section>")

    b.append(cta_band("Not sure which family fits?",
                      "Describe the workflow — the honest mapping to systems, or a clear no, is part of the first call.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "Browse capabilities", "href": linkto("capabilities.html", p)}))
    return "\n".join(b), "AI Systems — Two Flagship Demos and Five Scoped Families | ReWoo", (
        "ReWoo system families: voice intelligence and knowledge search run live on this site; visual production, "
        "assessment, design visualization, content pipelines, and document intelligence are scoped builds. "
        "The AI studio you can audit.")


def capabilities_hub():
    p = "capabilities.html"
    b = []
    b.append(page_hero("Capabilities", "Twelve ways we build.", 
                       "Scoped engagements with defined inputs, deliverables, and boundaries — filter by the kind "
                       "of work, or search for the discipline you have in mind."))
    b.append(note_band("Every capability page opens with an “In plain words” summary for beginners, followed by a "
                       "“For technical evaluators” section with architecture, evaluation and operations detail.", "Start here", variant="start"))
    pills = ['<button type="button" class="filter-pill is-active" data-filter="all" aria-pressed="true">All</button>']
    for gkey, gname in CAPABILITY_GROUPS:
        pills.append('<button type="button" class="filter-pill" data-filter="%s" aria-pressed="false">%s</button>'
                     % (gkey, esc(gname)))
    b.append('<section class="section" aria-label="Capabilities"><div class="wrap">'
             '<div class="filterbar"><div class="search-box" role="search">'
             '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>'
             '<label class="sr-only" for="cap-search">Search capabilities</label>'
             '<input type="search" id="cap-search" placeholder="Search capabilities…" autocomplete="off">'
             "</div>"
             '<div class="filter-pills" role="group" aria-label="Filter capabilities">%s</div></div>'
             '<p class="filter-status" role="status" aria-live="polite" data-filter-status></p>'
             '<div class="cap-grid" id="cap-grid">' % ("".join(pills)))
    for c in CAPABILITIES:
        b.append('<article class="cap-card" data-group="%s" data-search="%s">'
                 '<div class="cap-card__head"><span class="cap-card__num">%s</span>'
                 '<span class="cap-card__icon">%s</span></div>'
                 '<h2 class="cap-card__t"><a href="%s">%s</a></h2>'
                 '<p class="cap-card__d">%s</p>'
                 '<div class="cap-card__ctas"><a class="cap-card__link" href="%s">View capability →</a>%s</div>'
                 "</article>"
                 % (c["group"], esc((c["name"] + " " + c["short"] + " " + c["lede"]).lower()),
                    c["num"], icon(c["icon"], "icon"),
                    esc(linkto("capabilities/%s.html" % c["slug"], p)), esc(c["name"]), esc(c["short"]),
                    esc(linkto("capabilities/%s.html" % c["slug"], p)),
                    brief_btn("capability", c["slug"], c["name"], compact=True)))
    b.append('<div class="filter-empty" data-filter-empty hidden>'
             '<p>No capabilities match that search.</p><button type="button" class="btn btn--outline" data-filter-reset>Clear filters</button></div>')
    b.append("</div>"
             '<noscript><p class="noscript-note">Filtering and search need JavaScript — all twelve capabilities '
             "are listed above either way.</p></noscript></div></section>")
    b.append(cta_band("Do not see your discipline?",
                      "The twelve cover most builds — if your workflow needs something adjacent, ask: the answer is honest either way.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "Explore systems instead", "href": linkto("systems.html", p)}))
    return "\n".join(b), "AI Capabilities — Twelve Build Disciplines | ReWoo", (
        "Twelve AI build capabilities from ReWoo: agents, chatbots, voice, generative AI, multi-agent systems, "
        "consulting, automation, NLP and RAG, computer vision, content production, integrations, and MVPs.")


def industries_hub():
    p = "industries.html"
    b = []
    b.append(page_hero("Industries", "Where the work <em>actually happens.</em>",
                       "Ten industries, each mapped with possible workflows — a discovery aid for finding the "
                       "system that fits, not a trophy list of past clients."))
    b.append(note_band("Industry pages describe possible workflows — ReWoo claims no verified client history "
                       "in any vertical. Fit conversations start from your workflow, not our portfolio.", "Note"))
    cards = [link_card(linkto("industries/%s.html" % i["slug"], p), i["name"], i["short"], ic=i["icon"])
             for i in INDUSTRIES]
    b.append('<section class="section" aria-label="Industries"><div class="wrap">'
             + card_grid(cards, "card-grid card-grid--ind") + "</div></section>")
    b.append(cta_band("Your industry is a starting point, not a verdict.",
                      "The workflow matters more than the vertical — bring yours and we will map it honestly.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "Who we build for", "href": linkto("who-we-build-for.html", p)}))
    return "\n".join(b), "Industries — Possible AI Workflows | ReWoo", (
        "Ten industries mapped with possible AI workflows — commerce, education, financial services, healthcare, "
        "manufacturing, media, real estate, software, hospitality, and sports. A discovery aid by ReWoo.")


def packages_hub():
    p = "packages.html"
    b = []
    b.append(page_hero("Engagements", "Five ways to start.", 
                       "Two audits, two builds, one workshop — every engagement ends in something you own, "
                       "with terms set per engagement in a written scope."))
    b.append(note_band(PRICING_NOTE, "Terms"))
    b.append(note_band("Every engagement page opens with an “In plain words” summary for beginners, plus a "
                       "“How this engagement actually runs” section covering method, acceptance criteria and "
                       "deliverables for technical evaluators.", "Start here", variant="start"))
    cards = []
    for pk in PACKAGES:
        cards.append('<article class="pkg-card"><div class="pkg-card__head">'
                     '<span class="pkg-card__icon">%s</span><span class="badge">%s</span></div>'
                     '<h2 class="pkg-card__t"><a href="%s">%s</a></h2>'
                     '<p class="pkg-card__d">%s</p>'
                     '<p class="pkg-card__buyers"><strong>For:</strong> %s</p>'
                     '<p class="pkg-card__meta"><span class="pkg-mini__dur">%s</span>'
                     '<span class="pkg-mini__range">%s <em>(est.)</em></span></p>'
                     '<div class="pkg-card__ctas"><a class="btn btn--outline" href="%s">View engagement</a>%s</div>'
                     "</article>"
                     % (icon(pk["icon"], "icon"), esc(pk["chip"]),
                        esc(linkto("packages/%s.html" % pk["slug"], p)), esc(pk["name"]), esc(pk["short"]),
                        esc(pk["buyers"][0].lower()),
                        esc(pk["duration"]), esc(pk["range"]),
                        esc(linkto("packages/%s.html" % pk["slug"], p)),
                        brief_btn("package", pk["slug"], pk["name"], compact=True)))
    b.append('<section class="section" aria-label="Engagements"><div class="wrap">'
             + '<div class="pkg-grid">' + "".join(cards) + "</div></div></section>")

    rows = [
        ("Archetype", [pk["archetype"] for pk in PACKAGES]),
        ("Shape", [pk["chip"] for pk in PACKAGES]),
        ("Typical duration", [pk["duration"] for pk in PACKAGES]),
        ("Indicative range", [pk["range"] + " (est.)" for pk in PACKAGES]),
        ("Best first when", ["You do not know where to start",
                             "One workflow is clearly worth a build",
                             "The model works but cannot touch your systems",
                             "One process is drowning the team",
                             "Leadership needs to align before anything"]),
        ("You walk away with", ["A prioritized, reasoned roadmap",
                                "A deployed, evaluated agent",
                                "Monitored, documented integrations",
                                "A scoped process redesign",
                                "A first plan the room built"]),
        ("Leads naturally to", ["AI Agent MVP", "Integration Sprint", "Agent MVP or audits",
                                "Agent MVP or Integration Sprint", "Readiness Audit"]),
    ]
    head_cells = "".join('<th scope="col">%s</th>' % esc(pk["name"]) for pk in PACKAGES)
    body_rows = []
    for label, vals in rows:
        cells = "".join("<td>%s</td>" % esc(v) for v in vals)
        body_rows.append('<tr><th scope="row">%s</th>%s</tr>' % (esc(label), cells))
    b.append('<section class="section section--surface" id="compare" aria-label="Compare engagements"><div class="wrap">'
             + section_header("Comparison", "Five doors into the same discipline.", 
                              "Every path ends in a written scope and a system you own — the difference is where you start.",
                              center=True)
             + '<div class="table-wrap"><table class="cmp"><thead><tr><th scope="col">Engagement</th>'
             + head_cells + "</tr></thead><tbody>" + "".join(body_rows) + "</tbody></table></div></div></section>")
    b.append(cta_band("Know which one you need?",
                      "Request scope for an engagement, or start with a call if the fit is unclear.",
                      {"label": "Request scope", "href": linkto("contact.html", p)},
                      {"label": "Readiness unclear? Start with the audit", "href": linkto("packages/ai-readiness-audit.html", p)}))
    return "\n".join(b), "Engagements — Five Ways to Start | ReWoo", (
        "Five ReWoo engagement types: AI Readiness Audit, AI Agent MVP, AI Integration Sprint, "
        "Workflow Automation Audit, and AI Strategy Workshop. Written scopes, terms per engagement.")


def audiences_page():
    p = "who-we-build-for.html"
    b = []
    b.append(page_hero("Who we build for", "Four profiles. <em>One honest process.</em>",
                       "Engagement needs differ by stage — the written scope, the milestones, and the handover "
                       "are the same for everyone."))
    for n, a in enumerate(AUDIENCES):
        pkg_links = "".join('<li><a class="chip chip--link" href="%s">%s</a></li>'
                            % (esc(linkto("packages/%s.html" % pk, p)), esc(PKG_BY[pk]["name"]))
                            for pk in a["packages"])
        needs = "".join("<li>%s</li>" % esc(x) for x in a["needs"])
        cls = "section" if n % 2 == 0 else "section section--surface"
        b.append('<section class="%s aud-block" id="%s" aria-label="%s"><div class="wrap">'
                 '<p class="overline overline--accent">%s</p>'
                 '<h2 class="s-headline">%s</h2>'
                 '<p class="aud-tag">%s</p>'
                 '<div class="aud-grid">'
                 '<div><h3 class="aud-t">The profile</h3><p class="aud-d">%s</p></div>'
                 '<div><h3 class="aud-t">What this stage usually needs</h3><ul class="inputs">%s</ul></div>'
                 '<div><h3 class="aud-t">How engagements differ</h3><p class="aud-d">%s</p>'
                 '<h3 class="aud-t aud-t--gap">Suggested starting points</h3><ul class="chips chips--links">%s</ul></div>'
                 "</div></div></section>"
                 % (cls, a["slug"], esc(a["name"]), esc(a["eyebrow"]), esc(a["name"]), esc(a["tagline"]),
                    esc(a["profile"]), needs, esc(a["engagement"]), pkg_links))
    b.append(cta_band("Fit is about the workflow, not the letterhead.",
                      "Whatever the stage, the first step is the same: a call about the work.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "Explore engagements", "href": linkto("packages.html", p)}))
    return "\n".join(b), "Who We Build For — Four Engagement Profiles | ReWoo", (
        "How ReWoo engagements differ for early-stage startups, growth-stage startups, mid-market "
        "organizations, and enterprises. Written scopes and complete handover at every stage.")


def departments_page():
    p = "departments.html"
    b = []
    b.append(page_hero("Departments", "Find the work <em>by team.</em>",
                       "A discovery lens: the same systems and capabilities, indexed by the department "
                       "that feels the pain."))
    b.append(note_band("Departments are an entry point, not an org-chart promise — the workflows below are "
                       "the usual suspects, and scopes always start from how your team actually works.", "Note"))
    blocks = []
    for d in DEPARTMENTS:
        fr = "".join("<li>%s</li>" % esc(x) for x in d["friction"])
        wfs = "".join('<div class="dept-wf"><h4 class="dept-wf__t">%s</h4><p class="dept-wf__d">%s</p></div>'
                      % (esc(w["t"]), esc(w["d"])) for w in d["workflows"])
        links = []
        for s in d["systems"]:
            links.append('<a class="chip chip--link" href="%s">%s</a>' % (esc(linkto("systems/%s.html" % s, p)), esc(SYS_BY[s]["name"])))
        for c in d["capabilities"]:
            links.append('<a class="chip chip--link" href="%s">%s</a>' % (esc(linkto("capabilities/%s.html" % c, p)), esc(CAP_BY[c]["name"])))
        blocks.append('<article class="dept-card"><div class="dept-card__head">'
                      '<span class="dept-card__icon">%s</span><h2 class="dept-card__t">%s</h2></div>'
                      '<div class="dept-grid"><div><h3 class="aud-t">The friction</h3>'
                      '<ul class="inputs">%s</ul></div>'
                      '<div><h3 class="aud-t">Workflows that fit</h3>%s'
                      '<h3 class="aud-t aud-t--gap">Starting points</h3><div class="chips chips--links">%s</div></div></div>'
                      "</article>" % (icon(d["icon"], "icon"), esc(d["name"]), fr, wfs, "".join(links)))
    b.append('<section class="section" aria-label="Departments"><div class="wrap">'
             + '<div class="dept-list">' + "".join(blocks) + "</div></div></section>")
    b.append(cta_band("Recognize your team in here?",
                      "Bring the specific workflow — departments are just the doorway.",
                      {"label": "Book an intro call", "href": linkto("contact.html", p)},
                      {"label": "Browse capabilities", "href": linkto("capabilities.html", p)}))
    return "\n".join(b), "Departments — AI Workflows by Team | ReWoo", (
        "AI systems and capabilities indexed by department: support, sales, marketing, HR, engineering, "
        "finance, operations, and legal. A discovery lens from ReWoo.")


# ------------------------------------------------------------- handpages ----

def render_template(tpl_path, out_path, title, desc, active, jsonld=None):
    with open(os.path.join(HERE, "templates", tpl_path), encoding="utf-8") as fh:
        body = fh.read()
    body = body.replace("<!--@NAV-->", nav(out_path, active)).replace("<!--@FOOTER-->", footer(out_path))
    doc = head(title, desc, out_path, jsonld) + body
    full = os.path.join(OUT, out_path)
    with open(full, "w", encoding="utf-8") as fh:
        fh.write(doc)
    return out_path


# -------------------------------------------------------------- sitemap -----

SITEMAP_PAGES = []


def build_sitemap():
    urls = [(u, prio, freq) for u, prio, freq in SITEMAP_PAGES]
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u, prio, freq in urls:
        xml.append("  <url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority></url>"
                   % (SITE["url"] + "/" + u, TODAY, freq, prio))
    xml.append("</urlset>")
    with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(xml) + "\n")


def build_robots():
    txt = ("User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n" % SITE["url"])
    with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8") as fh:
        fh.write(txt)


# ------------------------------------------------------------------ main ----

def main():
    written = []

    # Guard: every catalog page must carry both depth layers — the build fails
    # loudly instead of shipping a page without them.
    _all = [x["slug"] for x in SYSTEMS + CAPABILITIES + PACKAGES]
    _missing = [s for s in _all if s not in PLAIN or s not in TECH]
    if _missing:
        sys.exit("data_depth.py incomplete — missing PLAIN/TECH for: %s" % ", ".join(_missing))

    for s in SYSTEMS:
        body, title, desc, ld = system_page(s)
        path = "systems/%s.html" % s["slug"]
        written.append(write_page(path, body, title, desc, ld, active="systems"))
        SITEMAP_PAGES.append((path, "0.7", "monthly"))
    for c in CAPABILITIES:
        body, title, desc, ld = capability_page(c)
        path = "capabilities/%s.html" % c["slug"]
        written.append(write_page(path, body, title, desc, ld, active="capabilities"))
        SITEMAP_PAGES.append((path, "0.7", "monthly"))
    for i in INDUSTRIES:
        body, title, desc, ld = industry_page(i)
        path = "industries/%s.html" % i["slug"]
        written.append(write_page(path, body, title, desc, ld, active="industries"))
        SITEMAP_PAGES.append((path, "0.6", "monthly"))
    for pk in PACKAGES:
        body, title, desc, ld = package_page(pk)
        path = "packages/%s.html" % pk["slug"]
        written.append(write_page(path, body, title, desc, ld, active="packages"))
        SITEMAP_PAGES.append((path, "0.8", "monthly"))

    written.append(write_page("systems.html", *systems_hub(), active="systems"))
    SITEMAP_PAGES.append(("systems.html", "0.9", "weekly"))
    written.append(write_page("capabilities.html", *capabilities_hub(), active="capabilities"))
    SITEMAP_PAGES.append(("capabilities.html", "0.9", "weekly"))
    written.append(write_page("industries.html", *industries_hub(), active="industries"))
    SITEMAP_PAGES.append(("industries.html", "0.8", "weekly"))
    written.append(write_page("packages.html", *packages_hub(), active="packages"))
    SITEMAP_PAGES.append(("packages.html", "0.9", "weekly"))
    written.append(write_page("who-we-build-for.html", *audiences_page(), active=None))
    SITEMAP_PAGES.append(("who-we-build-for.html", "0.7", "monthly"))
    written.append(write_page("departments.html", *departments_page(), active=None))
    SITEMAP_PAGES.append(("departments.html", "0.7", "monthly"))

    # Hand-written templates
    written.append(render_template(
        "index.html", "index.html",
        "ReWoo — The AI Studio You Can Audit | Agents, Pipelines, Retrieval",
        SITE["description"], None,
        [ORG_JSONLD, {"@context": "https://schema.org", "@type": "WebSite",
                      "name": "ReWoo", "url": SITE["url"]}, faq_jsonld(HOME["faq"]["items"])]))
    SITEMAP_PAGES.append(("index.html", "1.0", "weekly"))
    written.append(render_template(
        "about.html", "about.html",
        "About — An AI Systems Studio from Dhaka | ReWoo",
        "ReWoo is an independent AI systems studio in Dhaka, Bangladesh: written scopes, complete handover, "
        "and honest feasibility — founded by Adil, an engineer with a research publication and a Kaggle Master rank.",
        "about"))
    SITEMAP_PAGES.append(("about.html", "0.8", "monthly"))
    written.append(render_template(
        "proof.html", "proof.html",
        "Proof — Live Demos, Benchmark, Research | ReWoo",
        "The AI studio you can audit: two live demos, a retrieval benchmark you re-run yourself, research "
        "credentials, and a case study honestly labeled as in preparation. Everything on this page is checkable.",
        "proof"))
    SITEMAP_PAGES.append(("proof.html", "0.9", "weekly"))
    written.append(render_template(
        "demo-voice.html", "demo-voice.html",
        "Voice Intelligence Demo — Bangla & English, Live | ReWoo",
        "A voice demo you can open: real browser transcription in Bangla and English with measured latency, "
        "plus a code-switched support call walking the full pipeline. No signup, no server.",
        "proof"))
    SITEMAP_PAGES.append(("demo-voice.html", "0.8", "weekly"))
    written.append(render_template(
        "demo-search.html", "demo-search.html",
        "Knowledge Search Demo + Retrieval Benchmark | ReWoo",
        "Ask a real knowledge base questions with clickable citations, then re-run the published retrieval "
        "benchmark — 19 questions, BM25, computed live in your browser with failures included.",
        "proof"))
    SITEMAP_PAGES.append(("demo-search.html", "0.8", "weekly"))
    written.append(render_template(
        "scope-generator.html", "scope-generator.html",
        "AI Scope Generator — Draft a Written Scope in 60 Seconds | ReWoo",
        "Describe your workflow and get a draft written scope with a readiness read-out and indicative budget "
        "range — generated in your browser, transparently. An assistant, not a quote.",
        "proof"))
    SITEMAP_PAGES.append(("scope-generator.html", "0.9", "weekly"))
    written.append(render_template(
        "security.html", "security.html",
        "Security & Data Handling | ReWoo",
        "Where your data lives, in writing: client-owned infrastructure, least access, no silent retention, "
        "consent design, and deployment models from your cloud to fully on-premise.",
        None))
    SITEMAP_PAGES.append(("security.html", "0.6", "monthly"))
    written.append(render_template(
        "roadmap.html", "roadmap.html",
        "Public Roadmap — Proof Room, Review Console, and What's Next | ReWoo",
        "ReWoo's public roadmap with honest status labels: live now (demos, benchmark, Scope Generator), "
        "building next (Proof Room, review console, cost dashboard), and exploring (MCP, red-team, on-prem).",
        "proof"))
    SITEMAP_PAGES.append(("roadmap.html", "0.6", "monthly"))
    written.append(render_template(
        "resources.html", "resources.html",
        "Resources — Guides and Studio Notes | ReWoo",
        "Practical guides from ReWoo's client work: how to brief an AI system, the automation ladder, "
        "and a plain-English glossary of the AI stack. Plus concepts honestly labeled as explorations.",
        None))
    SITEMAP_PAGES.append(("resources.html", "0.6", "monthly"))
    written.append(render_template(
        "contact.html", "contact.html",
        "Contact — Book a Call or Write | ReWoo",
        "Book an intro call with ReWoo — thirty minutes on your workflow with the person who would build it — "
        "or send a written inquiry with brief or RFP listing and an NDA option. Nothing sent or stored automatically.",
        "contact", [faq_jsonld(CONTACT["faq"])]))
    SITEMAP_PAGES.append(("contact.html", "0.8", "weekly"))

    # Preserved public routes stay in the sitemap
    SITEMAP_PAGES.append(("solutions.html", "0.4", "monthly"))
    SITEMAP_PAGES.append(("privacy.html", "0.3", "yearly"))
    SITEMAP_PAGES.append(("terms.html", "0.3", "yearly"))

    build_sitemap()
    build_robots()

    print("Built %d pages + sitemap.xml + robots.txt" % len(written))
    for w in written:
        print("  ✓", w)


if __name__ == "__main__":
    main()
