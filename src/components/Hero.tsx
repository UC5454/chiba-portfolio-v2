"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const BattleGame = dynamic(() => import("./BattleGame"), { ssr: false });

export default function Hero() {
  const [showBattle, setShowBattle] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const router = useRouter();

  const handleCommand = useCallback((cmd: string) => {
    if (cmd === "tatakau") {
      setShowFlash(true);
      setTimeout(() => {
        setShowFlash(false);
        setShowBattle(true);
      }, 500);
    } else if (cmd === "hanasu") {
      router.push("/contact");
    } else if (cmd === "shiru") {
      router.push("/about");
    }
  }, [router]);

  return (
    <>
      <section className="relative min-h-[100svh] flex flex-col justify-center items-center pt-16 pb-8 overflow-hidden">
        {/* Background Map Effect */}
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/bg-game-world.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-navy-deep/50" />

        {showFlash && (
          <div className="fixed inset-0 z-50 bg-white animate-[flashOut_0.5s_ease-out_forwards]" />
        )}

        <div className="container mx-auto px-4 z-10 relative flex flex-col items-center">
          {/* Main Title */}
          <div className="text-center mb-4 sm:mb-8 animate-float">
            <p className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] md:text-sm mb-4 tracking-widest">
              ぼうけん かいし...
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-2">
              あなたの会社にも、
              <br className="md:hidden" />
              AI社員を。
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-sky font-bold drop-shadow-md">
              AIで可能性を無限大にする
            </p>
          </div>

          {/* Character Sprite */}
          <div className="mb-4 sm:mb-8 relative group cursor-pointer">
            <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 bg-navy-light border-4 border-white pixel-border flex items-center justify-center overflow-hidden">
              <Image
                src="/images/hero-chiba-new.png"
                alt="千葉勇志"
                width={240}
                height={240}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gold-retro text-black text-xs sm:text-sm px-3 py-1.5 font-bold border-2 border-black">
              レベル99
            </div>
          </div>

          {/* Dialogue Box */}
          <div className="w-full max-w-2xl bg-black/80 border-4 border-white p-4 sm:p-6 rounded-sm shadow-pixel relative">
            <div className="absolute top-0 left-0 w-full h-full border-2 border-gray-500 pointer-events-none" />
            <h3 className="text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] sm:text-sm mb-2">
              千葉勇志
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
            <div className="bg-black/80 border-4 border-white p-4 sm:p-5 shadow-pixel flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => handleCommand("hanasu")}
                className="flex-1 min-w-[120px] sm:min-w-[140px] text-center font-[family-name:var(--font-pixel)] text-sm sm:text-base text-white hover:text-gold-retro transition-colors px-5 sm:px-8 py-4 sm:py-5 border-2 border-transparent hover:border-gold-retro/50 cursor-pointer hover:bg-white/10"
              >
                ▶ はなす
              </button>
              <button
                onClick={() => handleCommand("shiru")}
                className="flex-1 min-w-[120px] sm:min-w-[140px] text-center font-[family-name:var(--font-pixel)] text-sm sm:text-base text-white hover:text-gold-retro transition-colors px-5 sm:px-8 py-4 sm:py-5 border-2 border-transparent hover:border-gold-retro/50 cursor-pointer hover:bg-white/10"
              >
                ▶ しる
              </button>
              <button
                onClick={() => handleCommand("tatakau")}
                className="flex-1 min-w-[120px] sm:min-w-[140px] text-center font-[family-name:var(--font-pixel)] text-sm sm:text-base text-white hover:text-gold-retro transition-colors px-5 sm:px-8 py-4 sm:py-5 border-2 border-transparent hover:border-gold-retro/50 cursor-pointer hover:bg-white/10"
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
