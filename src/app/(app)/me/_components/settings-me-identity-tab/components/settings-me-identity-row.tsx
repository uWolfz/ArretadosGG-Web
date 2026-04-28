import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsMeIdentityRowProps = {
  labelSettingsMe: string;
  verifiedSettingsMe: boolean;
  hintSettingsMe: string;
};

export function SettingsMeIdentityRow({
  labelSettingsMe,
  verifiedSettingsMe,
  hintSettingsMe,
}: SettingsMeIdentityRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card p-4">
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-md",
          verifiedSettingsMe
            ? "bg-emerald-500/10 text-emerald-500"
            : "bg-foreground/5 text-foreground/55",
        )}
      >
        {verifiedSettingsMe ? (
          <CheckCircle2Icon className="size-5" aria-hidden="true" />
        ) : (
          <XCircleIcon className="size-5" aria-hidden="true" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-foreground">
          {labelSettingsMe}
        </p>
        <p className="text-xs text-foreground/70">{hintSettingsMe}</p>
      </div>
    </div>
  );
}
