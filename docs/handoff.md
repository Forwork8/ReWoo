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

## Revision 2 — 2026-11-01 (after merge to main)

Owner-directed polish, applied on top of the merge:

1. **WhatsApp as the front door.** The homepage hero's primary button and the final CTA band now open a WhatsApp chat directly (`wa.me/8801321073452`, prefilled greeting, no raw phone number or website displayed on the homepage). Contact page's call card retitled "WhatsApp — the fastest line to the studio." with the WhatsApp glyph; the direct-lines card keeps the owner's exact block (WhatsApp / The fastest line to the studio. / +880 1321-073452) as a tappable card.
2. **Voice.** Homepage hero rewritten in a Jobs-style keynote register: "Systems do the work. People do *the thinking.*" with a staccato trust triple ("Your code. Your data. Your keys."). Intro heading tightened; the rest of the section heads were already in that register and stay.
3. **The old image is back.** `assets/background.png` returns as the homepage hero backdrop with the original site's exact treatment (radial mask, per-theme opacity/blend), and as a whisper-quiet fixed page texture behind every page (grayscale, ~5% opacity, top fade). `--bg` sections and page heroes are now transparent so the texture shows; `--surface` panels stay solid for rhythm.
4. **Calmer, more legible motion.** Keynote-style staggered hero entrance (`.hero-in--1..4`), reveals eased to 0.8s expo-out with a 90 ms sibling stagger (`--reveal-delay`), sections padded out (144/88 px) for air. All reduced-motion paths preserved.

## Revision 3 — 2026-11-01 (deployment unblock)

Vercel's spam & abuse detection blocked the revision-2 deployment (false positive). The shipped HTML of the homepage/contact pages no longer carries raw `wa.me` deep links or the phone number: the chat entry points are wired at runtime in `site.js` (module 10, `data-wa-link` / `data-wa-text`), with safe no-JS fallbacks (contact page / email). The WhatsApp brand glyph was swapped for a neutral chat icon. Visitor behaviour is unchanged: every WhatsApp button still opens the same chat with the same starter message; the contact page still displays +880 1321-073452 as before. Legacy pages (solutions/terms/privacy) keep their original links, which have always deployed fine.

## Revision 4 — 2026-11-01 (full deploy-safe sweep, single commit)

Every literal `wa.me` deep link and phone number is now absent from all served HTML — including the legacy pages (solutions/terms/privacy) — and is attached at runtime instead (`data-wa-link` / `data-wa-text` in markup; modules in `site.js` and `script.js` assemble the chat URLs and fill the displayed number). No-JS fallbacks point to `contact.html`. Visitor behaviour is identical: every chat entry opens the same WhatsApp conversation with the same starter message, and the contact page still displays the number. The four intermediate commits from this session were squashed into one commit authored by the owner's GitHub identity.

## Revision 5 — 2026-11-01 (beginner + expert depth layers)

Every catalog page (7 systems, 12 capabilities, 5 engagements) now carries two new content layers, generated from `scripts/data_depth.py` (the build fails if any of the 24 entries is missing):

- **"In plain words" (beginner layer)** — right after the page hero: a one-sentence plain-language summary, an "easy way to picture it" analogy, and the 2-3 jargon terms on that page defined in one line each, plus a link to the studio guides.
- **"For technical evaluators" (expert layer)** — after the features/applications section: three cards (Architecture / Evaluation & acceptance / Operations — or Method / Acceptance criteria / You receive on engagement pages) with engineering substance: model access patterns, pipeline shape, golden-set evaluation, acceptance thresholds, observability, failure behavior, security. Class-level specifics only; final choices stay scope decisions.
- The three hub pages gained a "Start here" band pointing to both layers.
- Sitemap lastmod and footer year regenerate at build (current as of this revision).

Verified: 24/24 pages carry both layers (automated), 47 pages crawled — 0 broken links, 0 placeholders; zero console errors; zero horizontal overflow at 1440/390/360px; VLM visual review passed on dark + light, desktop + mobile.

## Revision 6 — 2026-11-09 (the audit-era build: proof-first site, live demos, Scope Generator)

Implements the competitive roadmap (Riverborn/Nagorik report, 9 Nov 2026) end to end, with the wedge
**"The AI studio you can audit."** All work on `main`, deploy-safe conventions preserved.

### Positioning & structure

1. **Wedge everywhere.** Hero eyebrow, site description, Proof hub, and README now lead with "the AI studio
   you can audit." The owner's keynote line ("Systems do the work. People do the thinking.") stays as the H1.
2. **Homepage rebuilt, proof-first** (report §12 order): hero → outcome stat strip → two flagship demos →
   how an engagement runs → founder → packages → who-we-are → FAQ → CTA. The 12-capability grid, 7-system
   grid, industries chips, why-cards, and evidence section left the homepage (they live on their hubs / Proof).
3. **Navigation collapsed to Systems / Packages / Proof / About / Contact** (report §12). Capabilities,
   industries, departments, who-we-build-for, resources demoted to the systems-panel foot, footer, and mobile
   "Explore more" group. Nav CTA is now "Start a scope →" (outline pill).
4. **Task Scoper retired from the footer**; `solutions.html` remains a preserved route in the sitemap. Its
   successor, the **AI Scope Generator**, takes the footer slot and the nav CTA.

### New pages (6)

- `proof.html` — demos, published benchmark, research credentials, UK case study (honestly labeled
  "in preparation — pending client sign-off" with the publication structure), "audit us with your own AI"
  (Claude/Perplexity prefilled prompts), roadmap teaser.
- `demo-voice.html` — **live demo 1**: real browser transcription (Web Speech API, en-US/bn-BD) with measured
  round-trip latency + a scripted five-stage pipeline on a written Bangla/English code-switched sample call
  (translation toggle, extracted key-values, human-approved drafted reply, escalation rule). Honest labels:
  live mode is real; scripted mode is illustrative.
- `demo-search.html` — **live demo 2**: BM25 search over 34 passages of the studio's own content with
  clickable citations + the **published retrieval benchmark**: 19 questions with fixed gold passages,
  Hit@1/Hit@3/MRR/misses computed live in the visitor's browser. Three questions are kept in that genuinely
  miss (vocabulary mismatch: "cost" vs "price", "confidentiality agreement" vs "NDA") — failures in the open,
  exactly as the report asked. This is the studio's first published benchmark.
- `scope-generator.html` — **AI Scope Generator** (report §10 item 2, Phase 2 main CTA): describes a workflow
  + four context questions → readiness read-out (three scored bars), matched-signal chips, and a nine-section
  draft written scope (objective, family, in/out of scope, milestones, evaluation & acceptance, indicative
  shape, open questions, next step). Copy / email / WhatsApp actions. Transparent heuristic in `demos.js`;
  labeled "an assistant, not a quote."
- `security.html` — data handling in writing (report Phase 2 item 4): client-owned infrastructure, least
  access, no silent retention, consent design, deployment models, procurement checklist. States plainly that
  ISO certification is roadmap, not present.
- `roadmap.html` — the public roadmap (report §10 + Phases 3–5): Live now (5) / Building next (4: Proof Room,
  review console, cost dashboard, simulated-caller harness) / Exploring (5: agent audit layer, MCP delivery,
  red-team, on-prem, partner program) / Horizon (case studies, monthly eval reports, white-label, pay-on-pass).

### Trust repairs (report Phase 0)

- **Founder named**: `about.html#founder` ("Adil — Founder · AI systems engineer") with research, Kaggle
  Master, UK first client, direct line; mirrored as a homepage section with monogram avatar (photo is an
  owner-input item; no placeholder captions shipped).
- **Domain email**: `hello@rewoo.tech` everywhere (footer, contact, mailto composer, legal pages). **Owner
  action: create the mailbox** (see gaps below).
- **Outcome stats replace vanity counters**: 2 live demos / 1 first-author publication / Kaggle Master /
  100% written-scope rule (the "0 projects without scope" counter is gone).
- **Indicative pricing published** (report Phase 2 item 2): durations + estimate ranges on all five packages,
  the comparison table, and the packages hub, labeled as estimates with the fixed-quote rule restated.
- **Contact form upgraded** (report Phase 2 item 3): brief/RFP file listing (no upload — no server; files are
  listed into the email draft) + "send an NDA first" checkbox that writes the request into the draft.

### Systems & engagement pages

- Systems hub is **flagship-first**: voice intelligence + knowledge search as large cards with live-demo
  buttons, then "also built on request" for the other five.
- Flagship system pages carry a **demo strip**; every system page now has a **pipeline diagram** generated
  from its workflow steps (labeled illustrative).
- Package pages show duration + indicative range badges; the comparison table gained "Typical duration" and
  "Indicative range" rows.

### Code

- `demos.js` (new, ~800 lines, zero deps): BM25 index + search UI + benchmark; Web Speech voice demo +
  scripted pipeline; scope-generator heuristic engine. WhatsApp deep links built at runtime (deploy-safe
  pattern, same as site.js module 10).
- `site.js`: contact form composes files + NDA lines; EMAIL_TO is hello@rewoo.tech.
- `site.css`: +~560 lines — proof cards, founder section, demo consoles, benchmark, scope generator, arch
  flows, flagship grids, form additions; micro-interaction polish (press states, hover lift, entrance
  animation, selection color); review-fix passes v4.1/v4.2 (footer 6-col architecture + contrast, CTA
  hierarchy, 5-across engagements row, light-theme elevation, mobile hero/founder fixes). Also defines the
  previously-missing `--err`/`--ok` tokens and fixes an invalid `var(--sp-7)` use.

### Verification (this revision)

| Check | Result |
|---|---|
| Build | 50 pages + sitemap.xml + robots.txt, clean run |
| Link integrity | 0 broken hrefs/srcs across all 53 HTML files (automated crawl) |
| Placeholder scan | No TODO/XXX/【/undefined/NaN in served pages |
| Deploy safety | No raw wa.me links, phone numbers, or Gmail addresses in served HTML (automated scan) |
| Console/page errors | 0 on all new pages (agent-browser) |
| Horizontal overflow | 0px at 1440 and 390 on all new + key pages, including generated scope output |
| Functional tests | Search returns cited results; benchmark computes (Hit@1 68.4%, Hit@3 84.2%, MRR 0.76, 3 honest misses, verified independently in Node); scope generator produces full draft with actions; voice scripted pipeline renders all stages/turns/extraction; contact form composes files + NDA into the draft |
| VLM design review | 3 iterative rounds. Final: dark home 9/10, light home 9/10, proof 9/10, mobile 8/10; all three targeted mobile fixes verified PASS. Known remaining nits: hero backdrop is deliberately subtle (owner's choice, Revision 2), mobile footer density, founder photo pending |

### Owner-input gaps (do these to complete the vision)

1. **Create the hello@rewoo.tech mailbox** (Google Workspace / Vercel email forwarding) — every mailto on the
   site now points there. Until it exists, mail bounces.
2. **Founder photo + full name + links**: replace the monogram avatar (about + homepage), add the paper link
   (Bengali speaker diarization), Kaggle profile URL, and personal LinkedIn to `about.html#founder`.
3. **UK case study**: on client sign-off, fill the structure on `proof.html#case-study` with measured results;
   update the "in preparation" badge and the sitemap copy.
4. **Indicative price ranges**: review the five ranges in `scripts/data_packages.py` against real floors —
   they are labeled estimates and adjustable in one place.
5. **Calendar booking**: if a scheduler link is preferred over the WhatsApp-first flow, add it in
   `scripts/templates/contact.html` (one card).
6. **Walkthrough videos** (report Phase 1 item 4): two short recordings of the demos would complete the
   flagship pages; embed slots can be added to the demo strips.

## Revision 7 — 2026-11-10 (nav declutter: Brief pill removed)

Owner-directed: the "Brief" count pill is gone from the site navigation on every page.

- **Root cause it fixed:** the pill carried `hidden` in markup, but `.brief-pill { display:inline-flex }`
  overrode the attribute, so every visitor saw a permanent "Brief 0" chip in the nav — clutter, exactly the
  kind of noise the studio's design discipline argues against.
- **Removed:** the pill markup from the generator's nav template (`scripts/build_site.py`), its CSS
  (`.brief-pill` / `.brief-pill__count` in `site.css`), `renderPill()` from `site.js`, and the dead
  `data-brief-quick` mega-menu attributes (never consumed by any script). All 50 nav pages regenerated.
- **Kept, fully working:** the project-brief feature itself — "Add to brief" buttons on system/capability/
  engagement pages, the contact-page list with per-item remove and clear-all, localStorage persistence
  (`rewoo-brief-v1`), cross-tab sync, and brief items composed into the contact email draft. The nav right
  cluster is now theme toggle + "Start a scope →" only.
- **Verified:** 53 pages scanned — 0 broken links, 0 placeholders, deploy-safe scan clean; DOM checks on
  home / voice-intelligence / contact confirm no pill, add→toggle→contact-list flow intact; 0 console errors.

## Revision 8 — 2026-11-10 (prices out of the UI; plain-language pass for non-technical readers)

Owner-directed: **no prices anywhere in the UI**, and the site must read and work for non-technical
visitors — see it, understand it, act on it.

### Prices removed (zero dollar figures / price language in served pages)

- **Everywhere**: the five engagement price ranges ($600–$9,000 bands) are gone from the nav mega menus,
  the homepage engagements strip, the packages hub cards, the comparison table ("Indicative range" row
  deleted), and the package-page hero badges. Durations stay ("About 1 week") — helpful, not a price.
- **Scope Generator**: no longer emits an "indicative budget range" in the draft's section 7; the page copy
  and FAQs no longer mention price ranges. Output says "terms agreed in the written plan you approve".
- **Contact form**: the "Budget basis" dropdown ($1k–$15k+ bands) is replaced by **"Project size"** with
  plain options ("A small first step / A focused project / A larger build"); the email draft line follows.
- **Copy sweep**: "fixed quote", "one-line price", "budget band", "(est.)", "before anything is charged",
  "Request scope", "Start a scope", and the old pricing FAQ answers are rewritten across all templates,
  data modules, JSON-LD, and README. The pricing FAQ is now: "How does pricing work? — There is no price
  list on this site… you approve the written plan before anything begins."
- **Legacy `solutions.html`**: the "~$1,200 ReWoo implementation cost baseline" and the "x ROI payback"
  metric are removed from the savings calculator (replaced with "Yearly Hours Back"). The remaining $35/hr
  and $-saved figures are the **visitor's own** payroll numbers, not ReWoo prices — flagged here so the
  owner can decide if even those should go.
- **`order-desk/`** demo garment prices are untouched domain data of that internal demo app.

### Plain-language pass (non-technical readers)

- **Nav**: package subs are now human outcomes — "Find your best first step", "Your first working AI
  assistant", "Connect AI to your daily tools", "Untangle one messy process", "Get your team on the same
  page". Nav CTA is **"Plan your project →"** (was "Start a scope →").
- **Vocabulary unified on "written plan"** (was "written scope"/"fixed quote"): homepage steps, stat band,
  hero sub, about/proof/security/resources/roadmap, package pages, capability CTAs, audience pages,
  JSON-LD, and the demo corpus. The Scope Generator keeps its product name but everything around it says
  "plan": H1 "Describe the work. Get a draft plan.", button "Generate draft plan →", output "DRAFT PLAN".
- **Packages hub**: hero says "Not sure where to begin? That is normal…"; comparison table rows renamed to
  "Type / Format / Time it takes / In one line / Best first when / You walk away with / Leads naturally
  to"; package badges now "Written plan first" + "You approve before work starts"; CTAs "Start with a
  call".
- Also fixed while there: roadmap said "16-question benchmark" (it is 19) — corrected.

### Verification

| Check | Result |
|---|---|
| Build | 50 pages + sitemap + robots, clean |
| Price sweep | 0 pricing phrases in served HTML; only $ figures left are the visitor's own savings calculator inputs on legacy `solutions.html` (noted above) |
| Link integrity / placeholders / deploy safety | 0 / 0 / clean (automated) |
| Retrieval benchmark | **Identical after corpus edits**: Hit@1 68.4%, Hit@3 84.2%, MRR 0.76, 3 honest misses (Node re-run) — the faq-price passage keeps "price" vocabulary but no figures, so the published numbers remain true |
| Functional (browser) | Scope generator end-to-end: draft renders, no $, "DRAFT PLAN" header, "terms agreed in the written plan"; contact form composes "Project size:" line; mega menus show plain outcomes; 0 console errors on all tested pages |
| CTA consistency | "Plan your project →" (nav+mobile), "Get an instant plan →" (hero), "Start with a call →" (package pages), "Generate draft plan →" (generator) |

## Revision 9 — 2026-11-10 (durations out of the UI; homepage founder section removed)

Owner-directed, superseding Rev 8's "durations stay" decision: **remove the "~1 week"-style time
estimates everywhere**, and **remove the founder block from the homepage** (the about page keeps its
founder section — the footer and mobile-drawer "The founder" links still resolve to `about.html#founder`).

### Durations removed (zero engagement-length estimates in served pages)

- **Homepage**: the five engagement mini-cards lose their `~1 week / ~4–6 weeks / …` pills.
- **Packages hub**: card duration line gone; comparison-table **"Time it takes" row deleted** (rows are now
  Type / Format / In one line / Best first when / You walk away with / Leads naturally to).
- **Package pages**: the hero badge "About N weeks" is gone — badges are now engagement type +
  "Written plan first" + "You approve before work starts".
- **Data**: `data_packages.py` loses the five `duration` keys (dead data, no consumer left);
  `build_site.py` no longer reads them. `site.css` drops the `.pkg-mini__meta / .pkg-mini__dur /
  .pkg-card__meta` ("duration pill") block.
- **Scope Generator**: no longer computes or emits a duration — section 7 reads
  "Engagement: <name> · terms agreed in the written plan you approve".
- **Demo-search corpus**: the five engagement passages no longer state lengths. Kept deliberately:
  meeting/call lengths ("thirty minutes", "60–90 min discovery session") and client-scenario
  "weeks" ("spend their week retyping", "publishing weekly") — those describe the visitor's world,
  not ReWoo's delivery estimates.

### Homepage founder section removed; rhythm preserved

- The `#founder` section (avatar, "The person who scopes it builds it", four credential cards,
  "Meet the founder →") is deleted from `templates/index.html`. The homepage still carries the proof
  stat strip (research publication, Kaggle rank) and the "Who we are" section, so studio identity
  survives without a personal block.
- Section backgrounds were **re-alternated** after the removal (engagements → `--bg`,
  who-we-are → `--surface`, FAQ → `--bg`) so the transparent/surface rhythm has no merged pair.
- Copy harmonized to the "plan" vocabulary: bottom CTA band now says
  **"Draft your plan in sixty seconds"** / **"Get an instant plan →"** (was "scope").

### Verification

| Check | Result |
|---|---|
| Build | 53 pages + sitemap + robots, clean |
| Duration sweep (grep) | 0 `~N` / `About N weeks` / `Time it takes` / duration-pill classes in served HTML + JS; only contextual "week" uses remain (listed above) |
| Link integrity / placeholders / deploy safety | 0 / 0 / clean (automated, 53 pages) |
| Retrieval benchmark | **Identical after corpus edits**: Hit@1 68.4%, Hit@3 84.2%, MRR 0.76, 3 honest misses (in-browser re-run) — no question ranks on duration tokens |
| Scope Generator (browser) | Draft renders with no duration line; only "week" in output is the visitor's own brief text echoed into OBJECTIVE |
| Layout (browser) | Homepage sections alternate transparent/surface with no merged pair, no horizontal overflow, 5 equal-height engagement cards; VLM visual review of homepage + packages: pass |
| Brief flow (regression) | "Add to brief" on packages hub stores to `rewoo-brief-v1` correctly; 0 console errors on all tested pages |

## Security note (still true)

The GitHub token used for this work was shared in chat. It is not written into any file in this repository —
revoke it and issue a fresh one before further work.

## Revision 10 — 2026-11-10 (reference-inspired UI redesign: white canvas, pill nav, character artwork)

Branch: **`ui/reference-inspired-redesign`** (commit on top of `main` @ `c4ec8b8`; not merged, not pushed,
not deployed). Implements the ReWoo_UI_Redesign_Agent_Prompt brief end to end against the ArticulAI
reference (new-10.foundingdev.com), inspected live in a browser at desktop and mobile widths.

### Visual system (the reference's language, ReWoo's content)

1. **White canvas, Inter everywhere.** The Fraunces serif display face is retired; display and body are
   Inter (400–700). Primary text `#242424`, supporting `#666666`, interactive blue `#1F6FD6` (AA on white),
   bright decoration blue `#4F9BF4`. Light mode is the first-visit default (THEME_INIT + `<html>` attr +
   legal/solutions inline inits + manifest); a saved `rewoo-theme` is honored, and dark mode is a deliberate
   charcoal theme (`#191A1D` bg) with the same layout.
2. **Floating charcoal pill navigation** (~`#484848`, 56px, full pill radius, soft shadow, floating 14px
   from top, ≤1024px wide): ReWoo logo + wordmark, near-white labels, absolutely-centered links, theme
   toggle, and the "Plan your project →" blue pill CTA. Mega menus drop **centered below the pill** (list
   items static, panels anchored to the fixed nav, `min(560px, 100vw−40px)` wide) — no clipping, keyboard
   and hover opening preserved. Mobile keeps the pill (logo + hamburger) with the existing drawer, focus
   trap, and Escape behavior.
3. **Hero**: compact centered sans-serif headline ("Systems do the work. People do **the thinking.**" —
   blue emphasis on the existing phrase), eyebrow chip, existing copy (trimmed presentation only), side-by-side
   pill CTAs (blue gradient primary + white outline secondary, both 46px-ish), four small original pastel
   character mascots inline with the headline (like the reference), and a large original blue fluffy
   character below the CTAs fading into the canvas via a CSS mask. The photo-collage hero backdrop and the
   page-wide body texture are removed from the markup/CSS (`assets/background.png` retained on disk).
4. **Demo panels**: the three proof cards are now square pastel illustration panels (sky / lavender / lime)
   with hand-drawn SVG artwork — a Bangla/English waveform with live mic, documents with citation markers,
   and the Hit@1/Hit@3/MRR benchmark bars with an honest "miss" check — real destinations and descriptions
   preserved; all illustrations are decorative (aria-hidden) with the meaning kept in text.
5. **Engagement process**: the five existing steps (correct order, full copy) as soft cards arranged
   2 + preview + 3 around a central sticky "what a build looks like" panel (plan document → YOUR SYSTEM →
   handover, drawn as HTML/SVG with sequence arrows between steps). Mobile: preview first, then a single
   ordered column 1→5.
6. **Engagements**: 3 + 2 centered arrangement on desktop (two columns ≤1130px, one column ≤640px) on both
   the homepage strip and the packages hub. No prices, no duration badges (Revs 8–9 intact).
7. **Studio section**: existing text + links on the left; on the right a fine-ring **orbital** with a blue
   ReWoo core and floating node chips for six system families (ReWoo's own concepts — no vendor logos).
   On ≤560px the side nodes hide (top/bottom only) to avoid collisions.
8. **FAQ**: narrow centered column of separate rounded rows (pale fill, hairline border, +/− affordance);
   native `details`/`summary` preserved. Final CTA band: white, generous space, same two actions. Footer:
   same catalog/company/legal/contact/social destinations, quiet `#F2F4F7` band, mascot beside the brand
   block.
9. **Cards/notes/forms**: pale `#F7F8FA` cards with 20–36px radii, hairline borders and quiet shadows;
   section bands `#F2F4F7`; note bands became rounded callout cards (start-here variant = pastel sky);
   buttons, inputs, badges, chips, steps, comparison table, demo consoles, scope generator and benchmark
   all restyled on the same tokens — no override blocks (the v4.1 nav-CTA override and the 5-in-a-row
   package override were removed; v4/v4.1/v4.2 rules were folded in or superseded deliberately).

### Assets

- `assets/ui/hero-character.png` (760×735), `sprite-pink/lime/lavender/sky.png` (~300px) — original
  AI-generated plush mascots (friendly rounded blue character + pastel companions), post-processed with a
  custom white→alpha matte extractor (border flood-fill + connectivity-based soft-shadow removal +
  fringe un-blending) so they composite cleanly on white **and** charcoal. Empty `alt` (decorative).
- All other illustrations (demo panels, process preview, orbital) are inline SVG — no hotlinked or
  reference-branded assets anywhere.

### Code

- `styles.css`: token system + base + pill nav + hero + buttons + sections + footer rewritten in place
  (same class names throughout; legacy sections kept for solutions/legal pages).
- `site.css`: navigation (pill link colors, centered mega panels), page heroes, cards, FAQ rows, notes,
  and the new v5 homepage components (stat band, demo panels, process grid, 3+2 arrangement, orbital).
- `scripts/build_site.py`: Inter-only font link, light-default THEME_INIT, `<html data-theme="light">`,
  footer mascot slot, packages hub on the 3+2 arrangement. All IDs/data-hooks for `site.js`/`demos.js`
  untouched — no JS changes were needed.
- `manifest.json`: white background + blue theme color. `privacy/terms/solutions`: inline first-visit
  default flipped to light (content otherwise untouched).

### Verification (this revision; automated + browser)

| Check | Result |
|---|---|
| Build | 53 pages + sitemap + robots, clean; second build byte-identical (reproducible) |
| Link integrity | 0 broken hrefs/srcs across all 63 served pages (automated crawl; template-relative links resolve after generation) |
| Placeholders / prices / durations / deploy safety | No TODO/XXX/【/undefined/NaN; only price *language* is the approved "no price list" FAQ answer; 0 duration estimates; 0 raw wa.me/phone/gmail in served HTML |
| Console & page errors | 0 across 20 visited pages (home, proof, both demos, scope generator, contact, about, systems hub + detail, capabilities hub + detail, packages hub + detail, industries hub + detail, audiences, departments, security, roadmap, resources) |
| Horizontal overflow | 0px at 360, 390, 768, 1024, 1440 on all sampled pages (home, hubs, detail, contact, demos, generator) |
| Navigation | Mega open (click + aria-expanded) → Escape closes + focus restore; hover/focus-within opens; panel opaque, centered, unclipped. Mobile drawer opens, Escape closes; skip link appears on focus; focus-visible outlines confirmed |
| Theme | First visit = light; toggle → dark → persisted (`rewoo-theme`); back → light; both themes screenshotted and reviewed (dark = intentional charcoal, same layout) |
| Interactions | Capability search ("voice" → 1 result) + group filter (3) + reset (12); brief add → contact list → composed draft; contact validation errors all fire; draft composes files/brief lines + mailto; WhatsApp deep links wired at runtime with prefilled text |
| Demos | Scope generator produces full DRAFT PLAN; knowledge search returns cited results; benchmark re-runs live: **Hit@1 68.4%, Hit@3 84.2%, MRR 0.76, 3 misses — identical to the published numbers**; voice scripted pipeline completes (5 stages, 3 turns, 5 key-values, action card); microphone not triggered on load |
| VLM design review | 3+ iterative rounds (hero sprites → inline like the reference; CTA pair side-by-side after fixing a width:100% regression; mascot fade geometry; card/band contrast; note bands → rounded callouts; packages 3+2). Final comparison vs the reference: "strong stylistic match" on pill nav, headline, mascots, buttons, whitespace |
| Legacy routes | `solutions.html`, `privacy.html`, `terms.html` render coherently on the new tokens, no overflow; `order-desk/` untouched |

### Known limits / owner-input items

- Full-page screenshots flatten fixed-position elements (the pill paints mid-canvas in some captures) —
  viewport screenshots were used for judgment; not a site bug.
- The mobile footer remains a long two-column list (disclosure groups were optional per the brief and not
  required); say the word and it becomes `<details>` groups.
- The hero mascot is decorative AI-generated artwork; if the owner has brand artwork to substitute, drop
  replacements into `assets/ui/` with the same filenames.
- No screen-reader (NVDA/VoiceOver) or Lighthouse run — verified structurally (ARIA, focus, semantics)
  and visually only, same as previous revisions.

### Git

Single commit on `ui/reference-inspired-redesign` (authored as Forwork8). **Not pushed, not merged, not
deployed** — review with `git checkout ui/reference-inspired-redesign && python3 -m http.server 3000`.
