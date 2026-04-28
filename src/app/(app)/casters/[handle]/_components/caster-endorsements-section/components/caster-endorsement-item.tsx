import Image from "next/image";
import Link from "next/link";
import { QuoteIcon } from "lucide-react";
import type { CasterEndorsement } from "@/app/(app)/_data/casters";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { findTeamBySlug } from "@/app/(app)/_data/teams";

type CasterEndorsementItemProps = {
  endorsement: CasterEndorsement;
};

export function CasterEndorsementItem({
  endorsement,
}: CasterEndorsementItemProps) {
  const player = findPlayerByTag(endorsement.playerTag);
  const team = player?.currentTeam ? findTeamBySlug(player.currentTeam) : null;

  return (
    <li className="flex flex-col gap-3 rounded-md border border-border bg-card p-5">
      <QuoteIcon
        className="size-5 shrink-0 text-brand-yellow"
        aria-hidden="true"
      />
      <p className="text-sm italic leading-relaxed text-foreground/85">
        “{endorsement.quote}”
      </p>
      {player ? (
        <Link
          href={`/players/${player.tag}`}
          className="mt-auto flex items-center gap-3 border-t border-border pt-3 transition-colors hover:text-foreground"
        >
          <div className="size-10 overflow-hidden rounded-full bg-background ring-1 ring-border">
            <Image
              src={player.avatar}
              alt=""
              width={40}
              height={40}
              className="size-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-foreground">
              {player.nick}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-foreground/65">
              {team?.name ?? "Free agent"} · {player.location}
            </p>
          </div>
        </Link>
      ) : (
        <p className="mt-auto border-t border-border pt-3 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
          @{endorsement.playerTag}
        </p>
      )}
    </li>
  );
}
