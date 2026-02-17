# Skills Guide

Skills are specialized workflows invoked with `/skill-name` in conversation. They provide structured approaches to complex tasks.

---

## Available Skills

### Project Skills

#### `/read` — Load Project Context

**Purpose:** Automatically load CLAUDE.md and PROJECT.md at session start

**When to use:**
- Beginning of every session
- After context reset
- When you need to refresh project knowledge

**What it does:**
- Reads CLAUDE.md for project rules and guidelines
- Reads PROJECT.md for current state and decisions
- Provides full project context

**Output:** Project context loaded into conversation

---

### Creative Design Skills

These skills are customized for vanilla HTML/CSS/JS development (no React/frameworks).

#### `/frontend-design` — Visual Design Iteration

**Purpose:** Structured workflow for improving layouts, adjusting styles, and visual polish

**When to use:**
- Making significant design changes
- Improving hero sections, navigation, or page layouts
- Adjusting visual hierarchy
- Iterating on color schemes or typography
- Refining spacing and alignment

**Focuses on:**
- CSS architecture and organization
- Responsive design (mobile, tablet, desktop)
- Visual hierarchy and composition
- Brand consistency
- Design system adherence

**Output:**
- Design analysis with specific recommendations
- Implementation plan with file paths
- CSS changes using custom properties
- Responsive considerations
- Testing checklist

**Example usage:**
```
/frontend-design

I want to improve the commercial site's hero section to have more visual impact
and better highlight our key differentiators.
```

**Customizations:**
- References vanilla HTML sections (not React components)
- Uses CSS custom properties from `css/variables.css`
- Mentions Puppeteer screenshot workflow
- Aligns with demo quality standards

---

#### `/ux-researcher-designer` — UX Research & Optimization

**Purpose:** Research-driven UX improvements for conversion and usability

**When to use:**
- Improving conversion flows (contact forms, CTAs)
- Simplifying navigation or user journeys
- Analyzing friction points
- Optimizing for mobile usability
- Testing information architecture

**Focuses on:**
- User journey mapping
- Conversion optimization
- Call-to-action placement and messaging
- Form UX and validation
- Mobile-first interaction patterns
- Accessibility considerations

**Output:**
- UX audit with identified issues
- User journey analysis
- Prioritized recommendations
- Implementation plan with A/B testing suggestions
- Success metrics to track

**Example usage:**
```
/ux-researcher-designer

Analyze the contact form UX on the residential site and recommend improvements
for mobile users to increase form completion rate.
```

**Customizations:**
- Focuses on static site patterns
- References cleaning service customer personas
- Considers mobile-first approach for local service businesses
- Emphasizes trust signals and credibility

---

#### `/mobile-design` — Mobile Experience Optimization

**Purpose:** Systematic mobile testing and optimization

**When to use:**
- Testing mobile responsiveness
- Improving touch target sizes
- Optimizing for small screens
- Checking mobile performance
- Verifying mobile-first design

**Focuses on:**
- Mobile-first CSS patterns
- Touch-friendly interactions (48x48px minimum)
- Performance on mobile devices
- Responsive breakpoints (< 768px, 768px+, 1024px+)
- Mobile navigation patterns

**Output:**
- Mobile experience audit
- Device-specific issues identified
- Touch target analysis
- Performance recommendations
- Testing checklist across devices

**Example usage:**
```
/mobile-design

Test the commercial site's mobile experience and identify any usability issues,
especially around navigation and CTAs.
```

**Customizations:**
- References CSS custom properties for responsive design
- Mentions hamburger menu and mobile CTA bar patterns
- Considers cleaning service customer mobile usage
- Emphasizes tap-to-call functionality

---

#### `/3d-web-experience` — Advanced Visual Effects

**Purpose:** Add visual interest through animations and effects

**When to use:**
- Creating hero animations
- Implementing scroll effects
- Adding subtle motion design
- Enhancing visual engagement
- Polishing interactions

**Focuses on:**
- CSS animations and transitions
- Subtle 3D transforms (translateZ, rotateX/Y)
- Performance-conscious effects
- Progressive enhancement
- Scroll-triggered animations

**Output:**
- Animation recommendations
- CSS/vanilla JS implementations (no Three.js/WebGL for these demos)
- Performance considerations
- Fallbacks for older browsers
- Integration with existing patterns (AOS)

**Example usage:**
```
/3d-web-experience

Add a subtle parallax effect to the awards slider on scroll, keeping performance
in mind for mobile devices.
```

**Customizations:**
- Vanilla CSS/JS only (no Three.js, WebGL, or heavy libraries)
- References existing patterns (AOS, awards slider animations)
- Emphasizes lightweight, performant animations
- Considers demo quality over complexity

---

## When to Use Skills vs. Direct Requests

### Use Skills For:

**Structured Workflows**
- Complex design decisions requiring research → analysis → implementation
- UX improvements affecting user flows across multiple sections
- Mobile optimization requiring systematic device testing
- Visual effects needing performance considerations

**Multi-Step Processes**
- Tasks with multiple dependencies
- Changes affecting multiple files or sections
- Decisions requiring trade-off analysis

**Analysis-Driven Work**
- When you need to understand "why" before "what"
- Research-backed recommendations
- Data-driven decisions

### Use Direct Requests For:

**Simple Changes**
- Typo fixes
- Color tweaks (single property change)
- Spacing adjustments (one or two values)
- Content updates

**Single-File Edits**
- Changes confined to one file
- Clear, straightforward implementations
- No analysis needed

**Clear Requirements**
- User provides exact specifications
- No ambiguity about approach
- Implementation is obvious

---

## Skill Workflow Examples

### ❌ Vague Request
> "Make the hero section better"

**Problem:** Too vague, no clear objective

### ✅ Structured Skill Usage
```
/frontend-design

I want to improve the commercial site's hero section. Goals:
1. Increase visual impact to grab attention immediately
2. Better highlight "background-checked staff" differentiator
3. Make CTAs more prominent and conversion-focused

Current issues I've noticed:
- Awards slider gets lost below the fold on mobile
- Headline could be more benefit-focused
- Gold CTA button doesn't stand out enough against aurora background
```

**Why this works:**
- Clear objectives
- Specific issues identified
- Provides context for analysis

---

### ❌ Too Broad
> "Fix the mobile experience"

**Problem:** No specifics, could mean anything

### ✅ Focused Skill Usage
```
/mobile-design

Test the residential site's mobile experience on iPhone-sized screens (375px width).
Focus areas:
1. Navigation usability (hamburger menu, tap targets)
2. Contact form on mobile (field sizes, validation, keyboard behavior)
3. CTA buttons (size, placement, accessibility)
4. Awards slider (does it work on touch devices?)

I want to ensure mobile users can easily request a quote without frustration.
```

**Why this works:**
- Specific device context
- Clear focus areas
- Defined success criterion

---

### ❌ Missing Context
> "Add animations"

**Problem:** No context about where, why, or what kind

### ✅ Contextual Skill Usage
```
/3d-web-experience

I want to add subtle animations to the residential site to make it feel more polished.
Target areas:
1. Hero section: Add a gentle fade-in + rise effect for content (already using AOS elsewhere)
2. Service cards: Subtle hover lift effect (currently have basic :hover)
3. Awards slider: Already infinite scroll, maybe add parallax on scroll?

Constraints:
- Must work on mobile (performance is critical)
- Should enhance, not distract
- Keep file size small (no heavy libraries)

Goal: Make the site feel more premium without sacrificing demo site speed/simplicity.
```

**Why this works:**
- Specific areas identified
- Constraints clearly stated
- Goal-oriented with rationale

---

## Tips for Effective Skill Usage

### 1. Be Specific

Instead of: "Improve the design"
Try: "Improve visual hierarchy in the services section by adjusting heading sizes and card spacing to guide attention to CTAs"

### 2. Provide Context

- What problem are you solving?
- What's the current state?
- What's the desired outcome?
- Any constraints (performance, mobile, accessibility)?

### 3. Reference Files

Skills work better when you mention specific files:
- "The hero section in `commercial/index.html`"
- "The navigation styles in `css/commercial.css`"
- "The mobile breakpoint at line 72 in `css/utilities.css`"

### 4. Set Clear Goals

- "Increase form conversion rate"
- "Improve mobile usability"
- "Add visual polish without hurting performance"
- "Make CTAs more prominent"

### 5. Mention Constraints

- "Must work on mobile"
- "Keep under 50KB"
- "No JavaScript dependencies"
- "Accessible to screen readers"

---

## Combining Skills with Workflow

Skills integrate with the design iteration workflow:

**Typical Flow:**
1. Use `/frontend-design` to plan improvements
2. Implement CSS/HTML changes
3. Screenshot with Puppeteer (from workflow.md)
4. Use `/mobile-design` to test responsiveness
5. Iterate based on feedback
6. Use `/3d-web-experience` to add polish
7. Final screenshot verification
8. Commit and deploy (workflow.md)

Skills provide the "what" and "why", workflow provides the "how".

---

## Skill Customization Notes

All creative design skills have been customized for this project:

- ✅ React/JSX references removed
- ✅ npm/build tool references removed
- ✅ Vanilla HTML/CSS/JS patterns emphasized
- ✅ Project structure (`commercial/`, `residential/`) mentioned
- ✅ CSS custom properties system referenced
- ✅ Existing patterns referenced (AOS, CountUp, awards slider)
- ✅ Demo quality standards aligned
- ✅ Puppeteer workflow integrated

If you notice any skill referencing React, components, or npm commands, that's an error—skills should only reference vanilla web technologies for this project.
