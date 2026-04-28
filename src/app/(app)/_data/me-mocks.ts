import type { Team } from "./teams";
import { findTeamBySlug } from "./teams";
import { getJoinRequestsByPlayerTag } from "./team-join-requests";
import { findCasterApplicationByPlayerTag } from "./caster-applications";
import { isNotNull } from "@/lib/type-guards";

export type MockInvite = {
  id: string;
  team: Team;
  invitedBy: string;
  sentAt: string;
};

const INVITE_SEED = [
  { teamSlug: "cangaco-esports", invitedBy: "Capitão Rocha", sentAt: "2026-04-15" },
  { teamSlug: "fogueira-br", invitedBy: "GM Biel", sentAt: "2026-04-10" },
  { teamSlug: "nordeste-gaming", invitedBy: "Manager NDG", sentAt: "2026-04-05" },
] as const;

export function getMockInvitesMe(): MockInvite[] {
  return INVITE_SEED
    .map((seed) => {
      const team = findTeamBySlug(seed.teamSlug);
      return team
        ? {
            id: `invite-${seed.teamSlug}`,
            team,
            invitedBy: seed.invitedBy,
            sentAt: seed.sentAt,
          }
        : null;
    })
    .filter(isNotNull);
}

export const MOCK_NOTIFICATIONS_ME: readonly string[] = [
  "Fúria Vermelha confirmou seus stats da partida Standoff (org).",
  "Nova conquista: 10 vitórias consecutivas.",
  "Seu ranking subiu pra #12 na CODM BR.",
  "Cangaço Esports te convidou pra fazer parte do roster.",
  "Arretados Invitational · inscrições abertas até 30/04.",
];

/**
 * Monta o feed de notificações do header pro user logado — combina mocks
 * estáticos + status dinâmico dos fluxos sociais (join requests resolvidos,
 * aplicação de caster revisada).
 */
export function getMockNotificationsMe(userTag: string): string[] {
  const feed: string[] = [];

  const application = findCasterApplicationByPlayerTag(userTag);
  if (application && application.status === "approved") {
    feed.push("Sua aplicação de caster foi aprovada — bem-vindo ao booth.");
  } else if (application && application.status === "rejected") {
    feed.push(
      "Sua aplicação de caster foi revisada. Confira o motivo em /me aba Caster.",
    );
  }

  for (const request of getJoinRequestsByPlayerTag(userTag)) {
    if (request.status === "accepted") {
      const team = findTeamBySlug(request.teamSlug);
      feed.push(
        `${team?.name ?? request.teamSlug} aceitou seu pedido — bem-vindo ao roster.`,
      );
    } else if (
      request.status === "rejected" &&
      request.resolverNote !== "canceled by player"
    ) {
      const team = findTeamBySlug(request.teamSlug);
      feed.push(
        `${team?.name ?? request.teamSlug} declinou seu pedido de entrada.`,
      );
    }
  }

  return [...feed, ...MOCK_NOTIFICATIONS_ME];
}

export function getMockPanelCountsMe() {
  return {
    invites: getMockInvitesMe().length,
  };
}
