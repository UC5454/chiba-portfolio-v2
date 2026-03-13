"use client";

import { useInView } from "./hooks/useInView";

const badges = ["無料", "オンライン", "30分", "営業は一切なし"];

export default function ServiceFinalCTA() {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50" ref={ref}>
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
          transition: "all 600ms ease-out",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          まずは30分、話しませんか？
        </h2>
        <p className="text-lg text-slate-600 mb-10">
          無料相談では、貴社の現状をヒアリングし、最適なAIエージェント活用プランをご提案します。
        </p>

        <a
          href="#contact"
          className="inline-block w-full max-w-md bg-primary hover:bg-primary-hover text-white font-bold text-xl py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          style={{ boxShadow: "0 0 30px rgba(37, 99, 235, 0.3)" }}
        >
          無料相談を予約する
        </a>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {badges.map((b, i) => (
            <span
              key={i}
              className="bg-white text-slate-600 text-sm px-4 py-1.5 rounded-full border border-slate-200"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
