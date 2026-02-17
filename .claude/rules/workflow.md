# Workflow

## Session Initialization

At the start of each session, follow this sequence:

1. **Read CLAUDE.md** — Automatically loaded via `/read` skill (if configured)
2. **Read PROJECT.md** — Check current state, decisions, and what's been done
3. **Check git status** — Review uncommitted changes
   ```bash
   git status
   ```
4. **Confirm scope** — Which site(s) are you working on today?
   - Commercial (`commercial/`)
   - Residential (`residential/`)
   - Both (if sharing components or making cross-site changes)

This ensures you have full context before making changes.

---

## Design Iteration Workflow

When iterating on design (layout, styling, visual polish), follow this structured approach:

### Step 1: Make HTML/CSS Changes

- Edit files directly in `commercial/` or `residential/`
- Use CSS custom properties from `css/variables.css`
- Follow mobile-first approach
- Reference existing patterns and components

### Step 2: Screenshot with Puppeteer

Generate screenshots to visually review changes:

**Full page screenshot:**
```bash
npx puppeteer screenshot commercial/index.html --fullpage
```

**Mobile viewport (375x667):**
```bash
npx puppeteer screenshot commercial/index.html --viewport 375x667
```

**Tablet viewport (768x1024):**
```bash
npx puppeteer screenshot commercial/index.html --viewport 768x1024
```

**Desktop viewport (1440x900):**
```bash
npx puppeteer screenshot commercial/index.html --viewport 1440x900
```

Screenshots are saved to the current directory by default.

### Step 3: Review Screenshot

Examine the screenshot for:

- **Spacing and Alignment:**
  - Measure padding/margins (should match spacing system)
  - Check alignment of elements
  - Verify consistent gutters and gaps

- **Typography:**
  - Font sizes match design system (`--fs-*` tokens)
  - Font weights correct (Nunito 700/800, Open Sans 400/600)
  - Line heights appropriate for readability

- **Colors:**
  - Exact brand colors used (`#005982` blue, `#C5961F` gold)
  - Color contrast meets WCAG AA (4.5:1 body, 3:1 large)
  - Consistent use of color tokens

- **Responsive Behavior:**
  - Mobile: content stacks vertically, touch targets 48x48px min
  - Tablet: 2-column grids, navigation visible
  - Desktop: 3-column grids, full layout

- **Visual Hierarchy:**
  - Most important elements stand out
  - Clear section breaks
  - CTAs are prominent

- **Polish:**
  - Border radii consistent
  - Shadows appropriate
  - Hover states work
  - Loading states if applicable

### Step 4: Fix Issues Found

Based on review, make targeted fixes:

- Adjust spacing using CSS custom properties
- Correct color values
- Fix typography (sizes, weights, line heights)
- Improve alignment
- Enhance visual hierarchy
- Address responsive issues

### Step 5: Re-Screenshot and Verify

Generate new screenshots and compare:

```bash
npx puppeteer screenshot commercial/index.html --fullpage
```

Compare against previous screenshot. Look for:
- Issues resolved
- No new issues introduced
- Improvement in visual quality

### Step 6: Repeat Until Satisfied

**Minimum 2-3 iterations recommended**

Don't stop after one pass. Design iteration is about refinement:
- First pass: Major issues
- Second pass: Fine-tuning
- Third pass: Final polish

Only stop when:
- All issues resolved
- Visual quality meets demo standards
- User says to proceed

---

## Commit Workflow

Before committing changes, follow this checklist:

### 1. Review All Changed Files

```bash
git status
git diff
```

Check:
- Which files changed?
- Are changes intentional?
- Any unintended side effects?

### 2. Check Both Sites (If Applicable)

If changes affect shared patterns:
- Review `commercial/index.html`
- Review `residential/index.html`
- Verify consistency

If changes are site-specific:
- Confirm no cross-site impact

### 3. Verify No Unintended Side Effects

- Test navigation (desktop and mobile)
- Check responsive behavior
- Verify CTAs work
- Test forms (if changed)
- Check links

### 4. Stage Specific Files

**Prefer staging specific files over `git add -A`:**

```bash
git add commercial/index.html commercial/css/commercial.css
```

This prevents accidentally including:
- Sensitive files (`.env`, credentials)
- Large binaries
- Temporary files

### 5. Write Descriptive Commit Message

**Format:** `verb: what changed and which site`

**Good examples:**
```bash
feat: add testimonials section to residential site
fix: mobile navigation overflow on commercial site
style: improve hero spacing on both sites
refactor: extract awards slider to shared component
```

**Bad examples:**
- "updates" (too vague)
- "fix stuff" (not descriptive)
- "WIP" (don't commit unfinished work)

**Use HEREDOC for multi-line messages:**
```bash
git commit -m "$(cat <<'EOF'
feat: add testimonials section to residential site

Add three client testimonials with responsive grid layout.
Includes hover effects and proper attribution.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

### 6. Push to Remote

```bash
git push
```

This triggers automatic Vercel deployment.

---

## Deployment Workflow

After pushing to `main`:

### 1. Verify Vercel Deployment

**Option A: Vercel Dashboard**
- Visit vercel.com/dashboard
- Check deployment status
- Review build logs if errors occur

**Option B: Vercel CLI (if installed)**
```bash
vercel ls
```

### 2. Test Deployed Site

**On Mobile Device:**
- Open site URL on actual phone
- Test navigation
- Verify responsive behavior
- Check touch targets (48x48px min)
- Test CTAs and links

**On Desktop (DevTools Mobile Emulation):**
- Open Chrome DevTools (Cmd+Opt+I)
- Toggle device toolbar (Cmd+Shift+M)
- Test various devices (iPhone, iPad, Android)
- Check different orientations

### 3. Run Lighthouse Audit (If Significant Changes)

Only run Lighthouse for major changes:

**Via Chrome DevTools:**
1. Open DevTools (Cmd+Opt+I)
2. Go to "Lighthouse" tab
3. Select categories (Performance, Accessibility, Best Practices, SEO)
4. Click "Analyze page load"

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

**If scores are below target:**
- Review suggestions
- Optimize images
- Improve accessibility
- Fix best practices violations

### 4. Update PROJECT.md (If Needed)

For significant milestones or changes:
- Update PROJECT.md with deployment notes
- Document major changes
- Note any decisions made

---

## Common Tasks

### Opening Site Locally

```bash
open commercial/index.html
open residential/index.html
```

This opens the HTML file in your default browser.

### Comparing Sites

```bash
diff commercial/index.html residential/index.html
```

Useful for checking consistency.

### Taking Screenshots of Both Sites

```bash
npx puppeteer screenshot commercial/index.html --fullpage
npx puppeteer screenshot residential/index.html --fullpage
```

### Searching for a Pattern

```bash
grep -r "aurora-background" commercial/
```

---

## Using Skills

Skills provide structured workflows for complex tasks. See `.claude/rules/skills-guide.md` for details.

**When to use skills:**
- Design iteration with structured feedback
- UX research and optimization
- Mobile experience testing
- Visual effects implementation

**When to use direct requests:**
- Quick fixes (typo, color change, spacing adjustment)
- Single-file edits
- Straightforward changes with clear requirements

**Invoking skills:**
```
/frontend-design
/ux-researcher-designer
/mobile-design
/3d-web-experience
```

---

## Troubleshooting

### Deployment Failed

1. Check Vercel dashboard for error messages
2. Review git commit for syntax errors in HTML/CSS
3. Fix issues locally
4. Commit and push again

### Screenshot Not Generating

1. Verify Puppeteer permission in `.claude/settings.local.json`
2. Check file path is correct
3. Try absolute path if relative doesn't work
4. Check for syntax errors in HTML

### Changes Not Appearing

1. Hard refresh browser (Cmd+Shift+R)
2. Clear browser cache
3. Check if correct file was edited
4. Verify file was saved

### Mobile Layout Broken

1. Check breakpoints in CSS (768px, 1024px)
2. Test in browser DevTools mobile emulation
3. Verify viewport meta tag in HTML
4. Check touch target sizes (48x48px minimum)
