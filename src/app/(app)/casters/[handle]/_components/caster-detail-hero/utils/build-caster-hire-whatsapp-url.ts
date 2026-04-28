import { CONTACT } from "@/lib/contact";

export function buildCasterHireWhatsappUrl(displayName: string): string {
  const text = encodeURIComponent(
    `Oi! Quero contratar o(a) ${displayName} pra uma transmissão. Bora conversar?`,
  );
  return `${CONTACT.whatsappUrl}${CONTACT.whatsappUrl.includes("?") ? "&" : "?"}text=${text}`;
}
