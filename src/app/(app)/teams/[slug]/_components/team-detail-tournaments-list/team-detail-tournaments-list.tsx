import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import type { Team } from "@/app/(app)/_data/teams";
import { TOURNAMENTS } from "@/app/(app)/_data/tournaments";
import { EmptyState } from "@/app/(app)/_components";
import { GameBadge } from "@/components/badges";
import { cn } from "@/lib/utils";

type TeamDetailTournamentsListProps = {
  teamDetailTournaments: Team;
};

const STATUS_LABEL: Record<
  "live" | "open" | "upcoming" | "finished",
  string
> = {
  live: "Ao vivo",
  open: "Inscrições abertas",
  upcoming: "Em breve",
  finished: "Encerrado",
};

const STATUS_CLASS: Record<
  "live" | "open" | "upcoming" | "finished",
  string
> = {
  live: "text-brand-red",
  open: "text-brand-yellow",
  upcoming: "text-foreground/75",
  finished: "text-foreground/55",
};

export function TeamDetailTournamentsList({
  teamDetailTournaments,
}: TeamDetailTournamentsListProps) {
  const matchedTournamentsDetail = TOURNAMENTS.filter((t) =>
    teamDetailTournaments.tournaments.includes(t.name),
  );

  if (matchedTournamentsDetail.length === 0) {
    return (
      <EmptyState
        title="Sem histórico de torneios"
        hint="Assim que o time entrar em um torneio oficial, aparece aqui."
      />
    );
  }

  return (
    <ul className="overflow-hidden rounded-md border border-border bg-card/40">
      {matchedTournamentsDetail.map((tournament, index) => {
        const isLast = index === matchedTournamentsDetail.length - 1;
        return (
          <li
            key={tournament.slug}
            className={cn(isLast ? "" : "border-b border-border")}
          >
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
                  <span
                    className={cn(
                      "font-mono text-[10px] font-semibold uppercase tracking-wider",
                      STATUS_CLASS[tournament.status],
                    )}
                  >
                    {STATUS_LABEL[tournament.status]}
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
      })}
    </ul>
  );
}
