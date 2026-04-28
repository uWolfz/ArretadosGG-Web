"use client";

import type { ComponentType, SVGProps } from "react";
import { ListingTabButton } from "./components/listing-tab-button";

export type ListingTabConfig<K extends string> = {
  key: K;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Se false, o badge de contagem não renderiza mesmo com count definido. */
  showCount?: boolean;
};

type ListingTabsNavProps<K extends string> = {
  tabs: ReadonlyArray<ListingTabConfig<K>>;
  active: K;
  onChange: (tab: K) => void;
  counts?: Partial<Record<K, number>>;
  ariaLabel: string;
};

export function ListingTabsNav<K extends string>({
  tabs,
  active,
  onChange,
  counts,
  ariaLabel,
}: ListingTabsNavProps<K>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="no-scrollbar mb-5 flex items-center gap-6 border-b border-border overflow-x-auto"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const showCount = tab.showCount !== false;
        const count = counts?.[tab.key];
        return (
          <ListingTabButton
            key={tab.key}
            tab={tab}
            active={isActive}
            count={showCount ? count : undefined}
            onClick={() => onChange(tab.key)}
          />
        );
      })}
    </div>
  );
}

