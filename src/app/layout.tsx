import type { Metadata } from "next";
import { DotGothic16, Press_Start_2P } from "next/font/google";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={`${dotgothic.variable} ${pressStart2P.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
