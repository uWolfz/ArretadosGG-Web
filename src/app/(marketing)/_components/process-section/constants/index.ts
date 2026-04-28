import type { Step } from "../types";

export const STEPS: Step[] = [
  {
    code: "01",
    title: "Descoberta",
    description:
      "Mergulhamos no jogo, na audiência e no KPI. Sem formulário — conversa de uma hora que já elimina metade das perguntas que você traria pro fornecedor seguinte.",
    deliverables: ["Formato proposto", "Orçamento realista", "Plano de audiência"],
  },
  {
    code: "02",
    title: "Design da operação",
    description:
      "Regulamento, identidade visual, plano de transmissão e stack de software sobem juntos. Nada é terceirizado — o que você vai ver no ar sai da mesma sala.",
    deliverables: ["Regulamento final", "Arte e overlays", "Software configurado"],
  },
  {
    code: "03",
    title: "Operação e pós",
    description:
      "Do primeiro ping à última partida, a gente opera ao vivo. Depois entrega melhores momentos, relatório de performance e o plano da próxima temporada.",
    deliverables: [
      "Broadcast ao vivo",
      "Melhores momentos pós-evento",
      "Relatório e próximos passos",
    ],
  },
];
