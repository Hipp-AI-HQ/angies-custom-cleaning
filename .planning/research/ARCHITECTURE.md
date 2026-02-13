# Architecture Patterns

**Domain:** Multi-site static marketing websites (cleaning service)
**Researched:** 2026-02-13
**Confidence:** HIGH (verified against Vercel official documentation)

## Recommended Architecture

Two independent static HTML/CSS/JS sites in a single Git repository, deployed as separate Vercel projects. A shared directory at the repo root provides common CSS custom properties, typography, and brand assets. Each site is self-contained within its subdirectory and deployable on its own.

```
angies-custom-cleaning/           (repo root)
|
+-- shared/                       (shared design system, NOT deployed directly)
|   +-- css/
|   |   +-- variables.css         (CSS custom properties: colors, spacing, typography)
|   |   +-- reset.css             (CSS reset / normalize)
|   |   +-- base.css              (base element styles: body, headings, links)
|   |   +-- utilities.css         (utility classes: .container, .sr-only, .text-center)
|   +-- assets/
|       +-- logos/                (shared brand logos, favicon)
|       +-- fonts/                (web fonts if self-hosted)
|
+-- commercial/                   (Vercel project 1, root directory = commercial/)
|   +-- index.html
|   +-- vercel.json
|   +-- css/
|   |   +-- variables.css         (COPIED from shared/ during setup or symlinked)
|   |   +-- reset.css             (COPIED from shared/)
|   |   +-- base.css              (COPIED from shared/)
|   |   +-- utilities.css         (COPIED from shared/)
|   |   +-- components.css        (site-specific component styles)
|   |   +-- layout.css            (site-specific layout styles)
|   +-- assets/
|   |   +-- images/               (site-specific images: hero, service photos)
|   |   +-- logos/                (COPIED from shared/)
|   |   +-- favicon.ico
|   +-- js/
|       +-- main.js               (site-specific JS: mobile nav, smooth scroll)
|
+-- residential/                  (Vercel project 2, root directory = residential/)
|   +-- index.html
|   +-- vercel.json
|   +-- css/
|   |   +-- variables.css         (COPIED from shared/)
|   |   +-- reset.css             (COPIED from shared/)
|   |   +-- base.css              (COPIED from shared/)
|   |   +-- utilities.css         (COPIED from shared/)
|   |   +-- components.css        (site-specific component styles)
|   |   +-- layout.css            (site-specific layout styles)
|   +-- assets/
|   |   +-- images/
|   |   +-- logos/
|   |   +-- favicon.ico
|   +-- js/
|       +-- main.js
|
+-- docs/                         (reference materials, not deployed)
|   +-- brand-assets/
|   +-- requirements.md
+-- .planning/                    (project planning, not deployed)
+-- CLAUDE.md
+-- PROJECT.md
+-- .gitignore
```

### Why Copy Instead of Symlink or Reference Outside Root

**Critical Vercel constraint:** When you set a Root Directory for a Vercel project (e.g., `commercial/`), Vercel explicitly states: "Your app will not be able to access files outside of that directory. You also cannot use `..` to move up a level." This means shared files at the repo root CANNOT be referenced at deploy time.

**Source:** Verified in Vercel official documentation for Root Directory configuration.

This leaves three options:

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Copy files into each site** | Simple, no tooling needed, always works with Vercel | Duplication, must keep in sync | **Recommended** |
| **Simple build script** | Single source of truth, automated copy | Adds build step, more complexity | Good alternative |
| **Symlinks** | No duplication | May not work on Windows, Vercel may not follow symlinks | Avoid |

**Recommendation: Start with manual copy, add a sync script if drift becomes a problem.**

The shared files (variables.css, reset.css, base.css, utilities.css) are small and change infrequently. For two demo sites, manual copy is perfectly fine. If this were a production setup with ongoing updates, a simple shell script (`sync-shared.sh`) that copies from `shared/` into both site directories would be warranted.

### Optional: Sync Script

If drift concerns arise, add this to the repo root:

```bash
#!/bin/bash
# sync-shared.sh - Copy shared assets into both site directories
for site in commercial residential; do
  cp shared/css/*.css "$site/css/"
  cp -r shared/assets/logos "$site/assets/"
  cp -r shared/assets/fonts "$site/assets/" 2>/dev/null
done
echo "Shared assets synced to both sites."
```

## Component Boundaries

| Component | Responsibility | Shared? |
|-----------|---------------|---------|
| `shared/css/variables.css` | Brand colors, typography scale, spacing scale as CSS custom properties | Source of truth; copied to each site |
| `shared/css/reset.css` | Browser reset (modern CSS reset or normalize) | Identical across sites |
| `shared/css/base.css` | Base element styles (body font, heading hierarchy, link styles) | Identical across sites |
| `shared/css/utilities.css` | Utility classes (.container, .sr-only, .flex, .grid) | Identical across sites |
| `{site}/css/components.css` | Site-specific UI components (hero, service cards, testimonials, CTA buttons) | Site-specific |
| `{site}/css/layout.css` | Site-specific layout (header, footer, sections, responsive grid) | Site-specific |
| `{site}/js/main.js` | Interactivity (mobile nav toggle, smooth scroll, form behavior) | Site-specific but similar patterns |
| `{site}/index.html` | Page content and structure | Completely site-specific |
| `{site}/vercel.json` | Vercel deployment configuration | Per-site |

## CSS Architecture

### Strategy: CSS Custom Properties Design System (No Preprocessor)

Use CSS custom properties (CSS variables) as the design system foundation. No Sass, Less, or PostCSS needed. This approach provides:

1. **Shared design tokens** without a build step
2. **Runtime theming capability** (custom properties cascade)
3. **Native browser support** (97%+ global support, zero polyfill needed)
4. **Maintainability** through a single source of truth for brand values

### CSS File Organization Per Site

Load order matters. Each HTML file includes stylesheets in this order:

```html
<!-- 1. Reset first (normalize browser defaults) -->
<link rel="stylesheet" href="css/reset.css">

<!-- 2. Variables (design tokens, no visual output) -->
<link rel="stylesheet" href="css/variables.css">

<!-- 3. Base styles (element-level defaults using variables) -->
<link rel="stylesheet" href="css/base.css">

<!-- 4. Utilities (reusable helper classes) -->
<link rel="stylesheet" href="css/utilities.css">

<!-- 5. Layout (site structure: header, footer, sections) -->
<link rel="stylesheet" href="css/layout.css">

<!-- 6. Components (site-specific UI pieces) -->
<link rel="stylesheet" href="css/components.css">
```

### variables.css - The Design System Core

```css
:root {
  /* === Brand Colors === */
  --color-primary: #1a5276;          /* Deep blue (from current sites) */
  --color-primary-light: #2980b9;
  --color-primary-dark: #0e2f44;
  --color-secondary: #27ae60;         /* Green accent */
  --color-secondary-light: #2ecc71;

  /* === Neutral Palette === */
  --color-white: #ffffff;
  --color-gray-50: #f8f9fa;
  --color-gray-100: #f1f3f5;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-500: #868e96;
  --color-gray-700: #495057;
  --color-gray-900: #212529;

  /* === Typography === */
  --font-family-base: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-heading: var(--font-family-base);

  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-base: 1.6;

  /* === Spacing Scale === */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;

  /* === Layout === */
  --container-max: 1200px;
  --container-padding: var(--space-md);

  /* === Borders & Radius === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* === Shadows === */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.1);

  /* === Transitions === */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

**Note:** The exact color values above are estimates from the existing site branding. These should be refined by sampling the actual brand colors from the current sites or their brand assets.

### Responsive Strategy

Mobile-first with three breakpoints, using standard media queries:

```css
/* Mobile: default (no media query needed) */

/* Tablet: 768px and up */
@media (min-width: 768px) { ... }

/* Desktop: 1024px and up */
@media (min-width: 1024px) { ... }

/* Wide: 1280px and up (optional, for larger displays) */
@media (min-width: 1280px) { ... }
```

All component styles start mobile and layer on complexity. This aligns with the CLAUDE.md directive: "Design for mobile first, then scale up."

### What About a CSS Preprocessor?

**Decision: Do NOT use a preprocessor.**

| Factor | With Sass/PostCSS | Without (Plain CSS) |
|--------|-------------------|---------------------|
| Build step required | Yes | No |
| CSS variables runtime | Needs workaround | Native |
| File watching needed | Yes | No |
| Debugging | Sourcemaps needed | What you write is what runs |
| Browser support | N/A | 97%+ for custom properties |
| Learning curve | Extra syntax | Standard CSS |
| Nesting | Yes (Sass) | CSS nesting now native (95%+ support) |

For two demo sites with no ongoing development team, build tooling adds complexity without proportionate benefit. CSS custom properties give you the main thing Sass was used for (variables and theming), and CSS nesting is now natively supported in modern browsers.

## Vercel Deployment Strategy

### How It Works

Verified against Vercel's official monorepo documentation:

1. **Connect the Git repository once** to Vercel
2. **Create two separate Vercel projects** from the same repository
3. **Set Root Directory differently** for each project:
   - Project "angies-commercial-cleaning": Root Directory = `commercial/`
   - Project "angies-custom-cleaning": Root Directory = `residential/`
4. **Framework Preset:** "Other" (no framework detected for plain HTML/CSS/JS)
5. **Build Command:** Leave empty (override toggle ON, empty field = skip build step)
6. **Output Directory:** `.` (serve files from the root of the subdirectory as-is)

### Per-Site vercel.json

Each site gets a minimal `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Key settings explained:**
- `cleanUrls: true` -- Serves `about.html` at `/about` (cleaner URLs, more professional)
- `trailingSlash: false` -- Redirects `/about/` to `/about` (prevents duplicate URLs)
- Security headers on all routes (standard best practice)
- Cache headers on static assets (performance optimization)

### Deployment Behavior

- Every push to `main` triggers deployments for both projects
- Vercel can optionally skip unaffected projects (if using npm/pnpm workspaces), but for plain HTML sites without package.json workspaces, both deploy on every push. This is fine -- the builds are instant since there is no build step.
- Each project gets its own `.vercel.app` URL automatically
- Custom domains can be added per-project in Vercel dashboard

### Custom Domain Setup (Future)

When ready for client presentation:
- Commercial: `commercial-demo.yourdomain.com` (or similar)
- Residential: `residential-demo.yourdomain.com`

Each Vercel project can have custom domains assigned independently.

## Data Flow

These are static marketing sites, so "data flow" is simple:

```
User visits URL
  --> Vercel CDN serves static HTML
    --> Browser parses HTML
      --> CSS loaded (design system + site-specific)
      --> JS loaded (mobile nav, scroll behavior)
      --> Images lazy-loaded
  --> Contact form: placeholder only (no backend for demo)
```

For the demo, the contact form is non-functional (placeholder). In production, it would use either:
- A form service (Formspree, Netlify Forms equivalent on Vercel)
- A Vercel serverless function in the `/api` directory

## Patterns to Follow

### Pattern 1: Single-Page Section Architecture

**What:** Each site is a single `index.html` with full-page sections rather than multi-page navigation.

**When:** Marketing sites with limited content (5-7 sections).

**Why:** Single-page sites are simpler to build, deploy, and maintain. For a cleaning company with a handful of content sections (hero, services, about, trust signals, contact), separate pages would be over-engineering. Smooth-scrolling anchor links provide navigation.

```html
<nav>
  <a href="#services">Services</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</nav>

<section id="hero">...</section>
<section id="services">...</section>
<section id="about">...</section>
<section id="trust">...</section>
<section id="contact">...</section>
```

**Exception:** If the site grows to need separate pages (a services detail page, a hiring page), pages can be added as additional HTML files in the same directory. The `cleanUrls` Vercel setting handles clean URLs automatically.

### Pattern 2: Component-Based CSS Organization

**What:** CSS organized by component, not by page or property type.

**Why:** Makes it easy to find and modify the styles for any UI element. Each component's styles are grouped together rather than scattered across "typography.css", "colors.css", "spacing.css" etc.

```css
/* components.css - organized by component */

/* === Hero Section === */
.hero { ... }
.hero__title { ... }
.hero__subtitle { ... }
.hero__cta { ... }

/* === Service Cards === */
.service-card { ... }
.service-card__icon { ... }
.service-card__title { ... }
.service-card__description { ... }

/* === Trust Badges === */
.trust-badges { ... }
.trust-badge { ... }
.trust-badge__image { ... }
```

### Pattern 3: BEM-Inspired Naming Convention

**What:** Use Block-Element-Modifier naming for CSS classes.

**Why:** Prevents naming collisions, makes HTML self-documenting, keeps specificity flat.

```css
/* Block: .service-card */
/* Element: .service-card__title */
/* Modifier: .service-card--featured */

.service-card { ... }
.service-card--featured { border-left: 4px solid var(--color-primary); }
.service-card__title { font-size: var(--font-size-xl); }
```

### Pattern 4: Progressive Enhancement for JS

**What:** Sites must work fully without JavaScript. JS adds polish, not functionality.

**Why:** These are marketing sites. Content must be accessible regardless of JS loading. Mobile nav can use a CSS-only approach or a minimal JS toggle.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Shared Dependencies via Paths Outside Root

**What:** Using `../shared/css/variables.css` in HTML link tags to reference files outside the site directory.

**Why bad:** Vercel explicitly prevents accessing files outside the Root Directory. Works locally but breaks on deploy.

**Instead:** Copy shared files into each site directory. Use a sync script if needed.

### Anti-Pattern 2: Heavyweight CSS Framework

**What:** Adding Bootstrap, Tailwind, or similar to a two-page static site.

**Why bad:** For demo sites with ~5 sections each, a full CSS framework is overkill. It adds unnecessary file size, forces you to learn/use the framework's conventions, and obscures the simplicity of the markup. These sites should demonstrate clean, fast loading.

**Instead:** Write minimal custom CSS using CSS custom properties for consistency. Total CSS for each site should be under 10KB uncompressed.

### Anti-Pattern 3: Over-Engineering the Build System

**What:** Adding npm, webpack, Sass compilation, PostCSS, minification pipelines, etc.

**Why bad:** These are two small demo sites that need to impress a potential client. A build system adds complexity with no user-facing benefit. Vercel serves static files blazingly fast from its CDN. The performance ceiling for vanilla HTML/CSS/JS is already very high.

**Instead:** Write production-ready CSS and JS directly. Minification can be done manually for the final files if needed, or rely on Vercel's automatic Brotli/gzip compression.

### Anti-Pattern 4: Git Submodules for Shared Code

**What:** Putting shared CSS in a separate repo and using Git submodules.

**Why bad:** Git submodules are notoriously frustrating. For a handful of shared CSS files, this is massive over-engineering.

**Instead:** Keep shared files in the `shared/` directory at the repo root and copy them.

## Build Order: What to Create First

For maximum reuse and efficiency:

### Phase 1: Shared Design System
Create `shared/css/` files first:
1. `reset.css` -- CSS reset
2. `variables.css` -- Design tokens (colors, typography, spacing)
3. `base.css` -- Element-level defaults
4. `utilities.css` -- Utility classes

This is the foundation both sites build on. Get the design tokens right once.

### Phase 2: First Site (Commercial)
Build the commercial site completely:
1. Copy shared CSS into `commercial/css/`
2. Build `index.html` with semantic structure
3. Create `layout.css` (header, footer, sections)
4. Create `components.css` (hero, cards, trust badges, CTA)
5. Add `main.js` (mobile nav, smooth scroll)
6. Add `vercel.json`
7. Test responsive behavior

### Phase 3: Second Site (Residential)
Clone the structure, replace the content:
1. Copy shared CSS into `residential/css/`
2. Copy `commercial/index.html` as a starting template
3. Replace content (services, copy, images)
4. Modify `components.css` for any residential-specific design variations
5. Reuse the same `main.js` patterns (likely identical logic)
6. Add `vercel.json`

**Rationale:** Building commercial first establishes all the patterns: layout structure, responsive approach, component styles, JavaScript behaviors. The residential site then benefits from proven patterns and can be built significantly faster.

## Scalability Considerations

| Concern | 2 Demo Sites (Now) | 5+ Sites (Hypothetical) | Production |
|---------|---------------------|------------------------|------------|
| Shared CSS | Manual copy | Sync script essential | Consider a build step or npm workspace |
| Deployment | Two Vercel projects | 5+ projects from one repo (Vercel supports this) | Same approach works |
| Content updates | Edit HTML directly | Needs a CMS or templating | Static site generator (11ty, Astro) |
| Image optimization | Manual optimization | Vercel Image Optimization | Vercel Image Optimization |
| Contact forms | Placeholder | Form service integration | Serverless function or form service |

For the current scope (two demo sites), the vanilla approach is ideal. If the client later wants ongoing content management, the natural evolution path is to Astro or 11ty (both deploy to Vercel trivially), not to add build tooling to vanilla HTML.

## Sources

- Vercel Monorepos Documentation: https://vercel.com/docs/monorepos (verified 2026-02-13)
  - Root Directory isolation constraint confirmed
  - Monorepo project creation workflow documented
- Vercel Project Configuration: https://vercel.com/docs/project-configuration/vercel-json (verified 2026-02-13)
  - `cleanUrls`, `trailingSlash`, `headers` configuration verified
  - `framework: null` for "Other" preset confirmed
- Vercel Build Configuration: https://vercel.com/docs/deployments/configure-a-build (verified 2026-02-13)
  - Skip Build Step workflow for plain HTML confirmed
  - "Other" framework preset behavior documented
  - Root Directory constraint: "Your app will not be able to access files outside of that directory"
- CSS Custom Properties: MDN Web Docs (training knowledge, HIGH confidence -- stable web platform feature)
- CSS Nesting: Training knowledge, MEDIUM confidence -- native CSS nesting shipped in all major browsers mid-2023+
