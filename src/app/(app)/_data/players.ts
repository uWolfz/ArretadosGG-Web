import type { TournamentGame } from "./tournaments";

export type TournamentPlacement =
  | "Campeão"
  | "Vice"
  | "Top 4"
  | "Top 8"
  | "Grupo"
  | "Fase eliminatória";

export const PLACEMENT_CHAMPION: TournamentPlacement = "Campeão";

export type PlayerMatchMap = string;
export type PlayerMatchMode = string;

export type PlayerRole = "player" | "caster" | "captain";

export type Player = {
  tag: string;
  nick: string;
  clanTag: string | null;
  avatar: string;
  game: TournamentGame;
  location: string;
  joinedAt: string;
  currentTeam: string | null;
  pastTeams: Array<{ teamSlug: string; from: string; to: string }>;
  roles: PlayerRole[];

  stats: {
    matches: number;
    wins: number;
    kd: number;
    winRate: number;
    byMap: Array<{
      map: PlayerMatchMap;
      matches: number;
      winRate: number;
      kd: number;
    }>;
    byMode: Array<{
      mode: PlayerMatchMode;
      matches: number;
      winRate: number;
      kd?: number;
    }>;
  };

  tournamentsPlayed: Array<{
    tournamentSlug: string;
    placement: TournamentPlacement;
    prize?: string;
  }>;

  achievements: Array<{ key: string; label: string; earnedAt: string }>;

  verified: { phone: boolean; cpf: boolean; gameId: boolean };
  fraudTag: { label: string; since: string } | null;
  ranking: { position: number; total: number };
};

const PLACEHOLDER_AVATAR = "/Logos - Institucional/Perfil 3.png";

export const PLAYERS: Player[] = [
  {
    tag: "yancastro",
    nick: "YanCastro",
    clanTag: "EVOX",
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Recife · PE",
    joinedAt: "2024-03-12T00:00:00Z",
    currentTeam: "furia-vermelha",
    pastTeams: [
      { teamSlug: "capiba-esports", from: "2023-05-01", to: "2024-02-20" },
    ],
    roles: ["player", "captain"],
    stats: {
      matches: 312,
      wins: 214,
      kd: 2.41,
      winRate: 0.686,
      byMap: [
        { map: "Standoff", matches: 84, winRate: 0.71, kd: 2.55 },
        { map: "Crash", matches: 62, winRate: 0.69, kd: 2.3 },
        { map: "Summit", matches: 58, winRate: 0.67, kd: 2.48 },
        { map: "Raid", matches: 54, winRate: 0.65, kd: 2.22 },
        { map: "Firing Range", matches: 30, winRate: 0.6, kd: 2.1 },
        { map: "Crossfire", matches: 24, winRate: 0.58, kd: 2.05 },
      ],
      byMode: [
        { mode: "Hardpoint", matches: 140, winRate: 0.72, kd: 2.48 },
        { mode: "Search & Destroy", matches: 98, winRate: 0.66, kd: 2.38 },
        { mode: "Domination", matches: 74, winRate: 0.64, kd: 2.28 },
      ],
    },
    tournamentsPlayed: [
      {
        tournamentSlug: "arretados-invitational-cod",
        placement: "Campeão",
        prize: "R$ 15.000",
      },
      { tournamentSlug: "serie-a-codm-regional", placement: "Top 4" },
    ],
    achievements: [
      {
        key: "champion-arretados-2025",
        label: "Campeão Arretados Invitational · CoD 2025",
        earnedAt: "2025-11-18",
      },
      {
        key: "mvp-serie-a",
        label: "MVP · Série A · CoDM Regional",
        earnedAt: "2025-07-05",
      },
      {
        key: "streak-10",
        label: "10 vitórias consecutivas",
        earnedAt: "2025-05-22",
      },
    ],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 12, total: 4820 },
  },
  {
    tag: "bielsoberano",
    nick: "Biel.Soberano",
    clanTag: "CNG",
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Aracaju · SE",
    joinedAt: "2024-06-01T00:00:00Z",
    currentTeam: "cangaco-esports",
    pastTeams: [],
    roles: ["player", "captain"],
    stats: {
      matches: 220,
      wins: 138,
      kd: 1.92,
      winRate: 0.627,
      byMap: [
        { map: "Standoff", matches: 60, winRate: 0.65, kd: 2.0 },
        { map: "Crash", matches: 48, winRate: 0.62, kd: 1.88 },
        { map: "Summit", matches: 52, winRate: 0.6, kd: 1.82 },
        { map: "Raid", matches: 40, winRate: 0.6, kd: 1.9 },
        { map: "Firing Range", matches: 20, winRate: 0.55, kd: 1.7 },
      ],
      byMode: [
        { mode: "Hardpoint", matches: 100, winRate: 0.64, kd: 1.98 },
        { mode: "Search & Destroy", matches: 80, winRate: 0.61, kd: 1.9 },
        { mode: "Domination", matches: 40, winRate: 0.6, kd: 1.8 },
      ],
    },
    tournamentsPlayed: [
      {
        tournamentSlug: "arretados-invitational-cod",
        placement: "Vice",
        prize: "R$ 7.500",
      },
    ],
    achievements: [
      {
        key: "runner-up-arretados-2025",
        label: "Vice-campeão Arretados Invitational · CoD 2025",
        earnedAt: "2025-11-18",
      },
    ],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 47, total: 4820 },
  },
  {
    tag: "kaikeoc",
    nick: "KaikeOC",
    clanTag: "FUR",
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Recife · PE",
    joinedAt: "2024-10-15T00:00:00Z",
    currentTeam: "furia-vermelha",
    pastTeams: [
      { teamSlug: "capiba-esports", from: "2024-10-15", to: "2026-01-12" },
    ],
    roles: ["player"],
    stats: {
      matches: 130,
      wins: 68,
      kd: 1.45,
      winRate: 0.523,
      byMap: [
        { map: "Standoff", matches: 40, winRate: 0.55, kd: 1.52 },
        { map: "Crash", matches: 30, winRate: 0.5, kd: 1.4 },
        { map: "Summit", matches: 28, winRate: 0.52, kd: 1.45 },
        { map: "Raid", matches: 20, winRate: 0.48, kd: 1.35 },
        { map: "Firing Range", matches: 12, winRate: 0.5, kd: 1.4 },
      ],
      byMode: [
        { mode: "Hardpoint", matches: 60, winRate: 0.55, kd: 1.5 },
        { mode: "Search & Destroy", matches: 40, winRate: 0.52, kd: 1.45 },
        { mode: "Domination", matches: 30, winRate: 0.48, kd: 1.35 },
      ],
    },
    tournamentsPlayed: [
      { tournamentSlug: "serie-a-codm-regional", placement: "Grupo" },
    ],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 342, total: 4820 },
  },
  {
    tag: "marcosbr",
    nick: "MarcosBR",
    clanTag: null,
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Salvador · BA",
    joinedAt: "2024-08-22T00:00:00Z",
    currentTeam: null,
    pastTeams: [
      { teamSlug: "nordeste-gaming", from: "2024-08-22", to: "2026-02-28" },
    ],
    roles: ["player", "caster"],
    stats: {
      matches: 175,
      wins: 92,
      kd: 1.72,
      winRate: 0.526,
      byMap: [
        { map: "Standoff", matches: 50, winRate: 0.56, kd: 1.78 },
        { map: "Crash", matches: 42, winRate: 0.52, kd: 1.68 },
        { map: "Summit", matches: 38, winRate: 0.5, kd: 1.7 },
        { map: "Raid", matches: 30, winRate: 0.53, kd: 1.72 },
        { map: "Firing Range", matches: 15, winRate: 0.5, kd: 1.6 },
      ],
      byMode: [
        { mode: "Hardpoint", matches: 85, winRate: 0.55, kd: 1.75 },
        { mode: "Search & Destroy", matches: 55, winRate: 0.51, kd: 1.7 },
        { mode: "Domination", matches: 35, winRate: 0.5, kd: 1.65 },
      ],
    },
    tournamentsPlayed: [
      { tournamentSlug: "serie-b-codm-acesso", placement: "Top 4" },
    ],
    achievements: [
      {
        key: "top-4-serie-b",
        label: "Top 4 · Série B · CoDM Acesso",
        earnedAt: "2025-09-14",
      },
    ],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 184, total: 4820 },
  },
  {
    tag: "luizpe",
    nick: "LuizPE",
    clanTag: "APC",
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Olinda · PE",
    joinedAt: "2026-03-02T00:00:00Z",
    currentTeam: "arena-pernambuco",
    pastTeams: [],
    roles: ["player"],
    stats: {
      matches: 5,
      wins: 2,
      kd: 1.1,
      winRate: 0.4,
      byMap: [
        { map: "Standoff", matches: 2, winRate: 0.5, kd: 1.2 },
        { map: "Crash", matches: 2, winRate: 0.5, kd: 1.1 },
        { map: "Summit", matches: 1, winRate: 0, kd: 0.9 },
      ],
      byMode: [
        { mode: "Hardpoint", matches: 3, winRate: 0.33, kd: 1.05 },
        { mode: "Search & Destroy", matches: 2, winRate: 0.5, kd: 1.2 },
      ],
    },
    tournamentsPlayed: [],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 2890, total: 4820 },
  },
  {
    tag: "digaorc",
    nick: "DigaoRC",
    clanTag: "CPB",
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Recife · PE",
    joinedAt: "2024-11-05T00:00:00Z",
    currentTeam: "capiba-esports",
    pastTeams: [],
    roles: ["player", "captain"],
    stats: {
      matches: 98,
      wins: 55,
      kd: 1.62,
      winRate: 0.561,
      byMap: [
        { map: "Standoff", matches: 28, winRate: 0.57, kd: 1.65 },
        { map: "Crash", matches: 22, winRate: 0.55, kd: 1.6 },
        { map: "Summit", matches: 20, winRate: 0.55, kd: 1.58 },
        { map: "Raid", matches: 18, winRate: 0.55, kd: 1.62 },
        { map: "Firing Range", matches: 10, winRate: 0.5, kd: 1.55 },
      ],
      byMode: [
        { mode: "Hardpoint", matches: 48, winRate: 0.58, kd: 1.65 },
        { mode: "Search & Destroy", matches: 30, winRate: 0.53, kd: 1.58 },
        { mode: "Domination", matches: 20, winRate: 0.55, kd: 1.6 },
      ],
    },
    tournamentsPlayed: [
      {
        tournamentSlug: "arretados-invitational-cod-2025",
        placement: "Fase eliminatória",
      },
    ],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: { label: "Nick divergente", since: "2025-02-14" },
    ranking: { position: 520, total: 4820 },
  },
  {
    tag: "novinhojp",
    nick: "NovinhoJP",
    clanTag: "LTG",
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "João Pessoa · PB",
    joinedAt: "2026-04-10T00:00:00Z",
    currentTeam: "litoral-gaming",
    pastTeams: [],
    roles: ["player", "captain"],
    stats: {
      matches: 0,
      wins: 0,
      kd: 0,
      winRate: 0,
      byMap: [],
      byMode: [],
    },
    tournamentsPlayed: [],
    achievements: [],
    verified: { phone: true, cpf: false, gameId: true },
    fraudTag: null,
    ranking: { position: 4820, total: 4820 },
  },
  {
    tag: "victorse",
    nick: "VictorSE",
    clanTag: "NDG",
    avatar: PLACEHOLDER_AVATAR,
    game: "valorant",
    location: "Salvador · BA",
    joinedAt: "2024-05-18T00:00:00Z",
    currentTeam: "nordeste-gaming",
    pastTeams: [],
    roles: ["player", "captain"],
    stats: {
      matches: 190,
      wins: 118,
      kd: 1.38,
      winRate: 0.621,
      byMap: [
        { map: "Ascent", matches: 50, winRate: 0.64, kd: 1.42 },
        { map: "Bind", matches: 45, winRate: 0.6, kd: 1.35 },
        { map: "Haven", matches: 48, winRate: 0.63, kd: 1.4 },
        { map: "Split", matches: 47, winRate: 0.6, kd: 1.33 },
      ],
      byMode: [{ mode: "Competitive", matches: 190, winRate: 0.62, kd: 1.38 }],
    },
    tournamentsPlayed: [
      { tournamentSlug: "lan-sergipe-valorant", placement: "Top 4" },
    ],
    achievements: [
      {
        key: "top-4-lan-sergipe",
        label: "Top 4 · LAN Sergipe Gamer · Valorant",
        earnedAt: "2025-10-12",
      },
    ],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 88, total: 1840 },
  },
  {
    tag: "rafacangaco",
    nick: "Rafa Cangaço",
    clanTag: null,
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Recife · PE",
    joinedAt: "2024-01-20T00:00:00Z",
    currentTeam: null,
    pastTeams: [],
    roles: ["player", "caster"],
    stats: {
      matches: 0,
      wins: 0,
      kd: 0,
      winRate: 0,
      byMap: [],
      byMode: [],
    },
    tournamentsPlayed: [],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 0, total: 0 },
  },
  {
    tag: "dutavares",
    nick: "Dú Tavares",
    clanTag: null,
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Fortaleza · CE",
    joinedAt: "2024-03-05T00:00:00Z",
    currentTeam: null,
    pastTeams: [],
    roles: ["player", "caster"],
    stats: {
      matches: 0,
      wins: 0,
      kd: 0,
      winRate: 0,
      byMap: [],
      byMode: [],
    },
    tournamentsPlayed: [],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 0, total: 0 },
  },
  {
    tag: "marcinhobr",
    nick: "Marcinho BR",
    clanTag: null,
    avatar: PLACEHOLDER_AVATAR,
    game: "cod",
    location: "Salvador · BA",
    joinedAt: "2024-02-18T00:00:00Z",
    currentTeam: null,
    pastTeams: [],
    roles: ["player", "caster"],
    stats: {
      matches: 0,
      wins: 0,
      kd: 0,
      winRate: 0,
      byMap: [],
      byMode: [],
    },
    tournamentsPlayed: [],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 0, total: 0 },
  },
  {
    tag: "pamnordeste",
    nick: "Pam Nordeste",
    clanTag: null,
    avatar: PLACEHOLDER_AVATAR,
    game: "valorant",
    location: "Aracaju · SE",
    joinedAt: "2024-04-12T00:00:00Z",
    currentTeam: null,
    pastTeams: [],
    roles: ["player", "caster"],
    stats: {
      matches: 0,
      wins: 0,
      kd: 0,
      winRate: 0,
      byMap: [],
      byMode: [],
    },
    tournamentsPlayed: [],
    achievements: [],
    verified: { phone: true, cpf: true, gameId: true },
    fraudTag: null,
    ranking: { position: 0, total: 0 },
  },
];

const PLAYERS_BY_TAG: ReadonlyMap<string, Player> = new Map(
  PLAYERS.map((p) => [p.tag, p]),
);

export function findPlayerByTag(tag: string): Player | undefined {
  return PLAYERS_BY_TAG.get(tag);
}

export function isPlayerFullyVerified(
  player: Pick<Player, "verified">,
): boolean {
  const { phone, cpf, gameId } = player.verified;
  return phone && cpf && gameId;
}

export function formatPlayerKd(kd: number): string {
  return kd.toFixed(2);
}

export function formatPlayerWinRatePct(winRate: number): number {
  return Math.round(winRate * 100);
}

export function isPlayerTournamentWin(
  entry: Player["tournamentsPlayed"][number],
): boolean {
  return entry.placement === PLACEMENT_CHAMPION;
}

export function countPlayerTournamentWins(player: Player): number {
  return player.tournamentsPlayed.filter(isPlayerTournamentWin).length;
}

export function getPlayerRankingTopPercentile(
  ranking: Player["ranking"],
): number {
  if (ranking.total === 0) return 100;
  return Math.max(1, Math.ceil((ranking.position / ranking.total) * 100));
}

export function hasPlayerRole(player: Player, role: PlayerRole): boolean {
  return player.roles.includes(role);
}
