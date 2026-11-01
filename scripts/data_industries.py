# -*- coding: utf-8 -*-
"""ReWoo site content — Industries (10).

Framing rule: these describe POSSIBLE workflows per industry — a discovery
aid, not a claim of past client work. No invented histories, certifications,
or regulatory approvals. Compliance is framed as design responsibility that
the client's own review confirms.
"""

INDUSTRIES = [
    {
        "slug": "ecommerce-retail",
        "name": "Commerce & Retail",
        "icon": "cart",
        "short": "Catalog, campaign, and support operations that keep pace with the season.",
        "context": (
            "Commerce teams drown in seasonal work: catalogs to refresh, campaigns to launch, and a support "
            "queue that spikes exactly when everyone is busy. The workflows below are where AI systems "
            "typically pay for themselves fastest — scoped around your stack, not a generic commerce bot."
        ),
        "workflows": [
            {"t": "Catalog refresh", "steps": ["Feed product data and brand rules in", "Generate on-brand imagery and copy variants", "Review queue approves", "Push to store at channel sizes"], "note": "Builds on Visual Production Systems."},
            {"t": "Support deflection with honesty", "steps": ["Ground an assistant in policies and order data", "Answer tracking, returns, and sizing questions", "Escalate edge cases with context"], "note": "Builds on AI Chatbot Development."},
            {"t": "Campaign variant factory", "steps": ["One researched source piece", "Expand to channel formats", "Editorial approval gates", "Scheduled publishing"], "note": "Builds on Content Generation Pipelines."},
        ],
        "capabilities": ["ai-chatbot-development", "generative-ai-development", "ai-content-video-production", "workflow-automation"],
        "systems": ["visual-production", "content-pipelines"],
        "considerations": (
            "Product data quality decides most of the outcome — a data readiness check is part of scoping. "
            "Marketplace and ad-platform rules on AI-generated media change often; we configure labeling to "
            "your policy and the platform norms you operate under."
        ),
    },
    {
        "slug": "education-edtech",
        "name": "Education & EdTech",
        "icon": "book",
        "short": "Assessment, tutoring support, and content operations for learning products.",
        "context": (
            "Learning teams need more assessment than experts can write, more feedback than tutors can give, "
            "and more content than budgets allow. AI systems help on all three — with the pedagogy kept "
            "human and the machine doing volume, not judgment."
        ),
        "workflows": [
            {"t": "Question bank at scale", "steps": ["Import your course material", "Generate taxonomy-mapped drafts", "Expert review and calibration", "Deploy with item analytics"], "note": "Builds on Assessment & Training Systems."},
            {"t": "Practice with feedback", "steps": ["Learner attempts task", "Rubric-based feedback drafted", "Weak topics trigger targeted drills"], "note": "Builds on Assessment & Training Systems plus agents."},
            {"t": "Course content operations", "steps": ["Expert knowledge captured once", "Outline-first drafts", "Editor approval", "Publish in course formats"], "note": "Builds on Content Generation Pipelines."},
        ],
        "capabilities": ["nlp-rag-development", "generative-ai-development", "ai-agent-development"],
        "systems": ["assessment-systems", "content-pipelines", "knowledge-retrieval"],
        "considerations": (
            "Academic-integrity policies vary by institution and region — detection-and-punish tools are not "
            "something we build. Learner data handling is designed around your policies and the age of your "
            "learners, with your review confirming the final configuration."
        ),
    },
    {
        "slug": "financial-services",
        "name": "Financial Services",
        "icon": "chart",
        "short": "Document processing, voice intelligence, and knowledge retrieval for regulated operations.",
        "context": (
            "Financial operations run on documents, calls, and precise answers — under rules that punish "
            "sloppiness. The workflows below are typical targets; every one of them is built with audit "
            "trails, human exception queues, and your compliance review in the loop."
        ),
        "workflows": [
            {"t": "KYC and onboarding document intake", "steps": ["Documents ingested from any channel", "Fields extracted to schema", "Confidence flags route to humans", "Full source-to-field audit trail"], "note": "Builds on Document Intelligence."},
            {"t": "Call intelligence for advisory and support", "steps": ["Calls transcribed and summarized", "Commitments extracted to CRM", "QA sampling with consent flows"], "note": "Builds on Voice & Communication Intelligence."},
            {"t": "Policy-grounded answers for staff", "steps": ["Procedure corpus indexed with roles", "Citation-first answers", "Unanswered questions reported"], "note": "Builds on Knowledge Search & Retrieval."},
        ],
        "capabilities": ["nlp-rag-development", "voice-ai-development", "workflow-automation", "ai-integration-services"],
        "systems": ["document-intelligence", "voice-intelligence", "knowledge-retrieval"],
        "considerations": (
            "We design for auditability — every field traceable, every action logged, every escalation "
            "recorded. Regulatory sign-off itself stays with your compliance and legal functions; we hand "
            "over the design and the logs they will ask for."
        ),
    },
    {
        "slug": "healthcare-life-sciences",
        "name": "Healthcare & Life Sciences",
        "icon": "heart",
        "short": "Administrative and operational support only — clinical judgment stays with clinicians.",
        "context": (
            "Healthcare operations carry heavy administrative load: intake documents, scheduling, referral "
            "notes, and staff training. AI systems can carry that load carefully. What they must not do is "
            "practice medicine — and our scopes are written accordingly."
        ),
        "workflows": [
            {"t": "Intake and referral document processing", "steps": ["Faxes, scans, and forms ingested", "Structured extraction with confidence flags", "Human exception queue with source view", "Write-back to practice systems"], "note": "Builds on Document Intelligence."},
            {"t": "Staff training and competency checking", "steps": ["Protocols become question banks", "Staff drilled with adaptive paths", "Completions reported with evidence"], "note": "Builds on Assessment & Training Systems."},
            {"t": "Front-desk voice handling", "steps": ["Calls answered and transcribed", "Bookings made against rules", "Consent flows and retention limits designed in"], "note": "Builds on Voice & Communication Intelligence."},
        ],
        "capabilities": ["nlp-rag-development", "voice-ai-development", "workflow-automation"],
        "systems": ["document-intelligence", "assessment-systems", "voice-intelligence"],
        "considerations": (
            "Scope rule: administrative and operational support, not diagnosis, triage, or clinical advice. "
            "Patient-data handling follows your lawful basis and your jurisdiction's rules; retention, "
            "redaction, and consent designs are handed to your compliance review before anything touches "
            "real data."
        ),
    },
    {
        "slug": "manufacturing-supply-chain",
        "name": "Manufacturing & Supply Chain",
        "icon": "wrench",
        "short": "Document flow, quality vision, and procedure retrieval on the factory side.",
        "context": (
            "Manufacturing runs on paper that must become data: purchase orders, spec sheets, inspection "
            "records. It runs on tribal knowledge locked in SOPs nobody can find. And it runs on lines where "
            "a vision system can watch what no one has time to watch."
        ),
        "workflows": [
            {"t": "Invoice and PO reconciliation", "steps": ["Supplier documents ingested", "Line items extracted and matched", "Mismatches flagged to buyers", "Clean data to ERP"], "note": "Builds on Document Intelligence."},
            {"t": "Visual quality inspection", "steps": ["Line cameras capture", "Defect detection against your bar", "Unsure frames queued to inspectors", "Drift monitored"], "note": "Builds on Computer Vision Development."},
            {"t": "SOP and spec retrieval", "steps": ["Procedures indexed with roles", "Shift-floor questions answered with citations", "Gaps reported"], "note": "Builds on Knowledge Search & Retrieval."},
        ],
        "capabilities": ["nlp-rag-development", "computer-vision-development", "ai-integration-services"],
        "systems": ["document-intelligence", "knowledge-retrieval", "design-visualization"],
        "considerations": (
            "Line integration respects your uptime: vision systems shadow-run beside inspectors before "
            "anyone depends on them, and edge deployment is available where connectivity or confidentiality "
            "demands it. Worker-monitoring use cases require a lawful basis and consent design you confirm."
        ),
    },
    {
        "slug": "media-entertainment",
        "name": "Media & Entertainment",
        "icon": "film",
        "short": "Content pipelines and visual production that hold editorial standards at volume.",
        "context": (
            "Media teams face the nine-format problem: every story wants an article, a video, a thread, and "
            "a clip — produced by a newsroom that shrank twice. Pipelines keep the standards; the machine "
            "does the variants."
        ),
        "workflows": [
            {"t": "Multi-format story production", "steps": ["One researched source piece", "Format expansion under style rules", "Editor approval gates", "Channel publishing"], "note": "Builds on Content Generation Pipelines."},
            {"t": "Archive retrieval and research", "steps": ["Archive indexed for hybrid search", "Reporters ask, citations return", "Rights and usage metadata respected"], "note": "Builds on Knowledge Search & Retrieval."},
            {"t": "Promo asset generation", "steps": ["Brand contract locked", "Campaign visuals generated in batches", "Review queue approves"], "note": "Builds on Visual Production Systems."},
        ],
        "capabilities": ["ai-content-video-production", "generative-ai-development", "nlp-rag-development"],
        "systems": ["content-pipelines", "visual-production"],
        "considerations": (
            "Disclosure matters in editorial contexts: synthetic media and machine-assisted copy are "
            "labeled per your editorial policy and platform norms. Editorial control is a design rule — "
            "nothing publishes without a human approval step."
        ),
    },
    {
        "slug": "real-estate-proptech",
        "name": "Real Estate & PropTech",
        "icon": "building",
        "short": "Listing production, inquiry handling, and portfolio document operations.",
        "context": (
            "Listings are visual products on a deadline, inquiries arrive at all hours, and transactions "
            "generate document piles measured in reams. All three are systematizable without losing the "
            "personal touch that closes deals."
        ),
        "workflows": [
            {"t": "Listing visual production", "steps": ["Property photos and brand rules in", "Variations and staging concepts generated", "Agent review and selection", "Portal-ready exports"], "note": "Builds on Visual Production Systems and Design Visualization."},
            {"t": "Inquiry qualification", "steps": ["Chat and voice assistants grounded in listing data", "Qualification questions asked politely", "Viewings booked to agent calendars"], "note": "Builds on chatbot and voice capabilities."},
            {"t": "Transaction document flow", "steps": ["Contracts and forms ingested", "Key dates and fields extracted", "Human exception queue", "CRM and file updated"], "note": "Builds on Document Intelligence."},
        ],
        "capabilities": ["ai-chatbot-development", "voice-ai-development", "nlp-rag-development"],
        "systems": ["visual-production", "design-visualization", "document-intelligence"],
        "considerations": (
            "Generated staging visuals are labeled as such — misleading property imagery is a line we do "
            "not cross, and listing-portal rules on AI imagery are configured per platform."
        ),
    },
    {
        "slug": "software-saas",
        "name": "Software & SaaS",
        "icon": "code",
        "short": "AI features, support deflection, and internal knowledge for product teams.",
        "context": (
            "Every SaaS roadmap now has an AI feature row, and every support team has tier-one questions "
            "a grounded assistant could answer. The engineering question is which AI features create real "
            "value versus checkbox features — and shipping the former well."
        ),
        "workflows": [
            {"t": "AI feature build-out", "steps": ["Hypothesis sharpened", "MVP scoped with metrics", "Built in milestones", "Instrumented and shipped"], "note": "Builds on AI MVP Development."},
            {"t": "Support deflection", "steps": ["Docs and tickets ground an assistant", "Cited answers in-product", "Edge cases escalate with context"], "note": "Builds on AI Chatbot Development."},
            {"t": "Internal engineering knowledge", "steps": ["Repos, runbooks, and decisions indexed", "Citation-first answers in Slack", "Unanswered questions reported"], "note": "Builds on Knowledge Search & Retrieval."},
        ],
        "capabilities": ["ai-mvp-development", "ai-chatbot-development", "nlp-rag-development", "ai-integration-services"],
        "systems": ["knowledge-retrieval", "assessment-systems"],
        "considerations": (
            "AI features carry unit costs — we measure cost-per-action and hand you the profile, because "
            "margin mathematics at scale is a product decision you should make with real numbers."
        ),
    },
    {
        "slug": "hospitality-travel",
        "name": "Hospitality & Travel",
        "icon": "globe",
        "short": "Booking flows, guest communication, and review intelligence across languages.",
        "context": (
            "Guests write at midnight in six languages about bookings made on three platforms. Hospitality "
            "runs on responsiveness — and responsiveness is exactly what grounded assistants and voice "
            "systems do well, with a clean handoff to your staff when judgment is needed."
        ),
        "workflows": [
            {"t": "Multilingual guest assistance", "steps": ["Property knowledge grounded", "Guest questions answered in their language", "Human handoff with context"], "note": "Builds on AI Chatbot Development."},
            {"t": "Booking-line voice handling", "steps": ["Calls answered and transcribed", "Availability checked live", "Reservations confirmed or escalated"], "note": "Builds on Voice & Communication Intelligence."},
            {"t": "Review and feedback intelligence", "steps": ["Reviews aggregated and classified", "Themes and recurring issues surfaced", "Response drafts for approval"], "note": "Builds on NLP & RAG development."},
        ],
        "capabilities": ["ai-chatbot-development", "voice-ai-development", "nlp-rag-development"],
        "systems": ["voice-intelligence", "knowledge-retrieval"],
        "considerations": (
            "Tone is the product in hospitality — assistants are tuned on your voice examples, and anything "
            "affecting reservations escalates to staff. Channel rules (WhatsApp, OTA messaging) are handled "
            "per platform policy."
        ),
    },
    {
        "slug": "sports-technology",
        "name": "Sports Technology",
        "icon": "trophy",
        "short": "Performance-video pipelines, fan content operations, and club knowledge systems.",
        "context": (
            "Sport produces video at an impossible rate — training, matches, clips — and fan appetites for "
            "formats exceed any content team. Performance analysis support and content pipelines are where "
            "systems typically fit."
        ),
        "workflows": [
            {"t": "Clip and highlight pipeline", "steps": ["Footage ingested", "Moment detection configured", "Cutdowns assembled per format", "Editor approval and publishing"], "note": "Builds on AI Content & Video Production."},
            {"t": "Fan-facing content variants", "steps": ["Match source material in", "Platform variants generated under brand rules", "Review queue approves"], "note": "Builds on Content Generation Pipelines."},
            {"t": "Club knowledge retrieval", "steps": ["Playbooks, medical protocols, and policies indexed by role", "Citation-first answers", "Access rules enforced"], "note": "Builds on Knowledge Search & Retrieval."},
        ],
        "capabilities": ["computer-vision-development", "ai-content-video-production", "nlp-rag-development"],
        "systems": ["content-pipelines", "knowledge-retrieval"],
        "considerations": (
            "Athlete performance data and medical protocols are sensitive: retrieval is role-filtered and "
            "deployment options include infrastructure you control. Broadcast-rights footage boundaries are "
            "respected in every pipeline we scope."
        ),
    },
]
