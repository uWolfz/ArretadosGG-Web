"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CasterApplicationFormValues } from "@/lib/schemas/caster-application-schema";

export function SettingsMeCasterWizardStepSample() {
  const { control } = useFormContext<CasterApplicationFormValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="sampleWorkUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sample work</FormLabel>
            <FormControl>
              <Input
                placeholder="https://youtube.com/watch?v=..."
                {...field}
              />
            </FormControl>
            <p className="text-[11px] text-foreground/65">
              Link pra um VOD ou clipe de uma narração sua. Pode ser YouTube,
              Twitch, Streamable — qualquer URL pública.
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-md border border-border bg-background/60 p-4 text-xs text-foreground/70">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
          Dica
        </p>
        <p>
          Manda o melhor momento que tu já cobriu. 2-5 minutos é o ponto doce —
          o time vai avaliar ritmo, clareza e presença.
        </p>
      </div>
    </div>
  );
}
