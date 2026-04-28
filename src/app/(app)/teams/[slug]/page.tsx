import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findTeamBySlug, TEAMS } from "@/app/(app)/_data/teams";
import { getMockCurrentUser } from "@/app/(app)/_data/current-user";
import { DetailBackLink, SectionHeader } from "@/app/(app)/_components";
import { TeamDetailHero } from "./_components/team-detail-hero/team-detail-hero";
import { TeamKpiGrid } from "./_components/team-kpi-grid/team-kpi-grid";
import { TeamIdentityCard } from "./_components/team-identity-card/team-identity-card";
import { TeamRecordCard } from "./_components/team-record-card/team-record-card";
import { TeamDetailRosterList } from "./_components/team-detail-roster-list/team-detail-roster-list";
import { TeamRecentMatches } from "./_components/team-recent-matches/team-recent-matches";
import { TeamDetailTournamentsList } from "./_components/team-detail-tournaments-list/team-detail-tournaments-list";

type TeamDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: TeamDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = findTeamBySlug(slug);
  if (!team) return { title: "Time não encontrado" };
  return {
    title: team.name,
    description: `${team.name} (${team.tag}) — ${team.location}. ${team.wins} vitórias, ${team.trophies} títulos.`,
  };
}

export default async function TeamDetailPage({
  params,
}: TeamDetailPageProps) {
  const { slug } = await params;
  const team = findTeamBySlug(slug);
  if (!team) notFound();

  const viewer = getMockCurrentUser();

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <DetailBackLink href="/teams" label="Todos os times" />
      </div>

      <TeamDetailHero teamDetailHero={team} viewerDetailHero={viewer} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-10">
            <section>
              <SectionHeader
                title="Stats"
                meta="Carreira competitiva"
              />
              <TeamKpiGrid teamKpiGrid={team} />
            </section>

            <section>
              <SectionHeader
                title="Roster"
                meta={`${team.roster.length} / ${team.membersCount}`}
              />
              <TeamDetailRosterList teamDetailRoster={team} />
            </section>

            <section>
              <SectionHeader title="Últimas partidas" />
              <TeamRecentMatches teamRecentMatches={team} />
            </section>

            <section>
              <SectionHeader
                title="Torneios"
                meta={`${team.tournaments.length}`}
              />
              <TeamDetailTournamentsList teamDetailTournaments={team} />
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <TeamIdentityCard teamIdentityCard={team} />
            <TeamRecordCard teamRecordCard={team} />
          </aside>
        </div>
      </div>
    </div>
  );
}
