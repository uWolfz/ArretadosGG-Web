import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "@/components/shared/ambient-video";
import type { CaseStudy } from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../accent";

type CaseDetailHeroProps = {
  data: CaseStudy;
  totalCases: number;
};

export function CaseDetailHero({ data, totalCases }: CaseDetailHeroProps) {
  const accent = ACCENT[data.accent];
  const totalLabel = String(totalCases).padStart(2, "0");

  return (
    <section
      aria-labelledby="case-hero-heading"
      className="relative isolate min-h-[80svh] overflow-hidden bg-neutral-900 text-white"
    >
      {(() => {
        const hero = data.heroMedia ?? data.media;
        return hero.type === "video" ? (
          <AmbientVideo
            src={hero.src}
            poster={hero.poster}
            alt={hero.alt}
            priority
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={hero.src}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        );
      })()}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,0.55)_0%,rgba(8,8,8,0.25)_25%,rgba(8,8,8,0.55)_55%,rgba(8,8,8,0.98)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,0.65)_0%,rgba(8,8,8,0.15)_40%,rgba(8,8,8,0)_60%,rgba(8,8,8,0.35)_85%,rgba(8,8,8,0.6)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[80svh] w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-14 lg:pt-36">
        <div className="absolute left-4 right-4 top-24 flex items-center justify-between gap-4 sm:left-6 sm:right-6 sm:top-28 lg:left-8 lg:right-8">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm transition-colors hover:bg-black/55 hover:text-white"
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Todos os cases
          </Link>
          <span className="rounded-full bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
            Case {data.code} / {totalLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden className={`inline-block h-5 w-1.5 ${accent.bg}`} />
              <span
                className={`font-mono text-xs uppercase tracking-[0.3em] ${accent.onDarkText}`}
              >
                {data.client}
              </span>
            </div>
            <h1
              id="case-hero-heading"
              className="mt-6 max-w-4xl text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.015em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            >
              {data.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/95 sm:text-xl">
              {data.summary}
            </p>
          </div>

          <dl className="lg:col-span-4 lg:border-l lg:border-white/25 lg:pl-10">
            <div className="grid grid-cols-2 gap-y-6 lg:grid-cols-1 lg:gap-y-7">
              <div>
                <dt
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/85"
                >
                  Quando
                </dt>
                <dd className="mt-2 font-medium uppercase leading-tight tracking-[-0.005em] text-white text-base sm:text-lg">
                  {data.yearLabel}
                </dd>
              </div>
              <div>
                <dt
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/85"
                >
                  Onde
                </dt>
                <dd className="mt-2 flex flex-col gap-0.5 font-medium uppercase leading-tight tracking-[-0.005em] text-white text-base sm:text-lg">
                  {data.contextTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </dd>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <dt
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/85"
                >
                  O que fizemos
                </dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {data.scope.map((s) => (
                    <span
                      key={s}
                      className={`${accent.bg} px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-950`}
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-6 sm:mt-12 sm:gap-8 sm:pt-8">
          {data.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="flex flex-col gap-1.5 border-l border-white/15 pl-4 first:border-l-0 first:pl-0 sm:pl-6 sm:first:pl-0"
            >
              <span
                aria-hidden
                className={`font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${accent.onDarkText}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <dd className="font-display text-2xl font-medium uppercase leading-[0.95] tracking-[-0.01em] text-white sm:text-3xl lg:text-4xl">
                {metric.value}
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-xs">
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
