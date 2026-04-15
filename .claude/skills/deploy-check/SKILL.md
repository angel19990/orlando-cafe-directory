---
name: deploy-check
description: "Pre-deployment verification checklist: type check, lint, build, security scan, and performance review"
context: fork
---

Run the pre-deployment verification checklist for OrlandoCafes.com.

## Automated Checks (run all, report results)

1. **TypeScript**: `npx tsc --noEmit`
   - Must pass with zero errors

2. **Lint**: `npx eslint src/`
   - Must pass with zero errors

3. **Build**: `npm run build`
   - Must complete successfully
   - Note any warnings

## File Checks (grep/read, report results)

4. **No console.log in production**:
   - Search `src/` for `console.log` (excluding node_modules)
   - Flag any found

5. **Environment security**:
   - Verify `.env.local` is in `.gitignore`
   - Search for hardcoded API keys or tokens in source files
   - Verify `SANITY_API_WRITE_TOKEN` is only used in server-side files

6. **Image optimization**:
   - Check that images use `urlFor()` or `next/image`
   - Verify `sizes` prop is set on `next/image` components

7. **Caching**:
   - Verify pages with `client.fetch()` have `revalidate` set

8. **Config integrity**:
   - Verify `vercel.json` hasn't been unexpectedly modified
   - Verify `next.config.ts` is sane

## Output
Report each check as PASS or FAIL with details. Provide a final GO / NO-GO recommendation.
