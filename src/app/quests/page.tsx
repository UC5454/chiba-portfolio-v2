import type { Metadata } from "next";

import PageContainer from "@/components/PageContainer";

import QuestBoard from "./QuestBoard";

export function generateMetadata(): Metadata {
  return {
    title: "クエスト一覧 | 千葉勇志 / Yushi Chiba",
    description: "これまでの実績クエストと進行中プロジェクトを一覧で確認できます。",
  };
}

export default function QuestsPage() {
  return (
    <PageContainer title="クエストログ" breadcrumb={[{ label: "クエスト" }]}>
      <QuestBoard />
    </PageContainer>
  );
}
