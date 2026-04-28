import type { Metadata } from "next";
import { NEWS } from "@/app/(app)/_data/news";
import { TournamentsSponsorRail } from "@/app/(app)/tournaments/_components";
import { NewsFeaturedCard, NewsListing } from "./_components";

export const metadata: Metadata = {
  title: "Notícias",
  description:
    "Recaps, anúncios e análises dos torneios, ligas e times da Arretados.",
};

export default function NewsPage() {
  // Pega a mais recente como destaque, o resto vai pra grid
  const sorted = [...NEWS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const featured = sorted[0];
  const rest = featured ? sorted.slice(1) : sorted;

  return (
    <div className="relative">
      <TournamentsSponsorRail side="left" />
      <TournamentsSponsorRail side="right" />

      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-foreground">
          Notícias
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Recaps, anúncios e análises do cenário Arretados.
        </p>
      </header>

      {featured && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <NewsFeaturedCard article={featured} />
        </section>
      )}

      <NewsListing items={rest} />
    </div>
  );
}
