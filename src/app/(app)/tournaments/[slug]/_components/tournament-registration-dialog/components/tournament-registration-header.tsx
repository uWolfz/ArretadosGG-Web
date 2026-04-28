import Image from "next/image";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import { DialogTitle } from "@/components/ui/dialog";
import { TournamentGameTag } from "@/app/(app)/tournaments/_components/tournament-game-tag";

type TournamentRegistrationHeaderProps = {
  tournament: TournamentCore;
  slotsLeft: number;
};

export function TournamentRegistrationHeader({
  tournament,
  slotsLeft,
}: TournamentRegistrationHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={tournament.banner}
          alt=""
          fill
          sizes="512px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
      </div>
      <div className="relative flex items-center gap-3 p-5">
        <div className="size-14 shrink-0 rounded-lg bg-background/80 p-1.5 ring-1 ring-border backdrop-blur-sm">
          <Image
            src={tournament.logo}
            alt=""
            width={64}
            height={64}
            className="size-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground/65">
            Inscrever time
          </p>
          <DialogTitle className="mt-0.5 truncate font-display text-lg font-bold leading-tight text-foreground">
            {tournament.name}
          </DialogTitle>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <TournamentGameTag game={tournament.game} />
            <span className="inline-flex items-center rounded-sm border border-foreground/20 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75">
              {tournament.teamSize}
            </span>
            <span
              className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                slotsLeft === 0
                  ? "border border-foreground/15 text-foreground/50"
                  : "border border-brand-yellow/50 text-brand-yellow"
              }`}
            >
              {slotsLeft === 0
                ? "Sem vagas"
                : `${slotsLeft} ${slotsLeft === 1 ? "vaga" : "vagas"}`}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
