import {
  UserCircleIcon,
  ShieldCheckIcon,
  InboxIcon,
  MicIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { z } from "zod";

export type SettingsMeTabConfig = {
  value: SettingsMeTab;
  label: string;
  icon: LucideIcon;
};

export const SETTINGS_ME_TABS = [
  { value: "perfil", label: "Perfil", icon: UserCircleIcon },
  { value: "identidade", label: "Identidade", icon: ShieldCheckIcon },
  { value: "solicitacoes", label: "Solicitações", icon: InboxIcon },
  { value: "caster", label: "Caster", icon: MicIcon },
  { value: "gerenciar-time", label: "Gerenciar time", icon: UsersIcon },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
  icon: LucideIcon;
}>;

export type SettingsMeTab = (typeof SETTINGS_ME_TABS)[number]["value"];

export const SETTINGS_ME_DEFAULT_TAB: SettingsMeTab = "perfil";

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const PHONE_REGEX = /^\+?\d{2,3}\s?\(?\d{2}\)?\s?\d?\s?\d{4}-?\d{4}$/;

export const SettingsMeProfileSchema = z.object({
  nick: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(32, "Máximo 32 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z
    .string()
    .regex(CPF_REGEX, "Formato esperado: 000.000.000-00"),
  phone: z
    .string()
    .regex(PHONE_REGEX, "Formato esperado: +55 (11) 9 1234-5678"),
  location: z.string().min(2, "Informe sua localização"),
});

export type SettingsMeProfileFormValues = z.infer<
  typeof SettingsMeProfileSchema
>;
