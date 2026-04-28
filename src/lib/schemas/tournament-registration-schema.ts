import { z } from "zod";

const phoneBrRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
const discordTagRegex = /^.{2,32}(#\d{4})?$/;

export const tournamentRegistrationSchema = z.object({
  teamName: z
    .string()
    .trim()
    .min(2, "Nome precisa ter ao menos 2 caracteres")
    .max(60, "Máximo 60 caracteres"),
  teamTag: z
    .string()
    .trim()
    .min(2, "Tag precisa ter ao menos 2 caracteres")
    .max(4, "Máximo 4 caracteres")
    .regex(/^[A-Z0-9]+$/, "Só letras maiúsculas e números"),
  captainEmail: z
    .string()
    .trim()
    .min(1, "E-mail obrigatório")
    .email("E-mail inválido"),
  captainPhone: z
    .string()
    .trim()
    .min(1, "Telefone obrigatório")
    .regex(phoneBrRegex, "Formato esperado: (81) 99999-9999"),
  captainDiscord: z
    .string()
    .trim()
    .min(2, "Discord obrigatório")
    .regex(discordTagRegex, "Ex: capitao ou capitao#1234"),
});

export type TournamentRegistrationFormData = z.infer<
  typeof tournamentRegistrationSchema
>;

export const tournamentRegistrationDefaultValues: TournamentRegistrationFormData =
  {
    teamName: "",
    teamTag: "",
    captainEmail: "",
    captainPhone: "",
    captainDiscord: "",
  };
