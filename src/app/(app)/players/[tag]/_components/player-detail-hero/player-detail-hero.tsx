"use client";

import Image from "next/image";
import { SparklesIcon } from "lucide-react";
import { findTeamBySlug } from "@/app/(app)/_data/teams";
import {
  isPlayerFullyVerified,
  type Player,
} from "@/app/(app)/_data/players";
import { formatMonthYearPtBr } from "@/lib/format-date";
import {
  GameBadge,
  VerifiedBadge,
  FraudTagBadge,
} from "@/components/badges";

type PlayerDetailHeroProps = {
  player: Player;
  onGenerateArt: () => void;
};

export function PlayerDetailHero({
  player,
  onGenerateArt,
}: PlayerDetailHeroProps) {
  const isVerified = isPlayerFullyVerified(player);
  const team = player.currentTeam ? findTeamBySlug(player.currentTeam) : null;

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="size-32 shrink-0 overflow-hidden rounded-full bg-card p-1 ring-1 ring-border md:size-40">
            <Image
              src={player.avatar}
              alt={`Avatar de ${player.nick}`}
              width={160}
              height={160}
              className="size-full rounded-full object-cover"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {player.clanTag && (
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground/70">
                  [{player.clanTag}]
                </span>
              )}
              <GameBadge game={player.game} />
              {isVerified && <VerifiedBadge />}
              {player.fraudTag && (
                <FraudTagBadge label={player.fraudTag.label} />
              )}
            </div>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
              {player.nick}
            </h1>
            <p className="mt-2 text-sm text-foreground/75">
              {team ? team.name : "Free agent"} · {player.location} · Joga
              desde {formatMonthYearPtBr(player.joinedAt)}
            </p>
          </div>

          <div className="md:self-center">
            <button
              type="button"
              onClick={onGenerateArt}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30"
            >
              <SparklesIcon className="size-4" aria-hidden="true" />
              Gerar arte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
