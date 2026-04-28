"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TournamentCore } from "@/app/(app)/_data/tournaments";
import {
  tournamentRegistrationSchema,
  tournamentRegistrationDefaultValues,
  type TournamentRegistrationFormData,
} from "@/lib/schemas/tournament-registration-schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TournamentRegistrationHeader } from "./components/tournament-registration-header";
import { TournamentRegistrationSuccessState } from "./components/tournament-registration-success-state";
import { TournamentRegistrationErrorAlert } from "./components/tournament-registration-error-alert";
import {
  FIELD_LABEL_CLASS,
  FIELD_INPUT_CLASS,
} from "./constants/tournament-registration-field-classes";
import { submitMockTournamentRegistration } from "./utils/submit-mock-tournament-registration";

type TournamentRegistrationDialogProps = {
  tournament: TournamentCore;
};

type TournamentRegistrationStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export function TournamentRegistrationDialog({
  tournament,
}: TournamentRegistrationDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<TournamentRegistrationStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<TournamentRegistrationFormData>({
    resolver: zodResolver(tournamentRegistrationSchema),
    defaultValues: tournamentRegistrationDefaultValues,
    mode: "onBlur",
  });

  const submittedEmail = form.getValues("captainEmail");
  const slotsLeft = tournament.teamsTotal - tournament.teamsRegistered;
  const isSubmitting = status === "submitting";

  function handleOpenChangeTournamentRegistration(next: boolean) {
    setOpen(next);
    if (!next) {
      form.reset(tournamentRegistrationDefaultValues);
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmitTournamentRegistration(
    data: TournamentRegistrationFormData,
  ) {
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitMockTournamentRegistration(tournament.slug, data);
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro inesperado ao enviar inscrição.",
      );
      setStatus("error");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeTournamentRegistration}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        Inscrever time
        <span aria-hidden="true">→</span>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="app-black bg-card text-foreground sm:max-w-lg p-0 gap-0 overflow-hidden border border-border ring-0"
      >
        {status === "success" ? (
          <TournamentRegistrationSuccessState
            tournament={tournament}
            captainEmail={submittedEmail}
          />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitTournamentRegistration)}
              className="flex flex-col"
              noValidate
            >
              <TournamentRegistrationHeader
                tournament={tournament}
                slotsLeft={slotsLeft}
              />

              <div className="flex flex-col gap-4 p-5">
                <div className="grid grid-cols-[1fr_110px] gap-3">
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={FIELD_LABEL_CLASS}>
                          Nome do time
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Fúria Vermelha"
                            maxLength={60}
                            className={FIELD_INPUT_CLASS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="teamTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={FIELD_LABEL_CLASS}>
                          Tag
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value.toUpperCase())
                            }
                            placeholder="FUR"
                            maxLength={4}
                            className={`${FIELD_INPUT_CLASS} font-mono uppercase tracking-wider text-center`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="captainEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={FIELD_LABEL_CLASS}>
                          E-mail do capitão
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="capitao@time.gg"
                            className={FIELD_INPUT_CLASS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="captainPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={FIELD_LABEL_CLASS}>
                          Telefone (WhatsApp)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            placeholder="(81) 99999-9999"
                            className={FIELD_INPUT_CLASS}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="captainDiscord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={FIELD_LABEL_CLASS}>
                        Discord do capitão
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="capitao#1234"
                          className={FIELD_INPUT_CLASS}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {status === "error" && (
                  <TournamentRegistrationErrorAlert message={errorMessage} />
                )}

                <p className="rounded-md border border-border bg-background/40 p-3 text-xs text-foreground/75">
                  Após o envio, a equipe valida a inscrição e libera o painel
                  para você registrar a line-up de {tournament.teamSize}.
                  Confirmação em até 48h.
                </p>
              </div>

              <footer className="flex items-center justify-end gap-2 border-t border-border bg-background/40 p-4">
                <DialogClose
                  type="button"
                  disabled={isSubmitting}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-60"
                >
                  Cancelar
                </DialogClose>
                <button
                  type="submit"
                  disabled={isSubmitting || slotsLeft === 0}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar inscrição
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </footer>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
