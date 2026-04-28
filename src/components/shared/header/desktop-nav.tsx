import { mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";
import { ServicesNavPopover } from "./services-nav-popover";

type DesktopNavProps = {
  onDark?: boolean;
};

export function DesktopNav({ onDark = false }: DesktopNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="hidden items-center gap-8 md:flex"
    >
      {mainNav
        .filter((item) => item.href !== "/")
        .map((item) => {
          if (item.children && item.children.length > 0) {
            return (
              <ServicesNavPopover
                key={item.href}
                label={item.label}
                services={item.children}
                onDark={onDark}
              />
            );
          }
          if (item.cta) {
            return (
              <NavLink
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {item.label}
              </NavLink>
            );
          }
          return (
            <NavLink
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wide transition-colors",
                onDark
                  ? "text-white/85 hover:text-white data-[active=true]:text-brand-yellow data-[active=true]:font-semibold"
                  : "text-foreground/70 hover:text-foreground data-[active=true]:text-primary data-[active=true]:font-semibold",
              )}
            >
              {item.label}
            </NavLink>
          );
        })}
    </nav>
  );
}
