export type TournamentGame = "cod" | "lol" | "valorant" | "cs2";

export type TournamentStatus = "live" | "open" | "upcoming" | "finished";

export type TournamentTeamSize = "1v1" | "2v2" | "5v5";

export type TournamentRegistration = "open" | "invite";

export type TournamentPrizeEntry = {
  position: string; // "1º", "2º", "3º-4º"
  prize: string; // "R$ 20.000"
};

export type TournamentCaster = {
  /**
   * FK pro Caster (via Player). Quando presente, dados canônicos vêm de
   * CASTERS. Os campos inline abaixo continuam como fallback pra casters
   * legados (ainda não cadastrados) e pra snapshot histórico.
   */
  casterPlayerTag?: string;
  name: string;
  /** Path relativo em /public ou URL. Se ausente, renderiza initials. */
  photo?: string;
  /** Ex: "@fulanogg" ou "twitch.tv/fulanogg". */
  handle?: string;
  /** Ex: "Play-by-play", "Análise". */
  role?: string;
};

/**
 * Shape usado em superfícies de listing (cards, spotlight, live-now).
 * Não inclui bio/regulamento/breakdown — evita acoplamento desnecessário.
 */
export type TournamentCore = {
  slug: string;
  name: string;
  game: TournamentGame;
  status: TournamentStatus;
  teamSize: TournamentTeamSize;
  registrationType: TournamentRegistration;
  prizeDisplay: string;
  teamsRegistered: number;
  teamsTotal: number;
  startsAt: string;
  banner: string;
  logo: string;
  /** só presente quando status === "live" */
  streamUrl?: string;
  /** só presente quando status === "finished" */
  champion?: string;
};

/**
 * Shape completo usado na página de detalhe.
 * Estende o core com campos editoriais.
 */
export type Tournament = TournamentCore & {
  /** parágrafos separados por `\n\n` */
  bio: string;
  /** ex: "Swiss + Single Elim · BO5" */
  format: string;
  /** markdown-like simples; quebras por `\n` */
  rules: string;
  prizeBreakdown: TournamentPrizeEntry[];

  /** ISO — quando as inscrições encerram. Só relevante p/ status === "open" */
  registrationEndsAt?: string;
  /** cidade/local pra eventos presenciais */
  venue?: string;
  /** Quem vai transmitir. Quantidade variável. */
  casters?: TournamentCaster[];
};

export function findTournamentBySlug(slug: string): Tournament | undefined {
  return TOURNAMENTS_BY_SLUG.get(slug);
}

export const TOURNAMENTS: Tournament[] = [
  {
    slug: "arretados-invitational-cod",
    name: "Arretados Invitational · CoD",
    game: "cod",
    status: "live",
    teamSize: "5v5",
    registrationType: "invite",
    prizeDisplay: "R$ 40.000",
    teamsRegistered: 16,
    teamsTotal: 16,
    startsAt: "2026-04-15T19:00:00-03:00",
    banner: "/eventos-web/2025-07-arretados-invitational/img-1504-poster.webp",
    logo: "/Logos - Institucional/Logo - Arretados Invitational.png",
    streamUrl: "https://twitch.tv/arretadosgg",
    venue: "Recife · PE · Centro de Convenções",
    bio: "O Arretados Invitational é o principal torneio convidado da Arretados pra Call of Duty no Nordeste. Reúne as 16 melhores organizações do circuito em um formato híbrido: fase de grupos online seguida de finais presenciais no palco principal.\n\nCada edição é curada pela equipe da Arretados em conjunto com o conselho de capitães. A narrativa dessa edição 2026 gira em torno da disputa entre Fúria Vermelha (bicampeã) e Cangaço Esports (campeã 2024), em um confronto aguardado pela comunidade há meses.",
    format: "Grupos duplos + Double Elimination · BO5 (finais BO7)",
    rules:
      "Regulamento completo disponível no painel de capitães.\n\n• Cada time com 5 titulares + 1 reserva registrado\n• Banimentos de armas e perks conforme tabela atualizada\n• Match fixo com observadores da Arretados em todas as partidas\n• Decisão de arbitragem é final e inapelável\n• Uso de softwares externos (exceto permitidos) gera desclassificação",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 20.000" },
      { position: "2º", prize: "R$ 10.000" },
      { position: "3º–4º", prize: "R$ 4.000" },
      { position: "5º–8º", prize: "R$ 500" },
    ],
    casters: [
      {
        casterPlayerTag: "rafacangaco",
        name: "Rafa Cangaço",
        role: "Play-by-play",
        handle: "twitch.tv/rafacangaco",
        photo: "/eventos-web/2025-07-arretados-invitational/img-1510-heic.webp",
      },
      {
        casterPlayerTag: "dutavares",
        name: "Dú Tavares",
        role: "Análise",
        handle: "@dutavares",
        photo: "/eventos-web/2025-07-arretados-invitational/img-1511-heic.webp",
      },
      {
        casterPlayerTag: "marcinhobr",
        name: "Marcinho BR",
        role: "Análise",
        handle: "twitch.tv/marcinhobr",
        photo: "/eventos-web/2025-07-arretados-invitational/img-1512-heic.webp",
      },
      {
        casterPlayerTag: "pamnordeste",
        name: "Pam Nordeste",
        role: "Host",
        handle: "twitch.tv/pamnordeste",
        photo: "/eventos-web/2025-08-lan-sergipe-gamer/img-1988-heic.webp",
      },
    ],
  },
  {
    slug: "lan-sergipe-valorant",
    name: "LAN Sergipe Gamer · Valorant",
    game: "valorant",
    status: "live",
    teamSize: "5v5",
    registrationType: "open",
    prizeDisplay: "R$ 15.000",
    teamsRegistered: 12,
    teamsTotal: 12,
    startsAt: "2026-04-17T14:00:00-03:00",
    banner: "/eventos-web/2025-08-lan-sergipe-gamer/hlxb0300-poster.webp",
    logo: "/Logos - Institucional/Logo Arretados.png",
    streamUrl: "https://twitch.tv/arretadosgg",
    venue: "Aracaju · SE · Arena Batistão",
    bio: "A LAN Sergipe Gamer é a principal reunião presencial de Valorant do circuito Arretados. 12 times competem em single day BO3 de grupos seguido de playoffs BO5 no mesmo final de semana.\n\nEdição 2026 mantém o formato consagrado com trilha de conteúdo integrada: sessões com coaches, watch parties e meet & greet com times profissionais.",
    format: "Grupos Round-Robin + Single Elimination · BO3 (finais BO5)",
    rules:
      "Regulamento disponível pra consulta no painel de capitães.\n\n• Lineup definitiva fechada 24h antes do evento\n• Substituições durante a LAN: 1 por série, confirmada pelo árbitro\n• Mapas pool padrão Riot vigente\n• Todos os times devem estar presentes 30min antes do horário da partida",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 8.000" },
      { position: "2º", prize: "R$ 4.000" },
      { position: "3º", prize: "R$ 2.000" },
      { position: "4º", prize: "R$ 1.000" },
    ],
  },
  {
    slug: "serie-a-codm-regional",
    name: "Série A · CoDM Regional",
    game: "cod",
    status: "open",
    teamSize: "5v5",
    registrationType: "open",
    prizeDisplay: "R$ 25.000",
    teamsRegistered: 9,
    teamsTotal: 16,
    startsAt: "2026-05-03T20:00:00-03:00",
    registrationEndsAt: "2026-04-28T23:59:00-03:00",
    banner: "/eventos-web/2025-07-arretados-invitational/img-1505-poster.webp",
    logo: "/Logos - Institucional/Logo - Série A (CODM).png",
    bio: "Série A é o campeonato regional aberto de Call of Duty Mobile pro Nordeste. Equipes de qualquer nível podem se inscrever: a fase classificatória seleciona os 16 melhores pra disputar a fase final online.\n\nPontos obtidos valem pro ranking anual do circuito — top 4 garantem vaga direta no Arretados Invitational da próxima edição.",
    format: "Classificatória Open + Grupos + Single Elimination · BO3",
    rules:
      "Inscrição livre. Regulamento completo entregue pós-inscrição.\n\n• Mínimo de 3 partidas oficiais por time durante a fase classificatória\n• Time deve indicar capitão responsável (maior de 18 anos)\n• Partidas oficiais: dias e horários fixos divulgados no painel\n• Fair play e conduta: violações levam a advertência e eliminação",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 12.000" },
      { position: "2º", prize: "R$ 7.000" },
      { position: "3º–4º", prize: "R$ 2.500" },
      { position: "5º–8º", prize: "R$ 250" },
    ],
  },
  {
    slug: "login-arena-lol-s3",
    name: "Login Arena · LoL Season 3",
    game: "lol",
    status: "open",
    teamSize: "5v5",
    registrationType: "open",
    prizeDisplay: "R$ 60.000",
    teamsRegistered: 14,
    teamsTotal: 24,
    startsAt: "2026-05-10T18:00:00-03:00",
    registrationEndsAt: "2026-05-05T23:59:00-03:00",
    banner: "/eventos-web/2025-08-lan-sergipe-gamer/glkd6817-poster.webp",
    logo: "/Logos - Institucional/Logo Arretados.png",
    bio: "Login Arena · LoL Season 3 é a terceira temporada do circuito aberto mais disputado de League of Legends do Nordeste. 24 times competem em calendário de 8 semanas, com partidas duas vezes por semana e playoffs eliminatórios ao final.\n\nParceria oficial Login Arena × Arretados · sistema de ranking integrado, draft oficial, e transmissão co-produzida.",
    format: "Regular Season (Round-Robin duplo) + Playoffs Single Elim · BO5",
    rules:
      "Inscrição por organização. Roster de 5 titulares + 2 substitutos.\n\n• Flex picks liberados após o ban/pick\n• Ranking mínimo Platinum 4 para todos os jogadores\n• Partidas oficiais transmitidas em dias e horários fixos\n• Sistema de pontos com bonificação por vitórias limpas (2-0)",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 30.000" },
      { position: "2º", prize: "R$ 15.000" },
      { position: "3º–4º", prize: "R$ 6.000" },
      { position: "5º–8º", prize: "R$ 750" },
    ],
  },
  {
    slug: "alianca-warzone-dupla",
    name: "Aliança Warzone · Dupla",
    game: "cod",
    status: "open",
    teamSize: "2v2",
    registrationType: "open",
    prizeDisplay: "R$ 8.000",
    teamsRegistered: 22,
    teamsTotal: 32,
    startsAt: "2026-04-28T21:00:00-03:00",
    registrationEndsAt: "2026-04-26T23:59:00-03:00",
    banner: "/eventos-web/2025-07-arretados-invitational/img-1504-poster.webp",
    logo: "/Logos - Institucional/Logo - Aliança Warzone Brasil.png",
    bio: "Aliança Warzone · Dupla é o torneio de duplas pra Call of Duty Warzone. Formato Kill Race em 3 partidas — soma total de abates define o ranking. Sem bracket, sem mata-mata: é pura performance agregada.\n\nEdição rápida, inscrição open, premiação total de R$ 8.000 divididos pelas 4 primeiras duplas.",
    format: "Kill Race · 3 partidas · soma total de kills",
    rules:
      "Dupla fixa durante todo o torneio.\n\n• 3 partidas com intervalo de 30min entre cada\n• Pontos: 1 ponto por kill + bônus por Top 3\n• Streaming obrigatório: link enviado ao ingressar\n• Violação de stream cooldown: desclassificação",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 4.000" },
      { position: "2º", prize: "R$ 2.500" },
      { position: "3º", prize: "R$ 1.000" },
      { position: "4º", prize: "R$ 500" },
    ],
    casters: [
      {
        casterPlayerTag: "rafacangaco",
        name: "Rafa Cangaço",
        role: "Play-by-play",
        handle: "twitch.tv/rafacangaco",
        photo: "/eventos-web/2025-08-lan-sergipe-gamer/img-1967-heic.webp",
      },
      {
        casterPlayerTag: "dutavares",
        name: "Dú Tavares",
        role: "Análise",
        handle: "@dutavares",
        photo: "/eventos-web/2025-08-lan-sergipe-gamer/img-1968-heic.webp",
      },
      {
        casterPlayerTag: "pamnordeste",
        name: "Pam Nordeste",
        role: "Host",
        handle: "twitch.tv/pamnordeste",
        photo: "/eventos-web/2025-08-lan-sergipe-gamer/img-1970-jpg.webp",
      },
    ],
  },
  {
    slug: "serie-b-codm-acesso",
    name: "Série B · CoDM Acesso",
    game: "cod",
    status: "upcoming",
    teamSize: "5v5",
    registrationType: "open",
    prizeDisplay: "R$ 12.000",
    teamsRegistered: 16,
    teamsTotal: 16,
    startsAt: "2026-04-22T20:00:00-03:00",
    banner: "/eventos-web/2025-07-arretados-invitational/img-1505-poster.webp",
    logo: "/Logos - Institucional/Logo - Série B (CODM).png",
    bio: "Série B é a divisão de acesso do circuito competitivo de CoDM. Os 16 times classificados da temporada anterior disputam as 4 vagas da Série A 2027.\n\nFormato: partidas em ida e volta BO3 ao longo de 4 semanas, com os 4 últimos enfrentando relegação pra Série C na próxima edição.",
    format: "Regular Season BO3 (ida e volta) · top 4 sobem · bottom 4 descem",
    rules: "• Plantel fechado 48h antes do início\n• Substituição por lesão precisa de aval médico\n• 2 walkovers consecutivos = desclassificação\n• Codes de partidas gerados e enviados automaticamente",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 6.000" },
      { position: "2º", prize: "R$ 3.500" },
      { position: "3º–4º", prize: "R$ 1.250" },
    ],
  },
  {
    slug: "cs2-aim-challenge-1v1",
    name: "CS2 Aim Challenge · 1v1",
    game: "cs2",
    status: "upcoming",
    teamSize: "1v1",
    registrationType: "invite",
    prizeDisplay: "R$ 5.000",
    teamsRegistered: 32,
    teamsTotal: 32,
    startsAt: "2026-05-18T19:30:00-03:00",
    banner: "/eventos-web/2025-08-lan-sergipe-gamer/hlxb0300-poster.webp",
    logo: "/Logos - Institucional/Logo Arretados.png",
    bio: "CS2 Aim Challenge é um torneio 1v1 de convite com os 32 melhores riflers do circuito Arretados. Single elimination BO3 em aim_map, com mapas temáticos nas semifinais em diante.\n\nShowmatch aberto com narração completa — ideal pra exibir a mecânica pura de cada jogador.",
    format: "Single Elim · BO3 (BO5 nas finais) · aim_map custom",
    rules:
      "Convite apenas — lista gerada pelo ranking ELO da plataforma.\n\n• Sem utility: apenas armas\n• Primeiro a 16 abates ganha o mapa\n• Ping medido pelo servidor oficial Arretados\n• Configurações de mira livre mas não podem incluir scripts",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 2.500" },
      { position: "2º", prize: "R$ 1.500" },
      { position: "3º–4º", prize: "R$ 500" },
    ],
  },
  {
    slug: "arretados-invitational-cod-2025",
    name: "Arretados Invitational · CoD 2025",
    game: "cod",
    status: "finished",
    teamSize: "5v5",
    registrationType: "invite",
    prizeDisplay: "R$ 50.000",
    teamsRegistered: 16,
    teamsTotal: 16,
    startsAt: "2025-07-20T19:00:00-03:00",
    banner: "/eventos-web/2025-07-arretados-invitational/img-1504-poster.webp",
    logo: "/Logos - Institucional/Logo - Arretados Invitational.png",
    champion: "Fúria Vermelha",
    venue: "Recife · PE · Centro de Convenções",
    bio: "Edição 2025 do Arretados Invitational entrou pra história como o torneio de CoD mais assistido do ano no Nordeste, com picos de 42 mil espectadores simultâneos.\n\nA Fúria Vermelha levantou o troféu depois de vencer o Cangaço Esports por 4-3 em uma das finais mais disputadas da temporada.",
    format: "Grupos duplos + Double Elimination · BO5 (final BO7)",
    rules: "Arquivado. Mesmo regulamento da edição atual.",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 25.000" },
      { position: "2º", prize: "R$ 12.500" },
      { position: "3º–4º", prize: "R$ 5.000" },
      { position: "5º–8º", prize: "R$ 625" },
    ],
  },
  {
    slug: "lan-sergipe-cs2-2025",
    name: "LAN Sergipe Gamer · CS2 2025",
    game: "cs2",
    status: "finished",
    teamSize: "5v5",
    registrationType: "open",
    prizeDisplay: "R$ 10.000",
    teamsRegistered: 12,
    teamsTotal: 12,
    startsAt: "2025-08-15T14:00:00-03:00",
    banner: "/eventos-web/2025-08-lan-sergipe-gamer/glkd6817-poster.webp",
    logo: "/Logos - Institucional/Logo Arretados.png",
    champion: "Cangaço Esports",
    venue: "Aracaju · SE · Arena Batistão",
    bio: "Edição 2025 de CS2 da LAN Sergipe Gamer. Cangaço Esports dominou do início ao fim, saindo invicta da fase classificatória e fechando os playoffs sem perder mapa.",
    format: "Grupos Round-Robin + Single Elim · BO3 (final BO5)",
    rules: "Arquivado.",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 5.000" },
      { position: "2º", prize: "R$ 3.000" },
      { position: "3º", prize: "R$ 1.500" },
      { position: "4º", prize: "R$ 500" },
    ],
  },
  {
    slug: "login-arena-lol-s2",
    name: "Login Arena · LoL Season 2",
    game: "lol",
    status: "finished",
    teamSize: "5v5",
    registrationType: "open",
    prizeDisplay: "R$ 45.000",
    teamsRegistered: 24,
    teamsTotal: 24,
    startsAt: "2026-03-08T18:00:00-03:00",
    banner: "/eventos-web/2025-08-lan-sergipe-gamer/hlxb0300-poster.webp",
    logo: "/Logos - Institucional/Logo Arretados.png",
    champion: "Fogueira BR",
    bio: "Season 2 encerrou com uma final épica entre Fogueira BR e Cangaço Esports — virada histórica com 3 mapas consecutivos após começar 0-2.\n\nA temporada consolidou o formato co-produzido Login Arena × Arretados e pavimentou o calendário expandido da Season 3.",
    format: "Regular Season + Playoffs Single Elim · BO5",
    rules: "Arquivado.",
    prizeBreakdown: [
      { position: "1º", prize: "R$ 22.000" },
      { position: "2º", prize: "R$ 12.000" },
      { position: "3º–4º", prize: "R$ 4.500" },
      { position: "5º–8º", prize: "R$ 500" },
    ],
  },
];

const TOURNAMENTS_BY_SLUG: ReadonlyMap<string, Tournament> = new Map(
  TOURNAMENTS.map((t) => [t.slug, t]),
);

export function getTournamentsCastedByPlayerTag(
  playerTag: string,
): Tournament[] {
  return TOURNAMENTS.filter((t) =>
    (t.casters ?? []).some((c) => c.casterPlayerTag === playerTag),
  );
}
