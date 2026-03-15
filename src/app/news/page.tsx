import type { Metadata } from "next";

import PageContainer from "@/components/PageContainer";
import { getAllNews } from "@/lib/news";

import NewsBoard from "./NewsBoard";

export function generateMetadata(): Metadata {
  return {
    title: "お知らせ一覧 | 千葉勇志 / Yushi Chiba",
    description: "AI社員プロジェクトのお知らせ一覧。重要告知・更新情報・コミュニティ情報を掲載。",
  };
}

export default async function NewsPage() {
  const newsItems = await getAllNews();

  return (
    <PageContainer title="旅の掲示板" breadcrumb={[{ label: "お知らせ" }]}>
      <NewsBoard items={newsItems} />
    </PageContainer>
  );
}
