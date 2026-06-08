/* ==========================================================================
   NexOS main.js â€” Minimal, purposeful interactions
   IntersectionObserver scroll reveals + nav + mobile menu
   ========================================================================== */

(function () {
  'use strict';

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     Theme â€” run immediately (before paint) to avoid flash of wrong theme
  -------------------------------------------------------------------------- */
  (function initThemeEarly() {
    const stored = localStorage.getItem('rewoo-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  })();

  /* --------------------------------------------------------------------------
     Scroll-reveal via IntersectionObserver
  -------------------------------------------------------------------------- */
  function initReveal() {
    if (REDUCED_MOTION) {
      // Immediately show all reveal elements
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     Nav â€” scroll state + active link highlighting
  -------------------------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          nav.classList.toggle('is-scrolled', lastScrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial state

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    if (sections.length && navLinks.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              navLinks.forEach(link => {
                link.removeAttribute('aria-current');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                  link.setAttribute('aria-current', 'page');
                }
              });
            }
          });
        },
        { threshold: 0.4 }
      );
      sections.forEach(s => sectionObserver.observe(s));
    }
  }

  /* --------------------------------------------------------------------------
     Mobile navigation toggle
  -------------------------------------------------------------------------- */
  function initMobileNav() {
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileNav = document.querySelector('.nav__mobile');
    if (!hamburger || !mobileNav) return;

    const mobileLinks = mobileNav.querySelectorAll('.nav__mobile-link');
    let isOpen = false;

    function openMenu() {
      isOpen = true;
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Focus first link
      if (mobileLinks.length) mobileLinks[0].focus();
    }

    function closeMenu() {
      isOpen = false;
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', () => {
      isOpen ? closeMenu() : openMenu();
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    // Focus trap inside mobile nav
    mobileNav.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(mobileNav.querySelectorAll('a, button'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     Smooth scroll for anchor links
  -------------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
          10
        ) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        if (REDUCED_MOTION) {
          window.scrollTo({ top });
        } else {
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     Animate chart bars on load (hero)
  -------------------------------------------------------------------------- */
  function initChartAnimation() {
    if (REDUCED_MOTION) return;
    const bars = document.querySelectorAll('.chart-bar');
    if (!bars.length) return;
    bars.forEach((bar, i) => {
      setTimeout(() => {
        bar.style.opacity = bar.classList.contains('is-active') ? '0.9'
          : bar.classList.contains('is-peak') ? '0.6' : '0.3';
      }, 800 + i * 80);
    });
  }

  /* --------------------------------------------------------------------------
     Count-up animation for proof metrics
  -------------------------------------------------------------------------- */
  function initCountUp() {
    if (REDUCED_MOTION) return;
    const metrics = document.querySelectorAll('[data-countup]');
    if (!metrics.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const el = entry.target;
          const target = parseFloat(el.dataset.countup);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
          const duration = 1600;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = prefix + value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
        });
      },
      { threshold: 0.6 }
    );

    metrics.forEach(m => observer.observe(m));
  }

  /* --------------------------------------------------------------------------
     Theme toggle â€” dark / light mode manual switch
  -------------------------------------------------------------------------- */
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function applyTheme(isDark) {
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.classList.toggle('light', !isDark);
      localStorage.setItem('rewoo-theme', isDark ? 'dark' : 'light');
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Set initial aria-label from current state
    const isDarkNow = document.documentElement.classList.contains('dark');
    btn.setAttribute('aria-label', isDarkNow ? 'Switch to light mode' : 'Switch to dark mode');

    btn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      applyTheme(!isCurrentlyDark);
    });

    // Sync if system preference changes and user hasn't manually chosen
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('rewoo-theme')) {
        applyTheme(e.matches);
      }
    });
  }

  /* --------------------------------------------------------------------------
     Init all
  -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initNav();
    initMobileNav();
    initSmoothScroll();
    initChartAnimation();
    initCountUp();
    initThemeToggle();
  });

})();


