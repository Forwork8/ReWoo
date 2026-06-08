/**
 * =============================================================================
 * ReWoo v1.0 — script.js
 * Production JavaScript — All site interactions
 * https://rewoo.tech
 *
 * Modules (all wrapped in IIFEs to avoid global scope pollution):
 *   1. Theme Toggle        — Dark/light mode with localStorage persistence
 *   2. Mobile Menu          — Hamburger drawer with overlay and keyboard support
 *   3. Orbit Constellation  — Dynamic role chip placement and SVG connections
 *   4. Scroll Reveals       — IntersectionObserver-based staggered reveal
 *   5. Smooth Scroll        — Anchor link scrolling with sticky nav offset
 *   6. Active Nav Tracking  — Highlights current section in nav
 *   7. Footer Year          — Dynamic copyright year
 *
 * Browser Support: All modern browsers (ES5 compatible, no transpile needed)
 * Dependencies: None (zero external libraries)
 * =============================================================================
 */


/* =============================================================================
   1. THEME TOGGLE
   Switches between dark and light mode. Persists choice in localStorage.
   SVG icons swap between sun (dark mode active) and moon (light mode active).
   ============================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var btn  = document.getElementById('themeToggle');
  var icon = document.getElementById('icon');

  // Exit gracefully if elements aren't found (defensive coding)
  if (!btn || !icon) return;

  // SVG icon markup (inline to avoid extra network requests)
  var sunIcon  = '<circle cx="12" cy="12" r="4"></circle>'
               + '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4'
               + 'M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>';

  var moonIcon = '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"></path>';

  /**
   * Sync the toggle button's icon and ARIA attributes
   * to match the current theme state.
   */
  function sync() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    icon.innerHTML = isDark ? sunIcon : moonIcon;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(!isDark));
  }

  // Initialize on load
  sync();

  // Toggle theme on click
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);

    // Persist to localStorage (wrapped in try/catch for private browsing)
    try {
      localStorage.setItem('rewoo-theme', next);
    } catch (e) {
      // Silently fail — localStorage may be unavailable in private mode
    }

    sync();
  });
})();


/* =============================================================================
   2. MOBILE MENU
   Creates a slide-in nav drawer with:
   - Semi-transparent overlay backdrop
   - Body scroll lock when open
   - Escape key to close
   - Auto-close when a nav link is clicked
   ============================================================================= */
(function () {
  'use strict';

  var menuBtn  = document.getElementById('menuToggle');
  var navlinks = document.getElementById('navlinks');

  // Exit if elements aren't on the page
  if (!menuBtn || !navlinks) return;

  // Create overlay element dynamically (not in HTML to keep markup clean)
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  /** Open the mobile menu drawer */
  function openMenu() {
    navlinks.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  /** Close the mobile menu drawer */
  function closeMenu() {
    navlinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Toggle on hamburger click
  menuBtn.addEventListener('click', function () {
    var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking the overlay
  overlay.addEventListener('click', closeMenu);

  // Close when a nav link is clicked (user navigated)
  var links = navlinks.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }

  // Close on Escape key press (accessibility)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuBtn.focus(); // Return focus to the toggle button
    }
  });
})();


/* =============================================================================
   3. ORBIT CONSTELLATION
   Dynamically positions executive role "chips" in a circle around the
   central "You" core. Also draws SVG connection lines from center to each chip.
   ============================================================================= */
(function () {
  'use strict';

  var roles = [
    'CEO', 'CFO', 'COO', 'Product', 'Marketing',
    'Sales', 'Success', 'Ops', 'Analytics', 'Strategy'
  ];

  var orbit = document.getElementById('orbit');
  if (!orbit) return;

  var svg   = document.getElementById('links');
  var lines = '';
  var total = roles.length;

  for (var i = 0; i < total; i++) {
    // Calculate position on the circle
    var angle  = (i / total) * Math.PI * 2 - Math.PI / 2; // Start from top
    var radius = [34, 44, 39][i % 3]; // Alternating radii for organic feel
    var x      = 50 + Math.cos(angle) * radius;
    var y      = 50 + Math.sin(angle) * radius;

    // Create chip element
    var chip = document.createElement('div');
    chip.className   = 'chip';
    chip.style.left  = x + '%';
    chip.style.top   = y + '%';
    chip.textContent = roles[i];
    orbit.appendChild(chip);

    // Build SVG line from center (50,50) to chip position
    lines += '<line x1="50" y1="50" x2="' + x + '" y2="' + y
           + '" stroke="var(--hairline)" stroke-width="0.3"/>';
  }

  // Inject all connection lines at once (single DOM write)
  if (svg) {
    svg.innerHTML = lines;
  }
})();


/* =============================================================================
   4. SCROLL REVEALS WITH STAGGER
   Uses IntersectionObserver to detect when .reveal elements enter the viewport.
   Sibling reveals within the same parent get staggered delays for a cascade effect.
   Falls back to instant visibility if:
   - User prefers reduced motion
   - Browser doesn't support IntersectionObserver
   ============================================================================= */
(function () {
  'use strict';

  // Respect reduced motion preference
  var prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var elements = document.querySelectorAll('.reveal');

  // Fallback: show everything immediately
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('in');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];

      if (entry.isIntersecting) {
        // Calculate stagger delay based on sibling position
        var parent   = entry.target.parentElement;
        var siblings = parent.querySelectorAll(':scope > .reveal');
        var index    = Array.prototype.indexOf.call(siblings, entry.target);

        if (index > 0) {
          entry.target.style.transitionDelay = (index * 60) + 'ms';
        }

        // Trigger the reveal
        entry.target.classList.add('in');

        // Stop observing this element (reveal is one-shot)
        observer.unobserve(entry.target);
      }
    }
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -8% 0px' // Trigger slightly before element is fully in view
  });

  // Start observing all reveal elements
  for (var i = 0; i < elements.length; i++) {
    observer.observe(elements[i]);
  }
})();


/* =============================================================================
   5. SMOOTH SCROLL FOR ANCHOR LINKS
   Intercepts clicks on anchor links (#section) and scrolls smoothly,
   accounting for the sticky navigation bar height.
   Updates the URL hash without triggering a jump.
   ============================================================================= */
(function () {
  'use strict';

  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  var nav         = document.querySelector('nav');

  for (var i = 0; i < anchorLinks.length; i++) {
    anchorLinks[i].addEventListener('click', function (e) {
      var href   = this.getAttribute('href');
      var target = href && href !== '#' ? document.querySelector(href) : null;

      if (target) {
        e.preventDefault();

        // Calculate scroll position minus sticky nav height
        var navHeight = nav ? nav.offsetHeight : 0;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  }
})();


/* =============================================================================
   6. ACTIVE NAV LINK HIGHLIGHTING
   Uses IntersectionObserver to track which content section is currently
   in view and highlights the corresponding nav link.
   ============================================================================= */
(function () {
  'use strict';

  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.navlinks .lk');

  // Only run if we have both sections and nav links
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        var activeId = entries[i].target.getAttribute('id');

        // Update nav link styles
        for (var j = 0; j < navLinks.length; j++) {
          var href = navLinks[j].getAttribute('href');
          navLinks[j].style.color = (href === '#' + activeId) ? 'var(--text)' : '';
        }
      }
    }
  }, {
    threshold: 0,
    rootMargin: '-40% 0px -55% 0px' // Centered detection zone
  });

  for (var i = 0; i < sections.length; i++) {
    observer.observe(sections[i]);
  }
})();


/* =============================================================================
   7. FOOTER YEAR
   Dynamically inserts the current year into the copyright notice.
   ============================================================================= */
(function () {
  'use strict';

  var yearEl = document.getElementById('yr');
  if (yearEl) {
    yearEl.textContent = '\u00A9 ' + new Date().getFullYear() + ' ReWoo. All rights reserved.';
  }
})();
