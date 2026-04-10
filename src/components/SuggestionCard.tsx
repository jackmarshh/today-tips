import { Suggestion } from "../data/suggestions";
import { CheckCircle2 } from "lucide-react";
import { getSuggestionAccent } from "../lib/visual-theme";

export function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const accent = getSuggestionAccent(suggestion.priority);

  return (
    <div className="group flex items-start gap-4 px-6 py-5 transition-all duration-200 hover:bg-[#fffaf5] sm:px-8 sm:py-6">
      <div
        className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5 ${accent.dot}`}
      >
        <CheckCircle2 size={20} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2.5">
          <h3 className="font-sans text-[1.42rem] font-semibold leading-tight text-[#2f241f] sm:text-[1.55rem]">
            {suggestion.title}
          </h3>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase ${accent.badge}`}
          >
            {suggestion.tone_tag}
          </span>
        </div>
        <p className="max-w-2xl text-[15px] leading-[1.72] text-[#60554d] sm:text-[1.08rem]">
          {suggestion.action_text}
        </p>
      </div>
    </div>
  );
}
