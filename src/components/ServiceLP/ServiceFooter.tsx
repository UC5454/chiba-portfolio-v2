import Link from "next/link";

export default function ServiceFooter() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-white text-xl font-bold mb-3">DG</div>
            <p className="text-slate-400 text-sm">株式会社デジタルゴリラ</p>
          </div>
          <div>
            <h4 className="text-slate-300 text-sm font-bold mb-3">サービス</h4>
            <ul className="space-y-2">
              <li><a href="#solution" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">サービス概要</a></li>
              <li><a href="#plans" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">プラン</a></li>
              <li><a href="#flow" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">導入フロー</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-300 text-sm font-bold mb-3">お問い合わせ</h4>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">無料相談を予約する</a></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">お問い合わせフォーム</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-4 text-center">
          <p className="text-slate-500 text-xs">© 2026 株式会社デジタルゴリラ</p>
        </div>
      </div>
    </footer>
  );
}
