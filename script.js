/* ═══════════════════════════════════════════════════════════
   Mother's Day Page — script.js

   Responsibilities:
     1. Fade-in on scroll  (IntersectionObserver)
     2. Smooth scroll polyfill for anchor links (Safari < 15.4)

   No dependencies. No frameworks.
════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── 1. Fade-in on scroll ──────────────────────────────────

     All elements with class .fade-in are invisible by default
     (see style.css section 11). This observer watches for them
     entering the viewport and adds .is-visible, which triggers
     the CSS transition.

     Falls back gracefully to showing all elements immediately
     if IntersectionObserver is unavailable.
  ─────────────────────────────────────────────────────────── */

  function initFadeIn() {
    var elements = document.querySelectorAll('.fade-in');

    if (!elements.length) return;

    // Immediate fallback for very old browsers
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Once visible, no need to keep observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold:   0.1,              // trigger when 10% of the element is in view
        rootMargin: '0px 0px -40px 0px' // slight bottom offset — feels more deliberate
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }


  /* ─── 2. Smooth scroll polyfill ─────────────────────────────

     CSS scroll-behavior: smooth handles most browsers, but
     older Safari (pre-15.4) needs a JS nudge for anchor links.
     This only activates if native smooth scroll is unsupported.
  ─────────────────────────────────────────────────────────── */

  function initSmoothScroll() {
    // Native CSS smooth scroll is supported — nothing to do
    if ('scrollBehavior' in document.documentElement.style) return;

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }


  /* ─── Init ──────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initFadeIn();
    initSmoothScroll();
  });

}());
