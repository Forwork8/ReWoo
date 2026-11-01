# -*- coding: utf-8 -*-
"""ReWoo site content — Capabilities (12).

Framing rule: every capability is a scoped engagement, not a subscription.
No prices, no turnaround promises, no invented delivery history.
Groups drive the filter chips on the capabilities hub.
"""

CAPABILITY_GROUPS = [
    ("agents", "Agents & interfaces"),
    ("applied", "Applied AI"),
    ("data", "Data & integration"),
    ("strategy", "Strategy & product"),
]

CAPABILITIES = [
    {
        "slug": "ai-agent-development",
        "name": "AI Agent Development",
        "num": "01",
        "group": "agents",
        "icon": "bot",
        "short": "Autonomous agents that plan, reason, and act inside your tools — with boundaries you define.",
        "lede": (
            "Agents that carry out multi-step work — not chat windows. ReWoo designs and builds agents "
            "with explicit tools, permissions, and escalation paths, so autonomy is a decision, not a risk."
        ),
        "problem": (
            "You do not need another chatbot; you need work done end-to-end. An agent that can check your "
            "inventory, draft the reply, update the CRM, and escalate when unsure — reliably, within rules "
            "you set. Most teams get stuck between off-the-shelf assistants that cannot touch real systems "
            "and prototypes that work exactly once."
        ),
        "applications": [
            {"t": "Support triage agents", "d": "Read the ticket, classify, search policy, draft the reply, escalate edge cases."},
            {"t": "Research and monitoring agents", "d": "Watch sources, summarize changes, and alert the right channel."},
            {"t": "Operations agents", "d": "Run recurring checklists across spreadsheets, inboxes, and internal tools."},
            {"t": "Sales assistance agents", "d": "Enrich leads, draft follow-ups, keep the CRM honest between calls."},
            {"t": "Internal helpdesk agents", "d": "Answer policy and how-to questions with citations to your docs."},
            {"t": "Data steward agents", "d": "Detect duplicates and anomalies, propose fixes, log every action."},
        ],
        "scope_in": [
            "Agent architecture: goals, tools, permissions, escalation",
            "Tool and API connections into your existing systems",
            "Evaluation harness against your real cases",
            "Observability: logs, traces, and action history",
            "Human handoff and approval gates",
            "Deployment on infrastructure you choose",
        ],
        "scope_out": [
            "Unsupervised actions on sensitive operations",
            "Access to systems outside the agreed tool list",
            "Ongoing model research or novel algorithm work",
            "Marketing claims of full autonomy — the agent does scoped work",
        ],
        "inputs": [
            "The recurring task, described step by step",
            "Access or sandbox credentials to involved systems",
            "Examples of done-right and done-wrong outcomes",
            "Your rules for when a human must step in",
        ],
        "deliverables": [
            "Working agent, deployed and connected",
            "Architecture and decision-boundary documentation",
            "Evaluation results against your test cases",
            "Runbook for operations and failure modes",
            "Action logs and monitoring setup",
            "Handover session with your team",
        ],
        "integrations": ["Slack", "Google Workspace", "Notion", "HubSpot", "Zendesk", "Your internal APIs"],
        "process": [
            {"t": "Scope the task", "d": "We decompose the work into steps, tools, and decision points."},
            {"t": "Design boundaries", "d": "Permissions, escalation triggers, and approval gates agreed in writing."},
            {"t": "Build and evaluate", "d": "The agent is built against your real cases, with a scored evaluation set."},
            {"t": "Integrate", "d": "Connected to your systems with logging and monitoring on."},
            {"t": "Hand over", "d": "Runbook, docs, and a working session — you operate it, or we scope support."},
        ],
        "faqs": [
            {"q": "How do you stop an agent doing something stupid?", "a": "Boundaries are designed, not hoped for: explicit tool permissions, approval gates on sensitive actions, and evaluation against your failure cases before anything runs unattended."},
            {"q": "Which agent frameworks do you use?", "a": "Whatever fits the job — the framework is an implementation detail we justify in the design doc, not a religion."},
            {"q": "How is this priced?", "a": "As a scoped engagement. After a short discovery we write the scope and quote; nothing is charged before you approve it in writing."},
        ],
        "related": ["agentic-ai-systems", "ai-chatbot-development", "workflow-automation"],
    },
    {
        "slug": "ai-chatbot-development",
        "name": "AI Chatbot Development",
        "num": "02",
        "group": "agents",
        "icon": "chat",
        "short": "LLM-native chatbots that actually know your data — on your site, in your product, or inside your tools.",
        "lede": (
            "Chat interfaces grounded in your real content, with citations, conversation memory, and "
            "clean escalation to a human when the answer is not there."
        ),
        "problem": (
            "Most chatbots are decorative: they apologize, deflect, and never read your actual documentation. "
            "A useful one is grounded in your content, admits when it does not know, hands off gracefully, "
            "and captures what it could not answer so the content gaps get fixed."
        ),
        "applications": [
            {"t": "Website assistants", "d": "Answer product and policy questions with links to your real pages."},
            {"t": "In-product helpers", "d": "Guide users through features without a support ticket."},
            {"t": "Internal knowledge bots", "d": "HR, IT, and ops questions answered from your handbook."},
            {"t": "Lead qualification bots", "d": "Ask, qualify, and book — connected to your CRM."},
            {"t": "Multilingual support", "d": "Same grounded answers across the languages you serve."},
            {"t": "After-hours coverage", "d": "Hold the line overnight with honest handoffs for the morning."},
        ],
        "scope_in": [
            "Conversation design and tone of voice",
            "Retrieval grounding over your approved content",
            "Citation of sources in answers",
            "Escalation and handoff flows",
            "Analytics: unanswered questions and transcripts",
            "Embedding on your site or product",
        ],
        "scope_out": [
            "Fabricated answers when sources are missing — it says so instead",
            "Voice channels (see Voice AI Development)",
            "Content authoring for your knowledge base",
            "Sales-pressure scripts that annoy users",
        ],
        "inputs": [
            "Your source content: docs, FAQ, policies, product pages",
            "Brand voice examples",
            "Escalation destination: email, WhatsApp, or helpdesk",
            "Languages to support",
        ],
        "deliverables": [
            "Deployed chatbot on your chosen surface",
            "Grounded content pipeline with freshness handling",
            "Handoff and escalation configuration",
            "Unanswered-question dashboard",
            "Conversation review workflow",
            "Documentation and handover session",
        ],
        "integrations": ["Website embed", "Slack", "WhatsApp Business", "Zendesk", "Intercom-style helpdesks", "HubSpot"],
        "process": [
            {"t": "Ground", "d": "Your content becomes the retrieval corpus — approved and versioned."},
            {"t": "Design", "d": "Conversation flows, tone, and honest no-answer behavior."},
            {"t": "Build and test", "d": "Tested against real questions from your support history."},
            {"t": "Embed", "d": "Placed on your site or product with analytics on."},
            {"t": "Improve", "d": "Unanswered questions feed content fixes, not prompt excuses."},
        ],
        "faqs": [
            {"q": "Will it invent answers?", "a": "Grounding plus citation plus an explicit no-answer behavior. When the corpus does not contain the answer, it says so and offers the handoff — that is designed, tested behavior."},
            {"q": "Can it capture leads?", "a": "Yes — with your qualification questions, connected to your CRM, and with consent handled per your privacy policy."},
            {"q": "How do we keep it current?", "a": "Content changes flow through the pipeline on a refresh cadence set in scope, and the unanswered dashboard shows exactly where content is missing."},
        ],
        "related": ["nlp-rag-development", "ai-agent-development", "voice-ai-development"],
    },
    {
        "slug": "voice-ai-development",
        "name": "Voice AI Development",
        "num": "03",
        "group": "agents",
        "icon": "mic",
        "short": "Voice agents and call intelligence on your existing telephony — with human handoff as a first-class feature.",
        "lede": (
            "Conversational voice systems that listen, respond, look things up, and transfer to a human — "
            "built with the latency, consent, and privacy realities of real calls designed in from day one."
        ),
        "problem": (
            "Voice is where most AI deployments embarrass themselves: robotic pacing, hallucinated answers, "
            "no ability to actually check or book anything, and no clean way out for the caller. A usable "
            "voice system is an engineering effort across speech, dialogue, and your real systems — not a "
            "phone number wired to a chatbot."
        ),
        "applications": [
            {"t": "Inbound voice assistants", "d": "Answer, qualify, look up status, and book against your calendar."},
            {"t": "Call transcription and QA", "d": "Every call becomes a structured, searchable record."},
            {"t": "Outbound reminders", "d": "Appointment confirmations and follow-ups, consent-permitting."},
            {"t": "Voice-note processing", "d": "WhatsApp and field voice notes turned into structured updates."},
            {"t": "Multilingual voice support", "d": "Serve the languages your callers actually speak."},
            {"t": "After-hours front desk", "d": "Hold the line with honest transfer options."},
        ],
        "scope_in": [
            "Speech-to-text and text-to-speech pipeline",
            "Dialogue design with barge-in and repair handling",
            "Action interfaces: lookups, bookings, transfers",
            "Latency budget engineering end-to-end",
            "Consent, retention, and redaction design",
            "Call analytics and quality dashboards",
        ],
        "scope_out": [
            "Replacing your carrier or phone numbers",
            "Consent and compliance sign-off — that stays with your legal review",
            "Voice cloning of real people without their documented consent",
            "Unattended actions on sensitive accounts",
        ],
        "inputs": [
            "Sample call recordings or scenarios",
            "Systems the voice agent may query or book against",
            "Your consent script and retention rules",
            "Languages and accents to support",
        ],
        "deliverables": [
            "Deployed voice agent or call-intelligence pipeline",
            "Dialogue and action-boundary documentation",
            "Latency and quality measurements",
            "Consent and retention configuration",
            "Handoff and escalation setup",
            "Runbook and handover session",
        ],
        "integrations": ["Your existing telephony", "WhatsApp Business", "Calendars and booking systems", "HubSpot", "Slack"],
        "process": [
            {"t": "Map the call", "d": "Intents, information needs, and handoff points of your real calls."},
            {"t": "Design dialogue", "d": "Flow, tone, repair behavior, and action boundaries agreed in writing."},
            {"t": "Build the pipeline", "d": "Speech, dialogue, actions, and latency engineered together."},
            {"t": "Pilot on real calls", "d": "Measured against quality bars before wider rollout."},
            {"t": "Hand over", "d": "Dashboards, runbook, and operations training."},
        ],
        "faqs": [
            {"q": "How natural will it sound?", "a": "Modern speech systems are genuinely good — but we set expectations in writing from pilot measurements on your calls, not from demo videos."},
            {"q": "What happens when it hits a wall?", "a": "It transfers to a human with full context passed along. Handoff is a designed feature, not a failure state."},
            {"q": "Can it run in our languages?", "a": "Support depends on the language and the speech stack — we validate your specific languages during scoping before you commit."},
        ],
        "related": ["ai-agent-development", "ai-chatbot-development", "workflow-automation"],
    },
    {
        "slug": "generative-ai-development",
        "name": "Generative AI Development",
        "num": "04",
        "group": "applied",
        "icon": "sparkles",
        "short": "Text, image, audio, and video generation systems grounded in your data and your rules.",
        "lede": (
            "Generative systems that hold brand, format, and facts steady — built as pipelines with review "
            "gates, not as prompt lotteries."
        ),
        "problem": (
            "Foundation models are commoditized; the engineering is everything around them. Turning "
            "generation into a dependable business capability means grounding, conditioning, evaluation, "
            "and review flows — so output is consistent, checkable, and actually yours."
        ),
        "applications": [
            {"t": "Brand-consistent image systems", "d": "Conditioned generation with palette and style locks."},
            {"t": "Documented text generation", "d": "Drafts tied to your sources with citations."},
            {"t": "Audio and narration pipelines", "d": "Voiceovers and audio versions from written content."},
            {"t": "Video assembly pipelines", "d": "Script, visuals, and cutdowns from one source piece."},
            {"t": "Data-to-narrative systems", "d": "Reports and summaries generated from structured data."},
            {"t": "Synthetic training material", "d": "Examples and exercises generated for practice systems."},
        ],
        "scope_in": [
            "Model selection and cost engineering",
            "Conditioning: style, format, and brand rules",
            "Grounding and citation where facts matter",
            "Evaluation sets for output quality",
            "Human review and approval flows",
            "Batch and interactive deployment modes",
        ],
        "scope_out": [
            "Deepfake or impersonation work of real people",
            "Generation without provenance logging",
            "Undisclosed synthetic content for deception",
            "Fine-tuning where prompting and conditioning suffice",
        ],
        "inputs": [
            "Reference content and style examples",
            "Volume and format requirements",
            "Quality bar examples: good versus unacceptable",
            "Where outputs will be used and by whom",
        ],
        "deliverables": [
            "Deployed generation pipeline",
            "Conditioning and rule configuration",
            "Evaluation results and quality report",
            "Review and approval workflow",
            "Cost-per-output measurements",
            "Documentation and handover",
        ],
        "integrations": ["Figma", "Google Drive", "Notion", "Your CMS", "Cloud storage"],
        "process": [
            {"t": "Characterize the output", "d": "We define good with your examples — before building."},
            {"t": "Design the pipeline", "d": "Model choice, conditioning, checks, and review gates."},
            {"t": "Build and measure", "d": "Evaluation sets score output against the agreed bar."},
            {"t": "Integrate", "d": "Pipeline plugs into your tools and storage."},
            {"t": "Hand over", "d": "Configuration, cost profile, and maintenance docs."},
        ],
        "faqs": [
            {"q": "Do you fine-tune custom models?", "a": "Only when conditioning and retrieval cannot reach the quality bar. Fine-tuning adds cost and maintenance; we justify it in writing or we do not do it."},
            {"q": "How do we control quality at volume?", "a": "Rule-based checks, evaluation scoring, and sampled human review — configured to your tolerance, with the logs to prove it."},
            {"q": "What does generation cost to run?", "a": "We measure cost-per-output during the build and hand you the profile. Model prices change; your pipeline makes the trade-offs visible."},
        ],
        "related": ["ai-content-video-production", "computer-vision-development", "nlp-rag-development"],
    },
    {
        "slug": "agentic-ai-systems",
        "name": "Multi-Agent Systems",
        "num": "05",
        "group": "agents",
        "icon": "grid",
        "short": "Teams of specialized agents that divide work, check each other, and report — coordinated like a real team.",
        "lede": (
            "When one agent is not enough: planner–worker–critic architectures with shared memory, "
            "explicit contracts between agents, and an audit trail of who did what."
        ),
        "problem": (
            "Complex work overflows a single agent's context and competence. The fix is division of labor — "
            "but naive multi-agent setups turn into chaos: agents contradicting each other, loops that never "
            "terminate, and nobody able to say why the system decided anything. Coordinated multi-agent "
            "systems need contracts, budgets, and supervision, not just more agents."
        ),
        "applications": [
            {"t": "Research crews", "d": "Parallel source gathering, synthesis, and critique on one brief."},
            {"t": "Content factories", "d": "Researcher, drafter, editor, and formatter as a checked assembly line."},
            {"t": "Deal desks", "d": "Enrichment, scoring, and memo drafting across your pipeline."},
            {"t": "Migration assistants", "d": "Agents that extract, transform, and verify in supervised passes."},
            {"t": "Monitoring squads", "d": "Watchers for different sources with one summarizing reporter."},
            {"t": "Simulation harnesses", "d": "Stress-test workflows with synthetic scenarios before rollout."},
        ],
        "scope_in": [
            "Topology design: roles, contracts, and supervision",
            "Shared memory and state management",
            "Inter-agent verification and critic loops",
            "Termination and budget rules",
            "Full execution traces",
            "Failure-mode testing",
        ],
        "scope_out": [
            "Emergent unsupervised behavior — every action path is designed",
            "Agent counts added to look impressive",
            "Skipping evaluation because it worked in a demo",
            "Human-out-of-the-loop operation on sensitive work",
        ],
        "inputs": [
            "The end-to-end workflow, with inputs and expected outputs",
            "Quality criteria for each stage",
            "Volume expectations",
            "Failure cases that must never happen",
        ],
        "deliverables": [
            "Deployed multi-agent system",
            "Topology and contract documentation",
            "Trace and audit dashboards",
            "Failure-mode test results",
            "Cost and token budget profile",
            "Runbook and handover",
        ],
        "integrations": ["Slack", "Google Workspace", "Notion", "Your APIs", "Databases"],
        "process": [
            {"t": "Decompose", "d": "The work is divided into roles with explicit contracts."},
            {"t": "Design supervision", "d": "Verification loops, budgets, and termination rules."},
            {"t": "Build and stress-test", "d": "Failure modes are injected and fixed before rollout."},
            {"t": "Integrate and observe", "d": "Traces and dashboards from the first run."},
            {"t": "Hand over", "d": "Docs, budgets, and operations training."},
        ],
        "faqs": [
            {"q": "When is multi-agent actually needed?", "a": "When work genuinely overflows one agent: distinct competencies, parallelizable stages, or needed cross-checking. Otherwise a single well-built agent is simpler and cheaper — and we will say so."},
            {"q": "How do agents not spiral into loops?", "a": "Explicit budgets and termination rules, plus supervision. Every execution has a trace you can read afterward."},
            {"q": "Is this just hype?", "a": "Partly, in the market. In engineering terms it is an architecture pattern with real costs and real benefits — we scope it only where the pattern pays for itself."},
        ],
        "related": ["ai-agent-development", "workflow-automation", "nlp-rag-development"],
    },
    {
        "slug": "ai-consulting-strategy",
        "name": "AI Consulting & Strategy",
        "num": "06",
        "group": "strategy",
        "icon": "compass",
        "short": "A production-ready AI roadmap for your actual stack — not slideware, and honest about what not to build.",
        "lede": (
            "Where to start, what it costs, what it replaces, and what to skip — a prioritized roadmap "
            "grounded in your workflows, with the first build scoped concretely enough to start."
        ),
        "problem": (
            "Most AI strategy decks are generic maturity models with your logo pasted on. What teams need "
            "is narrower and more useful: which two workflows are worth automating first, what the build "
            "actually involves, what it does not, and a scope document concrete enough to hand to engineers."
        ),
        "applications": [
            {"t": "Automation opportunity mapping", "d": "Workflows ranked by value, feasibility, and risk."},
            {"t": "Build-vs-buy analysis", "d": "Honest make-or-buy calls per capability."},
            {"t": "Vendor and stack review", "d": "What to keep, replace, or stop paying for."},
            {"t": "Data readiness assessment", "d": "Whether your data can support the use case — before you build."},
            {"t": "Team enablement planning", "d": "Who operates what, and what training they need."},
            {"t": "First-build scoping", "d": "The priority use case turned into a concrete scope."},
        ],
        "scope_in": [
            "Workflow discovery sessions with your team",
            "Opportunity matrix: value, feasibility, risk",
            "Build-vs-buy recommendations",
            "Data and integration readiness review",
            "Prioritized roadmap with dependencies",
            "A scoped first engagement, ready to start",
        ],
        "scope_out": [
            "Generic maturity-theater slide decks",
            "Transformation programs with no first build",
            "Reseller commissions on vendor recommendations",
            "Estimates not tied to your observed workflows",
        ],
        "inputs": [
            "Time with the people who do the work",
            "Current tooling and costs",
            "Strategic goals and constraints",
            "Existing AI attempts, honest post-mortems welcome",
        ],
        "deliverables": [
            "Opportunity matrix and prioritized roadmap",
            "Build-vs-buy analysis per use case",
            "Readiness findings, including blockers",
            "Recommended first engagement, fully scoped",
            "Written reasoning for every recommendation",
            "Review session with your leadership",
        ],
        "integrations": ["Works alongside your stack — no specific tooling required"],
        "process": [
            {"t": "Observe", "d": "We watch the real work, not the org chart."},
            {"t": "Analyze", "d": "Opportunities scored on value, feasibility, and risk."},
            {"t": "Recommend", "d": "A roadmap with reasons — including what not to build."},
            {"t": "Scope", "d": "The first engagement written up concretely."},
            {"t": "Review", "d": "Your team challenges it; the roadmap earns sign-off."},
        ],
        "faqs": [
            {"q": "Will you tell us not to use AI?", "a": "Sometimes, for specific workflows, yes — and we will write down why. A roadmap that recommends building everything is a sales document, not a strategy."},
            {"q": "Do you also implement?", "a": "Yes — this is a studio, not a slide shop. But the roadmap stands on its own, and you can take the scope to any builder."},
            {"q": "How long is an engagement?", "a": "Scope documents set milestones and duration per engagement. We do not promise calendar outcomes in marketing copy."},
        ],
        "related": ["ai-mvp-development", "workflow-automation", "ai-integration-services"],
    },
    {
        "slug": "workflow-automation",
        "name": "Workflow Automation",
        "num": "07",
        "group": "data",
        "icon": "flow",
        "short": "Agents and scripts that reason across your tools and handle exceptions — beyond what classic RPA can reach.",
        "lede": (
            "The recurring work between your tools — inboxes, sheets, CRMs, and internal systems — "
            "automated with judgment for the messy cases, and logged for every action."
        ),
        "problem": (
            "Classic automation breaks on the first messy input: the renamed column, the scanned PDF, the "
            "half-filled form. AI-era automation handles those cases with reasoning — and needs the same "
            "discipline as any automation: idempotency, retries, audit logs, and a human queue for the "
            "genuinely weird."
        ),
        "applications": [
            {"t": "Inbox-driven operations", "d": "Orders, applications, and requests processed from email into systems."},
            {"t": "CRM hygiene", "d": "Enrichment, deduplication, and follow-up scheduling on autopilot."},
            {"t": "Report assembly", "d": "Weekly numbers pulled, checked, and drafted into a summary."},
            {"t": "Handoff automation", "d": "Tool-to-tool transfers that used to be a person re-typing."},
            {"t": "Exception triage", "d": "Weird cases flagged, summarized, and routed to the right human."},
            {"t": "Onboarding checklists", "d": "Accounts, access, and docs provisioned from one trigger."},
        ],
        "scope_in": [
            "Workflow mapping and exception inventory",
            "Automation architecture with retries and idempotency",
            "AI reasoning steps where rules cannot reach",
            "Human exception queue design",
            "Full audit logging",
            "Monitoring and failure alerts",
        ],
        "scope_out": [
            "Silent automation of regulated or irreversible actions",
            "Automating a broken process instead of fixing it",
            "One-off scripts with no logging",
            "Automations nobody can explain afterward",
        ],
        "inputs": [
            "The workflow as it actually runs today, exceptions included",
            "Access to the systems involved",
            "Volume figures and peak patterns",
            "Rules for what must stay human",
        ],
        "deliverables": [
            "Deployed automation with monitoring",
            "Workflow and exception documentation",
            "Audit log setup",
            "Exception queue with routing rules",
            "Failure alerting",
            "Runbook and handover",
        ],
        "integrations": ["Google Workspace", "Slack", "Notion", "HubSpot", "Airtable-style bases", "Your internal APIs"],
        "process": [
            {"t": "Map", "d": "The workflow documented with every known exception."},
            {"t": "Redesign", "d": "Steps worth automating separated from steps worth keeping human."},
            {"t": "Build", "d": "Automation with retries, idempotency, and logging from the start."},
            {"t": "Shadow-run", "d": "It runs alongside the humans before it runs alone."},
            {"t": "Hand over", "d": "Monitoring, alerts, and a runbook your team trusts."},
        ],
        "faqs": [
            {"q": "How is this different from RPA?", "a": "RPA clicks the same pixels and breaks on change. This reasons over messy inputs and routes what it cannot resolve. For stable, rule-only work we will still recommend the dumb version — cheaper is better."},
            {"q": "What if it does something wrong?", "a": "Every action is logged and reversible where possible; sensitive actions require approval gates; exceptions route to humans with context attached."},
            {"q": "Do you automate everything?", "a": "No. Part of the scope is deciding what stays human — automating judgment nobody trusts is how projects die."},
        ],
        "related": ["ai-integration-services", "ai-agent-development", "ai-consulting-strategy"],
    },
    {
        "slug": "nlp-rag-development",
        "name": "NLP & RAG Development",
        "num": "08",
        "group": "data",
        "icon": "brain",
        "short": "Retrieval infrastructure and language understanding over your text — measured, cited, and maintained.",
        "lede": (
            "The unglamorous foundation everything else stands on: extraction, classification, search, and "
            "retrieval over your documents — engineered and evaluated, not prompted and prayed over."
        ),
        "problem": (
            "Retrieval-augmented generation is easy to demo and hard to keep honest. Chunking strategy, "
            "hybrid search, reranking, evaluation sets, and no-answer behavior decide whether users trust "
            "the system or quietly stop using it. This capability is that engineering, done properly."
        ),
        "applications": [
            {"t": "Enterprise search", "d": "Hybrid retrieval over your documents with role-aware results."},
            {"t": "Document extraction", "d": "Structured fields and tables from unstructured text."},
            {"t": "Classification pipelines", "d": "Routing and tagging at volume, with confidence scores."},
            {"t": "Question answering", "d": "Citation-first answers over your corpus."},
            {"t": "Deduplication and matching", "d": "Entity resolution across messy records."},
            {"t": "Summarization services", "d": "Consistent condensation for long documents and threads."},
        ],
        "scope_in": [
            "Chunking, embedding, and indexing strategy",
            "Hybrid retrieval and reranking",
            "Evaluation harness with your real queries",
            "No-answer and low-confidence behavior",
            "Freshness and re-indexing design",
            "Access control over retrieved content",
        ],
        "scope_out": [
            "Retrieval without evaluation — we do not ship unmeasured",
            "One corpus to rule them all, ignoring access roles",
            "Fine-tuning where retrieval quality is the real problem",
            "Answer generation with no citations",
        ],
        "inputs": [
            "The document corpus and its access rules",
            "Real questions your team asks",
            "Examples of correct and incorrect answers",
            "Freshness requirements",
        ],
        "deliverables": [
            "Deployed retrieval pipeline",
            "Evaluation report against your query set",
            "Indexing and freshness configuration",
            "No-answer behavior documentation",
            "Corpus health dashboard",
            "Runbook and handover",
        ],
        "integrations": ["Notion", "Google Drive", "Confluence", "SharePoint", "Databases", "Your APIs"],
        "process": [
            {"t": "Corpus audit", "d": "Sources, quality, access rules, and gaps assessed."},
            {"t": "Pipeline design", "d": "Chunking, retrieval, and reranking chosen against your content."},
            {"t": "Evaluate", "d": "Your real queries become the scored test set."},
            {"t": "Guardrail", "d": "Citations, confidence, and no-answer behavior configured."},
            {"t": "Hand over", "d": "Dashboards, freshness rules, and maintenance docs."},
        ],
        "faqs": [
            {"q": "Is RAG already obsolete?", "a": "No — it keeps evolving, and the fundamentals (retrieval quality, evaluation, honesty) keep mattering. We build against current best practice and keep the model layer replaceable."},
            {"q": "How do you measure quality?", "a": "With an evaluation set built from your real questions, scored on retrieval hit quality and answer faithfulness. The report is a deliverable, not an internal artifact."},
            {"q": "Can it respect our permissions?", "a": "Yes — retrieval is filtered by the access rules of the querying user. Security review of the design is part of handover."},
        ],
        "related": ["ai-integration-services", "ai-chatbot-development", "generative-ai-development"],
    },
    {
        "slug": "computer-vision-development",
        "name": "Computer Vision Development",
        "num": "09",
        "group": "applied",
        "icon": "eye",
        "short": "Vision systems with real latency budgets — inspection, detection, OCR, and visual generation.",
        "lede": (
            "Systems that see: quality inspection, document reading, measurement, and visual generation — "
            "engineered against the accuracy and latency your operation actually requires."
        ),
        "problem": (
            "Vision demos run on curated videos; production runs on your lighting, your camera angles, and "
            "your edge cases. The work is data capture, annotation, model selection, and an explicit "
            "accuracy-latency-cost triangle — with a human queue for the frames the system is unsure about."
        ),
        "applications": [
            {"t": "Visual quality inspection", "d": "Defect and anomaly detection on production lines."},
            {"t": "Document and scene OCR", "d": "Text extraction from photos, scans, and video frames."},
            {"t": "Object counting and measurement", "d": "Inventory, footfall, and dimension checks."},
            {"t": "Image generation and editing", "d": "Visual pipelines with conditioning and control."},
            {"t": "Safety and compliance monitoring", "d": "PPE checks and zone alerts, consent permitting."},
            {"t": "Edge-deployed vision", "d": "On-device processing where connectivity or privacy demands it."},
        ],
        "scope_in": [
            "Data capture and annotation strategy",
            "Model selection against accuracy-latency-cost",
            "Confidence thresholds and human review queues",
            "Deployment: cloud or edge hardware",
            "Drift monitoring and retraining cadence",
            "Performance reporting against your bar",
        ],
        "scope_out": [
            "Surveillance of identifiable people without a lawful basis",
            "Biometric identification systems",
            "Accuracy promises not measured on your data",
            "Vision systems without a fallback queue",
        ],
        "inputs": [
            "Representative imagery or camera access",
            "The decision each detection drives",
            "Your accuracy bar and latency budget",
            "Failure examples that must be caught",
        ],
        "deliverables": [
            "Deployed vision system on your chosen target",
            "Accuracy and latency measurements on your data",
            "Confidence and review queue configuration",
            "Drift monitoring setup",
            "Deployment documentation",
            "Runbook and handover",
        ],
        "integrations": ["Camera feeds", "PLC and line systems where relevant", "Cloud or edge runtimes", "Alerting into Slack"],
        "process": [
            {"t": "Frame the problem", "d": "The decision, the accuracy bar, and the latency budget defined."},
            {"t": "Data work", "d": "Capture and annotation against your real conditions."},
            {"t": "Model and measure", "d": "Candidates scored on your data, not public benchmarks."},
            {"t": "Deploy", "d": "Cloud or edge, with monitoring and drift alerts."},
            {"t": "Hand over", "d": "Thresholds, queue rules, and retraining cadence."},
        ],
        "faqs": [
            {"q": "What accuracy can we expect?", "a": "The only honest answer is measured on your data under your conditions — which is exactly what the evaluation deliverable is. Public benchmark numbers are not transferable."},
            {"q": "Can it run on our hardware?", "a": "Often yes. Edge deployment is a scoping question we answer with measurements on your target device before you commit."},
            {"q": "What about privacy?", "a": "Scopes exclude people-identification work, and monitoring deployments require a lawful basis and consent design you confirm with your own legal review."},
        ],
        "related": ["generative-ai-development", "nlp-rag-development", "ai-integration-services"],
    },
    {
        "slug": "ai-content-video-production",
        "name": "AI Content & Video Production",
        "num": "10",
        "group": "applied",
        "icon": "film",
        "short": "Multi-format content and video pipelines — research to script to cut — with editorial control throughout.",
        "lede": (
            "Content operations at sustainable volume: researched scripts, narrated audio, assembled video, "
            "and platform-specific cutdowns — flowing through review gates your editors control."
        ),
        "problem": (
            "Every platform wants its own format, and your team cannot produce nine variants of everything. "
            "The answer is not lower standards — it is a pipeline: one well-researched source piece, expanded "
            "and assembled into every format, with humans approving what ships."
        ),
        "applications": [
            {"t": "Video series production", "d": "Scripted, narrated, and assembled episodes from your material."},
            {"t": "Course and tutorial video", "d": "Teaching content produced from your existing documentation."},
            {"t": "Product marketing cutdowns", "d": "One film becomes platform-sized variants."},
            {"t": "Narrated audio versions", "d": "Articles and reports as listenable editions."},
            {"t": "Social format factories", "d": "Short-form variants under brand and tone rules."},
            {"t": "Localizations", "d": "Language variants with consistent terminology handling."},
        ],
        "scope_in": [
            "Source research and scripting pipeline",
            "Voice synthesis or narration workflow",
            "Visual assembly and template system",
            "Editorial review gates",
            "Format expansion rules",
            "Publishing and scheduling hooks",
        ],
        "scope_out": [
            "Publishing without human approval",
            "Synthetic replicas of real people's voices or likeness",
            "Undisclosed AI-generated media presented as recorded fact",
            "Volume targets used to justify quality collapse",
        ],
        "inputs": [
            "Source material and expertise access",
            "Brand and tone references",
            "Format and platform targets",
            "Editorial standards and examples",
        ],
        "deliverables": [
            "Deployed content pipeline",
            "Script and assembly templates",
            "Review workflow configuration",
            "Sample production batch",
            "Cost-per-piece profile",
            "Runbook and handover",
        ],
        "integrations": ["Your CMS", "YouTube and podcast feeds", "Scheduling tools", "Notion", "Google Drive"],
        "process": [
            {"t": "Source", "d": "Research and expertise captured as the grounding corpus."},
            {"t": "Script", "d": "Outline-first scripts approved before production."},
            {"t": "Produce", "d": "Narration, visuals, and assembly per template."},
            {"t": "Review", "d": "Editors approve or bounce every piece."},
            {"t": "Publish", "d": "Formats pushed to their channels, tracked."},
        ],
        "faqs": [
            {"q": "Is AI-generated video actually good enough?", "a": "For many formats — narrated explainers, product cutdowns, social variants — yes, with the right pipeline. For brand-defining hero films, no. The scope reflects which is which."},
            {"q": "How do we keep it from sounding generic?", "a": "Encoded voice rules, grounding in your real material, and an editor with a bounce button. Generic is a process failure, not a technology limit."},
            {"q": "What does disclosure look like?", "a": "Synthetic media is labeled as such wherever it runs — configured per platform norms and your policy."},
        ],
        "related": ["generative-ai-development", "workflow-automation", "ai-integration-services"],
    },
    {
        "slug": "ai-integration-services",
        "name": "AI Integrations",
        "num": "11",
        "group": "data",
        "icon": "plug",
        "short": "AI wired into the tools you already run — without breaking them, and without lock-in.",
        "lede": (
            "The unglamorous work that makes AI real: connecting models and agents to your CRM, ERP, "
            "inboxes, and internal tools — with retries, monitoring, and clean failure behavior."
        ),
        "problem": (
            "The demo skipped the part where the model writes back to your system of record. Integrations "
            "are where AI projects die: flaky APIs, undocumented endpoints, permission models, and the "
            "email thread from 2019 that explains the legacy field. This capability is that work, done "
            "boringly and correctly."
        ),
        "applications": [
            {"t": "CRM and helpdesk connections", "d": "AI reads and writes where your team already works."},
            {"t": "Legacy system bridges", "d": "Old ERPs and internal tools reached safely through adapters."},
            {"t": "Data pipeline plumbing", "d": "Reliable flows between databases, sheets, and AI services."},
            {"t": "Model gateway setup", "d": "One controlled route to multiple model providers."},
            {"t": "Webhook and event wiring", "d": "Triggers across systems with delivery guarantees."},
            {"t": "Access and secret management", "d": "Credentials handled like they matter."},
        ],
        "scope_in": [
            "API audit of the systems involved",
            "Integration architecture with retries and idempotency",
            "Permission and secret handling",
            "Monitoring and alerting on every route",
            "Documentation your future devs can read",
            "Handover with failure-mode walkthrough",
        ],
        "scope_out": [
            "Shared admin credentials as a shortcut",
            "Fire-and-forget writes to systems of record",
            "Integrations without logging or alerts",
            "Replacing systems that need replacing",
        ],
        "inputs": [
            "Access to the systems and their API documentation",
            "A technical contact on your side",
            "The workflows the integration serves",
            "Tolerance for rate limits and quirks",
        ],
        "deliverables": [
            "Deployed integrations with monitoring",
            "Architecture diagrams and docs",
            "Retry, idempotency, and failure behavior",
            "Secrets and access audit trail",
            "Runbook for each route",
            "Handover session",
        ],
        "integrations": ["HubSpot", "Salesforce", "Zendesk", "Google Workspace", "Legacy ERPs via adapters", "Your internal APIs"],
        "process": [
            {"t": "Audit", "d": "The real APIs, permissions, and quirks documented."},
            {"t": "Architect", "d": "Routes, retries, and failure behavior designed."},
            {"t": "Build", "d": "Integration built with logging from the first request."},
            {"t": "Soak", "d": "Runs against real traffic before anyone depends on it."},
            {"t": "Hand over", "d": "Docs, alerts, and a walkthrough of failure modes."},
        ],
        "faqs": [
            {"q": "Our system has no API — now what?", "a": "There are usually more options than it appears: file drops, email parsing, database access, or screen-level adapters. We assess honestly in discovery, including when the answer is fix the system first."},
            {"q": "Do you use our credentials?", "a": "Scoped service accounts where possible, secrets stored properly, and an access trail. Shared admin logins are a red flag we refuse."},
            {"q": "Who maintains it?", "a": "You can — that is what the docs and alerts are for — or we scope a support arrangement. Either way, the handover is real."},
        ],
        "related": ["workflow-automation", "nlp-rag-development", "ai-mvp-development"],
    },
    {
        "slug": "ai-mvp-development",
        "name": "AI MVP Development",
        "num": "12",
        "group": "strategy",
        "icon": "rocket",
        "short": "A production-grade AI MVP — web, mobile, or internal tool — built to test the real hypothesis.",
        "lede": (
            "An MVP that answers your actual question — with real users, real data, and a build that "
            "survives contact with production. Scoped, documented, and yours."
        ),
        "problem": (
            "Most AI MVPs test the wrong hypothesis: a chat wrapper with no users instead of the risky "
            "assumption of your business. A useful MVP is a product decision — what to build, what to fake, "
            "what to measure — executed in engineering that does not collapse at the first demo-to-investor "
            "moment."
        ),
        "applications": [
            {"t": "AI-first product MVPs", "d": "The core loop of your product, built to be tested by real users."},
            {"t": "Internal AI tools", "d": "The tool your team keeps patching with spreadsheets, built properly."},
            {"t": "AI SaaS first releases", "d": "Multi-tenant foundations with billing and auth from day one."},
            {"t": "Web and mobile AI apps", "d": "Interfaces where your users actually are."},
            {"t": "Investor-demo builds", "d": "Demos that show the engine, not a canned video."},
            {"t": "Validation harnesses", "d": "Instrumented builds that measure the hypothesis, not vanity metrics."},
        ],
        "scope_in": [
            "Product scoping: hypothesis, users, success metrics",
            "Web or mobile application build",
            "AI pipeline integration into the product",
            "Auth, billing basics, and deployment",
            "Instrumentation for the real metrics",
            "Handover with documentation and repo",
        ],
        "scope_out": [
            "Feature accumulation without a hypothesis",
            "Dark patterns to inflate engagement metrics",
            "Unmaintainable demo-grade code presented as production",
            "Equity-for-work or revenue-share arrangements",
        ],
        "inputs": [
            "The hypothesis you are testing",
            "Access to real or representative users",
            "Design references or brand assets if they exist",
            "Constraints: budget band, timeline needs, compliance",
        ],
        "deliverables": [
            "Deployed MVP on production infrastructure",
            "Source repository, documented",
            "Architecture and handover documentation",
            "Instrumentation dashboard for the success metrics",
            "Known-limitations memo — written, not implied",
            "Post-MVP decision review",
        ],
        "integrations": ["Web and mobile deployment targets", "Model providers", "Your existing systems", "Payment providers where relevant"],
        "process": [
            {"t": "Sharpen the hypothesis", "d": "The MVP exists to test one thing — we define it."},
            {"t": "Scope the cut", "d": "What is built, what is faked, what is measured."},
            {"t": "Build in milestones", "d": "Demoable increments, no big-bang reveal."},
            {"t": "Instrument and ship", "d": "Real users, real metrics, production plumbing."},
            {"t": "Review the decision", "d": "The data answers the hypothesis — then you decide."},
        ],
        "faqs": [
            {"q": "Can you build the full product after the MVP?", "a": "The MVP is scoped so it can grow — but whether we scale it, your team does, or anyone else does is a decision the validation data should inform."},
            {"q": "Who owns the code?", "a": "You do — repository, infrastructure, and documentation transfer at handover. No hostage situations."},
            {"q": "Web, mobile, or both?", "a": "Whichever the hypothesis demands. Cross-platform where it genuinely serves the test, not for its own sake."},
        ],
        "related": ["ai-consulting-strategy", "ai-integration-services", "agentic-ai-systems"],
    },
]
