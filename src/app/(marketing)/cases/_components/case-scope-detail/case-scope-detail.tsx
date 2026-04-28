import type {
  CaseAccent,
  CaseScopeDetail as CaseScopeDetailType,
} from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../accent";

type CaseScopeDetailProps = {
  scopeDetail: CaseScopeDetailType[];
  accent: CaseAccent;
};

export function CaseScopeDetail({
  scopeDetail,
  accent,
}: CaseScopeDetailProps) {
  const color = ACCENT[accent];

  return (
    <section
      aria-label="Escopo detalhado do case"
      className="relative bg-neutral-950 py-24 text-white sm:py-28 lg:py-32"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 font-mono text-[clamp(8rem,18vw,14rem)] font-black uppercase leading-none tracking-[-0.04em] text-white/[0.035]"
      >
        / escopo
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-5 w-1.5 ${color.bg}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
                O que entregamos
              </span>
            </div>
            <h2 className="mt-6 text-4xl font-medium uppercase leading-[0.95] tracking-[-0.015em] text-white sm:text-5xl lg:text-[4rem]">
              Escopo não vive no{" "}
              <span className="text-white/45">contrato.</span>{" "}
              <span className={color.text}>Vive aqui.</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] text-white/55">
            Abrimos o bastidor da operação — frente por frente, com o que saiu
            do papel e ficou funcionando.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {scopeDetail.map((block, index) => (
            <article
              key={block.title}
              className="group relative flex flex-col overflow-hidden border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors hover:bg-white/[0.06] sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className={`font-mono text-[11px] font-bold uppercase tracking-[0.25em] ${color.text}`}
                >
                  Frente {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className={`h-6 w-6 -rotate-45 border border-white/20 transition-all duration-500 group-hover:rotate-0 ${color.groupHoverBorder}`}
                />
              </div>

              <h3 className="mt-6 text-2xl font-medium uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-[1.75rem]">
                {block.title}
              </h3>

              <ul className="mt-8 flex flex-col divide-y divide-white/10 text-sm leading-relaxed text-white/80">
                {block.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className={`mt-2 h-1.5 w-1.5 shrink-0 ${color.bg}`}
                    />
                    <span className="sm:text-[0.95rem]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
