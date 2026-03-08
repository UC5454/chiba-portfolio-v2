"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { employees } from "@/data/employees";

interface BattleState {
  playerHp: number;
  playerMaxHp: number;
  enemyHp: number;
  enemyMaxHp: number;
  playerMp: number;
  playerMaxMp: number;
  turn: "player" | "enemy" | "result";
  log: string[];
  enemy: (typeof employees)[number];
  isDefending: boolean;
  combo: number;
}

const PLAYER_MAX_HP = 999;
const PLAYER_MAX_MP = 50;

function getEnemyMaxHp(stats: { execution: number; expertise: number }) {
  return 300 + (stats.execution + stats.expertise) * 30;
}

function getPlayerAttack(combo: number) {
  const base = 80 + Math.floor(Math.random() * 40);
  return Math.floor(base * (1 + combo * 0.1));
}

function getEnemyAttack(stats: { analysis: number; creativity: number }) {
  return 30 + Math.floor(Math.random() * 20) + (stats.analysis + stats.creativity) * 4;
}

function getSpecialAttack() {
  return 150 + Math.floor(Math.random() * 100);
}

export default function BattleGame({ onClose }: { onClose: () => void }) {
  const activeEmployees = useMemo(() => employees.filter((e) => e.isActive), []);

  const initBattle = useCallback((): BattleState => {
    const enemy = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
    const enemyMaxHp = getEnemyMaxHp(enemy.stats);
    return {
      playerHp: PLAYER_MAX_HP,
      playerMaxHp: PLAYER_MAX_HP,
      enemyHp: enemyMaxHp,
      enemyMaxHp,
      playerMp: PLAYER_MAX_MP,
      playerMaxMp: PLAYER_MAX_MP,
      turn: "player",
      log: [`${enemy.name}（${enemy.role}）が あらわれた！`],
      enemy,
      isDefending: false,
      combo: 0,
    };
  }, [activeEmployees]);

  const [state, setState] = useState<BattleState>(initBattle);

  const doEnemyTurn = useCallback((prev: BattleState): BattleState => {
    const dmg = getEnemyAttack(prev.enemy.stats);
    const actualDmg = prev.isDefending ? Math.floor(dmg * 0.3) : dmg;
    const newHp = Math.max(0, prev.playerHp - actualDmg);
    const blockText = prev.isDefending ? "（ぼうぎょ中！）" : "";
    const newLog = [...prev.log, `${prev.enemy.name}のこうげき！ ${actualDmg}のダメージ${blockText}`];

    if (newHp <= 0) {
      return { ...prev, playerHp: 0, log: [...newLog, "ゆうしは たおれた..."], turn: "result", isDefending: false };
    }
    return { ...prev, playerHp: newHp, log: newLog, turn: "player", isDefending: false };
  }, []);

  const handleAttack = () => {
    if (state.turn !== "player") return;
    const dmg = getPlayerAttack(state.combo);
    const newEnemyHp = Math.max(0, state.enemyHp - dmg);
    const newLog = [...state.log, `ゆうしのこうげき！ ${dmg}のダメージ！`];
    const newCombo = state.combo + 1;

    if (newEnemyHp <= 0) {
      setState({
        ...state,
        enemyHp: 0,
        combo: newCombo,
        log: [...newLog, `${state.enemy.name}を たおした！`],
        turn: "result",
      });
      return;
    }
    const afterEnemy = doEnemyTurn({ ...state, enemyHp: newEnemyHp, log: newLog, combo: newCombo, isDefending: false });
    setState(afterEnemy);
  };

  const handleDefend = () => {
    if (state.turn !== "player") return;
    const healMp = Math.min(10, state.playerMaxMp - state.playerMp);
    const newLog = [...state.log, "ゆうしは みをまもっている！ MP少し回復！"];
    const afterEnemy = doEnemyTurn({
      ...state,
      playerMp: state.playerMp + healMp,
      log: newLog,
      isDefending: true,
      combo: 0,
    });
    setState(afterEnemy);
  };

  const handleSpecial = () => {
    if (state.turn !== "player" || state.playerMp < 20) return;
    const dmg = getSpecialAttack();
    const newEnemyHp = Math.max(0, state.enemyHp - dmg);
    const newLog = [...state.log, `ゆうしの「脳革ストライク」！ ${dmg}の大ダメージ！！`];

    if (newEnemyHp <= 0) {
      setState({
        ...state,
        enemyHp: 0,
        playerMp: state.playerMp - 20,
        log: [...newLog, `${state.enemy.name}を たおした！`],
        turn: "result",
        combo: 0,
      });
      return;
    }
    const afterEnemy = doEnemyTurn({
      ...state,
      enemyHp: newEnemyHp,
      playerMp: state.playerMp - 20,
      log: newLog,
      isDefending: false,
      combo: 0,
    });
    setState(afterEnemy);
  };

  const handleNextBattle = () => {
    if (state.playerHp <= 0) {
      setState(initBattle());
    } else {
      const enemy = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
      const enemyMaxHp = getEnemyMaxHp(enemy.stats);
      setState((prev) => ({
        ...prev,
        enemyHp: enemyMaxHp,
        enemyMaxHp,
        enemy,
        turn: "player",
        log: [`${enemy.name}（${enemy.role}）が あらわれた！`],
        isDefending: false,
      }));
    }
  };

  // Auto-scroll log
  useEffect(() => {
    const el = document.getElementById("battle-log");
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.log]);

  const playerHpPct = (state.playerHp / state.playerMaxHp) * 100;
  const enemyHpPct = (state.enemyHp / state.enemyMaxHp) * 100;
  const playerHpColor = playerHpPct > 50 ? "bg-green-500" : playerHpPct > 25 ? "bg-yellow-500" : "bg-red-500";
  const enemyHpColor = enemyHpPct > 50 ? "bg-green-500" : enemyHpPct > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-lg bg-navy-deep border-4 border-gold-retro shadow-pixel-gold">
        {/* Header */}
        <div className="bg-navy-light border-b-2 border-gold-retro/50 px-4 py-2 flex justify-between items-center">
          <span className="font-[family-name:var(--font-pixel)] text-[10px] text-gold-retro">BATTLE</span>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm cursor-pointer">
            ESC
          </button>
        </div>

        {/* Battle Field */}
        <div className="p-4">
          {/* Enemy */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-navy-light border-2 border-white/30 overflow-hidden shrink-0">
              <Image
                src={state.enemy.avatar}
                alt={state.enemy.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-[family-name:var(--font-pixel)] text-[9px] text-white">
                  {state.enemy.name}
                </span>
                <span className="font-[family-name:var(--font-pixel)] text-[8px] text-gray-400">
                  {state.enemy.role}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-800 border border-white/30">
                <div
                  className={`h-full ${enemyHpColor} transition-all duration-300`}
                  style={{ width: `${enemyHpPct}%` }}
                />
              </div>
              <div className="text-right text-[9px] text-gray-400 mt-0.5 font-[family-name:var(--font-pixel)]">
                {state.enemyHp}/{state.enemyMaxHp}
              </div>
            </div>
          </div>

          {/* VS divider */}
          <div className="text-center text-gold-retro font-[family-name:var(--font-pixel)] text-[10px] mb-4">
            - VS -
          </div>

          {/* Player */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-navy-light border-2 border-gold-retro/60 overflow-hidden shrink-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-gold-retro">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-[family-name:var(--font-pixel)] text-[9px] text-gold-retro">ゆうし</span>
                <span className="font-[family-name:var(--font-pixel)] text-[8px] text-gray-400">LV.99</span>
              </div>
              <div className="w-full h-3 bg-gray-800 border border-white/30 mb-1">
                <div
                  className={`h-full ${playerHpColor} transition-all duration-300`}
                  style={{ width: `${playerHpPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-[family-name:var(--font-pixel)]">
                <span className="text-gray-400">HP {state.playerHp}/{state.playerMaxHp}</span>
                <span className="text-blue-400">MP {state.playerMp}/{state.playerMaxMp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div
          id="battle-log"
          className="mx-4 mb-3 h-20 overflow-y-auto bg-black/60 border border-white/20 p-2 text-xs text-gray-300 space-y-1"
        >
          {state.log.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>

        {/* Commands */}
        <div className="p-4 border-t-2 border-gold-retro/30">
          {state.turn === "player" ? (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleAttack}
                className="bg-red-900/80 hover:bg-red-800 border-2 border-red-500/60 text-white font-[family-name:var(--font-pixel)] text-[9px] py-3 px-2 transition-colors cursor-pointer"
              >
                こうげき
              </button>
              <button
                onClick={handleDefend}
                className="bg-blue-900/80 hover:bg-blue-800 border-2 border-blue-500/60 text-white font-[family-name:var(--font-pixel)] text-[9px] py-3 px-2 transition-colors cursor-pointer"
              >
                ぼうぎょ
              </button>
              <button
                onClick={handleSpecial}
                disabled={state.playerMp < 20}
                className="bg-purple-900/80 hover:bg-purple-800 border-2 border-purple-500/60 text-white font-[family-name:var(--font-pixel)] text-[9px] py-3 px-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                とくぎ
                <span className="block text-[7px] text-purple-300 mt-0.5">MP20</span>
              </button>
            </div>
          ) : state.turn === "result" ? (
            <div className="text-center space-y-3">
              <p className="font-[family-name:var(--font-pixel)] text-sm text-gold-retro">
                {state.playerHp > 0 ? "WIN!" : "GAME OVER"}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleNextBattle}
                  className="bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro/60 text-gold-retro font-[family-name:var(--font-pixel)] text-[9px] py-2 px-4 transition-colors cursor-pointer"
                >
                  {state.playerHp > 0 ? "つぎのあいて" : "もういちど"}
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 text-gray-300 font-[family-name:var(--font-pixel)] text-[9px] py-2 px-4 transition-colors cursor-pointer"
                >
                  にげる
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
