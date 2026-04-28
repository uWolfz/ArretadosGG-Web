import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";
import { ServicesNavSheet } from "./services-nav-sheet";

export function MobileTabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-6">
        {mainNav.map((item) => {
          const Icon = item.icon;

          if (item.children && item.children.length > 0) {
            return (
              <li key={item.href}>
                <ServicesNavSheet
                  label={item.label}
                  services={item.children}
                  icon={Icon ? <Icon className="size-5" /> : null}
                />
              </li>
            );
          }

          return (
            <li key={item.href}>
              <NavLink
                href={item.href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] font-medium uppercase tracking-wide text-foreground/60 transition-colors",
                  "data-[active=true]:text-primary",
                )}
              >
                {Icon ? <Icon className="size-5" /> : null}
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
