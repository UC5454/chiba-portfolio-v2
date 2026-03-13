const XIcon = () => (
  <svg className="w-5 h-5 text-red-400 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);

const personas = [
  {
    id: "cto",
    tab: "CTO / VPoE",
    title: "開発チームの生産性を劇的に上げたい CTO / VPoE の方へ",
    challenges: [
      "GitHub Copilotだけではタスク全体の自動化ができない",
      "エンジニアの採用難で、既存リソースでのアウトプット最大化が急務",
    ],
    plan: "エキスパートプラン",
    planDesc: "MCPを活用し、社内APIやデータベースと連携した自律型エージェントの開発環境を構築します。",
  },
  {
    id: "dx",
    tab: "DX推進部長",
    title: "全社へのAI展開を任された DX推進部長 の方へ",
    challenges: [
      "ChatGPTを導入したが、一部の社員しか使っていない",
      "業務フローにAIを組み込む具体的な方法がわからない",
    ],
    plan: "プロフェッショナルプラン",
    planDesc: "ワークショップを通じて、現場主導でAIエージェントを設計・運用できるコア人材を育成します。",
  },
  {
    id: "sme",
    tab: "中小企業社長",
    title: "人手不足に悩む 中小企業社長 の方へ",
    challenges: [
      "事務作業に追われ、本来の営業や企画に時間が割けない",
      "ITに強い社員がおらず、何から始めればいいかわからない",
    ],
    plan: "スタータープラン",
    planDesc: "助成金を活用して低コストで導入。まずは「AIが業務を代行する」体験からスモールスタートします。",
  },
  {
    id: "edu",
    tab: "教育機関",
    title: "次世代の人材育成を担う 教育機関 の方へ",
    challenges: [
      "学生に最新のAI活用スキルを教えたいが、カリキュラムがない",
      "教職員の事務負担（採点、資料作成等）を軽減したい",
    ],
    plan: "特別カスタマイズプラン",
    planDesc: "シラバス作成支援から、教職員向けのハンズオン研修まで、教育現場のニーズに合わせて柔軟に対応します。",
  },
];

export default function ServicePersonas() {
  return (
    <section id="persona" className="py-24 bg-slate-bg border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">こんな方におすすめ</h2>
        </div>

        <div className="relative">
          {/* Radio Inputs */}
          <input type="radio" name="persona" id="tab-cto" className="hidden" defaultChecked />
          <input type="radio" name="persona" id="tab-dx" className="hidden" />
          <input type="radio" name="persona" id="tab-sme" className="hidden" />
          <input type="radio" name="persona" id="tab-edu" className="hidden" />

          {/* Tab Labels */}
          <div className="flex flex-wrap border-b border-slate-200 tab-labels mb-8 justify-center gap-2 md:gap-8">
            {personas.map((p) => (
              <label key={p.id} htmlFor={`tab-${p.id}`} className="cursor-pointer px-4 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 transition-colors text-sm md:text-base">
                {p.tab}
              </label>
            ))}
          </div>

          {/* Tab Contents */}
          {personas.map((p) => (
            <div key={p.id} id={`content-${p.id}`} className="hidden">
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.title}</h3>
                  <ul className="space-y-3 mb-6 text-slate-600">
                    {p.challenges.map((c, j) => (
                      <li key={j} className="flex items-start"><XIcon />{c}</li>
                    ))}
                  </ul>
                  <p className="text-slate-700 font-medium bg-blue-50 p-4 rounded-lg">
                    おすすめ：<span className="text-primary font-bold">{p.plan}</span><br />{p.planDesc}
                  </p>
                </div>
                <div className="md:w-1/3 w-full">
                  <a href="#contact" className="block w-full py-4 px-4 bg-primary hover:bg-primary-hover text-white font-bold text-center rounded-xl transition-colors shadow-md">相談する</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
