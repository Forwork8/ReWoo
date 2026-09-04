/**
 * =============================================================================
 * solutions.js — ReWoo AI Execution Agency & Systems
 * Production Interactive Console, Dynamic ROI Calculator, Blueprint Scoper & Modal
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================================================
     1. FIVE HIGH-DEMAND AGENT SYSTEMS DATA
     ========================================================================== */
  var SYSTEMS_DATA = {
    voice: {
      badge: "ACTIVE PRODUCTION ARCHITECTURE",
      title: "24/7 AI Voice & WhatsApp Receptionist",
      desc: "Answers inbound phone calls and WhatsApp inquiries in under 1 second. Answers company FAQs, qualifies buyer budget and timeline, books meetings on Google Calendar, and alerts human sales reps on Slack for hot leads.",
      tools: ["Vapi / Retell AI", "WhatsApp Cloud API", "Twilio Voice", "GoHighLevel / HubSpot", "Google Calendar", "Slack Alerts"],
      turnaround: "2–4 Days",
      sla: "Recovers 35%+ Leads",
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
          { time: "00:00.12", tag: "SCRAPE", type: "auth", msg: "Extracted 250 target brands from public registries & BuiltWith store lists." },
          { time: "00:00.38", tag: "ENRICH", type: "tool", msg: "Found Founder/CEO LinkedIn profiles & verified direct corporate emails (0% bounce)." },
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
      sla: "100% Accuracy",
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
      sla: "99.8% Precision",
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
      sla: "99.9% Reliable",
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

  /* ==========================================================================
     2. SYSTEM EXPLORER TAB SWITCHER
     ========================================================================== */
  var tabBtns = document.querySelectorAll('.sol-tab-btn');
  var sysBadge = document.getElementById('sys-badge');
  var sysTitle = document.getElementById('sys-title');
  var sysDesc = document.getElementById('sys-desc');
  var sysTools = document.getElementById('sys-tools');
  var sysTurnaround = document.getElementById('sys-turnaround');
  var sysSla = document.getElementById('sys-sla');
  var sysDeployBtn = document.getElementById('sys-deploy-btn');
  var sysWaBtn = document.getElementById('sys-wa-btn');

  var consoleTitle = document.getElementById('console-title');
  var consoleInput = document.getElementById('console-input');
  var consoleLogs = document.getElementById('console-logs');
  var consoleSpeed = document.getElementById('console-speed');
  var consoleOutput = document.getElementById('console-output');
  var replayBtn = document.getElementById('console-replay-btn');

  var currentSystemKey = 'voice';

  function renderSystem(key, animateConsole) {
    var data = SYSTEMS_DATA[key];
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

    if (consoleTitle) consoleTitle.textContent = data.console.title;
    if (consoleInput) consoleInput.textContent = data.console.input;
    if (consoleSpeed) consoleSpeed.textContent = data.console.speed;
    if (consoleOutput) consoleOutput.textContent = data.console.output;

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

        var tagSpan = document.createElement('span');
        tagSpan.className = 'sol-log-tag sol-log-tag--' + logItem.type;
        tagSpan.textContent = logItem.tag;

        var msgSpan = document.createElement('span');
        msgSpan.className = 'sol-log-msg';
        msgSpan.textContent = logItem.msg;

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

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      var sysKey = btn.getAttribute('data-system');
      renderSystem(sysKey, true);
    });
  });

  if (replayBtn) {
    replayBtn.addEventListener('click', function () {
      renderSystem(currentSystemKey, true);
    });
  }

  if (sysDeployBtn) {
    sysDeployBtn.addEventListener('click', function () {
      openModalWithSystem(currentSystemKey);
    });
  }

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

    // Monthly hours = weekly hours * 4 weeks * team members
    var monthlyHoursSaved = Math.round(hours * 4 * team);
    var monthlyCostSaved = Math.round(monthlyHoursSaved * rate);

    // Assuming average ReWoo project build is ~$1,200
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
     4. TASK SCOPER & BLUEPRINT ENGINE
     ========================================================================== */
  var PRESETS = {
    voice: {
      text: "I want a 24/7 AI Voice and WhatsApp receptionist for my business that answers incoming phone calls, answers customer questions using our service guides, qualifies lead budget, and books appointments on Google Calendar.",
      category: "24/7 Voice & WhatsApp Receptionist",
      timeline: "2–4 Business Days",
      arch: "An ultra-low latency voice & WhatsApp receptionist that answers calls instantly, answers customer questions from your company docs, qualifies budget/timing, and books calendar appointments.",
      tools: "Vapi / Retell, Twilio, WhatsApp Cloud API, GoHighLevel / HubSpot, Google Calendar, Slack",
      guardrails: "A 20-minute kickoff call. We build, test, and hand you a fully working system with zero maintenance overhead.",
      pipe: {
        s1: "Customer calls or sends WhatsApp message",
        s2: "Understands intent & queries company knowledge base",
        s3: "Validates lead budget & checks calendar availability",
        s4: "Books appointment in calendar & notifies sales rep"
      }
    },
    sdr: {
      text: "I want an autonomous AI SDR to scrape 500 target company decision-makers in our niche, verify their emails with 0% bounce rate, write custom personalized 1-to-1 icebreakers, and trigger email follow-ups to book sales calls.",
      category: "Autonomous Outbound SDR & Lead Engine",
      timeline: "3–5 Business Days",
      arch: "An automated outbound engine that enriches verified leads, personalizes multi-touch email sequences, and syncs responses into your CRM.",
      tools: "Clay & Apollo API, LinkedIn, SMTP Email Validator, Smartlead / Instantly, HubSpot",
      guardrails: "Every lead is strictly verified via SMTP handshake with zero fabricated contact info.",
      pipe: {
        s1: "You define target ICP & criteria",
        s2: "AI scrapes & enriches verified contacts",
        s3: "Generates custom personalized hooks",
        s4: "Dispatches campaigns & syncs to CRM"
      }
    },
    excel: {
      text: "I want to automatically sync new Stripe payments into Google Sheets, cross-reference customer records in HubSpot CRM, and mark invoices as paid in QuickBooks without doing it manually.",
      category: "Self-Healing n8n Pipeline & CRM Sync",
      timeline: "2–3 Business Days",
      arch: "An automatic event-driven data pipeline that eliminates manual copy-pasting, cleans schema discrepancies, and formats revenue summaries.",
      tools: "n8n (Self-Hosted), Make, Google Sheets, Excel, HubSpot, Stripe, QuickBooks, Slack",
      guardrails: "Built with automated error checking and retry logic so numbers are always 100% accurate.",
      pipe: {
        s1: "New row or payment detected",
        s2: "Cross-checks records in CRM",
        s3: "Validates numbers & calculations",
        s4: "Updates QuickBooks & alerts team"
      }
    },
    extraction: {
      text: "We receive hundreds of PDF invoices, supplier quotes, and contracts weekly. I want an AI to extract line items, prices, and tax numbers, and insert them directly into our accounting software.",
      category: "PDF & Document Extraction AI",
      timeline: "3–5 Business Days",
      arch: "An intelligent document scanner that reads messy PDFs, scanned receipts, and supplier quotes, extracting key fields with 99.8% precision.",
      tools: "PDF Files, Scanned Images, Vision OCR, ERP, QuickBooks, Excel",
      guardrails: "Strict mathematical check on totals. Low-confidence scans are automatically flagged for quick human approval.",
      pipe: {
        s1: "You forward PDF or scanned document",
        s2: "AI reads text, tables & totals",
        s3: "Mathematical validation check",
        s4: "Direct export to Excel / ERP"
      }
    },
    custom: {
      text: "I have a proprietary business process that takes our team 15+ hours a week. I want to build a custom AI solution that executes this workflow automatically.",
      category: "Custom AI Solution & Bespoke Engineering",
      timeline: "3–7 Business Days",
      arch: "A custom AI system engineered specifically around your company's proprietary rules, private data, and internal tools.",
      tools: "Your custom internal software, cloud database, or custom web portal",
      guardrails: "100% private data isolation (zero public AI training) + full ownership of all code and prompts.",
      pipe: {
        s1: "You describe your specific goal",
        s2: "We architect & build custom system",
        s3: "Tested against 100+ real edge cases",
        s4: "Deployed live in your business"
      }
    }
  };

  var taskInput = document.getElementById('task-input');
  var chips = document.querySelectorAll('.sol-chip');
  var bpCategory = document.getElementById('bp-category');
  var bpTimeline = document.getElementById('bp-timeline');
  var bpArch = document.getElementById('bp-arch');
  var bpTools = document.getElementById('bp-tools');
  var bpGuardrails = document.getElementById('bp-guardrails');
  var bpWhatsAppBtn = document.getElementById('bp-whatsapp-btn');
  var clearBtn = document.getElementById('task-clear-btn');
  var modalBtn = document.getElementById('bp-modal-btn');

  var pipeS1 = document.getElementById('pipe-s1');
  var pipeS2 = document.getElementById('pipe-s2');
  var pipeS3 = document.getElementById('pipe-s3');
  var pipeS4 = document.getElementById('pipe-s4');

  function updateBlueprint(data) {
    if (!data) return;
    if (bpCategory) bpCategory.textContent = data.category || 'AI Execution Blueprint';
    if (bpTimeline) bpTimeline.textContent = data.timeline || '2–5 Business Days';
    if (bpArch) bpArch.textContent = data.arch || 'Custom AI system tailored to your exact business workflow.';
    if (bpTools) bpTools.textContent = data.tools || 'Your existing software apps and tools';
    if (bpGuardrails) bpGuardrails.textContent = data.guardrails || 'A 20-minute kickoff. We build, test, and deliver a production system.';

    if (data.pipe) {
      if (pipeS1) pipeS1.textContent = data.pipe.s1;
      if (pipeS2) pipeS2.textContent = data.pipe.s2;
      if (pipeS3) pipeS3.textContent = data.pipe.s3;
      if (pipeS4) pipeS4.textContent = data.pipe.s4;
    }

    var taskText = (taskInput ? taskInput.value : '').trim() || data.text;
    var waMsg = "Hi Adil, I have an AI project for ReWoo:\n\n" + taskText;
    var waUrl = "https://wa.me/+8801321073452?text=" + encodeURIComponent(waMsg);
    if (bpWhatsAppBtn) {
      bpWhatsAppBtn.href = waUrl;
    }
  }

  // Preset Chips
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');

      var presetKey = chip.getAttribute('data-preset');
      var preset = PRESETS[presetKey];
      if (preset && taskInput) {
        taskInput.value = preset.text;
        updateBlueprint(preset);
      }
    });
  });

  // Dynamic Freeform Input Heuristic Parser
  if (taskInput) {
    taskInput.addEventListener('input', function () {
      var val = taskInput.value.toLowerCase();
      chips.forEach(function (c) { c.classList.remove('is-active'); });

      if (val.length === 0) {
        updateBlueprint(PRESETS.voice);
        return;
      }

      var detected = {
        category: "Custom AI Task Execution",
        timeline: "2–5 Business Days",
        arch: "A tailored AI execution system designed to automate your specific workflow.",
        tools: "Your existing apps, email, and tools",
        guardrails: "A 20-minute kickoff call. We handle all technical architecture and testing.",
        pipe: {
          s1: "You describe your goal",
          s2: "ReWoo AI logic executes task",
          s3: "Automated accuracy & safety check",
          s4: "Delivered live to your team"
        }
      };

      if (val.includes('voice') || val.includes('call') || val.includes('phone') || val.includes('receptionist') || val.includes('whatsapp') || val.includes('booking')) {
        detected.category = "24/7 Voice & WhatsApp Receptionist";
        detected.timeline = "2–4 Business Days";
        detected.arch = "An ultra-low latency voice & WhatsApp receptionist that answers calls instantly, answers customer questions, and books calendar appointments.";
        detected.tools = "Vapi / Retell, Twilio, WhatsApp Cloud API, GoHighLevel / HubSpot, Google Calendar";
        detected.pipe = PRESETS.voice.pipe;
      } else if (val.includes('sdr') || val.includes('outbound') || val.includes('cold email') || val.includes('lead') || val.includes('prospect') || val.includes('scrape') || val.includes('linkedin')) {
        detected.category = "Autonomous Outbound SDR & Lead Engine";
        detected.timeline = "3–5 Business Days";
        detected.arch = "An automated outbound engine that enriches verified leads, personalizes multi-touch email sequences, and syncs responses into your CRM.";
        detected.tools = "Clay & Apollo API, LinkedIn, SMTP Validator, Smartlead / Instantly, HubSpot";
        detected.pipe = PRESETS.sdr.pipe;
      } else if (val.includes('excel') || val.includes('sheet') || val.includes('crm') || val.includes('hubspot') || val.includes('sync') || val.includes('stripe') || val.includes('n8n') || val.includes('quickbooks')) {
        detected.category = "Self-Healing n8n Pipeline & CRM Sync";
        detected.timeline = "2–3 Business Days";
        detected.arch = "An automatic data pipeline that syncs records between your spreadsheets, CRM, and accounting software.";
        detected.tools = "n8n (Self-Hosted), Make, Google Sheets, Excel, HubSpot, Stripe, QuickBooks";
        detected.pipe = PRESETS.excel.pipe;
      } else if (val.includes('invoice') || val.includes('pdf') || val.includes('extract') || val.includes('contract') || val.includes('scan') || val.includes('receipt') || val.includes('ocr')) {
        detected.category = "PDF & Document Extraction AI";
        detected.timeline = "3–5 Business Days";
        detected.arch = "An intelligent document scanner that extracts fields from PDF invoices and inserts them into your accounting software.";
        detected.tools = "PDF Files, Scanned Images, Vision OCR, ERP, QuickBooks, Excel";
        detected.pipe = PRESETS.extraction.pipe;
      }

      updateBlueprint(detected);
    });
  }

  if (clearBtn && taskInput) {
    clearBtn.addEventListener('click', function () {
      taskInput.value = '';
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      updateBlueprint(PRESETS.voice);
      taskInput.focus();
    });
  }

  document.addEventListener('click', function (e) {
    var presetSelectBtn = e.target.closest('[data-preset-select]');
    if (presetSelectBtn) {
      var pKey = presetSelectBtn.getAttribute('data-preset-select');
      var targetChip = document.querySelector('.sol-chip[data-preset="' + pKey + '"]');
      if (targetChip) {
        targetChip.click();
      }
      var intakeSec = document.getElementById('request-task');
      if (intakeSec) {
        intakeSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  /* ==========================================================================
     5. PROJECT SCOPING MODAL
     ========================================================================== */
  var modal = document.getElementById('task-modal');
  var modalClose = document.getElementById('modal-close');
  var modalBackdrop = document.getElementById('modal-backdrop');
  var modalTaskText = document.getElementById('modal-task');
  var modalForm = document.getElementById('modal-project-form');
  var modalSuccess = document.getElementById('modal-success');

  function openModal() {
    if (!modal) return;
    if (modalTaskText && taskInput) {
      modalTaskText.value = taskInput.value.trim();
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function openModalWithSystem(sysKey) {
    if (!modal) return;
    var data = SYSTEMS_DATA[sysKey];
    if (modalTaskText && data) {
      modalTaskText.value = "I want to deploy the " + data.title + " for my business.\n\nKey requirements:";
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

  if (modalBtn) modalBtn.addEventListener('click', openModal);
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
      if (submitBtn) {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
      }

      setTimeout(function () {
        if (modalForm) modalForm.style.display = 'none';
        if (modalSuccess) modalSuccess.style.display = 'block';

        setTimeout(function () {
          closeModal();
          setTimeout(function () {
            if (modalForm) {
              modalForm.reset();
              modalForm.style.display = 'block';
            }
            if (modalSuccess) modalSuccess.style.display = 'none';
            if (submitBtn) {
              submitBtn.textContent = 'Submit to ReWoo Architect →';
              submitBtn.disabled = false;
            }
          }, 400);
        }, 2800);
      }, 700);
    });
  }

  // Initial render on page load
  renderSystem('voice', false);
  if (taskInput) {
    taskInput.value = PRESETS.voice.text;
    updateBlueprint(PRESETS.voice);
  }
});
