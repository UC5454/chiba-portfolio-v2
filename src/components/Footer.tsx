"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mediaCategories } from "@/data/mediaCategories";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/services/')) return null;

  return (
    <footer className="bg-black py-8 border-t-4 border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-8">
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">メニュー</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">ホーム</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">しょうかい</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors text-sm">おしらせ</Link></li>
              <li><Link href="/media" className="text-gray-400 hover:text-white transition-colors text-sm">コラム</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">おといあわせ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">チーム</h4>
            <ul className="space-y-2">
              <li><Link href="/employees" className="text-gray-400 hover:text-white transition-colors text-sm">パーティ</Link></li>
              <li><Link href="/quests" className="text-gray-400 hover:text-white transition-colors text-sm">クエスト</Link></li>
              <li><Link href="/guilds" className="text-gray-400 hover:text-white transition-colors text-sm">ギルド</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">コラム</h4>
            <ul className="space-y-2">
              {mediaCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/media/${cat.slug}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">つながり</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/UC_DG54" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  𝕏 エックス ↗
                </a>
              </li>
              <li>
                <a href="https://note.com/uc_dg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  📝 ノート ↗
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/UC54dg/?locale=ja_JP" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  📘 フェイスブック ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/UC5454" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  🐙 ギットハブ ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">おといあわせ</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">おといあわせフォーム</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center">
          <div className="text-gray-500 font-[family-name:var(--font-pixel)] text-[10px]">
            &copy; 2026 千葉勇志. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
