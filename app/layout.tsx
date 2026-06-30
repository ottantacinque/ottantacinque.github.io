import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://ottantacinque.github.io";
const siteTitle =
  "都地恭拡 | Yasuhiro Tsuji - AI Engineer / Kaggle Master";
const siteDescription =
  "都地恭拡（Yasuhiro Tsuji）のポートフォリオ。理学博士・データサイエンティスト・AI エンジニア・Kaggle Master。Machine Learning / Data Science を中心に、経歴・アウトプット・制作物・受賞などの活動をまとめています。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "都地恭拡",
    "都地 恭拡",
    "Yasuhiro Tsuji",
    "Tsuji Yasuhiro",
    "AI Engineer",
    "Kaggle Master",
    "Machine Learning",
    "Data Science",
    "Data Scientist",
    "Portfolio",
    "ポートフォリオ",
    "Zenn",
    "GitHub",
  ],
  authors: [{ name: "Yasuhiro Tsuji", url: siteUrl }],
  creator: "Yasuhiro Tsuji",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "都地恭拡 | Yasuhiro Tsuji",
    title: siteTitle,
    description: siteDescription,
    locale: "ja_JP",
    images: [
      {
        url: "/profile.jpg",
        width: 160,
        height: 160,
        alt: "都地恭拡 / Yasuhiro Tsuji",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    site: "@okifukuto",
    creator: "@okifukuto",
    images: ["/profile.jpg"],
  },
};

// schema.org Person 構造化データ（JSON-LD）
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yasuhiro Tsuji",
  alternateName: ["都地恭拡", "都地 恭拡", "Tsuji Yasuhiro"],
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  jobTitle: "Data Scientist / AI Engineer",
  description: siteDescription,
  sameAs: [
    "https://github.com/ottantacinque",
    "https://zenn.dev/ottantachinque",
    "https://www.kaggle.com/ystsuji",
    "https://x.com/okifukuto",
    "https://www.linkedin.com/in/%E6%81%AD%E6%8B%A1-%E9%83%BD%E5%9C%B0-2a5a0622a/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansJp.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
