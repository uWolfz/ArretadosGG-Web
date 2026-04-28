import { cn } from "@/lib/utils";
import type { Match, MatchWinnerSide } from "@/app/(app)/_data/matches";
import { hasMatchScore } from "@/app/(app)/_data/matches";

type MatchScoreProps = {
  match: Match;
  winnerSide: MatchWinnerSide;
};

export function MatchScore({ match, winnerSide }: MatchScoreProps) {
  const hasScore = hasMatchScore(match);
  const isFinished = match.status === "finished";

  if (!hasScore) {
    return (
      <div className="flex shrink-0 items-center gap-2.5 rounded-md bg-background/60 px-3 py-1.5 font-mono ring-1 ring-border">
        <span className="px-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
          vs
        </span>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-md bg-background/60 px-3 py-1.5 font-mono ring-1 ring-border">
      <span
        className={cn(
          "text-xl font-bold tabular-nums",
          isFinished && winnerSide === "B"
            ? "text-foreground/50"
            : "text-foreground",
        )}
      >
        {match.teamA.score}
      </span>
      <span className="text-[10px] text-foreground/55">×</span>
      <span
        className={cn(
          "text-xl font-bold tabular-nums",
          isFinished && winnerSide === "A"
            ? "text-foreground/50"
            : "text-foreground",
        )}
      >
        {match.teamB.score}
      </span>
    </div>
  );
}
