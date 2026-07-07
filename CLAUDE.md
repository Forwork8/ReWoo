# CLAUDE.md — ReWoo Website (rewoo.tech)
### Master Development & Design Guide

> Single source of truth for building and evolving the ReWoo website. Every commit must honor it. When in doubt, **choose restraint** — but never lose the **ambition**. ReWoo sells a dream; the craft must match the size of the promise.

**Entry point:** the site opens on **`index.html`**. Ship a fast, static-first build that loads instantly.
**Two themes, both first-class:** a cinematic **dark** mode (default) and a refined **light** mode, switchable by a visible toggle and respecting the visitor's system preference.
**The standard of "premium":** effortless, calm, intentional, fast, unmistakably crafted. Cheap shouts; expensive whispers — and dreams are told quietly, with total conviction.
**Conflict hierarchy:** Clarity → Emotion → Restraint → Beauty → Cleverness.

---

## 1. Project Vision & Brand Philosophy
- **What ReWoo is:** a platform that gives any company a *complete, autonomous AI executive team and operating system* — a virtual CEO, CFO, COO, Product, Marketing, Sales, Operations, and more — so the business runs itself on agents and automation.
- **The dream we sell (this is the heart of the site):** *for the first time in history, one person can build and run a billion-dollar company — alone.* We don't sell features or "a B2B tool." We sell the visitor a new identity: the solo founder who commands an entire company.
- **Emotional target:** awe, ambition, trust, exclusivity. A visitor should feel *"this changes what's possible for me,"* then *"and I can actually trust it."*
- **Whose story it is:** the **client's**. Every screen answers *"what can YOU build and become with ReWoo?"* — not "what our product has."
- **Personality:** visionary, confident, calm, precise, human. Cinematic, never loud or gimmicky.
- **Brand promise / one line:** *"Build the billion-dollar company. Alone."*
- **Anti-brand:** generic SaaS, feature lists, dashboards-as-hero, buzzword soup, "another AI startup." If it could belong to anyone else, it's wrong.

## 2. Design Principles & Standards
1. **Sell the transformation, not the tool.** Show who the visitor becomes.
2. **Radical simplicity.** Remove until it breaks; add one thing back.
3. **One idea per section**, told with cinematic clarity.
4. **Space is a feature.** Vast negative space = confidence + luxury.
5. **Typography is the interface** (~80% of the impression).
6. **Motion with meaning** — guides the eye, deepens the dream, never decorates.
7. **Consistency = trust.** One accent, one type system, one spacing scale, two themes.

## 3. User Experience Guidelines
- **One primary action per page** (e.g., "Start building"). Everything else recedes.
- **Emotional arc:** dream (what you can build) → revelation (your AI executive team) → proof of leverage (one founder = a 1000-person company) → trust (you stay the visionary; it's reliable) → a calm, inevitable CTA.
- **3-second test:** within 3 seconds the visitor feels the promise — *I could run a whole company myself.*
- **Progressive disclosure**; **perceived instant speed**; **mobile composed as a first-class layout**, not a shrunk desktop.

## 4. Visual Identity Requirements
- **Wordmark:** "ReWoo" set with confident, generous clear-space; one monochrome treatment per surface. Domain shown as `rewoo.tech`.
- **Imagery:** abstract precision (light, depth, fine grids, a constellation of executive roles), or real product moments. **Banned:** glowing orbs, neon particles, circuit-board "AI" textures, cyberpunk, stock handshakes, robot mascots.
- **Iconography:** one line set, 1.5px stroke, 24px grid; supports text, never replaces key messaging.
- **Signature device:** ONE memorable motif — e.g., a quiet "command grid" / orbit of executive roles around the founder — used sparingly as the brand fingerprint.
- **Canvas:** the background is part of the art; choose each section's tone deliberately in both themes.

## 5. Typography System
**Primary pairing (cinematic luxury):** Display = **Fraunces** (variable serif, high optical contrast, elegant) · Text/UI = **Inter**. *(Alternate modern-minimal: all-grotesque "Geist"/"Inter Tight".)*
- **Scale:** modular **1.25**, fluid via `clamp()`. Hero may go larger for impact.
  ```
  --text-sm: clamp(0.9rem, 0.87rem + 0.15vw, 0.95rem);
  --text-base: clamp(1rem, 0.97rem + 0.2vw, 1.0625rem);
  --text-lg: clamp(1.2rem, 1.1rem + 0.4vw, 1.4rem);
  --text-xl: clamp(1.6rem, 1.3rem + 1.1vw, 2rem);
  --text-2xl: clamp(2.2rem, 1.7rem + 2.2vw, 3.25rem);
  --text-3xl: clamp(2.8rem, 2rem + 3.6vw, 4.5rem);
  --text-hero: clamp(3.2rem, 2rem + 6.5vw, 7.5rem);
  ```
- **Weights:** Display 300–500 (light + large = expensive); Text 400/500/600. Avoid heavy weights at large sizes.
- **Line-height:** display 1.0–1.1; body 1.6–1.7. **Tracking:** big display −0.02 to −0.04em; labels +0.1em uppercase. **Measure:** 60–75ch.
- One display + one text face. A third is a mistake.

## 6. Color System & Theming (dark default + light)
**Philosophy:** near-monochrome per theme + a single luminous accent used as punctuation (<8% of any view).
```
/* Brand accent (one) */
--accent: #5B8CFF;        /* luminous on dark */
--accent-strong: #2347E6; /* deeper on light */

/* DARK (default, cinematic) */
[data-theme="dark"]{
  --bg: #0A0A0B; --surface: #111114; --surface-2:#17171B;
  --text: #FAFAF7; --text-dim: #A6A6A2; --line: rgba(255,255,255,.10);
  --accent: #6E97FF; --glow: rgba(110,151,255,.16);
}
/* LIGHT (refined, warm) */
[data-theme="light"]{
  --bg: #FAFAF7; --surface:#FFFFFF; --surface-2:#F2F2EE;
  --text: #0A0A0B; --text-dim:#5C5C58; --line: rgba(10,10,11,.10);
  --accent: #2347E6; --glow: rgba(35,71,230,.10);
}
```
- **Contrast:** ≥ 4.5:1 text / ≥ 3:1 large+UI in **both** themes — verify both.
- **Gradients:** at most one subtle tonal glow per view; prefer light/shadow over color.
- One accent only. A second accent = decoration. Stop.

## 7. Layout & Spacing Rules
- Base **8px**; scale `4,8,12,16,24,32,48,64,96,128,160,192,240`.
- Container max **1280px**; reading 720–760px; gutters ≥ 6% (min 20px mobile).
- 12-col grid, 24px gutters. **Section rhythm:** 140–200px desktop (cinematic), 88–112px mobile.
- Breakpoints `480 · 768 · 1024 · 1280 · 1536`. Mobile-first. Snap to grid + scale; **no magic numbers**.

## 8. Animation & Interaction Guidelines
- Purposeful, subtle, fast; deepen the dream, never block.
  ```
  --dur-fast:160ms; --dur:260ms; --dur-slow:520ms;
  --ease-out: cubic-bezier(0.16,1,0.3,1);
  --ease-in-out: cubic-bezier(0.65,0,0.35,1);
  ```
- Scroll reveals = small fade + 8–18px translate, staggered ≤60ms. Hero gets a confident, slow entrance. Hover ≤1.02 scale / tonal shift / elegant underline.
- **Theme toggle:** animate the color transition smoothly (~300ms on background/text); persist choice (localStorage, with `try/catch`); default to system preference, fall back to dark.
- Animate only `transform`/`opacity` (60fps). **`prefers-reduced-motion` mandatory** (calm, motionless fallback). No autoplay carousels, no scroll-jacking.

## 9. Performance Requirements
- LCP ≤ 2.0s · INP ≤ 200ms · CLS ≤ 0.1 · Lighthouse ≥ 95 (mobile, all categories).
- Initial JS ≤ ~120KB gz; defer the rest. Images AVIF/WebP, responsive, lazy below fold, priority hero, explicit dimensions. Fonts preloaded + subset + `font-display:swap`. Critical CSS inline. **Static `index.html` loads instantly.**

## 10. Accessibility Standards (WCAG 2.2 AA — both themes)
Contrast verified in dark AND light · full keyboard · visible focus rings · semantic HTML + landmarks · one `<h1>` · alt text · reduced motion · 200% zoom · targets ≥44px · the theme toggle is keyboard-operable with proper `aria-label`/`aria-pressed`. Test with a screen reader.

## 11. Code Quality Standards
- **Entry:** `index.html` (static-first). Recommended scale-up: Next.js + TS + Tailwind — but a clean, hand-crafted static `index.html` + token CSS + minimal vanilla JS is ideal for the marketing site.
- **Tokens are law** (color/space/type/motion from §5–§8). No hard-coded values, no magic numbers.
- Clean, typed where applicable, componentized, documented; mobile-first CSS; ESLint/Prettier; small commits.

## 12. Component Architecture Guidelines
- Layered: Tokens → Primitives (Button, Text, Container) → Components (Card, Nav, ThemeToggle) → **Sections** (Hero, Vision, ExecTeam, Leverage, Trust, CTA) → Page (`index.html`).
- The **section** is the unit of the page; compose pages from a small library of beautiful sections. Variants via props/classes, not forks. Accessible by default. Theme via CSS variables so every component supports both modes for free.

## 13. Content & Copywriting Principles
- **Voice:** visionary, confident, spare, human. We **sell dreams** — but with conviction and truth, never hollow hype.
- **Address the visitor directly** ("you", "your company"). Make them the hero who builds the impossible.
- **Headlines:** big, bold, one idea, emotionally charged but clear ("Build the billion-dollar company. Alone."). Clarity beats cleverness.
- **Body:** short, rhythmic, concrete; show the leverage (one founder → a full company) with proof, not adjectives.
- **CTAs:** verbs of ambition — "Start building", "Claim your company", "Build your empire."
- Read every line aloud; cut 20%; one message per section. Inspire, don't oversell — trust is the brand.

## 14. SEO & Technical Requirements
- `index.html` as entry; semantic structure; one `<h1>`; per-page `<title>` (≤60) + meta description (≤155); canonical `https://rewoo.tech/`.
- Open Graph + Twitter cards with a crafted, cinematic share image; JSON-LD (Organization, Product); `sitemap.xml` + `robots.txt`; descriptive `alt`. Performance = SEO. i18n-ready.

---
### Definition of Done (every page)
Opens on `index.html`, instantly · flawless in **both** dark & light · passes the 3-second dream test · one primary action · one accent + one type system + on-grid spacing · Lighthouse ≥ 95 · WCAG 2.2 AA · reduced-motion fallback · reads beautifully aloud · and makes an ambitious founder *feel they could build a billion-dollar company alone.* **If it feels generic, it is not done.**
