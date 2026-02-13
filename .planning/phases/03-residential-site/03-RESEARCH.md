# Phase 3: Residential Site - Research

**Researched:** 2026-02-13
**Domain:** Residential cleaning single-page site (static HTML/CSS/JS) with gift cards showcase
**Confidence:** HIGH

## Summary

Phase 3 builds a residential cleaning website that mirrors the commercial site's structure (Phase 2) but with a warmer, home-focused tone and a unique gift cards showcase section. The research confirms that the established Phase 2 architecture (semantic HTML5, CSS Grid, sticky header, CountUp.js statistics) can be directly reused with content-level customization. The primary technical challenge is designing a gift card section that showcases pricing tiers and visual card designs without e-commerce checkout functionality—best solved through clear informational displays with offline purchase instructions.

Residential cleaning sites differentiate from commercial through language that emphasizes personal benefits ("more time with family"), trust-building with homeowner testimonials, and warmer visual tone while maintaining shared brand identity. Services differ substantially: residential focuses on regular cleaning, deep cleaning, and move-in/out cleaning (vs. commercial's office, carpet, and floor services). The gift cards section should use a dedicated landing-page-style layout with visual card designs, pricing tiers ($25/$50/$100/$150 standard increments), clear purchase instructions (call to order), and FAQ addressing expiration/usage.

**Primary recommendation:** Duplicate Phase 2's HTML/CSS/JS structure as foundation, customize content for residential tone and services (regular/deep/move-in-out), create gift cards section as visually distinct showcase area with card mockup designs and informational pricing display (no checkout), differentiate through warmer language and homeowner-focused testimonials while maintaining shared design system.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Semantic HTML5 | Current | Document structure, accessibility, SEO | Same as Phase 2 - proven pattern |
| CSS Grid + Flexbox | Current | Responsive layouts | Phase 2 established responsive patterns |
| CSS Custom Properties | Current | Design tokens (shared/css/variables.css) | 47 properties define entire design system |
| WebP images | Current | Image optimization | Phase 2 established WebP primary with PNG/JPG fallbacks |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CountUp.js | 2.8+ (CDN) | Animated statistics counter | Reuse Phase 2 implementation - same functionality needed |
| Tabler Icons | 5900+ icons | Service card icons (residential services) | Free SVG icons for home/cleaning iconography |
| Google Fonts | Current | Nunito (headings) + Open Sans (body) | Phase 2 already loaded these - reuse font stack |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Reuse Phase 2 structure | Build from scratch | Building from scratch wastes effort - 90% of structure is reusable |
| Informational gift card section | Integrate Stripe/Square checkout | E-commerce adds complexity unnecessary for demo - defer to production |
| Manual content extraction | Scrape WordPress API | Manual extraction more reliable for small content volume |

**Installation:**
```bash
# No new dependencies - reuse Phase 2 stack
# CountUp.js already loaded via CDN in Phase 2
# CSS variables already defined in shared/css/variables.css
# Only new requirement: residential service icons from Tabler
```

## Architecture Patterns

### Recommended Project Structure
```
residential/
├── index.html           # Single-page site, semantic sections (duplicate Phase 2 structure)
├── css/
│   ├── reset.css        # Copy from shared/ (same as commercial)
│   ├── variables.css    # Copy from shared/ (same design system)
│   ├── base.css         # Copy from shared/ (same base styles)
│   ├── utilities.css    # Copy from shared/ (same utility classes)
│   └── residential.css  # Site-specific styles (customize hero, services, gift cards section)
├── js/
│   └── main.js          # Copy from commercial/ (same CountUp.js + form handling)
└── images/
    ├── logo.webp        # Shared brand logo (copy from commercial/)
    ├── awards/          # Trust badges (copy from commercial/)
    ├── gift-cards/      # NEW: Gift card design mockups
    └── services/        # Residential service imagery (optional)
```

### Pattern 1: Residential Content Sections (Same Structure, Different Content)
**What:** Reuse Phase 2 semantic HTML structure with residential-specific content
**When to use:** All sections except gift cards (which is new)
**Example:**
```html
<!-- Same HTML structure as commercial site, different content -->
<section id="services" class="services section section--alt">
  <div class="container">
    <h2 class="section__title">Our Cleaning Services</h2>
    <div class="grid grid--3">

      <article class="card service-card">
        <!-- Icon: home/broom/sparkles -->
        <h3>Regular Cleaning</h3>
        <p>Weekly or bi-weekly home cleaning that keeps your living spaces fresh and welcoming. We handle dusting, vacuuming, mopping, bathroom sanitizing, and kitchen cleaning so you can spend time on what matters most.</p>
      </article>

      <article class="card service-card">
        <!-- Icon: scrub brush/deep clean -->
        <h3>Deep Cleaning</h3>
        <p>Thorough top-to-bottom cleaning for occupied homes. We reach the areas often overlooked—baseboards, ceiling fans, behind appliances—restoring your home to sparkling condition while working around your furniture and belongings.</p>
      </article>

      <article class="card service-card">
        <!-- Icon: moving boxes/new home -->
        <h3>Move-In / Move-Out Cleaning</h3>
        <p>Intensive cleaning for empty properties before you move in or after you move out. Every corner, cabinet, and closet is scrubbed and sanitized, ensuring the home is move-in ready or returned to pristine condition.</p>
      </article>

    </div>
  </div>
</section>
```

### Pattern 2: Gift Cards Showcase Section (NEW - No Checkout)
**What:** Visual showcase of gift card options with pricing tiers and offline purchase instructions
**When to use:** Residential site only (commercial doesn't offer gift cards)
**Example:**
```html
<!-- Source: https://www.voucherify.io/blog/gift-cards-ux-and-ui-best-practices -->
<section id="gift-cards" class="gift-cards section section--dark">
  <div class="container">
    <h2 class="section__title">Give the Gift of a Clean Home</h2>
    <p class="section__intro">Know someone who deserves a break? Our gift cards make perfect gifts for new homeowners, busy families, or anyone who'd love more free time.</p>

    <!-- Gift card designs showcase -->
    <div class="gift-card-designs">
      <div class="gift-card">
        <img src="images/gift-cards/birthday.webp" alt="Birthday cleaning gift card design">
      </div>
      <div class="gift-card">
        <img src="images/gift-cards/housewarming.webp" alt="Housewarming cleaning gift card design">
      </div>
      <div class="gift-card">
        <img src="images/gift-cards/thank-you.webp" alt="Thank you cleaning gift card design">
      </div>
    </div>

    <!-- Pricing tiers -->
    <div class="gift-card-pricing">
      <h3>Available Amounts</h3>
      <div class="grid grid--4">
        <div class="pricing-card">
          <span class="price">$25</span>
          <span class="label">Quick Refresh</span>
        </div>
        <div class="pricing-card">
          <span class="price">$50</span>
          <span class="label">Standard Clean</span>
        </div>
        <div class="pricing-card">
          <span class="price">$100</span>
          <span class="label">Deep Clean</span>
        </div>
        <div class="pricing-card">
          <span class="price">$150+</span>
          <span class="label">Custom Amount</span>
        </div>
      </div>
    </div>

    <!-- Purchase instructions (NO checkout form) -->
    <div class="gift-card-cta">
      <h3>How to Purchase</h3>
      <p>Call us at <a href="tel:+17176150968">717-615-0968</a> to order your gift card. We'll mail a beautifully designed card or email a digital version—your choice!</p>
      <a href="tel:+17176150968" class="btn btn--accent btn--large">Call to Order Gift Cards</a>
    </div>

    <!-- FAQ or terms -->
    <div class="gift-card-terms">
      <p><strong>Gift cards never expire.</strong> Valid for all residential cleaning services. Redeemable by calling to schedule service.</p>
    </div>
  </div>
</section>
```
```css
/* Gift card section styling (warm, inviting, visually distinct) */
.gift-cards {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
  color: var(--color-text-on-dark);
}

.gift-card-designs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  flex-wrap: wrap;
  margin: var(--space-2xl) 0;
}

.gift-card {
  width: 300px;
  height: 180px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.gift-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gift-card-pricing {
  margin: var(--space-3xl) 0;
}

.pricing-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-xl);
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.pricing-card:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--color-accent);
}

.pricing-card .price {
  font-size: var(--fs-xl);
  font-weight: 800;
  color: var(--color-accent);
}

.pricing-card .label {
  font-size: var(--fs-sm);
  color: var(--color-text-on-dark);
  margin-top: var(--space-sm);
}
```

### Pattern 3: Warmer Residential Tone (Language Differentiation)
**What:** Same HTML structure, warmer language that emphasizes personal benefits
**When to use:** All content areas - headlines, service descriptions, CTAs
**Example:**
```html
<!-- COMMERCIAL TONE (Phase 2) -->
<h1>Maintaining Your Clean Legacy</h1>
<p>Background-checked, insured professionals delivering superior office cleaning at ultra-competitive prices</p>

<!-- RESIDENTIAL TONE (Phase 3) -->
<h1>More Time for What Matters</h1>
<p>Trustworthy, background-checked cleaners who treat your home like our own—so you can focus on family, friends, and the things you love</p>

<!-- COMMERCIAL CTA -->
<a href="#contact" class="btn btn--primary">Get a Free Estimate</a>

<!-- RESIDENTIAL CTA -->
<a href="#contact" class="btn btn--primary">Get Your Free Quote</a>

<!-- COMMERCIAL ABOUT (business-focused) -->
<p>What started as a one-woman operation has grown into a trusted team of 20 background-checked, insured professionals.</p>

<!-- RESIDENTIAL ABOUT (personal-focused) -->
<p>What started with Angie cleaning a few neighbors' homes has grown into a trusted local business—but we still treat every home like it's our own.</p>
```

### Pattern 4: Homeowner Testimonials (vs. Business Testimonials)
**What:** Attributed quotes from residential customers emphasizing trust, punctuality, and personal benefits
**When to use:** Testimonials section (reuse Phase 2 structure, different content)
**Example:**
```html
<!-- Source: Homeowner testimonial patterns from https://cbhunter.com/how-to-evaluate-cleaning-service-reviews-and-testimonials-in-your-local-area/ -->
<section id="testimonials" class="testimonials section">
  <div class="container">
    <h2 class="section__title">What Homeowners Say</h2>
    <div class="grid grid--2">

      <blockquote class="testimonial">
        <p>"Erica arrives right on time every two weeks, goes through the house like a tornado, and leaves everything sparkling. She doesn't mind our three dogs, and the house always smells amazing when I get home. Total game-changer for our family."</p>
        <footer>— Sarah M., Lancaster</footer>
      </blockquote>

      <blockquote class="testimonial">
        <p>"I was amazed when my trash can went missing and one of the ladies placed it in the backyard behind the gate. They pay attention to the details, arrive on time, and use eco-friendly products. Our house isn't just spotless—it's actually sanitized."</p>
        <footer>— Jennifer K., York County</footer>
      </blockquote>

      <blockquote class="testimonial">
        <p>"We've used Angie's Custom Cleaning for five years. The team is professional, background-checked, and flexible with our schedule. I trust them completely, and my home is always ready for guests."</p>
        <footer>— Michael T., Lancaster County</footer>
      </blockquote>

    </div>
  </div>
</section>
```

### Anti-Patterns to Avoid
- **E-commerce checkout on demo** — Adding Stripe/Square integration is unnecessary complexity for demo; informational display with "call to order" is sufficient and matches project scope
- **Different design system** — Residential and commercial sites must feel like the same brand; reuse all CSS variables, typography, and color palette
- **Overly corporate language** — Residential tone should be warm and approachable, not formal; avoid jargon like "synergy" or "leverage"
- **Generic stock photos** — If using imagery, prefer authentic home cleaning scenes over generic office/corporate stock photos

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Gift card designs | Custom Photoshop mockups | Canva gift card templates or simple CSS card designs | Canva offers free customizable templates; CSS-designed cards avoid image-heavy design time |
| Service differentiation content | Guessing differences | Extract from current angiescustomcleaning.com site | Real content already exists - reuse verified business information |
| Residential testimonials | Made-up quotes | Extract from current site or use pattern-based authentic examples | Authenticity matters - use real customer language patterns |
| Statistics animation | Rebuild CountUp.js logic | Reuse Phase 2 main.js verbatim | Already implemented and tested in Phase 2 |
| Gift card checkout | Custom payment form | Informational display with phone CTA | Demo scope excludes e-commerce; production would integrate Stripe/Square/WooCommerce |

**Key insight:** Phase 2 solved 90% of technical challenges. Phase 3 is primarily a content customization exercise (residential vs. commercial services, warmer tone, gift cards showcase) layered onto proven architecture. Don't rebuild what already works.

## Common Pitfalls

### Pitfall 1: Treating Gift Cards as E-Commerce Feature
**What goes wrong:** Attempting to build shopping cart, payment integration, or order management for demo gift cards section—massive scope creep
**Why it happens:** Misunderstanding demo purpose; conflating "gift cards section" with full e-commerce implementation
**How to avoid:** Design gift cards as informational showcase with visual card designs, pricing tiers, and "call to order" CTA—no checkout flow
**Warning signs:** Planning tasks for Stripe API, payment forms, order confirmation emails

### Pitfall 2: Diverging from Shared Design System
**What goes wrong:** Creating residential-specific color palette, typography, or component styles that break brand consistency between commercial and residential sites
**Why it happens:** Wanting residential site to feel "warmer" by changing colors/fonts rather than content/language
**How to avoid:** Keep all design system variables identical (same blue brand, same typography, same spacing); differentiate through content tone, imagery, and language only
**Warning signs:** Creating residential-specific CSS variables for colors or fonts; custom component designs not in Phase 2

### Pitfall 3: Unclear Service Differentiation
**What goes wrong:** Using vague descriptions that don't distinguish between regular cleaning, deep cleaning, and move-in/out cleaning—users can't tell which service they need
**Why it happens:** Not researching how services differ in scope and use case
**How to avoid:** Clearly define each service with specific scope differences (see research below)
**Warning signs:** Service descriptions sound similar; no mention of furniture (deep clean works around it, move-in/out is empty home)

**Service Differentiation Reference:**
- **Regular Cleaning:** Weekly/bi-weekly maintenance cleaning—dusting, vacuuming, surface cleaning, bathroom sanitizing. For occupied homes with furniture in place. Maintains tidiness.
- **Deep Cleaning:** Thorough top-to-bottom cleaning—includes areas often overlooked (baseboards, ceiling fans, behind appliances). For occupied homes with furniture. More intensive than regular cleaning.
- **Move-In/Out Cleaning:** Intensive cleaning for empty properties—every corner, cabinet, closet scrubbed. Performed with no furniture present, making all areas accessible. One-time service to restore property to move-in condition.

### Pitfall 4: Weak Tone Differentiation
**What goes wrong:** Residential site reads exactly like commercial site—same formal business language instead of warmer, homeowner-focused tone
**Why it happens:** Copy-pasting commercial content without rewriting for residential audience
**How to avoid:** Rewrite all headlines, service descriptions, and CTAs to emphasize personal benefits ("more time with family" vs. "focus on your business"), use friendlier language, and include personal touches (Angie's story, homeowner testimonials)
**Warning signs:** Headlines like "Maintaining Your Clean Legacy" (too formal); CTAs like "Request Free Quote" instead of "Get Your Free Quote"

### Pitfall 5: Missing Service Area Difference
**What goes wrong:** Footer says "Serving Lancaster County, PA" instead of "Serving Lancaster & York Counties, PA"—inaccurate service area
**Why it happens:** Copy-pasting commercial footer without updating service area
**How to avoid:** Verify residential site serves Lancaster & York Counties (per requirements.md); update all service area mentions
**Warning signs:** Footer, contact section, or meta description mentions Lancaster County only

### Pitfall 6: No Gift Card Visual Assets
**What goes wrong:** Gift cards section has pricing tiers but no visual card designs—feels incomplete and not showcase-worthy
**Why it happens:** Focusing on pricing display without considering visual appeal
**How to avoid:** Create or source 2-3 gift card design mockups (birthday, housewarming, thank you themes) using Canva templates or CSS-designed cards with brand colors
**Warning signs:** Gift cards section is text-only with no images

### Pitfall 7: Extracting Content from Wrong Site
**What goes wrong:** Pulling residential content from commercial site (angiescommercialcleaning.com) instead of residential site (angiescustomcleaning.com)
**Why it happens:** Not verifying which domain hosts residential content
**How to avoid:** Extract residential services, testimonials, and gift card info from angiescustomcleaning.com specifically
**Warning signs:** Services mention office cleaning or floor buffing instead of home cleaning

## Code Examples

Verified patterns from official sources:

### Statistics with Residential Focus
```html
<!-- Reuse Phase 2 structure, customize stats for residential context -->
<section id="stats" class="stats section section--dark">
  <div class="container">
    <h2 class="sr-only">Our Track Record</h2>
    <div class="stats__grid">

      <div class="stat">
        <span class="stat__number" data-count="12">0</span>
        <span class="stat__label">Years Serving Families</span>
      </div>

      <div class="stat">
        <span class="stat__number" data-count="1500" data-suffix="+">0</span>
        <span class="stat__label">Homes Cleaned</span>
      </div>

      <div class="stat">
        <span class="stat__number" data-count="100" data-suffix="%">0</span>
        <span class="stat__label">Background Checked</span>
      </div>

      <div class="stat">
        <span class="stat__number" data-count="1">0</span>
        <span class="stat__label">Family Owned</span>
      </div>

    </div>
  </div>
</section>

<!-- CountUp.js implementation: copy commercial/js/main.js verbatim -->
```

### "Why Choose Us" with Residential Benefits
```html
<!-- Reuse Phase 2 structure, customize benefits for homeowners -->
<section id="why-us" class="why-us section">
  <div class="container">
    <h2 class="section__title">Why Families Choose Us</h2>
    <div class="grid grid--3">

      <article class="card benefit-card">
        <h3>Trustworthy Staff</h3>
        <p>Every member of our cleaning team is background-checked before entering your home. We're not just cleaners—we're neighbors you can trust with your most personal space.</p>
      </article>

      <article class="card benefit-card">
        <h3>Flexible Scheduling</h3>
        <p>Life gets busy. We work around your schedule with weekly, bi-weekly, or one-time cleaning appointments. Need to reschedule? We're happy to accommodate.</p>
      </article>

      <article class="card benefit-card">
        <h3>Satisfaction Guaranteed</h3>
        <p>If you're not completely happy with our cleaning, we'll come back and make it right—no questions asked. Your peace of mind is our priority.</p>
      </article>

      <article class="card benefit-card">
        <h3>Family Owned & Local</h3>
        <p>Angie founded this business in 2012 to serve her Lancaster community. We're your neighbors, and we treat every home like our own.</p>
      </article>

      <article class="card benefit-card">
        <h3>Eco-Friendly Products</h3>
        <p>We use safe, non-toxic cleaning products that are tough on dirt but gentle on your family and pets. A clean home shouldn't mean harsh chemicals.</p>
      </article>

      <article class="card benefit-card">
        <h3>Attention to Detail</h3>
        <p>We notice the little things—from straightening pillows to tucking trash cans behind gates. It's the details that make a house feel like a home.</p>
      </article>

    </div>
  </div>
</section>
```

### Footer with Service Area Update
```html
<!-- Source: requirements.md - residential site serves Lancaster & York Counties -->
<footer class="site-footer">
  <div class="container">
    <div class="footer__content">

      <div class="footer__brand">
        <picture>
          <source srcset="images/logo.webp" type="image/webp">
          <img src="images/logo.png" alt="Angie's Custom Cleaning" width="180" height="72">
        </picture>
        <p class="footer__tagline">Family-owned residential cleaning service since 2012</p>
      </div>

      <div class="footer__links">
        <h3>Quick Links</h3>
        <nav aria-label="Footer navigation">
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#gift-cards">Gift Cards</a></li>
            <li><a href="#why-us">Why Choose Us</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div class="footer__contact">
        <h3>Contact Info</h3>
        <p><strong>Phone:</strong> <a href="tel:+17176150968">717-615-0968</a></p>
        <p><strong>Address:</strong> 340 Abbeyville Road, Lancaster PA 17603</p>
        <p><strong>Hours:</strong> Monday-Friday, 9am-4pm</p>
      </div>

      <div class="footer__awards">
        <h3>Awards & Services</h3>
        <ul>
          <li>Angie's List Super Service Award</li>
          <li>Reader's Choice Award Winner</li>
          <li>Gift Cards Available</li>
        </ul>
      </div>

    </div>

    <div class="footer__bottom">
      <p class="footer__copyright">&copy; 2026 Angie's Custom Cleaning. Serving Lancaster & York Counties, PA. All rights reserved.</p>
      <p class="footer__legal">This is a demonstration website created to showcase web development capabilities.</p>
    </div>
  </div>
</footer>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate design systems per site | Shared design system with content differentiation | 2024+ (design systems maturity) | Faster development, brand consistency, easier maintenance |
| E-commerce for all gift cards | Hybrid: showcase + offline purchase for simple cases | 2024-2026 | Reduces complexity for businesses with phone-based sales; lowers barrier to gift card programs |
| Stock photos for testimonials | Attributed text-only testimonials with authentic language | 2023+ (trust/authenticity focus) | More credible than generic smiling faces; easier to maintain |
| Generic "cleaning services" copy | Service-specific differentiation (regular vs. deep vs. move-in/out) | 2024+ (SEO + UX clarity) | Users can self-select appropriate service; reduces support burden |

**Deprecated/outdated:**
- **WooCommerce for demos** — Overkill for demonstration purposes; informational display with offline purchase is sufficient for demo sites
- **Different color palettes per site division** — Modern multi-site brands use shared design systems with content-level differentiation only
- **Generic "trust us" language** — Homeowners expect specific credentials (background checks, insurance, local ownership) backed by testimonials

## Open Questions

Things that couldn't be fully resolved:

1. **Residential content extraction source**
   - What we know: angiescustomcleaning.com is WordPress site with residential services and gift card info
   - What's unclear: Exact service descriptions, testimonials, Angie's residential-focused story need to be extracted from live site
   - Recommendation: Use WebFetch to extract content from angiescustomcleaning.com or manually browse to capture exact wording; prioritize authentic content over paraphrasing

2. **Gift card design assets**
   - What we know: Current site uses WooCommerce for gift cards; visual designs may exist
   - What's unclear: Whether high-quality gift card design images are available from current site or need to be created
   - Recommendation: For demo quality, create 2-3 simple gift card mockups using Canva templates (birthday, housewarming, thank you themes) with Angie's blue brand colors; alternative is CSS-only card designs with gradient backgrounds

3. **Residential testimonials availability**
   - What we know: Current site likely has testimonials, but may be mixed commercial/residential
   - What's unclear: Whether residential-specific testimonials exist or if we need to use pattern-based authentic examples
   - Recommendation: Extract testimonials from angiescustomcleaning.com; if none exist or are low-quality, use realistic examples based on authentic homeowner testimonial patterns from research (see Code Examples section)

4. **Service pricing display**
   - What we know: Demo doesn't include actual pricing (per project scope)
   - What's unclear: Whether to mention pricing at all in service descriptions or keep focus on value/benefits
   - Recommendation: Omit specific pricing; use value-focused language ("flexible scheduling," "satisfaction guaranteed") and direct users to contact for custom quotes

5. **Gift card pricing tiers**
   - What we know: Standard gift card increments are $25/$50/$100/$150+
   - What's unclear: Angie's actual gift card denominations (current WooCommerce may have specific tiers)
   - Recommendation: Use standard increments ($25/$50/$100/$150+) unless current site specifies different tiers; can be verified during content extraction phase

## Sources

### Primary (HIGH confidence)
- **Phase 2 Research & Implementation**: `.planning/phases/02-commercial-site/02-RESEARCH.md` - Established HTML/CSS/JS patterns, CountUp.js implementation, design system usage
- **Commercial Site Codebase**: `commercial/index.html`, `commercial/css/commercial.css`, `commercial/js/main.js` - Proven architecture to reuse
- **Design System**: `commercial/css/variables.css` - 47 CSS custom properties defining shared brand
- **Project Requirements**: `docs/requirements.md` - Service area (Lancaster & York Counties), business info, demo scope
- **Service Type Differentiation**: [Modern Maids: Move-In vs Move-Out Cleaning](https://modern-maids.com/the-difference-between-move-in-and-move-out-cleaning-services/), [Eadsco: Deep Cleaning vs Move-In/Out](https://www.eadscocleaning.com/difference-between-move-in-out-cleaning-and-deep-cleaning/)
- **Gift Card UX Best Practices**: [Voucherify: Gift Cards UX and UI Best Practices](https://www.voucherify.io/blog/gift-cards-ux-and-ui-best-practices) - Landing page structure, pricing display, offline purchase patterns

### Secondary (MEDIUM confidence)
- **Residential Tone/Language Patterns**: [Site Builder Report: 45 Cleaning Websites 2026](https://www.sitebuilderreport.com/inspiration/cleaning-websites), [Gorilla Desk: 11 Best Cleaning Websites 2026](https://gorilladesk.com/learn/top-cleaning-company-website-examples/), [10Web: 26 Cleaning Service Website Examples](https://10web.io/blog/cleaning-service-website-examples/)
- **Homeowner Testimonials**: [CB Hunter: Evaluating Cleaning Service Reviews](https://cbhunter.com/how-to-evaluate-cleaning-service-reviews-and-testimonials-in-your-local-area/), [Bravo Cleaning: Client Testimonials](https://bravocleaningmn.com/blog/showcasing-client-testimonials-demonstrating-our-cleaning-excellence)
- **Gift Card Pricing Tiers**: [Alibaba: Best Gift Cards 2026 by Budget](https://www.alibaba.com/product-insights/best-gift-cards-in-2026-top-10-picks-by-budget-interest.html), [ScienceDirect: Gift Card Price Ranges](https://www.sciencedirect.com/science/article/abs/pii/S0969698921004379)
- **Service Area**: [Anytime Cleaning: York & Lancaster Counties](https://www.any-timecleaning.com/) - Confirms Lancaster & York Counties as combined service region

### Tertiary (LOW confidence)
- **Gift Card Design Inspiration**: [99designs: Gift Card Design Ideas](https://99designs.com/inspiration/designs/gift-card), [Dribbble: Gift Cards Designs](https://dribbble.com/tags/gift-cards) - Visual inspiration only, not technical implementation
- **Content Extraction**: Will require WebFetch or manual extraction from angiescustomcleaning.com during content prep phase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Reusing proven Phase 2 architecture (HTML5, CSS Grid, CountUp.js) with 100% code reusability
- Architecture: HIGH - 90% of structure is direct copy from Phase 2; only gift cards section is new, and informational showcase pattern is well-established
- Residential services differentiation: HIGH - Service type differences (regular/deep/move-in-out) verified by multiple authoritative cleaning service sources
- Gift cards showcase design: MEDIUM - Best practices verified via Voucherify UX guide, but specific visual implementation (card designs, pricing layout) will need iteration
- Tone differentiation: MEDIUM - Warmer residential language patterns verified by multiple cleaning website examples, but exact wording requires content customization
- Content availability: MEDIUM - Requires extraction from angiescustomcleaning.com; exact testimonials/services descriptions unknown until extraction phase

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (30 days—architecture stable, content extraction needed)
