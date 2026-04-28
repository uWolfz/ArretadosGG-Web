import type {
  CaseAccent,
} from "@/app/(marketing)/_data/cases";
import type { ServiceDeliverable } from "@/app/(marketing)/_data/services";
import { ACCENT } from "../../../cases/_components/accent";

type ServiceDeliverablesProps = {
  deliverables: ServiceDeliverable[];
  accent: CaseAccent;
};

export function ServiceDeliverables({
  deliverables,
  accent,
}: ServiceDeliverablesProps) {
  const color = ACCENT[accent];

  return (
    <section
      aria-label="O que entregamos"
      className="relative bg-background py-20 sm:py-24 lg:py-28"
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
                O que entregamos
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-medium uppercase leading-[0.95] tracking-[-0.015em] text-foreground sm:text-4xl lg:text-5xl">
              No contrato{" "}
              <span className="text-foreground/55">e no evento.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-foreground/75 sm:text-[1.05rem]">
            O que rolou escrito e o que rolou de fato são a mesma coisa. Cada
            item aqui sai com dono e prazo.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 md:gap-6">
          {deliverables.map((item, index) => (
            <li
              key={item.title}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card p-7 sm:p-8"
            >
              <span
                aria-hidden
                className={`absolute left-0 top-0 h-1 w-full ${color.bg}`}
              />
              <span
                aria-hidden
                className={`font-mono text-[10px] font-bold uppercase tracking-[0.22em] ${color.text}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-medium uppercase leading-[1.1] tracking-[-0.01em] text-foreground sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
