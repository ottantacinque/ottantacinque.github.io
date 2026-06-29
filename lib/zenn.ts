import type { ZennArticle } from "./activities";

const ZENN_USERNAME = "ottantachinque";

type ZennApiArticle = {
  title: string;
  path: string;
  emoji: string;
  liked_count: number;
  article_type: string;
  published_at: string;
};

// Zenn の記事一覧を取得（サーバー側 fetch + ISR）。
// Vercel 上では revalidate 間隔で自動的に再生成され、記事が定期更新される。
export async function fetchZennArticles(): Promise<ZennArticle[]> {
  try {
    const res = await fetch(
      `https://zenn.dev/api/articles?username=${ZENN_USERNAME}&order=latest&count=100`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (portfolio-site)" },
        next: { revalidate: 60 * 60 * 12 }, // 12時間ごとに再取得
      },
    );
    if (!res.ok) throw new Error(`Zenn API ${res.status}`);
    const data: { articles: ZennApiArticle[] } = await res.json();
    return data.articles.map((a) => ({
      title: a.title,
      url: `https://zenn.dev${a.path}`,
      emoji: a.emoji,
      likes: a.liked_count,
      type: a.article_type,
      published: a.published_at,
    }));
  } catch (err) {
    // 取得失敗時はビルドを止めず空配列でフォールバック
    console.warn("[zenn] fetch failed:", err);
    return [];
  }
}
