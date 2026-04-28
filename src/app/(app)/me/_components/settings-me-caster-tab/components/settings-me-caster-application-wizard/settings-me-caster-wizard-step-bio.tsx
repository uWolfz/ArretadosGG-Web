"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CASTER_APPLICATION_ROLE_OPTIONS,
  type CasterApplicationFormValues,
} from "@/lib/schemas/caster-application-schema";
import { cn } from "@/lib/utils";

export function SettingsMeCasterWizardStepBio() {
  const { control, watch } = useFormContext<CasterApplicationFormValues>();

  const bioValueCasterStepBio = watch("bio") ?? "";
  const bioLenCasterStepBio = bioValueCasterStepBio.trim().length;

  return (
    <div className="space-y-5">
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Conta sua história em narração
              <span className="ml-2 font-mono text-[10px] font-normal text-foreground/55">
                {bioLenCasterStepBio}/500
              </span>
            </FormLabel>
            <FormControl>
              <textarea
                rows={6}
                placeholder="Quem você é, onde narra, experiência anterior, estilo... 80 caracteres no mínimo."
                className={cn(
                  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-foreground/50 focus-visible:border-brand-yellow focus-visible:outline-hidden",
                )}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Papel preferido</FormLabel>
            <FormControl>
              <div
                role="radiogroup"
                aria-label="Papel preferido"
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                {CASTER_APPLICATION_ROLE_OPTIONS.map((opt) => {
                  const isSelected = field.value === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => field.onChange(opt.value)}
                      className={cn(
                        "rounded-md border px-3 py-3 text-left text-sm transition-colors",
                        isSelected
                          ? "border-brand-yellow bg-brand-yellow/10 text-foreground"
                          : "border-border bg-background text-foreground/75 hover:border-foreground/30",
                      )}
                    >
                      <span className="block font-display text-sm font-semibold">
                        {opt.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-foreground/65">
                        {opt.value === "play-by-play"
                          ? "Narração em tempo real, energia alta"
                          : opt.value === "analyst"
                            ? "Leitura tática e estatística"
                            : "Conduz mesas e entrevistas"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
