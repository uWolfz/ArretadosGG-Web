import { findTournamentBySlug } from "@/app/(app)/_data/tournaments";
import type { Player } from "@/app/(app)/_data/players";
import { EmptyState } from "@/app/(app)/_components";
import { isNotNull } from "@/lib/type-guards";
import {
  PlayerTournamentRow,
  type PlayerTournamentEntry,
} from "./components/player-tournament-row";

type PlayerTournamentsListProps = {
  player: Player;
};

export function PlayerTournamentsList({
  player,
}: PlayerTournamentsListProps) {
  if (player.tournamentsPlayed.length === 0) {
    return <EmptyState title="Sem histórico de campeonatos ainda" />;
  }

  const items: PlayerTournamentEntry[] = player.tournamentsPlayed
    .map((tp) => {
      const tour = findTournamentBySlug(tp.tournamentSlug);
      return tour
        ? { tour, placement: tp.placement, prize: tp.prize }
        : null;
    })
    .filter(isNotNull);

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
      {items.map((entry) => (
        <PlayerTournamentRow key={entry.tour.slug} entry={entry} />
      ))}
    </ul>
  );
}
