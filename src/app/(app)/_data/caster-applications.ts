import type { CasterRole } from "./casters";

export type CasterApplicationStatus = "pending" | "approved" | "rejected";

export type CasterApplication = {
  id: string;
  playerTag: string;
  submittedAt: string;
  status: CasterApplicationStatus;
  reviewedAt: string | null;
  reviewerNote: string | null;
  /** Campos preenchidos no wizard do jogador. */
  form: {
    bio: string;
    handle: string;
    role: CasterRole;
    portfolioLinks: string[];
    sampleWorkUrl: string;
  };
};

// Array mutável por design — simula mutações in-memory pros mock helpers.
// Reseta a cada reload. Documentado em resolveCasterApplicationMock.
export const CASTER_APPLICATIONS: CasterApplication[] = [
  {
    id: "app-kaikeoc",
    playerTag: "kaikeoc",
    submittedAt: "2026-04-10T20:14:00Z",
    status: "pending",
    reviewedAt: null,
    reviewerNote: null,
    form: {
      bio: "Jogador ativo da Fúria Vermelha, quero começar a narrar torneios amadores nos intervalos da temporada. Tenho portfólio de 8 VODs no YouTube analisando partidas do Série A.",
      handle: "twitch.tv/kaikeoc",
      role: "analyst",
      portfolioLinks: [
        "https://twitch.tv/kaikeoc",
        "https://youtube.com/@kaikeoc",
      ],
      sampleWorkUrl: "https://youtube.com/watch?v=sample-kaikeoc",
    },
  },
  {
    id: "app-marcosbr",
    playerTag: "marcosbr",
    submittedAt: "2026-02-05T14:20:00Z",
    status: "approved",
    reviewedAt: "2026-02-15T10:30:00Z",
    reviewerNote: "Aprovado — experiência competitiva e clareza no sample work fecharam o caso.",
    form: {
      bio: "Migrei do competitivo CoDM pro booth de narração em 2026. Conheço o jogo por dentro e trago leitura tática com um toque de quem já teve o controle na mão.",
      handle: "twitch.tv/marcosbr",
      role: "analyst",
      portfolioLinks: [
        "https://twitch.tv/marcosbr",
      ],
      sampleWorkUrl: "https://youtube.com/watch?v=sample-marcosbr",
    },
  },
  {
    id: "app-luizpe",
    playerTag: "luizpe",
    submittedAt: "2026-03-22T18:45:00Z",
    status: "rejected",
    reviewedAt: "2026-04-01T09:15:00Z",
    reviewerNote: "Obrigado pelo envio. Precisa concluir a verificação do gameId e enviar mais 1 sample work antes de reaplicar.",
    form: {
      bio: "Arena Pernambuco no currículo, mas a paixão de verdade é narrar. Quero entrar na grade de narradores da Arretados como analista de LoL.",
      handle: "twitch.tv/luizpe",
      role: "analyst",
      portfolioLinks: [
        "https://twitch.tv/luizpe",
      ],
      sampleWorkUrl: "https://youtube.com/watch?v=sample-luizpe",
    },
  },
  {
    id: "app-digaorc",
    playerTag: "digaorc",
    submittedAt: "2026-04-15T22:05:00Z",
    status: "pending",
    reviewedAt: null,
    reviewerNote: null,
    form: {
      bio: "Capitão do Capiba eSports, narração é meu side project há 2 anos. Quero oficializar e casteer partidas amadoras pra contribuir com a cena regional.",
      handle: "twitch.tv/digaorc",
      role: "play-by-play",
      portfolioLinks: [
        "https://twitch.tv/digaorc",
        "https://youtube.com/@digaorc",
      ],
      sampleWorkUrl: "https://youtube.com/watch?v=sample-digaorc",
    },
  },
];

/**
 * Cria uma aplicação nova in-memory (marca pending). Muta CASTER_APPLICATIONS.
 * Reset ao reload.
 */
export function createCasterApplicationMock(input: {
  playerTag: string;
  bio: string;
  handle: string;
  role: CasterRole;
  portfolioLinks: string[];
  sampleWorkUrl: string;
}): CasterApplication {
  const application: CasterApplication = {
    id: `app-${input.playerTag}-${Date.now()}`,
    playerTag: input.playerTag,
    submittedAt: new Date().toISOString(),
    status: "pending",
    reviewedAt: null,
    reviewerNote: null,
    form: {
      bio: input.bio,
      handle: input.handle,
      role: input.role,
      portfolioLinks: input.portfolioLinks,
      sampleWorkUrl: input.sampleWorkUrl,
    },
  };
  CASTER_APPLICATIONS.push(application);
  return application;
}

export function findCasterApplicationByPlayerTag(
  playerTag: string,
): CasterApplication | undefined {
  // Retorna a mais recente se houver múltiplas (reaplicações).
  const matches = CASTER_APPLICATIONS.filter((a) => a.playerTag === playerTag);
  if (matches.length === 0) return undefined;
  return matches.reduce((latest, current) =>
    current.submittedAt > latest.submittedAt ? current : latest,
  );
}

export function findCasterApplicationById(
  id: string,
): CasterApplication | undefined {
  return CASTER_APPLICATIONS.find((a) => a.id === id);
}

export function getPendingCasterApplications(): CasterApplication[] {
  return CASTER_APPLICATIONS.filter((a) => a.status === "pending");
}

type ResolveCasterApplicationDecision = "approve" | "reject";

/**
 * Resolve uma application in-memory. Side effect simulado — muta o array
 * CASTER_APPLICATIONS e reseta no próximo reload. Quando a decisão é 'approve',
 * o consumer é responsável por criar a entry correspondente em CASTERS e
 * atualizar `Player.roles` (não fazemos cross-module mutation aqui pra evitar
 * ciclo de imports).
 */
export function resolveCasterApplicationMock(
  id: string,
  decision: ResolveCasterApplicationDecision,
  note?: string,
): CasterApplication | undefined {
  const app = CASTER_APPLICATIONS.find((a) => a.id === id);
  if (!app) return undefined;
  if (app.status !== "pending") return app;
  app.status = decision === "approve" ? "approved" : "rejected";
  app.reviewedAt = new Date().toISOString();
  app.reviewerNote = note ?? null;
  return app;
}
