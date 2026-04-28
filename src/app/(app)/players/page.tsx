import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeader } from "@/app/(app)/_components";
import { PlayersListing } from "./_components";

export const metadata: Metadata = {
  title: "Players",
  description:
    "Perfis públicos de players competitivos na Arretados — stats verificados, histórico de times e campeonatos.",
};

export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Players"
        meta="Perfis públicos com stats verificados"
      />
      <Suspense fallback={null}>
        <PlayersListing />
      </Suspense>
    </div>
  );
}
