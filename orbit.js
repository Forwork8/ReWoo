/* =============================================================================
   orbit.js — Orbit by ReWoo
   Live orbital visualization of a deployed AI company.

   Architecture:
     ORBIT_CONFIG    → static agent definitions (function, ring, display name)
     MockDataLayer   → simulates live state; swap in real API here
     OrbitLayout     → computes stable (cx, cy) positions from fixed angles
     OrbitRenderer   → builds and updates SVG DOM
     DetailPanel     → manages the slide-in drawer
     StatePoller     → 4-second poll cycle
   ============================================================================= */

'use strict';

(function () {

  /* ============================================================
     1. CONSTANTS & AGENT CONFIG
     ============================================================ */

  const INNER_RADIUS  = 130;   // Atlas ring radius (SVG units)
  const OUTER_RADIUS  = 258;   // Functional agents ring radius
  const SVG_SIZE      = 580;   // viewBox side length
  const CX            = SVG_SIZE / 2;
  const CY            = SVG_SIZE / 2;

  const NODE_R = {
    founder:    42,
    atlas:      33,
    functional: 27,
  };

  const POLL_INTERVAL = 4000; // ms

  // Static agent roster — only these agents are in scope for v1 demo
  // In production, this comes from a per-client API endpoint.
  const ORBIT_CONFIG = [
    {
      id: 'founder',
      name: 'You',
      role: 'founder',
      function: 'Founder',
      ring: 'founder',
      angleFixed: null, // center
      blurb: 'sets the vision',
    },
    {
      id: 'atlas',
      name: 'Atlas',
      role: 'atlas',
      function: 'CEO / Orchestrator',
      ring: 'atlas',
      angleFixed: null, // top of inner ring, computed
      blurb: 'runs the company',
    },
    {
      id: 'sales',
      name: 'Sales',
      role: 'functional',
      function: 'Sales',
      ring: 'functional',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      role: 'functional',
      function: 'Marketing',
      ring: 'functional',
    },
    {
      id: 'support',
      name: 'Support',
      role: 'functional',
      function: 'Customer Support',
      ring: 'functional',
    },
    {
      id: 'collections',
      name: 'Collections',
      role: 'functional',
      function: 'Collections',
      ring: 'functional',
    },
    {
      id: 'product',
      name: 'Product',
      role: 'functional',
      function: 'Product',
      ring: 'functional',
    },
    {
      id: 'ops',
      name: 'Ops',
      role: 'functional',
      function: 'Operations',
      ring: 'functional',
    },
  ];


  /* ============================================================
     2. MOCK DATA LAYER
     (Swap this out for a real fetch/websocket in production)
     ============================================================ */

  const MockDataLayer = (() => {

    // Initial state — matches the reference screenshot
    let _state = {
      client_id: 'demo-client-001',
      client_name: 'Your Company',
      live_data_connected: false, // set to true when real API is wired
      agents: {
        founder: {
          status: 'active',
          decision_tier: null,
          ledger_accuracy_pct: null,
          last_action_summary: 'sets the vision',
          approval_link: null,
          interaction_count: 999,
        },
        atlas: {
          status: 'active',
          decision_tier: 'L2',
          ledger_accuracy_pct: 94,
          last_action_summary: 'runs the company',
          approval_link: null,
          interaction_count: 142,
        },
        sales: {
          status: 'active',
          decision_tier: 'L1',
          ledger_accuracy_pct: 91,
          last_action_summary: '3 deals today',
          approval_link: null,
          interaction_count: 87,
        },
        marketing: {
          status: 'active',
          decision_tier: 'L1',
          ledger_accuracy_pct: 87,
          last_action_summary: '2 posts queued',
          approval_link: null,
          interaction_count: 64,
        },
        support: {
          status: 'awaiting_approval',
          decision_tier: 'L3',
          ledger_accuracy_pct: 78,
          last_action_summary: 'needs your ok',
          approval_link: '#approval-support',
          interaction_count: 203,
        },
        collections: {
          status: 'active',
          decision_tier: 'L2',
          ledger_accuracy_pct: 82,
          last_action_summary: '1 payment flagged',
          approval_link: null,
          interaction_count: 45,
        },
        product: {
          status: 'idle',
          decision_tier: 'L1',
          ledger_accuracy_pct: null,
          last_action_summary: 'warming up',
          approval_link: null,
          interaction_count: 7, // < 20 = warming up
        },
        ops: {
          status: 'awaiting_approval',
          decision_tier: 'L3',
          ledger_accuracy_pct: 65,
          last_action_summary: 'needs your ok',
          approval_link: '#approval-ops',
          interaction_count: 31,
        },
      }
    };

    // Realistic mutation schedule — agents shift states on their own cadence
    const _mutationSchedule = [
      { agentId: 'sales',      delay: 6000,  action: () => _cycle('sales',    'active',            '5 deals today',      null) },
      { agentId: 'marketing',  delay: 10000, action: () => _cycle('marketing','active',            '3 posts queued',     null) },
      { agentId: 'support',    delay: 14000, action: () => _cycle('support',  'active',            '4 tickets resolved', null) },
      { agentId: 'ops',        delay: 18000, action: () => _cycle('ops',      'active',            'all systems go',     null) },
      { agentId: 'product',    delay: 22000, action: () => _warmUp('product', 74, '1 spec drafted') },
      { agentId: 'collections',delay: 26000, action: () => _cycle('collections','awaiting_approval','approve write-off', '#approval-collections') },
      { agentId: 'sales',      delay: 30000, action: () => _cycle('sales',    'awaiting_approval', 'proposal needs ok',  '#approval-sales') },
      { agentId: 'support',    delay: 36000, action: () => _cycle('support',  'awaiting_approval', 'needs your ok',      '#approval-support') },
      { agentId: 'ops',        delay: 42000, action: () => _cycle('ops',      'awaiting_approval', 'needs your ok',      '#approval-ops') },
    ];

    function _cycle(id, status, summary, approvalLink) {
      const a = _state.agents[id];
      a.status = status;
      a.last_action_summary = summary;
      a.approval_link = approvalLink;
    }

    function _warmUp(id, accuracy, summary) {
      const a = _state.agents[id];
      a.ledger_accuracy_pct = accuracy;
      a.interaction_count = 28; // now past the 20-threshold
      a.status = 'active';
      a.last_action_summary = summary;
    }

    // Kick off the mutation schedule
    function _startMutations() {
      _mutationSchedule.forEach(({ delay, action }) => {
        setTimeout(action, delay);
        // Loop after all mutations complete (~50s cycle)
        setTimeout(function loop() {
          action();
          setTimeout(loop, 52000);
        }, delay + 52000);
      });
    }

    // Public API — mirrors what a real REST endpoint would return
    function getState() {
      return JSON.parse(JSON.stringify(_state)); // deep copy
    }

    return { getState, start: _startMutations };
  })();


  /* ============================================================
     3. ORBIT LAYOUT — stable positions from fixed angles
     ============================================================ */

  const OrbitLayout = (() => {
    function _toRad(deg) { return (deg * Math.PI) / 180; }

    // Compute (cx, cy) for each agent; returns a map keyed by agent id
    function compute(agents) {
      const positions = {};

      // Founder = center
      positions['founder'] = { cx: CX, cy: CY };

      // Atlas = top of inner ring
      positions['atlas'] = {
        cx: CX + INNER_RADIUS * Math.cos(_toRad(-90)),
        cy: CY + INNER_RADIUS * Math.sin(_toRad(-90)),
      };

      // Functional agents evenly distributed on outer ring
      // Starting at -90° (top) and going clockwise
      const functionals = agents.filter(a => a.ring === 'functional');
      const count = functionals.length;
      const step = 360 / count;

      functionals.forEach((agent, i) => {
        const angleDeg = -90 + step * i;
        const rad = _toRad(angleDeg);
        positions[agent.id] = {
          cx: CX + OUTER_RADIUS * Math.cos(rad),
          cy: CY + OUTER_RADIUS * Math.sin(rad),
        };
      });

      return positions;
    }

    return { compute };
  })();


  /* ============================================================
     4. ORBIT RENDERER — SVG DOM builder & updater
     ============================================================ */

  const OrbitRenderer = (() => {

    const NS = 'http://www.w3.org/2000/svg';
    let _svg = null;
    let _positions = {};
    let _config = [];
    let _onNodeClick = null;

    function _svgEl(tag, attrs) {
      const el = document.createElementNS(NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    }

    // Glow class from accuracy
    function _glowClass(agent, state) {
      if (agent.role === 'founder') return 'glow--founder';
      if (agent.role === 'atlas')   return 'glow--atlas';

      const agentState = state.agents[agent.id];
      if (!agentState) return '';

      if (agentState.status === 'awaiting_approval') return 'glow--amber';
      if (agentState.interaction_count < 20)         return 'glow--warming';

      const acc = agentState.ledger_accuracy_pct;
      if (acc === null)  return 'glow--warming';
      if (acc >= 85)     return 'glow--high';
      if (acc >= 65)     return 'glow--mid';
      return 'glow--low';
    }

    // Status class for node group
    function _statusClass(agent, state) {
      if (agent.role === 'founder') return 'node--founder';
      if (agent.role === 'atlas')   return 'node--atlas';

      const agentState = state.agents[agent.id];
      if (!agentState) return '';

      if (agentState.interaction_count < 20) return 'node--warming';

      switch (agentState.status) {
        case 'awaiting_approval': return 'node--awaiting';
        case 'active':            return 'node--active';
        case 'idle':              return 'node--idle';
        default:                  return 'node--idle';
      }
    }

    function _statusLabel(agent, state) {
      if (agent.role === 'founder') return 'sets the vision';
      if (agent.role === 'atlas')   return 'runs the company';

      const agentState = state.agents[agent.id];
      if (!agentState) return '';
      if (agentState.interaction_count < 20) return 'warming up';
      return agentState.last_action_summary || '';
    }

    function _nodeR(role) {
      return NODE_R[role] || NODE_R.functional;
    }

    // Build the full SVG from scratch (called once on init)
    function build(svg, config, positions, state, onNodeClick) {
      _svg = svg;
      _positions = positions;
      _config = config;
      _onNodeClick = onNodeClick;

      svg.innerHTML = ''; // clear

      // BUG FIX: Re-inject accessible title + desc after clearing innerHTML.
      // These were previously only in the static HTML and got wiped.
      const svgNS = 'http://www.w3.org/2000/svg';
      const titleEl = document.createElementNS(svgNS, 'title');
      titleEl.textContent = 'ReWoo Orbit — AI Executive Team Status';
      const descEl = document.createElementNS(svgNS, 'desc');
      descEl.textContent = 'A live orbital diagram showing your AI executive team around a central founder node. Teal nodes are operating autonomously. Amber nodes are waiting for your approval.';
      svg.appendChild(titleEl);
      svg.appendChild(descEl);

      // Rings
      const atlasRing = _svgEl('circle', {
        cx: CX, cy: CY, r: INNER_RADIUS,
        class: 'orbit-ring',
      });
      const outerRing = _svgEl('circle', {
        cx: CX, cy: CY, r: OUTER_RADIUS,
        class: 'orbit-ring',
      });
      svg.appendChild(atlasRing);
      svg.appendChild(outerRing);

      // Connector lines: Founder → Atlas, then Atlas → each functional
      const atlasPos = positions['atlas'];
      const founderPos = positions['founder'];

      const founderAtlasLine = _svgEl('line', {
        x1: founderPos.cx, y1: founderPos.cy,
        x2: atlasPos.cx,   y2: atlasPos.cy,
        class: 'orbit-connector',
      });
      svg.appendChild(founderAtlasLine);

      config.filter(a => a.ring === 'functional').forEach(agent => {
        const pos = positions[agent.id];
        const line = _svgEl('line', {
          x1: atlasPos.cx, y1: atlasPos.cy,
          x2: pos.cx,      y2: pos.cy,
          class: 'orbit-connector',
        });
        svg.appendChild(line);
      });

      // Nodes (render founder last so it's on top visually)
      const renderOrder = [
        ...config.filter(a => a.ring === 'functional'),
        config.find(a => a.role === 'atlas'),
        config.find(a => a.role === 'founder'),
      ].filter(Boolean);

      renderOrder.forEach(agent => _buildNode(svg, agent, positions, state));
    }

    function _buildNode(svg, agent, positions, state) {
      const pos = positions[agent.id];
      const r = _nodeR(agent.role);
      const statusCls = _statusClass(agent, state);
      const glowCls   = _glowClass(agent, state);
      const labelText = _statusLabel(agent, state);

      const g = _svgEl('g', {
        class: `orbit-node ${statusCls} ${glowCls}`,
        role: 'button',
        tabindex: '0',
        'aria-label': `${agent.name} — ${labelText}`,
        'data-agent-id': agent.id,
      });

      // Focus ring (accessibility)
      const focusRing = _svgEl('circle', {
        cx: pos.cx, cy: pos.cy, r: r + 8,
        class: 'node-focus-ring',
      });
      g.appendChild(focusRing);

      // Pulse ring for awaiting nodes
      const pulseRing = _svgEl('circle', {
        cx: pos.cx, cy: pos.cy, r: r + 6,
        class: 'node-pulse-ring',
        'data-pulse': '',
      });
      g.appendChild(pulseRing);

      // Main circle
      const circle = _svgEl('circle', {
        cx: pos.cx, cy: pos.cy, r: r,
        class: 'node-circle',
      });
      g.appendChild(circle);

      // Label: name
      const nameLabelY = pos.cy + r + 18;
      const nameLabel = _svgEl('text', {
        x: pos.cx, y: nameLabelY,
        class: 'node-label-name',
      });
      nameLabel.textContent = agent.name;
      g.appendChild(nameLabel);

      // Label: status/summary
      const statusLabel = _svgEl('text', {
        x: pos.cx, y: nameLabelY + 16,
        class: 'node-label-status',
      });
      statusLabel.textContent = labelText;
      g.appendChild(statusLabel);

      // Click + keyboard events
      g.addEventListener('click', () => _onNodeClick(agent.id));
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          _onNodeClick(agent.id);
        }
      });

      svg.appendChild(g);
    }

    // Update colors/labels/glow without rebuilding layout
    function update(state) {
      if (!_svg) return;

      _config.forEach(agent => {
        const g = _svg.querySelector(`[data-agent-id="${agent.id}"]`);
        if (!g) return;

        const newStatusCls = _statusClass(agent, state);
        const newGlowCls   = _glowClass(agent, state);
        const newLabel     = _statusLabel(agent, state);

        // Update classes
        const statusClasses = ['node--founder','node--atlas','node--active','node--idle','node--awaiting','node--warming'];
        const glowClasses   = ['glow--founder','glow--atlas','glow--high','glow--mid','glow--low','glow--warming','glow--amber'];
        g.classList.remove(...statusClasses, ...glowClasses);
        g.classList.add(newStatusCls, newGlowCls);

        // Update aria-label
        g.setAttribute('aria-label', `${agent.name} — ${newLabel}`);

        // Update status text label
        const statusLabelEl = g.querySelector('.node-label-status');
        if (statusLabelEl) statusLabelEl.textContent = newLabel;
      });
    }

    return { build, update };
  })();


  /* ============================================================
     5. DETAIL PANEL
     ============================================================ */

  const DetailPanel = (() => {
    let _panel = null;
    let _backdrop = null;
    let _isOpen = false;
    let _currentAgentId = null;

    function init(panel, backdrop) {
      _panel = panel;
      _backdrop = backdrop;

      // Close on backdrop click
      _backdrop.addEventListener('click', close);

      // Close on Escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && _isOpen) close();
      });

      // Close button
      const closeBtn = _panel.querySelector('#panel-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', close);
    }

    function open(agentId, config, state) {
      _currentAgentId = agentId;
      _render(agentId, config, state);
      _panel.classList.add('orbit-panel--open');
      _backdrop.classList.add('orbit-backdrop--open');
      _backdrop.removeAttribute('aria-hidden'); // BUG FIX: let AT know backdrop exists
      _isOpen = true;

      // Focus management
      const closeBtn = _panel.querySelector('#panel-close-btn');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 50); // defer so CSS transition starts first
    }

    function close() {
      _panel.classList.remove('orbit-panel--open');
      _backdrop.classList.remove('orbit-backdrop--open');
      _backdrop.setAttribute('aria-hidden', 'true');
      _isOpen = false;

      // Return focus to the node that opened the panel
      if (_currentAgentId) {
        const node = document.querySelector(`[data-agent-id="${_currentAgentId}"]`);
        if (node) node.focus();
      }
    }

    function _statusLabel(agentState) {
      if (!agentState) return { text: 'Unknown', cls: 'badge--idle' };
      if (agentState.interaction_count < 20) return { text: 'Warming up', cls: 'badge--warming' };
      switch (agentState.status) {
        case 'awaiting_approval': return { text: 'Waiting on you', cls: 'badge--awaiting' };
        case 'active':            return { text: 'Operating autonomously', cls: 'badge--active' };
        case 'idle':              return { text: 'Idle', cls: 'badge--idle' };
        default:                  return { text: agentState.status, cls: 'badge--idle' };
      }
    }

    function _accuracyBlock(agentState) {
      if (!agentState) return '';

      const isWarming = agentState.interaction_count < 20;
      const acc = agentState.ledger_accuracy_pct;

      if (isWarming || acc === null) {
        return `
          <div class="panel-info-row">
            <div class="panel-info-label">Ledger Accuracy</div>
            <div class="panel-info-value panel-info-value--dim">
              Warming up — needs 20 logged interactions before accuracy is reported.
            </div>
          </div>`;
      }

      return `
        <div class="panel-info-row">
          <div class="panel-info-label">Ledger Accuracy</div>
          <div class="accuracy-bar-wrap">
            <div class="accuracy-bar-label">
              <span>Ledger score</span>
              <span class="accuracy-pct">${acc}%</span>
            </div>
            <div class="accuracy-bar-track">
              <div class="accuracy-bar-fill" style="width:${acc}%"></div>
            </div>
          </div>
        </div>`;
    }

    function _ctaBlock(agentConfig, agentState) {
      if (agentConfig.role === 'founder') {
        return `<button class="panel-cta panel-cta--founder" onclick="DetailPanelClose()">You set the vision ↗</button>`;
      }

      let html = '';

      if (agentState && agentState.status === 'awaiting_approval' && agentState.approval_link) {
        html += `<a href="${agentState.approval_link}" class="panel-cta panel-cta--approve" id="panel-approve-btn">Review &amp; Approve →</a>`;
      }

      html += `<a href="#ledger-${agentConfig.id}" class="panel-cta panel-cta--ledger">View Ledger detail →</a>`;

      return html;
    }

    function _tierLabel(tier) {
      if (!tier) return '—';
      const labels = {
        'L1': 'L1 — Fully autonomous',
        'L2': 'L2 — Autonomous with logging',
        'L3': 'L3 — Requires approval',
        'L4': 'L4 — Requires approval + review',
      };
      return labels[tier] || tier;
    }

    function _dotColor(agentConfig, agentState) {
      if (agentConfig.role === 'founder') return 'var(--accent)';
      if (agentConfig.role === 'atlas')   return '#6E6ECC';
      if (!agentState) return 'var(--dim)';
      if (agentState.interaction_count < 20) return 'var(--surface-3)';
      switch (agentState.status) {
        case 'awaiting_approval': return '#F5A623';
        case 'active': return '#3ECBAB';
        case 'idle':   return '#2A9E88';
        default:       return 'var(--dim)';
      }
    }

    function _render(agentId, config, state) {
      const agentConfig = config.find(a => a.id === agentId);
      if (!agentConfig) return;

      const agentState = state.agents[agentId];
      const badge = agentConfig.role === 'founder'
        ? { text: 'Founder', cls: 'badge--founder' }
        : agentConfig.role === 'atlas'
          ? { text: 'Orchestrator', cls: 'badge--active' }
          : _statusLabel(agentState);

      const dotColor = _dotColor(agentConfig, agentState);

      const body = _panel.querySelector('#panel-body');
      if (!body) return;

      let summaryRow = '';
      if (agentConfig.role !== 'founder' && agentState) {
        const isWarming = agentState.interaction_count < 20;
        summaryRow = `
          <div class="panel-info-row">
            <div class="panel-info-label">Latest activity</div>
            <div class="panel-info-value">${isWarming ? 'No activity yet' : agentState.last_action_summary}</div>
          </div>`;
      }

      let tierRow = '';
      if (agentConfig.role === 'functional' && agentState) {
        tierRow = `
          <div class="panel-info-row">
            <div class="panel-info-label">Decision authority</div>
            <div class="panel-info-value">${_tierLabel(agentState.decision_tier)}</div>
          </div>`;
      }

      body.innerHTML = `
        <div class="panel-status-badge ${badge.cls}">${badge.text}</div>

        <div class="panel-info-row">
          <div class="panel-info-label">Function</div>
          <div class="panel-info-value">${agentConfig.function}</div>
        </div>

        ${summaryRow}
        ${tierRow}
        ${_accuracyBlock(agentState)}

        <div class="panel-divider"></div>

        ${_ctaBlock(agentConfig, agentState)}
      `;

      // Update the panel header
      const nameEl = _panel.querySelector('#panel-agent-name');
      const dotEl  = _panel.querySelector('#panel-node-dot');
      if (nameEl) nameEl.textContent = agentConfig.name;
      if (dotEl)  dotEl.style.background = dotColor;
    }

    // Exposed for inline onclick in founder CTA
    window.DetailPanelClose = close;

    return { init, open, close };
  })();


  /* ============================================================
     6. STATE POLLER
     ============================================================ */

  const StatePoller = (() => {
    let _intervalId = null;
    let _onUpdate = null;

    function start(onUpdate) {
      _onUpdate = onUpdate;
      _intervalId = setInterval(_poll, POLL_INTERVAL);
    }

    function _poll() {
      // In production: fetch('/api/orbit/state?client_id=xxx').then(r=>r.json()).then(_onUpdate)
      const state = MockDataLayer.getState();
      _onUpdate(state);
    }

    return { start };
  })();


  /* ============================================================
     7. INIT — wire everything together
     ============================================================ */

  function init() {
    const svg      = document.getElementById('orbit-svg');
    const panel    = document.getElementById('orbit-panel');
    const backdrop = document.getElementById('orbit-backdrop');

    if (!svg || !panel || !backdrop) return;

    DetailPanel.init(panel, backdrop);

    // Compute positions once — stable for lifetime of the page
    const positions = OrbitLayout.compute(ORBIT_CONFIG);

    // Initial state
    MockDataLayer.start();
    let currentState = MockDataLayer.getState();

    // Build SVG
    OrbitRenderer.build(svg, ORBIT_CONFIG, positions, currentState, (agentId) => {
      // Re-fetch state at click time so panel shows freshest data
      const freshState = MockDataLayer.getState();
      DetailPanel.open(agentId, ORBIT_CONFIG, freshState);
    });

    // Poll for updates
    StatePoller.start((newState) => {
      currentState = newState;
      OrbitRenderer.update(newState);
    });
  }

  // Boot on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
