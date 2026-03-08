"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { employees } from "@/data/employees";
import { getQuestionsForEmployee, type QuizQuestion } from "@/data/quiz";

type Phase = "intro" | "question" | "judging" | "result";

interface BattleState {
  playerHp: number;
  playerMaxHp: number;
  enemyHp: number;
  enemyMaxHp: number;
  enemy: (typeof employees)[number];
  questions: QuizQuestion[];
  currentQ: number;
  streak: number;
  totalCorrect: number;
  totalAnswered: number;
  phase: Phase;
  log: string[];
  timer: number;
  selectedAnswer: number | null;
  wins: number;
  won: boolean | null; // null = ongoing, true = win, false = lose
}

const PLAYER_MAX_HP = 500;
const TIMER_MAX = 12;
const QUESTIONS_PER_BATTLE = 3;

function getEnemyMaxHp(stats: { execution: number; expertise: number }) {
  return 150 + (stats.execution + stats.expertise) * 15;
}

function getDamage(difficulty: number, streak: number) {
  const base = difficulty * 60 + 20;
  const bonus = Math.min(streak, 5) * 15;
  return base + bonus;
}

function getEnemyDamage(stats: { analysis: number; creativity: number }) {
  return 40 + (stats.analysis + stats.creativity) * 5;
}

function getTimerDamage() {
  return 80;
}

export default function BattleGame({ onClose }: { onClose: () => void }) {
  const activeEmployees = useMemo(() => employees.filter((e) => e.isActive), []);

  const pickEnemy = useCallback(() => {
    return activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
  }, [activeEmployees]);

  const initBattle = useCallback(
    (prevWins = 0, prevHp = PLAYER_MAX_HP): BattleState => {
      const enemy = pickEnemy();
      const questions = getQuestionsForEmployee(enemy.specialties, QUESTIONS_PER_BATTLE);
      return {
        playerHp: prevHp,
        playerMaxHp: PLAYER_MAX_HP,
        enemyHp: getEnemyMaxHp(enemy.stats),
        enemyMaxHp: getEnemyMaxHp(enemy.stats),
        enemy,
        questions,
        currentQ: 0,
        streak: 0,
        totalCorrect: 0,
        totalAnswered: 0,
        phase: "intro",
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
  const [playerAnim, setPlayerAnim] = useState("");
  const [flashText, setFlashText] = useState<{ text: string; color: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Flash damage/heal text
  const showFlash = (text: string, color: string) => {
    setFlashText({ text, color });
    setTimeout(() => setFlashText(null), 800);
  };

  // Animate sprites
  const animateEnemy = (anim: string) => {
    setEnemyAnim(anim);
    setTimeout(() => setEnemyAnim(""), 500);
  };
  const animatePlayer = (anim: string) => {
    setPlayerAnim(anim);
    setTimeout(() => setPlayerAnim(""), 500);
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
          return prev; // will be handled by timeout effect
        }
        return { ...prev, timer: next };
      });
    }, 1000);
  }, []);

  // Handle timeout
  useEffect(() => {
    if (state.phase === "question" && state.timer <= 0) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timer, state.phase]);

  // Start intro -> question transition
  useEffect(() => {
    if (state.phase === "intro") {
      const t = setTimeout(() => {
        setState((prev) => ({ ...prev, phase: "question" }));
        startTimer();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [state.phase, startTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Focus the game container when opened for keyboard control.
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const dmg = getTimerDamage();
    animatePlayer("shake");
    showFlash(`TIME UP! -${dmg}`, "text-red-400");

    setState((prev) => {
      const newHp = Math.max(0, prev.playerHp - dmg);
      const newLog = [...prev.log, `時間切れ！ ${dmg}のダメージ！`];
      const nextQ = prev.currentQ + 1;

      if (newHp <= 0) {
        return { ...prev, playerHp: 0, log: [...newLog, "ゆうしは たおれた..."], phase: "result", streak: 0, won: false };
      }
      if (nextQ >= prev.questions.length) {
        return {
          ...prev,
          playerHp: newHp,
          log: [...newLog, `${prev.enemy.name}に 知識で負けた...`],
          phase: "result",
          streak: 0,
          won: false,
        };
      }
      return { ...prev, playerHp: newHp, log: newLog, currentQ: nextQ, timer: TIMER_MAX, streak: 0 };
    });

    // Restart timer for next question
    setTimeout(() => startTimer(), 300);
  };

  const handleAnswer = (idx: number) => {
    if (state.phase !== "question" || state.selectedAnswer !== null) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const q = state.questions[state.currentQ];
    const correct = idx === q.answer;

    setState((prev) => ({ ...prev, selectedAnswer: idx, phase: "judging" }));

    if (correct) {
      const dmg = getDamage(q.difficulty, state.streak);
      animateEnemy("shake");
      showFlash(`正解！ ${dmg}DMG`, "text-green-400");

      setTimeout(() => {
        setState((prev) => {
          const newEnemyHp = Math.max(0, prev.enemyHp - dmg);
          const newStreak = prev.streak + 1;
          const newLog = [
            ...prev.log,
            `正解！ ${prev.enemy.name}に ${dmg}のダメージ！${newStreak >= 2 ? ` (${newStreak}連続!)` : ""}`,
          ];

          if (newEnemyHp <= 0) {
            return {
              ...prev,
              enemyHp: 0,
              streak: newStreak,
              totalCorrect: prev.totalCorrect + 1,
              totalAnswered: prev.totalAnswered + 1,
              log: [...newLog, `${prev.enemy.name}を 知識で打ち負かした！`],
              phase: "result",
              selectedAnswer: null,
              wins: prev.wins + 1,
              won: true,
            };
          }

          const nextQ = prev.currentQ + 1;
          if (nextQ >= prev.questions.length) {
            // Answered all questions but enemy still alive = LOSE
            const surviveLog = [...newLog, `${prev.enemy.name}は まだ立っている… 知恵比べに敗北！`];
            return {
              ...prev,
              enemyHp: newEnemyHp,
              streak: newStreak,
              totalCorrect: prev.totalCorrect + 1,
              totalAnswered: prev.totalAnswered + 1,
              log: surviveLog,
              phase: "result",
              selectedAnswer: null,
              won: false,
            };
          }

          return {
            ...prev,
            enemyHp: newEnemyHp,
            streak: newStreak,
            totalCorrect: prev.totalCorrect + 1,
            totalAnswered: prev.totalAnswered + 1,
            currentQ: nextQ,
            phase: "question",
            selectedAnswer: null,
            timer: TIMER_MAX,
          };
        });
        startTimer();
      }, 800);
    } else {
      const dmg = getEnemyDamage(state.enemy.stats);
      animatePlayer("shake");
      showFlash(`不正解… -${dmg}`, "text-red-400");

      setTimeout(() => {
        setState((prev) => {
          const newHp = Math.max(0, prev.playerHp - dmg);
          const correctText = prev.questions[prev.currentQ].choices[prev.questions[prev.currentQ].answer];
          const newLog = [
            ...prev.log,
            `不正解！ 正解は「${correctText}」`,
            `${prev.enemy.name}の反撃！ ${dmg}のダメージ！`,
          ];

          if (newHp <= 0) {
            return {
              ...prev,
              playerHp: 0,
              streak: 0,
              totalAnswered: prev.totalAnswered + 1,
              log: [...newLog, "ゆうしは たおれた..."],
              phase: "result",
              selectedAnswer: null,
              won: false,
            };
          }

          const nextQ = prev.currentQ + 1;
          if (nextQ >= prev.questions.length) {
            // All questions done, enemy still alive = LOSE
            return {
              ...prev,
              playerHp: newHp,
              streak: 0,
              totalAnswered: prev.totalAnswered + 1,
              log: [...newLog, `${prev.enemy.name}は まだ立っている… 知恵比べに敗北！`],
              phase: "result",
              selectedAnswer: null,
              won: false,
            };
          }

          return {
            ...prev,
            playerHp: newHp,
            streak: 0,
            totalAnswered: prev.totalAnswered + 1,
            currentQ: nextQ,
            phase: "question",
            selectedAnswer: null,
            timer: TIMER_MAX,
          };
        });
        startTimer();
      }, 1200);
    }
  };

  const handleNext = () => {
    if (state.won) {
      setState(initBattle(state.wins, state.playerHp));
    } else {
      setState(initBattle());
    }
  };

  // Auto-scroll log
  useEffect(() => {
    const el = document.getElementById("battle-log");
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.log]);

  const playerHpPct = (state.playerHp / state.playerMaxHp) * 100;
  const enemyHpPct = (state.enemyHp / state.enemyMaxHp) * 100;
  const hpColor = (pct: number) => (pct > 50 ? "bg-green-500" : pct > 25 ? "bg-yellow-500" : "bg-red-500");
  const currentQuestion = state.questions[state.currentQ];
  const timerPct = (state.timer / TIMER_MAX) * 100;
  const timerColor = state.timer > 5 ? "bg-blue-500" : state.timer > 3 ? "bg-yellow-500" : "bg-red-500";
  const isWin = state.phase === "result" && state.won === true;
  const isGameOver = state.phase === "result" && state.won === false;

  return (
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
      <div className="w-full max-w-lg bg-navy-deep border-4 border-gold-retro shadow-pixel-gold overflow-hidden">
        {/* Header */}
        <div className="bg-navy-light border-b-2 border-gold-retro/50 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-gold-retro">BRAIN BATTLE</span>
            {state.wins > 0 && (
              <span className="font-[family-name:var(--font-pixel)] text-[8px] text-green-400">
                {state.wins} WIN{state.wins > 1 ? "S" : ""}
              </span>
            )}
          </div>
          <button onClick={onClose} aria-label="バトルを閉じる" className="text-gray-400 hover:text-white text-sm cursor-pointer">
            ESC
          </button>
        </div>

        {/* Battle Field */}
        <div className="p-3 sm:p-4 relative">
          {/* Flash text overlay */}
          {flashText && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <span
                className={`font-[family-name:var(--font-pixel)] text-lg sm:text-xl ${flashText.color} drop-shadow-[2px_2px_0_rgba(0,0,0,1)] animate-bounce`}
              >
                {flashText.text}
              </span>
            </div>
          )}

          {/* Enemy */}
          <div className={`flex items-center gap-3 mb-4 transition-transform ${enemyAnim === "shake" ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy-light border-2 border-white/30 overflow-hidden shrink-0 relative">
              <Image
                src={state.enemy.avatar}
                alt={state.enemy.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
              {state.phase === "intro" && (
                <div className="absolute inset-0 bg-white/80 animate-[fadeOut_1s_forwards]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-[family-name:var(--font-pixel)] text-[9px] text-white truncate">
                  {state.enemy.name}
                </span>
                <span className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-400 shrink-0 ml-2">
                  {state.enemy.role}
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-800 border border-white/30">
                <div
                  className={`h-full ${hpColor(enemyHpPct)} transition-all duration-500`}
                  style={{ width: `${enemyHpPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[7px] text-gray-500 font-[family-name:var(--font-pixel)]">
                  得意: {state.enemy.specialties[0]}
                </span>
                <span className="text-[8px] text-gray-400 font-[family-name:var(--font-pixel)]">
                  {state.enemyHp}/{state.enemyMaxHp}
                </span>
              </div>
            </div>
          </div>

          {/* Player */}
          <div className={`flex items-center gap-3 mb-3 transition-transform ${playerAnim === "shake" ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy-light border-2 border-gold-retro/60 overflow-hidden shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-gold-retro">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro">ゆうし</span>
                <span className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-400">LV.99</span>
              </div>
              <div className="w-full h-2.5 bg-gray-800 border border-white/30">
                <div
                  className={`h-full ${hpColor(playerHpPct)} transition-all duration-500`}
                  style={{ width: `${playerHpPct}%` }}
                />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[8px] text-gray-400 font-[family-name:var(--font-pixel)]">
                  HP {state.playerHp}/{state.playerMaxHp}
                </span>
                {state.streak >= 2 && (
                  <span className="text-[8px] text-orange-400 font-[family-name:var(--font-pixel)] animate-pulse">
                    {state.streak}連続正解!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Question / Intro / Result Area */}
        <div className="px-3 sm:px-4 pb-3">
          {state.phase === "intro" && (
            <div className="bg-black/60 border border-gold-retro/30 p-4 text-center">
              <p className="font-[family-name:var(--font-pixel)] text-[10px] text-gold-retro animate-pulse">
                {state.enemy.name}（{state.enemy.role}）が しょうぶを しかけてきた！
              </p>
              <p className="text-[9px] text-gray-400 mt-2 font-[family-name:var(--font-pixel)]">
                得意分野: {state.enemy.specialties.join(" / ")}
              </p>
            </div>
          )}

          {(state.phase === "question" || state.phase === "judging") && currentQuestion && (
            <>
              {/* Timer bar */}
              <div className="w-full h-2 bg-gray-800 border border-white/20 mb-3">
                <div
                  className={`h-full ${timerColor} transition-all duration-1000 ease-linear`}
                  style={{ width: `${timerPct}%` }}
                />
              </div>

              {/* Category & Question */}
              <div className="bg-black/60 border border-white/20 p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-[family-name:var(--font-pixel)] text-[7px] text-blue-sky">
                    {currentQuestion.category}
                  </span>
                  <span className="font-[family-name:var(--font-pixel)] text-[7px] text-gray-500">
                    Q{state.currentQ + 1}/{state.questions.length}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white">{currentQuestion.question}</p>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-1 gap-2">
                {currentQuestion.choices.map((choice, i) => {
                  const isSelected = state.selectedAnswer === i;
                  const isCorrect = i === currentQuestion.answer;
                  const isJudging = state.phase === "judging";

                  let btnClass = "bg-navy-light border-2 border-white/20 hover:border-gold-retro/60 hover:bg-navy-light/80 text-white";
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
                      className={`${btnClass} p-3 min-h-[44px] text-left text-sm transition-all duration-200 cursor-pointer disabled:cursor-default flex items-center gap-2`}
                    >
                      <span className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro/60 shrink-0">
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
            <div className="bg-black/60 border border-gold-retro/30 p-4">
              {/* Result header */}
              <div className="text-center mb-4">
                <p
                  className={`font-[family-name:var(--font-pixel)] text-base sm:text-lg ${isWin ? "text-gold-retro" : "text-red-400"} ${isWin ? "animate-bounce" : ""}`}
                >
                  {isGameOver ? "GAME OVER" : "WIN!"}
                </p>
                {isWin && (
                  <p className="font-[family-name:var(--font-pixel)] text-[8px] text-gray-400 mt-1">
                    正答率: {state.totalCorrect}/{state.totalAnswered} | 連勝: {state.wins}
                  </p>
                )}
              </div>

              {/* Battle log (scrollable) */}
              <div
                id="battle-log"
                className="h-16 overflow-y-auto bg-black/40 border border-white/10 p-2 mb-4 text-[11px] text-gray-300 space-y-0.5"
              >
                {state.log.map((msg, i) => (
                  <p key={i}>{msg}</p>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleNext}
                  className="bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro/60 text-gold-retro font-[family-name:var(--font-pixel)] text-[9px] py-2 px-4 transition-colors cursor-pointer"
                >
                  {isGameOver ? "もういちど" : "つぎのあいて"}
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 text-gray-300 font-[family-name:var(--font-pixel)] text-[9px] py-2 px-4 transition-colors cursor-pointer"
                >
                  にげる
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
