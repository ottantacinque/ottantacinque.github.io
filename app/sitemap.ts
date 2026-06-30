import type { MetadataRoute } from "next";

// 静的エクスポート時に /sitemap.xml として出力される
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ottantacinque.github.io/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
