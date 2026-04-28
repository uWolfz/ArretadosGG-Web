"use client";

import { SparklesIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PlayerArtDialogProps = {
  nick: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TEMPLATES = [
  { key: "victory", label: "Vitória" },
  { key: "tournament", label: "Próximo campeonato" },
  { key: "milestone", label: "Conquista" },
];

export function PlayerArtDialog({
  nick,
  open,
  onOpenChange,
}: PlayerArtDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-foreground">
            Gerar arte de {nick}
          </DialogTitle>
          <DialogDescription className="text-sm text-foreground/75">
            Escolha um template. O gerador server-side está em desenvolvimento
            (cap. 5 do briefing).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {TEMPLATES.map((t) => (
            <div
              key={t.key}
              className="rounded-md border border-border bg-background p-4 text-center"
            >
              <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-md bg-brand-yellow/10 text-brand-yellow">
                <SparklesIcon className="size-5" aria-hidden="true" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/75">
                {t.label}
              </p>
            </div>
          ))}
        </div>

        <p className="rounded-sm border border-brand-yellow/40 bg-brand-yellow/5 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-brand-yellow">
          Em breve
        </p>
      </DialogContent>
    </Dialog>
  );
}
