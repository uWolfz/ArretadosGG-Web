"use client";

import { MicIcon } from "lucide-react";

type SettingsMeCasterEmptyStateProps = {
  onApplyCasterTab: () => void;
};

export function SettingsMeCasterEmptyState({
  onApplyCasterTab,
}: SettingsMeCasterEmptyStateProps) {
  return (
    <div className="rounded-md border border-border bg-card p-6 text-center">
      <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-brand-yellow/10">
        <MicIcon className="size-6 text-brand-yellow" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">
        Você não é caster ainda
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-foreground/70">
        Aplique pra narrar torneios da Arretados. Dá uns 5 minutos pra
        preencher — bio, portfolio e um sample de narração.
      </p>
      <button
        type="button"
        onClick={onApplyCasterTab}
        className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-yellow px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
      >
        Aplicar como caster
      </button>
    </div>
  );
}
