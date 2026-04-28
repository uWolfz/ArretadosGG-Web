"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import {
  computeCasterAverageRating,
  formatCasterRoleShort,
  type Caster,
} from "@/app/(app)/_data/casters";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { getInitialsFromCasterLabel } from "./utils/get-initials-from-caster-label";

type CasterCardProps = {
  caster: Caster;
};

export function CasterCard({ caster }: CasterCardProps) {
  const playerCasterCard = findPlayerByTag(caster.playerTag);
  const displayNameCasterCard = playerCasterCard?.nick ?? caster.playerTag;
  const initialsCasterCard = getInitialsFromCasterLabel(displayNameCasterCard);
  const averageRatingCasterCard = computeCasterAverageRating(caster);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        href={`/casters/${caster.playerTag}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-xl"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-card ring-1 ring-border">
          {caster.photo ? (
            <Image
              src={caster.photo}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 360px"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/25 via-card to-background"
            >
              <span className="font-display text-5xl font-bold text-primary/80">
                {initialsCasterCard}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-start gap-3">
          <div className="relative shrink-0">
            {playerCasterCard?.avatar ? (
              <Image
                src={playerCasterCard.avatar}
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full object-cover ring-2 ring-card"
              />
            ) : (
              <div
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary/25 via-card to-background ring-2 ring-card"
              >
                <span className="font-display text-xs font-bold text-primary/80">
                  {initialsCasterCard}
                </span>
              </div>
            )}
            <span
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-brand-yellow px-1.5 py-[1px] font-mono text-[9px] font-bold uppercase tracking-wider text-background"
              aria-hidden="true"
            >
              {formatCasterRoleShort(caster.role)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-sm font-bold text-foreground">
              {displayNameCasterCard}
            </h3>
            {playerCasterCard?.location && (
              <p className="mt-0.5 truncate text-xs text-foreground/70">
                {playerCasterCard.location}
              </p>
            )}
          </div>

          {averageRatingCasterCard !== null && (
            <span className="inline-flex items-center gap-1 shrink-0 font-mono text-sm font-semibold text-foreground">
              <StarIcon
                className="size-3.5 fill-brand-yellow text-brand-yellow"
                aria-hidden="true"
              />
              <span className="tabular-nums">
                {averageRatingCasterCard.toFixed(1)}
              </span>
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
