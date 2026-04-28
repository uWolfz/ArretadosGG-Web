import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { TESTIMONIAL } from "./constants";

export function TestimonialSection() {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="flex flex-col justify-center bg-neutral-950 px-6 py-20 text-white sm:px-12 sm:py-24 lg:px-16 lg:py-28">
        <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
          <span className="h-px w-8 bg-brand-red" aria-hidden />
          Quem confia
        </p>

        <blockquote
          id="testimonial-heading"
          className="mt-8 max-w-xl text-balance text-xl font-medium leading-[1.28] tracking-tight text-white sm:text-2xl lg:text-3xl"
        >
          <span className="mr-2 align-top font-serif text-4xl leading-none text-brand-red sm:text-5xl">
            “
          </span>
          {TESTIMONIAL.quote}
          <span className="ml-1 font-serif text-4xl leading-none text-brand-red sm:text-5xl">
            ”
          </span>
        </blockquote>

        <figcaption className="mt-10 flex items-center gap-4 border-t border-white/15 pt-8">
          <div
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white/80"
          >
            {TESTIMONIAL.author
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium text-white">
              {TESTIMONIAL.author}
            </span>
            <span className="text-sm text-white/60">{TESTIMONIAL.role}</span>
          </div>
        </figcaption>
      </div>

      <div className="flex flex-col justify-center bg-brand-green px-6 py-20 text-white sm:px-12 sm:py-24 lg:px-16 lg:py-28">
        <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
          <span className="h-px w-8 bg-brand-yellow" aria-hidden />
          Pronto pra conversar
        </p>

        <h2 className="mt-6 max-w-xl text-balance text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
          Seu próximo evento,{" "}
          <span className="text-brand-yellow">operado por quem entende.</span>
        </h2>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
          Conta o formato, o jogo e a audiência. Desenhamos a operação do
          seu campeonato do zero — broadcast, liga, software e consultoria
          sob o mesmo teto.
        </p>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-brand-green transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          >
            Agendar uma conversa
            <span aria-hidden>→</span>
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
