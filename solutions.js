/**
 * =============================================================================
 * solutions.js — ReWoo AI Systems Page
 * Production-level. All bugs fixed. Zero dependencies. DOMContentLoaded.
 *
 * Bug fixes:
 *   - Wrapped in DOMContentLoaded (no race conditions)
 *   - Panel animation via class-toggle (no offsetHeight hack)
 *   - escHtml only used for user-visible text, HTML is built cleanly
 *   - Checkmarks rendered via CSS \2713 (not HTML entity in JS)
 *   - Smooth scroll handled with proper offset calculation
 *   - Footer system links work via event delegation
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================================================
     PRODUCT DATA — 8 AI Systems
     ========================================================================== */
  var SYSTEMS = [
    {
      id: 'knowledge-brain',
      icon: '\u25C8',
      color: '#6E97FF',
      bgColor: 'rgba(110,151,255,0.12)',
      borderColor: 'rgba(110,151,255,0.22)',
      category: 'Foundation',
      name: 'Company Knowledge Brain',
      tagline: 'Your entire business knowledge \u2014 made instantly searchable and useful for every AI agent you deploy.',
      problem: 'Knowledge is trapped in scattered documents, Slack threads, wikis, and people\'s heads. New employees take months to get up to speed. The same questions get answered over and over. Decisions get made without the right information. Your company\'s most valuable asset \u2014 its accumulated knowledge \u2014 is effectively invisible.',
      steps: [
        { title: 'Connect your knowledge sources', desc: 'Links to Notion, Google Drive, Confluence, Slack, email, PDFs, and any website.' },
        { title: 'Deep understanding', desc: 'Reads, understands, and indexes your entire knowledge base \u2014 including relationships between documents, processes, and concepts.' },
        { title: 'Instant, cited answers', desc: 'Employees and customers get accurate answers in seconds, with source citations. No guessing, no hallucinations.' },
        { title: 'Continuous updates', desc: 'Stays current as your docs change. Flags outdated content and identifies knowledge gaps automatically.' }
      ],
      capabilities: [
        'Natural language Q&A over all your internal documents',
        'Source citations with every answer \u2014 no hallucinations',
        'Role-based access: different knowledge for different teams',
        'Available via Slack, web, WhatsApp, or your own interface',
        'Automatic knowledge gap detection and update suggestions',
        'Foundation layer that powers every other AI agent you build'
      ],
      connects: ['Notion', 'Google Drive', 'Confluence', 'Slack', 'PDFs', 'Websites', 'Email', 'Airtable'],
      outcomes: [
        '70% reduction in repetitive internal questions',
        '10\u00d7 faster new employee onboarding',
        'Single source of truth across every team',
        'Foundation for your entire AI ecosystem'
      ],
      bestFor: 'Any company with valuable internal knowledge that is hard to find and use effectively',
      impact: 'High \u2014 unlocks the value of your existing knowledge immediately'
    },
    {
      id: 'research-engine',
      icon: '\u25CE',
      color: '#A78BFA',
      bgColor: 'rgba(167,139,250,0.12)',
      borderColor: 'rgba(167,139,250,0.22)',
      category: 'Intelligence',
      name: 'AI Research Engine',
      tagline: 'Continuous market and competitive intelligence \u2014 delivered as actionable insights, not raw data.',
      problem: 'You are making decisions without knowing what your competitors are doing, where your market is moving, or what your customers actually think. Proper research takes days of manual work your team cannot afford. Opportunities appear and disappear while you are still gathering information.',
      steps: [
        { title: 'Define your intelligence scope', desc: 'You specify competitors, markets, topics, and signals to track.' },
        { title: 'Continuous monitoring', desc: 'Agent scans news, social, review sites, job boards, LinkedIn, SEC filings, research papers, and industry sources daily.' },
        { title: 'Signal detection', desc: 'Identifies meaningful changes \u2014 competitor price changes, new features, customer complaints, emerging trends.' },
        { title: 'Synthesis into insight', desc: 'Turns raw data into strategic intelligence. Not just what happened \u2014 what it means for your business.' },
        { title: 'Delivery', desc: 'Weekly intelligence briefing to your team with key findings and recommended actions.' }
      ],
      capabilities: [
        'Real-time competitor monitoring across web and social',
        'Customer sentiment analysis from reviews, forums, and social',
        'Market trend detection from news and research publications',
        'Win/loss analysis from your sales conversations',
        'Automated research on any topic or company on demand',
        'Context-aware analysis powered by your Knowledge Brain'
      ],
      connects: ['LinkedIn', 'Twitter/X', 'G2', 'Capterra', 'Google News', 'Reddit', 'Slack', 'Notion', 'Email'],
      outcomes: [
        'Know what competitors are doing before your team does',
        'Spot market opportunities weeks before they become obvious',
        'Decisions backed by real data, not gut feeling',
        'Save 10+ hours per week of manual research'
      ],
      bestFor: 'Founders, product teams, marketing teams, and investment-backed startups',
      impact: 'Strategic \u2014 turns market uncertainty into competitive advantage'
    },
    {
      id: 'marketing-system',
      icon: '\u2726',
      color: '#F59E0B',
      bgColor: 'rgba(245,158,11,0.12)',
      borderColor: 'rgba(245,158,11,0.22)',
      category: 'Growth',
      name: 'AI Marketing System',
      tagline: 'An end-to-end marketing workflow that researches, plans, executes, and measures \u2014 connected to your brand and audience.',
      problem: 'Your marketing is inconsistent because it depends entirely on who has bandwidth this week. Research takes too long. Campaigns are not grounded in real audience insight. Content does not reflect your brand deeply enough. You know what good marketing looks like \u2014 you just cannot produce it consistently.',
      steps: [
        { title: 'Audience and market research', desc: 'Continuously researches your target audience, their pain points, and what drives their decisions.' },
        { title: 'Campaign strategy', desc: 'Designs campaigns based on your goals, audience insights, and competitive positioning \u2014 grounded in your Knowledge Brain.' },
        { title: 'Content briefing', desc: 'Creates detailed briefs for every piece \u2014 not generic prompts, but strategy informed by your brand and audience data.' },
        { title: 'Execution and distribution', desc: 'Manages your content calendar, coordinates publishing, and tracks what works.' },
        { title: 'Performance analysis', desc: 'Weekly report on what drove results and recommended changes for next week.' }
      ],
      capabilities: [
        'Audience research and persona refinement from real signal',
        'Campaign strategy aligned to your business goals',
        'Content calendar management and scheduling',
        'Brand-consistent messaging powered by your Knowledge Brain',
        'Multi-channel coordination: email, social, blog, ads',
        'Performance tracking with actionable strategy iteration'
      ],
      connects: ['HubSpot', 'Mailchimp', 'LinkedIn', 'Twitter/X', 'Buffer', 'WordPress', 'Webflow', 'Google Analytics'],
      outcomes: [
        'Consistent, brand-aligned marketing every single week',
        'Campaigns grounded in real audience insight',
        '3\u00d7 more marketing output with your existing team',
        'Marketing that compounds \u2014 each piece builds on the last'
      ],
      bestFor: 'B2B startups, SaaS companies, agencies, and founders doing their own marketing',
      impact: 'High \u2014 systematic marketing where there was only inconsistency before'
    },
    {
      id: 'content-workflow',
      icon: '\u270F',
      color: '#EC4899',
      bgColor: 'rgba(236,72,153,0.12)',
      borderColor: 'rgba(236,72,153,0.22)',
      category: 'Content',
      name: 'AI Content Workflow',
      tagline: 'Research, plan, create, and publish brand-consistent content at scale \u2014 powered by your company knowledge.',
      problem: 'Your blog is months out of date. Your LinkedIn is silent. Your newsletter is irregular. You know content marketing builds compounding growth \u2014 but consistently producing high-quality, on-brand content takes time your team does not have. Generic AI content does not represent your brand well.',
      steps: [
        { title: 'Research phase', desc: 'Identifies high-value topics using your SEO data, audience questions, industry trends, and competitor analysis.' },
        { title: 'Briefing phase', desc: 'Creates a strategic brief for each piece \u2014 angle, structure, key points, and brand guidelines from your Knowledge Brain.' },
        { title: 'Creation phase', desc: 'Writes full drafts that sound like your brand, not generic AI output. Long-form, social, email, or scripts.' },
        { title: 'Repurposing phase', desc: 'Turns one great piece into multiple formats: blog to LinkedIn posts, Twitter threads, newsletter sections, short clips.' },
        { title: 'Publish and track', desc: 'Schedules at optimal times, publishes, and tracks performance to inform future content strategy.' }
      ],
      capabilities: [
        'SEO-grounded topic research and content calendar planning',
        'Full blog posts written in your authentic brand voice',
        'LinkedIn articles, posts, and Twitter/X threads',
        'Newsletter drafts from your weekly business activity',
        'Automated content repurposing across all channels',
        'Powered by your Knowledge Brain for brand accuracy'
      ],
      connects: ['WordPress', 'Webflow', 'Ghost', 'LinkedIn', 'Twitter/X', 'Buffer', 'Mailchimp', 'ConvertKit', 'Ahrefs'],
      outcomes: [
        '10\u00d7 content output with the same team',
        'Consistent publishing schedule across every channel',
        'On-brand content that genuinely sounds like you',
        'Growing organic traffic from compounding SEO'
      ],
      bestFor: 'Founders building thought leadership, B2B companies, SaaS, agencies, and consultants',
      impact: 'Compounding \u2014 content builds authority and traffic over time'
    },
    {
      id: 'sales-engine',
      icon: '\u26A1',
      color: '#10B981',
      bgColor: 'rgba(16,185,129,0.12)',
      borderColor: 'rgba(16,185,129,0.22)',
      category: 'Revenue',
      name: 'AI Sales Engine',
      tagline: 'From lead discovery to closed deal \u2014 an AI workflow that works your pipeline without gaps or dropped follow-ups.',
      problem: 'Your pipeline is leaking. Leads go cold because follow-ups fall through the cracks. Prospecting takes hours of manual research. Your CRM is out of date. Your team spends half their time on admin instead of actually selling. You know the process \u2014 you just cannot execute it consistently at scale.',
      steps: [
        { title: 'Lead research and discovery', desc: 'Identifies qualified prospects matching your ICP from LinkedIn, web directories, and industry sources. Enriches with firmographic data.' },
        { title: 'Qualification', desc: 'Scores each lead against your ICP: company size, role, buying signals, and intent data.' },
        { title: 'Personalized outreach', desc: 'Researches each prospect individually. First-line personalization based on recent activity, company news, or role change.' },
        { title: 'Follow-up sequences', desc: 'Multi-touch sequences across email and LinkedIn. Smart timing based on engagement. Never lets a lead go silent.' },
        { title: 'CRM and pipeline management', desc: 'Logs all activity, updates deal stages, flags hot leads for human attention. Your CRM stays accurate automatically.' }
      ],
      capabilities: [
        'ICP-based prospect discovery and data enrichment',
        'Per-prospect research before every outreach',
        'Personalized multi-channel outreach sequences',
        'Reply detection and human handoff for warm prospects',
        'Automatic CRM updates from email and call activity',
        'Pipeline analytics and win/loss pattern analysis'
      ],
      connects: ['HubSpot', 'Salesforce', 'Pipedrive', 'LinkedIn', 'Gmail', 'Apollo', 'Clay', 'Slack'],
      outcomes: [
        '3\u00d7 pipeline velocity with the same team size',
        'Zero leads lost to forgotten follow-ups',
        '40\u201360% higher reply rates from genuine personalization',
        'CRM that stays accurate without manual data entry'
      ],
      bestFor: 'B2B businesses, SaaS, agencies, and any company with a structured sales process',
      impact: 'Direct revenue impact \u2014 more pipeline, faster close, less leak'
    },
    {
      id: 'support-agent',
      icon: '\u25C9',
      color: '#3ECBAB',
      bgColor: 'rgba(62,203,171,0.12)',
      borderColor: 'rgba(62,203,171,0.22)',
      category: 'Support',
      name: 'AI Customer Support Agent',
      tagline: 'A company-aware support system that understands your products, policies, and customers \u2014 delivering accurate help 24/7.',
      problem: 'Support tickets pile up. Customers wait hours for answers already in your documentation. Your team is trapped answering the same questions every day instead of solving complex problems. Inconsistent answers frustrate customers and damage trust. You need support that scales \u2014 without scaling headcount.',
      steps: [
        { title: 'Company knowledge integration', desc: 'Trained on your product docs, FAQs, policies, past resolved tickets, and Knowledge Brain.' },
        { title: 'Customer context retrieval', desc: 'For every inquiry, pulls the customer\'s history, account status, and previous interactions.' },
        { title: 'Accurate response generation', desc: 'Generates precise, empathetic responses grounded in your real product knowledge \u2014 not generic AI answers.' },
        { title: 'Smart escalation', desc: 'Detects complex issues, high-value customers, or negative sentiment and escalates with full context to your human team.' },
        { title: 'Continuous learning', desc: 'Every resolved ticket improves the system. Knowledge gaps are flagged for update automatically.' }
      ],
      capabilities: [
        'Trained on your specific products, policies, and processes',
        'Multi-channel: email, live chat, WhatsApp, social DMs',
        'Customer history awareness in every interaction',
        'Intelligent escalation with full context summary for human agents',
        'CSAT measurement after every resolution',
        'Automatic knowledge base updates from resolved tickets'
      ],
      connects: ['Intercom', 'Zendesk', 'Freshdesk', 'WhatsApp', 'Gmail', 'Slack', 'Shopify', 'Stripe'],
      outcomes: [
        '80% of tickets resolved without human intervention',
        '24/7 support without 24/7 team cost',
        'Consistent, accurate answers every time',
        'Human team freed for complex, high-value conversations'
      ],
      bestFor: 'E-commerce, SaaS, marketplaces, and any business with 20+ support tickets per day',
      impact: 'Immediate \u2014 handles the majority of your support load from day one'
    },
    {
      id: 'operations-hub',
      icon: '\u2699',
      color: '#F97316',
      bgColor: 'rgba(249,115,22,0.12)',
      borderColor: 'rgba(249,115,22,0.22)',
      category: 'Operations',
      name: 'AI Operations Hub',
      tagline: 'Your most repetitive internal workflows \u2014 mapped, automated, and running without manual intervention.',
      problem: 'Your team does the same things manually every single week. Data gets copied between systems. Reports get built from scratch. Invoices get chased. Onboarding steps get missed. These processes do not require human judgment \u2014 they just require someone to do them, and that someone is always your best people.',
      steps: [
        { title: 'Process mapping', desc: 'We document every step of your target workflow: inputs, outputs, decision rules, exceptions, and edge cases.' },
        { title: 'Automation design', desc: 'Identify which steps can be automated, which need AI judgment, and which require human approval.' },
        { title: 'Build the workflow', desc: 'Implement the automated workflow connected to your existing tools \u2014 no rip-and-replace required.' },
        { title: 'Exception handling', desc: 'Clear human escalation paths for every edge case. Nothing falls through the cracks.' },
        { title: 'Deploy and monitor', desc: 'Live monitoring with automatic drift detection. We alert you before problems occur.' }
      ],
      capabilities: [
        'Invoice generation and overdue payment follow-up',
        'Employee onboarding workflow automation',
        'Data processing, cleaning, and routing between systems',
        'Automated reporting and KPI dashboard delivery',
        'Internal approval workflows with human checkpoints',
        'Tool integration without custom software development'
      ],
      connects: ['Zapier', 'Make', 'Notion', 'Airtable', 'Google Workspace', 'Slack', 'QuickBooks', 'Xero', 'WhatsApp'],
      outcomes: [
        'Save 20+ hours per week across your team',
        'Zero manually-dropped operational tasks',
        'Processes that scale with revenue, not headcount',
        'Your team focused on work that requires human thinking'
      ],
      bestFor: 'Operations teams, founders doing too much manually, and companies scaling past 10 people',
      impact: 'Structural \u2014 eliminates the operational bottleneck that limits growth'
    },
    {
      id: 'custom-system',
      icon: '\u2605',
      color: '#6E97FF',
      bgColor: 'rgba(110,151,255,0.12)',
      borderColor: 'rgba(110,151,255,0.22)',
      category: 'Custom',
      name: 'Custom Agentic System',
      tagline: 'Your problem is unique. Your AI system should be too. We design bespoke multi-agent workflows built entirely around your business.',
      problem: 'Your business problem does not fit a standard category. You have tried generic automation tools and they compromise your workflow. You need something that understands the specific logic of your business \u2014 your rules, your exceptions, your goals \u2014 and operates as an intelligent part of your company, not an external tool you manage.',
      steps: [
        { title: 'Deep discovery', desc: 'We invest time understanding your business from the inside \u2014 your processes, knowledge, goals, challenges, and constraints.' },
        { title: 'System architecture design', desc: 'Design a multi-agent architecture with specialized agents for each function, an orchestration layer, and human approval gates.' },
        { title: 'Knowledge integration', desc: 'Connect your business knowledge, tools, and data sources so the system operates with genuine understanding of your company.' },
        { title: 'Build and QA', desc: 'Build each agent and workflow component. Test against real scenarios and real edge cases before anything goes live.' },
        { title: 'Deploy and evolve', desc: 'Go live with full monitoring. Monthly reviews to expand capabilities as your business grows.' }
      ],
      capabilities: [
        'Multi-agent orchestration \u2014 agents working as a coordinated team',
        'Custom decision logic built around your specific business rules',
        'Human-in-the-loop at every critical decision point',
        'Full observability \u2014 every step logged and auditable',
        'Integration with any tool or system your business uses',
        'Designed to evolve in capability as your business grows'
      ],
      connects: ['Any system your business uses \u2014 we design around your stack'],
      outcomes: [
        'An AI system that operates as an intelligent part of your company',
        'Solves problems that generic tools cannot touch',
        'Built to your exact logic, rules, and business context',
        'Scales in capability as your business grows'
      ],
      bestFor: 'Companies with complex, unique, or high-value workflows that no standard tool addresses',
      impact: 'Transformational \u2014 built specifically for your highest-value problem'
    }
  ];

  /* ==========================================================================
     STATE
     ========================================================================== */
  var activeId = SYSTEMS[0].id;

  /* ==========================================================================
     DOM REFS
     ========================================================================== */
  var tabsEl   = document.getElementById('sys-nav-tabs');
  var panelEl  = document.getElementById('sys-nav-panel');
  var footerEl = document.getElementById('footer-systems-list');
  var diagramEl = document.getElementById('kb-diagram');

  /* ==========================================================================
     SAFE HTML — only escapes when injecting user-visible text as textContent.
     For known-safe structural HTML, we build strings directly.
     ========================================================================== */
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ==========================================================================
     RENDER TABS
     ========================================================================== */
  function renderTabs() {
    if (!tabsEl) return;
    var html = '';
    SYSTEMS.forEach(function (sys) {
      var active = sys.id === activeId;
      html +=
        '<button class="sys-tab-btn' + (active ? ' is-active' : '') + '"' +
          ' role="tab"' +
          ' aria-selected="' + active + '"' +
          ' aria-controls="sys-nav-panel"' +
          ' id="tab-' + sys.id + '"' +
          ' data-id="' + sys.id + '">' +
          '<div class="sys-tab-btn__icon" style="background:' + sys.bgColor + ';border:1px solid ' + sys.borderColor + '">' + sys.icon + '</div>' +
          '<div class="sys-tab-btn__text">' +
            '<span class="sys-tab-btn__badge">' + esc(sys.category) + '</span>' +
            '<span class="sys-tab-btn__name">' + esc(sys.name) + '</span>' +
          '</div>' +
        '</button>';
    });
    tabsEl.innerHTML = html;

    // Attach click handlers
    var btns = tabsEl.querySelectorAll('.sys-tab-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        if (id === activeId) return;
        activeId = id;
        renderTabs();
        renderPanel(true); // true = animate
      });
    });
  }

  /* ==========================================================================
     RENDER PANEL
     ========================================================================== */
  function renderPanel(animate) {
    if (!panelEl) return;
    var sys = SYSTEMS.find(function (s) { return s.id === activeId; });
    if (!sys) return;

    // Build capabilities HTML
    var capsHTML = sys.capabilities.map(function (c) {
      return '<li>' + esc(c) + '</li>';
    }).join('');

    // Build workflow steps HTML
    var stepsHTML = sys.steps.map(function (st, i) {
      return '<div class="sys-wf-step">' +
        '<div class="sys-wf-step__num">' + (i + 1) + '</div>' +
        '<div class="sys-wf-step__body">' +
          '<div class="sys-wf-step__title">' + esc(st.title) + '</div>' +
          '<div class="sys-wf-step__desc">' + esc(st.desc) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    // Build pills HTML
    var pillsHTML = sys.connects.map(function (c) {
      return '<span class="sys-panel__pill">' + esc(c) + '</span>';
    }).join('');

    // Build outcomes HTML
    var outcomesHTML = sys.outcomes.map(function (o) {
      return '<div class="sys-panel__outcome">' +
        '<span class="sys-panel__outcome-dot"></span>' +
        esc(o) +
      '</div>';
    }).join('');

    // Compose full panel
    panelEl.innerHTML =
      '<div class="sys-panel__header">' +
        '<div class="sys-panel__icon" style="background:' + sys.bgColor + ';border:1px solid ' + sys.borderColor + '">' + sys.icon + '</div>' +
        '<div>' +
          '<div class="sys-panel__category" style="color:' + sys.color + '">' + esc(sys.category) + '</div>' +
          '<div class="sys-panel__name">' + esc(sys.name) + '</div>' +
        '</div>' +
      '</div>' +

      '<p class="sys-panel__tagline">' + esc(sys.tagline) + '</p>' +

      '<div class="sys-panel__section">' +
        '<span class="sys-panel__label">The problem it solves</span>' +
        '<p class="sys-panel__problem">' + esc(sys.problem) + '</p>' +
      '</div>' +

      '<div class="sys-panel__section">' +
        '<span class="sys-panel__label">How it works</span>' +
        '<div class="sys-panel__steps">' + stepsHTML + '</div>' +
      '</div>' +

      '<div class="sys-panel__section">' +
        '<span class="sys-panel__label">Key capabilities</span>' +
        '<ul class="sys-panel__caps">' + capsHTML + '</ul>' +
      '</div>' +

      '<div class="sys-panel__section">' +
        '<span class="sys-panel__label">Connects to</span>' +
        '<div class="sys-panel__pills">' + pillsHTML + '</div>' +
      '</div>' +

      '<div class="sys-panel__section">' +
        '<span class="sys-panel__label">What it delivers</span>' +
        '<div class="sys-panel__outcomes">' + outcomesHTML + '</div>' +
      '</div>' +

      '<div class="sys-panel__meta">' +
        '<div>' +
          '<span class="sys-panel__meta-label">Best for</span>' +
          '<span class="sys-panel__meta-value">' + esc(sys.bestFor) + '</span>' +
        '</div>' +
        '<div>' +
          '<span class="sys-panel__meta-label">Business impact</span>' +
          '<span class="sys-panel__meta-value">' + esc(sys.impact) + '</span>' +
        '</div>' +
      '</div>' +

      '<div class="sys-panel__cta">' +
        '<a href="https://wa.me/+8801321073452?text=Hi%20Adil%2C%20I%27m%20interested%20in%20the%20' + encodeURIComponent(sys.name) + '%20from%20ReWoo." class="btn btn--primary" style="font-size:0.875rem;padding:12px 24px;">Build this system &rarr;</a>' +
        '<a href="index.html#pricing" class="btn btn--ghost" style="font-size:0.875rem;">See pricing &darr;</a>' +
      '</div>';

    // Scroll panel to top
    panelEl.scrollTop = 0;

    // Trigger animation by toggling class (BUGFIX: no offsetHeight hack)
    if (animate) {
      panelEl.classList.remove('panel-refresh');
      // rAF ensures the class removal has been painted before re-adding
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panelEl.classList.add('panel-refresh');
        });
      });
    }
  }

  /* ==========================================================================
     RENDER FOOTER LINKS
     ========================================================================== */
  function renderFooter() {
    if (!footerEl) return;
    SYSTEMS.forEach(function (sys) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#tab-' + sys.id;
      a.textContent = sys.name;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        activeId = sys.id;
        renderTabs();
        renderPanel(true);
        var section = document.getElementById('ai-systems');
        if (section) scrollToEl(section);
      });
      li.appendChild(a);
      footerEl.appendChild(li);
    });
  }

  /* ==========================================================================
     RENDER KB DIAGRAM
     ========================================================================== */
  function renderKBDiagram() {
    if (!diagramEl) return;

    var names = ['Research', 'Marketing', 'Content', 'Sales', 'Support', 'Ops', 'Custom'];
    var total = names.length;

    // Responsive size
    var size = diagramEl.offsetWidth || 380;
    var cx = size / 2;
    var cy = size / 2;
    var radius = size * 0.42; // satellite ring radius

    var html =
      '<div class="sys-kb__ring"></div>' +
      '<div class="sys-kb__center">Company<br>Knowledge<br>Brain</div>';

    names.forEach(function (name, i) {
      var angle = (i / total) * 2 * Math.PI - Math.PI / 2;
      var x = cx + radius * Math.cos(angle);
      var y = cy + radius * Math.sin(angle);
      html +=
        '<span class="sys-kb__sat" style="left:' + x + 'px;top:' + y + 'px;transform:translate(-50%,-50%)">' +
        name + '</span>';
    });

    diagramEl.innerHTML = html;
  }

  /* ==========================================================================
     SCROLL ANIMATIONS — [data-animate] (mirrors main site system)
     ========================================================================== */
  function initScrollAnimations() {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var elements = document.querySelectorAll('[data-animate]');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
    elements.forEach(function (el) { obs.observe(el); });
  }

  /* ==========================================================================
     SMOOTH SCROLL HELPER
     ========================================================================== */
  function scrollToEl(el) {
    var nav = document.getElementById('site-nav');
    var offset = nav ? nav.offsetHeight + 16 : 16;
    var top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  /* ==========================================================================
     ANCHOR SMOOTH SCROLL (hero buttons, CTA links)
     ========================================================================== */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
    if (history.pushState) history.pushState(null, null, href);
  });

  /* ==========================================================================
     HASH-BASED DEEP LINK
     ========================================================================== */
  function handleHash() {
    var hash = window.location.hash;
    if (hash && hash.indexOf('#tab-') === 0) {
      var targetId = hash.replace('#tab-', '');
      var found = SYSTEMS.find(function (s) { return s.id === targetId; });
      if (found) {
        activeId = found.id;
      }
    }
  }

  /* ==========================================================================
     INIT
     ========================================================================== */
  handleHash();
  renderTabs();
  renderPanel(false); // no animation on first load
  renderFooter();
  renderKBDiagram();
  initScrollAnimations();

  // Re-render diagram on resize (responsive sizing)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderKBDiagram, 200);
  });

});
