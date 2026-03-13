"use client";

import { useInView } from "./hooks/useInView";

const CheckIcon = () => (
  <svg className="w-5 h-5 text-primary mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

export default function ServicePlans() {
  const { ref, isInView } = useInView();

  return (
    <section id="pricing" className="py-24 bg-slate-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">あなたに合ったプランを選べます</h2>
          <p className="text-lg text-slate-600">人材開発支援助成金を活用することで、最大75%のコストダウンが可能です。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Starter */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms ease-out" }}>
            <div className="text-2xl mb-2">🌱</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">スターター</h3>
            <p className="text-sm text-slate-500 mb-6 h-10">まずは小さく始めたい、基礎を学びたい企業様向け</p>
            <div className="mb-6">
              <div className="text-slate-400 line-through text-sm">通常 50万円</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-slate-700">実質</span>
                <span className="text-4xl font-black text-slate-900">12.5</span>
                <span className="text-slate-600 font-medium">万円〜</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-slate-700">
              <li className="flex items-start"><CheckIcon />AI活用度アセスメント診断</li>
              <li className="flex items-start"><CheckIcon />Claude Code 基礎研修（1日）</li>
              <li className="flex items-start"><CheckIcon />初期プロンプト設計支援</li>
            </ul>
            <a href="#contact" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-center rounded-xl transition-colors">相談する</a>
          </div>

          {/* Professional */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gold-accent relative transform md:-translate-y-4 z-10" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(-16px)" : "translateY(20px)", transition: "all 600ms ease-out 100ms" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              人気No.1
            </div>
            <div className="text-2xl mb-2">🎋</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">プロフェッショナル</h3>
            <p className="text-sm text-slate-500 mb-6 h-10">自社専用のAIエージェントを構築し、実運用に乗せたい企業様向け</p>
            <div className="mb-6">
              <div className="text-slate-400 line-through text-sm">通常 145万円</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-slate-700">実質</span>
                <span className="text-5xl font-black text-primary">36</span>
                <span className="text-slate-600 font-medium">万円〜</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-slate-700">
              <li className="flex items-start"><CheckIcon />スターターの内容全て</li>
              <li className="flex items-start"><CheckIcon />内製化ワークショップ（2日間）</li>
              <li className="flex items-start"><CheckIcon /><span className="font-bold">CLAUDE.md 設計テンプレート</span></li>
              <li className="flex items-start"><CheckIcon />オンラインフォロー（3ヶ月）</li>
            </ul>
            <a href="#contact" className="block w-full py-4 px-4 bg-primary hover:bg-primary-hover text-white font-bold text-center rounded-xl transition-colors shadow-md">相談する</a>
          </div>

          {/* Expert */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms ease-out 200ms" }}>
            <div className="text-2xl mb-2">🌲</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">エキスパート</h3>
            <p className="text-sm text-slate-500 mb-6 h-10">全社的なDX推進と、高度な連携（MCP）を実装したい企業様向け</p>
            <div className="mb-6">
              <div className="text-slate-400 line-through text-sm">通常 240万円</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-slate-700">実質</span>
                <span className="text-4xl font-black text-slate-900">60</span>
                <span className="text-slate-600 font-medium">万円〜</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-slate-700">
              <li className="flex items-start"><CheckIcon />プロフェッショナルの内容全て</li>
              <li className="flex items-start"><CheckIcon /><span className="font-bold">MCP構築・API連携支援</span></li>
              <li className="flex items-start"><CheckIcon />全社ワークフロー設計</li>
              <li className="flex items-start"><CheckIcon />月2回のハンズオン伴走（3ヶ月）</li>
            </ul>
            <a href="#contact" className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-center rounded-xl transition-colors">相談する</a>
          </div>
        </div>

        {/* Subsidy Banner */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white text-center shadow-lg" style={{ opacity: isInView ? 1 : 0, transition: "opacity 600ms ease-out 300ms" }}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-left">
              <h4 className="text-xl font-bold mb-1">人材開発支援助成金で最大75%OFF</h4>
              <p className="text-blue-100 text-sm md:text-base">面倒な申請手続きも、提携社労士と共に手厚くサポートいたします。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
