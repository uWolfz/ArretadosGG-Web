import type { CaseAccent } from "@/app/(marketing)/_data/cases";
import type { ServiceMethodologyStep } from "@/app/(marketing)/_data/services";
import { ACCENT } from "../../../cases/_components/accent";

type ServiceMethodologyProps = {
  methodology: ServiceMethodologyStep[];
  accent: CaseAccent;
};

export function ServiceMethodology({
  methodology,
  accent,
}: ServiceMethodologyProps) {
  const color = ACCENT[accent];

  return (
    <section
      aria-label="Como a gente roda"
      className="relative bg-neutral-950 py-20 text-white sm:py-24 lg:py-28"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 font-mono text-[clamp(8rem,18vw,14rem)] font-black uppercase leading-none tracking-[-0.04em] text-white/[0.035]"
      >
        / método
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-5 w-1.5 ${color.bg}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                Como a gente roda
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-medium uppercase leading-[0.95] tracking-[-0.015em] text-white sm:text-4xl lg:text-5xl">
              Três etapas,{" "}
              <span className={color.text}>nenhuma surpresa</span>.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-[1.05rem]">
            Do primeiro kickoff ao pós-evento — cada etapa com entregável
            definido.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 md:gap-5 lg:gap-6">
          {methodology.map((step, index) => (
            <li
              key={step.code}
              className="relative flex flex-col overflow-hidden border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.06] sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className={`font-mono text-[11px] font-bold uppercase tracking-[0.25em] ${color.text}`}
                >
                  Etapa {step.code}
                </span>
                {index < methodology.length - 1 ? (
                  <span
                    aria-hidden
                    className="font-mono text-xs text-white/40"
                  >
                    →
                  </span>
                ) : null}
              </div>

              <h3 className="mt-6 text-xl font-medium uppercase leading-[1.1] tracking-[-0.01em] text-white sm:text-2xl">
                {step.heading}
              </h3>

              <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-[0.95rem]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
