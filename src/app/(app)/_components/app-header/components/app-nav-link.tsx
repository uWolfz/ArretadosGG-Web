"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { AppNavItem } from "@/app/(app)/_config/app-nav";

type AppNavLinkProps = {
  item: AppNavItem;
};

export function AppNavLink({ item }: AppNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  const baseClass =
    "relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md";

  if (!item.enabled) {
    return (
      <span
        className={cn(
          baseClass,
          "cursor-not-allowed text-foreground/40 select-none",
        )}
        aria-disabled="true"
        title="Em breve"
      >
        <item.icon className="size-4" />
        {item.label}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        baseClass,
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "text-foreground",
      )}
    >
      <item.icon className="size-4" />
      {item.label}
      {isActive && (
        <span className="absolute inset-x-3 -bottom-px h-0.5 bg-brand-yellow rounded-full" />
      )}
    </Link>
  );
}
