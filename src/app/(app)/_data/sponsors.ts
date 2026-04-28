export type Sponsor = {
  name: string;
  tagline: string;
  href: string;
  /** gradient CSS (from → to) pro placeholder — serve como textura enquanto não há logo oficial */
  tint: string;
};

export const SPONSORS: Sponsor[] = [
  {
    name: "Login Arena",
    tagline: "Parceiro oficial",
    href: "#",
    tint: "from-[#145F48] to-[#0a2f24]",
  },
  {
    name: "Seja Premium",
    tagline: "Sem anúncios · acesso antecipado",
    href: "#",
    tint: "from-[#F44026] to-[#7a2013]",
  },
  {
    name: "Liga Arretados",
    tagline: "Ranked 5v5",
    href: "#",
    tint: "from-[#FFB123] to-[#7a5611]",
  },
  {
    name: "Patrocínio",
    tagline: "Fale com a gente",
    href: "#",
    tint: "from-[#1f1f1f] to-[#0a0a0a]",
  },
  {
    name: "Arretados Store",
    tagline: "Jerseys e mangotes",
    href: "#",
    tint: "from-[#145F48] to-[#0a2f24]",
  },
  {
    name: "Anuncie aqui",
    tagline: "Fale com comercial",
    href: "#",
    tint: "from-[#F44026] to-[#7a2013]",
  },
];
