# Site Revamp — Handoff & Verification

Branch: **`site-revamp`** (not merged; main untouched). Date: 2026-11-01.
Scope: reference-based expansion of rewoo.tech into a full AI-systems company site, following Riverborn's structure (primary) with ArkLab supplements, in ReWoo's existing brand.

## What shipped

**48 files** (44 generated pages + sitemap.xml + robots.txt + site.css + site.js) plus edits to `index.html`, `manifest.json`, `README.md`, `privacy.html`, `terms.html`. Source of truth: `scripts/` (content modules + generator + templates).

### Sitemap (new site)

- `/` — homepage: hero, honest stat band, who-we-are, 12 capabilities, 7 system families, evidence (verified + labeled illustrative), 5 engagements, industries/audiences/departments links, 5-step process, why-ReWoo, FAQ, CTA.
- `/systems.html` + `systems/{visual-production, voice-intelligence, assessment-systems, design-visualization, content-pipelines, document-intelligence, knowledge-retrieval}.html`
- `/capabilities.html` (search + 4 group filters) + 12 detail pages: ai-agent-development, ai-chatbot-development, voice-ai-development, generative-ai-development, agentic-ai-systems, ai-consulting-strategy, workflow-automation, nlp-rag-development, computer-vision-development, ai-content-video-production, ai-integration-services, ai-mvp-development
- `/industries.html` + 10 detail pages: ecommerce-retail, education-edtech, financial-services, healthcare-life-sciences, manufacturing-supply-chain, media-entertainment, real-estate-proptech, software-saas, hospitality-travel, sports-technology
- `/packages.html` (5 cards + comparison table) + 5 detail pages: ai-readiness-audit, ai-agent-mvp, ai-integration-sprint, workflow-automation-audit, ai-strategy-workshop
- `/who-we-build-for.html` (4 anchored profiles) · `/departments.html` (8 lenses) · `/about.html` · `/resources.html` (3 guides + labeled explorations) · `/contact.html` (WhatsApp call path, project brief, validated inquiry → email draft composer, direct lines, FAQ)
- **Preserved routes, untouched content**: `solutions.html`, `solutions.css/js`, `order-desk/*`, `LICENSE`, `Cover image.png`, `assets/*`. `privacy.html`/`terms.html`: content untouched; nav links + footer tagline updated to the new structure.

### Design system

Brand tokens are inherited from the existing `styles.css` (Fraunces/Inter, #000/#FFF dual theme, #6E97FF / #0066CC accent, glass nav, pill buttons, [data-animate] reveals, reduced-motion support). `site.css` adds the new component layer only — mega menus, page heroes, breadcrumbs, badges/chips, filter bar, card systems, steps, scope grids, comparison table, FAQ, CTA bands, forms, brief UI. Legacy pages keep working on `styles.css` + `script.js`; new pages load `styles.css` + `site.css` + `site.js`. Theme state is shared (`data-theme` + localStorage `rewoo-theme`), so switching is consistent across old and new pages.

### Working interactions (verified)

1. Theme toggle (desktop + mobile) with persistence — same mechanism as the legacy site.
2. Mega dropdowns: hover/focus open, click/keyboard toggle, Escape closes, outside-click closes.
3. Mobile drawer: hamburger, overlay, scroll lock, focus trap, Escape, link-click close.
4. Capabilities hub: live search + group filters + result count (aria-live) + empty state + reset.
5. Project brief: add/remove/toggle from any system/capability/engagement page or hub card; nav pill with count; contact-page list with per-item remove, clear-all, empty state; persists in localStorage (`rewoo-brief-v1`), device-local only; syncs across tabs via the storage event.
6. Contact form: inline validation (name/email/interest) with `role=alert` errors; on valid submit composes a plain-text email draft including brief items and budget basis; opens via mailto or copies to clipboard on explicit click only — **nothing auto-sends, nothing auto-copies, nothing is stored server-side (there is no server)**.
7. FAQ accordions: native `<details>` (keyboard-accessible, no JS needed).
8. Reveal animations with IntersectionObserver + reduced-motion fallback + no-JS `<noscript>` override.

### Honesty architecture (claim discipline)

- Industries are labeled discovery aids ("possible workflows, not a client list") on the hub, every detail page, and the sitemap description.
- Systems carry a "Scoped build" format note distinguishing designed-to-order engagements from products.
- The homepage evidence section separates verifiable facts from one clearly labeled illustrative build.
- Resources "Exploring" items are explicitly not products, with an owner note.
- No prices, turnarounds, guarantees, client logos, testimonials, user counts, or team claims anywhere. All engagement CTAs say "Request scope".
- The marketing site does not imply any AI backend exists: every capability is a scoped service offer; the only "product" claim is the site itself.

## Verification results

| Check | Result |
|---|---|
| Generated pages | 44 + sitemap.xml + robots.txt, all written cleanly |
| Internal link integrity | 0 broken hrefs/srcs across 47 HTML files (automated crawl of every `href`/`src`) |
| Placeholder scan | No `TODO`, `XXX`, `【`, `undefined`, `NaN` in shipped pages (automated scan) |
| Console errors | 0 on every page tested (agent-browser) |
| Page errors | 0 |
| Horizontal overflow at 360px | 0px overflow on all 15 sampled pages incl. contact (fixed: nav cascade override, button `nowrap`, call-card min-content) |
| Overflow at 390px | clean (home, capabilities, packages, mobile nav) |
| Breakpoints tested | 1440, 1024 (grid behavior), 768 (nav/section padding), 390, 360 |
| Both themes | Pixel-verified dark (#000) and light (#FFF) rendering; VLM review of both passed |
| VLM design review | Homepage dark+light: PASS on layout, hero, rhythm, nav, theme quality, brand coherence. Detail pages: PASS (one fix applied — package grid 4+1 imbalance → forced 5-column row). Mobile home/drawer/contact: PASS, no critical issues |
| Brand continuity | VLM comparison vs baseline: "reads unmistakably as the same company" — same serif display, accent, pill buttons, premium language |
| Keyboard/a11y | Skip links, focus-visible outlines, aria-expanded on all disclosure controls, Escape handling, focus trap in mobile drawer, aria-live filter status, labeled form fields with hint/error wiring, native details/summary. (Automated screen-reader pass not performed — see limits) |
| Forms | Validation, draft composition, mailto link, clipboard copy with fallback — all behavior-verified |
| Legacy routes | `solutions.html`, `order-desk/`, legal pages open unchanged; legal nav now points to the new sections |
| SEO | Per-page title/description/canonical/OG/Twitter; JSON-LD (Organization, WebSite, FAQPage, BreadcrumbList); sitemap.xml regenerated with all routes incl. legacy; robots.txt added |

### Checks not performed (stated limits)

- No screen-reader (NVDA/VoiceOver) run — accessibility verified structurally (ARIA, focus, semantics), not with assistive tech.
- No Lighthouse performance run (static HTML, zero JS deps beyond vanilla site.js; fonts are the only third-party requests, same as the current site).
- No IE/legacy-browser testing; modern evergreen browsers assumed (same as the existing site).
- Touch-device testing emulated via viewport only (no real device).
- The Google Form offer link from the old homepage was intentionally dropped with the old positioning.

## Screenshots

Delivered in `download/screenshots/`: `baseline/` (pre-revamp home, dark/light/mobile) and `new/` (16 full-page captures: home dark+light, systems hub + detail, capabilities hub + detail, packages + table, industry detail, audiences, resources, contact with composed draft, mobile home/drawer/hubs at 390, contact at 360).

## How to review / proceed

```bash
git fetch origin && git checkout site-revamp
python3 -m http.server 3000     # open http://localhost:3000
```

- To change catalog content: edit `scripts/data_*.py`, then `python3 scripts/build_site.py`.
- To change the homepage/contact/about/resources bodies: edit `scripts/templates/*.html`, re-run the generator.
- Owner-input gaps are listed at the end of `docs/coverage-map.md` (pricing terms, scheduler link, branded inbox, real case studies, founder page, address, exploration concepts, fate of solutions.html).
- **Not merged to main and not deployed** — merge and deploy only on explicit authorization. Vercel will pick the branch up as a preview deployment if the repo's Git integration is active.

## Security note

The GitHub token used for this work was shared in chat earlier. It is not written into any file in this repository — revoke it and issue a fresh one before further work.
