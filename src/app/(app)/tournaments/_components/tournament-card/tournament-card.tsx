"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TicketIcon } from "lucide-react";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import { formatTournamentStartsAt } from "@/app/(app)/tournaments/_utils";
import { TournamentStatusBadge } from "../tournament-status-badge";
import { TournamentGameTag } from "../tournament-game-tag";
import { TournamentInfoCol } from "./tournament-info-col";

type TournamentCardProps = {
  tournament: TournamentCore;
};

function hasTournamentOpenSlots(tournament: TournamentCore): boolean {
  return (
    tournament.status === "open" &&
    tournament.teamsRegistered < tournament.teamsTotal
  );
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const isInvite = tournament.registrationType === "invite";
  const hasOpenSlots = hasTournamentOpenSlots(tournament);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-background">
        <Image
          src={tournament.banner}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-60 blur-[2px] transition-transform duration-[600ms] ease-out group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-card/10 to-card/60" />
        <div className="relative z-10 flex h-full items-center justify-center p-6">
          <div className="size-24 sm:size-28 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <Image
              src={tournament.logo}
              alt=""
              width={160}
              height={160}
              className="size-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-5">
        <h3 className="font-display text-base font-bold leading-tight text-foreground text-center line-clamp-2">
          {tournament.name}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <TournamentStatusBadge status={tournament.status} />
          <span className="inline-flex items-center rounded-sm border border-foreground/20 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75">
            {tournament.teamSize}
          </span>
          <TournamentGameTag game={tournament.game} />
          {isInvite && (
            <span className="inline-flex items-center gap-1 rounded-sm border border-brand-green/60 bg-brand-green/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.78_0.14_162)]">
              <TicketIcon className="size-3" aria-hidden="true" />
              Por convite
            </span>
          )}
        </div>

        <div className="grid w-full grid-cols-2 divide-x divide-border border-t border-border pt-3">
          <TournamentInfoCol
            label="Início"
            value={formatTournamentStartsAt(tournament.startsAt)}
          />
          <TournamentInfoCol
            label="Vagas"
            value={`${tournament.teamsRegistered} / ${tournament.teamsTotal}`}
            accent={hasOpenSlots ? "yellow" : undefined}
          />
        </div>

        <Link
          href={`/tournaments/${tournament.slug}`}
          className="group/btn mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <span className="text-base leading-none">+</span> Mais informações
        </Link>
      </div>
    </motion.article>
  );
}
