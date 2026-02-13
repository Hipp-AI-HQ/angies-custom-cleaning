# Requirements: Angie's Custom Cleaning Demo Sites

**Defined:** 2026-02-13
**Core Value:** The demos must immediately look better than Angie's current WordPress sites — faster, cleaner, mobile-friendly, and visually trustworthy — so she reaches out to move forward.

## v1 Requirements

### Design System

- [ ] **DSGN-01**: Shared CSS custom properties defining blue brand palette, typography scale, and spacing
- [ ] **DSGN-02**: Nunito (headings) + Open Sans (body) via Google Fonts with preconnect optimization
- [ ] **DSGN-03**: Modern CSS reset with smooth scrolling and font-smoothing
- [ ] **DSGN-04**: Mobile-first responsive layout with breakpoints at 768px and 1024px
- [ ] **DSGN-05**: Warm, trustworthy color scheme — blue primary, warm white backgrounds, warm orange accent

### Commercial Site

- [ ] **COMM-01**: Sticky header with logo, navigation anchors, and tap-to-call phone number
- [ ] **COMM-02**: Hero section with headline, subheadline, "Get a Free Estimate" CTA, and trust badge strip
- [ ] **COMM-03**: Services grid — office cleaning, carpet steam cleaning, floor services (3 cards with icons)
- [ ] **COMM-04**: "Why Choose Us" section with icon grid (background-checked, insured, inspections, competitive pricing, locally owned)
- [ ] **COMM-05**: "How It Works" 3-4 step process section
- [ ] **COMM-06**: Animated statistics strip (years in business, clients served, background-checked, award winner)
- [ ] **COMM-07**: Testimonials section (2-3 attributed quotes from business owners)
- [ ] **COMM-08**: About section with Angie's story and founder messaging
- [ ] **COMM-09**: Contact section with phone, address, hours, and placeholder contact form
- [ ] **COMM-10**: Footer with full contact info, nav links, and "Serving Lancaster County, PA"

### Residential Site

- [ ] **RESI-01**: Sticky header with logo, navigation anchors, and tap-to-call phone number
- [ ] **RESI-02**: Hero section with warm headline, subheadline, CTA, and trust badge strip
- [ ] **RESI-03**: Services grid — regular cleaning, deep cleaning, move-in/out cleaning (3-4 cards with icons)
- [ ] **RESI-04**: "Why Choose Us" section with warmer tone (trustworthy staff, flexible scheduling, satisfaction guaranteed, locally owned)
- [ ] **RESI-05**: "How It Works" 3-step process section
- [ ] **RESI-06**: Testimonials section (2-3 attributed homeowner quotes)
- [ ] **RESI-07**: Gift cards section — "Give the Gift of a Clean Home" with gift card designs and pricing tiers
- [ ] **RESI-08**: About section with Angie's story, residential-focused angle
- [ ] **RESI-09**: Animated statistics strip (awards, years in business, homes cleaned, family owned)
- [ ] **RESI-10**: Contact section with phone, address, hours, and placeholder contact form
- [ ] **RESI-11**: Footer with full contact info, nav links, gift card mention, "Serving Lancaster & York Counties"

### Polish & Interactivity

- [ ] **PLSH-01**: AOS scroll animations (fade-up on sections and cards)
- [ ] **PLSH-02**: Sticky mobile CTA bar — fixed "Call Now" button at bottom of mobile viewport
- [ ] **PLSH-03**: CSS hover transitions on buttons and service cards (lift + shadow)
- [ ] **PLSH-04**: Smooth scroll behavior for anchor navigation
- [ ] **PLSH-05**: Mobile hamburger menu with slide-in navigation

### Deployment

- [ ] **DPLY-01**: Commercial site deployed to Vercel with clean project name
- [ ] **DPLY-02**: Residential site deployed to Vercel with clean project name
- [ ] **DPLY-03**: Both sites score 90+ on Lighthouse Performance
- [ ] **DPLY-04**: Both sites tested on real mobile device before delivery

## v2 Requirements

### Production Features (if Angie signs on)

- **PROD-01**: Working contact form via Formspree or similar service
- **PROD-02**: Custom domain setup (angiescommercialcleaning.com, angiescustomcleaning.com)
- **PROD-03**: Gift card e-commerce via Stripe/Square integration
- **PROD-04**: SEO meta tags and structured data (LocalBusiness schema)
- **PROD-05**: Google Analytics or privacy-friendly analytics
- **PROD-06**: Google Maps embed in contact section

## Out of Scope

| Feature | Reason |
|---------|--------|
| Working contact form submission | Demo only — placeholder sufficient, Formspree in production |
| E-commerce / online gift card purchasing | Requires Stripe/Square integration — deferred to production |
| Blog | No content to populate, not needed for demo impact |
| WordPress admin / CMS | Static sites only — CMS would be a production decision |
| Online booking / scheduling | Complex integration not needed for demo |
| Pricing calculator or price lists | Cleaning pricing is variable — "Free Quote" CTA instead |
| Live chat widget | Requires staffing or bot setup |
| Customer login / portal | Enterprise feature not relevant |
| Multi-page deep navigation | Single-page scrolling is more impactful for demos |
| SEO optimization | Important for production, irrelevant for Vercel demo URLs |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Phase 1 | Complete |
| DSGN-02 | Phase 1 | Complete |
| DSGN-03 | Phase 1 | Complete |
| DSGN-04 | Phase 1 | Complete |
| DSGN-05 | Phase 1 | Complete |
| COMM-01 | Phase 2 | Pending |
| COMM-02 | Phase 2 | Pending |
| COMM-03 | Phase 2 | Pending |
| COMM-04 | Phase 2 | Pending |
| COMM-05 | Phase 2 | Pending |
| COMM-06 | Phase 2 | Pending |
| COMM-07 | Phase 2 | Pending |
| COMM-08 | Phase 2 | Pending |
| COMM-09 | Phase 2 | Pending |
| COMM-10 | Phase 2 | Pending |
| RESI-01 | Phase 3 | Pending |
| RESI-02 | Phase 3 | Pending |
| RESI-03 | Phase 3 | Pending |
| RESI-04 | Phase 3 | Pending |
| RESI-05 | Phase 3 | Pending |
| RESI-06 | Phase 3 | Pending |
| RESI-07 | Phase 3 | Pending |
| RESI-08 | Phase 3 | Pending |
| RESI-09 | Phase 3 | Pending |
| RESI-10 | Phase 3 | Pending |
| RESI-11 | Phase 3 | Pending |
| PLSH-01 | Phase 4 | Pending |
| PLSH-02 | Phase 4 | Pending |
| PLSH-03 | Phase 4 | Pending |
| PLSH-04 | Phase 4 | Pending |
| PLSH-05 | Phase 4 | Pending |
| DPLY-01 | Phase 5 | Pending |
| DPLY-02 | Phase 5 | Pending |
| DPLY-03 | Phase 5 | Pending |
| DPLY-04 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-13*
*Last updated: 2026-02-13 after initial definition*
