import Image from "next/image";
import Link from "next/link";
import type { Service } from "./types";

export function SecondaryCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-neutral-950 p-6 text-white transition-all duration-300 hover:shadow-xl sm:min-h-[360px] sm:p-7 lg:col-span-1 lg:min-h-[380px]"
    >
      <Image
        src={service.photo.src}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
        className="absolute inset-0 scale-105 object-cover brightness-105 transition-transform duration-700 group-hover:scale-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-neutral-950/10"
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/80">
          {service.code}
        </span>
        <span
          aria-hidden
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-brand-red"
        >
          →
        </span>
      </div>

      <div className="relative">
        <h3 className="text-xl font-medium leading-tight tracking-tight text-white sm:text-2xl">
          {service.label}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
          {service.summary}
        </p>
      </div>
    </Link>
  );
}
