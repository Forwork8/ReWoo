# Reference-to-ReWoo Coverage Map

Inventory of every meaningful reference category → purpose → ReWoo equivalent → destination → content/status evidence.
References: **riverborn.com** (primary, structural) and **arklabai.com** (secondary, supplemental). Built on branch `site-revamp`.

Legend — Status: **BUILT** (live page, working), **LABELED** (present, honestly labeled as non-product), **GAP** (needs owner input), **OMITTED** (deliberate exclusion with reason).

## 1. Riverborn → ReWoo

### Primary navigation & IA

| Reference | Purpose | ReWoo equivalent | Destination | Status / evidence |
|---|---|---|---|---|
| Systems ▾ mega-menu (11 items: 6 engine pages + 5 external products) | System families | 7 descriptive system families (no competitor-style product brands, no external product claims) | `systems.html` + `systems/*.html` ×7 | BUILT — hub pages added (Riverborn's `/systems` index 404s; hubs improve browsing + SEO) |
| Capabilities ▾ (12 numbered) | Build disciplines | 12 capabilities, same taxonomy, original copy | `capabilities.html` + `capabilities/*.html` ×12 | BUILT — search + group filters + numbered cards |
| Industries ▾ (9 in menu, 10 total) | Vertical entry | 10 industry pages incl. Sports Technology (Riverborn's own menu inconsistency avoided) | `industries.html` + `industries/*.html` ×10 | BUILT — dropdown lists all 10 |
| Packages ▾ (5 productized offers) | Engagement types | 5 engagement types retained by name; no prices, no timelines, no "30-day" claims | `packages.html` + `packages/*.html` ×5 | BUILT — "Request scope" replaces all reference pricing |
| About | Company | Studio story, principles, honest work-sample framing | `about.html` | BUILT — no invented team/headcount; verified public founder background only |
| Book Call (CTA) | Conversion | "Book a Call" → contact page with WhatsApp + email paths | `contact.html` | BUILT — no scheduler backend (see Gaps) |
| More ▾ (businesses, packages, industries, departments, company) | Secondary nav | "More ▾": Who we build for, Departments, Resources, Contact | top nav + footer | BUILT |

### Audiences / businesses

| Reference | ReWoo equivalent | Status |
|---|---|---|
| /businesses/startups (pre-seed→seed) | `who-we-build-for.html#early-stage` | BUILT — one rich page, 4 anchored profiles (vs 4 thin pages) |
| /businesses/series-seed-to-c | `#growth-stage` | BUILT |
| /businesses/mid-market | `#mid-market` | BUILT |
| /businesses/enterprise | `#enterprise` — includes private-deployment framing (see ArkLab) | BUILT |

### Departments

| Reference (8) | ReWoo equivalent | Status |
|---|---|---|
| Support/CX, Sales, Marketing, HR, IT/Engineering, Finance, Operations, Legal | `departments.html` — all 8 as discovery lenses with friction → workflows → starting-point links | BUILT — explicitly framed as "another way to discover the same systems", avoiding heading-swap repetition |

### System detail page template

| Reference section | ReWoo equivalent | Status |
|---|---|---|
| Problem (pain cards) | "The problem" — 3 pain cards | BUILT |
| Solution / outcome cards | "What it does" — 6 feature cards | BUILT |
| Production proof ("powers X in production") | **OMITTED** — ReWoo has no verifiable shipped consumer products; replaced by the scoped-build format note | Deliberate: no fabricated proof |
| "Where else this fits" (verticals) | "Where it fits" — industry chips linking to industry pages | BUILT |
| Engine architecture / pipeline visualizer | Example workflow (5 steps), labeled "Illustrative flow — set in your written scope" | BUILT — labeled |
| "Available in Three Formats" (white-label SaaS / API / custom) | **OMITTED** as product-SKU claims; replaced by "Scoped build" badge + integration possibilities | Deliberate: no false SaaS offering |
| FAQ | 3-question FAQ + JSON-LD | BUILT |

### Capability detail page template

| Reference section | ReWoo equivalent | Status |
|---|---|---|
| What your team gets | Problem paragraph + lede | BUILT |
| What we build (types) | Example applications — 6 cards | BUILT |
| Technical approach / stack | Scope in/out + inputs/deliverables + integration notes | BUILT (stack lists deliberately vendor-neutral) |
| Development process (5 phases) | Process — 5 steps | BUILT |
| Why Riverborn | **OMITTED** as claims block; "Why ReWoo" exists only on home/about with verifiable commitments | Deliberate |
| Related services | Related capabilities — 3 link cards | BUILT |
| FAQ (8) | FAQ (3) + JSON-LD | BUILT |
| Price anchors ("from $5,000") | **OMITTED** — pricing basis is "Request scope" | Deliberate: reference prices not confirmed by owner |

### Industry page template

| Reference section | ReWoo equivalent | Status |
|---|---|---|
| Regulatory/compliance posture blocks | "Considerations" note — framed as design responsibility + owner's legal review (no PCI/HIPAA/SOC claims) | BUILT — no unverified certifications |
| Capabilities grid + use cases | Possible workflows (3, with steps + system linkage) | BUILT — labeled "possible workflows, not a client list" |
| System spotlight / shipped proof | Relevant systems + relevant capabilities link cards | BUILT — no proof claims |
| "From $1,000" meta pricing | **OMITTED** | Deliberate |

### Homepage journey

| Reference section (in order) | ReWoo equivalent | Status |
|---|---|---|
| Hero + stats bar (5+ years, 10+ engineers, 100K users) | Hero + stat band with **site-verifiable counts only** (7 systems, 12 capabilities, 5 engagements, 0 projects without written scope) | BUILT — no fabricated metrics |
| Who we are | Intro ("Who we are") | BUILT |
| Capabilities & infrastructure | Capabilities overview (12 numbered) | BUILT |
| What you can build / shipped evidence | System families section (7 cards) | BUILT |
| Success stories (11 case studies) | **OMITTED** — no real case studies; replaced by "Evidence, honestly": 4 checkable facts + one clearly labeled illustrative build | Deliberate: no manufactured proof |
| Core services + packages | Engagements (5 cards) + comparison table | BUILT |
| Industries (9) | Industries (10 chips) + audience/department/resource links | BUILT |
| Who we build for (4 tiers) | Linked from home; full page | BUILT |
| Why Riverborn (4 cards) | "Why ReWoo" — 6 verifiable approach commitments | BUILT |
| Founder-led profile | **OMITTED** as named-person hero block; founder background appears on About without a personal-marketing section | Deliberate (owner may add) |
| 3-step path (Discovery → Readiness → Build) | "How an engagement works" — 5 steps | BUILT |
| FAQ (6) + contact card | FAQ (6) + contact CTA band | BUILT |

### Contact / booking

| Reference | ReWoo equivalent | Status |
|---|---|---|
| Form (name/email/company/what/budget) + "respond within one business day" | Validated form → composed email draft (mailto + copy), explicit "nothing sends itself / nothing is stored" | BUILT — no form backend (see Gaps) |
| Direct channels (email, socials) | WhatsApp card + email + LinkedIn | BUILT — channels are the ones already live on rewoo.tech |
| Google Maps embed | **OMITTED** | Deliberate: no verified office address to publish |
| 6-Q FAQ incl. "engineer or salesperson" | 4-Q FAQ incl. same question, original answer | BUILT |

### Other Riverborn pages

| Reference | ReWoo treatment | Status |
|---|---|---|
| Case studies (11 detail pages) | **OMITTED** — see homepage evidence replacement | GAP: real references welcome when owner supplies them |
| /team, /culture, /careers, /media-kit, /become-partner | **OMITTED** | Deliberate: no verified team/headcount/partner program; owner input required before any of these exist |
| /research, /blog | Folded into `resources.html` (3 original guides) | BUILT (smaller by design) |
| /llm.txt | **OMITTED** | Deliberate: not requested |
| Become Partner (nav item) | **OMITTED** from nav | Deliberate: no partner program exists |

## 2. ArkLab → ReWoo (supplemental)

| Reference category | Purpose | ReWoo equivalent | Destination | Status |
|---|---|---|---|---|
| AI SaaS / web & mobile app development | Product-build service | Folded into **AI MVP Development** capability (scope includes web/mobile/AI-SaaS builds) | `capabilities/ai-mvp-development.html` | BUILT (merged) |
| IdeaLab (idea validation, prototyping, feasibility) | Pre-build validation | Covered by **AI Readiness Audit** + **AI Strategy Workshop** engagements and consulting capability | `packages/ai-readiness-audit.html`, `packages/ai-strategy-workshop.html` | BUILT (merged) |
| Enterprise partnerships / private deployment | Enterprise offering | Enterprise audience profile incl. private-deployment scoping + audit-trail framing | `who-we-build-for.html#enterprise` | BUILT (merged) |
| Research / educational resources | Public education | 3 original guides, no gate | `resources.html` | BUILT |
| Workflow/agent template library | Downloadable workflows | **LABELED** — "Concepts on the workbench" section states no products are available; owner note included | `resources.html#exploring` | LABELED |
| Dev tools: agent memory (mum32) | Product | "Agent memory layer" — exploration item | `resources.html#exploring` | LABELED |
| Dev tools: model evaluation (Langmuse) | Product | "Model evaluation harness" — exploration item | `resources.html#exploring` | LABELED |
| Dev tools: privacy tooling (Sentry) | Product | "Privacy-first local retrieval" — exploration item | `resources.html#exploring` | LABELED |
| AI workspace / cloud console (Studio/Cloud) | Product | "Studio workspace console" — exploration item | `resources.html#exploring` | LABELED |
| Free AI Audit lead magnet (/audit) | Lead capture | **OMITTED** as a fake-free offer; the Readiness Audit is the honest equivalent | — | Deliberate |
| Testimonial carousel (attributed to outside CEOs) | Social proof | **OMITTED** | Deliberate: unverifiable/contradictory on the reference itself |
| Pricing page, "Get Started" funnel, press pages | Commerce plumbing | **OMITTED** | Deliberate |

## 3. Explicit exclusions honored

- **Uni and CRES**: absent everywhere. ✅
- **Order Desk / Toolly / prior projects**: `order-desk/` files remain intact and routed but are not featured or linked in the new navigation; not mentioned on any marketing page. ✅
- **solutions.html** (earlier agency page): preserved as a working route, linked only from the footer as "Task Scoper (earlier agency page)". ✅
- No reference pricing, turnaround, "30-day", free-audit, cost-reduction, user-count, or performance claims copied. ✅

## 4. Owner-input gaps (recommended next decisions)

1. **Commercial terms** — every price, turnaround, and guarantee is intentionally absent ("Request scope"). Provide terms if you want them published.
2. **Booking scheduler** — no Calendly/cal.com integration exists; contact uses WhatsApp + email. Supply a scheduler link to wire in.
3. **hello@rewoo.tech vs adilshamim696@gmail.com** — the site currently uses the personal email already public on rewoo.tech (legal pages + footer). Switching to a branded inbox is a one-line change in `scripts/data_site.py` + contact template.
4. **Real case studies / testimonials** — the evidence section is built to accept them; none are invented.
5. **Founder/team page** — About is deliberately name-light. Add names, photos, and history when you want them public.
6. **Office address / map** — omitted pending a verified address.
7. **Exploration concepts** (resources page) — confirm, edit, or cut the four workbench items.
8. **solutions.html fate** — kept intact per instruction; decide whether to retire or restyle it after the new site ships.
