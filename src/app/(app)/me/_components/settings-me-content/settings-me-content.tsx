"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import {
  getMockCurrentUser,
  getMockCurrentUserAccount,
} from "@/app/(app)/_data/current-user";
import { getMockInvitesMe } from "@/app/(app)/_data/me-mocks";
import {
  hasPlayerRole,
  isPlayerFullyVerified,
  type Player,
} from "@/app/(app)/_data/players";
import {
  getTeamsCaptainedByPlayerTag,
} from "@/app/(app)/_data/teams";
import { getPendingJoinRequestsByTeamSlug } from "@/app/(app)/_data/team-join-requests";
import { getJoinRequestsByPlayerTag } from "@/app/(app)/_data/team-join-requests";
import { findCasterApplicationByPlayerTag } from "@/app/(app)/_data/caster-applications";
import { formatMonthYearPtBr } from "@/lib/format-date";
import {
  SETTINGS_ME_DEFAULT_TAB,
  SETTINGS_ME_TABS,
  type SettingsMeTab,
} from "../../_constants/settings-me";
import { useSettingsMeTab } from "../../_hooks/use-settings-me-tab";
import { useSettingsMeForm } from "./hooks/use-settings-me-form";
import { SettingsMeHeader } from "../settings-me-header/settings-me-header";
import { SettingsMeSidebar } from "../settings-me-sidebar/settings-me-sidebar";
import { SettingsMeNavList } from "../settings-me-nav-list/settings-me-nav-list";
import { SettingsMeSaveBar } from "../settings-me-save-bar/settings-me-save-bar";
import { SettingsMeProfileTab } from "../settings-me-profile-tab/settings-me-profile-tab";
import { SettingsMeIdentityTab } from "../settings-me-identity-tab/settings-me-identity-tab";
import { SettingsMeCasterTab } from "../settings-me-caster-tab/settings-me-caster-tab";
import { SettingsMeSolicitacoesTab } from "../settings-me-solicitacoes-tab/settings-me-solicitacoes-tab";
import { SettingsMeTeamManageTab } from "../settings-me-team-manage-tab/settings-me-team-manage-tab";

function buildSettingsMeSubtitle(userSettingsMe: Player): string {
  const statusSettingsMe = isPlayerFullyVerified(userSettingsMe)
    ? "Conta verificada"
    : "Verificação pendente";
  return `${userSettingsMe.nick} · ${statusSettingsMe} · desde ${formatMonthYearPtBr(
    userSettingsMe.joinedAt,
  )}`;
}

function findSettingsMeTabLabel(tab: SettingsMeTab): string {
  return (
    SETTINGS_ME_TABS.find((t) => t.value === tab)?.label ?? "Configurações"
  );
}

function computeVisibleSettingsMeTabs(
  user: Player,
): ReadonlySet<SettingsMeTab> {
  const set = new Set<SettingsMeTab>(["perfil", "identidade", "solicitacoes"]);

  const hasCasterRole = hasPlayerRole(user, "caster");
  const application = findCasterApplicationByPlayerTag(user.tag);
  if (hasCasterRole || application) {
    set.add("caster");
  } else {
    // Sempre permitir aplicar — tab visível mesmo sem application.
    set.add("caster");
  }

  if (hasPlayerRole(user, "captain")) {
    set.add("gerenciar-time");
  }
  return set;
}

export function SettingsMeContent() {
  const userSettingsMe = getMockCurrentUser();
  const accountSettingsMe = getMockCurrentUserAccount();
  const { activeTabSettingsMe, setTabSettingsMe } = useSettingsMeTab();

  const invitesCountSettingsMe = useMemo(
    () => getMockInvitesMe().length,
    [],
  );

  const captainPendingCountSettingsMe = useMemo(() => {
    const teams = getTeamsCaptainedByPlayerTag(userSettingsMe.tag);
    return teams.reduce(
      (sum, team) => sum + getPendingJoinRequestsByTeamSlug(team.slug).length,
      0,
    );
  }, [userSettingsMe.tag]);

  const outgoingPendingCountSettingsMe = useMemo(
    () =>
      getJoinRequestsByPlayerTag(userSettingsMe.tag).filter(
        (r) => r.status === "pending",
      ).length,
    [userSettingsMe.tag],
  );

  const solicitacoesBadgeCountSettingsMe =
    invitesCountSettingsMe + outgoingPendingCountSettingsMe;

  const visibleTabsSettingsMe = useMemo(
    () => computeVisibleSettingsMeTabs(userSettingsMe),
    [userSettingsMe],
  );

  const {
    formSettingsMe,
    isDirtySettingsMe,
    submitSettingsMeForm,
    discardSettingsMeChanges,
  } = useSettingsMeForm(userSettingsMe, accountSettingsMe);

  const desktopActiveTabSettingsMe: SettingsMeTab =
    activeTabSettingsMe ?? SETTINGS_ME_DEFAULT_TAB;

  const showSaveBarSettingsMe =
    desktopActiveTabSettingsMe === "perfil" && isDirtySettingsMe;

  const goBackSettingsMe = useCallback(
    () => setTabSettingsMe(null),
    [setTabSettingsMe],
  );

  function renderSettingsMeTabBody(tab: SettingsMeTab) {
    switch (tab) {
      case "perfil":
        return <SettingsMeProfileTab userSettingsMe={userSettingsMe} />;
      case "identidade":
        return <SettingsMeIdentityTab userSettingsMe={userSettingsMe} />;
      case "solicitacoes":
        return <SettingsMeSolicitacoesTab userSettingsMe={userSettingsMe} />;
      case "caster":
        return <SettingsMeCasterTab userSettingsMe={userSettingsMe} />;
      case "gerenciar-time":
        return <SettingsMeTeamManageTab userSettingsMe={userSettingsMe} />;
    }
  }

  const subtitleSettingsMe = buildSettingsMeSubtitle(userSettingsMe);

  return (
    <FormProvider {...formSettingsMe}>
      <div
        className={`mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ${
          showSaveBarSettingsMe ? "pb-24" : ""
        }`}
      >
        {/* Desktop: sidebar + content side-by-side */}
        <div className="hidden md:block">
          <SettingsMeHeader
            userSettingsMe={userSettingsMe}
            subtitleSettingsMe={subtitleSettingsMe}
          />
          <div className="mt-6 flex gap-8">
            <SettingsMeSidebar
              activeTabSettingsMe={desktopActiveTabSettingsMe}
              invitesCountSettingsMe={solicitacoesBadgeCountSettingsMe}
              captainPendingCountSettingsMe={captainPendingCountSettingsMe}
              visibleTabsSettingsMe={visibleTabsSettingsMe}
              onTabChangeSettingsMe={setTabSettingsMe}
            />
            <div className="min-w-0 flex-1">
              {renderSettingsMeTabBody(desktopActiveTabSettingsMe)}
            </div>
          </div>
        </div>

        {/* Mobile: list view or tab content */}
        <div className="md:hidden">
          {activeTabSettingsMe === null ? (
            <>
              <SettingsMeHeader
                userSettingsMe={userSettingsMe}
                subtitleSettingsMe={subtitleSettingsMe}
              />
              <div className="mt-5">
                <SettingsMeNavList
                  invitesCountSettingsMe={solicitacoesBadgeCountSettingsMe}
                  captainPendingCountSettingsMe={
                    captainPendingCountSettingsMe
                  }
                  visibleTabsSettingsMe={visibleTabsSettingsMe}
                  onNavigateSettingsMe={setTabSettingsMe}
                />
              </div>
              <Link
                href={`/players/${userSettingsMe.tag}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-foreground/70 hover:text-foreground"
              >
                <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
                Ver meu perfil público
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goBackSettingsMe}
                  aria-label="Voltar para configurações"
                  className="inline-flex size-8 items-center justify-center rounded-md border border-border text-foreground/75 hover:text-foreground"
                >
                  <ArrowLeftIcon className="size-4" aria-hidden="true" />
                </button>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {findSettingsMeTabLabel(activeTabSettingsMe)}
                </h2>
              </div>
              <div className="mt-4">
                {renderSettingsMeTabBody(activeTabSettingsMe)}
              </div>
            </>
          )}
        </div>
      </div>

      <SettingsMeSaveBar
        visibleSettingsMe={showSaveBarSettingsMe}
        onDiscardSettingsMe={discardSettingsMeChanges}
        onSaveSettingsMe={submitSettingsMeForm}
      />
    </FormProvider>
  );
}
