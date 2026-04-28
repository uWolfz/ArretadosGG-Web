import { cn } from "@/lib/utils";

type TournamentInfoColProps = {
  label: string;
  value: string;
  accent?: "yellow";
};

export function TournamentInfoCol({
  label,
  value,
  accent,
}: TournamentInfoColProps) {
  return (
    <div className="px-2 text-center">
      <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-mono text-sm font-semibold tabular-nums",
          accent === "yellow" ? "text-brand-yellow" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
