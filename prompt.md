# prompt.md — ReWoo Premium Website Build Prompt (rewoo.tech)

> Paste-ready prompt to generate, build, and continuously improve the ReWoo website. Governed by **CLAUDE.md** (binding standard). If they ever conflict, CLAUDE.md wins. **The site opens on `index.html` and ships dark + light mode.**

---

## ROLE
You are a world-class product designer and front-end engineer with the taste of the best brand and luxury studios on earth. You design from the visitor's *feeling* backward to the pixels, and you have the discipline to remove rather than add. **Read `CLAUDE.md` fully first; treat it as law.**

## MISSION
Build (and keep refining) the ReWoo website into a cinematic, premium, *dream-selling* experience — minimal yet powerful, fast, modern, timeless, and emotionally unforgettable. It must feel as expensive and visionary as the promise it makes, and be unmistakably, originally ReWoo.

## THE DREAM WE ARE SELLING (this is the whole point)
ReWoo gives any company a **complete, autonomous AI executive team** — a virtual CEO, CFO, COO, Product, Marketing, Sales, Operations, and more — plus the automation to run the entire business. The dream: **for the first time in history, one person can build and run a billion-dollar company, alone.**
We are NOT selling a B2B tool or a dashboard. We are selling the visitor a new identity and a new possibility. Every screen must answer: ***"What can YOU build and become with ReWoo?"***

## TARGET AUDIENCE
Ambitious founders, solo builders, and operators who dream bigger than their headcount. They are smart, design-literate, and skeptical of hype — they are moved by a vision they can believe in *and* trust.

## THE AESTHETIC (evocative — feel it, copy no one)
Cinematic, quiet-luxury technology. A near-black, gallery-dark canvas by default (with a refined warm-light mode), vast intentional space, exquisite high-contrast typography doing the heavy lifting, and a single luminous accent used like a spotlight. Light, large, confident, and calm — awe achieved through restraint, not noise. The visitor feels they've glimpsed the future and they belong in it.

## MODERN, YET TIMELESS
Use current best craft (fluid type/space, tasteful scroll reveals, masterful dark/light theming, real product moments) — but avoid anything that dates fast (trend gimmicks, gratuitous 3D, glass overload, meme aesthetics). When torn between trendy and timeless, choose timeless.

## DESIRED EXPERIENCE & EMOTIONAL IMPACT
- **3-second test:** within 3 seconds the visitor *feels* the promise — *I could run an entire company myself.*
- **Emotional arc:** dream (what you can build) → revelation (your AI executive team) → leverage (one founder = a 1000-person company) → trust (you stay the visionary; it's reliable) → a calm, inevitable call to action.
- It must feel **instant and effortless** — speed is part of the luxury.

## PAGE STRUCTURE & CONTENT HIERARCHY (a library of composable sections in `index.html`)
1. **Hero** — one enormous, dream-selling promise ("Build the billion-dollar company. Alone."), one line of support, one primary CTA, and a restrained signature visual (a quiet "command grid" / orbit of executive roles around the founder). Vast breathing room.
2. **The shift / vision** — "For the first time, one person can run an entire company." Paint the new reality. One idea, huge type.
3. **Your AI executive team** — the agents the visitor *commands* (CEO, CFO, COO, Product, Marketing, Sales, Customer Success, Operations, Analytics, Strategy), framed as *what you get*, elegant and calm — not a feature dump.
4. **What you'll build (leverage)** — outcomes: launch in days, operate 24/7, scale without hiring. Show the scale of leverage with restraint and proof.
5. **You stay the visionary** — you set the vision and hold control; ReWoo runs the company reliably. Earn trust.
6. **Closing CTA** — a single, cinematic, irresistible invitation ("Your empire is one decision away.").
7. **Footer** — quiet, organized, complete; `rewoo.tech`, nav, legal, contact. Never cluttered.
Each section: **one message, one focal point, generous space.** Cut anything that doesn't advance the arc.

## DARK / LIGHT MODE (required)
Ship both as first-class. A visible, elegant toggle (sun/moon) in the nav, keyboard-accessible (`aria-label`, `aria-pressed`). Default to the visitor's system preference, fall back to **dark**. Persist the choice (localStorage with `try/catch`). Transition colors smoothly (~300ms). Verify contrast and beauty in **both** themes.

## ANIMATION & MICRO-INTERACTIONS
Subtle, purposeful, fast (160–520ms; easing per CLAUDE.md). Confident slow hero entrance; on-scroll reveals (small fade + slight translate, lightly staggered); alive hover states (≤1.02 scale, tonal shifts, elegant underlines). Animate only `transform`/`opacity` (60fps). **Mandatory** `prefers-reduced-motion` fallback. No autoplay carousels, no scroll-jacking, no parallax overload.

## RESPONSIVE DESIGN
Mobile-first and mobile-perfect — compose mobile as a first-class layout. Breakpoints `480/768/1024/1280/1536`. Touch targets ≥44px. Beautiful from 320px to ultra-wide. Fluid type and spacing.

## PERFORMANCE & ACCESSIBILITY (non-negotiable)
Core Web Vitals: LCP ≤2.0s · INP ≤200ms · CLS ≤0.1. Lighthouse ≥95 (mobile, all). WCAG 2.2 AA in **both** themes. Optimized images (AVIF/WebP, priority hero), preloaded subset fonts, minimal JS, zero layout shift. Static `index.html` loads instantly.

## DEVELOPMENT BEST PRACTICES
Entry point `index.html` (static-first; hand-crafted is ideal for the marketing site; Next.js+TS+Tailwind if scaling). **Design tokens are law** — pull every color/space/type/motion value from CLAUDE.md; theme via CSS variables so both modes work for free. Clean, componentized, documented; layered architecture; accessible by default.

## GUARDRAILS — STEER TOWARD SIMPLICITY, ELEGANCE & AMBITION
On every decision ask: *"Does this deepen the dream and the clarity, or just add stuff?"* When unsure, **remove it**. Prefer one perfect, emotional element over three good ones. Light + large + spacious + precise + cinematic = premium.

## ANTI-PATTERNS — NEVER PRODUCE THESE
- ❌ Generic template (hero + 3 equal cards + logo strip + pricing + FAQ, cramped).
- ❌ "B2B SaaS tool" framing or a dashboard-as-hero. We sell a dream, not a product tour.
- ❌ AI-art clichés: glowing orbs, neon particles, circuit-board textures, robot mascots, cyberpunk.
- ❌ Clutter, tiny type, many competing CTAs, walls of text, dense nav.
- ❌ Rainbow gradients, multiple accents, heavy shadows, emoji bullets, stock handshakes.
- ❌ Autoplay carousels, scroll-jacking, gratuitous motion.
- ❌ Hype/buzzword soup. Say big, true things plainly.
- ❌ Anything that could belong to any other startup. If it's not distinctly ReWoo and distinctly crafted, it's wrong.

## THE REFLECTION TEST (before output)
*"If an ambitious founder who has seen the best brands on earth landed here, would they feel awe + trust + 'I could build something huge with this' — or would they sense a template?"* If any doubt, simplify and elevate until it's gone.

## DEFINITION OF DONE (every page)
Opens on `index.html` instantly · flawless in dark & light · passes the 3-second dream test · one primary action · one accent + one type system + on-grid spacing · Lighthouse ≥95 · WCAG 2.2 AA · graceful reduced-motion · copy reads beautifully aloud · and it makes the visitor *feel they could build a billion-dollar company alone.* **If it feels generic, it is not done — iterate.**

## CONTINUOUS IMPROVEMENT LOOP
After each build: (1) score against the Definition of Done + Anti-Patterns; (2) verify both themes; (3) elevate the single weakest section; (4) cut anything not earning its place; (5) re-check performance & accessibility. Always move toward *less, but better — and more ambitious.*
