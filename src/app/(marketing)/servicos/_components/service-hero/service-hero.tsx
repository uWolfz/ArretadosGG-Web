import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "@/components/shared/ambient-video";
import type { Service } from "@/app/(marketing)/_data/services";
import { ACCENT } from "../../../cases/_components/accent";

type ServiceHeroProps = {
  data: Service;
  totalServices: number;
  serviceIndex: number;
};

export function ServiceHero({
  data,
  totalServices,
  serviceIndex,
}: ServiceHeroProps) {
  const accent = ACCENT[data.accent];
  const serviceCode = String(serviceIndex + 1).padStart(2, "0");
  const totalLabel = String(totalServices).padStart(2, "0");

  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative isolate min-h-[80svh] overflow-hidden bg-neutral-900 text-white"
    >
      {(() => {
        const hero = data.heroMedia ?? data.media;
        return hero.type === "video" ? (
          <AmbientVideo
            src={hero.src}
            poster={hero.poster}
            alt={hero.alt}
            priority
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={hero.src}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        );
      })()}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,8,0.55)_0%,rgba(8,8,8,0.25)_25%,rgba(8,8,8,0.55)_55%,rgba(8,8,8,0.98)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,0.65)_0%,rgba(8,8,8,0.15)_40%,rgba(8,8,8,0)_60%,rgba(8,8,8,0.35)_85%,rgba(8,8,8,0.6)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[80svh] w-full max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-14 lg:pt-36">
        <div className="absolute left-4 right-4 top-24 flex items-center justify-between gap-4 sm:left-6 sm:right-6 sm:top-28 lg:left-8 lg:right-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm transition-colors hover:bg-black/55 hover:text-white"
          >
            <span
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Início
          </Link>
          <span className="rounded-full bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
            Serviço {serviceCode} / {totalLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden className={`inline-block h-5 w-1.5 ${accent.bg}`} />
              <span
                className={`font-mono text-xs uppercase tracking-[0.3em] ${accent.onDarkText}`}
              >
                {data.label}
              </span>
            </div>
            <h1
              id="service-hero-heading"
              className="mt-6 max-w-4xl text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-[-0.015em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
            >
              {data.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/95 sm:text-xl">
              {data.pitch}
            </p>
          </div>

          <dl className="lg:col-span-4 lg:border-l lg:border-white/25 lg:pl-10">
            <div className="flex flex-col gap-6">
              <div>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/85">
                  Quando contratar
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
                  {data.whenToHire}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
