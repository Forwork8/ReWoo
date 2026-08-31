/**
 * =============================================================================
 * solutions.js — ReWoo AI Execution Agency
 * Steve Jobs Simplicity: Plain English Scoper, Instant Blueprint, & Scoping Modal
 * Production Vanilla JavaScript.
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================================================
     1. PLAIN ENGLISH TASK PRESETS & BLUEPRINT ENGINE
     ========================================================================== */
  var PRESETS = {
    support: {
      text: "I want an AI customer support assistant that automatically answers emails, chat queries, and tickets using our company help center docs, resolves order lookups, and notifies our team on Slack for complex requests.",
      category: "Customer Support & Communication Agent",
      timeline: "2–4 Business Days",
      arch: "An autonomous customer assistant that answers support questions using your company docs, resolves order issues, and notifies your team for complex requests.",
      tools: "Your Gmail, Slack, Zendesk, Intercom, Notion, or Website Chat",
      guardrails: "A 20-minute kickoff call. We build, test, and hand you a fully working system with zero maintenance overhead.",
      pipe: {
        s1: "Customer sends email or ticket",
        s2: "Searches your company docs & policy",
        s3: "Validates response accuracy & limits",
        s4: "Replies to customer in 15 seconds"
      }
    },
    excel: {
      text: "I want to automatically sync new leads from our website into Google Sheets, cross-reference them in HubSpot CRM, and generate invoice drafts in QuickBooks without doing it manually.",
      category: "Spreadsheet & CRM Pipeline Automation",
      timeline: "2–3 Business Days",
      arch: "An automatic data pipeline that eliminates manual copy-pasting, syncs records across your apps, and formats weekly summaries.",
      tools: "Google Sheets, Excel, HubSpot, Stripe, QuickBooks, Slack",
      guardrails: "Built with automated error checking and retry logic so numbers are always 100% accurate.",
      pipe: {
        s1: "New row or payment detected",
        s2: "Cross-checks records in CRM",
        s3: "Validates numbers & calculations",
        s4: "Updates QuickBooks & alerts team"
      }
    },
    research: {
      text: "I need to research 500 target companies in our industry: find their verified decision-maker emails, tech stacks, and company size, and organize everything into an Airtable database.",
      category: "Market Research & Intelligence Engine",
      timeline: "3–5 Business Days",
      arch: "An automated research system that scans websites, LinkedIn, and public registries to extract structured company intelligence.",
      tools: "Web Extractors, LinkedIn, Google Search, Airtable, Notion",
      guardrails: "Every single contact and company fact is backed by a verified source link with zero fabricated data.",
      pipe: {
        s1: "You provide target list or criteria",
        s2: "AI scans websites & verified sources",
        s3: "Filters valid emails & decision-makers",
        s4: "Delivers organized Airtable dataset"
      }
    },
    extraction: {
      text: "We receive hundreds of PDF invoices, supplier quotes, and contracts weekly. I want an AI to extract line items, prices, and tax numbers, and insert them directly into our accounting software.",
      category: "PDF & Document Extraction AI",
      timeline: "3–5 Business Days",
      arch: "An intelligent document scanner that reads messy PDFs, scanned receipts, and supplier quotes, extracting key fields with 99.8% precision.",
      tools: "PDF Files, Scanned Images, ERP, QuickBooks, Excel",
      guardrails: "Strict mathematical check on totals. Low-confidence scans are automatically flagged for quick human approval.",
      pipe: {
        s1: "You forward PDF or scanned document",
        s2: "AI reads text, tables & totals",
        s3: "Mathematical validation check",
        s4: "Direct export to Excel / ERP"
      }
    },
    custom: {
      text: "I have a specific workflow in my business that takes our team 10+ hours a week. I want to build a custom AI solution that does this work automatically.",
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

    // Dynamic WhatsApp Link
    var taskText = (taskInput ? taskInput.value : '').trim() || data.text;
    var waMsg = "Hi Adil, I have a project for ReWoo:\n\n" + taskText;
    var waUrl = "https://wa.me/+8801321073452?text=" + encodeURIComponent(waMsg);
    if (bpWhatsAppBtn) {
      bpWhatsAppBtn.href = waUrl;
    }
  }

  // Handle Preset Button Clicks
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

  // Handle Custom Input typing (Heuristic Detection)
  if (taskInput) {
    taskInput.addEventListener('input', function () {
      var val = taskInput.value.toLowerCase();
      chips.forEach(function (c) { c.classList.remove('is-active'); });

      if (val.length === 0) {
        updateBlueprint(PRESETS.support);
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

      if (val.includes('support') || val.includes('ticket') || val.includes('customer') || val.includes('email') || val.includes('chat')) {
        detected.category = "Customer Support & Communication Agent";
        detected.timeline = "2–4 Business Days";
        detected.arch = "An autonomous customer assistant that answers support questions using your company docs and escalates complex bugs.";
        detected.tools = "Gmail, Slack, Zendesk, Intercom, Notion, Website Chat";
        detected.pipe = PRESETS.support.pipe;
      } else if (val.includes('excel') || val.includes('sheet') || val.includes('crm') || val.includes('hubspot') || val.includes('sync') || val.includes('lead')) {
        detected.category = "Spreadsheet & CRM Pipeline Automation";
        detected.timeline = "2–3 Business Days";
        detected.arch = "An automatic data pipeline that syncs records between your spreadsheets, CRM, and accounting software.";
        detected.tools = "Google Sheets, Excel, HubSpot, Stripe, QuickBooks, Slack";
        detected.pipe = PRESETS.excel.pipe;
      } else if (val.includes('research') || val.includes('company') || val.includes('scrape') || val.includes('intel') || val.includes('list')) {
        detected.category = "Market Research & Intelligence Engine";
        detected.timeline = "3–5 Business Days";
        detected.arch = "An automated research engine that scans public sources to extract verified company records.";
        detected.tools = "Web Extractors, LinkedIn, Google, Airtable, Notion";
        detected.pipe = PRESETS.research.pipe;
      } else if (val.includes('invoice') || val.includes('pdf') || val.includes('extract') || val.includes('contract') || val.includes('scan')) {
        detected.category = "PDF & Document Extraction AI";
        detected.timeline = "3–5 Business Days";
        detected.arch = "An intelligent document scanner that extracts fields from PDF invoices and inserts them into your accounting software.";
        detected.tools = "PDF Files, Scanned Images, ERP, QuickBooks, Excel";
        detected.pipe = PRESETS.extraction.pipe;
      }

      updateBlueprint(detected);
    });
  }

  // Clear Input
  if (clearBtn && taskInput) {
    clearBtn.addEventListener('click', function () {
      taskInput.value = '';
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      updateBlueprint(PRESETS.support);
      taskInput.focus();
    });
  }

  // Initial Load
  if (taskInput) {
    taskInput.value = PRESETS.support.text;
    updateBlueprint(PRESETS.support);
  }

  // Bento Card Button Clicks (Scroll up and select preset)
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
     2. PROJECT SCOPING MODAL
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

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalBtn) {
    modalBtn.addEventListener('click', openModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById('modal-submit-btn');
      if (submitBtn) {
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.disabled = true;
      }

      setTimeout(function () {
        if (modalForm) modalForm.style.display = 'none';
        if (modalSuccess) modalSuccess.style.display = 'block';
      }, 600);
    });
  }

});
