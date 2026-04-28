"use client";

import { XCircleIcon } from "lucide-react";
import type { CasterApplication } from "@/app/(app)/_data/caster-applications";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type SettingsMeCasterRejectedCardProps = {
  applicationCasterTab: CasterApplication;
  onReapplyCasterTab: () => void;
};

export function SettingsMeCasterRejectedCard({
  applicationCasterTab,
  onReapplyCasterTab,
}: SettingsMeCasterRejectedCardProps) {
  const { reviewedAt, reviewerNote } = applicationCasterTab;
  return (
    <div className="rounded-md border border-destructive/30 bg-destructive/5 p-5">
      <div className="flex items-start gap-3">
        <div className="shrink-0 inline-flex size-10 items-center justify-center rounded-full bg-destructive/10">
          <XCircleIcon
            className="size-5 text-destructive"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-destructive">
            Aplicação rejeitada
          </span>
          <h3 className="mt-1 font-display text-base font-bold text-foreground">
            {reviewedAt
              ? `Revisada em ${formatDayMonthYearPtBr(reviewedAt)}`
              : "Revisão concluída"}
          </h3>
          {reviewerNote && (
            <div className="mt-3 rounded-md border border-border bg-background/80 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                Motivo
              </p>
              <p className="mt-1 text-sm text-foreground/85">{reviewerNote}</p>
            </div>
          )}
          <button
            type="button"
            onClick={onReapplyCasterTab}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-yellow px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
          >
            Aplicar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
