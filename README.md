# ReWoo — The AI Studio You Can Audit

> **AI systems, scoped and shipped.**
> https://rewoo.tech

---

## Overview

ReWoo is an independent AI systems studio based in Dhaka, Bangladesh, working with teams anywhere. The site is built around one positioning — **the AI studio you can audit** — with live demos, a re-runnable retrieval benchmark, a written plan before any work starts, and honest status labels on everything.

- **Home (`index.html`)** — proof-first: hero promise, outcome stat strip, two flagship demos, engagement steps, founder, packages with durations, FAQ.
- **Proof (`proof.html`)** — the audit hub: live demos, benchmark, research credentials, the UK case study (honestly labeled in preparation), and "audit us with your own AI" links.
- **Live demos** — `demo-voice.html` (Web Speech API transcription in Bangla/English + scripted pipeline) and `demo-search.html` (BM25 knowledge search with clickable citations + a 19-question retrieval benchmark computed live in the visitor's browser, failures included).
- **AI Scope Generator (`scope-generator.html`)** — the main conversion path: describe a workflow, get a draft written plan with a readiness read-out, generated client-side by a transparent heuristic.
- **Systems (`systems/`)** — two flagship families with live demos plus five scoped families, each with plain-words and technical-evaluator layers and a pipeline diagram.
- **Packages (`packages/`)** — five engagements with typical durations, plus a comparison table. No published prices: every engagement is a written plan approved by the client first.
- **Security (`security.html`)** — where data lives, retention, consent design, deployment models.
- **Roadmap (`roadmap.html`)** — the public roadmap with honest status labels: live now / building next / exploring / horizon.
- **Catalog** — capabilities (12), industries (10), departments, audiences — generated, reachable from hubs and the footer.
- **Preserved routes** — `solutions.html` (retired from nav; the Scope Generator is its successor), `order-desk/` (untouched demo app), `privacy.html`, `terms.html`.

## Project Structure

```
ReWoo/
├── index.html                  # Homepage (generated from scripts/templates/)
├── proof.html                  # Proof hub: demos, benchmark, research, case study
├── demo-voice.html             # Live voice demo (Web Speech API + scripted pipeline)
├── demo-search.html            # Knowledge search demo + retrieval benchmark
├── scope-generator.html        # AI Scope Generator (client-side heuristic)
├── security.html               # Security & data handling
├── roadmap.html                # Public roadmap
├── systems/                    # 7 system detail pages (2 flagships, 5 scoped)
├── capabilities/               # 12 capability detail pages (generated)
├── industries/                 # 10 industry pages (generated)
├── packages/                   # 5 engagement pages with durations
├── systems.html                # Systems hub (flagship-first)
├── capabilities.html           # Capabilities hub with search/filter (generated)
├── industries.html             # Industries hub (generated)
├── packages.html               # Engagements + comparison table (generated)
├── who-we-build-for.html       # Audience profiles (generated)
├── departments.html            # Department lenses (generated)
├── about.html                  # Studio + founder section (#founder)
├── resources.html              # Guides + labeled explorations
├── contact.html                # WhatsApp call path, brief, inquiry form (file listing + NDA option)
├── styles.css                  # Brand tokens + base components (legacy layer)
├── site.css                    # Component layer incl. proof/demo/scope-generator styles
├── script.js                   # Legacy interactions (solutions + legal pages)
├── site.js                     # Nav, brief, filters, contact form, WhatsApp wiring
├── demos.js                    # Demo engines: BM25 search + benchmark, voice demo, scope generator
├── scripts/
│   ├── build_site.py           # Static site generator — run to regenerate pages
│   ├── data_systems.py         # System family content
│   ├── data_capabilities.py    # Capability content
│   ├── data_industries.py      # Industry content
│   ├── data_packages.py        # Engagements (with durations + indicative ranges), audiences, departments
│   ├── data_site.py            # Site meta, home/about/resources/contact copy
│   ├── data_depth.py           # Plain-words + technical-evaluator layers
│   └── templates/              # Hand-written page bodies
├── docs/
│   ├── coverage-map.md         # Reference-to-ReWoo coverage inventory
│   └── handoff.md              # Change summary, verification results, owner-input gaps
├── solutions.html / solutions.css / solutions.js   # Earlier agency page (preserved route)
├── order-desk/                 # Demo app (preserved, not featured)
├── privacy.html / terms.html   # Legal pages (contact updated to hello@rewoo.tech)
├── sitemap.xml / robots.txt    # Generated
└── manifest.json               # Web app manifest
```

## Editing Content

Catalog pages are **generated**. To change content, edit the data module in `scripts/`, then regenerate:

```bash
python3 scripts/build_site.py
```

The homepage, proof, demos, scope generator, security, roadmap, about, resources, and contact bodies live in `scripts/templates/` and are wrapped with the shared head/nav/footer at build time. Brand identity (tokens, fonts, themes) comes from `styles.css` — `site.css` only adds components on top of those tokens.

## Key Features

- **Proof-first positioning**: two live demos and a published retrieval benchmark run entirely in the visitor's browser — zero servers, zero signup, nothing uploaded.
- **AI Scope Generator**: a transparent, client-side heuristic that drafts a written scope (readiness read-out, matched signals, indicative range) in seconds; the main conversion path.
- **Apple-tier design system, unchanged brand**: Fraunces serif display + Inter body, near-black/white dual theme with zero flash of unstyled content, the studio's blue accent (#6E97FF dark / #0066CC light).
- **50 generated + hand-crafted pages** on one design system; collapsed navigation (Systems, Packages, Proof, About, Contact) with mega menus.
- **Working visitor journey**: capability search and filtering, a persistent project brief (localStorage, device-local), a validated inquiry form that composes an email draft (never auto-sends), WhatsApp call booking, and accessible FAQs.
- **Honest labels throughout**: industries are discovery aids, explorations are marked as explorations, the case study is marked as in preparation, prices are marked as estimates. No invented clients, metrics, or claims.
- **Accessibility**: skip links, focus-visible outlines, keyboard-operable menus with Escape/outside-click, focus-trapped mobile drawer, native `<details>` accordions, reduced-motion support, and no-JS fallbacks.
- **Zero external JS dependencies.** Vanilla JS only.

## Local Development

Start any local static server:

```bash
# Python 3
python3 -m http.server 3000

# or Node npx
npx serve .
```

Visit `http://localhost:3000`.

## Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### Netlify
Drag and drop this directory into [app.netlify.com/drop](https://app.netlify.com/drop).

---
