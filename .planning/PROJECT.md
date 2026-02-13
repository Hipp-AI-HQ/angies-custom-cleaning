# Angie's Custom Cleaning — Demo Sites

## What This Is

Two polished demo websites (commercial and residential) for Angie's Custom Cleaning, a cleaning business in Lancaster, PA. Built and deployed to demonstrate capability to a prospective client whose previous developer took $5K and disappeared.

## Current State (v1.0 — Shipped 2026-02-13)

**Live Sites:**
- Commercial: https://angies-commercial-cleaning.vercel.app
- Residential: https://angies-residential-cleaning.vercel.app

**Status:** Demo complete, ready to send to Angie. Awaiting client response.

**Tech Stack:** Static HTML/CSS/JS (no frameworks), ~22,474 LOC, deployed via Vercel

**Performance:**
- Desktop Lighthouse: 99/100 (both sites)
- Mobile Lighthouse: 84/100 (both sites, target was 90+)
- Core Web Vitals: Excellent (TBT 0ms, CLS 0)
- Real device tested: All features functional

## Core Value

The demos must immediately look better than Angie's current WordPress sites — faster, cleaner, mobile-friendly, and visually trustworthy — so she reaches out to move forward.

## Requirements

### Validated

- ✓ Commercial site with hero, services, trust signals, about, and contact sections — v1.0
- ✓ Residential site with hero, services, trust signals, about, and contact sections — v1.0
- ✓ Shared blue brand identity across both sites (51 CSS custom properties) — v1.0
- ✓ Warm, trustworthy design aesthetic — friendly, community feel — v1.0
- ✓ Mobile-first responsive design (breakpoints at 768px, 1024px) — v1.0
- ✓ Fast loading — static HTML/CSS/JS, no framework bloat — v1.0
- ✓ Real content from her current sites (zero Lorem Ipsum) — v1.0
- ✓ Award badges and credentials prominently displayed — v1.0
- ✓ Contact information visible (phone, address, hours) — v1.0
- ✓ Service descriptions for each division — v1.0
- ✓ Angie's personal story / founder bio — v1.0
- ✓ Deployed to Vercel with shareable URLs — v1.0
- ✓ Scroll animations and interactive polish (AOS, hover effects, hamburger menu) — v1.0
- ✓ Gift cards section on residential site — v1.0

### Active

(None — v1.0 shipped, awaiting client response for production direction)

### Out of Scope

- Working e-commerce / gift card purchasing — demo only, would need Stripe/Square for production
- Blog — not needed for demo or client pitch
- Working contact form submission — placeholder form is sufficient for demo
- WordPress admin or CMS — static sites only
- Custom domain setup — Vercel preview URLs for demo, real domains if she signs on

## Context

**v1.0 Shipped (2026-02-13):**
- Built in 1 day: 5 phases, 19 plans, 16 production files
- Both sites deployed with clean Vercel URLs
- Design system with 51 CSS variables shared across sites
- Scroll animations (48 total), mobile CTA, hamburger menu, hover effects
- Real content throughout (zero fabricated information)
- Desktop performance exceptional (99/100), mobile good (84/100)

**Known Gaps:**
- Mobile Lighthouse 84 vs 90 target (accepted as demo quality)
- Forms are placeholders (demo alerts, not live submission)
- No e-commerce for gift cards (showcase only)

**Client Background:**
- Angie's Custom Cleaning, Lancaster PA (commercial + residential divisions)
- Previous developer took $5K and disappeared
- Current sites: WordPress + WPBakery (heavy, dated, slow)
- Brand colors: Blue (correct), not purple (she dislikes current residential purple)
- Service area: Lancaster County and York, PA
- Business: 717-615-0968, 340 Abbeyville Road, Mon-Fri 9am-4pm

**Next Steps:**
- Send demo URLs to Angie via email
- If she signs on: plan production enhancements (working forms, custom domains, potential mobile optimization)

## Constraints

- **Tech stack**: Static HTML/CSS/JS — no frameworks, no build tools, deployed via GitHub → Vercel
- **Content**: Must use real information from existing sites — nothing fabricated
- **Design**: Blue brand palette (from commercial site logo), warm & trustworthy aesthetic
- **Scope**: Demo quality — impressive but not production-complete (no working forms, no e-commerce)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static HTML/CSS/JS over framework | Demo sites don't need React/Vue complexity; faster to build, faster to load | ✓ Good — Sites load fast, desktop 99/100 Lighthouse |
| Blue brand palette, drop purple | Angie actively dislikes the purple; blue matches her actual brand/logo | ✓ Good — Consistent blue identity (#005982) across both sites |
| Shared brand family across both sites | Same business, should feel cohesive even with different service focus | ✓ Good — 51 CSS variables shared, distinct tones maintained |
| Vercel for hosting | Simple GitHub integration, free tier, instant deploy, shareable URLs | ✓ Good — Clean URLs, CDN caching, HTTPS, instant deploys |
| AOS for scroll animations | Lightweight library, no build step, simple integration | ✓ Good — 48 animations, 600ms duration, professional feel |
| Mobile-first CSS architecture | Cleaning service customers search on phones | ✓ Good — Responsive across devices, mobile CTA bar works |
| WebP + fallback images | Reduce file sizes without losing quality | ✓ Good — 60-75% file size reduction, all browsers supported |
| Accept 84 mobile Lighthouse | Focus on demo impact over score perfection | ✓ Good — Sites function perfectly on real devices, optimization can be production work |

---
*Last updated: 2026-02-13 after v1.0 milestone completion*
