import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import StatsRadar from "@/components/StatsRadar";
import { employees } from "@/data/employees";

interface EmployeeDetailPageProps {
  params: Promise<{ id: string }>;
}

const teamNameMap: Record<string, string> = {
  executive: "ちょっかつ",
  "note-team": "ノート",
  "web-team": "ウェブ",
  "ai-consulting-team": "AIコンサル",
  "creative-team": "クリエイティブ",
  "slides-team": "スライド",
  "marketing-team": "マーケ",
  coach: "コーチ",
  secretary: "ひしょ",
  hr: "じんじ",
  accounting: "けいり",
};

export function generateStaticParams() {
  return employees.map((employee) => ({ id: employee.id }));
}

export async function generateMetadata({ params }: EmployeeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const member = employees.find((employee) => employee.id === id);

  if (!member) {
    return {
      title: "AI社員が見つかりません | 千葉勇志",
      description: "指定されたAI社員情報は存在しません。",
    };
  }

  return {
    title: `${member.name}（${member.role}） | AI社員 | 千葉勇志`,
    description: `${member.role}として活躍する${member.name}の詳細プロフィール。`,
  };
}

export default async function EmployeeDetailPage({ params }: EmployeeDetailPageProps) {
  const { id } = await params;
  const member = employees.find((employee) => employee.id === id);

  if (!member) {
    notFound();
  }

  return (
    <PageContainer
      title="AI社員詳細"
      breadcrumb={[{ label: "AI社員一覧", href: "/employees" }, { label: member.name }]}
    >
      <div className="max-w-4xl mx-auto mb-4">
        <Link href="/employees" className="inline-flex items-center gap-2 bg-navy-light border-2 border-gold-retro/50 hover:border-gold-retro text-gold-retro hover:text-white font-[family-name:var(--font-pixel)] text-xs px-4 py-2.5 transition-all hover:-translate-x-1">
          ◀ パーティ一覧にもどる
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-navy-light border-2 border-white/20 shadow-pixel p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
          <div className="w-[200px] h-[200px] mx-auto bg-navy-deep border-2 border-gold-retro/60 overflow-hidden">
            <Image
              src={member.avatar}
              alt={member.name}
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-gold-retro mb-2">
              {member.name}
            </h2>
            <p className={`text-base font-bold mb-1 ${member.color}`}>{member.role}</p>
            <p className="text-sm text-gray-300 mb-4">チーム: {teamNameMap[member.team]}</p>

            <div className="bg-navy-deep/70 border border-white/20 p-4 mb-4">
              <p className="text-sm leading-relaxed">{member.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-navy-light border border-gold-retro/50 px-2 py-1 text-xs text-gold-retro"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Radar Chart */}
        <div className="mt-8 bg-navy-deep/50 border border-gold-retro/30 p-4">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">
            ステータス
          </h3>
          <div className="max-w-[320px] mx-auto">
            <StatsRadar stats={member.stats} />
          </div>
        </div>

        {/* Personality */}
        <div className="mt-4 bg-navy-deep/50 border border-gold-retro/30 p-4">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-3">
            せいかく
          </h3>
          <p className="text-sm leading-relaxed text-gray-200">{member.personality}</p>
        </div>

        {/* とくぎ */}
        <div className="mt-4 bg-navy-deep/50 border border-green-500/30 p-4">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-green-400 mb-3">とくぎ</h3>
          <ul className="space-y-1">
            {member.tokui.map((skill) => (
              <li key={skill} className="text-sm text-green-300">▶ {skill}</li>
            ))}
          </ul>
        </div>

        {/* じゃくてん */}
        <div className="mt-4 bg-navy-deep/50 border border-red-500/30 p-4">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-red-400 mb-3">じゃくてん</h3>
          <ul className="space-y-1">
            {member.jakuten.map((weak) => (
              <li key={weak} className="text-sm text-red-300">▶ {weak}</li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
