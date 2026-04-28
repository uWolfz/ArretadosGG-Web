import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

type DetailBackLinkProps = {
  href: string;
  label: string;
};

export function DetailBackLink({ href, label }: DetailBackLinkProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
      <Link
        href={href}
        className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65 transition-colors hover:text-foreground"
      >
        <ChevronLeftIcon className="size-3.5" aria-hidden="true" />
        {label}
      </Link>
    </div>
  );
}
