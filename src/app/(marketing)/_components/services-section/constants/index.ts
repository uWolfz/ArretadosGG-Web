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
      "Regulamento, tabelas, decisões em tempo real e relatórios pós-temporada.",
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
      "Equipe técnica, árbitros, observadores e suporte em tempo real — montamos e operamos o evento de ponta a ponta.",
    photo: {
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6761-heic.webp",
      alt: "Equipe operando setup técnico durante evento",
    },
  },
  {
    href: "/servicos/producao-audiovisual",
    code: "04",
    label: "Produção audiovisual",
    summary:
      "Produção de melhores momentos, institucionais, teasers e edições para social media com identidade da marca.",
    photo: {
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1970-jpg.webp",
      alt: "Vencedor segurando troféu ao final do campeonato",
    },
  },
  {
    href: "/servicos/consultoria",
    code: "05",
    label: "Consultoria estratégica",
    summary:
      "Pesquisa, formato, planejamento, custos e relação com as comunidades que atuamos.",
    photo: {
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6788-heic.webp",
      alt: "Equipe no palco ao final do campeonato",
    },
  },
];
