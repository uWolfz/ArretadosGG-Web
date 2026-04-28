import type { Team } from "@/app/(app)/_data/teams";
import { MATCHES } from "@/app/(app)/_data/matches";
import { MatchRow } from "@/app/(app)/matches/_components/match-row";
import { EmptyState } from "@/app/(app)/_components";

type TeamRecentMatchesProps = {
  teamRecentMatches: Team;
  limitTeamRecentMatches?: number;
};

export function TeamRecentMatches({
  teamRecentMatches,
  limitTeamRecentMatches = 6,
}: TeamRecentMatchesProps) {
  const matches = MATCHES.filter(
    (m) =>
      m.teamA.tag === teamRecentMatches.tag ||
      m.teamB.tag === teamRecentMatches.tag,
  ).slice(0, limitTeamRecentMatches);

  if (matches.length === 0) {
    return (
      <EmptyState
        title="Sem partidas recentes"
        hint="Quando o time entrar em jogo, aparece aqui em tempo real."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card/40">
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} />
      ))}
    </div>
  );
}
