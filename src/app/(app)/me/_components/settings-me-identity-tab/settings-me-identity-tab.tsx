import { AlertTriangleIcon } from "lucide-react";
import type { Player } from "@/app/(app)/_data/players";
import { formatShortDatePtBr } from "@/lib/format-date";
import { SettingsMeIdentityRow } from "./components/settings-me-identity-row";

type SettingsMeIdentityTabProps = {
  userSettingsMe: Player;
};

export function SettingsMeIdentityTab({
  userSettingsMe,
}: SettingsMeIdentityTabProps) {
  return (
    <div className="space-y-3">
      <SettingsMeIdentityRow
        labelSettingsMe="Celular"
        verifiedSettingsMe={userSettingsMe.verified.phone}
        hintSettingsMe="Número usado pra OTP SMS quando auth entrar (ADR-005)"
      />
      <SettingsMeIdentityRow
        labelSettingsMe="CPF"
        verifiedSettingsMe={userSettingsMe.verified.cpf}
        hintSettingsMe="Identidade validada (cap. 5 regulamento)"
      />
      <SettingsMeIdentityRow
        labelSettingsMe="ID do jogo"
        verifiedSettingsMe={userSettingsMe.verified.gameId}
        hintSettingsMe="Vinculação com o jogo pra apuração de stats"
      />

      {userSettingsMe.fraudTag ? (
        <div className="flex items-start gap-2 rounded-md border border-brand-red/40 bg-brand-red/10 p-4 text-brand-red">
          <AlertTriangleIcon className="mt-0.5 size-5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Tag anti-fraude ativa</p>
            <p className="mt-1 text-sm">
              {userSettingsMe.fraudTag.label} — desde{" "}
              {formatShortDatePtBr(userSettingsMe.fraudTag.since)}
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-border bg-card p-4 text-sm text-foreground/75">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
            Tag anti-fraude
          </p>
          <p className="mt-1">Nenhuma tag ativa.</p>
        </div>
      )}
    </div>
  );
}
