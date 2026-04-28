import type { KeywordGroup, NavLink } from "../types";

export const KEYWORDS: KeywordGroup[] = [
  {
    title: "Broadcasting",
    items: [
      { label: "Transmissão ao vivo", href: "/servicos/transmissao" },
      { label: "Liga de esports", href: "/servicos/league-operations" },
      { label: "Operação de estúdio", href: "/servicos/transmissao" },
      { label: "Direção de broadcast", href: "/servicos/transmissao" },
    ],
  },
  {
    title: "Criação",
    items: [
      { label: "Captação audiovisual", href: "/servicos/producao-audiovisual" },
      { label: "Edição e pós-evento", href: "/servicos/producao-audiovisual" },
      { label: "Overlays e identidade", href: "/servicos/producao-audiovisual" },
      { label: "Melhores momentos", href: "/servicos/producao-audiovisual" },
    ],
  },
  {
    title: "Ferramentas",
    items: [
      { label: "Plataforma de inscrição", href: "/servicos/desenvolvimento" },
      { label: "Painel de árbitros", href: "/servicos/desenvolvimento" },
      { label: "Hotsite do evento", href: "/servicos/desenvolvimento" },
      { label: "Integrações de dados", href: "/servicos/desenvolvimento" },
    ],
  },
  {
    title: "Planejamento",
    items: [
      { label: "Consultoria estratégica", href: "/servicos/consultoria" },
      { label: "Formato e regulamento", href: "/servicos/league-operations" },
      { label: "Operação ponta a ponta", href: "/servicos/outsourcing" },
      { label: "KPIs de esports", href: "/servicos/consultoria" },
    ],
  },
];

export const NAV_SERVICES: NavLink[] = [
  { label: "Transmissão ao vivo", href: "/servicos/transmissao" },
  { label: "Operações de liga", href: "/servicos/league-operations" },
  { label: "Terceirização (outsourcing)", href: "/servicos/outsourcing" },
  { label: "Consultoria especializada", href: "/servicos/consultoria" },
  { label: "Software e TI", href: "/servicos/desenvolvimento" },
];

export const NAV_COMPANY: NavLink[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Cases", href: "/cases" },
  { label: "Contato", href: "mailto:arretadosgg@gmail.com" },
];

export const NAV_SOCIAL: NavLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/company/arretados" },
  { label: "YouTube", href: "https://youtube.com/@arretados" },
  { label: "Instagram", href: "https://instagram.com/arretados" },
  { label: "Twitter", href: "https://x.com/arretados" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Política de privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
  { label: "Cookies", href: "/cookies" },
];
