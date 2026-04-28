import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlayerIdentityRowProps = {
  label: string;
  ok: boolean;
};

export function PlayerIdentityRow({ label, ok }: PlayerIdentityRowProps) {
  return (
    <div className="flex items-center justify-between">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
        {label}
      </dt>
      <dd
        className={cn(
          "inline-flex items-center gap-1 text-xs font-semibold",
          ok ? "text-emerald-500" : "text-foreground/55",
        )}
      >
        {ok ? (
          <>
            <CheckCircle2Icon className="size-4" aria-hidden="true" />{" "}
            verificado
          </>
        ) : (
          <>
            <XCircleIcon className="size-4" aria-hidden="true" /> pendente
          </>
        )}
      </dd>
    </div>
  );
}
