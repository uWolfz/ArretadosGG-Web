import type { TournamentCaster } from "@/app/(app)/_data/tournaments";
import { TournamentCasterCard } from "./components/tournament-caster-card";

type TournamentCastersProps = {
  casters: TournamentCaster[];
};

export function TournamentCasters({ casters }: TournamentCastersProps) {
  if (casters.length === 0) return null;

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <h2 className="mb-3 flex items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
        <span>Casters</span>
        <span className="tabular-nums text-foreground/50">
          {casters.length}
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {casters.map((caster) => (
          <TournamentCasterCard
            key={caster.casterPlayerTag ?? caster.name}
            caster={caster}
          />
        ))}
      </div>
    </div>
  );
}
