import Link from "next/link";

import { colorMap, newsItems } from "@/data/news";

export default function News() {
  return (
    <section id="news" className="py-16 relative" style={{ backgroundImage: "url('/images/bg-news.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-navy-light/85" />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="bg-wood-dark p-2 rounded-sm shadow-pixel">
          <div className="bg-wood-light border-4 border-[#5c3a21] p-6 relative">
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gray-400 shadow-inner" />

            <div className="flex justify-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3e2723] font-[family-name:var(--font-pixel)] bg-[#deb887] px-6 py-2 border-4 border-[#5c3a21] shadow-lg transform -rotate-1 tracking-wider drop-shadow-[2px_2px_0_#5c3a21]">
                旅の掲示板
              </h3>
            </div>

            <ul className="space-y-4">
              {newsItems.map((item) => {
                const colors = colorMap[item.color];
                return (
                  <li key={item.id}>
                    <Link
                      href={`/news/${item.id}`}
                      className={`bg-[#fdf5e6] p-4 text-gray-900 border-l-4 ${colors.border} shadow-sm flex flex-col md:flex-row gap-2 md:items-center transform hover:-translate-y-1 transition-transform block`}
                    >
                      <span
                        className={`font-bold text-xs ${colors.badge} px-3 py-1.5 rounded-sm border-2 ${colors.badgeBorder}`}
                      >
                        {item.type}
                      </span>
                      <span className="text-sm font-bold text-gray-500">{item.date}</span>
                      <span className="text-base sm:text-lg font-black">{item.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="text-center mt-4">
              <Link
                href="/news"
                className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
              >
                もっと見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
