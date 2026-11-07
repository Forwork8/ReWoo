# Phase 2 — Focus Pass: Before / After Summary

Branch: **`site-focus`** (off `main`). Date: 2026-11-07.
Goal: one clear idea, fewer destinations, less template feel — without inventing anything.

Nothing was deleted in this pass. Every catalog page still exists and is still
reachable from the home page sections. The search-page cut (item 5) is prepared
but **awaits your kept-pages list** — see the redirect proposal at the bottom.

---

## 1. Home (`/`)

| Area | Before | After |
|---|---|---|
| H1 | "ReWoo AI systems studio: Systems do the work. People do the thinking." (with an sr-only "ReWoo AI systems studio:" prefix) | "Ask your documents. Get answers with proof." — the prefix is gone |
| Sub-line | Long paragraph listing agents, pipelines, retrieval, scope, code, data, keys | "We build AI that reads your company's files and answers with a link to the exact page. If the answer is not there, it says so." |
| Buttons | "Message on WhatsApp" (→ wa.me) / "Explore the systems ↓" | "Try the demo" (→ /demo.html) / "Book 30 minutes" (→ contact page until a booking link exists) |
| Stats band | 7 / 12 / 5 / 0 row | Removed |
| Italic accents | "systems that hold up.", "a whole system.", "will not claim.", "No mystery.", "actually check." | Plain headings, site-wide |
| Rest of the page | Unchanged (intro, capabilities, systems, evidence, engagements, industries, process, why, FAQ, closing CTA) | Unchanged |

**TODO(owner):** the headline is the report's Option A, live because Phase 3
builds that exact demo. Option B ("We will tell you if AI is the wrong
answer.") is a one-line swap in `scripts/templates/index.html` if you prefer
the honest-no idea. The booking button needs your Cal.com/Calendly link.

## 2. Main menu (all pages)

| Before | After |
|---|---|
| 6 groups (Systems ▾, Capabilities ▾, Industries ▾, Packages ▾, About, More ▾) with 40+ destinations | 4 links: **Demo, How we work, About, Contact** |
| Nav button "Book a Call" | Nav button **"Book 30 minutes"** (→ contact page until booking link exists) |
| Mobile drawer: 5 expandable groups | Mobile drawer: the same 4 links + the button |

## 3. Footer (all pages)

| Before | After |
|---|---|
| 5 columns, ~45 links (7 systems, 12 capabilities, 10 industries, 5 engagements, company) | Brand block + **6 links**: About, How we work, Resources, Contact, Privacy Policy, Terms of Service |

## 4. About (`/about.html`)

| Before | After |
|---|---|
| Headings carried italic accents | Plain headings |
| No founder block | A complete founder section (name, photo, paper link, Kaggle link) sits **commented-out in the template with a TODO**, because none of the four values were provided. Fill in `[NAME]`, `[FILE]`, `[PAPER URL]`, `[KAGGLE URL]`, add the photo to `assets/`, and remove the comment markers. No biography was written. |
| CTA "How engagements work" → home anchor | → the new `/how-we-work.html` page |

## 5. How we work (`/how-we-work.html`) — new page

Assembled **only** from copy that already existed on the site: the five-step
engagement process (from the home page), the six commitments (from About), the
commercial-terms note and an honest "what an audit does not include" example
(from the engagements pages). No new claims, no invented facts.

## 6. Contact (`/contact.html`)

| Before | After |
|---|---|
| Nav/footer as above; italic heading accents | Same content; new nav/footer; plain headings |

## 7. Catalog pages (systems, capabilities, industries, engagements, hubs)

Content untouched — including every "Not included" list and the honest-limits
labels. They inherit the new nav/footer and lose the italic heading accents.
Still linked from the home page sections; no longer in the menu.

---

## Redirect proposal — awaiting your list (item 5)

You asked to keep 3–5 search pages and 301 the rest, but the list was not
provided, so **nothing was redirected or deleted yet**. Proposed default
(aligns with the flagship demo):

| Keep | Page |
|---|---|
| 1 | `/systems/knowledge-retrieval.html` — the flagship system the demo shows |
| 2 | `/capabilities/nlp-rag-development.html` — the matching capability |
| 3 | `/capabilities/ai-agent-development.html` — the core offer |
| 4 | `/capabilities/workflow-automation.html` — broadest search demand |

Suggested redirects once you confirm (or amend) the keep-list:

| Redirect | To |
|---|---|
| other 6 system pages | `/systems/knowledge-retrieval.html` (nearest kept page) |
| other 9 capability pages | nearest kept capability, else `/` |
| all 10 industry pages | `/` |
| `systems.html`, `capabilities.html`, `industries.html` hubs | `/` |

Say "go with the proposal" or send your own list and the pages will be cut and
the 301s added to `vercel.json` in one commit.
