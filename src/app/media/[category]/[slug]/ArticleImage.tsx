"use client";

import { mediaCategories } from "@/data/mediaCategories";

interface ArticleImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

export default function ArticleImage({ src, alt, className, category }: ArticleImageProps) {
  const catInfo = category ? mediaCategories.find(c => c.slug === category) : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent) {
          parent.classList.add("flex", "items-center", "justify-center");
          parent.style.backgroundColor = "#f3f4f6";
          const icon = document.createElement("span");
          icon.className = "text-5xl opacity-30";
          icon.textContent = catInfo?.icon || "📄";
          parent.appendChild(icon);
        }
      }}
    />
  );
}
