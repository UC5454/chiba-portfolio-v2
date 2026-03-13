export default function ServiceMarket() {
  return (
    <section id="market" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">2026年、AIエージェント元年。</h2>
        <p className="text-lg text-slate-600 mb-16 max-w-2xl mx-auto">チャットボットの時代は終わり、自律的にタスクを実行する「エージェント」の時代が始まっています。乗り遅れる前に、今すぐ行動を。</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="text-sm font-bold text-slate-500 mb-2">市場規模予測 (2030年)</div>
            <div className="text-5xl font-black text-slate-900 mb-2">$50B</div>
            <div className="text-sm text-slate-500">CAGR 45.8%の急成長市場</div>
          </div>
          <div className="p-6 border-y md:border-y-0 md:border-x border-slate-200">
            <div className="text-sm font-bold text-slate-500 mb-2">導入検討企業</div>
            <div className="text-5xl font-black text-slate-900 mb-2">60<span className="text-3xl">%超</span></div>
            <div className="text-sm text-slate-500">過半数が導入に向けて動いている</div>
          </div>
          <div className="p-6">
            <div className="text-sm font-bold text-slate-500 mb-2">現在の利用率</div>
            <div className="text-5xl font-black text-primary mb-2">3<span className="text-3xl">%</span></div>
            <div className="text-sm text-slate-500 font-medium">先行者利益を得るなら「今」</div>
          </div>
        </div>
      </div>
    </section>
  );
}
