"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaArticle, CategoryInfo } from "@/types/media";

interface MediaBoardProps {
  articles: MediaArticle[];
  categories: CategoryInfo[];
  perPage?: number;
}

const ALL_FILTER = "ALL";

export default function MediaBoard({ articles, categories, perPage = 12 }: MediaBoardProps) {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    if (activeFilter === ALL_FILTER) return articles;
    return articles.filter((a) => a.category === activeFilter);
  }, [activeFilter, articles]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / perPage));
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const getCategoryInfo = (slug: string) => categories.find((c) => c.slug === slug);

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
            activeFilter === ALL_FILTER
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => handleFilterChange(ALL_FILTER)}
        >
          すべて
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              activeFilter === cat.slug
                ? "text-white border-transparent"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
            style={activeFilter === cat.slug ? { backgroundColor: cat.color, borderColor: cat.color } : undefined}
            onClick={() => handleFilterChange(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Article count */}
      <p className="text-sm text-gray-400 mb-4">{filteredArticles.length}件の記事</p>

      {/* Article grid */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">このカテゴリの記事はまだありません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedArticles.map((article) => {
            const catInfo = getCategoryInfo(article.category);
            return (
              <Link
                key={`${article.category}/${article.slug}`}
                href={`/media/${article.category}/${article.slug}`}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all group"
              >
                {/* Thumbnail */}
                <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                  {article.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) parent.classList.add("flex", "items-center", "justify-center");
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center ${article.thumbnail ? "hidden" : ""}`}>
                    <span className="text-4xl opacity-30">{catInfo?.icon || "📄"}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category badge */}
                  {catInfo && (
                    <span
                      className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full text-white mb-3"
                      style={{ backgroundColor: catInfo.color }}
                    >
                      {catInfo.name}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{article.description}</p>
                  <p className="text-xs text-gray-400">{article.date}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label="ページナビゲーション">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-2 text-sm rounded-lg text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← 前へ
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`w-10 h-10 text-sm rounded-lg transition-colors ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-2 text-sm rounded-lg text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            次へ →
          </button>
        </nav>
      )}
    </div>
  );
}
