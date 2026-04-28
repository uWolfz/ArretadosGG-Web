// Single source of truth for contact info reused across marketing sections.
// TODO: substituir pelo número real do WhatsApp comercial quando disponível.
const WHATSAPP_NUMBER = "5581000000000";

const DEFAULT_WHATSAPP_MESSAGE =
  "Oi, Arretados! Quero conversar sobre uma operação de esports.";

export const CONTACT = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_WHATSAPP_MESSAGE,
  )}`,
  email: "comercial@arretados.gg",
} as const;
