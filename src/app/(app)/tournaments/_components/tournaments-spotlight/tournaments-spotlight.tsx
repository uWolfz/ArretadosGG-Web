"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import {
  formatTournamentStartsAtShort,
  getTournamentCta,
} from "@/app/(app)/tournaments/_utils";
import { TournamentStatusBadge } from "../tournament-status-badge";
import { TournamentGameTag } from "../tournament-game-tag";

type TournamentsSpotlightProps = {
  tournament: TournamentCore;
};

function getSpotlightContextLabel(tournament: TournamentCore): string {
  if (tournament.status === "finished" && tournament.champion) {
    return `Campeão: ${tournament.champion}`;
  }
  return formatTournamentStartsAtShort(tournament.startsAt);
}

export function TournamentsSpotlight({ tournament }: TournamentsSpotlightProps) {
  const cta = getTournamentCta(tournament);
  const contextLabel = getSpotlightContextLabel(tournament);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6"
    >
      <article className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
          <div className="relative aspect-[21/9] md:aspect-auto md:min-h-[280px]">
            <Image
              src={tournament.banner}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />

            <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-12 shrink-0 rounded-lg bg-background/80 backdrop-blur-sm p-1.5 ring-1 ring-border">
                  <Image
                    src={tournament.logo}
                    alt=""
                    width={64}
                    height={64}
                    className="size-full object-contain"
                  />
                </div>
                <TournamentStatusBadge status={tournament.status} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 p-5 sm:p-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <TournamentGameTag game={tournament.game} />
                <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/70">
                  {contextLabel}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                {tournament.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
                  Prêmio
                </p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  {tournament.prizeDisplay}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
                  Times
                </p>
                <p className="mt-1 font-display text-xl font-bold text-foreground">
                  {tournament.teamsRegistered}
                  <span className="text-foreground/50">
                    {" "}
                    / {tournament.teamsTotal}
                  </span>
                </p>
              </div>
            </div>

            {cta && (
              <a
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {cta.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.section>
  );
}
