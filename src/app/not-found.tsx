import Link from "next/link";
import { WhatsappIcon } from "@/components/shared/icons";
import { CONTACT } from "@/lib/contact";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 text-center sm:px-6 lg:px-8">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[clamp(14rem,40vw,30rem)] font-black leading-none tracking-[-0.04em] text-foreground/[0.045]"
      >
        404
      </span>

      <div className="relative flex max-w-2xl flex-col items-center">
        <div className="inline-flex items-center gap-3">
          <span aria-hidden className="inline-block h-5 w-1.5 bg-brand-red" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red">
            Página fora do ar
          </span>
        </div>

        <h1 className="mt-6 text-[clamp(2.5rem,7vw,5rem)] font-medium uppercase leading-[0.95] tracking-[-0.015em] text-foreground">
          Essa partida{" "}
          <span className="text-foreground/55">não rolou.</span>
        </h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/80">
          A página que você procurou saiu da programação — ou nunca entrou.
          Mas o campeonato continua rodando por aqui.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Voltar pra home
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/cases"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
          >
            Ver cases
          </Link>
          <Link
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-green px-6 text-sm font-medium text-white transition-colors hover:bg-brand-green/90"
          >
            <WhatsappIcon className="h-4 w-4" />
            Falar no WhatsApp
          </Link>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
          Code: 404 · Not_Found
        </p>
      </div>
    </main>
  );
}
