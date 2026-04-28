import { cn } from "@/lib/utils";
import type { TournamentStatus } from "@/app/(app)/_data/tournaments";

type TournamentStatusBadgeProps = {
  status: TournamentStatus;
  className?: string;
};

const STATUS_LABEL: Record<TournamentStatus, string> = {
  live: "AO VIVO",
  open: "INSCRIÇÕES ABERTAS",
  upcoming: "EM BREVE",
  finished: "FINALIZADO",
};

// LIVE é o único estado com fill vivo — frequência baixa, significado alto.
const STATUS_CLASS: Record<TournamentStatus, string> = {
  live: "bg-brand-red text-white",
  open: "border border-brand-yellow/50 text-brand-yellow",
  upcoming: "border border-foreground/20 text-foreground/75",
  finished: "text-foreground/60",
};

export function TournamentStatusBadge({
  status,
  className,
}: TournamentStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider",
        STATUS_CLASS[status],
        className,
      )}
    >
      {status === "live" && (
        <span
          className="inline-block size-1.5 rounded-full bg-white animate-live-pulse"
          aria-hidden="true"
        />
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}
