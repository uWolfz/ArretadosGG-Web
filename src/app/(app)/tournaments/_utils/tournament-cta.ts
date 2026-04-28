import type { TournamentCore } from "@/app/(app)/_data/tournaments";

export type TournamentCta = {
  label: string;
  href: string;
  external?: boolean;
};

export function getTournamentCta(
  tournament: TournamentCore,
): TournamentCta | null {
  if (tournament.status === "live" && tournament.streamUrl) {
    return {
      label: "Assistir ao vivo",
      href: tournament.streamUrl,
      external: true,
    };
  }
  if (tournament.status === "open") {
    return { label: "Inscrever time", href: `/tournaments/${tournament.slug}` };
  }
  if (tournament.status === "upcoming") {
    return { label: "Ver detalhes", href: `/tournaments/${tournament.slug}` };
  }
  return null;
}
