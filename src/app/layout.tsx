import type { Metadata, Viewport } from "next";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const dotgothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dotgothic",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "千葉勇志 / Yushi Chiba - AI Portfolio",
  description:
    "あなたの会社にも、AI社員を。AIで可能性を無限大にする千葉勇志のポートフォリオ。",
  openGraph: {
    title: "千葉勇志 / Yushi Chiba - AI Portfolio",
    description:
      "あなたの会社にも、AI社員を。AIで可能性を無限大にする千葉勇志のポートフォリオ。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "千葉勇志 / Yushi Chiba - AI Portfolio",
    description:
      "あなたの会社にも、AI社員を。AIで可能性を無限大にする千葉勇志のポートフォリオ。",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0e2a",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "千葉勇志 / Yushi Chiba - AI Portfolio",
  url: "https://chiba-portfolio.vercel.app",
  description:
    "あなたの会社にも、AI社員を。AIで可能性を無限大にする千葉勇志のポートフォリオ。",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://chiba-portfolio.vercel.app/#person",
  name: "千葉勇志",
  alternateName: "Yushi Chiba",
  url: "https://chiba-portfolio.vercel.app",
  jobTitle: "代表取締役 / 取締役COO兼CAIO",
  worksFor: [
    { "@type": "Organization", name: "株式会社SOU" },
    { "@type": "Organization", name: "株式会社デジタルゴリラ" },
  ],
  sameAs: [
    "https://x.com/chibayuushi",
    "https://note.com/chibayuushi",
  ],
  knowsAbout: ["AI導入", "AIエージェント", "AI社員", "DX推進", "AI研修"],
  description: "25名のAI社員チームを構築・運用する体験主義のAIストラテジスト。東北AIコミュニティ主宰。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${dotgothic.variable} ${pressStart2P.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
