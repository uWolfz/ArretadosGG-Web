"use client";

import { useState } from "react";
import {
  getMockInvitesMe,
  type MockInvite,
} from "@/app/(app)/_data/me-mocks";
import { EmptyState } from "@/app/(app)/_components";
import { toast } from "@/components/ui/toast-mock";
import { SettingsMeInviteCard } from "./components/settings-me-invite-card";

type SettingsMeInviteResolution = "aceito" | "recusado";

export function SettingsMeInvitesTab() {
  const [invitesSettingsMe, setInvitesSettingsMe] = useState<MockInvite[]>(
    () => getMockInvitesMe(),
  );

  function resolveInviteSettingsMe(
    id: string,
    resolution: SettingsMeInviteResolution,
  ) {
    setInvitesSettingsMe((prev) => prev.filter((i) => i.id !== id));
    toast(`Convite ${resolution}`);
  }

  if (invitesSettingsMe.length === 0) {
    return (
      <EmptyState
        title="Nenhum convite pendente"
        hint="Convites de times aparecem aqui quando chegam."
        size="lg"
      />
    );
  }

  return (
    <ul className="space-y-3">
      {invitesSettingsMe.map((invite) => (
        <li key={invite.id}>
          <SettingsMeInviteCard
            inviteSettingsMe={invite}
            onAcceptInviteSettingsMe={(id) =>
              resolveInviteSettingsMe(id, "aceito")
            }
            onDeclineInviteSettingsMe={(id) =>
              resolveInviteSettingsMe(id, "recusado")
            }
          />
        </li>
      ))}
    </ul>
  );
}
