import Image from "next/image";

const teams = [
  { avatar: "/avatars/rin.png", role: "COO", name: "リン", color: "text-purple-300" },
  { avatar: "/avatars/kaito.png", role: "Engineer", name: "カイト", color: "text-blue-300" },
  { avatar: "/avatars/nagi.png", role: "Designer", name: "ナギ", color: "text-pink-300" },
  { avatar: "/avatars/tsumogi.png", role: "Writer", name: "ツムギ", color: "text-yellow-300" },
  { avatar: "/avatars/kotoha.png", role: "Researcher", name: "コトハ", color: "text-green-300" },
  { avatar: "/avatars/ren.png", role: "QA", name: "レン", color: "text-teal-300" },
  { avatar: "/avatars/sora.png", role: "Visual", name: "ソラ", color: "text-orange-300" },
  { avatar: "/avatars/seira.png", role: "SEO", name: "セイラ", color: "text-cyan-300" },
  { avatar: "/avatars/sou.png", role: "Director", name: "ソウ", color: "text-red-300" },
  { avatar: "/avatars/takumi.png", role: "Consultant", name: "タクミ", color: "text-amber-300" },
  { avatar: "/avatars/tsukasa.png", role: "Prompt Eng", name: "ツカサ", color: "text-violet-300" },
  { avatar: "/avatars/minami.png", role: "Secretary", name: "ミナミ", color: "text-rose-300" },
];

const reserveMembers = [
  { avatar: "/avatars/makoto.png", name: "マコト" },
  { avatar: "/avatars/ritsu.png", name: "リツ" },
  { avatar: "/avatars/minato.png", name: "ミナト" },
  { avatar: "/avatars/yuu.png", name: "ユウ" },
  { avatar: "/avatars/masaki.png", name: "マサキ" },
  { avatar: "/avatars/hayate.png", name: "ハヤテ" },
  { avatar: "/avatars/chihiro.png", name: "チヒロ" },
  { avatar: "/avatars/itsuki.png", name: "イツキ" },
  { avatar: "/avatars/shou.png", name: "ショウ" },
  { avatar: "/avatars/hina.png", name: "ヒナ" },
  { avatar: "/avatars/aya.png", name: "アヤ" },
  { avatar: "/avatars/hikaru.png", name: "ヒカル" },
  { avatar: "/avatars/kanade.png", name: "カナデ" },
  { avatar: "/avatars/kanon.png", name: "カノン" },
];

export default function AIEmployees() {
  return (
    <section
      id="party"
      className="py-20 bg-[#050714] border-t-4 border-b-4 border-double border-gold-dim"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-base sm:text-2xl mb-12 flex items-center justify-center gap-4">
          <span className="text-2xl">&#x1F3F0;</span> 謁見の間 (AI Employees)
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Leader Dialogue */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-white p-1 rounded-sm mb-4 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center shadow-pixel overflow-hidden">
              <Image
                src="/avatars/rin.png"
                alt="リン (COO)"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full bg-blue-900/90 border-2 border-white p-4 rounded-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white" />
              <h4 className="text-gold-retro font-bold text-sm mb-1">
                リン (COO)
              </h4>
              <p className="text-sm leading-relaxed">
                「よく来たわね。我がパーティの精鋭たちを紹介するわ。彼らは眠らず、疲れず、常に進化し続ける最強の仲間よ。」
              </p>
            </div>
          </div>

          {/* Members Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              {teams.map((member, i) => (
                <div
                  key={i}
                  className="bg-navy-light border border-white/30 p-2 md:p-3 text-center hover:bg-navy-deep hover:border-gold-retro cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 mx-auto bg-gray-700 mb-2 rounded-full overflow-hidden">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className={`text-[10px] md:text-xs font-bold ${member.color}`}>
                    {member.role}
                  </p>
                  <p className="text-[10px] md:text-xs">{member.name}</p>
                </div>
              ))}
            </div>

            <div className="bg-black/50 p-4 border border-dashed border-gray-600 rounded">
              <p className="text-xs text-gray-400 mb-2">
                RESERVE MEMBERS (+{reserveMembers.length} Others)
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                {reserveMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-700 shrink-0">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-gray-500">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
