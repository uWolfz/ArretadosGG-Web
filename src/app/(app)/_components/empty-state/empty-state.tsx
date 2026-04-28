import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type EmptyStateTone = "muted" | "free-agent";

type EmptyStateProps = {
  title: string;
  hint?: string;
  tone?: EmptyStateTone;
  size?: "sm" | "md" | "lg";
  action?: ReactNode;
};

const TONE_CLASS: Record<EmptyStateTone, string> = {
  muted: "border-dashed border-border bg-card/40",
  "free-agent": "border-dashed border-border bg-card/40",
};

const SIZE_PAD: Record<NonNullable<EmptyStateProps["size"]>, string> = {
  sm: "p-5",
  md: "p-6",
  lg: "p-10",
};

export function EmptyState({
  title,
  hint,
  tone = "muted",
  size = "md",
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-md border text-center",
        TONE_CLASS[tone],
        SIZE_PAD[size],
      )}
    >
      {tone === "free-agent" && (
        <p className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-yellow">
          Free agent
        </p>
      )}
      <p className="font-display text-base font-bold text-foreground">
        {title}
      </p>
      {hint && <p className="mt-1 text-sm text-foreground/70">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
