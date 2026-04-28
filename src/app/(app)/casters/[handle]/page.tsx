import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";
import {
  CASTERS,
  findCasterByPlayerTag,
} from "@/app/(app)/_data/casters";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { getTournamentsCastedByPlayerTag } from "@/app/(app)/_data/tournaments";
import { DetailBackLink, SectionHeader } from "@/app/(app)/_components";
import { CasterDetailHero } from "./_components/caster-detail-hero";
import { CasterKpiGrid } from "./_components/caster-kpi-grid";
import { CasterIdentityCard } from "./_components/caster-identity-card";
import { CasterSpecialtiesSection } from "./_components/caster-specialties-section";
import { CasterEndorsementsSection } from "./_components/caster-endorsements-section";
import { CasterReviewsSection } from "./_components/caster-reviews-section";
import { CasterRecentClipsGrid } from "./_components/caster-recent-clips-grid";
import { CasterPortfolioLinks } from "./_components/caster-portfolio-links";
import { CasterTournamentList } from "./_components/caster-tournament-list";

type CasterDetailPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  return CASTERS.map((c) => ({ handle: c.playerTag }));
}

export async function generateMetadata({
  params,
}: CasterDetailPageProps): Promise<Metadata> {
  const { handle } = await params;
  const caster = findCasterByPlayerTag(handle);
  if (!caster) return { title: "Caster não encontrado" };
  const player = findPlayerByTag(caster.playerTag);
  const displayName = player?.nick ?? caster.playerTag;
  return {
    title: displayName,
    description: caster.bio.slice(0, 160),
  };
}

export default async function CasterDetailPage({
  params,
}: CasterDetailPageProps) {
  const { handle } = await params;
  const caster = findCasterByPlayerTag(handle);
  if (!caster) notFound();

  const player = findPlayerByTag(caster.playerTag);
  const tournaments = getTournamentsCastedByPlayerTag(caster.playerTag);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <DetailBackLink href="/casters" label="Todos os casters" />
      </div>

      <CasterDetailHero
        casterDetailHero={caster}
        playerDetailHero={player}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-10">
            <section>
              <SectionHeader
                title="Performance do booth"
                meta="Métricas agregadas"
              />
              <CasterKpiGrid casterKpiGrid={caster} />
            </section>

            <section>
              <SectionHeader title="Sobre" />
              <div className="rounded-md border border-border bg-card p-5">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
                  {caster.bio}
                </p>
              </div>
            </section>

            <section>
              <SectionHeader
                title="Especialidades"
                meta={`${caster.specialties.length}`}
              />
              <CasterSpecialtiesSection casterSpecialties={caster} />
            </section>

            <section>
              <SectionHeader
                title="Clipes recentes"
                meta={`${caster.recentClips.length}`}
              />
              <CasterRecentClipsGrid casterRecentClips={caster} />
            </section>

            <section>
              <SectionHeader
                title="Endosso de players"
                meta={`${caster.endorsements.length}`}
              />
              <CasterEndorsementsSection casterEndorsements={caster} />
            </section>

            <section>
              <SectionHeader
                title="Comentários"
                meta={`${caster.reviews.length}`}
              />
              <CasterReviewsSection casterReviews={caster} />
            </section>

            <section>
              <SectionHeader
                title="Portfolio"
                meta={`${caster.portfolioLinks.length + 1} links`}
              />
              <CasterPortfolioLinks casterPortfolio={caster} />
            </section>

            <section>
              <SectionHeader
                title="Torneios casteados"
                meta={`${tournaments.length}`}
              />
              <CasterTournamentList tournaments={tournaments} />
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <CasterIdentityCard casterIdentityCard={caster} />
            {player && (
              <Link
                href={`/players/${player.tag}`}
                className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground/75 transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <span>Ver perfil de player</span>
                <ExternalLinkIcon
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
