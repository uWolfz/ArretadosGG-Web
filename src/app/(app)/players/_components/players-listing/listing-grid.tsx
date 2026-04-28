import type { Player } from "@/app/(app)/_data/players";
import { EmptyState } from "@/app/(app)/_components";
import { PlayerCard } from "../player-card";

type PlayersListingGridProps = {
  players: Player[];
};

export function PlayersListingGrid({ players }: PlayersListingGridProps) {
  if (players.length === 0) {
    return (
      <EmptyState
        title="Nenhum player encontrado"
        hint="Ajuste a busca ou os filtros."
        size="lg"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {players.map((p) => (
        <PlayerCard key={p.tag} player={p} />
      ))}
    </div>
  );
}
