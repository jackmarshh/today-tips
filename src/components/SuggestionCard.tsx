import { Suggestion } from "../data/suggestions";
import { CheckCircle2 } from "lucide-react";

export function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  return (
    <div className="p-5 sm:p-6 flex gap-4 items-start transition-colors hover:bg-gray-50/80">
      <div className="mt-0.5 text-green-500 flex-shrink-0">
        <CheckCircle2 size={22} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg">{suggestion.title}</h3>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium tracking-wide">
            {suggestion.tone_tag}
          </span>
        </div>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {suggestion.action_text}
        </p>
      </div>
    </div>
  );
}
