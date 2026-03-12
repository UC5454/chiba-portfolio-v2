import Link from "next/link";

import { guilds } from "@/data/guilds";

export default function Guilds() {
  return (
    <section className="py-16 bg-navy-light border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-xl mb-8">
          同盟ギルド
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {guilds.map((guild) => (
            <Link
              key={guild.id}
              href={`/guilds/${guild.id}`}
              className="group bg-navy-deep border-2 border-gold-retro/30 hover:border-gold-retro transition-all p-1 shadow-pixel hover:-translate-y-2 duration-300"
            >
              <div className="border border-gold-retro/20 p-5">
                <div className="w-14 h-14 mx-auto mb-3 bg-gold-retro/10 border-2 border-gold-retro/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {guild.emoji}
                </div>
                <h3 className="font-bold text-gold-retro text-sm mb-1 font-[family-name:var(--font-pixel)]">{guild.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{guild.relation}</p>
                <p className="text-[10px] text-gray-500 line-clamp-2">{guild.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/guilds"
            className="inline-block bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro text-gold-retro font-[family-name:var(--font-pixel)] text-xs px-6 py-2 transition-colors"
          >
            ▶ もっと見る
          </Link>
        </div>
      </div>
    </section>
  );
}
