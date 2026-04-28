import type { CaseAccent, CaseMedia } from "./cases";

export type ServiceDeliverable = {
  title: string;
  body: string;
};

export type ServiceMethodologyStep = {
  code: string;
  heading: string;
  body: string;
};

export type Service = {
  slug: string;
  label: string;
  headline: string;
  pitch: string;
  shortDescription: string;
  accent: CaseAccent;
  media: CaseMedia;
  heroMedia?: CaseMedia;
  deliverables: ServiceDeliverable[];
  methodology: ServiceMethodologyStep[];
  relatedCaseSlugs: string[];
  whenToHire: string;
};

export const SERVICES: Service[] = [
  {
    slug: "transmissao",
    label: "Transmissão ao vivo",
    headline: "Broadcast sem zelo de fornecedor",
    pitch:
      "A gente opera o broadcast completo do evento — direção, câmeras, overlays e stream — com o mesmo time que cuida de regulamento e software. Sem repasse entre agências.",
    shortDescription:
      "Broadcast multiplataforma com direção ao vivo e overlays on-brand.",
    accent: "green",
    media: {
      type: "video",
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6755.mp4",
      poster: "/eventos-web/2026-3-login-arena-lol-s2/img-6755-poster.webp",
      alt: "Broadcast ao vivo operado pela Arretados durante a Login Arena",
    },
    deliverables: [
      {
        title: "Direção técnica ao vivo",
        body: "Cortes entre câmeras, acompanhamento de partida, chamada de replays e chamada de pauta — um único diretor pilotando o evento inteiro.",
      },
      {
        title: "Overlays on-brand em tempo real",
        body: "Lowers, scorecards e placares sincronizados com o backend da liga ou direto com o cliente. Zero atraso entre ação e overlay.",
      },
      {
        title: "Stream multiplataforma",
        body: "Entrega simultânea em Twitch, YouTube e embed nativo no site do cliente. Sem depender de player de terceiro.",
      },
      {
        title: "Storage + pós imediato",
        body: "Gravação arquivada em storage próprio, com metadados por partida pra facilitar corte de highlights na hora.",
      },
    ],
    methodology: [
      {
        code: "01",
        heading: "Pré-produção",
        body: "Semana antes do evento a gente trava lista de câmeras, roteiro de overlays, integrações com o backend e script de pauta. Sem surpresa no dia.",
      },
      {
        code: "02",
        heading: "Execução",
        body: "Direção técnica no master, câmeras dedicadas e narração na casa ou remota. Gravação espelhada em duas máquinas pra redundância.",
      },
      {
        code: "03",
        heading: "Entrega",
        body: "VOD arquivado, corte de ponto alto entregue em 48h e dashboard com audiência + retenção por segmento.",
      },
    ],
    relatedCaseSlugs: ["login-arena-lol-s2", "lan-sergipe-gamer"],
    whenToHire:
      "Contrate se tá organizando liga, LAN ou torneio e não quer três fornecedores diferentes cuidando de câmera, stream e overlays.",
  },
  {
    slug: "league-operations",
    label: "League Operations",
    headline: "Liga rodando, não improviso",
    pitch:
      "Regulamento, chaveamento, arbitragem e comunicação com times num só time. A gente desenha a temporada e opera cada rodada — sem o publisher virar secretaria.",
    shortDescription:
      "Gestão de ligas, regulamento, draws e decisões em tempo real.",
    accent: "yellow",
    media: {
      type: "photo",
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6767-heic.webp",
      alt: "Medalhas e material da liga operada pela Arretados",
    },
    deliverables: [
      {
        title: "Regulamento versionado",
        body: "Documento vivo com edições, deadlines e protocolo de disputas. Acessível pros times, auditável pelo publisher.",
      },
      {
        title: "Chaveamento e draws",
        body: "Formatos de bracket (single, double, round-robin) operados com draws transparentes e históricos arquivados.",
      },
      {
        title: "Arbitragem treinada",
        body: "Equipe de árbitros trabalhando no painel próprio, com protocolo de decisão e trilha de auditoria por partida.",
      },
      {
        title: "Canal com os times",
        body: "Comunicação centralizada em Discord ou canal dedicado, com janelas claras e SLA de resposta definido em contrato.",
      },
    ],
    methodology: [
      {
        code: "01",
        heading: "Desenho da liga",
        body: "Entendemos o formato, público, janela e ticker da competição. Saímos com regulamento escrito e cronograma por rodada.",
      },
      {
        code: "02",
        heading: "Rodada a rodada",
        body: "Operamos cada etapa — do check-in dos times à subida do chaveamento. Publisher acompanha no painel, não precisa estar no zap.",
      },
      {
        code: "03",
        heading: "Fechamento",
        body: "Relatório de temporada com partidas, incidentes, decisões de árbitros e sugestão de ajustes pro próximo ciclo.",
      },
    ],
    relatedCaseSlugs: ["login-arena-lol-s2"],
    whenToHire:
      "Contrate se tá lançando ou escalando uma liga e quer parar de montar o kit do zero toda temporada.",
  },
  {
    slug: "outsourcing",
    label: "Terceirização",
    headline: "Operação inteira, um CNPJ só",
    pitch:
      "Quando o cliente quer o evento rodando e não tem banca pra montar time interno, a gente assume tudo: logística, broadcast, arbitragem, audiovisual. Um contrato só.",
    shortDescription:
      "Outsourcing de equipe e infra pra operar eventos end-to-end.",
    accent: "red",
    media: {
      type: "photo",
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1970-jpg.webp",
      alt: "Time Arretados operando a LAN Sergipe Gamer ponta a ponta",
    },
    deliverables: [
      {
        title: "Time completo no evento",
        body: "Direção técnica, câmeras, árbitros, produtor audiovisual e coordenador de palco — tudo sob a mesma gestão.",
      },
      {
        title: "Infra operacional",
        body: "Rede, storage, máquinas de operação e equipamento de captação. A gente chega com o kit e devolve o espaço limpo.",
      },
      {
        title: "Comunicação com venue",
        body: "Coordenação direta com shopping, arena ou espaço — da montagem à desmontagem, sem o cliente virar zelador.",
      },
      {
        title: "Post-event package",
        body: "Relatório de operação, assets editados e metadados entregues em uma semana após o evento.",
      },
    ],
    methodology: [
      {
        code: "01",
        heading: "Kickoff",
        body: "Levantamos escopo, deadline, budget e objetivo. Saímos com proposta comercial, cronograma e matriz de responsabilidade.",
      },
      {
        code: "02",
        heading: "Pré-evento",
        body: "Montagem de equipe, contratos com venues, compra/aluguel de equipamento, ensaios técnicos e simulação de palco.",
      },
      {
        code: "03",
        heading: "Dia do evento",
        body: "Equipe no local desde a montagem. Um ponto focal Arretados pro cliente. Quando o evento acaba, o evento acaba — sem rescaldo de fornecedor.",
      },
    ],
    relatedCaseSlugs: ["lan-sergipe-gamer"],
    whenToHire:
      "Contrate se quer o evento rodando mas não tem time interno pra coordenar 5+ fornecedores.",
  },
  {
    slug: "desenvolvimento",
    label: "Desenvolvimento",
    headline: "Software que opera a liga",
    pitch:
      "Plataforma de torneio, painel de árbitros, automação de partidas e integração com broadcast. Sob medida pro seu formato, não adaptação de ferramenta genérica.",
    shortDescription:
      "Software sob medida: plataforma de torneios, dashboards, automação.",
    accent: "green",
    media: {
      type: "photo",
      src: "/eventos-web/2026-3-login-arena-lol-s2/img-6746-poster.webp",
      alt: "Interface do software de operação de torneio da Arretados",
    },
    deliverables: [
      {
        title: "Plataforma de inscrição",
        body: "Hotsite com cadastro de time, roster, pagamento (se aplicável) e validação. Check-in no dia do evento integrado.",
      },
      {
        title: "Painel de árbitros",
        body: "Interface pra decisões em tempo real, histórico auditável, sistema de disputa e comunicação com times.",
      },
      {
        title: "Automação de partida",
        body: "Avanço de chaveamento automático, resultado validado por árbitro ou integração com API do jogo quando disponível.",
      },
      {
        title: "API pra broadcast",
        body: "Endpoints pra overlays, scorecards e dashboards consumirem dado da liga em tempo real.",
      },
    ],
    methodology: [
      {
        code: "01",
        heading: "Escopo técnico",
        body: "Análise do formato da liga e mapeamento das features essenciais. Nada de MVP inchado — entrega o que opera, evolui o resto.",
      },
      {
        code: "02",
        heading: "Sprints curtos",
        body: "Entregas de 2 semanas com feedback do cliente. Plataforma em staging desde a sprint 1.",
      },
      {
        code: "03",
        heading: "Rodagem em liga real",
        body: "Go-live numa temporada real — a gente opera junto pra pegar edge case e iterar com usuário de verdade.",
      },
    ],
    relatedCaseSlugs: ["login-arena-lol-s2", "arretados-invitational"],
    whenToHire:
      "Contrate se usa planilha + Discord pra operar torneio e já não escala mais. Ou se quer ter a stack própria, não depender de plataforma terceirizada.",
  },
  {
    slug: "producao-audiovisual",
    label: "Produção audiovisual",
    headline: "Highlights que saem na semana",
    pitch:
      "Captação, edição e pós-produção pensadas pro ciclo de esports. Conteúdo no social media ainda antes do hype do evento cair.",
    shortDescription:
      "Captação, edição e pós pra conteúdo social, teasers e highlights.",
    accent: "yellow",
    media: {
      type: "photo",
      src: "/eventos-web/2025-08-lan-sergipe-gamer/img-1987-heic.webp",
      alt: "Captação audiovisual durante evento operado pela Arretados",
    },
    deliverables: [
      {
        title: "Captação dedicada",
        body: "Câmeras só pra audiovisual — não compete com broadcast. Cobertura de bastidor, reação de time, momento de palco.",
      },
      {
        title: "Highlights em 5 dias",
        body: "Melhores momentos editados e entregues na semana seguinte ao evento. Pipeline pré-configurado, não começa do zero.",
      },
      {
        title: "Social pack",
        body: "Cortes verticais, teasers e reels prontos pros canais do publisher, marca e times participantes.",
      },
      {
        title: "Vídeo de fechamento",
        body: "Aftermovie de 1-3 minutos contando o evento. Não é overkill — é o que vende a próxima edição.",
      },
    ],
    methodology: [
      {
        code: "01",
        heading: "Briefing",
        body: "Mapeamos o tom, referências e formatos pedidos. Plano de captação sai com câmera por foco e shotlist por momento.",
      },
      {
        code: "02",
        heading: "Captação",
        body: "Equipe audiovisual separada do broadcast, com diretor de fotografia focado só em narrativa. Material já organizado por tag na captação.",
      },
      {
        code: "03",
        heading: "Pós expressa",
        body: "Edição começa no mesmo dia do evento. Highlights, social pack e aftermovie entregues em cascata conforme acordado.",
      },
    ],
    relatedCaseSlugs: ["lan-sergipe-gamer"],
    whenToHire:
      "Contrate se o evento tá rodando mas o conteúdo sai uma semana depois (e daí ninguém vê mais).",
  },
  {
    slug: "consultoria",
    label: "Consultoria",
    headline: "Estratégia antes de contratar equipe",
    pitch:
      "Pra marca, publisher ou investidor entrando em esports: a gente ajuda a dimensionar o que vale a pena operar interno, o que terceirizar e onde tá o risco.",
    shortDescription:
      "Strategy advisory pra marcas e publishers entrando em esports.",
    accent: "red",
    media: {
      type: "photo",
      src: "/eventos-web/2025-07-arretados-invitational/img-1504-heic.webp",
      alt: "Planejamento estratégico de esports pela Arretados",
    },
    deliverables: [
      {
        title: "Diagnóstico de mercado",
        body: "Mapa de cenário: quem opera hoje, quanto custa, que formato funciona pro seu público. Sem relatório genérico.",
      },
      {
        title: "Formato recomendado",
        body: "Desenho de liga, evento ou programa adequado ao objetivo — audiência, lead, branding, vendas. Com cronograma e orçamento.",
      },
      {
        title: "Fornecedor ou time interno?",
        body: "Análise de build vs buy: o que vale construir dentro de casa e o que terceirizar (e com quem).",
      },
      {
        title: "Plano de 12 meses",
        body: "Roadmap de execução com marcos, budget e KPI mensurável. Algo pra defender pro board, não papo abstrato.",
      },
    ],
    methodology: [
      {
        code: "01",
        heading: "Discovery",
        body: "Entrevistas com time interno e stakeholders. Entendemos objetivo real, não o briefing mastigado.",
      },
      {
        code: "02",
        heading: "Análise",
        body: "Benchmarks, cenários possíveis e trade-offs. Entregue em deck executivo, não 80 slides de PowerPoint.",
      },
      {
        code: "03",
        heading: "Recomendação",
        body: "Direção clara com plano de 12 meses. Ajuda pra apresentar internamente incluída.",
      },
    ],
    relatedCaseSlugs: ["arretados-invitational"],
    whenToHire:
      "Contrate antes de assinar contrato gigante com agência. A gente costuma economizar mais do que cobra.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getNextService(slug: string): Service | undefined {
  const index = SERVICES.findIndex((s) => s.slug === slug);
  if (index === -1) return undefined;
  return SERVICES[(index + 1) % SERVICES.length];
}
