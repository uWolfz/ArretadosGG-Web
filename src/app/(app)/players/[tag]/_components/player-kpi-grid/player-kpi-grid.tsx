import {
  countPlayerTournamentWins,
  formatPlayerKd,
  formatPlayerWinRatePct,
  type Player,
} from "@/app/(app)/_data/players";
import { KpiCell } from "@/app/(app)/_components";

type PlayerKpiGridProps = {
  player: Player;
};

export function PlayerKpiGrid({ player }: PlayerKpiGridProps) {
  const winRatePct = formatPlayerWinRatePct(player.stats.winRate);
  const tourneyWins = countPlayerTournamentWins(player);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <KpiCell
        size="lg"
        label="KDR"
        value={formatPlayerKd(player.stats.kd)}
        accent={player.stats.kd >= 2 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Winrate"
        value={`${winRatePct}%`}
        accent={winRatePct >= 60 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Matches"
        value={player.stats.matches.toString()}
      />
      <KpiCell
        size="lg"
        label="Títulos"
        value={tourneyWins.toString()}
        accent={tourneyWins > 0 ? "yellow" : "neutral"}
      />
    </div>
  );
}
