"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import { TournamentStatusBadge } from "../tournament-status-badge";
import { TournamentGameTag } from "../tournament-game-tag";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_EXPO },
  },
};

type TournamentsLiveNowProps = {
  items: TournamentCore[];
};

const MAX_CARDS = 3;

export function TournamentsLiveNow({ items }: TournamentsLiveNowProps) {
  if (items.length < 2) return null;

  const shown = items.slice(0, MAX_CARDS);
  const remaining = items.length - shown.length;

  const gridClass =
    shown.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-foreground/70">
          <span
            className="inline-block size-2 rounded-full bg-brand-red animate-live-pulse"
            aria-hidden="true"
          />
          Ao vivo agora
        </h2>
        {remaining > 0 && (
          <a
            href="/tournaments?tab=live#listing"
            className="group/link inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            Ver todos os {items.length} ao vivo
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            >
              →
            </span>
          </a>
        )}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid gap-4 ${gridClass}`}
      >
        {shown.map((tournament) => (
          <motion.article
            key={tournament.name}
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <a
              href={tournament.streamUrl ?? "#"}
              target={tournament.streamUrl ? "_blank" : undefined}
              rel={tournament.streamUrl ? "noopener noreferrer" : undefined}
              className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/30"
            >
              <div className="relative aspect-video">
                <Image
                  src={tournament.banner}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <TournamentStatusBadge status={tournament.status} />
                  <TournamentGameTag game={tournament.game} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold leading-tight text-foreground truncate">
                  {tournament.name}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-3 font-mono text-xs">
                    <span>
                      <span className="text-foreground/65">Prêmio</span>{" "}
                      <span className="font-semibold text-foreground">
                        {tournament.prizeDisplay}
                      </span>
                    </span>
                    <span>
                      <span className="text-foreground/65">Times</span>{" "}
                      <span className="font-semibold text-foreground">
                        {tournament.teamsRegistered}/{tournament.teamsTotal}
                      </span>
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-foreground/70">
                    Assistir
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
