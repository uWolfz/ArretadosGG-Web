import { AlertTriangleIcon } from "lucide-react";

type TournamentRegistrationErrorAlertProps = {
  message: string;
};

export function TournamentRegistrationErrorAlert({
  message,
}: TournamentRegistrationErrorAlertProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-foreground/85"
    >
      <AlertTriangleIcon
        className="size-4 shrink-0 text-destructive"
        aria-hidden="true"
      />
      <div className="space-y-0.5">
        <p className="font-semibold text-destructive">
          Não foi possível enviar
        </p>
        <p className="text-foreground/75">{message}</p>
      </div>
    </div>
  );
}
