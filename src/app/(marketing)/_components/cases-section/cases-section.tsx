import Link from "next/link";
import { CASES } from "@/app/(marketing)/_data/cases";
import { CaseRow } from "./case-row";

export function CasesSection() {
  return (
    <section
      aria-labelledby="cases-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-brand-green" aria-hidden />
              Cases selecionados
            </p>
            <h2
              id="cases-heading"
              className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Onde já entregamos.{" "}
              <span className="text-muted-foreground">Com nome, escopo e placar.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
            Recorte dos últimos eventos operados — do broadcast mensal à LAN
            regional. Mais cases em{" "}
            <Link
              href="/cases"
              className="underline underline-offset-4 hover:text-foreground"
            >
              /cases
            </Link>
            .
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-14 sm:mt-16 sm:gap-16 lg:gap-20">
          {CASES.map((c) => (
            <CaseRow key={c.slug} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
