"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { SuggestionCard } from "../components/SuggestionCard";
import { SituationSelector } from "../components/SituationSelector";
import { generatePlan, Situation, DayPlan } from "../data/suggestions";
import { RefreshCcw, AlertTriangle, Info, History, CalendarDays } from "lucide-react";

export default function Home() {
  const [situation, setSituation] = useState<Situation>("normal");
  const [plan, setPlan] = useState<DayPlan | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedSituation = localStorage.getItem("today_tips_situation") as Situation;
    const savedPlanStr = localStorage.getItem("today_tips_plan");
    const savedDate = localStorage.getItem("today_tips_date");
    
    const todayStr = new Date().toDateString();

    if (savedSituation) {
      setSituation(savedSituation);
    }
    
    if (savedDate === todayStr && savedPlanStr) {
      setPlan(JSON.parse(savedPlanStr));
    } else {
      const newPlan = generatePlan(savedSituation || "normal");
      setPlan(newPlan);
      localStorage.setItem("today_tips_plan", JSON.stringify(newPlan));
      localStorage.setItem("today_tips_date", todayStr);
    }
    
    setIsLoaded(true);
  }, []);

  const handleSituationChange = (newSituation: Situation) => {
    setSituation(newSituation);
    const newPlan = generatePlan(newSituation);
    setPlan(newPlan);
    
    localStorage.setItem("today_tips_situation", newSituation);
    localStorage.setItem("today_tips_plan", JSON.stringify(newPlan));
    localStorage.setItem("today_tips_date", new Date().toDateString());
  };

  const handleRefresh = () => {
    const newPlan = generatePlan(situation);
    setPlan(newPlan);
    localStorage.setItem("today_tips_plan", JSON.stringify(newPlan));
  };

  if (!isLoaded || !plan) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="max-w-2xl mx-auto px-5 pb-20">
      <Header />
      
      {/* 核心统一的今日面板容器 */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mb-6 relative">
        
        {/* 顶部：总判断 */}
        <section className="bg-blue-50/60 p-6 sm:p-8 border-b border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays size={18} className="text-blue-500" />
            <h2 className="text-xs font-bold text-blue-800 tracking-widest uppercase">今日定调</h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
            {plan.judgment}
          </h3>
        </section>
        
        {/* 中间：建议列表 */}
        <section className="divide-y divide-gray-100">
          {plan.suggestions.map((suggestion, idx) => (
            <SuggestionCard key={`${suggestion.id}-${idx}`} suggestion={suggestion} />
          ))}
        </section>
        
        {/* 底部：避坑提醒 */}
        <section className="bg-red-50/30 p-6 sm:p-8 border-t border-red-100 flex gap-4 items-start">
          <div className="text-red-500 mt-0.5 flex-shrink-0 bg-red-100 p-1.5 rounded-full">
            <AlertTriangle size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-red-900 mb-1.5 text-base">今日避坑</h4>
            <p className="text-red-800 text-sm sm:text-base leading-relaxed">{plan.pitfall}</p>
          </div>
        </section>
      </div>
      
      {/* 换一版按钮 */}
      <div className="flex justify-center mt-6 mb-10">
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <RefreshCcw size={18} />
          换一版建议
        </button>
      </div>
      
      {/* 下半屏辅助模块 */}
      <div className="space-y-6">
        <SituationSelector current={situation} onChange={handleSituationChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold">
              <Info size={18} className="text-blue-500" />
              为什么今天这样建议？
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              基于你选择的当前状态，我们匹配了一组低门槛的可执行动作，不讲大道理，只求让你好过一点。
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold">
              <History size={18} className="text-purple-500" />
              最近的日常记忆
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              保持当前的节奏就好。建议数据仅在本地保存，保护隐私，随时清理即焚。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
