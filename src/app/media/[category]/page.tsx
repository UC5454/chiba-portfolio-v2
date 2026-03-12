import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/media";
import { mediaCategories, getCategoryBySlug } from "@/data/mediaCategories";
import { getCtaForCategory } from "@/data/mediaCta";
import { MediaCategory } from "@/types/media";
import MediaBoard from "../MediaBoard";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return mediaCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const catInfo = getCategoryBySlug(category);
  if (!catInfo) return { title: "Not Found" };

  return {
    title: `${catInfo.name} | 千葉勇志メディア`,
    description: catInfo.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const catInfo = getCategoryBySlug(category);
  if (!catInfo) notFound();

  const articles = await getArticlesByCategory(category);
  const cta = getCtaForCategory(category as MediaCategory);
  const otherCategories = mediaCategories.filter((c) => c.slug !== category);

  return (
    <div className="bg-gray-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Category header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/media" className="hover:text-gray-600">メディア</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-600">{catInfo.name}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {catInfo.icon} {catInfo.name}
          </h1>
          <p className="text-gray-500">{catInfo.description}</p>
        </div>

        <MediaBoard articles={articles} categories={mediaCategories} />

        {/* Category-specific CTA */}
        <div
          className="mt-12 p-6 md:p-8 rounded-xl text-white text-center"
          style={{ backgroundColor: cta.accent }}
        >
          <h3 className="text-lg md:text-xl font-bold mb-2">{cta.heading}</h3>
          <p className="text-sm opacity-90 mb-5 max-w-lg mx-auto">{cta.description}</p>
          <a
            href={cta.href}
            className="inline-block bg-white font-bold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ color: cta.accent }}
          >
            {cta.buttonText} →
          </a>
        </div>

        {/* Other categories */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-6">他のカテゴリも見る</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/media/${cat.slug}`}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all group"
              >
                <span className="text-lg">{cat.icon}</span>
                <p className="font-medium text-sm text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
