"use client";

import Image from "next/image";
import type { MockInvite } from "@/app/(app)/_data/me-mocks";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type SettingsMeInviteCardProps = {
  inviteSettingsMe: MockInvite;
  onAcceptInviteSettingsMe: (id: string) => void;
  onDeclineInviteSettingsMe: (id: string) => void;
};

export function SettingsMeInviteCard({
  inviteSettingsMe,
  onAcceptInviteSettingsMe,
  onDeclineInviteSettingsMe,
}: SettingsMeInviteCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-md border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="size-12 shrink-0 rounded-lg bg-background p-1.5 ring-1 ring-border">
          <Image
            src={inviteSettingsMe.team.logo}
            alt=""
            width={48}
            height={48}
            className="size-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-foreground/65">
            [{inviteSettingsMe.team.tag}]
          </span>
          <h3 className="truncate font-display text-sm font-bold text-foreground">
            {inviteSettingsMe.team.name}
          </h3>
          <p className="mt-1 text-xs text-foreground/70">
            Convidado por {inviteSettingsMe.invitedBy} ·{" "}
            {formatDayMonthYearPtBr(inviteSettingsMe.sentAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:shrink-0">
        <button
          type="button"
          onClick={() => onDeclineInviteSettingsMe(inviteSettingsMe.id)}
          className="rounded-md border border-border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75 hover:text-foreground"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => onAcceptInviteSettingsMe(inviteSettingsMe.id)}
          className="rounded-md bg-brand-yellow px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
        >
          Aceitar
        </button>
      </div>
    </article>
  );
}
