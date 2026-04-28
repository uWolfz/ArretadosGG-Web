import type { ComponentType } from "react";
import {
  FlameIcon,
  HomeIcon,
  LayersIcon,
  TrophyIcon,
  UsersIcon,
  type IconProps,
} from "@/components/shared/icons";

export type ServiceItem = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  icon?: ComponentType<IconProps>;
  cta?: boolean;
  children?: ServiceItem[];
};

export const services: ServiceItem[] = [
  {
    label: "Transmissão ao vivo",
    href: "/servicos/transmissao",
    description: "Broadcast multiplataforma com direção ao vivo e overlays on-brand.",
  },
  {
    label: "Terceirização",
    href: "/servicos/outsourcing",
    description: "Outsourcing de equipe e infra pra operar eventos end-to-end.",
  },
  {
    label: "League Operations",
    href: "/servicos/league-operations",
    description: "Gestão de ligas, regulamento, draws e decisões em tempo real.",
  },
  {
    label: "Desenvolvimento",
    href: "/servicos/desenvolvimento",
    description: "Software sob medida: plataforma de torneios, dashboards, automação.",
  },
  {
    label: "Produção Audiovisual",
    href: "/servicos/producao-audiovisual",
    description: "Captação, edição e pós pra conteúdo social, teasers e highlights.",
  },
  {
    label: "Consultoria",
    href: "/servicos/consultoria",
    description: "Strategy advisory pra marcas e publishers entrando em esports.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Início", href: "/", icon: HomeIcon },
  {
    label: "Serviços",
    href: "/servicos/transmissao",
    icon: LayersIcon,
    children: services,
  },
  { label: "Cases", href: "/cases", icon: TrophyIcon },
  { label: "Sobre", href: "/sobre", icon: UsersIcon },
  { label: "Crie seu campeonato", href: "/tournaments", icon: FlameIcon, cta: true },
];

export const footerNav: NavItem[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Termos", href: "/termos" },
  { label: "Privacidade", href: "/privacidade" },
];
