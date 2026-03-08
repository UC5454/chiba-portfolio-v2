import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import PageContainer from "@/components/PageContainer";
import { employees } from "@/data/employees";

interface EmployeeDetailPageProps {
  params: Promise<{ id: string }>;
}

const teamNameMap: Record<string, string> = {
  executive: "直轄",
  "note-team": "note-team",
  "web-team": "web-team",
  "ai-consulting-team": "ai-consulting",
  "creative-team": "creative-team",
  "slides-team": "slides-team",
  "marketing-team": "marketing-team",
  coach: "coach",
  secretary: "secretary",
  hr: "hr",
  accounting: "accounting",
};

export function generateStaticParams() {
  return employees.map((employee) => ({ id: employee.id }));
}

export async function generateMetadata({ params }: EmployeeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const member = employees.find((employee) => employee.id === id);

  if (!member) {
    return {
      title: "AI社員が見つかりません | 千葉勇志 / Yushi Chiba",
      description: "指定されたAI社員情報は存在しません。",
    };
  }

  return {
    title: `${member.name} | AI社員 | 千葉勇志 / Yushi Chiba`,
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
            <p className="text-sm text-gray-300 mb-4">TEAM: {teamNameMap[member.team]}</p>

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
      </div>
    </PageContainer>
  );
}
