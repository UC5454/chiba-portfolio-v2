"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { employees } from "@/data/employees";

const teamFilters = [
  { key: "all", label: "全員" },
  { key: "executive", label: "直轄" },
  { key: "note-team", label: "note-team" },
  { key: "web-team", label: "web-team" },
  { key: "ai-consulting-team", label: "ai-consulting" },
  { key: "slides-team", label: "slides-team" },
  { key: "marketing-team", label: "marketing-team" },
  { key: "creative-team", label: "creative-team" },
] as const;

type TeamFilterKey = (typeof teamFilters)[number]["key"];

const teamNameMap: Record<string, string> = {
  executive: "直轄",
  "note-team": "note-team",
  "web-team": "web-team",
  "ai-consulting-team": "ai-consulting",
  "creative-team": "creative-team",
  "slides-team": "slides-team",
  "marketing-team": "marketing-team",
  coach: "coach",
  secretary: "secretary",
  hr: "hr",
  accounting: "accounting",
};

export default function EmployeesHall() {
  const [activeFilter, setActiveFilter] = useState<TeamFilterKey>("all");

  const filteredEmployees = useMemo(() => {
    if (activeFilter === "all") {
      return employees;
    }

    return employees.filter((employee) => employee.team === activeFilter);
  }, [activeFilter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {teamFilters.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              className={`bg-navy-light border border-white/30 px-3 py-1 text-xs font-[family-name:var(--font-pixel)] transition-colors ${
                isActive ? "bg-gold-retro text-navy-deep" : "text-white"
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((member) => (
          <Link
            key={member.id}
            href={`/employees/${member.id}`}
            className="bg-navy-light border border-white/20 rounded-sm p-4 hover:border-gold-retro transition-colors"
          >
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded border border-white/20 overflow-hidden bg-navy-deep">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-1">{member.name}</p>
                <p className={`text-sm font-bold ${member.color}`}>{member.role}</p>
                <p className="text-xs text-gray-400">{teamNameMap[member.team]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
