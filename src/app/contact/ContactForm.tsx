"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import StepIndicator from "./StepIndicator";
import StepCard, { inquiryOptions } from "./StepCard";

interface FormData {
  inquiryType: string;
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const placeholderMap: Record<string, string> = {
  "ai-dx":
    "例: 社内のAI活用を進めたいのですが、何から始めればいいか相談したいです。",
  speaking:
    "例: 2026年5月のカンファレンスで、AI活用事例の講演をお願いしたいです。",
  partnership:
    "例: AI関連のサービス連携について、一度お話しできればと思います。",
  other: "お気軽にメッセージをどうぞ！",
};

function getInquiryLabel(id: string): string {
  const opt = inquiryOptions.find((o) => o.id === id);
  return opt ? `${opt.icon} ${opt.title}` : id;
}

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    inquiryType: "",
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<"success" | "error" | null>(
    null
  );

  const goNext = useCallback(() => {
    setDirection("next");
    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  }, []);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setAnimKey((k) => k + 1);
    setStep((s) => s - 1);
  }, []);

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.message.trim()) {
      newErrors.message = "メッセージを入力してください";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep2 = () => {
    if (validateStep2()) goNext();
  };

  const handleNextStep3 = () => {
    if (validateStep3()) goNext();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          subject: `【ポートフォリオ】${getInquiryLabel(formData.inquiryType)} - ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          company: formData.company || "未記入",
          inquiry_type: getInquiryLabel(formData.inquiryType),
          message: formData.message,
          botcheck: "",
        }),
      });
      const data = await response.json();
      setSubmitResult(data.success ? "success" : "error");
    } catch {
      setSubmitResult("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitResult(null);
    setStep(4);
  };

  const handleStartOver = () => {
    setFormData({ inquiryType: "", name: "", email: "", company: "", message: "" });
    setErrors({});
    setSubmitResult(null);
    setStep(1);
    setDirection("next");
    setAnimKey((k) => k + 1);
  };

  const animClass =
    direction === "next" ? "step-enter-next" : "step-enter-prev";

  // --- Completion Screen ---
  if (submitResult) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          {submitResult === "success" ? (
            <>
              <p className="text-5xl mb-4">📜</p>
              <h2 className="font-[family-name:var(--font-pixel)] text-gold-retro text-sm md:text-base mb-4">
                メッセージが届きました！
              </h2>
              <p className="text-gray-300 mb-8 font-[family-name:var(--font-dotgothic)]">
                冒険者よ、24時間以内に返答するぞ。
              </p>
              <Link
                href="/"
                className="inline-block bg-gold-retro text-navy-deep font-bold px-6 py-3 rounded-lg hover:bg-gold-dim transition-colors text-sm"
              >
                ▶ ホームにもどる
              </Link>
              {/* SNS Links */}
              <div className="mt-10 pt-6 border-t border-gold-retro/20">
                <p className="text-gray-500 text-xs mb-3">SNSでもつながろう</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <a
                    href="https://x.com/UC_DG54"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-retro/70 hover:text-gold-retro transition-colors"
                  >
                    𝕏 エックス ↗
                  </a>
                  <a
                    href="https://note.com/uc_dg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-retro/70 hover:text-gold-retro transition-colors"
                  >
                    📝 ノート ↗
                  </a>
                  <a
                    href="https://www.facebook.com/UC54dg/?locale=ja_JP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-retro/70 hover:text-gold-retro transition-colors"
                  >
                    📘 フェイスブック ↗
                  </a>
                  <a
                    href="https://github.com/UC5454"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-retro/70 hover:text-gold-retro transition-colors"
                  >
                    🐙 ギットハブ ↗
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-5xl mb-4">⚠️</p>
              <h2 className="font-[family-name:var(--font-pixel)] text-red-alert text-sm md:text-base mb-4">
                送信に失敗しました
              </h2>
              <p className="text-gray-300 mb-8 font-[family-name:var(--font-dotgothic)]">
                通信エラーが発生しました。もう一度お試しください。
              </p>
              <button
                onClick={handleRetry}
                className="inline-block bg-gold-retro text-navy-deep font-bold px-6 py-3 rounded-lg hover:bg-gold-dim transition-colors text-sm cursor-pointer"
              >
                ▶ もう一度試す
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <StepIndicator currentStep={step} totalSteps={4} />

      {/* Honeypot for spam protection */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        className="bg-[#0d1230] border border-gold-retro/20 rounded-lg p-6 md:p-8"
        role="form"
        aria-label="お問い合わせフォーム"
      >
        <div key={animKey} className={animClass}>
          {/* Step 1: Inquiry Type */}
          {step === 1 && (
            <div>
              <h2 className="text-gold-retro/90 font-bold text-base md:text-lg mb-6 font-[family-name:var(--font-dotgothic)]">
                お問い合わせの種類を選んでください
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {inquiryOptions.map((option) => (
                  <StepCard
                    key={option.id}
                    option={option}
                    selected={formData.inquiryType === option.id}
                    onSelect={(id) =>
                      setFormData((prev) => ({ ...prev, inquiryType: id }))
                    }
                  />
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!formData.inquiryType}
                  className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer ${
                    formData.inquiryType
                      ? "bg-gold-retro text-navy-deep hover:bg-gold-dim"
                      : "bg-gold-retro/40 text-navy-deep/60 cursor-not-allowed opacity-40"
                  }`}
                >
                  つぎへ ▶
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Name & Email */}
          {step === 2 && (
            <div>
              <h2 className="text-gold-retro/90 font-bold text-base md:text-lg mb-6 font-[family-name:var(--font-dotgothic)]">
                お名前・ご連絡先を入力してください
              </h2>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-gold-retro/80 text-sm font-bold mb-1"
                  >
                    お名前 <span className="text-red-alert">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className="w-full bg-navy-deep/50 border border-gold-retro/20 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm focus:border-gold-retro focus:outline-none focus:ring-1 focus:ring-gold-retro/30 transition-colors"
                    placeholder="千葉 勇志"
                  />
                  {errors.name && (
                    <p className="text-red-alert text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-gold-retro/80 text-sm font-bold mb-1"
                  >
                    メールアドレス <span className="text-red-alert">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className="w-full bg-navy-deep/50 border border-gold-retro/20 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm focus:border-gold-retro focus:outline-none focus:ring-1 focus:ring-gold-retro/30 transition-colors"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-alert text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-gold-retro/80 text-sm font-bold mb-1"
                  >
                    会社名 <span className="text-gray-500 text-xs font-normal">（任意）</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    className="w-full bg-navy-deep/50 border border-gold-retro/20 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm focus:border-gold-retro focus:outline-none focus:ring-1 focus:ring-gold-retro/30 transition-colors"
                    placeholder="株式会社◯◯"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-3 rounded-lg text-sm border border-gold-retro/30 text-gold-retro/70 hover:text-gold-retro transition-colors cursor-pointer"
                >
                  ◀ もどる
                </button>
                <button
                  type="button"
                  onClick={handleNextStep2}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-gold-retro text-navy-deep hover:bg-gold-dim transition-colors cursor-pointer"
                >
                  つぎへ ▶
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Message */}
          {step === 3 && (
            <div>
              <h2 className="text-gold-retro/90 font-bold text-base md:text-lg mb-6 font-[family-name:var(--font-dotgothic)]">
                メッセージ内容を入力してください
              </h2>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-gold-retro/80 text-sm font-bold mb-1"
                >
                  メッセージ <span className="text-red-alert">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message)
                      setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  className="w-full bg-navy-deep/50 border border-gold-retro/20 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm focus:border-gold-retro focus:outline-none focus:ring-1 focus:ring-gold-retro/30 transition-colors resize-none"
                  placeholder={
                    placeholderMap[formData.inquiryType] || placeholderMap.other
                  }
                />
                {errors.message && (
                  <p className="text-red-alert text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-3 rounded-lg text-sm border border-gold-retro/30 text-gold-retro/70 hover:text-gold-retro transition-colors cursor-pointer"
                >
                  ◀ もどる
                </button>
                <button
                  type="button"
                  onClick={handleNextStep3}
                  className="px-6 py-3 rounded-lg font-bold text-sm bg-gold-retro text-navy-deep hover:bg-gold-dim transition-colors cursor-pointer"
                >
                  つぎへ ▶
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div>
              <h2 className="text-gold-retro/90 font-bold text-base md:text-lg mb-6 font-[family-name:var(--font-dotgothic)]">
                入力内容をご確認ください
              </h2>
              <div className="space-y-4 bg-navy-deep/40 rounded-lg p-4 md:p-6 border border-gold-retro/10">
                <div>
                  <dt className="text-gold-retro/60 text-xs font-bold mb-1">
                    お問い合わせ種類
                  </dt>
                  <dd className="text-white text-sm">
                    {getInquiryLabel(formData.inquiryType)}
                  </dd>
                </div>
                <div className="border-t border-gold-retro/10 pt-3">
                  <dt className="text-gold-retro/60 text-xs font-bold mb-1">
                    お名前
                  </dt>
                  <dd className="text-white text-sm">{formData.name}</dd>
                </div>
                <div className="border-t border-gold-retro/10 pt-3">
                  <dt className="text-gold-retro/60 text-xs font-bold mb-1">
                    メールアドレス
                  </dt>
                  <dd className="text-white text-sm">{formData.email}</dd>
                </div>
                {formData.company && (
                  <div className="border-t border-gold-retro/10 pt-3">
                    <dt className="text-gold-retro/60 text-xs font-bold mb-1">
                      会社名
                    </dt>
                    <dd className="text-white text-sm">{formData.company}</dd>
                  </div>
                )}
                <div className="border-t border-gold-retro/10 pt-3">
                  <dt className="text-gold-retro/60 text-xs font-bold mb-1">
                    メッセージ
                  </dt>
                  <dd className="text-white text-sm whitespace-pre-wrap">
                    {formData.message}
                  </dd>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={goPrev}
                  className="px-6 py-3 rounded-lg text-sm border border-gold-retro/30 text-gold-retro/70 hover:text-gold-retro transition-colors cursor-pointer"
                >
                  ◀ もどる
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                    submitting
                      ? "bg-gold-retro/60 text-navy-deep/80 cursor-not-allowed"
                      : "bg-gold-retro text-navy-deep hover:bg-gold-dim"
                  }`}
                >
                  {submitting && (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  )}
                  {submitting ? "送信中..." : "送信する ▶"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Start over link */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleStartOver}
          className="text-gray-500 text-xs hover:text-gray-400 transition-colors cursor-pointer"
        >
          はじめからやりなおす
        </button>
      </div>
    </div>
  );
}
