"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useActiveRoute } from "@/hooks/use-active-route";

type NavLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

export function NavLink({ href, children, ...props }: NavLinkProps) {
  const isActive = useActiveRoute(String(href));

  return (
    <Link
      href={href}
      data-active={isActive || undefined}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}
