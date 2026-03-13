"use client";

import { useInView } from "./hooks/useInView";

const steps = [
  { num: 1, title: "無料相談", sub: "（30分）", primary: true, gold: false },
  { num: 2, title: "アセスメント", sub: "", primary: false, gold: false },
  { num: 3, title: "導入計画策定", sub: "", primary: false, gold: false },
  { num: 4, title: "実装・研修", sub: "", primary: false, gold: false },
  { num: 5, title: "自走支援", sub: "", primary: false, gold: true },
];

const ArrowDown = () => (
  <div className="md:hidden flex justify-center text-slate-300">
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
  </div>
);

export default function ServiceFlow() {
  const { ref, isInView } = useInView();

  return (
    <section id="flow" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">導入までの5ステップ</h2>
        </div>

        <div className="max-w-5xl mx-auto relative" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms ease-out" }}>
          {/* PC Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-4">
            {steps.map((s, i) => (
              <div key={i} className="contents">
                <div className={`bg-white rounded-xl p-6 w-full md:w-48 text-center shadow-sm relative ${
                  s.primary ? "border-2 border-primary/20" : s.gold ? "border-2 border-gold-accent/30 bg-gradient-to-b from-white to-yellow-50/30" : "border border-slate-200"
                }`}>
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    s.primary ? "bg-primary text-white" : s.gold ? "bg-gold-accent text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {s.num}
                  </div>
                  <h4 className="font-bold text-slate-900 mt-2 mb-2">
                    {s.title}
                    {s.sub && <><br /><span className="text-sm font-normal text-slate-500">{s.sub}</span></>}
                  </h4>
                </div>
                {i < steps.length - 1 && <ArrowDown />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
