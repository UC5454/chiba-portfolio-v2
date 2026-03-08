export interface Quest {
  id: string;
  status: "COMPLETED" | "ONGOING";
  statusColor: string;
  year: string;
  title: string;
  description: string;
  details: string;
  results: string[];
}

export const quests: Quest[] = [
  {
    id: "ai-implementation-support",
    status: "COMPLETED",
    statusColor: "text-gold-retro border-gold-retro",
    year: "2025",
    title: "AI導入支援プロジェクト",
    description:
      "地方企業の業務効率を300%改善。カスタムAIエージェントの開発と実装。",
    details:
      "複数部署の業務フローを棚卸しし、反復タスクを中心にAI化を推進しました。\n既存ツールと連携した専用エージェントを構築し、現場運用まで伴走。\n導入後の改善サイクルまで設計し、継続的に成果が出る体制へ移行しています。",
    results: [
      "定型業務の処理時間を平均70%削減",
      "問い合わせ一次対応の自動化率85%達成",
      "運用開始3か月で投資回収ラインを突破",
    ],
  },
  {
    id: "tohoku-tech-community",
    status: "COMPLETED",
    statusColor: "text-gold-retro border-gold-retro",
    year: "2024",
    title: "東北Techコミュニティ設立",
    description:
      "ゼロから350名のギルドを形成。定期的な勉強会とハッカソンを開催。",
    details:
      "地域の実務者と学生をつなぐ場として、コミュニティ運営を立ち上げました。\n月次イベントと共同制作企画を継続し、実践機会を安定的に提供。\n企業との協働も増え、採用・案件創出の土台として機能しています。",
    results: [
      "累計参加者350名超のコミュニティへ成長",
      "年間20回以上の勉強会・交流会を実施",
      "地域企業との連携プロジェクトを複数創出",
    ],
  },
  {
    id: "autonomous-ai-employee-platform",
    status: "ONGOING",
    statusColor: "text-green-400 border-green-400",
    year: "2026",
    title: "自律型AI社員プラットフォーム",
    description: "中小企業向けのSaaSプロダクト開発。β版リリース済み。",
    details:
      "業務部門ごとに使えるAI社員テンプレートを提供するSaaSを開発中です。\n初期設定を短時間で終えられる導線を整備し、運用負荷を最小化。\n現在はβ版の利用ログを分析し、正式版に向けて改善を進めています。",
    results: [
      "β版ユーザーへの導入時間を平均2時間以内に短縮",
      "業務テンプレートを10職種向けに拡充",
      "継続率向上に向けた機能改善サイクルを運用中",
    ],
  },
];
