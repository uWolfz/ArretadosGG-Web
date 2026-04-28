import { AlertTriangleIcon } from "lucide-react";

export function SettingsMeNickChangeWarning() {
  return (
    <div className="mt-4 flex items-start gap-2 rounded-md border border-brand-yellow/40 bg-brand-yellow/5 p-3 text-xs text-brand-yellow">
      <AlertTriangleIcon
        className="mt-0.5 size-4 shrink-0"
        aria-hidden="true"
      />
      <p>
        <strong className="font-semibold">Nick:</strong> precisa bater com o
        jogo in-game. Divergência trava a apuração de stats pela organização.
      </p>
    </div>
  );
}
