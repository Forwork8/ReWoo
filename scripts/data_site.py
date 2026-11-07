# -*- coding: utf-8 -*-
"""ReWoo site content — global meta, homepage, about, resources, contact.

Verified facts used: brand from rewoo.tech CSS (Fraunces/Inter, #6E97FF/#0066CC,
dark default with light theme), Dhaka Bangladesh origin and founder bio details
as published on the current live site, contacts actually used on the live site
(hello@rewoo.tech, WhatsApp +880 1321-073452), LinkedIn/X socials.
No invented metrics, clients, or awards.
"""

SITE = {
    "url": "https://rewoo.tech",
    "name": "ReWoo",
    "positioning": "AI systems studio",
    "tagline": "AI systems, scoped and shipped.",
    "description": (
        "ReWoo is an AI systems studio. We scope, design, and build agents, pipelines, and retrieval "
        "systems that fit the tools you already run — and hand you the keys."
    ),
    "email": "hello@rewoo.tech",
    "whatsapp": "+8801321073452",
    "location": "Dhaka, Bangladesh",
    "socials": [
        {"label": "LinkedIn", "url": "https://linkedin.com/company/rewoo"},
        {"label": "X", "url": "https://x.com/ReWootech8"},
    ],
}

HOME = {
    "hero": {
        "eyebrow": "AI systems studio · Dhaka, built for anywhere",
        "headline": "AI systems that take real work off your team.",
        "sub": (
            "ReWoo scopes, designs, and builds AI systems — agents, pipelines, and retrieval that fit the "
            "tools you already run. Written scope before anything is charged. Your code, your data, your keys."
        ),
        "cta_primary": {"label": "Book an intro call", "href": "contact.html"},
        "cta_secondary": {"label": "Explore the systems", "href": "systems.html"},
        "stats": [
            {"v": "7", "l": "system families"},
            {"v": "12", "l": "capabilities"},
            {"v": "5", "l": "engagement types"},
            {"v": "0", "l": "work started without a written scope"},
        ],
    },
    "intro": {
        "overline": "Who we are",
        "headline": "A small studio with a narrow focus: systems that hold up.",
        "body": [
            "ReWoo is an independent AI systems studio based in Dhaka, Bangladesh, working with teams anywhere. We design and build scoped systems — not decks, not demos, not a platform you rent forever.",
            "The studio runs on three commitments you can check: every engagement begins with a written scope; every build hands over code, configuration, and documentation you own; and every claim on this site is either verifiable or clearly marked as an offer, not a history.",
        ],
        "link": {"label": "More about the studio", "href": "about.html"},
    },
    "capabilities": {
        "overline": "Capabilities",
        "headline": "Twelve ways we build.",
        "sub": "Scoped engagements with defined inputs, deliverables, and boundaries — searchable and filterable.",
        "link": {"label": "All capabilities", "href": "capabilities.html"},
    },
    "systems": {
        "overline": "System families",
        "headline": "Buy a capability. Or adopt a whole system.",
        "sub": "Seven engineered solution families — each a pipeline with review gates, integrations, and honest limits, built to order around your stack.",
        "link": {"label": "All systems", "href": "systems.html"},
    },
    "evidence": {
        "overline": "Evidence, honestly",
        "headline": "What we can verify, and what we will not claim.",
        "verified": [
            {"t": "This site is the studio's own work", "d": "Designed and built by ReWoo — static, fast, accessible in both themes, with no framework theater."},
            {"t": "Every scope is written", "d": "No engagement starts without a scope document you approved — deliverables, milestones, and a fixed quote."},
            {"t": "You own what gets built", "d": "Code, configuration, credentials, and documentation transfer at handover. No lock-in."},
            {"t": "We say no", "d": "Feasibility calls are honest, in writing, including when the right answer is not to build."},
        ],
        "illustrative": {
            "label": "Illustrative example — not a client case",
            "title": "What one build looked like",
            "steps": [
                {"t": "The problem", "d": "A support queue doubling monthly, two humans, policy scattered across four drives."},
                {"t": "The scope", "d": "One grounded assistant: cited answers from policy, escalation with context, unanswered-question dashboard."},
                {"t": "The build", "d": "Corpus indexed and evaluated against real questions; handoff flows designed; shadow-run beside the humans."},
                {"t": "The handover", "d": "Runbook, dashboards, and a working session — the team operates it, the corpus gaps get fixed by design."},
            ],
        },
    },
    "packages": {
        "overline": "Engagements",
        "headline": "Five ways to start.",
        "sub": "Two audits, two builds, one workshop — each with defined outputs and clear exclusions. Terms per engagement.",
        "link": {"label": "Compare engagements", "href": "packages.html"},
    },
    "coverage": {
        "overline": "Where this fits",
        "headline": "Industries and teams we build for.",
        "sub": "Ten industries with possible workflows mapped — a discovery aid, not a client list. Four engagement profiles from founder to enterprise.",
        "industries_link": {"label": "Explore industries", "href": "industries.html"},
        "audiences_link": {"label": "Who we build for", "href": "who-we-build-for.html"},
        "departments_link": {"label": "Browse by department", "href": "departments.html"},
    },
    "process": {
        "overline": "How an engagement works",
        "headline": "Five steps. No mystery.",
        "steps": [
            {"t": "Intro call", "d": "Thirty minutes on your workflow and whether we are the right builder. Honest no included."},
            {"t": "Written scope", "d": "Deliverables, boundaries, milestones, and a fixed quote — approved by you before anything is charged."},
            {"t": "Build in milestones", "d": "Demoable increments; evaluation against your real cases; no big-bang reveal."},
            {"t": "Integrate and harden", "d": "Wired into your stack with logging, monitoring, and failure behavior designed in."},
            {"t": "Hand over", "d": "Code, configuration, docs, runbook, and a working session. You own it from day one."},
        ],
    },
    "why": {
        "overline": "Why ReWoo",
        "headline": "Reasons you can actually check.",
        "reasons": [
            {"t": "Written scope first", "d": "Every engagement starts with a document, not a vibe. You approve it or it does not happen."},
            {"t": "You own everything", "d": "Repository, configuration, credentials, and documentation — transferred, not rented."},
            {"t": "Honest feasibility", "d": "Evaluation reports include failures. If the quality bar cannot be met, you get a stop recommendation."},
            {"t": "Built around your stack", "d": "Overlays on the tools you already run — no rip-and-replace, no required ecosystem."},
            {"t": "Senior hands on the work", "d": "An independent studio: the person who scopes your system is the person who builds it."},
            {"t": "This site is the sample", "d": "Design, build quality, accessibility, and performance — judge the studio's work directly."},
        ],
    },
    "faq": {
        "overline": "Questions",
        "headline": "Asked often.",
        "items": [
            {"q": "Do you run ready-made AI products we can subscribe to?", "a": "No. ReWoo builds scoped systems to order — this website is our own product work, and everything else is built for a specific client's stack, data rules, and team. If a subscription product fits you better than a build, the audit will say so."},
            {"q": "How do you price?", "a": "Per engagement, after discovery: a written scope with deliverables, milestones, and a fixed quote. We do not publish prices or make turnaround promises in marketing — anything unverifiable stays out of the copy."},
            {"q": "What if the build is not feasible?", "a": "You learn it early and in writing. Milestone structure and evaluation reports are designed to surface failure before it becomes expensive — including a stop recommendation when the bar cannot be met."},
            {"q": "Who owns the code and data?", "a": "You do. Handover transfers the repository, configuration, credentials, and documentation. There is no hostage-taking and no recurring dependency unless you explicitly scope support."},
            {"q": "Where is the team based?", "a": "Dhaka, Bangladesh — an independent studio working with teams anywhere. The current site you are reading was designed and built in-house."},
            {"q": "Can you work with our security and procurement process?", "a": "Yes — designs are documented for security review, scopes are written to survive procurement, and phased rollouts with checkpoints are the default shape for larger organizations."},
        ],
    },
}

ABOUT = {
    "hero": {
        "eyebrow": "About",
        "headline": "An AI systems studio, built like the work it ships.",
        "sub": "Small, senior, and deliberately narrow: we scope, design, and build AI systems — then hand them over completely.",
    },
    "story": {
        "overline": "The studio",
        "headline": "Started in Dhaka. Built for anywhere.",
        "paras": [
            "ReWoo started in Dhaka, Bangladesh — founded by a builder with a first-author research paper, a Kaggle Master rank, and a first client in the United Kingdom. The studio's origin is its method: work that survives scrutiny, delivered from a place global players do not reach.",
            "Today ReWoo designs and builds AI systems for teams at every stage — from a founder automating their first workflow to enterprises with governance requirements. What has not changed is the shape of the work: a written scope, a system built around the client's own stack, and a complete handover.",
            "The studio stays deliberately small. The person who scopes your system is the person who builds it, evaluates it, and hands it over. That constraint is a feature: it keeps every claim on this site checkable, because the person making it signs the work.",
        ],
    },
    "principles": {
        "overline": "How we work",
        "headline": "Five commitments, in writing.",
        "items": [
            {"t": "Scope before build", "d": "No engagement begins without a written scope: deliverables, boundaries, milestones, fixed quote. Approved by you, or it does not happen."},
            {"t": "Own your system", "d": "Code, configuration, credentials, and documentation transfer at handover. Lock-in is a business model we decline."},
            {"t": "Evaluate, then say it straight", "d": "Systems are scored against your real cases, failures included. If the bar cannot be met, you get a stop recommendation, not a soft landing."},
            {"t": "Design for the boring days", "d": "Retries, idempotency, logs, alerts, runbooks, and human exception queues — the unglamorous engineering that keeps systems alive after the demo."},
            {"t": "Say no when no is the answer", "d": "Some workflows should not be automated, some data is not ready, some budgets are better unspent. An honest no is part of the service."},
        ],
    },
    "carries": {
        "overline": "What the studio carries into every build",
        "headline": "Research-grade habits, production-grade results.",
        "paras": [
            "The studio's founder background — a first-author research publication and a Kaggle Master ranking — shows up as discipline, not decoration: evaluation sets instead of anecdotes, measured claims instead of marketing numbers, and experiments designed to be falsifiable.",
            "That is also why this website states plainly which parts of ReWoo's offering are built, which are proposed engagements, and which are explorations for the future. A studio that sells rigor has to run its own site by the same rules.",
        ],
    },
    "cta": {
        "headline": "See how an engagement runs.",
        "sub": "Five steps from intro call to complete handover — the same for every client, written the same for everyone.",
        "label": "How engagements work",
        "href": "index.html#how-it-works",
    },
}

RESOURCES = {
    "hero": {
        "eyebrow": "Resources",
        "headline": "Notes from the studio.",
        "sub": "Short, practical guides written while building client systems. Free to use, no gate, no mailing list.",
    },
    "guides": [
        {
            "slug": "how-to-brief-an-ai-system",
            "title": "How to brief an AI system (and get a real estimate)",
            "read": "About a 4 minute read",
            "summary": "Most bad AI projects start with a vague brief. This is the brief format we wish every client arrived with — steal it.",
            "sections": [
                {"h": "The one-sentence version", "paras": [
                    "A usable brief names the workflow, the decision it feeds, and what done looks like — in one sentence a stranger could act on. Everything else in this guide is elaboration.",
                ]},
                {"h": "The five questions that matter", "paras": [
                    "First: what work, exactly? Not 'automate support' — 'answer order-status questions from our policy page, and escalate everything else.'",
                    "Second: who uses the output, and what do they do with it? Third: what does done-right look like — paste three examples, good and bad. Fourth: what systems does this need to touch, read or write? Fifth: what must never happen? That last one defines your guardrails and your review gates.",
                ]},
                {"h": "Red flags in your own brief", "paras": [
                    "If your brief says 'like ChatGPT but for our company', it is not a brief yet — it is a genre. If it cannot name a person whose day gets better, the value case is untested. And if every requirement is a must-have, scope discipline has not started.",
                ]},
                {"h": "What a builder should return", "paras": [
                    "A serious response to a good brief is a written scope: deliverables, boundaries, milestones, and a fixed quote — plus the questions the brief could not answer. If you get a one-line price instead, you have learned something about the builder.",
                ]},
            ],
        },
        {
            "slug": "the-automation-ladder",
            "title": "The automation ladder: what to hand over, what to keep",
            "read": "About a 5 minute read",
            "summary": "Not everything should be automated, and the decision is a ladder, not a switch. A framework for placing each task correctly.",
            "sections": [
                {"h": "The ladder", "paras": [
                    "Level one is assist: the system drafts, a human decides. Level two is review-by-exception: the system acts, humans check the flagged cases. Level three is supervised autonomy: the system runs a bounded domain with audit trails. There is no level four on purpose — full autonomy without a human path is not a product anyone should sell you.",
                ]},
                {"h": "How to place a task", "paras": [
                    "Three variables decide the rung: reversibility (can a mistake be undone cheaply?), observability (will you notice a mistake at all?), and volume (is the human cost actually worth the build?). High volume, reversible, visible — automate aggressively. Low volume, irreversible, quiet — keep a human in the loop, always.",
                ]},
                {"h": "The mistake teams make", "paras": [
                    "The expensive error is not automating too little — it is climbing two rungs at once. Pilot at review-by-exception even when you dream of autonomy; the audit trail you build there is the trust you need later.",
                ]},
            ],
        },
        {
            "slug": "plain-english-ai-stack-glossary",
            "title": "A plain-English glossary of the AI stack",
            "read": "About a 6 minute read",
            "summary": "Agent, RAG, evaluation, guardrail, grounding — the twelve terms in every AI conversation, defined the way an engineer would explain them to their manager.",
            "sections": [
                {"h": "The terms that matter", "paras": [
                    "Model: the engine that predicts text, images, or audio. Agent: software that uses a model to take multi-step actions with tools. Tool: a specific action the agent is allowed to perform — 'check inventory' is a tool; 'access the database' is a permission.",
                    "RAG (retrieval-augmented generation): looking things up in your documents before answering, so responses are grounded in your content instead of the model's memory. Grounding: the practice of tying every claim to a source you can click. Hallucination: confident output with no basis — the failure mode grounding exists to prevent.",
                    "Evaluation: scoring the system against known-good answers, before and after changes. Guardrail: a hard rule the system cannot cross — an approval gate, a banned action, a required human step. Latency: how long the system takes to respond, which for voice is the difference between natural and unbearable.",
                ]},
                {"h": "Why the vocabulary matters", "paras": [
                    "Vague terms make vague contracts. When you can say 'a review-by-exception agent with two tools and a human approval gate on refunds', you can get a scoped build and a fixed price. When you say 'an AI that handles customer service', you get whatever the vendor felt like that morning.",
                ]},
            ],
        },
    ],
    "exploring": {
        "overline": "Exploring",
        "headline": "Concepts on the workbench.",
        "sub": "Clearly labeled as explorations — these are not products, not available, and not promised. They are directions the studio is actively prototyping for client work and may open up if they earn it.",
        "items": [
            {"t": "Agent memory layer", "d": "Persistent, inspectable memory that lets long-running agents keep context without ballooning prompts."},
            {"t": "Model evaluation harness", "d": "A repeatable scoring rig for comparing models and prompts against a team's own test cases."},
            {"t": "Privacy-first local retrieval", "d": "Knowledge search that runs entirely on hardware you control, for data that cannot travel."},
            {"t": "Studio workspace console", "d": "A working surface for operating built systems: logs, traces, evaluation runs, and corpus health in one place."},
        ],
    },
}

CONTACT = {
    "hero": {
        "eyebrow": "Contact",
        "headline": "Tell us what you are building.",
        "sub": "An intro call about your workflow, or a written inquiry — both land directly with the person who would scope and build the system.",
    },
    "call": {
        "overline": "Book a call",
        "headline": "Thirty minutes. No sales floor.",
        "sub": "You will talk to the person who architects and builds — about whether AI is the right tool for this workflow at all. If it is not, you will hear that.",
        "note": "ReWoo does not run a booking scheduler: reach out on WhatsApp or email and we will agree a time directly.",
        "wa_prefill": "Hi, I'd like to talk about an AI workflow.",
    },
    "form": {
        "overline": "Written inquiry",
        "headline": "Prefer writing? Describe the work.",
        "sub": "This form composes a structured email draft — nothing is sent automatically, and nothing is stored on this website.",
        "fields": [
            {"id": "name", "label": "Your name", "type": "text", "required": True, "hint": "So we know who we are talking to."},
            {"id": "email", "label": "Email", "type": "email", "required": True, "hint": "For the reply. Used for nothing else."},
            {"id": "company", "label": "Company or project", "type": "text", "required": False, "hint": "Optional context."},
            {"id": "interest", "label": "What are you working on?", "type": "textarea", "required": True, "hint": "The workflow, the pain, and what done looks like. Two or three sentences is plenty."},
        ],
        "budget": {
            "id": "budget",
            "label": "Budget basis (optional)",
            "options": ["Not sure yet", "Just exploring", "Under $1k", "$1k – $5k", "$5k – $15k", "$15k+", "Prefer to discuss"],
        },
        "submit": "Compose email draft",
        "review_note": "Review the draft below — then open it in your email app or copy it. Nothing sends itself, and nothing is stored on this site.",
        "copy_label": "Copy draft to clipboard",
        "mailto_label": "Open in email app",
        "consent_note": "By sending this email you agree to ReWoo's privacy policy: your message is used to reply, and for nothing else.",
    },
    "brief": {
        "overline": "Project brief",
        "headline": "Your selected items.",
        "sub": "Anything you added while browsing — systems, capabilities, or engagements — collects here and drops into the email draft automatically.",
        "empty": "Nothing selected yet. Browse systems, capabilities, or engagements and use 'Add to brief' — selections persist on this device only.",
        "browse": [
            {"label": "Browse systems", "href": "systems.html"},
            {"label": "Browse capabilities", "href": "capabilities.html"},
            {"label": "Browse engagements", "href": "packages.html"},
        ],
        "clear": "Clear all",
        "note": "Brief selections are stored in your browser's local storage on this device. They never leave it unless you send the composed email yourself.",
    },
    "alt": {
        "overline": "Other ways",
        "headline": "Direct lines.",
        "items": [
            {"t": "Email", "d": "Write directly — same person, same speed.", "href": "mailto:hello@rewoo.tech", "label": "hello@rewoo.tech"},
            {"t": "WhatsApp", "d": "The fastest line to the studio.", "href": "https://wa.me/8801321073452?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20an%20AI%20workflow.", "label": "+880 1321-073452"},
            {"t": "LinkedIn", "d": "Studio updates and occasional build notes.", "href": "https://linkedin.com/company/rewoo", "label": "ReWoo on LinkedIn"},
        ],
    },
    "faq": [
        {"q": "Will I talk to a salesperson or an engineer?", "a": "An engineer. ReWoo is a studio, not a sales organization — the person who answers is the person who would scope and build."},
        {"q": "What should I prepare for the call?", "a": "One workflow that hurts and, if you have it, an example of done-right. That is genuinely enough for a first conversation."},
        {"q": "Do you sign NDAs?", "a": "Yes, routinely — say the word and we will use yours or provide a standard one before anything sensitive is discussed."},
        {"q": "What happens after the call?", "a": "If there is a fit, you receive a written scope: deliverables, boundaries, milestones, and a fixed quote. Approving it is entirely your decision, in your time."},
    ],
}
