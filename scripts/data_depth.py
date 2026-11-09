# -*- coding: utf-8 -*-
"""ReWoo site content — beginner + expert depth layers.

Two layers added to every system, capability and package page:

PLAIN[slug]  — the beginner layer: one plain sentence, an analogy, and the
               3-4 jargon terms on that page defined in one line each.
TECH[slug]   — the expert layer for evaluators: architecture/approach,
               evaluation & acceptance, and operations. Class-level specifics
               only (no invented metrics, clients, or model names).

Framing rules preserved: scoped engagements, no prices, no unverifiable
claims. Final technical choices are always stated as scope decisions.
"""

PLAIN = {
    # ------------------------------------------------------------- systems ---
    "visual-production": {
        "what": "A system that makes large sets of on-brand images for you — ads, product shots, "
                "campaign visuals — without a photoshoot, and keeps every version organized and approved.",
        "like": "Think of it as a production line for pictures: your brand rules are the machine "
                "settings, and every image it makes carries a paper trail.",
        "terms": [
            ("Brand-conditioned generation", "Your style rules are built into the pipeline itself, so every image follows them automatically."),
            ("Provenance", "A record of how each image was made — which settings, which template, which approvals."),
            ("Review queue", "A waiting room where your team approves or rejects each image before it ships."),
        ],
    },
    "voice-intelligence": {
        "what": "Every call, meeting and voice note gets turned into text, a short summary and clear "
                "action items — and filed into the tools your team already uses.",
        "like": "It is like having a reliable assistant who listens to every call, takes perfect "
                "notes, and files them exactly where your team will actually look.",
        "terms": [
            ("Transcription (speech-to-text)", "Turning spoken words into written text, accent-tolerant."),
            ("Summarization", "Condensing a full conversation into decisions, commitments and follow-ups."),
            ("Redaction", "Automatically blanking out sensitive details such as card numbers before anything is stored."),
        ],
    },
    "assessment-systems": {
        "what": "Turns your own training material into quizzes and onboarding paths that actually "
                "measure whether people understood — with scores, gap reports and audit trails.",
        "like": "Like turning your company handbook into a patient driving instructor: it teaches, "
                "tests, and tells you exactly where someone is still wobbly.",
        "terms": [
            ("Comprehension", "Whether someone actually understood the material — not just remembered words from it."),
            ("Item bank", "The library of questions the system draws from, each anchored to a source section."),
            ("Adaptive path", "Routing each person to what they have not yet mastered, instead of one fixed test for all."),
        ],
    },
    "design-visualization": {
        "what": "Turns sketches, specs and floor plans into realistic images your team and clients "
                "can react to — before anything gets built.",
        "like": "A fast, tireless render farm that reads your rough sketch and shows you what it "
                "would look like — with the knobs still labeled.",
        "terms": [
            ("Render", "A realistic image computed from a model, plan or sketch."),
            ("Conditioning", "Steering image generation with your sketch or plan as the base, instead of a text guess."),
            ("Variant study", "Generating several options from one sketch so you can compare directions side by side."),
        ],
    },
    "content-pipelines": {
        "what": "A step-by-step production line for written content — research, outline, draft, "
                "human review, publish — where AI does the heavy lifting and people approve what ships.",
        "like": "Think of a kitchen with stations: prep, cooking, plating — and a head chef who "
                "tastes everything before it leaves the pass.",
        "terms": [
            ("Pipeline", "A fixed sequence of steps that content moves through, with checks at each stage."),
            ("Human-in-the-loop", "A person approves at defined checkpoints — automation does the work, people keep the judgment."),
            ("Grounded generation", "Writing that must trace back to an approved source; unsupported claims fail the checks."),
        ],
    },
    "document-intelligence": {
        "what": "Reads your piles of documents — invoices, applications, contracts — and pulls out "
                "exactly the fields you need, with every answer linked to the line it came from.",
        "like": "Like a tireless clerk who never misfiles: reads the document, fills the form, and "
                "staples a copy of the exact line as proof.",
        "terms": [
            ("Extraction", "Pulling specific fields — dates, amounts, names — out of documents."),
            ("Classification", "Sorting documents into types so each type gets the right treatment."),
            ("Traceability", "Every extracted value points back to the exact source line, so audits are one click."),
        ],
    },
    "knowledge-retrieval": {
        "what": "Lets your team ask questions in plain language and get answers drawn from your "
                "company's own documents — with clickable citations to check.",
        "like": "A colleague who has actually read every document in the company, always answers "
                "with 'it is on page X', and never bluffs.",
        "terms": [
            ("RAG (retrieval-augmented generation)", "Find the right passage first, then write the answer from it."),
            ("Corpus", "The collection of documents the system is allowed to search and cite."),
            ("Citation", "The link showing exactly which passage an answer came from."),
        ],
    },

    # --------------------------------------------------------- capabilities ---
    "ai-agent-development": {
        "what": "We build you a software helper that can take multi-step actions in your tools — "
                "looking things up, filling forms, chasing approvals — under rules you set.",
        "like": "Think of a diligent intern who works around the clock, follows your checklist "
                "exactly, and always asks before anything risky.",
        "terms": [
            ("Agent", "Software that plans and takes actions — not just answers questions."),
            ("Tool use", "The agent's ability to call your systems: email, CRM, sheets, internal APIs."),
            ("Guardrail", "The hard limits on what the agent is allowed to do, enforced at every step."),
        ],
    },
    "ai-chatbot-development": {
        "what": "A chat assistant for your website or app that answers from your real information "
                "and hands tricky cases to a human.",
        "like": "Like a well-trained receptionist who never sleeps, always answers from the "
                "handbook, and knows when to fetch you.",
        "terms": [
            ("Grounding", "Answers are tied to your approved content instead of the model's memory."),
            ("Escalation", "The defined path that hands a conversation to a human with full context."),
            ("Fallback", "What the assistant says and does when it is not confident — by design, not by accident."),
        ],
    },
    "voice-ai-development": {
        "what": "Systems that understand speech or speak back — transcribing calls, answering by "
                "voice, or handling voice notes end to end.",
        "like": "A switchboard operator from the future: understands accents, takes messages, "
                "books things, and knows when to ring a person.",
        "terms": [
            ("STT / TTS", "Speech-to-text and text-to-speech — the ears and the voice."),
            ("Latency", "The delay in a live voice conversation; the make-or-break number."),
            ("Barge-in", "Handling interruptions mid-sentence, like a real conversation allows."),
        ],
    },
    "generative-ai-development": {
        "what": "Custom builds that create text, images or code for your specific needs — "
                "brand-locked, quality-checked, and integrated into your workflow.",
        "like": "A craft workshop: your brief and your rules go in; disciplined batches of "
                "on-brand output come out.",
        "terms": [
            ("Prompt", "The instruction given to a model — engineered and versioned, not improvised."),
            ("Fine-tuning", "Specialized training on your examples; proposed only when the business case justifies it."),
            ("Guardrail", "Validation rules that keep output inside your bounds before anyone sees it."),
        ],
    },
    "agentic-ai-systems": {
        "what": "Several specialized AI workers that hand work to each other — a researcher "
                "drafting, a reviewer checking, a publisher shipping — under supervision.",
        "like": "A small assembly line of specialists: each does one job well, and a foreman "
                "watches the whole line.",
        "terms": [
            ("Multi-agent", "Multiple AI roles dividing a task between them."),
            ("Orchestrator", "The coordinator that routes work between roles and handles failures."),
            ("Verification step", "One agent checking another's output before it counts."),
        ],
    },
    "ai-consulting-strategy": {
        "what": "We help your leadership decide where AI actually pays off — with an honest map "
                "and a first plan, not a hype deck.",
        "like": "A feasibility study before construction: what to build, what to skip, in what "
                "order, and what it will really take.",
        "terms": [
            ("Opportunity map", "A ranked list of where AI could help, by value against effort."),
            ("Build vs buy", "Whether to build custom or use an existing product — decided per use case."),
            ("TCO", "Total cost of ownership: the honest lifetime cost, not just the build quote."),
        ],
    },
    "workflow-automation": {
        "what": "We take a repetitive manual process and make software run it — approvals, data "
                "entry, handoffs — with humans kept where judgment matters.",
        "like": "Like replacing a row of people passing paper with a conveyor belt that has "
                "checkpoints.",
        "terms": [
            ("Workflow", "A repeatable sequence of steps, written down and measurable."),
            ("Trigger", "The event that starts the workflow — an email, a form, a schedule."),
            ("Exception queue", "Where the odd cases go for a human, with the context attached."),
        ],
    },
    "nlp-rag-development": {
        "what": "Search that answers questions instead of listing links — built on your own "
                "documents, always showing where each answer came from.",
        "like": "The archive clerk who has read everything once, then answers with the page "
                "number.",
        "terms": [
            ("Embedding", "A numeric fingerprint of a text, used to find passages with similar meaning."),
            ("Vector store", "The database that holds those fingerprints and searches them fast."),
            ("Chunking", "How documents are split into searchable pieces — a design decision, not a default."),
        ],
    },
    "computer-vision-development": {
        "what": "Systems that understand images and video — counting, inspecting, measuring, "
                "tracking — for your specific use case.",
        "like": "A tireless inspector with perfect attention: looks at every frame, and flags only "
                "what you taught it to flag.",
        "terms": [
            ("Detection", "Finding and labeling objects inside an image."),
            ("Confidence threshold", "How sure the model must be before it raises a flag — set by you."),
            ("Edge deployment", "Running the model on your device or site instead of in the cloud."),
        ],
    },
    "ai-content-video-production": {
        "what": "AI-assisted production of content and video — drafts, edits, versions, captions "
                "— with humans directing quality throughout.",
        "like": "A production crew that preps everything before the director calls action.",
        "terms": [
            ("Rough cut", "The first assembled version of a video, ready for review."),
            ("Captioning", "Text versions of speech — good for accessibility and reach."),
            ("Versioning", "Keeping every variant and edit organized, with the ability to go back."),
        ],
    },
    "ai-integration-services": {
        "what": "We wire AI into the tools you already run — your CRM, sheets, helpdesk — so the "
                "AI reads and writes where the work actually happens.",
        "like": "An electrician who connects the new appliance to your existing wiring — without "
                "rewiring the house.",
        "terms": [
            ("API", "The standard interface software uses to talk to other software."),
            ("Webhook", "A callback that pushes events between systems the moment they happen."),
            ("Idempotency", "A safety property: a repeated call cannot cause a repeated action."),
        ],
    },
    "ai-mvp-development": {
        "what": "The smallest real version of your AI idea, built to actually run — so you can "
                "test the value before investing in scale.",
        "like": "A pop-up kitchen before you build the restaurant: real food, real customers, "
                "real lessons.",
        "terms": [
            ("MVP", "Minimum viable product — the smallest version that genuinely tests the idea."),
            ("Pilot", "Running it with real users under controlled conditions, with success criteria."),
            ("Production-hardening", "Making it reliable and observable after — and only after — the idea works."),
        ],
    },

    # ------------------------------------------------------------ packages ---
    "ai-readiness-audit": {
        "what": "A structured check of where AI would genuinely help your business — and where it "
                "would not — ending with a ranked map and a first plan.",
        "like": "A building survey before renovation: what is worth doing, what is structural, "
                "and what to leave alone.",
        "terms": [
            ("Data readiness", "Whether your information is clean and accessible enough to build on."),
            ("Opportunity map", "The ranked list of AI use cases by value against effort."),
            ("Quick win", "A small, low-risk first build that proves the approach."),
        ],
    },
    "ai-agent-mvp": {
        "what": "A working AI agent on your highest-value workflow — built, deployed and handed "
                "over as a real pilot, not a demo.",
        "like": "One paved mile of highway: real traffic on a real road, before you commit to the "
                "whole route.",
        "terms": [
            ("Pilot", "A controlled real-world test with success criteria agreed up front."),
            ("Acceptance criteria", "The measurable bar the build must clear before you pay for that milestone."),
            ("Handover", "Code, docs, access and a working session — so your team can run it."),
        ],
    },
    "ai-integration-sprint": {
        "what": "A focused push to wire AI into the systems you already run — with monitoring and "
                "documentation from day one.",
        "like": "A professional kitchen installation: new appliances in, tested, and the manuals "
                "left on the counter.",
        "terms": [
            ("Shadow mode", "The AI runs silently beside the real process to prove itself before it acts."),
            ("Rollback", "A tested way to turn the integration off safely, at every stage."),
            ("Observability", "Logging and dashboards so you can see the integration working — or not."),
        ],
    },
    "workflow-automation-audit": {
        "what": "One messy process, mapped end to end, with a clear verdict for every step: "
                "automate it, fix it, or keep it human.",
        "like": "A time-and-motion study that ends in a decision, not a binder.",
        "terms": [
            ("Process map", "How the work actually flows — observed, not the org-chart version."),
            ("Exception rate", "How often a step does not fit the standard path; the hidden cost of automation."),
            ("Human-in-the-loop", "Keeping a person at exactly the steps that need judgment."),
        ],
    },
    "ai-strategy-workshop": {
        "what": "A working session that gets your leadership aligned on what AI means for this "
                "business — ending with a first plan, not a mood board.",
        "like": "A board-level strategy offsite, except the output survives the following Monday.",
        "terms": [
            ("Alignment", "Shared agreement on priorities and trade-offs — recorded, not assumed."),
            ("Prioritization", "Deciding what comes first, and what does not come at all."),
            ("Decision log", "The record of what was decided and why, so later reviews make sense."),
        ],
    },
}


TECH = {
    # ------------------------------------------------------------- systems ---
    "visual-production": {
        "stack": [
            ("Model access", "Foundation image models via provider APIs. Brand control comes from reference conditioning, palette locks and negative constraints — fine-tuning only when a measured case justifies it."),
            ("Pipeline shape", "Batch generation, automated brand-rule checks, human review queue, export presets — each stage a versioned, re-runnable step."),
            ("Asset spine", "Every asset stores its generation parameters, template ID and approval trail in a queryable store. Provenance is data, not folklore."),
        ],
        "eval": [
            ("Brand-rule pass rate", "Automated checks measure how much of a batch survives your rules before human review; the acceptance threshold is set in the written plan."),
            ("Golden set regression", "A reference set of approved and rejected images is agreed up front and re-scored whenever templates or model versions change."),
        ],
        "ops": [
            ("Cost controls", "Per-batch cost is logged; runaway generation is capped by budget rules you set."),
            ("Failure behavior", "A failed batch quarantines itself — nothing reaches review or export until the rule check passes."),
            ("Handover", "Assets, templates and pipeline configuration export cleanly; provider keys are least-privilege and rotate."),
        ],
    },
    "voice-intelligence": {
        "stack": [
            ("Model access", "Production speech-to-text via provider APIs, selected per language and accent mix. Domain vocabulary is supplied as custom terms, not retraining."),
            ("Pipeline shape", "Audio in, speaker separation, transcript, structured summary, routing rules, system write-back — deterministic stages with explicit schemas."),
            ("Privacy engineering", "Consent flows, retention timers and redaction of card and ID numbers are pipeline stages, not afterthoughts."),
        ],
        "eval": [
            ("Word-error tracking", "Transcript quality is measured on a sample of your real recordings per language, and the number is reported — not assumed."),
            ("Summary checklist", "Summaries are checked against a checklist your team signs off: decisions, commitments and follow-ups present and correct."),
        ],
        "ops": [
            ("End-to-end tracing", "Every call is traceable — audio, transcript, summary, destination — with per-stage latency and failure logs."),
            ("Failure behavior", "A call that fails any stage lands in a manual queue with the error attached; nothing is silently dropped."),
            ("Data rules", "Where audio lives, how long it stays and who can replay it are auditable settings you control."),
        ],
    },
    "assessment-systems": {
        "stack": [
            ("Generation", "Questions are generated from your material with difficulty labels, and each item's justification anchors to the source section it came from."),
            ("Scoring logic", "Scoring rubrics are explicit and versioned; borderline answers route to human review by default."),
            ("Data model", "Attempt history is stored per person per item, so gap analysis and cohort reporting are queries, not manual work."),
        ],
        "eval": [
            ("Item validity", "Generated items are reviewed against the source by a human before they count; ambiguous items are flagged, not guessed."),
            ("Mastery criteria", "Pass thresholds are defined with you before launch and applied consistently across cohorts."),
        ],
        "ops": [
            ("Audit trail", "Who took what, when, against which version of the material — recorded for compliance-friendly export."),
            ("Integrity controls", "Shuffled options, timed windows and attempt limits are configuration, not custom work."),
            ("Failure behavior", "A failed save preserves the attempt locally and re-syncs; learners never lose a completed test."),
        ],
    },
    "design-visualization": {
        "stack": [
            ("Model access", "Image models steered by your sketches and plans through control-style conditioning; geometry fidelity is checked, not hoped for."),
            ("Pipeline shape", "Input normalization (lines, scales, materials), conditioned generation, variant sets, annotated export — each step reviewable."),
            ("Iteration loop", "Feedback on a variant is captured as structured constraints, so the next round moves toward the chosen direction instead of re-rolling dice."),
        ],
        "eval": [
            ("Fidelity check", "Output is compared against the input plan for measurable deviations — proportions, counts, labels — before human review."),
            ("Round-trip test", "A sample of your real sketches is processed end to end at scope time, so expectations are set on evidence."),
        ],
        "ops": [
            ("Exact regeneration", "Every variant set is stored with inputs and constraints; any image can be regenerated exactly."),
            ("Export discipline", "Outputs land in your formats and naming scheme, ready for decks or listings."),
            ("Failure behavior", "Unfaithful generations are flagged in the queue with the deviation noted — reviewers see the risk, not just the picture."),
        ],
    },
    "content-pipelines": {
        "stack": [
            ("Orchestration", "Explicit workflow stages with typed inputs and outputs; retries and timeouts are configured, not improvised."),
            ("Grounding", "Facts and quotes are extracted from your approved sources and carried with citations into the draft; unsupported claims fail automated checks."),
            ("Publishing", "CMS and channel adapters run in dry-run mode first; formatting rules are templates, not manual fixes."),
        ],
        "eval": [
            ("Citation integrity", "Every claim in a draft must trace to an approved source before human review — measured, not assumed."),
            ("Edit distance", "How much humans change per draft is tracked per content type: the honest signal for where the pipeline needs tuning."),
        ],
        "ops": [
            ("Stage metrics", "Time, cost and rejection rate per stage on a dashboard; anomalies alert a human."),
            ("Rollback", "Published pieces carry their pipeline provenance; corrections propagate downstream consistently."),
            ("Failure behavior", "A failed stage halts that piece with the error attached — never silently publishes degraded output."),
        ],
    },
    "document-intelligence": {
        "stack": [
            ("Pipeline shape", "Ingest, classification, schema-constrained extraction, validation rules, human exception queue, system-of-record write-back."),
            ("Schema discipline", "Field schemas are versioned and validated; documents that do not fit become exceptions, never guesses."),
            ("Traceability", "Every extracted value stores a pointer to the exact source span — audit is a click, not an archaeology dig."),
        ],
        "eval": [
            ("Per-field accuracy", "Precision and recall measured per field on a sampled, human-verified set of your real documents; thresholds agreed in scope."),
            ("Exception budget", "The share of documents allowed to route to humans is measured and reported — the number that matters for the business case."),
        ],
        "ops": [
            ("Drift dashboards", "Volumes, accuracy drift and exception reasons per document type, monitored continuously."),
            ("Security", "Least-privilege access, encryption in transit and at rest, retention rules per document class."),
            ("Failure behavior", "Ambiguous extractions route to the exception queue with the conflicting evidence shown — the system refuses to guess."),
        ],
    },
    "knowledge-retrieval": {
        "stack": [
            ("Retrieval", "Hybrid search — keyword plus semantic — over your corpus, with per-source permissions enforced at query time."),
            ("Generation", "Answers are constrained to retrieved passages. No grounding, no answer: the system states what it could not find."),
            ("Indexing", "Incremental, scheduled re-indexing with change detection; deletions propagate rather than linger."),
        ],
        "eval": [
            ("Golden questions", "A set of real questions with known answers is agreed in scope; the system is scored on it before launch and after every change."),
            ("Honest failure measurement", "Hallucination rate and refusal rate are measured separately — declining to answer is a feature, and the number is reported."),
        ],
        "ops": [
            ("Permissions", "Document-level access control enforced in retrieval, so answers only ever come from what the asker may read."),
            ("Freshness visibility", "Index age is shown to users — 'based on documents updated as of…' — so trust stays calibrated."),
            ("Failure behavior", "Out-of-corpus questions get an honest 'not in the documents', with the closest matches listed."),
        ],
    },

    # --------------------------------------------------------- capabilities ---
    "ai-agent-development": {
        "stack": [
            ("Orchestration", "Deterministic step sequences with explicit fallbacks around model calls — not free-roaming loops."),
            ("Tool discipline", "Every tool call is schema-validated and permission-scoped; least privilege by default."),
            ("Audit state", "Full state and transcript persisted per run, so any action can be reconstructed after the fact."),
        ],
        "eval": [
            ("Task-level acceptance", "A defined set of real tasks with expected outcomes, scored end to end — agreed in the written plan."),
            ("Escalation correctness", "When the agent must stop and hand to a human is tested as rigorously as what it does."),
        ],
        "ops": [
            ("Run traces", "Per-step latency and cost on every run, on a dashboard."),
            ("Controls", "Kill switch, step-level approval for sensitive actions, budget caps per run."),
            ("Failure behavior", "Failed runs replay deterministically for debugging — no he-said-she-said with a log file."),
        ],
    },
    "ai-chatbot-development": {
        "stack": [
            ("Grounded responses", "Retrieval over your approved content with strict citation; the assistant's knowledge has an address."),
            ("Conversation engine", "An explicit state machine with designed fallback paths — not a prompt hoping for the best."),
            ("Channels", "Web widget, WhatsApp, in-app — one brain, typed channel adapters."),
        ],
        "eval": [
            ("Golden Q&A set", "Answer accuracy measured on real queries from your logs, agreed before build."),
            ("Escalation review", "What got escalated and why, reviewed weekly at launch, until it steadies."),
        ],
        "ops": [
            ("Transcripts", "Every conversation stored with outcome labels for audit and improvement."),
            ("Failure behavior", "Low confidence triggers an honest 'I am not sure' plus the human path — never an invented answer."),
        ],
    },
    "voice-ai-development": {
        "stack": [
            ("Streaming architecture", "Streaming speech-to-text and text-to-speech with measured end-to-end latency budgets per turn."),
            ("Turn-taking", "Interruptions and barge-in handled explicitly in the conversation layer."),
            ("Deterministic backends", "Lookups and bookings run on ordinary, testable code behind the voice front-end."),
        ],
        "eval": [
            ("Live measurement", "Latency and comprehension tested on real call samples in your languages and accents."),
            ("Scenario completion", "Task completion rate on scripted call scenarios, including the awkward ones."),
        ],
        "ops": [
            ("Per-call traces", "Audio, transcript, actions and outcomes linked for every call."),
            ("Compliance", "Consent, retention and redaction configured to your regulatory context."),
        ],
    },
    "generative-ai-development": {
        "stack": [
            ("Control layers", "Foundation models via API with conditioning, templates and validation layers — control is engineered, not prompted."),
            ("Fine-tuning discipline", "Proposed only with a measured business case; default is strong prompting plus validation."),
            ("Prompt asset management", "Prompts and templates versioned and reviewed like code, with owners and change history."),
        ],
        "eval": [
            ("Quality rubric", "Per-content-type rubrics scored on sample batches, agreed in scope."),
            ("Regression suite", "Re-run when models or templates change — quality is watched over time, not sampled once."),
        ],
        "ops": [
            ("Cost accounting", "Per-generation cost logged by template and batch."),
            ("Quarantine", "Output waits in quarantine until checks pass; nothing ships on faith."),
        ],
    },
    "agentic-ai-systems": {
        "stack": [
            ("Orchestration graph", "An explicit graph: which agent handles what, in what order, with what fallback — drawn and reviewed before it runs."),
            ("Inter-agent contracts", "Typed inputs and outputs between roles, so a failure localizes to one agent instead of the whole run."),
            ("Human gates", "Approval gates at defined points — not everywhere, which is just manual work with extra steps."),
        ],
        "eval": [
            ("End-to-end scoring", "Task success measured on the golden set, across the whole chain."),
            ("Role-level attribution", "Which agent failed when — recorded, so fixes are targeted instead of guessed."),
        ],
        "ops": [
            ("Hand-off traces", "Every hand-off logged with its payload and verdict."),
            ("Budget caps", "Cost ceilings per run across all agents, enforced by the orchestrator."),
        ],
    },
    "ai-consulting-strategy": {
        "stack": [
            ("Structured discovery", "Interviews, system access review and workflow observation — evidence before opinions."),
            ("Scoring model", "Value, feasibility, data readiness and risk scored with weights you agree to beforehand."),
            ("Explicit no-gos", "Recommendations include what not to do and why — the fastest way to save money."),
        ],
        "eval": [
            ("Traceability", "Every recommendation traces to an observed workflow and states its assumptions."),
            ("Review gate", "You challenge the map in a working session before it is finalized."),
        ],
        "ops": [
            ("Decision log", "Each recommendation keeps its rationale, so later reviews are comparisons, not re-litigations."),
            ("Deliverables", "Written report, walkthrough session, and the scoring model left with you for reuse."),
        ],
    },
    "workflow-automation": {
        "stack": [
            ("Event-driven core", "Explicit state machines with retries, timeouts and dead-letter handling."),
            ("Idempotency", "Every step is safe to re-run: a half-finished workflow never double-charges or double-sends."),
            ("Integration layer", "APIs where available; UI-level automation only where it is genuinely necessary — and labeled as fragile."),
        ],
        "eval": [
            ("Before/after measurement", "Cycle time, error counts and exception rates measured on the same inputs, before and after."),
            ("Acceptance per workflow", "Each automated flow passes its defined test scenarios, including the failure paths."),
        ],
        "ops": [
            ("Run visibility", "Step-level status and duration for every run."),
            ("Exception queue", "Odd cases land in a human queue with the context attached — the loop is closed by design."),
        ],
    },
    "nlp-rag-development": {
        "stack": [
            ("Hybrid retrieval", "Lexical and semantic search combined, tuned per corpus — one without the other fails differently."),
            ("Chunking strategy", "Splitting and metadata designed around your document shapes, not a default number."),
            ("Rerank and cite", "Reranking before generation, and citation enforcement after it — answers with receipts."),
        ],
        "eval": [
            ("Retrieval hit rate", "Measured separately from answer faithfulness, on the golden question set."),
            ("Faithfulness scoring", "Answers checked against sources by rubric; unsupported statements count against the score."),
        ],
        "ops": [
            ("Index health", "Freshness and coverage monitored; stale sources flagged."),
            ("Permission-aware", "Retrieval enforces access control at query time — no answer leaks from a document the asker cannot read."),
        ],
    },
    "computer-vision-development": {
        "stack": [
            ("Task-matched models", "Detection, classification or measurement chosen per task, with a measured baseline on your data before promises are made."),
            ("Deployment placement", "Edge versus cloud decided explicitly by latency, privacy and cost — documented either way."),
            ("Review loop", "Low-confidence cases route to humans with the frame attached."),
        ],
        "eval": [
            ("Labeled-set accuracy", "Precision and recall on a labeled set of your real images or video, with thresholds agreed in scope."),
            ("Drift watch", "Live performance monitored against the baseline; retraining is a decision, not a surprise."),
        ],
        "ops": [
            ("Flagged-frame archive", "Every flagged frame kept with its confidence score for audit."),
            ("Calibration", "Thresholds adjustable per site or shift — one dial, not a rebuild."),
        ],
    },
    "ai-content-video-production": {
        "stack": [
            ("Modular pipeline", "Script, voice, visuals and cut are separate reviewable stages — approve the script before a frame is rendered."),
            ("Asset governance", "Versions, rights and provenance tracked per asset; brand checks on every output."),
            ("Format adapters", "Export presets per channel; aspect ratios and captions generated with the asset, not after it."),
        ],
        "eval": [
            ("Quality rubric", "Per format: clarity, brand fit, caption accuracy — scored on samples."),
            ("Turnaround and cost", "Measured per asset class, reported honestly, including the batches that needed rework."),
        ],
        "ops": [
            ("Approval checkpoints", "Full history of who approved what, when."),
            ("Reproducibility", "Any published asset can be regenerated with its exact inputs."),
        ],
    },
    "ai-integration-services": {
        "stack": [
            ("Interfaces first", "APIs and webhooks before anything cleverer; schemas validated at the boundary."),
            ("Secret hygiene", "Credentials in a proper vault, least-privilege scopes, rotation planned from day one."),
            ("Rollout pattern", "Sandbox, then shadow, then production — each gate has entry criteria and a tested rollback."),
        ],
        "eval": [
            ("Integration tests", "Run against real or faithfully mocked endpoints, in the contract, not on goodwill."),
            ("Data integrity checks", "Post-sync verification that counts match and nothing duplicated."),
        ],
        "ops": [
            ("Sync health", "Dashboards for every connected pair; conflicts surface rather than smolder."),
            ("Conflict rules", "Written down — who wins when two systems disagree, decided before it happens."),
        ],
    },
    "ai-mvp-development": {
        "stack": [
            ("Scope discipline", "One workflow, one success metric, and a written will-not-build list that is honored."),
            ("Unboring fundamentals", "Auth, logging and backups exist even in the MVP — because pilots that work become products."),
            ("Survivable architecture", "Scale-out points documented: what gets swapped when volume grows, and what does not need to."),
        ],
        "eval": [
            ("Pre-registered metric", "The success metric is defined before building and measured honestly — including when it fails."),
            ("Pilot review", "A scheduled session reads the numbers with you and decides: iterate, scale, or stop."),
        ],
        "ops": [
            ("Runbook from day one", "Operating the pilot is documented while it is built, not reconstructed afterwards."),
            ("Clean exit", "Repository, credentials and knowledge transfer at handover — you are never hostage to a prototype."),
        ],
    },

    # ------------------------------------------------------------ packages ---
    "ai-readiness-audit": {
        "stack": [
            ("Discovery instrument", "Structured interviews plus a systems-and-data review — observed workflows, not aspiration surveys."),
            ("Scoring model", "Value, feasibility, data readiness and risk, scored against weights agreed with you before the audit starts."),
            ("Output shape", "A ranked opportunity map, one or two quick-win specifications, and a no-go list with reasons."),
        ],
        "eval": [
            ("Traceability", "Every recommendation traces to an observed workflow and states its assumptions."),
            ("Challenge session", "The map is defended in a working session with your team before it is final."),
        ],
        "ops": [
            ("Deliverables", "Written report, walkthrough session, and the scoring model left with you for reuse."),
            ("Decision log", "What was recommended, why, and with what confidence — recorded for later review."),
        ],
    },
    "ai-agent-mvp": {
        "stack": [
            ("Milestone shape", "Discovery, written plan, build in demoable increments, shadow run, pilot handover — each gate has entry criteria."),
            ("Evaluation harness", "The task set and escalation paths are tested continuously during the build, not bolted on at the end."),
            ("Pilot instrumentation", "Usage, success rate and cost are measured from the first real task, so the review reads numbers, not vibes."),
        ],
        "eval": [
            ("End-to-end acceptance", "The agent must pass the agreed task set, including the cases where it must escalate instead of act."),
            ("Honest reporting", "The evaluation report includes failures and edge cases; that is the point of a pilot."),
        ],
        "ops": [
            ("Handover package", "Repository, runbook, evaluation report, and a working session with your team."),
            ("Continuation options", "Scale, iterate or stop — decided at the pilot review, with the numbers on the table."),
        ],
    },
    "ai-integration-sprint": {
        "stack": [
            ("Gated rollout", "Sandbox, shadow, production — each stage has entry criteria, monitoring and a tested rollback."),
            ("Contract-first", "Every integration is specified as a contract with schemas and error semantics before code is written."),
            ("Test harness", "Integration tests and data-integrity checks per connected system, run in production-like conditions."),
        ],
        "eval": [
            ("Acceptance in production conditions", "All defined integrations pass their tests with monitoring live — not on a laptop."),
            ("Integrity verification", "Post-sync counts and checksums prove nothing was lost or duplicated."),
        ],
        "ops": [
            ("Deliverables", "Integration documentation, dashboards, and a failure playbook your team can run."),
            ("Exit criteria", "The sprint ends when the integration is documented and observable — not when it merely works."),
        ],
    },
    "workflow-automation-audit": {
        "stack": [
            ("Direct observation", "The process is measured as it actually runs — timestamps, volumes, exception counts — not as the manual describes it."),
            ("Step dispositions", "Every step gets an explicit verdict: automate, redesign, or keep human — with the reasoning attached."),
            ("Business case", "The automation proposal states its assumptions: volumes, exception rates, and the human time actually saved."),
        ],
        "eval": [
            ("Ground-truth validation", "The people doing the work validate the map; a map they do not recognize is a wrong map."),
            ("Acceptance", "The audit is accepted when every step has a disposition and the proposal's math is checkable."),
        ],
        "ops": [
            ("Deliverables", "Process map, step dispositions, and an automation specification for the agreed steps."),
            ("Re-measurement plan", "Where to measure again after automating, so the gain is proven rather than assumed."),
        ],
    },
    "ai-strategy-workshop": {
        "stack": [
            ("Pre-work", "Short interviews and a pre-read before the session — the room spends its time on decisions, not discovery theater."),
            ("Structured exercises", "Opportunity ranking, constraint mapping and sequencing — facilitated to a conclusion, not a brainstorm."),
            ("Written output", "A first plan with owners, sequencing and explicit no-gos, agreed in the room before anyone leaves."),
        ],
        "eval": [
            ("Acceptance", "The plan is specific enough to start the first item without another meeting — that is the bar."),
            ("Decision log", "Every choice recorded with its rationale and its dissent, so later reviews make sense."),
        ],
        "ops": [
            ("Deliverables", "Decision log, first plan, and scheduled follow-up checkpoints."),
            ("Honest scope", "What the workshop deliberately does not decide — and which engagement makes that decision properly."),
        ],
    },
}
