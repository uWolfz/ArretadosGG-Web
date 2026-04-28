import type { Metadata } from "next";
import { Suspense } from "react";
import { MATCHES } from "@/app/(app)/_data/matches";
import { TournamentsSponsorRail } from "@/app/(app)/tournaments/_components";
import { MatchesListing } from "./_components";

export const metadata: Metadata = {
  title: "Partidas",
  description:
    "Partidas ao vivo, próximas e finalizadas dos torneios organizados pela Arretados.",
};

export default function MatchesPage() {
  return (
    <div className="relative">
      <TournamentsSponsorRail side="left" />
      <TournamentsSponsorRail side="right" />

      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-foreground">
          Partidas
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Ao vivo, próximas e resultados de todos os torneios.
        </p>
      </header>

      <Suspense fallback={null}>
        <MatchesListing items={MATCHES} />
      </Suspense>
    </div>
  );
}
