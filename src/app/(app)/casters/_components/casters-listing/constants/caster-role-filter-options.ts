import type { CasterRole } from "@/app/(app)/_data/casters";

export const CASTER_ROLE_FILTER_OPTIONS: ReadonlyArray<{
  value: CasterRole | "all";
  label: string;
}> = [
  { value: "all", label: "Todos" },
  { value: "play-by-play", label: "Play-by-play" },
  { value: "analyst", label: "Análise" },
  { value: "host", label: "Host" },
];
