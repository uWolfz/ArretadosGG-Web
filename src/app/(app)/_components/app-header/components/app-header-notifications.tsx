"use client";

import { BellIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMockNotificationsMe } from "@/app/(app)/_data/me-mocks";
import { MOCK_CURRENT_USER_TAG } from "@/app/(app)/_data/current-user";
import { AppHeaderPopover } from "./app-header-popover";

export function AppHeaderNotifications() {
  const notifications = getMockNotificationsMe(MOCK_CURRENT_USER_TAG);
  const unread = notifications.length;

  return (
    <AppHeaderPopover
      ariaLabel="Notificações"
      width={320}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={
            unread > 0
              ? `Notificações (${unread} não lidas)`
              : "Notificações"
          }
          onClick={toggle}
          className={cn(
            "relative grid size-9 place-items-center rounded-full border border-border bg-card text-foreground/75 outline-none transition-colors",
            "hover:border-foreground/30 hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-brand-yellow/70",
            open && "border-foreground/30 text-foreground",
          )}
        >
          <BellIcon className="size-4" aria-hidden="true" />
          {unread > 0 ? (
            <span
              className={cn(
                "absolute -right-0.5 -top-0.5 grid min-w-[18px] place-items-center rounded-full",
                "bg-brand-red px-1 font-mono text-[10px] font-semibold text-white",
              )}
              aria-hidden="true"
            >
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </button>
      )}
    >
      {() => (
        <div>
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75">
              Notificações
            </span>
            {unread > 0 ? (
              <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/60">
                {unread} recentes
              </span>
            ) : null}
          </div>
          {notifications.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-foreground/60">
              Nada por aqui.
            </p>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto divide-y divide-border">
              {notifications.map((n, i) => (
                <li
                  key={i}
                  className="px-3 py-2.5 text-sm leading-snug text-foreground/85"
                >
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </AppHeaderPopover>
  );
}
