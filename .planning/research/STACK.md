# Technology Stack

**Project:** Angie's Custom Cleaning Demo Sites
**Researched:** 2026-02-13
**Constraint:** Static HTML/CSS/JS only. No frameworks. No build tools. Deploy via GitHub to Vercel.

> **Note on sources:** WebSearch and WebFetch were unavailable during this research session. All recommendations are based on training knowledge (cutoff: May 2025). The static web development tooling ecosystem is mature and stable -- these recommendations are HIGH confidence unless otherwise noted. Verify CDN URLs and version numbers before use.

---

## Recommended Stack

### Core: Vanilla HTML/CSS/JS

No framework. No build step. This is the right call for these demos.

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| HTML5 | Current | Page structure | Semantic HTML for accessibility and SEO; `<section>`, `<nav>`, `<main>`, `<article>` |
| CSS3 (Custom Properties) | Current | Styling | CSS custom properties (variables) for brand theming; no preprocessor needed |
| Vanilla JS (ES6+) | Current | Interactivity | Mobile menu toggle, scroll effects, form validation — nothing heavier needed |

**Why no framework:** These are two 1-page (or few-page) marketing sites. React/Vue/Svelte add build complexity, bundle size, and development time for zero benefit. A cleaning service demo does not need client-side routing, state management, or component reactivity. The constraint in PROJECT.md is correct.

**Why no build tools:** No Sass, no PostCSS, no Webpack, no Vite. Modern CSS (custom properties, nesting, `:has()`, container queries) eliminates 90% of Sass use cases. The sites are small enough that a single CSS file per site is manageable. Build tools add friction to the "edit, push, deploy" loop that matters here.

**Confidence: HIGH** — This is an extremely well-understood pattern.

---

### CSS Approach

#### CSS Custom Properties for Brand Theming

Use CSS custom properties (variables) to create a shared brand system across both sites. This is the single most important technical decision for visual consistency.

```css
:root {
  /* Brand palette — blue family */
  --color-primary: #1a5276;       /* Deep blue — headers, CTAs */
  --color-primary-light: #2980b9; /* Lighter blue — hovers, accents */
  --color-primary-dark: #0e2f44;  /* Dark blue — footer, nav */

  /* Warm neutrals — trustworthy, clean */
  --color-warm-white: #fdfaf6;    /* Background — NOT pure white */
  --color-warm-gray: #f5f0eb;     /* Section alternating background */
  --color-text: #2c3e50;          /* Body text — dark but not black */
  --color-text-light: #7f8c8d;    /* Secondary text */

  /* Accent — for CTAs and highlights */
  --color-accent: #e67e22;        /* Warm orange — trustworthy, action-oriented */

  /* Spacing scale */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;

  /* Typography */
  --font-heading: 'Nunito', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --font-size-base: 1rem;
  --line-height-body: 1.6;
  --line-height-heading: 1.2;
}
```

**Confidence: HIGH** — CSS custom properties have full browser support (98%+ globally).

#### Modern CSS Features to Use

| Feature | Use Case | Browser Support | Confidence |
|---------|----------|----------------|------------|
| CSS Custom Properties | Brand theming, spacing scale | 98%+ | HIGH |
| Flexbox | Navigation, card layouts, footer | 99%+ | HIGH |
| CSS Grid | Service cards, feature grids, page layout | 98%+ | HIGH |
| `clamp()` for fluid typography | Responsive font sizing without media queries | 96%+ | HIGH |
| `scroll-behavior: smooth` | Smooth anchor scrolling | 96%+ | HIGH |
| `aspect-ratio` | Image containers, hero sections | 95%+ | HIGH |
| `backdrop-filter: blur()` | Sticky nav transparency effect | 95%+ | HIGH |
| CSS Nesting | Cleaner stylesheet organization | 90%+ | MEDIUM |
| `:has()` selector | Parent selection for interactive states | 90%+ | MEDIUM |

#### CSS Features to Avoid

| Feature | Why Avoid |
|---------|-----------|
| CSS Container Queries | Still lower adoption (~87%) and overkill for these pages — media queries are sufficient |
| `@layer` | Adds complexity for no benefit on small stylesheets |
| Subgrid | Browser support still uneven |
| CSS Houdini | Experimental, not production-ready |

#### Fluid Typography with `clamp()`

Use `clamp()` instead of media query breakpoints for typography. This creates smooth scaling and eliminates jump points.

```css
h1 { font-size: clamp(2rem, 5vw + 1rem, 3.5rem); }
h2 { font-size: clamp(1.5rem, 3vw + 0.75rem, 2.5rem); }
h3 { font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem); }
body { font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem); }
```

**Confidence: HIGH** — `clamp()` has 96%+ support and is the standard approach.

#### CSS File Organization

Each site gets a single CSS file. No partials, no imports (avoids extra HTTP requests). Structure with comment sections:

```
/* ==========================================================
   1. RESET & BASE
   2. CUSTOM PROPERTIES (THEME)
   3. TYPOGRAPHY
   4. LAYOUT (UTILITIES)
   5. COMPONENTS: NAVIGATION
   6. COMPONENTS: HERO
   7. COMPONENTS: SERVICES
   8. COMPONENTS: TRUST SIGNALS
   9. COMPONENTS: ABOUT
   10. COMPONENTS: CONTACT
   11. COMPONENTS: FOOTER
   12. ANIMATIONS
   13. MEDIA QUERIES
   ========================================================== */
```

**Why one file:** Two reasons. First, it avoids waterfall loading from `@import` statements. Second, the total CSS for a site like this is 15-25KB unminified — small enough for a single file.

**Confidence: HIGH**

---

### Typography (Google Fonts)

#### Recommended Pairing: Nunito + Open Sans

| Role | Font | Weight(s) | Why |
|------|------|-----------|-----|
| Headings | **Nunito** | 700, 800 | Rounded terminals feel warm and friendly. Professional but approachable — perfect for a family-run cleaning business. Not corporate-cold like Montserrat. |
| Body | **Open Sans** | 400, 600 | Excellent readability at all sizes. Neutral enough to not compete with headings. Ubiquitous — users' eyes are trained on it. |

**Load via Google Fonts CDN:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

**Why `display=swap`:** Prevents invisible text during font load. Users see fallback font immediately, then swap when web font loads. Better UX than a flash of invisible text.

**Why `preconnect`:** Establishes early connection to Google Fonts servers. Shaves 100-200ms off font load time.

#### Alternative Pairing: Raleway + Lato

If Nunito feels too casual:

| Role | Font | Weights | Character |
|------|------|---------|-----------|
| Headings | Raleway | 600, 700 | More geometric, slightly more corporate |
| Body | Lato | 400, 700 | Warm humanist sans-serif, very readable |

#### Fonts to Avoid

| Font | Why Not |
|------|---------|
| Roboto | Too associated with Material Design / Google products. Generic. |
| Poppins | Overused in 2023-2024. Starting to feel dated. |
| Playfair Display | Serif — wrong vibe for a cleaning business. Too editorial. |
| Any script/handwriting font | Looks cheap on service business sites. Hard to read. |

**Confidence: HIGH** — Font pairing is a stable domain. These fonts are well-established.

---

### Icons

#### Recommended: Lucide Icons (CDN)

| Library | CDN Size | Style | Why |
|---------|----------|-------|-----|
| **Lucide** | ~8KB for what you use (tree-shakeable via individual SVGs) | Clean line icons | Modern successor to Feather Icons. Clean, consistent 24x24 grid. Perfect weight for service business sites. |

**How to use without npm:** Copy individual SVG icons directly into HTML as inline SVGs. This is the best approach for static sites because:
1. Zero external requests (icons are in the HTML)
2. Fully styleable with CSS (color, size, stroke-width)
3. No JavaScript required
4. Only ship icons you actually use

```html
<!-- Example: Phone icon inline -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
</svg>
```

**Icons you will need for these sites (~15-20 total):**
- `phone`, `mail`, `map-pin`, `clock` (contact info)
- `check-circle`, `shield-check`, `award`, `star` (trust signals)
- `sparkles`, `home`, `building-2` (services)
- `menu`, `x` (mobile nav)
- `chevron-down`, `arrow-right` (UI)
- `facebook`, `instagram` (social — if applicable)

**Where to get SVGs:** Browse https://lucide.dev and copy SVG markup for each icon you need.

#### Alternatives Considered

| Library | Verdict | Why Not |
|---------|---------|---------|
| Font Awesome (CDN) | Avoid | Enormous CSS payload (~60KB+ for full set). Loads hundreds of icons you won't use. Icon font approach is outdated vs inline SVG. Free tier icons look dated. |
| Heroicons | Good alternative | Same approach (inline SVG), but slightly less icon variety. Good if you prefer it. |
| Phosphor Icons | Good alternative | Wider variety, multiple weights. Slightly heavier if using CDN. |
| Bootstrap Icons | Avoid | Tied to Bootstrap aesthetic. Inconsistent feel if not using Bootstrap. |
| Custom SVG sprites | Overkill | Only worth it for 50+ icons. We need ~15-20. |

**Confidence: HIGH** — Inline SVG is the established best practice for small static sites.

---

### Animation / Scroll Effects

#### Recommended: AOS (Animate on Scroll) via CDN

| Library | CDN Size | Purpose | Why |
|---------|----------|---------|-----|
| **AOS** | ~14KB JS + ~10KB CSS | Scroll-triggered fade/slide animations | Dead simple. Add `data-aos="fade-up"` to any element. No configuration. Huge visual impact for zero complexity. |

**CDN inclusion:**

```html
<!-- In <head> -->
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">

<!-- Before </body> -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 800,
    once: true,        /* Animate only once — not on scroll back up */
    offset: 100,       /* Trigger 100px before element enters viewport */
    easing: 'ease-out'
  });
</script>
```

**Usage pattern for these sites:**

```html
<section class="services">
  <h2 data-aos="fade-up">Our Services</h2>
  <div class="service-card" data-aos="fade-up" data-aos-delay="100">...</div>
  <div class="service-card" data-aos="fade-up" data-aos-delay="200">...</div>
  <div class="service-card" data-aos="fade-up" data-aos-delay="300">...</div>
</section>
```

**Why `once: true`:** Animations replay on scroll-back feels gimmicky on a business site. Trigger once, then stay visible.

**Why AOS over alternatives:**
- GSAP is 10x more powerful but 10x more complex. Overkill for "fade in on scroll."
- CSS-only `@scroll-timeline` / `animation-timeline: scroll()` still has incomplete browser support (~75%) and is harder to implement for simple cases.
- Intersection Observer API (vanilla JS) requires writing your own animation classes and observer logic. AOS wraps this in a clean API.

#### CSS Transitions for Hover/Interactive States

No library needed. Use CSS transitions for all interactive feedback:

```css
.btn {
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.service-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
```

#### What NOT to Use

| Library | Why Not |
|---------|---------|
| GSAP | Overkill. Powerful timeline animation engine for complex motion design. A cleaning service site needs fade-ups, not cinematic sequences. Also, GSAP's license is commercial for some use cases. |
| Framer Motion | React-only. Does not apply. |
| anime.js | More capability than needed. JS-driven animation is unnecessary when AOS + CSS transitions cover all use cases. |
| Lottie | Great for custom illustrations, but we don't have Lottie-format animations and creating them is out of scope. |
| Three.js / WebGL | Absolutely not. |
| Scroll-driven CSS animations (`animation-timeline`) | Browser support still insufficient (~75%). Not ready for production where you need IE-gone-but-Safari-still-matters reliability. |

**Confidence: HIGH** for AOS, **MEDIUM** for scroll-driven CSS animations browser support (this is evolving rapidly; verify before ruling out entirely).

---

### Image Optimization

Since there is no build step, image optimization must happen before files are committed.

#### Strategy: Optimize Before Commit

| Format | Use For | Tool | Why |
|--------|---------|------|-----|
| **WebP** | All photographs (hero images, team photos) | `cwebp` CLI or Squoosh.app | 25-35% smaller than JPEG at same quality. 97%+ browser support. |
| **SVG** | Logos, icons, simple graphics | SVGO or hand-optimized | Infinitely scalable, tiny file size, CSS-styleable |
| **AVIF** | Optional progressive enhancement | `avifenc` or Squoosh.app | 50% smaller than JPEG, but 92% support. Use as `<picture>` source with WebP fallback. |
| **PNG** | Award badges with transparency | TinyPNG or `pngquant` | Only for images needing transparency that aren't SVG-suitable |

#### Responsive Images with `<picture>` and `srcset`

```html
<!-- Hero image with responsive sources -->
<picture>
  <source srcset="images/hero-800.webp 800w, images/hero-1200.webp 1200w, images/hero-1600.webp 1600w"
          type="image/webp">
  <img src="images/hero-1200.jpg"
       srcset="images/hero-800.jpg 800w, images/hero-1200.jpg 1200w, images/hero-1600.jpg 1600w"
       sizes="100vw"
       alt="Professional cleaning team at work"
       loading="lazy"
       width="1600" height="900">
</picture>
```

**Key attributes:**
- `loading="lazy"` on all images below the fold (NOT on hero image)
- `width` and `height` always set (prevents layout shift / CLS)
- `sizes` attribute to help browser choose correct source

#### Image Optimization Workflow

```bash
# Install tools (one-time)
brew install webp

# Convert JPEG/PNG to WebP (quality 80 is visually lossless for photos)
cwebp -q 80 input.jpg -o output.webp

# Generate multiple sizes for responsive images
cwebp -q 80 -resize 800 0 input.jpg -o hero-800.webp
cwebp -q 80 -resize 1200 0 input.jpg -o hero-1200.webp
cwebp -q 80 -resize 1600 0 input.jpg -o hero-1600.webp
```

**Or use Squoosh.app** (https://squoosh.app) — Google's free browser-based image optimizer. No install needed. Drag, drop, export. Good for one-off optimization.

#### Image Budget

For a fast-loading demo site, target:

| Metric | Target |
|--------|--------|
| Hero image | < 150KB (WebP, 1600px wide) |
| Section images | < 80KB each (WebP) |
| Total page weight (images) | < 500KB |
| Total page weight (all assets) | < 800KB |

**Confidence: HIGH** — Image optimization for static sites is very well-established.

---

### CSS Reset / Normalization

#### Recommended: Modern CSS Reset (Andy Bell's or Josh Comeau's)

Use a minimal modern reset, not a full normalize.css. Here is a solid starting point:

```css
/* Modern CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

body {
  min-height: 100vh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  text-wrap: balance;
}
```

**Why not normalize.css:** Normalize preserves browser defaults and just makes them consistent. A reset gives you a clean slate — you're going to style everything anyway, so start from zero.

**Confidence: HIGH**

---

### Deployment (Vercel)

Already decided: GitHub to Vercel. No configuration needed for static HTML sites.

| Aspect | Approach |
|--------|----------|
| **Deployment** | Push to GitHub main branch, Vercel auto-deploys |
| **Configuration** | Zero config for static sites. Vercel detects HTML automatically. |
| **Multi-site** | Two options: (a) monorepo with `vercel.json` pointing to subdirectories, or (b) two Vercel projects linked to same repo with different root directories |
| **Custom headers** | `vercel.json` for cache headers on images/fonts |
| **Preview deployments** | Every PR gets a preview URL — useful for showing iterations |

**Recommended `vercel.json` for each site (if using separate Vercel projects):**

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*).css",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**Confidence: HIGH**

---

### Form Handling (Placeholder for Demo)

The demo does NOT need a working form. But if the client signs on and wants a working contact form later:

| Option | Cost | Complexity | Best For |
|--------|------|------------|----------|
| **Formspree** | Free (50 submissions/mo) | Zero — just set form `action` URL | Demo → production upgrade path |
| **Netlify Forms** | Free (100 submissions/mo) | Zero (if on Netlify) | If moving to Netlify |
| **Google Forms embed** | Free | Low | Quick and dirty |
| Web3Forms | Free (250 submissions/mo) | Low | If Formspree limits are hit |

**For the demo:** Style a beautiful form that submits nowhere. Add a `<form>` with proper inputs but no `action`. If the client wants it working later, add Formspree in 5 minutes.

**Confidence: HIGH**

---

## Complete File Structure per Site

```
commercial/                    # (or residential/)
  index.html                   # Single page with all sections
  css/
    styles.css                 # Single stylesheet (reset + theme + components)
  js/
    main.js                    # Mobile nav, AOS init, any interactions
  images/
    hero-800.webp              # Responsive hero images
    hero-1200.webp
    hero-1600.webp
    logo.svg                   # Company logo (SVG for crispness)
    award-angies-list.webp     # Trust signal badges
    award-readers-choice.webp
    ...
  favicon.ico                  # Browser tab icon
  favicon.svg                  # Modern SVG favicon
```

**Why single-page:** For a demo cleaning service site, a single page with anchor-linked sections (hero, services, about, trust, contact) is more effective than multi-page. Users scroll, they don't click around. If the client wants a multi-page site later, it is straightforward to refactor.

---

## What NOT to Use (and Why)

| Technology | Why Not |
|------------|---------|
| **Tailwind CSS** | Requires a build step (or the CDN dev build which is 300KB+). Clutters HTML with utility classes. For two small sites, custom CSS is faster to write and easier to maintain. |
| **Bootstrap** | Massive payload for components you won't use. Forces Bootstrap's design language. Makes every site look like a Bootstrap site. |
| **Sass/SCSS** | CSS custom properties + nesting (native) eliminate the need. Adds a build step for minimal benefit on small projects. |
| **React/Vue/Svelte** | No interactivity that justifies a framework. Bundle size, build complexity, development time all increase for zero user benefit. |
| **jQuery** | It's 2026. `document.querySelector()` and `fetch()` are native. jQuery adds 87KB for nothing. |
| **WordPress/CMS** | The whole point is escaping WordPress bloat. Static files are faster, simpler, and cheaper to host. |
| **Vite/Webpack/Parcel** | No build step needed. The sites are small enough for manual optimization. Build tools add complexity without proportional benefit. |
| **TypeScript** | ~50 lines of JS for mobile nav and scroll effects. Type safety provides no value here. |
| **CSS-in-JS** | Framework-dependent (React/Vue). Not applicable. |
| **Web Components** | Adds complexity. Two similar sites can share code by copy-paste — they're small enough that DRY across sites isn't worth the abstraction. |

---

## Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| Lighthouse Performance | 95+ | Static HTML, optimized images, minimal JS |
| Lighthouse Accessibility | 95+ | Semantic HTML, proper headings, alt text, color contrast |
| First Contentful Paint | < 1.0s | Inline critical CSS, preconnect fonts |
| Largest Contentful Paint | < 2.0s | Optimized hero image, proper `sizes`/`srcset` |
| Total Blocking Time | < 50ms | AOS is async, main.js is tiny |
| Cumulative Layout Shift | < 0.05 | `width`/`height` on all images, font `display=swap` |
| Total page weight | < 800KB | Compressed images, minimal CSS/JS, no frameworks |

---

## Summary: The Complete Stack

```
HTML5 (semantic)
+ CSS3 (custom properties, flexbox, grid, clamp())
+ Vanilla JS (ES6+)
+ Google Fonts (Nunito + Open Sans via CDN)
+ Lucide Icons (inline SVG, no CDN)
+ AOS (scroll animations via CDN)
+ WebP images (manually optimized)
+ Vercel (static hosting, GitHub auto-deploy)
```

**Total external dependencies:** 3 (Google Fonts CDN, AOS JS, AOS CSS)
**Total page weight target:** < 800KB
**Build step:** None
**Framework:** None

This stack delivers a fast, polished, professional-looking site that will make Angie's current WordPress sites look ancient by comparison — which is the entire point.

---

## Sources & Confidence

| Recommendation | Confidence | Basis |
|----------------|------------|-------|
| CSS Custom Properties | HIGH | Established standard, 98%+ support, widely documented |
| `clamp()` fluid typography | HIGH | 96%+ support, standard practice since 2022 |
| Google Fonts (Nunito + Open Sans) | HIGH | Stable, widely used pairing |
| Lucide inline SVGs | HIGH | Standard practice for static sites |
| AOS v2.3.4 | HIGH | Stable library, 25K+ GitHub stars, widely used. Note: verify CDN URL version is still current |
| WebP images | HIGH | 97%+ support, standard format |
| Vercel static hosting | HIGH | Confirmed by project constraints |
| CSS nesting (native) | MEDIUM | Support ~90% as of early 2025; verify current status before relying on it |
| Scroll-driven CSS animations | LOW | Rapidly evolving; ~75% support as of training. May be production-ready now — verify |

**Gaps to verify before implementation:**
1. Confirm AOS v2.3.4 is still the latest — check unpkg or cdnjs
2. Confirm CSS nesting browser support has reached 95%+ (it was trending that way)
3. Check if `text-wrap: balance` has reached sufficient support for heading use
