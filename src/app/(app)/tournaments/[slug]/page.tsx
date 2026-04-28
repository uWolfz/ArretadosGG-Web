import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  findTournamentBySlug,
  TOURNAMENTS,
} from "@/app/(app)/_data/tournaments";
import { MATCHES } from "@/app/(app)/_data/matches";
import { TEAMS } from "@/app/(app)/_data/teams";
import { DetailBackLink, SectionHeader } from "@/app/(app)/_components";
import { TournamentsSponsorRail } from "@/app/(app)/tournaments/_components";
import { MatchRow } from "@/app/(app)/matches/_components/match-row";
import { TeamCard } from "@/app/(app)/teams/_components/team-card";
import { formatLongDayMonthYearHourMinPtBr } from "@/lib/format-date";
import { TournamentDetailHero } from "./_components";
import { TournamentCasters } from "./_components/tournament-casters";

type TournamentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TOURNAMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tournament = findTournamentBySlug(slug);
  if (!tournament) return { title: "Torneio não encontrado" };
  return {
    title: tournament.name,
    description: tournament.bio.split("\n")[0] ?? tournament.name,
  };
}

export default async function TournamentDetailPage({
  params,
}: TournamentPageProps) {
  const { slug } = await params;
  const tournament = findTournamentBySlug(slug);
  if (!tournament) notFound();

  const paragraphs = tournament.bio.split("\n\n").filter((p) => p.trim());
  const rulesLines = tournament.rules.split("\n").filter((l) => l.trim());

  const relatedMatches = MATCHES.filter(
    (m) => m.tournamentName === tournament.name,
  ).sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const registeredTeams = TEAMS.filter((t) =>
    t.tournaments.includes(tournament.name),
  ).sort((a, b) => b.wins - a.wins);

  return (
    <div className="relative">
      <TournamentsSponsorRail side="left" />
      <TournamentsSponsorRail side="right" />

      <DetailBackLink href="/tournaments" label="Todos os torneios" />

      <TournamentDetailHero tournament={tournament} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <section>
              <SectionHeader title="Sobre o torneio" />
              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {tournament.prizeBreakdown.length > 0 && (
              <section>
                <SectionHeader
                  title="Premiação"
                  meta={`Total · ${tournament.prizeDisplay}`}
                />
                <ul className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
                  {tournament.prizeBreakdown.map((entry) => (
                    <li
                      key={entry.position}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <span className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground/80">
                        {entry.position}
                      </span>
                      <span className="font-display text-base font-bold tabular-nums text-foreground">
                        {entry.prize}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <SectionHeader title="Regulamento" />
              <div className="rounded-md border border-border bg-card p-5">
                <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
                  Formato · {tournament.format}
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {rulesLines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-md border border-border bg-card p-5">
              <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
                Informações rápidas
              </h2>
              <dl className="space-y-3 text-sm">
                <SidebarRow
                  label="Início"
                  value={formatLongDayMonthYearHourMinPtBr(tournament.startsAt)}
                />
                {tournament.registrationEndsAt && (
                  <SidebarRow
                    label="Inscrições até"
                    value={formatLongDayMonthYearHourMinPtBr(
                      tournament.registrationEndsAt,
                    )}
                    accent="yellow"
                  />
                )}
                <SidebarRow label="Formato" value={tournament.format} />
                <SidebarRow
                  label="Times"
                  value={`${tournament.teamsRegistered} / ${tournament.teamsTotal}`}
                />
                <SidebarRow label="Modalidade" value={tournament.teamSize} />
                <SidebarRow
                  label="Inscrição"
                  value={
                    tournament.registrationType === "invite"
                      ? "Por convite"
                      : "Aberta"
                  }
                />
                {tournament.venue && (
                  <SidebarRow label="Local" value={tournament.venue} />
                )}
                {tournament.champion && (
                  <SidebarRow
                    label="Campeão"
                    value={tournament.champion}
                    accent="yellow"
                  />
                )}
              </dl>
            </div>

            {tournament.status === "live" && tournament.streamUrl && (
              <a
                href={tournament.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md border border-brand-red/40 bg-brand-red/10 p-4 text-center transition-colors hover:bg-brand-red/15"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-red">
                  <span className="inline-block size-1.5 rounded-full bg-brand-red animate-live-pulse" />
                  Assistindo ao vivo
                </span>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Entrar na stream →
                </p>
              </a>
            )}

            {tournament.casters && tournament.casters.length > 0 && (
              <TournamentCasters casters={tournament.casters} />
            )}
          </aside>
        </div>

        {registeredTeams.length > 0 && (
          <section className="mt-8">
            <SectionHeader
              title="Times inscritos"
              meta={`${registeredTeams.length}${registeredTeams.length === tournament.teamsTotal ? "" : ` de ${tournament.teamsTotal}`}`}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {registeredTeams.map((team) => (
                <TeamCard key={team.slug} team={team} />
              ))}
            </div>
          </section>
        )}

        {relatedMatches.length > 0 && (
          <section className="mt-8">
            <SectionHeader
              title="Partidas"
              meta={`${relatedMatches.length}${relatedMatches.length === 1 ? " partida" : " partidas"}`}
            />
            <div className="overflow-hidden rounded-md border border-border bg-card/40">
              {relatedMatches.map((match) => (
                <MatchRow key={match.id} match={match} hideTournament />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

type SidebarRowProps = {
  label: string;
  value: string;
  accent?: "yellow";
};

function SidebarRow({ label, value, accent }: SidebarRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
        {label}
      </dt>
      <dd
        className={
          accent === "yellow"
            ? "font-semibold text-brand-yellow"
            : "font-medium text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}
