export interface QuizQuestion {
  category: string;
  question: string;
  choices: string[];
  answer: number; // 0-based index
  difficulty: 1 | 2 | 3;
}

// Categories mapped to employee specialties
export const quizBank: QuizQuestion[] = [
  // === AI・テクノロジー（カイト、ツカサ、リン） ===
  {
    category: "AI・テクノロジー",
    question: "大規模言語モデル(LLM)の学習手法で、人間のフィードバックを使う手法は？",
    choices: ["RLHF", "GAN", "VAE", "BERT"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "AI・テクノロジー",
    question: "Transformerアーキテクチャで最も重要な仕組みは？",
    choices: ["Self-Attention", "Pooling Layer", "Dropout", "Batch Norm"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "AI・テクノロジー",
    question: "プロンプトエンジニアリングで「例を示して指示する」手法は？",
    choices: ["Few-shot", "Zero-shot", "Fine-tuning", "Transfer"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "AI・テクノロジー",
    question: "RAGとは何の略？",
    choices: [
      "Retrieval-Augmented Generation",
      "Random Access Generation",
      "Recursive Auto Grammar",
      "Real-time AI Gateway",
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "AI・テクノロジー",
    question: "AIの「ハルシネーション」とは？",
    choices: [
      "事実と異なる情報を生成すること",
      "処理速度が低下すること",
      "学習データが不足すること",
      "モデルが大きすぎること",
    ],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "AI・テクノロジー",
    question: "LoRAは何を効率化する技術？",
    choices: ["モデルのファインチューニング", "推論速度", "データ収集", "モデル圧縮"],
    answer: 0,
    difficulty: 3,
  },

  // === Web開発（カイト、ナギ、ソウ） ===
  {
    category: "Web開発",
    question: "Next.jsのApp Routerで、サーバーコンポーネントのデフォルトは？",
    choices: ["Server Component", "Client Component", "Static Component", "Hybrid Component"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "Web開発",
    question: "Core Web Vitalsに含まれない指標は？",
    choices: ["Time to First Byte", "LCP", "INP", "CLS"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "Web開発",
    question: "CSSのFlexboxで主軸の方向を変えるプロパティは？",
    choices: ["flex-direction", "align-items", "justify-content", "flex-wrap"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "Web開発",
    question: "TypeScriptでnullとundefined両方を許容する演算子は？",
    choices: ["??", "||", "&&", "!!"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "Web開発",
    question: "ReactのuseMemoの目的は？",
    choices: ["計算結果のキャッシュ", "状態管理", "副作用の実行", "DOM参照の取得"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "Web開発",
    question: "Vercelが提供するEdge Runtimeの特徴は？",
    choices: ["低レイテンシーのサーバーレス実行", "GPUアクセス", "永続的なDB接続", "WebSocket常時接続"],
    answer: 0,
    difficulty: 3,
  },

  // === デザイン・UX（ナギ、ソラ、アヤ） ===
  {
    category: "デザイン・UX",
    question: "UIデザインの「フィッツの法則」が示すのは？",
    choices: [
      "ターゲットが大きく近いほど操作が速い",
      "色の数は3色以内にすべき",
      "ユーザーは左上から読む",
      "余白は要素の20%以上必要",
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "デザイン・UX",
    question: "WCAGのAAレベルで要求される最小コントラスト比は？",
    choices: ["4.5:1", "3:1", "7:1", "2:1"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "デザイン・UX",
    question: "ユーザーの視線移動パターンで、Webページでよく見られるのは？",
    choices: ["F字パターン", "S字パターン", "X字パターン", "O字パターン"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "デザイン・UX",
    question: "デザインシステムの「トークン」とは？",
    choices: [
      "色・サイズ・余白などの設計値",
      "ユーザー認証情報",
      "APIアクセスキー",
      "コンポーネントの状態",
    ],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "デザイン・UX",
    question: "モバイルファーストデザインの意味は？",
    choices: [
      "小さい画面から設計を始める",
      "モバイルアプリを先に作る",
      "モバイルのみ対応する",
      "デスクトップを無視する",
    ],
    answer: 0,
    difficulty: 1,
  },

  // === マーケティング・SEO（セイラ、マサキ、ハヤテ） ===
  {
    category: "マーケティング",
    question: "SEOで「E-E-A-T」の2つ目のEが表すのは？",
    choices: ["Experience（経験）", "Efficiency（効率）", "Engagement（関与）", "Evolution（進化）"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "マーケティング",
    question: "Google広告のROASとは？",
    choices: ["広告費に対する売上の比率", "クリック率", "表示回数", "品質スコア"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "マーケティング",
    question: "LTV（顧客生涯価値）を高める最も効果的な施策は？",
    choices: ["リテンション率の向上", "新規獲得の拡大", "広告費の増額", "価格の値上げ"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "マーケティング",
    question: "構造化データのマークアップ形式として推奨されるのは？",
    choices: ["JSON-LD", "Microdata", "RDFa", "XML"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "マーケティング",
    question: "コンテンツマーケティングのファネルで最上部は？",
    choices: ["認知（Awareness）", "検討（Consideration）", "購入（Purchase）", "推奨（Advocacy）"],
    answer: 0,
    difficulty: 1,
  },

  // === ビジネス・経営（リン、タクミ、ミナミ） ===
  {
    category: "ビジネス",
    question: "OKR(Objectives and Key Results)の特徴は？",
    choices: [
      "野心的な目標と測定可能な成果指標",
      "個人の年次評価制度",
      "予算管理フレームワーク",
      "プロジェクト管理手法",
    ],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "ビジネス",
    question: "「PDCAサイクル」を発展させた「OODA」のOは？",
    choices: ["Observe（観察）", "Optimize（最適化）", "Organize（組織化）", "Output（成果）"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "ビジネス",
    question: "DXの本質的な意味は？",
    choices: [
      "デジタル技術による事業変革",
      "紙をデジタル化すること",
      "IT部門の強化",
      "クラウド移行",
    ],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "ビジネス",
    question: "リーンスタートアップの「MVP」とは？",
    choices: [
      "最小限の実用的な製品",
      "最も価値ある人材",
      "主要業績指標",
      "最大可変価格",
    ],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "ビジネス",
    question: "KPIツリーの目的は？",
    choices: [
      "最終目標を分解して施策を明確化",
      "組織図を可視化",
      "コスト削減の優先順位付け",
      "人事評価の基準策定",
    ],
    answer: 0,
    difficulty: 2,
  },

  // === ライティング・コンテンツ（ツムギ、ユウ、コトハ） ===
  {
    category: "ライティング",
    question: "PREP法の「P」は何？",
    choices: ["Point（結論）", "Problem（問題）", "Plan（計画）", "Process（過程）"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "ライティング",
    question: "SEOライティングで最も重要な要素は？",
    choices: ["検索意図との一致", "文字数を増やす", "キーワード密度", "被リンク数"],
    answer: 0,
    difficulty: 2,
  },
  {
    category: "ライティング",
    question: "UXライティングの原則として正しいのは？",
    choices: ["明確・簡潔・有用", "長文・詳細・学術的", "感情的・曖昧・詩的", "専門用語を多用"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "ライティング",
    question: "一次情報として最も信頼性が高いのは？",
    choices: ["自社の実験・調査データ", "SNSの口コミ", "まとめサイト", "AIの出力"],
    answer: 0,
    difficulty: 1,
  },

  // === 品質管理（レン、ソウ） ===
  {
    category: "品質管理",
    question: "テストピラミッドの底辺（最も数が多い）は？",
    choices: ["ユニットテスト", "E2Eテスト", "統合テスト", "手動テスト"],
    answer: 0,
    difficulty: 1,
  },
  {
    category: "品質管理",
    question: "品質保証(QA)と品質管理(QC)の違いは？",
    choices: [
      "QAはプロセス改善、QCは成果物検査",
      "QAは自動、QCは手動",
      "QAは開発中、QCは開発後",
      "同じ意味",
    ],
    answer: 0,
    difficulty: 2,
  },
];

// Shuffle choices and adjust answer index for each question at runtime
export function shuffleQuestion(q: QuizQuestion): QuizQuestion {
  const indices = q.choices.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newChoices = indices.map((i) => q.choices[i]);
  const newAnswer = indices.indexOf(q.answer);
  return { ...q, choices: newChoices, answer: newAnswer };
}

// Map employee specialties to quiz categories
export const specialtyToCategory: Record<string, string[]> = {
  "Web開発": ["Web開発"],
  "API連携": ["Web開発", "AI・テクノロジー"],
  自動化: ["AI・テクノロジー", "Web開発"],
  "UI/UX": ["デザイン・UX"],
  ビジュアル設計: ["デザイン・UX"],
  ブランド表現: ["デザイン・UX", "マーケティング"],
  記事執筆: ["ライティング"],
  編集: ["ライティング"],
  SEOライティング: ["ライティング", "マーケティング"],
  市場調査: ["ビジネス", "マーケティング"],
  競合分析: ["マーケティング", "ビジネス"],
  仮説設計: ["ビジネス"],
  テスト設計: ["品質管理", "Web開発"],
  品質保証: ["品質管理"],
  運用チェック: ["品質管理"],
  SEO戦略: ["マーケティング"],
  キーワード設計: ["マーケティング"],
  記事改善: ["ライティング", "マーケティング"],
  進行管理: ["ビジネス"],
  要件整理: ["ビジネス"],
  品質管理: ["品質管理"],
  業務改善: ["ビジネス"],
  導入設計: ["ビジネス", "AI・テクノロジー"],
  KPI設計: ["ビジネス", "マーケティング"],
  プロンプト設計: ["AI・テクノロジー"],
  評価設計: ["AI・テクノロジー", "品質管理"],
  ワークフロー最適化: ["AI・テクノロジー", "ビジネス"],
  組織設計: ["ビジネス"],
  プロジェクト統括: ["ビジネス"],
  AI運用: ["AI・テクノロジー"],
  進行補佐: ["ビジネス"],
  資料整理: ["ビジネス"],
  連携調整: ["ビジネス"],
  ビジュアル制作: ["デザイン・UX"],
  構図設計: ["デザイン・UX"],
  クリエイティブ改善: ["デザイン・UX", "マーケティング"],
  広告運用: ["マーケティング"],
  配信設計: ["マーケティング"],
  クリエイティブ検証: ["マーケティング", "品質管理"],
  CRM運用: ["マーケティング", "ビジネス"],
  顧客分析: ["マーケティング"],
  施策設計: ["マーケティング", "ビジネス"],
  SNS運用: ["マーケティング"],
  企画立案: ["ビジネス", "マーケティング"],
  運用分析: ["マーケティング"],
  戦略立案: ["ビジネス"],
  ロードマップ: ["ビジネス"],
  成果設計: ["ビジネス"],
  ライティング: ["ライティング"],
  構成作成: ["ライティング"],
  取材要約: ["ライティング"],
  営業資料: ["ビジネス"],
  情報設計: ["デザイン・UX", "ビジネス"],
  提案構成: ["ビジネス"],
  教材設計: ["ビジネス"],
  研修資料: ["ビジネス"],
  ナレッジ整備: ["ビジネス"],
  スライドデザイン: ["デザイン・UX"],
  図解: ["デザイン・UX"],
  プレゼン演出: ["デザイン・UX"],
  映像演出: ["デザイン・UX"],
  企画構成: ["ビジネス"],
  撮影設計: ["デザイン・UX"],
  動画編集: ["デザイン・UX"],
  モーショングラフィックス: ["デザイン・UX"],
  最適化: ["Web開発", "マーケティング"],
  BGM制作: ["デザイン・UX"],
  SE制作: ["デザイン・UX"],
  音響演出: ["デザイン・UX"],
  採用: ["ビジネス"],
  育成設計: ["ビジネス"],
  組織改善: ["ビジネス"],
  会計: ["ビジネス"],
  予算管理: ["ビジネス"],
  収益分析: ["ビジネス"],
  研修設計: ["ビジネス"],
  伴走支援: ["ビジネス"],
  改善レビュー: ["品質管理"],
};

export function getQuestionsForEmployee(
  specialties: string[],
  count: number = 3
): QuizQuestion[] {
  const categories = new Set<string>();
  for (const s of specialties) {
    const cats = specialtyToCategory[s];
    if (cats) cats.forEach((c) => categories.add(c));
  }
  if (categories.size === 0) categories.add("ビジネス");

  const pool = quizBank.filter((q) => categories.has(q.category));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(shuffleQuestion);
}
