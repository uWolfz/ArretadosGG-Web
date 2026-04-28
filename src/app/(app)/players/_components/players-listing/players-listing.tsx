"use client";

import { usePlayersFilter } from "../../_hooks/use-players-filter";
import { PlayersListingSearchAndGame } from "./listing-search-and-game";
import { PlayersListingHasTeamFilter } from "./listing-has-team-filter";
import { PlayersListingGrid } from "./listing-grid";

export function PlayersListing() {
  const {
    search,
    setSearch,
    game,
    setGame,
    hasTeam,
    setHasTeam,
    filtered,
    total,
  } = usePlayersFilter();

  return (
    <div className="space-y-5">
      <PlayersListingSearchAndGame
        search={search}
        onSearchChange={setSearch}
        game={game}
        onGameChange={setGame}
      />
      <div className="flex items-center justify-between gap-3">
        <PlayersListingHasTeamFilter value={hasTeam} onChange={setHasTeam} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/65">
          {filtered.length} de {total}
        </span>
      </div>
      <PlayersListingGrid players={filtered} />
    </div>
  );
}
