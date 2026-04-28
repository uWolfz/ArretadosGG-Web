"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "lucide-react";
import type { Player } from "@/app/(app)/_data/players";
import {
  createCasterApplicationMock,
  type CasterApplication,
} from "@/app/(app)/_data/caster-applications";
import {
  CasterApplicationSchema,
  CASTER_APPLICATION_DEFAULT_VALUES,
  type CasterApplicationFormValues,
} from "@/lib/schemas/caster-application-schema";
import { toast } from "@/components/ui/toast-mock";
import { cn } from "@/lib/utils";
import { SettingsMeCasterWizardStepperBar } from "./settings-me-caster-wizard-stepper-bar";
import { SettingsMeCasterWizardStepBio } from "./settings-me-caster-wizard-step-bio";
import { SettingsMeCasterWizardStepPortfolio } from "./settings-me-caster-wizard-step-portfolio";
import { SettingsMeCasterWizardStepSample } from "./settings-me-caster-wizard-step-sample";
import { SettingsMeCasterWizardStepReview } from "./settings-me-caster-wizard-step-review";

type SettingsMeCasterApplicationWizardProps = {
  userSettingsMe: Player;
  onCancelCasterWizard: () => void;
  onSubmittedCasterWizard: (submitted: CasterApplication) => void;
};

type CasterWizardStepIndex = 0 | 1 | 2 | 3;

const CASTER_WIZARD_STEP_FIELDS: ReadonlyArray<
  ReadonlyArray<keyof CasterApplicationFormValues>
> = [
  ["bio", "role"],
  ["handle", "portfolioLinks"],
  ["sampleWorkUrl"],
  [],
];

const CASTER_WIZARD_STEP_LABELS = [
  "Bio + papel",
  "Portfolio",
  "Sample work",
  "Revisão",
] as const;

export function SettingsMeCasterApplicationWizard({
  userSettingsMe,
  onCancelCasterWizard,
  onSubmittedCasterWizard,
}: SettingsMeCasterApplicationWizardProps) {
  const [stepCasterWizard, setStepCasterWizard] =
    useState<CasterWizardStepIndex>(0);

  const formCasterWizard = useForm<CasterApplicationFormValues>({
    resolver: zodResolver(CasterApplicationSchema),
    defaultValues: CASTER_APPLICATION_DEFAULT_VALUES,
    mode: "onChange",
  });

  async function handleNextStepCasterWizard() {
    const fieldsCasterWizard = CASTER_WIZARD_STEP_FIELDS[stepCasterWizard]!;
    const isValidCasterWizard = await formCasterWizard.trigger(
      fieldsCasterWizard,
    );
    if (!isValidCasterWizard) return;
    if (stepCasterWizard < 3) {
      setStepCasterWizard((stepCasterWizard + 1) as CasterWizardStepIndex);
    }
  }

  function handlePrevStepCasterWizard() {
    if (stepCasterWizard > 0) {
      setStepCasterWizard((stepCasterWizard - 1) as CasterWizardStepIndex);
    }
  }

  async function handleSubmitCasterWizardApplication() {
    const isValidCasterWizard = await formCasterWizard.trigger();
    if (!isValidCasterWizard) return;
    const valuesCasterWizard = formCasterWizard.getValues();
    const submitted = createCasterApplicationMock({
      playerTag: userSettingsMe.tag,
      bio: valuesCasterWizard.bio,
      handle: valuesCasterWizard.handle,
      role: valuesCasterWizard.role,
      portfolioLinks: valuesCasterWizard.portfolioLinks.filter(
        (l) => l.length > 0,
      ),
      sampleWorkUrl: valuesCasterWizard.sampleWorkUrl,
    });
    toast("Aplicação enviada — boa sorte");
    onSubmittedCasterWizard(submitted);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Aplicação de caster
          </h3>
          <p className="mt-0.5 text-xs text-foreground/65">
            Etapa {stepCasterWizard + 1} de 4 ·{" "}
            {CASTER_WIZARD_STEP_LABELS[stepCasterWizard]}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancelCasterWizard}
          className="font-mono text-[11px] uppercase tracking-wider text-foreground/65 hover:text-foreground"
        >
          Cancelar
        </button>
      </div>

      <SettingsMeCasterWizardStepperBar
        stepCasterWizard={stepCasterWizard}
        labelsCasterWizard={CASTER_WIZARD_STEP_LABELS}
      />

      <FormProvider {...formCasterWizard}>
        <div className="rounded-md border border-border bg-card p-5">
          {stepCasterWizard === 0 && <SettingsMeCasterWizardStepBio />}
          {stepCasterWizard === 1 && <SettingsMeCasterWizardStepPortfolio />}
          {stepCasterWizard === 2 && <SettingsMeCasterWizardStepSample />}
          {stepCasterWizard === 3 && (
            <SettingsMeCasterWizardStepReview
              userSettingsMe={userSettingsMe}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevStepCasterWizard}
            disabled={stepCasterWizard === 0}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/75",
              stepCasterWizard === 0
                ? "opacity-50"
                : "hover:text-foreground",
            )}
          >
            <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
            Voltar
          </button>

          {stepCasterWizard < 3 ? (
            <button
              type="button"
              onClick={handleNextStepCasterWizard}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-yellow px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
            >
              Próximo
              <ArrowRightIcon className="size-3.5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitCasterWizardApplication}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-yellow px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-background hover:opacity-90"
            >
              <CheckIcon className="size-3.5" aria-hidden="true" />
              Enviar aplicação
            </button>
          )}
        </div>
      </FormProvider>
    </div>
  );
}
