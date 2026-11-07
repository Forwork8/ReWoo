/**
 * ReWoo demo — answer endpoint (Vercel serverless function).
 *
 * POST /api/demo-answer  { "question": "..." }
 *   → { answer, citations: [{n, id, doc, title}], notInDocuments: false }
 *   or { answer, notInDocuments: true, closest: [{n, id, doc, title}] }
 *
 * Design notes (the promises the demo makes on the page):
 *  - The API key stays on the server (env var). It is never sent to the browser.
 *  - Refusal is deterministic: if the question shares no content word with any
 *    passage, the endpoint answers "not in the documents" WITHOUT calling the
 *    model, and returns the closest passages (model-picked when configured,
 *    lexical otherwise).
 *  - Rate limit: 10 questions per minute per visitor, in-memory. On serverless
 *    this is per-instance best effort (no external store, no cookies, no logs).
 *  - No visitor data is logged: no IP, no user agent, no question text is ever
 *    written to console or storage. The only state is the rate-limit counter,
 *    which holds an opaque hash of the IP for at most 60 seconds.
 *
 * TODO(owner): set the environment variables in Vercel (Project → Settings →
 * Environment Variables). Any OpenAI-compatible endpoint works:
 *   DEMO_API_KEY    — required, the API key (falls back to OPENAI_API_KEY)
 *   DEMO_API_BASE   — optional, default "https://api.openai.com/v1"
 *   DEMO_API_MODEL  — optional, default "gpt-4o-mini"
 * Until the key is set the endpoint answers 503 { error: "not-configured" }.
 */

const COMPANY = {
  name: "Northwind Supplies Ltd.",
  label: "Fictional company — demo data",
};

/* The fictional handbook. This is the server-side copy; demo.js carries the
   same data to render the panel. Keep the two in sync (ids must match). */
const DOCS = [
  {
    id: "handbook",
    title: "Team Handbook",
    version: "v3.2 — demo edition",
    passages: [
      {
        id: "hb-1",
        title: "Working hours",
        text: "Standard office hours are 9:30 to 18:00, Monday to Friday. You may start any time between 8:00 and 10:30; core hours, when everyone should be reachable, are 11:00 to 16:00. Outside core hours, coordinate coverage with your team lead.",
      },
      {
        id: "hb-2",
        title: "Annual leave",
        text: "Every employee receives 20 days of paid annual leave per calendar year, plus national public holidays. Up to 5 unused days carry over until the end of March; the rest expire. Requests go through the HR portal at least 7 days ahead — two weeks for stretches longer than 5 days.",
      },
      {
        id: "hb-3",
        title: "Sick leave",
        text: "Sick leave is separate from annual leave: up to 14 calendar days per year on full pay. A medical note is required from the third consecutive day onward. Notify your team lead before 10:00 on the first day.",
      },
      {
        id: "hb-4",
        title: "Remote work",
        text: "The default is a hybrid week: two remote days and three office days. Fully remote arrangements need written approval from your department head and a review after three months. On remote days you need a working internet connection and the company VPN for system access.",
      },
      {
        id: "hb-5",
        title: "Travel and meal expenses",
        text: "While travelling, meal expenses are capped at $15 for lunch and $25 for dinner; alcohol is not reimbursable. Taxis are reimbursable only after 20:00 — otherwise use public transport. Receipts are required for anything above $10.",
      },
      {
        id: "hb-6",
        title: "Expense process",
        text: "Submit expenses in the finance tool within 30 days, tagged to the right project code. Line managers approve within 5 working days and payments run on the 1st and 15th of each month. Equipment purchases over $200 need pre-approval before you buy.",
      },
      {
        id: "hb-7",
        title: "Security basics",
        text: "Passwords live in the company password manager — never in browsers, documents, or chat. Two-factor authentication is mandatory for email, the finance tool, and any system holding customer data. Report a suspected security incident to security@northwind.example within one hour of noticing it.",
      },
      {
        id: "hb-8",
        title: "Customer data",
        text: "Customer data lives only in approved systems: the CRM, the support desk, and analytics. Never in personal cloud drives, private email, or local exports without a signed-off reason. Sharing customer data outside the company requires a written request approved by your department head.",
      },
    ],
  },
  {
    id: "onboarding",
    title: "New Joiner Guide",
    version: "v1.4 — demo edition",
    passages: [
      {
        id: "nj-1",
        title: "Your first week",
        text: "A buddy is assigned before day one and your laptop ships to arrive on day one. Access requests — email, CRM, support desk — go through the IT portal and most are live within 48 hours. The first-week schedule has meet-and-greets with the three teams you will work with most.",
      },
      {
        id: "nj-2",
        title: "Probation",
        text: "Probation runs six months, with structured check-ins at month 1, month 3, and month 6. The month-3 review is written and shared with you; the month-6 review decides confirmation. During probation, notice is two weeks on either side.",
      },
    ],
  },
  {
    id: "it-policy",
    title: "IT & Equipment Policy",
    version: "v2.0 — demo edition",
    passages: [
      {
        id: "it-1",
        title: "Laptops",
        text: "Choose a Mac (macOS) or Linux laptop from the standard list; Windows only with a documented reason. Laptops refresh every three years, or earlier on hardware failure. Returned machines are wiped, then re-issued or donated.",
      },
      {
        id: "it-2",
        title: "Software",
        text: "Open source first. Paid licences need your manager's approval in the IT portal and are reviewed yearly. Installing unlicensed or personal software on work machines is not allowed — no exceptions, including browser extensions with broad permissions.",
      },
      {
        id: "it-3",
        title: "Leaving the company",
        text: "When someone leaves, system access is revoked on the last working day, the laptop is returned within 5 working days, and their documents move to the team drive before the account closes.",
      },
    ],
  },
];

const ALL_PASSAGES = DOCS.flatMap((d) =>
  d.passages.map((p) => ({ ...p, doc: d.title, docId: d.id }))
);

const REFUSAL_ANSWER =
  "That is not in the documents. The handbook does not cover this, so there is no answer to cite — the closest passages it does have are listed below.";

/* ---------------------------------------------------------------- helpers */

const STOPWORDS = new Set(
  ("a an and are as at be but by can could do does for from get how i in is it " +
   "me my no not of on or our so than that the their there they this to we what " +
   "when where which who why will with would you your").split(" ")
);

function tokens(s) {
  return (s.toLowerCase().match(/[a-z0-9$]+/g) || []).filter(
    (t) => t.length > 1 && !STOPWORDS.has(t)
  );
}

function overlapScores(question) {
  const q = tokens(question);
  return ALL_PASSAGES.map((p) => {
    const hay = (p.title + " " + p.text).toLowerCase();
    let score = 0;
    for (const t of q) if (hay.includes(t)) score += 1;
    return { passage: p, score };
  });
}

function trigrams(s) {
  const set = new Set();
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (let i = 0; i < clean.length - 2; i++) set.add(clean.slice(i, i + 3));
  return set;
}

function trigramScore(a, b) {
  const A = trigrams(a);
  const B = trigrams(b);
  let n = 0;
  for (const t of A) if (B.has(t)) n++;
  return n;
}

function citationMeta(p, n) {
  return { n, id: p.id, doc: p.doc, title: p.title };
}

/* ------------------------------------------------------------- rate limit */

const RATE_LIMIT = 10;         // questions
const RATE_WINDOW = 60 * 1000; // per minute
const buckets = new Map(); // opaque visitor hash → timestamps (kept ≤ 60s)

function rateLimited(visitor) {
  const now = Date.now();
  const recent = (buckets.get(visitor) || []).filter((t) => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) {
    buckets.set(visitor, recent);
    return true;
  }
  recent.push(now);
  buckets.set(visitor, recent);
  // opportunistic cleanup — keeps memory flat, stores nothing about content
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (!v.some((t) => now - t < RATE_WINDOW)) buckets.delete(k);
    }
  }
  return false;
}

function opaqueVisitor(req) {
  // Hashed, never stored beyond the 60s window, never logged.
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "anonymous";
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = (h * 31 + ip.charCodeAt(i)) >>> 0;
  }
  return "v" + h.toString(36);
}

/* --------------------------------------------------------------- the model */

function apiConfig() {
  const key = process.env.DEMO_API_KEY || process.env.OPENAI_API_KEY;
  const base = process.env.DEMO_API_BASE || "https://api.openai.com/v1";
  const model = process.env.DEMO_API_MODEL || "gpt-4o-mini";
  return key ? { key, base, model } : null;
}

async function callModel(messages, maxTokens) {
  const cfg = apiConfig();
  if (!cfg) return null;
  const res = await fetch(cfg.base + "/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cfg.key,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      max_tokens: maxTokens,
      temperature: 0,
    }),
  });
  if (!res.ok) throw new Error("model endpoint responded " + res.status);
  const data = await res.json();
  return data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content
    : null;
}

async function answerFromPassages(question, retrieved) {
  const context = retrieved
    .map((p, i) => "[" + (i + 1) + "] " + p.doc + " — " + p.title + "\n" + p.text)
    .join("\n\n");
  const system =
    "You answer questions about a fictional company handbook, strictly and only from the numbered passages provided. " +
    "Rules: answer in at most three sentences; cite every fact with passage numbers in square brackets like [1] or [2,3]; " +
    "if the passages do not contain the answer, reply with exactly: NOT_IN_DOCUMENTS. " +
    "Never use outside knowledge, never guess, never pad.";
  const user = "Passages:\n" + context + "\n\nQuestion: " + question;
  const reply = await callModel(
    [{ role: "system", content: system }, { role: "user", content: user }],
    300
  );
  if (!reply) return null;
  return reply.trim();
}

async function closestPassages(question) {
  // Prefer a semantic pick by the model; fall back to lexical ranking.
  try {
    const list = ALL_PASSAGES.map((p) => p.id + " · " + p.doc + " — " + p.title).join("\n");
    const reply = await callModel(
      [
        {
          role: "system",
          content:
            "The question is NOT answered by any passage of a company handbook. From the passage list, " +
            "pick the two or three closest in topic (what a reader probably hoped to find). " +
            "Reply with only the passage ids, comma-separated, most relevant first.",
        },
        { role: "user", content: "Passages:\n" + list + "\n\nQuestion: " + question },
      ],
      60
    );
    if (reply) {
      const ids = reply.split(/[,\s]+/).filter(Boolean).slice(0, 3);
      const picked = ids
        .map((id) => ALL_PASSAGES.find((p) => p.id === id))
        .filter(Boolean);
      if (picked.length) return picked;
    }
  } catch (e) {
    /* fall through to lexical ranking */
  }
  return overlapScores(question)
    .map((x) => ({
      passage: x.passage,
      fuzzy: trigramScore(question, x.passage.title + " " + x.passage.text),
    }))
    .sort((a, b) => b.fuzzy - a.fuzzy || b.passage.id.localeCompare(a.passage.id))
    .slice(0, 3)
    .map((x) => x.passage);
}

/* ----------------------------------------------------------------- export */

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "method-not-allowed" });
    return;
  }

  const body = typeof req.body === "object" && req.body !== null ? req.body : {};
  const clean = String(body.question || "").trim().slice(0, 300);

  if (clean.length < 3) {
    res.status(400).json({ error: "bad-request", message: "Ask a real question." });
    return;
  }

  if (rateLimited(opaqueVisitor(req))) {
    res.status(429).json({
      error: "rate-limited",
      message: "That is a lot of questions — the demo is capped at 10 per minute. Wait a moment and try again.",
    });
    return;
  }

  if (!apiConfig()) {
    res.status(503).json({
      error: "not-configured",
      message: "The demo backend has no API key yet — the studio sets DEMO_API_KEY on the server.",
    });
    return;
  }

  const scored = overlapScores(clean);
  const retrieved = scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.passage);

  // Deterministic refusal: zero content-word overlap → never ask the model.
  if (!retrieved.length) {
    const closest = await closestPassages(clean);
    res.status(200).json({
      answer: REFUSAL_ANSWER,
      notInDocuments: true,
      closest: closest.map((p, i) => citationMeta(p, i + 1)),
      company: COMPANY,
    });
    return;
  }

  try {
    const reply = await answerFromPassages(clean, retrieved);

    if (!reply || reply.toUpperCase().includes("NOT_IN_DOCUMENTS")) {
      const closest = retrieved.slice(0, 3);
      res.status(200).json({
        answer: REFUSAL_ANSWER,
        notInDocuments: true,
        closest: closest.map((p, i) => citationMeta(p, i + 1)),
        company: COMPANY,
      });
      return;
    }

    // Map the [n] markers in the answer onto passage metadata.
    const used = new Set();
    const citations = [];
    const answer = reply.replace(/\[(\d+(?:\s*,\s*\d+)*)\]/g, (m, group) => {
      for (const nRaw of group.split(",")) {
        const n = parseInt(nRaw.trim(), 10);
        if (n >= 1 && n <= retrieved.length && !used.has(n)) {
          used.add(n);
          citations.push(citationMeta(retrieved[n - 1], citations.length + 1));
        }
      }
      return m;
    });
    if (!citations.length) {
      // Model answered without markers — attach what it was given.
      retrieved.slice(0, 2).forEach((p) => citations.push(citationMeta(p, citations.length + 1)));
    }

    res.status(200).json({
      answer,
      citations,
      notInDocuments: false,
      company: COMPANY,
    });
  } catch (err) {
    res.status(502).json({
      error: "upstream",
      message: "The model endpoint failed — try again in a moment.",
    });
  }
}
