import { FEATURED, SECONDARY } from "./constants";
import { FeaturedCard } from "./featured-card";
import { SecondaryCard } from "./secondary-card";

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-brand-red" aria-hidden />
              O que fazemos
            </p>
            <h2
              id="services-heading"
              className="mt-5 text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Operação completa de esports,{" "}
              <span className="text-muted-foreground">
                sem intermediário.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
            Um time, seis frentes — do regulamento de liga ao broadcast no ar,
            passando pelo software que segura a operação.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <FeaturedCard service={FEATURED} />
          {SECONDARY.map((service) => (
            <SecondaryCard key={service.href} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
