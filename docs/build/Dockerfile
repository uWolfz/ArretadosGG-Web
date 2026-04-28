# Imagem de build dos PDFs institucionais Arretados.
# Casa com a versão que gerou o baseline v0 (WeasyPrint 68.1) pra evitar
# drift visual entre releases.
FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpango-1.0-0 \
    libpangoft2-1.0-0 \
    libharfbuzz0b \
    libffi-dev \
    fontconfig \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir weasyprint==68.1

WORKDIR /docs
