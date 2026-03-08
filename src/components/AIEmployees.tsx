import Image from "next/image";
import Link from "next/link";

import { employees } from "@/data/employees";

export default function AIEmployees() {
  const activeMembers = employees.filter((employee) => employee.isActive);
  const reserveMembers = employees.filter((employee) => !employee.isActive);

  return (
    <section
      id="party"
      className="py-20 border-t-4 border-b-4 border-double border-gold-dim relative"
      style={{ backgroundImage: "url('/images/bg-employees.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-[#050714]/80" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-2xl mb-12 flex items-center justify-center gap-4">
          <span className="text-2xl">&#x1F3F0;</span> 謁見の間 (AI Employees)
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-white p-1 rounded-sm mb-4 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center shadow-pixel overflow-hidden">
              <Image
                src="/avatars/rin.png"
                alt="AI社員リン（COO）のアバター"
                width={192}
                height={192}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full bg-blue-900/90 border-2 border-white p-4 rounded-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white" />
              <h4 className="text-gold-retro font-bold text-sm mb-1">リン (COO)</h4>
              <p className="text-sm leading-relaxed">
                「よく来たわね。我がパーティの精鋭たちを紹介するわ。彼らは眠らず、疲れず、常に進化し続ける最強の仲間よ。」
              </p>
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              {activeMembers.map((member) => (
                <Link
                  key={member.id}
                  href={`/employees/${member.id}`}
                  className="bg-navy-light border border-white/30 p-2 md:p-3 text-center hover:bg-navy-deep hover:border-gold-retro cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 mx-auto bg-gray-700 mb-2 rounded-full overflow-hidden">
                    <Image
                      src={member.avatar}
                      alt={`${member.name}（${member.role}）のアバター`}
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className={`text-[10px] md:text-xs font-bold ${member.color}`}>{member.role}</p>
                  <p className="text-[10px] md:text-xs">{member.name}</p>
                </Link>
              ))}
            </div>

            <div className="bg-black/50 p-4 border border-dashed border-gray-600 rounded">
              <p className="text-xs text-gray-400 mb-2">
                RESERVE MEMBERS (+{reserveMembers.length} Others)
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                {reserveMembers.map((member) => (
                  <Link key={member.id} href={`/employees/${member.id}`} className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-700 shrink-0">
                      <Image
                        src={member.avatar}
                        alt={`${member.name}（${member.role}）のアバター`}
                        width={20}
                        height={20}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-500">{member.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/employees"
                className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
              >
                全員を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
