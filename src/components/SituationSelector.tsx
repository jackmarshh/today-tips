import { SITUATIONS, Situation } from "../data/suggestions";
import { Coffee, Briefcase, Users, BatteryWarning } from "lucide-react";

interface Props {
  current: Situation;
  onChange: (s: Situation) => void;
}

const iconMap = {
  Coffee: Coffee,
  Briefcase: Briefcase,
  Users: Users,
  BatteryWarning: BatteryWarning,
};

export function SituationSelector({ current, onChange }: Props) {
  return (
    <div className="py-2 w-full">
      <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest uppercase text-center w-full block">
        一键切换今日状态
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SITUATIONS.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          const isActive = s.id === current;
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={`
                flex items-center justify-center gap-2 p-3.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap
                ${isActive 
                  ? 'bg-gray-900 text-white shadow-md scale-[1.02]' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }
              `}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
