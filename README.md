# ArretadosGG-Web

Landing institucional da **Arretados** — agência brasileira de operação completa de esports (broadcast, league operations, software, consultoria).

Stack: Next.js 16 (App Router + Turbopack), TypeScript, Tailwind CSS v4, shadcn/ui.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Pastas da raiz

```
src/          código da aplicação (Next.js App Router)
scripts/      pipelines de mídia (HEIC→WebP, MOV→MP4)
public/       assets servidos estaticamente
docs/         PDFs institucionais (manual de marca, briefing, regulamento)
              + docs/build/ (WeasyPrint builder rodado por `pnpm docs:build`)
```

Workspaces locais por máquina, **não entram no repo**:

```
.claude/            configs do Claude Code (hooks, settings, skills)
.planning/          workspace do GSD (phases, roadmap, convenções)
docs/superpowers/   plans/specs do fluxo superpowers
.playwright-mcp/    artefatos de browser automation
```

## Estrutura da aplicação

```
src/app/
├── (marketing)/   landing institucional + cases
├── (app)/         plataforma logada — /tournaments /teams /players /casters /me ...
├── globals.css    Tailwind v4 + tokens de design (:root, .dark, .app-black)
└── layout.tsx
```

Padrão de componente (pós-refactor, ver `.planning/codebase/CONVENTIONS.md`):

```
{nome-componente}/
├── index.tsx           componente (export nomeado)
├── hooks/              hooks acoplados
├── constants/          constants do componente (1 arquivo por constant)
├── utils/              helpers do módulo (1 arquivo por função)
└── components/         sub-componentes extraídos
```

Regras duras: nunca sub-componente no arquivo do pai, nunca helper no `index.tsx`, Props type sempre com nome descritivo (`CasterCardProps`, não só `Props`).

## Assets de evento

Fotos e vídeos crus (HEIC/MOV do iPhone) ficam em `public/eventos/` (ignorado no git).

O pipeline converte pra web em `public/eventos-web/`:

```bash
# fotos HEIC/JPG → WebP otimizado
node scripts/process-event-photos.mjs

# vídeos .MOV/.MP4 → MP4 H.264 muted + poster WebP (requer ffmpeg)
node scripts/process-event-videos.mjs --duration=8
```

Flags do pipeline de vídeo:

- `--match=<substring>` — filtra por nome
- `--limit=<n>` — processa até n arquivos
- `--duration=<n>` — corta pros primeiros n segundos
- `--crf=<n>` — override qualidade (default 26)
- `--with-webm` — adiciona versão VP9/WebM
- `--force` — re-encoda mesmo se saída já existir

## Deploy

Vercel. Conecta o repo e deploya.
