"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  SETTINGS_ME_TABS,
  type SettingsMeTab,
} from "../_constants/settings-me";

const SETTINGS_ME_TAB_VALUES = SETTINGS_ME_TABS.map((t) => t.value);

function isValidSettingsMeTab(value: string | null): value is SettingsMeTab {
  return !!value && (SETTINGS_ME_TAB_VALUES as readonly string[]).includes(value);
}

export function useSettingsMeTab() {
  const routerSettingsMe = useRouter();
  const pathnameSettingsMe = usePathname();
  const paramsSettingsMe = useSearchParams();

  const rawTabSettingsMe = paramsSettingsMe.get("tab");
  const activeTabSettingsMe: SettingsMeTab | null = useMemo(
    () => (isValidSettingsMeTab(rawTabSettingsMe) ? rawTabSettingsMe : null),
    [rawTabSettingsMe],
  );

  const setTabSettingsMe = useCallback(
    (next: SettingsMeTab | null) => {
      const sp = new URLSearchParams(paramsSettingsMe);
      if (next) sp.set("tab", next);
      else sp.delete("tab");
      const qs = sp.toString();
      routerSettingsMe.replace(
        qs ? `${pathnameSettingsMe}?${qs}` : pathnameSettingsMe,
        { scroll: false },
      );
    },
    [paramsSettingsMe, pathnameSettingsMe, routerSettingsMe],
  );

  return { activeTabSettingsMe, setTabSettingsMe };
}
