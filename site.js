/**
 * =============================================================================
 * ReWoo — site.js
 * Interaction layer for the expanded site (loads on new pages only).
 * Legacy pages keep using script.js. Shared conventions with the legacy
 * system: theme via <html data-theme> + localStorage key "rewoo-theme".
 *
 * Modules:
 *   1. Theme toggle (dark/light, persisted)
 *   2. Nav scroll shadow
 *   3. Mega dropdowns (click/keyboard, Escape, outside-click)
 *   4. Mobile menu (overlay, scroll lock, focus trap, Escape)
 *   5. Scroll reveals ([data-animate], reduced-motion aware)
 *   6. Smooth anchor scroll with nav offset
 *   7. Project brief (localStorage, nav pill, add/remove buttons, contact list)
 *   8. Capabilities filter + search
 *   9. Contact inquiry form (validation → composed email draft; never auto-sends)
 *
 * Zero dependencies. Vanilla JS only.
 * =============================================================================
 */

(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ==========================================================================
     1. THEME TOGGLE — identical mechanism to legacy script.js
     ====================================================================== */

  (function () {
    var sunPath = '<circle cx="12" cy="12" r="4"></circle>'
      + '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4'
      + 'M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';
    var moonPath = '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>';

    function syncTheme() {
      var isDark = root.getAttribute('data-theme') === 'dark';
      var icon = $('#theme-icon');
      var btn = $('#theme-toggle');
      if (icon) icon.innerHTML = isDark ? sunPath : moonPath;
      if (btn) btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      var mIcon = $('#mobile-theme-icon');
      var mText = $('#mobile-theme-text');
      var mBtn = $('#mobile-theme-toggle');
      if (mIcon) mIcon.innerHTML = isDark ? sunPath : moonPath;
      if (mText) mText.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      if (mBtn) mBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    function toggleTheme() {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('rewoo-theme', next); } catch (e) { /* storage unavailable */ }
      syncTheme();
    }

    syncTheme();

    [$('#theme-toggle'), $('#mobile-theme-toggle')].forEach(function (btn) {
      if (btn) btn.addEventListener('click', toggleTheme);
    });
  })();

  /* ==========================================================================
     2. NAV SCROLL SHADOW
     ====================================================================== */

  (function () {
    var nav = $('#site-nav');
    if (!nav) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          nav.classList.toggle('nav--scrolled', window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ==========================================================================
     3. MEGA DROPDOWNS
     ====================================================================== */

  (function () {
    var items = $$('.has-mega');
    if (!items.length) return;

    function closeAll(except) {
      items.forEach(function (li) {
        if (li === except) return;
        li.classList.remove('is-open');
        var btn = $('.nav__link--btn', li);
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    items.forEach(function (li) {
      var btn = $('.nav__link--btn', li);
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = li.classList.contains('is-open');
        closeAll(li);
        li.classList.toggle('is-open', !open);
        btn.setAttribute('aria-expanded', String(!open));
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.has-mega')) closeAll(null);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        var openBtn = $('.has-mega.is-open .nav__link--btn');
        if (openBtn) {
          closeAll(null);
          openBtn.focus();
        }
      }
    });
  })();

  /* ==========================================================================
     4. MOBILE MENU — overlay, scroll lock, focus trap
     ====================================================================== */

  (function () {
    var hamburger = $('#menu-toggle');
    var mobileMenu = $('#mobile-menu');
    var overlay = $('#nav-overlay');
    if (!hamburger || !mobileMenu) return;

    var lastFocus = null;

    function focusables() {
      return $$('a[href], button:not([disabled]), summary, input, select, textarea', mobileMenu)
        .filter(function (el) { return el.offsetParent !== null; });
    }

    function openMenu() {
      lastFocus = document.activeElement;
      mobileMenu.classList.add('is-open');
      if (overlay) overlay.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
      var f = focusables();
      if (f.length) f[0].focus();
    }

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (hamburger.getAttribute('aria-expanded') === 'true') closeMenu();
      else openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    $$('a[href]', mobileMenu).forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      var open = hamburger.getAttribute('aria-expanded') === 'true';
      if (!open) return;
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeMenu();
        hamburger.focus();
      } else if (e.key === 'Tab') {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  })();

  /* ==========================================================================
     5. SCROLL REVEALS
     ====================================================================== */

  (function () {
    var elements = $$('[data-animate]');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    elements.forEach(function (el) { observer.observe(el); });
  })();

  /* ==========================================================================
     6. SMOOTH ANCHOR SCROLL
     ====================================================================== */

  (function () {
    var nav = $('#site-nav');
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var href = link.getAttribute('href');
      var target = href && href !== '#' ? $(href) : null;
      if (!target) return;
      e.preventDefault();
      var navHeight = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
      if (history.pushState) history.pushState(null, null, href);
    });
  })();

  /* ==========================================================================
     7. PROJECT BRIEF — localStorage store
     ====================================================================== */

  var Brief = (function () {
    var KEY = 'rewoo-brief-v1';
    var KINDS = { system: 'System', capability: 'Capability', package: 'Engagement' };

    function read() {
      try {
        var raw = localStorage.getItem(KEY);
        var v = raw ? JSON.parse(raw) : [];
        return Array.isArray(v) ? v : [];
      } catch (e) { return []; }
    }

    function write(items) {
      try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* ignore */ }
      render();
      try {
        window.dispatchEvent(new Event('rewoo-brief-change'));
      } catch (e) { /* older browsers */ }
    }

    function add(kind, id, label) {
      var items = read();
      if (!items.some(function (i) { return i.kind === kind && i.id === id; })) {
        items.push({ kind: kind, id: id, label: label });
        write(items);
      } else { render(); }
    }

    function remove(kind, id) {
      write(read().filter(function (i) { return !(i.kind === kind && i.id === id); }));
    }

    function toggle(kind, id, label) {
      var items = read();
      var exists = items.some(function (i) { return i.kind === kind && i.id === id; });
      if (exists) remove(kind, id);
      else add(kind, id, label);
      return !exists;
    }

    function clear() { write([]); }

    function kindLabel(kind) { return KINDS[kind] || 'Item'; }

    /* Rendering ---------------------------------------------------------- */

    function renderButtons() {
      $$('[data-brief-add]').forEach(function (btn) {
        var kind = btn.getAttribute('data-brief-kind');
        var id = btn.getAttribute('data-brief-id');
        var label = btn.getAttribute('data-brief-label') || id;
        var added = read().some(function (i) { return i.kind === kind && i.id === id; });
        btn.classList.toggle('is-added', added);
        btn.textContent = added ? 'Added to brief ✓' : 'Add to brief';
        btn.setAttribute('aria-pressed', String(added));
        btn.setAttribute('data-brief-label', label);
      });
    }

    function renderPill() {
      var pill = $('[data-brief-pill]');
      if (!pill) return;
      var count = read().length;
      pill.hidden = count === 0;
      var c = $('[data-brief-count]', pill);
      if (c) c.textContent = String(count);
    }

    function renderContact() {
      var list = $('#brief-items');
      if (!list) return;
      var items = read();
      list.innerHTML = '';
      items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'brief-item';

        var kind = document.createElement('span');
        kind.className = 'brief-item__kind';
        kind.textContent = kindLabel(item.kind);

        var label = document.createElement('span');
        label.textContent = item.label;

        var x = document.createElement('button');
        x.type = 'button';
        x.className = 'brief-item__x';
        x.setAttribute('aria-label', 'Remove ' + item.label + ' from brief');
        x.innerHTML = '&times;';
        x.addEventListener('click', function () {
          remove(item.kind, item.id);
        });

        li.appendChild(kind);
        li.appendChild(label);
        li.appendChild(x);
        list.appendChild(li);
      });

      var empty = $('#brief-empty');
      var actions = $('#brief-actions');
      if (empty) empty.hidden = items.length > 0;
      if (actions) actions.hidden = items.length === 0;
    }

    function render() {
      renderPill();
      renderButtons();
      renderContact();
    }

    /* Wire-up ------------------------------------------------------------- */

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-brief-add]');
      if (!btn) return;
      e.preventDefault();
      toggle(btn.getAttribute('data-brief-kind'),
              btn.getAttribute('data-brief-id'),
              btn.getAttribute('data-brief-label'));
    });

    var clearBtn = $('#brief-clear');
    if (clearBtn) clearBtn.addEventListener('click', clear);

    window.addEventListener('storage', function (e) {
      if (e.key === KEY) render();
    });
    window.addEventListener('rewoo-brief-change', render);

    render();
    return { read: read, add: add, remove: remove, clear: clear, kindLabel: kindLabel };
  })();

  /* ==========================================================================
     8. CAPABILITIES FILTER + SEARCH
     ====================================================================== */

  (function () {
    var grid = $('#cap-grid');
    if (!grid) return;
    var cards = $$('.cap-card', grid);
    var search = $('#cap-search');
    var pills = $$('.filter-pill');
    var status = $('[data-filter-status]');
    var empty = $('[data-filter-empty]');
    var activeGroup = 'all';
    var query = '';

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var group = card.getAttribute('data-group');
        var haystack = card.getAttribute('data-search') || '';
        var okGroup = activeGroup === 'all' || group === activeGroup;
        var okQuery = !query || haystack.indexOf(query) !== -1;
        var visible = okGroup && okQuery;
        card.hidden = !visible;
        if (visible) shown++;
      });
      if (status) {
        status.textContent = shown === cards.length
          ? 'All 12 capabilities'
          : ('Showing ' + shown + ' of ' + cards.length + ' capabilities');
      }
      if (empty) empty.hidden = shown > 0;
    }

    if (search) {
      search.addEventListener('input', function () {
        query = search.value.trim().toLowerCase();
        apply();
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) {
          p.classList.toggle('is-active', p === pill);
          p.setAttribute('aria-pressed', String(p === pill));
        });
        activeGroup = pill.getAttribute('data-filter') || 'all';
        apply();
      });
    });

    var reset = $('[data-filter-reset]');
    if (reset) reset.addEventListener('click', function () {
      activeGroup = 'all';
      query = '';
      if (search) search.value = '';
      pills.forEach(function (p, i) {
        p.classList.toggle('is-active', i === 0);
        p.setAttribute('aria-pressed', String(i === 0));
      });
      apply();
      if (search) search.focus();
    });

    apply();
  })();

  /* ==========================================================================
     9. CONTACT INQUIRY FORM — validate, compose, review (never auto-send)
     ====================================================================== */

  (function () {
    var form = $('#inquiry-form');
    if (!form) return;

    var EMAIL_TO = 'adilshamim696@gmail.com';
    var review = $('#review');
    var reviewPre = $('#review-pre');
    var reviewMailto = $('#review-mailto');
    var reviewCopy = $('#review-copy');
    var reviewStatus = $('#review-status');

    function fieldEl(name) { return $('#inq-' + name); }
    function errEl(name) { return $('#inq-' + name + '-err'); }

    function setError(name, on) {
      var input = fieldEl(name);
      var err = errEl(name);
      if (input) input.classList.toggle('is-invalid', on);
      if (err) err.hidden = !on;
    }

    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    function validate() {
      var ok = true;
      var name = fieldEl('name');
      var email = fieldEl('email');
      var interest = fieldEl('interest');

      var nameOk = !!(name && name.value.trim());
      setError('name', !nameOk);
      if (!nameOk) ok = false;

      var emailOk = !!(email && validEmail(email.value.trim()));
      setError('email', !emailOk);
      if (!emailOk) ok = false;

      var interestOk = !!(interest && interest.value.trim().length >= 10);
      setError('interest', !interestOk);
      if (!interestOk) ok = false;

      return ok;
    }

    function composeDraft() {
      var name = fieldEl('name').value.trim();
      var email = fieldEl('email').value.trim();
      var company = fieldEl('company') ? fieldEl('company').value.trim() : '';
      var interest = fieldEl('interest').value.trim();
      var budget = fieldEl('budget') ? fieldEl('budget').value : '';

      var lines = [
        'Hi Adil,',
        '',
        "I'd like to explore working with ReWoo on an AI system.",
        '',
        'Name: ' + name,
        'Email: ' + email
      ];
      if (company) lines.push('Company / project: ' + company);
      lines.push('');
      lines.push("What we're working on:");
      lines.push(interest);
      if (budget) {
        lines.push('');
        lines.push('Budget basis: ' + budget);
      }
      var brief = Brief.read();
      if (brief.length) {
        lines.push('');
        lines.push('Selected from the site:');
        brief.forEach(function (item) {
          lines.push('- [' + Brief.kindLabel(item.kind) + '] ' + item.label);
        });
      }
      lines.push('');
      lines.push('—');
      lines.push('Sent from rewoo.tech');
      return lines.join('\n');
    }

    function showReview() {
      var draft = composeDraft();
      if (reviewPre) reviewPre.textContent = draft;
      if (reviewMailto) {
        reviewMailto.href = 'mailto:' + EMAIL_TO +
          '?subject=' + encodeURIComponent('Project inquiry — ReWoo') +
          '&body=' + encodeURIComponent(draft);
      }
      if (reviewStatus) reviewStatus.textContent = '';
      if (review) {
        review.hidden = false;
        review.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start'
        });
        var focusTarget = reviewMailto || review;
        window.setTimeout(function () { focusTarget.focus(); }, prefersReduced ? 0 : 350);
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstInvalid = $('.field__input.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      showReview();
    });

    ['name', 'email', 'interest'].forEach(function (n) {
      var el = fieldEl(n);
      if (el) el.addEventListener('input', function () { setError(n, false); });
    });

    if (reviewCopy) {
      reviewCopy.addEventListener('click', function () {
        var draft = reviewPre ? reviewPre.textContent : '';
        function done() {
          if (reviewStatus) reviewStatus.textContent = 'Draft copied to your clipboard.';
        }
        function fail() {
          if (reviewStatus) reviewStatus.textContent =
            'Copy failed — select the text above and copy it manually.';
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(draft).then(done, fail);
        } else {
          try {
            var ta = document.createElement('textarea');
            ta.value = draft;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            done();
          } catch (err) { fail(); }
        }
      });
    }
  })();

})();
