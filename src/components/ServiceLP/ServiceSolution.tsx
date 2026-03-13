"use client";

import { useInView } from "./hooks/useInView";

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
);

export default function ServiceSolution() {
  const { ref, isInView } = useInView();

  return (
    <section id="solution" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            デジタルゴリラに<span className="text-primary border-b-4 border-primary/30">しかできない</span>3つの理由
          </h2>
        </div>

        <div className="space-y-12">
          {/* Reason 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms ease-out" }}>
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-primary font-bold text-xl mb-6">1</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">日本で数千人しかいない「教えられる」レベル</h3>
              <p className="text-slate-600 leading-relaxed mb-6">NRIやBig4はシステムを「提供」し、個人講師はツールを「紹介」するだけ。我々はあなたのチームに並走し、自走できるまで「一緒に作る」アプローチをとります。</p>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-slate-bg rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="grid grid-cols-3 gap-4 font-bold border-b border-slate-300 pb-3 mb-3 text-slate-500 text-sm md:text-base text-center">
                  <div className="text-left">プレイヤー</div><div>スタンス</div><div>コスト</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 text-center items-center text-sm md:text-base">
                  <div className="text-left font-medium">NRI / Big4</div>
                  <div className="bg-slate-200 text-slate-700 py-1 rounded">提供する</div>
                  <div className="text-slate-400 text-xs md:text-sm">💰💰💰💰</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-slate-200 text-center items-center text-sm md:text-base">
                  <div className="text-left font-medium">個人講師</div>
                  <div className="bg-slate-200 text-slate-700 py-1 rounded">紹介する</div>
                  <div className="text-slate-400 text-xs md:text-sm">💰</div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-slate-200 font-bold text-primary bg-blue-50 -mx-6 px-6 rounded-b-lg text-center items-center text-sm md:text-base">
                  <div className="text-left flex items-center gap-1">
                    <StarIcon />
                    デジタルゴリラ
                  </div>
                  <div className="bg-primary text-white py-1 rounded">一緒に作る</div>
                  <div className="text-gold-accent text-xs md:text-sm tracking-widest">💰💰</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reason 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms ease-out 100ms" }}>
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-primary font-bold text-xl mb-6">2</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">25名のAI社員チームを実運用</h3>
              <p className="text-slate-600 leading-relaxed mb-6">机上の空論ではありません。自社で月間1,714時間の業務削減を実証済み。CLAUDE.mdの最適設計、MCP（Model Context Protocol）の構築ノウハウなど、全て一次情報として提供します。</p>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-slate-bg rounded-xl p-8 border border-slate-200 shadow-sm flex items-center justify-center h-full">
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">業務削減時間</div>
                    <div className="text-3xl font-black text-primary">1,714<span className="text-lg font-bold ml-1">h/月</span></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100">
                    <div className="text-sm text-slate-500 mb-1">実運用AI社員</div>
                    <div className="text-3xl font-black text-primary">25<span className="text-lg font-bold ml-1">名</span></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-slate-100 col-span-2">
                    <div className="text-sm text-slate-500 mb-1">コア技術ノウハウ</div>
                    <div className="text-lg font-bold text-slate-800">CLAUDE.md設計 / MCP構築</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reason 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12" style={{ opacity: isInView ? 1 : 0, transform: isInView ? "translateY(0)" : "translateY(20px)", transition: "all 600ms ease-out 200ms" }}>
            <div className="md:w-1/2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-primary font-bold text-xl mb-6">3</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">徹底した「自走支援」</h3>
              <p className="text-slate-600 leading-relaxed mb-6">研修実績50回超、動員1,500名超。AIを魔法ではなく「道具」として使い倒すためのマインドセットから、実務に落とし込むワークフロー設計まで、千葉・安永がメインで伴走します。</p>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="bg-slate-bg rounded-xl p-8 border border-slate-200 shadow-sm">
                <ul className="space-y-4">
                  <li className="flex items-start"><CheckIcon /><span className="text-slate-700 font-medium">ツール導入で終わらせない組織定着化</span></li>
                  <li className="flex items-start"><CheckIcon /><span className="text-slate-700 font-medium">現場の課題に合わせたプロンプト・エージェント設計</span></li>
                  <li className="flex items-start"><CheckIcon /><span className="text-slate-700 font-medium">セキュリティとガバナンスを担保した運用ルール策定</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
