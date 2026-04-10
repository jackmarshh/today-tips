import { SITUATIONS, Situation } from "../data/suggestions";
import { Coffee, Briefcase, Users, BatteryWarning } from "lucide-react";
import { getSituationButtonClasses } from "../lib/visual-theme";

interface Props {
  current: Situation;
  onChange: (s: Situation) => void;
  placement?: "top" | "default";
}

const copyMap: Record<Situation, { title: string; hint: string }> = {
  normal: { title: "稳态推进", hint: "主打不慌不忙" },
  meetings: { title: "会议狂飙", hint: "先控场再输出" },
  low_energy: { title: "省电模式", hint: "低耗也能过关" },
  weekend: { title: "周末散养", hint: "舒服优先，不赶 KPI" },
};

const iconMap = {
  Coffee: Coffee,
  Briefcase: Briefcase,
  Users: Users,
  BatteryWarning: BatteryWarning,
};

export function SituationSelector({
  current,
  onChange,
  placement = "default",
}: Props) {
  const isTopPlacement = placement === "top";

  return (
    <section
      className={`paper-surface w-full rounded-[2rem] border border-[#eadacc] ${
        isTopPlacement ? "px-4 py-4 sm:px-5 sm:py-5" : "px-5 py-6 sm:px-6 sm:py-7"
      }`}
    >
      <h3
        className={`w-full text-center font-bold text-[#9b7155] uppercase ${
          isTopPlacement
            ? "mb-1 text-[11px] tracking-[0.2em]"
            : "mb-2 text-xs tracking-[0.24em]"
        }`}
      >
        今日模式，选一个开局
      </h3>
      <p
        className={`text-center text-[#8e7a6c] ${
          isTopPlacement ? "mb-3 text-[13px]" : "mb-5 text-sm"
        }`}
      >
        切换一下，建议就会换成对应风格
      </p>

      <div className={`sm:hidden ${isTopPlacement ? "" : ""}`}>
        <div className="flex snap-x gap-2 overflow-x-auto pb-1">
          {SITUATIONS.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap];
            const isActive = s.id === current;
            const copy = copyMap[s.id];
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => onChange(s.id)}
                aria-pressed={isActive}
                className={`min-w-[172px] snap-start rounded-2xl p-3 text-left text-sm font-bold transition-all ${getSituationButtonClasses(
                  isActive,
                )}`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="whitespace-nowrap">{copy.title}</span>
                </div>
                <span
                  className={`mt-1 block text-xs font-medium ${
                    isActive ? "text-[#f2dcc8]" : "text-[#9a8878]"
                  }`}
                >
                  {copy.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-4">
        {SITUATIONS.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          const isActive = s.id === current;
          const copy = copyMap[s.id];
          return (
            <button
              type="button"
              key={s.id}
              onClick={() => onChange(s.id)}
              aria-pressed={isActive}
              className={`flex flex-col items-start gap-1.5 p-3.5 rounded-2xl text-sm font-bold transition-all ${getSituationButtonClasses(
                isActive,
              )}`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span className="whitespace-nowrap">{copy.title}</span>
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-[#f2dcc8]" : "text-[#9a8878]"
                }`}
              >
                {copy.hint}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
