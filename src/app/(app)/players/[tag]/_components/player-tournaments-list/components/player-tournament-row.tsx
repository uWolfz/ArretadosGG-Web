import Link from "next/link";
import {
  isPlayerTournamentWin,
  type TournamentPlacement,
} from "@/app/(app)/_data/players";
import type { Tournament } from "@/app/(app)/_data/tournaments";
import { cn } from "@/lib/utils";

export type PlayerTournamentEntry = {
  tour: Tournament;
  placement: TournamentPlacement;
  prize?: string;
};

type PlayerTournamentRowProps = {
  entry: PlayerTournamentEntry;
};

export function PlayerTournamentRow({ entry }: PlayerTournamentRowProps) {
  const isWin = isPlayerTournamentWin({
    tournamentSlug: entry.tour.slug,
    placement: entry.placement,
  });
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3">
      <Link
        href={`/tournaments/${entry.tour.slug}`}
        className="min-w-0 truncate font-display text-sm font-semibold text-foreground hover:underline"
      >
        {entry.tour.name}
      </Link>
      <div className="flex items-center gap-3">
        {entry.prize && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/65">
            {entry.prize}
          </span>
        )}
        <span
          className={cn(
            "rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
            isWin
              ? "border-brand-yellow text-brand-yellow"
              : "border-border text-foreground/75",
          )}
        >
          {entry.placement}
        </span>
      </div>
    </li>
  );
}
