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

export const metadata: Metadata = {
  title: "都地恭拡 | Tsuji Yasuhiro — Data Scientist / AI Engineer",
  description:
    "都地恭拡 (Tsuji Yasuhiro) のポートフォリオ。理学博士・データサイエンティスト・Kaggle Master。経歴と、アウトプット・インプット・制作物・受賞などの活動をまとめています。",
  openGraph: {
    title: "都地恭拡 | Tsuji Yasuhiro",
    description: "Data Scientist / AI Engineer · Ph.D. in Science · Kaggle Master",
    type: "website",
  },
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
