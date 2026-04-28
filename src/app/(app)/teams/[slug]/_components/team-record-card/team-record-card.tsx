import { computeTeamWinRatePct, type Team } from "@/app/(app)/_data/teams";
import { cn } from "@/lib/utils";

type TeamRecordCardProps = {
  teamRecordCard: Team;
};

export function TeamRecordCard({ teamRecordCard }: TeamRecordCardProps) {
  const total = teamRecordCard.wins + teamRecordCard.losses;
  const winRate = computeTeamWinRatePct(teamRecordCard);
  const lossRate = 100 - winRate;

  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
        Retrospecto
      </h2>

      {total === 0 ? (
        <p className="text-xs text-foreground/65">
          Ainda sem partidas oficiais registradas.
        </p>
      ) : (
        <>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <span
              className={cn(
                "font-display text-2xl font-bold",
                winRate >= 60 ? "text-brand-yellow" : "text-foreground",
              )}
            >
              {winRate}%
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
              {total} partidas
            </span>
          </div>

          <div
            role="img"
            aria-label={`${teamRecordCard.wins} vitórias, ${teamRecordCard.losses} derrotas`}
            className="flex h-2 w-full overflow-hidden rounded-full bg-foreground/10"
          >
            <span
              className="h-full bg-brand-yellow"
              style={{ width: `${winRate}%` }}
              aria-hidden="true"
            />
            <span
              className="h-full bg-brand-red/80"
              style={{ width: `${lossRate}%` }}
              aria-hidden="true"
            />
          </div>

          <dl className="mt-3 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-brand-yellow"
              />
              <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                Vitórias
              </dt>
              <dd className="font-semibold text-foreground">
                {teamRecordCard.wins}
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-brand-red/80"
              />
              <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                Derrotas
              </dt>
              <dd className="font-semibold text-foreground">
                {teamRecordCard.losses}
              </dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
}
