"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { appNav } from "@/app/(app)/_config/app-nav";

export function AppMobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegação principal"
    >
      <ul className="grid grid-cols-5">
        {appNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          const content = (
            <>
              <item.icon className="size-5" />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {item.label}
              </span>
            </>
          );

          const baseClass = "flex flex-col items-center justify-center gap-1 py-2.5";

          return (
            <li key={item.href} className="relative">
              {item.enabled ? (
                <Link
                  href={item.href}
                  className={cn(
                    baseClass,
                    "text-foreground/65 hover:text-foreground",
                    isActive && "text-foreground",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {content}
                  {isActive && (
                    <span className="absolute top-0 inset-x-0 h-0.5 bg-brand-yellow" />
                  )}
                </Link>
              ) : (
                <span
                  className={cn(
                    baseClass,
                    "text-foreground/40 cursor-not-allowed",
                  )}
                  aria-disabled="true"
                >
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
