import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "おといあわせ | 千葉勇志 / Yushi Chiba",
  description:
    "AI導入・DX推進・登壇依頼・協業のご相談はこちらから。24時間以内に返信します。",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy-deep pt-24 pb-16">
      {/* Breadcrumb */}
      <nav
        className="max-w-2xl mx-auto px-4 mb-6"
        aria-label="パンくずリスト"
      >
        <ol className="flex items-center gap-2 text-xs text-gray-500 font-[family-name:var(--font-dotgothic)]">
          <li>
            <Link href="/" className="hover:text-gold-retro transition-colors">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">▸</li>
          <li className="text-gold-retro/80">おといあわせ</li>
        </ol>
      </nav>

      {/* Page Title */}
      <h1 className="font-[family-name:var(--font-pixel)] text-gold-retro text-center text-base md:text-lg mb-8">
        おといあわせ
      </h1>

      <ContactForm />
    </main>
  );
}
