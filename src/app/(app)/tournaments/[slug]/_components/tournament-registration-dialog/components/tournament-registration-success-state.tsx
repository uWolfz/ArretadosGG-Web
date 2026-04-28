import { CheckCircle2Icon } from "lucide-react";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";

type TournamentRegistrationSuccessStateProps = {
  tournament: TournamentCore;
  captainEmail: string;
};

export function TournamentRegistrationSuccessState({
  tournament,
  captainEmail,
}: TournamentRegistrationSuccessStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 text-center">
      <div className="relative flex size-16 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full bg-[oklch(0.78_0.14_162)]/15"
          aria-hidden="true"
        />
        <CheckCircle2Icon
          className="relative size-12 text-[oklch(0.78_0.14_162)]"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      </div>

      <div className="space-y-2">
        <DialogTitle className="font-display text-2xl font-bold text-foreground">
          Inscrição enviada!
        </DialogTitle>
        <p className="text-sm text-foreground/75">
          A equipe da Arretados vai revisar a inscrição de{" "}
          <span className="font-semibold text-foreground">{tournament.name}</span>{" "}
          e entrar em contato{" "}
          {captainEmail ? (
            <>
              pelo e-mail{" "}
              <span className="font-mono text-foreground">{captainEmail}</span>
            </>
          ) : (
            "pelo e-mail do capitão"
          )}{" "}
          em até 48h.
        </p>
      </div>

      <DialogClose className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80">
        Fechar
      </DialogClose>
    </div>
  );
}
