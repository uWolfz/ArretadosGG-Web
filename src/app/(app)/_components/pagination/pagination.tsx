"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

/**
 * Gera o array de números/ellipses a mostrar. Estratégia:
 * - ≤ 7 páginas: mostra tudo
 * - > 7: primeiro, último, current ± 1, com "..." preenchendo os gaps
 */
function buildPageList(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const windowStart = Math.max(2, current - 1);
  const windowEnd = Math.min(total - 1, current + 1);

  if (windowStart > 2) pages.push("ellipsis");
  for (let i = windowStart; i <= windowEnd; i++) pages.push(i);
  if (windowEnd < total - 1) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageList = buildPageList(page, totalPages);

  return (
    <nav
      aria-label="Paginação"
      className={cn("flex items-center justify-center gap-1 pt-6", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className={cn(
          "inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
          "hover:border-foreground/30 hover:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border",
          "text-foreground/70",
        )}
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <ul className="flex items-center gap-1">
        {pageList.map((entry, idx) => {
          if (entry === "ellipsis") {
            return (
              <li
                key={`ellipsis-${idx}`}
                className="px-1 text-xs text-foreground/40"
                aria-hidden="true"
              >
                …
              </li>
            );
          }

          const isCurrent = entry === page;
          return (
            <li key={entry}>
              <button
                type="button"
                onClick={() => onPageChange(entry)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Página ${entry}`}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-md border font-mono text-xs font-semibold tabular-nums transition-colors",
                  isCurrent
                    ? "border-brand-yellow/60 bg-brand-yellow/15 text-brand-yellow"
                    : "border-border bg-card text-foreground/70 hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {entry}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Próxima página"
        className={cn(
          "inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
          "hover:border-foreground/30 hover:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border",
          "text-foreground/70",
        )}
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

/**
 * Fatia um array pra uma página específica. Puro, sem state.
 */
export function sliceForPage<T>(
  list: T[],
  page: number,
  pageSize: number,
): T[] {
  const start = (page - 1) * pageSize;
  return list.slice(start, start + pageSize);
}

/**
 * Calcula número total de páginas pra um array dado um page size.
 */
export function totalPagesFor<T>(list: T[], pageSize: number): number {
  return Math.max(1, Math.ceil(list.length / pageSize));
}
