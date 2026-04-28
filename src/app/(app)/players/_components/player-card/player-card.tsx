import Image from "next/image";
import Link from "next/link";
import { findTeamBySlug } from "@/app/(app)/_data/teams";
import {
  formatPlayerKd,
  formatPlayerWinRatePct,
  isPlayerFullyVerified,
  type Player,
} from "@/app/(app)/_data/players";
import { KpiCell } from "@/app/(app)/_components";
import {
  GameBadge,
  VerifiedBadge,
  FraudTagBadge,
} from "@/components/badges";

type PlayerCardProps = {
  player: Player;
};

export function PlayerCard({ player }: PlayerCardProps) {
  const isVerified = isPlayerFullyVerified(player);
  const team = player.currentTeam ? findTeamBySlug(player.currentTeam) : null;
  const winRatePct = formatPlayerWinRatePct(player.stats.winRate);

  return (
    <Link
      href={`/players/${player.tag}`}
      className="group block rounded-xl border border-border bg-card transition-colors hover:border-foreground/30 hover:-translate-y-0.5 duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
    >
      <div className="flex items-start gap-4 p-5">
        <div className="size-14 shrink-0 overflow-hidden rounded-full bg-background p-0.5 ring-1 ring-border">
          <Image
            src={player.avatar}
            alt=""
            width={56}
            height={56}
            className="size-full rounded-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {player.clanTag && (
              <span className="font-mono text-[10px] font-semibold tracking-wider text-foreground/60">
                [{player.clanTag}]
              </span>
            )}
            <GameBadge game={player.game} size="sm" />
            {isVerified && <VerifiedBadge size="sm" />}
            {player.fraudTag && (
              <FraudTagBadge label={player.fraudTag.label} size="sm" />
            )}
          </div>
          <h3 className="mt-0.5 truncate font-display text-base font-bold text-foreground">
            {player.nick}
          </h3>
          <p className="mt-1 truncate text-[11px] text-foreground/70">
            {team ? team.name : "Free agent"} · {player.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
        <KpiCell
          label="KDR"
          value={formatPlayerKd(player.stats.kd)}
          accent={player.stats.kd >= 2 ? "yellow" : "neutral"}
        />
        <KpiCell
          label="Winrate"
          value={`${winRatePct}%`}
          accent={winRatePct >= 60 ? "yellow" : "neutral"}
        />
        <KpiCell label="Matches" value={player.stats.matches.toString()} />
      </div>
    </Link>
  );
}
