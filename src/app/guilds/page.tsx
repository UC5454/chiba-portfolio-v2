import type { Metadata } from "next";
import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import { guilds } from "@/data/guilds";

export function generateMetadata(): Metadata {
  return {
    title: "ギルド一覧 | 千葉勇志 / Yushi Chiba",
    description: "連携している同盟ギルド・企業・コミュニティの一覧ページ。",
  };
}

export default function GuildsPage() {
  return (
    <PageContainer title="同盟ギルド" breadcrumb={[{ label: "ギルド" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guilds.map((guild) => (
          <Link
            key={guild.id}
            href={`/guilds/${guild.id}`}
            className="bg-navy-light border border-white/20 p-6 text-center hover:border-gold-retro transition-colors"
          >
            <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600 mb-3">
              <span className="text-3xl">{guild.emoji}</span>
            </div>
            <h2 className="font-bold text-sm mb-1">{guild.name}</h2>
            <p className="text-xs text-gray-400">{guild.relation}</p>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
