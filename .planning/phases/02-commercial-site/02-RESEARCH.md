# Phase 2: Commercial Site - Research

**Researched:** 2026-02-13
**Domain:** Single-page commercial service website (static HTML/CSS/JS)
**Confidence:** HIGH

## Summary

Phase 2 builds a complete single-page commercial cleaning website using semantic HTML5, the established design system (Phase 1), and lightweight vanilla JavaScript for statistics counters. The research confirms that modern single-page sites benefit from semantic structure (`header`, `main`, `section`, `footer`), CSS-only sticky headers, and mobile-first responsive design patterns. Content extraction from the live WordPress site (angiescommercialcleaning.com) is straightforward—all necessary information is already visible on the current site. Trust badge display and tap-to-call implementation follow established patterns with broad browser support.

The standard approach for this phase is to write semantic HTML with proper heading hierarchy and ARIA labels, use CSS Grid for responsive service cards (3 columns on desktop, 2 on tablet, 1 on mobile), implement sticky header with `position: sticky`, add smooth scroll with `scroll-behavior: smooth`, and enhance statistics with CountUp.js or a similar lightweight vanilla JS counter library. Images should be optimized as WebP with PNG/JPG fallbacks.

**Primary recommendation:** Build mobile-first with semantic HTML5, use CSS Grid with `auto-fit`/`minmax()` for responsive layouts, avoid custom solutions for smooth scrolling and sticky headers (CSS handles both), and use a dependency-free JavaScript counter library (CountUp.js) for statistics animation.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Semantic HTML5 | Current | Document structure, accessibility, SEO | Native browser support, screen reader compatible, no dependencies |
| CSS Grid + Flexbox | Current | Responsive layouts | Native, performant, no framework needed—Grid for page structure, Flexbox for component internals |
| CSS Custom Properties | Current | Design tokens (already in Phase 1) | Native theming, runtime updates, inherited values |
| WebP images | Current | Image optimization | 30% smaller than JPEG, 95%+ browser support in 2026 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CountUp.js | 2.8+ | Animated statistics counter | ~2KB, dependency-free, viewport trigger support |
| Tabler Icons | 5900+ icons | Service card icons, trust signals | Free SVG icons, direct embed, no build required |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| WebP | AVIF | 20-25% smaller files but slower decode; overkill for demo |
| CountUp.js | Hand-rolled counter | Not worth it—edge cases (easing, scroll trigger) already solved |
| Tabler Icons | Font Awesome | Tabler is newer, larger library; either works for this project |

**Installation:**
```bash
# No build tools required — direct HTML embedding

# For icons: Download SVGs from https://tabler.io/icons
# For CountUp.js: Use CDN link in HTML
<script src="https://cdn.jsdelivr.net/npm/countup@2.8.0/dist/countUp.min.js"></script>
```

## Architecture Patterns

### Recommended Project Structure
```
commercial/
├── index.html           # Single-page site, semantic sections
├── css/
│   ├── reset.css        # Already copied from shared/
│   ├── variables.css    # Already copied from shared/
│   ├── base.css         # Already copied from shared/
│   ├── utilities.css    # Already copied from shared/
│   └── commercial.css   # Site-specific styles (header, sections, footer)
├── js/
│   └── main.js          # Statistics counter, mobile menu toggle (Phase 4)
└── images/
    ├── logo.webp        # Optimized brand logo
    ├── awards/          # Trust badges (Angie's List, Readers' Choice, etc.)
    └── services/        # Service section imagery (optional)
```

### Pattern 1: Semantic Single-Page Structure
**What:** Use HTML5 semantic elements with clear hierarchy and single `<main>` landmark
**When to use:** All single-page sites for accessibility, SEO, and screen reader navigation
**Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Commercial Cleaning - Angie's Custom Cleaning</title>

  <!-- Preconnect for Google Fonts (Phase 1 fonts) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

  <!-- CSS in order: reset → variables → base → utilities → site-specific -->
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/utilities.css">
  <link rel="stylesheet" href="css/commercial.css">
</head>
<body>

  <!-- Sticky header with navigation and tap-to-call -->
  <header id="header" class="site-header">
    <div class="container">
      <a href="#" class="logo">
        <img src="images/logo.webp" alt="Angie's Custom Cleaning">
      </a>
      <nav aria-label="Primary navigation">
        <ul>
          <li><a href="#services">Services</a></li>
          <li><a href="#why-us">Why Choose Us</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <a href="tel:7176150968" class="phone-link">717-615-0968</a>
    </div>
  </header>

  <!-- Main content landmark (only one per page) -->
  <main>

    <!-- Hero section -->
    <section id="hero" class="hero section">
      <div class="container">
        <h1>Lancaster's Favorite Commercial Cleaning Service</h1>
        <p class="hero__subtitle">Background-checked, insured professionals delivering superior office cleaning at ultra-competitive prices</p>
        <a href="#contact" class="btn btn--primary btn--large">Get a Free Estimate</a>

        <!-- Trust badge strip -->
        <div class="trust-badges">
          <img src="images/awards/angies-list.webp" alt="Angie's List Super Service Award">
          <img src="images/awards/readers-choice.webp" alt="Lancaster Newspaper Readers' Choice">
        </div>
      </div>
    </section>

    <!-- Services section -->
    <section id="services" class="services section section--alt">
      <div class="container">
        <h2 class="section__title">Our Services</h2>
        <div class="grid grid--3">
          <!-- Service cards with icons -->
          <article class="card service-card">
            <svg class="service-card__icon" aria-hidden="true"><!-- Icon SVG --></svg>
            <h3>Office Cleaning</h3>
            <p>Weekly or nightly commercial cleaning tailored to your schedule</p>
          </article>
          <!-- Repeat for carpet steam cleaning, floor services -->
        </div>
      </div>
    </section>

    <!-- Why Choose Us section -->
    <section id="why-us" class="why-us section">
      <div class="container">
        <h2 class="section__title">Why Choose Us</h2>
        <div class="grid grid--3">
          <!-- Icon grid: background-checked, insured, etc. -->
        </div>
      </div>
    </section>

    <!-- Statistics strip with animated counters -->
    <section id="stats" class="stats section section--dark">
      <div class="container">
        <div class="stats__grid">
          <div class="stat">
            <span class="stat__number" data-count="12">0</span>
            <span class="stat__label">Years in Business</span>
          </div>
          <!-- Repeat for other stats -->
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="testimonials section">
      <div class="container">
        <h2 class="section__title">What Our Clients Say</h2>
        <div class="grid grid--2">
          <blockquote class="testimonial">
            <p>"Quote text here"</p>
            <footer>— Client Name, Company Name</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- About Angie -->
    <section id="about" class="about section section--alt">
      <div class="container">
        <h2 class="section__title">About Angie's Custom Cleaning</h2>
        <p>Founded in 2012... [story content]</p>
      </div>
    </section>

    <!-- Contact section with form -->
    <section id="contact" class="contact section">
      <div class="container">
        <h2 class="section__title">Contact Us</h2>
        <div class="contact__content">
          <div class="contact__info">
            <p><strong>Phone:</strong> <a href="tel:7176150968">717-615-0968</a></p>
            <p><strong>Address:</strong> 340 Abbeyville Road, Lancaster PA 17603</p>
            <p><strong>Hours:</strong> Monday-Friday, 9am-4pm</p>
          </div>
          <form class="contact__form" aria-label="Contact form">
            <!-- Accessible form with labels, not just placeholders -->
          </form>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Angie's Custom Cleaning. Serving Lancaster County, PA.</p>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

### Pattern 2: Sticky Header (CSS-only)
**What:** Fixed navigation that stays visible on scroll using native CSS
**When to use:** All pages where navigation should remain accessible
**Example:**
```css
/* Source: https://www.w3schools.com/howto/howto_css_sticky_scroll.asp */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

/* Mobile-first: minimize header height to maximize content area */
@media (max-width: 768px) {
  .site-header {
    padding: var(--space-sm) 0;
  }

  /* Keep phone number visible, hide nav (hamburger menu in Phase 4) */
  .site-header nav {
    display: none;
  }
}
```

### Pattern 3: Smooth Scroll Anchor Links (CSS-only)
**What:** Smooth scrolling to page sections when clicking navigation links
**When to use:** All single-page sites with anchor navigation
**Example:**
```css
/* Source: https://gomakethings.com/smooth-scrolling-links-with-only-css/ */
html {
  scroll-behavior: smooth;
}

/* Account for sticky header height when scrolling to anchor */
section {
  scroll-margin-top: 80px; /* Height of sticky header */
}
```

### Pattern 4: Responsive Grid (CSS Grid with auto-fit)
**What:** Mobile-first responsive card layout without media queries
**When to use:** Service cards, trust signals, testimonials
**Example:**
```css
/* Source: https://yonedesign.medium.com/css-grid-responsive-cards-without-media-query-2206722e8936 */
.grid {
  display: grid;
  gap: var(--space-xl);
}

/* 3-column grid that auto-collapses */
.grid--3 {
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}

/* 2-column grid */
.grid--2 {
  grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr));
}
```

### Pattern 5: Tap-to-Call Phone Link
**What:** Clickable phone number that triggers mobile dialer
**When to use:** All phone numbers on mobile-friendly sites
**Example:**
```html
<!-- Source: https://www.nimbata.com/tips/how-to-add-a-click-to-call-button-with-html -->
<a href="tel:7176150968" class="phone-link">717-615-0968</a>

<!-- With international format (best practice) -->
<a href="tel:+17176150968" class="phone-link">717-615-0968</a>
```
```css
.phone-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.phone-link:hover {
  color: var(--color-primary-light);
}

/* Visual indicator for tap target on mobile */
@media (max-width: 768px) {
  .phone-link {
    min-height: 44px; /* iOS minimum tap target */
    padding: var(--space-sm) var(--space-md);
    background-color: var(--color-accent);
    color: var(--color-white);
    border-radius: var(--radius-md);
  }
}
```

### Pattern 6: Accessible Contact Form (Placeholder, No Backend)
**What:** HTML5 form with proper labels and validation, styled as placeholder for demo
**When to use:** Demo sites where form submission is not required
**Example:**
```html
<!-- Source: https://www.w3.org/WAI/tutorials/forms/instructions/ -->
<form class="contact__form" aria-label="Contact form" onsubmit="event.preventDefault(); alert('This is a demo form. In production, this would submit to a backend.');">

  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required aria-required="true">
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required aria-required="true">
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required aria-required="true"></textarea>
  </div>

  <button type="submit" class="btn btn--primary">Send Message</button>
</form>
```

### Anti-Patterns to Avoid
- **Placeholder-only form fields** — Screen readers don't announce placeholders as labels; always use `<label>` elements
- **Pure `<div>` structure** — Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) for accessibility and SEO
- **JavaScript-dependent sticky header** — CSS `position: sticky` is native, performant, and requires no scripting
- **Media query-heavy responsive grids** — CSS Grid's `auto-fit` and `minmax()` handle most responsive layouts without breakpoints
- **Custom smooth scroll JavaScript** — CSS `scroll-behavior: smooth` is native and widely supported (95.5%+)

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animated number counter | Custom setInterval loop | CountUp.js (~2KB) | Handles easing, viewport triggers, decimals, prefixes/suffixes, pause/resume—already solved |
| Icon library | Download/manage individual PNGs | Tabler Icons or Font Awesome SVGs | 5900+ icons, SVG format (scalable, CSS stylable), free, direct embed |
| Image optimization | Manual Photoshop export | WebP conversion tool or online service | WebP is 30% smaller than JPEG with similar quality; use `<picture>` for fallbacks |
| Smooth scrolling | Custom JavaScript scroll animation | CSS `scroll-behavior: smooth` | Native, performant, 95.5%+ browser support, no dependencies |
| Sticky header | JavaScript scroll listener | CSS `position: sticky` | Native, performant, no reflow/repaint on scroll |

**Key insight:** Modern CSS (Grid, sticky positioning, smooth scrolling) and native browser features eliminate most common JavaScript dependencies. For specialized needs (animated counters), use battle-tested micro-libraries (~2KB) rather than reinventing solved problems.

## Common Pitfalls

### Pitfall 1: Sticky Header Obscures Anchor Targets
**What goes wrong:** Clicking navigation link scrolls to section, but sticky header covers the top of the content
**Why it happens:** Anchor targets scroll to exact pixel position, not accounting for fixed/sticky header height
**How to avoid:** Use `scroll-margin-top` (or `scroll-padding-top` on container) set to sticky header height
**Warning signs:** Section headings are hidden behind header after clicking nav links

```css
/* Solution */
section {
  scroll-margin-top: 80px; /* Match sticky header height */
}
```

### Pitfall 2: Form Labels Missing (Accessibility Fail)
**What goes wrong:** Using placeholder text as the only label fails WCAG accessibility requirements—screen readers don't announce placeholders as labels, and placeholder text disappears when user starts typing
**Why it happens:** Placeholders look cleaner visually, so developers skip proper `<label>` elements
**How to avoid:** Always use `<label>` elements with `for` attribute matching input `id`; placeholders are supplementary hints only
**Warning signs:** Screen reader testing reveals unlabeled fields; WAVE or axe accessibility audits flag missing labels

```html
<!-- WRONG: Placeholder-only -->
<input type="text" placeholder="Your name">

<!-- CORRECT: Label + optional placeholder -->
<label for="name">Name</label>
<input type="text" id="name" name="name" placeholder="e.g., John Smith">
```

### Pitfall 3: Mobile Tap Targets Too Small
**What goes wrong:** Phone number links, buttons, and navigation items are too small to tap accurately on mobile—leads to user frustration and missed conversions
**Why it happens:** Designing for desktop first, or not testing on real devices
**How to avoid:** Ensure all interactive elements are minimum 44×44px (iOS guideline) or 48×48px (Android guideline); add padding, not just font-size
**Warning signs:** Difficulty tapping buttons on mobile device; users frequently tap wrong element

```css
/* Solution: Mobile tap targets */
@media (max-width: 768px) {
  .btn,
  .phone-link,
  nav a {
    min-height: 48px;
    min-width: 48px;
    padding: var(--space-md);
  }
}
```

### Pitfall 4: Non-Semantic Heading Hierarchy
**What goes wrong:** Using heading levels based on visual size (`<h3>` because it looks right) rather than document outline—breaks screen reader navigation and SEO
**Why it happens:** Confusing visual styling with semantic structure
**How to avoid:** Use one `<h1>` per page, then nest headings logically (`<h2>` for major sections, `<h3>` for subsections); style headings with CSS, not by choosing heading level for appearance
**Warning signs:** Accessibility audits flag "skipped heading level"; screen reader outline shows illogical structure

```html
<!-- WRONG: Choosing heading for visual size -->
<h1>Hero Title</h1>
<h3>Services</h3> <!-- Skipped h2 -->
<h2>About</h2>    <!-- Out of order -->

<!-- CORRECT: Logical nesting, style with CSS -->
<h1>Hero Title</h1>
<h2>Services</h2>
  <h3>Office Cleaning</h3>
  <h3>Carpet Cleaning</h3>
<h2>About</h2>
```

### Pitfall 5: Images Missing Alt Text
**What goes wrong:** Screen readers can't describe images; SEO suffers; fails WCAG compliance
**Why it happens:** Rushing to add images without considering accessibility
**How to avoid:** Every `<img>` must have `alt` attribute—descriptive for content images, empty (`alt=""`) for decorative images; be specific and concise (not "image of...")
**Warning signs:** Accessibility audits flag missing alt text; screen reader announces "image" with no description

```html
<!-- Content images need descriptive alt -->
<img src="logo.webp" alt="Angie's Custom Cleaning logo">

<!-- Decorative images need empty alt -->
<svg class="icon" aria-hidden="true">...</svg>
```

### Pitfall 6: WebP Without Fallback for Older Browsers
**What goes wrong:** Images fail to load on browsers without WebP support (though rare in 2026, still possible)
**Why it happens:** Assuming universal browser support without checking
**How to avoid:** Use `<picture>` element with fallback to JPEG/PNG for older browsers
**Warning signs:** Images broken on older browsers or devices

```html
<!-- WebP with fallback -->
<picture>
  <source srcset="logo.webp" type="image/webp">
  <img src="logo.png" alt="Angie's Custom Cleaning logo">
</picture>
```

### Pitfall 7: Horizontal Scroll on Mobile
**What goes wrong:** Content overflows viewport width on mobile devices—user must scroll horizontally to see full content
**Why it happens:** Fixed-width containers, oversized images, or forgetting `max-width: 100%` on images
**How to avoid:** Set `max-width: 100%` and `height: auto` on all images; use responsive units (`%`, `vw`, `rem`) instead of fixed pixels for widths
**Warning signs:** Horizontal scrollbar appears on mobile; content gets cut off

```css
/* Solution: Responsive images */
img {
  max-width: 100%;
  height: auto;
}

/* Responsive containers */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}
```

## Code Examples

Verified patterns from official sources:

### Statistics Counter with CountUp.js
```html
<!-- HTML structure -->
<div class="stats__grid">
  <div class="stat">
    <span class="stat__number" data-count="12">0</span>
    <span class="stat__label">Years in Business</span>
  </div>
  <div class="stat">
    <span class="stat__number" data-count="500" data-suffix="+">0</span>
    <span class="stat__label">Clients Served</span>
  </div>
</div>

<!-- Load CountUp.js -->
<script src="https://cdn.jsdelivr.net/npm/countup@2.8.0/dist/countUp.min.js"></script>

<script>
// Initialize counters when section scrolls into view
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.stat__number');
  const options = {
    duration: 2.5,
    useEasing: true,
  };

  // Intersection Observer for scroll trigger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const count = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';

        const countUp = new CountUp(el, count, {
          ...options,
          suffix: suffix
        });

        if (!countUp.error) {
          countUp.start();
        }

        observer.unobserve(el); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});
</script>
```

### Trust Badge Display
```html
<!-- HTML structure -->
<div class="trust-badges">
  <img src="images/awards/angies-list.webp"
       alt="Angie's List Super Service Award 2015-2017"
       width="120" height="120">
  <img src="images/awards/readers-choice.webp"
       alt="Lancaster Newspaper Readers' Choice 2017-2019"
       width="120" height="120">
</div>
```
```css
/* Responsive trust badge layout */
.trust-badges {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: wrap;
  margin-top: var(--space-xl);
}

.trust-badges img {
  max-width: 120px;
  height: auto;
  filter: grayscale(0.3); /* Subtle unified look */
  transition: filter var(--transition-base);
}

.trust-badges img:hover {
  filter: grayscale(0);
}

@media (max-width: 768px) {
  .trust-badges {
    gap: var(--space-md);
  }

  .trust-badges img {
    max-width: 80px;
  }
}
```

### Responsive Service Cards with Grid
```html
<!-- HTML structure -->
<div class="grid grid--3">
  <article class="card service-card">
    <svg class="service-card__icon" width="48" height="48" aria-hidden="true">
      <!-- Inline SVG icon -->
    </svg>
    <h3>Office Cleaning</h3>
    <p>Weekly or nightly commercial cleaning tailored to your schedule</p>
  </article>
  <!-- Repeat for other services -->
</div>
```
```css
/* Mobile-first responsive grid */
.grid {
  display: grid;
  gap: var(--space-xl);
}

.grid--3 {
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

@media (min-width: 768px) {
  .grid--3 {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .grid--3 {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}

/* Service card styling */
.service-card {
  text-align: center;
  padding: var(--space-xl);
}

.service-card__icon {
  margin: 0 auto var(--space-lg);
  color: var(--color-primary);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript smooth scroll libraries | CSS `scroll-behavior: smooth` | 2020+ (95.5% support) | Eliminates dependency, improves performance |
| Flexbox-only responsive layouts | CSS Grid + Flexbox hybrid | 2020+ (Grid support >96%) | Simpler responsive code, fewer media queries |
| JPEG/PNG images only | WebP primary, AVIF for critical images | 2024-2026 | 30-50% file size reduction, faster loading |
| jQuery for DOM manipulation | Vanilla JavaScript ES6+ | 2018+ | Eliminates 30KB+ dependency, modern syntax |
| JavaScript-based sticky headers | CSS `position: sticky` | 2019+ (>95% support) | Native, performant, no scroll listeners |

**Deprecated/outdated:**
- **jQuery**: Modern browsers support native DOM APIs (querySelector, fetch, classList)—jQuery is unnecessary overhead for new projects
- **Bootstrap**: Too heavy for custom design systems; CSS Grid/Flexbox handle responsive layouts natively
- **JavaScript polyfills for CSS features**: `position: sticky`, `scroll-behavior`, CSS Grid are now widely supported (95%+)
- **Icon fonts (Font Awesome v4)**: SVG icons are lighter, more accessible, and stylable with CSS—prefer inline SVG or SVG sprites

## Open Questions

Things that couldn't be fully resolved:

1. **Award badge image sourcing**
   - What we know: Current site displays Angie's List, Readers' Choice, Super Service Award badges
   - What's unclear: Whether high-resolution badge images are available from current site or need to be sourced from official award organizations
   - Recommendation: Extract badge images from current WordPress site; if low-resolution, check official sources (Angie's List, Lancaster Newspaper) for downloadable badge assets

2. **Testimonials source**
   - What we know: Current site likely has testimonials from business clients
   - What's unclear: Exact quotes and attributions need to be extracted from live site
   - Recommendation: WebFetch or manual extraction from angiescommercialcleaning.com testimonials page/section

3. **Founder bio/story content**
   - What we know: Site mentions "Founded in 2012 by Angie" and growth from 1 to 20 people
   - What's unclear: Full narrative for "About" section
   - Recommendation: Extract from current site's About page; if minimal, paraphrase existing content to create compelling founder story

4. **Service imagery**
   - What we know: Current site may have photos of cleaning work, team, or generic office/carpet imagery
   - What's unclear: Whether to use real photos from current site or source stock imagery
   - Recommendation: For demo quality, prefer real photos if available; if low-quality, use high-quality stock images (Unsplash, Pexels) for office cleaning, carpet cleaning, floor buffing

## Sources

### Primary (HIGH confidence)
- **Semantic HTML5 structure**: [Semrush Semantic HTML Guide](https://www.semrush.com/blog/semantic-html5-guide/), [MDN Structuring Documents](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents)
- **Sticky header CSS**: [W3Schools Sticky Header](https://www.w3schools.com/howto/howto_css_sticky_scroll.asp), [Niche Pursuits Sticky Header Tutorial](https://www.nichepursuits.com/sticky-header-css/)
- **Smooth scroll CSS**: [Go Make Things Smooth Scroll](https://gomakethings.com/smooth-scrolling-links-with-only-css/), [MDN scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-behavior)
- **CSS Grid responsive layouts**: [MDN Grid Layout Common Layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Common_grid_layouts), [Medium CSS Grid Responsive Cards](https://yonedesign.medium.com/css-grid-responsive-cards-without-media-query-2206722e8936)
- **Tap-to-call HTML**: [Nimbata Click-to-Call Guide](https://www.nimbata.com/tips/how-to-add-a-click-to-call-button-with-html), [HubSpot HTML Telephone Link](https://blog.hubspot.com/website/html-telephone-link)
- **Form accessibility**: [W3C WAI Form Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/), [Deque Accessible Forms Placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)
- **WebP vs AVIF performance**: [Elementor WebP vs AVIF](https://elementor.com/blog/webp-vs-avif/), [The CSS Agency Best Web Image Format 2026](https://www.thecssagency.com/blog/best-web-image-format)

### Secondary (MEDIUM confidence)
- **Icon libraries**: [Lineicons Best Open Source Icon Libraries](https://lineicons.com/blog/best-open-source-icon-libraries), [Tabler Icons](https://tabler.io/icons) (verified 5900+ icons)
- **CountUp.js**: [CountUp.js Official](https://inorganik.github.io/countUp.js/), [PortalZINE CountUp Solutions Guide](https://portalzine.de/10-popular-javascript-countup-solutions-a-comprehensive-guide/)
- **Trust badge display**: [WiserNotify Best Trust Badges](https://wisernotify.com/blog/best-trust-badges/), [Alliance Interactive Award Display Layouts](https://www.allianceinteractive.com/blog/15-best-websites-layouts-for-displaying-awards/)
- **Testimonial design patterns**: [Unsection Testimonial Section Design](https://www.unsection.com/category/testimonial-section-design), [Saaspo Testimonials Examples](https://saaspo.com/section-type/saas-testimonials-section-examples)
- **Commercial cleaning site design**: [Site Builder Report Cleaning Websites](https://www.sitebuilderreport.com/inspiration/cleaning-websites), [Gorilla Desk Best Cleaning Company Websites](https://gorilladesk.com/learn/top-cleaning-company-website-examples/)

### Tertiary (LOW confidence)
- **WordPress content extraction**: WebSearch results suggest WordPress REST API or HTML scraping—actual content extraction will be manual or via WebFetch for this project
- **Single-page SEO concerns**: [Content Whale SEO Mistakes 2026](https://content-whale.com/blog/seo-mistakes-and-common-errors-to-avoid-in-2026/) (general SEO, not single-page specific)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Native browser features (HTML5, CSS Grid, position:sticky, scroll-behavior) are authoritative and current; CountUp.js verified via official site and multiple sources
- Architecture: HIGH - Semantic HTML5, CSS Grid, and mobile-first patterns are established industry standards with official MDN documentation
- Pitfalls: HIGH - Accessibility issues (missing labels, alt text, heading hierarchy) are well-documented WCAG failures; mobile tap targets are official iOS/Android guidelines
- Content extraction: MEDIUM - Business info extracted from live site via WebFetch; testimonials/images require additional manual extraction
- Icon solution: MEDIUM - Tabler Icons verified as large, free library; alternative (Font Awesome) equally valid

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days—CSS features stable, browser support unlikely to change)
