"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { colorMap, newsItems } from "@/data/news";

const filters = ["ALL", "IMPORTANT", "UPDATE", "COMMUNITY"] as const;

type Filter = (typeof filters)[number];

export default function NewsBoard() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

  const filteredItems = useMemo(() => {
    if (activeFilter === "ALL") {
      return newsItems;
    }

    return newsItems.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-wood-dark p-2 rounded-sm shadow-pixel">
      <div className="bg-wood-light border-4 border-[#5c3a21] p-6 md:p-8 relative">
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />

        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                className={`bg-navy-light border border-white/30 px-3 py-1 text-xs font-[family-name:var(--font-pixel)] transition-colors ${
                  isActive ? "bg-gold-retro text-navy-deep" : "text-white"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
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
                  <span className="font-bold">{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
