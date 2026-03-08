"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  { href: "#contact", label: "はなす" },
];

const subpageNavItems: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/news", label: "おしらせ" },
  { href: "/employees", label: "パーティ" },
  { href: "/quests", label: "クエスト" },
  { href: "/guilds", label: "ギルド" },
  { href: "/contact", label: "はなす" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
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
      return href.startsWith("#") && currentHash === href;
    }
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-navy-deep/90 backdrop-blur-sm border-b-2 border-white/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gold-retro animate-pulse" />
          <h1 className="text-lg md:text-xl font-bold tracking-widest text-gold-retro">Yushi Chiba</h1>
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

        <button
          className="md:hidden text-gold-retro"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニュー"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-navy-deep border-t border-white/10 px-4 py-4 flex flex-col gap-3 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-gold-retro transition-colors py-1 ${isActiveNavItem(item.href) ? "text-gold-retro" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              [ {item.label} ]
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
