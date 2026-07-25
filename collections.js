/* =============================================================================
   ReWoo — AI Invoice Collections Agent (collections.js)
   Interactive demo simulator & ROI calculator script
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Sample Data for Invoice Collections Simulation
  const invoicesData = {
    'inv-1': {
      client: 'Acme Digital Agency',
      invNo: 'INV-2026-089',
      amount: '$4,500',
      daysOverdue: 14,
      severity: 'moderate',
      contact: 'Sarah Jenkins (Finance Dept)',
      channelData: {
        wa: {
          friendly: [
            { sender: 'agent', text: "Hi Sarah! Quick heads-up from ReWoo Finance regarding Invoice #INV-2026-089 ($4,500) which was due 14 days ago. Just wanted to make sure it didn't get lost in your inbox! Here is your quick payment link:", time: '10:14 AM', payBtn: true },
            { sender: 'client', text: "Thanks for the reminder! Appreciate the heads up. I'll get accounting to process this by end of day today.", time: '10:22 AM' },
            { sender: 'agent', text: "Awesome, thanks Sarah! Let me know if you need another copy of the invoice PDF.", time: '10:23 AM' }
          ],
          firm: [
            { sender: 'agent', text: "Hello Sarah, following up on Invoice #INV-2026-089 ($4,500) now 14 days overdue. As per our payment terms, please settle this balance to avoid temporary hold on upcoming service deliverables.", time: '09:30 AM', payBtn: true },
            { sender: 'client', text: "Sorry about the delay. We had an audit this week. Sending payment via ACH right now.", time: '09:45 AM' },
            { sender: 'agent', text: "Thank you for confirming, Sarah. I have logged your ACH transfer promise for reconciliation today.", time: '09:46 AM' }
          ],
          urgent: [
            { sender: 'agent', text: "URGENT: Invoice #INV-2026-089 ($4,500) is now 14 days overdue without resolved payment status. Immediate settlement is required today to keep account active.", time: '08:15 AM', payBtn: true },
            { sender: 'client', text: "Working on it right now! Processing the transaction via card link.", time: '08:28 AM' }
          ],
          discount: [
            { sender: 'agent', text: "Hi Sarah! Settle Invoice #INV-2026-089 ($4,500) within the next 24 hours to receive a 3% early-clearing credit ($135 savings) on your next billing cycle. Pay securely here:", time: '11:00 AM', payBtn: true },
            { sender: 'client', text: "Great offer! Paid just now using the link to get the 3% discount.", time: '11:05 AM' }
          ]
        },
        email: {
          friendly: {
            to: 'sarah.j@acmedigital.com',
            subject: 'Friendly reminder: Invoice #INV-2026-089 ($4,500)',
            body: `Hi Sarah,<br><br>Hope you are having a productive week! This is a friendly reminder that Invoice <strong>#INV-2026-089</strong> for <strong>$4,500</strong> was due 14 days ago.<br><br>You can make a instant payment via bank transfer or credit card using our secure checkout link below:<br><br><a href="#" style="color:#F59E0B;font-weight:600;">→ Pay Invoice $4,500 Online</a><br><br>Best regards,<br>ReWoo Accounts Team`
          },
          firm: {
            to: 'sarah.j@acmedigital.com',
            subject: 'Second Notice: Overdue Invoice #INV-2026-089 ($4,500)',
            body: `Dear Sarah,<br><br>We have not yet received payment for Invoice <strong>#INV-2026-089</strong> ($4,500), which is now 14 days past due.<br><br>Please arrange payment today to ensure uninterrupted service delivery.<br><br><a href="#" style="color:#F59E0B;font-weight:600;">→ Complete Payment Now</a><br><br>Sincerely,<br>ReWoo Collections Dept`
          },
          urgent: {
            to: 'sarah.j@acmedigital.com',
            subject: 'FINAL REMINDER: Overdue Invoice #INV-2026-089',
            body: `ATTENTION: Sarah Jenkins<br><br>Invoice <strong>#INV-2026-089</strong> ($4,500) requires immediate attention. Immediate payment is needed to avoid service suspension.<br><br><a href="#" style="color:#EF4444;font-weight:700;">→ Settle Balance Immediately</a>`
          },
          discount: {
            to: 'sarah.j@acmedigital.com',
            subject: 'Special Offer: 3% Prompt Payment Discount on Invoice #INV-2026-089',
            body: `Hi Sarah,<br><br>Pay your overdue invoice <strong>#INV-2026-089</strong> today and get <strong>3% off</strong> applied to your account!<br><br><a href="#" style="color:#10B981;font-weight:600;">→ Claim 3% Discount & Pay $4,365</a>`
          }
        }
      },
      status: { label: 'Promise Logged', type: 'success' }
    },
    'inv-2': {
      client: 'Apex Logistics LLC',
      invNo: 'INV-2026-042',
      amount: '$12,000',
      daysOverdue: 45,
      severity: 'severe',
      contact: 'Michael Vance (CFO)',
      channelData: {
        wa: {
          friendly: [
            { sender: 'agent', text: "Good morning Michael, checking in on Invoice #INV-2026-042 ($12,000) past due 45 days. We would appreciate an update on payment scheduling.", time: '09:00 AM', payBtn: true }
          ],
          firm: [
            { sender: 'agent', text: "Michael, Invoice #INV-2026-042 ($12,000) is now 45 days overdue. We require immediate confirmation of payment release.", time: '11:15 AM', payBtn: true },
            { sender: 'client', text: "Our CFO requires approval for transfers over $10k. Escalating to CFO now.", time: '11:30 AM' }
          ],
          urgent: [
            { sender: 'agent', text: "FINAL DEMAND: Invoice #INV-2026-042 ($12,000) is 45 days overdue. Outstanding balance will be escalated to legal collections tomorrow at 5 PM if unsettled.", time: '08:00 AM', payBtn: true },
            { sender: 'client', text: "Please don't send to legal! Wire transfer initiated just now. Ref: W-991204.", time: '08:42 AM' },
            { sender: 'agent', text: "Wire reference logged. AI Agent waiting for bank clearance confirmation.", time: '08:43 AM' }
          ],
          discount: [
            { sender: 'agent', text: "Michael, we can offer a 5% settlement discount ($600 off) if Invoice #INV-2026-042 ($12,000) is settled by 5:00 PM today.", time: '02:00 PM', payBtn: true }
          ]
        },
        email: {
          firm: {
            to: 'mvance@apexlogistics.com',
            subject: 'Formal Demand: Overdue Invoice #INV-2026-042 ($12,000)',
            body: `Dear Mr. Vance,<br><br>Invoice <strong>#INV-2026-042</strong> ($12,000) is now <strong>45 days overdue</strong>. Please remit payment immediately via the link below.<br><br><a href="#" style="color:#F59E0B;font-weight:600;">→ Pay $12,000 Securely</a>`
          }
        }
      },
      status: { label: 'Wire Ref Logged', type: 'success' }
    },
    'inv-3': {
      client: 'Kona Coffee Roasters',
      invNo: 'INV-2026-112',
      amount: '$850',
      daysOverdue: 3,
      severity: 'mild',
      contact: 'David Miller (Manager)',
      channelData: {
        wa: {
          friendly: [
            { sender: 'agent', text: "Hi David! Hope your week is off to a great start. Just a friendly notice that Invoice #INV-2026-112 ($850) was due 3 days ago. Click below to pay whenever convenient!", time: '02:15 PM', payBtn: true },
            { sender: 'client', text: "Oh thanks! Just tapped the link and paid with Apple Pay.", time: '02:18 PM' },
            { sender: 'agent', text: "Payment received! Thank you David, receipt sent to your email.", time: '02:19 PM' }
          ]
        },
        email: {
          friendly: {
            to: 'david@konacoffee.com',
            subject: 'Quick reminder: Invoice #INV-2026-112 ($850)',
            body: `Hi David,<br><br>Just dropping a quick note regarding Invoice <strong>#INV-2026-112</strong> ($850).<br><br><a href="#" style="color:#F59E0B;font-weight:600;">→ Click to Pay $850</a>`
          }
        }
      },
      status: { label: 'Paid & Reconciled', type: 'success' }
    }
  };

  let selectedInvId = 'inv-1';
  let selectedTone = 'friendly';
  let selectedChannel = 'wa';

  const invoiceItems = document.querySelectorAll('.invoice-item');
  const toneBtns = document.querySelectorAll('.tone-btn');
  const channelBtns = document.querySelectorAll('.channel-btn');
  const demoScreenBody = document.getElementById('demo-screen-body');
  const channelBadge = document.getElementById('channel-badge');
  const actionStatusEl = document.getElementById('action-status');

  function renderDemo() {
    const inv = invoicesData[selectedInvId];
    if (!inv) return;

    // Update Channel Badge
    if (selectedChannel === 'wa') {
      channelBadge.className = 'demo-channel-badge demo-channel-badge--wa';
      channelBadge.textContent = 'WhatsApp Chat';
    } else {
      channelBadge.className = 'demo-channel-badge demo-channel-badge--email';
      channelBadge.textContent = 'Email Sequence';
    }

    // Update Status Footer
    if (actionStatusEl) {
      const st = inv.status;
      actionStatusEl.innerHTML = `
        <span>Status:</span>
        <span class="action-status-badge action-status-badge--${st.type}">${st.label}</span>
      `;
    }

    demoScreenBody.innerHTML = '';

    if (selectedChannel === 'wa') {
      const messages = (inv.channelData.wa && inv.channelData.wa[selectedTone]) || inv.channelData.wa.friendly;
      messages.forEach((msg, idx) => {
        const bubble = document.createElement('div');
        bubble.className = `wa-bubble wa-bubble--${msg.sender}`;
        bubble.style.animationDelay = `${idx * 120}ms`;

        let contentHtml = `<div>${msg.text}</div>`;
        if (msg.payBtn) {
          contentHtml += `
            <a href="#" class="wa-pay-btn" onclick="event.preventDefault(); alert('Interactive Preview: In production, this opens your direct Stripe/Xero payment portal!');">
              💳 Pay ${inv.amount} Online
            </a>
          `;
        }
        contentHtml += `<div class="wa-bubble__time">${msg.time} ${msg.sender === 'agent' ? '✓✓' : ''}</div>`;
        bubble.innerHTML = contentHtml;
        demoScreenBody.appendChild(bubble);
      });
    } else {
      // Email Render
      const emailObj = (inv.channelData.email && inv.channelData.email[selectedTone]) || inv.channelData.email.friendly;
      const emailContainer = document.createElement('div');
      emailContainer.className = 'email-container';
      emailContainer.innerHTML = `
        <div class="email-meta">
          <div class="email-meta-row"><span class="email-meta-key">To:</span> <strong>${emailObj.to}</strong></div>
          <div class="email-meta-row"><span class="email-meta-key">From:</span> collections@rewoo.tech</div>
        </div>
        <div class="email-subject">${emailObj.subject}</div>
        <div>${emailObj.body}</div>
      `;
      demoScreenBody.appendChild(emailContainer);
    }
  }

  // Event Listeners for Invoice Items
  invoiceItems.forEach(item => {
    item.addEventListener('click', () => {
      invoiceItems.forEach(i => i.classList.remove('is-selected'));
      item.classList.add('is-selected');
      selectedInvId = item.getAttribute('data-inv');
      renderDemo();
    });
  });

  // Event Listeners for Tone Selector
  toneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toneBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedTone = btn.getAttribute('data-tone');
      renderDemo();
    });
  });

  // Event Listeners for Channel Switcher
  channelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      channelBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedChannel = btn.getAttribute('data-channel');
      renderDemo();
    });
  });

  // ROI Calculator Logic
  const sliderOverdue = document.getElementById('slider-overdue');
  const valOverdue = document.getElementById('val-overdue');
  const resCash = document.getElementById('res-cash');
  const resHours = document.getElementById('res-hours');

  if (sliderOverdue && valOverdue && resCash && resHours) {
    sliderOverdue.addEventListener('input', (e) => {
      const amount = parseInt(e.target.value, 10);
      valOverdue.textContent = `$${amount.toLocaleString()}`;

      // Calculation: 82% average recovery increase, ~18 hours saved per $25k overdue
      const recovered = Math.round(amount * 0.82);
      const hoursSaved = Math.round((amount / 25000) * 16) + 4;

      resCash.textContent = `$${recovered.toLocaleString()}`;
      resHours.textContent = `${hoursSaved} hrs/mo`;
    });
  }

  // Initial render
  renderDemo();
});
