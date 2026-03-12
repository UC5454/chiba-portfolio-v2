"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer title="道具屋カウンター" breadcrumb={[{ label: "おといあわせ" }]}>
      <section className="max-w-3xl mx-auto bg-wood-dark p-2 rounded-sm shadow-pixel">
        <div className="bg-[#f5deb3] border-4 border-[#5c3a21] p-6 md:p-8 text-gray-900">
          {submitted ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-4">📜</p>
              <h2 className="font-bold text-lg mb-2">メッセージを受け取りました！</h2>
              <p className="text-sm">冒険者よ、返答を待たれよ。</p>
              <Link
                href="/"
                className="inline-block mt-6 bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors"
              >
                ▶ ホームにもどる
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm mb-6 leading-relaxed bg-white/50 border border-[#5c3a21] p-3">
                「何かお困りごとがあれば、このカウンターに書き残していってくれ。」
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">名前</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full border-2 border-[#5c3a21] p-2 bg-white/70 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">メールアドレス</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full border-2 border-[#5c3a21] p-2 bg-white/70 text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">おといあわせ内容</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full border-2 border-[#5c3a21] p-2 bg-white/70 text-gray-900 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-wood-dark text-[#deb887] px-6 py-3 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors cursor-pointer"
                >
                  ▶ メッセージを送る
                </button>
              </form>
              <div className="flex flex-wrap gap-4 text-sm mt-6 pt-4 border-t border-[#5c3a21]/30">
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">エックス</a>
                <a href="https://note.com/" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">ノート</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">リンクトイン</a>
                <a href="https://github.com/UC5454" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">ギットハブ</a>
              </div>
            </>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
