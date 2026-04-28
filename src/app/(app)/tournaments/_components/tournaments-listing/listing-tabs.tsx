"use client";

import {
  CalendarDaysIcon,
  FlagIcon,
  RadioIcon,
  UserRoundIcon,
} from "lucide-react";
import {
  ListingTabsNav,
  type ListingTabConfig,
} from "@/app/(app)/_components";
import type { TournamentsFilterTab } from "@/app/(app)/tournaments/_hooks/use-tournaments-filter";

const TAB_ORDER: ReadonlyArray<ListingTabConfig<TournamentsFilterTab>> = [
  { key: "upcoming", label: "Próximos campeonatos", icon: CalendarDaysIcon },
  { key: "live", label: "Em andamento", icon: RadioIcon },
  { key: "finished", label: "Finalizados", icon: FlagIcon },
  { key: "mine", label: "Meus campeonatos", icon: UserRoundIcon, showCount: false },
];

type ListingTabsProps = {
  active: TournamentsFilterTab;
  onChange: (tab: TournamentsFilterTab) => void;
  counts: Record<TournamentsFilterTab, number>;
};

export function ListingTabs({ active, onChange, counts }: ListingTabsProps) {
  return (
    <ListingTabsNav
      tabs={TAB_ORDER}
      active={active}
      onChange={onChange}
      counts={counts}
      ariaLabel="Filtrar torneios por estado"
    />
  );
}
