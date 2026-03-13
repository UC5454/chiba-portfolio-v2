"use client";

import { useInView } from "./hooks/useInView";
import { useCountUp } from "./hooks/useCountUp";

const stats = [
  { end: 1714, label: "時間 / 月", sublabel: "自社業務削減", suffix: "" },
  { end: 50, label: "回", sublabel: "AI研修・登壇", suffix: "+" },
  { end: 1500, label: "名", sublabel: "研修動員数", suffix: "+" },
  { end: 25, label: "名", sublabel: "実運用AI社員", suffix: "" },
];

function StatCard({ end, label, sublabel, suffix, inView, delay }: { end: number; label: string; sublabel: string; suffix: string; inView: boolean; delay: number }) {
  const count = useCountUp(end, 2000, inView);

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 600ms ease-out ${delay}ms`,
      }}
    >
      <div className="text-sm font-bold text-slate-500 mb-2">{sublabel}</div>
      <div className="text-4xl md:text-5xl font-black text-primary mb-1">
        {count.toLocaleString()}{suffix && <span className="text-3xl">{suffix}</span>}
      </div>
      <div className="text-slate-600 font-medium">{label}</div>
    </div>
  );
}

export default function ServiceResults() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="proof" className="py-24 bg-blue-50 border-y border-blue-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">数字で証明する</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} inView={isInView} delay={i * 100} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100" style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms ease-out 400ms" }}>
          <h3 className="text-center text-lg font-bold text-slate-800 mb-6">グローバル企業も Claude Code で劇的な成果を上げています</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-black text-xl text-slate-900 mb-2">Rakuten</div>
              <p className="text-sm text-slate-600">開発時間を<span className="font-bold text-primary">79%削減</span></p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0">
              <div className="font-black text-xl text-slate-900 mb-2">Spotify</div>
              <p className="text-sm text-slate-600">エンジニアリング時間を<span className="font-bold text-primary">90%削減</span></p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0">
              <div className="font-black text-xl text-slate-900 mb-2">Classmethod</div>
              <p className="text-sm text-slate-600">生産性が<span className="font-bold text-primary">10倍に向上</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
