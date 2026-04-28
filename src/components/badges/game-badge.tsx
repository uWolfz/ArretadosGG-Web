import { cn } from "@/lib/utils";
import type { TournamentGame } from "@/app/(app)/_data/tournaments";

type GameBadgeProps = {
  game: TournamentGame;
  size?: "sm" | "md";
  className?: string;
};

const LABEL: Record<TournamentGame, string> = {
  cod: "Call of Duty Mobile",
  cs2: "CS2",
  lol: "LoL Wild Rift",
  valorant: "Valorant",
};

const SHORT: Record<TournamentGame, string> = {
  cod: "CODM",
  cs2: "CS2",
  lol: "LoL",
  valorant: "Valorant",
};

export function GameBadge({ game, size = "md", className }: GameBadgeProps) {
  const label = size === "sm" ? SHORT[game] : LABEL[game];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2 py-0.5 font-mono font-semibold uppercase tracking-wider text-foreground/80",
        size === "sm" ? "text-[9px]" : "text-[10px]",
        className,
      )}
    >
      {label}
    </span>
  );
}
