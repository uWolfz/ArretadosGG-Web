import { cn } from "@/lib/utils";
import {
  getMatchWinnerSide,
  type Match,
} from "@/app/(app)/_data/matches";
import {
  formatCountdownFromNow,
  formatDayMonthHourMinPtBr,
} from "@/lib/format-date";
import { MatchStatusBadge } from "../match-status-badge";
import { MatchTeamSide } from "./match-team-side";
import { MatchScore } from "./match-score";

type MatchRowProps = {
  match: Match;
  hideTournament?: boolean;
};

function getMatchRowMeta(match: Match): string {
  if (match.status === "upcoming") {
    return (
      formatCountdownFromNow(match.startsAt) ??
      formatDayMonthHourMinPtBr(match.startsAt)
    );
  }
  return formatDayMonthHourMinPtBr(match.startsAt);
}

export function MatchRow({ match, hideTournament = false }: MatchRowProps) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const winnerSide = getMatchWinnerSide(match);
  const meta = getMatchRowMeta(match);

  return (
    <div
      className={cn(
        "group relative border-b border-border last:border-b-0 transition-colors",
        isLive
          ? "bg-brand-red/[0.04] hover:bg-brand-red/[0.07]"
          : "hover:bg-accent/60",
      )}
    >
      {isLive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-0.5 rounded-r-full bg-brand-red"
          aria-hidden="true"
        />
      )}

      <div className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(140px,180px)_minmax(0,1fr)_minmax(140px,180px)] md:items-center md:gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
            {match.round}
          </p>
          {!hideTournament && (
            <p className="mt-1 truncate text-xs text-foreground/70">
              {match.tournamentName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6">
          <MatchTeamSide
            team={match.teamA}
            align="left"
            faded={isFinished && winnerSide === "B"}
          />
          <MatchScore match={match} winnerSide={winnerSide} />
          <MatchTeamSide
            team={match.teamB}
            align="right"
            faded={isFinished && winnerSide === "A"}
          />
        </div>

        <div className="flex items-center justify-between gap-2 md:flex-col md:items-end md:gap-1.5">
          <MatchStatusBadge status={match.status} />
          {isLive && match.streamUrl ? (
            <a
              href={match.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-foreground transition-colors hover:text-foreground/70"
            >
              Assistir
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          ) : (
            <p className="font-mono text-[11px] text-foreground/70">{meta}</p>
          )}
        </div>
      </div>
    </div>
  );
}
