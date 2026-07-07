# ReWoo Website Redesign — Complete Copilot Prompt
> Senior-level, production-ready. Paste this entire document into Copilot.

---

## SYSTEM CONTEXT

You are a senior frontend engineer and product designer with 10+ years of experience building high-converting SaaS and service company websites. You write production-quality, semantic HTML5 with vanilla CSS and minimal JavaScript. You have strong opinions about typography, whitespace, and conversion design. You do not write boilerplate — every line serves a purpose.

---

## PROJECT: Redesign rewoo.tech — Full Page Rebuild

You are rebuilding the landing page for **ReWoo** (rewoo.tech) — an AI workforce company that deploys AI employees for SMEs. This is a complete rewrite of `index.html`, `styles.css`, and `script.js`. Maintain the existing file names and folder structure.

---

## BRAND SYSTEM (do not deviate from these tokens)

```css
/* DARK MODE (default) */
--bg:        #0A0A0B;
--surface:   #111114;
--surface-2: #17171B;
--text:      #FAFAF7;
--dim:       #A6A6A2;
--accent:    #6E97FF;
--glow:      rgba(110, 151, 255, 0.18);
--line:      #2A2A2E;

/* LIGHT MODE */
--bg-light:     #FAF9F6;
--ink:          #0A0A0B;
--accent-light: #2347E6;
--dim-light:    #5C5C58;
--line-light:   #E4E4DE;

/* TYPOGRAPHY */
font-family-display: 'Fraunces', serif;   /* weight 300–500, variable optical */
font-family-body:    'Inter', sans-serif; /* weight 400/500/600 */
font-size-hero: clamp(3.2rem, 2rem + 6.5vw, 7.5rem);
font-size-h2:   clamp(2rem, 1.2rem + 3.5vw, 4rem);
font-size-h3:   clamp(1.4rem, 1rem + 1.5vw, 2.2rem);
font-size-body: clamp(1rem, 0.9rem + 0.3vw, 1.125rem);
```

Import from Google Fonts:
- `Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..500`
- `Inter:wght@400;500;600`

**LOGO:** SVG twin-orbit mark — two thin rings (stroke only, no fill) side by side, each with a small filled circle node at the 3 o'clock position, connected by a fine horizontal line at center. Followed by wordmark "ReWoo" in Inter 600, letter-spacing: -0.02em. Accent color on dark, ink color on light. Must work at 28px height.

---

## ANTI-PATTERNS — Never use any of these

- Glowing orbs, neon particles, circuit board textures, or any generic "AI aesthetic" imagery
- Rainbow gradients or multi-color accent treatments
- Feature bullet lists as the primary content format
- Dashboard screenshots as hero images
- "Get Started" or "Learn More" as CTA copy
- Any animation that plays continuously without user interaction (no infinite loops that aren't subtle)
- Autoplay carousels
- Hype copy: "revolutionary", "game-changing", "cutting-edge", "next-generation"

---

## PAGE ARCHITECTURE — Build these 13 sections in exact order

---

### SECTION 0 — STICKY NAVIGATION

- Fixed top bar, `backdrop-filter: blur(12px)`, `background: rgba(10,10,11,0.85)`, border-bottom: 1px solid var(--line)
- Padding: 0 24px, height: 64px
- Left: SVG twin-orbit logo + "ReWoo" wordmark
- Center (desktop only): 3 links — "How it works" · "Our Team" · "Pricing" — Inter 500, 0.875rem, var(--dim), hover: var(--text) with 200ms transition
- Right: Light/dark toggle pill (moon/sun icon) + CTA button "Book a Discovery Call" — accent background, Inter 600, 0.875rem, padding 10px 20px, border-radius 6px, hover: opacity 0.9
- On scroll past 80px: nav gains `box-shadow: 0 1px 0 var(--line)`
- Mobile: hamburger icon (3 lines, var(--text)), full-screen overlay on open, same links stacked vertically, large tap targets

---

### SECTION 1 — HERO

- Full viewport height minimum, centered content, max-width 900px, padding 0 24px
- EYEBROW: "AI Workforce · Built for Founders" — Inter 500, 0.75rem, letter-spacing 0.12em, var(--accent), uppercase, margin-bottom 24px
- HEADLINE (H1): Two lines, font-size-hero, Fraunces weight 400, line-height 1.05:
  - Line 1: "Build the company"
  - Line 2: "you always imagined." *(italic)*
- SUBHEADLINE: Max-width 560px, Inter 400, font-size-body, var(--dim), margin-top 20px, line-height 1.65:
  "ReWoo gives you a complete AI executive team — support, sales, marketing, operations, finance, analytics — so one founder can run what once took a hundred people."
- CTA ROW: Two elements side by side (stack on mobile):
  - PRIMARY button: "Hire Your First AI Employee →" — accent fill, Inter 600, 1rem, padding 14px 28px, border-radius 8px. On click: smooth scroll to `#waitlist`
  - SECONDARY text link: "See how it works ↓" — var(--dim), Inter 500, 0.9rem, no underline, hover: var(--text), smooth scroll to Section 7
- SCROLL INDICATOR: Subtle arrow at bottom center, var(--dim), fade-in after 2s delay
- BACKGROUND: Pure var(--bg). One radial glow behind headline only: `radial-gradient(ellipse 600px 400px at 50% 40%, rgba(110,151,255,0.06) 0%, transparent 70%)` — barely visible, adds depth without decoration

---

### SECTION 2 — PROOF STRIP

- Thin horizontal bar, background: var(--surface), border-top and border-bottom: 1px solid var(--line)
- Padding: 20px 24px
- Three items inline (flex, gap 48px, centered, wrap on mobile):
  1. "🇬🇧  UK startup · Live in 10 days" — Inter 500, 0.875rem, var(--text)
  2. "Marketing · HR · Collections — automated" — Inter 400, 0.875rem, var(--dim)
  3. "International revenue from Day 1" — Inter 500, 0.875rem, var(--accent)
- Separated by vertical hairlines (1px, var(--line)) on desktop, hidden on mobile
- Static. No animation. Dignified.

---

### SECTION 3 — THE PROBLEM

- Background: var(--bg), padding 120px 24px
- Max-width 800px, centered
- LABEL: "The cost you're already paying" — Inter 500, 0.75rem, letter-spacing 0.1em, var(--dim), uppercase
- HEADLINE (H2): Fraunces 400, font-size-h2, line-height 1.1, margin-top 16px:
  "You're doing the work of ten people. And it's still not enough."
- BODY: Three paragraphs, Inter 400, font-size-body, var(--dim), line-height 1.7, max-width 640px, margin-top 32px:
  - P1: "Every day, you handle customer queries that should answer themselves. You follow up on invoices that should chase themselves. You write content that should write itself. You compile reports that should compile themselves."
  - P2: "You're not building the company. You're maintaining it."
  - P3: "The bottleneck isn't your idea. It's the size of your team."
- No CTA in this section. Let the problem breathe.

---

### SECTION 4 — THE REVELATION

- Background: var(--surface), padding 120px 24px
- Max-width 900px, centered
- LABEL: "A new kind of company" — same style as above
- HEADLINE (H2): Fraunces 400 italic, font-size-h2, line-height 1.1:
  "What if your company ran itself?"
- BODY (max-width 640px, Inter 400, var(--dim), line-height 1.7, margin-top 24px):
  "ReWoo doesn't sell you a tool to manage. It gives you a team to deploy. Ten AI executives — each with a defined role, a scope of authority, and a daily operating rhythm — running your company functions from day one."

  "Not a chatbot. Not a dashboard. A complete AI workforce."

- THREE CONCEPT CARDS: Horizontal row on desktop, stacked on mobile. Background: var(--surface-2), border: 1px solid var(--line), border-radius 12px, padding 28px 24px:
  - Card 1: Icon (thin SVG person outline, 24px, var(--accent)) + "Human founders set vision and approve decisions." — Inter 400, 0.9rem, var(--dim)
  - Card 2: Icon (thin SVG orbit/network, 24px, var(--accent)) + "AI executives run every function, every day, without being asked."
  - Card 3: Icon (thin SVG shield-check, 24px, var(--accent)) + "Nothing irreversible happens without your approval."

---

### SECTION 5 — MEET YOUR TEAM

- Background: var(--bg), padding 120px 24px
- LABEL: "Your AI executive team"
- HEADLINE (H2): "Ten executives. Zero salaries. Day one."
- SUBHEAD (Inter 400, var(--dim), font-size-body, max-width 540px, margin-top 16px):
  "Each agent has a defined mission, a scope of authority, and a daily operating rhythm. They coordinate with each other so you don't have to."
- TEAM GRID: 2-column on desktop, 1-column on mobile, gap 16px, margin-top 48px
- Each card: background var(--surface), border 1px solid var(--line), border-radius 10px, padding 24px, hover: border-color var(--accent) + translateY(-2px) with 200ms transition
- Card structure:
  - Role label: Inter 600, 0.7rem, uppercase, letter-spacing 0.1em, var(--accent)
  - Name: Fraunces 400, 1.25rem, var(--text), margin-top 6px
  - Mission: Inter 400, 0.875rem, var(--dim), margin-top 8px, line-height 1.5

Ten agents (exact order):

| Role Label | Name | Mission |
|---|---|---|
| CEO | Atlas | Turns your vision into daily OKRs. Runs the company when you're building it. |
| CFO | Finance | Owns cash, burn, runway, and margins. Flags financial risk before it becomes a fire. |
| COO | Operations | Turns plans into systems. Runs the daily workflow and manages delivery. |
| Product Manager | Product | Shapes the roadmap from real customer signal. Prioritises ruthlessly. |
| Marketing | Marketing | Builds brand and compounding demand. Owns content, SEO, and referrals. |
| Sales | Sales | Qualifies leads, drafts proposals, moves the pipeline. Tracks win rate. |
| Customer Success | Success | Onboards, supports, retains. Turns clients into case studies and referrals. |
| Operations | Ops | Runs internal systems and automation. Monitors reliability. |
| Analytics | Analytics | Single source of truth. Automates dashboards and flags anomalies. |
| Strategy | Strategy | Long-range radar. Runs competitive intelligence and models scenarios. |

---

### SECTION 6 — PRODUCT IN ACTION

- Background: var(--surface), padding 120px 24px
- LABEL: "What it actually looks like"
- HEADLINE (H2): "Your AI team, at work."
- THREE TAB PILLS: Inter 500, 0.875rem, centered, margin-bottom 40px:
  "Customer Support" · "Marketing" · "Collections"
  Active state: var(--accent) underline, var(--text); Inactive: var(--dim). Click switches content panel.
- MOCKUP PANEL per tab: background #111114, border 1px solid var(--line), border-radius 16px, max-width 680px, centered, padding 24px. Build as pure HTML/CSS div mockups — no images.

  **Tab 1 — Customer Support (WhatsApp-style chat):**
  Header bar: "ReWoo Support · AI Agent" — Inter 600, 0.9rem + green dot "Online"
  Customer bubble (left-aligned, background #1e2a1e, border-radius 12px 12px 12px 2px, padding 12px 16px):
  "My order hasn't arrived — order #BD-4821"
  AI bubble (right-aligned, background var(--accent) at 15% opacity, border 1px solid var(--accent) at 30%, border-radius 12px 12px 2px 12px, padding 12px 16px):
  "Hi Nasrin! I've checked order #BD-4821 — it shipped on June 18 and is due June 22. Here's your tracking link: [track →]. Can I help with anything else?"
  Below panel: "Replied in 12 seconds" — Inter 500, 0.8rem, var(--accent)

  **Tab 2 — Marketing (content card):**
  Header bar: "Marketing Agent · LinkedIn Draft"
  Card body: Label "Scheduled for today · 9:00 AM" + 3-line post preview in Inter 400, 0.9rem, var(--dim) + "Est. reach: 1,200" tag in var(--accent)
  Status row: "✓ Drafted · ✓ Scheduled · Awaiting publish"

  **Tab 3 — Collections (email thread):**
  Header bar: "Collections Agent · Overdue Follow-up"
  Email preview card: Subject "Invoice #INV-0042 · 14 days overdue" in Inter 600 + body "Hi James, this is a friendly reminder that invoice #INV-0042 for £850 is now 14 days past due. You can pay instantly here: [Pay now →]."
  Status: "Sent automatically · No action required from you" — Inter 400, 0.8rem, var(--dim)

- BELOW MOCKUP: Inter 400, 0.875rem, var(--dim), max-width 560px, centered, margin-top 24px:
  "Every output is checked against a quality bar before it reaches your customers. If it doesn't pass, it doesn't go."

---

### SECTION 7 — HOW IT WORKS

- Background: var(--bg), padding 120px 24px
- LABEL: "The engagement"
- HEADLINE (H2): "From nothing to running in ten days."
- THREE STEP CARDS: Horizontal flow on desktop with connecting arrow lines (CSS, 1px, var(--accent) at 40% opacity) / vertical stack on mobile
- Each card: background var(--surface), border 1px solid var(--line), border-radius 12px, padding 32px 28px

  **Step 01 — Scope:**
  Step number: Fraunces 400, 3rem, var(--accent), opacity 0.3 (decorative)
  Title: "We map your highest-value process." — Inter 600, 1.1rem, var(--text)
  Body (Inter 400, 0.875rem, var(--dim), line-height 1.65): "A paid discovery session. We interview your team, document the workflow, and identify exactly where AI delivers the most value. No guesswork."
  Duration tag: "~1 week · BDT 15–30K" — Inter 500, 0.8rem, var(--accent), background: rgba(110,151,255,0.1), padding 4px 10px, border-radius 4px, margin-top 16px

  **Step 02 — Deploy:**
  Title: "We build and quality-test the agents."
  Body: "We build your AI employees, load them with your real data, and run them against a quality benchmark before they touch a single live customer. If they don't pass, we don't deploy."
  Duration tag: "6–8 weeks · BDT 50–150K"

  **Step 03 — Run:**
  Title: "Your company runs itself."
  Body: "Monthly retainer. Your agents handle the workflow. We monitor, catch drift, and expand to the next process. You set the vision. ReWoo runs the company."
  Duration tag: "Ongoing · BDT 10–50K/month"

---

### SECTION 8 — THE PROOF

- Background: var(--surface), padding 120px 24px
- LABEL: "Case study · June 2026"
- HEADLINE (H2): Fraunces 400 italic, font-size-h2:
  "A UK startup paid ReWoo to run their company. Ten days after we were founded."
- CASE STUDY CARD: background var(--bg), border 1px solid var(--line), border-left 3px solid var(--accent), border-radius 12px, padding 40px 36px, max-width 720px, centered, margin-top 48px

  METRIC ROW (flex, gap 40px, wrap on mobile):
  - "3" (Fraunces 400, 2.5rem, var(--accent)) + "functions automated" (Inter 500, 0.75rem, var(--dim), uppercase, letter-spacing 0.08em)
  - "10" + "days to live"
  - "Day 1" + "international revenue"

  DIVIDER: 1px var(--line), margin 32px 0

  BODY (Inter 400, 0.9rem, var(--dim), line-height 1.7):
  "Marketing automation, HR operations, and collections management — all handled by ReWoo AI employees. A 10-day-old Bangladeshi startup. A client in the United Kingdom."

  QUOTE BLOCK (add when client quote is available):
  `<blockquote>` with border-left 2px solid var(--accent), padding-left 20px, Fraunces 400 italic, 1.1rem, var(--dim).
  Placeholder text: *"[Client quote will go here — even one sentence changes everything.]"*

  CLOSER (Inter 600, 1rem, var(--text), margin-top 24px):
  "That is not a forecast. That is proof."

---

### SECTION 9 — PRICING

- Background: var(--bg), padding 120px 24px
- LABEL: "Transparent engagement"
- HEADLINE (H2): "You know exactly what you're getting into."
- SUBHEAD (Inter 400, var(--dim), max-width 540px, margin-top 12px):
  "No hidden enterprise gates. No 'contact us for pricing.' Three phases, honest numbers."
- THREE PRICING CARDS: Horizontal row on desktop (max-width 960px, gap 24px) / stacked on mobile

  **Card 1 — Discovery Audit:**
  Title: "Discovery Audit" — Inter 600, 1.1rem, var(--text)
  Price: "BDT 15–30K" — Fraunces 400, 2rem, var(--text) + "/ one-time" — Inter 400, 0.875rem, var(--dim)
  Duration badge: "~1 week"
  3 checkmark bullets (thin SVG check in var(--accent), 16px):
  - "Process mapping and bottleneck identification"
  - "ROI quantification — cost of NOT automating"
  - "Prioritised roadmap + fixed project quote"
  CTA: "Book a Discovery Call →" — ghost button (border 1px solid var(--line), hover: border-color var(--accent)), Inter 600, 0.9rem, padding 12px 20px, border-radius 6px, full-width, margin-top 24px

  **Card 2 — Agent Build (HIGHLIGHTED):**
  Add "Most popular" pill at top: Inter 600, 0.7rem, uppercase, letter-spacing 0.08em, var(--bg), background var(--accent), padding 4px 10px, border-radius 4px
  Border-color: var(--accent). Box-shadow: 0 0 0 1px var(--accent)
  Title: "Agent Build"
  Price: "BDT 50–150K" + "/ project"
  Duration badge: "6–8 weeks"
  3 bullets:
  - "Custom AI employees trained on your real data"
  - "Quality-tested against a benchmark before going live"
  - "Human-in-loop checkpoints at every stage"
  CTA: Same as Card 1 but accent-filled button

  **Card 3 — Outcome Retainer:**
  Title: "Outcome Retainer"
  Price: "BDT 10–50K" + "/ month"
  Duration badge: "Ongoing"
  3 bullets:
  - "Agents run your workflow daily"
  - "Drift monitoring, continuous improvement"
  - "Expand to the next process when ready"
  CTA: Same as Card 1 ghost button

  All CTAs link to: `href="mailto:hello@rewoo.tech"` (replace with Calendly link when available)

---

### SECTION 10 — WHY REWOO

- Background: var(--surface), padding 120px 24px
- LABEL: "The five-way combination"
- HEADLINE (H2): "No one else checks all five."
- FIVE ROWS, each separated by 1px var(--line), padding 32px 0:
  Each row: flex layout — large decorative number (left) + text block (right)
  Number: Fraunces 400, 3.5rem, var(--accent), opacity 0.2, min-width 80px
  Title: Inter 600, 1.05rem, var(--text)
  Description: Inter 400, 0.9rem, var(--dim), max-width 500px, line-height 1.6, margin-top 6px

  1. **"Full AI team"** — "Not a single-function tool. A complete executive team across every business function."
  2. **"Verified reliability"** — "Every agent clears a quality benchmark before touching a live customer. We call it the eval gate — it's why our deployments don't fail silently."
  3. **"Outcome pricing"** — "You pay for results, not software seats. Tickets resolved. Leads followed. Hours saved."
  4. **"Bangla and English, natively"** — "Built for South and Southeast Asian businesses. The first AI workforce company that works in your language and understands your market."
  5. **"SME-affordable"** — "Priced for founders who are building, not enterprises that are maintaining."

---

### SECTION 11 — THE VISION

- Background: var(--bg), padding 160px 24px, text-align center, max-width 800px, margin 0 auto
- MAIN QUOTE: Fraunces 400, font-size-h2, line-height 1.2, centered:
  "For the first time in history,"
  "one person can build an entire company alone."
  *(third line, italic)* "Not just manage it. Really run it."
- BODY (Inter 400, var(--dim), font-size-body, line-height 1.75, max-width 560px, centered, margin 32px auto 0):
  "ReWoo started in Dhaka, Bangladesh, ten days ago. A student founder with a first-author research paper and a Kaggle Master rank. The first client was in the United Kingdom. The vision is to build the operating system for AI-run companies — starting where global players can't reach, and earning the right to expand everywhere."

  "You set the vision. ReWoo runs the company."
- FOUNDER CREDIT (margin-top 40px): Inter 500, 0.875rem, var(--dim): "Founded by Adil Shamim · Dhaka, Bangladesh · June 2026"

---

### SECTION 12 — WAITLIST (id="waitlist")

- Background: var(--surface), padding 120px 24px, text-align center
- HEADLINE (H2): Fraunces 400 italic: "Be among the first."
- SUBHEAD (Inter 400, var(--dim), max-width 480px, margin 16px auto 0):
  "We take on a limited number of new engagements each month. Join the waitlist and we'll reach out within 48 hours."
- EMAIL FORM (max-width 480px, centered, margin-top 40px):
  - Email input: Inter 400, 1rem, background var(--surface-2), border 1px solid var(--line), border-radius 8px, padding 14px 16px, width 100%, color var(--text), placeholder "your@email.com". Focus state: border-color var(--accent), outline none, box-shadow 0 0 0 3px rgba(110,151,255,0.12)
  - Submit button (full-width, margin-top 12px): "Join the Waitlist →" — background var(--accent), color var(--bg), Inter 600, 1rem, padding 14px, border-radius 8px, border none, cursor pointer, hover opacity 0.9, active: scale(0.98)
  - On submit (JS): preventDefault. Hide form. Show success message: "You're on the list. We'll be in touch within 48 hours." — Inter 500, 1rem, var(--accent), fade-in animation. Console.log the email. *(Replace with Formspree or ConvertKit handler in production.)*
- MICRO-COPY (Inter 400, 0.8rem, var(--dim), margin-top 12px): "No spam. No newsletters. Just a conversation when the time is right."
- PRIVACY NOTE (Inter 400, 0.75rem, var(--dim), margin-top 8px): "By joining, you agree to our [Privacy Policy](/privacy.html)."

---

### SECTION 13 — FOOTER

- Background: var(--bg), border-top 1px solid var(--line), padding 56px 24px 40px
- Three-column layout (desktop) / stacked (mobile), max-width 1100px, margin 0 auto

  **Left column:**
  Logo + wordmark (same as nav)
  "© 2026 ReWoo. Dhaka, Bangladesh." — Inter 400, 0.8rem, var(--dim), margin-top 12px
  "hello@rewoo.tech" — Inter 400, 0.8rem, var(--accent), margin-top 6px, href: mailto link

  **Center column:**
  Label: "Company" — Inter 600, 0.75rem, uppercase, letter-spacing 0.1em, var(--dim), margin-bottom 16px
  Links stacked (Inter 400, 0.875rem, var(--dim), hover: var(--text), line-height 2.2):
  "How it works" · "Our Team" · "Pricing" · "Privacy Policy" · "Terms of Service"

  **Right column:**
  Label: "Connect" — same style
  Social icons row (24px × 24px SVG icons, var(--dim), hover: var(--accent), gap 16px):
  - LinkedIn: `https://linkedin.com/company/rewoo`
  - GitHub: `https://github.com/AdilShamim8`
  - Twitter/X: `https://x.com/adil_shamim8`

  Bottom row (full-width, border-top 1px solid var(--line), padding-top 24px, margin-top 32px):
  "Built by ReWoo · AI employees for any business." — Inter 400, 0.8rem, var(--dim), centered

---

## LIGHT/DARK MODE

- Small toggle in nav (right side, before CTA): pill switch with moon icon (dark) and sun icon (light)
- Clicking toggles `data-theme="light"` on the `<html>` element
- All CSS variables are defined on `:root` (dark defaults). Light mode overrides use `[data-theme="light"] { ... }` with the light palette
- On first load, JS checks `window.matchMedia('(prefers-color-scheme: light)')` — if true, set light mode. Store preference in `localStorage.setItem('theme', ...)` and read on next visit.

---

## ANALYTICS (add to `<head>` before closing tag)

```html
<!-- Plausible Analytics: replace rewoo.tech with your domain if different -->
<script defer data-domain="rewoo.tech" src="https://plausible.io/js/script.js"></script>

<!-- Microsoft Clarity: replace CLARITY_PROJECT_ID with your project ID -->
<script type="text/javascript">
  /* Replace CLARITY_PROJECT_ID below */
  (function(c,l,a,r,i,t,y){ /* ... standard Clarity snippet ... */ })
  (window, document, "clarity", "script", "CLARITY_PROJECT_ID");
</script>
```

---

## SCROLL ANIMATIONS

Use `IntersectionObserver` (threshold: 0.15) in `script.js`. Add class `is-visible` when element enters viewport.

```css
/* In styles.css */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Add `data-animate` attribute to: every section headline (H2), every team card, every pricing card, every how-it-works step card, the proof card, every why-rewoo row.

Stagger cards using inline style: `style="transition-delay: calc(0 * 80ms)"`, `style="transition-delay: calc(1 * 80ms)"` etc. Or use a JS loop to assign `--card-index` CSS custom property.

Respect `prefers-reduced-motion`: wrap all transitions in `@media (prefers-reduced-motion: no-preference) { ... }`.

---

## PERFORMANCE REQUIREMENTS

- Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` before font link. Use `font-display: swap` on all `@font-face`.
- All `<img>` tags (if any): `loading="lazy"` + explicit `width` and `height` attributes
- Zero JS frameworks or libraries — vanilla only
- All color and size values use CSS variables — no hardcoded hex or px in component rules
- Target: >90 Lighthouse Performance score on mobile

---

## ADDITIONAL PAGES TO PRODUCE

### privacy.html

Matches brand styles (same nav + footer, import same `styles.css`). Content:

- Title: "Privacy Policy"
- Last updated: June 2026
- Company: ReWoo, Dhaka, Bangladesh
- Contact: hello@rewoo.tech

Sections:
1. **Information we collect** — Email address (waitlist), usage data (analytics)
2. **How we use it** — To contact you about ReWoo services, to improve the website
3. **Third-party services** — Plausible Analytics (privacy-first, no cookies), Microsoft Clarity
4. **Data retention** — Waitlist emails retained until you request deletion
5. **Your rights** — Request deletion by emailing hello@rewoo.tech
6. **Contact** — hello@rewoo.tech

### terms.html

Matches brand styles. Content:

- Title: "Terms of Service"
- Last updated: June 2026

Sections:
1. **Services** — ReWoo provides AI workforce deployment services for businesses
2. **Payment** — 50% deposit required to begin any engagement. Milestone billing.
3. **Intellectual property** — Client retains ownership of their data. ReWoo retains ownership of templates and evaluation frameworks.
4. **Limitation of liability** — Standard limitation clause
5. **Governing law** — Laws of Bangladesh
6. **Contact** — hello@rewoo.tech

---

## FINAL INSTRUCTION TO COPILOT

Produce complete, production-ready files:

1. `index.html` — All 13 sections, semantic HTML5 (`<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`), correct `aria-label` on nav and main landmark. All inter-section links working (smooth scroll).
2. `styles.css` — All CSS variables, all component styles, dark/light mode, mobile-first responsive (breakpoints: 768px tablet, 1024px desktop). Zero hardcoded color or size values.
3. `script.js` — Theme toggle + localStorage persistence, waitlist form submission handler, IntersectionObserver scroll animations, tab switcher for Section 6.
4. `privacy.html` — Complete privacy policy as specified above.
5. `terms.html` — Complete terms of service as specified above.

Every file must be complete and immediately runnable — no `/* styles here */` placeholders, no `// TODO` stubs in critical paths. The result must be deployable to rewoo.tech by replacing the existing files.

---

*Generated for ReWoo · June 2026 · rewoo.tech*
