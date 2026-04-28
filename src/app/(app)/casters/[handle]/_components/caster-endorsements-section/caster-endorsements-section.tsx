import type { Caster } from "@/app/(app)/_data/casters";
import { EmptyState } from "@/app/(app)/_components";
import { CasterEndorsementItem } from "./components/caster-endorsement-item";

type CasterEndorsementsSectionProps = {
  casterEndorsements: Caster;
};

export function CasterEndorsementsSection({
  casterEndorsements,
}: CasterEndorsementsSectionProps) {
  if (casterEndorsements.endorsements.length === 0) {
    return (
      <EmptyState
        title="Ainda sem endosso público"
        hint="Quando players destacarem o trabalho, aparece aqui."
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {casterEndorsements.endorsements.map((endorsement) => (
        <CasterEndorsementItem
          key={endorsement.playerTag}
          endorsement={endorsement}
        />
      ))}
    </ul>
  );
}
