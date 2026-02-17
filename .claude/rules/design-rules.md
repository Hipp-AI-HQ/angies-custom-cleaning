# Design Rules

## Brand Guidelines

### Color Palette

**Primary Colors:**
- `--color-primary: #005982` — Main brand blue
- `--color-primary-light: #0077AD` — Lighter blue for hovers/highlights
- `--color-primary-dark: #003D5C` — Dark blue for dark sections/hero backgrounds
- `--color-primary-50: #E6F2F8` — Very light blue for subtle backgrounds
- `--color-primary-100: #B3D9EA` — Light blue for borders/accents

**Accent Colors (Gold):**
- `--color-accent: #C5961F` — Brand gold (primary CTAs, highlights)
- `--color-accent-hover: #A67C1A` — Gold hover state
- `--color-accent-light: #FDF3DC` — Light gold for backgrounds/subtle accents

**Background Colors:**
- `--color-bg: #FDFAF6` — Warm cream-white (primary background)
- `--color-bg-alt: #F5F0EB` — Alternating section background
- `--color-surface: #FFFFFF` — Cards and elevated surfaces

**Text Colors:**
- `--color-text: #2C3E50` — Primary body text (dark blue-gray)
- `--color-text-light: #5D6D7E` — Secondary text, captions, metadata
- `--color-text-on-dark: #F8F9FA` — Text on dark backgrounds
- `--color-text-on-primary: #FFFFFF` — Text on primary blue background

**Use These Colors Consistently:**
- CTAs and important actions: Gold (`--color-accent`)
- Headers, navigation, primary UI: Blue (`--color-primary`)
- Backgrounds: Warm cream (`--color-bg`, `--color-bg-alt`)
- Text: Dark blue-gray (`--color-text`)

### Typography

**Headings:**
- **Font Family:** Nunito
- **Weights:** 700 (bold), 800 (extra bold)
- **Use:** All headings (h1, h2, h3, section titles)
- **Characteristics:** Bold, impactful, friendly

**Body Text:**
- **Font Family:** Open Sans
- **Weights:** 400 (regular), 600 (semi-bold)
- **Use:** Paragraphs, links, labels, UI text
- **Characteristics:** Clean, readable, professional

**Type Scale:**
- Uses fluid typography with `clamp()` for responsive sizing
- Defined in `css/variables.css` as `--fs-xs` through `--fs-xxl`
- Scales automatically between breakpoints

**Line Heights:**
- Headings: `--line-height-heading` (tighter, 1.2)
- Body: `--line-height-body` (comfortable, 1.6)

### Spacing System

**Scale:**
- `--space-xs` → Extra small (4-8px)
- `--space-sm` → Small (8-12px)
- `--space-md` → Medium (16-24px)
- `--space-lg` → Large (24-32px)
- `--space-xl` → Extra large (32-48px)
- `--space-2xl` → 2X large (48-64px)
- `--space-3xl` → 3X large (64-80px)
- `--space-4xl` → 4X large (80-120px)

**Usage:**
- Use spacing tokens consistently
- Don't hard-code pixel values when a token exists
- Maintain visual rhythm through consistent spacing

---

## Demo Quality Standards

These sites are **demos** to showcase capability. Prioritize:

1. **Visual Impact** — First impressions matter
   - Hero sections must be compelling
   - Clean, modern aesthetic
   - Professional polish

2. **Speed** — Sites must load fast
   - < 3s load time on 3G
   - Optimized images
   - Minimal dependencies

3. **Responsive Design** — Works on all devices
   - Mobile-first approach
   - Test on phones, tablets, desktops
   - Touch-friendly interactions

4. **Professional Trust Signals** — Build credibility
   - Awards prominently displayed
   - Background-checked staff messaging
   - Years in business, testimonials
   - Contact information easily accessible

5. **Conversion-Focused** — Clear calls-to-action
   - Primary CTA: "Get a Free Estimate" / "Get Your Free Quote"
   - Secondary CTA: "Call Now" with phone number
   - Multiple contact points throughout page

---

## Design Iteration Principles

### Mobile-First

- Design for mobile screens first (< 768px)
- Scale up to tablet (768px+) and desktop (1024px+)
- Cleaning service customers often search on phones
- Touch targets must be at least 48x48px

### Visual Hierarchy

- Most important elements first
- Use size, color, spacing to create hierarchy
- Hero section sets the tone
- Clear section breaks

### Consistency Across Sites

- Both sites share brand colors, typography, spacing
- Maintain consistent patterns (navigation, CTAs, footer)
- Site-specific content, but shared design language
- When changing one site, consider if the change applies to both

### Accessibility

- **WCAG AA Minimum:**
  - Color contrast: 4.5:1 for body text, 3:1 for large text
  - Touch targets: 48x48px minimum
  - Keyboard navigation support
  - ARIA attributes where needed
  - Semantic HTML structure

- **Screen Reader Support:**
  - Use `sr-only` class for screen-reader-only content
  - Alt text for all images
  - Clear heading hierarchy (h1 → h2 → h3)

---

## Content Guidelines

### Hero Section

- **Headline:** Clear value proposition (benefits, not features)
  - Commercial: "Maintaining Your Clean Legacy"
  - Residential: "More Time for What Matters"
- **Subtitle:** Supporting detail, trust signals
- **CTAs:** Primary (gold button) + Secondary (outline button)
- **Visual:** Aurora background effect + awards slider

### Service Descriptions

- **Focus on benefits,** not just features
- **Answer "What's in it for me?"** from customer perspective
- **Trust signals:** Background checks, insurance, awards
- **Specificity:** Avoid vague language, be concrete

### Calls-to-Action

- **Action-oriented:** "Get", "Call", "Schedule", "Request"
- **Clear benefit:** "Get a Free Estimate", not just "Submit"
- **Prominent placement:** Above fold, end of sections
- **Visual hierarchy:** Primary CTAs are gold, secondary are outlined

### Trust Signals

- **Awards:** Angie's List Super Service Award (2013-2017), Readers' Choice
- **Credentials:** Background-checked, bonded, insured
- **Experience:** "Since 2012", "12 years serving Lancaster"
- **Social Proof:** Testimonials (when available)

---

## Do Not "Improve" Unnecessarily

- **Don't add features not requested** by the user
- **Don't redesign** unless asked
- **Don't over-engineer** simple solutions
- **Don't add complexity** for hypothetical future needs
- **Do implement** what's requested, with attention to detail

---

## Design Review Checklist

Before finalizing any design change:

- [ ] Matches brand colors exactly
- [ ] Uses typography system (Nunito headings, Open Sans body)
- [ ] Follows spacing system (CSS custom properties)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Touch targets are 48x48px minimum
- [ ] Color contrast meets WCAG AA (4.5:1 body, 3:1 large text)
- [ ] CTAs are prominent and clear
- [ ] Loads quickly (optimized images, minimal dependencies)
- [ ] Consistent with other site (if applicable)
- [ ] Maintains professional polish

---

## Common Patterns

### Button Styles

- **Primary:** Gold background (`--color-accent`), white text, hover lift effect
- **Secondary:** White/transparent background, border, hover effect
- **Outline:** For hero sections on dark backgrounds
- **Size:** `--space-md` padding minimum, `--fs-base` or `--fs-md` font

### Card Styles

- **Background:** `--color-surface` (white)
- **Border Radius:** `--radius-lg`
- **Padding:** `--space-xl`
- **Shadow:** `--shadow-sm` (subtle)
- **Hover:** Lift effect with `--shadow-lg`

### Section Patterns

- **Padding:** `--space-4xl` top/bottom
- **Alternating Backgrounds:** `--color-bg` and `--color-bg-alt`
- **Dark Sections:** `--color-primary` background for statistics
- **Centered Content:** Max-width container, centered

### Hero Patterns

- **Background:** Aurora gradient effect + dark overlay
- **Text:** White with gradient effect
- **CTAs:** Gold primary + outline secondary
- **Awards Slider:** Infinite horizontal scroll below CTAs
