"use client";

import { SettingsIcon, UserIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast-mock";
import type { Player } from "@/app/(app)/_data/players";
import { AppAvatar } from "./app-avatar";
import { AppHeaderPopover } from "./app-header-popover";
import { AppMenuItem } from "./app-menu-item";

type AppHeaderUserMenuProps = {
  user: Player;
};

export function AppHeaderUserMenu({ user }: AppHeaderUserMenuProps) {
  return (
    <AppHeaderPopover
      ariaLabel="Menu do usuário"
      width={220}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`Menu de ${user.nick}`}
          onClick={toggle}
          className="group inline-flex cursor-pointer items-center gap-1.5 outline-none"
        >
          <span
            className={cn(
              "rounded-full transition-[box-shadow]",
              "hover:ring-2 hover:ring-foreground/25",
              "group-focus-visible:ring-2 group-focus-visible:ring-brand-yellow/70",
              open && "ring-2 ring-foreground/25",
            )}
          >
            <AppAvatar src={user.avatar} alt={user.nick} size={28} />
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "h-2.5 w-3 shrink-0 text-foreground/60 transition-transform duration-200",
              open && "rotate-180 text-foreground",
            )}
          >
            <path d="m1 1.5 5 5 5-5" />
          </svg>
        </button>
      )}
    >
      {({ close }) => (
        <div className="py-1.5">
          <div className="px-3 py-2">
            <div className="font-display text-sm font-bold text-foreground">
              {user.nick}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/60">
              Modo demo
            </div>
          </div>
          <div className="my-1 h-px bg-border" />
          <AppMenuItem
            as="link"
            href={`/players/${user.tag}`}
            icon={<UserIcon className="size-4" aria-hidden="true" />}
            label="Meu perfil"
            onSelect={close}
          />
          <AppMenuItem
            as="link"
            href="/me"
            icon={<SettingsIcon className="size-4" aria-hidden="true" />}
            label="Configurações"
            onSelect={close}
          />
          <div className="my-1 h-px bg-border" />
          <AppMenuItem
            as="button"
            icon={<LogOutIcon className="size-4" aria-hidden="true" />}
            label="Sair"
            tone="danger"
            onSelect={() => {
              close();
              toast("Modo demo — logout desabilitado");
            }}
          />
        </div>
      )}
    </AppHeaderPopover>
  );
}

