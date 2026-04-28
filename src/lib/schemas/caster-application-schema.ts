import { z } from "zod";

export const CASTER_APPLICATION_ROLE_OPTIONS = [
  { value: "play-by-play", label: "Play-by-play" },
  { value: "analyst", label: "Análise" },
  { value: "host", label: "Host" },
] as const satisfies ReadonlyArray<{
  value: string;
  label: string;
}>;

export type CasterApplicationRoleValue =
  (typeof CASTER_APPLICATION_ROLE_OPTIONS)[number]["value"];

const CASTER_APPLICATION_ROLE_VALUES = CASTER_APPLICATION_ROLE_OPTIONS.map(
  (r) => r.value,
) as [CasterApplicationRoleValue, ...CasterApplicationRoleValue[]];

const URL_REGEX = /^https?:\/\/.+/i;

const portfolioLinkSchema = z
  .string()
  .trim()
  .min(1, "Link obrigatório")
  .regex(URL_REGEX, "Use uma URL completa (https://...)");

export const CasterApplicationBioStepSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(80, "Mínimo 80 caracteres — conta um pouco da sua história")
    .max(500, "Máximo 500 caracteres"),
  role: z.enum(CASTER_APPLICATION_ROLE_VALUES, {
    errorMap: () => ({ message: "Escolha um papel preferido" }),
  }),
});

export const CasterApplicationPortfolioStepSchema = z.object({
  handle: z
    .string()
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(60, "Máximo 60 caracteres"),
  portfolioLinks: z
    .array(portfolioLinkSchema)
    .min(1, "Pelo menos 1 link de portfolio"),
});

export const CasterApplicationSampleStepSchema = z.object({
  sampleWorkUrl: z
    .string()
    .trim()
    .regex(URL_REGEX, "Use uma URL completa (https://...)"),
});

export const CasterApplicationSchema = CasterApplicationBioStepSchema.merge(
  CasterApplicationPortfolioStepSchema,
).merge(CasterApplicationSampleStepSchema);

export type CasterApplicationFormValues = z.infer<
  typeof CasterApplicationSchema
>;

export const CASTER_APPLICATION_DEFAULT_VALUES: CasterApplicationFormValues = {
  bio: "",
  role: "play-by-play",
  handle: "",
  portfolioLinks: [""],
  sampleWorkUrl: "",
};
