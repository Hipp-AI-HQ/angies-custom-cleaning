# Phase 5: Deployment & Testing - Research

**Researched:** 2026-02-13
**Domain:** Static site deployment and performance testing
**Confidence:** HIGH

## Summary

This research covers deploying static HTML/CSS/JS sites to Vercel and achieving 90+ Lighthouse Performance scores. The standard approach is straightforward: use Vercel's GitHub integration for automatic deployments, configure clean project names for professional URLs, optimize assets for performance, and validate on real mobile devices.

Vercel excels at static site hosting with zero configuration required, automatic HTTPS, global CDN, and instant rollbacks. The platform automatically assigns `.vercel.app` subdomains based on project names, making clean naming critical upfront. For static sites without build steps, Vercel serves files directly from the root or specified output directory.

Lighthouse Performance scoring is weighted heavily toward Largest Contentful Paint (25%) and Total Blocking Time (30%). Achieving 90+ requires LCP under 2.5s on mobile and 1.2s on desktop. Static sites have natural advantages: no server-side rendering delays, minimal JavaScript, and cacheable assets. The main optimization targets are image formats (WebP/AVIF), font loading (font-display: swap), and CDN-delivered dependencies (AOS, CountUp.js).

Real device testing catches issues that emulators miss: viewport rendering, touch interactions (tap-to-call), sticky header behavior, and actual network conditions. Chrome DevTools remote debugging provides full desktop-grade inspection on connected Android devices.

**Primary recommendation:** Deploy both sites via Vercel CLI with clean project names (`angies-commercial-cleaning`, `angies-residential-cleaning`), run Lighthouse audits in both mobile and desktop modes, optimize based on the metrics with highest weight (LCP and TBT), and validate all interactive elements on a real phone before delivery.

## Standard Stack

The established tools for static site deployment and testing:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vercel | Latest | Hosting platform | Industry standard for static/Jamstack sites; zero-config deployment, automatic HTTPS, global CDN, instant rollbacks, GitHub integration |
| Vercel CLI | Latest | Deployment tool | Official CLI for project deployment, linking, and management |
| Lighthouse | 12.x | Performance audit | Google's official performance measurement tool; used by PageSpeed Insights, integrated into Chrome DevTools |
| Chrome DevTools | Latest | Mobile debugging | Industry standard for remote debugging real Android devices; full inspection capabilities |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| WebPageTest | N/A | Performance testing | When you need real-world device testing from multiple locations; complements Lighthouse |
| BrowserStack | N/A | Cross-device testing | When real device access isn't available; cloud-based device lab |
| Safari Web Inspector | Latest | iOS debugging | For debugging on real iPhone/iPad devices |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vercel | Netlify | Similar feature set; Netlify has built-in form handling, Vercel has better Next.js integration (not relevant here) |
| Vercel | GitHub Pages | Free but limited; no instant rollbacks, slower CDN, requires Jekyll or manual builds |
| Lighthouse | WebPageTest | More comprehensive but slower; Lighthouse is faster for iterative optimization |
| Chrome DevTools | BrowserStack | Cloud-based but costs money; local debugging is free and faster |

**Installation:**
```bash
# Vercel CLI (global install recommended)
npm install -g vercel

# No other installations needed for static sites
# Lighthouse is built into Chrome DevTools
# Chrome DevTools comes with Chrome
```

## Architecture Patterns

### Recommended Project Structure
For static sites on Vercel, the platform serves files from:
1. Root directory (default)
2. Specified output directory (via `outputDirectory` in vercel.json or dashboard settings)
3. `public/` directory (prioritized over root for organization)

Current project structure (already correct):
```
angies-custom-cleaning/
├── commercial/           # Commercial site (deploy as separate project)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── residential/          # Residential site (deploy as separate project)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
└── docs/                 # Not deployed
```

### Pattern 1: Two Separate Deployments
**What:** Deploy `commercial/` and `residential/` as separate Vercel projects
**When to use:** When sites need independent URLs and deployment histories (this use case)
**Example:**
```bash
# Deploy commercial site
cd commercial
vercel --prod --name angies-commercial-cleaning

# Deploy residential site
cd residential
vercel --prod --name angies-residential-cleaning
```

### Pattern 2: Project Naming for Clean URLs
**What:** Vercel automatically assigns `[project-name].vercel.app` URLs
**When to use:** Always - project name becomes the subdomain
**Example:**
```bash
# Project name: angies-commercial-cleaning
# URL: https://angies-commercial-cleaning.vercel.app

# Project name: angies-residential-cleaning
# URL: https://angies-residential-cleaning.vercel.app
```

### Pattern 3: vercel.json Configuration (Optional)
**What:** Configuration file to override defaults
**When to use:** Only if you need custom headers, redirects, or clean URLs
**Example:**
```json
// Source: https://vercel.com/docs/project-configuration
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
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

**Note:** For simple static sites with files in root directory, vercel.json is NOT required. Vercel auto-detects and serves correctly.

### Pattern 4: GitHub Integration for CI/CD
**What:** Connect GitHub repo to Vercel for automatic deployments
**When to use:** Always - enables preview deployments for PRs and automatic production deployments
**How it works:**
- Main branch commits → Production deployment
- PR commits → Preview deployment (unique URL per commit)
- Deployment history preserved for rollbacks

### Pattern 5: Lighthouse Audit Workflow
**What:** Test both mobile and desktop modes, focus on highest-weighted metrics
**When to use:** After deployment, before marking complete
**Example:**
```bash
# Chrome DevTools → Lighthouse tab
# 1. Run Mobile audit (default)
# 2. Change to Desktop mode
# 3. Run Desktop audit
# 4. Compare results
# 5. Focus on LCP (25%), TBT (30%), CLS (25%)
```

### Anti-Patterns to Avoid
- **Deploying from root with both sites:** Vercel can only deploy one site per project; must deploy separately
- **Random project names:** Project name determines URL; can't be changed easily later
- **Skipping desktop Lighthouse tests:** Desktop and mobile have different thresholds; test both
- **Testing only in Chrome DevTools device emulator:** Misses real viewport rendering, touch events, and network conditions
- **Optimizing for 100 score:** Diminishing returns after 90+; focus on real-world performance

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom script to convert/compress images | WebP/AVIF with proper HTML (`<picture>`, `srcset`) | Browser support detection, art direction, responsive images handled automatically |
| CDN caching | Custom cache headers | Vercel's automatic CDN | Vercel handles cache invalidation, edge network, and optimal cache headers |
| HTTPS/SSL | Manual certificate management | Vercel automatic HTTPS | Automatic certificate generation, renewal, and HTTPS redirects |
| Performance monitoring | Custom analytics | Lighthouse CI, Vercel Analytics, or Vercel Speed Insights | Historical tracking, real user monitoring, Web Vitals collection |
| Mobile device testing | Build custom emulator | Chrome DevTools remote debugging or BrowserStack | Real device rendering, touch events, actual network conditions |
| Build optimization | Custom build pipeline | Vercel's automatic optimization | Zero-config compression, minification, and edge caching |

**Key insight:** Vercel handles most deployment complexity automatically. The main tasks are: (1) proper asset optimization before deployment, (2) choosing good project names, (3) validating on real devices.

## Common Pitfalls

### Pitfall 1: Poor Project Naming
**What goes wrong:** Deploying with default or random project names results in ugly URLs like `my-app-xyz123.vercel.app`
**Why it happens:** Vercel derives project name from directory name or prompts during first deploy
**How to avoid:** Use `--name` flag during initial deployment: `vercel --prod --name angies-commercial-cleaning`
**Warning signs:** URL doesn't match brand; hard to remember or share

### Pitfall 2: 404 Errors After Deployment
**What goes wrong:** Site deploys successfully but shows 404 or missing files
**Why it happens:** Vercel can't find index.html; wrong output directory; files in wrong location
**How to avoid:**
- Ensure `index.html` exists in project root (or specified output directory)
- For static sites, don't specify build commands unless needed
- Check Vercel dashboard → Project Settings → Build & Output Settings
**Warning signs:** Deployment succeeds but URL shows 404 or Vercel error page

### Pitfall 3: Unoptimized Images Killing Performance
**What goes wrong:** Lighthouse scores 60-70 due to large image file sizes
**Why it happens:** Using original JPG/PNG files without compression or modern formats
**How to avoid:**
- Convert images to WebP (30% smaller than JPEG)
- Use `loading="lazy"` for below-fold images
- Use `fetchpriority="high"` for LCP image (hero image)
- Compress images before committing (tools: Squoosh, ImageOptim)
**Warning signs:** LCP metric above 2.5s; "Properly size images" in Lighthouse

### Pitfall 4: Render-Blocking CSS/JS
**What goes wrong:** Lighthouse TBT score suffers due to blocking resources
**Why it happens:** CSS in `<head>` blocks rendering; large JS files block main thread
**How to avoid:**
- Keep CSS in `<head>` (correct for critical styles)
- Load non-critical CSS with `<link rel="preload" as="style">`
- Defer non-critical JS with `<script defer>` or `<script async>`
- For CDN libraries (AOS, CountUp.js), use `defer` attribute
**Warning signs:** TBT above 300ms; FCP above 1.8s; "Eliminate render-blocking resources" in Lighthouse

### Pitfall 5: Font Loading Flash
**What goes wrong:** Text invisible until fonts load (FOIT); layout shift when fonts swap (CLS)
**Why it happens:** Browsers block text rendering while custom fonts download
**How to avoid:**
- Use `font-display: swap` in @font-face rules
- Preload critical fonts: `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
- Limit font families to 2-3 maximum
- Consider system fonts for body text
**Warning signs:** FCP poor; CLS above 0.1; visible text delay

### Pitfall 6: Mobile Testing in Emulator Only
**What goes wrong:** Site works in Chrome DevTools device mode but breaks on real phone
**Why it happens:** Emulators don't replicate real viewport rendering, touch events, or network conditions
**How to avoid:**
- Test on real iPhone and Android device
- Use Chrome DevTools remote debugging (Android)
- Use Safari Web Inspector (iOS)
- Test sticky header while scrolling
- Test tap-to-call links
- Test with real mobile network (not WiFi)
**Warning signs:** Desktop works but mobile has layout issues, touch targets too small, sticky header misbehaves

### Pitfall 7: Different Mobile vs Desktop Scores
**What goes wrong:** Desktop scores 95+ but mobile scores 70
**Why it happens:** Lighthouse uses different thresholds; mobile includes CPU/network throttling
**How to avoid:**
- Run both mobile and desktop audits
- Mobile thresholds are stricter (LCP <2.5s mobile vs <1.2s desktop)
- Optimize for mobile first
- Test with "Slow 4G" throttling in DevTools
**Warning signs:** Desktop score much higher than mobile; metrics differ significantly

### Pitfall 8: Sticky Header Issues on Mobile
**What goes wrong:** Sticky header works on desktop but doesn't stick on mobile Safari
**Why it happens:** Parent overflow, missing webkit prefix, viewport meta tag issues
**How to avoid:**
- Use both `position: sticky` and `position: -webkit-sticky`
- Ensure no parent has `overflow: hidden` or `overflow: auto`
- Include viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Test on real iOS device (Safari-specific rendering)
**Warning signs:** Sticky works in Chrome DevTools but not on iPhone

### Pitfall 9: Tap-to-Call Not Working
**What goes wrong:** Phone number links don't dial on mobile
**Why it happens:** Wrong tel: link format; spaces or dashes in number
**How to avoid:**
- Use international format: `tel:+14155551234` (no spaces, dashes, or parentheses)
- No space between "tel:" and number
- Test on real mobile device (click should open dialer)
**Warning signs:** Link doesn't trigger phone dialer; no response on tap

### Pitfall 10: CDN Library Performance Impact
**What goes wrong:** AOS or CountUp.js slows down page load
**Why it happens:** Synchronous script loading blocks parsing; too many animations at once
**How to avoid:**
- Use `defer` attribute on script tags: `<script src="aos.js" defer></script>`
- Limit concurrent animations (use `data-aos-delay` for stagger)
- Keep animation duration 400-1200ms
- Initialize libraries after DOMContentLoaded
**Warning signs:** TBT high; animations janky; FCP delayed

## Code Examples

Verified patterns from official sources:

### Vercel Deployment Commands
```bash
# Source: https://vercel.com/docs/cli/deploy

# Initial deployment with specific project name
vercel --prod --name angies-commercial-cleaning

# Subsequent deployments (after linking)
vercel --prod

# Preview deployment (test before production)
vercel

# Check deployment status
vercel ls

# Open project in dashboard
vercel open
```

### vercel.json (Optional - Only If Needed)
```json
// Source: https://vercel.com/docs/project-configuration
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### Optimized Image Loading
```html
<!-- Source: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS -->

<!-- LCP image (hero) - prioritize -->
<img
  src="hero.webp"
  alt="Commercial cleaning service"
  fetchpriority="high"
  width="1200"
  height="600"
>

<!-- Below-fold images - lazy load -->
<img
  src="service-photo.webp"
  alt="Office cleaning"
  loading="lazy"
  width="800"
  height="600"
>

<!-- Responsive images with WebP -->
<picture>
  <source srcset="hero.webp" type="image/webp">
  <source srcset="hero.jpg" type="image/jpeg">
  <img src="hero.jpg" alt="Hero image">
</picture>
```

### Font Optimization
```css
/* Source: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS */

@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Prevents invisible text */
  font-weight: 400;
  font-style: normal;
}

/* Preload critical font in HTML */
/* <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin> */
```

### CDN Library Loading (Optimized)
```html
<!-- Source: https://michalsnik.github.io/aos/ -->

<!-- AOS CSS -->
<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">

<!-- Defer JS to prevent render blocking -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.min.js" defer></script>

<!-- Initialize after DOMContentLoaded -->
<script defer>
  document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      once: true, // Animate only once (better performance)
      offset: 100
    });
  });
</script>
```

### Tap-to-Call Links
```html
<!-- Source: https://web.dev/articles/click-to-call -->

<!-- Correct format: international, no spaces/dashes -->
<a href="tel:+17175551234">Call Us: (717) 555-1234</a>

<!-- Multiple numbers -->
<a href="tel:+17175551234">Main Office</a>
<a href="tel:+17175555678">Emergency Line</a>
```

### Sticky Header (Mobile-Safe)
```css
/* Source: https://www.codestudy.net/blog/how-to-enable-css-position-sticky-in-mobile-browsers/ */

header {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 100;
  /* CRITICAL: No parent should have overflow: hidden/auto/scroll */
}

/* Viewport meta tag required in HTML */
/* <meta name="viewport" content="width=device-width, initial-scale=1"> */
```

### Chrome Remote Debugging Setup
```bash
# Source: https://developer.chrome.com/docs/devtools/remote-debugging

# 1. On Android device:
#    Settings → Developer Options → Enable USB Debugging

# 2. Connect device via USB to computer

# 3. On desktop Chrome:
#    Navigate to: chrome://inspect#devices

# 4. Ensure "Discover USB devices" is checked

# 5. Click "Inspect" next to your device

# 6. DevTools opens with full access to mobile browser
```

### Lighthouse CLI (Programmatic Testing)
```bash
# Source: https://developer.chrome.com/docs/lighthouse/performance/performance-scoring

# Install Lighthouse globally
npm install -g lighthouse

# Run mobile audit
lighthouse https://angies-commercial-cleaning.vercel.app --output=html --output-path=report-mobile.html

# Run desktop audit
lighthouse https://angies-commercial-cleaning.vercel.app --output=html --output-path=report-desktop.html --preset=desktop

# Run with specific categories
lighthouse https://example.com --only-categories=performance,accessibility

# CI/CD integration
lighthouse https://example.com --output=json --quiet
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JPEG/PNG only | WebP/AVIF with fallbacks | 2020-2023 | 30-60% file size reduction; WebP has 95%+ browser support |
| Manual HTTPS setup | Automatic HTTPS (Vercel, Netlify) | 2018+ | Zero configuration; automatic cert renewal |
| FTP deployment | Git-based deployment | 2015+ | Atomic deployments, instant rollbacks, preview environments |
| jQuery for animations | CSS animations + Intersection Observer | 2017+ | Hardware-accelerated; no blocking JavaScript |
| `font-display: auto` | `font-display: swap` | 2018+ | Prevents invisible text (FOIT); improves FCP |
| Device emulators only | Chrome DevTools remote debugging | 2013+ (improved 2020+) | Full DevTools access on real devices; accurate testing |
| Lighthouse v6 | Lighthouse v12 | 2024 | Different metric weights; TBT now 30% (was 25%), stricter mobile/desktop thresholds |
| Single Lighthouse score | Separate mobile/desktop scores | 2020+ | More accurate; mobile has stricter thresholds |

**Deprecated/outdated:**
- **FTP deployment:** Replaced by Git-based deployment (Vercel, Netlify)
- **Manual SSL certificates:** Replaced by automatic HTTPS (Let's Encrypt integration)
- **PageSpeed Insights v4 API:** Replaced by Lighthouse-based PageSpeed Insights v5+ (2018)
- **Device emulators for final testing:** Supplement with real device testing
- **Optimizing for 100 Lighthouse score:** Focus on 90+ (diminishing returns after 90)

## Open Questions

Things that couldn't be fully resolved:

1. **AOS and CountUp.js specific performance impact**
   - What we know: Both are lightweight (6-13 KB for AOS, small for CountUp.js); should use `defer` attribute
   - What's unclear: Exact performance impact on this specific implementation; whether to initialize after page load vs DOMContentLoaded
   - Recommendation: Test Lighthouse before and after adding libraries; if TBT suffers, initialize in `requestIdleCallback` or after page load

2. **Vercel free tier limits for two sites**
   - What we know: Vercel free tier allows unlimited projects and deployments
   - What's unclear: Bandwidth limits, build minute limits (documentation suggests generous limits but doesn't specify exact numbers for demo sites)
   - Recommendation: Deploy both sites; monitor Vercel dashboard for usage; upgrade only if limits hit (unlikely for demo sites with low traffic)

3. **Real device testing accessibility**
   - What we know: Chrome DevTools remote debugging works for Android; Safari Web Inspector for iOS
   - What's unclear: Whether developer has access to both iOS and Android devices
   - Recommendation: Minimum test on one real device (either platform); use BrowserStack for additional device testing if needed (free trial available)

4. **Custom domain setup for demos**
   - What we know: Vercel supports custom domains; requires DNS configuration
   - What's unclear: Whether client wants custom domains before demo delivery or if `.vercel.app` subdomains are acceptable
   - Recommendation: Deliver with clean `.vercel.app` URLs (e.g., `angies-commercial-cleaning.vercel.app`); document custom domain setup for later if client wants to use their domains

## Sources

### Primary (HIGH confidence)
- [Vercel Deployments Documentation](https://vercel.com/docs/deployments) - Official deployment guide
- [Vercel Domains Documentation](https://vercel.com/docs/domains/working-with-domains) - Project naming and URL structure
- [Vercel CLI Documentation](https://vercel.com/docs/cli) - Command reference
- [Vercel Project Configuration](https://vercel.com/docs/project-configuration) - vercel.json options
- [Chrome DevTools Remote Debugging](https://developer.chrome.com/docs/devtools/remote-debugging) - Official mobile debugging guide
- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) - Metric weights and thresholds
- [MDN: CSS Performance Optimization](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS) - Official optimization guide
- [Web.dev: Click to Call](https://web.dev/articles/click-to-call) - Google's official tap-to-call guide

### Secondary (MEDIUM confidence)
- [DebugBear: Lighthouse Performance Score](https://www.debugbear.com/docs/metrics/lighthouse-performance) - Detailed metric analysis (verified with official docs)
- [DebugBear: Remote Debugging Mobile Websites](https://www.debugbear.com/blog/debugging-mobile-websites) - Chrome DevTools guide (verified with official docs)
- [AOS GitHub Repository](https://github.com/michalsnik/aos) - Official AOS documentation
- [AOS Official Site](https://michalsnik.github.io/aos/) - Library documentation
- [How to Deploy a Static HTML, CSS, and Javascript Website to Vercel](https://stefankudla.com/posts/how-to-deploy-a-static-html-css-and-javascript-website-to-vercel) - Practical guide
- [Frontend Performance Checklist 2025](https://crystallize.com/blog/frontend-performance-checklist) - Current best practices
- [Frontend Performance Checklist 2025 (Strapi)](https://strapi.io/blog/frontend-performance-checklist) - Cross-verified practices

### Tertiary (LOW confidence - requires validation)
- Various Medium articles on Vercel deployment (general guidance, not specific technical details)
- Community forum posts on sticky header mobile issues (identified common problems, should be verified during implementation)
- Third-party blog posts on Lighthouse optimization (general strategies already verified with official documentation)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Vercel and Lighthouse are industry standards with extensive official documentation
- Architecture: HIGH - Deployment patterns verified through official Vercel documentation and common static site practices
- Pitfalls: MEDIUM to HIGH - Common issues verified through official troubleshooting docs and multiple community sources; mobile-specific issues should be validated during implementation
- Performance optimization: HIGH - Based on official Chrome/Web.dev documentation and verified metric weights
- Mobile testing: HIGH - Chrome DevTools remote debugging is well-documented official approach

**Research date:** 2026-02-13
**Valid until:** 60 days (Vercel and Lighthouse are stable; performance best practices evolve slowly)

**Research scope covered:**
- ✅ Vercel deployment process and configuration
- ✅ Project naming for clean URLs
- ✅ Lighthouse Performance metrics and thresholds (mobile vs desktop)
- ✅ Image and font optimization strategies
- ✅ CDN library performance (AOS, CountUp.js)
- ✅ Real device testing approaches (Chrome DevTools, Safari Web Inspector)
- ✅ Common deployment pitfalls and solutions
- ✅ Mobile-specific issues (sticky headers, tap-to-call)
- ✅ Performance audit workflow

**Out of scope:**
- Custom domain DNS configuration (defer until client decides)
- Advanced Vercel features (edge functions, middleware) - not needed for static sites
- Complex build pipelines - sites are already built (no frameworks)
- Analytics setup - not required for demo delivery
