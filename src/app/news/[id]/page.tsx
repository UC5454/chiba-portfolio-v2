import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageContainer from "@/components/PageContainer";
import { colorMap, newsItems } from "@/data/news";

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = newsItems.find((news) => news.id === id);

  if (!item) {
    return {
      title: "お知らせが見つかりません | 千葉勇志 / Yushi Chiba",
      description: "指定されたお知らせは存在しません。",
    };
  }

  return {
    title: `${item.text} | お知らせ | 千葉勇志 / Yushi Chiba`,
    description: item.content,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const item = newsItems.find((news) => news.id === id);

  if (!item) {
    notFound();
  }

  const colors = colorMap[item.color];

  return (
    <PageContainer
      title="お知らせ詳細"
      breadcrumb={[{ label: "お知らせ", href: "/news" }, { label: item.text }]}
    >
      <article className="max-w-3xl mx-auto bg-[#8b4513] p-2 shadow-pixel rounded-sm">
        <div className="bg-[#fdf5e6] border-4 border-[#5c3a21] p-6 md:p-8 text-gray-900">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`font-bold font-[family-name:var(--font-pixel)] text-[10px] ${colors.badge} px-2 py-1 rounded`}
            >
              {item.type}
            </span>
            <span className="text-sm font-bold text-gray-500">{item.date}</span>
          </div>

          <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#3e2723] mb-4 leading-relaxed">
            {item.text}
          </h2>

          {item.thumbnail && (
            <div className="mb-6 border-2 border-[#5c3a21]/30 overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.text}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="space-y-2 text-sm sm:text-base whitespace-pre-line">{item.content}</div>

          <div className="mt-8">
            <Link href="/news" className="text-[#5c3a21] hover:text-black transition-colors">
              ← 掲示板に戻る
            </Link>
          </div>
        </div>
      </article>
    </PageContainer>
  );
}
