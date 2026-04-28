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

export const NAV_PRODUCT: NavLink[] = [
  { label: "Torneios", href: "/tournaments" },
  { label: "Partidas", href: "/matches" },
  { label: "Times", href: "/teams" },
  { label: "Notícias", href: "/news" },
];

export const NAV_SERVICES: NavLink[] = [
  { label: "Transmissão ao vivo", href: "/servicos/transmissao" },
  { label: "League Operations", href: "/servicos/league-operations" },
  { label: "Terceirização", href: "/servicos/outsourcing" },
  { label: "Software", href: "/servicos/desenvolvimento" },
  { label: "Produção audiovisual", href: "/servicos/producao-audiovisual" },
  { label: "Consultoria", href: "/servicos/consultoria" },
];

export const NAV_COMPANY: NavLink[] = [
  { label: "Cases", href: "/cases" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Blog", href: "/blog" },
  { label: "Carreiras", href: "/carreiras" },
];

export const NAV_CONTACT: NavLink[] = [
  { label: "comercial@arretados.gg", href: "mailto:comercial@arretados.gg" },
  { label: "LinkedIn", href: "https://linkedin.com/company/arretados" },
  { label: "Instagram", href: "https://instagram.com/arretados" },
  { label: "YouTube", href: "https://youtube.com/@arretados" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Política de privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
  { label: "Cookies", href: "/cookies" },
];

export const COMPANY_INFO = {
  razaoSocial: "Arretados Esports Operações Ltda.",
  cnpj: "00.000.000/0001-00",
} as const;
