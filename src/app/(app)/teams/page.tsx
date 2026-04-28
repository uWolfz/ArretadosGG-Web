import type { Metadata } from "next";
import { TEAMS } from "@/app/(app)/_data/teams";
import { TournamentsSponsorRail } from "@/app/(app)/tournaments/_components";
import { TeamsListing } from "./_components";

export const metadata: Metadata = {
  title: "Times",
  description:
    "Times que disputam os torneios da Arretados — pro, acesso e amador.",
};

export default function TeamsPage() {
  return (
    <div className="relative">
      <TournamentsSponsorRail side="left" />
      <TournamentsSponsorRail side="right" />

      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-foreground">
          Times
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          {TEAMS.length} organizações disputam circuitos da Arretados.
        </p>
      </header>

      <TeamsListing items={TEAMS} />
    </div>
  );
}
