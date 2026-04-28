import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import type { Player } from "@/app/(app)/_data/players";

type SettingsMeHeaderProps = {
  userSettingsMe: Player;
  subtitleSettingsMe?: string;
};

export function SettingsMeHeader({
  userSettingsMe,
  subtitleSettingsMe,
}: SettingsMeHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Configurações
          </h1>
          <span className="rounded-sm border border-brand-yellow/40 bg-brand-yellow/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-brand-yellow">
            Modo demo
          </span>
        </div>
        {subtitleSettingsMe && (
          <p className="mt-1 text-xs text-foreground/70">
            {subtitleSettingsMe}
          </p>
        )}
      </div>
      <Link
        href={`/players/${userSettingsMe.tag}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75 transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
        Ver perfil público
      </Link>
    </header>
  );
}
