import type { TournamentGame } from "./tournaments";

export type TeamTier = "pro" | "contender" | "amador";

export type TeamRosterRole = "player" | "captain";

export type TeamRosterEntry = {
  playerTag: string;
  role: TeamRosterRole;
  joinedAt: string;
};

export type Team = {
  slug: string;
  name: string;
  tag: string; // sigla exibida em placar ("FUR", "CNG", ...)
  logo: string;
  primaryGame: TournamentGame;
  tier: TeamTier;
  membersCount: number;
  wins: number;
  losses: number;
  trophies: number;
  /** cidade/estado base */
  location: string;
  /**
   * Torneios que o time disputa ou disputou.
   * Referência por `tournament.name` — match exato.
   * Inclui live/open/upcoming (ativos) e finished (histórico).
   */
  tournaments: string[];
  /**
   * Roster atual do time — entries de players (com role 'player' | 'captain').
   * Fonte de verdade pro relacionamento time↔players. Pode estar vazio pra
   * times sem roster preenchido ainda no seed.
   */
  roster: TeamRosterEntry[];
  /**
   * Lookup rápido do tag do capitão, derivado do roster.
   * `null` quando roster vazio ou sem entry com role 'captain'.
   */
  captainTag: string | null;
};

const ARRETADOS_LOGO = "/Logos - Institucional/Logo Arretados.png";

export const TEAMS: Team[] = [
  {
    slug: "furia-vermelha",
    name: "Fúria Vermelha",
    tag: "FUR",
    logo: ARRETADOS_LOGO,
    primaryGame: "cod",
    tier: "pro",
    membersCount: 5,
    wins: 42,
    losses: 12,
    trophies: 4,
    location: "Recife · PE",
    tournaments: [
      "Arretados Invitational · CoD",
      "Série A · CoDM Regional",
      "Arretados Invitational · CoD 2025",
    ],
    roster: [
      { playerTag: "yancastro", role: "captain", joinedAt: "2024-03-12" },
      { playerTag: "kaikeoc", role: "player", joinedAt: "2026-01-12" },
    ],
    captainTag: "yancastro",
  },
  {
    slug: "cangaco-esports",
    name: "Cangaço Esports",
    tag: "CNG",
    logo: ARRETADOS_LOGO,
    primaryGame: "cs2",
    tier: "pro",
    membersCount: 5,
    wins: 38,
    losses: 15,
    trophies: 3,
    location: "Aracaju · SE",
    tournaments: [
      "Arretados Invitational · CoD",
      "LAN Sergipe Gamer · CS2 2025",
      "Arretados Invitational · CoD 2025",
      "Login Arena · LoL Season 2",
    ],
    roster: [
      { playerTag: "bielsoberano", role: "captain", joinedAt: "2024-06-01" },
    ],
    captainTag: "bielsoberano",
  },
  {
    slug: "fogueira-br",
    name: "Fogueira BR",
    tag: "FOG",
    logo: ARRETADOS_LOGO,
    primaryGame: "lol",
    tier: "pro",
    membersCount: 5,
    wins: 35,
    losses: 18,
    trophies: 2,
    location: "Fortaleza · CE",
    tournaments: [
      "Login Arena · LoL Season 3",
      "Login Arena · LoL Season 2",
      "LAN Sergipe Gamer · Valorant",
    ],
    roster: [],
    captainTag: null,
  },
  {
    slug: "nordeste-gaming",
    name: "Nordeste Gaming",
    tag: "NDG",
    logo: ARRETADOS_LOGO,
    primaryGame: "valorant",
    tier: "contender",
    membersCount: 5,
    wins: 28,
    losses: 16,
    trophies: 1,
    location: "Salvador · BA",
    tournaments: [
      "LAN Sergipe Gamer · Valorant",
      "Série A · CoDM Regional",
    ],
    roster: [
      { playerTag: "victorse", role: "captain", joinedAt: "2024-05-18" },
    ],
    captainTag: "victorse",
  },
  {
    slug: "sertao-gaming",
    name: "Sertão Gaming",
    tag: "SRT",
    logo: ARRETADOS_LOGO,
    primaryGame: "valorant",
    tier: "contender",
    membersCount: 5,
    wins: 24,
    losses: 22,
    trophies: 0,
    location: "Campina Grande · PB",
    tournaments: [
      "LAN Sergipe Gamer · Valorant",
      "Login Arena · LoL Season 3",
    ],
    roster: [],
    captainTag: null,
  },
  {
    slug: "arena-pernambuco",
    name: "Arena Pernambuco",
    tag: "APC",
    logo: ARRETADOS_LOGO,
    primaryGame: "lol",
    tier: "contender",
    membersCount: 5,
    wins: 22,
    losses: 19,
    trophies: 1,
    location: "Olinda · PE",
    tournaments: [
      "Login Arena · LoL Season 3",
      "LAN Sergipe Gamer · Valorant",
    ],
    roster: [
      { playerTag: "luizpe", role: "player", joinedAt: "2026-03-02" },
    ],
    captainTag: null,
  },
  {
    slug: "capiba-esports",
    name: "Capiba eSports",
    tag: "CPB",
    logo: ARRETADOS_LOGO,
    primaryGame: "cod",
    tier: "contender",
    membersCount: 5,
    wins: 20,
    losses: 24,
    trophies: 0,
    location: "Recife · PE",
    tournaments: [
      "Arretados Invitational · CoD",
      "LAN Sergipe Gamer · Valorant",
      "Arretados Invitational · CoD 2025",
    ],
    roster: [
      { playerTag: "digaorc", role: "captain", joinedAt: "2024-11-05" },
    ],
    captainTag: "digaorc",
  },
  {
    slug: "litoral-gaming",
    name: "Litoral Gaming",
    tag: "LTG",
    logo: ARRETADOS_LOGO,
    primaryGame: "valorant",
    tier: "amador",
    membersCount: 5,
    wins: 14,
    losses: 18,
    trophies: 0,
    location: "João Pessoa · PB",
    tournaments: [
      "LAN Sergipe Gamer · Valorant",
      "Arretados Invitational · CoD 2025",
      "LAN Sergipe Gamer · CS2 2025",
    ],
    roster: [
      { playerTag: "novinhojp", role: "captain", joinedAt: "2026-04-10" },
    ],
    captainTag: "novinhojp",
  },
  {
    slug: "caruaru-force",
    name: "Caruaru Force",
    tag: "CRF",
    logo: ARRETADOS_LOGO,
    primaryGame: "cs2",
    tier: "amador",
    membersCount: 5,
    wins: 10,
    losses: 14,
    trophies: 0,
    location: "Caruaru · PE",
    tournaments: [
      "LAN Sergipe Gamer · CS2 2025",
      "Aliança Warzone · Dupla",
    ],
    roster: [],
    captainTag: null,
  },
  {
    slug: "maceio-tigers",
    name: "Maceió Tigers",
    tag: "MCT",
    logo: ARRETADOS_LOGO,
    primaryGame: "cod",
    tier: "amador",
    membersCount: 5,
    wins: 8,
    losses: 12,
    trophies: 0,
    location: "Maceió · AL",
    tournaments: [
      "Série B · CoDM Acesso",
      "Aliança Warzone · Dupla",
    ],
    roster: [],
    captainTag: null,
  },
];

const TEAMS_BY_SLUG: ReadonlyMap<string, Team> = new Map(
  TEAMS.map((t) => [t.slug, t]),
);

export function findTeamBySlug(slug: string): Team | undefined {
  return TEAMS_BY_SLUG.get(slug);
}

export function isPlayerInTeamRoster(team: Team, playerTag: string): boolean {
  return team.roster.some((entry) => entry.playerTag === playerTag);
}

export function isPlayerCaptainOfTeam(team: Team, playerTag: string): boolean {
  return team.captainTag === playerTag;
}

export function getTeamsCaptainedByPlayerTag(playerTag: string): Team[] {
  return TEAMS.filter((team) => team.captainTag === playerTag);
}

export function computeTeamWinRatePct(team: Team): number {
  const total = team.wins + team.losses;
  if (total === 0) return 0;
  return Math.round((team.wins / total) * 100);
}
