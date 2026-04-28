import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "@/components/shared/ambient-video";
import type { CaseStudy } from "@/app/(marketing)/_data/cases";

export function CaseRow({ data }: { data: CaseStudy }) {
  return (
    <article className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
      <Link
        href={`/cases/${data.slug}`}
        className="group relative col-span-1 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-950 lg:col-span-7"
      >
        {data.media.type === "video" ? (
          <AmbientVideo
            src={data.media.src}
            poster={data.media.poster}
            alt={data.media.alt}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="absolute inset-0 h-full w-full scale-105 object-cover brightness-105 saturate-110 transition-transform duration-700 group-hover:scale-100"
          />
        ) : (
          <Image
            src={data.media.src}
            alt={data.media.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="scale-105 object-cover transition-transform duration-700 group-hover:scale-100"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent"
        />
        <div className="absolute left-5 top-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/85">
          <span>Case {data.code} / 03</span>
        </div>
        <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">
            {data.yearLabel}
          </span>
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-red"
          >
            →
          </span>
        </div>
      </Link>

      <div className="col-span-1 flex flex-col lg:col-span-5 lg:py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {data.client}
        </span>
        <h3 className="mt-3 text-2xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {data.title}
        </h3>

        <ul className="mt-4 flex flex-wrap gap-2">
          {data.contextTags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
          {data.summary}
        </p>

        <dl className="mt-8 grid grid-cols-3 gap-x-4 border-y border-foreground/10 py-5">
          {data.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <dd className="text-xl font-medium leading-none tracking-tight text-foreground sm:text-2xl">
                {m.value}
              </dd>
              <dt className="mt-2 text-xs leading-tight text-muted-foreground sm:text-sm">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {data.scope.map((s) => (
            <li
              key={s}
              className="rounded-full border border-foreground/15 bg-card px-3 py-1 text-xs font-medium text-foreground/80"
            >
              {s}
            </li>
          ))}
        </ul>

        <Link
          href={`/cases/${data.slug}`}
          className="group/link mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover/link:border-brand-red">
            Ver case completo
          </span>
          <span
            aria-hidden
            className="transition-transform group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
