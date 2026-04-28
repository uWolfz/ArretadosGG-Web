"use client";

import { FilterChip } from "@/app/(app)/_components";
import type { PlayersHasTeam } from "../../_hooks/use-players-filter";

const OPTIONS: Array<{ value: PlayersHasTeam; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "with-team", label: "Com time" },
  { value: "free-agent", label: "Free agent" },
];

type PlayersListingHasTeamFilterProps = {
  value: PlayersHasTeam;
  onChange: (value: PlayersHasTeam) => void;
};

export function PlayersListingHasTeamFilter({
  value,
  onChange,
}: PlayersListingHasTeamFilterProps) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label="Filtrar por time">
      {OPTIONS.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
