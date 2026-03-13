"use client";

import { useEffect, useState } from "react";

export default function ServiceMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const footerEl = document.querySelector("footer");

    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) {
            setVisible(!entry.isIntersecting);
          }
        });
      },
      { threshold: 0 }
    );

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(false);
          } else {
            const heroRect = heroEl.getBoundingClientRect();
            if (heroRect.bottom < 0) {
              setVisible(true);
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    if (footerEl) footerObserver.observe(footerEl);

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#contact"
        className="block w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl text-center active:scale-[0.98] transition-all duration-100"
      >
        無料相談を予約する（30分）
      </a>
    </div>
  );
}
