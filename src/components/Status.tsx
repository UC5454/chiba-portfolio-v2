import Link from "next/link";

const locations = [
  {
    label: "しごと",
    title: "マルチロール",
    subtitle: "COO・CAIO・顧問",
    icon: "⚔",
  },
  {
    label: "なかま",
    title: "25名",
    subtitle: "AI社員チーム",
    icon: "👥",
  },
  {
    label: "ギルド",
    title: "350名超",
    subtitle: "東北AIコミュニティ",
    icon: "🏰",
  },
  {
    label: "めいせい",
    title: "50回以上",
    subtitle: "登壇・セミナー",
    icon: "🏆",
  },
];

export default function Status() {
  return (
    <section id="status" className="py-20 bg-navy-deep relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-12">
          ステータス
        </h2>

        {/* Profile header */}
        <div className="max-w-3xl mx-auto mb-10 bg-navy-light/60 border-2 border-gold-retro/40 p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gold-retro/20 border-2 border-gold-retro flex items-center justify-center text-3xl">
              &#x1F451;
            </div>
            <div>
              <p className="font-[family-name:var(--font-pixel)] text-gold-retro text-sm sm:text-base">
                ちば ゆうし
              </p>
              <p className="text-gray-300 text-xs sm:text-sm">
                AIストラテジスト / 体験主義の冒険者
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-navy-deep/60 border border-white/10 p-2">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">レベル</p>
              <p className="text-white font-bold text-lg">??</p>
            </div>
            <div className="bg-navy-deep/60 border border-white/10 p-2">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">せいちょうりつ</p>
              <p className="text-white font-bold text-lg">300%</p>
            </div>
            <div className="bg-navy-deep/60 border border-white/10 p-2">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">さくげん</p>
              <p className="text-white font-bold text-lg">1,714h</p>
            </div>
            <div className="bg-navy-deep/60 border border-white/10 p-2">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">きょてん</p>
              <p className="text-white font-bold text-lg">仙台</p>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locations.map((stat, i) => (
            <div
              key={i}
              className="bg-navy-light/80 border-2 border-gold-retro/30 hover:border-gold-retro transition-colors p-4 flex items-start gap-4 hover:-translate-y-1 hover:animate-pulse"
            >
              <div className="w-14 h-14 bg-gold-retro/20 border-2 border-gold-retro/60 flex items-center justify-center text-2xl flex-shrink-0">
                {stat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-xs mb-1">
                  {stat.label}
                </p>
                <p className="text-white font-bold text-2xl mb-0.5">{stat.title}</p>
                <p className="text-gray-300 text-xs">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "More" button */}
        <div className="text-center mt-8">
          <Link
            href="/about"
            className="inline-block bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro text-gold-retro font-[family-name:var(--font-pixel)] text-xs px-6 py-3 transition-colors"
          >
            ▶ もっと知る
          </Link>
        </div>
      </div>
    </section>
  );
}
