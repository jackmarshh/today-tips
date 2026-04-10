# Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage a lighter but more branded visual system by improving palette, layout rhythm, and typography without changing product behavior.

**Architecture:** Centralize a few shared visual decisions in a tiny helper so component styling stays consistent across the hero, cards, and state switcher. Keep the existing structure but reshape it into a warmer, more connected first-screen composition with clearer hierarchy.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Vitest

---

## Chunk 1: Shared Visual Tokens

### Task 1: Add helper coverage for shared styling rules

**Files:**
- Create: `src/lib/visual-theme.test.ts`
- Create: `src/lib/visual-theme.ts`

- [ ] **Step 1: Write the failing test**

Add tests for:
- suggestion priority accent mapping
- active/inactive state pill styling

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/visual-theme.test.ts`
Expected: FAIL because `src/lib/visual-theme.ts` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create helper exports for:
- `getSuggestionAccent`
- `getSituationButtonClasses`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/visual-theme.test.ts`
Expected: PASS

## Chunk 2: Palette And Layout

### Task 2: Upgrade global palette and homepage composition

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/HomeClient.tsx`
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Use the passing helper test as the guardrail**
- [ ] **Step 2: Implement the warm background, stronger hero, and tighter content rhythm**
- [ ] **Step 3: Run `npm test -- --run src/lib/visual-theme.test.ts`**

## Chunk 3: Cards And Switcher

### Task 3: Refine cards and interaction surfaces

**Files:**
- Modify: `src/components/SuggestionCard.tsx`
- Modify: `src/components/SituationSelector.tsx`

- [ ] **Step 1: Keep helper test green while wiring the new shared classes**
- [ ] **Step 2: Refine spacing, badge treatment, and active-state styling**
- [ ] **Step 3: Run verification**

Run:
- `npm test -- --run src/lib/visual-theme.test.ts`
- `npm run build`

Expected:
- tests PASS
- build PASS
