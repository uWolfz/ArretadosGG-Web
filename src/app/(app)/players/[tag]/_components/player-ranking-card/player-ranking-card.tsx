import {
  getPlayerRankingTopPercentile,
  type Player,
} from "@/app/(app)/_data/players";
import { GAME_LABELS_REGION_BR } from "@/app/(app)/_data/games";

type PlayerRankingCardProps = {
  player: Player;
};

export function PlayerRankingCard({ player }: PlayerRankingCardProps) {
  const pct = getPlayerRankingTopPercentile(player.ranking);
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
        Posição na categoria
      </h2>
      <p className="font-display text-2xl font-bold text-brand-yellow">
        Top {pct}% · {GAME_LABELS_REGION_BR[player.game]}
      </p>
      <p className="mt-1 font-mono text-sm tabular-nums text-foreground/75">
        {player.ranking.position}º de{" "}
        {player.ranking.total.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}
