const StarIcon = () => (
  <svg className="w-4 h-4 mr-2 text-gold-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
);

const badges = [
  "AI BB東京2025冬 公認スピーカー",
  "東北AIコミュニティ主宰（300名超）",
  "東北AI維新Conference 2026主催",
];

export default function ServiceProfile() {
  return (
    <section id="profile" className="py-24 bg-slate-bg border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl bg-slate-200 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              千葉 勇志 <span className="text-base font-normal text-slate-500 ml-2">Chiba Yushi</span>
            </h2>
            <p className="text-sm font-medium text-primary mb-6">株式会社SOU代表 / 株式会社デジタルゴリラ取締役COO</p>

            <div className="mb-6 space-y-2 text-sm text-slate-600">
              {badges.map((badge) => (
                <p key={badge} className="flex items-center"><StarIcon /> {badge}</p>
              ))}
            </div>

            <blockquote className="pl-4 border-l-4 border-primary/30 text-slate-700 italic text-base leading-relaxed">
              「AIを魔法じゃなく道具として使い倒す。25名のAI社員チームを自分で設計し、経営に組み込んでいる日本で唯一の経営者が、あなたの会社でもそれを実現します。」
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
