import Link from "next/link";

const achievements = [
  {
    label: "しごと",
    items: [
      { name: "経営戦略・事業推進", icon: "⚔" },
      { name: "AI導入・運用設計", icon: "🤖" },
      { name: "組織マネジメント", icon: "🏛" },
    ],
  },
  {
    label: "じっせき",
    items: [
      { name: "成長率 300〜400%", icon: "📈" },
      { name: "月間 1,714時間削減", icon: "⏱" },
      { name: "登壇 50回・動員 2,000名", icon: "🎤" },
    ],
  },
  {
    label: "なかま",
    items: [
      { name: "AI社員 25名体制", icon: "👥" },
      { name: "東北AIコミュニティ 350名超", icon: "🏰" },
      { name: "公認スピーカー認定", icon: "🏆" },
    ],
  },
];

const statCards = [
  {
    icon: "⚔",
    label: "やくしょく",
    value: "取締役COO",
    sub: "株式会社デジタルゴリラ",
  },
  {
    icon: "👥",
    label: "なかま",
    value: "25名",
    sub: "AI社員チーム",
  },
  {
    icon: "🏰",
    label: "ギルド",
    value: "350名超",
    sub: "東北AIコミュニティ",
  },
  {
    icon: "🏆",
    label: "めいせい",
    value: "50回以上",
    sub: "登壇・セミナー実績",
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
            <div className="bg-navy-deep/60 border border-gold-retro/30 p-3">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">せいちょうりつ</p>
              <p className="text-white font-black text-xl">300%</p>
            </div>
            <div className="bg-navy-deep/60 border border-gold-retro/30 p-3">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">さくげん</p>
              <p className="text-white font-black text-xl">1,714<span className="text-sm">時間</span></p>
            </div>
            <div className="bg-navy-deep/60 border border-gold-retro/30 p-3">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">とうだん</p>
              <p className="text-white font-black text-xl">50<span className="text-sm">回以上</span></p>
            </div>
            <div className="bg-navy-deep/60 border border-gold-retro/30 p-3">
              <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">きょてん</p>
              <p className="text-white font-black text-xl">仙台</p>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="bg-navy-light/80 border-2 border-gold-retro/30 hover:border-gold-retro transition-colors p-5 flex items-start gap-4 hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="w-14 h-14 bg-gold-retro/20 border-2 border-gold-retro/60 flex items-center justify-center text-2xl flex-shrink-0">
                {stat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-xs mb-1">
                  {stat.label}
                </p>
                <p className="text-white font-black text-2xl mb-0.5">{stat.value}</p>
                <p className="text-gray-300 text-xs">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Skill badges - RPG style */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-xs sm:text-sm mb-6">
            とくぎ一覧
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {achievements.map((group) => (
              <div key={group.label} className="bg-navy-light/60 border-2 border-gold-retro/20 p-4">
                <h4 className="font-[family-name:var(--font-pixel)] text-gold-retro text-[10px] mb-3 text-center border-b border-gold-retro/20 pb-2">
                  {group.label}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-gray-200">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
