# YOTB — Year of the Build

## Project Overview

Public accountability log for building and launching 12 projects in 12 months.

- **Domain:** yearofthebuild.xyz
- **Business entity:** Getty Made LLC (see repos/gettymade — READONLY)
- **Individual projects:** Live in their own repos, not here

This repo contains:
- The YOTB website (Astro + React + MDX)
- Weekly devlog content (public)
- Draft docs (private)
- Newsletter via Beehiiv (manual send, content automated)

## Tech Stack

- **Framework:** Astro (static site, islands architecture)
- **Components:** React (hydrated only when interactive)
- **Content:** MDX (Markdown + JSX components)
- **Styling:** ITCSS / Atomic Design principles
- **Newsletter:** Beehiiv (free tier, manual send)
- **Hosting:** Vercel
- **Analytics:** PostHog

## Architecture

### Content Flow
1. Write devlog in MDX (single source of truth)
2. Push to main → Vercel builds static site
3. Run render script → paste into Beehiiv → send
4. Same content, two channels

### Component Philosophy
- Static by default. Zero JS unless explicitly hydrated.
- Use `client:visible` for interactive demos below the fold
- Use `client:load` sparingly (only for immediately-needed interactivity)
- Build reusable components for the devlog (callouts, project cards, before/after sliders, etc.)

## Newsletter

- **Platform:** Beehiiv (free tier, up to 2,500 subscribers)
- **Publication URL:** https://yotb.beehiiv.com
- **Subscribe embed:** Add to site when built

### Publish Workflow
1. Write devlog in MDX
2. Git push (deploys site via Vercel)
3. Run `npm run newsletter` to render MDX to paste-ready HTML
4. Paste into Beehiiv editor, preview, send

### TODO (when site is built)
- [ ] Create render script (`scripts/newsletter.js`) — converts MDX to clean HTML
- [ ] Add subscribe component to site layout
- [ ] Add Beehiiv subscribe link to footer

## Visual Direction

- **Bold.** No constraints. Get weird.
- Strong typography
- Exceptional responsive handling
- Interactive elements encouraged in posts
- This is NOT gettymade branding — YOTB is its own visual identity

## Content Cadence

- Weekly devlogs, published consistently
- Goal: stay 2-3 weeks ahead with queued content
- Some weeks heavier than others, but never skip

## Definition of "Launch" (for the 12 projects)

A project is launched when:
1. Public repo on GitHub
2. Landing page live
3. Posted in relevant subreddits
4. Listed on Product Hunt (if applicable)

## Working Constraints

- `repos/gettymade` is **READONLY** — reference only, never modify
- Individual project repos are separate — don't try to import their components
- This site writes *about* projects, it doesn't contain them

## Claude's Role

- Help write devlog content
- Build and refine interactive components for posts
- Maintain site infrastructure
- Build newsletter render script when site is ready
- Push back on scope creep — 12 projects is already ambitious
- Keep the weird alive
