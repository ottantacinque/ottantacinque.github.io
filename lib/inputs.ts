// =============================================================
// 読んだ本・記事（Inputs セクション用データ）
//   もしもアフィリエイト「かんたんリンク」の各値から
//   ストアごとのトラッキング URL を組み立てて利用する。
// =============================================================

export type StoreName = "amazon" | "rakuten" | "yahoo";

export type Store = {
  name: StoreName;
  label: string;
  color: string;
  url: string;
};

export type BookInput = {
  id: string;
  title: string;
  publisher?: string;
  cover?: string; // 表紙画像 URL
  note?: string; // 一言コメント（任意）
  stores: Store[];
};

// もしもアフィリエイトのクリック計測 URL を組み立てる
// （かんたんリンクの b_l[] に含まれる各 ID と遷移先 URL から生成）
function moshimo(
  a_id: number,
  p_id: number,
  pc_id: number,
  pl_id: number,
  url: string,
): string {
  return `https://af.moshimo.com/af/c/click?a_id=${a_id}&p_id=${p_id}&pc_id=${pc_id}&pl_id=${pl_id}&url=${encodeURIComponent(url)}`;
}

export const bookInputs: BookInput[] = [
  {
    id: "readable-code",
    title:
      "リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック",
    publisher: "オライリージャパン",
    cover: "https://m.media-amazon.com/images/I/51xHT9ZnmNL._SL500_.jpg",
    note: "読みやすいコードを書くための原則集。",
    stores: [
      {
        name: "amazon",
        label: "Amazon",
        color: "#f79256",
        url: moshimo(2383126, 170, 185, 27060, "https://www.amazon.co.jp/dp/4873115655"),
      },
      {
        name: "rakuten",
        label: "楽天",
        color: "#f76956",
        url: moshimo(
          2383122,
          54,
          54,
          27059,
          "https://search.rakuten.co.jp/search/mall/%E3%83%AA%E3%83%BC%E3%83%80%E3%83%96%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%89%20%E2%80%95%E3%82%88%E3%82%8A%E8%89%AF%E3%81%84%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%9F%E3%82%81%E3%81%AE%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%A7%E5%AE%9F%E8%B7%B5%E7%9A%84%E3%81%AA%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF%20(Theory%20in%20practice)/",
        ),
      },
      {
        name: "yahoo",
        label: "Yahoo!",
        color: "#66a7ff",
        url: moshimo(
          2383127,
          1225,
          1925,
          27061,
          "https://shopping.yahoo.co.jp/search?first=1&p=%E3%83%AA%E3%83%BC%E3%83%80%E3%83%96%E3%83%AB%E3%82%B3%E3%83%BC%E3%83%89%20%E2%80%95%E3%82%88%E3%82%8A%E8%89%AF%E3%81%84%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%9F%E3%82%81%E3%81%AE%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%A7%E5%AE%9F%E8%B7%B5%E7%9A%84%E3%81%AA%E3%83%86%E3%82%AF%E3%83%8B%E3%83%83%E3%82%AF%20(Theory%20in%20practice)",
        ),
      },
    ],
  },
];
