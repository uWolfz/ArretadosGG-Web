import { METRICS } from "./constants";

export function StatsBar() {
  return (
    <section
      aria-label="Números da operação"
      className="border-b border-foreground/10 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:gap-x-0">
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className="relative flex flex-col sm:px-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-foreground/10 sm:first:pl-0 sm:last:pr-0"
            >
              <span
                aria-hidden
                className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/60"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <dt className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {metric.label}
              </dt>
              <dd className="mt-3 text-4xl font-medium leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {metric.value}
              </dd>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {metric.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
