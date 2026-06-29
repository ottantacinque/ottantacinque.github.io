// =============================================================
// 活動（Activities）
//   - カテゴリ: Output(Zenn) / Input(本) / Products(制作物) / Awards(Kaggle)
//   - 分野(field): 機械学習・統計・データ分析・ケモインフォ 等の横断タグ
//   1アイテムは複数の分野に属してよい（fields[]）。
//   タグ（=分野）クリックで、その分野の活動を
//   Output/Input/Products/Awards のカテゴリ別に表示する。
// =============================================================

export type Cat = "output" | "input" | "products" | "awards";

export const CATEGORIES: {
  id: Cat;
  label: string;
  labelJa: string;
  color: string;
}[] = [
  { id: "output", label: "Output", labelJa: "Zenn 記事", color: "#2563eb" },
  { id: "input", label: "Input", labelJa: "読んだ本", color: "#16a34a" },
  { id: "products", label: "Products", labelJa: "作ったもの", color: "#7c3aed" },
  { id: "awards", label: "Awards", labelJa: "受賞 (Kaggle)", color: "#ea580c" },
];

// 分野（タグ）の定義と色
export type Field = { id: string; label: string; color: string };
export const FIELDS: Field[] = [
  { id: "kaggle", label: "Kaggle / コンペ", color: "#2563eb" },
  { id: "ml", label: "機械学習", color: "#7c3aed" },
  { id: "stats", label: "統計・数理", color: "#0891b2" },
  { id: "data", label: "データ分析", color: "#16a34a" },
  { id: "chem", label: "ケモインフォ・化学", color: "#db2777" },
  { id: "tools", label: "ツール・効率化", color: "#f59e0b" },
  { id: "sw", label: "ソフトウェア設計", color: "#4f46e5" },
  { id: "web", label: "Webアプリ", color: "#0d9488" },
  { id: "math", label: "数学", color: "#ca8a04" },
];

export type Item = {
  id: string;
  label: string;
  url?: string;
  weight: number;
  category: Cat;
  fields: string[]; // 複数分野に重複所属可
  desc?: string; // カードの簡単な説明文
  emoji?: string; // カードのビジュアル（Zenn 風の絵文字バナー）
};

// -------------------------------------------------------------
// 静的アイテム（Input / Products / Awards）※サンプル含む
// -------------------------------------------------------------
const inputItems: Item[] = [
  { id: "in-1", label: "機械学習のエッセンス", weight: 0, category: "input", fields: ["ml"], emoji: "📘", desc: "機械学習の基礎を数式とコードで理解する一冊。" },
  { id: "in-2", label: "統計的学習の基礎", weight: 0, category: "input", fields: ["ml", "stats"], emoji: "📕", desc: "統計的学習理論を体系的に学ぶ定番テキスト。" },
  { id: "in-3", label: "Deep Learning", weight: 0, category: "input", fields: ["ml"], emoji: "📗", desc: "深層学習の理論を網羅的に解説する教科書。" },
  { id: "in-4", label: "Pythonではじめるデータ分析", weight: 0, category: "input", fields: ["data", "ml"], emoji: "🐍", desc: "Python によるデータ分析の実践入門。" },
  { id: "in-5", label: "達人に学ぶSQL徹底指南書", weight: 0, category: "input", fields: ["data"], emoji: "🗃️", desc: "実務で効く SQL の考え方を身につける。" },
  { id: "in-6", label: "リーダブルコード", weight: 0, category: "input", fields: ["sw"], emoji: "📖", desc: "読みやすいコードを書くための原則集。" },
  { id: "in-7", label: "Clean Architecture", weight: 0, category: "input", fields: ["sw"], emoji: "🏛️", desc: "変更に強い設計の原則を学ぶ。" },
  { id: "in-8", label: "ドメイン駆動設計", weight: 0, category: "input", fields: ["sw"], emoji: "🧩", desc: "ドメインモデルを中心に据えた設計手法。" },
  { id: "in-9", label: "Concrete Mathematics", weight: 0, category: "input", fields: ["math", "stats"], emoji: "🔢", desc: "計算機科学のための離散数学の名著。" },
];

const productItems: Item[] = [
  { id: "pr-1", label: "電力データ分析ダッシュボード", weight: 0, category: "products", fields: ["data", "web"], emoji: "📊", desc: "電力データを可視化・分析するダッシュボード。" },
  { id: "pr-2", label: "習慣トラッカー「keizoku」", weight: 0, category: "products", fields: ["web"], emoji: "✅", desc: "習慣の継続を可視化して支援する Web アプリ。" },
  { id: "pr-3", label: "レーティングアプリ (Elo)", weight: 0, category: "products", fields: ["web", "stats"], emoji: "♟️", desc: "Elo レーティングで強さを推定するアプリ。" },
  { id: "pr-4", label: "ポートフォリオサイト", weight: 0, category: "products", fields: ["web"], emoji: "🪪", desc: "この自己紹介サイト（Next.js 製）。" },
  { id: "pr-5", label: "業務自動化スクリプト", weight: 0, category: "products", fields: ["tools"], emoji: "⚙️", desc: "定型業務を自動化するスクリプト群。" },
  { id: "pr-6", label: "Slack通知ボット", weight: 0, category: "products", fields: ["tools"], emoji: "🔔", desc: "Slack へ自動で通知するボット。" },
];

// Awards = Kaggle 実績（手動更新。自動化には Kaggle API トークンが必要）
const awardItems: Item[] = [
  { id: "aw-1", label: "🥇 HMS - Harmful Brain Activity (9th/2767)", weight: 3, category: "awards", fields: ["kaggle", "ml"], url: "https://www.kaggle.com/competitions/hms-harmful-brain-activity-classification", emoji: "🥇", desc: "重篤な患者の発作など有害な脳活動パターンを分類。" },
  { id: "aw-2", label: "🥇 UM - MCTS Variants (11th/1608)", weight: 3, category: "awards", fields: ["kaggle", "ml"], url: "https://www.kaggle.com/competitions/um-game-playing-strength-of-mcts-variants", emoji: "🥇", desc: "ボードゲームで MCTS のどの変種が優れるかを予測。" },
  { id: "aw-3", label: "🥈 Santa 2024 (15th/1514)", weight: 1, category: "awards", fields: ["kaggle"], emoji: "🥈", desc: "単語を並び替えてパープレキシティを最小化する最適化。" },
  { id: "aw-4", label: "🥈 BirdCLEF+ 2025 (25th/2031)", weight: 1, category: "awards", fields: ["kaggle", "ml"], emoji: "🥈", desc: "音声から鳥・両生類・哺乳類などの種を識別。" },
  { id: "aw-5", label: "🥈 NeurIPS - Ariel Data Challenge 2024 (32nd/1151)", weight: 1, category: "awards", fields: ["kaggle"], emoji: "🥈", desc: "宇宙望遠鏡の観測から系外惑星のシグナルを導出。" },
  { id: "aw-6", label: "🥈 Geophysical Waveform Inversion (42nd/1365)", weight: 1, category: "awards", fields: ["kaggle"], emoji: "🥈", desc: "地震波形から地下構造を物理ベースで逆解析。" },
  { id: "aw-7", label: "🥈 Stanford RNA 3D Folding (70th/1516)", weight: 1, category: "awards", fields: ["kaggle"], emoji: "🥈", desc: "RNA の立体構造を予測する未解決問題に挑戦。" },
  { id: "aw-8", label: "🥉 MAP - Student Math Misunderstandings (139th/1857)", weight: 0, category: "awards", fields: ["kaggle"], emoji: "🥉", desc: "生徒の数学の誤解と回答テキストの関連を予測。" },
  { id: "aw-9", label: "🥉 他 複数の銅メダル", weight: 0, category: "awards", fields: ["kaggle"], emoji: "🥉", desc: "その他コンペティションでの銅メダル。" },
];

// -------------------------------------------------------------
// Zenn 記事 → 分野(fields) 分類（複数該当可）
// -------------------------------------------------------------
export type ZennArticle = {
  title: string;
  url: string;
  emoji: string;
  likes: number;
  type: string;
  published?: string; // ISO 文字列
};

const FIELD_RULES: { field: string; test: RegExp }[] = [
  { field: "kaggle", test: /上位解法|コンペ|kaggle|ISIC|NFL|Santa|CIBMTR|MCTS|UM/i },
  { field: "chem", test: /化学|化合物|分子|ケミカル|ChemPlot|CIRpy|JSME|高分子|合成|SA ?スコア|構造物性/i },
  { field: "stats", test: /統計|最尤推定|線形モデル|ヤコビアン|偏相関|数理最適化|尺度|検定/ },
  { field: "data", test: /データ|前処理|欠損|集計|標準化|可視化|ternary|三角ダイア|エクセル|Markdown|SQL/i },
  { field: "tools", test: /Alfred|bot|wordpress|環境|Colaboratory|GPU|描画|パイプライン/i },
  { field: "ml", test: /lightgbm|xgboost|catboost|scikit|pycaret|optuna|shap|深層学習|機械学習|モデル|E資格/i },
];

function classifyZenn(title: string): string[] {
  const matched = FIELD_RULES.filter((r) => r.test.test(title)).map((r) => r.field);
  return matched.length > 0 ? Array.from(new Set(matched)) : ["ml"];
}

function zennToItems(articles: ZennArticle[]): Item[] {
  return articles.map((a, i) => {
    const d = a.published ? new Date(a.published) : null;
    const ym = d ? `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}` : "";
    return {
      id: `out-${i}`,
      label: a.title,
      url: a.url,
      weight: a.likes,
      category: "output" as Cat,
      fields: classifyZenn(a.title),
      emoji: a.emoji || "📝",
      desc: ym ? `Zenn の記事 · ${ym} 公開` : "Zenn の記事",
    };
  });
}

// -------------------------------------------------------------
// 全アイテムを組み立て
// -------------------------------------------------------------
export function buildItems(articles: ZennArticle[]): Item[] {
  return [
    ...zennToItems(articles),
    ...inputItems,
    ...productItems,
    ...awardItems,
  ];
}

// -------------------------------------------------------------
// セクション構成（左カラムの一覧 / 右カラムのカード用）
//   Top: Awards / Works(Output+Products) / Input
//   各 Top の中を Kaggle・Zenn記事・Webアプリ 等のサブに細分化する。
// -------------------------------------------------------------
const FIELD_BY_ID = Object.fromEntries(FIELDS.map((f) => [f.id, f]));

export type TopId = "awards" | "works" | "input";
export const TOPS: { id: TopId; label: string; color: string }[] = [
  { id: "awards", label: "Awards", color: "#ea580c" },
  { id: "works", label: "Works", color: "#2563eb" },
  { id: "input", label: "Input", color: "#16a34a" },
];

export type SubGroup = { id: string; label: string; color: string; items: Item[] };
export type TopGroup = {
  id: TopId;
  label: string;
  color: string;
  total: number;
  subs: SubGroup[];
};
export type SubFilter = { id: string; label: string; color: string };

function topOf(cat: Cat): TopId {
  if (cat === "awards") return "awards";
  if (cat === "input") return "input";
  return "works";
}

// アイテム → サブ分類（id / ラベル / 色）
function subOf(item: Item): SubFilter {
  if (item.category === "awards") return { id: "kaggle", label: "Kaggle", color: "#ea580c" };
  if (item.category === "output") return { id: "zenn", label: "Zenn 記事", color: "#2563eb" };
  const f = FIELD_BY_ID[item.fields[0]] ?? { id: "other", label: "その他", color: "#64748b" };
  const prefix = item.category === "products" ? "w" : "i";
  return { id: `${prefix}-${f.id}`, label: f.label, color: f.color };
}

export function buildSections(items: Item[]): TopGroup[] {
  return TOPS.map((top) => {
    const its = items.filter((it) => topOf(it.category) === top.id);
    const subMap = new Map<string, SubGroup>();
    for (const it of its) {
      const s = subOf(it);
      if (!subMap.has(s.id)) subMap.set(s.id, { ...s, items: [] });
      subMap.get(s.id)!.items.push(it);
    }
    const subs = [...subMap.values()].map((s) => ({
      ...s,
      items: [...s.items].sort((a, b) => b.weight - a.weight),
    }));
    return { ...top, total: its.length, subs };
  }).filter((t) => t.subs.length > 0);
}

// 上部フィルタ用：全サブ分類をユニークに列挙
export function buildSubFilters(tops: TopGroup[]): SubFilter[] {
  const m = new Map<string, SubFilter>();
  for (const t of tops)
    for (const s of t.subs)
      if (!m.has(s.id)) m.set(s.id, { id: s.id, label: s.label, color: s.color });
  return [...m.values()];
}
