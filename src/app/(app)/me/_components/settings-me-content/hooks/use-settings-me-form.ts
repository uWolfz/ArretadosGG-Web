"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast-mock";
import type { Player } from "@/app/(app)/_data/players";
import type { MockCurrentUserAccount } from "@/app/(app)/_data/current-user";
import {
  SettingsMeProfileSchema,
  type SettingsMeProfileFormValues,
} from "../../../_constants/settings-me";

function buildSettingsMeDefaults(
  user: Player,
  account: MockCurrentUserAccount,
): SettingsMeProfileFormValues {
  return {
    nick: user.nick,
    email: account.email,
    cpf: account.cpf,
    phone: account.phone,
    location: user.location,
  };
}

export function useSettingsMeForm(
  user: Player,
  account: MockCurrentUserAccount,
) {
  const formSettingsMe = useForm<SettingsMeProfileFormValues>({
    resolver: zodResolver(SettingsMeProfileSchema),
    defaultValues: buildSettingsMeDefaults(user, account),
    mode: "onBlur",
  });

  const isDirtySettingsMe = formSettingsMe.formState.isDirty;

  useEffect(() => {
    if (!isDirtySettingsMe) return;
    const onBeforeUnloadSettingsMe = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnloadSettingsMe);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnloadSettingsMe);
    };
  }, [isDirtySettingsMe]);

  const submitSettingsMeForm = useCallback(
    () =>
      formSettingsMe.handleSubmit((values) => {
        toast("Alterações seriam salvas (mock)");
        formSettingsMe.reset(values);
      })(),
    [formSettingsMe],
  );

  const discardSettingsMeChanges = useCallback(() => {
    formSettingsMe.reset();
  }, [formSettingsMe]);

  return {
    formSettingsMe,
    isDirtySettingsMe,
    submitSettingsMeForm,
    discardSettingsMeChanges,
  };
}
