"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/app/(app)/_components";
import {
  GAME_SELECT_OPTIONS,
  type GameSelectValue,
} from "@/app/(app)/_data/games";

type ListingSearchAndGameProps = {
  query: string;
  onQueryChange: (query: string) => void;
  game: GameSelectValue;
  onGameChange: (game: GameSelectValue) => void;
};

export function ListingSearchAndGame({
  query,
  onQueryChange,
  game,
  onGameChange,
}: ListingSearchAndGameProps) {
  return (
    <div className="flex items-center gap-2">
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Buscar torneio"
        className="sm:w-56"
      />

      <Select
        value={game}
        onValueChange={(value) => onGameChange(value as GameSelectValue)}
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
  );
}
