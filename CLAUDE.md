<!-- GSD:project-start source:PROJECT.md -->
## Project

**ArretadosGG-Web**

Plataforma web de torneios de esports regional (Nordeste BR) construída em Next.js App Router. Funciona hoje como portal público + área logada (`/me`, `/tournaments`, `/teams`, `/players`, `/matches`, `/news`) com data layer em mocks (`src/app/(app)/_data/*.ts`) aguardando backend real. Público-alvo: jogadores amadores e profissionais da cena, organizadores de torneio e casters da região.

**Core Value:** O jogador consegue montar sua identidade social na plataforma — perfil verificado, time, histórico — para jogar torneios com credibilidade. Se esse vínculo identidade↔time↔torneio quebra, não há produto.

### Constraints

- **Tech stack**: Next.js App Router + TypeScript + Tailwind + react-hook-form + zod — NÃO trocar, só usar
- **Dependencies**: mocks-only data layer; nada de fetch externo ou backend neste milestone
- **Compatibility**: não quebrar rotas/componentes existentes; mudanças no schema de `Player`/`Team` devem ser backwards-compatible (novos campos opcionais)
- **Patterns**: seguir CONVENTIONS.md sem desvio — commit anterior já bate nesse ponto, code review vai pegar
- **Accessibility**: componentes interativos novos (botão "Pedir pra entrar", wizard de aplicação de caster) precisam de aria-label + suporte a teclado
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript (`^5`, resolvido `5.9.3`) - Toda a aplicação Next.js em `src/**/*.ts|tsx`
- TSX/JSX - Componentes React em toda a árvore `src/app` e `src/components`
- JavaScript (ESM, `.mjs`) - Scripts Node em `scripts/*.mjs` (processamento de mídia de eventos) e `docs/build/build.mjs`
- Python (`3.12-slim`, dockerizado) - Build de PDFs institucionais via WeasyPrint em `docs/build/build-pdf.py`
- CSS - Tokens de design e Tailwind em `src/app/globals.css`
## Runtime
- Node.js - Implícito pelo Next.js 16 e `@types/node ^20`; sem `.nvmrc` no repo
- Browser target: `ES2017` (ver `tsconfig.json`), libs `dom`, `dom.iterable`, `esnext`
- pnpm (workspace file: `pnpm-workspace.yaml`)
- Lockfile: presente (`pnpm-lock.yaml`, ~6.2k linhas)
- `package-lock.json` e `yarn.lock` explicitamente ignorados no `.gitignore`
- Builds nativos permitidos: `sharp`, `unrs-resolver` (ver `pnpm-workspace.yaml`)
## Frameworks
- Next.js `16.2.4` - App Router + Turbopack (dev), entry em `src/app/layout.tsx`
- React `19.2.4` / React DOM `19.2.4` - Server/Client Components
- Tailwind CSS `^4` (resolvido `4.2.2`) - via plugin PostCSS `@tailwindcss/postcss`
- shadcn/ui `^4.3.0` (estilo `base-nova`, config em `components.json`) - tokens CSS em `src/app/globals.css`
- `@base-ui/react ^1.4.0` - primitivos headless usados por `src/components/ui/*` (Button, Dialog, Input, Select)
- `tw-animate-css ^1.4.0` - animações utilitárias importadas em `globals.css`
- `class-variance-authority ^0.7.1` + `clsx ^2.1.1` + `tailwind-merge ^3.5.0` - helper `cn()` em `src/lib/utils.ts`
- `framer-motion ^12.38.0` - usado em 11 componentes (listings, cards, hero; ver `src/app/(app)/tournaments/_components/*`, `src/app/(app)/news/_components/*`)
- `lucide-react ^1.8.0` - ícones genéricos de UI (`src/components/ui/*`, badges, search)
- Ícones de domínio customizados em `src/components/shared/icons/*.tsx` (flame, home, layers, mail, newspaper, swords, trophy, user-round, users, whatsapp) expondo props tipadas via `types.ts`
- `react-hook-form ^7.72.1` - formulários em `src/app/(app)/me/*` e `src/app/(app)/tournaments/[slug]/_components/tournament-registration-dialog`
- `zod ^3.25.76` + `@hookform/resolvers ^5.2.2` - schemas em `src/lib/schemas/*` (ex.: `tournament-registration-schema.ts`)
- Não detectado (sem Jest/Vitest/Playwright configurado no `package.json`)
- Diretório `.playwright-mcp/` existe mas é só artefato do MCP tool, não suíte de testes
- Turbopack (default do Next 16) - via `next dev` / `next build`
- `eslint ^9` + `eslint-config-next 16.2.4` - sem `.eslintrc`/`eslint.config.*` custom (usa defaults do Next)
- TypeScript `^5` - `strict: true`, `moduleResolution: bundler`, `jsx: react-jsx`, sem emit
- Sem Prettier configurado (`.prettierrc` não existe) - formatação delegada ao ESLint/editor
## Key Dependencies
- `next@16.2.4` - framework base, todo routing e SSR/RSC
- `react@19.2.4` / `react-dom@19.2.4` - versão casada com Next 16
- `tailwindcss@^4` + `@tailwindcss/postcss` - pipeline de CSS via PostCSS
- `@base-ui/react@^1.4.0` - primitivos a11y dos componentes `ui/`
- `shadcn@^4.3.0` - CLI/tooling do design system (style `base-nova`)
- `zod@^3.25.76` - validação de formulários (quando backend entrar, schemas são reutilizáveis server-side)
- `clsx@^2.1.1` + `tailwind-merge@^3.5.0` - helper `cn()` em `src/lib/utils.ts`
- `class-variance-authority@^0.7.1` - variantes tipadas nos componentes UI (ex.: `src/components/ui/button.tsx`)
- `sharp@0.34.5` - importado direto de `node_modules/.pnpm/sharp@0.34.5/...` nos scripts de mídia (não é dependência declarada em `package.json`, vem transitivamente via Next)
- WeasyPrint `68.1` (Python, Docker) - geração dos PDFs institucionais
## Configuration
- `strict: true`, `noEmit: true`, `target: ES2017`, `module: esnext`
- Path alias: `@/*` → `./src/*`
- Plugin `next` ativo
- `incremental: true` (artefato em `tsconfig.tsbuildinfo` ignorado no git)
- Config vazia (apenas o tipo `NextConfig`), sem customização de images/rewrites/headers
- Único plugin: `@tailwindcss/postcss` (Tailwind v4 não usa mais `tailwind.config.js`)
- `@import "tailwindcss"` + `@import "tw-animate-css"` + `@import "shadcn/tailwind.css"`
- Tokens via `@theme inline` + CSS variables (cores, radii, fontes)
- Fontes: Chakra Petch (display/heading), Inter (sans), Geist Mono (mono), carregadas em `src/app/layout.tsx` via `next/font/google`
- Style: `base-nova`, baseColor: `neutral`, RSC: `true`, iconLibrary: `lucide`
- Aliases: `components → @/components`, `utils → @/lib/utils`, `ui → @/components/ui`, `hooks → @/hooks`
- Sem arquivo de config custom - roda `eslint` no mode default do Next 16
- Script: `npm run lint` / `pnpm lint`
- `.env*` todos no `.gitignore` (nenhum commitado)
- Sem referências a `process.env` ou `NEXT_PUBLIC_*` no código de `src/` (projeto é 100% mocks)
## Platform Requirements
- Node.js compatível com Next 16 e `@types/node ^20` (Node 18.18+ / 20+)
- pnpm como gerenciador (lockfile é `pnpm-lock.yaml`)
- Para scripts de mídia: `sips` (macOS, usado em `scripts/process-event-photos.mjs`) e `ffmpeg` no `PATH` (usado em `scripts/process-event-videos.mjs`)
- Para `pnpm docs:build`: Docker Desktop rodando (build de PDF via container Python/WeasyPrint)
- Vercel (conforme `README.md`, "Conecta o repo e deploya"); nenhum `vercel.json` custom presente
- Sem Dockerfile para a app Next (só para o builder de PDFs institucionais em `docs/build/Dockerfile`)
## Build/Dev Scripts
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## TypeScript
- `strict: true` — nullability e `noImplicitAny` ligados
- `target: ES2017`, `module: esnext`, `moduleResolution: bundler`
- `jsx: react-jsx` (novo transform, sem `import React`)
- `isolatedModules: true` — toda exportação de tipo precisa de `export type`
- Alias único: `@/*` → `./src/*` (usado em todos os imports cross-route)
- **Variáveis locais:** sempre inferido. Não anote tipo em assignments triviais.
- **Parâmetros de função:** sempre tipados explicitamente.
- **Retorno de função:** tipado explicitamente quando a função é pura/util (`formatPlayerKd(kd: number): string`) ou quando retorna union. Omitido em componentes React e handlers triviais.
- **Props de componente:** sempre `type FooProps = { ... }` local ao arquivo, tipado explicitamente no parâmetro:
- **Hooks customizados:** retornam objetos nomeados, não tuplas. Ver `useTournamentsFilter` em `src/app/(app)/tournaments/_hooks/use-tournaments-filter.ts:51-68` — o tipo do retorno é exportado.
- **Arrays literais como enums:** use `as const satisfies ReadonlyArray<...>` e derive a union com `(typeof ARR)[number]["value"]`. Ver `src/app/(app)/me/_constants/settings-me.ts:15-25`:
- **`any` proibido.** `unknown` + narrow com `instanceof Error` quando necessário — ver `handleSubmitTournamentRegistration` em `src/app/(app)/tournaments/[slug]/_components/tournament-registration-dialog/tournament-registration-dialog.tsx:104-109`.
## Naming Patterns — regra central: **domain suffix no fim**
### 1. Files — kebab-case, prefixado por domínio
- `src/app/(app)/me/_components/settings-me-content/settings-me-content.tsx`
- `src/app/(app)/me/_components/settings-me-profile-tab/settings-me-profile-tab.tsx`
- `src/app/(app)/me/_components/settings-me-profile-tab/settings-me-avatar-uploader.tsx`
- `src/app/(app)/tournaments/[slug]/_components/tournament-casters/tournament-caster-card.tsx`
- `src/app/(app)/tournaments/[slug]/_components/tournament-registration-dialog/tournament-registration-dialog.tsx`
- `src/app/(app)/tournaments/[slug]/_components/tournament-registration-dialog/tournament-registration-header.tsx`
- `src/app/(app)/players/[tag]/_components/player-stats-detail/player-stats-table.tsx`
- Tudo em `kebab-case`. Nunca `PascalCase` ou `camelCase` em filename.
- Componente React → `.tsx`. Utilitário/hook/schema/data → `.ts`.
- Hooks começam com `use-` (`use-settings-me-form.ts`, `use-tournaments-filter.ts`, `use-players-filter.ts`).
- Extensões: SEMPRE `.ts`/`.tsx`. Nunca `.js`/`.jsx` em `src/`.
- Nomes de arquivo são versões kebab do componente exportado: `TournamentCasterCard` → `tournament-caster-card.tsx`.
### 2. Variables & functions — **domain suffix at END**
- `user`, `account`, `activeTab`, `tab`, `open`, `submit`, `handleOpen`, `handleSubmit`, `status`, `plate`, `email` sem domínio
- `useForm()` retornando `{ form, isDirty, submit }` — retornar `{ formSettingsMe, isDirtySettingsMe, submitSettingsMeForm, discardSettingsMeChanges }`
- `handleClick`, `handleChange` sem contexto — usar `handleOpenChangeTournamentRegistration`, `handleSubmitTournamentRegistration`
- `parse(value)` — usar `parseGame(raw)`, `parseHasTeam(raw)`
- `cn`, `isNotNull`, utilitários em `src/lib/utils.ts` e `src/lib/type-guards.ts`
- `formatShortDatePtBr`, `formatMonthYearPtBr` em `src/lib/format-date.ts` (o sufixo é idiomático, não de domínio)
- Dentro de `.map((row) => ...)`, `(p) => ...`, parâmetros curtos de callback
### 3. Types & constants
- Regex locais em `SCREAMING_SNAKE_CASE`: `CPF_REGEX`, `PHONE_REGEX` (em `_constants/settings-me.ts`).
- Literais de classe Tailwind reutilizados dentro do componente → `SCREAMING_SNAKE_CASE` no topo do arquivo (ver `tournament-registration-dialog.tsx:41-44`).
### 4. Props types
## Folder Structure — per route, underscore = private
- `src/app/(app)/me/_components/`, `_hooks/`, `_constants/`
- `src/app/(app)/tournaments/_components/`, `_hooks/`, `_utils/`, `_lib/`
- `src/app/(app)/tournaments/[slug]/_components/tournament-casters/`
- `src/app/(app)/players/_hooks/use-players-filter.ts`
- `src/app/(app)/players/[tag]/_components/` (10+ componentes privados da página de detalhe)
- **Global shared** → `src/components/` (ui primitivos shadcn, badges, shared header)
- **App-wide** (dentro do grupo `(app)`) → `src/app/(app)/_components/` (ex. `EmptyState`, `KpiCell`, `SectionHeader`, `AppHeader`, `Pagination`, `FilterChip`, `SearchInput`, `DetailBackLink`, `ListingTabsNav`)
- **Route-scoped** → `src/app/(app)/[route]/_components/`
- **Component-scoped** → `src/app/(app)/[route]/_components/[thing]/_hooks/`
### Quando o componente vira pasta vs. arquivo único
- **Pasta** (`[thing]/[thing].tsx` + irmãos): quando o componente tem subcomponentes, hooks próprios, ou mais de 1 arquivo. Ver `settings-me-content/` (tem `_hooks/use-settings-me-form.ts`), `tournament-registration-dialog/` (3 subcomponentes), `players-listing/` (4 sub-arquivos de listing).
- **Arquivo único** (`[thing].tsx` solto em `_components/`): quando é self-contained. Ver `src/app/(app)/_components/app-mobile-tab-bar.tsx`.
- **Pasta com só 1 tsx + `index.ts`**: padrão default hoje mesmo para componente simples (ver `team-card/`, `player-card/`, `empty-state/`). O `index.ts` só reexporta.
### Barrel files (`index.ts`)
- Em `_components/` da rota: reexporta os componentes públicos da rota.
- Em pastas de componente: reexporta só o componente principal (`export { TournamentCasters } from "./tournament-casters";`).
- **NÃO** adicione barrels em `_data/`, `_hooks/`, `_constants/` — importa direto do arquivo.
## `_data/*.ts` pattern — type + const + helpers juntos
- Getters de mock começam com `getMock*`: `getMockCurrentUser`, `getMockCurrentUserAccount`, `getMockInvitesMe`, `getMockPanelCountsMe`.
- **Nunca** adicione lógica de UI aqui — só shape, seed e helpers puros.
- Helpers booleanos: `is*` / `has*` (`isPlayerFullyVerified`, `hasTournamentOpenSlots`).
- Helpers de formato: `format*` (`formatPlayerKd`).
- Helpers de contagem: `count*` (`countPlayerTournamentWins`).
- Helpers de cálculo: `compute*` / `get*` (`computeTeamWinRatePct`, `getPlayerRankingTopPercentile`).
## Component patterns
### Server vs. Client
- Default = Server Component. `"use client"` só quando há state, effect, hook de evento, ou uso de `useFormContext`/`useSearchParams`/`usePathname`/`useRouter`/`useParams`.
- Hooks em `_hooks/` tipicamente são client (começam com `"use client"`).
- Componentes de listing com filtros (`TournamentsListing`, `PlayersListing`) são client.
- Cards puros que só recebem props podem ser server (ex. `TournamentCasterCard` sem framer-motion).
- Quando usa `framer-motion` (`motion.article`, `AnimatePresence`) → client. Ver `team-card.tsx:1`, `tournament-card.tsx:1`, `tournaments-listing.tsx:1`.
### Forms — react-hook-form + zod
## Reusables — SEMPRE reusar antes de inventar
| Primitivo | Localização | Quando usar |
|-----------|-------------|-------------|
| `EmptyState` | `src/app/(app)/_components/empty-state/empty-state.tsx` | Qualquer "sem resultado" / "nada aqui". Props: `title`, `hint?`, `tone`, `size`, `action?` |
| `KpiCell`, `KpiActionCell` | `src/app/(app)/_components/kpi-cell/kpi-cell.tsx` | Célula de métrica (label + value). `accent="yellow"` para destaques. |
| `SectionHeader` | `src/app/(app)/_components/section-header/` | Título de seção numa página de detalhe |
| `FilterChip` | `src/app/(app)/_components/filter-chip/` | Chips de filtro em listings |
| `SearchInput` | `src/app/(app)/_components/search-input/` | Input de busca com ícone |
| `ListingTabsNav` | `src/app/(app)/_components/listing-tabs-nav/` | Tabs horizontais com counts |
| `Pagination`, `sliceForPage`, `totalPagesFor` | `src/app/(app)/_components/pagination/` | Paginação de listing |
| `DetailBackLink` | `src/app/(app)/_components/detail-back-link/` | Link "← Voltar" no topo de páginas de detalhe |
| `GameBadge`, `VerifiedBadge`, `FraudTagBadge` | `src/components/badges/` | Badges reutilizáveis cross-route |
| `toast()`, `<ToastMockContainer />` | `src/components/ui/toast-mock.tsx` | Mock de toast (tem listener, sem lib externa) |
| `cn(...classes)` | `src/lib/utils.ts` | Merge de classes Tailwind. Usar SEMPRE que condicionar classe. |
| `isNotNull<T>` | `src/lib/type-guards.ts` | Type guard para `.filter(isNotNull)` |
| `formatMonthYearPtBr`, `formatShortDatePtBr`, `formatDayMonthYearPtBr`, `formatCountdownFromNow`, etc. | `src/lib/format-date.ts` | **TODAS** as formatações de data PT-BR. Nunca instanciar `Intl.DateTimeFormat` ad-hoc. |
| `CONTACT` | `src/lib/contact.ts` | Link de WhatsApp comercial + email (singleton) |
| `useActiveRoute(href)` | `src/hooks/use-active-route.ts` | Saber se uma rota está ativa no nav |
## i18n — PT-BR user-facing, English identifiers
- **Todo texto visível ao usuário em PT-BR:** labels, placeholders, mensagens de erro Zod, toasts, aria-labels, títulos, hints.
- **Identificadores (var/func/tipo/arquivo) em inglês**, exceto quando o termo é domínio intraduzível:
- Schemas e regex ficam separados por mensagem/formato brasileiro: `CPF_REGEX`, `phoneBrRegex`, mensagens explícitas em Zod em PT-BR.
## Imports — order and aliases
- SEMPRE use `@/` para navegação entre rotas, shared components, lib utils. Nunca `../../../src/...`.
- Relativos (`./`, `../`) só dentro da mesma rota, quando faz sentido de coesão (mesma feature).
- Exemplo canônico em `settings-me-content.tsx:7-30` (mistura dos dois).
## Error Handling
- `try/catch` em operações async (submit de form, fetch no futuro).
- Narrow de `unknown` com `instanceof Error`, fallback genérico em PT-BR:
- Erro de mock/seed é `throw new Error(...)` com mensagem descritiva. Ver `src/app/(app)/_data/current-user.ts:6-10`.
- Estado de erro de UI modelado como union type:
- Erro de schema Zod é renderizado automaticamente pelos componentes `<FormMessage />` do shadcn.
- Página 404 usa `notFound()` do Next: ver `src/app/(app)/players/[tag]/page.tsx:27`.
## Logging
- Prefixe logs mock com `[mock]` pra facilitar grep.
- Quando backend real entrar, esses pontos viram integração. Não introduza logger novo sem decisão.
## Comments
- JSDoc gigante em cada função.
- Comentário descrevendo o que o código já diz (`// incrementa i`).
- Comentário em inglês quando o resto do arquivo é PT-BR.
## Function design
- Funções curtas, uma responsabilidade. Quando componente passa de ~150 linhas com várias seções, quebrar em subcomponentes/folder (padrão visto em `settings-me-content/`, `tournament-registration-dialog/`).
- Helpers locais de componente (no topo do arquivo, antes do `export function`) são comuns e encorajados — ver `buildSettingsMeSubtitle`, `findSettingsMeTabLabel`, `hasTournamentOpenSlots`.
- Handlers de evento em React: função nomeada dentro do componente (`function handleOpenChange...`) quando usa closure sobre props/state; arrow quando é callback inline curto.
- `useCallback`/`useMemo` quando a função/valor é dependência de `useEffect` ou prop que pode causar re-render; não em todos os lugares. Ver `settings-me-content.tsx:52-73` como exemplo calibrado.
## Module design
- **Named exports only.** `export default` só nos `page.tsx` do App Router (Next obriga) e em `next.config.ts` / layouts. Nada de `export default` em componentes.
- Barrel `index.ts` curto, só reexporta. Nunca lógica.
- Um componente = um arquivo. Sub-peça do mesmo componente pode ficar no mesmo arquivo se for trivial (ex. `KpiCell` e `KpiActionCell` juntos em `kpi-cell.tsx`).
- Schemas de form: preferir `src/lib/schemas/*.ts` quando o form é compartilhado entre rotas; preferir `_constants/[domain].ts` da rota quando é local.
## Linting & formatting
- **ESLint:** `eslint ^9` + `eslint-config-next ^16.2.4` (inclui regras de `next/core-web-vitals`, `next/typescript`, react, react-hooks, jsx-a11y). **Não há `eslint.config.*` custom no repo** — o Next usa config implícita via `next lint` / `eslint-config-next`.
- Comando: `pnpm lint` (ver `package.json:9`).
- **Sem Prettier configurado.** Sem `.prettierrc`. Sem Biome. Formatação é manual seguindo o estilo existente:
- `// eslint-disable-next-line no-console` usado pontualmente quando console é intencional.
## Code review mental (antes de abrir PR)
- [ ] Nome carrega o domínio no final? (`foo` sem sufixo = red flag)
- [ ] Arquivo em kebab-case com prefixo do domínio?
- [ ] Props type declarado localmente, não exportado sem necessidade?
- [ ] Está no `_components/` / `_hooks/` / `_data/` / `_constants/` correto da rota?
- [ ] Reaproveitou `EmptyState` / `KpiCell` / `format*PtBr` / `cn` / `isNotNull` antes de criar novo?
- [ ] Texto user-facing em PT-BR? Identificadores em inglês?
- [ ] `"use client"` presente só quando necessário?
- [ ] Form usa `react-hook-form` + `zod` + `FormProvider` + `useFormContext`?
- [ ] Import com `@/` ao invés de `../../../`?
- [ ] Zero `any`? Zero `console.log` sem `[mock]` e disable comment?
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- **Route Groups** (`(app)` e `(marketing)`) separam a área logada da landing institucional sem afetar URL.
- **Colocation rigorosa por rota**: cada segmento tem seus próprios `_components/`, `_hooks/`, `_data/`, `_constants/`, `_lib/`, `_utils/` (prefixo `_` marca pasta privada não-roteável no App Router).
- **Server Components por padrão**; `"use client"` só nas bordas onde há interação (listings com filtro, dialogs, forms).
- **Mocks locais como "camada de dados"**: arquivos `_data/*.ts` com arrays tipados exportados simulam DB até integração real. Trocáveis sem refatorar as pages.
- **Entidades compartilhadas vivem em `src/app/(app)/_data/`** e são importadas por múltiplas rotas (Player, Team, Tournament, Match, News).
- **Path alias único**: `@/*` → `./src/*` (tsconfig.json).
- **Design system interno**: `@base-ui/react` (headless) + Tailwind v4 + variants locais, sem shadcn como dependency (só CLI via `shadcn@^4`).
## Layers
- Purpose: Fonte única de entidades e helpers de lookup. Simula o que viria de API/DB.
- Location: `src/app/(app)/_data/`
- Contains:
- Depends on: nada além de tipos entre arquivos `_data` (ex: `matches.ts` e `teams.ts` reusam `TournamentGame`).
- Used by: server pages e client components em todas as rotas do `(app)`.
- Purpose: Ler mocks, aplicar transformações de listagem simples (sort/slice/filter editorial), decidir metadata, passar props prontas pra componentes.
- Location: `src/app/(app)/{route}/page.tsx` e `src/app/(app)/{route}/[param]/page.tsx`
- Contains: `metadata`, `generateStaticParams`, `generateMetadata`, `notFound()` para 404s.
- Exemplo canônico: `src/app/(app)/tournaments/page.tsx` calcula `spotlight`, `liveItems`, `tableList` e passa pra `<TournamentsSpotlight>`, `<TournamentsLiveNow>`, `<TournamentsListing>`.
- Depende de: `_data/*`, `_components/*`.
- Exceção: `src/app/(app)/me/page.tsx` e `src/app/(app)/players/[tag]/page.tsx` — o page em si é server (simples `<Suspense>`), mas o conteúdo principal é `"use client"` porque depende de URL params e estado local de tabs/dialog.
- Purpose: Interação — filtros, tabs controladas, dialogs, forms, animações com framer-motion.
- Location: `src/app/(app)/{route}/_components/{feature}/{feature}.tsx` (sempre em subpasta própria).
- Padrão: arquivo componente declara `"use client"` no topo só quando há hook/state/evento.
- Componentes "puros de apresentação" (ex: `TeamCard`, `NewsCard`, `MatchRow`) ainda usam `"use client"` quando têm `framer-motion` para hover.
- Exemplos: `PlayersListing`, `TournamentsListing`, `MatchesListing`, `TeamsListing`, `NewsListing`, `SettingsMeContent`.
- Purpose: Componentes reutilizáveis dentro da área `(app)` — entregam padrão visual consistente sem virar design system global.
- Location: `src/app/(app)/_components/`
- Barrel: `src/app/(app)/_components/index.ts`
- Exports públicos: `AppHeader`, `AppMobileTabBar`, `Pagination` (+ `sliceForPage`, `totalPagesFor`), `SectionHeader`, `FilterChip`, `KpiCell`, `KpiActionCell`, `EmptyState`, `DetailBackLink`, `ListingTabsNav`, `SearchInput`.
- Purpose: Building blocks neutros (form, button, input, dialog) — base-ui wrappers.
- Location: `src/components/ui/`
- Files: `button.tsx`, `dialog.tsx`, `form.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `toast-mock.tsx`.
- Location: `src/components/badges/` — `GameBadge`, `VerifiedBadge`, `FraudTagBadge`.
- Location: `src/components/shared/icons/` — icons SVG customizados (`TrophyIcon`, `SwordsIcon`, `UsersIcon`, `UserRoundIcon`, `NewspaperIcon`, etc.).
- Location: `src/components/shared/header/` — header e mobile tab bar do lado `(marketing)` (separado do header do `(app)`).
- Purpose: Utilitários puros, sem React.
- Location: `src/lib/`
- Files: `utils.ts` (exporta `cn` — clsx + twMerge), `format-date.ts` (formatters `Intl.DateTimeFormat` pt-BR), `type-guards.ts` (`isNotNull`), `contact.ts` (`CONTACT.whatsappUrl`), `schemas/tournament-registration-schema.ts` (Zod).
- Purpose: Hooks agnósticos de rota.
- Location: `src/hooks/`
- Files: `use-active-route.ts`, `use-reduced-motion.ts`.
- `src/config/site.ts` — `siteConfig` (name, description, url, locale "pt-BR").
- `src/config/nav.ts` — nav do lado `(marketing)`.
- `src/app/(app)/_config/app-nav.ts` — nav do header/tab bar da área `(app)` (`appNav` com Torneios/Partidas/Times/Players/Notícias).
## Data Flow
- **URL como state** para navegação persistente: tab ativa (`?tab=`), filtros compartilháveis (`?q=`, `?game=`, `?team=`).
- **`useState` local** para interações efêmeras (dialog open, page number, search term não serializado).
- **Zero estado global**: sem Context, Redux, Zustand, Jotai. Cada rota resolve o seu.
- **`useMemo`** em todas as transformações de listagem para evitar recompute em re-renders de filhos.
## Key Abstractions
- Purpose: Encapsular filtros + paginação de uma rota.
- Examples: `src/app/(app)/tournaments/_hooks/use-tournaments-filter.ts`, `src/app/(app)/players/_hooks/use-players-filter.ts`, `src/app/(app)/me/_hooks/use-settings-me-tab.ts`.
- Pattern: retorna `{ state, setters, filtered/counts, filterKey }`. `filterKey` é uma string derivada pra AnimatePresence (evita `JSON.stringify`).
- Purpose: Raíz client que monta filtros + grid + pagination. Sempre em `_components/{route}-listing/{route}-listing.tsx`.
- Pattern: importa hook, monta subcomponentes (`ListingTabs`, `ListingSearchAndGame`, `ListingGrid`) todos colocados no mesmo diretório.
- Examples: `tournaments-listing/tournaments-listing.tsx`, `players-listing/players-listing.tsx`.
- Purpose: Visual de uma entidade em grid.
- Examples: `TeamCard` em `teams/_components/team-card/team-card.tsx`, `TournamentCard`, `PlayerCard`, `NewsCard`, `MatchRow`.
- Pattern: `"use client"` com `motion.article`, recebe entidade inteira como única prop, usa `KpiCell`/`TournamentGameTag` internos.
- Purpose: Componente unificado de tabs com contagem e ícone.
- Location: `src/app/(app)/_components/listing-tabs-nav/listing-tabs-nav.tsx`
- Pattern: `<ListingTabsNav tabs={TAB_ORDER} active={tab} onChange={setTab} counts={counts} />` — usado por matches, news, teams.
- Purpose: Regra global pra evitar nomes colidirem entre features similares.
- Examples: `SettingsMeProfileTab`, `formSettingsMe`, `submitSettingsMeForm`, `activeTabSettingsMe`, `PlayerKpiGrid`, `TournamentsSponsorRail`, `toggleModalityFilterTournaments`.
- Aplicado em: nomes de componente, hooks, variáveis locais dentro de módulos específicos, handlers.
## Entry Points
- Location: `src/app/layout.tsx`
- Triggers: todo request do domínio.
- Responsibilities: carrega fontes `Chakra_Petch`, `Inter`, `Geist_Mono`; define `<html lang>` via `siteConfig.locale` ("pt-BR"); define `metadata.title.template` `"%s · Arretados"`.
- Location: `src/app/(app)/layout.tsx`
- Triggers: qualquer rota dentro de `(app)` — `/me`, `/tournaments`, `/tournaments/[slug]`, `/teams`, `/players`, `/players/[tag]`, `/matches`, `/news`, `/standings`.
- Responsibilities: renderiza `<AppHeader>` (desktop), `<AppMobileTabBar>` (mobile), `<ToastMockContainer>`. Define container `bg-background text-foreground min-h-screen flex flex-col` e padding mobile pro tab bar (`pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0`).
- Location: `src/app/(marketing)/layout.tsx`
- Triggers: `/`, `/cases`, `/cases/[slug]`, `/servicos/[slug]`.
- Responsibilities: renderiza `<Header>` e `<MobileTabBar>` de `@/components/shared/header` (diferentes dos do `(app)`).
- Location: `src/app/(marketing)/page.tsx`
- Triggers: rota `/`.
- Responsibilities: compõe seções institucionais (Hero, StatsBar, ServicesSection, ProcessSection, CasesSection, Testimonial, Faq, FinalCta, SiteFooter).
- `src/app/(app)/me/page.tsx` → `/me` (settings do usuário logado, renderiza `<SettingsMeContent>` dentro de `<Suspense>`).
- `src/app/(app)/tournaments/page.tsx` → `/tournaments` (spotlight + live-now + tabela filtrável).
- `src/app/(app)/tournaments/[slug]/page.tsx` → `/tournaments/[slug]` (hero + regulamento + times inscritos + partidas + casters). Tem `generateStaticParams` e `generateMetadata`.
- `src/app/(app)/teams/page.tsx` → `/teams`.
- `src/app/(app)/players/page.tsx` → `/players`.
- `src/app/(app)/players/[tag]/page.tsx` → `/players/[tag]` (inteira `"use client"`, usa `useParams`).
- `src/app/(app)/matches/page.tsx` → `/matches`.
- `src/app/(app)/news/page.tsx` → `/news` (destaque + grid).
- Location: `src/app/not-found.tsx`
- Triggers: `notFound()` em qualquer page ou rota inválida. Tema esports (hero 404 full-bleed, CTAs pra home/cases/whatsapp).
- Location: `src/app/api/` — existe mas está vazia nesta fase (mocks in-memory cobrem tudo).
## Error Handling
- `findXBy...(slug) ?? notFound()` nas páginas de detalhe.
- `throw new Error(...)` em mocks quando assumption quebra em build time (ex: `current-user.ts` valida que o mock tag existe).
- Form validation: `zodResolver(Schema)` dentro de `useForm`, mensagens de erro em pt-BR inline no schema (`"Mínimo 3 caracteres"`).
## Cross-Cutting Concerns
- Client-side: Zod schemas em `src/lib/schemas/` (globais) e em `_constants/` por rota (ex: `me/_constants/settings-me.ts` tem `SettingsMeProfileSchema`).
- URL params: cada hook de filtro valida via `VALID_X` arrays e type-guards locais (ex: `isTournamentsFilterTab`, `parseGame`).
- Mockada via `getMockCurrentUser()` em `src/app/(app)/_data/current-user.ts` — retorna `PLAYERS` com tag `"yancastro"`.
- Não há middleware, sessão ou guard real. Área `(app)` é acessível sem login; a "logada" é visual.
- Fonts do Google carregadas em `src/app/layout.tsx` como CSS variables (`--font-chakra-petch` para display, `--font-inter` para body, `--font-geist-mono` para mono).
- Tailwind v4 (`@tailwindcss/postcss`), classes utility em todos os componentes, `cn()` de `src/lib/utils.ts` para merge.
- Brand tokens: `brand-red`, `brand-yellow`, `brand-green` (definidos em `src/app/globals.css`).
- `framer-motion` para transições de lista (`AnimatePresence` com `filterKey`), hover em cards (`motion.article whileHover={{ y: -3 }}`), stagger em grids.
- `use-reduced-motion` em `src/hooks/` respeita preferência do usuário.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
