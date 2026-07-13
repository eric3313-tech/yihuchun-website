/**
 * Yihuchun Tea - International Website
 * Scroll animations, navigation, and form handling
 */

(function () {
  'use strict';

  // ===== Auto-update copyright year =====
  var yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== DOM Elements =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  const contactForm = document.getElementById('contactForm');

  // ===== Scroll: Navigation Background =====
  function handleScroll() {
    if (!nav) return;
    const scrolled = window.scrollY > 50;
    nav.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== Mobile Menu Toggle =====
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Scroll Reveal Animation =====
  function handleReveal() {
    var elements = document.querySelectorAll('.fade-in');
    var windowHeight = window.innerHeight;
    var revealPoint = 120;

    elements.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  // Add fade-in classes to sections
  function initReveal() {
    var targets = document.querySelectorAll(
      '.story-grid, .product-grid, .origin-grid, .cert-grid, .advantages-grid, .contact-grid, .story-metrics, .cert-item'
    );

    targets.forEach(function (el, i) {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 0.1) + 's';
    });

    handleReveal();
  }

  window.addEventListener('scroll', handleReveal, { passive: true });
  window.addEventListener('resize', handleReveal, { passive: true });
  initReveal();

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = nav ? nav.offsetHeight : 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== Contact Form Handler =====
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;

      // Show loading state
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with actual endpoint)
      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#6b7d52';

        // Reset after 2 seconds
        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 2000);
      }, 1000);
    });
  }

  // ===== Parallax effect on hero image (subtle) =====
  var heroImg = document.querySelector('.hero-img');
  var ticking = false;

  function updateParallax() {
    if (!heroImg) return;
    var scrollY = window.scrollY;
    var heroHeight = document.querySelector('.hero').offsetHeight;
    if (scrollY <= heroHeight) {
      var offset = scrollY * 0.3;
      heroImg.style.transform = 'translateY(' + offset + 'px) scale(1.05)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ===== Respect reduced motion =====
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable parallax
    if (heroImg) heroImg.style.transform = 'none';
  }

  prefersReducedMotion.addEventListener('change', function (e) {
    if (e.matches && heroImg) {
      heroImg.style.transform = 'none';
      heroImg.style.transition = 'none';
    }
  });

})();
