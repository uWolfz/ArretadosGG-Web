import { TrophyIcon } from "lucide-react";
import type { Player } from "@/app/(app)/_data/players";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type PlayerAchievementsGridProps = {
  player: Player;
};

export function PlayerAchievementsGrid({
  player,
}: PlayerAchievementsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {player.achievements.map((a) => (
        <div
          key={a.key}
          className="flex items-start gap-3 rounded-md border border-border bg-card p-4"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-yellow/10 text-brand-yellow">
            <TrophyIcon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold text-foreground">
              {a.label}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/65">
              {formatDayMonthYearPtBr(a.earnedAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
