# Phase 4: Polish & Interactivity - Research

**Researched:** 2026-02-13
**Domain:** Vanilla JavaScript scroll animations, mobile UX, CSS transitions
**Confidence:** HIGH

## Summary

Phase 4 adds scroll animations, hover effects, and mobile-specific interactivity to both sites using vanilla JavaScript and CSS. The established architecture already uses IntersectionObserver for statistics animations and defines comprehensive CSS variables for transitions, shadows, and spacing — this phase extends these patterns consistently.

The standard approach uses **AOS (Animate On Scroll)** library via CDN for scroll-triggered fade-up animations, **pure CSS** for hover transitions (leveraging GPU-accelerated transforms), **CSS scroll-behavior** for smooth anchor scrolling (with JavaScript fallback for anchor link handling), and **vanilla JavaScript with CSS classes** for the mobile hamburger menu.

**Primary recommendation:** Use AOS 2.3.4 via CDN for scroll animations (aligns with existing CountUp.js CDN pattern), leverage existing CSS custom properties for transitions, and build hamburger menu with vanilla JS toggle pattern matching the existing codebase style.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| AOS (Animate On Scroll) | 2.3.4 | Scroll-triggered animations | Industry standard, 30k+ GitHub stars, lightweight (5.7KB), zero dependencies, works via data attributes |
| Native IntersectionObserver | Browser API | Element visibility detection | Already in use for statistics, performant, native browser support since 2022 |
| CSS scroll-behavior | Browser API | Smooth anchor scrolling | Native support since March 2022, zero JavaScript needed for basic case |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CountUp.js | 2.8.0 | Number animations | Already loaded for statistics (Phase 3) |
| CSS Custom Properties | Native | Design tokens | Already established in variables.css (47 properties) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| AOS | Custom IntersectionObserver | More control but requires building animation library from scratch |
| CSS scroll-behavior | JavaScript scrollIntoView | More control over timing/easing but requires JS for simple case |
| Vanilla JS menu | None (no framework) | Project constraint: no build tools or npm packages |

**Installation:**
```html
<!-- AOS library via CDN (add to <head> and before </body>) -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
```

**CDN Options:**
- **cdnjs** (recommended): `https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/` - v2.3.4 stable, includes SRI hashes
- **unpkg**: `https://unpkg.com/aos@2.3.4/` - alternative CDN
- **jsdelivr**: `https://cdn.jsdelivr.net/npm/aos@2.3.4/` - alternative CDN

Note: Version 2.3.4 is latest stable. Avoid `@next` branch (beta versions) for production demos.

## Architecture Patterns

### Recommended Project Structure
```
residential/
├── js/
│   └── main.js          # All vanilla JS (stats, menu, AOS init)
├── css/
│   ├── variables.css    # Design tokens (already 47 properties)
│   ├── base.css         # Foundation styles
│   └── components.css   # Component-specific (buttons, cards, nav)
└── index.html           # Markup with data-aos attributes

commercial/              # Mirror structure
```

### Pattern 1: AOS Scroll Animations (Fade-Up)
**What:** Add data-aos attributes to HTML elements; AOS handles IntersectionObserver setup and CSS animations
**When to use:** Sections, cards, any element that should animate into view on scroll
**Example:**
```html
<!-- Simple fade-up animation -->
<section class="services section" data-aos="fade-up">
  <!-- content -->
</section>

<!-- Staggered animation with delay -->
<div class="service-card" data-aos="fade-up" data-aos-delay="100">
  <!-- card content -->
</div>
<div class="service-card" data-aos="fade-up" data-aos-delay="200">
  <!-- card content -->
</div>

<!-- Custom duration and easing -->
<div class="testimonial" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-out-cubic">
  <!-- content -->
</div>
```

**JavaScript initialization:**
```javascript
// Source: https://michalsnik.github.io/aos/
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 600,        // Animation duration (ms)
    easing: 'ease-out',   // Easing function
    once: true,           // Animate only once (not on scroll up)
    offset: 100,          // Offset from viewport (px)
    disable: false        // Disable on mobile: false (we want animations)
  });
});
```

**Available animations:**
- **Fade:** fade, fade-up, fade-down, fade-left, fade-right (and diagonal combinations)
- **Flip:** flip-up, flip-down, flip-left, flip-right
- **Zoom:** zoom-in, zoom-out (with directional variants)

**Recommendation:** Use `fade-up` exclusively for consistency. Avoid mixing animation types.

### Pattern 2: Sticky Mobile CTA Bar
**What:** Fixed-position button at bottom of viewport on mobile only
**When to use:** Mobile viewports (<= 768px) to keep primary CTA always accessible
**Example:**
```html
<!-- HTML -->
<a href="tel:+17176150968" class="mobile-cta" aria-label="Call Angie's Custom Cleaning">
  Call Now: 717-615-0968
</a>
```

```css
/* Source: https://www.rebelmouse.com/css-position-sticky */
.mobile-cta {
  /* Hidden by default */
  display: none;

  /* Mobile only */
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    /* Styling using existing CSS variables */
    background-color: var(--color-accent);
    color: var(--color-white);
    padding: var(--space-md);
    text-align: center;
    font-weight: 600;

    /* Shadow for elevation */
    box-shadow: var(--shadow-lg);

    /* Remove default link styling */
    text-decoration: none;

    /* Safe area for iOS notch */
    padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom));
  }
}
```

**Important:** Use `z-index: 1000` to ensure CTA appears above content but test stacking context. Fixed position elements create new stacking contexts.

### Pattern 3: Hover Transitions (Lift + Shadow)
**What:** GPU-accelerated transform with shadow transition for button/card hover
**When to use:** Buttons, service cards, interactive elements on desktop
**Example:**
```css
/* Source: https://tobiasahlin.com/blog/how-to-animate-box-shadow/ */
.button,
.service-card {
  position: relative;
  transition: transform var(--transition-base), box-shadow var(--transition-base);

  /* Initial shadow using existing variable */
  box-shadow: var(--shadow-sm);
}

/* Optimized approach: Pre-render shadow, animate opacity */
.button::after,
.service-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
  z-index: -1;
}

.button:hover,
.service-card:hover {
  transform: translateY(-4px); /* GPU-accelerated */
  box-shadow: var(--shadow-md);
}

.button:hover::after,
.service-card:hover::after {
  opacity: 1;
}

/* Mobile: Disable hover effects (prevent sticky hover on tap) */
@media (hover: none) and (pointer: coarse) {
  .button:hover,
  .service-card:hover {
    transform: none;
    box-shadow: var(--shadow-sm);
  }

  .button:hover::after,
  .service-card:hover::after {
    opacity: 0;
  }
}
```

**Performance note:** Using `::after` pseudo-element for hover shadow is more performant than directly animating box-shadow. Only `opacity` and `transform` are GPU-accelerated.

### Pattern 4: Smooth Scroll for Anchor Links
**What:** CSS scroll-behavior with JavaScript enhancement for anchor links
**When to use:** Navigation links that jump to sections on same page
**Example:**
```css
/* Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior */
html {
  scroll-behavior: smooth;
}

/* Accessibility: Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

```javascript
// JavaScript enhancement: prevent default jump, use scrollIntoView
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Ignore empty hash or hash-only
      if (targetId === '#' || targetId === '#!') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Update URL without jump
        history.pushState(null, '', targetId);
      }
    });
  });
});
```

**Browser support:** Widely available since March 2022. CSS-only approach works in all modern browsers.

### Pattern 5: Mobile Hamburger Menu
**What:** Vanilla JavaScript toggle with CSS slide-in animation
**When to use:** Mobile navigation (<= 768px viewport)
**Example:**
```html
<!-- HTML Structure -->
<header class="site-header">
  <div class="container">
    <a href="#hero" class="logo">
      <!-- logo image -->
    </a>

    <!-- Hamburger button with ARIA attributes -->
    <button
      class="hamburger"
      aria-label="Menu"
      aria-expanded="false"
      aria-controls="nav-menu"
    >
      <span class="hamburger__line"></span>
      <span class="hamburger__line"></span>
      <span class="hamburger__line"></span>
    </button>

    <!-- Navigation -->
    <nav id="nav-menu" aria-label="Primary navigation">
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#why-us">Why Choose Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

    <a href="tel:+17176150968" class="phone-link">717-615-0968</a>
  </div>
</header>
```

```css
/* Source: https://blog.bitsrc.io/animate-a-mobile-hamburger-bar-menu-using-css-and-just-a-hint-of-javascript-f31f928eb992 */

/* Hamburger button (mobile only) */
.hamburger {
  display: none; /* Hidden on desktop */

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-sm);
    z-index: 1001;
  }
}

.hamburger__line {
  width: 28px;
  height: 3px;
  background-color: var(--color-primary);
  transition: transform var(--transition-base), opacity var(--transition-fast);
}

/* Hamburger animation: X transform when open */
.hamburger[aria-expanded="true"] .hamburger__line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger[aria-expanded="true"] .hamburger__line:nth-child(2) {
  opacity: 0;
}

.hamburger[aria-expanded="true"] .hamburger__line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Navigation: slide-in from right */
nav {
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: -100%; /* Off-screen by default */
    width: 280px;
    max-width: 80vw;
    height: 100vh;
    background-color: var(--color-surface);
    box-shadow: var(--shadow-xl);
    z-index: 1000;

    /* Slide animation */
    transition: right var(--transition-slow);

    /* Overflow */
    overflow-y: auto;

    /* Padding */
    padding: var(--space-3xl) var(--space-xl);
  }
}

/* Show navigation when menu is open */
nav.is-open {
  right: 0; /* Slide in */
}

/* Overlay backdrop (optional but recommended) */
.nav-overlay {
  display: none;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    transition: opacity var(--transition-base);
    pointer-events: none;
  }

  &.is-visible {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }
}

/* Navigation list styling for mobile */
@media (max-width: 768px) {
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  nav ul li a {
    display: block;
    padding: var(--space-sm) 0;
    font-size: var(--fs-md);
    font-weight: 600;
    color: var(--color-text);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  nav ul li a:hover {
    color: var(--color-primary);
  }
}
```

```javascript
// Source: Vanilla JavaScript pattern from https://www.cssscript.com/basic-hamburger-toggle-menu-css-vanilla-javascript/
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  // Create overlay for backdrop
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  // Toggle menu function
  function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

    // Update ARIA state
    hamburger.setAttribute('aria-expanded', !isOpen);

    // Toggle classes
    nav.classList.toggle('is-open');
    overlay.classList.toggle('is-visible');

    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : '';

    // Focus management: focus first link when opening
    if (!isOpen) {
      const firstLink = nav.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 300); // After animation
      }
    }
  }

  // Hamburger button click
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Close menu when nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (nav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // Close menu when overlay is clicked
  overlay.addEventListener('click', toggleMenu);

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggleMenu();
      hamburger.focus(); // Return focus to hamburger button
    }
  });
});
```

**Accessibility requirements:**
- `aria-expanded` on toggle button (true/false via JavaScript)
- `aria-controls` referencing nav ID
- `aria-label="Menu"` on button (even with icon)
- Focus management: first link on open, button on close
- Escape key closes menu
- Body scroll prevention when open

### Anti-Patterns to Avoid

**1. Direct box-shadow animation:**
```css
/* BAD: Animates box-shadow directly (CPU-intensive) */
.card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s;
}

/* GOOD: Pre-render shadow on pseudo-element, animate opacity */
.card::after {
  box-shadow: var(--shadow-xl);
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover::after {
  opacity: 1;
}
```

**2. Layout properties in transitions:**
```css
/* BAD: width/height/top/left trigger layout recalc */
.button:hover {
  width: 250px;
  height: 60px;
  transition: width 0.3s, height 0.3s;
}

/* GOOD: Use transform (GPU-accelerated) */
.button:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}
```

**3. Overusing will-change:**
```css
/* BAD: will-change on everything */
.card, .button, .section {
  will-change: transform, opacity, box-shadow;
}

/* GOOD: Apply only to actively animating elements */
.card:hover {
  will-change: transform;
}
.card {
  will-change: auto; /* Reset after animation */
}
```

**4. Ignoring reduced motion preference:**
```css
/* BAD: Force animations for all users */
html {
  scroll-behavior: smooth;
}

/* GOOD: Respect accessibility preferences */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  [data-aos] {
    animation: none !important;
    transition: none !important;
  }
}
```

**5. Missing mobile hover protection:**
```css
/* BAD: Hover states apply on tap (mobile) */
.button:hover {
  transform: translateY(-4px);
}

/* GOOD: Disable hover on touch devices */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: translateY(-4px);
  }
}
```

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver + CSS animation library | AOS 2.3.4 | Handles edge cases (multiple triggers, offsets, easing functions, resize events). Building from scratch requires 300+ lines of code. |
| Smooth anchor scrolling | Custom scroll animation with requestAnimationFrame | CSS scroll-behavior + scrollIntoView | Native browser support, respects prefers-reduced-motion, handles edge cases (already scrolled, missing target). |
| Hamburger icon animation | SVG icon with complex transforms | Three span elements with CSS | Simpler, more accessible, easier to style and animate with existing CSS variables. |
| Focus trap for mobile menu | Custom keyboard event handling | Focus management pattern (focus first link on open, return to button on close, Escape listener) | Accessibility is complex. Use established pattern from MDN and a11y resources. |
| Stacking context issues | Manual z-index tuning | Systematic z-index scale (e.g., header: 100, overlay: 999, menu: 1000, mobile-cta: 1000) | Fixed elements create stacking contexts. Systematic scale prevents conflicts. |

**Key insight:** Scroll animations have many edge cases (resize, dynamic content, offset calculations, easing functions). AOS library solves these with 5.7KB. Hand-rolling requires building your own IntersectionObserver wrapper, CSS animation keyframes, data attribute parsing, initialization lifecycle, and resize handling — easily 300+ lines for less robust solution.

## Common Pitfalls

### Pitfall 1: AOS Animations Don't Trigger on Mobile
**What goes wrong:** Scroll animations work on desktop but fail on mobile devices
**Why it happens:** Default AOS settings include `disable: 'mobile'` or threshold too high for small viewports
**How to avoid:**
```javascript
AOS.init({
  disable: false, // NEVER set to 'mobile'
  offset: 50,     // Lower offset for mobile (default 120px may be too high)
  once: true      // Animate once (prevents re-trigger on scroll up)
});
```
**Warning signs:** Animations work in desktop browser but not on actual phone/tablet

### Pitfall 2: Sticky Hover States on Mobile Touch
**What goes wrong:** Hover effects remain "stuck" after tapping on mobile (button stays lifted)
**Why it happens:** Touch events trigger :hover pseudo-class but don't "unhover" until next tap
**How to avoid:** Use `@media (hover: hover)` query to apply hover effects only on devices with true hover capability
```css
/* Only apply hover on devices with hover capability */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: translateY(-4px);
  }
}
```
**Warning signs:** User taps button and it stays in hover state until tapping elsewhere

### Pitfall 3: Fixed Mobile CTA Covers Content
**What goes wrong:** Fixed CTA button at bottom overlaps footer content or form submit buttons
**Why it happens:** Fixed positioning removes element from flow, and footer content isn't aware of CTA height
**How to avoid:** Add bottom padding to body/main on mobile equal to CTA height
```css
@media (max-width: 768px) {
  body {
    padding-bottom: 80px; /* Height of mobile CTA + margin */
  }

  .mobile-cta {
    height: 60px;
  }
}
```
**Warning signs:** User scrolls to bottom and can't see/click footer links or form buttons

### Pitfall 4: Menu Doesn't Close After Navigation
**What goes wrong:** User taps hamburger, menu opens, taps a link, but menu stays open while page scrolls
**Why it happens:** JavaScript only toggles menu on hamburger click, not on nav link click
**How to avoid:** Add click listeners to all nav links to close menu
```javascript
// Close menu when any nav link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    if (nav.classList.contains('is-open')) {
      toggleMenu();
    }
  });
});
```
**Warning signs:** Menu remains open after selecting a nav item (poor UX)

### Pitfall 5: Body Scrolls Behind Open Menu
**What goes wrong:** Mobile menu is open, but user can still scroll the page content behind it
**Why it happens:** Menu overlay doesn't prevent body scroll
**How to avoid:** Toggle `overflow: hidden` on body when menu opens
```javascript
function toggleMenu() {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  // ... other toggle logic

  // Prevent/restore body scroll
  document.body.style.overflow = !isOpen ? 'hidden' : '';
}
```
**Warning signs:** Menu is open but page content scrolls underneath

### Pitfall 6: Scroll-Behavior Breaks Accessibility
**What goes wrong:** Smooth scrolling triggers motion sickness for users with vestibular disorders
**Why it happens:** CSS scroll-behavior: smooth applies to all users without checking preferences
**How to avoid:** Respect `prefers-reduced-motion` media query
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  /* Also disable AOS animations */
  [data-aos] {
    animation: none !important;
    transition: none !important;
  }
}
```
**Warning signs:** Accessibility audit fails, or user reports motion sickness

### Pitfall 7: Z-Index Wars with Fixed Elements
**What goes wrong:** Mobile CTA appears behind header, or menu slides under other elements
**Why it happens:** Fixed positioning creates new stacking context; z-index values conflict
**How to avoid:** Establish z-index scale at project level
```css
:root {
  --z-header: 100;
  --z-overlay: 999;
  --z-menu: 1000;
  --z-mobile-cta: 1000;
  --z-hamburger: 1001;
}

.site-header { z-index: var(--z-header); }
.nav-overlay { z-index: var(--z-overlay); }
nav { z-index: var(--z-menu); }
.mobile-cta { z-index: var(--z-mobile-cta); }
.hamburger { z-index: var(--z-hamburger); }
```
**Warning signs:** Elements disappear behind others, or stacking order is wrong on mobile

### Pitfall 8: Performance Degradation with Many Animated Elements
**What goes wrong:** Page stutters during scroll when many elements have AOS animations
**Why it happens:** Too many IntersectionObserver instances or animations triggering simultaneously
**How to avoid:**
- Use `once: true` in AOS config (animate once, then unobserve)
- Stagger animations with `data-aos-delay` (100ms, 200ms increments)
- Limit animations to key elements (sections, not every paragraph)
- Avoid mixing AOS with other scroll libraries
```javascript
AOS.init({
  once: true,      // Unobserve after first trigger
  duration: 600,   // Keep animations short (400-800ms)
});
```
```html
<!-- Stagger for better performance -->
<div data-aos="fade-up" data-aos-delay="0"></div>
<div data-aos="fade-up" data-aos-delay="100"></div>
<div data-aos="fade-up" data-aos-delay="200"></div>
```
**Warning signs:** Scroll feels janky, animations stutter, low FPS on DevTools Performance tab

## Code Examples

Verified patterns from official sources:

### Complete AOS Setup (Recommended Configuration)
```html
<!-- In <head> -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">

<!-- Before </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
<script>
  // Source: https://michalsnik.github.io/aos/
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      // Animation settings
      duration: 600,           // Duration (ms) - keep short for snappy feel
      easing: 'ease-out',      // Easing function
      once: true,              // Animate only once (performance)

      // Trigger settings
      offset: 50,              // Offset from viewport (px) - lower for mobile
      delay: 0,                // Global delay (use data-aos-delay for per-element)

      // Behavior
      disable: false,          // Never disable on mobile
      startEvent: 'DOMContentLoaded',

      // Advanced
      mirror: false,           // Don't animate out on scroll up
      anchorPlacement: 'top-bottom', // When top of element hits bottom of viewport
    });
  });
</script>
```

### GPU-Accelerated Button Hover (Existing CSS Variables)
```css
/* Source: https://tobiasahlin.com/blog/how-to-animate-box-shadow/ */
.button {
  /* Base state */
  position: relative;
  display: inline-block;
  padding: var(--space-md) var(--space-xl);
  background-color: var(--color-accent);
  color: var(--color-white);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;

  /* Initial shadow */
  box-shadow: var(--shadow-sm);

  /* Transition on base (applies to both hover and unhover) */
  transition: transform var(--transition-base), box-shadow var(--transition-base);

  /* Promote to GPU layer */
  will-change: transform;
}

/* Pre-render hover shadow on pseudo-element (performance optimization) */
.button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
  z-index: -1;
}

/* Hover effect (desktop only) */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  .button:hover::after {
    opacity: 1;
  }
}

/* Active state (click) */
.button:active {
  transform: translateY(-2px);
}

/* Focus state (keyboard navigation) */
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}
```

### Service Card Hover Effect
```css
/* Source: https://www.sitepoint.com/css-box-shadow-animation-performance/ */
.service-card {
  position: relative;
  padding: var(--space-xl);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);

  /* Initial shadow */
  box-shadow: var(--shadow-sm);

  /* Transition */
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

/* Desktop hover only */
@media (hover: hover) and (pointer: fine) {
  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-md);
  }
}
```

### Complete Mobile Menu Implementation
```javascript
// Source: Vanilla JS pattern matching existing main.js structure
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
```

### Smooth Scroll Setup (CSS + JS Enhancement)
```css
/* Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior */
html {
  scroll-behavior: smooth;
}

/* Accessibility: Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

```javascript
// JavaScript enhancement for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Ignore empty hash or hash-only
      if (targetId === '#' || targetId === '#!') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without jump
        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      }
    });
  });
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| jQuery .animate() | Native scrollIntoView + CSS scroll-behavior | 2016-2022 | 30KB jQuery no longer needed for scroll animations |
| Custom scroll listeners | IntersectionObserver API | 2019 | 43% less main thread blocking, better performance |
| JavaScript scroll libraries (ScrollMagic, WOW.js) | AOS + native APIs | 2020-present | Lighter weight (5.7KB vs 50KB+), better mobile performance |
| Animating left/top for positioning | CSS transform: translate() | 2015-present | GPU acceleration, 60fps animations on mobile |
| will-change on everything | Selective will-change usage | 2023 | Prevents memory issues from over-promotion to GPU layers |
| position: fixed (old behavior) | position: fixed (creates stacking context) | Chrome 145 (2026) | All fixed elements now create stacking contexts (z-index implications) |

**Deprecated/outdated:**
- **WOW.js**: Last updated 2016, superseded by AOS (more features, actively maintained)
- **ScrollMagic**: Heavy (50KB+), overkill for simple fade-up animations
- **jQuery .animate()**: Native scrollIntoView is now widely supported
- **Animating width/height/top/left**: Use transform instead (GPU-accelerated)
- **position: sticky for mobile CTA**: Use position: fixed (better browser support, clearer intent)

## Open Questions

Things that couldn't be fully resolved:

1. **How aggressive should scroll animations be on landing page?**
   - What we know: AOS supports 30+ animation types (fade, flip, zoom, slide)
   - What's unclear: Whether to use only fade-up (subtle) or mix animation types for variety
   - Recommendation: Start with fade-up only; client can request more dramatic animations if demos feel too subtle. Consistency > variety for professional feel.

2. **Should mobile CTA be present on all pages or only homepage?**
   - What we know: Fixed CTA is UX best practice for long-scroll landing pages
   - What's unclear: Whether single-page sites need it throughout or only above-fold
   - Recommendation: Add to all viewports on mobile since both sites are single-page with multiple sections. User should always have quick access to phone number.

3. **Performance threshold for number of animated elements?**
   - What we know: AOS with `once: true` unobserves after first trigger (good performance)
   - What's unclear: Exact limit before animations cause scroll jank on mid-range Android
   - Recommendation: Animate sections and major cards (10-15 elements max). Test on actual device. Use Chrome DevTools Performance tab to verify 60fps.

4. **Should hamburger menu slide from left or right?**
   - What we know: Both patterns are common; right is more common in Western UIs
   - What's unclear: User preference or brand expectation
   - Recommendation: Slide from right (follows established pattern from examples). Easily changed if client prefers left.

## Sources

### Primary (HIGH confidence)
- [AOS Official Documentation](https://michalsnik.github.io/aos/) - Library features, initialization, data attributes
- [AOS GitHub Repository](https://github.com/michalsnik/aos) - Version info, configuration options
- [AOS on cdnjs](https://cdnjs.com/libraries/aos) - v2.3.4 stable, CDN URLs with SRI hashes
- [MDN: scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior) - CSS property syntax, browser support, accessibility
- [MDN: IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Native browser API already in use

### Secondary (MEDIUM confidence)
- [Tobias Ahlin: How to Animate Box-Shadow](https://tobiasahlin.com/blog/how-to-animate-box-shadow/) - Performance optimization techniques
- [BrowserStack: Smooth Scrolling Guide](https://www.browserstack.com/guide/browser-compatible-smooth-scrolling-in-css-javascript) - CSS vs JS approaches
- [LandingPageFlow: CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages) - Mobile CTA best practices
- [Erwin Hofman: Accessible Hamburger Menus](https://www.erwinhofman.com/blog/build-web-accessible-hamburger-dropdown-menus/) - ARIA attributes, focus management
- [Chrome Developers: Scroll Animation Performance](https://developer.chrome.com/blog/scroll-animation-performance-case-study) - Performance insights
- [Chrome Developers: Stacking Context Changes](https://developer.chrome.com/blog/stacking-changes-coming-to-position-fixed-elements) - Fixed positioning behavior 2026

### Tertiary (LOW confidence - WebSearch only)
- [CSS-Tricks: Smooth Scrolling](https://css-tricks.com/snippets/jquery/smooth-scrolling/) - General patterns (jQuery-focused, older)
- [Medium: Intersection Observer vs AOS](https://medium.com/@nadiamariduena/animated-portfolio-with-intersection-observer) - Community comparison (single developer experience)
- [LogRocket: Motion Design Mistakes](https://blog.logrocket.com/ux-design/motion-design-mistakes-and-fixes/) - UX considerations (not specifically 2026)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - AOS is well-established (GitHub verification), CSS scroll-behavior is widely supported (MDN documentation), existing project already uses IntersectionObserver and CSS variables
- Architecture: HIGH - Patterns verified from official sources (MDN, AOS docs), align with existing project structure (vanilla JS, CSS variables, no build tools)
- Pitfalls: MEDIUM-HIGH - Performance issues verified from Chrome blog and Tobias Ahlin article, accessibility concerns from MDN and a11y resources, mobile issues from community reports (lower confidence but cross-verified)

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days - stable technologies)

**Note on project alignment:**
All recommendations align with established constraints:
- No build tools (CDN-based libraries only)
- CSS variables already established (47 properties in variables.css)
- IntersectionObserver pattern already in use (main.js statistics)
- Vanilla JavaScript structure (DOMContentLoaded, querySelector patterns)
- Mobile-first approach (existing @media queries in CSS)
- Performance-conscious (Lighthouse 90+ target for Phase 5)
