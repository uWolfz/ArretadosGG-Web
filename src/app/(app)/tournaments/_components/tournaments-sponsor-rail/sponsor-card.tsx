import { cn } from "@/lib/utils";
import type { Sponsor } from "@/app/(app)/_data/sponsors";

const NOISE_BACKGROUND =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type SponsorCardProps = {
  sponsor: Sponsor;
};

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <a
      href={sponsor.href}
      className={cn(
        "group relative block h-64 overflow-hidden rounded-xl border border-border bg-gradient-to-b p-4 transition-all hover:border-foreground/30 hover:-translate-y-0.5",
        sponsor.tint,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_BACKGROUND }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
          Patrocínio
        </span>

        <div>
          <p className="font-display text-lg font-bold leading-tight text-white">
            {sponsor.name}
          </p>
          <p className="mt-1 text-xs text-white/75">{sponsor.tagline}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition-transform group-hover:translate-x-0.5">
            Saiba mais →
          </span>
        </div>
      </div>
    </a>
  );
}
