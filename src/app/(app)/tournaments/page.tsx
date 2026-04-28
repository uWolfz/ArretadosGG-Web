import type { Metadata } from "next";
import { Suspense } from "react";
import { TOURNAMENTS } from "@/app/(app)/_data/tournaments";
import {
  TournamentsListing,
  TournamentsLiveNow,
  TournamentsSpotlight,
  TournamentsSponsorRail,
} from "./_components";

export const metadata: Metadata = {
  title: "Torneios",
  description:
    "Torneios de CoD, LoL, Valorant e CS2 organizados pela Arretados.",
};

export default function TournamentsPage() {
  const liveItems = TOURNAMENTS.filter((t) => t.status === "live");

  // 0-1 live: spotlight único (pega o live se existe, senão próximo open/upcoming).
  // 2+ live: LiveNow em cards, spotlight some — dá overview de tudo rolando ao vivo.
  const spotlight =
    liveItems.length <= 1
      ? (liveItems[0] ??
        TOURNAMENTS.find((t) => t.status === "open") ??
        TOURNAMENTS.find((t) => t.status === "upcoming"))
      : undefined;

  // Tabela: remove o que já tá no destaque (evita duplicação).
  const shownLiveInCards = liveItems.length >= 2 ? liveItems.slice(0, 3) : [];
  const hiddenFromTable = new Set<(typeof TOURNAMENTS)[number]>([
    ...(spotlight ? [spotlight] : []),
    ...shownLiveInCards,
  ]);
  const tableList = TOURNAMENTS.filter((t) => !hiddenFromTable.has(t));

  return (
    <div className="relative">
      {/* Rails laterais de patrocinadores — aparecem só em viewports ≥ 1650px */}
      <TournamentsSponsorRail side="left" />
      <TournamentsSponsorRail side="right" />

      {/* Título da página — GC style, direto ao ponto */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-foreground">
          Campeonatos
        </h1>
      </header>

      {spotlight && <TournamentsSpotlight tournament={spotlight} />}
      <TournamentsLiveNow items={liveItems} />
      <Suspense fallback={null}>
        <TournamentsListing items={tableList} />
      </Suspense>
    </div>
  );
}
