import type { TournamentRegistrationFormData } from "@/lib/schemas/tournament-registration-schema";

const REGISTRATION_MOCK_FAILURE_RATE = 0.05;
const REGISTRATION_MOCK_LATENCY_MS = 800;

export async function submitMockTournamentRegistration(
  slug: string,
  data: TournamentRegistrationFormData,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < REGISTRATION_MOCK_FAILURE_RATE) {
        reject(
          new Error(
            "O serviço de inscrição está temporariamente indisponível. Tente novamente em alguns minutos.",
          ),
        );
        return;
      }
      // eslint-disable-next-line no-console
      console.info("[mock] tournament registration", { slug, data });
      resolve();
    }, REGISTRATION_MOCK_LATENCY_MS);
  });
}
