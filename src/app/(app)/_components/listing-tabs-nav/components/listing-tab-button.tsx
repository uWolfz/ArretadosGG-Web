import { cn } from "@/lib/utils";
import type { ListingTabConfig } from "../listing-tabs-nav";

type ListingTabButtonProps<K extends string> = {
  tab: ListingTabConfig<K>;
  active: boolean;
  count: number | undefined;
  onClick: () => void;
};

export function ListingTabButton<K extends string>({
  tab,
  active,
  count,
  onClick,
}: ListingTabButtonProps<K>) {
  const Icon = tab.icon;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative flex shrink-0 items-center gap-2 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
        active
          ? "text-brand-yellow"
          : "text-foreground/65 hover:text-foreground",
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      {tab.label}
      {typeof count === "number" && (
        <span
          className={cn(
            "ml-0.5 inline-flex items-center justify-center rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold tabular-nums",
            active
              ? "bg-brand-yellow/15 text-brand-yellow"
              : "bg-muted text-foreground/65",
          )}
        >
          {count}
        </span>
      )}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-[2px] bg-brand-yellow" />
      )}
    </button>
  );
}
