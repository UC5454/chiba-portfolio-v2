const guilds = [
  {
    emoji: "\u{1F3E2}",
    name: "株式会社デジタルゴリラ",
    relation: "取締役COO兼CAIO",
  },
  {
    emoji: "\u{1F30F}",
    name: "Brand new day株式会社",
    relation: "CAIO",
  },
  {
    emoji: "\u{1F3AF}",
    name: "東北AIコミュニティ",
    relation: "主宰",
  },
];

export default function Guilds() {
  return (
    <section className="py-16 bg-navy-light border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-8">
          同盟ギルド (Guilds)
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {guilds.map((guild, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600 mb-2">
                <span className="text-2xl">{guild.emoji}</span>
              </div>
              <span className="font-bold text-sm">{guild.name}</span>
              <span className="text-xs text-gray-400">{guild.relation}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
