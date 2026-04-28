import type { Caster } from "@/app/(app)/_data/casters";
import { EmptyState } from "@/app/(app)/_components";
import { CasterClipCard } from "./components/caster-clip-card";

type CasterRecentClipsGridProps = {
  casterRecentClips: Caster;
};

export function CasterRecentClipsGrid({
  casterRecentClips,
}: CasterRecentClipsGridProps) {
  if (casterRecentClips.recentClips.length === 0) {
    return (
      <EmptyState
        title="Sem clipes destacados ainda"
        hint="VODs e highlights recentes vão aparecer aqui."
      />
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {casterRecentClips.recentClips.map((clip) => (
        <li key={clip.id}>
          <CasterClipCard clip={clip} />
        </li>
      ))}
    </ul>
  );
}
