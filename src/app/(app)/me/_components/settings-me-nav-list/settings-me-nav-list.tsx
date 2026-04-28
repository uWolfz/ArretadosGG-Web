"use client";

import { ChevronRightIcon } from "lucide-react";
import {
  SETTINGS_ME_TABS,
  type SettingsMeTab,
} from "../../_constants/settings-me";

type SettingsMeNavListProps = {
  invitesCountSettingsMe: number;
  captainPendingCountSettingsMe: number;
  visibleTabsSettingsMe: ReadonlySet<SettingsMeTab>;
  onNavigateSettingsMe: (tab: SettingsMeTab) => void;
};

export function SettingsMeNavList({
  invitesCountSettingsMe,
  captainPendingCountSettingsMe,
  visibleTabsSettingsMe,
  onNavigateSettingsMe,
}: SettingsMeNavListProps) {
  const visibleTabsList = SETTINGS_ME_TABS.filter((t) =>
    visibleTabsSettingsMe.has(t.value),
  );
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      {visibleTabsList.map(({ value, label, icon: Icon }, index) => {
        const badge =
          value === "solicitacoes" && invitesCountSettingsMe > 0
            ? invitesCountSettingsMe
            : value === "gerenciar-time" && captainPendingCountSettingsMe > 0
              ? captainPendingCountSettingsMe
              : null;
        const isLast = index === visibleTabsList.length - 1;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onNavigateSettingsMe(value)}
            className={`flex w-full items-center justify-between px-4 py-3.5 transition-colors active:bg-foreground/5 ${
              isLast ? "" : "border-b border-border"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className="size-4 text-foreground/70"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
              {badge !== null && (
                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-brand-yellow/15 px-1 text-[10px] font-semibold tabular-nums text-brand-yellow">
                  {badge}
                </span>
              )}
            </div>
            <ChevronRightIcon
              className="size-4 text-foreground/55"
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
