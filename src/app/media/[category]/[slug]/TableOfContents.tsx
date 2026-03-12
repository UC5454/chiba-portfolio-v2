"use client";

import { useEffect, useState } from "react";
import { HeadingItem } from "@/types/media";
import { trackTocClick } from "@/lib/analytics";

const COLLAPSE_THRESHOLD = 8;
const VISIBLE_WHEN_COLLAPSED = 5;

interface TableOfContentsProps {
  headings: HeadingItem[];
  articleTitle?: string;
}

export default function TableOfContents({ headings, articleTitle }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const shouldCollapse = headings.length > COLLAPSE_THRESHOLD;
  const [isExpanded, setIsExpanded] = useState(!shouldCollapse);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const visibleHeadings = isExpanded ? headings : headings.slice(0, VISIBLE_WHEN_COLLAPSED);
  const hiddenCount = headings.length - VISIBLE_WHEN_COLLAPSED;

  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
      <p className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        目次
        {shouldCollapse && (
          <span className="text-xs font-normal text-gray-400 ml-auto">
            {headings.length}件
          </span>
        )}
      </p>
      <ol className="space-y-1.5">
        {visibleHeadings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-sm leading-relaxed transition-colors ${
                h.level === 3 ? "pl-4" : ""
              } ${
                activeId === h.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                if (articleTitle) trackTocClick(h.text, articleTitle);
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {isExpanded ? "折りたたむ" : `すべて表示（残り${hiddenCount}件）`}
        </button>
      )}
    </nav>
  );
}
