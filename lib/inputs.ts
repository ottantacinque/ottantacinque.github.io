// =============================================================
// 読んだ本・記事（Inputs セクション）
//   content/inputs.md に貼り付けられた もしもアフィリエイト
//  「かんたんリンク」HTML をビルド時にパースしてカード化する。
//   ※ fs を使うためサーバー側（ビルド時）でのみ評価すること。
// =============================================================
import fs from "node:fs";
import path from "node:path";

export type BookStore = {
  name: string;
  label: string;
  color: string;
  url: string;
};

export type InputTag = { label: string; color: string };

export type Book = {
  id: string;
  title: string;
  publisher?: string;
  cover?: string; // 表紙画像 URL
  note?: string; // 一言コメント（任意）
  tag: InputTag;
  stores: BookStore[];
};

// タグ名 → 色（活動パートと調和する配色。未定義は slate）
const TAG_COLORS: Record<string, string> = {
  "DS/ML": "#2563eb",
  "DS / ML": "#2563eb",
  Kaggle: "#ea580c",
  "Materials Informatics": "#db2777",
  ソフトウェア設計: "#4f46e5",
  数学: "#ca8a04",
  統計: "#0891b2",
  ビジネス: "#16a34a",
  Others: "#64748b",
  その他: "#64748b",
};

function tagColor(label: string): string {
  return TAG_COLORS[label] ?? "#64748b";
}

// もしもアフィリエイトのクリック計測 URL を組み立てる
function moshimo(
  a_id: number,
  p_id: number,
  pc_id: number,
  pl_id: number,
  url: string,
): string {
  return `https://af.moshimo.com/af/c/click?a_id=${a_id}&p_id=${p_id}&pc_id=${pc_id}&pl_id=${pl_id}&url=${encodeURIComponent(url)}`;
}

// かんたんリンク msmaflink({...}) の JSON 形
type MoshimoLink = {
  u_tx: string;
  u_bc: string;
  u_url: string;
  a_id: number;
  p_id: number;
  pl_id: number;
  pc_id: number;
  s_n: string;
  u_so: number;
};
type MoshimoData = {
  n: string;
  b?: string;
  d?: string;
  c_p?: string;
  p?: string[];
  eid?: string;
  b_l?: MoshimoLink[];
};

const STORE_LABEL: Record<string, string> = {
  amazon: "Amazon",
  rakuten: "楽天",
  yahoo: "Yahoo!",
};

function buildCover(d: MoshimoData): string | undefined {
  const p0 = d.p?.[0];
  if (!p0) return undefined;
  if (/^https?:\/\//.test(p0)) return p0;
  return `${d.d ?? ""}${d.c_p ?? ""}${p0}`;
}

function toBook(
  d: MoshimoData,
  tagLabel: string,
  note: string | undefined,
  idx: number,
): Book {
  const stores: BookStore[] = (d.b_l ?? [])
    .slice()
    .sort((a, b) => a.u_so - b.u_so)
    .map((s) => ({
      name: s.s_n,
      label: STORE_LABEL[s.s_n] ?? s.u_tx,
      color: s.u_bc,
      url: moshimo(s.a_id, s.p_id, s.pc_id, s.pl_id, s.u_url),
    }));

  return {
    id: d.eid ? `book-${d.eid}` : `book-${idx}`,
    title: d.n,
    publisher: d.b || undefined,
    cover: buildCover(d),
    note: note || undefined,
    tag: { label: tagLabel, color: tagColor(tagLabel) },
    stores,
  };
}

// 直前のセグメントから @key: の最後の指定を取り出す
function lastDirective(segment: string, key: string): string | undefined {
  const re = new RegExp(`@${key}:\\s*(.+)`, "gi");
  let last: string | undefined;
  for (const m of segment.matchAll(re)) last = m[1].trim();
  return last && last.length > 0 ? last : undefined;
}

let cache: Book[] | null = null;

export function readBooks(): Book[] {
  if (cache) return cache;

  let text = "";
  try {
    text = fs.readFileSync(
      path.join(process.cwd(), "content/inputs.md"),
      "utf8",
    );
  } catch {
    return (cache = []);
  }

  const re = /msmaflink\(\s*(\{[\s\S]*?\})\s*\)\s*;/g;
  const books: Book[] = [];
  let prevEnd = 0;
  let idx = 0;

  for (const m of text.matchAll(re)) {
    const start = m.index ?? 0;
    const segment = text.slice(prevEnd, start);
    prevEnd = start + m[0].length;

    let data: MoshimoData;
    try {
      data = JSON.parse(m[1]) as MoshimoData;
    } catch {
      continue;
    }
    const tagLabel = lastDirective(segment, "tag") ?? "Others";
    const note = lastDirective(segment, "note");
    books.push(toBook(data, tagLabel, note, idx++));
  }

  return (cache = books);
}

// フィルタチップ用：登場順にユニークなタグを列挙
export function buildInputTags(books: Book[]): InputTag[] {
  const m = new Map<string, InputTag>();
  for (const b of books) if (!m.has(b.tag.label)) m.set(b.tag.label, b.tag);
  return [...m.values()];
}
