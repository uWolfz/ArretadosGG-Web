import { cn } from "@/lib/utils";
import type { MatchStatus } from "@/app/(app)/_data/matches";

type MatchStatusBadgeProps = {
  status: MatchStatus;
  className?: string;
};

const STATUS_LABEL: Record<MatchStatus, string> = {
  live: "AO VIVO",
  upcoming: "EM BREVE",
  finished: "FINALIZADA",
};

const STATUS_CLASS: Record<MatchStatus, string> = {
  live: "bg-brand-red text-white",
  upcoming: "border border-foreground/20 text-foreground/75",
  finished: "text-foreground/60",
};

export function MatchStatusBadge({ status, className }: MatchStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
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
