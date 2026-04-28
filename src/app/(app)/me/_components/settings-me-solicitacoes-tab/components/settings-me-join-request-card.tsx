"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import type { TeamJoinRequest } from "@/app/(app)/_data/team-join-requests";
import { findTeamBySlug } from "@/app/(app)/_data/teams";
import { formatDayMonthYearPtBr } from "@/lib/format-date";
import { cn } from "@/lib/utils";

type SettingsMeJoinRequestCardProps = {
  joinRequestCard: TeamJoinRequest;
  onCancelJoinRequestCard: (id: string) => void;
};

export function SettingsMeJoinRequestCard({
  joinRequestCard,
  onCancelJoinRequestCard,
}: SettingsMeJoinRequestCardProps) {
  const team = findTeamBySlug(joinRequestCard.teamSlug);

  const statusConfig = {
    pending: {
      icon: ClockIcon,
      label: "Pendente",
      className: "text-brand-yellow border-brand-yellow/40 bg-brand-yellow/5",
    },
    accepted: {
      icon: CheckCircle2Icon,
      label: "Aceito",
      className: "text-green-500 border-green-500/40 bg-green-500/5",
    },
    rejected: {
      icon: XCircleIcon,
      label: "Rejeitado",
      className: "text-destructive border-destructive/40 bg-destructive/5",
    },
  } as const;

  const status = statusConfig[joinRequestCard.status];
  const StatusIcon = status.icon;

  return (
    <article className="flex flex-col gap-3 rounded-md border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        {team ? (
          <Link
            href={`/teams/${team.slug}`}
            className="shrink-0"
            aria-label={`Ver time ${team.name}`}
          >
            <div className="size-12 rounded-lg bg-background p-1.5 ring-1 ring-border">
              <Image
                src={team.logo}
                alt=""
                width={48}
                height={48}
                className="size-full object-contain"
              />
            </div>
          </Link>
        ) : (
          <div
            aria-hidden="true"
            className="size-12 shrink-0 rounded-lg bg-foreground/5 ring-1 ring-border"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
                status.className,
              )}
            >
              <StatusIcon className="size-2.5" aria-hidden="true" />
              {status.label}
            </span>
            {team && (
              <span className="font-mono text-[10px] font-semibold tracking-wider text-foreground/65">
                [{team.tag}]
              </span>
            )}
          </div>
          <h3 className="mt-1 truncate font-display text-sm font-bold text-foreground">
            {team?.name ?? joinRequestCard.teamSlug}
          </h3>
          <p className="mt-0.5 text-xs text-foreground/70">
            Pedido enviado em{" "}
            {formatDayMonthYearPtBr(joinRequestCard.requestedAt)}
            {joinRequestCard.resolvedAt &&
              ` · resolvido em ${formatDayMonthYearPtBr(
                joinRequestCard.resolvedAt,
              )}`}
          </p>
          {joinRequestCard.message && (
            <p className="mt-2 rounded-md bg-background/60 p-2 text-xs italic text-foreground/75">
              “{joinRequestCard.message}”
            </p>
          )}
          {joinRequestCard.status === "rejected" &&
            joinRequestCard.resolverNote &&
            joinRequestCard.resolverNote !== "canceled by player" && (
              <p className="mt-2 text-xs text-foreground/70">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                  Motivo:
                </span>{" "}
                {joinRequestCard.resolverNote}
              </p>
            )}
        </div>
      </div>

      {joinRequestCard.status === "pending" && (
        <button
          type="button"
          onClick={() => onCancelJoinRequestCard(joinRequestCard.id)}
          className="rounded-md border border-border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75 hover:text-foreground"
        >
          Cancelar pedido
        </button>
      )}
    </article>
  );
}
