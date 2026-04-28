import Image from "next/image";
import Link from "next/link";
import { HERO_PHOTO } from "./constants";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[85svh] overflow-hidden bg-neutral-950 text-white"
    >
      <Image
        src={HERO_PHOTO.src}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/35"
      />

      <div className="relative mx-auto flex min-h-[70svh] w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
          <span className="h-px w-8 bg-brand-yellow" aria-hidden />
          Operação esports
        </p>

        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Operamos os esports que{" "}
          <span className="text-brand-red">movem marcas</span>.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Transmissão, liga, desenvolvimento e consultoria — ponta a ponta,
          com quem já entrega no Brasil há anos.
        </p>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
          <Link
            href="/contato"
            className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            Fale com a gente
          </Link>
          <Link
            href="/cases"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            Ver cases
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
