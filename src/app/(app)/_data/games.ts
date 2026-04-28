import type { TournamentGame } from "./tournaments";

export const GAME_LABELS_LONG: Record<TournamentGame, string> = {
  cod: "Call of Duty Mobile",
  cs2: "CS2",
  lol: "LoL Wild Rift",
  valorant: "Valorant",
};

export const GAME_LABELS_SHORT: Record<TournamentGame, string> = {
  cod: "CODM",
  cs2: "CS2",
  lol: "LoL",
  valorant: "Valorant",
};

export const GAME_LABELS_REGION_BR: Record<TournamentGame, string> = {
  cod: "CODM BR",
  cs2: "CS2 BR",
  lol: "LoL Wild Rift BR",
  valorant: "Valorant BR",
};

export type GameSelectValue = TournamentGame | "all";

export const GAME_SELECT_OPTIONS: ReadonlyArray<{
  value: GameSelectValue;
  label: string;
}> = [
  { value: "all", label: "Todos os jogos" },
  { value: "cod", label: "Call of Duty" },
  { value: "lol", label: "League of Legends" },
  { value: "valorant", label: "Valorant" },
  { value: "cs2", label: "Counter-Strike 2" },
];
