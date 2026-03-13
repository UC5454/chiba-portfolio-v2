const faqs = [
  {
    q: "エンジニアがいなくても導入できますか？",
    a: "はい、可能です。スタータープランやプロフェッショナルプランはエンジニア不要で、現場の担当者様が直感的に操作できるレベルからスタートします。",
  },
  {
    q: "助成金は本当に使えますか？",
    a: "はい。人材開発支援助成金などの対象となり、条件を満たせば最大75%が助成されます（例：240万円が実質60万円に）。提携社労士が申請サポートを行います。",
  },
  {
    q: "リモートでの支援は可能ですか？",
    a: "はい、全国どこからでもオンラインでご対応可能です。ワークショップやハンズオン研修も、ZoomやTeams等を用いて効果的に実施しております。",
  },
  {
    q: "他のAIツール（ChatGPT等）との違いは？",
    a: "ChatGPTは「対話型」ですが、Claude Codeを用いたAIエージェントは「自律実行型」です。指示を与えれば、必要な情報を収集し、コードを書き、テストまで一連のタスクを自律的にこなす点が最大の強みです。",
  },
  {
    q: "導入期間はどのくらいですか？",
    a: "プランや組織規模によりますが、最短1週間から、伴走を含む場合は3ヶ月程度となります。",
  },
  {
    q: "セキュリティは大丈夫ですか？",
    a: "はい。Claude Code Team/Enterpriseのガバナンス機能を活用し、データが学習に利用されないセキュアな環境での構築を支援します。",
  },
];

export default function ServiceFAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">よくあるご質問</h2>
        </div>

        <div className="space-y-4 service-faq">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900">
                {faq.q}
                <span className="relative shrink-0 ml-4 w-5 h-5 text-primary">
                  <svg className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <svg className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
