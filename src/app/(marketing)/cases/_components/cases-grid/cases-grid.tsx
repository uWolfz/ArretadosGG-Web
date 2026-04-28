import type { CaseStudy } from "@/app/(marketing)/_data/cases";
import { CaseCard } from "../case-card";

type CasesGridProps = {
  cases: CaseStudy[];
};

export function CasesGrid({ cases }: CasesGridProps) {
  return (
    <section
      aria-label="Lista de cases"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.slug} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
