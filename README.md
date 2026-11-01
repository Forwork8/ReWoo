# ReWoo — AI Systems Studio

> **AI systems, scoped and shipped.**
> https://rewoo.tech

---

## Overview

ReWoo is an independent AI systems studio based in Dhaka, Bangladesh, working with teams anywhere. The website presents seven system families, twelve build capabilities, ten industry maps, and five engagement types — every engagement framed as a scoped build with a written scope and a complete handover.

- **Home (`index.html`)** — positioning, capabilities overview, system families, honest evidence, engagements, industries, process, FAQ.
- **Systems (`systems/`)** — seven solution families, each with customers, problems, features, example workflow, integrations, and FAQ.
- **Capabilities (`capabilities/`)** — twelve build disciplines with search and filter, scope in/out, inputs, deliverables, and process.
- **Industries (`industries/`)** — ten industry pages with clearly labeled possible workflows (a discovery aid, not a client list).
- **Engagements (`packages/`)** — AI Readiness Audit, AI Agent MVP, AI Integration Sprint, Workflow Automation Audit, AI Strategy Workshop, plus a comparison table.
- **Audiences (`who-we-build-for.html`)** — four engagement profiles from early-stage to enterprise.
- **Departments (`departments.html`)** — eight department lenses onto the same systems.
- **About / Resources / Contact** — studio story and principles, original guides plus labeled explorations, and the inquiry flow (WhatsApp, email draft composer, project brief).
- **Preserved routes** — `solutions.html` (earlier agency page), `order-desk/` (untouched demo app), `privacy.html`, `terms.html`.

## Project Structure

```
ReWoo/
├── index.html                  # Homepage (generated from scripts/templates/)
├── systems/                    # 7 system detail pages (generated)
├── capabilities/               # 12 capability detail pages (generated)
├── industries/                 # 10 industry pages (generated)
├── packages/                   # 5 engagement pages (generated)
├── systems.html                # Systems hub (generated)
├── capabilities.html           # Capabilities hub with search/filter (generated)
├── industries.html             # Industries hub (generated)
├── packages.html               # Engagements + comparison table (generated)
├── who-we-build-for.html       # Audience profiles (generated)
├── departments.html            # Department lenses (generated)
├── about.html                  # Studio page (generated from template)
├── resources.html              # Guides + labeled explorations (template)
├── contact.html                # Call booking, brief, inquiry form (template)
├── styles.css                  # Brand tokens + base components (unchanged legacy layer)
├── site.css                    # New component layer for the expanded site
├── script.js                   # Legacy interactions (solutions + legal pages)
├── site.js                     # New interactions: nav, mega menus, brief, filters, form
├── scripts/
│   ├── build_site.py           # Static site generator — run to regenerate pages
│   ├── data_systems.py         # System family content
│   ├── data_capabilities.py    # Capability content
│   ├── data_industries.py      # Industry content
│   ├── data_packages.py        # Engagements, audiences, departments
│   ├── data_site.py            # Site meta, home/about/resources/contact copy
│   └── templates/              # Hand-written page bodies (index, contact, about, resources)
├── docs/
│   ├── coverage-map.md         # Reference-to-ReWoo coverage inventory
│   └── handoff.md              # Change summary, verification results, owner-input gaps
├── solutions.html / solutions.css / solutions.js   # Earlier agency page (preserved route)
├── order-desk/                 # Demo app (preserved, not featured)
├── privacy.html / terms.html   # Legal pages (nav updated to new structure)
├── sitemap.xml / robots.txt    # Generated
└── manifest.json               # Web app manifest
```

## Editing Content

Catalog pages are **generated**. To change content, edit the data module in `scripts/`, then regenerate:

```bash
python3 scripts/build_site.py
```

The homepage, contact, about, and resources bodies live in `scripts/templates/` and are wrapped with the shared head/nav/footer at build time. Brand identity (tokens, fonts, themes) comes from `styles.css` — `site.css` only adds new components on top of those tokens.

## Key Features

- **Apple-tier design system, unchanged brand**: Fraunces serif display + Inter body, near-black/white dual theme with zero flash of unstyled content, the studio's blue accent (#6E97FF dark / #0066CC light).
- **44 generated + 4 hand-crafted pages**: one consistent design system, mega-menu navigation, breadcrumbs, and per-page metadata, canonical URLs, Open Graph, and JSON-LD (Organization, WebSite, FAQPage, BreadcrumbList).
- **Working visitor journey**: capability search and filtering, a persistent project brief (localStorage, device-local), a validated inquiry form that composes an email draft (never auto-sends), WhatsApp call booking, and accessible FAQs.
- **Honest labels throughout**: industries are discovery aids, explorations are marked as explorations, no invented clients, metrics, or claims.
- **Accessibility**: skip links, focus-visible outlines, keyboard-operable menus with Escape/outside-click, focus-trapped mobile drawer, native `<details>` accordions, reduced-motion support, and no-JS fallbacks for animated content.
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
