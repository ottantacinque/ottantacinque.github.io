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

// 分野（タグ）の定義と色 ※フィルタチップ・カードのタグ表示に使用
export type Field = { id: string; label: string; color: string };
export const FIELDS: Field[] = [
  { id: "dsml", label: "DS / ML", color: "#2563eb" },
  { id: "kaggle", label: "Kaggle", color: "#ea580c" },
  { id: "mi", label: "Materials Informatics", color: "#db2777" },
  { id: "others", label: "Others", color: "#64748b" },
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
// 静的アイテム（Products / Awards）
//   ※ Input（読んだ本・記事）は lib/inputs.ts / Inputs セクションで扱う
// -------------------------------------------------------------
const productItems: Item[] = [
  { id: "pr-2", label: "習慣トラッカー「keizoku」", weight: 0, category: "products", fields: ["others"], url: "https://apps.apple.com/jp/app/keizoku-%E3%83%9F%E3%83%8B%E3%83%9E%E3%83%AB%E7%BF%92%E6%85%A3%E3%83%88%E3%83%A9%E3%83%83%E3%82%AB%E3%83%BC/id6761479586", emoji: "✅", desc: "毎日の習慣の継続を記録・可視化して支援する iOS アプリ。App Store で配信中。" },];

// Awards = Kaggle 実績 + 査読付き論文（手動更新）
const awardItems: Item[] = [
  { id: "aw-paper-2018", label: "Nonanuclear Ni(II) Complexes (Dalton Trans., 2018)", weight: 2, category: "awards", fields: ["mi"], url: "https://doi.org/10.1039/C8DT00161H", emoji: "📄", desc: "非対称多座配位子による [1-7-1] 型九核 Ni(II) 錯体の合成と磁気・電気化学的性質。第一著者の査読付き論文（Dalton Trans., 2018, 47, 4036–4039）。" },
  { id: "aw-1", label: "🥇 HMS - Harmful Brain Activity (9th/2767)", weight: 3, category: "awards", fields: ["kaggle"], url: "https://www.kaggle.com/competitions/hms-harmful-brain-activity-classification", emoji: "🥇", desc: "重篤な患者の発作など有害な脳活動パターンを分類。" },
  { id: "aw-2", label: "🥇 UM - MCTS Variants (11th/1608)", weight: 3, category: "awards", fields: ["kaggle"], url: "https://www.kaggle.com/competitions/um-game-playing-strength-of-mcts-variants", emoji: "🥇", desc: "ボードゲームで MCTS のどの変種が優れるかを予測。" },
  { id: "aw-3", label: "🥈 Santa 2024 (15th/1514)", weight: 1, category: "awards", fields: ["kaggle"], emoji: "🥈", desc: "単語を並び替えてパープレキシティを最小化する最適化。" },
  { id: "aw-4", label: "🥈 BirdCLEF+ 2025 (25th/2031)", weight: 1, category: "awards", fields: ["kaggle"], emoji: "🥈", desc: "音声から鳥・両生類・哺乳類などの種を識別。" },
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

// タイトルから 4 分類（DS/ML・Kaggle・Materials Informatics・Others）へ振り分け。
// 上から順に最初にマッチした分類を採用し、いずれも該当しなければ DS/ML。
const FIELD_RULES: { field: string; test: RegExp }[] = [
  { field: "kaggle", test: /上位解法|コンペ|kaggle|ISIC|NFL|Santa|CIBMTR|MCTS|UM|メダル/i },
  { field: "mi", test: /化学|化合物|分子|ケミカル|ChemPlot|CIRpy|JSME|高分子|合成|SA ?スコア|構造物性|マテリアルズ|材料|錯体|MOF|物性|触媒|インフォマティクス/i },
  { field: "others", test: /Alfred|bot|wordpress|環境構築|Colaboratory|GPU|描画|パイプライン|効率化|ショートカット|ブログ|Mac|エクセル|Excel|Markdown/i },
];

function classifyZenn(title: string): string[] {
  for (const r of FIELD_RULES) if (r.test.test(title)) return [r.field];
  return ["dsml"]; // 既定は DS / ML
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
  // Input（読んだ本・記事）は別セクションで扱うため活動ボードには含めない
  return [
    ...zennToItems(articles),
    ...productItems,
    ...awardItems,
  ];
}

// -------------------------------------------------------------
// セクション構成（左カラムの一覧 / 右カラムのカード用）
//   Top: Awards / Works(Output+Products)
//   各 Top の中を Kaggle・DS/ML 等のサブ（分野タグ）に細分化する。
//   ※ Input（読んだ本・記事）は別セクションで扱う。
// -------------------------------------------------------------
const FIELD_BY_ID = Object.fromEntries(FIELDS.map((f) => [f.id, f]));

export type TopId = "awards" | "works" | "input";
export const TOPS: { id: TopId; label: string; color: string }[] = [
  { id: "awards", label: "Awards", color: "#ea580c" },
  { id: "works", label: "Works", color: "#2563eb" },
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

// アイテム → タグ（id / ラベル / 色）。全カテゴリ共通で fields[0] の分野タグを採用。
function subOf(item: Item): SubFilter {
  const f = FIELD_BY_ID[item.fields[0]] ?? { id: "others", label: "Others", color: "#64748b" };
  return { id: f.id, label: f.label, color: f.color };
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
  // FIELDS の定義順（DS/ML → Kaggle → Materials Informatics → Others）に並べる
  const order = FIELDS.map((f) => f.id);
  return [...m.values()].sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );
}
