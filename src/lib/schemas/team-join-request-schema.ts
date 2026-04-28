import { z } from "zod";

export const TEAM_JOIN_REQUEST_MESSAGE_MAX_LENGTH = 280;

export const TeamJoinRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .max(
      TEAM_JOIN_REQUEST_MESSAGE_MAX_LENGTH,
      `Máximo ${TEAM_JOIN_REQUEST_MESSAGE_MAX_LENGTH} caracteres`,
    )
    .optional(),
});

export type TeamJoinRequestFormValues = z.infer<typeof TeamJoinRequestSchema>;

export const TEAM_JOIN_REQUEST_DEFAULT_VALUES: TeamJoinRequestFormValues = {
  message: "",
};
