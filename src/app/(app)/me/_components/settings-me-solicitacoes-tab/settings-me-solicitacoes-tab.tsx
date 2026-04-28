"use client";

import { useState } from "react";
import type { Player } from "@/app/(app)/_data/players";
import {
  getMockInvitesMe,
  type MockInvite,
} from "@/app/(app)/_data/me-mocks";
import {
  getJoinRequestsByPlayerTag,
  cancelJoinRequestMock,
  type TeamJoinRequest,
} from "@/app/(app)/_data/team-join-requests";
import { EmptyState } from "@/app/(app)/_components";
import { toast } from "@/components/ui/toast-mock";
import { SettingsMeInviteCard } from "../settings-me-invites-tab/components/settings-me-invite-card";
import { SettingsMeJoinRequestCard } from "./components/settings-me-join-request-card";

type SettingsMeSolicitacoesTabProps = {
  userSettingsMe: Player;
};

type SettingsMeInviteResolution = "aceito" | "recusado";

export function SettingsMeSolicitacoesTab({
  userSettingsMe,
}: SettingsMeSolicitacoesTabProps) {
  const [invitesSolicitacoes, setInvitesSolicitacoes] = useState<MockInvite[]>(
    () => getMockInvitesMe(),
  );
  const [joinRequestsSolicitacoes, setJoinRequestsSolicitacoes] = useState<
    TeamJoinRequest[]
  >(() => getJoinRequestsByPlayerTag(userSettingsMe.tag));

  function handleResolveInviteSolicitacoes(
    id: string,
    resolution: SettingsMeInviteResolution,
  ) {
    setInvitesSolicitacoes((prev) => prev.filter((i) => i.id !== id));
    toast(`Convite ${resolution}`);
  }

  function handleCancelJoinRequestSolicitacoes(id: string) {
    const updated = cancelJoinRequestMock(id);
    if (!updated) return;
    setJoinRequestsSolicitacoes((prev) =>
      prev.map((r) => (r.id === id ? updated : r)),
    );
    toast("Pedido cancelado");
  }

  const hasAnySolicitacoes =
    invitesSolicitacoes.length > 0 || joinRequestsSolicitacoes.length > 0;

  if (!hasAnySolicitacoes) {
    return (
      <EmptyState
        title="Nada pendente"
        hint="Convites de times e os pedidos que você enviou aparecem aqui."
        size="lg"
      />
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <header className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-sm font-bold text-foreground">
            Convites recebidos
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            {invitesSolicitacoes.length}
          </span>
        </header>
        {invitesSolicitacoes.length === 0 ? (
          <EmptyState
            title="Sem convites pendentes"
            hint="Quando um time te chamar, aparece aqui."
          />
        ) : (
          <ul className="space-y-3">
            {invitesSolicitacoes.map((invite) => (
              <li key={invite.id}>
                <SettingsMeInviteCard
                  inviteSettingsMe={invite}
                  onAcceptInviteSettingsMe={(id) =>
                    handleResolveInviteSolicitacoes(id, "aceito")
                  }
                  onDeclineInviteSettingsMe={(id) =>
                    handleResolveInviteSolicitacoes(id, "recusado")
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <header className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-sm font-bold text-foreground">
            Pedidos enviados
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            {joinRequestsSolicitacoes.length}
          </span>
        </header>
        {joinRequestsSolicitacoes.length === 0 ? (
          <EmptyState
            title="Nenhum pedido enviado"
            hint="Vá em /teams e peça pra entrar em algum roster."
          />
        ) : (
          <ul className="space-y-3">
            {joinRequestsSolicitacoes.map((request) => (
              <li key={request.id}>
                <SettingsMeJoinRequestCard
                  joinRequestCard={request}
                  onCancelJoinRequestCard={
                    handleCancelJoinRequestSolicitacoes
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
