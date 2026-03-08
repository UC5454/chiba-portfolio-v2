"use client";

import { useState } from "react";

const navItems = [
  { href: "#news", label: "おしらせ" },
  { href: "#status", label: "ステータス" },
  { href: "#party", label: "パーティ" },
  { href: "#strengths", label: "つよさ" },
  { href: "#quests", label: "クエスト" },
  { href: "#contact", label: "はなす" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-navy-deep/90 backdrop-blur-sm border-b-2 border-white/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gold-retro animate-pulse" />
          <h1 className="text-lg md:text-xl font-bold tracking-widest text-gold-retro">
            Yushi Chiba
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-gold-retro transition-colors"
            >
              [ {item.label} ]
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-navy-deep border-t border-white/10 px-4 py-4 flex flex-col gap-3 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-gold-retro transition-colors py-1"
              onClick={() => setIsOpen(false)}
            >
              [ {item.label} ]
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
