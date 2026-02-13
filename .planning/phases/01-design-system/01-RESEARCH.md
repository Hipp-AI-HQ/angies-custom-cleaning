# Phase 1: Design System - Research

**Researched:** 2026-02-13
**Domain:** CSS design system (custom properties, typography, color palette, responsive layout)
**Confidence:** HIGH

## Summary

Phase 1 creates the shared CSS foundation that both the commercial and residential sites will use. This is a pure CSS design system -- no build tools, no preprocessors, no JavaScript. The deliverables are four CSS files (`reset.css`, `variables.css`, `base.css`, `utilities.css`) in a `shared/` directory, plus a test HTML file that validates everything works at all breakpoints.

The technical domain is mature and well-understood. CSS custom properties have 98%+ browser support. Google Fonts with preconnect + `font-display: swap` is the established pattern for web font loading. Mobile-first responsive design with `min-width` media queries at 768px and 1024px is standard. Fluid typography with `clamp()` (96%+ support) eliminates most typography-related media queries. The only area requiring care is color selection -- the palette must feel warm and trustworthy (per DSGN-05), not cold and corporate.

The actual brand color from Angie's current commercial site is `#005982` (deep teal blue). The residential site currently uses purple (`#853ea2`), but the decision is to unify both on blue. The color palette must be built around this existing blue, warmed up with off-white backgrounds and orange accents.

**Primary recommendation:** Build four shared CSS files (reset, variables, base, utilities) with a fluid type scale using `clamp()`, a warm blue palette derived from `#005982`, and Nunito + Open Sans via Google Fonts. Validate with a test HTML page at 375px, 768px, and 1024px.

## Standard Stack

### Core

| Library/Tool | Version | Purpose | Why Standard |
|-------------|---------|---------|--------------|
| CSS Custom Properties | Native | Design tokens (colors, typography, spacing) | 98%+ browser support, no build step, runtime-capable |
| CSS `clamp()` | Native | Fluid typography scaling | 96%+ support, eliminates font-size media queries |
| CSS Flexbox | Native | Component layouts (nav, cards, footer) | 99%+ support |
| CSS Grid | Native | Page-level section layouts, service grids | 98%+ support |
| Google Fonts (CDN) | CSS API v2 | Nunito + Open Sans web fonts | Industry standard, free, high-performance CDN |

### Supporting

| Feature | Support | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS Nesting (native) | ~91% | Cleaner stylesheet organization | Use sparingly for component scoping; graceful degradation OK |
| `text-wrap: balance` | ~87% | Better heading line breaks | Use on headings only; progressive enhancement |
| `text-wrap: pretty` | ~78% | Better paragraph line breaks | Use on body text; progressive enhancement (no Firefox support) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Custom Properties | Sass variables | Sass requires build step; custom properties work at runtime |
| Google Fonts CDN | Self-hosted WOFF2 | Self-hosting eliminates third-party request but adds file management overhead |
| `clamp()` for typography | Media queries | Media queries create size "jumps" instead of smooth scaling |
| Separate CSS files | Single concatenated file | Separate files are clearer during development; total size (~10KB) makes HTTP overhead negligible on Vercel CDN |

**No installation required.** Pure CSS + HTML. No npm, no packages, no build tools.

## Architecture Patterns

### Recommended File Structure

```
shared/
  css/
    reset.css           # Modern CSS reset (Josh Comeau + Andy Bell hybrid)
    variables.css       # CSS custom properties: colors, typography, spacing, shadows
    base.css            # Base element styles using variables (body, headings, links, lists)
    utilities.css       # Utility classes (.container, .sr-only, .text-center, .grid)
```

Each site will COPY these four files into its own `css/` directory (Vercel cannot access files outside the project root directory). The `shared/` directory is the source of truth.

### Pattern 1: CSS Custom Properties Design Token System

**What:** All design values (colors, fonts, spacing, shadows, transitions, border-radii) defined as CSS custom properties in `:root` in a single `variables.css` file.

**When to use:** Always. Every other CSS file references these tokens instead of hard-coding values.

**Example:**
```css
/* Source: CSS Custom Properties spec + project color research */
:root {
  /* Blue brand palette -- derived from current site #005982 */
  --color-primary: #005982;
  --color-primary-light: #0077AD;
  --color-primary-dark: #003D5C;
  --color-primary-50: #E6F2F8;   /* Very light blue for subtle backgrounds */
  --color-primary-100: #B3D9EA;  /* Light blue tints */

  /* Warm neutrals -- NOT pure white, NOT cold gray */
  --color-bg: #FDFAF6;           /* Warm white (slight cream) */
  --color-bg-alt: #F5F0EB;       /* Warm light gray for alternating sections */
  --color-text: #2C3E50;         /* Dark blue-gray (warm, readable) */
  --color-text-light: #5D6D7E;   /* Secondary text */

  /* Warm accent -- orange for CTAs and highlights */
  --color-accent: #E67E22;       /* Warm orange */
  --color-accent-hover: #D35400; /* Darker orange for hover */

  /* Semantic colors */
  --color-success: #27AE60;
  --color-white: #FFFFFF;

  /* Typography */
  --font-heading: 'Nunito', sans-serif;
  --font-body: 'Open Sans', sans-serif;

  /* Fluid type scale (min @ 400px viewport, max @ 1280px viewport) */
  --fs-sm: clamp(0.833rem, 0.816rem + 0.085vw, 0.889rem);
  --fs-base: clamp(1rem, 0.966rem + 0.17vw, 1.125rem);
  --fs-md: clamp(1.25rem, 1.182rem + 0.341vw, 1.5rem);
  --fs-lg: clamp(1.563rem, 1.437rem + 0.625vw, 1.969rem);
  --fs-xl: clamp(1.953rem, 1.745rem + 1.042vw, 2.625rem);
  --fs-xxl: clamp(2.441rem, 2.11rem + 1.654vw, 3.5rem);

  /* Spacing scale */
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --space-section: clamp(3rem, 2.5rem + 2.5vw, 6rem); /* Section padding */

  /* Layout */
  --container-max: 1200px;
  --container-padding: var(--space-md);

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}
```

### Pattern 2: Modern CSS Reset (Josh Comeau 2025 + Andy Bell hybrid)

**What:** A minimal reset that normalizes browser defaults without being overly aggressive. Updated for 2025 with `text-wrap: balance/pretty` and `interpolate-size`.

**When to use:** Always. Load as the first stylesheet.

**Example:**
```css
/* Source: Josh Comeau (joshwcomeau.com/css/custom-css-reset/, updated Dec 2025) */

/* 1. Box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margins (exclude dialog for auto-centering) */
*:not(dialog) {
  margin: 0;
}

/* 3. Smooth scrolling (respect reduced-motion preference) */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* 4. Body defaults */
body {
  min-height: 100vh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 5. Media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Form inheritance */
input, button, textarea, select {
  font: inherit;
}

/* 7. Text overflow */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Text wrapping (progressive enhancement) */
p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/* 9. Reduced motion: remove all animations/transitions */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 10. Prevent text size adjustment on orientation change */
html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
```

### Pattern 3: Google Fonts Loading with Preconnect

**What:** Load Nunito (headings, 700 + 800 weights) and Open Sans (body, 400 + 600 weights) via Google Fonts CDN with preconnect hints and `display=swap`.

**When to use:** In every HTML file's `<head>`, before any stylesheet links.

**Example:**
```html
<!-- Source: web.dev/articles/font-best-practices -->

<!-- Preconnect to Google Fonts origins (saves 100-200ms) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap (shows fallback immediately, swaps when loaded) -->
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
```

**Why these specific weights:**
- Nunito 700: Section headings (h2-h6)
- Nunito 800: Page title / hero heading (h1)
- Open Sans 400: Body text, paragraphs
- Open Sans 600: Bold body text, navigation links, buttons

**Why NOT variable fonts here:** Loading Nunito as a variable font (`wght@200..900`) would download the full weight range (~100KB) when we only need 2 weights (~40KB). Specifying exact weights is more performant.

### Pattern 4: Mobile-First Responsive Breakpoints

**What:** Write mobile styles as the default (no media query), then layer on tablet and desktop enhancements with `min-width` queries.

**When to use:** All layout-related CSS.

**Example:**
```css
/* Mobile: default -- no media query needed */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

.services-grid {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;  /* Mobile: single column */
}

/* Tablet: 768px and up */
@media (min-width: 768px) {
  :root {
    --container-padding: var(--space-xl);
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);  /* Tablet: two columns */
  }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);  /* Desktop: three columns */
  }
}
```

### Anti-Patterns to Avoid

- **Desktop-first CSS:** Writing desktop layout first then using `max-width` queries to shrink. Results in larger mobile CSS payload and harder-to-maintain code.
- **@import for CSS files:** Using `@import` in CSS creates render-blocking waterfalls. Use `<link>` tags in HTML instead (each file loads in parallel).
- **Pure white backgrounds (`#FFFFFF`):** For a cleaning brand that needs to feel warm and trustworthy, pure white feels sterile and clinical. Use `--color-bg: #FDFAF6` (warm white with cream undertone).
- **Too many font weights:** Loading more than 4 weights across both families (total) adds unnecessary load time. Stick to Nunito 700+800, Open Sans 400+600.
- **Hard-coded px values for typography:** Use the fluid type scale variables (`--fs-base`, `--fs-lg`, etc.) everywhere. This ensures consistent scaling and respects user zoom preferences.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS reset/normalize | Custom margin/padding resets | Josh Comeau's modern reset (2025 version) | Covers edge cases like `dialog` margins, `text-wrap`, form inheritance, reduced motion |
| Fluid typography | Manual media queries per heading size | `clamp()` with fluid type scale formula | Smooth scaling, fewer breakpoints, WCAG-compliant rem units |
| Font loading optimization | Custom font-loading JS | Google Fonts CDN `display=swap` + `preconnect` | Google CDN handles caching, subsetting, format negotiation automatically |
| Accessibility: reduced motion | Ignoring it | `@media (prefers-reduced-motion: reduce)` reset block | 1 CSS block handles all animation/transition accessibility |
| Container centering | Custom per-section widths | `.container` utility class with `max-width` + `margin-inline: auto` | Reused 10+ times per site, must be consistent |
| Screen reader text | Inline styles or `display: none` | `.sr-only` utility class (clip-rect pattern) | `display: none` hides from screen readers; the clip-rect pattern is tested |

**Key insight:** The entire design system is ~50 CSS custom properties, a reset, base styles, and a few utility classes. It should total under 10KB across all four files. Resist the urge to over-engineer.

## Common Pitfalls

### Pitfall 1: Cold Corporate Blue
**What goes wrong:** Using pure blue (#0000FF or cold blues like #1a5276) that feels corporate and impersonal. A cleaning business needs to feel trustworthy AND approachable.
**Why it happens:** Blue is chosen for trust, but without warming the palette, it reads as "bank" not "friendly local business."
**How to avoid:** Use the actual brand blue `#005982` (which has teal undertones -- warmer than pure blue). Pair with warm white (`#FDFAF6`) backgrounds instead of pure white. Add warm orange accent (`#E67E22`). The blue-orange combination is complementary on the color wheel and psychologically pairs trust (blue) with optimism (orange).
**Warning signs:** If the test page feels like a corporate dashboard, the blues are too cold or the whites are too stark.

### Pitfall 2: Flash of Unstyled Text (FOUT)
**What goes wrong:** Page loads showing system fonts, then visibly swaps to Nunito/Open Sans, causing text to jump and reflow.
**Why it happens:** Google Fonts loading without proper preconnect hints, or using fonts with very different metrics from the fallback.
**How to avoid:** (1) Use `preconnect` for both Google Fonts origins. (2) Use `display=swap` (shows text immediately in fallback). (3) Choose fallback fonts with similar metrics: `font-family: 'Nunito', 'Segoe UI', Tahoma, sans-serif` for headings and `font-family: 'Open Sans', -apple-system, system-ui, sans-serif` for body.
**Warning signs:** Visible text reflow when fonts load, especially on slow connections.

### Pitfall 3: Type Scale Looks Wrong at Extremes
**What goes wrong:** Headings are too large on mobile (overflow container) or too small on desktop (no hierarchy visible).
**Why it happens:** Using fixed `px` or `rem` values instead of fluid `clamp()`, or using clamp with bad min/max values.
**How to avoid:** Use the fluid type scale formula with tested min/max values. The `--fs-xxl` (hero heading) should be ~2.4rem minimum on mobile and ~3.5rem maximum on desktop. Test at 375px width specifically.
**Warning signs:** Horizontal overflow on mobile, or h1 and h2 looking the same size on desktop.

### Pitfall 4: Inconsistent Spacing
**What goes wrong:** Sections have visibly different vertical padding, cards have inconsistent gaps, the page feels "off" but you can't pinpoint why.
**Why it happens:** Using ad-hoc spacing values (sometimes 20px, sometimes 2rem, sometimes 48px) instead of the spacing scale.
**How to avoid:** Only use spacing scale variables (`--space-xs` through `--space-4xl` or `--space-section`). Never hard-code a spacing value.
**Warning signs:** Eyeballing spacing and it feeling inconsistent across sections.

### Pitfall 5: Shared Files Drift Between Sites
**What goes wrong:** You edit `variables.css` in the commercial site directory but forget to update it in the residential site directory. The two sites diverge.
**Why it happens:** The copy-based sharing pattern (required by Vercel's root directory isolation) means no single source of truth at deploy time.
**How to avoid:** Always edit in `shared/css/` first, then copy to both sites. Consider a simple `sync-shared.sh` script that copies all shared CSS into both site directories. Run it before committing.
**Warning signs:** The two sites using different color values or spacing despite being "the same brand."

### Pitfall 6: Test HTML File Not Representative
**What goes wrong:** The test HTML file only tests headings and colors but doesn't test actual layout patterns (grid, cards, sections). Phase 2 starts and discovers the grid system doesn't work.
**Why it happens:** Treating the test file as a "style guide" rather than a layout validation tool.
**How to avoid:** The test HTML should include: (1) all heading levels, (2) body text paragraphs, (3) a 3-column card grid, (4) a full-width section with constrained content, (5) a button in primary and accent colors, and (6) alternating section backgrounds. Test at 375px, 768px, and 1024px.
**Warning signs:** Test page has no layout components, only typography specimens.

## Code Examples

### Complete `variables.css` Color Palette
```css
/* Source: Sampled from angiescommercialcleaning.com (#005982) + color theory research */
:root {
  /* Primary: Blue brand family (derived from actual brand #005982) */
  --color-primary: #005982;          /* Main brand blue -- headers, links, primary buttons */
  --color-primary-light: #0077AD;    /* Lighter blue -- hover states, secondary elements */
  --color-primary-dark: #003D5C;     /* Dark blue -- footer, nav background */
  --color-primary-50: #E6F2F8;       /* Very light blue -- subtle backgrounds, highlights */
  --color-primary-100: #B3D9EA;      /* Light blue -- borders, dividers */

  /* Accent: Warm orange (complementary to blue on color wheel) */
  --color-accent: #E67E22;           /* CTAs, highlights, call-to-action buttons */
  --color-accent-hover: #D35400;     /* Hover state for accent */
  --color-accent-light: #FDEBD0;    /* Light accent for badge backgrounds */

  /* Backgrounds: Warm whites (NOT pure #FFF) */
  --color-bg: #FDFAF6;              /* Primary background -- warm cream-white */
  --color-bg-alt: #F5F0EB;          /* Alternating section background -- warm light gray */
  --color-surface: #FFFFFF;          /* Cards, elevated surfaces */

  /* Text: Warm dark tones (NOT pure black) */
  --color-text: #2C3E50;            /* Primary body text */
  --color-text-light: #5D6D7E;      /* Secondary text, captions */
  --color-text-on-dark: #F8F9FA;    /* Text on dark backgrounds */
  --color-text-on-primary: #FFFFFF; /* Text on primary blue */

  /* Semantic */
  --color-success: #27AE60;
  --color-border: #E0DCD7;          /* Warm gray border */
}
```

### Complete Fluid Type Scale
```css
/* Source: fluid-type-scale.com with 1.25 ratio (mobile) to 1.333 ratio (desktop) */
/* Viewport range: 400px to 1280px */
:root {
  --fs-sm: clamp(0.833rem, 0.816rem + 0.085vw, 0.889rem);    /* ~13-14px */
  --fs-base: clamp(1rem, 0.966rem + 0.17vw, 1.125rem);        /* 16-18px */
  --fs-md: clamp(1.25rem, 1.182rem + 0.341vw, 1.5rem);        /* 20-24px */
  --fs-lg: clamp(1.563rem, 1.437rem + 0.625vw, 1.969rem);     /* 25-31px */
  --fs-xl: clamp(1.953rem, 1.745rem + 1.042vw, 2.625rem);     /* 31-42px */
  --fs-xxl: clamp(2.441rem, 2.11rem + 1.654vw, 3.5rem);       /* 39-56px */

  --font-heading: 'Nunito', 'Segoe UI', Tahoma, sans-serif;
  --font-body: 'Open Sans', -apple-system, system-ui, sans-serif;
  --line-height-body: 1.6;
  --line-height-heading: 1.2;
  --letter-spacing-heading: -0.02em;
}
```

### Base Heading Styles
```css
/* base.css - Heading hierarchy using fluid scale and design tokens */
h1 { font-family: var(--font-heading); font-size: var(--fs-xxl); font-weight: 800; line-height: var(--line-height-heading); letter-spacing: var(--letter-spacing-heading); color: var(--color-primary-dark); }
h2 { font-family: var(--font-heading); font-size: var(--fs-xl); font-weight: 700; line-height: var(--line-height-heading); letter-spacing: var(--letter-spacing-heading); color: var(--color-primary-dark); }
h3 { font-family: var(--font-heading); font-size: var(--fs-lg); font-weight: 700; line-height: var(--line-height-heading); color: var(--color-text); }
h4 { font-family: var(--font-heading); font-size: var(--fs-md); font-weight: 700; line-height: var(--line-height-heading); color: var(--color-text); }
h5 { font-family: var(--font-heading); font-size: var(--fs-base); font-weight: 700; color: var(--color-text); }
h6 { font-family: var(--font-heading); font-size: var(--fs-sm); font-weight: 700; color: var(--color-text-light); }
```

### Essential Utility Classes
```css
/* utilities.css */

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Section spacing */
.section {
  padding-block: var(--space-section);
}

.section--alt {
  background-color: var(--color-bg-alt);
}

/* Text utilities */
.text-center { text-align: center; }
.text-accent { color: var(--color-accent); }
.text-primary { color: var(--color-primary); }

/* Button base (shared by both sites) */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-xl);
  font-family: var(--font-heading);
  font-size: var(--fs-base);
  font-weight: 700;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-white);
}

.btn--primary:hover {
  background-color: var(--color-accent-hover);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn--outline:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
}
```

### Test HTML Structure
```html
<!-- test.html - Validates design system at all breakpoints -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System Test - Angie's Custom Cleaning</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/utilities.css">
</head>
<body>
  <!-- Test sections: typography, colors, buttons, card grid, section spacing -->
</body>
</html>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|-------------|------------------|--------------|--------|
| Sass variables | CSS custom properties | 2020+ (mainstream) | No build step needed, runtime theming possible |
| `normalize.css` (8KB) | Minimal modern reset (~1KB) | 2022+ | Smaller, more intentional, better defaults |
| Fixed font sizes + media queries | `clamp()` fluid typography | 2022+ | Smooth scaling, fewer media queries, better UX |
| `font-display: block` | `font-display: swap` | 2019+ | Text visible immediately, no FOIT |
| Desktop-first + max-width queries | Mobile-first + min-width queries | 2016+ | Better mobile performance, progressive enhancement |
| `text-wrap: normal` | `text-wrap: balance` for headings | 2023+ (87% support) | Better line distribution in headings |
| px-based spacing | rem-based spacing scale | 2018+ | Respects user zoom preferences, consistent scale |

**Deprecated/outdated:**
- normalize.css: Unnecessarily large for modern browsers. Modern resets are sufficient.
- Google Fonts v1 API: v2 API (`css2?family=`) is current. v1 still works but v2 is preferred.
- `@import` for CSS: Use `<link>` tags. `@import` causes render-blocking waterfall.

## Open Questions

1. **Exact brand blue hex code**
   - What we know: Commercial site uses `#005982`. Residential uses `#853ea2` (purple, being dropped).
   - What's unclear: Whether `#005982` is the "official" brand blue or just the WordPress theme color. Ideally would sample from logo directly.
   - Recommendation: Use `#005982` as the starting point. It is teal-leaning blue with warm undertones -- a good base. Adjust during visual review if needed.

2. **Warm white background value**
   - What we know: `#FDFAF6` is a standard warm white with cream undertone. `#FFF8F0` is another option with slightly more warmth.
   - What's unclear: Exact warmth preference is subjective and needs visual testing.
   - Recommendation: Start with `#FDFAF6`. If it looks too yellow on some monitors, try `#FDFBF7`. Test on both the developer's screen and a phone screen.

3. **Content extraction from current sites**
   - What we know: Phase 1 primarily needs the brand blue color (sampled above). Full content extraction is needed for Phase 2 (commercial site content) and Phase 3 (residential site content).
   - What's unclear: Whether any current-site content is needed for the test HTML file in Phase 1.
   - Recommendation: The test HTML should use representative placeholder text that mimics real content structure (heading lengths, paragraph density) without requiring actual content extraction. Real content extraction can happen in parallel during early Phase 2.

## Sources

### Primary (HIGH confidence)
- [Josh Comeau's Modern CSS Reset (2025)](https://www.joshwcomeau.com/css/custom-css-reset/) -- Complete reset with 2025 updates (dialog exclusion, interpolate-size, text-wrap)
- [web.dev Font Best Practices](https://web.dev/articles/font-best-practices) -- Google's official guidance on font loading, preconnect, font-display
- [Can I Use: CSS text-wrap: balance](https://caniuse.com/css-text-wrap-balance) -- 87.18% browser support confirmed
- [Can I Use: CSS text-wrap: pretty](https://caniuse.com/mdn-css_properties_text-wrap_pretty) -- 77.7% support, no Firefox
- [Can I Use: CSS Nesting](https://caniuse.com/css-nesting) -- 90.71% browser support confirmed
- [Fluid Type Scale Calculator](https://www.fluid-type-scale.com/) -- Generates clamp() values for fluid type scales
- angiescommercialcleaning.com -- Primary brand color `#005982` sampled directly from site CSS
- angiescustomcleaning.com -- Current residential color `#853ea2` confirmed (being replaced with blue)

### Secondary (MEDIUM confidence)
- [CSS-Tricks: Consistent, Fluidly Scaling Type and Spacing](https://css-tricks.com/consistent-fluidly-scaling-type-and-spacing/) -- Fluid typography patterns
- [BrowserStack: Responsive Design Breakpoints 2025](https://www.browserstack.com/guide/responsive-design-breakpoints) -- Breakpoint standards
- [Steph Corrigan: Blue Color Palettes](https://stephcorrigan.com/blue-color-palettes/) -- Blue + orange palette hex codes (#304269, #86ABD4, #D9E8F5, #F26101)
- [Modern CSS Solutions: Fluid Type Scale](https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/) -- clamp() formula derivation

### Tertiary (LOW confidence)
- [Hook Agency: Website Color Schemes 2026](https://hookagency.com/blog/website-color-schemes-2020/) -- Blue-orange color pairing (complementary on color wheel)
- [Bungalow Web Design: Cleaning Service Palettes](https://bungalowwebdesign.com/9-best-color-palettes-for-cleaning-service-websites-in-2024-examples/) -- Industry-specific palette recommendations (content not fully extractable)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- CSS custom properties, clamp(), Google Fonts are mature, well-documented technologies with 96%+ browser support
- Architecture: HIGH -- File structure and CSS organization patterns confirmed by project-level research and Vercel deployment constraints
- Color palette: MEDIUM -- Brand blue sampled from live site, but warm palette tuning is subjective and needs visual validation
- Pitfalls: HIGH -- Font loading, responsive design, and design system drift are well-documented problem areas

**Research date:** 2026-02-13
**Valid until:** 2026-04-13 (60 days -- this domain is extremely stable)
