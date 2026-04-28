"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { DetailBackLink, SectionHeader } from "@/app/(app)/_components";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { findTeamBySlug } from "@/app/(app)/_data/teams";
import { MATCHES } from "@/app/(app)/_data/matches";
import { GAME_LABELS_LONG } from "@/app/(app)/_data/games";
import { MatchRow } from "@/app/(app)/matches/_components/match-row";
import {
  PlayerDetailHero,
  PlayerKpiGrid,
  PlayerStatsDetail,
  PlayerTeamsTimeline,
  PlayerTournamentsList,
  PlayerAchievementsGrid,
  PlayerIdentityCard,
  PlayerRankingCard,
  PlayerSponsorSlot,
  PlayerArtDialog,
} from "./_components";

export default function PlayerDetailPage() {
  const params = useParams<{ tag: string }>();
  const player = findPlayerByTag(params.tag);
  if (!player) notFound();

  const [artOpen, setArtOpen] = useState(false);

  // V0: proxy por time atual — matches carregam só tag/name do time, não roster.
  // Quando roster real entrar, filtrar pelos matches em que o player jogou de fato.
  const currentTeam = player.currentTeam ? findTeamBySlug(player.currentTeam) ?? null : null;
  const recentMatches = currentTeam
    ? MATCHES.filter(
        (m) =>
          m.teamA.tag === currentTeam.tag || m.teamB.tag === currentTeam.tag,
      ).slice(0, 8)
    : [];

  return (
    <div>
      <DetailBackLink href="/players" label="Todos os players" />

      <PlayerDetailHero
        player={player}
        onGenerateArt={() => setArtOpen(true)}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <section>
              <SectionHeader
                title={GAME_LABELS_LONG[player.game]}
                meta="Stats verificados"
              />
              <div className="space-y-5">
                <PlayerKpiGrid player={player} />
                <PlayerStatsDetail player={player} />
              </div>
            </section>

            <section>
              <SectionHeader title="Times" />
              <PlayerTeamsTimeline player={player} />
            </section>

            <section>
              <SectionHeader title="Campeonatos disputados" />
              <PlayerTournamentsList player={player} />
            </section>

            {recentMatches.length > 0 && (
              <section>
                <SectionHeader
                  title="Últimas partidas"
                  meta={`${recentMatches.length}`}
                />
                <div className="overflow-hidden rounded-md border border-border bg-card/40">
                  {recentMatches.map((match) => (
                    <MatchRow key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {player.achievements.length > 0 && (
              <section>
                <SectionHeader title="Conquistas" />
                <PlayerAchievementsGrid player={player} />
              </section>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <PlayerIdentityCard player={player} />
            <PlayerRankingCard player={player} />
            <PlayerSponsorSlot />
          </aside>
        </div>
      </div>

      <PlayerArtDialog
        nick={player.nick}
        open={artOpen}
        onOpenChange={setArtOpen}
      />
    </div>
  );
}
