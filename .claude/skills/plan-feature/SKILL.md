---
name: plan-feature
description: "Plan a new feature with design specs, implementation tasks, and agent assignments for the Orlando cafe directory"
context: fork
---

You are planning a new feature for OrlandoCafes.com. Follow this process:

## Step 1: Understand the Request
Read the user's feature description carefully. Ask clarifying questions if the scope is unclear.

## Step 2: Audit Current State
- Search `src/components/` for existing components that will be affected
- Search `src/sanity/schemaTypes/cafe.ts` for relevant schema fields
- Search `src/lib/sanity/queries.ts` for relevant GROQ queries
- Search `src/lib/types.ts` for relevant TypeScript types
- Check `thoughts/shared/plans/` for any related prior plans

## Step 3: Produce the Plan
Save the plan to `thoughts/shared/plans/YYYY-MM-DD-<feature-slug>.md` with this structure:

```markdown
# Feature: [Name]

## Overview
[1-2 sentence description of what this feature does and why]

## Current State
[What exists today that this feature builds on or changes]

## Desired End State
[What the feature looks like when complete, with verification criteria]

## What We Are NOT Doing
[Explicit scope boundaries to prevent scope creep]

## Implementation Steps

### 1. CMS Changes (cms-dev)
- [ ] [Schema changes needed]
- [ ] [Type updates needed]
- [ ] [Query updates needed]

### 2. Backend Changes (backend-dev)
- [ ] [Server action changes]
- [ ] [Data fetching changes]

### 3. Frontend Changes (frontend-dev)
- [ ] [Component changes]
- [ ] [Page layout changes]
- [ ] [Responsive considerations]

### 4. Review (code-reviewer)
- [ ] Run /review-code
- [ ] Verify accessibility
- [ ] Verify type safety

## Files to Modify
- `src/sanity/schemaTypes/cafe.ts` — [what changes]
- `src/lib/types.ts` — [what changes]
- [etc.]

## Dependencies & Sequencing
CMS changes must land first (types must exist before code references them).
```
