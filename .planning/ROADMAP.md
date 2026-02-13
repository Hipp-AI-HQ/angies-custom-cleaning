# Roadmap: Angie's Custom Cleaning Demo Sites

## Overview

Build two polished demo websites (commercial and residential) for Angie's Custom Cleaning that immediately outshine her current WordPress sites. The build progresses from a shared design system, through the commercial site (establishing all patterns), then the residential site (reusing patterns with content/tone changes), followed by visual polish, and finally deployment with real-device testing. The end result is two live Vercel URLs ready to send via email as a sales tool.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System** - Shared brand foundation (CSS variables, typography, responsive grid) used by both sites
- [ ] **Phase 2: Commercial Site** - Complete single-page commercial cleaning site with all sections
- [ ] **Phase 3: Residential Site** - Complete single-page residential cleaning site with gift cards section
- [ ] **Phase 4: Polish & Interactivity** - Scroll animations, hover effects, mobile CTA bar, hamburger menu
- [ ] **Phase 5: Deployment & Testing** - Vercel deployment, Lighthouse audits, real-device mobile testing

## Phase Details

### Phase 1: Design System
**Goal**: Both sites share a cohesive, warm blue brand identity through a common CSS foundation -- colors, typography, spacing, and responsive breakpoints are defined once and reused everywhere
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05
**Success Criteria** (what must be TRUE):
  1. Opening `shared/css/variables.css` shows CSS custom properties for blue brand colors, warm accent colors, a typography scale using Nunito and Open Sans, and a spacing scale
  2. A test HTML file using the shared CSS renders correctly at 375px, 768px, and 1024px+ widths with visibly different layouts at each breakpoint
  3. Google Fonts load with no flash of unstyled text (preconnect + font-display swap working)
  4. The color palette feels warm and trustworthy -- blue primary, warm white backgrounds, warm orange accent -- not cold or corporate
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md -- Create shared CSS files (reset, variables, base, utilities)
- [ ] 01-02-PLAN.md -- Create test HTML page and copy CSS to both site directories

### Phase 2: Commercial Site
**Goal**: A visitor landing on the commercial site sees a polished, complete single-page experience -- Angie's real services, real awards, real story -- and can find the phone number and contact information within seconds on any device
**Depends on**: Phase 1
**Requirements**: COMM-01, COMM-02, COMM-03, COMM-04, COMM-05, COMM-06, COMM-07, COMM-08, COMM-09, COMM-10
**Success Criteria** (what must be TRUE):
  1. On mobile (375px), the phone number is tappable from the sticky header and the hero CTA is visible without scrolling
  2. Scrolling down reveals services (office, carpet, floor), trust signals (awards, background-checked, insured), Angie's story, testimonials, and contact info -- all using real content from the current site, no placeholder text
  3. The statistics strip shows real numbers (years in business, awards won) and the trust badges (Angie's List, Readers' Choice, Super Service Award) are visible within the first scroll
  4. The site looks and functions correctly across mobile (375px), tablet (768px), and desktop (1024px+) -- no broken layouts, no horizontal scroll, no overlapping elements
  5. The footer contains full contact info (phone, address, hours), navigation links, and "Serving Lancaster County, PA"
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Residential Site
**Goal**: A visitor landing on the residential site gets the same quality and polish as the commercial site but with a warmer, home-focused tone -- plus a gift cards section that acknowledges this feature without requiring e-commerce
**Depends on**: Phase 2
**Requirements**: RESI-01, RESI-02, RESI-03, RESI-04, RESI-05, RESI-06, RESI-07, RESI-08, RESI-09, RESI-10, RESI-11
**Success Criteria** (what must be TRUE):
  1. On mobile (375px), the phone number is tappable from the sticky header and the hero CTA is visible without scrolling
  2. Scrolling down reveals residential services (regular, deep, move-in/out cleaning), trust signals, Angie's story, homeowner testimonials, and contact info -- all using real content, no placeholder text
  3. A "Give the Gift of a Clean Home" gift cards section is present with visual gift card designs and pricing tiers -- clearly styled as a showcase, not a working checkout
  4. The site feels like the same company as the commercial site (shared blue brand, same typography, similar layout patterns) but with a distinctly warmer, friendlier tone in copy and visual treatment
  5. The footer contains full contact info, nav links, gift card mention, and "Serving Lancaster & York Counties"
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: Polish & Interactivity
**Goal**: Both sites go from "competent" to "impressive" -- scroll animations, hover effects, and mobile-specific UX touches make the demos feel premium and modern
**Depends on**: Phase 3
**Requirements**: PLSH-01, PLSH-02, PLSH-03, PLSH-04, PLSH-05
**Success Criteria** (what must be TRUE):
  1. Sections and cards animate into view on scroll (fade-up) as the user scrolls down either site -- not jarring, subtle and professional
  2. On mobile, a fixed "Call Now" button is always visible at the bottom of the viewport on both sites
  3. Hovering over buttons and service cards produces a visible lift + shadow transition on desktop
  4. Clicking navigation links scrolls smoothly to the target section (not an instant jump)
  5. On mobile, tapping the hamburger icon opens a slide-in navigation menu that covers the screen and closes when a link is tapped
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Deployment & Testing
**Goal**: Both sites are live on Vercel with clean, professional URLs, verified to load fast and work perfectly on a real mobile device -- ready to send to Angie
**Depends on**: Phase 4
**Requirements**: DPLY-01, DPLY-02, DPLY-03, DPLY-04
**Success Criteria** (what must be TRUE):
  1. Both sites are accessible at clean Vercel URLs (not random hash URLs) -- something like `angies-commercial.vercel.app` and `angies-residential.vercel.app`
  2. Both sites score 90+ on Lighthouse Performance audit (desktop and mobile)
  3. Both sites load, scroll, and function correctly on a real mobile phone -- sticky header works, tap-to-call works, all sections render, no layout breaks
  4. Opening either URL in a browser shows the complete site with no console errors, no broken images, and no missing fonts
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Design System | 0/2 | Planned | - |
| 2. Commercial Site | 0/TBD | Not started | - |
| 3. Residential Site | 0/TBD | Not started | - |
| 4. Polish & Interactivity | 0/TBD | Not started | - |
| 5. Deployment & Testing | 0/TBD | Not started | - |
