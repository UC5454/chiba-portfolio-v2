import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const statusBadgeColors: Record<string, string> = {
  COMPLETED: "text-amber-800 bg-amber-100",
  ONGOING: "text-green-800 bg-green-100",
};

export default async function QuestDetailPage({ params }: QuestDetailPageProps) {
  const { id } = await params;
  const quest = quests.find((item) => item.id === id);

  if (!quest) {
    notFound();
  }

  return (
    <PageContainer title="クエスト詳細" breadcrumb={[{ label: "クエスト", href: "/quests" }, { label: quest.title }]}>
      <article className="max-w-3xl mx-auto bg-[#8b4513] p-2 shadow-pixel rounded-sm">
        <div className="bg-[#fdf5e6] border-4 border-[#5c3a21] p-6 md:p-8 text-gray-900">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`font-bold font-[family-name:var(--font-pixel)] text-[10px] ${statusBadgeColors[quest.status] || "text-gray-800 bg-gray-100"} px-2 py-1 rounded`}
            >
              {quest.status}
            </span>
            <span className="text-sm font-bold text-gray-500">{quest.year}</span>
          </div>

          <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#3e2723] mb-4 leading-relaxed">
            {quest.title}
          </h2>

          {quest.thumbnail && (
            <div className="mb-6 border-2 border-[#5c3a21]/30 overflow-hidden">
              <Image
                src={quest.thumbnail}
                alt={quest.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="space-y-2 text-sm sm:text-base whitespace-pre-line mb-6">{quest.details}</div>

          <div className="bg-[#f5e6c8] border-2 border-[#5c3a21]/30 p-4">
            <h3 className="font-[family-name:var(--font-pixel)] text-[10px] text-[#5c3a21] mb-3">成果ログ</h3>
            <ul className="space-y-2">
              {quest.results.map((result) => (
                <li key={result} className="flex gap-2 text-sm sm:text-base text-gray-800">
                  <span className="text-green-700">✓</span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Link href="/quests" className="text-[#5c3a21] hover:text-black transition-colors">
              ← クエストボードに戻る
            </Link>
          </div>
        </div>
      </article>
    </PageContainer>
  );
}
