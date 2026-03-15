import type { Metadata } from "next";
import ServiceHeader from "@/components/ServiceLP/ServiceHeader";
import ServiceHero from "@/components/ServiceLP/ServiceHero";
import ServiceChallenges from "@/components/ServiceLP/ServiceChallenges";
import ServiceSolution from "@/components/ServiceLP/ServiceSolution";
import ServiceResults from "@/components/ServiceLP/ServiceResults";
import ServicePlans from "@/components/ServiceLP/ServicePlans";
import ServiceFlow from "@/components/ServiceLP/ServiceFlow";
import ServicePersonas from "@/components/ServiceLP/ServicePersonas";
import ServiceMarket from "@/components/ServiceLP/ServiceMarket";
import ServiceProfile from "@/components/ServiceLP/ServiceProfile";
import ServiceFAQ from "@/components/ServiceLP/ServiceFAQ";
import ServiceFinalCTA from "@/components/ServiceLP/ServiceFinalCTA";
import ServiceMobileCTA from "@/components/ServiceLP/ServiceMobileCTA";
import ServiceFooter from "@/components/ServiceLP/ServiceFooter";

export const metadata: Metadata = {
  title: "Claude Code × AIエージェント開発支援・内製化支援 | デジタルゴリラ",
  description:
    "Big4に2,000万円払うか、60万円で自走できるようになるか。25名のAI社員を実運用する唯一の企業が教える、Claude Code × AIエージェント内製化支援。助成金で最大75%OFF。無料相談受付中。",
  openGraph: {
    title: "Claude Code × AIエージェント開発支援・内製化支援 | デジタルゴリラ",
    description:
      "Big4に2,000万円払うか、60万円で自走できるようになるか。25名のAI社員を実運用する企業が教える内製化支援。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/images/ogp-service-lp.png",
        width: 1200,
        height: 630,
        alt: "AIの\u201C本当の使い方\u201Dを、あなたの会社に。Claude Code × AIエージェント内製化支援 | デジタルゴリラ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code × AIエージェント開発支援・内製化支援 | デジタルゴリラ",
    description:
      "Big4に2,000万円払うか、60万円で自走できるようになるか。25名のAI社員を実運用する企業が教える内製化支援。",
    images: ["/images/ogp-service-lp.png"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "エンジニアがいなくても導入できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。スタータープランはエンジニア不要で始められます。Claude Codeはコマンドラインツールですが、操作自体はシンプルです。非エンジニアの方が業務で活用している事例も多数あります。研修で丁寧にサポートします。",
      },
    },
    {
      "@type": "Question",
      name: "助成金は本当に使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。人材開発支援助成金（厚生労働省）で研修費用の最大75%が助成されます。例えば、エキスパートプラン240万円が実質60万円になります。申請サポートも行いますのでご安心ください。",
      },
    },
    {
      "@type": "Question",
      name: "リモートでの支援は可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい。オンラインで全国対応しています。ワークショップ、ハンズオン、月次レビューの全てをオンラインで実施可能です。対面をご希望の場合は、東北・仙台を拠点に訪問対応も承ります。",
      },
    },
    {
      "@type": "Question",
      name: "他のAIツール（ChatGPT、Copilot等）との違いは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPTやCopilotは「補助」ツールです。Claude Codeはエージェント型 —— タスク全体を自律的に計画・実行・検証します。さらにMCP（Model Context Protocol）で社内システムやデータベースと直接連携。「チャットで聞く」から「仕事を任せる」へのパラダイムシフトです。",
      },
    },
    {
      "@type": "Question",
      name: "導入期間はどのくらいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "スタータープランは1日研修＋初期設計で、最短1週間で導入の第一歩を踏み出せます。エキスパートプランは3ヶ月の伴走支援。組織全体への展開と定着までサポートします。",
      },
    },
    {
      "@type": "Question",
      name: "セキュリティは大丈夫ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Code Team / Enterpriseプランのガバナンス機能（監査ログ、権限管理、データ保持ポリシー）を活用した導入設計を行います。AI事業者ガイドライン（経産省・IPA）に準拠した安全な運用体制を一緒に構築します。",
      },
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Claude Code × AIエージェント開発支援・内製化支援",
  description:
    "25名のAI社員を実運用する企業が提供する、Claude Code × AIエージェントの内製化支援サービス。研修・CLAUDE.md設計・MCP構築・伴走支援。",
  provider: {
    "@type": "Organization",
    name: "株式会社デジタルゴリラ",
    url: "https://digital-gorilla.co.jp",
  },
  areaServed: { "@type": "Country", name: "JP" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "サービスプラン",
    itemListElement: [
      {
        "@type": "Offer",
        name: "スタータープラン",
        description: "AI活用度診断・Claude Code基礎研修（1日）・初期設計支援",
        price: "500000",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "プロフェッショナルプラン",
        description:
          "AIエージェント内製化ワークショップ（2日間）・CLAUDE.md設計テンプレート・フォロー3ヶ月",
        price: "1450000",
        priceCurrency: "JPY",
      },
      {
        "@type": "Offer",
        name: "エキスパートプラン",
        description:
          "組織導入支援・CLAUDE.md設計・MCP構築・ワークフロー設計・伴走3ヶ月・月2回ハンズオン",
        price: "2400000",
        priceCurrency: "JPY",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://chiba-portfolio.vercel.app" },
    { "@type": "ListItem", position: 2, name: "サービス", item: "https://chiba-portfolio.vercel.app/services" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Claude Code × AIエージェント開発支援",
      item: "https://chiba-portfolio.vercel.app/services/claude-code-ai-agent",
    },
  ],
};

export default function ServiceLPPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceHeader />
      <main>
        <ServiceHero />
        <ServiceChallenges />
        <ServiceSolution />
        <ServiceResults />
        <ServicePlans />
        <ServiceFlow />
        <ServicePersonas />
        <ServiceMarket />
        <ServiceProfile />
        <ServiceFAQ />
        <ServiceFinalCTA />
      </main>
      <ServiceFooter />
      <ServiceMobileCTA />
    </>
  );
}
