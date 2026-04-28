import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeader } from "@/app/(app)/_components";
import { CastersListing } from "./_components";

export const metadata: Metadata = {
  title: "Casters",
  description:
    "Narradores, analistas e hosts oficiais dos torneios da Arretados.",
};

export default function CastersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Casters"
        meta="Grade oficial de transmissão"
      />
      <Suspense fallback={null}>
        <CastersListing />
      </Suspense>
    </div>
  );
}
