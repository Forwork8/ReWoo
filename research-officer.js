/* =============================================================================
   ReWoo Research Officer — research-officer.js
   Core engine: notebook parsing, OpenRouter streaming, arXiv citations, export.
   https://rewoo.tech/research-officer
   ============================================================================= */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const OPENROUTER_BASE  = 'https://openrouter.ai/api/v1/chat/completions';
const ARXIV_BASE       = 'https://export.arxiv.org/api/query';
const MODEL            = 'anthropic/claude-3-haiku';   // fast, affordable, streaming

// Steps
const STEPS = ['upload', 'building', 'review', 'export'];

// Known ML/stats library → search term for arXiv
const METHOD_KEYWORDS = {
  lightgbm:       'LightGBM gradient boosting',
  xgboost:        'XGBoost gradient boosting',
  'random_forest': 'random forest ensemble',
  'random forest': 'random forest ensemble',
  randomforest:    'random forest ensemble',
  sklearn:         'scikit-learn machine learning',
  pytorch:         'PyTorch deep learning',
  tensorflow:      'TensorFlow deep learning',
  keras:           'Keras deep learning neural network',
  shap:            'SHAP shapley explainability',
  lime:            'LIME local interpretable model',
  catboost:        'CatBoost gradient boosting',
  'logistic_regression': 'logistic regression classification',
  svm:             'support vector machine classification',
  'neural_network': 'neural network deep learning',
  transformer:     'Transformer attention mechanism',
  bert:            'BERT pre-trained language model',
  kmeans:          'k-means clustering unsupervised',
  pca:             'principal component analysis dimensionality',
  tsne:            't-SNE dimensionality reduction visualization',
  umap:            'UMAP dimensionality reduction manifold',
  statsmodels:     'statistical modeling regression analysis',
  scipy:           'SciPy scientific computing statistical',
  pandas:          'pandas data analysis tabular',
};

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

const state = {
  step:           0,
  notebookFile:   null,
  datasetFile:    null,
  notebookData:   null,   // parsed notebook object
  parsedContext:  null,   // extracted context object
  citations:      [],     // array of { id, title, authors, year, url, method }
  sections:       {},     // { intro, methods, results, discussion }
  apiKey:         '',
};

// ─────────────────────────────────────────────────────────────────────────────
// DOM REFERENCES — resolved after DOMContentLoaded
// ─────────────────────────────────────────────────────────────────────────────

let el = {};

function resolveDOM() {
  el = {
    // Tracker
    steps:         document.querySelectorAll('.ro-step'),
    // Panels
    panels:        document.querySelectorAll('.ro-panel'),
    // Upload
    nbInput:       document.getElementById('ro-nb-input'),
    nbZone:        document.getElementById('ro-nb-zone'),
    nbFilename:    document.getElementById('ro-nb-filename'),
    dsInput:       document.getElementById('ro-ds-input'),
    dsZone:        document.getElementById('ro-ds-zone'),
    dsFilename:    document.getElementById('ro-ds-filename'),
    buildBtn:      document.getElementById('ro-build-btn'),
    apiKeyInput:   document.getElementById('ro-apikey-input'),
    // Building
    pipeline:      document.getElementById('ro-pipeline'),
    streamText:    document.getElementById('ro-stream-text'),
    // Review
    reviewHeader:  document.getElementById('ro-review-header'),
    paperTitle:    document.getElementById('ro-paper-title'),
    citationCount: document.getElementById('ro-citation-count'),
    paperSections: document.getElementById('ro-paper-sections'),
    citationList:  document.getElementById('ro-citation-list'),
    actionBar:     document.getElementById('ro-action-bar'),
    // Export
    exportDocx:    document.getElementById('ro-export-docx'),
    exportCopy:    document.getElementById('ro-export-copy'),
    restartBtn:    document.getElementById('ro-restart'),
    // Error
    errorToast:    document.getElementById('ro-error-toast'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION — step management
// ─────────────────────────────────────────────────────────────────────────────

function goToStep(index) {
  state.step = index;

  // Update tracker pills
  el.steps.forEach((s, i) => {
    s.classList.remove('is-active', 'is-done');
    if (i < index)  s.classList.add('is-done');
    if (i === index) s.classList.add('is-active');
  });

  // Show correct panel
  el.panels.forEach((p, i) => {
    p.classList.toggle('is-active', i === index);
  });

  // Scroll to top on step change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────────────────────────────
// FILE HANDLING — drop + input
// ─────────────────────────────────────────────────────────────────────────────

function setupDropzone(zone, input, filenamEl, ext, onFile) {
  // Click to open file picker
  zone.addEventListener('click', (e) => {
    if (e.target === input) return;
    input.click();
  });

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) handleFile(file, zone, filenamEl, ext, onFile);
  });

  // Drag & drop
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('is-over');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('is-over');
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('is-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, zone, filenamEl, ext, onFile);
  });
}

function handleFile(file, zone, filenameEl, ext, onFile) {
  const name = file.name.toLowerCase();
  if (!name.endsWith(ext) && ext !== '*') {
    showError(`Please upload a ${ext} file.`);
    return;
  }
  zone.classList.add('is-filled');
  filenameEl.textContent = file.name;
  onFile(file);
  checkBuildReady();
}

function checkBuildReady() {
  const apiKey = el.apiKeyInput ? el.apiKeyInput.value.trim() : '';
  const ready = state.notebookFile !== null && apiKey.length > 20;
  el.buildBtn.classList.toggle('is-ready', ready);
  el.buildBtn.disabled = !ready;
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTEBOOK PARSER — extract context from .ipynb JSON
// ─────────────────────────────────────────────────────────────────────────────

function parseNotebook(json) {
  const cells    = json.cells || json.worksheets?.[0]?.cells || [];
  const context  = {
    language:     json.metadata?.kernelspec?.language || 'python',
    title:        '',
    description:  '',
    imports:      [],
    methods:      [],
    codeBlocks:   [],
    outputs:      [],
    markdownText: '',
    metrics:      {},
    datasetInfo:  '',
  };

  const markdownChunks = [];
  const codeChunks     = [];

  for (const cell of cells) {
    const src = Array.isArray(cell.source)
      ? cell.source.join('')
      : (cell.source || '');

    if (cell.cell_type === 'markdown') {
      markdownChunks.push(src);

      // Extract title from first h1/h2
      if (!context.title) {
        const m = src.match(/^#{1,2}\s+(.+)/m);
        if (m) context.title = m[1].replace(/\*\*/g, '').trim();
      }
    }

    if (cell.cell_type === 'code') {
      codeChunks.push(src);

      // Extract imports
      const importLines = src.match(/^\s*(import|from)\s+(\S+)/gm) || [];
      importLines.forEach(line => {
        const pkg = line.trim().split(/\s+/)[1]?.split('.')[0]?.toLowerCase();
        if (pkg && !context.imports.includes(pkg)) context.imports.push(pkg);
      });

      // Detect methods from imports + code
      for (const [key, label] of Object.entries(METHOD_KEYWORDS)) {
        if (src.toLowerCase().includes(key) && !context.methods.includes(label)) {
          context.methods.push(label);
        }
      }

      // Parse cell outputs
      const outs = cell.outputs || [];
      for (const out of outs) {
        const text = Array.isArray(out.text)
          ? out.text.join('')
          : (out.text || '');

        if (text) {
          context.outputs.push(text.slice(0, 400)); // cap output length

          // Extract metrics (accuracy, f1, precision, recall, auc, mse, rmse, r2, loss)
          const metricRe = /\b(accuracy|f1[_\s]?score|precision|recall|auc|roc_auc|mse|rmse|r2|mae|loss)\b[:\s=]+([0-9]+\.[0-9]+)/gi;
          let mm;
          while ((mm = metricRe.exec(text)) !== null) {
            const key   = mm[1].toLowerCase().replace(/\s/g, '_');
            const value = parseFloat(mm[2]);
            if (!isNaN(value)) context.metrics[key] = value;
          }

          // Extract dataset info
          if (text.includes('shape') || text.includes('rows') || text.includes('columns')) {
            context.datasetInfo += text.slice(0, 300) + '\n';
          }
        }

        // Handle display_data / execute_result with plain text
        const data = out.data || {};
        const plainText = Array.isArray(data['text/plain'])
          ? data['text/plain'].join('')
          : (data['text/plain'] || '');
        if (plainText && !context.outputs.includes(plainText.slice(0, 400))) {
          context.outputs.push(plainText.slice(0, 400));

          const metricRe2 = /\b(accuracy|f1[_\s]?score|precision|recall|auc|mse|rmse|r2|mae|loss)\b[:\s=]+([0-9]+\.[0-9]+)/gi;
          let mm2;
          while ((mm2 = metricRe2.exec(plainText)) !== null) {
            const k = mm2[1].toLowerCase().replace(/\s/g, '_');
            const v = parseFloat(mm2[2]);
            if (!isNaN(v)) context.metrics[k] = v;
          }
        }
      }
    }
  }

  context.markdownText = markdownChunks.join('\n\n').slice(0, 3000);
  context.codeBlocks   = codeChunks.slice(0, 8).join('\n\n---\n\n').slice(0, 4000);

  if (!context.title) context.title = 'Research Paper';

  return context;
}

// ─────────────────────────────────────────────────────────────────────────────
// ARXIV CITATIONS — fetch real papers for detected methods
// ─────────────────────────────────────────────────────────────────────────────

async function fetchCitations(methods) {
  const citations = [];
  const seen      = new Set();

  // Deduplicate methods, take top 4
  const topMethods = [...new Set(methods)].slice(0, 4);

  for (const method of topMethods) {
    try {
      const query    = encodeURIComponent(`all:${method.split(' ').slice(0, 3).join(' ')}`);
      const url      = `${ARXIV_BASE}?search_query=${query}&max_results=2&sortBy=relevance`;
      const resp     = await fetch(url);
      if (!resp.ok) continue;

      const xmlText  = await resp.text();
      const parser   = new DOMParser();
      const doc      = parser.parseFromString(xmlText, 'application/xml');
      const entries  = doc.querySelectorAll('entry');

      for (const entry of entries) {
        const id       = entry.querySelector('id')?.textContent?.trim();
        const title    = entry.querySelector('title')?.textContent?.trim().replace(/\s+/g, ' ');
        const authors  = [...entry.querySelectorAll('author name')].map(a => a.textContent.trim());
        const published= entry.querySelector('published')?.textContent?.trim();
        const year     = published ? new Date(published).getFullYear() : '';
        const arxivId  = id?.split('/abs/')[1] || id?.split('arxiv.org/abs/')[1] || id;

        if (title && arxivId && !seen.has(arxivId)) {
          seen.add(arxivId);
          citations.push({
            id:      citations.length + 1,
            title,
            authors: authors.slice(0, 3),
            year,
            url:     `https://arxiv.org/abs/${arxivId}`,
            method,
          });
          break; // one paper per method
        }
      }
    } catch (e) {
      // arXiv down or CORS issue — skip gracefully
      console.warn('arXiv fetch failed for method:', method, e);
    }
  }

  return citations;
}

// ─────────────────────────────────────────────────────────────────────────────
// OPENROUTER STREAMING — call API and stream tokens into a callback
// ─────────────────────────────────────────────────────────────────────────────

async function streamSection(systemPrompt, userPrompt, apiKey, onToken) {
  const resp = await fetch(OPENROUTER_BASE, {
    method: 'POST',
    headers: {
      'Content-Type':     'application/json',
      'Authorization':    `Bearer ${apiKey}`,
      'HTTP-Referer':     'https://rewoo.tech',
      'X-Title':          'ReWoo Research Officer',
    },
    body: JSON.stringify({
      model:  MODEL,
      stream: true,
      max_tokens: 900,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt   },
      ],
    }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`OpenRouter error ${resp.status}: ${body.slice(0, 200)}`);
  }

  const reader = resp.body.getReader();
  const dec    = new TextDecoder();
  let   buf    = '';
  let   result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop(); // keep incomplete line in buffer

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (!trimmed.startsWith('data: ')) continue;

      try {
        const json  = JSON.parse(trimmed.slice(6));
        const token = json.choices?.[0]?.delta?.content || '';
        if (token) {
          result += token;
          onToken(token);
        }
      } catch (_) {
        // malformed JSON chunk — skip
      }
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROMPT BUILDERS — construct section-specific prompts
// ─────────────────────────────────────────────────────────────────────────────

function buildSystemPrompt(ctx, citations) {
  const citationBlock = citations.map(c =>
    `[${c.id}] ${c.authors.join(', ')} (${c.year}). "${c.title}". arXiv: ${c.url}`
  ).join('\n');

  const metricsBlock = Object.entries(ctx.metrics)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ') || 'No numeric metrics extracted';

  return `You are an expert scientific writing assistant. Your job is to write a section of a rigorous, publication-ready academic paper.

NOTEBOOK CONTEXT:
- Detected methods: ${ctx.methods.join(', ') || 'general analysis'}
- Python libraries used: ${ctx.imports.join(', ')}
- Extracted metrics from outputs: ${metricsBlock}
- Dataset information: ${ctx.datasetInfo.slice(0, 500) || 'Not detected'}

AVAILABLE CITATIONS (use ONLY these — do not invent papers):
${citationBlock || 'No citations available — do not cite anything.'}

EXTRACTED CODE SNIPPETS (for context):
${ctx.codeBlocks.slice(0, 2000)}

NOTEBOOK MARKDOWN NOTES:
${ctx.markdownText.slice(0, 1500)}

HARD RULES:
1. NEVER invent statistics, numbers, or percentages that are not in the extracted metrics above.
2. NEVER invent citations. Only cite the papers listed above, using [N] inline format.
3. Use formal, precise academic English. No marketing language.
4. Write exactly 2–4 paragraphs for each section. No headings or markdown formatting.
5. Every numerical claim must trace back to the extracted metrics provided.
6. If metrics are insufficient, state what was observed rather than inventing numbers.`;
}

function buildIntroPrompt(ctx) {
  return `Write the INTRODUCTION section for this research paper.

The paper uses: ${ctx.methods.join(', ') || 'data analysis techniques'}.
${ctx.markdownText ? `Research context from notebook:\n${ctx.markdownText.slice(0, 800)}` : ''}

The introduction must:
1. Establish the research problem and its importance
2. Briefly review relevant prior work (cite available papers using [N] format if relevant)
3. State clearly what this paper contributes
4. End with a sentence describing the paper's structure

Write 3 focused paragraphs. Plain prose, no markdown.`;
}

function buildMethodsPrompt(ctx) {
  return `Write the METHODS section for this research paper.

Detected methods and techniques used: ${ctx.methods.join('; ') || 'statistical analysis'}
Libraries and tools: ${ctx.imports.join(', ')}
Dataset info: ${ctx.datasetInfo.slice(0, 400) || 'Not extracted from notebook'}

The methods section must:
1. Describe the dataset characteristics (use only what is detected, be honest about what is unknown)
2. Detail the machine learning / analysis methods used, citing relevant papers [N] where appropriate
3. Explain any preprocessing, feature engineering, or experimental design evident from the code
4. Describe the evaluation metrics used

Write 3 paragraphs. Plain prose, no markdown, no bullet points.`;
}

function buildResultsPrompt(ctx) {
  const metricLines = Object.entries(ctx.metrics)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n') || '- No numeric metrics extracted from notebook outputs';

  return `Write the RESULTS section for this research paper.

EXACT METRICS FROM NOTEBOOK OUTPUTS (use ONLY these values):
${metricLines}

Raw output snippets:
${ctx.outputs.slice(0, 5).join('\n').slice(0, 800)}

The results section must:
1. Report the exact performance metrics above — never round or adjust them
2. Describe the key patterns and findings visible from the outputs
3. If multiple metrics are present, compare and contextualize them
4. Be honest: if a metric suggests room for improvement, say so

Write 2–3 paragraphs. Plain prose only, no markdown tables or bullet points.`;
}

function buildDiscussionPrompt(ctx) {
  return `Write the DISCUSSION section for this research paper.

Summarize what was found:
- Methods: ${ctx.methods.join(', ') || 'data analysis'}
- Metrics achieved: ${Object.entries(ctx.metrics).map(([k,v]) => `${k}=${v}`).join(', ') || 'see results section'}

The discussion must:
1. Interpret the results — what do they mean in practice?
2. Acknowledge limitations honestly (data size, generalizability, confounds)
3. Compare to the prior work cited, where possible
4. Suggest concrete future directions (2–3 specific ideas)
5. End with a concise conclusion sentence

Write 3–4 paragraphs. Plain prose, no markdown.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE — orchestrate all agents
// ─────────────────────────────────────────────────────────────────────────────

const AGENT_CONFIG = [
  { id: 'parse',    emoji: '🔍', label: 'Parsing notebook',          status: 'Reading code, outputs & markdown…' },
  { id: 'cite',     emoji: '📚', label: 'Fetching real citations',    status: 'Querying arXiv API…' },
  { id: 'intro',    emoji: '✍️', label: 'Drafting Introduction',      status: 'Writing…' },
  { id: 'methods',  emoji: '⚗️', label: 'Drafting Methods',           status: 'Writing…' },
  { id: 'results',  emoji: '📊', label: 'Drafting Results',           status: 'Writing…' },
  { id: 'discuss',  emoji: '💬', label: 'Drafting Discussion',        status: 'Writing…' },
  { id: 'verify',   emoji: '✅', label: 'Verifying citations',        status: 'Checking sources…' },
];

function renderPipeline() {
  el.pipeline.innerHTML = AGENT_CONFIG.map(a => `
    <div class="ro-agent" id="agent-${a.id}" role="status" aria-live="polite">
      <div class="ro-agent__icon">${a.emoji}</div>
      <div class="ro-agent__info">
        <div class="ro-agent__label">${a.label}</div>
        <div class="ro-agent__status" id="agent-${a.id}-status">Waiting…</div>
      </div>
      <div class="ro-agent__badge" id="agent-${a.id}-badge">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      </div>
    </div>
  `).join('');
}

function setAgentState(id, state) {
  const agentEl  = document.getElementById(`agent-${id}`);
  const statusEl = document.getElementById(`agent-${id}-status`);
  const badgeEl  = document.getElementById(`agent-${id}-badge`);
  if (!agentEl) return;

  const cfg = AGENT_CONFIG.find(a => a.id === id);

  agentEl.classList.remove('is-running', 'is-done');
  if (state === 'running') {
    agentEl.classList.add('is-running');
    statusEl.textContent = cfg.status;
    badgeEl.innerHTML    = '<div class="ro-spinner"></div>';
  } else if (state === 'done') {
    agentEl.classList.add('is-done');
    statusEl.textContent = 'Done';
    badgeEl.innerHTML    = '✓';
  } else if (state === 'error') {
    statusEl.textContent = 'Error';
    badgeEl.innerHTML    = '✕';
  }
}

function appendStreamText(token) {
  if (!el.streamText) return;
  el.streamText.textContent += token;
  // Keep scrolled to bottom
  const parent = el.streamText.closest('.ro-stream-preview');
  if (parent) parent.scrollTop = parent.scrollHeight;
}

function clearStreamText() {
  if (el.streamText) el.streamText.textContent = '';
}

async function runPipeline() {
  const apiKey = el.apiKeyInput.value.trim();
  state.apiKey = apiKey;

  goToStep(1);
  renderPipeline();

  try {
    // ── Agent 1: Parse notebook ──────────────────────────────────────
    setAgentState('parse', 'running');
    await sleep(200);

    const text    = await readFileAsText(state.notebookFile);
    const nbJson  = JSON.parse(text);
    state.notebookData  = nbJson;
    state.parsedContext = parseNotebook(nbJson);
    setAgentState('parse', 'done');

    // ── Agent 2: Fetch citations ─────────────────────────────────────
    setAgentState('cite', 'running');
    state.citations = await fetchCitations(state.parsedContext.methods);
    setAgentState('cite', 'done');

    // Build system prompt (shared across all sections)
    const systemPrompt = buildSystemPrompt(state.parsedContext, state.citations);

    // ── Agent 3: Introduction ────────────────────────────────────────
    setAgentState('intro', 'running');
    clearStreamText();
    state.sections.intro = await streamSection(
      systemPrompt,
      buildIntroPrompt(state.parsedContext),
      apiKey,
      appendStreamText
    );
    setAgentState('intro', 'done');

    // ── Agent 4: Methods ─────────────────────────────────────────────
    setAgentState('methods', 'running');
    clearStreamText();
    state.sections.methods = await streamSection(
      systemPrompt,
      buildMethodsPrompt(state.parsedContext),
      apiKey,
      appendStreamText
    );
    setAgentState('methods', 'done');

    // ── Agent 5: Results ─────────────────────────────────────────────
    setAgentState('results', 'running');
    clearStreamText();
    state.sections.results = await streamSection(
      systemPrompt,
      buildResultsPrompt(state.parsedContext),
      apiKey,
      appendStreamText
    );
    setAgentState('results', 'done');

    // ── Agent 6: Discussion ──────────────────────────────────────────
    setAgentState('discuss', 'running');
    clearStreamText();
    state.sections.discussion = await streamSection(
      systemPrompt,
      buildDiscussionPrompt(state.parsedContext),
      apiKey,
      appendStreamText
    );
    setAgentState('discuss', 'done');

    // ── Agent 7: Verify citations ────────────────────────────────────
    setAgentState('verify', 'running');
    await sleep(600); // brief pause to simulate verification
    setAgentState('verify', 'done');

    // ── Transition to review ─────────────────────────────────────────
    await sleep(800);
    renderReview();
    goToStep(2);
    setTimeout(() => showActionBar(), 1200);

  } catch (err) {
    console.error('Pipeline error:', err);
    showError(err.message || 'Something went wrong. Check your API key and try again.');
    // Stay on building panel so user can see what failed
    const runningAgents = document.querySelectorAll('.ro-agent.is-running');
    runningAgents.forEach(a => {
      const id = a.id.replace('agent-', '');
      setAgentState(id, 'error');
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW RENDER — build the review panel from generated sections
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_DEFS = [
  { key: 'intro',      label: 'I',   title: 'Introduction' },
  { key: 'methods',    label: 'M',   title: 'Methods' },
  { key: 'results',    label: 'R',   title: 'Results' },
  { key: 'discussion', label: 'D',   title: 'Discussion' },
];

function renderReview() {
  const ctx    = state.parsedContext;
  const title  = ctx.title || 'Research Paper';

  // Paper title and badges
  if (el.paperTitle) el.paperTitle.textContent = title;
  if (el.citationCount) el.citationCount.textContent = state.citations.length;

  // Render paper sections
  if (el.paperSections) {
    el.paperSections.innerHTML = SECTION_DEFS.map((def, idx) => {
      const content  = state.sections[def.key] || '';
      const paragraphs = splitIntoParagraphs(content);

      return `
        <div class="ro-section ${idx === 0 ? 'is-open' : ''}" id="ro-sec-${def.key}">
          <div class="ro-section__head" tabindex="0" role="button"
               aria-expanded="${idx === 0}" aria-controls="ro-sec-${def.key}-body">
            <div class="ro-section__name">
              <span class="ro-section__label">${def.label}</span>
              <span class="ro-section__title">${def.title}</span>
            </div>
            <div class="ro-section__actions">
              <button class="ro-section__regen" id="regen-${def.key}"
                      data-section="${def.key}" title="Regenerate this section">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
                Regenerate
              </button>
              <svg class="ro-section__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>
          <div class="ro-section__body" id="ro-sec-${def.key}-body">
            ${paragraphs.map(p => `<div class="ro-para">${escapeHTML(p)}</div>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render citations
  if (el.citationList) {
    if (state.citations.length === 0) {
      el.citationList.innerHTML = `<p style="font-size:0.82rem;color:var(--dim);padding:var(--sp-4) 0;">
        No citations could be retrieved from arXiv for the detected methods. 
        You may add citations manually.
      </p>`;
    } else {
      el.citationList.innerHTML = state.citations.map(c => `
        <div class="ro-cite-item">
          <div class="ro-cite-num">${c.id}</div>
          <div class="ro-cite-body">
            <div class="ro-cite-title">${escapeHTML(c.title)}</div>
            <div class="ro-cite-meta">
              ${escapeHTML(c.authors.join(', '))} · ${c.year}
              <br>Method: ${escapeHTML(c.method)}
            </div>
            <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="ro-cite-link">
              arXiv →
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  // Wire up section toggles and regenerate buttons
  wireSectionInteractions();
}

function wireSectionInteractions() {
  // Section collapse/expand
  document.querySelectorAll('.ro-section__head').forEach(head => {
    head.addEventListener('click', (e) => {
      // Don't toggle if regen button was clicked
      if (e.target.closest('.ro-section__regen')) return;
      const section = head.closest('.ro-section');
      const isOpen  = section.classList.contains('is-open');
      section.classList.toggle('is-open', !isOpen);
      head.setAttribute('aria-expanded', String(!isOpen));
    });

    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        head.click();
      }
    });
  });

  // Regenerate buttons
  document.querySelectorAll('.ro-section__regen').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sectionKey = btn.dataset.section;
      regenerateSection(sectionKey, btn);
    });
  });
}

async function regenerateSection(sectionKey, btn) {
  const systemPrompt = buildSystemPrompt(state.parsedContext, state.citations);
  const ctx          = state.parsedContext;

  const promptMap = {
    intro:      buildIntroPrompt(ctx),
    methods:    buildMethodsPrompt(ctx),
    results:    buildResultsPrompt(ctx),
    discussion: buildDiscussionPrompt(ctx),
  };

  const bodyEl = document.getElementById(`ro-sec-${sectionKey}-body`);
  if (!bodyEl) return;

  btn.classList.add('is-spinning');
  btn.disabled = true;

  // Show placeholder while regenerating
  bodyEl.innerHTML = `<div class="ro-para" style="color:var(--dim);">
    <div class="ro-spinner" style="display:inline-block;margin-right:8px;"></div>
    Regenerating…
  </div>`;

  try {
    let newContent = '';
    await streamSection(
      systemPrompt,
      promptMap[sectionKey],
      state.apiKey,
      (token) => { newContent += token; }
    );

    state.sections[sectionKey] = newContent;

    const paragraphs = splitIntoParagraphs(newContent);
    bodyEl.innerHTML = paragraphs
      .map(p => `<div class="ro-para ro-fadeup">${escapeHTML(p)}</div>`)
      .join('');

  } catch (err) {
    showError('Regeneration failed: ' + (err.message || 'Unknown error'));
    bodyEl.innerHTML = `<div class="ro-para" style="color:#EF4444;">
      Regeneration failed. Please try again.
    </div>`;
  } finally {
    btn.classList.remove('is-spinning');
    btn.disabled = false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT — .docx and clipboard
// ─────────────────────────────────────────────────────────────────────────────

function buildPlainText() {
  const ctx   = state.parsedContext;
  const title = ctx.title || 'Research Paper';
  const lines = [title, '='.repeat(title.length), ''];

  for (const def of SECTION_DEFS) {
    lines.push(def.title.toUpperCase());
    lines.push('-'.repeat(def.title.length));
    lines.push(state.sections[def.key] || '');
    lines.push('');
  }

  if (state.citations.length > 0) {
    lines.push('REFERENCES');
    lines.push('-'.repeat('REFERENCES'.length));
    state.citations.forEach(c => {
      lines.push(`[${c.id}] ${c.authors.join(', ')} (${c.year}). "${c.title}". ${c.url}`);
    });
  }

  return lines.join('\n');
}

async function exportDocx() {
  // Use docx.js loaded from CDN
  if (typeof docx === 'undefined') {
    showError('Export library not loaded. Please refresh the page.');
    return;
  }

  const ctx   = state.parsedContext;
  const title = ctx.title || 'Research Paper';

  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;

  const children = [];

  // Title
  children.push(
    new Paragraph({
      text:    title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 480 },
    })
  );

  // Sections
  for (const def of SECTION_DEFS) {
    children.push(
      new Paragraph({
        text:    def.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    const content = state.sections[def.key] || '';
    for (const para of splitIntoParagraphs(content)) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: para })],
          spacing: { after: 200 },
        })
      );
    }
  }

  // References
  if (state.citations.length > 0) {
    children.push(
      new Paragraph({
        text:    'References',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    state.citations.forEach(c => {
      children.push(
        new Paragraph({
          children: [new TextRun({
            text: `[${c.id}] ${c.authors.join(', ')} (${c.year}). "${c.title}". ${c.url}`,
          })],
          spacing: { after: 160 },
        })
      );
    });
  }

  const doc  = new Document({ sections: [{ properties: {}, children }] });
  const blob = await Packer.toBlob(doc);
  const url  = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href     = url;
  a.download = `${sanitizeFilename(title)}_paper.docx`;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

async function copyToClipboard() {
  const text = buildPlainText();
  try {
    await navigator.clipboard.writeText(text);
    const btn = el.exportCopy;
    if (btn) {
      const orig = btn.querySelector('.ro-export-btn__name').textContent;
      btn.querySelector('.ro-export-btn__name').textContent = 'Copied!';
      setTimeout(() => {
        btn.querySelector('.ro-export-btn__name').textContent = orig;
      }, 2000);
    }
  } catch {
    showError('Clipboard access denied. Please copy manually.');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UI HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function showActionBar() {
  if (el.actionBar) el.actionBar.classList.add('is-visible');
}

function hideActionBar() {
  if (el.actionBar) el.actionBar.classList.remove('is-visible');
}

function showError(msg) {
  if (!el.errorToast) return;
  el.errorToast.textContent = msg;
  el.errorToast.classList.add('is-visible');
  setTimeout(() => el.errorToast.classList.remove('is-visible'), 5000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsText(file);
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function splitIntoParagraphs(text) {
  return text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 10);
}

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9_\-]/gi, '_').toLowerCase().slice(0, 60);
}

// ─────────────────────────────────────────────────────────────────────────────
// RESTART — reset everything
// ─────────────────────────────────────────────────────────────────────────────

function restart() {
  state.step           = 0;
  state.notebookFile   = null;
  state.datasetFile    = null;
  state.notebookData   = null;
  state.parsedContext  = null;
  state.citations      = [];
  state.sections       = {};

  // Reset dropzones
  const zones = document.querySelectorAll('.ro-dropzone');
  zones.forEach(z => z.classList.remove('is-filled', 'is-over'));

  const inputs = document.querySelectorAll('.ro-dropzone input[type="file"]');
  inputs.forEach(i => { i.value = ''; });

  const filenames = document.querySelectorAll('.ro-dropzone__filename');
  filenames.forEach(f => { f.textContent = ''; });

  if (el.buildBtn) {
    el.buildBtn.classList.remove('is-ready');
    el.buildBtn.disabled = true;
  }

  hideActionBar();
  clearStreamText();

  goToStep(0);
}

// ─────────────────────────────────────────────────────────────────────────────
// THEME SYNC — mirror the site's theme toggle
// ─────────────────────────────────────────────────────────────────────────────

function syncTheme() {
  try {
    const saved = localStorage.getItem('rewoo-theme');
    const pref  = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', saved || pref);
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  syncTheme();
  resolveDOM();

  // ── Dropzone setup ───────────────────────────────────────────────────────
  setupDropzone(
    el.nbZone, el.nbInput, el.nbFilename, '.ipynb',
    (file) => { state.notebookFile = file; }
  );

  if (el.dsZone) {
    setupDropzone(
      el.dsZone, el.dsInput, el.dsFilename, '*',
      (file) => { state.datasetFile = file; }
    );
  }

  // ── API key watcher ──────────────────────────────────────────────────────
  if (el.apiKeyInput) {
    // Pre-fill with demo key
    el.apiKeyInput.value = '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';
    el.apiKeyInput.addEventListener('input', checkBuildReady);
    // Trigger initial check
    checkBuildReady();
  }

  // ── Build button ─────────────────────────────────────────────────────────
  if (el.buildBtn) {
    el.buildBtn.addEventListener('click', () => {
      if (!el.buildBtn.classList.contains('is-ready')) return;
      runPipeline();
    });
  }

  // ── Action bar (Review step) ─────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action-bar-btn]');
    if (!btn) return;

    const action = btn.dataset.actionBarBtn;
    if (action === 'export') {
      goToStep(3);
      hideActionBar();
    }
    if (action === 'copy') {
      copyToClipboard();
    }
  });

  // ── Export panel ─────────────────────────────────────────────────────────
  if (el.exportDocx) {
    el.exportDocx.addEventListener('click', exportDocx);
  }

  if (el.exportCopy) {
    el.exportCopy.addEventListener('click', copyToClipboard);
  }

  if (el.restartBtn) {
    el.restartBtn.addEventListener('click', restart);
  }

  // ── Step tracker clicks ──────────────────────────────────────────────────
  el.steps.forEach((stepEl, idx) => {
    stepEl.addEventListener('click', () => {
      // Only allow going to already-completed steps
      if (idx < state.step) {
        if (idx === 2) {
          goToStep(2);
          setTimeout(() => showActionBar(), 300);
        } else {
          goToStep(idx);
        }
      }
    });
  });

  // ── Error toast dismiss ──────────────────────────────────────────────────
  if (el.errorToast) {
    el.errorToast.addEventListener('click', () => {
      el.errorToast.classList.remove('is-visible');
    });
  }

  // Note: Theme toggle, mobile menu, and nav dropdown are handled by script.js
  // which is loaded before this file.

  // Initial step
  goToStep(0);
});
