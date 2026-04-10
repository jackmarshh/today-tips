# SEO Enhancement Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve search and social SEO for the homepage by adding complete metadata, crawl endpoints, structured data, and more crawlable first-render content.

**Architecture:** Centralize SEO configuration in a small helper module so metadata, canonical URLs, structured data, `robots`, and `sitemap` all share the same site URL and copy. Keep the homepage experience intact while moving first-render content onto the server and delegating interactive state to a client child component.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest

---

## Chunk 1: SEO Foundations

### Task 1: Add SEO helper coverage

**Files:**
- Create: `src/lib/seo.test.ts`
- Create: `src/lib/seo.ts`

- [ ] **Step 1: Write the failing test**

Add tests for:
- site URL fallback and normalization
- canonical URL generation
- homepage JSON-LD generation

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/seo.test.ts`
Expected: FAIL because `src/lib/seo.ts` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/seo.ts` with:
- `getSiteUrl`
- `buildCanonicalUrl`
- `buildHomeJsonLd`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/seo.test.ts`
Expected: PASS

## Chunk 2: Wire SEO Into The App

### Task 2: Upgrade metadata and crawl endpoints

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Write the failing test**

Extend `src/lib/seo.test.ts` only if helper behavior must expand.

- [ ] **Step 2: Run targeted test to verify any new helper expectation fails**

Run: `npm test -- --run src/lib/seo.test.ts`

- [ ] **Step 3: Write minimal implementation**

Add:
- metadata base URL
- canonical support
- Open Graph and Twitter metadata
- robots and sitemap route handlers

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/seo.test.ts`
Expected: PASS

## Chunk 3: Make The Homepage More Crawlable

### Task 3: Move first-render content onto the server and add JSON-LD

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/HomeClient.tsx`

- [ ] **Step 1: Write the failing test**

Add or extend tests only if new helper output is required.

- [ ] **Step 2: Run targeted test to verify it fails if helpers changed**

Run: `npm test -- --run src/lib/seo.test.ts`

- [ ] **Step 3: Write minimal implementation**

Render the initial homepage plan on the server, inject JSON-LD into the page, and keep localStorage-driven interactions in a client component.

- [ ] **Step 4: Run verification**

Run:
- `npm test -- --run src/lib/seo.test.ts`
- `npm run build`

Expected:
- tests PASS
- build PASS

Plan complete and saved to `docs/superpowers/plans/2026-04-10-seo-enhancement.md`. Ready to execute?
