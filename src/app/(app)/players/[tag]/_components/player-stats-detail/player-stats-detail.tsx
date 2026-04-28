import {
  formatPlayerKd,
  formatPlayerWinRatePct,
  type Player,
} from "@/app/(app)/_data/players";
import { EmptyState } from "@/app/(app)/_components";
import { PlayerStatsTable } from "./components/player-stats-table";

type PlayerStatsDetailProps = {
  player: Player;
};

export function PlayerStatsDetail({ player }: PlayerStatsDetailProps) {
  if (player.stats.matches === 0) {
    return (
      <EmptyState
        title="Ainda sem partidas validadas"
        hint="Envie sua primeira screenshot no painel."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PlayerStatsTable
        title="Por mapa"
        headers={["Mapa", "Matches", "Winrate", "KDR"]}
        rows={player.stats.byMap.map((row) => ({
          key: row.map,
          cells: [
            row.map,
            row.matches.toString(),
            `${formatPlayerWinRatePct(row.winRate)}%`,
            formatPlayerKd(row.kd),
          ],
        }))}
      />
      <PlayerStatsTable
        title="Por modo"
        headers={["Modo", "Matches", "Winrate"]}
        rows={player.stats.byMode.map((row) => ({
          key: row.mode,
          cells: [
            row.mode,
            row.matches.toString(),
            `${formatPlayerWinRatePct(row.winRate)}%`,
          ],
        }))}
      />
    </div>
  );
}
