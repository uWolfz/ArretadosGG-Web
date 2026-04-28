"use client";

import { useFormContext } from "react-hook-form";
import type { Player } from "@/app/(app)/_data/players";
import {
  CASTER_APPLICATION_ROLE_OPTIONS,
  type CasterApplicationFormValues,
} from "@/lib/schemas/caster-application-schema";

type SettingsMeCasterWizardStepReviewProps = {
  userSettingsMe: Player;
};

export function SettingsMeCasterWizardStepReview({
  userSettingsMe,
}: SettingsMeCasterWizardStepReviewProps) {
  const { watch } = useFormContext<CasterApplicationFormValues>();
  const valuesCasterStepReview = watch();
  const roleLabel =
    CASTER_APPLICATION_ROLE_OPTIONS.find(
      (o) => o.value === valuesCasterStepReview.role,
    )?.label ?? valuesCasterStepReview.role;

  return (
    <div className="space-y-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
          Revise antes de enviar
        </p>
        <h4 className="mt-1 font-display text-base font-bold text-foreground">
          Aplicação de {userSettingsMe.nick}
        </h4>
      </div>

      <dl className="space-y-3 divide-y divide-border">
        <div className="pb-3">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Papel preferido
          </dt>
          <dd className="mt-0.5 text-sm text-foreground">{roleLabel}</dd>
        </div>

        <div className="py-3">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Bio
          </dt>
          <dd className="mt-0.5 whitespace-pre-wrap text-sm text-foreground/85">
            {valuesCasterStepReview.bio}
          </dd>
        </div>

        <div className="py-3">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Handle público
          </dt>
          <dd className="mt-0.5 text-sm text-foreground">
            {valuesCasterStepReview.handle}
          </dd>
        </div>

        <div className="py-3">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Portfolio
          </dt>
          <dd className="mt-0.5">
            <ul className="space-y-1">
              {valuesCasterStepReview.portfolioLinks
                .filter((l) => l.length > 0)
                .map((link) => (
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

        <div className="pt-3">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-foreground/55">
            Sample work
          </dt>
          <dd className="mt-0.5">
            <a
              href={valuesCasterStepReview.sampleWorkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-yellow hover:underline"
            >
              {valuesCasterStepReview.sampleWorkUrl}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
