"use client";

import { useEffect, useState } from "react";
import {
  RefreshCcw,
  AlertTriangle,
  Info,
  History,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Header } from "./Header";
import { SuggestionCard } from "./SuggestionCard";
import { SituationSelector } from "./SituationSelector";
import { generatePlan, Situation, DayPlan } from "../data/suggestions";

interface HomeClientProps {
  initialPlan: DayPlan;
  initialSituation: Situation;
}

type SuggestionHistoryBySituation = Record<Situation, string[]>;

const SUGGESTION_HISTORY_KEY = "today_tips_suggestion_history";
const MAX_HISTORY_SIZE_PER_SITUATION = 20;

const REFRESH_CTA_VARIANTS = [
  "再抽一签",
  "换个好运",
  "来点新梗",
  "重开一把",
  "给我新招",
  "再翻一页",
];

const CHANNEL_TITLE_MAP: Record<Situation, string> = {
  normal: "稳稳开工局",
  meetings: "会议闯关局",
  low_energy: "省电保命局",
  weekend: "快乐散养局",
};

const getNextVariantIndex = (currentIndex: number) => {
  if (REFRESH_CTA_VARIANTS.length <= 1) {
    return 0;
  }

  const candidateIndexes = REFRESH_CTA_VARIANTS
    .map((_, index) => index)
    .filter((index) => index !== currentIndex);

  const randomIndex = Math.floor(Math.random() * candidateIndexes.length);
  return candidateIndexes[randomIndex];
};

const emptySuggestionHistory = (): SuggestionHistoryBySituation => ({
  normal: [],
  meetings: [],
  low_energy: [],
  weekend: [],
});

const updateHistoryForSituation = (
  history: SuggestionHistoryBySituation,
  situation: Situation,
  ids: string[],
): SuggestionHistoryBySituation => {
  const next = [...history[situation], ...ids];
  const deduped = Array.from(new Set(next)).slice(-MAX_HISTORY_SIZE_PER_SITUATION);
  return {
    ...history,
    [situation]: deduped,
  };
};

export function HomeClient({
  initialPlan,
  initialSituation,
}: HomeClientProps) {
  const [situation, setSituation] = useState<Situation>(initialSituation);
  const [plan, setPlan] = useState<DayPlan>(initialPlan);
  const [historyBySituation, setHistoryBySituation] = useState<SuggestionHistoryBySituation>(
    updateHistoryForSituation(
      emptySuggestionHistory(),
      initialSituation,
      initialPlan.suggestions.map((item) => item.id),
    ),
  );
  const [refreshVariantIndex, setRefreshVariantIndex] = useState(0);
  const currentSituationLabel = CHANNEL_TITLE_MAP[situation] || "当前模式";

  const toneLineBySituation: Record<Situation, string> = {
    normal: "先把关键任务稳稳推进，再把临时噪音挡在外面。",
    meetings: "今天先控场、再输出，结论比发言时长更重要。",
    low_energy: "先守住底线任务，省电运行也可以把今天过关。",
    weekend: "以恢复为主，安排可以有，但不用把自己排满。",
  };

  useEffect(() => {
    const savedSituation = localStorage.getItem("today_tips_situation") as Situation | null;
    const savedPlanStr = localStorage.getItem("today_tips_plan");
    const savedDate = localStorage.getItem("today_tips_date");
    const savedHistoryStr = localStorage.getItem(SUGGESTION_HISTORY_KEY);
    const todayStr = new Date().toDateString();

    if (savedSituation) {
      setSituation(savedSituation);
    }

    if (savedHistoryStr) {
      try {
        const parsed = JSON.parse(savedHistoryStr) as Partial<SuggestionHistoryBySituation>;
        setHistoryBySituation({
          normal: parsed.normal || [],
          meetings: parsed.meetings || [],
          low_energy: parsed.low_energy || [],
          weekend: parsed.weekend || [],
        });
      } catch {
        setHistoryBySituation(emptySuggestionHistory());
      }
    }

    if (savedDate === todayStr && savedPlanStr) {
      const savedPlan = JSON.parse(savedPlanStr) as DayPlan;
      setPlan(savedPlan);
      const targetSituation = savedSituation || initialSituation;
      setHistoryBySituation((current) => {
        const next = updateHistoryForSituation(
          current,
          targetSituation,
          savedPlan.suggestions.map((item) => item.id),
        );
        localStorage.setItem(SUGGESTION_HISTORY_KEY, JSON.stringify(next));
        return next;
      });
      return;
    }

    const freshPlan = generatePlan(savedSituation || initialSituation);
    setPlan(freshPlan);
    const targetSituation = savedSituation || initialSituation;
    setHistoryBySituation((current) => {
      const next = updateHistoryForSituation(
        current,
        targetSituation,
        freshPlan.suggestions.map((item) => item.id),
      );
      localStorage.setItem(SUGGESTION_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
    localStorage.setItem("today_tips_plan", JSON.stringify(freshPlan));
    localStorage.setItem("today_tips_date", todayStr);
  }, [initialSituation]);

  const handleSituationChange = (newSituation: Situation) => {
    setSituation(newSituation);
    const newPlan = generatePlan(newSituation);
    setPlan(newPlan);
    setHistoryBySituation((current) => {
      const next = updateHistoryForSituation(
        current,
        newSituation,
        newPlan.suggestions.map((item) => item.id),
      );
      localStorage.setItem(SUGGESTION_HISTORY_KEY, JSON.stringify(next));
      return next;
    });

    localStorage.setItem("today_tips_situation", newSituation);
    localStorage.setItem("today_tips_plan", JSON.stringify(newPlan));
    localStorage.setItem("today_tips_date", new Date().toDateString());
  };

  const handleRefresh = () => {
    const newPlan = generatePlan(situation, {
      avoidSuggestionIds: historyBySituation[situation],
    });
    setPlan(newPlan);
    setHistoryBySituation((current) => {
      const next = updateHistoryForSituation(
        current,
        situation,
        newPlan.suggestions.map((item) => item.id),
      );
      localStorage.setItem(SUGGESTION_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
    setRefreshVariantIndex((current) => getNextVariantIndex(current));
    localStorage.setItem("today_tips_plan", JSON.stringify(newPlan));
  };

  return (
    <main className="max-w-4xl mx-auto px-5 pb-20">
      <Header />
      <div className="mb-4">
        <SituationSelector
          current={situation}
          onChange={handleSituationChange}
          placement="top"
        />
      </div>

      <article className="paper-surface overflow-hidden rounded-[2.25rem] border border-[#eadacc] mb-4 relative">
        <section
          aria-labelledby="plan-judgment-title"
          className="relative overflow-hidden border-b border-[#f1e4d8] bg-[linear-gradient(135deg,rgba(255,244,230,0.95),rgba(255,250,244,0.85))] px-6 py-6 sm:px-8 sm:py-7"
        >
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f4caa2]/30 blur-2xl" />
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-[#b86b3d]" />
              <h2
                id="plan-judgment-title"
                className="text-xs font-bold text-[#9b7155] tracking-[0.24em] uppercase"
              >
                今日定调
              </h2>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#3e3029] bg-[#fff8ef]/80 px-3 py-1.5 text-xs font-semibold text-[#3e3029] shadow-sm transition-all hover:bg-[#3e3029] hover:text-[#fff8ef] active:scale-95"
            >
              <Sparkles size={13} />
              {REFRESH_CTA_VARIANTS[refreshVariantIndex]}
              <RefreshCcw size={12} />
            </button>
          </div>
          <p className="max-w-2xl font-[var(--font-display)] text-[1.8rem] font-black leading-[1.12] text-[#2f241f] sm:text-[2.15rem]">
            {plan.judgment}
          </p>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#6f6259]">
            {toneLineBySituation[situation]}
          </p>
        </section>

        <section aria-label="今日建议列表">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f6ede3] px-6 py-3 sm:px-8">
            <p className="text-sm font-semibold text-[#7c6657]">
              你现在在：{currentSituationLabel}
            </p>
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#b4957f]">
              今日小招 x 4
            </p>
          </div>
          <div className="divide-y divide-[#f6ede3]">
            {plan.suggestions.map((suggestion, idx) => (
              <SuggestionCard key={`${suggestion.id}-${idx}`} suggestion={suggestion} />
            ))}
          </div>
        </section>

        <section className="flex gap-4 items-start border-t border-[#ebd3c3] bg-[linear-gradient(180deg,rgba(250,224,210,0.78),rgba(255,241,233,0.92))] px-6 py-6 sm:px-8 sm:py-7">
          <div className="text-[#b95635] mt-0.5 flex-shrink-0 rounded-full bg-[#f9d7c7] p-2">
            <AlertTriangle size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="mb-1.5 text-xl font-black text-[#743726]">今日避坑</h2>
            <p className="max-w-2xl text-[15px] leading-7 text-[#8a4f3d]">{plan.pitfall}</p>
          </div>
        </section>
      </article>

      <div className="space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="paper-surface rounded-[1.8rem] border border-[#eadacc] p-6">
            <div className="mb-3 flex items-center gap-2 text-[#4f433b] font-bold">
              <Info size={18} className="text-[#b86b3d]" />
              为什么今天这样建议？
            </div>
            <p className="text-[15px] leading-7 text-[#6b5f56]">
              首页会根据你当前选择的情境，给出一组更贴近今天节奏的动作建议，尽量减少临时决策负担。
            </p>
          </div>

          <div className="paper-surface rounded-[1.8rem] border border-[#eadacc] p-6">
            <div className="mb-3 flex items-center gap-2 text-[#4f433b] font-bold">
              <History size={18} className="text-[#8b6a8e]" />
              最近的日常记忆
            </div>
            <p className="text-[15px] leading-7 text-[#6b5f56]">
              建议内容只保存在浏览器本地，用来恢复你今天最近浏览过的场景和建议版本。
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-10 border-t border-[#eadacc] pt-5 text-center text-sm text-[#9a8878]">
        <p>
          Developed by Shaohuihui · Built with Next.js
        </p>
      </footer>
    </main>
  );
}
