import type { Metadata } from "next";
import { FinalCta, SiteFooter } from "@/app/(marketing)/_components";
import { CASES } from "@/app/(marketing)/_data/cases";
import { CasesGrid, CasesIntro, CasesStats } from "./_components";

export const metadata: Metadata = {
  title: "Cases · Arretados",
  description:
    "Cases de operação esports da Arretados — broadcast, liga, software e audiovisual rodados ponta a ponta.",
};

export default function CasesPage() {
  return (
    <>
      <CasesIntro />
      <CasesStats />
      <CasesGrid cases={CASES} />
      <FinalCta />
      <SiteFooter />
    </>
  );
}
