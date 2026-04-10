/* ============================================================
   Boardwalk Capital — script.js
   Vanilla JS: navigation, smooth scroll, form handling
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility: query selectors ── */
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  /* ── Footer year ── */
  const yearEl = $('#footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Sticky header: add 'scrolled' class after scrolling ── */
  const header = $('#site-header');

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run on load

  /* ── Mobile nav toggle ── */
  const navToggle = $('#nav-toggle');
  const navLinks = $('#nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active nav link highlighting on scroll ── */
  const sections = $$('section[id]');
  const navItems = $$('.nav-link[href^="#"]');

  function setActiveNav() {
    let currentId = '';
    const scrollY = window.scrollY + 120; // offset for fixed header

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navItems.forEach((link) => {
      link.classList.remove('nav-link--active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('nav-link--active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ── Contact form: basic client-side handling ── */
  const contactForm = $('#contact-form');
  const formConfirmation = $('#form-confirmation');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();

      // Simple validation
      if (!name || !email || !message) {
        if (formConfirmation) {
          formConfirmation.style.color = '#e05252';
          formConfirmation.textContent = 'Please complete all required fields.';
        }
        return;
      }

      if (!isValidEmail(email)) {
        if (formConfirmation) {
          formConfirmation.style.color = '#e05252';
          formConfirmation.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      // Simulate submission (replace with real form handler or API call)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
        if (formConfirmation) {
          formConfirmation.style.color = '#C9A96E';
          formConfirmation.textContent = 'Thank you. We will be in touch shortly.';
        }
      }, 900);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Subtle fade-in on scroll for section elements ── */
  const fadeTargets = $$('.strategy-card, .pillar, .about-body p');

  if ('IntersectionObserver' in window && fadeTargets.length) {
    // Set initial state
    fadeTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeTargets.forEach((el) => observer.observe(el));
  }

})();
