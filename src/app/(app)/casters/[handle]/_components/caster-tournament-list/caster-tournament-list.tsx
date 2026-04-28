import type { Tournament } from "@/app/(app)/_data/tournaments";
import { EmptyState } from "@/app/(app)/_components";
import { CasterTournamentItem } from "./components/caster-tournament-item";

type CasterTournamentListProps = {
  tournaments: Tournament[];
};

export function CasterTournamentList({
  tournaments,
}: CasterTournamentListProps) {
  if (tournaments.length === 0) {
    return (
      <EmptyState
        title="Ainda não casteou nenhum torneio oficial"
        hint="Quando entrar na grade, aparece aqui."
      />
    );
  }

  return (
    <ul className="overflow-hidden rounded-md border border-border bg-card/40">
      {tournaments.map((tournament, index) => (
        <CasterTournamentItem
          key={tournament.slug}
          tournament={tournament}
          isLast={index === tournaments.length - 1}
        />
      ))}
    </ul>
  );
}
