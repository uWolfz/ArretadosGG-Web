"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppHeaderPopoverProps = {
  trigger: (ctx: { open: boolean; toggle: () => void }) => ReactNode;
  children: (ctx: { close: () => void }) => ReactNode;
  ariaLabel: string;
  width?: number;
};

export function AppHeaderPopover({
  trigger,
  children,
  ariaLabel,
  width = 260,
}: AppHeaderPopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

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
    <div ref={containerRef} className="relative">
      {trigger({ open, toggle })}
      {open ? (
        <div
          role="menu"
          aria-label={ariaLabel}
          style={{ width }}
          className={cn(
            "absolute right-0 top-full z-50 mt-2 overflow-hidden",
            "rounded-md border border-border bg-card shadow-xl",
          )}
        >
          {children({ close })}
        </div>
      ) : null}
    </div>
  );
}
