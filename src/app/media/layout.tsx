import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | 千葉勇志メディア",
    default: "千葉勇志メディア — AI社員・AI導入の実践知",
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', system-ui, sans-serif" }}
    >
      {/* Media Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/media" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
            千葉勇志メディア
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/media" className="text-gray-600 hover:text-gray-900 transition-colors">記事一覧</Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">ポートフォリオ</Link>
            <a
              href="mailto:y.chiba@digital-gorilla.co.jp?subject=お問い合わせ"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Media Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">カテゴリ</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/media/ai-employees" className="hover:text-gray-900">AI社員・実運用</Link></li>
                <li><Link href="/media/ai-business" className="hover:text-gray-900">AI導入・ビジネス</Link></li>
                <li><Link href="/media/education" className="hover:text-gray-900">AI研修・教育</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">&nbsp;</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/media/government" className="hover:text-gray-900">行政・自治体連携</Link></li>
                <li><Link href="/media/column" className="hover:text-gray-900">コラム</Link></li>
                <li><Link href="/media/events" className="hover:text-gray-900">イベント</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">千葉勇志</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-900">ポートフォリオ</Link></li>
                <li><Link href="/#services" className="hover:text-gray-900">サービス</Link></li>
                <li><Link href="/#speaking" className="hover:text-gray-900">登壇実績</Link></li>
                <li>
                  <a
                    href="mailto:y.chiba@digital-gorilla.co.jp?subject=お問い合わせ"
                    className="hover:text-gray-900"
                  >
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">リンク</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="https://x.com/chibayuushi" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                    X（@chibayuushi）
                  </a>
                </li>
                <li>
                  <a href="https://note.com/chibayuushi" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                    Note
                  </a>
                </li>
                <li className="text-xs text-gray-400 pt-2">
                  株式会社SOU<br />
                  新たなものを創り出して、世の中を豊かにする。
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
            &copy; 2026 千葉勇志 / 株式会社SOU. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
