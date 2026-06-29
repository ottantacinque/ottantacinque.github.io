# ottantacinque.github.io

都地恭拡 (Tsuji Yasuhiro) の自己紹介 / ポートフォリオサイト。

Next.js (App Router) + TypeScript + Tailwind CSS で構築し、静的エクスポート
(`output: 'export'`) を GitHub Pages に GitHub Actions で自動デプロイしています。

- 公開URL: https://ottantacinque.github.io/
- Zenn の記事はビルド時に [Zenn API](https://zenn.dev/ottantachinque) から取得します。

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 静的エクスポート（out/ を生成）
```

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が走り、`out/` を Pages に公開します。
記事一覧を更新したい場合は再ビルド（push もしくは Actions の手動実行）が必要です。
