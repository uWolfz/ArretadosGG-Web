#!/usr/bin/env python3
"""Gera PDFs dos documentos institucionais Arretados via WeasyPrint.

Lê os HTMLs em ``docs/sources/<slug>/index.html`` e escreve os PDFs em
``docs/build/output/<slug>-draft.pdf``. A promoção de draft para release
versionado (``docs/arretados-<slug>-v{n}.pdf``) é passo manual e consciente:
copia, commit com a mensagem da bump de versão.
"""
from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

from weasyprint import HTML

DOCS_DIR = Path(__file__).resolve().parent.parent
SOURCES_DIR = DOCS_DIR / "sources"
OUTPUT_DIR = DOCS_DIR / "build" / "output"


@dataclass(frozen=True)
class Document:
    slug: str
    output_name: str


DOCUMENTS: tuple[Document, ...] = (
    Document(slug="regulamento", output_name="arretados-regulamento-draft.pdf"),
    Document(
        slug="briefing-tecnico",
        output_name="arretados-briefing-tecnico-draft.pdf",
    ),
)


def build_document(doc: Document) -> Path:
    source = SOURCES_DIR / doc.slug / "index.html"
    if not source.exists():
        raise FileNotFoundError(f"HTML fonte ausente: {source}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUTPUT_DIR / doc.output_name
    HTML(filename=str(source), base_url=str(source.parent)).write_pdf(str(output))
    return output


def main() -> int:
    print(f"Building documents from {SOURCES_DIR.relative_to(DOCS_DIR)}/")
    status = 0
    for doc in DOCUMENTS:
        try:
            result = build_document(doc)
        except FileNotFoundError as exc:
            print(f"  [skip] {doc.slug}: {exc}", file=sys.stderr)
            status = 1
            continue
        size_kb = result.stat().st_size // 1024
        print(f"  [ok]   {doc.slug:<18} -> {result.relative_to(DOCS_DIR)} ({size_kb} KB)")
    return status


if __name__ == "__main__":
    sys.exit(main())
