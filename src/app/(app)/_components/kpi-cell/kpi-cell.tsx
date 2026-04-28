import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type KpiCellSize = "sm" | "lg";
export type KpiCellAccent = "neutral" | "yellow";

type KpiCellProps = {
  label: string;
  value: string;
  size?: KpiCellSize;
  accent?: KpiCellAccent;
};

const VALUE_SIZE: Record<KpiCellSize, string> = {
  sm: "font-display text-lg font-bold tabular-nums",
  lg: "font-display text-2xl font-bold tabular-nums sm:text-3xl",
};

const LABEL_SIZE: Record<KpiCellSize, string> = {
  sm: "mt-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/60",
  lg: "mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground/60",
};

export function KpiCell({
  label,
  value,
  size = "sm",
  accent = "neutral",
}: KpiCellProps) {
  return (
    <div
      className={cn(
        "text-center",
        size === "sm" ? "px-4 py-3" : "rounded-md border border-border bg-card p-4 text-left",
      )}
    >
      <p
        className={cn(
          VALUE_SIZE[size],
          accent === "yellow" ? "text-brand-yellow" : "text-foreground",
        )}
      >
        {value}
      </p>
      <p className={LABEL_SIZE[size]}>{label}</p>
    </div>
  );
}

type KpiActionCellProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  onClick: () => void;
};

export function KpiActionCell({ icon, label, value, onClick }: KpiActionCellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-md border border-border bg-card p-4 text-left transition-colors hover:border-foreground/30"
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-background text-foreground/75">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-display text-lg font-bold tabular-nums text-foreground">
          {value}
        </span>
        <span className="block font-mono text-[10px] uppercase tracking-wider text-foreground/60">
          {label}
        </span>
      </span>
    </button>
  );
}
