"use client";

import { cn } from "@/lib/utils";

export type FilterChipAccent = "neutral" | "yellow";

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: FilterChipAccent;
  ariaLabel?: string;
};

const ACTIVE_CLASS: Record<FilterChipAccent, string> = {
  neutral: "border-foreground/70 text-foreground",
  yellow: "border-brand-yellow text-brand-yellow",
};

export function FilterChip({
  label,
  active,
  onClick,
  accent = "neutral",
  ariaLabel,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={cn(
        "rounded-sm border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors",
        active
          ? ACTIVE_CLASS[accent]
          : "border-border text-foreground/60 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
