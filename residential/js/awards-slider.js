// ===========================================================================
// Infinite Awards Slider
// Clones award items for seamless infinite scrolling with pause on hover
// ===========================================================================

(function() {
  'use strict';

  const slider = document.querySelector('.awards-slider__track');
  if (!slider) return;

  // Clone items for seamless loop
  const items = Array.from(slider.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    slider.appendChild(clone);
  });

  // Pause on visibility change using Intersection Observer
  let observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          slider.style.animationPlayState = 'running';
        } else {
          slider.style.animationPlayState = 'paused';
        }
      });
    }, { threshold: 0.1 });

    observer.observe(slider);
  }

  // Calculate animation duration based on number of items
  const itemCount = items.length;
  const baseSpeed = 30; // seconds for 7 items
  const duration = baseSpeed * (itemCount / 7);
  slider.style.animationDuration = `${duration}s`;
})();
