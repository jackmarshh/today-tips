import type { Suggestion } from "../data/suggestions";

type Priority = Suggestion["priority"];

export function getSuggestionAccent(priority: Priority) {
  switch (priority) {
    case "high":
      return {
        dot: "text-amber-600",
        badge: "bg-amber-100/80 text-amber-900",
      };
    case "medium":
      return {
        dot: "text-teal-700",
        badge: "bg-teal-100/80 text-teal-900",
      };
    case "low":
    default:
      return {
        dot: "text-stone-500",
        badge: "bg-stone-200/80 text-stone-800",
      };
  }
}

export function getSituationButtonClasses(isActive: boolean) {
  return isActive
    ? "bg-[#2f241f] text-[#fff8ef] border border-[#2f241f] shadow-[0_12px_30px_rgba(47,36,31,0.16)] -translate-y-0.5"
    : "bg-white/80 text-[#5f544d] border border-[#e9dccf] hover:bg-[#fffaf5] hover:border-[#d8baa1]";
}
