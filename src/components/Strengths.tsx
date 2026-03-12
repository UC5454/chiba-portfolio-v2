const strengths = [
  {
    title: "挑戦心",
    text: "まだ誰もやってないところで燃える。\n未開のダンジョンこそ、最高の遊び場だ。",
    rotate: "-rotate-1",
  },
  {
    title: "実証主義",
    text: "自分の目で見たこと以外は信じない。\n魔法も剣技も、まずは自分で試す。",
    rotate: "rotate-2",
  },
  {
    title: "行動力",
    text: "できないと言う前にまず手を動かす。\n悩む時間があるなら、1行でもコードを書く。",
    rotate: "-rotate-2",
  },
  {
    title: "仲間意識",
    text: "AIは道具ではなく仲間。\n共にレベルアップし、共にボスを倒す。",
    rotate: "rotate-1",
  },
  {
    title: "郷土愛",
    text: "東北から世界を変える。\nここが私の始まりの町であり、最終決戦の地。",
    rotate: "-rotate-1",
  },
];

export default function Strengths() {
  return (
    <section id="strengths" className="py-20 relative" style={{ backgroundImage: "url('/images/bg-strengths.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-wood-dark/70" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-[#deb887] font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-12 drop-shadow-md">
          冒険の書
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {strengths.map((s, i) => (
            <div
              key={i}
              className={`group w-full md:w-80 bg-[#fdf5e6] text-gray-800 p-6 shadow-lg transform ${s.rotate} hover:rotate-0 transition-all duration-300 relative cursor-default hover:shadow-[0_0_30px_rgba(255,120,0,0.6),0_0_60px_rgba(255,60,0,0.3),0_0_100px_rgba(255,30,0,0.15)]`}
            >
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-16 bg-red-800/20 rotate-90 rounded" />
              {/* Fire glow border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 border-orange-400/60" />
              <h3 className="font-bold text-lg mb-2 border-b-2 border-gray-300 pb-1 group-hover:text-orange-700 transition-colors">
                {s.title}
              </h3>
              <p className="leading-relaxed whitespace-pre-line">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
