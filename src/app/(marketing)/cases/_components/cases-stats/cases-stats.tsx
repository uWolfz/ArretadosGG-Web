import { CASES_AGGREGATE_STATS } from "@/app/(marketing)/_data/cases";

const ACCENTS = [
  { bg: "bg-brand-green", text: "text-brand-green" },
  { bg: "bg-brand-yellow", text: "text-brand-yellow" },
  { bg: "bg-brand-red", text: "text-brand-red" },
  { bg: "bg-white", text: "text-white" },
];

export function CasesStats() {
  return (
    <section
      aria-label="Números agregados dos cases"
      className="relative overflow-hidden bg-neutral-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-yellow"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              Scoreboard · acumulado
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            {String(CASES_AGGREGATE_STATS.length).padStart(2, "0")} métricas
          </span>
        </div>

        <dl className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-4 lg:pt-12">
          {CASES_AGGREGATE_STATS.map((stat, index) => {
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <div
                key={stat.label}
                className="group relative flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 sm:first:border-l-0 sm:first:pl-0 lg:pl-7"
              >
                <span
                  aria-hidden
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(CASES_AGGREGATE_STATS.length).padStart(2, "0")}
                </span>
                <dd className="font-display text-[clamp(3.5rem,8.5vw,6rem)] font-medium uppercase leading-[0.9] tracking-[-0.02em] text-white">
                  {stat.value}
                </dd>
                <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/75">
                  <span aria-hidden className={`inline-block h-px w-5 ${accent.bg}`} />
                  {stat.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
