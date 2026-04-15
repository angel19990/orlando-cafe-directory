---
name: review-code
description: "Run a comprehensive code review on recent changes, checking types, lint, accessibility, security, and design consistency"
context: fork
agent: code-reviewer
---

Run a full code review on recent changes.

## Steps

1. Identify changes:
   - Run `git diff HEAD~1` for the last commit
   - Or `git diff main...HEAD` if on a feature branch
   - If no changes found, check `git status` for unstaged changes

2. Read each changed file in full for context

3. Run automated checks:
   - `npx tsc --noEmit` — TypeScript type checking
   - `npx eslint src/` — Lint checking

4. Manual review against project standards:
   - TypeScript strict compliance (no `any`)
   - Next.js 16 patterns (async params, proper use of server/client components)
   - Accessibility (semantic HTML, alt text, focus styles, contrast)
   - Tailwind consistency (project design tokens, not arbitrary values)
   - Security (no exposed secrets, input validation)
   - Performance (image optimization, ISR caching, no console.log)
   - File boundary compliance (each agent's changes stay in their scope)

5. Output structured review with: Blocking Issues, Warnings, Notes, Approved status
