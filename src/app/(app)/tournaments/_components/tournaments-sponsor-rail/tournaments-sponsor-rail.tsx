import { cn } from "@/lib/utils";
import { SPONSORS } from "@/app/(app)/_data/sponsors";
import { SponsorCard } from "./sponsor-card";

type TournamentsSponsorRailProps = {
  side: "left" | "right";
};

export function TournamentsSponsorRail({ side }: TournamentsSponsorRailProps) {
  const half = Math.ceil(SPONSORS.length / 2);
  const items = side === "left" ? SPONSORS.slice(0, half) : SPONSORS.slice(half);

  return (
    <aside
      aria-label={`Patrocinadores — coluna ${side === "left" ? "esquerda" : "direita"}`}
      className={cn(
        "hidden min-[1650px]:block absolute top-6 w-40 space-y-4",
        side === "left" ? "left-4" : "right-4",
      )}
    >
      {items.map((sponsor) => (
        <SponsorCard key={sponsor.name} sponsor={sponsor} />
      ))}
    </aside>
  );
}
