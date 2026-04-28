import Image from "next/image";
import type {
  CaseAccent,
  CaseGalleryItem,
} from "@/app/(marketing)/_data/cases";
import { ACCENT } from "../accent";
import { TILE_STYLES } from "./constants";

type CaseGalleryProps = {
  gallery: CaseGalleryItem[];
  accent: CaseAccent;
};

export function CaseGallery({ gallery, accent }: CaseGalleryProps) {
  if (gallery.length === 0) return null;
  const color = ACCENT[accent];

  return (
    <section
      aria-label="Galeria do case"
      className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -left-4 top-10 font-mono text-[clamp(6rem,14vw,11rem)] font-black uppercase leading-none tracking-[-0.04em] ${color.text} opacity-[0.08]`}
      >
        Galeria
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block h-5 w-1.5 ${color.bg}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Registros · {String(gallery.length).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-6 text-4xl font-medium uppercase leading-[0.95] tracking-[-0.015em] text-foreground sm:text-5xl lg:text-[4rem]">
              De perto,{" "}
              <span className="text-foreground/55">sem filtro</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-foreground/75 sm:text-base">
            Frames da operação — jogadores, bastidor, cerimônia. Câmera na mão,
            evento rodando.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-12 md:gap-7">
          {gallery.map((item, index) => {
            const style = TILE_STYLES[index % TILE_STYLES.length];
            return (
              <figure
                key={item.src}
                className={`group relative ${style.span} ${style.offset} transition-transform duration-500 hover:rotate-0 hover:translate-y-0`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-neutral-950 shadow-xl ring-1 ring-black/5 transition-transform duration-500 ${style.rotation} ${style.aspect}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    className="scale-[1.03] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-100"
                  />
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-1 ${color.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <span
                    aria-hidden
                    className="absolute left-3 top-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/85 mix-blend-difference"
                  >
                    {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                  </span>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
