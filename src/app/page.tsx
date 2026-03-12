import type { Metadata } from "next";

import Hero from "@/components/Hero";
import News from "@/components/News";
import Status from "@/components/Status";
import AIEmployees from "@/components/AIEmployees";
import Strengths from "@/components/Strengths";
import Quests from "@/components/Quests";
import Guilds from "@/components/Guilds";
import Media from "@/components/Media";
import CTA from "@/components/CTA";

export function generateMetadata(): Metadata {
  return {
    title: "ホーム | 千葉勇志 / Yushi Chiba",
    description:
      "あなたの会社にも、AI社員を。AIで可能性を無限大にする千葉勇志のポートフォリオ。",
  };
}

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <News />
      <Status />
      <AIEmployees />
      <Strengths />
      <Quests />
      <Guilds />
      <Media />
      <CTA />
    </main>
  );
}
