# Pipeline de PDFs institucionais

Gera os documentos da marca a partir de HTML+CSS usando WeasyPrint dentro
de container. Saída vai pra `docs/build/output/` (gitignored).

## Rodar

```bash
pnpm docs:build
```

Requer Docker Desktop rodando. Primeira execução baixa a imagem base
(~150 MB) e instala WeasyPrint; próximas rodam em segundos com cache.

## Estrutura

```
docs/
  sources/
    _shared/         CSS compartilhado (brand, layout, reset)
    regulamento/     HTML do manual de regulamento
    briefing-tecnico/ HTML do briefing técnico
  build/
    Dockerfile       WeasyPrint 68.1 sobre python:3.12-slim
    build-pdf.py     Script Python que orquestra a conversão
    build.mjs        Wrapper Node invocado pelo pnpm
    output/          PDFs de draft (gitignored)

  arretados-regulamento-v0.pdf          PDFs tageados (frozen)
  arretados-briefing-tecnico-v0.pdf
```

## Release de nova versão

1. Edita o HTML/CSS em `docs/sources/<doc>/`.
2. `pnpm docs:build` → valida `docs/build/output/<doc>-draft.pdf`.
3. Quando aprovado, copia pro nome tageado (bump manual da versão):
   ```bash
   cp docs/build/output/arretados-regulamento-draft.pdf \
      docs/arretados-regulamento-v1.pdf
   git rm docs/arretados-regulamento-v0.pdf   # se for release major
   git add docs/arretados-regulamento-v1.pdf
   ```
4. Commit com `docs: bump regulamento v0 → v1 (<mudança>)`.

Manter PDFs versionados commitados permite consulta rápida sem rebuild e
histórico visual auditável no git log.
