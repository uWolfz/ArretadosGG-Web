"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon } from "lucide-react";
import type { Team } from "@/app/(app)/_data/teams";
import type { Player } from "@/app/(app)/_data/players";
import {
  createJoinRequestMock,
  type TeamJoinRequest,
} from "@/app/(app)/_data/team-join-requests";
import { findTeamBySlug } from "@/app/(app)/_data/teams";
import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  TeamJoinRequestSchema,
  TEAM_JOIN_REQUEST_DEFAULT_VALUES,
  TEAM_JOIN_REQUEST_MESSAGE_MAX_LENGTH,
  type TeamJoinRequestFormValues,
} from "@/lib/schemas/team-join-request-schema";
import { toast } from "@/components/ui/toast-mock";

type TeamJoinRequestDialogProps = {
  teamJoinRequest: Team;
  viewerJoinRequest: Player;
  openJoinRequestDialog: boolean;
  onOpenChangeJoinRequestDialog: (open: boolean) => void;
  onSubmittedJoinRequestDialog: (request: TeamJoinRequest) => void;
};

export function TeamJoinRequestDialog({
  teamJoinRequest,
  viewerJoinRequest,
  openJoinRequestDialog,
  onOpenChangeJoinRequestDialog,
  onSubmittedJoinRequestDialog,
}: TeamJoinRequestDialogProps) {
  const [submittingJoinRequest, setSubmittingJoinRequest] = useState(false);

  const formJoinRequest = useForm<TeamJoinRequestFormValues>({
    resolver: zodResolver(TeamJoinRequestSchema),
    defaultValues: TEAM_JOIN_REQUEST_DEFAULT_VALUES,
    mode: "onBlur",
  });

  const messageJoinRequest = formJoinRequest.watch("message") ?? "";
  const currentTeamJoinRequest = viewerJoinRequest.currentTeam
    ? findTeamBySlug(viewerJoinRequest.currentTeam) ?? null
    : null;
  const showLeaveWarningJoinRequest =
    !!currentTeamJoinRequest &&
    currentTeamJoinRequest.slug !== teamJoinRequest.slug;

  async function handleSubmitJoinRequestDialog(
    data: TeamJoinRequestFormValues,
  ) {
    setSubmittingJoinRequest(true);
    const request = createJoinRequestMock({
      teamSlug: teamJoinRequest.slug,
      playerTag: viewerJoinRequest.tag,
      message: data.message?.trim()
        ? data.message.trim()
        : undefined,
    });
    toast("Pedido enviado");
    setSubmittingJoinRequest(false);
    onSubmittedJoinRequestDialog(request);
  }

  return (
    <Dialog
      open={openJoinRequestDialog}
      onOpenChange={onOpenChangeJoinRequestDialog}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-card text-foreground sm:max-w-md p-0 gap-0 overflow-hidden border border-border"
      >
        <Form {...formJoinRequest}>
          <form
            onSubmit={formJoinRequest.handleSubmit(
              handleSubmitJoinRequestDialog,
            )}
            className="flex flex-col"
            noValidate
          >
            <header className="border-b border-border bg-background/40 p-5">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-yellow">
                Pedir pra entrar
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                {teamJoinRequest.name}
              </h3>
              <p className="mt-1 text-xs text-foreground/70">
                Um clique basta. Se quiser, mande uma mensagem pro capitão
                junto.
              </p>
            </header>

            <div className="flex flex-col gap-4 p-5">
              {showLeaveWarningJoinRequest && currentTeamJoinRequest && (
                <div className="flex items-start gap-2 rounded-md border border-brand-yellow/40 bg-brand-yellow/5 p-3">
                  <AlertTriangleIcon
                    className="size-4 shrink-0 text-brand-yellow"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-foreground/85">
                    Você é do{" "}
                    <strong className="font-semibold text-foreground">
                      {currentTeamJoinRequest.name}
                    </strong>
                    . Se o capitão do {teamJoinRequest.name} aceitar, você sai
                    do seu time atual automaticamente.
                  </p>
                </div>
              )}

              <FormField
                control={formJoinRequest.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Mensagem (opcional)
                      <span className="ml-2 font-mono text-[10px] font-normal text-foreground/55">
                        {messageJoinRequest.length}/
                        {TEAM_JOIN_REQUEST_MESSAGE_MAX_LENGTH}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        rows={4}
                        maxLength={TEAM_JOIN_REQUEST_MESSAGE_MAX_LENGTH}
                        placeholder="Ex: disponível pra treinos, main Hardpoint, já joguei na Série B..."
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-foreground/50 focus-visible:border-brand-yellow focus-visible:outline-hidden"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <footer className="flex items-center justify-end gap-2 border-t border-border bg-background/40 p-4">
              <DialogClose
                type="button"
                disabled={submittingJoinRequest}
                className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-semibold text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-60"
              >
                Cancelar
              </DialogClose>
              <button
                type="submit"
                disabled={submittingJoinRequest}
                className="inline-flex h-10 items-center justify-center rounded-md bg-brand-yellow px-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {submittingJoinRequest ? "Enviando..." : "Enviar pedido"}
              </button>
            </footer>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
