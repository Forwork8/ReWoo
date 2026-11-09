# -*- coding: utf-8 -*-
"""ReWoo site content — global meta, homepage, about, resources, contact.

Verified facts used: brand from rewoo.tech CSS (Fraunces/Inter, #6E97FF/#0066CC,
dark default with light theme), Dhaka Bangladesh origin and founder bio details
as published on the current live site, contacts actually used on the live site
(adilshamim696@gmail.com, WhatsApp +880 1321-073452), LinkedIn/X socials.
No invented metrics, clients, or awards.
"""

SITE = {
    "url": "https://rewoo.tech",
    "name": "ReWoo",
    "positioning": "The AI studio you can audit",
    "tagline": "AI systems, scoped and shipped.",
    "description": (
        "ReWoo is the AI studio you can audit: live demos you can open, a retrieval benchmark you can re-run, "
        "a written plan before anything begins, and complete handover. Agents, pipelines, and retrieval "
        "systems that fit the tools you already run — and then the keys are yours."
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
        "eyebrow": "ReWoo — the AI studio you can audit",
        "headline": "Systems do the work.<br>People do <em>the thinking.</em>",
        "sub": (
            "ReWoo designs and builds AI systems that take real work off your team — agents, pipelines, and "
            "retrieval, living inside the tools you already run. Every claim here is checkable: two demos you "
            "can open, a benchmark you can re-run, a written plan before anything begins. Your code. Your "
            "data. Your keys."
        ),
        "cta_primary": {"label": "Message on WhatsApp", "href": "contact.html"},
        "cta_secondary": {"label": "Get an instant scope", "href": "scope-generator.html"},
        "stats": [
            {"v": "2", "l": "live demos on this site — open them, no signup"},
            {"v": "1", "l": "first-author research publication — Bengali speaker diarization"},
            {"v": "Master", "l": "Kaggle rank — competition-verified"},
            {"v": "100%", "l": "of engagements begin with a written plan"},
        ],
    },
    "proof": {
        "overline": "Proof, not promises",
        "headline": "Open the kitchen.",
        "sub": "Demos, benchmarks, and credentials you can verify yourself — before any call.",
        "voice": {
            "t": "Voice Intelligence — live",
            "d": "Speak Bangla or English into your browser and watch transcription, live latency, and pipeline stages work on your device. No signup, no server.",
        },
        "search": {
            "t": "Knowledge Search — live",
            "d": "Ask a real knowledge base questions and check every answer against its clickable citations — then re-run the published retrieval benchmark yourself, failures included.",
        },
        "more": "Five more system families — visual production, assessment, design visualization, content pipelines, document intelligence — are built on request.",
        "link": {"label": "Enter the Proof Room", "href": "proof.html"},
    },
    "intro": {
        "overline": "Who we are",
        "headline": "A small studio with a narrow focus: <em>systems that hold up.</em>",
        "body": [
            "ReWoo is an independent AI systems studio based in Dhaka, Bangladesh, working with teams anywhere. We design and build scoped systems — not decks, not demos, not a platform you rent forever.",
            "The studio runs on three commitments you can check: every engagement begins with a written plan; every build hands over code, configuration, and documentation you own; and every claim on this site is either verifiable or clearly marked as an offer, not a history.",
        ],
        "link": {"label": "More about the studio", "href": "about.html"},
    },
    "founder": {
        "overline": "The founder",
        "headline": "Adil. <em>The person who scopes it builds it.</em>",
        "body": (
            "An AI systems engineer from Dhaka with a first-author publication on Bengali speaker diarization, "
            "a Kaggle Master rank, and a first client system delivered in the United Kingdom. One mind from "
            "first call to handover — no account managers, no hand-offs, no telephone game."
        ),
        "facts": [
            {"t": "First-author research", "d": "Bengali speaker diarization — published, citable, peer-reviewed work in low-resource-language AI."},
            {"t": "Kaggle Master", "d": "A competition tier earned on leaderboards, not self-awarded — machine learning skill with receipts."},
            {"t": "UK first client", "d": "The studio's first engagement was delivered for a client in the United Kingdom."},
            {"t": "Direct line", "d": "Every conversation lands with the engineer who would architect and build the system."},
        ],
        "link": {"label": "Meet the founder", "href": "about.html#founder"},
    },
    "capabilities": {
        "overline": "Capabilities",
        "headline": "Twelve ways we build.",
        "sub": "Scoped engagements with defined inputs, deliverables, and boundaries — searchable and filterable.",
        "link": {"label": "All capabilities", "href": "capabilities.html"},
    },
    "systems": {
        "overline": "System families",
        "headline": "Buy a capability. Or adopt <em>a whole system.</em>",
        "sub": "Seven engineered solution families — each a pipeline with review gates, integrations, and honest limits, built to order around your stack.",
        "link": {"label": "All systems", "href": "systems.html"},
    },
    "evidence": {
        "overline": "Evidence, honestly",
        "headline": "What we can verify, and what we will not claim.",
        "verified": [
            {"t": "This site is the studio's own work", "d": "Designed and built by ReWoo — static, fast, accessible in both themes, with no framework theater."},
            {"t": "Every scope is written", "d": "No engagement starts without a written plan you approved — what gets built, the timeline, and the terms in one document."},
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
            {"t": "Written plan", "d": "What gets built, the steps, the timeline, and every term — in one document you approve before anything begins."},
            {"t": "Build in milestones", "d": "Demoable increments; evaluation against your real cases; no big-bang reveal."},
            {"t": "Integrate and harden", "d": "Wired into your stack with logging, monitoring, and failure behavior designed in."},
            {"t": "Hand over", "d": "Code, configuration, docs, runbook, and a working session. You own it from day one."},
        ],
    },
    "why": {
        "overline": "Why ReWoo",
        "headline": "Reasons you can <em>actually check.</em>",
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
            {"q": "Do you run ready-made AI products we can subscribe to?", "a": "Not yet — and the order of operations is deliberate. ReWoo builds scoped systems to order, and productizes what the work proves out: the AI Scope Generator and the live demos on this site are the studio's own product work, built in public. When an exploration earns it, it ships with the same evaluation and handover discipline as a client build. Products generate evidence — that is the direction."},
            {"q": "How does pricing work?", "a": "There is no price list on this site, because no two projects are the same. Instead: a short call about your work, then a written plan — what gets built, the timeline, and the full terms in one document. You approve it before anything begins, and it is yours to take anywhere."},
            {"q": "What if the build is not feasible?", "a": "You learn it early and in writing. Milestone structure and evaluation reports are designed to surface failure before it becomes expensive — including a stop recommendation when the bar cannot be met."},
            {"q": "Who owns the code and data?", "a": "You do. Handover transfers the repository, configuration, credentials, and documentation. There is no hostage-taking and no recurring dependency unless you explicitly scope support."},
            {"q": "Where is the team based?", "a": "Dhaka, Bangladesh — an independent studio working with teams anywhere. The current site you are reading, including its live demos and the retrieval benchmark, was designed and built in-house."},
            {"q": "Can you work with our security and procurement process?", "a": "Yes — designs are documented for security review, scopes are written to survive procurement, and phased rollouts with checkpoints are the default shape for larger organizations. The security and data-handling page lists where data lives and how it is treated."},
        ],
    },
}

ABOUT = {
    "hero": {
        "eyebrow": "About",
        "headline": "An AI systems studio, <em>built like the work it ships.</em>",
        "sub": "Small, senior, and deliberately narrow: we scope, design, and build AI systems — then hand them over completely.",
    },
    "founder": {
        "overline": "The founder",
        "name": "Adil",
        "role": "Founder · AI systems engineer",
        "headline": "The person who scopes it <em>is the person who builds it.</em>",
        "paras": [
            "ReWoo is run by Adil, an AI systems engineer from Dhaka, Bangladesh. Before the studio there was research: a first-author publication on Bengali speaker diarization — the problem of deciding who spoke when in audio — and a Kaggle Master rank earned in open competition. Both taught the same lesson the studio now sells: claims should be measured, evaluated, and falsifiable.",
            "The studio's first client engagement was delivered for a team in the United Kingdom, and the shape of that work set the template every engagement still follows: a written plan before anything began, a system built around the client's own stack, and a complete handover.",
            "Staying deliberately small is the design, not a stage. One mind carries your system from first call to handover — no account managers, no hand-offs, no telephone game between the person who promised and the person who builds. The constraint keeps every claim on this site checkable, because the person making it signs the work.",
        ],
        "facts": [
            {"t": "First-author research publication", "d": "Bengali speaker diarization — low-resource-language AI, where the studio's voice work is grounded."},
            {"t": "Kaggle Master rank", "d": "One of Kaggle's earned competition tiers — machine learning skill with public leaderboards behind it."},
            {"t": "First client: United Kingdom", "d": "The studio's first engagement was a delivered system for a UK team — case study in preparation, pending client sign-off."},
            {"t": "Direct line, always", "d": "WhatsApp and email reach the founder directly — the same person who would architect and build your system."},
        ],
        "links": [
            {"label": "See the live demos", "href": "proof.html"},
            {"label": "Read the retrieval benchmark", "href": "demo-search.html#benchmark"},
            {"label": "Message Adil on WhatsApp", "href": "contact.html"},
        ],
    },
    "story": {
        "overline": "The studio",
        "headline": "Started in Dhaka. Built for anywhere.",
        "paras": [
            "ReWoo started in Dhaka, Bangladesh — founded by a builder with a first-author research paper, a Kaggle Master rank, and a first client in the United Kingdom. The studio's origin is its method: work that survives scrutiny, delivered from a place global players do not reach.",
            "Today ReWoo designs and builds AI systems for teams at every stage — from a founder automating their first workflow to enterprises with governance requirements. What has not changed is the shape of the work: a written plan, a system built around the client's own stack, and a complete handover.",
            "The studio stays deliberately small. The person who scopes your system is the person who builds it, evaluates it, and hands it over. That constraint is a feature: it keeps every claim on this site checkable, because the person making it signs the work.",
        ],
    },
    "principles": {
        "overline": "How we work",
        "headline": "Five commitments, <em>in writing.</em>",
        "items": [
            {"t": "Plan before build", "d": "No engagement begins without a written plan: what gets built, the steps, the timeline, and every term. Approved by you, or it does not happen."},
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
                    "A serious response to a good brief is a written plan: deliverables, boundaries, milestones, and terms — plus the questions the brief could not answer. If you get a one-line answer instead, you have learned something about the builder.",
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
                    "Vague terms make vague contracts. When you can say 'a review-by-exception agent with two tools and a human approval gate on refunds', you can get a scoped build with clear terms. When you say 'an AI that handles customer service', you get whatever the vendor felt like that morning.",
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
        "note": "Owner note: this section is the studio's public roadmap-in-progress. Nothing here is sold, scheduled, or guaranteed — it is where current prototyping effort goes.",
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
        "wa_prefill": "Hi Adil, I'd like to book an intro call with ReWoo about an AI system.",
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
        "files": {
            "id": "files",
            "label": "Attach a brief or RFP (optional)",
            "hint": "PDF, DOC, TXT, or MD. Your files are listed in the email draft — attach them in your email app, since this site has no server and nothing uploads anywhere.",
        },
        "nda": {
            "id": "nda",
            "label": "Send an NDA before we discuss details",
            "hint": "Tick this and the draft asks for your standard NDA first — or ours. Nothing sensitive is discussed before it is signed.",
        },
        "size": {
            "id": "size",
            "label": "Project size (optional)",
            "options": ["Not sure yet", "A small first step", "A focused project", "A larger build", "Prefer to discuss"],
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
            {"t": "WhatsApp", "d": "The fastest line to the studio.", "href": "contact.html", "label": "+880 1321-073452"},
            {"t": "LinkedIn", "d": "Studio updates and occasional build notes.", "href": "https://linkedin.com/company/rewoo", "label": "ReWoo on LinkedIn"},
        ],
    },
    "faq": [
        {"q": "Will I talk to a salesperson or an engineer?", "a": "An engineer. ReWoo is a studio, not a sales organization — the person who answers is the person who would scope and build."},
        {"q": "What should I prepare for the call?", "a": "One workflow that hurts and, if you have it, an example of done-right. That is genuinely enough for a first conversation."},
        {"q": "Do you sign NDAs?", "a": "Yes, routinely — say the word and we will use yours or provide a standard one before anything sensitive is discussed."},
        {"q": "What happens after the call?", "a": "If there is a fit, you receive a written plan: what gets built, the steps, the timeline, and every term — in one document. Approving it is entirely your decision, in your time."},
    ],
}
