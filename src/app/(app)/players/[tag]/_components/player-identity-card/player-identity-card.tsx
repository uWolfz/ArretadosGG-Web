import { AlertTriangleIcon } from "lucide-react";
import type { Player } from "@/app/(app)/_data/players";
import {
  formatMonthYearPtBr,
  formatShortDatePtBr,
} from "@/lib/format-date";
import { PlayerIdentityRow } from "./components/player-identity-row";

type PlayerIdentityCardProps = {
  player: Player;
};

export function PlayerIdentityCard({ player }: PlayerIdentityCardProps) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
        Identidade
      </h2>
      <dl className="space-y-3 text-sm">
        <PlayerIdentityRow label="ID CODM" ok={player.verified.gameId} />
        <PlayerIdentityRow label="Celular" ok={player.verified.phone} />
        <PlayerIdentityRow label="CPF" ok={player.verified.cpf} />
        <div className="flex flex-col gap-0.5 border-t border-border pt-2">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">
            Joga desde
          </dt>
          <dd className="font-medium capitalize text-foreground">
            {formatMonthYearPtBr(player.joinedAt)}
          </dd>
        </div>
        {player.fraudTag && (
          <div className="flex items-start gap-2 rounded-sm bg-brand-red/10 p-2 text-brand-red">
            <AlertTriangleIcon className="mt-0.5 size-4" aria-hidden="true" />
            <div className="text-xs">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider">
                Tag de fraude ativa
              </p>
              <p>
                {player.fraudTag.label} — desde{" "}
                {formatShortDatePtBr(player.fraudTag.since)}
              </p>
            </div>
          </div>
        )}
      </dl>
    </div>
  );
}

