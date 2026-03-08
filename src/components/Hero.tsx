"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BattleGame = dynamic(() => import("./BattleGame"), { ssr: false });

export default function Hero() {
  const [showBattle, setShowBattle] = useState(false);

  const handleCommand = (cmd: string) => {
    if (cmd === "tatakau") {
      setShowBattle(true);
    } else if (cmd === "hanasu") {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd === "shiru") {
      const el = document.getElementById("status");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-16 overflow-hidden">
        {/* Background Map Effect */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-game-world.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-navy-deep/50" />

        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
          {/* Main Title */}
          <div className="text-center mb-8 animate-float">
            <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] md:text-sm mb-4 tracking-widest uppercase">
              New Game Started...
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-2">
              あなたの会社にも、
              <br className="md:hidden" />
              AI社員を。
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-sky font-bold drop-shadow-md">
              AIで可能性を無限大にする
            </p>
          </div>

          {/* Character Sprite */}
          <div className="mb-8 relative group cursor-pointer">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-navy-light border-4 border-white pixel-border flex items-center justify-center overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-gold-retro"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gold-retro text-black text-xs px-2 py-1 font-bold border-2 border-black">
              LV.99
            </div>
          </div>

          {/* Dialogue Box */}
          <div className="w-full max-w-2xl bg-black/80 border-4 border-white p-6 rounded-sm shadow-pixel relative">
            <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-500 pointer-events-none" />
            <h3 className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] sm:text-sm mb-2">
              千葉勇志 (Yushi Chiba)
            </h3>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              「ようこそ。私はAIと共に世界を変える冒険者だ。
              <br />
              君のビジネスというフィールドで、共に戦う準備はできている。」
              <span className="inline-block w-3 h-5 bg-white ml-1 animate-blink align-middle" />
            </p>
          </div>

          {/* RPG Command Menu */}
          <div className="w-full max-w-2xl mt-4">
            <div className="bg-black/80 border-4 border-white p-3 shadow-pixel flex flex-wrap justify-center gap-1 sm:gap-2">
              <button
                onClick={() => handleCommand("hanasu")}
                className="flex-1 min-w-[80px] text-center font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-white hover:text-gold-retro transition-colors px-3 sm:px-4 py-2 border-2 border-transparent hover:border-gold-retro/50 cursor-pointer"
              >
                ▶ はなす
              </button>
              <button
                onClick={() => handleCommand("shiru")}
                className="flex-1 min-w-[80px] text-center font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-white hover:text-gold-retro transition-colors px-3 sm:px-4 py-2 border-2 border-transparent hover:border-gold-retro/50 cursor-pointer"
              >
                ▶ しる
              </button>
              <button
                onClick={() => handleCommand("tatakau")}
                className="flex-1 min-w-[80px] text-center font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-white hover:text-gold-retro transition-colors px-3 sm:px-4 py-2 border-2 border-transparent hover:border-gold-retro/50 cursor-pointer"
              >
                ▶ たたかう
              </button>
            </div>
          </div>
        </div>
      </section>

      {showBattle && <BattleGame onClose={() => setShowBattle(false)} />}
    </>
  );
}
