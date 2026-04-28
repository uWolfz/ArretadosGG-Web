import Link from "next/link";
import { AmbientVideo } from "@/components/shared/ambient-video";
import type { FeaturedService } from "./types";

export function FeaturedCard({ service }: { service: FeaturedService }) {
  return (
    <Link
      href={service.href}
      className="group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl bg-neutral-950 p-8 text-white md:col-span-2 md:row-span-2 md:min-h-[520px] lg:col-span-4 lg:p-10"
    >
      <AmbientVideo
        src={service.video.src}
        poster={service.video.poster}
        alt={service.label}
        className="absolute inset-0 h-full w-full scale-105 object-cover brightness-110 saturate-110 transition-transform duration-700 group-hover:scale-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-neutral-950/10"
      />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
            Destaque · ao vivo
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/50">
          {service.code} / 06
        </span>
      </div>

      <div className="relative max-w-xl">
        <h3 className="text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
          {service.label}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
          {service.summary}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white">
          <span className="border-b border-white/60 pb-0.5 transition-colors group-hover:border-brand-red">
            Ver serviço
          </span>
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
