"use client";

import { SearchIcon } from "lucide-react";
import { FilterChip } from "@/app/(app)/_components";
import { GAME_LABELS_SHORT } from "@/app/(app)/_data/games";
import type { TournamentGame } from "@/app/(app)/_data/tournaments";

const GAMES: readonly TournamentGame[] = ["cod", "cs2", "lol", "valorant"];

type PlayersListingSearchAndGameProps = {
  search: string;
  onSearchChange: (value: string) => void;
  game: TournamentGame | null;
  onGameChange: (value: TournamentGame | null) => void;
};

export function PlayersListingSearchAndGame({
  search,
  onSearchChange,
  game,
  onGameChange,
}: PlayersListingSearchAndGameProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:max-w-sm sm:flex-1">
        <SearchIcon className="size-4 text-foreground/60" aria-hidden="true" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nick ou clã"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/55"
          aria-label="Buscar players"
        />
      </label>

      <div className="flex flex-wrap items-center gap-1.5">
        <FilterChip
          label="Todos"
          active={game === null}
          onClick={() => onGameChange(null)}
        />
        {GAMES.map((g) => (
          <FilterChip
            key={g}
            label={GAME_LABELS_SHORT[g]}
            active={game === g}
            onClick={() => onGameChange(g === game ? null : g)}
            accent="yellow"
          />
        ))}
      </div>
    </div>
  );
}
