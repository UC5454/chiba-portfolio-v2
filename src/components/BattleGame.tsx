"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { employees } from "@/data/employees";
import { getQuestionsForEmployee, type QuizQuestion } from "@/data/quiz";

type Phase = "battle-start" | "intro" | "question" | "judging" | "result";

interface BattleState {
  enemy: (typeof employees)[number];
  questions: QuizQuestion[];
  currentQ: number;
  streak: number;
  phase: Phase;
  log: string[];
  timer: number;
  selectedAnswer: number | null;
  wins: number;
  won: boolean | null;
}

const TIMER_MAX = 12;
const QUESTIONS_PER_BATTLE = 3;

export default function BattleGame({ onClose }: { onClose: () => void }) {
  const activeEmployees = useMemo(() => employees.filter((e) => e.isActive), []);

  const pickEnemy = useCallback(() => {
    return activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
  }, [activeEmployees]);

  const initBattle = useCallback(
    (prevWins = 0): BattleState => {
      const enemy = pickEnemy();
      const questions = getQuestionsForEmployee(enemy.specialties, QUESTIONS_PER_BATTLE);
      return {
        enemy,
        questions,
        currentQ: 0,
        streak: 0,
        phase: "battle-start",
        log: [],
        timer: TIMER_MAX,
        selectedAnswer: null,
        wins: prevWins,
        won: null,
      };
    },
    [pickEnemy]
  );

  const [state, setState] = useState<BattleState>(() => initBattle());
  const [enemyAnim, setEnemyAnim] = useState("");
  const [screenEffect, setScreenEffect] = useState<string>("");
  const [flashText, setFlashText] = useState<{ text: string; color: string } | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Screen effects
  const triggerScreenEffect = (effect: string, duration = 500) => {
    setScreenEffect(effect);
    setTimeout(() => setScreenEffect(""), duration);
  };

  // Flash damage/heal text
  const showFlash = (text: string, color: string) => {
    setFlashText({ text, color });
    setTimeout(() => setFlashText(null), 900);
  };

  // Animate enemy sprite
  const animateEnemy = (anim: string) => {
    setEnemyAnim(anim);
    setTimeout(() => setEnemyAnim(""), 500);
  };

  // Victory sparkles
  const triggerSparkles = () => {
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.8,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 3000);
  };

  // Start question timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState((prev) => ({ ...prev, timer: TIMER_MAX }));
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== "question") return prev;
        const next = prev.timer - 1;
        if (next <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        return { ...prev, timer: next };
      });
    }, 1000);
  }, []);

  // Handle timeout - instant loss
  useEffect(() => {
    if (state.phase === "question" && state.timer <= 0) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timer, state.phase]);

  // Battle start flash -> intro transition
  useEffect(() => {
    if (state.phase === "battle-start") {
      triggerScreenEffect("battle-start-flash", 1200);
      const t = setTimeout(() => {
        setState((prev) => ({ ...prev, phase: "intro" }));
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [state.phase]);

  // Intro -> question transition
  useEffect(() => {
    if (state.phase === "intro") {
      const t = setTimeout(() => {
        setState((prev) => ({ ...prev, phase: "question" }));
        startTimer();
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [state.phase, startTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Focus container
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    triggerScreenEffect("screen-shake-red", 600);
    showFlash("じかんぎれ！", "text-red-400");

    setState((prev) => {
          const newLog = [...prev.log, "時間切れ！ まけてしまった..."];
      return {
        ...prev,
        log: newLog,
        phase: "result",
        streak: 0,
        won: false,
      };
    });
  };

  const handleAnswer = (idx: number) => {
    if (state.phase !== "question" || state.selectedAnswer !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const q = state.questions[state.currentQ];
    const correct = idx === q.answer;

    setState((prev) => ({ ...prev, selectedAnswer: idx, phase: "judging" }));

    if (correct) {
      animateEnemy("shake");
      triggerScreenEffect("screen-flash-green", 400);
      showFlash("正解！", "text-green-400");

      setTimeout(() => {
        setState((prev) => {
          const newStreak = prev.streak + 1;
          const newLog = [
            ...prev.log,
            `正解！ ${prev.enemy.name}に ダメージ！${newStreak >= 2 ? ` (${newStreak}連続!)` : ""}`,
          ];

          // 3 consecutive correct = WIN
          if (newStreak >= QUESTIONS_PER_BATTLE) {
            return {
              ...prev,
              streak: newStreak,
              log: [...newLog, `${QUESTIONS_PER_BATTLE}連続正解！ ${prev.enemy.name}を 知識で打ち負かした！`],
              phase: "result",
              selectedAnswer: null,
              wins: prev.wins + 1,
              won: true,
            };
          }

          return {
            ...prev,
            streak: newStreak,
            currentQ: prev.currentQ + 1,
            phase: "question",
            selectedAnswer: null,
            timer: TIMER_MAX,
          };
        });
        startTimer();
      }, 900);
    } else {
      triggerScreenEffect("screen-shake-red", 600);
      showFlash("不正解...", "text-red-400");

      setTimeout(() => {
        setState((prev) => {
          const correctText = prev.questions[prev.currentQ].choices[prev.questions[prev.currentQ].answer];
          const newLog = [
            ...prev.log,
            `不正解！ 正解は「${correctText}」`,
            "まけてしまった...",
          ];

          return {
            ...prev,
            streak: 0,
            log: newLog,
            phase: "result",
            selectedAnswer: null,
            won: false,
          };
        });
      }, 1200);
    }
  };

  const handleNext = () => {
    if (state.won) {
      setState(initBattle(state.wins));
    } else {
      setState(initBattle());
    }
  };

  // Trigger sparkles on win
  useEffect(() => {
    if (state.phase === "result" && state.won === true) {
      triggerSparkles();
    }
  }, [state.phase, state.won]);

  // Auto-scroll log
  useEffect(() => {
    const el = document.getElementById("battle-log");
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.log]);

  const currentQuestion = state.questions[state.currentQ];
  const timerPct = (state.timer / TIMER_MAX) * 100;
  const timerColor = state.timer > 5 ? "bg-blue-500" : state.timer > 3 ? "bg-yellow-500" : "bg-red-500";
  const isWin = state.phase === "result" && state.won === true;
  const isGameOver = state.phase === "result" && state.won === false;

  // Progress dots for streak
  const progressDots = Array.from({ length: QUESTIONS_PER_BATTLE }, (_, i) => {
    if (i < state.streak) return "correct";
    if (i === state.streak && state.phase === "question") return "current";
    return "empty";
  });

  // Screen effect class
  const screenEffectClass = (() => {
    switch (screenEffect) {
      case "battle-start-flash": return "animate-[battleStartFlash_1.2s_ease-out_forwards]";
      case "screen-flash-green": return "animate-[greenPulse_0.4s_ease-out]";
      case "screen-shake-red": return "animate-[redShake_0.6s_ease-in-out]";
      default: return "";
    }
  })();

  return (
    <>
      {/* Inline keyframes for battle effects */}
      <style jsx global>{`
        @keyframes battleStartFlash {
          0% { opacity: 1; }
          50% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        @keyframes battleStartShake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-6px, -4px); }
          20% { transform: translate(5px, 3px); }
          30% { transform: translate(-4px, 5px); }
          40% { transform: translate(6px, -3px); }
          50% { transform: translate(-3px, 4px); }
          60% { transform: translate(4px, -5px); }
          70% { transform: translate(-5px, 2px); }
          80% { transform: translate(3px, -2px); }
          90% { transform: translate(-2px, 3px); }
        }
        @keyframes greenPulse {
          0% { box-shadow: inset 0 0 0 0 rgba(34, 197, 94, 0); }
          30% { box-shadow: inset 0 0 60px 20px rgba(34, 197, 94, 0.3); }
          100% { box-shadow: inset 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        @keyframes redShake {
          0%, 100% { transform: translateX(0); box-shadow: inset 0 0 0 0 rgba(239, 68, 68, 0); }
          10% { transform: translateX(-8px); box-shadow: inset 0 0 40px 10px rgba(239, 68, 68, 0.25); }
          20% { transform: translateX(6px); }
          30% { transform: translateX(-6px); box-shadow: inset 0 0 30px 8px rgba(239, 68, 68, 0.15); }
          40% { transform: translateX(4px); }
          50% { transform: translateX(-4px); }
          60% { transform: translateX(3px); box-shadow: inset 0 0 20px 5px rgba(239, 68, 68, 0.1); }
          70% { transform: translateX(-2px); }
          80% { transform: translateX(1px); }
        }
        @keyframes sparkleFloat {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          20% { opacity: 1; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) scale(0.3); }
        }
        @keyframes victoryPulse {
          0%, 100% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
          50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.4); }
        }
        @keyframes gameOverDim {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes gameOverText {
          0% { opacity: 0; transform: scale(2); }
          50% { opacity: 1; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes tapPulse {
          0% { transform: scale(1); }
          50% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        @keyframes streakGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
          50% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.6); }
        }
      `}</style>

      <div
        ref={containerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onClose();
          }
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4 outline-none"
      >
        {/* Battle Start Flash Overlay */}
        {state.phase === "battle-start" && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white animate-[battleStartFlash_1.2s_ease-out_forwards]">
            <div className="text-center">
              <p className="font-[family-name:var(--font-pixel)] text-2xl sm:text-4xl text-navy-deep animate-pulse">
                バトル開始！
              </p>
            </div>
          </div>
        )}

        {/* Main Container */}
        <div
          className={`w-full max-w-2xl bg-navy-deep border-4 border-gold-retro shadow-pixel-gold overflow-hidden ${
            state.phase === "battle-start" ? "animate-[battleStartShake_0.8s_ease-in-out]" : ""
          } ${screenEffectClass}`}
        >
          {/* Header */}
          <div className="bg-navy-light border-b-2 border-gold-retro/50 px-4 sm:px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-gold-retro">
                ちしきバトル
              </span>
              {state.wins > 0 && (
                <span className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[10px] text-green-400">
                  {state.wins}れんしょう
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="バトルを閉じる"
              className="text-gray-400 hover:text-white text-sm px-2 py-1 cursor-pointer min-h-[48px] flex items-center"
            >
              とじる
            </button>
          </div>

          {/* Battle Field */}
          <div className="p-4 sm:p-6 relative">
            {/* Flash text overlay */}
            {flashText && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <span
                  className={`font-[family-name:var(--font-pixel)] text-xl sm:text-2xl ${flashText.color} drop-shadow-[2px_2px_0_rgba(0,0,0,1)] animate-bounce`}
                >
                  {flashText.text}
                </span>
              </div>
            )}

            {/* Victory sparkles */}
            {sparkles.length > 0 && (
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                {sparkles.map((s) => (
                  <div
                    key={s.id}
                    className="absolute text-gold-retro"
                    style={{
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      animation: `sparkleFloat 2s ease-out ${s.delay}s both`,
                      fontSize: `${12 + Math.random() * 16}px`,
                    }}
                  >
                    ✦
                  </div>
                ))}
              </div>
            )}

            {/* Enemy */}
            <div
              className={`flex items-center gap-4 mb-5 transition-transform ${
                enemyAnim === "shake" ? "animate-[shake_0.4s_ease-in-out]" : ""
              }`}
            >
              <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] bg-navy-light border-2 border-white/30 overflow-hidden shrink-0 relative">
                <Image
                  src={state.enemy.avatar}
                  alt={state.enemy.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
                {state.phase === "intro" && (
                  <div className="absolute inset-0 bg-white/80 animate-[fadeOut_1s_forwards]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-white truncate">
                    {state.enemy.name}
                  </span>
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-gray-400 shrink-0 ml-2">
                    {state.enemy.role}
                  </span>
                </div>
                {/* Progress dots instead of HP bar */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-[family-name:var(--font-pixel)] text-[7px] sm:text-[8px] text-gray-500">
                    得意: {state.enemy.specialties[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Streak Progress */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {progressDots.map((dot, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] transition-all duration-300 ${
                      dot === "correct"
                        ? "bg-green-500/30 border-green-400 text-green-300 animate-[streakGlow_1.5s_ease-in-out_infinite]"
                        : dot === "current"
                        ? "bg-gold-retro/20 border-gold-retro text-gold-retro animate-pulse"
                        : "bg-gray-800/50 border-gray-600 text-gray-600"
                    }`}
                  >
                    {dot === "correct" ? "○" : i + 1}
                  </div>
                  {i < QUESTIONS_PER_BATTLE - 1 && (
                    <div
                      className={`w-4 sm:w-6 h-0.5 ${
                        i < state.streak ? "bg-green-400" : "bg-gray-700"
                      } transition-colors duration-300`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Player indicator */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy-light border-2 border-gold-retro/60 overflow-hidden shrink-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-gold-retro">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-gold-retro">ゆうし</span>
                <span className="font-[family-name:var(--font-pixel)] text-[7px] sm:text-[8px] text-gray-400">レベル99</span>
                {state.streak >= 2 && (
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-orange-400 animate-pulse ml-2">
                    {state.streak}連続正解!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Question / Intro / Result Area */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            {state.phase === "intro" && (
              <div className="bg-black/60 border border-gold-retro/30 p-5 sm:p-6 text-center">
                <p className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-gold-retro animate-pulse">
                  {state.enemy.name}（{state.enemy.role}）が しょうぶを しかけてきた！
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-400 mt-3 font-[family-name:var(--font-pixel)]">
                  得意分野: {state.enemy.specialties.join(" / ")}
                </p>
                <p className="text-[8px] sm:text-[9px] text-blue-sky mt-2 font-[family-name:var(--font-pixel)]">
                  {QUESTIONS_PER_BATTLE}問連続正解で勝利！ 間違えたら即敗北！
                </p>
              </div>
            )}

            {(state.phase === "question" || state.phase === "judging") && currentQuestion && (
              <>
                {/* Timer bar */}
                <div className="w-full h-3 bg-gray-800 border border-white/20 mb-4">
                  <div
                    className={`h-full ${timerColor} transition-all duration-1000 ease-linear`}
                    style={{ width: `${timerPct}%` }}
                  />
                </div>

                {/* Category & Question */}
                <div className="bg-black/60 border border-white/20 p-4 sm:p-5 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-blue-sky">
                      {currentQuestion.category}
                    </span>
                    <span className="font-[family-name:var(--font-pixel)] text-[8px] sm:text-[9px] text-gray-500">
                      第{state.currentQ + 1}問 / 全{state.questions.length}問
                    </span>
                  </div>
                  <p className="text-base sm:text-lg leading-relaxed text-white">{currentQuestion.question}</p>
                </div>

                {/* Choices */}
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.choices.map((choice, i) => {
                    const isSelected = state.selectedAnswer === i;
                    const isCorrect = i === currentQuestion.answer;
                    const isJudging = state.phase === "judging";

                    let btnClass = "bg-navy-light border-2 border-white/20 hover:border-gold-retro/60 hover:bg-navy-light/80 text-white active:animate-[tapPulse_0.15s_ease-in-out]";
                    if (isJudging && isSelected && isCorrect) {
                      btnClass = "bg-green-900/60 border-2 border-green-400 text-green-300";
                    } else if (isJudging && isSelected && !isCorrect) {
                      btnClass = "bg-red-900/60 border-2 border-red-400 text-red-300";
                    } else if (isJudging && isCorrect) {
                      btnClass = "bg-green-900/30 border-2 border-green-400/50 text-green-400/70";
                    } else if (isJudging) {
                      btnClass = "bg-navy-light/50 border-2 border-white/10 text-gray-500";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={state.phase === "judging"}
                        className={`${btnClass} p-4 min-h-[52px] text-left text-sm sm:text-base transition-all duration-200 cursor-pointer disabled:cursor-default flex items-center gap-3 w-full active:scale-95`}
                      >
                        <span className="font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs text-gold-retro/60 shrink-0">
                          {["A", "B", "C", "D"][i]}
                        </span>
                        <span>{choice}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {state.phase === "result" && (
              <div className="bg-black/60 border border-gold-retro/30 p-5 sm:p-6 relative overflow-hidden">
                {/* Game Over dim overlay */}
                {isGameOver && (
                  <div className="absolute inset-0 bg-black/40 animate-[gameOverDim_0.5s_ease-out_forwards] z-10" />
                )}

                {/* Result header */}
                <div className="text-center mb-5 relative z-20">
                  {isWin ? (
                    <>
                      <p
                        className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl text-gold-retro animate-[victoryPulse_1.5s_ease-in-out_infinite]"
                      >
                        しょうり！
                      </p>
                      <p className="font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] text-gray-400 mt-2">
                        {QUESTIONS_PER_BATTLE}問連続正解！ | れんしょう: {state.wins}
                      </p>
                    </>
                  ) : (
                    <p
                      className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl text-red-400 animate-[gameOverText_0.6s_ease-out_forwards]"
                    >
                      まけてしまった
                    </p>
                  )}
                </div>

                {/* Battle log */}
                <div
                  id="battle-log"
                  className="h-20 overflow-y-auto bg-black/40 border border-white/10 p-3 mb-5 text-xs sm:text-sm text-gray-300 space-y-1 relative z-20"
                >
                  {state.log.map((msg, i) => (
                    <p key={i}>{msg}</p>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 justify-center relative z-20">
                  <button
                    onClick={handleNext}
                    className="bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro/60 text-gold-retro font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] py-3 px-5 sm:px-6 transition-colors cursor-pointer min-h-[48px] active:animate-[tapPulse_0.15s_ease-in-out] active:scale-95"
                  >
                    {isGameOver ? "もういちど" : "つぎのあいて"}
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 text-gray-300 font-[family-name:var(--font-pixel)] text-[9px] sm:text-[10px] py-3 px-5 sm:px-6 transition-colors cursor-pointer min-h-[48px] active:animate-[tapPulse_0.15s_ease-in-out] active:scale-95"
                  >
                    にげる
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
