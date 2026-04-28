"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Player } from "@/app/(app)/_data/players";
import {
  getTeamsCaptainedByPlayerTag,
  type Team,
} from "@/app/(app)/_data/teams";
import {
  getPendingJoinRequestsByTeamSlug,
  resolveJoinRequestMock,
  type TeamJoinRequest,
} from "@/app/(app)/_data/team-join-requests";
import { EmptyState } from "@/app/(app)/_components";
import { toast } from "@/components/ui/toast-mock";
import { SettingsMeCaptainRequestCard } from "./components/settings-me-captain-request-card";

type SettingsMeTeamManageTabProps = {
  userSettingsMe: Player;
};

type CaptainRequestResolution = "accept" | "reject";

export function SettingsMeTeamManageTab({
  userSettingsMe,
}: SettingsMeTeamManageTabProps) {
  const captainedTeamsTeamManage = getTeamsCaptainedByPlayerTag(
    userSettingsMe.tag,
  );
  const [pendingByTeamTeamManage, setPendingByTeamTeamManage] = useState<
    Record<string, TeamJoinRequest[]>
  >(() => {
    const map: Record<string, TeamJoinRequest[]> = {};
    for (const team of captainedTeamsTeamManage) {
      map[team.slug] = getPendingJoinRequestsByTeamSlug(team.slug);
    }
    return map;
  });

  function handleResolveRequestTeamManage(
    requestId: string,
    teamSlug: string,
    decision: CaptainRequestResolution,
  ) {
    const updated = resolveJoinRequestMock(
      requestId,
      decision,
      decision === "accept" ? "captain accepted" : "captain rejected",
    );
    if (!updated) return;
    setPendingByTeamTeamManage((prev) => ({
      ...prev,
      [teamSlug]: (prev[teamSlug] ?? []).filter((r) => r.id !== requestId),
    }));
    toast(decision === "accept" ? "Pedido aceito" : "Pedido rejeitado");
  }

  if (captainedTeamsTeamManage.length === 0) {
    return (
      <EmptyState
        title="Você não é capitão de nenhum time"
        hint="Quando for promovido a capitão de um roster, você vai gerenciar os pedidos por aqui."
        size="lg"
      />
    );
  }

  return (
    <div className="space-y-8">
      {captainedTeamsTeamManage.map((team) => {
        const pending = pendingByTeamTeamManage[team.slug] ?? [];
        return (
          <TeamManageSection
            key={team.slug}
            teamTeamManage={team}
            pendingRequestsTeamManage={pending}
            onResolveRequestTeamManage={handleResolveRequestTeamManage}
          />
        );
      })}
    </div>
  );
}

type TeamManageSectionProps = {
  teamTeamManage: Team;
  pendingRequestsTeamManage: TeamJoinRequest[];
  onResolveRequestTeamManage: (
    requestId: string,
    teamSlug: string,
    decision: CaptainRequestResolution,
  ) => void;
};

function TeamManageSection({
  teamTeamManage,
  pendingRequestsTeamManage,
  onResolveRequestTeamManage,
}: TeamManageSectionProps) {
  return (
    <section>
      <header className="mb-4 flex items-center gap-3 border-b border-border pb-3">
        <Link
          href={`/teams/${teamTeamManage.slug}`}
          aria-label={`Abrir página do ${teamTeamManage.name}`}
          className="shrink-0"
        >
          <div className="size-10 rounded-md bg-background p-1.5 ring-1 ring-border">
            <Image
              src={teamTeamManage.logo}
              alt=""
              width={40}
              height={40}
              className="size-full object-contain"
            />
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-bold text-foreground">
            {teamTeamManage.name}
          </h3>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            {pendingRequestsTeamManage.length}{" "}
            {pendingRequestsTeamManage.length === 1 ? "pedido" : "pedidos"}{" "}
            pendente
            {pendingRequestsTeamManage.length === 1 ? "" : "s"}
          </p>
        </div>
      </header>

      {pendingRequestsTeamManage.length === 0 ? (
        <EmptyState
          title="Fila vazia"
          hint="Quando alguém pedir pra entrar, aparece aqui."
        />
      ) : (
        <ul className="space-y-3">
          {pendingRequestsTeamManage.map((request) => (
            <li key={request.id}>
              <SettingsMeCaptainRequestCard
                requestCaptainCard={request}
                onAcceptCaptainCard={() =>
                  onResolveRequestTeamManage(
                    request.id,
                    teamTeamManage.slug,
                    "accept",
                  )
                }
                onRejectCaptainCard={() =>
                  onResolveRequestTeamManage(
                    request.id,
                    teamTeamManage.slug,
                    "reject",
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
