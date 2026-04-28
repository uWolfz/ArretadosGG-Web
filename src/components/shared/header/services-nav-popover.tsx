"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceItem } from "@/config/nav";
import { cn } from "@/lib/utils";

type ServicesNavPopoverProps = {
  label: string;
  services: ServiceItem[];
  onDark?: boolean;
};

export function ServicesNavPopover({
  label,
  services,
  onDark = false,
}: ServicesNavPopoverProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        onFocus={openNow}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide transition-colors",
          onDark
            ? "text-white/85 hover:text-white"
            : "text-foreground/70 hover:text-foreground",
          open &&
            (onDark
              ? "text-brand-yellow"
              : "text-primary"),
        )}
      >
        {label}
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "h-2.5 w-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path d="m1 1.5 5 5 5-5" />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-[min(560px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-2xl"
        >
          <ul className="grid grid-cols-1 divide-y divide-foreground/[0.06] sm:grid-cols-2 sm:divide-y-0">
            {services.map((service) => (
              <li
                key={service.href}
                className="sm:border-b sm:border-r sm:border-foreground/[0.06] sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <Link
                  href={service.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group flex h-full flex-col gap-2 px-6 py-5 transition-colors hover:bg-foreground/[0.04]"
                >
                  <span className="text-base font-semibold leading-tight text-foreground transition-colors group-hover:text-brand-red">
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
      ) : null}
    </div>
  );
}
