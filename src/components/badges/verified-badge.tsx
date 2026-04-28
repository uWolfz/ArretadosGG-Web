import { ShieldCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type VerifiedBadgeProps = {
  size?: "sm" | "md";
  className?: string;
};

export function VerifiedBadge({ size = "md", className }: VerifiedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold uppercase tracking-wider text-emerald-500",
        size === "sm" ? "text-[9px]" : "text-[10px]",
        className,
      )}
      aria-label="Player verificado"
    >
      <ShieldCheckIcon className={size === "sm" ? "size-3" : "size-3.5"} aria-hidden="true" />
      Verificado
    </span>
  );
}
