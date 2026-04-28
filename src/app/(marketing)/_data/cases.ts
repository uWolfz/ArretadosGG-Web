export type CaseMedia =
  | { type: "video"; src: string; poster: string; alt: string }
  | { type: "photo"; src: string; alt: string };

export type CaseMetric = { value: string; label: string };

export type CaseNarrativeBlock = {
  heading: string;
  body: string;
};

export type CaseNarrative = {
  problem: CaseNarrativeBlock;
  solution: CaseNarrativeBlock;
  result: CaseNarrativeBlock;
};

export type CaseGalleryItem = {
  src: string;
  alt: string;
};

export type CaseScopeDetail = {
  title: string;
  bullets: string[];
};

export type CaseAccent = "green" | "yellow" | "red";

export type CaseStudy = {
  code: string;
  slug: string;
  client: string;
  title: string;
  yearLabel: string;
  contextTags: string[];
  scope: string[];
  metrics: CaseMetric[];
  summary: string;
  media: CaseMedia;
  heroMedia?: CaseMedia;
  narrative: CaseNarrative;
  gallery: CaseGalleryItem[];
  scopeDetail: CaseScopeDetail[];
  accent: CaseAccent;
};

export const CASES: CaseStudy[] = [
  {
    code: "01",
    accent: "green",
    slug: "login-arena-lol-s2",
    client: "Login Arena",
    title: "LoL · Season 2",
    yearLabel: "2026 · Março",
    contextTags: ["League of Legends", "São Paulo"],
    scope: ["Broadcast", "League Ops", "Software"],
    metrics: [
      { value: "24", label: "equipes competindo" },
      { value: "48", label: "partidas transmitidas" },
      { value: "14", label: "dias de operação" },
    ],
    summary:
      "Segunda temporada da liga mensal da Login Arena em São Paulo. A gente rodou regulamento, arbitragem e broadcast, com o stream embedado direto no site da arena.",
    media: {
      type: "video",
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6755.mp4",
      poster: "/eventos-web/2026-3-login-arena-lol-s2/img-6755-poster.webp",
      alt: "Players operando durante temporada 2 da Login Arena",
    },
    narrative: {
      problem: {
        heading: "Toda temporada começava do zero",
        body:
          "A Login Arena já tinha público fiel na liga mensal, mas cada ciclo era remontar o kit: um fornecedor cuidava do regulamento, outro do broadcast, outro da plataforma. A espera entre partidas e a queda no stream viravam problema direto da arena.",
      },
      solution: {
        heading: "A gente assumiu as três frentes",
        body:
          "Juntamos regulamento, arbitragem e broadcast num time só. Arbitramos pelo nosso painel próprio, cortamos espera entre rodadas com automação de partida, e embedamos o stream direto no site da arena — sem player de terceiro no caminho.",
      },
      result: {
        heading: "Season 2 rodou sem sobressalto",
        body:
          "24 equipes, 48 partidas em duas semanas, zero retrabalho entre ciclos. Com o embed direto, o público parou de sair do site pra assistir — o tempo médio por sessão subiu junto.",
      },
    },
    gallery: [
      {
        src: "/eventos-web/2026-3-login-arena-lol-s2/img-6745-jpg.webp",
        alt: "Arena vazia com palco iluminado antes da porta abrir pro público.",
      },
      {
        src: "/eventos-web/2026-3-login-arena-lol-s2/img-6754-jpg.webp",
        alt: "Setup de PCs da equipe competindo durante a temporada.",
      },
      {
        src: "/eventos-web/2026-3-login-arena-lol-s2/img-6767-heic.webp",
        alt: "Medalhas da temporada em cima da mesa, prontas pra cerimônia.",
      },
      {
        src: "/eventos-web/2026-3-login-arena-lol-s2/img-6771-heic.webp",
        alt: "Medalha oficial Login Arena 2026 em close, com grafite colorido atrás.",
      },
      {
        src: "/eventos-web/2026-3-login-arena-lol-s2/img-6795-heic.webp",
        alt: "Equipe reunida nos bastidores com as medalhas da temporada.",
      },
      {
        src: "/eventos-web/2026-3-login-arena-lol-s2/img-6773-heic.webp",
        alt: "Bastidor da Login Arena durante operação da Season 2.",
      },
    ],
    scopeDetail: [
      {
        title: "Broadcast",
        bullets: [
          "Direção técnica ao vivo com câmeras dedicadas ao público da arena",
          "Overlays on-brand sincronizados com o placar em tempo real",
          "Embed nativo na plataforma do cliente, sem player terceiro",
        ],
      },
      {
        title: "League Ops",
        bullets: [
          "Regulamento, chaveamento e draws operados internamente",
          "Arbitragem treinada no painel próprio de decisões",
          "Comunicação direta com os times em janelas definidas",
        ],
      },
      {
        title: "Software",
        bullets: [
          "Automação de partidas cortando espera entre rounds",
          "Painel de árbitros com histórico e auditoria de decisões",
          "Telemetria integrada ao broadcast pra overlays dinâmicos",
        ],
      },
    ],
  },
  {
    code: "02",
    accent: "yellow",
    slug: "lan-sergipe-gamer",
    client: "LAN Sergipe Gamer",
    title: "Campeonato regional",
    yearLabel: "2025 · Agosto",
    contextTags: ["CODM · Free Fire · Warzone", "Aracaju"],
    scope: ["Evento presencial", "Broadcast", "Audiovisual"],
    metrics: [
      { value: "32", label: "equipes na LAN" },
      { value: "3", label: "modalidades no palco" },
      { value: "5", label: "dias até highlights" },
    ],
    summary:
      "LAN de um dia dentro de um shopping em Aracaju. Três modalidades rodando no mesmo palco — CODM, Free Fire e Warzone — com broadcast ao vivo e highlights fechados na mesma semana.",
    media: {
      type: "photo",
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1970-jpg.webp",
      alt: "Vencedor segurando troféu ao final da LAN Sergipe Gamer",
    },
    heroMedia: {
      type: "video",
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1996.mp4",
      poster: "/eventos-web/2025-08-lan-sergipe-gamer/img-1996-poster.webp",
      alt: "Ambiente da LAN Sergipe Gamer rodando dentro do shopping",
    },
    narrative: {
      problem: {
        heading: "Três modalidades, uma tarde, dentro do mall",
        body:
          "A LAN era num shopping de Aracaju, com público circulando e um dia só pra rodar três jogos diferentes. O cliente ainda queria highlights publicados na mesma semana — o que significava captar, operar e editar tudo ao mesmo tempo.",
      },
      solution: {
        heading: "Palco único, equipes em paralelo",
        body:
          "Montamos o palco pra rodar as três modalidades em sequência, com câmeras dedicadas ao público e ao gameplay. A direção técnica ficou on-site decidindo ao vivo, e a equipe de audiovisual já começou a editar na mesma noite.",
      },
      result: {
        heading: "32 equipes no palco, highlights em 5 dias",
        body:
          "Fechamos as três finais no horário e entregamos os highlights na semana seguinte. O shopping sequer abriu reclamação de logística — o que, pra um evento desse porte num espaço público, é sinal de que a operação passou lisa.",
      },
    },
    gallery: [
      {
        src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1955-heic.webp",
        alt: "Vista geral da LAN Sergipe Gamer montada dentro do shopping.",
      },
      {
        src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1984-heic.webp",
        alt: "Campeão individual sorrindo e apontando pro troféu.",
      },
      {
        src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1987-heic.webp",
        alt: "Time vencedor posando com troféus ao final do evento.",
      },
      {
        src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1988-heic.webp",
        alt: "Cerimônia de premiação no palco da LAN Sergipe Gamer.",
      },
      {
        src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1990-heic.webp",
        alt: "Público acompanhando a final de uma das modalidades.",
      },
      {
        src: "/eventos-web/2025-08-lan-sergipe-gamer/img-2014-heic.webp",
        alt: "Bastidor da operação durante a LAN Sergipe Gamer.",
      },
    ],
    scopeDetail: [
      {
        title: "Evento presencial",
        bullets: [
          "Coordenação logística com o shopping e times convidados",
          "Gestão de palco pras três modalidades no mesmo dia",
          "Arbitragem on-site com protocolo de disputa definido",
        ],
      },
      {
        title: "Broadcast",
        bullets: [
          "Direção técnica ao vivo com foco duplo: público e gameplay",
          "Transmissão multiplataforma direto do palco",
          "Comentários e narração cobrindo as três modalidades",
        ],
      },
      {
        title: "Audiovisual",
        bullets: [
          "Captação de cobertura em paralelo com broadcast",
          "Pipeline de edição expressa configurado pré-evento",
          "Highlights e best-of entregues em 5 dias corridos",
        ],
      },
    ],
  },
  {
    code: "03",
    accent: "red",
    slug: "arretados-invitational",
    client: "Arretados",
    title: "Invitational",
    yearLabel: "2025 · Julho",
    contextTags: ["Warzone", "Online"],
    scope: ["Liga invitational", "Automação", "Broadcast"],
    metrics: [
      { value: "16", label: "times convidados" },
      { value: "30", label: "partidas operadas" },
      { value: "0", label: "ferramentas terceiras" },
    ],
    summary:
      "Torneio fechado de Warzone com 16 times, rodado 100% na nossa stack. Era a forma de mostrar a automação de partidas funcionando de verdade antes de chamar publisher pra conversa.",
    media: {
      type: "photo",
      src: "/eventos-web/2025-07-arretados-invitational/img-1504-heic.webp",
      alt: "Operação do Arretados Invitational",
    },
    narrative: {
      problem: {
        heading: "A stack tava pronta, faltava alguém usar",
        body:
          "A gente já tinha construído o software de torneio e o painel de árbitros, mas publisher e marca só contrata depois de ver funcionando. E ver slide não conta — precisava de um evento real rodando nela, de ponta a ponta.",
      },
      solution: {
        heading: "Torneio próprio, tudo na casa",
        body:
          "Convidamos 16 times pra um Warzone em double elimination, operado no nosso software sem recorrer a plataforma terceirizada. Árbitros treinados no painel interno, overlays puxando dado direto do backend.",
      },
      result: {
        heading: "Rodou sem a gente apertar botão",
        body:
          "Os 16 times jogaram sem intervenção manual nas partidas — o avanço de chave aconteceu sozinho. A mesma stack testada nesse Invitational é a que hoje roda a liga mensal da Login Arena.",
      },
    },
    gallery: [
      {
        src: "/eventos-web/2025-07-arretados-invitational/img-1505-heic.webp",
        alt: "Operação ao vivo do Arretados Invitational.",
      },
      {
        src: "/eventos-web/2025-07-arretados-invitational/img-1506-heic.webp",
        alt: "Broadcast rodando durante o Arretados Invitational.",
      },
      {
        src: "/eventos-web/2025-07-arretados-invitational/img-1510-heic.webp",
        alt: "Bastidor da operação do Arretados Invitational.",
      },
      {
        src: "/eventos-web/2025-07-arretados-invitational/img-1511-heic.webp",
        alt: "Frame do Arretados Invitational em andamento.",
      },
      {
        src: "/eventos-web/2025-07-arretados-invitational/img-1512-heic.webp",
        alt: "Equipe operando o Arretados Invitational.",
      },
    ],
    scopeDetail: [
      {
        title: "Liga invitational",
        bullets: [
          "16 times convidados selecionados pelo scouting interno",
          "Formato double elimination com chaveamento transparente",
          "Regulamento versionado e comunicado pré-evento",
        ],
      },
      {
        title: "Automação",
        bullets: [
          "Software próprio coordenando lobby, resultado e avanço de chave",
          "Painel de árbitros com histórico versionado de decisões",
          "Integração de telemetria com overlays no broadcast",
        ],
      },
      {
        title: "Broadcast",
        bullets: [
          "Transmissão nativa com narração contratada",
          "Overlays dinâmicos lidos direto do backend da liga",
          "Gravação completa arquivada pra consulta de casos",
        ],
      },
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}

export function getNextCase(slug: string): CaseStudy | undefined {
  const index = CASES.findIndex((c) => c.slug === slug);
  if (index === -1) return undefined;
  return CASES[(index + 1) % CASES.length];
}

export const CASES_AGGREGATE_STATS: { value: string; label: string }[] = [
  { value: "3", label: "eventos operados" },
  { value: "72", label: "equipes atendidas" },
  { value: "90+", label: "partidas no ar" },
  { value: "4", label: "modalidades cobertas" },
];
