import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getArticlesByCategory } from "@/lib/media";
import { getCategoryBySlug, mediaCategories } from "@/data/mediaCategories";
import { getCtaForCategory } from "@/data/mediaCta";
import { MediaArticle } from "@/types/media";
import ArticleImage from "./ArticleImage";
import TableOfContents from "./TableOfContents";
import ShareButtons from "./ShareButtons";
import ArticleScrollTracker from "./ArticleScrollTracker";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await getArticleBySlug(category, slug);
  if (!article) return { title: "Not Found" };

  const ogImage = `/api/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(category)}&description=${encodeURIComponent(article.description)}`;

  return {
    title: `${article.title} | 千葉勇志メディア`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      images: article.thumbnail ? [article.thumbnail] : [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.thumbnail ? [article.thumbnail] : [ogImage],
    },
  };
}

/** Find cross-category recommendations based on tag overlap */
function getCrossRecommendations(
  current: MediaArticle,
  allArticles: MediaArticle[],
  maxCount: number = 3
): MediaArticle[] {
  const currentTags = new Set(current.tags);
  const candidates = allArticles
    .filter((a) => !(a.category === current.category && a.slug === current.slug))
    .map((a) => {
      const overlap = a.tags.filter((t) => currentTags.has(t)).length;
      return { article: a, score: overlap };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  // If not enough tag-based matches, fill with recent from other categories
  const result = candidates.slice(0, maxCount).map((c) => c.article);
  if (result.length < maxCount) {
    const usedSlugs = new Set([
      `${current.category}/${current.slug}`,
      ...result.map((r) => `${r.category}/${r.slug}`),
    ]);
    const fillers = allArticles
      .filter((a) => !usedSlugs.has(`${a.category}/${a.slug}`) && a.category !== current.category)
      .slice(0, maxCount - result.length);
    result.push(...fillers);
  }
  return result;
}

/** Get prev/next articles in chronological order */
function getPrevNext(
  current: MediaArticle,
  allArticles: MediaArticle[]
): { prev: MediaArticle | null; next: MediaArticle | null } {
  const sorted = [...allArticles].sort((a, b) => (a.date > b.date ? -1 : 1));
  const idx = sorted.findIndex(
    (a) => a.category === current.category && a.slug === current.slug
  );
  return {
    prev: idx < sorted.length - 1 ? sorted[idx + 1] : null, // older
    next: idx > 0 ? sorted[idx - 1] : null, // newer
  };
}

/** Map category to a portfolio section anchor */
function getPortfolioLink(category: string): { label: string; href: string } | null {
  const map: Record<string, { label: string; href: string }> = {
    "ai-employees": { label: "AI社員チームの詳細を見る", href: "/#ai-team" },
    "ai-business": { label: "実績・サービスを見る", href: "/#services" },
    education: { label: "登壇・研修実績を見る", href: "/#speaking" },
    events: { label: "コミュニティ活動を見る", href: "/#community" },
    tech: { label: "技術への取り組みを見る", href: "/#ai-team" },
  };
  return map[category] || null;
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const article = await getArticleBySlug(category, slug);
  if (!article) notFound();

  const catInfo = getCategoryBySlug(category);
  const cta = getCtaForCategory(article.category);

  // Same-category related articles
  const allInCategory = await getArticlesByCategory(category);
  const related = allInCategory.filter((a) => a.slug !== slug).slice(0, 3);

  // Cross-category recommendations
  const allArticles = await getAllArticles();
  const crossRecommendations = getCrossRecommendations(article, allArticles, 3);

  // Prev/Next navigation
  const { prev, next } = getPrevNext(article, allArticles);

  // Portfolio link
  const portfolioLink = getPortfolioLink(category);

  const BASE_URL = "https://chiba-portfolio.vercel.app";

  // Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    author: {
      "@type": "Person",
      "@id": "https://chiba-portfolio.vercel.app/#person",
      name: "千葉勇志",
      jobTitle: "代表取締役 / 取締役COO兼CAIO",
      url: "https://x.com/chibayuushi",
    },
    publisher: {
      "@type": "Organization",
      name: "株式会社SOU",
    },
    mainEntityOfPage: `${BASE_URL}/media/${category}/${slug}`,
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "メディア", item: `${BASE_URL}/media` },
      { "@type": "ListItem", position: 3, name: catInfo?.name || category, item: `${BASE_URL}/media/${category}` },
      { "@type": "ListItem", position: 4, name: article.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleScrollTracker
        articleTitle={article.title}
        category={category}
        wordCount={article.readingTime * 500}
        readingTime={article.readingTime}
      />
      <div className="bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/media" className="hover:text-gray-600">メディア</Link>
            <span className="mx-2">&gt;</span>
            <Link href={`/media/${category}`} className="hover:text-gray-600">{catInfo?.name || category}</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-500 line-clamp-1 inline">{article.title}</span>
          </nav>

          {/* Category badge + date + reading time */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {catInfo && (
              <Link
                href={`/media/${category}`}
                className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: catInfo.color }}
              >
                {catInfo.name}
              </Link>
            )}
            <span className="text-sm text-gray-400">{article.date}</span>
            <span className="text-sm text-gray-300">·</span>
            <span className="text-sm text-gray-400">{article.readingTime}分で読めます</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
            {article.title}
          </h1>

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="w-full aspect-video bg-gray-100 rounded-xl mb-8 overflow-hidden">
              <ArticleImage
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
                category={article.category}
              />
            </div>
          )}

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents headings={article.headings} articleTitle={article.title} />

          {/* Body */}
          <div
            className="media-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100 pt-6">
            <ShareButtons
              title={article.title}
              url={`https://chiba-portfolio.vercel.app/media/${category}/${slug}`}
            />
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Internal link to portfolio */}
          {portfolioLink && (
            <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-600">この記事のテーマに関連するポートフォリオ</span>
              <Link
                href={portfolioLink.href}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                {portfolioLink.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          )}

          {/* Author profile with SNS links */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg shrink-0">
                千
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">千葉 勇志（Yushi Chiba）</p>
                <p className="text-gray-500 text-sm">
                  株式会社SOU 代表 / デジタルゴリラ 取締役COO兼CAIO
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  東北AIコミュニティ主宰 / 25名のAI社員チームを運用する「体験主義」の実践者
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <a
                    href="https://x.com/chibayuushi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    @chibayuushi
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
                    ポートフォリオ
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Category-specific CTA */}
          <div
            className="mt-8 p-6 md:p-8 rounded-xl text-white text-center"
            style={{ backgroundColor: cta.accent }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-2">{cta.heading}</h3>
            <p className="text-sm opacity-90 mb-5 max-w-lg mx-auto">{cta.description}</p>
            <a
              href={cta.href}
              className="inline-block bg-white font-bold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              style={{ color: cta.accent }}
              data-gtm-event="cta_click"
              data-gtm-cta-text={cta.buttonText}
              data-gtm-cta-position="article-bottom"
              data-gtm-category={category}
            >
              {cta.buttonText} →
            </a>
          </div>

          {/* Same-category related articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => {
                  const rCat = getCategoryBySlug(r.category);
                  return (
                    <Link
                      key={r.slug}
                      href={`/media/${r.category}/${r.slug}`}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow block"
                    >
                      {rCat && (
                        <span
                          className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full text-white mb-2"
                          style={{ backgroundColor: rCat.color }}
                        >
                          {rCat.name}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-xs text-gray-400">{r.date}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cross-category recommendations */}
          {crossRecommendations.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                あわせて読みたい
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {crossRecommendations.map((r) => {
                  const rCat = getCategoryBySlug(r.category);
                  return (
                    <Link
                      key={`${r.category}/${r.slug}`}
                      href={`/media/${r.category}/${r.slug}`}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow block"
                    >
                      {rCat && (
                        <span
                          className="inline-block px-2 py-0.5 text-[10px] font-medium rounded-full text-white mb-2"
                          style={{ backgroundColor: rCat.color }}
                        >
                          {rCat.name}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-xs text-gray-400">{r.date}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/media/${prev.category}/${prev.slug}`}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-xs text-gray-400">← 前の記事</span>
                  <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/media/${next.category}/${next.slug}`}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-right group"
                >
                  <span className="text-xs text-gray-400">次の記事 →</span>
                  <p className="text-sm font-medium text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Back to media top */}
          <div className="mt-8 text-center">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              記事一覧に戻る
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
