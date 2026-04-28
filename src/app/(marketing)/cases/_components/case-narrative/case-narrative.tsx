import type {
  CaseAccent,
  CaseNarrative as CaseNarrativeType,
} from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../accent";
import { STEP_COLORS, STEPS } from "./constants";

type CaseNarrativeProps = {
  narrative: CaseNarrativeType;
  accent: CaseAccent;
};

export function CaseNarrative({ narrative, accent }: CaseNarrativeProps) {
  const blocks = [narrative.problem, narrative.solution, narrative.result];
  const sectionAccent = ACCENT[accent];

  return (
    <section
      aria-label="Como foi o case"
      className="relative bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-5 w-1.5 ${sectionAccent.bg}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Como foi
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-medium uppercase leading-[0.95] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-5xl">
              O problema,{" "}
              <span className={sectionAccent.text}>o que a gente fez</span> e{" "}
              <span className="text-foreground/55">o que ficou.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-foreground/75 sm:text-[1.05rem]">
            Sem cenário mastigado. É como a operação rodou por dentro — do
            briefing cru até o que sobrou depois que as luzes apagaram.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-5">
          {blocks.map((block, index) => {
            const step = STEPS[index];
            const color = STEP_COLORS[index];
            return (
              <article
                key={step.code}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card p-8 sm:p-9"
              >
                <span
                  aria-hidden
                  className={`absolute -right-3 -top-8 font-display text-[10rem] font-black leading-none tracking-[-0.04em] ${color.text} opacity-[0.08] sm:-right-1 sm:text-[12rem]`}
                >
                  {step.code}
                </span>
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-1 w-full ${color.bg}`}
                />

                <span
                  className={`inline-flex self-start items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${color.chip}`}
                >
                  {step.code} · {step.label}
                </span>

                <h3 className="mt-7 text-xl font-medium uppercase leading-[1.1] tracking-[-0.01em] text-foreground sm:text-2xl">
                  {block.heading}
                </h3>

                <p className="mt-5 text-base leading-relaxed text-foreground/75">
                  {block.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
