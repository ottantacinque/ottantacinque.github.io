import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { Career } from "@/components/Career";
import { Activities } from "@/components/Activities";
import { Inputs } from "@/components/Inputs";
import { Footer } from "@/components/Footer";
import { fetchZennArticles } from "@/lib/zenn";
import { buildItems, buildSections, buildSubFilters } from "@/lib/activities";

export default async function Home() {
  // Zenn 記事をサーバー側で取得（ISR で定期的に自動更新）
  const articles = await fetchZennArticles();
  const tops = buildSections(buildItems(articles));
  const subFilters = buildSubFilters(tops);

  return (
    <>
      <ThemeToggle />
      <main className="mx-auto max-w-5xl px-5 pt-10 sm:px-8">
        <Hero />
        <Career />
        <Activities tops={tops} subFilters={subFilters} />
        <Inputs />
        <Footer />
      </main>
    </>
  );
}
