# Technical Defaults

## Architecture

- **Framework:** Vanilla HTML/CSS/JavaScript (no React, Vue, or framework)
- **Build System:** None - direct file editing and browser refresh
- **Deployment:** Vercel (automatic deployment on push to main)
- **Repository:** Single repo covering both sites (`commercial/` and `residential/`)

## Project Structure

```
/Users/dillonhippensteel/clients/angies-custom-cleaning/
├── commercial/          # Commercial cleaning site
│   ├── index.html      # Main HTML file
│   ├── css/            # Modular CSS files
│   ├── js/             # JavaScript files
│   └── images/         # Images and assets
├── residential/        # Residential cleaning site
│   ├── index.html      # Main HTML file
│   ├── css/            # Modular CSS files
│   ├── js/             # JavaScript files
│   └── images/         # Images and assets
├── shared/             # Shared CSS/resources
├── docs/               # Documentation and brand assets
│   └── brand-assets/   # Logos, colors, reference materials
└── .tmp/               # Scratch files (gitignored)
```

## CSS Architecture

**Design Token System:**
- All design tokens defined in `css/variables.css`
- Custom properties for colors, spacing, typography, shadows, transitions
- Mobile-first responsive design approach

**CSS Load Order:**
1. `reset.css` - CSS reset for consistent cross-browser baseline
2. `variables.css` - Design tokens (colors, spacing, typography, shadows)
3. `base.css` - Base HTML element styles
4. `utilities.css` - Layout utilities, buttons, cards
5. `commercial.css` or `residential.css` - Site-specific styles
6. `components.css` - Reusable component patterns
7. `aurora.css` - Aurora background effect
8. `awards-slider.css` - Infinite awards slider

**Spacing System:**
- Use CSS custom properties from `css/variables.css`
- `--space-xs` through `--space-4xl`
- Consistent spacing scale across both sites

**Breakpoints:**
- **Mobile:** < 768px (default)
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

## Shared Patterns

Both sites use these common patterns:
- **AOS (Animate On Scroll)** - v2.3.4 via CDN for scroll animations
- **CountUp.js** - Animated counters for statistics (via CDN)
- **Awards Slider** - Infinite horizontal scroll of award badges
- **Aurora Background** - Animated gradient effect in hero sections
- **Hamburger Menu** - Mobile navigation (< 768px)
- **Mobile CTA Bar** - Fixed bottom call-to-action on mobile

## Browser Support

- **Target:** Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **Progressive Enhancement:** Graceful degradation for older browsers
- **Feature Detection:** Use `@supports` for advanced CSS features
- **Critical Features:**
  - CSS Custom Properties (required)
  - CSS Grid and Flexbox (required)
  - backdrop-filter (progressive enhancement)
  - CSS animations (progressive enhancement)

## Image Handling

**Format Strategy:**
- Use WebP with PNG fallback via `<picture>` element
- Example:
  ```html
  <picture>
    <source srcset="images/logo.webp" type="image/webp">
    <img src="images/logo.png" alt="Description" width="200" height="80">
  </picture>
  ```

**Optimization:**
- Optimize images before adding to project
- Use appropriate dimensions (don't serve oversized images)
- Include `width` and `height` attributes to prevent layout shift
- Use `loading="lazy"` for below-the-fold images

**Asset Locations:**
- Site-specific images: `commercial/images/` or `residential/images/`
- Award badges: `images/awards/`
- Brand assets reference: `docs/brand-assets/`
- Gift card images (residential only): `residential/images/gift-cards/`

## JavaScript

**Approach:**
- Vanilla JavaScript (no jQuery or frameworks)
- Progressive enhancement - site works without JS
- External libraries loaded via CDN with `defer` attribute
- Site-specific JS in `js/main.js`

**External Dependencies:**
- AOS: `https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js`
- CountUp.js: `https://cdn.jsdelivr.net/npm/countup@2.8.0/dist/countUp.min.js`
- Custom: `js/main.js`, `js/awards-slider.js`

## Git Workflow

**Commit Strategy:**
- Work on one site at a time (`commercial/` or `residential/`)
- Don't mix changes across sites unless sharing a component
- Commit messages format: `verb: what changed and which site`
  - Examples:
    - `feat: add contact form to commercial site`
    - `fix: mobile navigation on residential site`
    - `style: improve hero spacing on both sites`

**Commit Attribution:**
- Include co-author attribution:
  ```
  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```

**Git Conventions:**
- Don't commit `.tmp/`, `node_modules/`, `.DS_Store`
- `.gitignore` is configured appropriately

## Deployment

**Platform:** Vercel

**Process:**
1. Push to `main` branch
2. Vercel automatically deploys both sites
3. Verify deployment in Vercel dashboard or via CLI
4. Test deployed sites on mobile device or browser DevTools

**Post-Deployment Verification:**
- Check both site URLs are accessible
- Test on mobile device (or DevTools mobile emulation)
- Run Lighthouse audit if significant changes made
- Update PROJECT.md with deployment notes if needed

**Site URLs:**
- Commercial: angiescommercialcleaning.com
- Residential: angiescustomcleaning.com

## Performance Standards

**Target Metrics:**
- **Load Time:** < 3s on 3G
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)

**Optimization Techniques:**
- Minimize CSS/JS file sizes
- Optimize images (WebP, appropriate dimensions)
- Use CDN for external libraries
- Implement lazy loading for below-the-fold images
- Avoid render-blocking resources
- Use font-display: swap for web fonts
