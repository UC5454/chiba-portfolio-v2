const badges = ["無料", "オンライン", "30分", "営業なし"];

export default function ServiceHero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50 blur-3xl opacity-70" />
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-slate-50 blur-3xl opacity-70" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-primary ring-1 ring-inset ring-blue-600/20 mb-8">
          Claude Code 導入支援
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 mb-8">
          Big4に<span className="text-red-600">2,000万円</span>払うか、<br className="hidden sm:block" />
          <span className="text-gold-accent">60万円</span>で自走できるようになるか。
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          25名のAI社員を実運用する唯一の企業が教える<br className="hidden sm:block" />
          Claude Code × AIエージェント内製化支援
        </p>
        <div className="flex flex-col items-center">
          <a href="#contact" className="group inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white transition-all duration-300 bg-primary hover:bg-primary-hover rounded-xl shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.6)] hover:scale-105">
            <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            無料相談を予約する（30分）
          </a>
          <div className="flex items-center gap-4 mt-6 text-sm font-medium text-slate-500">
            {badges.map((text) => (
              <span key={text} className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
