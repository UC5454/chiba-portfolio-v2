import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageContainer from "@/components/PageContainer";

export function generateMetadata(): Metadata {
  return {
    title: "しょうかい | 千葉勇志",
    description: "千葉勇志のプロフィール・実績・ミッション。",
  };
}

const achievements = [
  { value: "300〜400%", label: "成長率", border: "border-gold-retro/30", valueClass: "text-gold-retro" },
  { value: "300名超", label: "コミュニティ", border: "border-green-500/30", valueClass: "text-green-400" },
  { value: "50回以上", label: "登壇回数", border: "border-blue-500/30", valueClass: "text-blue-400" },
  { value: "1,714時間", label: "月間業務削減", border: "border-red-500/30", valueClass: "text-red-400" },
];

const values = [
  {
    title: "体験主義",
    description: "自ら体験し検証した一次情報を信じる。百聞は一見に如かず。",
  },
  {
    title: "泥臭く、本気で",
    description: "戦略だけでなく現場に入り込み、手を動かし、汗をかく。",
  },
  {
    title: "加速装置としてのAI",
    description: "AIは魔法ではなく道具。人間の創造性を拡張する加速装置。",
  },
];

const roles = [
  { icon: "⚔", label: "やくしょく", value: "取締役COO", sub: "株式会社デジタルゴリラ" },
  { icon: "👥", label: "なかま", value: "25名", sub: "AI社員チーム" },
  { icon: "🏰", label: "ギルド", value: "350名超", sub: "東北AIコミュニティ" },
  { icon: "🏆", label: "めいせい", value: "50回以上", sub: "登壇・セミナー実績" },
];

const skills = [
  {
    label: "しごと",
    items: [
      { name: "経営戦略・事業推進", icon: "⚔" },
      { name: "AI導入・運用設計", icon: "🤖" },
      { name: "組織マネジメント", icon: "🏛" },
    ],
  },
  {
    label: "じっせき",
    items: [
      { name: "成長率 300〜400%", icon: "📈" },
      { name: "月間 1,714時間削減", icon: "⏱" },
      { name: "登壇 50回・動員 2,000名", icon: "🎤" },
    ],
  },
  {
    label: "なかま",
    items: [
      { name: "AI社員 25名体制", icon: "👥" },
      { name: "東北AIコミュニティ 350名超", icon: "🏰" },
      { name: "公認スピーカー認定", icon: "🏆" },
    ],
  },
];

export default function AboutPage() {
  return (
    <PageContainer title="冒険者の書" breadcrumb={[{ label: "しょうかい" }]}>
      <div className="max-w-4xl mx-auto">
        <section className="bg-navy-light border-2 border-gold-retro/30 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-40 h-40 md:w-48 md:h-48 border-4 border-gold-retro overflow-hidden shrink-0">
              <Image src="/images/hero-chiba-new.png" alt="千葉勇志" width={192} height={192} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gold-retro mb-2">千葉 勇志</h2>
              <ul className="space-y-1 mt-3 text-sm">
                <li className="text-gray-200">株式会社SOU 代表</li>
                <li className="text-gray-200">株式会社デジタルゴリラ 取締役 最高執行責任者</li>
                <li className="text-gray-200">東北AIコミュニティ 主宰</li>
                <li className="text-gray-200">拠点: 東北・仙台</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-navy-light border-2 border-white/20 p-6 mb-6 text-center">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4">ミッション</h3>
          <p className="text-lg font-bold leading-relaxed">
            テクノロジーと人間の創造性を掛け合わせ、
            <br className="hidden sm:inline" />
            これまでにない価値を生み出す
          </p>
        </section>

        <section className="mb-6">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">じっせき</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((item) => (
              <div key={item.label} className={`bg-navy-light border-2 ${item.border} p-4 text-center`}>
                <p className={`text-2xl font-black ${item.valueClass}`}>{item.value}</p>
                <p className="text-xs text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">やくわり</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div key={role.label} className="bg-navy-light border-2 border-gold-retro/30 p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-retro/20 border-2 border-gold-retro/60 flex items-center justify-center text-xl flex-shrink-0">
                  {role.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-1">{role.label}</p>
                  <p className="text-white font-black text-xl mb-0.5">{role.value}</p>
                  <p className="text-gray-300 text-xs">{role.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-navy-light border-2 border-white/20 p-6 mb-6">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">かちかん</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((item) => (
              <div key={item.title} className="border border-white/10 p-4">
                <h4 className="font-bold text-gold-retro mb-2">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">とくぎ一覧</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {skills.map((group) => (
              <div key={group.label} className="bg-navy-light border-2 border-gold-retro/20 p-4">
                <h4 className="font-[family-name:var(--font-pixel)] text-gold-retro text-[10px] mb-3 text-center border-b border-gold-retro/20 pb-2">
                  {group.label}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-gray-200">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-8">
          <p className="text-lg mb-4">一緒に冒険する？</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-retro text-black font-[family-name:var(--font-pixel)] text-xs px-8 py-4 border-b-4 border-r-4 border-black hover:translate-y-1 hover:border-b-0 hover:border-r-0 transition-all shadow-pixel-gold"
          >
            ▶ はなす
          </Link>
        </section>
      </div>
    </PageContainer>
  );
}
