import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageContainer from "@/components/PageContainer";
import { quests } from "@/data/quests";

interface QuestDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return quests.map((quest) => ({ id: quest.id }));
}

export async function generateMetadata({ params }: QuestDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const quest = quests.find((item) => item.id === id);

  if (!quest) {
    return {
      title: "クエストが見つかりません | 千葉勇志 / Yushi Chiba",
      description: "指定されたクエスト情報は存在しません。",
    };
  }

  return {
    title: `${quest.title} | クエスト | 千葉勇志 / Yushi Chiba`,
    description: quest.description,
  };
}

export default async function QuestDetailPage({ params }: QuestDetailPageProps) {
  const { id } = await params;
  const quest = quests.find((item) => item.id === id);

  if (!quest) {
    notFound();
  }

  return (
    <PageContainer title="クエスト詳細" breadcrumb={[{ label: "クエスト", href: "/quests" }, { label: quest.title }]}>
      <article className="max-w-4xl mx-auto bg-[#1f2937] border-2 border-gold-retro/40 p-6 md:p-8 shadow-pixel">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className={`text-xs font-bold border px-2 py-1 ${quest.statusColor}`}>{quest.status}</span>
          <span className="text-gray-300 text-sm">{quest.year}</span>
        </div>

        <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-gold-retro mb-4 leading-relaxed">
          {quest.title}
        </h2>

        <p className="text-sm sm:text-base whitespace-pre-line leading-relaxed mb-6">{quest.details}</p>

        <div>
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-blue-sky mb-3">成果ログ</h3>
          <ul className="space-y-2">
            {quest.results.map((result) => (
              <li key={result} className="flex gap-2 text-sm sm:text-base">
                <span className="text-green-grass">✓</span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </PageContainer>
  );
}
