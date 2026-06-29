// =============================================================
// プロフィール / 経歴 / SNS の単一データソース
// 内容は参考リポジトリ ottantacinque.github.io より移植
// （活動・受賞歴は lib/activities.ts に分離）
// =============================================================

export type IconKey =
  | "github"
  | "x"
  | "zenn"
  | "kaggle"
  | "linkedin"
  | "mail";

export const profile = {
  nameJa: "都地恭拡",
  nameEn: "Tsuji Yasuhiro",
  role: "Data Scientist / AI Engineer",
  tags: ["Ph.D. in Science", "Data Scientist", "Kaggle Master"],
  photo: "/profile.jpg",
  // sections/about.html の略歴テキスト
  intro:
    "理学博士号を取得後、化学メーカーに研究職として入社。コーポレート研究の傍ら、データ駆動型研究開発（マテリアルズ・インフォマティクス）の社内技術導入を進めていました。その後、より幅広い領域でのAI・データ活用を実現するため、AIスタートアップに転職。現在はデータサイエンティスト / AIエンジニアとして、主に製造業のお客様を対象にAIソリューションの開発を行っています。",
};

// -------------------------------------------------------------
// 経歴（sections/career.html、新しい順）
// -------------------------------------------------------------
export type CareerItem = {
  org: string;
  role: string;
  period: string;
  desc: string;
  kind: "work" | "edu";
};

export const career: CareerItem[] = [
  {
    org: "株式会社 Rist",
    role: "Data Scientist / AI Engineer",
    period: "2023年10月 〜 現在",
    kind: "work",
    desc: "主に製造業のお客様を対象にしたAIソリューションの開発（売上 / 需要予測、異常検知、画像のパラメータ予測 など）。",
  },
  {
    org: "三洋化成工業株式会社",
    role: "主任（研究職）",
    period: "2018年4月 〜 2023年9月",
    kind: "work",
    desc: "マテリアルズインフォマティクスを活用した研究開発プロジェクトの推進、AI・データサイエンス技術の社内展開を担当。継続的な技術普及・啓蒙の末、データ活用を推進する部署チームの立ち上げにも成功。",
  },
  {
    org: "九州大学大学院",
    role: "修士 / 博士課程",
    period: "2013年 〜 2018年",
    kind: "edu",
    desc: "多核クラスター錯体、金属有機構造体（MOF）の研究。",
  },
  {
    org: "琉球大学",
    role: "学部",
    period: "2009年 〜 2013年",
    kind: "edu",
    desc: "金属錯体の研究。",
  },
];

// -------------------------------------------------------------
// ヒーローのSNSアイコン列（公式ロゴ）
// -------------------------------------------------------------
export const socials: { key: IconKey; label: string; url: string }[] = [
  { key: "github", label: "GitHub", url: "https://github.com/ottantacinque" },
  { key: "x", label: "X (Twitter)", url: "https://x.com/okifukuto" },
  { key: "zenn", label: "Zenn", url: "https://zenn.dev/ottantachinque" },
  { key: "kaggle", label: "Kaggle", url: "https://www.kaggle.com/ystsuji" },
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/" }, // TODO: 正式URL
];
