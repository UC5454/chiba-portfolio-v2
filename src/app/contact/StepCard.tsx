"use client";

export interface InquiryOption {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface StepCardProps {
  option: InquiryOption;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const inquiryOptions: InquiryOption[] = [
  {
    id: "ai-dx",
    icon: "🤖",
    title: "AI導入・DX相談",
    description: "AI活用やDX推進について相談したい",
  },
  {
    id: "speaking",
    icon: "🎤",
    title: "登壇・取材・メディア",
    description: "講演・セミナー登壇、取材のご依頼",
  },
  {
    id: "partnership",
    icon: "🤝",
    title: "協業・パートナーシップ",
    description: "事業連携や協業のご提案",
  },
  {
    id: "other",
    icon: "💬",
    title: "その他",
    description: "上記以外のお問い合わせ",
  },
];

export default function StepCard({ option, selected, onSelect }: StepCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
      className={`w-full text-left p-4 md:p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        selected
          ? "border-gold-retro bg-gold-retro/10 shadow-[0_0_12px_rgba(255,215,0,0.15)]"
          : "border-gold-retro/20 bg-navy-deep/50 hover:border-gold-retro/40 hover:bg-navy-deep/70"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl md:text-3xl" role="img" aria-hidden="true">
          {option.icon}
        </span>
        <div>
          <h3
            className={`font-bold text-sm md:text-base ${
              selected ? "text-gold-retro" : "text-gold-retro/80"
            }`}
          >
            {option.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            {option.description}
          </p>
        </div>
      </div>
    </button>
  );
}
