// app.js — sets up the visual/motion libraries loaded on the main page.
// Kept separate from script.js (which handles nav/data/form logic) to mirror the
// original template's split between "app config" and "site behavior".

(function () {
  "use strict";
  // Only the continuous particle background is throttled for prefers-reduced-motion.
  // Typed text, hover-tilt, and one-time scroll reveals are not the kind of motion
  // that preference is meant to suppress, and gating all of them on it made every
  // animation on the site disappear for anyone with that OS/browser setting on.
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Typed.js: rotating role text in the hero ----
  if (typeof Typed !== "undefined") {
    new Typed('.typing-text', {
      strings: [
        'Verification Case Management',
        'Workflow Automation',
        'Program &amp; NGO Operations',
        'AI-Powered Tooling'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      smartBackspace: true
    });
  } else {
    var tt = document.querySelector('.typing-text');
    if (tt) tt.textContent = 'Verification Case Management';
  }

  // ---- particles.js: subtle connected-dot network behind the hero ----
  if (typeof particlesJS !== "undefined" && !reduceMotion) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 46, density: { enable: true, value_area: 900 } },
        color: { value: '#2506ad' },
        shape: { type: 'circle' },
        opacity: { value: 0.25, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 140, color: '#2506ad', opacity: 0.18, width: 1 },
        move: { enable: true, speed: 1.2, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.35 } } }
      },
      retina_detect: true
    });
  }

  // ---- vanilla-tilt: applied to .tilt images present at load (hero, about).
  // Work-preview cards are added later by script.js and get their own VanillaTilt.init call there. ----
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 12, speed: 400, glare: false });
  }

  // ---- ScrollReveal: section entrance animation ----
  if (typeof ScrollReveal !== "undefined") {
    var sr = ScrollReveal({ origin: 'bottom', distance: '60px', duration: 800, easing: 'cubic-bezier(0.5,0,0,1)', reset: false });
    // Expose globally so script.js can reveal the skills/work cards once they're
    // actually injected into the DOM (they're loaded asynchronously from JSON,
    // so they don't exist yet at the moment this file runs).
    window.sr = sr;

    sr.reveal('.home .content', { origin: 'left' });
    sr.reveal('.home .image', { origin: 'right', delay: 150 });
    sr.reveal('.stat-card', { interval: 120 });
    sr.reveal('.about .row .image', { origin: 'left' });
    sr.reveal('.about .row .content', { origin: 'right' });
    sr.reveal('.education .box', { interval: 150 });
    sr.reveal('.experience .container', { interval: 150 });
    sr.reveal('.lang-card .lang', { interval: 100 });
    sr.reveal('.contact .container', {});
    sr.reveal('.recommendations .rec-card', { interval: 150 });
  }
})();

