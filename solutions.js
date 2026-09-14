/**
 * =============================================================================
 * solutions.js — ReWoo: Get Help With The Work You Need To Get Done
 * Task-First Heuristic Engine, Architecture Inspector, ROI Calculator & Scoping Modal
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================================================
     1. TASK PRESETS & HEURISTIC ENGINE DATA
     ========================================================================== */
  var TASK_PRESETS = {
    research: {
      text: "I need objective research comparing 4 different software platforms for our team, outlining costs, pros/cons, and privacy policies.",
      layer: "Everyday Help",
      way: "Explain",
      turnaround: "Estimated: 3–5 Hours",
      title: "Synthesized Research & Comparison Brief",
      desc: "We cut through vendor marketing fluff to conduct structured, objective comparisons and distill hundreds of pages into a crisp executive briefing.",
      approach: "Multi-source research synthesis + structured side-by-side matrix",
      input: "Your specific criteria, budget constraints, and current tools",
      deliverable: "1-page comparison matrix + clear recommendation",
      growth: "Can evolve into a recurring monthly market or competitor scan",
      waMsg: "Hi Adil, I need help researching and comparing options for a project."
    },
    document: {
      text: "I have a complex 35-page PDF agreement and need to understand the critical liability clauses, renewal dates, and payment obligations.",
      layer: "Everyday Help",
      way: "Explain",
      turnaround: "Estimated: 2–4 Hours",
      title: "Document Deconstruction & Action Summary",
      desc: "We parse dense PDFs, contracts, and reports into clear plain English, flagging key risks, financial terms, and required next steps.",
      approach: "Deep document extraction + plain-language risk breakdown",
      input: "PDF, scanned file, or document link",
      deliverable: "Structured executive summary + key action checklist",
      growth: "Can be automated into an instant PDF ingestion pipeline for recurring documents",
      waMsg: "Hi Adil, I have a document I need explained and summarized."
    },
    tool: {
      text: "I want to learn how to use modern AI tools to speed up my weekly reporting and daily tasks, with step-by-step guidance.",
      layer: "Everyday Help",
      way: "Guide",
      turnaround: "Estimated: 1–2 Days",
      title: "Hands-on Tool Setup & Workflow Coaching",
      desc: "We configure the right tools for your specific workflow, remove the intimidation factor, and coach you step-by-step until you feel completely confident.",
      approach: "Tailored setup + 1-on-1 practical walkthrough & cheat-sheets",
      input: "Your current daily friction points and preferred apps",
      deliverable: "Working configured workspace + custom prompt playbook",
      growth: "Expands into team-wide AI literacy and shared digital workspaces",
      waMsg: "Hi Adil, I want guidance on learning and setting up AI tools for my work."
    },
    organize: {
      text: "My tasks, notes, files, and spreadsheets are fragmented across different apps. I want a clean, unified system to organize my weekly work.",
      layer: "Everyday Help",
      way: "Guide & Do",
      turnaround: "Estimated: 1–3 Days",
      title: "Work Organization & Operating System",
      desc: "We bring order to digital chaos. We streamline your tasks, notes, and schedules into a clean, low-friction system that stays organized without upkeep headaches.",
      approach: "Friction audit + minimal operating structure build",
      input: "Overview of your current projects, notes, and task lists",
      deliverable: "Unified dashboard + weekly triage routine",
      growth: "Forms the bedrock for automated task alerts and recurring schedules",
      waMsg: "Hi Adil, I need help organizing my work and digital systems."
    },
    automate: {
      text: "I do the same spreadsheet updates and invoice data entry every Friday across Stripe and QuickBooks. I want to automate it.",
      layer: "Work & Business",
      way: "Automate",
      turnaround: "Estimated: 2–4 Days",
      title: "Event-Driven Process Automation",
      desc: "We connect your applications via reliable webhooks and self-healing data pipelines, eliminating manual copy-pasting and human error completely.",
      approach: "Automated event pipeline (n8n / APIs) with mathematical verification",
      input: "Access to existing software accounts or sample export files",
      deliverable: "Live automated pipeline + error monitoring + zero maintenance",
      growth: "Recovers 15–30 hours weekly and easily connects to new tools as you scale",
      waMsg: "Hi Adil, I have a repetitive process I want to automate with ReWoo."
    },
    build: {
      text: "I need a custom AI application with multi-step reasoning, private data access, and an internal web portal for our team.",
      layer: "Build With AI",
      way: "Build",
      turnaround: "Estimated: 3–7 Days",
      title: "Bespoke Agentic Architecture & App",
      desc: "We architect and deploy production-grade agentic systems with tool-calling capabilities, private RAG vector search, and full IP ownership.",
      approach: "Custom full-stack AI engineering + private VPC deployment",
      input: "System requirements, schema specifications, and business rules",
      deliverable: "Production codebase, live deployment & full intellectual property",
      growth: "Becomes the core proprietary technological asset of your business",
      waMsg: "Hi Adil, I want to discuss building a custom AI application or system."
    }
  };

  /* ==========================================================================
     2. TASK INPUT & BLUEPRINT CONTROLLER
     ========================================================================== */
  var taskInput = document.getElementById('task-input-field');
  var promptPills = document.querySelectorAll('.sol-pill');
  var clearBtn = document.getElementById('task-clear-btn');

  var bpLayerTag = document.getElementById('bp-layer-tag');
  var bpWayTag = document.getElementById('bp-way-tag');
  var bpTurnaroundTag = document.getElementById('bp-turnaround-tag');
  var bpTitle = document.getElementById('bp-title');
  var bpDesc = document.getElementById('bp-desc');
  var bpApproach = document.getElementById('bp-approach');
  var bpInput = document.getElementById('bp-input');
  var bpDeliverable = document.getElementById('bp-deliverable');
  var bpGrowth = document.getElementById('bp-growth');
  var bpWaBtn = document.getElementById('bp-wa-btn');

  function renderBlueprint(data) {
    if (!data) return;

    if (bpLayerTag) bpLayerTag.textContent = data.layer || "Everyday Help";
    if (bpWayTag) bpWayTag.textContent = data.way || "Do";
    if (bpTurnaroundTag) bpTurnaroundTag.textContent = data.turnaround || "Estimated: 1–2 Days";
    if (bpTitle) bpTitle.textContent = data.title || "Custom Task Execution";
    if (bpDesc) bpDesc.textContent = data.desc || "We review your task, handle the complexity, and deliver a clean, practical outcome.";
    if (bpApproach) bpApproach.textContent = data.approach || "Tailored problem diagnosis + AI assistance + human refinement";
    if (bpInput) bpInput.textContent = data.input || "Your goals, files, and desired result";
    if (bpDeliverable) bpDeliverable.textContent = data.deliverable || "Verified output or configured system";
    if (bpGrowth) bpGrowth.textContent = data.growth || "If repeated, we look for opportunities to automate or systematize";

    if (bpWaBtn) {
      var query = (taskInput ? taskInput.value.trim() : "") || data.text;
      var waText = "Hi Adil, I need help with this task:\n\n" + query;
      bpWaBtn.href = "https://wa.me/+8801321073452?text=" + encodeURIComponent(waText);
    }
  }

  // Preset pill click handler
  promptPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      promptPills.forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');

      var key = pill.getAttribute('data-prompt');
      var preset = TASK_PRESETS[key];
      if (preset && taskInput) {
        taskInput.value = preset.text;
        renderBlueprint(preset);
      }
    });
  });

  // Freeform typing heuristic parser
  if (taskInput) {
    taskInput.addEventListener('input', function () {
      var val = taskInput.value.toLowerCase().trim();
      promptPills.forEach(function (p) { p.classList.remove('is-active'); });

      if (val.length === 0) {
        renderBlueprint(TASK_PRESETS.research);
        return;
      }

      // Heuristic detection based on user input
      var detected = {
        layer: "Everyday Help",
        way: "Do",
        turnaround: "Estimated: 1–2 Days",
        title: "Personalized Task Solution",
        desc: "We analyze your specific bottleneck, do the heavy lifting, and deliver a clear, reliable result.",
        approach: "Direct problem breakdown + pragmatic execution",
        input: "Your notes, context, and desired result",
        deliverable: "Finished deliverable or step-by-step guidance",
        growth: "When this repeats, we can convert it into an automated system"
      };

      if (val.includes('research') || val.includes('compare') || val.includes('market') || val.includes('competitor') || val.includes('find out') || val.includes('study')) {
        detected = TASK_PRESETS.research;
      } else if (val.includes('pdf') || val.includes('document') || val.includes('contract') || val.includes('invoice') || val.includes('agreement') || val.includes('extract') || val.includes('ocr')) {
        detected = TASK_PRESETS.document;
      } else if (val.includes('tool') || val.includes('learn') || val.includes('how to') || val.includes('teach') || val.includes('guide') || val.includes('setup') || val.includes('notion')) {
        detected = TASK_PRESETS.tool;
      } else if (val.includes('organize') || val.includes('plan') || val.includes('calendar') || val.includes('schedule') || val.includes('prioritize') || val.includes('triage') || val.includes('backlog') || val.includes('email') || val.includes('inbox') || val.includes('write')) {
        detected = TASK_PRESETS.organize;
      } else if (val.includes('automate') || val.includes('sync') || val.includes('repeat') || val.includes('sheets') || val.includes('stripe') || val.includes('quickbooks') || val.includes('crm') || val.includes('n8n') || val.includes('pipeline')) {
        detected = TASK_PRESETS.automate;
      } else if (val.includes('agent') || val.includes('build') || val.includes('saas') || val.includes('custom') || val.includes('app') || val.includes('rag') || val.includes('sdr') || val.includes('voice')) {
        detected = TASK_PRESETS.build;
      }

      renderBlueprint(detected);
    });
  }

  // Clear button
  if (clearBtn && taskInput) {
    clearBtn.addEventListener('click', function () {
      taskInput.value = '';
      promptPills.forEach(function (p) { p.classList.remove('is-active'); });
      var researchPill = document.querySelector('.sol-pill[data-prompt="research"]');
      if (researchPill) researchPill.classList.add('is-active');
      renderBlueprint(TASK_PRESETS.research);
      taskInput.focus();
    });
  }

  // Cross-page preset triggers (buttons with data-preset-select)
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-preset-select]');
    if (trigger) {
      var presetKey = trigger.getAttribute('data-preset-select');
      var targetPill = document.querySelector('.sol-pill[data-prompt="' + presetKey + '"]');
      if (targetPill) {
        targetPill.click();
      }
      var taskSec = document.getElementById('task-input-section');
      if (taskSec) {
        taskSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  /* ==========================================================================
     3. DYNAMIC ROI & SAVINGS CALCULATOR
     ========================================================================== */
  var sliderHours = document.getElementById('slider-hours');
  var sliderTeam = document.getElementById('slider-team');
  var sliderRate = document.getElementById('slider-rate');

  var valHours = document.getElementById('val-hours');
  var valTeam = document.getElementById('val-team');
  var valRate = document.getElementById('val-rate');

  var resHours = document.getElementById('res-hours');
  var resMoney = document.getElementById('res-money');
  var resRoi = document.getElementById('res-roi');

  function calculateROI() {
    if (!sliderHours || !sliderTeam || !sliderRate) return;
    var hours = parseInt(sliderHours.value, 10) || 15;
    var team = parseInt(sliderTeam.value, 10) || 4;
    var rate = parseInt(sliderRate.value, 10) || 35;

    if (valHours) valHours.textContent = hours + ' hrs/wk';
    if (valTeam) valTeam.textContent = team + (team === 1 ? ' person' : ' people');
    if (valRate) valRate.textContent = '$' + rate + '/hr';

    var monthlyHoursSaved = Math.round(hours * 4 * team);
    var monthlyCostSaved = Math.round(monthlyHoursSaved * rate);

    // Typical ReWoo implementation cost baseline (~$1,200)
    var estimatedBuildCost = 1200;
    var roiMultiplier = (monthlyCostSaved / estimatedBuildCost).toFixed(1);

    if (resHours) resHours.textContent = monthlyHoursSaved.toLocaleString() + ' hrs';
    if (resMoney) resMoney.textContent = '$' + monthlyCostSaved.toLocaleString();
    if (resRoi) resRoi.textContent = roiMultiplier + 'x ROI';
  }

  if (sliderHours) sliderHours.addEventListener('input', calculateROI);
  if (sliderTeam) sliderTeam.addEventListener('input', calculateROI);
  if (sliderRate) sliderRate.addEventListener('input', calculateROI);

  calculateROI();

  /* ==========================================================================
     4. LAYER 3 — PRODUCTION ARCHITECTURE INSPECTOR
     ========================================================================== */
  var ADVANCED_SYSTEMS = {
    voice: {
      badge: "ACTIVE PRODUCTION ARCHITECTURE",
      title: "24/7 AI Voice & WhatsApp Receptionist",
      desc: "Answers inbound phone calls and WhatsApp inquiries in under 1 second. Answers company FAQs, qualifies buyer budget and timeline, books meetings on Google Calendar, and alerts human sales reps on Slack for hot leads.",
      tools: ["Vapi / Retell AI", "WhatsApp Cloud API", "Twilio Voice", "GoHighLevel / HubSpot", "Google Calendar", "Slack Alerts"],
      turnaround: "2–4 Days",
      sla: "Recovers 35%+ Inbound Leads",
      console: {
        title: "rewoo-voice-engine — inbound-voice.v3",
        input: "\"Caller (+1 415-892-0192): 'Hi, I need a commercial cleaning quote for our 12,000 sq ft office in Austin this Friday.'\"",
        logs: [
          { time: "00:00.04", tag: "VOICE_INGEST", type: "auth", msg: "Twilio SIP trunk connected. Ultra-low latency stream (620ms speech-to-speech)." },
          { time: "00:00.18", tag: "QUALIFY", type: "tool", msg: "Identified Intent: 'Commercial Estimate', SqFt: 12,000, Loc: Austin. Budget qualified (> $1,500)." },
          { time: "00:00.35", tag: "CALENDAR_CHECK", type: "guard", msg: "gcal.getAvailableSlots(date=\"Friday\", duration=\"30m\") -> Slot: 2:00 PM CST confirmed." },
          { time: "00:00.52", tag: "CRM_SYNC", type: "exec", msg: "Created deal in HubSpot & booked site walk on calendar. Slack alert sent to field team." }
        ],
        speed: "Call completed in 45s · 0 Human Labor",
        output: "\"Perfect! I've booked your on-site walkthrough for Friday at 2:00 PM CST with our Austin team. A calendar invite and SMS confirmation have been sent to your phone.\""
      }
    },
    sdr: {
      badge: "AUTONOMOUS REVENUE ENGINE",
      title: "Autonomous Outbound SDR & Lead Enrichment",
      desc: "Scrapes and enriches 500+ verified target accounts weekly, validates emails with 0% bounce rate, crafts hyper-personalized 1-to-1 outreach hooks, and triggers automated follow-ups that book sales calls.",
      tools: ["Clay & Apollo API", "LinkedIn Navigator", "SMTP Email Validator", "Smartlead / Instantly", "HubSpot CRM", "Google Calendar"],
      turnaround: "3–5 Days",
      sla: "3.8x Reply Rate",
      console: {
        title: "rewoo-sdr-engine — outbound-agent.v2",
        input: "\"Trigger: Weekly ICP Hunt: US E-Commerce founders ($2M–$10M ARR) using Shopify Plus.\"",
        logs: [
          { time: "00:00.12", tag: "SCRAPE", type: "auth", msg: "Extracted 250 target brands from public registries & store indexes." },
          { time: "00:00.38", tag: "ENRICH", type: "tool", msg: "Found Founder/CEO LinkedIn profiles & verified corporate emails (0% bounce rate)." },
          { time: "00:00.74", tag: "ICEBREAKER", type: "guard", msg: "Scanned brand recent product launches to draft 1-to-1 customized value hook." },
          { time: "00:01.05", tag: "CAMPAIGN", type: "exec", msg: "Enrolled 250 validated prospects into 3-touch personalized outreach sequence." }
        ],
        speed: "250 Verified Accounts Enrolled · 20+ Hours Saved",
        output: "\"Campaign active. First batch of 50 personalized emails dispatched. Responses automatically routed to founder calendar.\""
      }
    },
    pipeline: {
      badge: "BI-DIRECTIONAL AUTO-SYNC",
      title: "Self-Healing n8n Multi-App & Financial Data Sync",
      desc: "Eliminates repetitive manual data entry between Stripe, Google Sheets, Excel, HubSpot, and QuickBooks. Automatically cleans schema discrepancies, checks tax numbers, and keeps your entire business in sync.",
      tools: ["n8n (Self-Hosted)", "Make.com", "HubSpot CRM", "Stripe API", "QuickBooks / Xero", "Slack Alerts"],
      turnaround: "2–3 Days",
      sla: "100% Data Accuracy",
      console: {
        title: "rewoo-n8n-runner — pipeline-sync.v3",
        input: "\"Webhook: Stripe payment #ch_3N82b9 for $2,400.00 from Acquired Corp.\"",
        logs: [
          { time: "00:00.08", tag: "TRIGGER", type: "auth", msg: "Stripe payment succeeded. Customer: contact@acquired.co." },
          { time: "00:00.22", tag: "LOOKUP", type: "tool", msg: "hubspot.findContact(email=\"contact@acquired.co\") -> Deal ID #8194." },
          { time: "00:00.39", tag: "GUARDRAIL", type: "guard", msg: "Tax ID & Currency verification: USD $2,400.00 matched to invoice #INV-492." },
          { time: "00:00.58", tag: "EXECUTE", type: "exec", msg: "quickbooks.markPaid(invoice=\"INV-492\") & sheets.appendRow(tab=\"Q3 Revenue\")." }
        ],
        speed: "Synced across 4 apps in 0.65s · 0% Error Rate",
        output: "\"Deal #8194 marked Closed-Won in HubSpot. Invoice #INV-492 marked Paid in QuickBooks. Q3 Revenue spreadsheet updated and finance team alerted on Slack.\""
      }
    },
    documents: {
      badge: "INTELLIGENT OCR & PARSER",
      title: "Intelligent PDF & Invoice Extraction Engine",
      desc: "Converts messy PDF supplier invoices, contracts, receipts, and paper scans into clean structured database records with 99.8% guaranteed mathematical precision. Flags anomalies for human signoff.",
      tools: ["PDF / Scanned Files", "Vision AI Parser", "QuickBooks", "SAP / NetSuite", "PostgreSQL", "Excel Export"],
      turnaround: "3–5 Days",
      sla: "99.8% Mathematical Precision",
      console: {
        title: "rewoo-doc-runner — invoice-extractor.v2",
        input: "\"File Upload: Supplier_Invoice_Nov2026_Scanned.pdf (3 pages, multi-table layout)\"",
        logs: [
          { time: "00:00.18", tag: "VISION_OCR", type: "auth", msg: "High-resolution OCR segmentation. 3 pages scanned. 18 line items detected." },
          { time: "00:00.44", tag: "EXTRACTION", type: "tool", msg: "Extracted Vendor: 'Apex Logistics LLC', Subtotal: $14,250.00, Tax: $1,140.00." },
          { time: "00:00.61", tag: "MATH_CHECK", type: "guard", msg: "Sum of 18 items matches Total $15,390.00. Mathematical checksum verified." },
          { time: "00:00.83", tag: "DB_INJECT", type: "exec", msg: "Inserted 18 structured records into ERP Accounts Payable ledger." }
        ],
        speed: "Extracted & Verified in 0.89s · Human review bypassed",
        output: "\"18 line items, tax numbers, and vendor banking details verified with 100% mathematical integrity. Draft AP bill created in ERP for final batch payout.\""
      }
    },
    custom: {
      badge: "BESPOKE VERTICAL AI",
      title: "Custom AI Software Built For Proprietary Rules",
      desc: "When off-the-shelf tools fail your unique workflow, ReWoo engineers custom vertical agents with private database connectors, internal tooling integrations, and proprietary decision logic.",
      tools: ["Private Cloud VPC", "Custom REST / GraphQL APIs", "Vector Database (RAG)", "Internal Admin Portals", "Custom Microservices"],
      turnaround: "3–7 Days",
      sla: "99.9% Uptime & Privacy",
      console: {
        title: "rewoo-agent-runner — bespoke-core.v1",
        input: "\"Internal API Trigger: Real Estate underwriter requesting automated appraisal memo for commercial property #NY-829.\"",
        logs: [
          { time: "00:00.14", tag: "INTERNAL_RAG", type: "auth", msg: "Retrieved private underwriting policy doc & local comparable sales vector index." },
          { time: "00:00.41", tag: "CALCULATION", type: "tool", msg: "Executed proprietary Cap Rate model against zoning tax data." },
          { time: "00:00.70", tag: "POLICY_GATE", type: "guard", msg: "LTV ratio (68.4%) within investment mandate threshold (<75%)." },
          { time: "00:00.95", tag: "MEMO_GEN", type: "exec", msg: "Generated structured 4-page PDF investment memo and posted to Deal Committee Slack." }
        ],
        speed: "Appraisal Memo Generated in 1.1s · Full IP Ownership",
        output: "\"Investment memo #NY-829 compiled with complete audit citations and financial projections. Shared to internal Deal Room for Partner vote.\""
      }
    }
  };

  var inspTabs = document.querySelectorAll('.sol-insp-tab');
  var sysBadge = document.getElementById('sys-badge');
  var sysTitle = document.getElementById('sys-title');
  var sysDesc = document.getElementById('sys-desc');
  var sysTurnaround = document.getElementById('sys-turnaround');
  var sysSla = document.getElementById('sys-sla');
  var sysTools = document.getElementById('sys-tools');
  var sysWaBtn = document.getElementById('sys-wa-btn');
  var sysDeployBtn = document.getElementById('sys-deploy-btn');

  var consoleTitle = document.getElementById('console-title');
  var consoleInput = document.getElementById('console-input');
  var consoleLogs = document.getElementById('console-logs');
  var consoleSpeed = document.getElementById('console-speed');
  var consoleOutput = document.getElementById('console-output');
  var replayBtn = document.getElementById('console-replay-btn');

  var currentSystemKey = 'voice';

  function renderSystem(key, animateConsole) {
    var data = ADVANCED_SYSTEMS[key];
    if (!data) return;
    currentSystemKey = key;

    if (sysBadge) sysBadge.textContent = data.badge;
    if (sysTitle) sysTitle.textContent = data.title;
    if (sysDesc) sysDesc.textContent = data.desc;
    if (sysTurnaround) sysTurnaround.textContent = data.turnaround;
    if (sysSla) sysSla.textContent = data.sla;

    if (sysTools) {
      sysTools.innerHTML = '';
      data.tools.forEach(function (tool) {
        var badge = document.createElement('span');
        badge.className = 'sol-tool-badge';
        badge.textContent = tool;
        sysTools.appendChild(badge);
      });
    }

    if (sysWaBtn) {
      var waText = "Hi Adil, I want to discuss deploying the " + data.title + " for my business.";
      sysWaBtn.href = "https://wa.me/+8801321073452?text=" + encodeURIComponent(waText);
    }

    if (consoleTitle) {
      consoleTitle.textContent = data.console.title;
      consoleTitle.style.color = '#94A3B8';
    }
    if (consoleInput) {
      consoleInput.textContent = data.console.input;
      consoleInput.style.color = '#E2E8F0';
    }
    if (consoleSpeed) {
      consoleSpeed.textContent = data.console.speed;
      consoleSpeed.style.color = '#34D399';
    }
    if (consoleOutput) {
      consoleOutput.textContent = data.console.output;
      consoleOutput.style.color = '#E2E8F0';
    }

    if (consoleLogs) {
      consoleLogs.innerHTML = '';
      data.console.logs.forEach(function (logItem, index) {
        var entry = document.createElement('div');
        entry.className = 'sol-log-entry';
        if (animateConsole) {
          entry.style.opacity = '0';
          entry.style.transform = 'translateY(4px)';
          entry.style.transition = 'all 0.25s ease ' + (index * 120) + 'ms';
        }

        var timeSpan = document.createElement('span');
        timeSpan.className = 'sol-log-time';
        timeSpan.textContent = logItem.time;
        timeSpan.style.color = '#64748B';

        var tagSpan = document.createElement('span');
        tagSpan.className = 'sol-log-tag sol-log-tag--' + logItem.type;
        tagSpan.textContent = logItem.tag;

        var msgSpan = document.createElement('span');
        msgSpan.className = 'sol-log-msg';
        msgSpan.textContent = logItem.msg;
        msgSpan.style.color = '#F8FAFC';

        entry.appendChild(timeSpan);
        entry.appendChild(tagSpan);
        entry.appendChild(msgSpan);
        consoleLogs.appendChild(entry);

        if (animateConsole) {
          setTimeout(function () {
            entry.style.opacity = '1';
            entry.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    }
  }

  inspTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      inspTabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      var sysKey = tab.getAttribute('data-system');
      renderSystem(sysKey, true);
    });
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', function () {
      renderSystem(currentSystemKey, true);
    });
  }

  /* ==========================================================================
     5. SCOPING PROPOSAL MODAL
     ========================================================================== */
  var modal = document.getElementById('task-modal');
  var modalClose = document.getElementById('modal-close');
  var modalBackdrop = document.getElementById('modal-backdrop');
  var modalTaskText = document.getElementById('modal-task');
  var modalForm = document.getElementById('modal-project-form');
  var modalSuccess = document.getElementById('modal-success');

  var bpModalBtn = document.getElementById('bp-modal-btn');
  var finalCtaModalBtn = document.getElementById('final-cta-modal-btn');

  function openModal(defaultText) {
    if (!modal) return;
    if (modalTaskText) {
      if (defaultText) {
        modalTaskText.value = defaultText;
      } else if (taskInput && taskInput.value.trim().length > 0) {
        modalTaskText.value = taskInput.value.trim();
      }
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (bpModalBtn) {
    bpModalBtn.addEventListener('click', function () {
      openModal();
    });
  }

  if (sysDeployBtn) {
    sysDeployBtn.addEventListener('click', function () {
      var curData = ADVANCED_SYSTEMS[currentSystemKey];
      var text = "I want to deploy the " + (curData ? curData.title : "Advanced AI System") + " for my business.\n\nKey requirements:";
      openModal(text);
    });
  }

  if (finalCtaModalBtn) {
    finalCtaModalBtn.addEventListener('click', function () {
      openModal();
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById('modal-submit-btn');
      var nameInput = document.getElementById('modal-name');
      var emailInput = document.getElementById('modal-email');
      var taskInputModal = document.getElementById('modal-task');

      var nameVal = nameInput ? nameInput.value.trim() : '';
      var contactVal = emailInput ? emailInput.value.trim() : '';
      var taskVal = taskInputModal ? taskInputModal.value.trim() : '';

      // 1. Local backup in browser storage
      try {
        var existing = JSON.parse(localStorage.getItem('rewoo_inquiries') || '[]');
        existing.push({
          timestamp: new Date().toISOString(),
          name: nameVal,
          contact: contactVal,
          task: taskVal
        });
        localStorage.setItem('rewoo_inquiries', JSON.stringify(existing));
      } catch (storageErr) {
        console.warn('LocalStorage backup:', storageErr);
      }

      // 2. Prepare full email text to adilshamim696@gmail.com
      var emailSubject = 'New ReWoo Task Request from ' + (nameVal || 'Visitor');
      var emailBody = 'Hi Adil,\n\n' +
        'I would like to discuss a task/project with ReWoo.\n\n' +
        '----------------------------------------\n' +
        'MY DETAILS:\n' +
        'Name: ' + nameVal + '\n' +
        'Contact (Email/WhatsApp): ' + contactVal + '\n\n' +
        'TASK OR PROBLEM TO SOLVE:\n' +
        taskVal + '\n\n' +
        '----------------------------------------\n' +
        'Please let me know the recommended approach and next steps.\n\n' +
        '— Sent via ReWoo Solutions Scoper';

      var fullEmailClipboard = 'To: adilshamim696@gmail.com\n' +
        'Subject: ' + emailSubject + '\n\n' +
        emailBody;

      // Automatically copy to user's clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullEmailClipboard);
      }

      var directGmailInboxUrl = 'https://mail.google.com/mail/u/0/#inbox';
      var mailtoUrl = 'mailto:adilshamim696@gmail.com?subject=' + encodeURIComponent(emailSubject) + '&body=' + encodeURIComponent(emailBody);

      var waText = 'Hi Adil, my name is ' + nameVal + ' (' + contactVal + '). I need help with this task:\n\n' + taskVal;
      var waUrl = 'https://wa.me/+8801321073452?text=' + encodeURIComponent(waText);

      // 3. Update direct links in the success view
      var gmailBtn = document.getElementById('modal-gmail-btn');
      var copyBtn = document.getElementById('modal-copy-btn');
      var mailAppBtn = document.getElementById('modal-mail-app-btn');
      var waBtn = document.getElementById('modal-wa-btn');

      if (gmailBtn) gmailBtn.href = directGmailInboxUrl;
      if (mailAppBtn) mailAppBtn.href = mailtoUrl;
      if (waBtn) waBtn.href = waUrl;

      if (copyBtn) {
        copyBtn.onclick = function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(fullEmailClipboard).then(function () {
              copyBtn.textContent = '✓ Copied to Clipboard!';
              setTimeout(function () {
                copyBtn.textContent = 'Copy Email Text Again';
              }, 2000);
            });
          }
        };
      }

      // 4. Directly open Gmail inbox in a new tab
      window.open(directGmailInboxUrl, '_blank');

      // 5. Display confirmation state with quick action buttons
      if (modalForm) modalForm.style.display = 'none';
      if (modalSuccess) modalSuccess.style.display = 'block';
    });
  }

  // Initial render on page load
  renderSystem('voice', false);
  renderBlueprint(TASK_PRESETS.research);
  if (taskInput) {
    taskInput.value = TASK_PRESETS.research.text;
  }
});
