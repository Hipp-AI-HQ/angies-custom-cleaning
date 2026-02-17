# Angie's Custom Cleaning — Demo Websites

Demo websites for Angie's Custom Cleaning (Lancaster, PA). Two static sites built with vanilla HTML/CSS/JS to demonstrate web development capability to a prospective client.

## Quick Reference

| Site | Domain | Directory | Purpose |
|------|--------|-----------|---------|
| Commercial | angiescommercialcleaning.com | `commercial/` | Commercial cleaning services |
| Residential | angiescustomcleaning.com | `residential/` | Residential cleaning + gift cards |

## Project Rules

**See `.claude/rules/` for all project guidelines:**

- **`technical-defaults.md`** — Architecture, CSS system, browser support, deployment workflow
- **`design-rules.md`** — Brand guidelines (colors, typography), demo quality standards, content guidelines
- **`workflow.md`** — Design iteration (screenshot → review → fix → repeat), session init, commit process
- **`skills-guide.md`** — Available skills (`/frontend-design`, `/ux-researcher-designer`, etc.) and when to use them

## Session Start

1. Read CLAUDE.md (this file) — You're doing it now ✓
2. Read PROJECT.md (current state, decisions, what's been done)
3. Check git status for uncommitted changes
4. Confirm which site you're working on (`commercial/` or `residential/`)

## Key Principles

1. **Demo quality first** — Visual impact, speed, and polish over feature completeness
2. **One site at a time** — Focus on `commercial/` or `residential/` per session (don't mix unless sharing components)
3. **Mobile-first** — Design for phones first, then scale up (cleaning service customers search on mobile)
4. **Read PROJECT.md before building** — Check what's been done to avoid duplication
5. **Document decisions** — Update PROJECT.md when making technical or design choices

## File Organization

- `docs/` — Site analysis, brand assets, reference materials
- `docs/brand-assets/` — Logos, images, colors from current sites
- `commercial/` — Commercial cleaning site source
- `residential/` — Residential cleaning site source
- `.claude/rules/` — Project rules and guidelines (you are here!)
- `.tmp/` — Scratch files, intermediate processing (gitignored)

## Git Conventions

- Single repo covering both sites
- Commit one site at a time unless sharing components
- Commit messages: `verb: what changed and which site` (e.g., "feat: add hero section to commercial site")
- Include co-author attribution: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`
- Do not commit `.tmp/`, `node_modules/`, `.DS_Store`
