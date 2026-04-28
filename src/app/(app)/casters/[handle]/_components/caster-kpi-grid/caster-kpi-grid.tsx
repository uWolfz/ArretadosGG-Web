import {
  formatCasterPeakViewers,
  type Caster,
} from "@/app/(app)/_data/casters";
import { KpiCell } from "@/app/(app)/_components";

type CasterKpiGridProps = {
  casterKpiGrid: Caster;
};

export function CasterKpiGrid({ casterKpiGrid }: CasterKpiGridProps) {
  const { stats } = casterKpiGrid;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <KpiCell
        size="lg"
        label="Torneios"
        value={stats.tournamentsCasted.toString()}
        accent={stats.tournamentsCasted >= 20 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Horas no ar"
        value={stats.hoursOnAir.toString()}
      />
      <KpiCell
        size="lg"
        label="Peak viewers"
        value={formatCasterPeakViewers(stats.peakViewers)}
        accent={stats.peakViewers >= 20000 ? "yellow" : "neutral"}
      />
      <KpiCell
        size="lg"
        label="Anos ativo"
        value={stats.yearsActive.toString()}
      />
    </div>
  );
}
