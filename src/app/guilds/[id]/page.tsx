import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageContainer from "@/components/PageContainer";
import { guilds } from "@/data/guilds";

interface GuildDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return guilds.map((guild) => ({ id: guild.id }));
}

export async function generateMetadata({ params }: GuildDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const guild = guilds.find((item) => item.id === id);

  if (!guild) {
    return {
      title: "ギルドが見つかりません | 千葉勇志 / Yushi Chiba",
      description: "指定されたギルド情報は存在しません。",
    };
  }

  return {
    title: `${guild.name} | ギルド | 千葉勇志 / Yushi Chiba`,
    description: guild.description,
  };
}

export default async function GuildDetailPage({ params }: GuildDetailPageProps) {
  const { id } = await params;
  const guild = guilds.find((item) => item.id === id);

  if (!guild) {
    notFound();
  }

  return (
    <PageContainer title="ギルド詳細" breadcrumb={[{ label: "ギルド", href: "/guilds" }, { label: guild.name }]}>
      <article className="max-w-3xl mx-auto bg-navy-light border-2 border-gold-retro/40 p-6 md:p-8 text-center shadow-pixel">
        <div className="text-7xl mb-4">{guild.emoji}</div>
        <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-gold-retro mb-3 leading-relaxed">
          {guild.name}
        </h2>
        <p className="text-blue-sky text-sm mb-4">{guild.relation}</p>
        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line mb-6">{guild.description}</p>

        {guild.url && (
          <Link
            href={guild.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
          >
            公式サイトを見る
          </Link>
        )}
      </article>
    </PageContainer>
  );
}
