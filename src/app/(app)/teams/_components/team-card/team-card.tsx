"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  computeTeamWinRatePct,
  type Team,
  type TeamTier,
} from "@/app/(app)/_data/teams";
import { KpiCell } from "@/app/(app)/_components";
import { TournamentGameTag } from "@/app/(app)/tournaments/_components/tournament-game-tag";

type TeamCardProps = {
  team: Team;
};

const TIER_LABEL: Record<TeamTier, string> = {
  pro: "PRO",
  contender: "ACESSO",
  amador: "AMADOR",
};

const TIER_CLASS: Record<TeamTier, string> = {
  pro: "border-brand-yellow/50 text-brand-yellow",
  contender: "border-foreground/25 text-foreground/75",
  amador: "border-foreground/15 text-foreground/60",
};

export function TeamCard({ team }: TeamCardProps) {
  const winRate = computeTeamWinRatePct(team);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/30"
    >
      <Link
        href={`/teams/${team.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
      >
      <div className="flex items-start gap-4 p-5">
        <div className="size-14 shrink-0 rounded-lg bg-background p-1.5 ring-1 ring-border">
          <Image
            src={team.logo}
            alt=""
            width={56}
            height={56}
            className="size-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold tracking-wider text-foreground/60">
              {team.tag}
            </span>
            <span
              className={cn(
                "rounded-sm border px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider",
                TIER_CLASS[team.tier],
              )}
            >
              {TIER_LABEL[team.tier]}
            </span>
          </div>
          <h3 className="mt-0.5 truncate font-display text-base font-bold text-foreground">
            {team.name}
          </h3>
          <p className="mt-1 truncate text-[11px] text-foreground/70">
            {team.location}
          </p>
          <div className="mt-2">
            <TournamentGameTag game={team.primaryGame} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
        <KpiCell label="Vitórias" value={team.wins.toString()} />
        <KpiCell
          label="Winrate"
          value={`${winRate}%`}
          accent={winRate >= 60 ? "yellow" : "neutral"}
        />
        <KpiCell
          label="Títulos"
          value={team.trophies.toString()}
          accent={team.trophies > 0 ? "yellow" : "neutral"}
        />
      </div>
      </Link>
    </motion.article>
  );
}
