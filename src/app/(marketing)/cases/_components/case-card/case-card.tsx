import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../accent";

type CaseCardProps = {
  data: CaseStudy;
};

export function CaseCard({ data }: CaseCardProps) {
  const accent = ACCENT[data.accent];
  const poster =
    data.media.type === "video" ? data.media.poster : data.media.src;

  return (
    <Link
      href={`/cases/${data.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-foreground/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-lg"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-neutral-900">
        <Image
          src={poster}
          alt={data.media.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="scale-[1.03] object-cover transition-transform duration-700 group-hover:scale-100"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-transparent to-transparent" />

        <span
          aria-hidden
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 ${accent.bg} px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-950`}
        >
          Case {data.code}
        </span>

        <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/90">
          {data.yearLabel.split(" · ")[0]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/65">
          {data.client}
        </span>
        <h3 className="mt-2 text-xl font-medium uppercase leading-[1.1] tracking-[-0.01em] text-foreground sm:text-2xl">
          {data.title}
        </h3>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-foreground/75">
          {data.summary}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {data.scope.slice(0, 3).map((s) => (
              <li
                key={s}
                className="rounded-sm bg-foreground/[0.07] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/85"
              >
                {s}
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition-all group-hover:translate-x-1 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
