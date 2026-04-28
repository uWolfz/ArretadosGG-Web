import type { Caster } from "@/app/(app)/_data/casters";
import { GameBadge } from "@/components/badges";

type CasterSpecialtiesSectionProps = {
  casterSpecialties: Caster;
};

export function CasterSpecialtiesSection({
  casterSpecialties,
}: CasterSpecialtiesSectionProps) {
  if (casterSpecialties.specialties.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {casterSpecialties.specialties.map((spec, index) => (
        <li
          key={`${spec.game}-${index}`}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2"
        >
          <GameBadge game={spec.game} size="sm" />
          <span className="text-sm text-foreground">{spec.label}</span>
        </li>
      ))}
    </ul>
  );
}
