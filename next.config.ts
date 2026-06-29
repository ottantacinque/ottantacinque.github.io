import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 向け静的エクスポート
  output: "export",
  // user page（https://ottantacinque.github.io/）はルート配信のため basePath 不要
  images: {
    unoptimized: true, // 静的エクスポートでは画像最適化を無効化
  },
};

export default nextConfig;
