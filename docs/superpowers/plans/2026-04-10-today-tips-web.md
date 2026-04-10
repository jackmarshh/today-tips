# 今日安排助手 v1 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first single-page web app that immediately shows actionable “today planning” suggestions, supports scenario switching and “refresh suggestions,” and persists lightweight local state.

**Architecture:** Use Next.js App Router with a single public route at `/`. Keep suggestion generation in a local rule-based engine driven by date, time band, scenario, and variant seed, then render the result through focused presentational sections. Persist only the recent scenario and variant seed in browser storage so the page restores the most recent lightweight context without requiring accounts or backend state.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library

---

## File Structure

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `components.json`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/lib/types.ts`
- Create: `src/lib/date-context.ts`
- Create: `src/lib/storage.ts`
- Create: `src/lib/suggestion-engine.ts`
- Create: `src/lib/suggestion-engine.test.ts`
- Create: `src/components/home-shell.tsx`
- Create: `src/components/hero-panel.tsx`
- Create: `src/components/suggestion-card.tsx`
- Create: `src/components/why-section.tsx`
- Create: `src/components/scenario-switcher.tsx`
- Create: `src/components/history-preview.tsx`
- Create: `src/components/ui/chip.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/panel.tsx`
- Create: `src/test/setup.ts`
- Create: `vitest.config.ts`
- Create: `README.md`

## Chunk 1: Scaffold The App And Tooling

### Task 1: Create project metadata and scripts

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/suggestion-engine.test.ts` with a placeholder import from `src/lib/suggestion-engine.ts` so the test runner has a concrete target that does not exist yet.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: FAIL because the imported module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add the project config and scripts required to run Next.js, linting, and Vitest in this repo.

- [ ] **Step 4: Run test to verify it passes further into missing behavior**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: FAIL on missing exported behavior rather than missing tooling.

- [ ] **Step 5: Commit**

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts src/test/setup.ts src/lib/suggestion-engine.test.ts
git commit -m "chore: scaffold today tips app tooling"
```

### Task 2: Add the base app shell

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Write the failing test**

Extend `src/lib/suggestion-engine.test.ts` or add a render smoke test only after the engine test exists, asserting the homepage consumes a valid suggestion payload shape.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL because the page and layout components are missing.

- [ ] **Step 3: Write minimal implementation**

Create the root layout, base global styles, and an initial page export wired to future homepage components.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS for the smoke-level structure checks.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add base next app shell"
```

## Chunk 2: Build The Suggestion Engine

### Task 3: Define the core data model and date context helpers

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/date-context.ts`
- Modify: `src/lib/suggestion-engine.test.ts`

- [ ] **Step 1: Write the failing test**

Add tests that describe the normalized date context for:
- weekday morning
- weekday afternoon
- weekday evening
- weekend daytime

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: FAIL because the helpers and types do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement focused types and a helper that maps `Date` into weekday/weekend and time-band context.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: PASS for the new context tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts src/lib/date-context.ts src/lib/suggestion-engine.test.ts
git commit -m "feat: add date context helpers for suggestions"
```

### Task 4: Generate scenario-specific suggestion groups

**Files:**
- Create: `src/lib/suggestion-engine.ts`
- Modify: `src/lib/suggestion-engine.test.ts`

- [ ] **Step 1: Write the failing test**

Add tests asserting that each scenario returns:
- one summary
- three to five suggestions
- one warning
- cards with `title`, `action_text`, `tone_tag`, `priority`

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: FAIL because the engine does not yet generate valid suggestion groups.

- [ ] **Step 3: Write minimal implementation**

Implement a rule-based suggestion engine with:
- scenario templates
- time-band-aware title and summary selection
- warning generation
- seeded variant selection

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: PASS for all engine contract tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/suggestion-engine.ts src/lib/suggestion-engine.test.ts
git commit -m "feat: implement today suggestion engine"
```

### Task 5: Add lightweight persistence helpers

**Files:**
- Create: `src/lib/storage.ts`

- [ ] **Step 1: Write the failing test**

Add tests covering save/load behavior for the recent scenario and variant seed, including invalid stored values fallback.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: FAIL because storage helpers are missing.

- [ ] **Step 3: Write minimal implementation**

Implement browser-safe storage helpers that guard against server rendering and malformed JSON.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/lib/suggestion-engine.test.ts`
Expected: PASS for persistence helper coverage.

- [ ] **Step 5: Commit**

```bash
git add src/lib/storage.ts src/lib/suggestion-engine.test.ts
git commit -m "feat: add lightweight homepage persistence"
```

## Chunk 3: Build The Homepage Experience

### Task 6: Render the hero result and interaction shell

**Files:**
- Create: `src/components/home-shell.tsx`
- Create: `src/components/hero-panel.tsx`
- Create: `src/components/suggestion-card.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/chip.tsx`
- Create: `src/components/ui/panel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write the failing test**

Add component tests asserting that the homepage:
- renders today title, summary, suggestions, and warning on first load
- exposes a “换一版建议” control

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL because the homepage components are missing.

- [ ] **Step 3: Write minimal implementation**

Build the main homepage shell and hero presentation with a mobile-first layout and clear action hierarchy.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS for hero rendering and refresh control tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/home-shell.tsx src/components/hero-panel.tsx src/components/suggestion-card.tsx src/components/ui/button.tsx src/components/ui/chip.tsx src/components/ui/panel.tsx src/app/page.tsx
git commit -m "feat: render today tips homepage hero"
```

### Task 7: Add scenario switching and local restoration

**Files:**
- Create: `src/components/scenario-switcher.tsx`
- Modify: `src/components/home-shell.tsx`
- Modify: `src/lib/storage.ts`

- [ ] **Step 1: Write the failing test**

Add tests asserting that:
- users can switch between the four fixed scenarios
- switching scenarios re-renders the suggestion set
- the saved scenario is restored on reload

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL because scenario switching and restore logic do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement the fixed scenario toggle, hook it to the suggestion engine, and restore/persist the selected scenario.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS for scenario interactions and restoration behavior.

- [ ] **Step 5: Commit**

```bash
git add src/components/scenario-switcher.tsx src/components/home-shell.tsx src/lib/storage.ts
git commit -m "feat: add scenario switching for homepage"
```

### Task 8: Add lower-page supporting modules

**Files:**
- Create: `src/components/why-section.tsx`
- Create: `src/components/history-preview.tsx`
- Modify: `src/components/home-shell.tsx`

- [ ] **Step 1: Write the failing test**

Add tests asserting that the homepage also renders:
- the “为什么今天会这样说” explanation module
- the scenario quick-switch module
- the recent history preview module

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL because the supporting sections are not implemented yet.

- [ ] **Step 3: Write minimal implementation**

Implement the supporting modules with concise copy driven by current suggestion metadata and recent generated history.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS for the lower-page module coverage.

- [ ] **Step 5: Commit**

```bash
git add src/components/why-section.tsx src/components/history-preview.tsx src/components/home-shell.tsx
git commit -m "feat: add supporting homepage modules"
```

## Chunk 4: Polish, Docs, And Verification

### Task 9: Final styling polish and responsive tuning

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/hero-panel.tsx`
- Modify: `src/components/home-shell.tsx`
- Modify: `src/components/history-preview.tsx`

- [ ] **Step 1: Write the failing test**

Add or extend assertions for responsive-friendly semantics and stable labels where needed rather than pixel-perfect styling.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL if the semantic hooks or labels for the polish criteria are absent.

- [ ] **Step 3: Write minimal implementation**

Refine typography, spacing, color variables, motion, and card hierarchy to match the intended “有趣但克制” visual direction.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS with no regressions.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/hero-panel.tsx src/components/home-shell.tsx src/components/history-preview.tsx
git commit -m "style: polish today tips homepage"
```

### Task 10: Verify and document the project

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write the failing test**

No new behavior test is required here; instead, identify the existing verification commands that must pass before completion.

- [ ] **Step 2: Run test to verify current state**

Run:
- `npm test -- --run`
- `npm run lint`
- `npm run build`

Expected: All commands pass.

- [ ] **Step 3: Write minimal implementation**

Document local development, scripts, and the product behavior in `README.md`.

- [ ] **Step 4: Run verification again**

Run:
- `npm test -- --run`
- `npm run lint`
- `npm run build`

Expected: All commands pass after docs are added.

- [ ] **Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add today tips project guide"
```

Plan complete and saved to `docs/superpowers/plans/2026-04-10-today-tips-web.md`. Ready to execute?
