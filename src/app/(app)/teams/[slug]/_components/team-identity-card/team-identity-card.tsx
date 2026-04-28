import Image from "next/image";
import Link from "next/link";
import { CrownIcon, MapPinIcon, UsersIcon } from "lucide-react";
import type { Team, TeamTier } from "@/app/(app)/_data/teams";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { GAME_LABELS_LONG } from "@/app/(app)/_data/games";
import { GameBadge } from "@/components/badges";
import { cn } from "@/lib/utils";

type TeamIdentityCardProps = {
  teamIdentityCard: Team;
};

const TIER_LABEL: Record<TeamTier, string> = {
  pro: "Profissional (PRO)",
  contender: "Acesso",
  amador: "Amador",
};

const TIER_DOT_CLASS: Record<TeamTier, string> = {
  pro: "bg-brand-yellow",
  contender: "bg-foreground/50",
  amador: "bg-foreground/25",
};

export function TeamIdentityCard({
  teamIdentityCard,
}: TeamIdentityCardProps) {
  const captain = teamIdentityCard.captainTag
    ? findPlayerByTag(teamIdentityCard.captainTag)
    : null;

  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
        Identidade
      </h2>
      <dl className="space-y-3 text-sm">
        <div className="flex items-start justify-between gap-3">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
            Categoria
          </dt>
          <dd className="inline-flex items-center gap-2 font-semibold text-foreground">
            <span
              aria-hidden="true"
              className={cn(
                "size-2 rounded-full",
                TIER_DOT_CLASS[teamIdentityCard.tier],
              )}
            />
            {TIER_LABEL[teamIdentityCard.tier]}
          </dd>
        </div>

        <div className="flex items-start justify-between gap-3">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
            Jogo principal
          </dt>
          <dd className="inline-flex items-center gap-2 text-foreground">
            <GameBadge game={teamIdentityCard.primaryGame} size="sm" />
            <span className="text-[11px] text-foreground/75">
              {GAME_LABELS_LONG[teamIdentityCard.primaryGame]}
            </span>
          </dd>
        </div>

        <div className="flex items-start justify-between gap-3">
          <dt className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground/65">
            <MapPinIcon className="size-3" aria-hidden="true" />
            Local
          </dt>
          <dd className="font-medium text-foreground">
            {teamIdentityCard.location}
          </dd>
        </div>

        <div className="flex items-start justify-between gap-3">
          <dt className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground/65">
            <UsersIcon className="size-3" aria-hidden="true" />
            Roster
          </dt>
          <dd className="font-medium text-foreground">
            {teamIdentityCard.roster.length} /{" "}
            {teamIdentityCard.membersCount} vagas
          </dd>
        </div>

        {captain && (
          <div className="border-t border-border pt-3">
            <dt className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground/65">
              <CrownIcon className="size-3 text-brand-yellow" aria-hidden="true" />
              Capitão
            </dt>
            <dd className="mt-2">
              <Link
                href={`/players/${captain.tag}`}
                className="flex items-center gap-2.5 rounded-md border border-border bg-background/60 p-2 transition-colors hover:border-foreground/30"
              >
                <div className="size-8 shrink-0 overflow-hidden rounded-full bg-card ring-1 ring-border">
                  <Image
                    src={captain.avatar}
                    alt=""
                    width={32}
                    height={32}
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-foreground">
                    {captain.nick}
                  </p>
                  <p className="truncate text-[11px] text-foreground/70">
                    {captain.location}
                  </p>
                </div>
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
