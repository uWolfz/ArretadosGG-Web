"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TicketIcon, MapPinIcon } from "lucide-react";
import type { Tournament } from "@/app/(app)/_data/tournaments";
import { formatTournamentStartsAtLong } from "@/app/(app)/tournaments/_utils";
import { TournamentStatusBadge } from "@/app/(app)/tournaments/_components/tournament-status-badge";
import { TournamentGameTag } from "@/app/(app)/tournaments/_components/tournament-game-tag";
import { TournamentRegistrationDialog } from "../tournament-registration-dialog";

type TournamentDetailHeroProps = {
  tournament: Tournament;
};

export function TournamentDetailHero({
  tournament,
}: TournamentDetailHeroProps) {
  const isInvite = tournament.registrationType === "invite";
  const isOpen = tournament.status === "open";
  const isLive = tournament.status === "live";

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-h-[80svh] overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0">
        <Image
          src={tournament.banner}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="size-24 shrink-0 rounded-xl bg-background/70 p-2 ring-1 ring-border backdrop-blur-sm sm:size-32 md:size-40">
            <Image
              src={tournament.logo}
              alt=""
              width={160}
              height={160}
              className="size-full object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <TournamentStatusBadge status={tournament.status} />
              <TournamentGameTag game={tournament.game} />
              <span className="inline-flex items-center rounded-sm border border-foreground/20 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75">
                {tournament.teamSize}
              </span>
              {isInvite && (
                <span className="inline-flex items-center gap-1 rounded-sm border border-brand-green/60 bg-brand-green/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.78_0.14_162)]">
                  <TicketIcon className="size-3" aria-hidden="true" />
                  Por convite
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              {tournament.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-foreground/75">
              <span>{formatTournamentStartsAtLong(tournament.startsAt)}</span>
              {tournament.venue && (
                <>
                  <span className="text-foreground/40" aria-hidden="true">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="size-3" aria-hidden="true" />
                    {tournament.venue}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-stretch">
            {isLive && tournament.streamUrl && (
              <a
                href={tournament.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Assistir ao vivo
                <span aria-hidden="true">→</span>
              </a>
            )}
            {isOpen && <TournamentRegistrationDialog tournament={tournament} />}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
