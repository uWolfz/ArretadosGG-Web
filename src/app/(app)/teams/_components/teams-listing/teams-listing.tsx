"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayersIcon, SwordsIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Team, TeamTier } from "@/app/(app)/_data/teams";
import {
  TOURNAMENTS,
  type Tournament,
  type TournamentStatus,
} from "@/app/(app)/_data/tournaments";
import {
  GAME_SELECT_OPTIONS,
  type GameSelectValue,
} from "@/app/(app)/_data/games";
import { TournamentGameTag } from "@/app/(app)/tournaments/_components/tournament-game-tag";
import { TournamentStatusBadge } from "@/app/(app)/tournaments/_components/tournament-status-badge";
import {
  EmptyState,
  ListingTabsNav,
  Pagination,
  SearchInput,
  sliceForPage,
  totalPagesFor,
  type ListingTabConfig,
} from "@/app/(app)/_components";
import { TeamCard } from "../team-card";

const TEAMS_PER_PAGE = 9;
const GROUPS_PER_PAGE = 3;

type TeamsListingTabKey = "all" | "byTournament";

type TeamsListingProps = {
  items: Team[];
};

const TAB_ORDER: ReadonlyArray<ListingTabConfig<TeamsListingTabKey>> = [
  { key: "all", label: "Todos os times", icon: LayersIcon },
  { key: "byTournament", label: "Por campeonato", icon: SwordsIcon },
];

const TIER_OPTIONS: Array<{ value: TeamTier | "all"; label: string }> = [
  { value: "all", label: "Todos os níveis" },
  { value: "pro", label: "Pro" },
  { value: "contender", label: "Acesso" },
  { value: "amador", label: "Amador" },
];

const TOURNAMENT_STATUS_PRIORITY: Record<TournamentStatus, number> = {
  live: 0,
  open: 1,
  upcoming: 2,
  finished: 3,
};

type TeamsListingTournamentGroup = {
  tournament: Tournament;
  teams: Team[];
};

function groupTeamsByTournament(teams: Team[]): TeamsListingTournamentGroup[] {
  const groups: TeamsListingTournamentGroup[] = [];
  const byName = new Map<string, TeamsListingTournamentGroup>();

  for (const team of teams) {
    for (const tournamentName of team.tournaments) {
      const tournament = TOURNAMENTS.find((t) => t.name === tournamentName);
      if (!tournament) continue;

      let group = byName.get(tournamentName);
      if (!group) {
        group = { tournament, teams: [] };
        byName.set(tournamentName, group);
        groups.push(group);
      }
      group.teams.push(team);
    }
  }

  groups.sort((a, b) => {
    const pA = TOURNAMENT_STATUS_PRIORITY[a.tournament.status];
    const pB = TOURNAMENT_STATUS_PRIORITY[b.tournament.status];
    if (pA !== pB) return pA - pB;
    return a.tournament.startsAt.localeCompare(b.tournament.startsAt);
  });

  return groups;
}

export function TeamsListing({ items }: TeamsListingProps) {
  const [tab, setTab] = useState<TeamsListingTabKey>("all");
  const [game, setGame] = useState<GameSelectValue>("all");
  const [tier, setTier] = useState<TeamTier | "all">("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [tab, game, tier, query]);

  const counts = useMemo(
    () =>
      ({
        all: items.length,
        byTournament: new Set(items.flatMap((i) => i.tournaments)).size,
      }) as Record<TeamsListingTabKey, number>,
    [items],
  );

  const filtered = useMemo(() => {
    const byGame =
      game === "all" ? items : items.filter((i) => i.primaryGame === game);
    const byTier =
      tier === "all" ? byGame : byGame.filter((i) => i.tier === tier);
    const q = query.trim().toLowerCase();
    const byQuery = q
      ? byTier.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.tag.toLowerCase().includes(q),
        )
      : byTier;

    return [...byQuery].sort((a, b) => b.wins - a.wins);
  }, [items, game, tier, query]);

  const groupedByTournament = useMemo(
    () => groupTeamsByTournament(filtered),
    [filtered],
  );

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
        ariaLabel="Visualização de times"
      />

      <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar time"
          className="w-56"
        />

        <Select
          value={tier}
          onValueChange={(value) => setTier(value as TeamTier | "all")}
        >
          <SelectTrigger className="w-auto min-w-[140px] bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${tab}-${game}-${tier}-${query}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {tab === "all" ? (
            <TeamsListingAllView
              teams={filtered}
              page={page}
              onPageChange={setPage}
            />
          ) : (
            <TeamsListingByTournamentView
              groups={groupedByTournament}
              page={page}
              onPageChange={setPage}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

type TeamsListingAllViewProps = {
  teams: Team[];
  page: number;
  onPageChange: (page: number) => void;
};

function TeamsListingAllView({
  teams,
  page,
  onPageChange,
}: TeamsListingAllViewProps) {
  if (teams.length === 0) {
    return <EmptyState title="Nenhum time encontrado com esses filtros." size="lg" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sliceForPage(teams, page, TEAMS_PER_PAGE).map((team) => (
          <TeamCard key={team.slug} team={team} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPagesFor(teams, TEAMS_PER_PAGE)}
        onPageChange={onPageChange}
      />
    </>
  );
}

type TeamsListingByTournamentViewProps = {
  groups: TeamsListingTournamentGroup[];
  page: number;
  onPageChange: (page: number) => void;
};

function TeamsListingByTournamentView({
  groups,
  page,
  onPageChange,
}: TeamsListingByTournamentViewProps) {
  if (groups.length === 0) {
    return (
      <EmptyState
        title="Nenhum campeonato com times registrados nos filtros atuais."
        size="lg"
      />
    );
  }

  return (
    <div className="space-y-8">
      {sliceForPage(groups, page, GROUPS_PER_PAGE).map((group) => (
        <section key={group.tournament.name}>
          <header className="mb-3 flex flex-wrap items-center gap-3">
            <TournamentGameTag game={group.tournament.game} />
            <h3 className="truncate font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80">
              {group.tournament.name}
            </h3>
            <TournamentStatusBadge status={group.tournament.status} />
            <span className="ml-auto font-mono text-[11px] text-foreground/60">
              {group.teams.length}{" "}
              {group.teams.length === 1 ? "time" : "times"}
            </span>
          </header>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.teams.map((team) => (
              <TeamCard key={team.slug} team={team} />
            ))}
          </div>
        </section>
      ))}
      <Pagination
        page={page}
        totalPages={totalPagesFor(groups, GROUPS_PER_PAGE)}
        onPageChange={onPageChange}
      />
    </div>
  );
}
