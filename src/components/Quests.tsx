const quests = [
  {
    status: "COMPLETED",
    statusColor: "text-gold-retro border-gold-retro",
    year: "2025",
    title: "AI導入支援プロジェクト",
    description:
      "地方企業の業務効率を300%改善。カスタムAIエージェントの開発と実装。",
  },
  {
    status: "COMPLETED",
    statusColor: "text-gold-retro border-gold-retro",
    year: "2024",
    title: "東北Techコミュニティ設立",
    description:
      "ゼロから350名のギルドを形成。定期的な勉強会とハッカソンを開催。",
  },
  {
    status: "ONGOING",
    statusColor: "text-green-400 border-green-400",
    year: "2026",
    title: "自律型AI社員プラットフォーム",
    description: "中小企業向けのSaaSプロダクト開発。β版リリース済み。",
  },
];

export default function Quests() {
  return (
    <section id="quests" className="py-20 bg-green-900 relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20 grid-pattern" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <h2 className="text-white font-[family-name:var(--font-pixel)] text-base sm:text-xl bg-black/50 px-6 py-2 rounded">
            クエスト履歴 (Quests)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quests.map((quest, i) => (
            <div
              key={i}
              className="bg-navy-deep border-2 border-white p-1 relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-4 -left-4 text-3xl drop-shadow-md z-20">
                &#x1F4CD;
              </div>
              <div className="bg-gray-800 h-40 w-full mb-4 flex items-center justify-center border border-white/20">
                <span className="text-gray-500 font-[family-name:var(--font-pixel)] text-xs">
                  IMAGE
                </span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-bold border px-1 ${quest.statusColor}`}
                  >
                    {quest.status}
                  </span>
                  <span className="text-gray-400 text-xs">{quest.year}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{quest.title}</h3>
                <p className="text-sm text-gray-300 mb-4">
                  {quest.description}
                </p>
                <span className="block text-center bg-blue-600 hover:bg-blue-500 text-white py-2 text-xs font-[family-name:var(--font-pixel)] cursor-pointer transition-colors">
                  詳細を見る
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
