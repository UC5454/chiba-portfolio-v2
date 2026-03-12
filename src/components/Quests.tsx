import Link from "next/link";
import Image from "next/image";

import { quests } from "@/data/quests";

export default function Quests() {
  return (
    <section id="quests" className="py-20 relative overflow-hidden" style={{ backgroundImage: "url('/images/bg-quests.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-green-900/75" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-12">
          <h2 className="text-white font-[family-name:var(--font-pixel)] text-base sm:text-xl bg-black/50 px-6 py-2 rounded">
            クエスト履歴
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="bg-navy-deep border-2 border-white p-1 relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-4 -left-4 text-3xl drop-shadow-md z-20">&#x1F4CD;</div>
              <div className="bg-gray-800 h-40 w-full mb-4 flex items-center justify-center border border-white/20 relative overflow-hidden">
                <Image
                  src="/images/bg-quests.webp"
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-25"
                />
                <span className="relative z-10 text-gray-500 font-[family-name:var(--font-pixel)] text-xs">ぼうけんのきろく</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold border px-1 ${quest.statusColor}`}>
                    {quest.status}
                  </span>
                  <span className="text-gray-400 text-xs">{quest.year}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{quest.title}</h3>
                <p className="text-sm text-gray-300 mb-4">{quest.description}</p>
                <Link
                  href={`/quests/${quest.id}`}
                  className="block text-center bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro/60 text-gold-retro py-2 text-xs font-[family-name:var(--font-pixel)] transition-colors"
                >
                  ▶ くわしく見る
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/quests"
            className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
          >
            もっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}
