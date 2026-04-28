import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import type { CasterReview } from "@/app/(app)/_data/casters";
import { findPlayerByTag } from "@/app/(app)/_data/players";
import { formatDayMonthYearPtBr } from "@/lib/format-date";
import { cn } from "@/lib/utils";

type CasterReviewItemProps = {
  review: CasterReview;
};

export function CasterReviewItem({ review }: CasterReviewItemProps) {
  const author = findPlayerByTag(review.authorTag);

  return (
    <li className="rounded-md border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        {author ? (
          <Link
            href={`/players/${author.tag}`}
            aria-label={`Ver perfil de ${author.nick}`}
            className="shrink-0"
          >
            <div className="size-10 overflow-hidden rounded-full bg-background ring-1 ring-border">
              <Image
                src={author.avatar}
                alt=""
                width={40}
                height={40}
                className="size-full object-cover"
              />
            </div>
          </Link>
        ) : (
          <div
            aria-hidden="true"
            className="size-10 shrink-0 rounded-full bg-foreground/10"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-foreground">
                {author?.nick ?? review.authorTag}
              </p>
              <p className="mt-0.5 text-[11px] text-foreground/55">
                {formatDayMonthYearPtBr(review.createdAt)}
              </p>
            </div>
            <div
              aria-label={`Nota ${review.rating} de 5`}
              className="flex items-center gap-0.5"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  className={cn(
                    "size-3.5",
                    n <= review.rating
                      ? "fill-brand-yellow text-brand-yellow"
                      : "text-foreground/25",
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            {review.comment}
          </p>
        </div>
      </div>
    </li>
  );
}
