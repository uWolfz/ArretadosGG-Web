"use client";

import Link from "next/link";
import Image from "next/image";
import { appNav } from "@/app/(app)/_config/app-nav";
import { getMockCurrentUser } from "@/app/(app)/_data/current-user";
import { AppNavLink } from "./components/app-nav-link";
import { AppHeaderNotifications } from "./components/app-header-notifications";
import { AppHeaderUserMenu } from "./components/app-header-user-menu";

export function AppHeader() {
  const user = getMockCurrentUser();

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="Arretados — Ir para home"
        >
          <Image
            src="/Logos - Institucional/Logo Arretados.png"
            alt="Arretados"
            width={2840}
            height={2708}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {appNav.map((item) => (
            <AppNavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AppHeaderNotifications />
          <AppHeaderUserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
