# -*- coding: utf-8 -*-
"""ReWoo site content — System families (7).

All copy is original ReWoo content written for this build. Framing rule: these
are solution families ReWoo designs and builds to order — scoped engagements,
not an off-the-shelf SaaS subscription. No invented metrics, clients, or claims.
"""

FORMAT_NOTE = (
    "Scoped build. This is a solution family ReWoo designs and builds to order — not an "
    "off-the-shelf subscription. Every deployment is shaped around your stack, your data "
    "rules, and your team, and the scope is written down before anything is charged."
)

SYSTEMS = [
    {
        "slug": "visual-production",
        "name": "Visual Production Systems",
        "category": "Creative infrastructure",
        "icon": "sparkles",
        "short": "Brand-safe image generation pipelines that turn one brief into a full set of on-brand visuals.",
        "lede": (
            "A controlled pipeline for producing, varying, and quality-checking images at volume — "
            "so creative teams stop waiting on photoshoots, stock libraries, and off-brand AI output."
        ),
        "customers": [
            {"t": "Commerce and retail brands", "d": "Teams that need hundreds of product, lifestyle, and campaign variations every season."},
            {"t": "Agencies and studios", "d": "Creative teams pitching concepts and producing client assets under tight review cycles."},
            {"t": "Solo founders and small teams", "d": "Operators who need a real visual identity without a creative department."},
        ],
        "problems": [
            {"t": "Images slow every launch", "d": "Photography, retouching, and licensing become the long pole on every campaign and catalog update."},
            {"t": "Generic AI output drifts off-brand", "d": "Raw prompts give you the wrong palette, the wrong mood, and a different subject in every frame."},
            {"t": "Review is chaos", "d": "Files scatter across chats and drives; nobody knows which version was approved or where it went."},
        ],
        "features": [
            {"t": "Brand-conditioned generation", "d": "Style references, palette locks, and exclusion rules baked into the pipeline, not the prompt."},
            {"t": "Variation at volume", "d": "One subject becomes full sets — contexts, seasons, formats — generated in controlled batches."},
            {"t": "Template library", "d": "Reusable, documented generation templates so the look survives team changes."},
            {"t": "Automatic brand checks", "d": "Output is screened against your rules before a human ever sees it."},
            {"t": "Review queue", "d": "Approve, reject, or regenerate with comments — every decision kept on record."},
            {"t": "Rights and provenance log", "d": "Each asset carries its generation settings and approval trail."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Lock the brand contract", "d": "We turn your references, palette, and exclusions into pipeline rules."},
                {"t": "Compose the templates", "d": "Generation templates are built for your recurring asset types."},
                {"t": "Generate and auto-check", "d": "Batches run through the brand rules; failures never reach review."},
                {"t": "Human review queue", "d": "Your team approves, rejects, or regenerates — with a full trail."},
                {"t": "Export and publish", "d": "Approved assets export at the exact sizes your channels need."},
            ],
        },
        "integrations": ["Shopify", "WooCommerce", "Figma", "Google Drive", "Notion", "Ad-platform size presets"],
        "industries": ["ecommerce-retail", "media-entertainment", "real-estate-proptech"],
        "capabilities": ["generative-ai-development", "computer-vision-development", "ai-content-video-production"],
        "faqs": [
            {"q": "Is this a replacement for stock photography?", "a": "No — it is your brand and your subjects, generated under your rules, with provenance logged for every asset. It replaces the bottleneck, not your creative direction."},
            {"q": "Do you train a custom model on our brand?", "a": "We usually start from strong foundation models plus conditioning and reference techniques. Custom fine-tuning is only proposed when the scope genuinely justifies it."},
            {"q": "Who owns the output?", "a": "You do. Ownership of generated assets and the pipeline configuration is written into the engagement scope."},
        ],
    },
    {
        "slug": "voice-intelligence",
        "name": "Voice & Communication Intelligence",
        "category": "Voice",
        "icon": "mic",
        "short": "Transcription, summarization, and routing for calls and voice notes — with an optional voice agent on top.",
        "lede": (
            "Every call, meeting, and voice note becomes structured information: transcripts, summaries, "
            "action items, and routing into the tools your team already runs."
        ),
        "customers": [
            {"t": "Support and sales teams", "d": "Teams that live on calls and lose the content of every conversation the moment it ends."},
            {"t": "Service businesses", "d": "Clinics, showrooms, and agencies where booking and follow-up happen over the phone or WhatsApp voice notes."},
            {"t": "Operations leads", "d": "Anyone responsible for quality checks, coaching, and handoffs across a distributed team."},
        ],
        "problems": [
            {"t": "Calls vanish when they end", "d": "No transcript, no summary, no action items — the value of the conversation evaporates."},
            {"t": "Notes-to-CRM is manual", "d": "Someone re-types every outcome into the CRM by hand, late, and inconsistently."},
            {"t": "Voice bots over-promise", "d": "Most AI receptionists sound robotic and cannot actually check, book, or hand off anything."},
        ],
        "features": [
            {"t": "Transcription, live or after the fact", "d": "Accurate speech-to-text across accents, on calls, meetings, and voice notes."},
            {"t": "Summaries with action items", "d": "Structured outcomes — decisions, commitments, follow-ups — pushed where your team works."},
            {"t": "Intent and sentiment tagging", "d": "Calls classified automatically for routing, coaching, and trend reporting."},
            {"t": "Routing rules", "d": "Escalations, bookings, and handoffs handled by explicit rules you control."},
            {"t": "Optional voice agent", "d": "A scoped conversational voice agent that answers, looks things up, and transfers to a human."},
            {"t": "Privacy controls", "d": "Retention limits, redaction, and consent flows designed around your obligations."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Capture", "d": "Calls, meetings, and voice notes flow in from your existing channels."},
                {"t": "Transcribe", "d": "Audio becomes clean, timestamped text."},
                {"t": "Extract", "d": "Summaries, entities, sentiment, and action items come out in a fixed schema."},
                {"t": "Route", "d": "CRM updates, task creation, or escalations happen by your rules."},
                {"t": "Review and learn", "d": "Corrections feed back into prompts and rules, so quality compounds."},
            ],
        },
        "integrations": ["Your existing telephony", "HubSpot", "Zoho", "Google Meet", "Zoom", "WhatsApp Business", "Slack"],
        "industries": ["financial-services", "healthcare-life-sciences", "hospitality-travel", "real-estate-proptech"],
        "capabilities": ["voice-ai-development", "ai-agent-development", "nlp-rag-development"],
        "faqs": [
            {"q": "Do you replace our phone system?", "a": "No. This is an overlay — it listens, structures, and routes, while your numbers, carrier, and call flows stay as they are."},
            {"q": "Can the voice agent actually take actions?", "a": "Within boundaries written into the scope: lookups, booking against your calendar or system, and transfers. Anything sensitive stays behind a human."},
            {"q": "What about recording consent and data rules?", "a": "Consent flows, retention periods, and redaction are designed into the build against your jurisdiction's rules. We hand you the design for legal review — we do not sign off on compliance for you."},
        ],
    },
    {
        "slug": "assessment-systems",
        "name": "Assessment & Training Systems",
        "category": "Knowledge",
        "icon": "book",
        "short": "Turn your own material into scored assessments, drills, and onboarding paths that report what people actually learned.",
        "lede": (
            "Source material in — documentation, slides, video, audio — and a measured, scored learning "
            "path out, with item-level analytics instead of completed checkboxes."
        ),
        "customers": [
            {"t": "Education and EdTech teams", "d": "Course builders who need banks of calibrated questions, not weekend-long manual drafting."},
            {"t": "L&D and enablement leads", "d": "Teams onboarding new hires against real competency, not slide-deck completion."},
            {"t": "Certification and compliance trainers", "d": "Programs that need defensible scoring and an audit trail of who demonstrated what."},
        ],
        "problems": [
            {"t": "Writing assessments is slow", "d": "A single credible question bank eats days of expert time, and nobody maintains it afterward."},
            {"t": "Completion is not comprehension", "d": "Your dashboard says 100% complete and tells you nothing about what anyone can actually do."},
            {"t": "Onboarding content is static", "d": "The same generic path for every role, with no adaptation to what a person is missing."},
        ],
        "features": [
            {"t": "Content-to-question generation", "d": "Questions drafted directly from your material, mapped to a topic taxonomy you approve."},
            {"t": "Difficulty and distractor tuning", "d": "Plausible wrong answers and calibrated difficulty, reviewed by your subject experts."},
            {"t": "Autoscoring with rubrics", "d": "Multiple choice scored instantly; open answers graded against rubrics with samples."},
            {"t": "Adaptive practice paths", "d": "Weak topics trigger targeted drills instead of another lap of everything."},
            {"t": "Item-level analytics", "d": "See which questions mislead, which topics lag, and which cohorts struggle."},
            {"t": "Question bank versioning", "d": "Changes tracked over time so retakes and audits stay defensible."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Import source material", "d": "Docs, slides, recordings, and existing courses flow in."},
                {"t": "Generate the draft bank", "d": "Questions drafted against your taxonomy, at target difficulties."},
                {"t": "Expert review", "d": "Your subject experts edit, reject, and recalibrate — the system learns their standards."},
                {"t": "Deploy", "d": "Standalone pages or embedded in your LMS where supported."},
                {"t": "Analyze", "d": "Item performance and cohort gaps drive the next revision cycle."},
            ],
        },
        "integrations": ["LMS via SCORM or LTI where supported", "Standalone pages", "Google Docs import", "Single sign-on basics"],
        "industries": ["education-edtech", "software-saas", "healthcare-life-sciences"],
        "capabilities": ["nlp-rag-development", "generative-ai-development", "ai-agent-development"],
        "faqs": [
            {"q": "Does this replace our LMS?", "a": "Usually not. It generates and maintains the assessment layer — deployed standalone or connected into your LMS where it supports SCORM or LTI."},
            {"q": "How accurate is machine-generated assessment?", "a": "The generation is a draft engine. Every question goes through your subject experts before it counts — the workflow is designed around that review."},
            {"q": "Can it grade open-ended answers?", "a": "Yes, against rubrics you approve, with flagged low-confidence answers routed to a human grader."},
        ],
    },
    {
        "slug": "design-visualization",
        "name": "Design Visualization",
        "category": "Design",
        "icon": "layers",
        "short": "Sketches, specs, and floor plans turned into realistic visuals your team and clients can react to.",
        "lede": (
            "Early-stage design decisions stop waiting on expensive renders. A sketch or a written spec "
            "becomes a board of realistic directions in hours, under constraints you control."
        ),
        "customers": [
            {"t": "Architecture and interior studios", "d": "Teams that need mood and direction approvals long before the render budget is spent."},
            {"t": "Product and hardware teams", "d": "Concept exploration in days instead of design-cycle weeks."},
            {"t": "Agencies pitching concepts", "d": "Sell the direction with visuals before committing production resources."},
        ],
        "problems": [
            {"t": "Render turnaround kills iteration", "d": "By the time the visual arrives, the meeting where it mattered is over."},
            {"t": "Early decisions are made blind", "d": "Clients approve line drawings they cannot actually visualize, then change their minds later."},
            {"t": "Concept exploration is expensive", "d": "Exploring five directions costs five times one — so teams explore one."},
        ],
        "features": [
            {"t": "Sketch-to-realistic pipelines", "d": "Hand sketches, plans, or written specs become grounded, realistic directions."},
            {"t": "Style exploration grids", "d": "A board of coherent variations to react to, not a slot machine."},
            {"t": "Consistent scene control", "d": "Camera, lighting, and materials held steady while the design variable changes."},
            {"t": "Comparison boards", "d": "Side-by-side directions exportable for client review."},
            {"t": "Iteration on picks", "d": "Chosen directions refine further under the same constraints."},
            {"t": "Pitch-ready export", "d": "Boards sized for decks and presentations."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Input", "d": "Sketch, plan, or written spec — whatever stage you are at."},
                {"t": "Scene setup", "d": "Constraints locked: subject, materials, lighting language, mood."},
                {"t": "Direction grid", "d": "A board of coherent options generated for reaction."},
                {"t": "Feedback loop", "d": "Picks are refined and re-boarded until the direction is right."},
                {"t": "Final export", "d": "Chosen visuals at presentation sizes."},
            ],
        },
        "integrations": ["Figma", "PDF and image inputs", "Deck export presets"],
        "industries": ["real-estate-proptech", "manufacturing-supply-chain", "media-entertainment"],
        "capabilities": ["generative-ai-development", "computer-vision-development"],
        "faqs": [
            {"q": "Does this replace our 3D artists?", "a": "No — it front-loads direction-finding. Final, deliverable-grade visualization stays with your production process; this is for the decisions that happen before that budget is spent."},
            {"q": "Can it stay faithful to an actual plan?", "a": "Within limits we test together during scoping. Geometry fidelity has real constraints; we will tell you honestly what your inputs can support before you commit."},
            {"q": "Who owns the visuals?", "a": "You do — outputs and the pipeline configuration, per the written scope."},
        ],
    },
    {
        "slug": "content-pipelines",
        "name": "Content Generation Pipelines",
        "category": "Content",
        "icon": "pen",
        "short": "Multi-stage content workflows — research, outline, draft, review, publish — with humans approving what ships.",
        "lede": (
            "Content stops being a heroic scramble. Research-grounded drafting flows through an "
            "outline-first pipeline with your style guide encoded and your editors in control."
        ),
        "customers": [
            {"t": "Content and marketing teams", "d": "Small teams carrying an editorial calendar built for a larger one."},
            {"t": "Media and publication teams", "d": "Operations that need volume without giving up editorial standards."},
            {"t": "Solo operators and founders", "d": "People publishing weekly who need a repeatable system, not a prompt habit."},
        ],
        "problems": [
            {"t": "Volume versus team size", "d": "The calendar needs four formats a week; the team can produce one."},
            {"t": "Drafts without grounding", "d": "Chat-window writing produces confident prose with no sources and no substance."},
            {"t": "Review round-trips", "d": "Edits happen in scattered comments across versions nobody can find."},
        ],
        "features": [
            {"t": "Source-grounded drafting", "d": "Every draft cites the research it came from — interviews, docs, data, transcripts."},
            {"t": "Outline-first generation", "d": "You approve the structure before a word of prose is written."},
            {"t": "Your style guide, encoded", "d": "Voice, formatting, and banned phrases enforced by the pipeline, not memory."},
            {"t": "Multi-format expansion", "d": "One researched piece expands into posts, threads, scripts, and pages."},
            {"t": "Review states and comments", "d": "Draft to in-review to approved, with edits attached to versions."},
            {"t": "Publishing hooks", "d": "Approved pieces push to your CMS or scheduler in the right format."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Gather sources", "d": "Research, interviews, and existing material collected into the pipeline."},
                {"t": "Outline approval", "d": "Structure and angle approved before drafting begins."},
                {"t": "Section drafts", "d": "Grounded, style-checked sections drafted in order."},
                {"t": "Human edit pass", "d": "Your editors work in the pipeline — every change on record."},
                {"t": "Package and publish", "d": "Final pieces export or publish in every target format."},
            ],
        },
        "integrations": ["Notion", "Google Docs", "WordPress", "Ghost", "Editorial boards in Sheets", "Scheduling tools"],
        "industries": ["media-entertainment", "ecommerce-retail", "software-saas", "education-edtech"],
        "capabilities": ["ai-content-video-production", "generative-ai-development", "workflow-automation"],
        "faqs": [
            {"q": "Is this just a ChatGPT wrapper?", "a": "No. The value is the pipeline around the model: source grounding, outline gates, an encoded style guide, versioned review, and publishing hooks. The model is a replaceable component inside it."},
            {"q": "Who is accountable for what gets published?", "a": "Your editors. Nothing ships without a human approval step — that is a design rule for this system, not a settings toggle."},
            {"q": "Can it match our voice?", "a": "That is exactly what the encoded style guide is for, and it is tuned against your existing published work during the build."},
        ],
    },
    {
        "slug": "document-intelligence",
        "name": "Document Intelligence",
        "category": "Documents",
        "icon": "file",
        "short": "Extraction, classification, and cross-checking for document-heavy operations — invoices, applications, contracts, claims.",
        "lede": (
            "Documents in, structured and checked data out. Every field traceable to its source, "
            "every low-confidence answer routed to a human — designed for operations that cannot afford silent errors."
        ),
        "customers": [
            {"t": "Finance and operations teams", "d": "Back offices drowning in invoices, purchase orders, and expense documentation."},
            {"t": "Service operations", "d": "Claims, applications, and intake documents that must be classified and keyed accurately."},
            {"t": "Legal and contract-heavy teams", "d": "Review support: clause detection, comparison, and summarization with the source always one click away."},
        ],
        "problems": [
            {"t": "Manual entry at volume", "d": "Skilled people spend their week retyping fields from PDFs into systems."},
            {"t": "Inconsistent classification", "d": "Documents land in the wrong queue and ride the wrong process for weeks."},
            {"t": "Errors cross systems silently", "d": "A mis-keyed number propagates into ledgers and orders before anyone notices."},
        ],
        "features": [
            {"t": "Typed field extraction", "d": "Schemas you define — vendor, totals, dates, line items — extracted into validated fields."},
            {"t": "Tables and multi-page handling", "d": "Line items and multi-document packs assembled correctly."},
            {"t": "Classification and routing", "d": "Documents sorted into your queues with reasons attached."},
            {"t": "Cross-checking and confidence flags", "d": "Extraction checked against rules and itself; low confidence goes to a human, always."},
            {"t": "Audit trail", "d": "Every output field links back to the exact source region it came from."},
            {"t": "Batch and bulk modes", "d": "Backlogs processed in controlled runs with full logging."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Ingest", "d": "Documents arrive from inbox, folder, or API — no new upload habits required."},
                {"t": "Extract", "d": "Fields pulled into your schema, tables assembled."},
                {"t": "Validate", "d": "Rules and confidence scoring check every field."},
                {"t": "Exception queue", "d": "Only flagged items reach a human, with the source opened alongside."},
                {"t": "Push", "d": "Validated data writes to your system of record."},
            ],
        },
        "integrations": ["Email inboxes", "Google Drive", "SharePoint", "Accounting ledgers", "Google Sheets", "Your database via API"],
        "industries": ["manufacturing-supply-chain", "financial-services", "healthcare-life-sciences", "real-estate-proptech"],
        "capabilities": ["nlp-rag-development", "workflow-automation", "ai-integration-services"],
        "faqs": [
            {"q": "What happens when extraction is unsure?", "a": "It says so. Confidence flags route uncertain fields to a human queue with the source document opened — uncertainty is surfaced, never averaged away."},
            {"q": "Can it run against our historical backlog?", "a": "Yes — batch runs are a standard part of the scope, processed in controlled, logged passes."},
            {"q": "Does it learn from corrections?", "a": "Corrections are captured and fed back into rules and prompts on a review cadence you control."},
        ],
    },
    {
        "slug": "knowledge-retrieval",
        "name": "Knowledge Search & Retrieval",
        "category": "Retrieval",
        "icon": "search",
        "short": "Ask your company's documents questions — answers with citations you can click and check.",
        "lede": (
            "Your organization's knowledge — policies, specs, decisions, manuals — becomes answerable, "
            "with every claim linked to the document and passage it came from."
        ),
        "customers": [
            {"t": "Growing teams", "d": "Companies whose decisions live scattered across drives, wikis, and chat threads."},
            {"t": "Support and success teams", "d": "Agents who need the right answer from policy on the first reply."},
            {"t": "New-hire heavy operations", "d": "Teams that cannot afford six-month ramp times on tribal knowledge."},
        ],
        "problems": [
            {"t": "Knowledge is everywhere and nowhere", "d": "The answer exists — in a doc, a thread, a deck — and nobody can find it twice."},
            {"t": "Ramp time eats capacity", "d": "Every new hire re-learns the same institutional knowledge by asking the same people."},
            {"t": "Unanswerable is invisible", "d": "Nobody tracks which questions the organization could not answer."},
        ],
        "features": [
            {"t": "Hybrid retrieval", "d": "Keyword and semantic search combined, tuned on your real questions."},
            {"t": "Citation-first answers", "d": "Every claim in an answer links to the source passage — checkable, not trusted."},
            {"t": "Role-aware sources", "d": "People only see answers drawn from documents they are allowed to read."},
            {"t": "Freshness tracking", "d": "Changed documents re-index; stale answers get flagged."},
            {"t": "A feedback loop", "d": "Wrong answers report the corpus gap — the fix is a document, not a shrug."},
            {"t": "Deployment options", "d": "Cloud-hosted, or on infrastructure you control when the data demands it."},
        ],
        "workflow": {
            "title": "How a build usually runs",
            "steps": [
                {"t": "Connect sources", "d": "Your drives, wikis, and repos connect with access rules intact."},
                {"t": "Index", "d": "Documents chunked and indexed for hybrid retrieval."},
                {"t": "Tune on real questions", "d": "Retrieval is evaluated against questions your team actually asks."},
                {"t": "Guardrails", "d": "Citation enforcement, role filtering, and no-answer behavior configured."},
                {"t": "Ship with dashboards", "d": "Usage, unanswered questions, and corpus health visible from day one."},
            ],
        },
        "integrations": ["Notion", "Google Drive", "Confluence", "SharePoint", "Slack"],
        "industries": ["software-saas", "education-edtech", "manufacturing-supply-chain", "financial-services"],
        "capabilities": ["nlp-rag-development", "ai-integration-services", "ai-agent-development"],
        "faqs": [
            {"q": "Will it hallucinate?", "a": "The system is built citation-first: answers quote the retrieved passages, and when retrieval finds nothing, it says so instead of improvising. You still get the links to verify — that is the design."},
            {"q": "Can it run inside our infrastructure?", "a": "Yes. A deployment on infrastructure you control is a scoping option for teams whose data cannot leave their environment."},
            {"q": "What does it take to maintain?", "a": "Sources re-index on change, and a dashboard reports corpus gaps and unanswered questions. Maintenance is a documented, bounded activity — sized honestly in the scope."},
        ],
    },
]
