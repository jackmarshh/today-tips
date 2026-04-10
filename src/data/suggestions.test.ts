import { describe, expect, it } from "vitest";
import {
  getSuggestionPool,
  pickSuggestions,
  type Situation,
} from "./suggestions";

const situations: Situation[] = ["normal", "meetings", "low_energy", "weekend"];

describe("suggestion content pool", () => {
  it.each(situations)("keeps a healthy content pool for %s", (situation) => {
    const pool = getSuggestionPool(situation);

    expect(pool.judgments.length).toBeGreaterThanOrEqual(24);
    expect(pool.pitfalls.length).toBeGreaterThanOrEqual(24);
    expect(pool.suggestions.length).toBeGreaterThanOrEqual(96);
  });

  it("avoids recently shown suggestions when enough options exist", () => {
    const pool = getSuggestionPool("normal");
    const blockedIds = pool.suggestions.slice(0, 4).map((item) => item.id);

    const picked = pickSuggestions(pool.suggestions, 4, blockedIds);

    expect(picked).toHaveLength(4);
    expect(picked.every((item) => !blockedIds.includes(item.id))).toBe(true);
  });
});
