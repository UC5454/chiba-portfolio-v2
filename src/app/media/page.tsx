import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles } from "@/lib/media";
import { mediaCategories } from "@/data/mediaCategories";
import { defaultCta } from "@/data/mediaCta";
import MediaBoard from "./MediaBoard";

export function generateMetadata(): Metadata {
  return {
    title: "千葉勇志メディア — AI社員・AI導入の実践知",
    description: "25名のAI社員を運用する経営者が、体験に基づいたリアルな知見を発信します。",
    openGraph: {
      title: "千葉勇志メディア — AI社員・AI導入の実践知",
      description: "25名のAI社員を運用する経営者が、体験に基づいたリアルな知見を発信します。",
    },
  };
}

export default async function MediaPage() {
  const articles = await getAllArticles();

  // Pick up to 2 featured articles (most recent)
  const featured = articles.slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI社員・AI導入の実践知
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl">
            25名のAI社員を運用する経営者が、体験に基づいたリアルな知見を発信します。
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
              千
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">千葉 勇志</p>
              <p className="text-xs text-gray-500">株式会社SOU 代表 / デジタルゴリラ 取締役COO兼CAIO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pickup / Featured articles */}
      {featured.length > 0 && (
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
              PICKUP
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((article) => {
                const catInfo = mediaCategories.find((c) => c.slug === article.category);
                return (
                  <Link
                    key={`${article.category}/${article.slug}`}
                    href={`/media/${article.category}/${article.slug}`}
                    className="group flex flex-col bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    {article.thumbnail && (
                      <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {catInfo && (
                        <span
                          className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full text-white mb-2"
                          style={{ backgroundColor: catInfo.color }}
                        >
                          {catInfo.name}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <p className="font-bold text-lg">{defaultCta.heading}</p>
            <p className="text-sm opacity-80">{defaultCta.description}</p>
          </div>
          <a
            href={defaultCta.href}
            className="shrink-0 inline-block bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {defaultCta.buttonText} →
          </a>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <MediaBoard articles={articles} categories={mediaCategories} />
        </div>
      </section>

      {/* Category navigation section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-lg font-bold text-gray-900 mb-6">カテゴリから探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mediaCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/media/${cat.slug}`}
                className="p-4 border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <p className="font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
