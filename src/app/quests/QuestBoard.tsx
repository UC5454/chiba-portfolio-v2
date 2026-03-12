"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { quests } from "@/data/quests";

const filters = ["すべて", "たっせい", "しんこうちゅう"] as const;

type Filter = (typeof filters)[number];

export default function QuestBoard() {
  const [activeFilter, setActiveFilter] = useState<Filter>("すべて");

  const filteredQuests = useMemo(() => {
    if (activeFilter === "すべて") {
      return quests;
    }

    return quests.filter((quest) => quest.status === activeFilter);
  }, [activeFilter]);

  return (
    <div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map((quest) => (
          <Link
            key={quest.id}
            href={`/quests/${quest.id}`}
            className="bg-navy-deep border-2 border-white p-1 relative group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="absolute -top-4 -left-4 text-3xl drop-shadow-md z-20">&#x1F4CD;</div>
            <div className="bg-gray-800 h-40 w-full mb-4 flex items-center justify-center border border-white/20">
              <span className="text-gray-500 font-[family-name:var(--font-pixel)] text-xs">MAP PIN</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-bold border px-1 ${quest.statusColor}`}>{quest.status}</span>
                <span className="text-gray-400 text-xs">{quest.year}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{quest.title}</h3>
              <p className="text-sm text-gray-300">{quest.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
