"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PLAYERS, type Player } from "@/app/(app)/_data/players";
import type { TournamentGame } from "@/app/(app)/_data/tournaments";

export type PlayersHasTeam = "all" | "with-team" | "free-agent";

const VALID_GAMES: readonly TournamentGame[] = ["cod", "cs2", "lol", "valorant"];
const VALID_HAS_TEAM: readonly PlayersHasTeam[] = [
  "all",
  "with-team",
  "free-agent",
];

function parseGame(raw: string | null): TournamentGame | null {
  if (raw && (VALID_GAMES as readonly string[]).includes(raw)) {
    return raw as TournamentGame;
  }
  return null;
}

function parseHasTeam(raw: string | null): PlayersHasTeam {
  if (raw && (VALID_HAS_TEAM as readonly string[]).includes(raw)) {
    return raw as PlayersHasTeam;
  }
  return "all";
}

export function usePlayersFilter() {
  const params = useSearchParams();

  const initialSearch = params.get("q") ?? "";
  const initialGame = parseGame(params.get("game"));
  const initialHasTeam = parseHasTeam(params.get("team"));

  const [search, setSearch] = useState<string>(initialSearch);
  const [game, setGame] = useState<TournamentGame | null>(initialGame);
  const [hasTeam, setHasTeam] = useState<PlayersHasTeam>(initialHasTeam);

  const filtered: Player[] = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PLAYERS.filter((p) => {
      if (game && p.game !== game) return false;
      if (hasTeam === "with-team" && p.currentTeam === null) return false;
      if (hasTeam === "free-agent" && p.currentTeam !== null) return false;
      if (q) {
        const nickMatch = p.nick.toLowerCase().includes(q);
        const clanMatch =
          p.clanTag !== null && p.clanTag.toLowerCase().includes(q);
        if (!nickMatch && !clanMatch) return false;
      }
      return true;
    });
  }, [search, game, hasTeam]);

  return {
    search,
    setSearch,
    game,
    setGame,
    hasTeam,
    setHasTeam,
    filtered,
    total: PLAYERS.length,
  };
}
