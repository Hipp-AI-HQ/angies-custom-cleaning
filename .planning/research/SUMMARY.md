# Project Research Summary

**Project:** Angie's Custom Cleaning Demo Sites
**Domain:** Static marketing websites for local cleaning service (commercial + residential)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Executive Summary

This project builds two demo marketing websites (commercial cleaning and residential cleaning) to win a client in Lancaster, PA who was burned by a previous developer. The sites are static HTML/CSS/JS with zero build tools, deployed via GitHub to Vercel. This is an extremely well-understood pattern: vanilla web technologies, a CSS custom properties design system shared between two sites in a monorepo, inline SVG icons, Google Fonts, and AOS for scroll animations. The total external dependency count is three (Google Fonts CDN, AOS JS, AOS CSS). Every technology choice is mature, stable, and high-confidence.

The recommended approach is to build a shared design system first (CSS variables for colors, typography, spacing), then build the commercial site as the "first pass" that establishes all layout patterns, then clone that structure for the residential site with content and tone adjustments. Each site is a single-page scrolling design with anchor navigation -- hero, services, trust signals, about, contact, footer. The Vercel deployment uses two separate projects pointing to subdirectories in the same repo, with shared CSS files copied into each site directory (Vercel prevents cross-directory file access).

The dominant risk is not technical -- it is strategic. This is a sales demo, not a dev project. The client will judge the work in under 30 seconds on her phone. The top risks are: looking like a generic template (use her real content, awards, and Lancaster references from day one), broken mobile experience (build mobile-first literally), placeholder content left in (content-first approach, no lorem ipsum ever), slow load times (static HTML solves this inherently, but images must be optimized), and buried trust signals (her Angie's List awards and background-checked staff badges must be above the fold). Every design decision should pass one test: "Will this make Angie want to hire us?"

## Key Findings

### Recommended Stack

Vanilla HTML5/CSS3/JS with no framework, no build tools, and no preprocessors. Modern CSS features (custom properties, flexbox, grid, `clamp()` for fluid typography) eliminate the need for Sass or utility frameworks. The sites are small enough that a handful of CSS files per site is manageable and performant.

**Core technologies:**
- **HTML5 (semantic):** Page structure with `<section>`, `<nav>`, `<main>` -- accessibility and SEO baked in
- **CSS3 with Custom Properties:** Brand theming, spacing scale, fluid typography via `clamp()` -- no preprocessor needed
- **Vanilla JS (ES6+):** Mobile nav toggle, AOS initialization, form UX -- approximately 50 lines total
- **Google Fonts (Nunito + Open Sans):** Warm/friendly headings + readable body text, loaded via CDN with `display=swap` and `preconnect`
- **Lucide Icons (inline SVG):** ~15-20 icons copied as inline SVGs -- zero external requests, fully CSS-styleable
- **AOS v2.3.4 (CDN):** Scroll-triggered fade/slide animations via `data-aos` attributes -- massive visual impact for zero complexity
- **WebP images:** Manually optimized before commit, responsive via `<picture>` and `srcset`
- **Vercel:** Static hosting with auto-deploy on push to main, two projects from one repo

**Performance targets:** Lighthouse 95+, FCP < 1.0s, LCP < 2.0s, total page weight < 800KB.

### Expected Features

**Must have (table stakes -- demo is incomplete without these):**
- Sticky header with tap-to-call phone number (primary conversion element)
- Hero section with clear headline, subheadline, and CTA button
- Services grid (3-4 cards with icons, titles, brief descriptions)
- Trust signals strip (Angie's List award, Reader's Choice, background-checked, years in business)
- Contact section with phone, address, hours, and form UI
- Footer with full contact info and service area
- Mobile-responsive layout (60%+ of local service searches are mobile)

**Should have (makes demo significantly more impressive):**
- About section with Angie's founder story (differentiates from franchises)
- "Why Choose Us" icon grid (insured, bonded, background-checked, locally owned)
- "How It Works" process steps (reduces hiring anxiety)
- Testimonials (2-3 attributed quotes)
- Animated statistics strip (years in business, clients served -- count-up on scroll)
- Subtle scroll animations (AOS fade-up on sections)
- Gift Cards teaser section (residential site only -- acknowledge the feature without building e-commerce)
- Sticky mobile CTA bar ("Call Now" fixed at bottom of mobile viewport)

**Defer (production, not demo):**
- Working contact form submission (style the form, wire it up later with Formspree)
- E-commerce / gift card purchasing (WooCommerce replacement)
- Blog, SEO meta tags, structured data
- Online booking / scheduling integration
- Pricing pages or calculators
- Accessibility compliance audit (use semantic HTML naturally, but skip formal WCAG audit)

### Architecture Approach

Two independent static sites in a monorepo (`commercial/` and `residential/`), each self-contained and deployable as a separate Vercel project. A `shared/` directory at the repo root holds the design system source files (CSS variables, reset, base styles, utilities), which are copied into each site's `css/` directory before deployment. This copy-based approach is required because Vercel's Root Directory isolation prevents cross-directory file access at deploy time.

**Major components:**
1. **`shared/css/`** -- Design system source of truth: `variables.css` (brand tokens), `reset.css`, `base.css`, `utilities.css`
2. **`{site}/css/`** -- Shared CSS (copied) + site-specific `components.css` and `layout.css`
3. **`{site}/index.html`** -- Single-page structure with anchor-linked sections
4. **`{site}/js/main.js`** -- Mobile nav toggle, smooth scroll, AOS init (~50 lines)
5. **`{site}/vercel.json`** -- Clean URLs, security headers, cache headers on static assets

**Key patterns:** Single-page section architecture, BEM-inspired CSS naming, component-based CSS organization, progressive enhancement (sites work fully without JS), mobile-first responsive strategy with three breakpoints (375px baseline, 768px tablet, 1024px desktop).

### Critical Pitfalls

1. **"Template Site" feel** -- Use Angie's real content (service names, awards, Lancaster references) as the design driver. If you could swap in another company's name and the site would still work, it is too generic. No stock photos of people in aprons.
2. **Broken mobile experience** -- Build mobile-first literally. Test at 375px wide. Tap targets 44x44px minimum. Phone number must be a `tel:` link. Test on a real phone before sending, not just DevTools.
3. **Placeholder content left in** -- Extract all real content from her current sites BEFORE building layouts. No lorem ipsum. The only acceptable placeholder is the contact form, explicitly labeled as a demo feature.
4. **Slow first load** -- Static HTML inherently solves this, but images must be WebP and sized to display dimensions. Total first load under 500KB. Hero image under 150KB. Use `font-display: swap`.
5. **Buried trust signals** -- Awards and credentials must be visible within the first scroll. Treat trust signals as primary content, not supporting material. A dedicated trust bar immediately below the hero.

**Meta-pitfall:** This is a sales conversation, not a dev project. Angie cares about: Does it look better than what she has? Does it show MY business? Does it work on my phone? Can customers find my phone number? Does this person finish what they start?

## Implications for Roadmap

Based on combined research, the build should follow five phases. The first three phases are sequential dependencies; the last two can be parallelized or reordered.

### Phase 1: Content Extraction and Design System
**Rationale:** Research unanimously identifies content-first as non-negotiable. The "template feel" pitfall (Critical #1) and "placeholder content" pitfall (Critical #3) both stem from designing before having real content. The shared design system must exist before either site is built (Architecture Phase 1, Pitfall #6 about brand consistency).
**Delivers:** All real content extracted from current sites (service names, descriptions, award badges, contact info, Angie's story). Shared CSS design system (`variables.css`, `reset.css`, `base.css`, `utilities.css`) with finalized brand colors, typography (Nunito + Open Sans), and spacing scale.
**Addresses:** Table stakes content requirements, brand consistency across sites
**Avoids:** Template feel (Pitfall #1), placeholder content (Pitfall #3), inconsistent brand between sites (Pitfall #6), ignoring what current sites do right (Pitfall #9)

### Phase 2: Commercial Site Build
**Rationale:** Architecture research recommends building commercial first because it establishes all layout patterns: header, hero, services grid, trust strip, about, contact, footer. The residential site then benefits from proven patterns and builds faster. Commercial site is also likely the simpler of the two (no gift cards section).
**Delivers:** Complete, polished commercial site at a Vercel URL. Single-page scrolling design with all table stakes sections, responsive from 375px to 1280px+.
**Uses:** Full stack (HTML5, CSS custom properties, Lucide inline SVGs, AOS, Google Fonts, WebP images)
**Implements:** Single-page section architecture, BEM CSS, mobile-first responsive, progressive enhancement
**Avoids:** Broken mobile (Pitfall #2), slow load (Pitfall #4), buried trust signals (Pitfall #5), over-designed/under-informative (Pitfall #7)

### Phase 3: Residential Site Build
**Rationale:** Clone commercial site structure, replace content and adjust tone. Residential site is warmer/friendlier in copy and visual treatment. Includes gift cards teaser section that commercial does not have. This phase is faster than Phase 2 because all patterns are established.
**Delivers:** Complete residential site at a separate Vercel URL. Same quality and responsiveness as commercial, with residential-specific content, warmer tone, and gift cards acknowledgment.
**Addresses:** Residential-specific features (gift cards teaser, warmer "Why Choose Us," homeowner testimonials)
**Avoids:** Sites not feeling like same company (Pitfall #6), gift cards handled poorly (Pitfall #11)

### Phase 4: Polish and Differentiators
**Rationale:** With both sites functional and content-complete, this phase adds the "wow factor" that makes the demo feel premium: animated statistics counters, refined scroll animations, sticky mobile CTA bar, before/after image showcase (if photos available). This is where the demo goes from "competent" to "impressive."
**Delivers:** Visual polish layer across both sites. Scroll animations tuned, micro-interactions refined, statistics counters animated, sticky mobile CTA added.
**Addresses:** Differentiator features (animated stats, before/after, sticky mobile CTA, FAQ accordion if time allows)

### Phase 5: Deployment, Testing, and Delivery
**Rationale:** Final quality gate before sending to the client. Real-device mobile testing, Lighthouse audit, Vercel project naming for clean URLs, and preparation of the delivery email. This phase addresses the "meta-pitfall" -- framing the demo as a sales conversation.
**Delivers:** Two production-ready demo URLs with professional Vercel project names. Both sites tested on real mobile devices. Performance verified.
**Avoids:** Vercel URL looks sketchy (Pitfall #15), no clear framing (Pitfall #10), any remaining mobile issues (Pitfall #2)

### Phase Ordering Rationale

- **Content before design:** Research is unanimous that content-first prevents the two most damaging pitfalls (template feel, placeholder content). Content extraction is a hard dependency for everything else.
- **Design system before sites:** The shared CSS must be defined once and copied to both sites. Building a site before the design system means rework.
- **Commercial before residential:** Architecture research explicitly recommends this -- commercial establishes patterns, residential reuses them. Building in parallel would mean solving every problem twice.
- **Polish after functionality:** AOS animations, counter effects, and micro-interactions are the "cherry on top." They should not be attempted until both sites are content-complete and mobile-responsive.
- **Testing last:** Real-device testing and Lighthouse audits belong at the end, after all content and polish is in place.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Content Extraction):** Needs careful inventory of both current sites. The existing sites should be crawled/screenshotted for all content, award badges, service descriptions, and imagery before they potentially go offline.
- **Phase 2 (Commercial Build):** May benefit from `/gsd:research-phase` for hero image strategy -- whether to use abstract design, gradient, or actual photos (stock photo pitfall is real).

Phases with standard patterns (skip additional research):
- **Phase 3 (Residential Build):** Follows commercial patterns exactly. No new technical challenges.
- **Phase 4 (Polish):** AOS configuration and CSS animations are well-documented. Standard implementation.
- **Phase 5 (Deployment):** Vercel static deployment is zero-config. Architecture research already verified the monorepo setup against official docs.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Vanilla HTML/CSS/JS is the most well-understood web pattern. All recommended tools (AOS, Google Fonts, Lucide) are mature and stable. |
| Features | MEDIUM-HIGH | Feature recommendations based on training data synthesis of cleaning industry sites. Patterns are stable in this industry. No live competitor analysis was possible. |
| Architecture | HIGH | Monorepo deployment verified against Vercel official documentation. Root Directory isolation constraint confirmed. CSS custom properties design system is established practice. |
| Pitfalls | HIGH | Grounded in specific project context (client burned by previous developer, demo-as-sales-tool framing). Domain patterns for local service business sites are well-established. |

**Overall confidence:** HIGH

### Gaps to Address

- **AOS version verification:** Confirm v2.3.4 is still current on unpkg/cdnjs before implementation. Check CDN URL validity.
- **CSS nesting browser support:** Was ~90% at research time. Verify it has reached 95%+ before relying on it. If not, use traditional nested selectors.
- **Brand color accuracy:** The CSS variable colors in STACK.md and ARCHITECTURE.md are estimates. Actual brand colors should be sampled from current sites or brand assets in `docs/brand-assets/`.
- **Image sourcing strategy:** Research flags the stock photo pitfall but does not resolve what images to use. Need to decide: abstract/gradient hero backgrounds, photos from current sites, or carefully selected non-generic imagery.
- **Content extraction completeness:** Both current sites need to be inventoried for all text content, award badges, and imagery before building begins. This has not been done yet and is a Phase 1 dependency.

## Sources

### Primary (HIGH confidence)
- Vercel Monorepos Documentation (https://vercel.com/docs/monorepos) -- Root Directory isolation, multi-project setup
- Vercel Project Configuration (https://vercel.com/docs/project-configuration/vercel-json) -- cleanUrls, headers, caching
- Vercel Build Configuration (https://vercel.com/docs/deployments/configure-a-build) -- skip build step for static HTML
- Project documentation (PROJECT.md, CLAUDE.md, docs/requirements.md) -- all project-specific context and constraints

### Secondary (MEDIUM confidence)
- Training data synthesis of cleaning industry website patterns (Molly Maid, Merry Maids, The Maids, local cleaning sites) -- feature landscape, conversion patterns, color psychology
- MDN Web Docs (training knowledge) -- CSS custom properties, flexbox, grid, clamp(), browser support data
- Established web design patterns -- BEM naming, mobile-first responsive, progressive enhancement

### Tertiary (LOW confidence)
- CSS nesting browser support (~90% at research time, evolving rapidly) -- verify before relying on native nesting
- Scroll-driven CSS animations (~75% support) -- not recommended for this project, but noted as future option
- `text-wrap: balance` support -- verify before using on headings

---
*Research completed: 2026-02-13*
*Ready for roadmap: yes*
