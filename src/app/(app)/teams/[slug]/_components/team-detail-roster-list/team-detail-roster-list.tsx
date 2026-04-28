import Link from "next/link";
import Image from "next/image";
import { CrownIcon } from "lucide-react";
import type { Team } from "@/app/(app)/_data/teams";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { EmptyState } from "@/app/(app)/_components";
import { formatDayMonthYearPtBr } from "@/lib/format-date";
import { cn } from "@/lib/utils";

type TeamDetailRosterListProps = {
  teamDetailRoster: Team;
};

export function TeamDetailRosterList({
  teamDetailRoster,
}: TeamDetailRosterListProps) {
  if (teamDetailRoster.roster.length === 0) {
    return (
      <EmptyState
        title="Roster ainda não preenchido"
        hint="O capitão vai cadastrar os membros em breve."
      />
    );
  }

  return (
    <ul className="overflow-hidden rounded-md border border-border bg-card/40">
      {teamDetailRoster.roster.map((entry, index) => {
        const player = findPlayerByTag(entry.playerTag);
        const isLast = index === teamDetailRoster.roster.length - 1;
        const isCaptain = entry.role === "captain";
        return (
          <li
            key={entry.playerTag}
            className={cn(isLast ? "" : "border-b border-border")}
          >
            {player ? (
              <Link
                href={`/players/${player.tag}`}
                className="flex items-center gap-3 p-4 transition-colors hover:bg-foreground/5"
              >
                <div className="size-10 shrink-0 overflow-hidden rounded-full bg-background ring-1 ring-border">
                  <Image
                    src={player.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-sm font-bold text-foreground">
                      {player.nick}
                    </h3>
                    {isCaptain && (
                      <span className="inline-flex items-center gap-1 rounded-sm border border-brand-yellow/40 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-brand-yellow">
                        <CrownIcon className="size-2.5" aria-hidden="true" />
                        Capitão
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-foreground/65">
                    desde {formatDayMonthYearPtBr(entry.joinedAt)} ·{" "}
                    {player.location}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-3 p-4 opacity-70">
                <div
                  aria-hidden="true"
                  className="size-10 shrink-0 rounded-full bg-foreground/10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-foreground/70">
                    @{entry.playerTag}
                  </p>
                  <p className="mt-0.5 text-[11px] text-foreground/55">
                    Player não encontrado
                  </p>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
