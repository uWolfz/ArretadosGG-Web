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
import { GameBadge, VerifiedBadge } from "@/components/badges";
import { GAME_LABELS_LONG } from "@/app/(app)/_data/games";
import type { Player } from "@/app/(app)/_data/players";
import type { SettingsMeProfileFormValues } from "../../_constants/settings-me";
import { SettingsMeSection } from "./components/settings-me-section";
import { SettingsMeAvatarUploader } from "./components/settings-me-avatar-uploader";
import { SettingsMeNickChangeWarning } from "./components/settings-me-nick-change-warning";

type SettingsMeProfileTabProps = {
  userSettingsMe: Player;
};

export function SettingsMeProfileTab({
  userSettingsMe,
}: SettingsMeProfileTabProps) {
  const { control, watch } = useFormContext<SettingsMeProfileFormValues>();

  const nickFieldSettingsMe = watch("nick");
  const nickChangedSettingsMe = nickFieldSettingsMe !== userSettingsMe.nick;

  return (
    <div className="space-y-5">
      <SettingsMeSection titleSettingsMe="Avatar">
        <SettingsMeAvatarUploader
          avatarSrcSettingsMe={userSettingsMe.avatar}
        />
      </SettingsMeSection>

      <SettingsMeSection titleSettingsMe="Dados do jogador">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="nick"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nick</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nick no jogo" {...field} />
                </FormControl>
                <p className="text-[11px] text-foreground/65">
                  Deve bater exatamente com o nick no jogo.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade · UF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {nickChangedSettingsMe && <SettingsMeNickChangeWarning />}
      </SettingsMeSection>

      <SettingsMeSection titleSettingsMe="Contato e identidade">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="voce@exemplo.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <p className="text-[11px] text-foreground/65">
                  Alterar email reenvia OTP de confirmação.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  CPF
                  {userSettingsMe.verified.cpf && <VerifiedBadge size="sm" />}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="000.000.000-00"
                    inputMode="numeric"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <p className="text-[11px] text-foreground/65">
                  Trocar o CPF invalida a verificação anti-fraude.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Celular
                  {userSettingsMe.verified.phone && (
                    <VerifiedBadge size="sm" />
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+55 (11) 9 1234-5678"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <p className="text-[11px] text-foreground/65">
                  Usado pra OTP SMS quando auth entrar (ADR-005).
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </SettingsMeSection>

      <SettingsMeSection titleSettingsMe="Jogo">
        <div className="flex items-center gap-2">
          <GameBadge game={userSettingsMe.game} />
          <span className="text-xs text-foreground/65">
            {GAME_LABELS_LONG[userSettingsMe.game]} — vinculado no onboarding
            (ADR-005)
          </span>
        </div>
      </SettingsMeSection>
    </div>
  );
}
