import { CategoryInfo } from "@/types/media";

export const mediaCategories: CategoryInfo[] = [
  { slug: "ai-employees", name: "AI社員・実運用", icon: "⚔️", description: "25名のAI社員チームの実運用記録。採用からOJT、日常業務まで。", color: "#3b82f6" },
  { slug: "ai-business", name: "AI導入・ビジネス", icon: "📊", description: "AI導入のコスト・失敗・成功のリアル。経営者の判断材料。", color: "#10b981" },
  { slug: "education", name: "AI研修・教育", icon: "📚", description: "大学講義・企業研修の現場から。AI人材育成のリアル。", color: "#8b5cf6" },
  { slug: "government", name: "行政・自治体連携", icon: "🏛️", description: "宮城県庁との勉強会、自治体DXの最前線。", color: "#f59e0b" },
  { slug: "column", name: "コラム", icon: "✍️", description: "AIと経営、体験主義、働き方について。", color: "#6366f1" },
  { slug: "events", name: "イベント・コミュニティ", icon: "🎪", description: "東北AI維新Conference、コミュニティ活動の記録。", color: "#ec4899" },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return mediaCategories.find(c => c.slug === slug);
}
