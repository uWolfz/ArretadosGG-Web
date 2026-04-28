import Image from "next/image";
import { ExternalLinkIcon, PlayIcon } from "lucide-react";
import {
  formatCasterPeakViewers,
  type CasterRecentClip,
} from "@/app/(app)/_data/casters";
import { findTournamentBySlug } from "@/app/(app)/_data/tournaments";
import { formatDayMonthYearPtBr } from "@/lib/format-date";

type CasterClipCardProps = {
  clip: CasterRecentClip;
};

export function CasterClipCard({ clip }: CasterClipCardProps) {
  const tournament = clip.tournamentSlug
    ? findTournamentBySlug(clip.tournamentSlug)
    : null;

  return (
    <a
      href={clip.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-foreground/30"
    >
      <div className="relative aspect-video overflow-hidden bg-background">
        {clip.thumbnail ? (
          <Image
            src={clip.thumbnail}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-primary/25 via-card to-background"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="grid size-12 place-items-center rounded-full bg-brand-yellow text-background transition-transform group-hover:scale-110">
            <PlayIcon
              className="size-5 translate-x-[1px] fill-current"
              aria-hidden="true"
            />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded-sm bg-background/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground backdrop-blur-sm">
          {clip.duration}
        </span>
      </div>
      <div className="p-3">
        <h4 className="line-clamp-2 font-display text-sm font-bold text-foreground">
          {clip.title}
        </h4>
        <div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground/65">
          <span>{formatCasterPeakViewers(clip.views)} views</span>
          <span aria-hidden="true">·</span>
          <span>{formatDayMonthYearPtBr(clip.publishedAt)}</span>
        </div>
        {tournament && (
          <p className="mt-2 inline-flex items-center gap-1 truncate text-[11px] text-brand-yellow">
            <span className="truncate">{tournament.name}</span>
            <ExternalLinkIcon
              className="size-2.5 shrink-0"
              aria-hidden="true"
            />
          </p>
        )}
      </div>
    </a>
  );
}
