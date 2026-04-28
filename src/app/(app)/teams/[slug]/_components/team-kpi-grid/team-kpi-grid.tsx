import { computeTeamWinRatePct, type Team } from "@/app/(app)/_data/teams";
import { KpiCell } from "@/app/(app)/_components";

type TeamKpiGridProps = {
  teamKpiGrid: Team;
};

export function TeamKpiGrid({ teamKpiGrid }: TeamKpiGridProps) {
  const winRate = computeTeamWinRatePct(teamKpiGrid);
  const totalMatches = teamKpiGrid.wins + teamKpiGrid.losses;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <KpiCell
        size="lg"
        label="Vitórias"
        value={teamKpiGrid.wins.toString()}
        accent={teamKpiGrid.wins >= 30 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Winrate"
        value={`${winRate}%`}
        accent={winRate >= 60 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Títulos"
        value={teamKpiGrid.trophies.toString()}
        accent={teamKpiGrid.trophies > 0 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Partidas"
        value={totalMatches.toString()}
      />
    </div>
  );
}
