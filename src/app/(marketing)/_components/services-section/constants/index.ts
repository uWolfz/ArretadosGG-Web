import type { FeaturedService, Service } from "../types";

export const FEATURED: FeaturedService = {
  href: "/servicos/transmissao",
  code: "01",
  label: "Transmissão ao vivo",
  summary:
    "Broadcast multiplataforma com direção ao vivo, overlays on-brand e operação técnica completa. YouTube, Twitch ou embed na sua plataforma — sem repasse pra produtoras terceiras.",
  video: {
    src: "/eventos-web/2026-3-login-arena-lol-s2/img-6746.mp4",
    poster: "/eventos-web/2026-3-login-arena-lol-s2/img-6746-poster.webp",
  },
};

export const SECONDARY: Service[] = [
  {
    href: "/servicos/league-operations",
    code: "02",
    label: "League Operations",
    summary:
      "Regulamento, seedings, brackets, decisões em tempo real e relatórios pós-temporada.",
    photo: {
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-2016-heic.webp",
      alt: "Público assistindo a partida decisiva no mall",
    },
  },
  {
    href: "/servicos/outsourcing",
    code: "03",
    label: "Terceirização de operação",
    summary:
      "Equipe técnica, árbitros, observadores e suporte — montamos e operamos end-to-end.",
    photo: {
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6761-heic.webp",
      alt: "Equipe operando setup técnico durante evento",
    },
  },
  {
    href: "/servicos/desenvolvimento",
    code: "04",
    label: "Desenvolvimento de software",
    summary:
      "Inscrição, painel de árbitros, automação de resultados e dashboards em tempo real.",
    photo: {
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6753-jpg.webp",
      alt: "Estação de jogo com monitor, PC e acessórios",
    },
  },
  {
    href: "/servicos/producao-audiovisual",
    code: "05",
    label: "Produção audiovisual",
    summary:
      "Best-of pós-evento, institucionais, teasers e edições pra social media — com a identidade da marca.",
    photo: {
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1970-jpg.webp",
      alt: "Vencedor segurando troféu ao final do campeonato",
    },
  },
  {
    href: "/servicos/consultoria",
    code: "06",
    label: "Consultoria estratégica",
    summary:
      "Pesquisa, formato, KPIs realistas, seleção de ativos e relação com jogadores e orgas.",
    photo: {
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6788-heic.webp",
      alt: "Equipe no palco ao final do campeonato",
    },
  },
];
