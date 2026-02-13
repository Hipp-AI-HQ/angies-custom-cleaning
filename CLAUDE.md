# Agent Instructions

## Project Overview

Demo websites for Angie's Custom Cleaning (Lancaster, PA). Two sites being rebuilt as modern static sites to demonstrate capability to a prospective client. These are **demos** — prioritize visual impact, speed, and polish over feature completeness.

## Sites

| Site | Current Domain | Directory | Purpose |
|------|---------------|-----------|---------|
| Commercial | angiescommercialcleaning.com | `commercial/` | Commercial cleaning services |
| Residential | angiescustomcleaning.com | `residential/` | Residential cleaning + gift cards |

## Session Initialization

1. Read CLAUDE.md (this file)
2. Read PROJECT.md (current state, decisions, what's been done)

## Principles

1. **Read PROJECT.md before building** — Check current state and what's been decided. Don't duplicate completed work.

2. **One site at a time** — Focus on `commercial/` or `residential/` in each work session. Don't mix changes across sites in the same commit unless they share a component.

3. **Demo quality** — These sites need to impress. Clean design, fast loading, responsive on all devices. The client was burned by a $5K dev who didn't deliver — our work needs to speak for itself.

4. **Mobile-first** — Design for mobile first, then scale up. Cleaning service customers often search on phones.

5. **Document decisions** — When a technical choice is made (framework, hosting, design direction), update PROJECT.md immediately.

## File Organization

- `docs/` — Site analysis, brand assets, reference materials
- `docs/brand-assets/` — Logos, images, colors pulled from current sites
- `commercial/` — Commercial cleaning demo site source
- `residential/` — Residential cleaning demo site source
- `.tmp/` — Scratch files, intermediate processing (gitignored)

## Git Conventions

- Single repo covering both sites
- Commit messages: describe what changed and which site (e.g., "Add hero section to commercial site")
- Do not commit `.tmp/`, `node_modules/`, `.DS_Store`
