#!/usr/bin/env node
// Orquestrador do build de PDFs institucionais.
// Constrói a imagem Docker (cache rápido depois da primeira vez) e roda
// WeasyPrint montando docs/ como volume. Saída em docs/build/output/.
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(here, "..");
const imageTag = "arretados-docs-builder";

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

try {
  execSync("docker info", { stdio: "ignore" });
} catch {
  console.error(
    "\nDocker daemon não está rodando. Abra o Docker Desktop e tente de novo.",
  );
  process.exit(1);
}

run(`docker build -t ${imageTag} "${here}"`);
run(
  `docker run --rm -v "${docsDir}":/docs ${imageTag} python build/build-pdf.py`,
);
