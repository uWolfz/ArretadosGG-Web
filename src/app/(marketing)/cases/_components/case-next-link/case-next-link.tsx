import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../accent";

type CaseNextLinkProps = {
  next: CaseStudy;
};

export function CaseNextLink({ next }: CaseNextLinkProps) {
  const poster =
    next.media.type === "video" ? next.media.poster : next.media.src;
  const color = ACCENT[next.accent];

  return (
    <section aria-label="Próximo case" className="bg-neutral-950 text-white">
      <div className={`${color.bg} text-neutral-950`}>
        <div
          aria-hidden
          className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden whitespace-nowrap px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] sm:gap-8 sm:px-6 lg:px-8"
        >
          <span>● Up next</span>
          <span className="opacity-50">Case {next.code}</span>
          <span>● {next.client}</span>
          <span className="opacity-50 hidden sm:inline">
            {next.yearLabel}
          </span>
          <span className="hidden sm:inline">● Arretados</span>
        </div>
      </div>

      <Link
        href={`/cases/${next.slug}`}
        className="group relative block overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
        </div>

        <span
          aria-hidden
          className={`pointer-events-none absolute right-[-2vw] top-1/2 -translate-y-1/2 font-mono text-[clamp(14rem,34vw,32rem)] font-black leading-[0.8] tracking-[-0.04em] text-white/[0.05]`}
        >
          {next.code}
        </span>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-8 lg:py-28">
          <div className="flex max-w-2xl flex-col">
            <span className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-5 w-1.5 ${color.bg}`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.3em] ${color.text}`}
              >
                Próximo case — {next.code}
              </span>
            </span>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-white/85">
              {next.client}
            </p>

            <h2 className="mt-4 text-[clamp(2.75rem,7.5vw,5rem)] font-medium uppercase leading-[0.9] tracking-[-0.015em] text-white">
              {next.title}
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              {next.summary}
            </p>
          </div>

          <span className="inline-flex items-center gap-4 self-start lg:self-end">
            <span
              className={`border-b-2 border-white/30 pb-1 font-mono text-xs font-bold uppercase tracking-[0.3em] text-white transition-colors ${color.groupHoverBorder} ${color.groupHoverText}`}
            >
              Abrir case
            </span>
            <span
              aria-hidden
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-950 ${color.groupHoverBg}`}
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </section>
  );
}
