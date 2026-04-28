"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";

const SCROLL_THRESHOLD = 24;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Arretados — Início" className="shrink-0">
          <Logo className="h-12 lg:h-16" />
        </Link>
        <DesktopNav onDark={!scrolled} />
      </div>
    </header>
  );
}
