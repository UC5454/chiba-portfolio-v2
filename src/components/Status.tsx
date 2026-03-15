import Link from "next/link";

export default function Status() {
  return (
    <section id="status" className="py-16 bg-navy-deep relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-10">
          ステータス
        </h2>

        {/* Compact profile + stats */}
        <div className="max-w-2xl mx-auto bg-navy-light/60 border-2 border-gold-retro/40 p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-gold-retro/20 border-2 border-gold-retro flex items-center justify-center text-2xl">
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
