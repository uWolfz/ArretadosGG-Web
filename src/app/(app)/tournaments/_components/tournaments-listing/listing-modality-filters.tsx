"use client";

import { DoorOpenIcon, TicketIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { TournamentsModalityFilters } from "@/app/(app)/tournaments/_hooks/use-tournaments-filter";

type PillAccent = "yellow" | "green";

type PillConfig = {
  key: keyof TournamentsModalityFilters;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  accent?: PillAccent;
};

const MODALITY_PILLS: PillConfig[] = [
  { key: "openRegistration", label: "Inscrições abertas", icon: DoorOpenIcon },
  { key: "size5v5", label: "5v5" },
  { key: "size2v2", label: "2v2" },
  { key: "size1v1", label: "1v1" },
  {
    key: "inviteOnly",
    label: "Apenas convidados",
    icon: TicketIcon,
    accent: "green",
  },
];

const PILL_ACTIVE_CLASS: Record<PillAccent, string> = {
  yellow: "border-brand-yellow bg-brand-yellow/10 text-brand-yellow",
  green: "border-brand-green/60 bg-brand-green/10 text-[oklch(0.78_0.14_162)]",
};

type ListingModalityFiltersProps = {
  filters: TournamentsModalityFilters;
  onToggle: (key: keyof TournamentsModalityFilters) => void;
};

export function ListingModalityFilters({
  filters,
  onToggle,
}: ListingModalityFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {MODALITY_PILLS.map((pill) => {
        const isActive = filters[pill.key];
        const accent = pill.accent ?? "yellow";
        const Icon = pill.icon;
        return (
          <button
            key={pill.key}
            onClick={() => onToggle(pill.key)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all",
              isActive
                ? PILL_ACTIVE_CLASS[accent]
                : "border-border bg-card text-foreground/75 hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}
