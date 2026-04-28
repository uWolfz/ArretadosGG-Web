import { findTeamBySlug, type Team } from "@/app/(app)/_data/teams";
import type { Player } from "@/app/(app)/_data/players";
import { TeamCard } from "@/app/(app)/teams/_components/team-card";
import { EmptyState } from "@/app/(app)/_components";
import { isNotNull } from "@/lib/type-guards";
import { formatShortMonthYearRangePtBr } from "@/lib/format-date";

type PlayerTeamsTimelineProps = {
  player: Player;
};

type PastTeamEntry = { team: Team; from: string; to: string };

export function PlayerTeamsTimeline({ player }: PlayerTeamsTimelineProps) {
  const current = player.currentTeam ? findTeamBySlug(player.currentTeam) ?? null : null;

  const past: PastTeamEntry[] = player.pastTeams
    .map((pt) => {
      const team = findTeamBySlug(pt.teamSlug);
      return team ? { team, from: pt.from, to: pt.to } : null;
    })
    .filter(isNotNull);

  return (
    <div className="space-y-4">
      {current ? (
        <div>
          <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
            Time atual
          </p>
          <TeamCard team={current} />
        </div>
      ) : (
        <EmptyState
          title="Sem time atual"
          hint="Este player não está em nenhum time no momento."
          tone="free-agent"
          size="sm"
        />
      )}

      {past.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
            Times anteriores
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {past.map(({ team, from, to }) => (
              <div key={team.slug} className="space-y-1">
                <TeamCard team={team} />
                <p className="px-1 font-mono text-[10px] uppercase tracking-wider text-foreground/65">
                  {formatShortMonthYearRangePtBr(from, to)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
