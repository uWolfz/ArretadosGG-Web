"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { ServiceItem } from "@/config/nav";
import { cn } from "@/lib/utils";

type ServicesNavSheetProps = {
  label: string;
  services: ServiceItem[];
  icon?: ReactNode;
};

export function ServicesNavSheet({ label, services, icon }: ServicesNavSheetProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex min-h-14 w-full flex-col items-center justify-center gap-1 text-[10px] font-medium uppercase tracking-wide text-foreground/60 transition-colors",
          open && "text-primary",
        )}
      >
        {icon}
        <span>{label}</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Serviços"
          className="fixed inset-0 z-50 flex items-end md:hidden"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />

          <div className="relative flex w-full flex-col rounded-t-2xl bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
                Serviços
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-sm text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <ul className="flex max-h-[70vh] flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)]">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    onClick={() => setOpen(false)}
                    className="flex flex-col gap-1.5 border-b border-foreground/[0.06] px-5 py-4 last:border-b-0 active:bg-foreground/[0.04]"
                  >
                    <span className="text-base font-semibold leading-tight text-foreground">
                      {service.label}
                    </span>
                    <span className="text-sm leading-snug text-foreground/75">
                      {service.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
