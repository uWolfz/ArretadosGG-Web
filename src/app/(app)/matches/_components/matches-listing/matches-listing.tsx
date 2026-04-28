"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  RadioIcon,
  ClockIcon,
  FlagIcon,
  UserRoundIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Match, MatchStatus } from "@/app/(app)/_data/matches";
import type { TournamentGame } from "@/app/(app)/_data/tournaments";
import {
  GAME_SELECT_OPTIONS,
  type GameSelectValue,
} from "@/app/(app)/_data/games";
import { TournamentGameTag } from "@/app/(app)/tournaments/_components/tournament-game-tag";
import {
  EmptyState,
  ListingTabsNav,
  Pagination,
  SearchInput,
  sliceForPage,
  totalPagesFor,
  type ListingTabConfig,
} from "@/app/(app)/_components";
import { MatchRow } from "../match-row";

const GROUPS_PER_PAGE = 3;

type MatchesTabKey = "live" | "upcoming" | "finished" | "mine";

const VALID_TABS: readonly MatchesTabKey[] = [
  "live",
  "upcoming",
  "finished",
  "mine",
];

const TAB_STATUSES: Record<MatchesTabKey, MatchStatus[] | "mine"> = {
  live: ["live"],
  upcoming: ["upcoming"],
  finished: ["finished"],
  mine: "mine",
};

const TAB_ORDER: ReadonlyArray<ListingTabConfig<MatchesTabKey>> = [
  { key: "live", label: "Ao vivo", icon: RadioIcon },
  { key: "upcoming", label: "Próximas", icon: ClockIcon },
  { key: "finished", label: "Finalizadas", icon: FlagIcon },
  {
    key: "mine",
    label: "Minhas partidas",
    icon: UserRoundIcon,
    showCount: false,
  },
];

function isMatchesTabKey(value: string | null): value is MatchesTabKey {
  return value !== null && (VALID_TABS as readonly string[]).includes(value);
}

type MatchesListingProps = {
  items: Match[];
};

type MatchesListingGroup = {
  tournamentName: string;
  game: TournamentGame;
  matches: Match[];
};

function groupMatchesByTournament(matches: Match[]): MatchesListingGroup[] {
  const groups: MatchesListingGroup[] = [];
  const byName = new Map<string, MatchesListingGroup>();
  for (const match of matches) {
    let group = byName.get(match.tournamentName);
    if (!group) {
      group = {
        tournamentName: match.tournamentName,
        game: match.game,
        matches: [],
      };
      byName.set(match.tournamentName, group);
      groups.push(group);
    }
    group.matches.push(match);
  }
  return groups;
}

export function MatchesListing({ items }: MatchesListingProps) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<MatchesTabKey>(() => {
    const paramTab = searchParams.get("tab");
    return isMatchesTabKey(paramTab) ? paramTab : "live";
  });
  const [game, setGame] = useState<GameSelectValue>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const paramTab = searchParams.get("tab");
    if (isMatchesTabKey(paramTab)) setTab(paramTab);
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [tab, game, query]);

  const counts = useMemo(
    () =>
      VALID_TABS.reduce<Record<MatchesTabKey, number>>(
        (acc, key) => {
          const statuses = TAB_STATUSES[key];
          acc[key] =
            statuses === "mine"
              ? 0
              : items.filter((i) => statuses.includes(i.status)).length;
          return acc;
        },
        { live: 0, upcoming: 0, finished: 0, mine: 0 },
      ),
    [items],
  );

  const filtered = useMemo(() => {
    const statuses = TAB_STATUSES[tab];
    if (statuses === "mine") return [];

    const byStatus = items.filter((i) => statuses.includes(i.status));
    const byGame =
      game === "all" ? byStatus : byStatus.filter((i) => i.game === game);
    const q = query.trim().toLowerCase();
    const byQuery = q
      ? byGame.filter(
          (m) =>
            m.tournamentName.toLowerCase().includes(q) ||
            m.teamA.name.toLowerCase().includes(q) ||
            m.teamB.name.toLowerCase().includes(q),
        )
      : byGame;

    return [...byQuery].sort((a, b) => {
      if (tab === "finished") return b.startsAt.localeCompare(a.startsAt);
      return a.startsAt.localeCompare(b.startsAt);
    });
  }, [items, tab, game, query]);

  const grouped = useMemo(() => groupMatchesByTournament(filtered), [filtered]);

  return (
    <section
      id="listing"
      className="scroll-mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"
    >
      <ListingTabsNav
        tabs={TAB_ORDER}
        active={tab}
        onChange={setTab}
        counts={counts}
        ariaLabel="Filtrar partidas por estado"
      />

      {tab !== "mine" && (
        <div className="mb-5 flex items-center justify-end gap-2">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Buscar time ou torneio"
            className="w-56"
          />

          <Select
            value={game}
            onValueChange={(value) => setGame(value as GameSelectValue)}
          >
            <SelectTrigger className="w-auto min-w-[140px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GAME_SELECT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${tab}-${game}-${query}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {tab === "mine" ? (
            <EmptyState
              title="Faça login pra ver suas partidas"
              hint="Acompanhe aqui as partidas dos torneios que tu tá jogando."
              size="lg"
              action={
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-md bg-primary/50 px-5 py-2 text-sm font-semibold text-primary-foreground"
                  title="Em breve"
                >
                  Entrar · em breve
                </button>
              }
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Nenhuma partida encontrada com esses filtros."
              size="lg"
            />
          ) : (
            <div className="space-y-6">
              {sliceForPage(grouped, page, GROUPS_PER_PAGE).map((group) => (
                <section key={group.tournamentName}>
                  <header className="mb-2 flex items-center gap-3 px-1">
                    <TournamentGameTag game={group.game} />
                    <h3 className="truncate font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80">
                      {group.tournamentName}
                    </h3>
                    <span className="font-mono text-[11px] text-foreground/60">
                      {group.matches.length}{" "}
                      {group.matches.length === 1 ? "partida" : "partidas"}
                    </span>
                  </header>
                  <div className="overflow-hidden rounded-md border border-border bg-card/40">
                    {group.matches.map((match) => (
                      <MatchRow
                        key={match.id}
                        match={match}
                        hideTournament
                      />
                    ))}
                  </div>
                </section>
              ))}
              <Pagination
                page={page}
                totalPages={totalPagesFor(grouped, GROUPS_PER_PAGE)}
                onPageChange={setPage}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
