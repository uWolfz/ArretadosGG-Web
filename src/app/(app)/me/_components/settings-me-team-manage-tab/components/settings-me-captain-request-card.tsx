"use client";

import Image from "next/image";
import Link from "next/link";
import type { TeamJoinRequest } from "@/app/(app)/_data/team-join-requests";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type SettingsMeCaptainRequestCardProps = {
  requestCaptainCard: TeamJoinRequest;
  onAcceptCaptainCard: () => void;
  onRejectCaptainCard: () => void;
};

export function SettingsMeCaptainRequestCard({
  requestCaptainCard,
  onAcceptCaptainCard,
  onRejectCaptainCard,
}: SettingsMeCaptainRequestCardProps) {
  const player = findPlayerByTag(requestCaptainCard.playerTag);

  return (
    <article className="flex flex-col gap-3 rounded-md border border-border bg-card p-4 sm:flex-row sm:items-start">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {player ? (
          <Link
            href={`/players/${player.tag}`}
            className="shrink-0"
            aria-label={`Ver perfil de ${player.nick}`}
          >
            <div className="size-12 overflow-hidden rounded-full bg-background ring-1 ring-border">
              <Image
                src={player.avatar}
                alt=""
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
          </Link>
        ) : (
          <div
            aria-hidden="true"
            className="size-12 shrink-0 rounded-full bg-foreground/10 ring-1 ring-border"
          />
        )}
        <div className="min-w-0 flex-1">
          <h4 className="truncate font-display text-sm font-bold text-foreground">
            {player?.nick ?? requestCaptainCard.playerTag}
          </h4>
          {player && (
            <p className="truncate text-[11px] text-foreground/65">
              {player.location}
              {player.currentTeam && ` · hoje no ${player.currentTeam}`}
            </p>
          )}
          <p className="mt-1 text-xs text-foreground/70">
            Pedido em{" "}
            {formatDayMonthYearPtBr(requestCaptainCard.requestedAt)}
          </p>
          {requestCaptainCard.message && (
            <p className="mt-2 rounded-md bg-background/60 p-2 text-xs italic text-foreground/75">
              “{requestCaptainCard.message}”
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:shrink-0">
        <button
          type="button"
          onClick={onRejectCaptainCard}
          className="rounded-md border border-border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75 hover:text-foreground"
        >
          Rejeitar
        </button>
        <button
          type="button"
          onClick={onAcceptCaptainCard}
          className="rounded-md bg-brand-yellow px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
        >
          Aceitar
        </button>
      </div>
    </article>
  );
}
