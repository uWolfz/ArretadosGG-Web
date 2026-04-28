"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2Icon,
  ClockIcon,
  CrownIcon,
  XCircleIcon,
} from "lucide-react";
import type { Team, TeamTier } from "@/app/(app)/_data/teams";
import {
  isPlayerInTeamRoster,
  isPlayerCaptainOfTeam,
} from "@/app/(app)/_data/teams";
import type { Player } from "@/app/(app)/_data/players";
import {
  findPendingJoinRequestByPlayerAndTeam,
  cancelJoinRequestMock,
  type TeamJoinRequest,
} from "@/app/(app)/_data/team-join-requests";
import { TournamentGameTag } from "@/app/(app)/tournaments/_components/tournament-game-tag";
import { toast } from "@/components/ui/toast-mock";
import { cn } from "@/lib/utils";
import { TeamJoinRequestDialog } from "../team-join-request-dialog/team-join-request-dialog";

type TeamDetailHeroProps = {
  teamDetailHero: Team;
  viewerDetailHero: Player;
};

const TIER_LABEL: Record<TeamTier, string> = {
  pro: "PRO",
  contender: "ACESSO",
  amador: "AMADOR",
};

const TIER_CLASS: Record<TeamTier, string> = {
  pro: "border-brand-yellow/50 text-brand-yellow",
  contender: "border-foreground/25 text-foreground/75",
  amador: "border-foreground/15 text-foreground/60",
};

export function TeamDetailHero({
  teamDetailHero,
  viewerDetailHero,
}: TeamDetailHeroProps) {
  const [pendingRequestDetailHero, setPendingRequestDetailHero] = useState<
    TeamJoinRequest | undefined
  >(() =>
    findPendingJoinRequestByPlayerAndTeam(
      viewerDetailHero.tag,
      teamDetailHero.slug,
    ),
  );
  const [dialogOpenDetailHero, setDialogOpenDetailHero] = useState(false);

  const isCaptainDetailHero = isPlayerCaptainOfTeam(
    teamDetailHero,
    viewerDetailHero.tag,
  );
  const isRosterMemberDetailHero = isPlayerInTeamRoster(
    teamDetailHero,
    viewerDetailHero.tag,
  );

  function handleOpenDialogDetailHero() {
    setDialogOpenDetailHero(true);
  }

  function handleCloseDialogDetailHero(next: boolean) {
    setDialogOpenDetailHero(next);
  }

  function handleSubmittedRequestDetailHero(request: TeamJoinRequest) {
    setPendingRequestDetailHero(request);
    setDialogOpenDetailHero(false);
  }

  function handleCancelRequestDetailHero() {
    if (!pendingRequestDetailHero) return;
    cancelJoinRequestMock(pendingRequestDetailHero.id);
    toast("Pedido cancelado");
    setPendingRequestDetailHero(undefined);
  }

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="size-28 shrink-0 rounded-xl bg-card p-3 ring-1 ring-border md:size-36">
            <Image
              src={teamDetailHero.logo}
              alt={`Logo ${teamDetailHero.name}`}
              width={144}
              height={144}
              className="size-full object-contain"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-foreground/70">
                [{teamDetailHero.tag}]
              </span>
              <span
                className={cn(
                  "rounded-sm border px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
                  TIER_CLASS[teamDetailHero.tier],
                )}
              >
                {TIER_LABEL[teamDetailHero.tier]}
              </span>
              <TournamentGameTag game={teamDetailHero.primaryGame} />
            </div>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
              {teamDetailHero.name}
            </h1>
            <p className="mt-2 text-sm text-foreground/75">
              {teamDetailHero.location} ·{" "}
              {teamDetailHero.roster.length}{" "}
              {teamDetailHero.roster.length === 1 ? "membro" : "membros"} ·{" "}
              {teamDetailHero.wins + teamDetailHero.losses} partidas oficiais
            </p>

            <div className="mt-4">
              {isCaptainDetailHero ? (
                <span className="inline-flex items-center gap-2 rounded-md border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-yellow">
                  <CrownIcon className="size-3.5" aria-hidden="true" />
                  Você é capitão
                </span>
              ) : isRosterMemberDetailHero ? (
                <span className="inline-flex items-center gap-2 rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-green-500">
                  <CheckCircle2Icon className="size-3.5" aria-hidden="true" />
                  Você é do time
                </span>
              ) : pendingRequestDetailHero ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-md border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-yellow">
                    <ClockIcon className="size-3.5" aria-hidden="true" />
                    Pedido pendente
                  </span>
                  <button
                    type="button"
                    onClick={handleCancelRequestDetailHero}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/75 hover:text-foreground"
                  >
                    <XCircleIcon className="size-3" aria-hidden="true" />
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenDialogDetailHero}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Pedir pra entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <TeamJoinRequestDialog
        teamJoinRequest={teamDetailHero}
        viewerJoinRequest={viewerDetailHero}
        openJoinRequestDialog={dialogOpenDetailHero}
        onOpenChangeJoinRequestDialog={handleCloseDialogDetailHero}
        onSubmittedJoinRequestDialog={handleSubmittedRequestDetailHero}
      />
    </section>
  );
}
