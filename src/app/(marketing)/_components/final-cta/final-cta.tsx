import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "@/components/shared/icons";
import { CONTACT } from "@/lib/contact";
import { FINAL_CTA_PHOTOS } from "./constants";

const [PHOTO_BACK, PHOTO_FRONT] = FINAL_CTA_PHOTOS;

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-background px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-24"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand-green">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              Você chegou no fim da página.
            </p>

            <h2
              id="final-cta-heading"
              className="mt-5 max-w-xl text-balance text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Se chegou até aqui, é porque tá{" "}
              <span className="text-brand-yellow">interessado</span>.
            </h2>

            <div className="mt-10">
              <Link
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2.5 rounded-md bg-white px-6 text-sm font-medium text-brand-green transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              >
                <WhatsappIcon className="h-4 w-4" />
                Vai, clica nesse botão
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden px-6 py-10 sm:min-h-[480px] sm:px-10 lg:min-h-[520px] lg:py-12">
            <div className="absolute left-[8%] top-[8%] h-[68%] w-[58%] -rotate-3 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 sm:left-[10%]">
              <Image
                src={PHOTO_BACK.src}
                alt={PHOTO_BACK.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-[6%] right-[6%] h-[70%] w-[62%] rotate-[5deg] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
              <Image
                src={PHOTO_FRONT.src}
                alt={PHOTO_FRONT.alt}
                fill
                sizes="(min-width: 1024px) 32vw, 60vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
