import Link from "next/link";
import { mediaCategories } from "@/data/mediaCategories";

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t-4 border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">MENU</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">HOME</Link></li>
              <li><Link href="/quests" className="text-gray-400 hover:text-white transition-colors text-sm">QUESTS</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors text-sm">NEWS</Link></li>
              <li><Link href="/media" className="text-gray-400 hover:text-white transition-colors text-sm">LIBRARY</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">LIBRARY</h4>
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
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">TEAM</h4>
            <ul className="space-y-2">
              <li><Link href="/employees" className="text-gray-400 hover:text-white transition-colors text-sm">AI EMPLOYEES</Link></li>
              <li><Link href="/guilds" className="text-gray-400 hover:text-white transition-colors text-sm">GUILDS</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">CONTACT</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">CONTACT</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro mb-3">SOCIAL</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  X (Twitter) ↗
                </a>
              </li>
              <li>
                <a href="https://note.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Note ↗
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/UC5454" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center">
          <div className="text-gray-500 font-[family-name:var(--font-pixel)] text-[10px]">
            &copy; 2026 Yushi Chiba. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
