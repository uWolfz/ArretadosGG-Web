import { STEPS } from "./constants";

export function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-brand-yellow" aria-hidden />
            Como operamos
          </p>
          <h2
            id="process-heading"
            className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Três passos.{" "}
            <span className="text-muted-foreground">Sem handoff.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Você contrata um time que não passa a bola adiante. Da primeira
            call ao replay do último jogo, o responsável é o mesmo.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:mt-16 lg:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.code}
              className="flex flex-col gap-8 bg-card p-8 sm:p-10 lg:p-12"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                  Passo {step.code}
                </span>
                <span className="font-mono text-5xl font-medium leading-none text-foreground/12 tracking-tight lg:text-6xl">
                  {step.code}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </div>

              <ul className="mt-auto flex flex-col gap-2 border-t border-foreground/10 pt-6">
                {step.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <span
                      aria-hidden
                      className="h-px w-3 bg-brand-red"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
