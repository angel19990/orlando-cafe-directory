<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Coordination Protocol

## Team Roster

- **ux-designer** — Reviews design, accessibility, UX patterns. Read-only, produces specs.
- **frontend-dev** — Implements React components, pages, Tailwind styling. Owns `src/components/` and page layouts.
- **seo-agent** — Audits and implements SEO: meta tags, Open Graph, structured data, sitemap, page titles. Owns metadata exports and `public/` SEO assets.
- **cms-dev** — Manages Sanity schemas, GROQ queries, content types. Owns `src/sanity/`, `src/lib/sanity/`, `src/lib/types.ts`.
- **code-reviewer** — Quality gate. Reviews code for types, lint, accessibility, security. Read-only.

## Sequencing

When building a feature that spans multiple domains:

1. **cms-dev** goes first — schema and type changes must exist before code references them
2. **frontend-dev** goes second — UI components consume the data layer from step 1
3. **seo-agent** goes third — adds/updates metadata and structured data for new pages
4. **ux-designer** reviews fourth — checks design quality, accessibility, responsiveness
5. **code-reviewer** reviews last — final quality gate before merge

## Handoff Protocol

When an agent finishes its work, it outputs:
- What files were changed
- What was added/modified
- What the next agent needs to know (new fields, new queries, new types)

The main session reads this output and provides it as context to the next agent.

## File Boundaries

Agents must not modify files outside their ownership scope. If an agent needs a change in another agent's domain, it should note the requirement in its output rather than making the change directly.
