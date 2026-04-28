import type { ComponentType } from "react";
import {
  MicIcon,
  NewspaperIcon,
  SwordsIcon,
  TrophyIcon,
  UsersIcon,
  UserRoundIcon,
  type IconProps,
} from "@/components/shared/icons";

export type AppNavItem = {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
  /** true = navegável; false = "em breve", desabilitado */
  enabled: boolean;
};

export const appNav: AppNavItem[] = [
  { label: "Torneios", href: "/tournaments", icon: TrophyIcon, enabled: true },
  { label: "Partidas", href: "/matches", icon: SwordsIcon, enabled: true },
  { label: "Times", href: "/teams", icon: UsersIcon, enabled: true },
  { label: "Players", href: "/players", icon: UserRoundIcon, enabled: true },
  { label: "Casters", href: "/casters", icon: MicIcon, enabled: true },
  { label: "Notícias", href: "/news", icon: NewspaperIcon, enabled: true },
];
