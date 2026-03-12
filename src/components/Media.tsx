import Link from "next/link";
import { getAllArticles } from "@/lib/media";
import { mediaCategories, getCategoryBySlug } from "@/data/mediaCategories";

export default async function Media() {
  const articles = await getAllArticles();
  const latest = articles.slice(0, 3);

  return (
    <section id="media" className="py-16 relative" style={{ backgroundImage: "url('/images/bg-news.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-navy-light/85" />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="bg-wood-dark p-2 rounded-sm shadow-pixel">
          <div className="bg-wood-light border-4 border-[#5c3a21] p-6 relative">
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />

            <div className="flex justify-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#3e2723] font-[family-name:var(--font-pixel)] bg-[#deb887] px-4 py-1 border-2 border-[#5c3a21] shadow-sm transform -rotate-1">
                知恵の書庫 (Media)
              </h3>
            </div>

            {/* Latest 3 articles */}
            {latest.length > 0 ? (
              <ul className="space-y-4 mb-6">
                {latest.map((article) => {
                  const catInfo = getCategoryBySlug(article.category);
                  return (
                    <li key={`${article.category}/${article.slug}`}>
                      <Link
                        href={`/media/${article.category}/${article.slug}`}
                        className="bg-[#fdf5e6] p-4 text-gray-900 border-l-4 shadow-sm flex flex-col md:flex-row gap-2 md:items-center transform hover:-translate-y-1 transition-transform block"
                        style={{ borderLeftColor: catInfo?.color || "#3b82f6" }}
                      >
                        {catInfo && (
                          <span
                            className="font-bold font-[family-name:var(--font-pixel)] text-[10px] px-2 py-1 rounded text-white shrink-0"
                            style={{ backgroundColor: catInfo.color }}
                          >
                            {catInfo.name}
                          </span>
                        )}
                        <span className="text-sm font-bold text-gray-500 shrink-0">{article.date}</span>
                        <span className="font-bold line-clamp-1">{article.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center text-[#3e2723] mb-6">記事を準備中...</p>
            )}

            {/* Category navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              {mediaCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/media/${cat.slug}`}
                  className="bg-[#fdf5e6] p-3 text-center hover:-translate-y-1 transition-transform border border-[#d4a76a]"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <p className="text-xs font-bold text-[#3e2723] mt-1">{cat.name}</p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/media"
                className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
              >
                すべての記事を読む
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
