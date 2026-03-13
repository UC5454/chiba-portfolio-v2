"use client";

import { useInView } from "./hooks/useInView";

const challenges = [
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "使い方がわからない",
    body: "「ChatGPTの次に何をすればいい？」41.9%の企業が「活用方法がわからない」と回答しています。（総務省 情報通信白書）",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "外注すると高すぎる",
    body: "Big4やSIerの見積もりは数千万円〜。素晴らしい提案でも、中堅・中小企業には到底手が届かないのが現実です。",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25h-3c-.414 0-.75.336-.75.75V10.5a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75V3.75a.75.75 0 00-.75-.75h-3a2.25 2.25 0 00-2.25 2.25v5.25A2.25 2.25 0 006 13.5h3a.75.75 0 01.75.75V21m0 0h4.5m-4.5 0v-7.5" /></svg>,
    title: "社内に人材がいない",
    body: "LLMエンジニアの求人倍率は23.5倍。採用しようにもそもそも市場に人材がおらず、自社開発が進みません。",
  },
];

export default function ServiceChallenges() {
  const { ref, isInView } = useInView();

  return (
    <section id="problems" className="py-24 bg-slate-bg border-y border-slate-200" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">AIエージェント、導入したいけど…</h2>
          <p className="text-lg text-slate-600">日本企業のAIエージェント利用率はわずか3%。<br className="hidden sm:block" />でも60%超の企業が導入を検討中。何が壁になっているのでしょうか？</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {challenges.map((c, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-md"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(20px)",
                transition: `all 600ms ease-out ${i * 100}ms`,
              }}
            >
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6">
                {c.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{c.title}</h3>
              <p className="text-slate-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
