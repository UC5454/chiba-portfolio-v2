"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type NavItem = {
  href: string;
  label: string;
};

const homeNavItems: NavItem[] = [
  { href: "#news", label: "おしらせ" },
  { href: "#status", label: "ステータス" },
  { href: "#party", label: "パーティ" },
  { href: "#strengths", label: "つよさ" },
  { href: "#quests", label: "クエスト" },
  { href: "/media", label: "コラム" },
  { href: "/about", label: "しょうかい" },
  { href: "/contact", label: "はなす" },
];

const subpageNavItems: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/news", label: "おしらせ" },
  { href: "/employees", label: "パーティ" },
  { href: "/quests", label: "クエスト" },
  { href: "/guilds", label: "ギルド" },
  { href: "/media", label: "コラム" },
  { href: "/about", label: "しょうかい" },
  { href: "/contact", label: "はなす" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [menuAnimating, setMenuAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navItems = isHome ? homeNavItems : subpageNavItems;

  useEffect(() => {
    if (!isHome) return;

    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [isHome]);

  const isActiveNavItem = (href: string) => {
    if (isHome) {
      if (href.startsWith("#")) return currentHash === href;
      return pathname === href;
    }
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      setMenuAnimating(true);
    } else {
      setMenuAnimating(false);
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-navy-deep/90 backdrop-blur-sm border-b-2 border-white/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-A-retro-game.png"
            alt="千葉勇志"
            width={144}
            height={36}
            className="h-7 md:h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-gold-retro transition-colors ${isActiveNavItem(item.href) ? "text-gold-retro" : ""}`}
            >
              [ {item.label} ]
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger - RPG style */}
        <button
          className="md:hidden text-gold-retro relative flex items-center justify-center border-2 border-gold-retro/60 hover:border-gold-retro transition-all pixel-border px-3 py-2"
          onClick={toggleMenu}
          aria-label="メニュー"
        >
          <span className="font-[family-name:var(--font-pixel)] text-[10px] leading-none">
            {isOpen ? "✕ とじる" : "▶ メニュー"}
          </span>
        </button>
      </div>

      {/* Mobile menu - RPG slide-down */}
      {isOpen && (
        <nav
          ref={menuRef}
          className={`md:hidden bg-black/95 border-t-2 border-gold-retro/30 px-4 py-2 flex flex-col shadow-pixel transition-all duration-300 origin-top ${
            menuAnimating ? "animate-rpg-menu-open" : "animate-rpg-menu-close"
          }`}
        >
          <div className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro/60 mb-2 tracking-widest">
            ── コマンド ──
          </div>
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-gold-retro hover:bg-white/5 transition-all py-2.5 px-3 border-l-2 border-transparent hover:border-gold-retro font-[family-name:var(--font-pixel)] text-xs ${
                isActiveNavItem(item.href) ? "text-gold-retro border-gold-retro" : "text-white/80"
              }`}
              onClick={() => {
                setMenuAnimating(false);
                setTimeout(() => setIsOpen(false), 150);
              }}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <span className="text-gold-retro/70 mr-2">▶</span>
              {item.label}
            </Link>
          ))}
          <div className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro/30 mt-2 mb-1 tracking-widest text-right">
            ──────────
          </div>
        </nav>
      )}

      <style jsx>{`
        @keyframes rpg-menu-open {
          0% {
            opacity: 0;
            transform: scaleY(0);
            max-height: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
            transform: scaleY(1);
            max-height: 600px;
          }
        }
        @keyframes rpg-menu-close {
          0% {
            opacity: 1;
            transform: scaleY(1);
            max-height: 600px;
          }
          100% {
            opacity: 0;
            transform: scaleY(0);
            max-height: 0;
          }
        }
        .animate-rpg-menu-open {
          animation: rpg-menu-open 0.3s ease-out forwards;
        }
        .animate-rpg-menu-close {
          animation: rpg-menu-close 0.3s ease-in forwards;
        }
      `}</style>
    </header>
  );
}
