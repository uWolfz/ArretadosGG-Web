"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type {
  TournamentCore,
  TournamentGame,
  TournamentStatus,
  TournamentTeamSize,
} from "@/app/(app)/_data/tournaments";

export type TournamentsFilterTab = "upcoming" | "live" | "finished" | "mine";

const VALID_TABS: readonly TournamentsFilterTab[] = [
  "upcoming",
  "live",
  "finished",
  "mine",
];

const TAB_STATUSES: Record<
  TournamentsFilterTab,
  TournamentStatus[] | "mine"
> = {
  upcoming: ["open", "upcoming"],
  live: ["live"],
  finished: ["finished"],
  mine: "mine",
};

export type TournamentsModalityFilters = {
  openRegistration: boolean;
  inviteOnly: boolean;
  size1v1: boolean;
  size2v2: boolean;
  size5v5: boolean;
};

export const EMPTY_MODALITY_FILTERS: TournamentsModalityFilters = {
  openRegistration: false,
  inviteOnly: false,
  size1v1: false,
  size2v2: false,
  size5v5: false,
};

type UseTournamentsFilterArgs = {
  items: TournamentCore[];
};

export type UseTournamentsFilterReturn = {
  tab: TournamentsFilterTab;
  setTab: (tab: TournamentsFilterTab) => void;
  game: TournamentGame | "all";
  setGame: (game: TournamentGame | "all") => void;
  query: string;
  setQuery: (query: string) => void;
  modalityFilters: TournamentsModalityFilters;
  toggleModalityFilterTournaments: (
    key: keyof TournamentsModalityFilters,
  ) => void;
  page: number;
  setPage: (page: number) => void;
  filtered: TournamentCore[];
  counts: Record<TournamentsFilterTab, number>;
  /** chave estável pra AnimatePresence — evita JSON.stringify em render */
  filterKey: string;
};

function isTournamentsFilterTab(
  value: string | null,
): value is TournamentsFilterTab {
  return value !== null && (VALID_TABS as readonly string[]).includes(value);
}

function buildFilterKey(
  tab: TournamentsFilterTab,
  game: TournamentGame | "all",
  query: string,
  modalityFilters: TournamentsModalityFilters,
): string {
  const flags = [
    modalityFilters.openRegistration ? "o" : "-",
    modalityFilters.inviteOnly ? "i" : "-",
    modalityFilters.size1v1 ? "1" : "-",
    modalityFilters.size2v2 ? "2" : "-",
    modalityFilters.size5v5 ? "5" : "-",
  ].join("");
  return `${tab}|${game}|${query}|${flags}`;
}

export function useTournamentsFilter({
  items,
}: UseTournamentsFilterArgs): UseTournamentsFilterReturn {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<TournamentsFilterTab>(() => {
    const paramTab = searchParams.get("tab");
    return isTournamentsFilterTab(paramTab) ? paramTab : "upcoming";
  });
  const [game, setGame] = useState<TournamentGame | "all">("all");
  const [query, setQuery] = useState("");
  const [modalityFilters, setModalityFilters] =
    useState<TournamentsModalityFilters>(EMPTY_MODALITY_FILTERS);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const paramTab = searchParams.get("tab");
    if (isTournamentsFilterTab(paramTab)) setTab(paramTab);
  }, [searchParams]);

  // Reseta pra página 1 sempre que qualquer filtro muda — evita "página 5 vazia".
  useEffect(() => {
    setPage(1);
  }, [tab, game, query, modalityFilters]);

  const counts = useMemo(() => {
    return (Object.keys(TAB_STATUSES) as TournamentsFilterTab[]).reduce(
      (acc, key) => {
        const statuses = TAB_STATUSES[key];
        if (statuses === "mine") {
          acc[key] = 0;
        } else {
          acc[key] = items.filter((i) => statuses.includes(i.status)).length;
        }
        return acc;
      },
      { upcoming: 0, live: 0, finished: 0, mine: 0 } as Record<
        TournamentsFilterTab,
        number
      >,
    );
  }, [items]);

  const filtered = useMemo(() => {
    if (tab === "mine") return [];

    const statuses = TAB_STATUSES[tab] as TournamentStatus[];
    const byStatus = items.filter((i) => statuses.includes(i.status));
    const byGame =
      game === "all" ? byStatus : byStatus.filter((i) => i.game === game);
    const trimmedQuery = query.trim().toLowerCase();
    const byQuery = trimmedQuery
      ? byGame.filter((t) => t.name.toLowerCase().includes(trimmedQuery))
      : byGame;

    const activeSizes: TournamentTeamSize[] = [];
    if (modalityFilters.size1v1) activeSizes.push("1v1");
    if (modalityFilters.size2v2) activeSizes.push("2v2");
    if (modalityFilters.size5v5) activeSizes.push("5v5");

    const byModality = byQuery.filter((t) => {
      if (modalityFilters.openRegistration && t.registrationType !== "open")
        return false;
      if (modalityFilters.inviteOnly && t.registrationType !== "invite")
        return false;
      if (activeSizes.length > 0 && !activeSizes.includes(t.teamSize))
        return false;
      return true;
    });

    return [...byModality].sort((a, b) => {
      if (tab === "finished") return b.startsAt.localeCompare(a.startsAt);
      return a.startsAt.localeCompare(b.startsAt);
    });
  }, [items, tab, game, query, modalityFilters]);

  const toggleModalityFilterTournaments = (
    key: keyof TournamentsModalityFilters,
  ) => {
    setModalityFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filterKey = buildFilterKey(tab, game, query, modalityFilters);

  return {
    tab,
    setTab,
    game,
    setGame,
    query,
    setQuery,
    modalityFilters,
    toggleModalityFilterTournaments,
    page,
    setPage,
    filtered,
    counts,
    filterKey,
  };
}
