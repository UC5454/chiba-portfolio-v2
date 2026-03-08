import type { Metadata } from "next";

import PageContainer from "@/components/PageContainer";

import EmployeesHall from "./EmployeesHall";

export function generateMetadata(): Metadata {
  return {
    title: "AI社員一覧 | 千葉勇志 / Yushi Chiba",
    description: "AI社員パーティの一覧ページ。役職・チーム別にメンバーを確認できます。",
  };
}

export default function EmployeesPage() {
  return (
    <PageContainer title="謁見の間" breadcrumb={[{ label: "AI社員一覧" }]}>
      <EmployeesHall />
    </PageContainer>
  );
}
