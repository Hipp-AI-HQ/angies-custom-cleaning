# Domain Pitfalls

**Domain:** Demo marketing sites for a local cleaning business (sales tool to win client)
**Researched:** 2026-02-13
**Confidence:** HIGH (domain expertise in client sales, local business web design, and demo site strategy; grounded in specific project context from PROJECT.md and requirements docs)

---

## Critical Pitfalls

Mistakes that kill the deal. Angie opens the link, sees one of these, closes the tab, never responds.

### Pitfall 1: The "Template Site" Feel

**What goes wrong:** The demo looks like a generic template with Angie's name pasted in. Stock photo vibes, generic "We provide quality service" copy, layouts that scream "I downloaded this." Angie has been burned before by someone who took $5K and probably did exactly this. If the demo looks like a template, it confirms her fear that web developers are all the same.

**Why it happens:** Builders focus on structure and layout before content. They reach for familiar section patterns (hero with stock photo, three-column services, testimonial slider) without customizing them to the actual business.

**Consequences:** Instant rejection. The whole sales pitch is "the work speaks for itself." If the work looks generic, it says nothing.

**Prevention:**
- Use her real content (services, awards, story) as the design driver, not the other way around
- Reference her specific services by name ("Weekly Office Cleaning" not "Our Services")
- Include Lancaster, PA references — this is a local business, locality is identity
- Avoid generic stock photography entirely. Use solid colors, gradients, icons, or abstract patterns instead. A cleaning site with stock photos of smiling people in aprons looks worse than a clean typographic design with no photos at all
- Make the award badges prominent and real — these are HER accomplishments

**Detection:** Ask "Could I swap in any other cleaning company's name and this site would still work?" If yes, it is too generic.

**Phase:** Must be addressed from the very first design decisions. This is a Phase 1 concern — content and brand identity before layout.

---

### Pitfall 2: Broken or Embarrassing Mobile Experience

**What goes wrong:** Angie opens the demo link on her phone (the most likely device for a small business owner checking email during the day). Text overflows, images stretch, the nav is unusable, or the page requires pinch-zooming. The demo fails the "thumb test."

**Why it happens:** Desktop-first design that gets responsiveness as an afterthought. Or testing only in Chrome DevTools but never on an actual phone screen.

**Consequences:** Angie judges the site by how it looks on her phone. If it is broken on mobile, the entire demo is dead. She will not think "let me try on desktop" — she will think "this person cannot build websites."

**Prevention:**
- Build mobile-first literally — write mobile CSS first, then use min-width media queries to enhance for larger screens
- Test with real viewport constraints: 375px wide (iPhone SE) as the baseline
- Ensure tap targets are at least 44x44px (Apple HIG minimum)
- Phone number must be a clickable tel: link — she needs to see that you understand how her customers will use the site
- Contact info should be visible without scrolling on mobile
- Navigation must collapse cleanly to a hamburger or simple mobile menu
- No horizontal scrolling, ever

**Detection:** Open the Vercel URL on a real phone before sending. Not just DevTools — a real phone. Every time.

**Phase:** Phase 1 foundation. Mobile layout must be the starting point, not a fix applied later.

---

### Pitfall 3: Placeholder Content Left In

**What goes wrong:** "Lorem ipsum" text, "Your Company Name Here," "[Insert testimonial]," or a form with "Submit" that goes nowhere without any indication it is a demo. Angie sees placeholder content and concludes the developer did not care enough to finish, or worse, does not know how to build a real site.

**Why it happens:** Moving fast to get the layout right and planning to "fill in real content later." But real content never gets filled in because the builder moves to the next section.

**Consequences:** For a client who was ghosted by her last developer, incomplete work is the reddest of red flags. Placeholder text says: "I will also stop before finishing."

**Prevention:**
- Content-first approach: extract all real text from her current sites BEFORE designing layouts
- Every heading, every paragraph, every bullet point must come from her actual business information
- The only acceptable "placeholder" is the contact form, and it must be explicitly labeled: "In the live version, this form would send inquiries directly to your inbox" or similar language showing intentionality
- Award badges should use actual badge images or faithful recreations, not gray boxes
- No "Coming Soon" sections. If a feature is out of scope, do not include the section at all

**Detection:** Read every word on the page aloud. If any sentence does not describe Angie's actual business, it should not be there.

**Phase:** Phase 1 (content extraction) must happen before Phase 2 (design/build). This is a sequencing dependency.

---

### Pitfall 4: Slow First Load

**What goes wrong:** The Vercel URL takes 3+ seconds to show meaningful content. White screen, loading spinner, or a jarring pop-in of elements. Angie clicks the link from her email, waits, and either closes the tab or sees a broken half-loaded state.

**Why it happens:** Unoptimized images (especially if pulling award badge images or any photos at full resolution), render-blocking CSS/JS, web font FOUT/FOIT, or unnecessary JavaScript frameworks.

**Consequences:** The core sales pitch is "faster than your WordPress site." If the demo is not perceptibly instant, the pitch collapses. WordPress with caching plugins can actually load reasonably fast — the demo must be noticeably faster.

**Prevention:**
- Static HTML/CSS/JS only — no framework, no build step, no hydration delay (already planned, good)
- Inline critical CSS in the `<head>` so the first paint has styled content
- Compress all images to WebP, size them to their display dimensions (not 4000px originals)
- Use `font-display: swap` for any web fonts so text renders immediately
- Total page weight under 500KB for first load (ideally under 200KB)
- Preload the hero section's critical assets
- No lazy-loading above the fold — lazy-load only below-fold images

**Detection:** Run Lighthouse on the Vercel URL. First Contentful Paint must be under 1.5 seconds. Largest Contentful Paint under 2.5 seconds.

**Phase:** Phase 2 (build). Performance must be baked into the build process, not optimized after.

---

### Pitfall 5: Missing or Buried Trust Signals

**What goes wrong:** The awards, credentials, and years-in-business signals are tucked into a footer or a separate "About" page instead of being prominently visible within the first scroll. Angie's biggest marketing assets (Angie's List Super Service Award, Readers' Choice, background-checked staff) are what differentiate her from every other cleaning company. Burying them is burying her competitive advantage.

**Why it happens:** Designers treat trust signals as secondary content — "supporting material" that goes below the fold. In reality, for a local service business, trust signals ARE the primary content. Nobody chooses a cleaning company because of a clever hero animation.

**Consequences:** Angie will notice if her awards are not front and center. These are accomplishments she is proud of. If the demo minimizes them, the demo does not understand her business.

**Prevention:**
- Award badges visible on the first screen (above the fold or immediately below the hero)
- "Background-checked and insured" should be a prominent callout, not fine print
- Years in business should be stated explicitly (not left for the visitor to calculate)
- Trust signals should appear on BOTH sites, not just one
- Consider a dedicated "trust bar" — a horizontal strip showing badges, years of service, and key credentials

**Detection:** Open the demo on mobile and ask: "Can I see why I should trust this company without scrolling more than once?"

**Phase:** Phase 1 (content architecture / wireframing). Trust signal placement must be decided at the structural level.

---

## Moderate Pitfalls

Mistakes that weaken the demo but might not kill the deal outright.

### Pitfall 6: The Two Sites Do Not Feel Like the Same Company

**What goes wrong:** The commercial and residential sites use different color palettes, typography, spacing, or overall aesthetic. They feel like two different companies rather than two divisions of one business.

**Prevention:**
- Establish a shared design system first: colors, fonts, spacing scale, button styles, section patterns
- Both sites should use the blue brand palette (not the current purple on residential)
- Shared header/footer pattern, with navigation adapted for each site's content
- Same typographic hierarchy (font families, sizes, weights)
- They should feel like siblings, not strangers

**Phase:** Phase 1 (design system / shared CSS). Must happen before individual site builds.

---

### Pitfall 7: Over-Designed, Under-Informative

**What goes wrong:** The demo has beautiful animations, parallax scrolling, and fancy hover effects but makes it hard to find the phone number, service list, or business hours. Form over function.

**Prevention:**
- Contact information (phone, address, hours) in the header or immediately accessible from every view
- Services listed clearly with plain language, not hidden behind carousels or tabs
- No auto-playing anything (carousels, videos, animations). Angie's current sites use RevSlider carousels and they look dated. Do not replace dated carousels with modern carousels — replace them with static, well-designed content
- Subtle micro-interactions are fine (hover states, smooth scrolls) but nothing that delays information delivery
- If an animation takes longer than 300ms before showing content, cut it

**Phase:** Phase 2 (build). Design decisions during implementation.

---

### Pitfall 8: Contact Information Not Actionable

**What goes wrong:** The phone number is displayed as plain text (not a clickable link on mobile). The address does not link to Google Maps. The hours are buried at the bottom of the page or missing entirely.

**Prevention:**
- Phone number: `<a href="tel:7176150968">717-615-0968</a>` — always
- Address: link to Google Maps with the exact business location
- Hours: visible in the contact section AND the footer
- Consider a sticky mobile CTA — a "Call Now" or "Get a Quote" button fixed to the bottom of the screen on mobile
- The contact form should look functional even if it does not submit — proper input styling, validation states, a clear submit button, and a note explaining it is a demo

**Phase:** Phase 2 (build). Part of the HTML implementation.

---

### Pitfall 9: Ignoring What Her Current Sites Do Right

**What goes wrong:** The demo "improves" things that Angie actually likes about her current sites, or removes content she considers important. For example, removing her personal story, changing her tagline, or restructuring her service list in a way she does not recognize.

**Prevention:**
- Preserve all key content: her story/bio, her service names, her trust signals, her contact information exactly as stated
- Do not editorialize her copy. Clean it up for formatting, but do not rewrite her value propositions
- Keep the service categories she uses (office cleaning, carpet cleaning, floor services for commercial; home cleaning for residential)
- The improvement should be in presentation (design, speed, mobile) not in content changes

**Detection:** Compare the demo content side-by-side with her current sites. Every piece of information on her current site should appear on the demo, presented better.

**Phase:** Phase 1 (content extraction). Content inventory before design.

---

### Pitfall 10: No Clear "This Is What I Built For You" Framing

**What goes wrong:** Angie receives a Vercel URL with no context. She clicks it and sees a website but does not immediately understand that this was custom-built for her as a demo. She might think it is a template, a competitor's site, or spam.

**Prevention:**
- The email containing the link matters as much as the site itself (outside code scope, but the demo should support the narrative)
- The demo site should feel bespoke — her name, her photos (if available), her services, her phone number, her Lancaster, PA location
- Consider a subtle "Demo preview — built for Angie's Custom Cleaning" watermark or banner that can be removed for production (but be careful: this must not look like the site is incomplete)
- The Vercel subdomain should ideally include her business name if possible

**Phase:** Phase 3 (deployment and polish). Final touches before sending.

---

### Pitfall 11: Gift Cards Handled Poorly

**What goes wrong:** The residential site currently sells gift cards via WooCommerce. The demo either: (a) includes a "Buy Gift Cards" button that goes nowhere (frustrating, broken feel), or (b) completely removes gift cards with no acknowledgment (Angie might think the developer overlooked a key feature).

**Prevention:**
- Include a gift card section with clear language: "Gift cards available — online purchasing coming in the full site launch"
- Show the concept (gift card design, pricing tiers) without pretending the purchase flow works
- This demonstrates that you understand her full business, not just the cleaning services

**Phase:** Phase 2 (residential site build). Content decision during implementation.

---

## Minor Pitfalls

Mistakes that are noticeable but recoverable.

### Pitfall 12: Inconsistent or Amateurish Typography

**What goes wrong:** Too many font families, inconsistent sizes, awkward line lengths, or poor contrast. The site reads as "amateur designer" rather than "professional developer."

**Prevention:**
- Maximum two font families: one for headings, one for body (or one family for both)
- Consistent type scale (e.g., 16px body, 20/24/32/40px heading hierarchy)
- Line length: 45-75 characters per line for body text (use max-width on text containers)
- Sufficient contrast: WCAG AA minimum (4.5:1 for body text, 3:1 for large text)
- Use system font stacks or a single clean Google Font (Inter, Open Sans, or similar)

**Phase:** Phase 1 (design system). Define typography before building sections.

---

### Pitfall 13: Footer Neglected

**What goes wrong:** The footer is an afterthought — tiny text, missing information, or just a copyright line. For local service businesses, the footer is heavily used. Customers scroll to the bottom looking for contact info, hours, and service areas.

**Prevention:**
- Footer should include: phone, address, hours, service area, brief service list, and any professional affiliations
- Footer should be visually polished, not just "the stuff at the bottom"
- Include the business's actual service area (Lancaster County, York, PA)

**Phase:** Phase 2 (build). Part of the section-by-section implementation.

---

### Pitfall 14: Forgetting Accessibility Basics

**What goes wrong:** No alt text on images, poor color contrast, form inputs without labels, non-semantic HTML. While Angie may not check accessibility specifically, poor accessibility often manifests as poor usability — screen readers aside, bad contrast means hard to read, missing labels mean confusing forms.

**Prevention:**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Alt text on every image (descriptive for content images, empty for decorative)
- Form labels associated with inputs via `for` attribute
- Color contrast checked for all text/background combinations
- Skip navigation link (simple to add, shows professionalism)

**Phase:** Phase 2 (build). Built into HTML/CSS implementation, not bolted on.

---

### Pitfall 15: Vercel URL Looks Sketchy

**What goes wrong:** The auto-generated Vercel URL is something like `angies-cleaning-p4k2x.vercel.app` — it looks temporary and untrustworthy. Angie might wonder if it is a phishing link, especially receiving it from someone she does not know well.

**Prevention:**
- Use a clear Vercel project name so the URL reads well: `angies-commercial-cleaning.vercel.app` or similar
- If possible, use two clearly named projects: one for commercial, one for residential
- Mention the URL format in the email so she knows what to expect

**Phase:** Phase 3 (deployment). Project naming during Vercel setup.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Content extraction | Fabricating information not on current sites | Only use text from existing sites or verifiable public info |
| Design system | Over-engineering for a demo | Keep it simple: colors, fonts, spacing. No component library needed |
| Hero section | Generic "Welcome to our website" messaging | Lead with a specific value proposition: "Lancaster's Award-Winning Cleaning Team" |
| Services sections | Vague service descriptions | Use her exact service names and descriptions from current sites |
| Trust signals | Treating awards as decoration | Make them a core structural element, not sidebar widgets |
| Contact section | Non-functional form with no explanation | Label as demo; make phone/address fully functional |
| Mobile testing | Testing only in browser DevTools | Test on a real phone before sending the email |
| Deployment | Sending both URLs in one email | Consider sending commercial first, residential second — don't overwhelm |
| Gift cards | Ignoring WooCommerce feature exists | Acknowledge in demo without pretending it works |
| Two-site consistency | Building sites sequentially without shared system | Build the shared design tokens first, then diverge for content |

## The Meta-Pitfall: Forgetting This Is a Sales Conversation, Not a Dev Project

Every decision should be evaluated through: "Will this make Angie want to hire us?"

She does not care about:
- Lighthouse scores (she cares that it feels fast)
- Semantic HTML (she cares that it looks right)
- CSS architecture (she cares that it is consistent)
- The tech stack (she cares that it is not broken like her current sites)

She DOES care about:
- Does it look better than what she has right now? (In the first 3 seconds)
- Does it show MY business accurately? (Her name, her services, her awards)
- Does it work on my phone? (She will check)
- Can my customers find my phone number? (Most important action)
- Does this person actually finish what they start? (No placeholder text, no broken sections)

The demo must answer "yes" to every one of these in under 30 seconds of viewing.

---

## Sources

- Project documentation: PROJECT.md, .planning/PROJECT.md, docs/requirements.md (HIGH confidence — primary source for all project-specific context)
- Domain expertise in local business web design, client sales via portfolio work, and demo site strategy (MEDIUM confidence — based on established patterns, not verified against current research for this specific project)
- Note: WebSearch and WebFetch were unavailable during this research session. Pitfalls are derived from project-specific context combined with domain knowledge of local service business website design patterns. Confidence is MEDIUM-HIGH because the pitfalls are well-established patterns in this domain, but external validation was not possible.
