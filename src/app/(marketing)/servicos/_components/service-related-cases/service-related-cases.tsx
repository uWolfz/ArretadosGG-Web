import type { CaseAccent, CaseStudy } from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../../../cases/_components/accent";
import { CaseCard } from "../../../cases/_components/case-card";

type ServiceRelatedCasesProps = {
  cases: CaseStudy[];
  accent: CaseAccent;
};

export function ServiceRelatedCases({
  cases,
  accent,
}: ServiceRelatedCasesProps) {
  if (cases.length === 0) return null;
  const color = ACCENT[accent];

  return (
    <section
      aria-label="Cases que usaram este serviço"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-5 w-1.5 ${color.bg}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Prova de entrega
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-medium uppercase leading-[0.95] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-5xl">
              Onde a gente{" "}
              <span className="text-foreground/55">já rodou isso.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground/75 sm:text-[1.05rem]">
            Todos os cases listados aqui tiveram este serviço operado pelo
            nosso time.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.slug} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
