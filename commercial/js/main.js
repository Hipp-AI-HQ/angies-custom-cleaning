/**
 * Main JavaScript for Angie's Custom Cleaning Commercial Site
 * Features: CountUp.js statistics animation, demo form handling
 */

/**
 * Initialize statistics counters with CountUp.js
 * Animates numbers from 0 to target value when section scrolls into view
 */
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.stat__number');

  // Exit if no counters found
  if (!counters.length) {
    console.warn('No .stat__number elements found for animation');
    return;
  }

  // CountUp.js options
  const options = {
    duration: 2.5,
    useEasing: true,
    useGrouping: true,
    separator: ',',
  };

  // Intersection Observer for scroll-triggered animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const count = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';

        // Validate count value
        if (isNaN(count)) {
          console.error('Invalid data-count value:', el.dataset.count);
          return;
        }

        // Initialize CountUp
        const countUp = new CountUp(el, count, {
          ...options,
          suffix: suffix,
          prefix: prefix
        });

        if (!countUp.error) {
          countUp.start();
        } else {
          console.error('CountUp error:', countUp.error);
        }

        // Unobserve after animation (animate only once)
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% of stats section is visible

  // Observe all counter elements
  counters.forEach(counter => observer.observe(counter));
});

/**
 * Demo form submission handler
 * Prevents actual submission and shows alert to user
 */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact__form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert('This is a demo form. In production, this would submit your message via Formspree or a similar service. Thank you for your interest!');
    });
  }
});

/**
 * Mobile Hamburger Menu
 * Toggle slide-in navigation with full accessibility support
 */
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  // Exit if elements not found
  if (!hamburger || !nav) {
    console.warn('Hamburger menu elements not found');
    return;
  }

  // Create overlay backdrop
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  /**
   * Toggle mobile menu open/closed
   */
  function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

    // Update ARIA state
    hamburger.setAttribute('aria-expanded', !isOpen);

    // Toggle classes
    nav.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');

    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : '';

    // Focus management
    if (!isOpen) {
      // Opening menu: focus first link after animation
      const firstLink = nav.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 300);
      }
    } else {
      // Closing menu: return focus to hamburger
      hamburger.focus();
    }
  }

  // Event: Hamburger button click
  hamburger.addEventListener('click', toggleMenu);

  // Event: Nav link click (close menu after selecting)
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (nav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // Event: Overlay click (close menu)
  overlay.addEventListener('click', toggleMenu);

  // Event: Escape key (close menu)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggleMenu();
    }
  });
});
