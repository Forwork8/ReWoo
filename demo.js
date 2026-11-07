/**
 * ReWoo demo — client logic for /demo.html.
 *
 * Renders the fictional handbook panel and wires the question box to
 * POST /api/demo-answer. Citation chips scroll to and flash the exact
 * passage. No visitor data is collected here; the request body is the
 * question text only.
 *
 * The HANDBOOK below is the client-side copy of the corpus in
 * api/demo-answer.js — keep the two in sync (passage ids must match).
 */

(function () {
  'use strict';

  var COMPANY = { name: 'Northwind Supplies Ltd.', label: 'Fictional company — demo data' };

  var HANDBOOK = [
    {
      id: 'handbook', title: 'Team Handbook', version: 'v3.2 — demo edition',
      passages: [
        { id: 'hb-1', title: 'Working hours', text: 'Standard office hours are 9:30 to 18:00, Monday to Friday. You may start any time between 8:00 and 10:30; core hours, when everyone should be reachable, are 11:00 to 16:00. Outside core hours, coordinate coverage with your team lead.' },
        { id: 'hb-2', title: 'Annual leave', text: 'Every employee receives 20 days of paid annual leave per calendar year, plus national public holidays. Up to 5 unused days carry over until the end of March; the rest expire. Requests go through the HR portal at least 7 days ahead — two weeks for stretches longer than 5 days.' },
        { id: 'hb-3', title: 'Sick leave', text: 'Sick leave is separate from annual leave: up to 14 calendar days per year on full pay. A medical note is required from the third consecutive day onward. Notify your team lead before 10:00 on the first day.' },
        { id: 'hb-4', title: 'Remote work', text: 'The default is a hybrid week: two remote days and three office days. Fully remote arrangements need written approval from your department head and a review after three months. On remote days you need a working internet connection and the company VPN for system access.' },
        { id: 'hb-5', title: 'Travel and meal expenses', text: 'While travelling, meal expenses are capped at $15 for lunch and $25 for dinner; alcohol is not reimbursable. Taxis are reimbursable only after 20:00 — otherwise use public transport. Receipts are required for anything above $10.' },
        { id: 'hb-6', title: 'Expense process', text: 'Submit expenses in the finance tool within 30 days, tagged to the right project code. Line managers approve within 5 working days and payments run on the 1st and 15th of each month. Equipment purchases over $200 need pre-approval before you buy.' },
        { id: 'hb-7', title: 'Security basics', text: 'Passwords live in the company password manager — never in browsers, documents, or chat. Two-factor authentication is mandatory for email, the finance tool, and any system holding customer data. Report a suspected security incident to security@northwind.example within one hour of noticing it.' },
        { id: 'hb-8', title: 'Customer data', text: 'Customer data lives only in approved systems: the CRM, the support desk, and analytics. Never in personal cloud drives, private email, or local exports without a signed-off reason. Sharing customer data outside the company requires a written request approved by your department head.' }
      ]
    },
    {
      id: 'onboarding', title: 'New Joiner Guide', version: 'v1.4 — demo edition',
      passages: [
        { id: 'nj-1', title: 'Your first week', text: 'A buddy is assigned before day one and your laptop ships to arrive on day one. Access requests — email, CRM, support desk — go through the IT portal and most are live within 48 hours. The first-week schedule has meet-and-greets with the three teams you will work with most.' },
        { id: 'nj-2', title: 'Probation', text: 'Probation runs six months, with structured check-ins at month 1, month 3, and month 6. The month-3 review is written and shared with you; the month-6 review decides confirmation. During probation, notice is two weeks on either side.' }
      ]
    },
    {
      id: 'it-policy', title: 'IT & Equipment Policy', version: 'v2.0 — demo edition',
      passages: [
        { id: 'it-1', title: 'Laptops', text: 'Choose a Mac (macOS) or Linux laptop from the standard list; Windows only with a documented reason. Laptops refresh every three years, or earlier on hardware failure. Returned machines are wiped, then re-issued or donated.' },
        { id: 'it-2', title: 'Software', text: "Open source first. Paid licences need your manager's approval in the IT portal and are reviewed yearly. Installing unlicensed or personal software on work machines is not allowed — no exceptions, including browser extensions with broad permissions." },
        { id: 'it-3', title: 'Leaving the company', text: 'When someone leaves, system access is revoked on the last working day, the laptop is returned within 5 working days, and their documents move to the team drive before the account closes.' }
      ]
    }
  ];

  var SUGGESTED = [
    'How many days of annual leave do I get?',
    'Can I work fully remote?',
    'What is the meal cap when travelling?',
    'When do laptops get replaced?',
    'What happens at the month-3 probation review?',
    'What is the pension plan?'
  ];

  var form = document.getElementById('demo-form');
  var input = document.getElementById('demo-input');
  var askBtn = document.getElementById('demo-ask');
  var chips = document.getElementById('demo-chips');
  var status = document.getElementById('demo-status');
  var shelf = document.getElementById('demo-shelf');

  /* --------------------------------------------------------- handbook panel */

  function renderHandbook() {
    var panel = document.getElementById('demo-handbook');
    if (!panel) return;
    var html = '';
    HANDBOOK.forEach(function (doc, di) {
      html += '<details class="demo-doc"' + (di === 0 ? ' open' : '') + ' id="doc-' + doc.id + '">'
        + '<summary><span class="demo-doc__t">' + doc.title + '</span>'
        + '<span class="demo-doc__v">' + doc.version + '</span></summary>'
        + '<div class="demo-passages">';
      doc.passages.forEach(function (p) {
        html += '<div class="demo-passage" id="' + p.id + '" tabindex="-1">'
          + '<span class="demo-passage__id">' + p.id + '</span>'
          + '<div><h4 class="demo-passage__t">' + p.title + '</h4>'
          + '<p class="demo-passage__x">' + p.text + '</p></div></div>';
      });
      html += '</div></details>';
    });
    panel.innerHTML = html;
  }

  function renderChips() {
    if (!chips) return;
    SUGGESTED.forEach(function (q, i) {
      var isRefusal = i === SUGGESTED.length - 1;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip chip--link demo-chip' + (isRefusal ? ' demo-chip--trap' : '');
      b.textContent = q;
      b.addEventListener('click', function () { ask(q); });
      chips.appendChild(b);
    });
  }

  /* ------------------------------------------------------------- citations */

  function citationLink(c) {
    var a = document.createElement('button');
    a.type = 'button';
    a.className = 'demo-cite';
    a.innerHTML = '<span class="demo-cite__n">[' + c.n + ']</span> ' + c.doc + ' — ' + c.title;
    a.setAttribute('aria-label', 'Show passage ' + c.n + ' in the handbook');
    a.addEventListener('click', function () { revealPassage(c.id); });
    return a;
  }

  function revealPassage(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var doc = el.closest('details');
    if (doc) doc.open = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.remove('is-flash');
    // restart the flash animation
    void el.offsetWidth;
    el.classList.add('is-flash');
    el.focus({ preventScroll: true });
  }

  /* ---------------------------------------------------------------- asking */

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function card(question) {
    var c = el('article', 'demo-card');
    c.appendChild(el('p', 'demo-card__q', question));
    shelf.appendChild(c);
    c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return c;
  }

  function renderAnswer(c, data) {
    var body = el('div', 'demo-card__a');
    var ans = el('p', 'demo-answer');
    if (data.notInDocuments) {
      c.classList.add('demo-card--miss');
      var flag = el('p', 'demo-miss__flag', 'Not in the documents');
      body.appendChild(flag);
      ans.textContent = data.answer;
      body.appendChild(ans);
      var close = el('p', 'demo-miss__label', 'Closest passages:');
      body.appendChild(close);
      var list = el('div', 'demo-cites');
      (data.closest || []).forEach(function (k) { list.appendChild(citationLink(k)); });
      body.appendChild(list);
    } else {
      ans.textContent = data.answer;
      body.appendChild(ans);
      var cites = el('div', 'demo-cites');
      (data.citations || []).forEach(function (k) { cites.appendChild(citationLink(k)); });
      body.appendChild(cites);
    }
    c.appendChild(body);
  }

  function renderError(c, message) {
    c.classList.add('demo-card--err');
    c.appendChild(el('p', 'demo-card__a demo-answer', message));
  }

  function ask(question) {
    var q = (question || (input && input.value) || '').trim();
    if (q.length < 3) {
      if (status) { status.textContent = 'Type a question first — try one of the suggestions.'; }
      return;
    }
    if (status) status.textContent = '';
    var c = card(q);
    if (input) input.value = '';
    if (askBtn) askBtn.disabled = true;
    var loading = el('p', 'demo-card__a demo-answer demo-answer--loading', 'Reading the handbook…');
    c.appendChild(loading);

    fetch('/api/demo-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    }).then(function (res) {
      return res.json().then(function (data) { return { ok: res.ok, status: res.status, data: data }; });
    }).then(function (r) {
      loading.remove();
      if (r.ok) {
        renderAnswer(c, r.data);
        if (status) {
          status.textContent = r.data.notInDocuments
            ? 'The handbook does not cover that — exactly the behaviour you would want on real documents.'
            : 'Every cited passage is clickable — check the answer against the source.';
        }
      } else if (r.status === 429) {
        renderError(c, r.data && r.data.message || 'Rate limit reached — wait a minute.');
      } else if (r.status === 503) {
        renderError(c, 'The demo backend has no API key yet. The studio sets DEMO_API_KEY on the server — nothing is exposed in this page.');
      } else {
        renderError(c, (r.data && r.data.message) || 'The demo backend did not answer. Try again in a moment.');
      }
    }).catch(function () {
      loading.remove();
      renderError(c, 'The demo backend is not responding. If this site is opened without its serverless function, questions cannot be answered.');
    }).then(function () {
      if (askBtn) askBtn.disabled = false;
    });
  }

  /* ----------------------------------------------------------------- init */

  renderHandbook();
  renderChips();
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ask();
    });
  }
})();
