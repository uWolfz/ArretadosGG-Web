// Single source of truth for contact info reused across marketing sections.
const WHATSAPP_NUMBER = "5579994416016";

const DEFAULT_WHATSAPP_MESSAGE =
  "Oi, Arretados! Quero conversar sobre uma operação de esports.";

export const CONTACT = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_WHATSAPP_MESSAGE,
  )}`,
  email: "arretadosgg@gmail.com",
} as const;
