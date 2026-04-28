"use client";

import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import type { Player } from "@/app/(app)/_data/players";
import {
  formatCasterRoleLabel,
  type Caster,
  type CasterRole,
} from "@/app/(app)/_data/casters";
import { toast } from "@/components/ui/toast-mock";
import { CASTER_APPLICATION_ROLE_OPTIONS } from "@/lib/schemas/caster-application-schema";
import { Input } from "@/components/ui/input";

type SettingsMeCasterApprovedEditProps = {
  userSettingsMe: Player;
  casterCasterTab: Caster;
};

export function SettingsMeCasterApprovedEdit({
  userSettingsMe,
  casterCasterTab,
}: SettingsMeCasterApprovedEditProps) {
  const [bioCasterApproved, setBioCasterApproved] = useState(
    casterCasterTab.bio,
  );
  const [handleCasterApproved, setHandleCasterApproved] = useState(
    casterCasterTab.handle,
  );
  const [roleCasterApproved, setRoleCasterApproved] = useState<CasterRole>(
    casterCasterTab.role,
  );
  const [photoCasterApproved, setPhotoCasterApproved] = useState(
    casterCasterTab.photo ?? "",
  );

  function handleSubmitCasterApprovedForm(event: React.FormEvent) {
    event.preventDefault();
    // Mock submit — in-memory, não persiste.
    casterCasterTab.bio = bioCasterApproved;
    casterCasterTab.handle = handleCasterApproved;
    casterCasterTab.role = roleCasterApproved;
    casterCasterTab.photo = photoCasterApproved || undefined;
    toast("Perfil de caster atualizado");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-md border border-green-500/30 bg-green-500/5 p-4">
        <div className="shrink-0 inline-flex size-10 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2Icon
            className="size-5 text-green-500"
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-green-500">
            Caster aprovado
          </span>
          <h3 className="mt-1 font-display text-base font-bold text-foreground">
            Bem-vindo ao booth, {userSettingsMe.nick}
          </h3>
          <p className="mt-1 text-xs text-foreground/70">
            Edite seu perfil público abaixo — aparece em /casters e nas
            páginas de torneio onde você casteia.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmitCasterApprovedForm}
        className="space-y-4 rounded-md border border-border bg-card p-5"
      >
        <div>
          <label
            htmlFor="caster-approved-bio"
            className="mb-1.5 inline-flex text-sm font-medium text-foreground"
          >
            Bio
          </label>
          <textarea
            id="caster-approved-bio"
            value={bioCasterApproved}
            onChange={(e) => setBioCasterApproved(e.target.value)}
            rows={5}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-foreground/50 focus-visible:border-brand-yellow focus-visible:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="caster-approved-handle"
              className="mb-1.5 inline-flex text-sm font-medium text-foreground"
            >
              Handle público
            </label>
            <Input
              id="caster-approved-handle"
              value={handleCasterApproved}
              onChange={(e) => setHandleCasterApproved(e.target.value)}
              placeholder="twitch.tv/seu-nick"
            />
          </div>
          <div>
            <label
              htmlFor="caster-approved-role"
              className="mb-1.5 inline-flex text-sm font-medium text-foreground"
            >
              Papel
            </label>
            <select
              id="caster-approved-role"
              value={roleCasterApproved}
              onChange={(e) =>
                setRoleCasterApproved(e.target.value as CasterRole)
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:border-brand-yellow focus-visible:outline-hidden"
            >
              {CASTER_APPLICATION_ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="caster-approved-photo"
            className="mb-1.5 inline-flex text-sm font-medium text-foreground"
          >
            Foto (URL)
          </label>
          <Input
            id="caster-approved-photo"
            value={photoCasterApproved}
            onChange={(e) => setPhotoCasterApproved(e.target.value)}
            placeholder="/eventos-web/..."
          />
          <p className="mt-1 text-[11px] text-foreground/65">
            Opcional — se vazio, renderiza iniciais.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <span className="mr-auto font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            {formatCasterRoleLabel(casterCasterTab.role)} · desde{" "}
            {new Date(casterCasterTab.approvedAt).getFullYear()}
          </span>
          <button
            type="submit"
            className="rounded-md bg-brand-yellow px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
