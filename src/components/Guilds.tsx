import Link from "next/link";

import { guilds } from "@/data/guilds";

export default function Guilds() {
  return (
    <section className="py-16 bg-navy-light border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-8">
          同盟ギルド
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {guilds.map((guild) => (
            <Link
              key={guild.id}
              href={`/guilds/${guild.id}`}
              className="bg-wood-dark p-1 shadow-pixel group hover:-translate-y-1 transition-transform"
            >
              <div className="bg-[#f5deb3] border-2 border-[#5c3a21] p-4 text-gray-900">
                <div className="text-2xl mb-2">{guild.emoji}</div>
                <h3 className="font-bold text-sm mb-1">{guild.name}</h3>
                <p className="text-xs text-gray-600">{guild.relation}</p>
              </div>
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
