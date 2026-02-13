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
