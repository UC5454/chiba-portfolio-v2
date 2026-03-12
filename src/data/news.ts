export interface NewsItem {
  id: string;
  type: string;
  color: string;
  date: string;
  text: string;
  content: string;
  thumbnail?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "ai-conference-2026",
    type: "じゅうよう",
    color: "red",
    date: "2026.03.05",
    text: "AIカンファレンス登壇決定！",
    content:
      "東北エリアのDX事例を中心に、AI社員の導入プロセスを登壇で共有します。\n実際の業務設計と運用改善のポイントを、現場目線で解説予定です。\nセッション後は相談ブースも開放し、導入前の疑問にも回答します。",
    thumbnail: "/images/news/ai-conference-2026.webp",
  },
  {
    id: "ai-team-25-members",
    type: "あっぷでーと",
    color: "blue",
    date: "2026.02.28",
    text: "AI社員が25名体制になりました",
    content:
      "新たに専門職AIメンバーが加入し、合計25名体制へ拡張しました。\n記事制作から営業資料、映像制作まで対応レンジが大幅に向上しています。\n案件ごとに最適なパーティ編成を行い、初動速度をさらに高めていきます。",
    thumbnail: "/images/news/ai-team-25-members.webp",
  },
  {
    id: "tohoku-community-350",
    type: "こみゅにてぃ",
    color: "green",
    date: "2026.02.15",
    text: "東北AIコミュニティ メンバー350名突破",
    content:
      "東北AIコミュニティの参加者が350名を超えました。\n勉強会・ハンズオン・交流会を継続し、地域でのAI実装を後押ししています。\n今後は企業連携プログラムを強化し、実案件の共創にも取り組みます。",
    thumbnail: "/images/news/tohoku-community-350.webp",
  },
];

export const colorMap: Record<string, { badge: string; border: string; badgeBorder: string; bg: string }> = {
  red: {
    badge: "text-white bg-red-700",
    border: "border-l-red-500",
    badgeBorder: "border-red-900",
    bg: "",
  },
  blue: {
    badge: "text-white bg-blue-700",
    border: "border-l-blue-500",
    badgeBorder: "border-blue-900",
    bg: "",
  },
  green: {
    badge: "text-white bg-green-700",
    border: "border-l-green-500",
    badgeBorder: "border-green-900",
    bg: "",
  },
};
