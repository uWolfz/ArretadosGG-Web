import type { TournamentGame } from "./tournaments";

export type CasterRole = "play-by-play" | "analyst" | "host";

export type CasterStatus = "approved";

export type CasterLanguage = "pt-BR" | "en-US" | "es-ES";

export type CasterStats = {
  tournamentsCasted: number;
  hoursOnAir: number;
  peakViewers: number;
  averageViewers: number;
  yearsActive: number;
};

export type CasterEndorsement = {
  playerTag: string;
  quote: string;
};

export type CasterReview = {
  id: string;
  /** tag de quem deixou o comentário (player ou caster) */
  authorTag: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
};

export type CasterRecentClip = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  tournamentSlug?: string;
  /** Duração em "12:34" */
  duration: string;
  views: number;
  publishedAt: string;
};

export type CasterSpecialty = {
  game: TournamentGame;
  label: string;
};

export type Caster = {
  playerTag: string;
  bio: string;
  handle: string;
  /** Handle público pra exibição (twitch.tv/foo, @foo). Distinto do URL. */
  photo?: string;
  role: CasterRole;
  approvedAt: string;
  status: CasterStatus;
  /** Links de portfolio mostrados no perfil público. */
  portfolioLinks: string[];
  /** Sample work (VOD/clipe) usado quando a aplicação foi aprovada. */
  sampleWorkUrl: string;

  // === Perfil enriquecido ===
  /** Idiomas em que casteia. */
  languages: CasterLanguage[];
  /** Jogos/modos preferidos. Primeiro é o principal. */
  specialties: CasterSpecialty[];
  /** Métricas agregadas da carreira. */
  stats: CasterStats;
  /** Disponível para novas produções? Exibido no hero. */
  availableForHire: boolean;
  /** Valor de referência pra contato comercial, em BRL. Opcional. */
  dayRateBrl?: number;
  /** Recomendações de players famosos. Ordenadas por relevância. */
  endorsements: CasterEndorsement[];
  /** Comentários públicos de players/casters. Ordenados mais recente primeiro. */
  reviews: CasterReview[];
  /** Clips/VODs recentes destacados. */
  recentClips: CasterRecentClip[];
};

const ARRETADOS_CLIP_THUMB_POOL = [
  "/eventos-web/2025-07-arretados-invitational/img-1504-poster.webp",
  "/eventos-web/2025-07-arretados-invitational/img-1505-poster.webp",
  "/eventos-web/2025-08-lan-sergipe-gamer/hlxb0300-poster.webp",
  "/eventos-web/2025-08-lan-sergipe-gamer/glkd6817-poster.webp",
];

export const CASTERS: Caster[] = [
  {
    playerTag: "rafacangaco",
    bio: "Play-by-play do Nordeste há 6 anos. Narração de Call of Duty é minha casa — comecei cobrindo arenas locais e hoje transmito os maiores torneios da Arretados. Minha energia é o gás dos momentos decisivos.",
    handle: "twitch.tv/rafacangaco",
    photo: "/eventos-web/2025-07-arretados-invitational/img-1510-heic.webp",
    role: "play-by-play",
    approvedAt: "2024-06-10T00:00:00Z",
    status: "approved",
    portfolioLinks: [
      "https://twitch.tv/rafacangaco",
      "https://youtube.com/@rafacangaco",
    ],
    sampleWorkUrl: "https://youtube.com/watch?v=sample-rafacangaco",
    languages: ["pt-BR", "en-US"],
    specialties: [
      { game: "cod", label: "Call of Duty · Hardpoint" },
      { game: "cod", label: "Warzone BR" },
    ],
    stats: {
      tournamentsCasted: 42,
      hoursOnAir: 680,
      peakViewers: 42000,
      averageViewers: 3800,
      yearsActive: 6,
    },
    availableForHire: true,
    dayRateBrl: 2500,
    endorsements: [
      {
        playerTag: "yancastro",
        quote:
          "Quando o Rafa narra, tu sente o jogo com o corpo. Faz parecer que cada kill é uma final.",
      },
      {
        playerTag: "bielsoberano",
        quote:
          "Melhor play-by-play da região, ponto. Trouxe energia pra final contra nós.",
      },
    ],
    reviews: [
      {
        id: "rev-rafa-1",
        authorTag: "yancastro",
        rating: 5,
        comment:
          "Narrou o bicampeonato da Fúria com uma clareza absurda — conseguiu trazer contexto tático sem perder o ritmo.",
        createdAt: "2026-03-22T00:00:00Z",
      },
      {
        id: "rev-rafa-2",
        authorTag: "digaorc",
        rating: 5,
        comment:
          "Energia do início ao fim, nunca apaga. Faz a torcida sentir que tá em arena presencial.",
        createdAt: "2026-02-10T00:00:00Z",
      },
      {
        id: "rev-rafa-3",
        authorTag: "victorse",
        rating: 4,
        comment:
          "Transmissão impecável. Poderia dar mais espaço pra coanálise em alguns mapas, mas é nota 10.",
        createdAt: "2025-12-15T00:00:00Z",
      },
    ],
    recentClips: [
      {
        id: "clip-rafa-1",
        title: "Final Arretados Invitational · virada épica no mapa 5",
        url: "https://youtube.com/watch?v=clip-rafa-1",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[0],
        tournamentSlug: "arretados-invitational-cod-2025",
        duration: "4:18",
        views: 128500,
        publishedAt: "2025-11-18T00:00:00Z",
      },
      {
        id: "clip-rafa-2",
        title: "Ace no Standoff · fase de grupos",
        url: "https://youtube.com/watch?v=clip-rafa-2",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[1],
        tournamentSlug: "arretados-invitational-cod",
        duration: "1:42",
        views: 45200,
        publishedAt: "2026-04-02T00:00:00Z",
      },
      {
        id: "clip-rafa-3",
        title: "Aliança Warzone · top 1 solo cast",
        url: "https://youtube.com/watch?v=clip-rafa-3",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[2],
        tournamentSlug: "alianca-warzone-dupla",
        duration: "3:05",
        views: 22800,
        publishedAt: "2026-03-30T00:00:00Z",
      },
    ],
  },
  {
    playerTag: "dutavares",
    bio: "Analista tática com passagem por produções de CS e Valorant. Transito entre taxonomia competitiva e leitura de comportamento — meu foco é traduzir o porquê por trás das jogadas.",
    handle: "@dutavares",
    photo: "/eventos-web/2025-07-arretados-invitational/img-1511-heic.webp",
    role: "analyst",
    approvedAt: "2024-08-22T00:00:00Z",
    status: "approved",
    portfolioLinks: [
      "https://x.com/dutavares",
      "https://twitch.tv/dutavares",
    ],
    sampleWorkUrl: "https://youtube.com/watch?v=sample-dutavares",
    languages: ["pt-BR", "en-US"],
    specialties: [
      { game: "cod", label: "Call of Duty · Search & Destroy" },
      { game: "valorant", label: "Valorant · táticas de mapa" },
    ],
    stats: {
      tournamentsCasted: 28,
      hoursOnAir: 420,
      peakViewers: 31000,
      averageViewers: 2100,
      yearsActive: 4,
    },
    availableForHire: true,
    dayRateBrl: 1800,
    endorsements: [
      {
        playerTag: "yancastro",
        quote:
          "Dú enxerga jogada 3 rounds antes de acontecer. Análise cirúrgica.",
      },
    ],
    reviews: [
      {
        id: "rev-du-1",
        authorTag: "kaikeoc",
        rating: 5,
        comment:
          "Melhor analista pra S&D do Brasil. Consegue quebrar uma jogada em 30 segundos de jeito que qualquer um entende.",
        createdAt: "2026-04-01T00:00:00Z",
      },
      {
        id: "rev-du-2",
        authorTag: "victorse",
        rating: 5,
        comment:
          "Ouvir o Dú é aula. Mesmo pra quem joga competitivo há anos, sempre tem um detalhe novo.",
        createdAt: "2026-01-05T00:00:00Z",
      },
      {
        id: "rev-du-3",
        authorTag: "marcosbr",
        rating: 4,
        comment:
          "Sólido e didático. Bem casado com qualquer play-by-play.",
        createdAt: "2025-11-20T00:00:00Z",
      },
    ],
    recentClips: [
      {
        id: "clip-du-1",
        title: "Análise pós-final · setup defensivo do Cangaço",
        url: "https://youtube.com/watch?v=clip-du-1",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[1],
        tournamentSlug: "arretados-invitational-cod",
        duration: "6:22",
        views: 68400,
        publishedAt: "2026-04-10T00:00:00Z",
      },
      {
        id: "clip-du-2",
        title: "Breakdown · pick/ban LAN Sergipe",
        url: "https://youtube.com/watch?v=clip-du-2",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[3],
        tournamentSlug: "lan-sergipe-valorant",
        duration: "8:45",
        views: 31200,
        publishedAt: "2026-04-17T00:00:00Z",
      },
    ],
  },
  {
    playerTag: "marcinhobr",
    bio: "Análise técnica focada em Call of Duty competitivo. Ex-jogador da Série A, migrei pra narração em 2023 depois de me aposentar do cenário ativo. Dados e leitura de mapa são meu diferencial.",
    handle: "twitch.tv/marcinhobr",
    photo: "/eventos-web/2025-07-arretados-invitational/img-1512-heic.webp",
    role: "analyst",
    approvedAt: "2024-09-15T00:00:00Z",
    status: "approved",
    portfolioLinks: [
      "https://twitch.tv/marcinhobr",
      "https://youtube.com/@marcinhobr",
    ],
    sampleWorkUrl: "https://youtube.com/watch?v=sample-marcinhobr",
    languages: ["pt-BR"],
    specialties: [
      { game: "cod", label: "Call of Duty · Hardpoint" },
      { game: "cod", label: "Séries BR · CoDM" },
    ],
    stats: {
      tournamentsCasted: 18,
      hoursOnAir: 240,
      peakViewers: 19500,
      averageViewers: 1600,
      yearsActive: 3,
    },
    availableForHire: false,
    endorsements: [
      {
        playerTag: "bielsoberano",
        quote:
          "Marcinho foi meu capitão em 2022. Se tem alguém que entende Hardpoint é ele.",
      },
    ],
    reviews: [
      {
        id: "rev-marc-1",
        authorTag: "bielsoberano",
        rating: 5,
        comment:
          "Vivência de quem jogou. A leitura de mapa dele é de outro nível.",
        createdAt: "2026-02-28T00:00:00Z",
      },
      {
        id: "rev-marc-2",
        authorTag: "digaorc",
        rating: 4,
        comment:
          "Sólido, direto ao ponto. Casa bem com narradores mais energéticos.",
        createdAt: "2025-12-20T00:00:00Z",
      },
    ],
    recentClips: [
      {
        id: "clip-marc-1",
        title: "Breakdown tático · playoff Série A",
        url: "https://youtube.com/watch?v=clip-marc-1",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[0],
        tournamentSlug: "serie-a-codm-regional",
        duration: "7:11",
        views: 24800,
        publishedAt: "2026-04-03T00:00:00Z",
      },
    ],
  },
  {
    playerTag: "pamnordeste",
    bio: "Host oficial da Arretados em eventos presenciais. Conduzo mesas, entrevistas e cerimônias — minha vibe é aproximar o público dos times num tom nordestino e descontraído.",
    handle: "twitch.tv/pamnordeste",
    photo: "/eventos-web/2025-08-lan-sergipe-gamer/img-1988-heic.webp",
    role: "host",
    approvedAt: "2024-11-02T00:00:00Z",
    status: "approved",
    portfolioLinks: [
      "https://twitch.tv/pamnordeste",
      "https://instagram.com/pamnordeste",
    ],
    sampleWorkUrl: "https://youtube.com/watch?v=sample-pamnordeste",
    languages: ["pt-BR", "es-ES"],
    specialties: [
      { game: "valorant", label: "Host · Valorant LAN" },
      { game: "cod", label: "Host · CoD Invitational" },
    ],
    stats: {
      tournamentsCasted: 35,
      hoursOnAir: 510,
      peakViewers: 38500,
      averageViewers: 2700,
      yearsActive: 5,
    },
    availableForHire: true,
    dayRateBrl: 2200,
    endorsements: [
      {
        playerTag: "victorse",
        quote:
          "Pam traz uma energia única pros eventos presenciais. Quando ela tá no palco, o público grita.",
      },
      {
        playerTag: "yancastro",
        quote:
          "Entrevista de troféu da Pam é memorável. Faz o jogador abrir o jogo sem perceber.",
      },
    ],
    reviews: [
      {
        id: "rev-pam-1",
        authorTag: "victorse",
        rating: 5,
        comment:
          "Pam dá vida à transmissão. Entrevistas na bancada são sempre o melhor momento do dia.",
        createdAt: "2026-04-05T00:00:00Z",
      },
      {
        id: "rev-pam-2",
        authorTag: "yancastro",
        rating: 5,
        comment:
          "Puxa conversa boa com todo mundo, inclusive quem tá quieto. Indispensável em LAN.",
        createdAt: "2026-03-15T00:00:00Z",
      },
      {
        id: "rev-pam-3",
        authorTag: "kaikeoc",
        rating: 4,
        comment:
          "Profissional desde a passagem de som até o encerramento. Sempre.",
        createdAt: "2026-01-20T00:00:00Z",
      },
    ],
    recentClips: [
      {
        id: "clip-pam-1",
        title: "Entrevista pós-final · Fúria levanta o troféu",
        url: "https://youtube.com/watch?v=clip-pam-1",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[0],
        tournamentSlug: "arretados-invitational-cod-2025",
        duration: "5:48",
        views: 87200,
        publishedAt: "2025-11-18T00:00:00Z",
      },
      {
        id: "clip-pam-2",
        title: "Cerimônia de abertura · LAN Sergipe",
        url: "https://youtube.com/watch?v=clip-pam-2",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[2],
        tournamentSlug: "lan-sergipe-valorant",
        duration: "3:12",
        views: 52400,
        publishedAt: "2026-04-17T00:00:00Z",
      },
      {
        id: "clip-pam-3",
        title: "Meet & greet · fãs e jogadores",
        url: "https://youtube.com/watch?v=clip-pam-3",
        thumbnail: ARRETADOS_CLIP_THUMB_POOL[3],
        duration: "2:38",
        views: 18600,
        publishedAt: "2026-03-30T00:00:00Z",
      },
    ],
  },
  {
    playerTag: "marcosbr",
    bio: "Migrei do competitivo CoDM pro booth de narração em 2026. Conheço o jogo por dentro e trago leitura tática com um toque de quem já teve o controle na mão.",
    handle: "twitch.tv/marcosbr",
    photo: undefined,
    role: "analyst",
    approvedAt: "2026-02-15T00:00:00Z",
    status: "approved",
    portfolioLinks: [
      "https://twitch.tv/marcosbr",
    ],
    sampleWorkUrl: "https://youtube.com/watch?v=sample-marcosbr",
    languages: ["pt-BR"],
    specialties: [{ game: "cod", label: "Call of Duty · Acesso/Série B" }],
    stats: {
      tournamentsCasted: 4,
      hoursOnAir: 42,
      peakViewers: 6800,
      averageViewers: 780,
      yearsActive: 1,
    },
    availableForHire: true,
    dayRateBrl: 900,
    endorsements: [],
    reviews: [
      {
        id: "rev-marcos-1",
        authorTag: "digaorc",
        rating: 4,
        comment:
          "Promessa real. Ainda afina a entonação mas a leitura de jogo já é excelente.",
        createdAt: "2026-04-10T00:00:00Z",
      },
    ],
    recentClips: [],
  },
];

const CASTERS_BY_PLAYER_TAG: ReadonlyMap<string, Caster> = new Map(
  CASTERS.map((c) => [c.playerTag, c]),
);

const CASTERS_BY_HANDLE: ReadonlyMap<string, Caster> = new Map(
  CASTERS.map((c) => [c.handle, c]),
);

export function findCasterByPlayerTag(playerTag: string): Caster | undefined {
  return CASTERS_BY_PLAYER_TAG.get(playerTag);
}

export function findCasterByHandle(handle: string): Caster | undefined {
  return CASTERS_BY_HANDLE.get(handle);
}

export function getCastersByRole(role: CasterRole): Caster[] {
  return CASTERS.filter((c) => c.role === role);
}

export function formatCasterRoleLabel(role: CasterRole): string {
  switch (role) {
    case "play-by-play":
      return "Play-by-play";
    case "analyst":
      return "Análise";
    case "host":
      return "Host";
  }
}

export function formatCasterRoleShort(role: CasterRole): string {
  switch (role) {
    case "play-by-play":
      return "PBP";
    case "analyst":
      return "AN";
    case "host":
      return "HOST";
  }
}

export function formatCasterLanguageLabel(lang: CasterLanguage): string {
  switch (lang) {
    case "pt-BR":
      return "Português (BR)";
    case "en-US":
      return "Inglês";
    case "es-ES":
      return "Espanhol";
  }
}

export function formatCasterPeakViewers(peak: number): string {
  if (peak >= 1000) return `${(peak / 1000).toFixed(peak >= 10000 ? 0 : 1)}K`;
  return peak.toString();
}

export function formatCasterDayRateBrl(day: number): string {
  return day.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function computeCasterAverageRating(caster: Caster): number | null {
  if (caster.reviews.length === 0) return null;
  const sum = caster.reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / caster.reviews.length;
}
