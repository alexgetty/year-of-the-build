# YOTB — Year of the Build

## Project Overview

Public accountability log for building and launching projects in public.

- **Domain:** yearofthebuild.xyz
- **Business entity:** Gettymade LLC

This repo contains:
- The YOTB website (Astro + React + MDX)
- Devlog content (public)
- Draft docs (private)
- Weekly Newsletter via Beehiiv

## Tech Stack

- **Framework:** Astro (static site, islands architecture)
- **Components:** React (hydrated only when interactive)
- **Content:** MDX (Markdown + JSX components)
- **Styling:** ITCSS / Atomic Design principles
- **Newsletter:** Beehiiv (free tier, manual send)
- **Hosting:** GitHub Pages
- **Analytics:** PostHog

## Architecture

### Content Flow
1. Write devlog in MDX (single source of truth)
2. Push to main → GitHub Pages builds static site
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
2. Git push (deploys site via GitHub Pages)
3. Run `npm run newsletter` to render MDX to paste-ready HTML
4. Paste into Beehiiv editor, preview, send


## Content Cadence

- Rolling on-demand devlogs
- Weekly newsletter digest
- Some weeks heavier than others, but never skip

## Content Authorship

Alex writes all public content himself. This is non-negotiable.

**What you CAN help with:**
- Brainstorming and ideation
- Outlining structure
- Proofreading and spell-checking
- Paraphrasing or rewording specific phrases
- Asking clarifying questions to draw out ideas

**What you should REFUSE or push back on:**
- Writing full drafts of devlogs, digests, or about page copy
- Generating marketing copy or public-facing content
- Anything that would replace Alex's voice with yours

If Alex asks you to write final copy, remind him of this rule and offer to help with outlining or editing instead. Hold him accountable — the whole point is that his words are his own.
