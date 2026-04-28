import { AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FraudTagBadgeProps = {
  label: string;
  size?: "sm" | "md";
  className?: string;
};

export function FraudTagBadge({ label, size = "md", className }: FraudTagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border border-brand-red/40 bg-brand-red/10 px-1.5 py-0.5 font-mono font-semibold uppercase tracking-wider text-brand-red",
        size === "sm" ? "text-[9px]" : "text-[10px]",
        className,
      )}
      role="status"
      aria-label={`Tag de fraude: ${label}`}
    >
      <AlertTriangleIcon className={size === "sm" ? "size-3" : "size-3.5"} aria-hidden="true" />
      {label}
    </span>
  );
}
