import Link from "next/link";

import { guilds } from "@/data/guilds";

export default function Guilds() {
  return (
    <section className="py-16 bg-navy-light border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-8">
          同盟ギルド (Guilds)
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {guilds.map((guild) => (
            <Link key={guild.id} href={`/guilds/${guild.id}`} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600 mb-2">
                <span className="text-2xl">{guild.emoji}</span>
              </div>
              <span className="font-bold text-sm">{guild.name}</span>
              <span className="text-xs text-gray-400">{guild.relation}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/guilds"
            className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
          >
            もっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}
