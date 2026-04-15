---
name: sanity-query
description: "Write, debug, or optimize GROQ queries for the Sanity CMS"
context: fork
agent: cms-dev
---

Help write, debug, or optimize a GROQ query for OrlandoCafes.com's Sanity CMS.

## Context
- Read existing queries in `src/lib/sanity/queries.ts` for patterns
- Read the cafe schema at `src/sanity/schemaTypes/cafe.ts` for available fields
- Read types at `src/lib/types.ts` to understand the expected shape

## Rules
- All public-facing queries MUST filter by `submissionStatus == "approved"`
- Use `groq` tagged template literal from `next-sanity`
- Always use explicit field projections (never bare `*` without projection)
- Parameterize dynamic values with `$paramName` syntax

## Testing
Test the query against production:
```bash
curl -s "https://sfp38p3m.api.sanity.io/v2024-01-01/data/query/production?query=<url-encoded-query>"
```

## Output
- The complete GROQ query
- The TypeScript type it should return
- A test curl command to verify it works
- If this query should be added to `src/lib/sanity/queries.ts`, provide the export statement
