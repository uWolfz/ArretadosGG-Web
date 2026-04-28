"use client";

import { useFormContext } from "react-hook-form";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CasterApplicationFormValues } from "@/lib/schemas/caster-application-schema";

export function SettingsMeCasterWizardStepPortfolio() {
  const { control, watch, setValue, formState, register, trigger } =
    useFormContext<CasterApplicationFormValues>();

  const portfolioLinksStepPortfolio = watch("portfolioLinks") ?? [""];

  function addPortfolioLinkStepPortfolio() {
    setValue("portfolioLinks", [...portfolioLinksStepPortfolio, ""], {
      shouldDirty: true,
    });
  }

  function removePortfolioLinkStepPortfolio(index: number) {
    const next = portfolioLinksStepPortfolio.filter((_, i) => i !== index);
    setValue("portfolioLinks", next.length > 0 ? next : [""], {
      shouldDirty: true,
    });
    void trigger("portfolioLinks");
  }

  const portfolioErrors = formState.errors.portfolioLinks;
  const rootPortfolioError =
    portfolioErrors && !Array.isArray(portfolioErrors)
      ? (portfolioErrors as { message?: string }).message
      : undefined;
  const portfolioItemErrors = Array.isArray(portfolioErrors)
    ? (portfolioErrors as Array<{ message?: string } | undefined>)
    : undefined;

  return (
    <div className="space-y-5">
      <FormField
        control={control}
        name="handle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Handle público</FormLabel>
            <FormControl>
              <Input
                placeholder="twitch.tv/seu-nick ou @seunick"
                {...field}
              />
            </FormControl>
            <p className="text-[11px] text-foreground/65">
              Nome que vai aparecer nos torneios que você casteia.
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        <label className="mb-1.5 inline-flex text-sm font-medium text-foreground">
          Links de portfolio
        </label>
        <p className="mb-2 text-[11px] text-foreground/65">
          Twitch, YouTube, X — pelo menos 1 link.
        </p>
        <div className="space-y-2">
          {portfolioLinksStepPortfolio.map((_, index) => {
            const fieldError = portfolioItemErrors?.[index];
            return (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="https://twitch.tv/..."
                    {...register(`portfolioLinks.${index}` as const)}
                  />
                  {fieldError?.message && (
                    <p className="mt-1 text-[11px] text-destructive">
                      {fieldError.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removePortfolioLinkStepPortfolio(index)}
                  disabled={portfolioLinksStepPortfolio.length <= 1}
                  aria-label="Remover link"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground/55 hover:text-foreground disabled:opacity-40"
                >
                  <TrashIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={addPortfolioLinkStepPortfolio}
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-yellow hover:opacity-80"
        >
          <PlusIcon className="size-3.5" aria-hidden="true" />
          Adicionar link
        </button>
        {rootPortfolioError && (
          <p className="mt-2 text-[11px] text-destructive">
            {rootPortfolioError}
          </p>
        )}
      </div>
    </div>
  );
}
