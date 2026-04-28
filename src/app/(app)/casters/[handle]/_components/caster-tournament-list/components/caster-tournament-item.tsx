import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import type { Tournament } from "@/app/(app)/_data/tournaments";
import { GameBadge } from "@/components/badges";
import { formatMonthYearPtBr } from "@/lib/format-date";

type CasterTournamentItemProps = {
  tournament: Tournament;
  isLast: boolean;
};

export function CasterTournamentItem({
  tournament,
  isLast,
}: CasterTournamentItemProps) {
  return (
    <li className={isLast ? "" : "border-b border-border"}>
      <Link
        href={`/tournaments/${tournament.slug}`}
        className="flex items-center gap-3 p-4 transition-colors hover:bg-foreground/5"
      >
        <div className="size-10 shrink-0 rounded-md bg-background p-1.5 ring-1 ring-border">
          <Image
            src={tournament.logo}
            alt=""
            width={40}
            height={40}
            className="size-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <GameBadge game={tournament.game} size="sm" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
              {formatMonthYearPtBr(tournament.startsAt)}
            </span>
          </div>
          <p className="mt-0.5 truncate font-display text-sm font-bold text-foreground">
            {tournament.name}
          </p>
        </div>
        <ChevronRightIcon
          className="size-4 shrink-0 text-foreground/55"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
