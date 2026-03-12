# chiba-portfolio 全面修正（フィードバック24件一括対応）

全て実装してください。確認や質問は不要です。
具体的な提案・修正案・コード例まで自主的に出力してください。
完了後 npm run build で成功することを確認してください。

## 絶対に変更しないファイル
- `package.json`（依存関係の追加は不可）
- `src/data/quiz.ts`
- `public/avatars/` 内の画像ファイル
- `src/app/media/` 配下の全ファイル（メディアセクションは修正対象外）
- `src/data/mediaCategories.ts`
- `src/data/mediaCta.ts`
- `src/lib/media.ts`
- `src/types/media.ts`

## 技術スタック
- Next.js 16.1.6 + React 19 + TypeScript
- Tailwind CSS v4（`@theme inline` 構文を使用、tailwind.config.jsは無い）
- フォント: DotGothic16（本文 `var(--font-dotgothic)`）, Press Start 2P（ピクセルテキスト `font-[family-name:var(--font-pixel)]`）
- デザインテーマ: RPGゲーム風ドット絵ポートフォリオ
- カラー: navy-deep(#0a0e2a), navy-light(#1a1f4a), gold-retro(#ffd700), wood系
- 新しいnpmパッケージの追加は不可

## 方針
- **英語を使わず、カタカナ・ひらがな表記**が千葉さんの明確な方針
- RPGゲーム風の世界観は維持しつつ改善
- モバイルファースト

---

## 1. Header - ロゴ画像化（中優先度 #11）

- ファイル: `src/components/Header.tsx`
- 現状: `<h1>` テキストで "Yushi Chiba" と表示
- 変更: `/images/logo-A-retro-game.png` をnext/imageで表示。高さ h-7 md:h-9、width auto。altは"千葉勇志"
- `<div className="w-3 h-3 bg-gold-retro animate-pulse" />` は削除

```tsx
import Image from "next/image";
// ...
<Link href="/" className="flex items-center gap-2">
  <Image src="/images/logo-A-retro-game.png" alt="千葉勇志" height={36} width={180} className="h-7 md:h-9 w-auto" priority />
</Link>
```

## 2. Header - ナビメニュー変更（中優先度 #12）

- ファイル: `src/components/Header.tsx`
- homeNavItems を以下に変更:
```ts
const homeNavItems: NavItem[] = [
  { href: "#news", label: "おしらせ" },
  { href: "#status", label: "ステータス" },
  { href: "#party", label: "パーティ" },
  { href: "#strengths", label: "つよさ" },
  { href: "#quests", label: "クエスト" },
  { href: "/media", label: "コラム" },
  { href: "/about", label: "しょうかい" },
  { href: "/contact", label: "はなす" },
];
```
- subpageNavItems を以下に変更:
```ts
const subpageNavItems: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/news", label: "おしらせ" },
  { href: "/employees", label: "パーティ" },
  { href: "/quests", label: "クエスト" },
  { href: "/guilds", label: "ギルド" },
  { href: "/media", label: "コラム" },
  { href: "/about", label: "しょうかい" },
  { href: "/contact", label: "はなす" },
];
```

## 3. Header - モバイルハンバーガー改善（低優先度 #22）

- ファイル: `src/components/Header.tsx`
- ハンバーガーボタンを RPG風に変更: `▶ メニュー` / `✕ とじる` のテキストボタン
- モバイルメニューに slide-down アニメーション追加
- メニュー項目に `▶` カーソルを付ける

## 4. Hero - キャラクタースプライト画像化（中優先度 #13）

- ファイル: `src/components/Hero.tsx`
- 現状: SVG person アイコン
- 変更: `/images/hero-chiba.png` をnext/imageで表示
- サイズを大きくする: `w-36 h-36 md:w-48 md:h-48`
- LV.99バッジはそのまま維持

```tsx
import Image from "next/image";
// ...
<div className="w-36 h-36 md:w-48 md:h-48 bg-navy-light border-4 border-white pixel-border overflow-hidden">
  <Image src="/images/hero-chiba.png" alt="千葉勇志" width={192} height={192} className="w-full h-full object-cover" priority />
</div>
```

## 5. Hero - RPGコマンドメニュー拡大（高優先度 #1）

- ファイル: `src/components/Hero.tsx`
- ボタンを大きくする: padding増加、フォントサイズ拡大
- 各ボタン: `min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-4`
- ホバー時にbg変化も追加: `hover:bg-white/10`

## 6. Hero - 「はなす」動作変更（中優先度 #14）

- ファイル: `src/components/Hero.tsx`
- 現状: `#contact`へスムーススクロール
- 変更: `/contact` ページへ遷移（`window.location.href = "/contact"` またはuseRouterのpush）

## 7. Hero - 「しる」動作変更（中優先度 #15）

- ファイル: `src/components/Hero.tsx`
- 現状: `#status`へスムーススクロール
- 変更: `/about` ページへ遷移

## 8. Hero - 「たたかう」バトル開始エフェクト（高優先度 #2）

- ファイル: `src/components/Hero.tsx`
- 現状: 即座にBattleGameが表示される
- 変更: クリック時に白いフラッシュエフェクト（0.5秒）を表示してからBattleGameを表示
- フラッシュ用のstateを追加:

```tsx
const [showFlash, setShowFlash] = useState(false);

const handleCommand = (cmd: string) => {
  if (cmd === "tatakau") {
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      setShowBattle(true);
    }, 500);
  } else if (cmd === "hanasu") {
    window.location.href = "/contact";
  } else if (cmd === "shiru") {
    window.location.href = "/about";
  }
};
```

フラッシュのJSX:
```tsx
{showFlash && (
  <div className="fixed inset-0 z-50 bg-white animate-[flashOut_0.5s_ease-out_forwards]" />
)}
```

globals.css に追加:
```css
@keyframes flashOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

## 9. Hero - レスポンシブ対応修正（高優先度 #3）

- ファイル: `src/components/Hero.tsx`
- タイトルのフォントサイズをモバイルで調整: `text-2xl sm:text-3xl md:text-5xl lg:text-6xl`
- ダイアログボックスのパディングをモバイルで縮小: `p-4 sm:p-6`
- コマンドメニューのボタンをモバイルで縦並びも検討: `flex-col sm:flex-row`
- 全体のmin-heightをビューポートに合わせる

## 10. バトルゲーム - 勝敗判定ロジック変更（高優先度 #4）

- ファイル: `src/components/BattleGame.tsx`
- 現状: HP制。敵HP0で勝利、それ以外は敗北
- 変更: **3問連続正解で勝利、1問でも間違えたら敗北**
- HP表示は残してよいが、勝敗判定はstreakベースに変更:
  - `QUESTIONS_PER_BATTLE = 3` は維持
  - 3問全て正解 → WIN
  - 1問でも不正解 or タイムアウト → GAME OVER（即終了）
- ダメージ計算は演出用に残す（敵HPバーが減る演出）

判定ロジック:
```ts
// 正解時
const newStreak = prev.streak + 1;
if (newStreak >= 3) {
  // 3連続正解 = WIN
  return { ...prev, phase: "result", won: true, streak: newStreak, wins: prev.wins + 1 };
}
// 次の問題へ

// 不正解時 or タイムアウト時
// 即 GAME OVER
return { ...prev, phase: "result", won: false };
```

## 11. バトルゲーム - 画面拡大（高優先度 #2）

- ファイル: `src/components/BattleGame.tsx`
- `max-w-lg` → `max-w-2xl`
- 質問テキスト: `text-sm` → `text-base sm:text-lg`
- 選択肢ボタン: `p-3 min-h-[44px]` → `p-4 min-h-[52px]`
- 敵アバター: `w-14 h-14 sm:w-16 sm:h-16` → `w-18 h-18 sm:w-22 sm:h-22`

## 12. バトルゲーム - モバイル操作性改善（高優先度 #5）

- ファイル: `src/components/BattleGame.tsx`
- タップターゲット最小48px
- ボタンのactive状態でscale効果: `active:scale-95`
- 選択肢間のgapを増やす: `gap-2` → `gap-3`
- 全幅ボタン

## 13. News - タグ視認性改善（高優先度 #6）

- ファイル: `src/components/News.tsx`
- タグバッジのスタイルを改善:
  - フォントサイズ: `text-[10px]` → `text-xs`
  - パディング増: `px-2 py-1` → `px-3 py-1.5`
  - ボーダー追加で目立たせる
  - 色をもっと濃く、コントラスト高く

## 14. News - タグカテゴリ表記を日本語化（中優先度 #16）

- ファイル: `src/data/news.ts`
- `type`フィールドを変更:
  - "IMPORTANT" → "じゅうよう"
  - "UPDATE" → "あっぷでーと"
  - "COMMUNITY" → "こみゅにてぃ"

## 15. News - 記事タイトル太字化（中優先度 #17）

- ファイル: `src/components/News.tsx`
- 記事タイトルのクラス: `font-bold` → `text-base font-extrabold`

## 16. Status - 完全リデザイン（高優先度 #7）

- ファイル: `src/components/Status.tsx`
- 全て日本語化。英語は一切使わない
- セクションタイトル: "STATUS / LOCATIONS" → "ステータス"
- locationsデータを以下に変更:

```ts
const locations = [
  { label: "しごと", title: "マルチロール", subtitle: "COO・CAIO・顧問", ... },
  { label: "なかま", title: "25名", subtitle: "AI社員チーム", ... },
  { label: "ギルド", title: "350名超", subtitle: "東北AIコミュニティ", ... },
  { label: "めいせい", title: "50回以上", subtitle: "登壇・セミナー", ... },
];
```

- 各カードのラベルをpixelフォントで表示
- titleを大きく太字で表示
- 末尾に「もっと知る」ボタンを追加（/about へのLink）:

```tsx
import Link from "next/link";
// ...
<div className="text-center mt-8">
  <Link href="/about" className="inline-block bg-gold-retro/20 hover:bg-gold-retro/30 border-2 border-gold-retro text-gold-retro font-[family-name:var(--font-pixel)] text-xs px-6 py-3 transition-colors">
    ▶ もっと知る
  </Link>
</div>
```

## 17. Status - スキルバッジ削除・リデザイン（中優先度 #18）

- ファイル: `src/components/Status.tsx`
- 現状のスキルバッジは使用していない（別コンポーネントかも）
- Statusセクション自体をRPGステータス画面風にリデザインする
- カードにホバーアニメーション追加（bounce or pulse）

## 18. CTA - サブコピー変更（中優先度 #20）

- ファイル: `src/components/CTA.tsx`
- "次の町（未来）へ、共に出発しませんか？" → "次の時代へ、共に出発しませんか？"

## 19. CTA - お問い合わせフォームへのリンク（高優先度 #8）

- ファイル: `src/components/CTA.tsx`
- `<a href="mailto:y.chiba@digital-gorilla.co.jp">` → `<Link href="/contact">`
- next/linkのLinkコンポーネントを使う

## 20. Footer - 全ページ追加・日本語化（中優先度 #21）

- ファイル: `src/components/Footer.tsx`
- セクションヘッダーを日本語化:
  - MENU → メニュー
  - LIBRARY → コラム
  - TEAM → チーム
  - CONTACT → おといあわせ
  - SOCIAL → つながり
- リンクテキストを日本語化:
  - HOME → ホーム
  - QUESTS → クエスト
  - NEWS → おしらせ
  - LIBRARY → コラム
  - AI EMPLOYEES → パーティ
  - GUILDS → ギルド
  - CONTACT → おといあわせ
- メニューセクションに `/about`（しょうかい）を追加
- copyright も日本語化: "© 2026 千葉勇志. All Rights Reserved."

## 21. 社員詳細ページ - とくぎ・じゃくてん追加（中優先度 #19）

- ファイル: `src/data/employees.ts`
- Employee interfaceに追加:
```ts
export interface Employee {
  // ... existing fields
  tokui: string[];   // とくぎ（2-3個）
  jakuten: string[]; // じゃくてん（1-2個）
}
```
- 全社員にデータ追加（キャラ設定に合わせて）:
  - リン: tokui: ["全体俯瞰", "即断即決", "AI運用設計"], jakuten: ["細かい作業"]
  - カイト: tokui: ["高速実装", "デバッグ", "インフラ構築"], jakuten: ["長文説明"]
  - ナギ: tokui: ["UI設計", "色彩感覚", "ユーザー共感"], jakuten: ["スケジュール管理"]
  - ツムギ: tokui: ["ストーリー構成", "読者心理設計", "SEOライティング"], jakuten: ["短納期プレッシャー"]
  - コトハ: tokui: ["一次情報収集", "仮説構築", "データ分析"], jakuten: ["締め切り意識"]
  - レン: tokui: ["品質チェック", "ミス発見", "基準策定"], jakuten: ["柔軟な対応"]
  - ソラ: tokui: ["ビジュアル表現", "色彩設計", "直感力"], jakuten: ["定型作業"]
  - セイラ: tokui: ["検索アルゴリズム理解", "KW設計", "競合分析"], jakuten: ["感性的な判断"]
  - ソウ: tokui: ["進行管理", "品質担保", "チーム調整"], jakuten: ["技術的実装"]
  - タクミ: tokui: ["課題抽出", "導入設計", "ROI試算"], jakuten: ["クリエイティブ"]
  - ツカサ: tokui: ["プロンプト設計", "システム思考", "品質評価"], jakuten: ["雑談"]
  - ミナミ: tokui: ["先回り行動", "情報整理", "スケジュール管理"], jakuten: ["技術的判断"]
  - マコト: tokui: ["人材育成", "組織設計", "面談力"], jakuten: ["技術トレンド"]
  - リツ: tokui: ["数字の正確さ", "予実管理", "コスト最適化"], jakuten: ["対人コミュニケーション"]
  - ミナト: tokui: ["傾聴", "問いかけ", "伴走支援"], jakuten: ["自己主張"]
  - ユウ: tokui: ["構成力", "読みやすさ設計", "要約力"], jakuten: ["ビジュアル"]
  - マサキ: tokui: ["市場分析", "ロードマップ策定", "大局観"], jakuten: ["現場作業"]
  - ハヤテ: tokui: ["ROAS最適化", "配信設計", "PDCA高速化"], jakuten: ["ブランディング"]
  - チヒロ: tokui: ["顧客心理分析", "LTV設計", "CRM運用"], jakuten: ["新規開拓"]
  - イツキ: tokui: ["トレンド把握", "コミュニティ運営", "企画立案"], jakuten: ["データ分析"]
  - ショウ: tokui: ["提案構成", "情報設計", "刺さるポイント発見"], jakuten: ["デザイン"]
  - ヒナ: tokui: ["教材設計", "学習効率最適化", "ナレッジ体系化"], jakuten: ["営業的視点"]
  - アヤ: tokui: ["スライドデザイン", "図解力", "プレゼン演出"], jakuten: ["文章執筆"]
  - ヒカル: tokui: ["映像演出", "ストーリーボード", "感情設計"], jakuten: ["数値分析"]
  - カナデ: tokui: ["編集リズム", "モーション制作", "素材活用"], jakuten: ["企画立案"]
  - カノン: tokui: ["BGM制作", "音響演出", "世界観構築"], jakuten: ["言語化"]

- ファイル: `src/app/employees/[id]/page.tsx`
- PERSONALITYの後に2つのパネルを追加:

```tsx
{/* とくぎ */}
<div className="mt-4 bg-navy-deep/50 border border-green-500/30 p-4">
  <h3 className="font-[family-name:var(--font-pixel)] text-xs text-green-400 mb-3">とくぎ</h3>
  <ul className="space-y-1">
    {member.tokui.map((skill) => (
      <li key={skill} className="text-sm text-green-300">▶ {skill}</li>
    ))}
  </ul>
</div>

{/* じゃくてん */}
<div className="mt-4 bg-navy-deep/50 border border-red-500/30 p-4">
  <h3 className="font-[family-name:var(--font-pixel)] text-xs text-red-400 mb-3">じゃくてん</h3>
  <ul className="space-y-1">
    {member.jakuten.map((weak) => (
      <li key={weak} className="text-sm text-red-300">▶ {weak}</li>
    ))}
  </ul>
</div>
```

- 英語ラベルを日本語化: "STATUS" → "ステータス", "PERSONALITY" → "せいかく"

## 22. 社員詳細 - 戻るリンク修正（低優先度 #23）

- ファイル: `src/app/employees/[id]/page.tsx`
- ページ上部に明確な戻るリンクを追加:

```tsx
<Link href="/employees" className="inline-flex items-center gap-1 text-gold-retro hover:text-white text-sm mb-4 transition-colors">
  ← パーティ一覧にもどる
</Link>
```

## 23. Strengths - カード炎エフェクト（低優先度 #24）

- ファイル: `src/components/Strengths.tsx`
- ホバー時に炎のようなグローエフェクトを追加
- CSSのbox-shadow animationを使用:

```tsx
<div className="... hover:shadow-[0_0_20px_rgba(255,100,0,0.5),0_0_40px_rgba(255,50,0,0.3)] transition-shadow duration-500">
```

- globals.cssにkeyframesは不要、Tailwindのhover:shadow で実装可能

## 24. Quests - 日本語化（低優先度 #25）

- ファイル: `src/data/quests.ts`
- ステータスラベル変更: "COMPLETED" → "たっせい", "ONGOING" → "しんこうちゅう"

- ファイル: `src/components/Quests.tsx`
- セクションタイトル: "クエスト履歴 (Quests)" → "クエスト履歴"
- "IMAGE" プレースホルダテキスト → "クエスト"

## 25. Guilds - UI/デザイン再考（低優先度 #26）

- ファイル: `src/components/Guilds.tsx`
- 現状: emoji丸アイコンがシンプルすぎる
- 変更: 各ギルドをカード型に変更。木枠ボード風デザイン:

```tsx
{guilds.map((guild) => (
  <Link key={guild.id} href={`/guilds/${guild.id}`} className="bg-wood-dark p-1 shadow-pixel group hover:-translate-y-1 transition-transform">
    <div className="bg-[#f5deb3] border-2 border-[#5c3a21] p-4 text-gray-900">
      <div className="text-2xl mb-2">{guild.emoji}</div>
      <h3 className="font-bold text-sm mb-1">{guild.name}</h3>
      <p className="text-xs text-gray-600">{guild.relation}</p>
    </div>
  </Link>
))}
```

- グリッド: `grid grid-cols-1 sm:grid-cols-3 gap-6`

## 26. 新規ページ: お問い合わせフォーム `/contact`（高優先度 #8）

- ファイル: `src/app/contact/page.tsx`（既存ファイルを上書き）
- RPG道具屋カウンター風のお問い合わせフォーム
- フィールド: 名前(name), メールアドレス(email), お問い合わせ内容(message textarea)
- "use client" でクライアントコンポーネント化
- useState でフォーム状態管理
- 送信時は実際には送信せず、成功メッセージを表示: "メッセージを受け取りました！冒険者よ、返答を待たれよ。"
- NPC風の導入セリフ: "何かお困りごとがあれば、このカウンターに書き残していってくれ。"
- 送信ボタン: "▶ メッセージを送る"
- PageContainerを使用
- SNSリンクも残す

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
              <Link href="/" className="inline-block mt-6 bg-wood-dark text-[#deb887] px-6 py-2 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors">
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
                  <input type="text" required value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full border-2 border-[#5c3a21] p-2 bg-white/70 text-gray-900 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">メールアドレス</label>
                  <input type="email" required value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full border-2 border-[#5c3a21] p-2 bg-white/70 text-gray-900 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">おといあわせ内容</label>
                  <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="w-full border-2 border-[#5c3a21] p-2 bg-white/70 text-gray-900 text-sm" />
                </div>
                <button type="submit" className="bg-wood-dark text-[#deb887] px-6 py-3 font-[family-name:var(--font-pixel)] text-xs border-2 border-[#5c3a21] hover:bg-wood-light transition-colors cursor-pointer">
                  ▶ メッセージを送る
                </button>
              </form>
              <div className="flex flex-wrap gap-4 text-sm mt-6 pt-4 border-t border-[#5c3a21]/30">
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">X (Twitter)</a>
                <a href="https://note.com/" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">Note</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">LinkedIn</a>
                <a href="https://github.com/UC5454" target="_blank" rel="noopener noreferrer" className="text-[#3e2723] underline hover:text-black">GitHub</a>
              </div>
            </>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
```

## 27. 新規ページ: 千葉紹介ページ `/about`（中優先度 #15,#7）

- ファイル: `src/app/about/page.tsx`（新規作成）
- RPGキャラクターシート風のプロフィールページ
- PageContainerを使用: title="冒険者の書"
- metadata: title="しょうかい | 千葉勇志", description="千葉勇志のプロフィール・実績・ミッション"

セクション構成:
1. **プロフィール**: `/images/hero-chiba.png` + 基本情報（株式会社SOU 代表 / 株式会社デジタルゴリラ 取締役COO / 東北AIコミュニティ主宰 / 拠点: 東北・仙台）
2. **ミッション**: "テクノロジーと人間の創造性を掛け合わせ、これまでにない価値を生み出す"
3. **実績**: RPGアチーブメント風カード4枚
   - 成長率 300〜400%
   - コミュニティ 300名超
   - 登壇 累計50回以上
   - 業務削減 月間1,714時間
4. **価値観**: 体験主義 / 泥臭く本気で / 加速装置としてのAI
5. **CTA**: "一緒に冒険する？" → /contact リンク

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export function generateMetadata(): Metadata {
  return {
    title: "しょうかい | 千葉勇志 / Yushi Chiba",
    description: "千葉勇志のプロフィール・実績・ミッション。テクノロジーと人間の創造性を掛け合わせ、これまでにない価値を生み出す。",
  };
}

export default function AboutPage() {
  return (
    <PageContainer title="冒険者の書" breadcrumb={[{ label: "しょうかい" }]}>
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-navy-light border-2 border-gold-retro/30 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-40 h-40 md:w-48 md:h-48 border-4 border-gold-retro overflow-hidden shrink-0">
              <Image src="/images/hero-chiba.png" alt="千葉勇志" width={192} height={192} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gold-retro mb-2">千葉 勇志</h2>
              <p className="text-sm text-gray-300 mb-1">Yushi Chiba</p>
              <ul className="space-y-1 mt-3 text-sm">
                <li className="text-gray-200">🏢 株式会社SOU 代表</li>
                <li className="text-gray-200">🏢 株式会社デジタルゴリラ 取締役COO</li>
                <li className="text-gray-200">🎯 東北AIコミュニティ 主宰</li>
                <li className="text-gray-200">📍 拠点: 東北・仙台</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-navy-light border-2 border-white/20 p-6 mb-6 text-center">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4">ミッション</h3>
          <p className="text-lg font-bold leading-relaxed">テクノロジーと人間の創造性を掛け合わせ、<br className="hidden sm:inline" />これまでにない価値を生み出す</p>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">じっせき</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-navy-light border-2 border-gold-retro/30 p-4 text-center">
              <p className="text-2xl font-black text-gold-retro">300%</p>
              <p className="text-xs text-gray-400 mt-1">成長率</p>
            </div>
            <div className="bg-navy-light border-2 border-green-500/30 p-4 text-center">
              <p className="text-2xl font-black text-green-400">300+</p>
              <p className="text-xs text-gray-400 mt-1">コミュニティ</p>
            </div>
            <div className="bg-navy-light border-2 border-blue-500/30 p-4 text-center">
              <p className="text-2xl font-black text-blue-400">50+</p>
              <p className="text-xs text-gray-400 mt-1">登壇回数</p>
            </div>
            <div className="bg-navy-light border-2 border-red-500/30 p-4 text-center">
              <p className="text-2xl font-black text-red-400">1,714h</p>
              <p className="text-xs text-gray-400 mt-1">月間業務削減</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-navy-light border-2 border-white/20 p-6 mb-6">
          <h3 className="font-[family-name:var(--font-pixel)] text-xs text-gold-retro mb-4 text-center">かちかん</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-white/10 p-4">
              <h4 className="font-bold text-gold-retro mb-2">体験主義</h4>
              <p className="text-sm text-gray-300">自ら体験し検証した一次情報を信じる。百聞は一見に如かず。</p>
            </div>
            <div className="border border-white/10 p-4">
              <h4 className="font-bold text-gold-retro mb-2">泥臭く、本気で</h4>
              <p className="text-sm text-gray-300">戦略だけでなく現場に入り込み、手を動かし、汗をかく。</p>
            </div>
            <div className="border border-white/10 p-4">
              <h4 className="font-bold text-gold-retro mb-2">加速装置としてのAI</h4>
              <p className="text-sm text-gray-300">AIは魔法ではなく道具。人間の創造性を拡張する加速装置。</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-lg mb-4">一緒に冒険する？</p>
          <Link href="/contact" className="inline-block bg-gold-retro text-black font-[family-name:var(--font-pixel)] text-xs px-8 py-4 border-b-4 border-r-4 border-black hover:translate-y-1 hover:border-b-0 hover:border-r-0 transition-all shadow-pixel-gold">
            ▶ はなす
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
```

---

## globals.css への追加

- ファイル: `src/app/globals.css`
- 以下のkeyframeを追加:

```css
@keyframes flashOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

---

## 実装上の注意

- Tailwind CSS v4を使用。`tailwind.config.js` は存在しない。テーマはglobals.cssの `@theme inline` で定義
- Press Start 2P フォントは `font-[family-name:var(--font-pixel)]` で指定する
- 既存のRPGゲームデザインテーマは維持。改善のみ行う
- `"use client"` ディレクティブはインタラクティブなコンポーネントにのみ使用
- 新しいnpmパッケージの追加は不可
- `/about` ページは新規作成（`src/app/about/page.tsx`）
- `/contact` ページは既存上書き（`src/app/contact/page.tsx`）
- メディアセクション（/media）は一切触らない
- 最後に必ず `npm run build` で成功を確認すること
