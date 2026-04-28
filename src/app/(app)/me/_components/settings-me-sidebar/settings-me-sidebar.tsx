"use client";

import { cn } from "@/lib/utils";
import {
  SETTINGS_ME_TABS,
  type SettingsMeTab,
} from "../../_constants/settings-me";

type SettingsMeSidebarProps = {
  activeTabSettingsMe: SettingsMeTab;
  invitesCountSettingsMe: number;
  captainPendingCountSettingsMe: number;
  visibleTabsSettingsMe: ReadonlySet<SettingsMeTab>;
  onTabChangeSettingsMe: (tab: SettingsMeTab) => void;
};

export function SettingsMeSidebar({
  activeTabSettingsMe,
  invitesCountSettingsMe,
  captainPendingCountSettingsMe,
  visibleTabsSettingsMe,
  onTabChangeSettingsMe,
}: SettingsMeSidebarProps) {
  return (
    <nav
      aria-label="Seções de configurações"
      className="w-56 shrink-0 space-y-1"
    >
      {SETTINGS_ME_TABS.filter((t) => visibleTabsSettingsMe.has(t.value)).map(
        ({ value, label, icon: Icon }) => {
        const isActive = activeTabSettingsMe === value;
        const badge =
          value === "solicitacoes" && invitesCountSettingsMe > 0
            ? invitesCountSettingsMe
            : value === "gerenciar-time" && captainPendingCountSettingsMe > 0
              ? captainPendingCountSettingsMe
              : null;
        return (
          <button
            key={value}
            type="button"
            aria-current={isActive ? "page" : undefined}
            onClick={() => onTabChangeSettingsMe(value)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors",
              isActive
                ? "bg-brand-yellow/10 font-semibold text-brand-yellow"
                : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {badge !== null && (
              <span
                className={cn(
                  "inline-flex min-w-5 items-center justify-center rounded-full px-1 text-[10px] tabular-nums",
                  isActive
                    ? "bg-brand-yellow text-background"
                    : "bg-foreground/10 text-foreground/75",
                )}
              >
                {badge}
              </span>
            )}
          </button>
        );
        },
      )}
    </nav>
  );
}
