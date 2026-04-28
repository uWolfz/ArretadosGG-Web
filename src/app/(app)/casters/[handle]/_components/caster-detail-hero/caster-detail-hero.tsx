"use client";

import Image from "next/image";
import {
  formatCasterRoleLabel,
  type Caster,
} from "@/app/(app)/_data/casters";
import type { Player } from "@/app/(app)/_data/players";
import { formatMonthYearPtBr } from "@/lib/format-date";
import { VerifiedBadge } from "@/components/badges";
import { buildCasterHireWhatsappUrl } from "./utils/build-caster-hire-whatsapp-url";
import { getCasterDisplayInitials } from "./utils/get-caster-display-initials";

type CasterDetailHeroProps = {
  casterDetailHero: Caster;
  playerDetailHero: Player | undefined;
};

export function CasterDetailHero({
  casterDetailHero,
  playerDetailHero,
}: CasterDetailHeroProps) {
  const displayNameDetailHero =
    playerDetailHero?.nick ?? casterDetailHero.playerTag;
  const initialsDetailHero = getCasterDisplayInitials(displayNameDetailHero);

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="relative size-32 shrink-0 overflow-hidden rounded-full bg-card p-1 ring-1 ring-border md:size-40">
            {casterDetailHero.photo ? (
              <Image
                src={casterDetailHero.photo}
                alt={`Foto de ${displayNameDetailHero}`}
                fill
                sizes="(max-width: 768px) 128px, 160px"
                className="size-full rounded-full object-cover"
                priority
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-1 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/25 via-card to-background"
              >
                <span className="font-display text-5xl font-bold text-primary/80">
                  {initialsDetailHero}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-md bg-brand-yellow/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-yellow">
                {formatCasterRoleLabel(casterDetailHero.role)}
              </span>
              <VerifiedBadge />
            </div>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground sm:text-4xl">
              {displayNameDetailHero}
            </h1>
            <p className="mt-2 text-sm text-foreground/75">
              {casterDetailHero.handle} ·{" "}
              {playerDetailHero?.location ?? "Brasil"} · No booth desde{" "}
              {formatMonthYearPtBr(casterDetailHero.approvedAt)}
            </p>

            {casterDetailHero.availableForHire && (
              <a
                href={buildCasterHireWhatsappUrl(displayNameDetailHero)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contratar
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
