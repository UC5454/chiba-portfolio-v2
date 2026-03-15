import { MediaCategory } from "@/types/media";

export interface CtaConfig {
  heading: string;
  description: string;
  buttonText: string;
  href: string;
  accent: string; // tailwind bg color class or hex
}

export interface MidArticleCtaConfig {
  heading: string;
  description: string;
  buttonText: string;
  href: string;
}

const CONTACT_EMAIL = "y.chiba@digital-gorilla.co.jp";

const ctaByCategory: Record<MediaCategory, CtaConfig> = {
  "ai-employees": {
    heading: "AI導入・AI社員の構築について相談する",
    description: "25名のAI社員チームを構築した実績をもとに、貴社に最適なAI活用をご提案します。",
    buttonText: "AI導入のご相談はこちら",
    href: `mailto:${CONTACT_EMAIL}?subject=AI導入のご相談`,
    accent: "#3b82f6",
  },
  "ai-business": {
    heading: "AI導入・DX推進のご相談",
    description: "机上の空論ではない、体験に基づいたAI導入戦略をご提案します。",
    buttonText: "AI導入のご相談はこちら",
    href: `mailto:${CONTACT_EMAIL}?subject=AI導入・DX推進のご相談`,
    accent: "#10b981",
  },
  education: {
    heading: "AI研修・講演のご依頼",
    description: "大学・企業・自治体向けに、実践的なAI研修プログラムをご提供しています。",
    buttonText: "AI研修のご依頼はこちら",
    href: `mailto:${CONTACT_EMAIL}?subject=AI研修・講演のご依頼`,
    accent: "#8b5cf6",
  },
  government: {
    heading: "自治体・行政のAI活用相談",
    description: "宮城県庁との連携実績をもとに、自治体DXの実現をサポートします。",
    buttonText: "自治体連携のご相談はこちら",
    href: `mailto:${CONTACT_EMAIL}?subject=自治体AI活用のご相談`,
    accent: "#f59e0b",
  },
  column: {
    heading: "AI活用についてお気軽にご相談ください",
    description: "AIに関するご質問・ご相談、登壇・取材のご依頼はお気軽にどうぞ。",
    buttonText: "お問い合わせ",
    href: `mailto:${CONTACT_EMAIL}?subject=お問い合わせ`,
    accent: "#6366f1",
  },
  events: {
    heading: "イベント・コミュニティについてのお問い合わせ",
    description: "東北AI維新Conferenceや東北AIコミュニティへの参加・協賛についてはこちら。",
    buttonText: "お問い合わせ",
    href: `mailto:${CONTACT_EMAIL}?subject=イベント・コミュニティについて`,
    accent: "#ec4899",
  },
  tech: {
    heading: "AI活用についてお気軽にご相談ください",
    description: "CLAUDE.md設計・MCP構築・Claude Code活用など、技術的なご相談はお気軽にどうぞ。",
    buttonText: "お問い合わせ",
    href: `mailto:${CONTACT_EMAIL}?subject=技術的なご相談`,
    accent: "#06b6d4",
  },
};

export function getCtaForCategory(category: MediaCategory): CtaConfig {
  return ctaByCategory[category];
}

const midCtaByCategory: Record<MediaCategory, MidArticleCtaConfig> = {
  "ai-employees": {
    heading: "AI社員チームの構築、気になりませんか？",
    description: "25名のAI社員を運用する千葉勇志が、貴社に最適なAI活用プランをご提案します。",
    buttonText: "導入チェックリストを見る",
    href: "/services/claude-code-ai-agent",
  },
  "ai-business": {
    heading: "AI導入、まずは無料で相談してみませんか？",
    description: "机上の空論ではない、体験に基づいたAI導入戦略を30分の無料相談でお話しします。",
    buttonText: "無料相談を申し込む",
    href: "/contact",
  },
  education: {
    heading: "AI研修プログラムの詳細はこちら",
    description: "大学・企業・自治体向けに、実践的なAI研修プログラムをご提供しています。",
    buttonText: "研修メニューを見る",
    href: "/services/claude-code-ai-agent",
  },
  government: {
    heading: "自治体DXの実現をサポートします",
    description: "宮城県庁との連携実績をもとに、自治体DXの実現をサポートします。",
    buttonText: "連携事例を見る",
    href: "/#services",
  },
  column: {
    heading: "AIに関するご相談はお気軽に",
    description: "AIに関するご質問・ご相談、登壇・取材のご依頼はお気軽にどうぞ。",
    buttonText: "お問い合わせ",
    href: "/contact",
  },
  events: {
    heading: "東北AIコミュニティに参加しませんか？",
    description: "300名超が参加する東北最大のAIコミュニティ。勉強会・交流会を定期開催中。",
    buttonText: "詳細を見る",
    href: "/#community",
  },
  tech: {
    heading: "Claude Codeの導入支援はこちら",
    description: "CLAUDE.md設計・MCP構築・Claude Code活用など、技術的なご相談はお気軽にどうぞ。",
    buttonText: "サービス詳細を見る",
    href: "/services/claude-code-ai-agent",
  },
};

export function getMidCtaForCategory(category: MediaCategory): MidArticleCtaConfig {
  return midCtaByCategory[category];
}

export const defaultCta: CtaConfig = {
  heading: "AI活用についてお気軽にご相談ください",
  description: "AI導入・AI研修・登壇・取材のご依頼など、お気軽にどうぞ。",
  buttonText: "お問い合わせ",
  href: `mailto:${CONTACT_EMAIL}?subject=お問い合わせ`,
  accent: "#3b82f6",
};
