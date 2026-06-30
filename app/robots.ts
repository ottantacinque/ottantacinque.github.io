import type { MetadataRoute } from "next";

// 静的エクスポート時に /robots.txt として出力される
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ottantacinque.github.io/sitemap.xml",
    host: "https://ottantacinque.github.io",
  };
}
