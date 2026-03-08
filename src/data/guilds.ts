export interface Guild {
  id: string;
  emoji: string;
  name: string;
  relation: string;
  description: string;
  url?: string;
}

export const guilds: Guild[] = [
  {
    id: "digital-gorilla",
    emoji: "🏢",
    name: "株式会社デジタルゴリラ",
    relation: "取締役COO兼CAIO",
    description:
      "事業成長とAI実装を両立する中核ギルド。\n組織運営とプロダクト開発の両面で価値創出を推進しています。",
    url: "https://digital-gorilla.co.jp",
  },
  {
    id: "brand-new-day",
    emoji: "🌏",
    name: "Brand new day株式会社",
    relation: "CAIO",
    description:
      "新規事業とブランド戦略にAIを接続する同盟先。\n実行可能性の高い施策設計と運用改善を共同で進めています。",
    url: "https://brandnewday.co.jp",
  },
  {
    id: "tohoku-ai-community",
    emoji: "🎯",
    name: "東北AIコミュニティ",
    relation: "主宰",
    description:
      "東北発の実践型AIコミュニティ。\n学びと共創を軸に、地域企業の変革を後押ししています。",
  },
];
