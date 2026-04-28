import { cn } from "@/lib/utils";
import type { TournamentGame } from "@/app/(app)/_data/tournaments";

type TournamentGameTagProps = {
  game: TournamentGame;
  className?: string;
};

const GAME_LABEL: Record<TournamentGame, string> = {
  cod: "COD",
  lol: "LOL",
  valorant: "VAL",
  cs2: "CS2",
};

export function TournamentGameTag({ game, className }: TournamentGameTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-secondary px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground",
        className,
      )}
    >
      {GAME_LABEL[game]}
    </span>
  );
}
