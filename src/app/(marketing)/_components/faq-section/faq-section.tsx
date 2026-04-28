import { FAQS } from "./constants";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-px w-8 bg-brand-red" aria-hidden />
            Dúvidas frequentes
          </p>
          <h2
            id="faq-heading"
            className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            O que publishers e marcas{" "}
            <span className="text-muted-foreground">sempre perguntam.</span>
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-0 sm:mt-16 lg:grid-cols-2">
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="group border-b border-foreground/10 py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <span className="text-base font-medium leading-snug text-foreground sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition-all duration-300 group-hover:border-foreground/50 group-open:rotate-45 group-open:border-brand-red group-open:bg-brand-red group-open:text-white"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 flex max-w-xl flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
