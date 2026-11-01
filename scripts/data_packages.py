# -*- coding: utf-8 -*-
"""ReWoo site content — Packages (5), Audiences (4), Departments (8).

Framing rules:
- Five engagement types retained from the reference structure. No prices, no
  turnaround times, no "free" claims, no performance promises — commercial
  terms are set per engagement ("Request scope").
- Audiences describe how engagement needs DIFFER — not claims of existing
  customers in every segment.
- Departments are a discovery lens onto the same systems/capabilities.
"""

PRICING_NOTE = (
    "Request scope. ReWoo's commercial terms are set per engagement: after a short discovery you receive "
    "a written scope with deliverables, milestones, and a fixed quote. Nothing is charged before you "
    "approve that document — and we do not publish prices, turnaround promises, or performance guarantees "
    "we cannot verify."
)

PACKAGES = [
    {
        "slug": "ai-readiness-audit",
        "name": "AI Readiness Audit",
        "archetype": "Audit",
        "icon": "clipboard",
        "chip": "Assessment engagement",
        "short": "Find out which of your workflows are worth automating — and which are not — before spending build budget.",
        "buyers": [
            "Founders and operators feeling AI pressure without a clear first move",
            "Operations leads with backlog pain and no prioritized plan",
            "Teams that tried a pilot and want to know why it stalled",
        ],
        "summary": (
            "A structured assessment of your workflows, data, and tooling that ends in a prioritized, "
            "reasoned roadmap — including the honest recommendation to do nothing where nothing is warranted."
        ),
        "includes": [
            "Workflow discovery sessions with the people who do the work",
            "Data and tooling readiness review",
            "Opportunity matrix: value, feasibility, risk",
            "Build-vs-buy analysis per opportunity",
            "Prioritized roadmap with dependencies and sequencing",
            "The recommended first build, written up as a concrete scope",
        ],
        "outputs": [
            {"t": "Readiness findings", "d": "What your data, access, and tooling can actually support today."},
            {"t": "Opportunity matrix", "d": "Every candidate workflow scored on value, feasibility, and risk."},
            {"t": "Prioritized roadmap", "d": "Sequenced recommendations with reasoning — including what not to build."},
            {"t": "Build-vs-buy analysis", "d": "Honest make-or-buy calls per capability, no reseller angles."},
            {"t": "First-build scope", "d": "The priority use case as a written scope ready to execute."},
            {"t": "Review session", "d": "A working session where your team challenges every recommendation."},
        ],
        "exclusions": [
            "Implementation — the audit ends at a roadmap you own",
            "Vendor selection commissions or reseller fees",
            "Generic maturity-model slide decks",
            "Estimates not tied to your observed workflows",
        ],
        "process": [
            {"t": "Discovery", "d": "Structured sessions map how work actually flows, exceptions included."},
            {"t": "Analysis", "d": "Opportunities scored; data and tooling readiness checked against each."},
            {"t": "Synthesis", "d": "Roadmap drafted with written reasoning per recommendation."},
            {"t": "Review", "d": "Your team pressure-tests it; the document earns its sign-off."},
        ],
        "after": [
            {"slug": "ai-agent-mvp", "why": "The top-scoring workflow becomes a working system."},
            {"slug": "workflow-automation-audit", "why": "When the pain is process chaos, not missing AI."},
            {"slug": "ai-strategy-workshop", "why": "When leadership alignment is the real blocker."},
        ],
        "faqs": [
            {"q": "Why not just start building?", "a": "Because build budget spent on the wrong workflow is the most expensive AI mistake there is. The audit exists to make your first build the right one."},
            {"q": "What if the answer is we are not ready?", "a": "Then that is the finding, written down with the specific gaps — data quality, access, process stability — and what would change it. That answer saves more money than any roadmap."},
            {"q": "Do you pitch your own services in it?", "a": "Recommendations include build-vs-buy calls that may point at existing tools instead of us. You also get the first-build scope in a form any competent builder can execute."},
            {"q": "How is this priced?", "a": PRICING_NOTE},
        ],
    },
    {
        "slug": "ai-agent-mvp",
        "name": "AI Agent MVP",
        "archetype": "Build",
        "icon": "rocket",
        "chip": "Build engagement",
        "short": "A working agent for your highest-value workflow — deployed, connected, evaluated, and handed over.",
        "buyers": [
            "Teams with a known painful workflow and a clear idea of done",
            "Founders who need the core AI loop of their product to exist",
            "Operations leads piloting automation with a real success metric",
        ],
        "summary": (
            "One workflow, one agent, done properly: bounded permissions, real integrations, an evaluation "
            "report against your cases, and a runbook your team can operate. The MVP that survives contact "
            "with production."
        ),
        "includes": [
            "Task decomposition and decision-boundary design",
            "Tool and API integration into your existing systems",
            "Evaluation harness built from your real cases",
            "Observability: logs, traces, action history",
            "Human handoff and approval gates",
            "Handover: runbook, docs, and a working session",
        ],
        "outputs": [
            {"t": "Deployed agent", "d": "Running in your environment, connected to your tools."},
            {"t": "Boundary documentation", "d": "What the agent may do, must ask about, and must never touch — in writing."},
            {"t": "Evaluation report", "d": "Scored results against your test cases, failures included."},
            {"t": "Runbook", "d": "Operations, failure modes, and recovery — readable by your team."},
            {"t": "Action logs", "d": "Every autonomous action recorded and reviewable."},
            {"t": "Handover session", "d": "Your team leaves able to operate and extend it."},
        ],
        "exclusions": [
            "Unsupervised operation on sensitive actions — gates are designed in",
            "Scope creep beyond the agreed workflow",
            "Ownership ambiguity — the code and configuration are yours",
            "Hidden run-rate costs — usage profiles are measured and handed over",
        ],
        "process": [
            {"t": "Scope", "d": "The workflow decomposed; boundaries and success metrics written down."},
            {"t": "Design", "d": "Architecture, tools, permissions, and escalation agreed."},
            {"t": "Build", "d": "Milestones you can demo — no big-bang reveal."},
            {"t": "Evaluate and harden", "d": "Failure cases injected and fixed before rollout."},
            {"t": "Hand over", "d": "Deploy, document, train, transfer."},
        ],
        "after": [
            {"slug": "ai-integration-sprint", "why": "When the next gap is deeper wiring into your stack."},
            {"slug": "workflow-automation-audit", "why": "When it is time to find the next workflow."},
            {"slug": "ai-readiness-audit", "why": "If the MVP surfaced questions the roadmap should answer."},
        ],
        "faqs": [
            {"q": "What if we do not know which workflow first?", "a": "Then the AI Readiness Audit is the right starting point — building the wrong workflow first is the expensive path."},
            {"q": "Do you keep the keys afterward?", "a": "No. Code, configuration, credentials, and docs transfer at handover. If you want ongoing support, that is a separate, optional arrangement."},
            {"q": "What if the agent turns out not to be feasible?", "a": "Evaluation results are delivered honestly — including a stop recommendation if the quality bar cannot be met. The milestone structure means you learn this early, not expensively."},
            {"q": "How is this priced?", "a": PRICING_NOTE},
        ],
    },
    {
        "slug": "ai-integration-sprint",
        "name": "AI Integration Sprint",
        "archetype": "Build",
        "icon": "plug",
        "chip": "Build engagement",
        "short": "AI wired into the systems you already run — with retries, monitoring, and clean failure behavior.",
        "buyers": [
            "Teams with a working model or agent that cannot touch production systems",
            "Companies whose AI ambitions keep dying in the integration layer",
            "Ops teams that need AI reading and writing where the work happens",
        ],
        "summary": (
            "A focused engagement on the unglamorous layer that makes AI real: connecting your model, agent, "
            "or pipeline to CRMs, ERPs, inboxes, and internal tools — built boringly, correctly, and "
            "monitored from the first request."
        ),
        "includes": [
            "API and permission audit of the systems involved",
            "Integration architecture with retries and idempotency",
            "Model gateway configuration where multiple providers are used",
            "Monitoring, alerting, and audit logging on every route",
            "Secrets and access management done properly",
            "Documentation your future developers can actually read",
        ],
        "outputs": [
            {"t": "Deployed integrations", "d": "AI reading and writing where your team works."},
            {"t": "Architecture documentation", "d": "Routes, failure behavior, and quirks — written down."},
            {"t": "Monitoring and alerts", "d": "You know when a route degrades before your users do."},
            {"t": "Access audit trail", "d": "Scoped service accounts and credential handling on record."},
            {"t": "Runbooks", "d": "Per-route operations and failure-mode guidance."},
            {"t": "Handover session", "d": "Your engineers walked through every seam."},
        ],
        "exclusions": [
            "Shared-admin-credential shortcuts — refused, not negotiable",
            "Fire-and-forget writes to systems of record",
            "Replacing systems that genuinely need replacing — we will say so",
            "Integrations without logs, alerts, or documentation",
        ],
        "process": [
            {"t": "Audit", "d": "Real APIs, permissions, rate limits, and undocumented quirks mapped."},
            {"t": "Architect", "d": "Routes, retries, idempotency, and failure behavior designed."},
            {"t": "Build", "d": "Implemented with logging from the first request."},
            {"t": "Soak", "d": "Runs against real traffic before anyone depends on it."},
            {"t": "Hand over", "d": "Docs, alerts, and a failure-mode walkthrough."},
        ],
        "after": [
            {"slug": "ai-agent-mvp", "why": "When the wiring is ready and the workflow is next."},
            {"slug": "workflow-automation-audit", "why": "To find the next set of processes worth connecting."},
            {"slug": "ai-readiness-audit", "why": "When integration findings raise roadmap questions."},
        ],
        "faqs": [
            {"q": "Our system has no API — is this still possible?", "a": "Often, via file drops, database access, email parsing, or adapters. Discovery answers this honestly per system — including when the real answer is fix the system first."},
            {"q": "Do you work with our engineers or instead of them?", "a": "Either, scoped explicitly. The documentation and handover are designed so your team owns the seams afterward."},
            {"q": "What about our security review?", "a": "Scoped service accounts, proper secret storage, and an access trail are defaults — your security team reviews the design as part of handover."},
            {"q": "How is this priced?", "a": PRICING_NOTE},
        ],
    },
    {
        "slug": "workflow-automation-audit",
        "name": "Workflow Automation Audit",
        "archetype": "Audit",
        "icon": "flow",
        "chip": "Assessment engagement",
        "short": "Map one messy process end-to-end and find out what to automate, what to fix, and what to leave human.",
        "buyers": [
            "Operations leads with one process everyone complains about",
            "Teams drowning in exceptions and rework",
            "Managers unsure whether the pain is missing AI or broken process",
        ],
        "summary": (
            "A deep-dive on a single workflow: every step, every exception, every handoff documented — then "
            "a redesign that separates what should be automated, what should be fixed, and what should "
            "stay human, with the reasoning written down."
        ),
        "includes": [
            "End-to-end process mapping, exceptions included",
            "Exception inventory and root-cause analysis",
            "Automation opportunity assessment per step",
            "Redesign proposal: automate, fix, or keep human",
            "Integration readiness check against your systems",
            "An implementation scope for the redesigned workflow",
        ],
        "outputs": [
            {"t": "Workflow map", "d": "The process as it actually runs — not the org-chart version."},
            {"t": "Exception inventory", "d": "Every known failure mode, its frequency, and its cost driver."},
            {"t": "Step-by-step assessment", "d": "Each step rated: automate, fix first, or keep human."},
            {"t": "Redesign proposal", "d": "The process re-drawn with reasoning attached."},
            {"t": "Readiness findings", "d": "Systems and data gaps that would block automation."},
            {"t": "Implementation scope", "d": "The redesigned workflow as a buildable, quoted scope."},
        ],
        "exclusions": [
            "Automating a broken process to hide the breakage",
            "Recommendations without written reasoning",
            "Blanket 'automate everything' conclusions",
            "Implementation — this ends at the scoped redesign",
        ],
        "process": [
            {"t": "Shadow", "d": "We watch the real process run, exceptions and all."},
            {"t": "Map", "d": "Steps, handoffs, delays, and failure points documented."},
            {"t": "Assess", "d": "Each step judged: automate, fix, or keep human."},
            {"t": "Redesign", "d": "The improved workflow scoped for implementation."},
        ],
        "after": [
            {"slug": "ai-agent-mvp", "why": "The redesigned workflow becomes a working system."},
            {"slug": "ai-integration-sprint", "why": "When the redesign needs deeper system wiring."},
            {"slug": "ai-strategy-workshop", "why": "When one process audit should become an operating principle."},
        ],
        "faqs": [
            {"q": "How is this different from the AI Readiness Audit?", "a": "Breadth versus depth: the Readiness Audit surveys your whole operation for priorities; this goes deep on one workflow you already know is broken."},
            {"q": "What if the answer is the process, not the AI?", "a": "Then that is the finding — fixing the process first is frequently the cheaper path, and the audit says so in writing."},
            {"q": "Can you implement the redesign?", "a": "Yes, as a follow-on engagement — the scope you receive is written to be executable by us or any competent builder."},
            {"q": "How is this priced?", "a": PRICING_NOTE},
        ],
    },
    {
        "slug": "ai-strategy-workshop",
        "name": "AI Strategy Workshop",
        "archetype": "Workshop",
        "icon": "users",
        "chip": "Alignment engagement",
        "short": "Get leadership aligned on what AI means for this business — with a shared vocabulary and a first plan.",
        "buyers": [
            "Leadership teams split on what to do about AI",
            "Companies that need an informed, honest basis for AI decisions",
            "Founders preparing board or investor conversations on AI plans",
        ],
        "summary": (
            "A structured working session for decision-makers: what current AI can and cannot do, what it "
            "means for your specific operation, and a first prioritized plan — built with your team in the "
            "room, not presented to them."
        ),
        "includes": [
            "Pre-workshop discovery on your operation and goals",
            "A capabilities briefing grounded in current, verifiable AI reality",
            "Facilitated mapping of your workflows against that reality",
            "Risk and governance discussion: data, privacy, and human oversight",
            "A first prioritized plan built with the room",
            "A written summary with the plan and open questions",
        ],
        "outputs": [
            {"t": "Shared vocabulary", "d": "Your leadership team speaking precisely about agents, RAG, and automation."},
            {"t": "Reality briefing", "d": "What the technology can and cannot do — separated from the hype."},
            {"t": "Workflow map", "d": "Your operations viewed through an automation lens."},
            {"t": "Governance outline", "d": "Data, privacy, and oversight questions framed for action."},
            {"t": "First plan", "d": "A prioritized starting sequence the room actually agreed on."},
            {"t": "Written summary", "d": "Decisions, reasoning, and open questions on record."},
        ],
        "exclusions": [
            "Vendor theater with product demos standing in for strategy",
            "Hype briefings detached from your operation",
            "A plan nobody in the room helped build",
            "Compliance sign-off — governance questions are framed, not answered",
        ],
        "process": [
            {"t": "Prepare", "d": "Discovery on your operation, market, and goals."},
            {"t": "Brief", "d": "Current AI reality — capabilities and limits, honestly."},
            {"t": "Work", "d": "Facilitated sessions map your workflows to that reality."},
            {"t": "Decide", "d": "The room builds and commits to a first plan."},
        ],
        "after": [
            {"slug": "ai-readiness-audit", "why": "Turn the workshop's first plan into a verified roadmap."},
            {"slug": "ai-agent-mvp", "why": "When the room already knows the first workflow."},
            {"slug": "workflow-automation-audit", "why": "When one process surfaced as the priority."},
        ],
        "faqs": [
            {"q": "Is this a demo day?", "a": "No. Demos are cheap theater for decision-making. The briefing is about verifiable capability boundaries — including the embarrassing limits — because those decide your plan."},
            {"q": "Who should attend?", "a": "The people who can commit resources and the people who own the workflows. A room without both produces a plan nobody executes."},
            {"q": "Will we leave with a roadmap?", "a": "You leave with a first plan the room built and a written summary. Turning it into a verified roadmap with data checks is the natural follow-on."},
            {"q": "How is this priced?", "a": PRICING_NOTE},
        ],
    },
]

AUDIENCES = [
    {
        "slug": "early-stage",
        "name": "Early-stage startups",
        "eyebrow": "Pre-seed to seed",
        "tagline": "One founder, too much work, and no headcount coming.",
        "profile": (
            "You are the operations, marketing, support, and finance departments — sometimes in the same "
            "hour. The AI question is not transformation; it is survival math: which recurring work can a "
            "system carry so you can sell, build, and breathe."
        ),
        "needs": [
            "One painful workflow automated, not a platform",
            "Costs that match a founder budget, scoped in writing",
            "Tools that work with free or cheap plans you already use",
            "Honest feasibility calls — you cannot afford a failed build",
        ],
        "engagement": (
            "Engagements are small and surgical: one workflow, one build, full handover. The written scope "
            "matters more here than anywhere — it is your protection against paying for vapor. Expect to be "
            "asked hard questions about what is really worth automating first."
        ),
        "packages": ["ai-readiness-audit", "ai-agent-mvp"],
    },
    {
        "slug": "growth-stage",
        "name": "Growth-stage startups",
        "eyebrow": "Series A to C",
        "tagline": "Hiring plans that AI systems could halve — if the workflows are right.",
        "profile": (
            "You have product-market fit and a scaling problem. Every function is hiring, and the recurring "
            "work in support, sales ops, and content is growing linearly with revenue. The AI question is "
            "which systems to build so headcount grows slower than the business."
        ),
        "needs": [
            "Support and sales ops automation that holds at volume",
            "Content pipelines that keep pace with growth marketing",
            "Integration into a real stack: CRM, helpdesk, warehouse of tools",
            "Metrics and evaluation — instrumentation, not vibes",
        ],
        "engagement": (
            "Engagements are milestone-based with your team in the loop — demoable increments, evaluation "
            "reports, and clean handover so your engineers own the systems afterward. Scoped boundaries "
            "matter: growth-stage teams feel pressure to automate judgment prematurely, and the scope "
            "documents push back."
        ),
        "packages": ["ai-agent-mvp", "ai-integration-sprint"],
    },
    {
        "slug": "mid-market",
        "name": "Mid-market organizations",
        "eyebrow": "Established operators",
        "tagline": "Process debt everywhere, and a mandate to modernize without breaking anything.",
        "profile": (
            "You run real operations with real history: established processes, legacy systems, and teams "
            "whose workflow knowledge lives in their heads. The AI question is where modernization pays "
            "for itself first — without a rip-and-replace program that eats two quarters."
        ),
        "needs": [
            "Automation that overlays existing systems, not replaces them",
            "Process audits that respect how work actually flows",
            "Document intelligence for paper-heavy operations",
            "Change management the teams will actually accept",
        ],
        "engagement": (
            "Engagements start with assessment — the audits exist for exactly this profile — then build in "
            "phases with shadow-runs alongside the humans before anything runs alone. Documentation and "
            "training are first-class deliverables, because the system has to survive its owner changing jobs."
        ),
        "packages": ["workflow-automation-audit", "ai-readiness-audit"],
    },
    {
        "slug": "enterprise",
        "name": "Enterprises",
        "eyebrow": "Scale and governance",
        "tagline": "Governance-grade systems: audited actions, controlled data paths, and reviewable decisions.",
        "profile": (
            "You have scale, complexity, and a review process with opinions. AI initiatives live or die on "
            "governance: data boundaries, action auditability, and vendor processes. The question is which "
            "engagement model fits — scoped builds, private deployments, or capability transfer to your "
            "platform teams."
        ),
        "needs": [
            "Audit trails on every automated action",
            "Deployment options that meet data-residency and network constraints",
            "Security and procurement processes respected from day one",
            "Knowledge transfer so internal teams own the capability",
        ],
        "engagement": (
            "Engagements are structured for your review gates: designs documented for security review, "
            "scenarios for procurement, and phased rollouts with measurable checkpoints. Private deployment "
            "on infrastructure you control is a scoping option, and handover includes the documentation "
            "your platform teams will demand. Commercial structure follows your vendor process — the "
            "written scope is built to survive it."
        ),
        "packages": ["ai-strategy-workshop", "ai-readiness-audit"],
    },
]

DEPARTMENTS = [
    {
        "slug": "customer-support-cx",
        "name": "Customer Support & CX",
        "icon": "chat",
        "friction": [
            "Tier-one volume grows with every customer and none of it is interesting work",
            "Policy lives in documents agents cannot search fast enough",
            "Every channel wants a response SLA your headcount cannot meet",
        ],
        "workflows": [
            {"t": "Grounded deflection", "d": "A cited-answer assistant handles tier-one questions; edge cases escalate with full context."},
            {"t": "Ticket intelligence", "d": "Classification, prioritization, and drafted replies for human approval."},
            {"t": "QA sampling", "d": "Conversation review against quality rubrics, on every channel, at sampling rates you set."},
        ],
        "systems": ["knowledge-retrieval", "voice-intelligence"],
        "capabilities": ["ai-chatbot-development", "ai-agent-development", "nlp-rag-development"],
    },
    {
        "slug": "sales",
        "name": "Sales & Revenue Teams",
        "icon": "chart",
        "friction": [
            "CRM data quality decays because updating it is nobody's favorite task",
            "Follow-ups slip through the cracks between calls",
            "Research before calls eats the morning",
        ],
        "workflows": [
            {"t": "CRM hygiene automation", "d": "Enrichment, deduplication, and logging run continuously with audit trails."},
            {"t": "Call intelligence", "d": "Transcription, summaries, and commitments extracted straight into the CRM."},
            {"t": "Pre-call research agent", "d": "A briefing pack drafted from your notes, their site, and past threads."},
        ],
        "systems": ["voice-intelligence"],
        "capabilities": ["voice-ai-development", "ai-agent-development", "workflow-automation"],
    },
    {
        "slug": "marketing",
        "name": "Marketing Teams",
        "icon": "megaphone",
        "friction": [
            "The content calendar assumes a team twice your size",
            "Every platform wants its own format and you ship one",
            "Campaign asset production bottlenecks every launch",
        ],
        "workflows": [
            {"t": "Content pipelines", "d": "One researched source piece expands into channel formats under your style guide."},
            {"t": "Visual production systems", "d": "On-brand campaign imagery generated in batches with review queues."},
            {"t": "Review intelligence", "d": "Feedback and review themes surfaced weekly, with response drafts for approval."},
        ],
        "systems": ["content-pipelines", "visual-production"],
        "capabilities": ["ai-content-video-production", "generative-ai-development", "workflow-automation"],
    },
    {
        "slug": "hr-people",
        "name": "HR & People Operations",
        "icon": "users",
        "friction": [
            "Policy questions consume the team's day with lookups",
            "Onboarding is a checklist nobody completes consistently",
            "People documentation is scattered across systems",
        ],
        "workflows": [
            {"t": "Policy assistant", "d": "Citation-first answers from your handbook — with role-aware sources."},
            {"t": "Onboarding paths", "d": "Assessment-driven training with completion evidence your audits can use."},
            {"t": "Document processing", "d": "Intake forms and records extracted, validated, and filed with audit trails."},
        ],
        "systems": ["knowledge-retrieval", "assessment-systems", "document-intelligence"],
        "capabilities": ["nlp-rag-development", "workflow-automation"],
    },
    {
        "slug": "engineering-it",
        "name": "Engineering & IT",
        "icon": "code",
        "friction": [
            "Tribal knowledge leaves with every departure",
            "Runbooks exist but are found only when it is already an incident",
            "Internal requests consume engineering time",
        ],
        "workflows": [
            {"t": "Engineering knowledge base", "d": "Repos, runbooks, and decisions indexed — cited answers where engineers work."},
            {"t": "Internal request automation", "d": "Access requests and routine tickets handled by agents with approval gates."},
            {"t": "Incident summaries", "d": "Channels and timelines condensed into structured post-mortem drafts."},
        ],
        "systems": ["knowledge-retrieval"],
        "capabilities": ["nlp-rag-development", "ai-integration-services", "ai-agent-development"],
    },
    {
        "slug": "finance-accounting",
        "name": "Finance & Accounting",
        "icon": "wallet",
        "friction": [
            "Invoice and expense processing is manual entry at volume",
            "Reconciliation mismatches surface late and expensively",
            "Reporting assembly eats the close",
        ],
        "workflows": [
            {"t": "Document intelligence", "d": "Invoices and statements extracted to schema with confidence flags and audit trails."},
            {"t": "Reconciliation assistance", "d": "Mismatches detected, summarized, and routed with sources attached."},
            {"t": "Report drafting", "d": "Numbers pulled, checked, and narrated into your reporting format."},
        ],
        "systems": ["document-intelligence"],
        "capabilities": ["nlp-rag-development", "workflow-automation", "ai-integration-services"],
    },
    {
        "slug": "operations",
        "name": "Operations & Supply Chain",
        "icon": "wrench",
        "friction": [
            "POs, spec sheets, and confirmations arrive in every format imaginable",
            "One process exception can stall a shipment for days",
            "SOPs exist but nobody can find the current version",
        ],
        "workflows": [
            {"t": "Document flow automation", "d": "Supplier paperwork ingested, extracted, and matched with human exception queues."},
            {"t": "SOP retrieval", "d": "The current procedure, cited, on the shift floor."},
            {"t": "Visual inspection", "d": "Camera-based quality checks with confidence thresholds and drift monitoring."},
        ],
        "systems": ["document-intelligence", "knowledge-retrieval"],
        "capabilities": ["nlp-rag-development", "computer-vision-development", "workflow-automation"],
    },
    {
        "slug": "legal-compliance",
        "name": "Legal & Compliance",
        "icon": "shield",
        "friction": [
            "Contract review volume exceeds the team's capacity",
            "Obligation tracking across agreements is manual and fragile",
            "Every AI initiative needs their review and they are drowning",
        ],
        "workflows": [
            {"t": "Contract analysis support", "d": "Clause detection and comparison drafts — reviewed, corrected, and owned by your lawyers."},
            {"t": "Obligation extraction", "d": "Key dates and duties pulled from agreements into tracked registers."},
            {"t": "Policy retrieval", "d": "The current policy version, cited, for every team that asks."},
        ],
        "systems": ["document-intelligence", "knowledge-retrieval"],
        "capabilities": ["nlp-rag-development", "document-intelligence-as-capability"],
    },
]

# Cross-reference fix-up: legal/compliance capability list must use real slugs
DEPARTMENTS[-1]["capabilities"] = ["nlp-rag-development", "workflow-automation"]
