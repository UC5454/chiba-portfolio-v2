import { MediaCategory } from "@/types/media";

export interface CtaConfig {
  heading: string;
  description: string;
  buttonText: string;
  href: string;
  accent: string; // tailwind bg color class or hex
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
};

export function getCtaForCategory(category: MediaCategory): CtaConfig {
  return ctaByCategory[category];
}

export const defaultCta: CtaConfig = {
  heading: "AI活用についてお気軽にご相談ください",
  description: "AI導入・AI研修・登壇・取材のご依頼など、お気軽にどうぞ。",
  buttonText: "お問い合わせ",
  href: `mailto:${CONTACT_EMAIL}?subject=お問い合わせ`,
  accent: "#3b82f6",
};
