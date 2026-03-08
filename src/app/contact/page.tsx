import type { Metadata } from "next";
import Link from "next/link";

import PageContainer from "@/components/PageContainer";

export function generateMetadata(): Metadata {
  return {
    title: "お問い合わせ | 千葉勇志 / Yushi Chiba",
    description: "メールまたはSNSでお問い合わせいただけます。",
  };
}

export default function ContactPage() {
  return (
    <PageContainer title="道具屋カウンター" breadcrumb={[{ label: "お問い合わせ" }]}>
      <section className="max-w-3xl mx-auto bg-wood-dark p-2 rounded-sm shadow-pixel">
        <div className="bg-[#f5deb3] border-4 border-[#5c3a21] p-6 md:p-8 text-gray-900">
          <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-lg text-[#3e2723] mb-4 leading-relaxed">
            冒険者よ、何か用か？
          </h2>
          <p className="text-sm sm:text-base mb-6 leading-relaxed">
            相談・登壇依頼・プロジェクトのご相談は、下記メールまたはSNSから気軽に連絡してください。
          </p>

          <div className="bg-white/70 border border-[#5c3a21] p-4 mb-6">
            <p className="text-xs sm:text-sm mb-2">
              連絡先メール: <span className="font-bold">y.chiba@digital-gorilla.co.jp</span>
            </p>
            <Link
              href="mailto:y.chiba@digital-gorilla.co.jp"
              className="inline-block bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
            >
              メールを送る
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3e2723] underline hover:text-black"
            >
              X (Twitter)
            </Link>
            <Link
              href="https://note.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3e2723] underline hover:text-black"
            >
              Note
            </Link>
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3e2723] underline hover:text-black"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/UC5454"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3e2723] underline hover:text-black"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
