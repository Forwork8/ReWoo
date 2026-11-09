/**
 * =============================================================================
 * ReWoo — demos.js
 * Engines for the studio's live proof pages:
 *   A. Knowledge Search demo + retrieval benchmark   (demo-search.html)
 *   B. Voice Intelligence demo                       (demo-voice.html)
 *   C. AI Scope Generator                            (scope-generator.html)
 *
 * Everything runs in the visitor's browser. No servers, no APIs, no tracking.
 * The corpus is the studio's own published content; the benchmark is computed
 * live at run time — the same code the visitor can read.
 * Zero dependencies. Vanilla JS only.
 * =============================================================================
 */

(function () {
  'use strict';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  /* =============================================================================
     A. KNOWLEDGE SEARCH — corpus, BM25 retrieval, benchmark
     ============================================================================= */

  var CORPUS = [
    /* --- Guide: How to brief an AI system ------------------------------------ */
    { id: 'brief-1', doc: 'How to brief an AI system', title: 'The one-sentence version', href: 'resources.html#how-to-brief-an-ai-system',
      text: 'A usable brief names the workflow, the decision it feeds, and what done looks like — in one sentence a stranger could act on. Everything else in this guide is elaboration. If your brief cannot be read as one actionable sentence, it is not a brief yet.' },
    { id: 'brief-2', doc: 'How to brief an AI system', title: 'The five questions that matter', href: 'resources.html#how-to-brief-an-ai-system',
      text: 'First: what work, exactly? Not "automate support" — "answer order-status questions from our policy page, and escalate everything else." Second: who uses the output, and what do they do with it? Third: what does done-right look like — paste three examples, good and bad. Fourth: what systems does this need to touch, read or write? Fifth: what must never happen? That last one defines your guardrails and your review gates.' },
    { id: 'brief-3', doc: 'How to brief an AI system', title: 'Red flags in your own brief', href: 'resources.html#how-to-brief-an-ai-system',
      text: 'If your brief says "like ChatGPT but for our company", it is not a brief yet — it is a genre. If it cannot name a person whose day gets better, the value case is untested. And if every requirement is a must-have, scope discipline has not started.' },
    { id: 'brief-4', doc: 'How to brief an AI system', title: 'What a builder should return', href: 'resources.html#how-to-brief-an-ai-system',
      text: 'A serious response to a good brief is a written scope: deliverables, boundaries, milestones, and a fixed quote — plus the questions the brief could not answer. If you get a one-line price instead, you have learned something about the builder.' },
    /* --- Guide: The automation ladder ---------------------------------------- */
    { id: 'ladder-1', doc: 'The automation ladder', title: 'The ladder', href: 'resources.html#the-automation-ladder',
      text: 'Level one is assist: the system drafts, a human decides. Level two is review-by-exception: the system acts, humans check the flagged cases. Level three is supervised autonomy: the system runs a bounded domain with audit trails. There is no level four on purpose — full autonomy without a human path is not a product anyone should sell you.' },
    { id: 'ladder-2', doc: 'The automation ladder', title: 'How to place a task', href: 'resources.html#the-automation-ladder',
      text: 'Three variables decide the rung: reversibility (can a mistake be undone cheaply?), observability (will you notice a mistake at all?), and volume (is the human cost actually worth the build?). High volume, reversible, visible — automate aggressively. Low volume, irreversible, quiet — keep a human in the loop, always.' },
    { id: 'ladder-3', doc: 'The automation ladder', title: 'The mistake teams make', href: 'resources.html#the-automation-ladder',
      text: 'The expensive error is not automating too little — it is climbing two rungs at once. Pilot at review-by-exception even when you dream of autonomy; the audit trail you build there is the trust you need later.' },
    /* --- Guide: Plain-English AI stack glossary ------------------------------ */
    { id: 'gloss-1', doc: 'Plain-English AI stack glossary', title: 'Model, agent, tool', href: 'resources.html#plain-english-ai-stack-glossary',
      text: 'Model: the engine that predicts text, images, or audio. Agent: software that uses a model to take multi-step actions with tools. Tool: a specific action the agent is allowed to perform — "check inventory" is a tool; "access the database" is a permission.' },
    { id: 'gloss-2', doc: 'Plain-English AI stack glossary', title: 'RAG, grounding, hallucination', href: 'resources.html#plain-english-ai-stack-glossary',
      text: 'RAG (retrieval-augmented generation): looking things up in your documents before answering, so responses are grounded in your content instead of the model\'s memory. Grounding: the practice of tying every claim to a source you can click. Hallucination: confident output with no basis — the failure mode grounding exists to prevent.' },
    { id: 'gloss-3', doc: 'Plain-English AI stack glossary', title: 'Evaluation, guardrail, latency', href: 'resources.html#plain-english-ai-stack-glossary',
      text: 'Evaluation: scoring the system against known-good answers, before and after changes. Guardrail: a hard rule the system cannot cross — an approval gate, a banned action, a required human step. Latency: how long the system takes to respond, which for voice is the difference between natural and unbearable.' },
    /* --- The engagement process ---------------------------------------------- */
    { id: 'proc-1', doc: 'How an engagement works', title: 'Step 1 — Intro call', href: 'index.html#how-it-works',
      text: 'Thirty minutes on your workflow and whether we are the right builder. An honest no is included: if AI is not the right tool for this workflow, you hear that on the call.' },
    { id: 'proc-2', doc: 'How an engagement works', title: 'Step 2 — Written scope', href: 'index.html#how-it-works',
      text: 'Deliverables, boundaries, milestones, and a fixed quote — approved by you before anything is charged. The scope is a document you own and can take anywhere.' },
    { id: 'proc-3', doc: 'How an engagement works', title: 'Step 3 — Build in milestones', href: 'index.html#how-it-works',
      text: 'Demoable increments; evaluation against your real cases; no big-bang reveal. Each milestone is something you can open and judge.' },
    { id: 'proc-4', doc: 'How an engagement works', title: 'Step 4 — Integrate and harden', href: 'index.html#how-it-works',
      text: 'Wired into your stack with logging, monitoring, and failure behavior designed in. Retries, idempotency, alerts, and runbooks — the engineering that keeps systems alive after the demo.' },
    { id: 'proc-5', doc: 'How an engagement works', title: 'Step 5 — Hand over', href: 'index.html#how-it-works',
      text: 'Code, configuration, docs, runbook, and a working session. You own it from day one: repository, credentials, and documentation transfer at handover, with no lock-in.' },
    /* --- System families ------------------------------------------------------ */
    { id: 'sys-voice', doc: 'Systems', title: 'Voice & Communication Intelligence', href: 'systems/voice-intelligence.html',
      text: 'Every call, meeting, and voice note becomes structured information: transcripts, summaries, action items, and routing into the tools your team already runs. Transcription live or after the fact, summaries with action items, intent and sentiment tagging, routing rules — with an optional voice agent on top.' },
    { id: 'sys-knowledge', doc: 'Systems', title: 'Knowledge Search & Retrieval', href: 'systems/knowledge-retrieval.html',
      text: 'Your organization\'s knowledge — policies, specs, decisions, manuals — becomes answerable, with every claim linked to the document and passage it came from. Hybrid retrieval, citation-first answers, role-aware sources, freshness tracking.' },
    { id: 'sys-document', doc: 'Systems', title: 'Document Intelligence', href: 'systems/document-intelligence.html',
      text: 'Documents in, structured and checked data out. Typed field extraction, tables and multi-page handling, classification and routing, cross-checking and confidence flags — every field traceable to its source, every low-confidence answer routed to a human. Built for invoices, applications, contracts, and claims.' },
    { id: 'sys-visual', doc: 'Systems', title: 'Visual Production Systems', href: 'systems/visual-production.html',
      text: 'A controlled pipeline for producing, varying, and quality-checking images at volume — so creative teams stop waiting on photoshoots, stock libraries, and off-brand AI output. Brand-conditioned generation, variation at volume, template library, automatic brand checks.' },
    { id: 'sys-assessment', doc: 'Systems', title: 'Assessment & Training Systems', href: 'systems/assessment-systems.html',
      text: 'Source material in — documentation, slides, video, audio — and a measured, scored learning path out, with item-level analytics instead of completed checkboxes. Content-to-question generation, difficulty and distractor tuning, autoscoring with rubrics, adaptive practice paths.' },
    { id: 'sys-design', doc: 'Systems', title: 'Design Visualization', href: 'systems/design-visualization.html',
      text: 'Early-stage design decisions stop waiting on expensive renders. A sketch or a written spec becomes a board of realistic directions in hours, under constraints you control: sketch-to-realistic pipelines, style exploration grids, consistent scene control, comparison boards.' },
    { id: 'sys-content', doc: 'Systems', title: 'Content Generation Pipelines', href: 'systems/content-pipelines.html',
      text: 'Content stops being a heroic scramble. Research-grounded drafting flows through an outline-first pipeline with your style guide encoded and your editors in control: source-grounded drafting, outline-first generation, multi-format expansion.' },
    /* --- Engagements ---------------------------------------------------------- */
    { id: 'pkg-audit', doc: 'Engagements', title: 'AI Readiness Audit', href: 'packages/ai-readiness-audit.html',
      text: 'A structured assessment of your workflows, data, and tooling that ends in a prioritized, reasoned roadmap — including the honest recommendation to do nothing where nothing is warranted. About 1 week, indicatively $600 – $1,400. Includes an opportunity matrix scoring every candidate workflow on value, feasibility, and risk.' },
    { id: 'pkg-mvp', doc: 'Engagements', title: 'AI Agent MVP', href: 'packages/ai-agent-mvp.html',
      text: 'A working agent for your highest-value workflow — deployed, connected, evaluated, and handed over. About 4–6 weeks, indicatively $3,500 – $9,000. Milestones you can demo, evaluation against your real cases, and complete handover of code and documentation.' },
    { id: 'pkg-sprint', doc: 'Engagements', title: 'AI Integration Sprint', href: 'packages/ai-integration-sprint.html',
      text: 'AI wired into the systems you already run — with retries, monitoring, and clean failure behavior. About 2–4 weeks, indicatively $2,000 – $6,000. Monitored, documented integrations that survive the boring days, not just the demo.' },
    { id: 'pkg-waa', doc: 'Engagements', title: 'Workflow Automation Audit', href: 'packages/workflow-automation-audit.html',
      text: 'Map one messy process end-to-end and find out what to automate, what to fix, and what to leave human. About 1–2 weeks, indicatively $800 – $1,800. Ends in a scoped process redesign you own.' },
    { id: 'pkg-workshop', doc: 'Engagements', title: 'AI Strategy Workshop', href: 'packages/ai-strategy-workshop.html',
      text: 'Get leadership aligned on what AI means for this business — with a shared vocabulary and a first plan. About 1–2 weeks, indicatively $500 – $1,000. Ends in a first plan the room built together.' },
    /* --- Honest answers ------------------------------------------------------- */
    { id: 'faq-price', doc: 'Honest answers', title: 'How ReWoo prices', href: 'index.html#faq',
      text: 'Indicative durations and price ranges are published on the engagements page — labeled estimates, so you can filter by budget before any call. The final number is always a fixed quote inside a written scope, set after discovery, and nothing is charged before you approve that document.' },
    { id: 'faq-feas', doc: 'Honest answers', title: 'If the build is not feasible', href: 'index.html#faq',
      text: 'You learn it early and in writing. Milestone structure and evaluation reports are designed to surface failure before it becomes expensive — including a stop recommendation when the quality bar cannot be met.' },
    { id: 'faq-own', doc: 'Honest answers', title: 'Who owns the code and data', href: 'index.html#faq',
      text: 'You do. Handover transfers the repository, configuration, credentials, and documentation. There is no hostage-taking and no recurring dependency unless you explicitly scope support.' },
    { id: 'about-1', doc: 'About the studio', title: 'The studio\'s commitments', href: 'about.html',
      text: 'ReWoo runs on three commitments you can check: every engagement begins with a written scope; every build hands over code, configuration, and documentation you own; and every claim on this site is either verifiable or clearly marked as an offer, not a history. The person who scopes your system is the person who builds it, evaluates it, and hands it over.' },
    { id: 'about-founder', doc: 'About the studio', title: 'The founder', href: 'about.html#founder',
      text: 'ReWoo is run by Adil, an AI systems engineer from Dhaka with a first-author publication on Bengali speaker diarization and a Kaggle Master rank. The studio\'s first client engagement was delivered for a team in the United Kingdom.' },
    { id: 'contact-nda', doc: 'Contact', title: 'NDAs and first calls', href: 'contact.html',
      text: 'Yes — ReWoo signs NDAs routinely. Say the word and we will use yours or provide a standard mutual one before anything sensitive is discussed. The first call is thirty minutes with the person who would scope and build: one workflow that hurts is enough to start.' },
    { id: 'sec-1', doc: 'Security', title: 'Where data lives', href: 'security.html',
      text: 'Systems deploy into infrastructure you own — your cloud account, your repositories, your API keys. During a build, access is scoped to what the milestone needs and revoked at handover, and after handover ReWoo retains no client data unless support is explicitly scoped.' }
  ];

  var STOP = { 'a': 1, 'an': 1, 'and': 1, 'are': 1, 'as': 1, 'at': 1, 'be': 1, 'but': 1, 'by': 1,
    'can': 1, 'do': 1, 'does': 1, 'for': 1, 'from': 1, 'has': 1, 'have': 1, 'how': 1, 'i': 1,
    'in': 1, 'is': 1, 'it': 1, 'its': 1, 'of': 1, 'on': 1, 'or': 1, 'our': 1, 'that': 1,
    'the': 1, 'their': 1, 'them': 1, 'there': 1, 'this': 1, 'to': 1, 'was': 1, 'we': 1,
    'what': 1, 'when': 1, 'which': 1, 'will': 1, 'with': 1, 'you': 1, 'your': 1 };

  function tokenize(s) {
    return (s.toLowerCase().match(/[a-z0-9\u0980-\u09FF']+/g) || [])
      .filter(function (t) { return !STOP[t]; });
  }

  /* --- BM25 index ------------------------------------------------------------ */
  function BM25Index(docs, k1, b) {
    this.k1 = k1 || 1.2;
    this.b = b || 0.75;
    this.docs = docs.map(function (d) {
      return { d: d, tf: {}, len: 0 };
    });
    this.N = this.docs.length;
    this.avgLen = 0;
    this.df = {};
    var self = this;
    this.docs.forEach(function (doc) {
      var toks = tokenize(d_text(doc.d));
      doc.len = toks.length;
      self.avgLen += doc.len;
      toks.forEach(function (t) {
        doc.tf[t] = (doc.tf[t] || 0) + 1;
      });
      Object.keys(doc.tf).forEach(function (t) {
        self.df[t] = (self.df[t] || 0) + 1;
      });
    });
    this.avgLen = this.N ? this.avgLen / this.N : 0;
    function d_text(d) { return d.doc + ' ' + d.title + ' ' + d.text; }
  }
  BM25Index.prototype.search = function (query, topN) {
    var toks = tokenize(query);
    var seen = {};
    var self = this;
    var scores = this.docs.map(function (doc, idx) {
      var s = 0;
      toks.forEach(function (t) {
        if (seen[t + ':' + idx]) return;
        seen[t + ':' + idx] = 1;
        var f = doc.tf[t];
        if (!f) return;
        var n = self.df[t] || 0;
        var idf = Math.log(1 + (self.N - n + 0.5) / (n + 0.5));
        s += idf * (f * (self.k1 + 1)) /
             (f + self.k1 * (1 - self.b + self.b * (doc.len / self.avgLen)));
      });
      return { idx: idx, score: s };
    });
    scores.sort(function (a, b2) { return b2.score - a.score; });
    var k = Math.min(topN || 5, scores.length);
    var out = [];
    for (var i = 0; i < k; i++) {
      if (scores[i].score <= 0) break;
      out.push({ chunk: this.docs[scores[i].idx].d, score: scores[i].score });
    }
    return out;
  };

  var INDEX = new BM25Index(CORPUS, 1.2, 0.75);

  /* --- Search UI -------------------------------------------------------------- */
  var searchBox = $('#ks-input');
  if (searchBox) {
    var resultsList = $('#ks-results');
    var statusLine = $('#ks-status');
    var emptyState = $('#ks-empty');
    var SAMPLES = [
      'What should a project brief include?',
      'How much does an agent MVP cost?',
      'What does RAG mean?',
      'Which tasks should stay human?',
      'Who owns the code after a build?'
    ];
    var sampleRow = $('#ks-samples');
    if (sampleRow) {
      SAMPLES.forEach(function (s) {
        var b = el('button', 'chip chip--sample', s);
        b.type = 'button';
        b.addEventListener('click', function () {
          searchBox.value = s;
          runSearch();
        });
        sampleRow.appendChild(b);
      });
    }

    function escapeHtml(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function highlight(text, query) {
      var toks = (query.toLowerCase().match(/[a-z0-9]+/g) || [])
        .filter(function (t) { return t.length > 2 && !STOP[t]; });
      if (!toks.length) return escapeHtml(text);
      var re;
      try {
        re = new RegExp('\\b(' + toks.join('|') + ')\\b', 'gi');
      } catch (e) { return escapeHtml(text); }
      var html = '';
      var last = 0;
      var m;
      while ((m = re.exec(text)) !== null) {
        html += escapeHtml(text.slice(last, m.index)) + '<mark>' + escapeHtml(m[0]) + '</mark>';
        last = m.index + m[0].length;
      }
      html += escapeHtml(text.slice(last));
      return html;
    }

    function runSearch() {
      var q = searchBox.value.trim();
      if (!q) {
        resultsList.innerHTML = '';
        if (statusLine) statusLine.textContent = '';
        if (emptyState) emptyState.hidden = false;
        return;
      }
      var hits = INDEX.search(q, 4);
      resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = hits.length > 0;
      hits.forEach(function (h, i) {
        var c = h.chunk;
        var card = el('article', 'ks-result');
        card.setAttribute('data-animate-in', '');
        var head = el('div', 'ks-result__head');
        var cite = el('a', 'ks-result__cite', '[' + (i + 1) + '] ' + c.doc + ' — ' + c.title);
        cite.href = c.href;
        head.appendChild(cite);
        var score = el('span', 'ks-result__score', 'score ' + h.score.toFixed(2));
        head.appendChild(score);
        card.appendChild(head);
        var body = el('p', 'ks-result__text');
        body.innerHTML = highlight(c.text, q);
        card.appendChild(body);
        resultsList.appendChild(card);
      });
      if (statusLine) {
        statusLine.textContent = hits.length
          ? hits.length + ' passage' + (hits.length > 1 ? 's' : '') + ' retrieved — click a citation to check the source.'
          : 'No passage scored above zero for that question. In a client build, this is where the system says “no confident answer” instead of guessing.';
      }
    }

    var debounce;
    searchBox.addEventListener('input', function () {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(runSearch, 160);
    });
    searchBox.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
    });
    var goBtn = $('#ks-go');
    if (goBtn) goBtn.addEventListener('click', runSearch);
  }

  /* --- Benchmark --------------------------------------------------------------- */
  var benchBtn = $('#bench-run');
  if (benchBtn) {
    var BENCH = [
      { q: 'What should a good project brief include?', gold: 'brief-2' },
      { q: 'How do I write a one-sentence brief?', gold: 'brief-1' },
      { q: 'What are red flags in a brief?', gold: 'brief-3' },
      { q: 'What should a builder return after receiving a brief?', gold: 'brief-4' },
      { q: 'What does RAG stand for?', gold: 'gloss-2' },
      { q: 'What is the difference between an agent and a tool?', gold: 'gloss-1' },
      { q: 'What is a guardrail?', gold: 'gloss-3' },
      { q: 'How do I decide which tasks to automate?', gold: 'ladder-2' },
      { q: 'What are the levels of the automation ladder?', gold: 'ladder-1' },
      { q: 'What happens at handover?', gold: 'proc-5' },
      { q: 'Who owns the code after a build?', gold: 'faq-own' },
      { q: 'How does ReWoo price engagements?', gold: 'faq-price' },
      { q: 'What does a readiness audit include?', gold: 'pkg-audit' },
      { q: 'How long does an agent MVP take and what does it cost?', gold: 'pkg-mvp' },
      { q: 'What can voice intelligence systems do with calls?', gold: 'sys-voice' },
      { q: 'How do I search company policies with citations?', gold: 'sys-knowledge' },
      /* Three questions chosen to stress the limits — they genuinely miss, and
         the misses are the point: vocabulary mismatch is what hybrid retrieval
         (the client-build path) exists to fix. Kept in, unhidden, on purpose. */
      { q: 'What does it cost to get started?', gold: 'faq-price' },
      { q: 'Is my information kept private?', gold: 'sec-1' },
      { q: 'Are you able to sign a confidentiality agreement?', gold: 'contact-nda' }
    ];

    benchBtn.addEventListener('click', function () {
      var resultsWrap = $('#bench-results');
      var summary = $('#bench-summary');
      var table = $('#bench-table tbody');
      resultsWrap.hidden = false;
      table.innerHTML = '';
      summary.textContent = 'Running ' + BENCH.length + ' questions through the same BM25 index you just used…';

      window.setTimeout(function () {
        var hit1 = 0, hit3 = 0, mrr = 0, misses = 0;
        BENCH.forEach(function (b) {
          var hits = INDEX.search(b.q, 5);
          var rank = 0;
          for (var i = 0; i < hits.length; i++) {
            if (hits[i].chunk.id === b.gold) { rank = i + 1; break; }
          }
          if (rank === 1) hit1++;
          if (rank >= 1 && rank <= 3) hit3++;
          if (rank >= 1) mrr += 1 / rank;
          if (rank === 0) misses++;

          var tr = el('tr', rank === 1 ? 'is-hit' : (rank ? 'is-partial' : 'is-miss'));
          var qTd = el('td', null, b.q);
          var exp = el('td', null, chunkLabel(b.gold));
          var rankTd = el('td', 'bench-rank', rank === 0 ? 'miss' : '#' + rank);
          tr.appendChild(qTd); tr.appendChild(exp); tr.appendChild(rankTd);
          table.appendChild(tr);
        });
        var n = BENCH.length;
        summary.innerHTML = '';
        var metrics = [
          ['Hit@1', (hit1 / n * 100).toFixed(1) + '%', hit1 + ' of ' + n + ' questions answered by the top passage'],
          ['Hit@3', (hit3 / n * 100).toFixed(1) + '%', hit3 + ' of ' + n + ' answered within the top three'],
          ['MRR', (mrr / n).toFixed(2), 'mean reciprocal rank across all ' + n],
          ['Misses', String(misses), misses + ' question' + (misses === 1 ? '' : 's') + ' where the gold passage was not retrieved — shown in the table, not hidden']
        ];
        metrics.forEach(function (m) {
          var card = el('div', 'bench-metric');
          card.appendChild(el('span', 'bench-metric__v', m[0]));
          card.appendChild(el('strong', 'bench-metric__n', m[1]));
          card.appendChild(el('span', 'bench-metric__d', m[2]));
          summary.appendChild(card);
        });
        var note = el('p', 'bench-note',
          'Computed in your browser just now, from the corpus above, with BM25 (k1 = 1.2, b = 0.75), English and Bangla tokenization, and a 27-term stop-word list. No reranker, no embeddings, no cherry-picking — the same code powers the search box. The misses are kept in deliberately: they are vocabulary-mismatch failures (“cost” vs “price”, “confidentiality agreement” vs “NDA”), which is exactly what the hybrid retrieval in a client build adds. Client builds are scored against your own questions.');
        summary.appendChild(note);
      }, 60);
    });

    function chunkLabel(id) {
      for (var i = 0; i < CORPUS.length; i++) {
        if (CORPUS[i].id === id) return CORPUS[i].doc + ' — ' + CORPUS[i].title;
      }
      return id;
    }
  }

  /* =============================================================================
     B. VOICE INTELLIGENCE DEMO
     ============================================================================= */

  var voiceDemo = $('#vd-app');
  if (voiceDemo) {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var startBtn = $('#vd-start');
    var stopBtn = $('#vd-stop');
    var transcript = $('#vd-transcript');
    var interim = $('#vd-interim');
    var meter = $('#vd-meter');
    var statWords = $('#vd-words');
    var statLatency = $('#vd-latency');
    var langSelect = $('#vd-lang');
    var supportNote = $('#vd-support');
    var rec = null;
    var running = false;
    var finalText = '';
    var lastFinalAt = 0;
    var lastResultAt = 0;

    if (!SR) {
      if (supportNote) {
        supportNote.hidden = false;
        supportNote.textContent = 'This browser does not expose the Web Speech API — live mode needs Chrome or Edge. The scripted pipeline below works everywhere.';
      }
      if (startBtn) startBtn.disabled = true;
    }

    function setRunning(on) {
      running = on;
      if (startBtn) startBtn.classList.toggle('is-live', on);
      if (startBtn) startBtn.textContent = on ? 'Listening — speak now' : 'Start listening';
      if (stopBtn) stopBtn.hidden = !on;
      if (meter) meter.classList.toggle('is-live', on);
    }

    if (startBtn && SR) {
      startBtn.addEventListener('click', function () {
        if (running) return;
        rec = new SR();
        rec.lang = (langSelect && langSelect.value) || 'en-US';
        rec.continuous = true;
        rec.interimResults = true;
        finalText = '';
        transcript.textContent = '';
        if (interim) interim.textContent = '';
        lastFinalAt = performance.now();
        statWords.textContent = '0';
        statLatency.textContent = '—';

        rec.onresult = function (e) {
          lastResultAt = performance.now();
          var interimText = '';
          for (var i = e.resultIndex; i < e.results.length; i++) {
            var r = e.results[i];
            if (r.isFinal) {
              finalText += r[0].transcript.trim() + ' ';
              var latency = Math.round(performance.now() - lastFinalAt);
              lastFinalAt = performance.now();
              if (statLatency) statLatency.textContent = latency + ' ms';
            } else {
              interimText += r[0].transcript;
            }
          }
          transcript.textContent = finalText.trim();
          if (interim) interim.textContent = interimText;
          if (statWords) statWords.textContent = String(finalText.trim() ? finalText.trim().split(/\s+/).length : 0);
        };
        rec.onerror = function (e) {
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
            if (supportNote) { supportNote.hidden = false; supportNote.textContent = 'Microphone permission was declined — live mode needs mic access. The scripted pipeline below works without one.'; }
          } else if (e.error === 'language-not-supported') {
            if (supportNote) { supportNote.hidden = false; supportNote.textContent = 'This browser\'s recognizer does not offer ' + rec.lang + ' — try English (US), or use the scripted pipeline below.'; }
          } else if (e.error !== 'no-speech' && e.error !== 'aborted') {
            if (supportNote) { supportNote.hidden = false; supportNote.textContent = 'Recognizer error: ' + e.error + '. The scripted pipeline below still works.'; }
          }
          setRunning(false);
        };
        rec.onend = function () { setRunning(false); };
        try { rec.start(); setRunning(true); } catch (err) { setRunning(false); }
      });
    }
    if (stopBtn) {
      stopBtn.addEventListener('click', function () {
        if (rec) { try { rec.stop(); } catch (e) {} }
        setRunning(false);
      });
    }

    /* --- Scripted pipeline -------------------------------------------------- */
    var playBtn = $('#vd-play');
    if (playBtn) {
      var STAGES = [
        { key: 'listen', t: 'Listen', d: 'Audio arrives — a support call in Bangla and English, code-switching mid-sentence.' },
        { key: 'transcribe', t: 'Transcribe', d: 'Speech becomes text, timestamps attached. Word accuracy is measured on real recordings, not marketing claims.' },
        { key: 'diarize', t: 'Separate speakers', d: 'Who spoke when — the diarization problem the founder published first-author research on, for Bengali audio.' },
        { key: 'understand', t: 'Understand', d: 'Intent, entities, and sentiment are extracted: what the caller wants, and how urgent it is.' },
        { key: 'act', t: 'Act', d: 'The system drafts a response, updates the order, and escalates by rule — with a human review queue for anything low-confidence.' }
      ];
      var TURNS = [
        { who: 'customer', stage: 'listen',
          bn: 'আমি অর্ডার করেছি পাঁচ দিন আগে, কিন্তু এখনো ডেলিভারি পাইনি। অর্ডার নম্বর ৪৫২১৯।',
          en: 'I placed an order five days ago, but I still have not received the delivery. Order number 45219.' },
        { who: 'agent', stage: 'transcribe',
          bn: 'I understand — let me check order 45219 for you.',
          en: 'I understand — let me check order 45219 for you. I can see it left the warehouse yesterday; it should arrive tomorrow.' },
        { who: 'customer', stage: 'diarize',
          bn: 'ঠিক আছে, কাল পর্যন্ত অপেক্ষা করব।',
          en: 'Alright, I will wait until tomorrow.' }
      ];
      var EXTRACT = [
        { k: 'intent', v: 'order_status inquiry' },
        { k: 'order ref', v: '#45219' },
        { k: 'language', v: 'bn + en (code-switched)' },
        { k: 'sentiment', v: 'mild concern, cooperative' },
        { k: 'next best action', v: 'send tracking link on WhatsApp, flag if not delivered in 24h' }
      ];

      var stageCards = $$('.vd-stage');
      var turnList = $('#vd-turns');
      var extractList = $('#vd-extract');
      var actionCard = $('#vd-action');
      var glossToggle = $('#vd-gloss');

      function reset() {
        stageCards.forEach(function (c) { c.classList.remove('is-done', 'is-active'); });
        if (turnList) turnList.innerHTML = '';
        if (extractList) extractList.innerHTML = '';
        if (actionCard) { actionCard.classList.remove('is-shown'); actionCard.innerHTML = ''; }
      }

      playBtn.addEventListener('click', function () {
        reset();
        playBtn.disabled = true;
        var seq = [];
        STAGES.forEach(function (s, i) {
          seq.push({ at: i * 1400, fn: function () {
            stageCards.forEach(function (c, j) {
              c.classList.toggle('is-active', j === i);
              if (j < i) c.classList.add('is-done');
            });
          } });
        });
        TURNS.forEach(function (t, i) {
          seq.push({ at: 400 + i * 1500, fn: function () {
            if (!turnList) return;
            var li = el('li', 'vd-turn vd-turn--' + t.who);
            li.setAttribute('data-animate-in', '');
            var who = el('span', 'vd-turn__who', t.who === 'customer' ? 'Caller' : 'Agent');
            var bn = el('p', 'vd-turn__bn');
            bn.setAttribute('data-bn', t.bn);
            bn.setAttribute('data-en', t.en);
            bn.textContent = t.bn;
            li.appendChild(who); li.appendChild(bn);
            /* English gloss only when it is actually a translation — an
               English-only turn must not render the same line twice. */
            if (t.en && t.en !== t.bn) {
              var en = el('p', 'vd-turn__en', t.en);
              li.appendChild(en);
            }
            turnList.appendChild(li);
            if (turnList.lastElementChild) turnList.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          } });
        });
        EXTRACT.forEach(function (x, i) {
          seq.push({ at: 4600 + i * 350, fn: function () {
            if (!extractList) return;
            var li = el('li', 'vd-kv');
            li.setAttribute('data-animate-in', '');
            li.appendChild(el('span', 'vd-kv__k', x.k));
            li.appendChild(el('span', 'vd-kv__v', x.v));
            extractList.appendChild(li);
          } });
        });
        seq.push({ at: 6800, fn: function () {
          if (!actionCard) return;
          actionCard.classList.add('is-shown');
          actionCard.appendChild(el('p', 'vd-action__t', 'Drafted reply (for a human to approve):'));
          actionCard.appendChild(el('p', 'vd-action__d',
            '“আপনার অর্ডার #45219 গতকাল পাঠানো হয়েছে — আগামীকালের মধ্যে পৌঁছে যাবে ইনশাআল্লাহ। ট্র্যাকিং লিংক পাঠানো হলো।” (Your order #45219 shipped yesterday and should arrive tomorrow — tracking link sent.)'));
          var flag = el('p', 'vd-action__flag', 'Rule fired: if not delivered within 24h → escalate to a human with the full transcript attached.');
          actionCard.appendChild(flag);
          stageCards.forEach(function (c) { c.classList.remove('is-active'); c.classList.add('is-done'); });
          playBtn.disabled = false;
        } });
        seq.forEach(function (s) { window.setTimeout(s.fn, s.at); });
      });

      if (glossToggle) {
        glossToggle.addEventListener('click', function () {
          var hideEn = document.body.classList.toggle('vd-hide-en');
          glossToggle.textContent = hideEn ? 'Show line-by-line translation' : 'Bangla only';
        });
      }
    }
  }

  /* =============================================================================
     C. AI SCOPE GENERATOR
     ============================================================================= */

  var scopeApp = $('#sg-app');
  if (scopeApp) {
    var SIGNALS = [
      { key: 'voice', label: 'Voice & communication', family: 'Voice & Communication Intelligence', href: 'systems/voice-intelligence.html',
        words: ['call', 'calls', 'phone', 'voice', 'transcribe', 'transcription', 'recording', 'recordings', 'meeting', 'meetings', 'voicemail', 'voice note', 'hotline', 'helpline', 'কল', 'ভয়েস', 'অডিও'],
        feats: ['Transcription of calls and voice notes (live or batch)', 'Summaries with action items and routing rules', 'Optional voice agent with human review queue'] },
      { key: 'knowledge', label: 'Knowledge search & retrieval', family: 'Knowledge Search & Retrieval', href: 'systems/knowledge-retrieval.html',
        words: ['policy', 'policies', 'handbook', 'documentation', 'docs', 'search', 'knowledge', 'faq', 'faqs', 'wiki', 'manual', 'manuals', 'citation', 'citations', 'answer', 'answers', 'পলিসি', 'ডকুমেন্ট'],
        feats: ['Hybrid retrieval over your documents with clickable citations', 'Role-aware source access and freshness tracking', '“No confident answer” behavior instead of guessing'] },
      { key: 'documents', label: 'Document intelligence', family: 'Document Intelligence', href: 'systems/document-intelligence.html',
        words: ['invoice', 'invoices', 'receipt', 'receipts', 'contract', 'contracts', 'form', 'forms', 'pdf', 'pdfs', 'extract', 'extraction', 'ocr', 'scan', 'scanned', 'claim', 'claims', 'application', 'applications', 'চালান', 'কন্ট্রাক্ট'],
        feats: ['Typed field extraction with traceability to source', 'Classification and routing by document type', 'Confidence flags with human review for low-certainty fields'] },
      { key: 'content', label: 'Content pipelines', family: 'Content Generation Pipelines', href: 'systems/content-pipelines.html',
        words: ['blog', 'blogs', 'article', 'articles', 'content', 'newsletter', 'social', 'seo', 'copywriting', 'post', 'posts', 'marketing', 'publish', 'publishing', 'লেখা', 'কনটেন্ট'],
        feats: ['Outline-first, source-grounded drafting', 'Your style guide encoded as checks', 'Editor approval gates before anything ships'] },
      { key: 'visual', label: 'Visual production', family: 'Visual Production Systems', href: 'systems/visual-production.html',
        words: ['image', 'images', 'photo', 'photos', 'picture', 'pictures', 'design', 'renders', 'render', 'sketch', 'sketches', 'brand', 'visual', 'visuals', 'creative', 'ছবি', 'ডিজাইন'],
        feats: ['Brand-conditioned image generation at volume', 'Template library and variation control', 'Automatic brand-safety checks before release'] },
      { key: 'assessment', label: 'Assessment & training', family: 'Assessment & Training Systems', href: 'systems/assessment-systems.html',
        words: ['training', 'train', 'quiz', 'quizzes', 'course', 'courses', 'onboarding', 'exam', 'exams', 'test', 'tests', 'learning', 'comprehension', 'প্রশিক্ষণ', 'কোর্স'],
        feats: ['Content-to-question generation from your material', 'Autoscoring with rubrics and item-level analytics', 'Adaptive practice paths with measured comprehension'] },
      { key: 'automation', label: 'Workflow automation', family: 'Workflow automation & integrations', href: 'capabilities/workflow-automation.html',
        words: ['workflow', 'workflows', 'process', 'processes', 'manual', 'spreadsheet', 'spreadsheets', 'excel', 'sheet', 'sheets', 'email', 'emails', 'repetitive', 'recurring', 'copy', 'paste', 'data entry', 'ওয়ার্কফ্লো'],
        feats: ['Process mapping with automate / fix / keep-human decisions', 'Integrations across the tools you already run', 'Failure behavior, retries, and monitoring designed in'] },
      { key: 'agent', label: 'Agentic system', family: 'AI agent / multi-agent system', href: 'capabilities/agentic-ai-systems.html',
        words: ['agent', 'agents', 'assistant', 'chatbot', 'chat', 'autonomous', 'booking', 'bookings', 'refund', 'refunds', 'resolve', 'ticket', 'tickets', 'support queue', 'এজেন্ট'],
        feats: ['Bounded tools with permission scopes and approval gates', 'Audit trail of every action the agent takes', 'Escalation paths to humans with full context'] }
    ];

    var generateBtn = $('#sg-generate');
    var briefInput = $('#sg-brief');
    var outPanel = $('#sg-out');

    generateBtn.addEventListener('click', function () {
      var text = briefInput.value.trim();
      var err = $('#sg-err');
      if (text.length < 25) {
        if (err) err.hidden = false;
        briefInput.focus();
        briefInput.classList.add('is-invalid');
        return;
      }
      if (err) err.hidden = true;
      briefInput.classList.remove('is-invalid');
      generate(text.toLowerCase(), text);
    });

    briefInput.addEventListener('input', function () {
      briefInput.classList.remove('is-invalid');
      var err = $('#sg-err');
      if (err && briefInput.value.trim().length >= 25) err.hidden = true;
    });

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

    function generate(hay, rawText) {
      /* -- signal matching ---------------------------------------------------- */
      var matched = SIGNALS.map(function (s) {
        var count = 0;
        s.words.forEach(function (w) {
          if (hay.indexOf(w) !== -1) count++;
        });
        return { s: s, count: count };
      }).filter(function (m) { return m.count > 0; })
        .sort(function (a, b) { return b.count - a.count; });

      var primary = matched[0] ? matched[0].s : null;
      var secondary = matched[1] ? matched[1].s : null;

      /* -- form context -------------------------------------------------------- */
      var where = ($('#sg-where') && $('#sg-where').value) || 'unsure';
      var touch = ($('#sg-touch') && $('#sg-touch').value) || '2-3';
      var langs = ($('#sg-langs') && $('#sg-langs').value) || 'en';
      var team = ($('#sg-team') && $('#sg-team').value) || '2-10';
      var onprem = $('#sg-onprem') && $('#sg-onprem').checked;

      /* -- scores ---------------------------------------------------------------- */
      var clarity = clamp(35 + Math.min(text_len_points(rawText), 40) + (matched.length ? 15 : 0) + (/\d/.test(rawText) ? 10 : 0), 20, 95);
      function text_len_points(t) { return Math.min(40, Math.round(t.length / 12)); }

      var dataReady = { 'saas': 75, 'spreadsheets': 65, 'calls': 60, 'paper': 30, 'unsure': 40 }[where] || 50;
      if (primary && primary.key === 'documents' && where === 'paper') dataReady = 35;
      if (primary && primary.key === 'knowledge' && (where === 'saas' || where === 'spreadsheets')) dataReady += 10;

      var integration = { '0-1': 80, '2-3': 55, '4+': 30 }[touch] || 55;
      if (onprem) integration -= 10;

      var readiness = clamp(Math.round((clarity + dataReady + integration) / 3), 10, 95);

      /* -- engagement + range -------------------------------------------------- */
      var engagement, duration, range, pkgHref;
      if (!primary || clarity < 45 || readiness < 45) {
        engagement = 'AI Readiness Audit'; duration = 'about 1 week'; range = '$600 – $1,400'; pkgHref = 'packages/ai-readiness-audit.html';
      } else if (integration < 45) {
        engagement = 'AI Integration Sprint'; duration = 'about 2–4 weeks'; range = '$2,000 – $6,000'; pkgHref = 'packages/ai-integration-sprint.html';
      } else {
        engagement = 'AI Agent MVP'; duration = 'about 4–6 weeks'; range = '$3,500 – $9,000'; pkgHref = 'packages/ai-agent-mvp.html';
      }

      /* -- render ---------------------------------------------------------------- */
      outPanel.hidden = false;
      outPanel.innerHTML = '';

      /* scores */
      var scoreWrap = el('div', 'sg-scores');
      scoreWrap.setAttribute('data-animate-in', '');
      scoreWrap.appendChild(el('h3', 'sg-sub-t', 'Readiness read-out'));
      var total = el('div', 'sg-total');
      total.appendChild(el('span', 'sg-total__n', String(readiness)));
      total.appendChild(el('span', 'sg-total__l', 'readiness — an indication of how prepared this workflow looks, not a verdict'));
      scoreWrap.appendChild(total);
      [['Workflow clarity', clarity], ['Data readiness', dataReady], ['Integration simplicity', integration]].forEach(function (s) {
        var row = el('div', 'sg-bar');
        row.appendChild(el('span', 'sg-bar__l', s[0]));
        var track = el('div', 'sg-bar__track');
        var fill = el('div', 'sg-bar__fill');
        fill.style.width = '0%';
        track.appendChild(fill);
        row.appendChild(track);
        row.appendChild(el('span', 'sg-bar__v', String(s[1])));
        scoreWrap.appendChild(row);
        window.setTimeout(function () { fill.style.width = s[1] + '%'; }, 120);
      });
      var sigRow = el('div', 'sg-signals');
      sigRow.appendChild(el('span', 'sg-signals__l', 'Matched signals:'));
      if (matched.length) {
        matched.slice(0, 3).forEach(function (m) {
          sigRow.appendChild(el('span', 'chip chip--sig', m.s.label + ' ×' + m.count));
        });
      } else {
        sigRow.appendChild(el('span', 'chip chip--sig', 'none yet — that itself is a finding'));
      }
      scoreWrap.appendChild(sigRow);
      outPanel.appendChild(scoreWrap);

      /* scope draft */
      var draft = el('div', 'sg-draft');
      draft.setAttribute('data-animate-in', '');
      draft.appendChild(el('h3', 'sg-sub-t', 'Draft written scope'));
      var scopeText = buildScopeText(rawText, primary, secondary, engagement, duration, range, langs, team, onprem, where, touch, readiness);
      var pre = el('pre', 'sg-pre');
      pre.id = 'sg-scope-text';
      pre.textContent = scopeText;
      draft.appendChild(pre);

      var actions = el('div', 'sg-actions');
      var copyBtn = el('button', 'btn btn--outline', 'Copy this scope');
      copyBtn.type = 'button';
      copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(scopeText).then(function () {
            copyBtn.textContent = 'Copied ✓';
            window.setTimeout(function () { copyBtn.textContent = 'Copy this scope'; }, 2000);
          });
        }
      });
      actions.appendChild(copyBtn);

      var mailBtn = el('a', 'btn btn--primary', 'Send it to ReWoo →');
      mailBtn.href = 'mailto:hello@rewoo.tech?subject=' +
        encodeURIComponent('Scope generator draft — ReWoo') + '&body=' +
        encodeURIComponent(scopeText + '\n\n—\nDrafted with the ReWoo Scope Generator (rewoo.tech/scope-generator.html)');
      actions.appendChild(mailBtn);

      var waBtn = el('a', 'btn btn--ghost', 'or continue on WhatsApp');
      /* Runtime wiring, same pattern as site.js module 10 — no raw deep link
         ships in the served HTML. */
      var waNum = '880' + '1321' + '073452';
      waBtn.href = 'https://wa.me/' + waNum + '?text=' +
        encodeURIComponent('Hi Adil — I drafted a scope with your Scope Generator: "' +
          rawText.slice(0, 120) + (rawText.length > 120 ? '…' : '') + '"');
      waBtn.target = '_blank';
      waBtn.rel = 'noopener noreferrer';
      actions.appendChild(waBtn);
      draft.appendChild(actions);

      var fine = el('p', 'sg-fine',
        'Generated in your browser by a transparent heuristic — an assistant, not a quote. The real scope is written by a human after a call, and it is yours to take anywhere. Indicative ranges match the published engagements page.');
      draft.appendChild(fine);
      outPanel.appendChild(draft);

      outPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function buildScopeText(rawText, primary, secondary, engagement, duration, range, langs, team, onprem, where, touch, readiness) {
      var L = [];
      L.push('DRAFT SCOPE — generated with the ReWoo Scope Generator');
      L.push('Draft v0 · not a quote · prepared for human review');
      L.push('');
      L.push('1. OBJECTIVE');
      L.push(rawText);
      L.push('');
      L.push('2. SUGGESTED SYSTEM FAMILY');
      if (primary) {
        L.push('Primary: ' + primary.family + ' (rewoo.tech/' + primary.href + ')');
        if (secondary) L.push('Secondary: ' + secondary.family);
      } else {
        L.push('No strong signal detected. Recommendation: start with an AI Readiness Audit — the first call maps the workflow properly before any build is priced.');
      }
      L.push('');
      L.push('3. DRAFT IN-SCOPE ITEMS');
      if (primary) {
        primary.feats.forEach(function (f) { L.push('- ' + f); });
      } else {
        L.push('- Workflow discovery session (60–90 min)');
        L.push('- Data and tooling readiness review');
        L.push('- Opportunity matrix: value, feasibility, risk');
      }
      L.push('- Evaluation against your own test cases before acceptance');
      L.push('- Complete handover: code, configuration, documentation');
      L.push('');
      L.push('4. OUT OF SCOPE (default)');
      L.push('- Changes to systems outside the agreed integration list');
      L.push('- Ongoing operation or support unless separately scoped');
      L.push('- Any action without a human approval gate where reversibility is low');
      L.push('');
      L.push('5. MILESTONES (indicative)');
      L.push('M1 · Discovery and written scope sign-off');
      L.push('M2 · Working slice on real data — demoable');
      L.push('M3 · Evaluation report against your cases (failures included)');
      L.push('M4 · Integration, hardening, and handover session');
      L.push('');
      L.push('6. EVALUATION & ACCEPTANCE');
      L.push('- A golden set of your real cases is collected before the build.');
      L.push('- Acceptance thresholds are agreed in writing at M1.');
      L.push('- If the quality bar cannot be met, you get a stop recommendation — not a soft landing.');
      L.push('');
      L.push('7. INDICATIVE SHAPE');
      L.push('Engagement: ' + engagement + ' · ' + duration + ' · indicatively ' + range + ' (estimate; fixed quote comes at scope sign-off)');
      L.push('Team size: ' + team + ' · systems to touch: ' + touch + ' · languages: ' +
        (langs === 'both' ? 'English + Bangla' : langs === 'bn' ? 'Bangla' : 'English'));
      if (onprem) L.push('Deployment note: data cannot leave your infrastructure — private or on-premise delivery will be planned in the scope.');
      L.push('');
      L.push('8. OPEN QUESTIONS FOR THE FIRST CALL');
      if (where === 'unsure') L.push('- Where does this work live today (tools, files, people)?');
      if (where === 'paper') L.push('- Digitization: how much of the source material is paper-only today?');
      if (clarity_hint(rawText)) L.push('- The description is broad — the first call narrows it to one workflow and one decision it feeds.');
      if (touch === '4+') L.push('- Integration order: which of the systems is the natural first touchpoint?');
      L.push('- What must never happen? (defines guardrails and review gates)');
      L.push('- Three examples of done-right — good and bad.');
      L.push('');
      L.push('9. NEXT STEP');
      L.push('Send this draft to hello@rewoo.tech or message WhatsApp — the reply is a human (the founder), and the first call is thirty minutes.');
      return L.join('\n');

      function clarity_hint(t) { return t.split(/[.!?]/).length <= 2 && t.length < 160; }
    }

    /* Sample briefs */
    $$('.sg-sample').forEach(function (b) {
      b.addEventListener('click', function () {
        briefInput.value = b.getAttribute('data-sample') || b.textContent.trim();
        briefInput.dispatchEvent(new Event('input'));
        generateBtn.focus();
      });
    });
  }

})();
