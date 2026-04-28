"use client";

import { cn } from "@/lib/utils";

type SettingsMeCasterWizardStepperBarProps = {
  stepCasterWizard: number;
  labelsCasterWizard: ReadonlyArray<string>;
};

export function SettingsMeCasterWizardStepperBar({
  stepCasterWizard,
  labelsCasterWizard,
}: SettingsMeCasterWizardStepperBarProps) {
  return (
    <ol
      aria-label="Progresso da aplicação"
      className="flex items-center gap-2"
    >
      {labelsCasterWizard.map((label, index) => {
        const isActive = index === stepCasterWizard;
        const isDone = index < stepCasterWizard;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold tabular-nums",
                isDone
                  ? "bg-brand-yellow text-background"
                  : isActive
                    ? "bg-brand-yellow/20 text-brand-yellow ring-2 ring-brand-yellow"
                    : "bg-foreground/10 text-foreground/55",
              )}
              aria-current={isActive ? "step" : undefined}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                "truncate font-mono text-[10px] uppercase tracking-wider",
                isActive || isDone
                  ? "text-foreground"
                  : "text-foreground/55",
              )}
            >
              {label}
            </span>
            {index < labelsCasterWizard.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 sm:block",
                  isDone ? "bg-brand-yellow" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
