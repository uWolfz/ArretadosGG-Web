import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import type { TournamentCaster } from "@/app/(app)/_data/tournaments";
import { cn } from "@/lib/utils";
import { getInitialsFromCasterName } from "../utils/get-initials-from-caster-name";
import { resolveExternalCasterHandleUrl } from "../utils/resolve-external-caster-handle-url";
import { resolveTournamentCaster } from "../utils/resolve-tournament-caster";

type TournamentCasterCardProps = {
  caster: TournamentCaster;
};

export function TournamentCasterCard({ caster }: TournamentCasterCardProps) {
  const resolved = resolveTournamentCaster(caster);
  const internalHref = resolved.internalPlayerTag
    ? `/casters/${resolved.internalPlayerTag}`
    : null;
  const externalHref =
    !internalHref && resolved.handle
      ? resolveExternalCasterHandleUrl(resolved.handle)
      : null;
  const initials = getInitialsFromCasterName(resolved.name);

  const body = (
    <>
      {resolved.photo ? (
        <Image
          src={resolved.photo}
          alt=""
          fill
          sizes="(max-width: 1024px) 45vw, 150px"
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/25 via-card to-background"
        >
          <span className="font-display text-4xl font-bold text-primary/80">
            {initials}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/10"
      />

      <div className="relative flex h-full flex-col justify-end gap-0.5 p-2.5">
        <p className="font-display text-[13px] font-semibold leading-tight text-foreground line-clamp-1">
          {resolved.name}
        </p>
        {resolved.role && (
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/70 line-clamp-1">
            {resolved.role}
          </p>
        )}
        {resolved.handle && (
          <p className="inline-flex items-center gap-1 font-mono text-[11px] text-foreground/75 line-clamp-1">
            <span className="truncate">{resolved.handle}</span>
            {externalHref && (
              <ExternalLinkIcon
                className="size-2.5 shrink-0 opacity-70"
                aria-hidden="true"
              />
            )}
          </p>
        )}
      </div>
    </>
  );

  const wrapperClass =
    "group relative flex aspect-[3/4] overflow-hidden rounded-md border border-border bg-card transition-colors";

  if (internalHref) {
    return (
      <Link
        href={internalHref}
        className={cn(wrapperClass, "hover:border-foreground/30")}
      >
        {body}
      </Link>
    );
  }

  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(wrapperClass, "hover:border-foreground/30")}
      >
        {body}
      </a>
    );
  }

  return <div className={wrapperClass}>{body}</div>;
}
