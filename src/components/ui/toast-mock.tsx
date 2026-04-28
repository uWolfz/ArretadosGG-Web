"use client";

import { useEffect, useRef, useState } from "react";

type Listener = (msg: string) => void;
const listeners = new Set<Listener>();

export function toast(msg: string) {
  listeners.forEach((fn) => fn(msg));
}

export function ToastMockContainer() {
  const [msg, setMsg] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fn: Listener = (m) => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
      setMsg(m);
      timerRef.current = window.setTimeout(() => {
        setMsg(null);
        timerRef.current = null;
      }, 2500);
    };
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  if (!msg) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md border border-border bg-card px-4 py-2 text-sm text-foreground shadow-xl"
    >
      {msg}
    </div>
  );
}
