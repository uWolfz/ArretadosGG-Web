"use client";

type SettingsMeSaveBarProps = {
  visibleSettingsMe: boolean;
  onDiscardSettingsMe: () => void;
  onSaveSettingsMe: () => void;
};

export function SettingsMeSaveBar({
  visibleSettingsMe,
  onDiscardSettingsMe,
  onSaveSettingsMe,
}: SettingsMeSaveBarProps) {
  if (!visibleSettingsMe) return null;

  return (
    <div
      role="region"
      aria-label="Ações de salvar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
          Alterações não salvas
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onDiscardSettingsMe}
            className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75 transition-colors hover:text-foreground"
          >
            Descartar
          </button>
          <button
            type="button"
            onClick={onSaveSettingsMe}
            className="rounded-md bg-brand-yellow px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90"
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
