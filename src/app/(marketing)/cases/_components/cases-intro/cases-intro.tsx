export function CasesIntro() {
  return (
    <section
      aria-labelledby="cases-intro-heading"
      className="relative overflow-hidden bg-background pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-24"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 top-16 font-mono text-[clamp(7rem,18vw,16rem)] font-black uppercase leading-none tracking-[-0.04em] text-brand-green/[0.08] sm:top-20"
      >
        Cases
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-foreground/10 pb-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Live · Arretados · Cases 01–03
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            2025 / 2026
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-12 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden className="inline-block h-5 w-1.5 bg-brand-green" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Portfolio / 03 eventos
              </span>
            </div>
            <h1
              id="cases-intro-heading"
              className="mt-7 text-[clamp(2.75rem,8vw,6rem)] font-medium uppercase leading-[0.9] tracking-[-0.015em] text-foreground"
            >
              O que a gente{" "}
              <span className="text-muted-foreground">operou</span> de{" "}
              <span className="text-brand-green">ponta a ponta</span>.
            </h1>
          </div>

          <div className="flex max-w-md flex-col gap-5 border-l border-foreground/15 pl-6 lg:max-w-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              /README
            </span>
            <p className="text-base leading-relaxed text-foreground/80 sm:text-lg">
              Sem fornecedor em cadeia. A Arretados segura regulamento,
              broadcast, software e audiovisual no mesmo teto — três cases, uma
              operação só.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
