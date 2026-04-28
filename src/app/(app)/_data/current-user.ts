import { findPlayerByTag, type Player } from "./players";

export const MOCK_CURRENT_USER_TAG = "yancastro";

const cached = findPlayerByTag(MOCK_CURRENT_USER_TAG);
if (!cached) {
  throw new Error(
    `Mock current user "${MOCK_CURRENT_USER_TAG}" not found in PLAYERS`,
  );
}

export const MOCK_CURRENT_USER: Player = cached;

export function getMockCurrentUser(): Player {
  return MOCK_CURRENT_USER;
}

export type MockCurrentUserAccount = {
  email: string;
  cpf: string;
  phone: string;
};

export const MOCK_CURRENT_USER_ACCOUNT: MockCurrentUserAccount = {
  email: "yancastro@arretados.gg",
  cpf: "123.456.789-00",
  phone: "+55 (81) 9 1234-5678",
};

export function getMockCurrentUserAccount(): MockCurrentUserAccount {
  return MOCK_CURRENT_USER_ACCOUNT;
}
