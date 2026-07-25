/**
 * =============================================================================
 * ReWoo v2.0 — script.js
 * Production JavaScript — All site interactions
 * https://rewoo.tech
 *
 * Modules:
 *   1. Theme Toggle        — Dark/light with localStorage + prefers-color-scheme
 *   2. Mobile Menu          — Full-screen overlay, Escape close, body scroll lock
 *   3. Tab Switcher         — Section 6 product tabs
 *   4. Waitlist Form        — Email capture with success state
 *   5. Scroll Animations    — IntersectionObserver on [data-animate]
 *   6. Nav Scroll Shadow    — Box-shadow after 80px scroll
 *   7. Smooth Scroll        — Anchor links with nav offset
 *
 * Zero dependencies. Vanilla JS only.
 * =============================================================================
 */


/* =============================================================================
   1. THEME TOGGLE
   ============================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;

  var sunPath  = '<circle cx="12" cy="12" r="4"></circle>'
               + '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4'
               + 'M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';

  var moonPath = '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>';

  function toggleTheme() {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('rewoo-theme', next); } catch (e) {}
    syncTheme();
  }

  function syncTheme() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    
    // Header toggle
    var icon = document.getElementById('theme-icon');
    var btn = document.getElementById('theme-toggle');
    if (icon) icon.innerHTML = isDark ? sunPath : moonPath;
    if (btn) btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

    // Mobile drawer toggle
    var mIcon = document.getElementById('mobile-theme-icon');
    var mText = document.getElementById('mobile-theme-text');
    var mBtn  = document.getElementById('mobile-theme-toggle');
    if (mIcon) mIcon.innerHTML = isDark ? sunPath : moonPath;
    if (mText) mText.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    if (mBtn) mBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  syncTheme();

  var btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);

  var mBtn = document.getElementById('mobile-theme-toggle');
  if (mBtn) mBtn.addEventListener('click', toggleTheme);
})();


/* Dropdown Menu Toggle */
(function() {
  'use strict';
  var wrap = document.querySelector('.nav__dropdown-wrap');
  var btn = document.querySelector('.nav__dropdown-btn');
  if (!wrap || !btn) return;

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    wrap.classList.toggle('is-open');
  });

  document.addEventListener('click', function(e) {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('is-open');
    }
  });
})();

/* =============================================================================
   2. MOBILE MENU
   ============================================================================= */
(function () {
  'use strict';

  var hamburger  = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var overlay    = document.getElementById('nav-overlay');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    var firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on any link click inside the mobile menu
  var links = mobileMenu.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') &&
        hamburger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      hamburger.focus();
    }
  });
})();


/* =============================================================================
   3. TAB SWITCHER (Section 6 — Product In Action)
   ============================================================================= */
(function () {
  'use strict';

  var pills  = document.querySelectorAll('.tab-pill');
  var panels = document.querySelectorAll('.tab-panel');

  if (!pills.length || !panels.length) return;

  function activateTab(targetId) {
    // Update pills
    for (var i = 0; i < pills.length; i++) {
      var isActive = pills[i].getAttribute('id') === targetId ||
                     pills[i].getAttribute('aria-controls') === targetId.replace('tab-', 'panel-');
      pills[i].classList.toggle('is-active', isActive);
      pills[i].setAttribute('aria-selected', String(isActive));
    }
    // Update panels
    var panelId = targetId.replace('tab-', 'panel-');
    for (var j = 0; j < panels.length; j++) {
      panels[j].classList.toggle('is-active', panels[j].id === panelId);
    }
  }

  for (var i = 0; i < pills.length; i++) {
    pills[i].addEventListener('click', function () {
      activateTab(this.id);
    });
  }

  // Keyboard navigation for tabs (arrow keys)
  for (var k = 0; k < pills.length; k++) {
    pills[k].addEventListener('keydown', function (e) {
      var idx = Array.prototype.indexOf.call(pills, this);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        var next = (idx + 1) % pills.length;
        pills[next].focus();
        activateTab(pills[next].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = (idx - 1 + pills.length) % pills.length;
        pills[prev].focus();
        activateTab(pills[prev].id);
      }
    });
  }
})();


/* =============================================================================
   4. WAITLIST FORM
   ============================================================================= */
(function () {
  'use strict';

  var form    = document.getElementById('waitlist-form');
  var input   = document.getElementById('waitlist-email');
  var success = document.getElementById('waitlist-success');

  if (!form || !input || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = (input.value || '').trim();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = '#ef4444';
      input.focus();
      return;
    }

    input.style.borderColor = '';

    // Log the email (replace with Formspree / ConvertKit in production)
    console.log('ReWoo waitlist signup:', email);

    // Submit form to Formspree
    var data = new FormData(form);
    fetch(form.action || 'https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      if (response.ok) {
        // Hide form, show success
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        alert('Oops! There was a problem submitting your form');
      }
    }).catch(function(error) {
      alert('Oops! There was a problem submitting your form');
    });
  });

  // Reset border color on input
  if (input) {
    input.addEventListener('input', function () {
      input.style.borderColor = '';
    });
  }
})();


/* =============================================================================
   5. SCROLL ANIMATIONS — IntersectionObserver on [data-animate]
   ============================================================================= */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var elements = document.querySelectorAll('[data-animate]');

  // Fallback: show all immediately
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('is-visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -5% 0px'
  });

  for (var i = 0; i < elements.length; i++) {
    observer.observe(elements[i]);
  }
})();


/* =============================================================================
   6. NAV SCROLL SHADOW
   ============================================================================= */
(function () {
  'use strict';

  var nav = document.getElementById('site-nav');
  if (!nav) return;

  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (window.scrollY > 80) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* =============================================================================
   7. SMOOTH SCROLL — Anchor links with nav height offset
   ============================================================================= */
(function () {
  'use strict';

  var nav = document.getElementById('site-nav');

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var href   = link.getAttribute('href');
    var target = href && href !== '#' ? document.querySelector(href) : null;
    if (!target) return;

    e.preventDefault();

    var navHeight = nav ? nav.offsetHeight : 0;
    var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });

    if (history.pushState) {
      history.pushState(null, null, href);
    }
  });
})();
