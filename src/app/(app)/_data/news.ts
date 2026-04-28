export type NewsCategory = "recap" | "announcement" | "league" | "opinion";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string; // ISO
  thumbnail: string;
  author: string;
  readTimeMin: number;
};

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  recap: "Recap",
  announcement: "Anúncio",
  league: "Liga",
  opinion: "Opinião",
};

export const NEWS: NewsArticle[] = [
  {
    slug: "furia-vermelha-vence-invitational-2025",
    title: "Fúria Vermelha vence o Arretados Invitational 2025 em série épica",
    excerpt:
      "Em uma série de sete partidas, a Fúria Vermelha superou o Cangaço e conquistou o título invicto do Arretados Invitational de Call of Duty.",
    category: "recap",
    publishedAt: "2026-04-14T10:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-07-arretados-invitational/img-1504-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 5,
  },
  {
    slug: "serie-a-codm-temporada-2026",
    title: "Série A CoDM anuncia calendário completo da Temporada 2026",
    excerpt:
      "Com 16 times confirmados e prize pool recorde, a Série A volta em maio com novo formato de grupos e playoffs.",
    category: "announcement",
    publishedAt: "2026-04-10T14:30:00-03:00",
    thumbnail:
      "/eventos-web/2025-07-arretados-invitational/img-1505-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 3,
  },
  {
    slug: "lan-sergipe-recorde-publico",
    title: "LAN Sergipe Gamer bate recorde de público e peak de audiência",
    excerpt:
      "Edição 2025 reuniu mais de 4 mil presentes e atingiu 85 mil espectadores simultâneos na Twitch.",
    category: "recap",
    publishedAt: "2026-04-05T16:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-08-lan-sergipe-gamer/glkd6817-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 4,
  },
  {
    slug: "parceria-login-arena",
    title: "Arretados fecha parceria estratégica com Login Arena",
    excerpt:
      "Colaboração vai trazer circuitos de LoL e Valorant integrados ao calendário Arretados a partir de 2026.",
    category: "announcement",
    publishedAt: "2026-04-01T09:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-08-lan-sergipe-gamer/hlxb0300-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 2,
  },
  {
    slug: "login-arena-lol-s2-fogueira-campea",
    title: "Login Arena LoL S2: Fogueira BR sagra-se campeã em virada histórica",
    excerpt:
      "Após perder os dois primeiros mapas, Fogueira BR venceu três seguidos e levou o título da Season 2.",
    category: "recap",
    publishedAt: "2026-03-30T22:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-08-lan-sergipe-gamer/hlxb0300-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 6,
  },
  {
    slug: "cangaco-domina-grupos-invitational",
    title: "Cangaço domina fase de grupos do Invitational com 100% de aproveitamento",
    excerpt:
      "Time de Aracaju liderou o grupo B sem sofrer derrota e chega como favorito às quartas de final.",
    category: "recap",
    publishedAt: "2026-04-15T18:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-07-arretados-invitational/img-1504-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 3,
  },
  {
    slug: "guia-invitational-2026",
    title: "Como assistir: Guia completo do Arretados Invitational 2026",
    excerpt:
      "Chaveamento, horários, plataformas de stream e onde acompanhar todos os times ao vivo.",
    category: "league",
    publishedAt: "2026-04-12T11:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-07-arretados-invitational/img-1505-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 2,
  },
  {
    slug: "arretados-store-jerseys-oficiais",
    title: "Arretados Store lança jerseys oficiais dos times pro",
    excerpt:
      "Coleção limitada com os uniformes de Fúria, Cangaço e Fogueira já disponível em pré-venda.",
    category: "announcement",
    publishedAt: "2026-03-25T10:00:00-03:00",
    thumbnail:
      "/eventos-web/2025-08-lan-sergipe-gamer/glkd6817-poster.webp",
    author: "Equipe Arretados",
    readTimeMin: 2,
  },
];
