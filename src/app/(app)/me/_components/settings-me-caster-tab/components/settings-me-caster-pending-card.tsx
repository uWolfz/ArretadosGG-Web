"use client";

import { ClockIcon } from "lucide-react";
import type { CasterApplication } from "@/app/(app)/_data/caster-applications";
import { formatDayMonthYearPtBr } from "@/lib/format-date";
import { formatCasterRoleLabel } from "@/app/(app)/_data/casters";

type SettingsMeCasterPendingCardProps = {
  applicationCasterTab: CasterApplication;
};

export function SettingsMeCasterPendingCard({
  applicationCasterTab,
}: SettingsMeCasterPendingCardProps) {
  const { form, submittedAt } = applicationCasterTab;
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
        <div className="shrink-0 inline-flex size-10 items-center justify-center rounded-full bg-brand-yellow/10">
          <ClockIcon className="size-5 text-brand-yellow" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-yellow">
            Aplicação pendente
          </span>
          <h3 className="mt-1 font-display text-base font-bold text-foreground">
            Enviada em {formatDayMonthYearPtBr(submittedAt)}
          </h3>
          <p className="mt-1 text-xs text-foreground/70">
            Nosso time vai revisar em até 5 dias úteis. Enquanto isso, dá pra
            revisar seus dados abaixo.
          </p>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card p-4 space-y-3">
        <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/65">
          O que você enviou
        </h4>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
              Papel preferido
            </dt>
            <dd className="mt-0.5 text-sm text-foreground">
              {formatCasterRoleLabel(form.role)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
              Handle público
            </dt>
            <dd className="mt-0.5 text-sm text-foreground">{form.handle}</dd>
          </div>
        </dl>

        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Bio
          </dt>
          <dd className="mt-0.5 whitespace-pre-wrap text-sm text-foreground/85">
            {form.bio}
          </dd>
        </div>

        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Portfolio
          </dt>
          <dd className="mt-0.5">
            <ul className="space-y-1">
              {form.portfolioLinks.map((link) => (
                <li key={link}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-yellow hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Sample work
          </dt>
          <dd className="mt-0.5">
            <a
              href={form.sampleWorkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-yellow hover:underline"
            >
              {form.sampleWorkUrl}
            </a>
          </dd>
        </div>
      </div>
    </div>
  );
}
