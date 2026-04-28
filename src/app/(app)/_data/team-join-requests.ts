export type TeamJoinRequestStatus = "pending" | "accepted" | "rejected";

export type TeamJoinRequest = {
  id: string;
  teamSlug: string;
  playerTag: string;
  requestedAt: string;
  status: TeamJoinRequestStatus;
  message: string | null;
  resolvedAt: string | null;
  /** Usado internamente — ex: 'canceled by player', 'captain accepted', motivo livre. */
  resolverNote: string | null;
};

// Array mutável por design — simula mutações in-memory pros mock helpers.
// Reseta a cada reload.
export const TEAM_JOIN_REQUESTS: TeamJoinRequest[] = [
  {
    id: "join-marcosbr-furia-vermelha",
    teamSlug: "furia-vermelha",
    playerTag: "marcosbr",
    requestedAt: "2026-04-17T13:20:00Z",
    status: "pending",
    message: "Ex-Nordeste Gaming, disponível pra roster e treinos. Valeu!",
    resolvedAt: null,
    resolverNote: null,
  },
  {
    id: "join-digaorc-cangaco-esports",
    teamSlug: "cangaco-esports",
    playerTag: "digaorc",
    requestedAt: "2026-04-15T21:00:00Z",
    status: "pending",
    message: null,
    resolvedAt: null,
    resolverNote: null,
  },
  {
    id: "join-luizpe-nordeste-gaming",
    teamSlug: "nordeste-gaming",
    playerTag: "luizpe",
    requestedAt: "2026-04-05T10:12:00Z",
    status: "rejected",
    message: "Quero migrar pra Valorant, topo banco inicial.",
    resolvedAt: "2026-04-08T19:30:00Z",
    resolverNote: "Roster cheio pra Valorant — reabrir em Junho.",
  },
  {
    id: "join-marcosbr-caruaru-force",
    teamSlug: "caruaru-force",
    playerTag: "marcosbr",
    requestedAt: "2026-01-05T12:00:00Z",
    status: "accepted",
    message: null,
    resolvedAt: "2026-01-15T16:45:00Z",
    resolverNote: null,
  },
  {
    id: "join-kaikeoc-capiba-esports",
    teamSlug: "capiba-esports",
    playerTag: "kaikeoc",
    requestedAt: "2026-04-12T22:30:00Z",
    status: "pending",
    message: "Bom de HP, quero voltar pro Capiba.",
    resolvedAt: null,
    resolverNote: null,
  },
];

export function getJoinRequestsByTeamSlug(teamSlug: string): TeamJoinRequest[] {
  return TEAM_JOIN_REQUESTS.filter((r) => r.teamSlug === teamSlug);
}

export function getJoinRequestsByPlayerTag(
  playerTag: string,
): TeamJoinRequest[] {
  return TEAM_JOIN_REQUESTS.filter((r) => r.playerTag === playerTag);
}

export function getPendingJoinRequestsByTeamSlug(
  teamSlug: string,
): TeamJoinRequest[] {
  return TEAM_JOIN_REQUESTS.filter(
    (r) => r.teamSlug === teamSlug && r.status === "pending",
  );
}

export function findPendingJoinRequestByPlayerAndTeam(
  playerTag: string,
  teamSlug: string,
): TeamJoinRequest | undefined {
  return TEAM_JOIN_REQUESTS.find(
    (r) =>
      r.playerTag === playerTag &&
      r.teamSlug === teamSlug &&
      r.status === "pending",
  );
}

/**
 * Cria um pedido novo in-memory. Muta TEAM_JOIN_REQUESTS. Reset ao reload.
 */
export function createJoinRequestMock(input: {
  teamSlug: string;
  playerTag: string;
  message?: string;
}): TeamJoinRequest {
  const request: TeamJoinRequest = {
    id: `join-${input.playerTag}-${input.teamSlug}-${Date.now()}`,
    teamSlug: input.teamSlug,
    playerTag: input.playerTag,
    requestedAt: new Date().toISOString(),
    status: "pending",
    message: input.message ?? null,
    resolvedAt: null,
    resolverNote: null,
  };
  TEAM_JOIN_REQUESTS.push(request);
  return request;
}

type ResolveJoinRequestDecision = "accept" | "reject";

/**
 * Resolve um pedido in-memory. Side effect simulado. Não muta Team.roster —
 * o consumer é responsável por isso pra evitar ciclo de imports.
 */
export function resolveJoinRequestMock(
  id: string,
  decision: ResolveJoinRequestDecision,
  note?: string,
): TeamJoinRequest | undefined {
  const request = TEAM_JOIN_REQUESTS.find((r) => r.id === id);
  if (!request) return undefined;
  if (request.status !== "pending") return request;
  request.status = decision === "accept" ? "accepted" : "rejected";
  request.resolvedAt = new Date().toISOString();
  request.resolverNote = note ?? null;
  return request;
}

/**
 * Cancela um pedido pendente do lado do player. Marca como rejected com
 * resolverNote específica pra diferenciar de rejeição do capitão na UI.
 */
export function cancelJoinRequestMock(id: string): TeamJoinRequest | undefined {
  return resolveJoinRequestMock(id, "reject", "canceled by player");
}
