import { describe, expect, it } from "vitest";
import {
  getSituationButtonClasses,
  getSuggestionAccent,
} from "./visual-theme";

describe("visual theme helpers", () => {
  it("maps suggestion priority to a stable accent palette", () => {
    expect(getSuggestionAccent("high")).toMatchObject({
      dot: "text-amber-600",
      badge: "bg-amber-100/80 text-amber-900",
    });
    expect(getSuggestionAccent("medium")).toMatchObject({
      dot: "text-teal-700",
      badge: "bg-teal-100/80 text-teal-900",
    });
    expect(getSuggestionAccent("low")).toMatchObject({
      dot: "text-stone-500",
      badge: "bg-stone-200/80 text-stone-800",
    });
  });

  it("returns distinct classes for active and idle situation buttons", () => {
    expect(getSituationButtonClasses(true)).toContain("bg-[#2f241f]");
    expect(getSituationButtonClasses(false)).toContain("bg-white/80");
  });
});
