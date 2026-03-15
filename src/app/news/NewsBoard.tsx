"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { colorMap } from "@/data/news";
import type { NewsItem } from "@/lib/news";

const filters = [
  { key: "ALL", label: "すべて" },
  { key: "じゅうよう", label: "じゅうよう" },
  { key: "あっぷでーと", label: "あっぷでーと" },
  { key: "こみゅにてぃ", label: "こみゅにてぃ" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

interface NewsBoardProps {
  items: NewsItem[];
}

export default function NewsBoard({ items }: NewsBoardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");

  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") {
      return items;
    }

    return items.filter((item) => item.type === activeFilter);
  }, [activeFilter, items]);

  return (
    <div className="bg-wood-dark p-2 rounded-sm shadow-pixel">
      <div className="bg-wood-light border-4 border-[#5c3a21] p-6 md:p-8 relative">
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                className={`border-2 px-4 py-2 text-xs font-[family-name:var(--font-pixel)] transition-all cursor-pointer ${
                  isActive
                    ? "bg-gold-retro text-navy-deep border-[#8b6914] shadow-[2px_2px_0_rgba(0,0,0,0.3)] font-bold"
                    : "bg-navy-light text-white/80 border-white/30 hover:border-gold-retro/60 hover:text-gold-retro"
                }`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {isActive ? "▶ " : ""}{filter.label}
              </button>
            );
          })}
        </div>

        <ul className="space-y-4">
          {filteredItems.map((item) => {
            const colors = colorMap[item.color];
            return (
              <li key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className={`bg-[#fdf5e6] p-4 text-gray-900 border-l-4 ${colors.border} shadow-sm flex flex-col md:flex-row gap-2 md:items-center transform hover:-translate-y-1 transition-transform block`}
                >
                  <span
                    className={`font-bold font-[family-name:var(--font-pixel)] text-[10px] ${colors.badge} px-2 py-1 rounded`}
                  >
                    {item.type}
                  </span>
                  <span className="text-sm font-bold text-gray-500">{item.date}</span>
                  <span className="font-extrabold text-base">{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
