import { ExternalLinkIcon, PlayCircleIcon } from "lucide-react";
import type { Caster } from "@/app/(app)/_data/casters";

type CasterPortfolioLinksProps = {
  casterPortfolio: Caster;
};

export function CasterPortfolioLinks({
  casterPortfolio,
}: CasterPortfolioLinksProps) {
  return (
    <div className="space-y-3">
      <a
        href={casterPortfolio.sampleWorkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-md border border-border bg-card p-4 transition-colors hover:border-foreground/30"
      >
        <div className="shrink-0 inline-flex size-10 items-center justify-center rounded-full bg-brand-yellow/10">
          <PlayCircleIcon
            className="size-5 text-brand-yellow"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold text-foreground">
            Sample work oficial
          </p>
          <p className="truncate text-xs text-foreground/65">
            {casterPortfolio.sampleWorkUrl}
          </p>
        </div>
        <ExternalLinkIcon
          className="size-4 shrink-0 text-foreground/55 group-hover:text-foreground"
          aria-hidden="true"
        />
      </a>

      {casterPortfolio.portfolioLinks.length > 0 && (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {casterPortfolio.portfolioLinks.map((link) => (
            <li key={link}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors hover:border-foreground/30"
              >
                <ExternalLinkIcon
                  className="size-3.5 shrink-0 text-foreground/55"
                  aria-hidden="true"
                />
                <span className="truncate">{link}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
