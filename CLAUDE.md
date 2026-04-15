@AGENTS.md

# OrlandoCafes.com

A curated cafe directory for Central Florida. Next.js 16.2.3, React 19, Sanity 5.20, Tailwind 4, TypeScript strict. Deployed on Vercel.

## Critical Rule

Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code. This is Next.js 16 with breaking changes from training data.

## Tech Stack

- **Framework**: Next.js 16.2.3 App Router (`src/` directory)
- **UI**: React 19, Tailwind CSS 4, shadcn/ui (`base-luma` style, `taupe` base, Remix icons, RSC default)
- **CMS**: Sanity 5.20 (project `sfp38p3m`, dataset `production`, API version `2024-01-01`)
- **Path alias**: `@/*` maps to `./src/*`
- **Class merging**: `cn()` from `@/lib/utils`
- **Fonts**: Mulish (body, `--font-sans`), Baloo 2 (headings, `--font-heading`)

## Design Tokens

- `#3D1A08` — Deep espresso (CTAs, nav button, section headings)
- `#FCEEE3` — Warm beige (hero backgrounds, card backgrounds)
- `#B5450F` — Burnt orange (accent badges)
- `#252525` — Near-black (card shadows, borders, footer)
- `#FAF5F0` — Light cream (tag backgrounds)
- `#FFF8F0` — Softer cream (info cards)
- `#E8DDD2` — Muted beige (unfilled indicators)

Card pattern: `rounded-2xl border-2 border-[#252525] bg-white shadow-[4px_4px_0px_0px_#252525]` with `hover:translate-x-1 hover:translate-y-1 hover:shadow-none`

Page container: use `content-container` class.

## Agent Team

Five specialized agents in `.claude/agents/`:

| Agent | Scope |
|-------|-------|
| **ux-designer** | Design review, accessibility, UX — read-only, never writes code |
| **frontend-dev** | `src/components/`, page layouts, Tailwind styling |
| **seo-agent** | Meta tags, Open Graph, structured data, sitemap, page titles |
| **cms-dev** | `src/sanity/`, `src/lib/sanity/`, `src/lib/types.ts` |
| **code-reviewer** | Quality gate — read-only, runs type checks and lint |

### Coordination Protocol

1. Feature requests → run `/plan-feature` to produce a plan in `thoughts/shared/plans/`
2. Plans assign tasks to agents in sequence: **CMS → Frontend → SEO → UX Review → Code Review**
3. Each agent stays within its file ownership boundaries
4. After changes, run `npx tsc --noEmit` and `npx eslint src/`
5. Before deploy, run `/deploy-check`

### Data Flow

Sanity schema → TypeScript types (`src/lib/types.ts`) → GROQ queries (`src/lib/sanity/queries.ts`) → Server components (pages) → Client components (`src/components/`)

## Skills (Slash Commands)

- `/plan-feature` — Plan a feature with agent assignments
- `/review-code` — Run code review on recent changes
- `/deploy-check` — Pre-deployment verification checklist
- `/sanity-query` — Write or debug GROQ queries
