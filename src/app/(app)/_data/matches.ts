import type { TournamentGame } from "./tournaments";

export type MatchStatus = "live" | "upcoming" | "finished";

export type MatchTeam = {
  name: string;
  tag: string; // sigla de 3 letras, ex: "FUR", "CNG"
  logo: string;
  /** Presente quando status === "live" ou "finished". Ausente em "upcoming". */
  score?: number;
};

export type Match = {
  id: string;
  tournamentName: string;
  round: string;
  game: TournamentGame;
  status: MatchStatus;
  startsAt: string;
  teamA: MatchTeam;
  teamB: MatchTeam;
  streamUrl?: string;
};

/**
 * Mocks: logos dos times usam o logo institucional como placeholder.
 * Em produção, cada time teria seu próprio asset.
 */
const TEAM_LOGO = "/Logos - Institucional/Logo Arretados.png";

export const MATCHES: Match[] = [
  // LIVE (3)
  {
    id: "m-001",
    tournamentName: "Arretados Invitational · CoD",
    round: "Semifinal · Best of 5",
    game: "cod",
    status: "live",
    startsAt: "2026-04-17T14:30:00-03:00",
    teamA: { name: "Fúria Vermelha", tag: "FUR", logo: TEAM_LOGO, score: 2 },
    teamB: { name: "Cangaço Esports", tag: "CNG", logo: TEAM_LOGO, score: 1 },
    streamUrl: "https://twitch.tv/arretadosgg",
  },
  {
    id: "m-002",
    tournamentName: "LAN Sergipe Gamer · Valorant",
    round: "Grupo A · Rodada 3",
    game: "valorant",
    status: "live",
    startsAt: "2026-04-17T15:00:00-03:00",
    teamA: { name: "Nordeste Gaming", tag: "NDG", logo: TEAM_LOGO, score: 1 },
    teamB: { name: "Sertão Gaming", tag: "SRT", logo: TEAM_LOGO, score: 1 },
    streamUrl: "https://twitch.tv/arretadosgg",
  },
  {
    id: "m-003",
    tournamentName: "LAN Sergipe Gamer · Valorant",
    round: "Grupo B · Rodada 3",
    game: "valorant",
    status: "live",
    startsAt: "2026-04-17T15:00:00-03:00",
    teamA: { name: "Arena Pernambuco", tag: "APC", logo: TEAM_LOGO, score: 0 },
    teamB: { name: "Litoral Gaming", tag: "LTG", logo: TEAM_LOGO, score: 2 },
    streamUrl: "https://twitch.tv/arretadosgg",
  },

  // UPCOMING (4)
  {
    id: "m-004",
    tournamentName: "Arretados Invitational · CoD",
    round: "Final · Best of 7",
    game: "cod",
    status: "upcoming",
    startsAt: "2026-04-17T19:00:00-03:00",
    teamA: { name: "A definir", tag: "TBD", logo: TEAM_LOGO },
    teamB: { name: "A definir", tag: "TBD", logo: TEAM_LOGO },
  },
  {
    id: "m-005",
    tournamentName: "LAN Sergipe Gamer · Valorant",
    round: "Quartas de Final",
    game: "valorant",
    status: "upcoming",
    startsAt: "2026-04-18T14:00:00-03:00",
    teamA: { name: "Capiba eSports", tag: "CPB", logo: TEAM_LOGO },
    teamB: { name: "Fogueira BR", tag: "FOG", logo: TEAM_LOGO },
  },
  {
    id: "m-006",
    tournamentName: "Série A · CoDM Regional",
    round: "Abertura · Grupo A",
    game: "cod",
    status: "upcoming",
    startsAt: "2026-05-03T20:00:00-03:00",
    teamA: { name: "Fúria Vermelha", tag: "FUR", logo: TEAM_LOGO },
    teamB: { name: "Nordeste Gaming", tag: "NDG", logo: TEAM_LOGO },
  },
  {
    id: "m-007",
    tournamentName: "Login Arena · LoL Season 3",
    round: "Abertura · Dia 1",
    game: "lol",
    status: "upcoming",
    startsAt: "2026-05-10T18:00:00-03:00",
    teamA: { name: "Arena Pernambuco", tag: "APC", logo: TEAM_LOGO },
    teamB: { name: "Sertão Gaming", tag: "SRT", logo: TEAM_LOGO },
  },

  // FINISHED (4)
  {
    id: "m-008",
    tournamentName: "Arretados Invitational · CoD",
    round: "Quartas · BO5",
    game: "cod",
    status: "finished",
    startsAt: "2026-04-16T20:00:00-03:00",
    teamA: { name: "Fúria Vermelha", tag: "FUR", logo: TEAM_LOGO, score: 3 },
    teamB: { name: "Litoral Gaming", tag: "LTG", logo: TEAM_LOGO, score: 1 },
  },
  {
    id: "m-009",
    tournamentName: "Arretados Invitational · CoD",
    round: "Quartas · BO5",
    game: "cod",
    status: "finished",
    startsAt: "2026-04-16T22:00:00-03:00",
    teamA: { name: "Cangaço Esports", tag: "CNG", logo: TEAM_LOGO, score: 3 },
    teamB: { name: "Capiba eSports", tag: "CPB", logo: TEAM_LOGO, score: 2 },
  },
  {
    id: "m-010",
    tournamentName: "LAN Sergipe Gamer · Valorant",
    round: "Grupo A · R2",
    game: "valorant",
    status: "finished",
    startsAt: "2026-04-17T12:00:00-03:00",
    teamA: { name: "Nordeste Gaming", tag: "NDG", logo: TEAM_LOGO, score: 2 },
    teamB: { name: "Fogueira BR", tag: "FOG", logo: TEAM_LOGO, score: 0 },
  },
  {
    id: "m-011",
    tournamentName: "Login Arena · LoL Season 2",
    round: "Grande Final",
    game: "lol",
    status: "finished",
    startsAt: "2026-03-29T18:00:00-03:00",
    teamA: { name: "Fogueira BR", tag: "FOG", logo: TEAM_LOGO, score: 3 },
    teamB: { name: "Cangaço Esports", tag: "CNG", logo: TEAM_LOGO, score: 2 },
  },
];

export type MatchWinnerSide = "A" | "B" | null;

export function getMatchWinnerSide(match: Match): MatchWinnerSide {
  if (match.status !== "finished") return null;
  const a = match.teamA.score ?? 0;
  const b = match.teamB.score ?? 0;
  if (a > b) return "A";
  if (b > a) return "B";
  return null;
}

export function hasMatchScore(match: Match): boolean {
  return match.status === "live" || match.status === "finished";
}
