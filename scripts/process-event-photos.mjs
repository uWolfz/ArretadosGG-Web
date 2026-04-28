// Converte fotos brutas de evento (HEIC/JPG/JPEG) em WebP otimizado pra web.
// Pipeline: sips (HEIC→JPEG via API nativa do macOS) → sharp (resize+webp).
// Vídeos (.MOV/.MP4) são ignorados aqui — rodar script separado com ffmpeg.
// .AAE (anotação do app Fotos do iOS) é ignorado.
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  readdir,
  mkdir,
  stat,
  rm,
} from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const execFileP = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const INPUT_DIR = resolve(root, "public/eventos");
const OUTPUT_DIR = resolve(root, "public/eventos-web");
const IMAGE_MAX_WIDTH = 2400;
const WEBP_QUALITY = 82;

const IMAGE_EXTS = new Set([".heic", ".jpg", ".jpeg", ".png"]);
const VIDEO_EXTS = new Set([".mov", ".mp4", ".m4v"]);
const IGNORE_EXTS = new Set([".aae", ".ds_store"]);

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      const nested = await walk(p);
      files.push(...nested);
    } else {
      files.push(p);
    }
  }
  return files;
}

async function processImage(input, output) {
  const ext = extname(input).toLowerCase();
  if (ext === ".heic") {
    const tmp = `${output}.tmp.jpg`;
    await execFileP("sips", [
      "-s",
      "format",
      "jpeg",
      input,
      "--out",
      tmp,
    ]);
    await sharp(tmp)
      .rotate()
      .resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(output);
    await rm(tmp);
  } else {
    await sharp(input)
      .rotate()
      .resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(output);
  }
}

if (!existsSync(INPUT_DIR)) {
  console.error(`Input dir not found: ${INPUT_DIR}`);
  process.exit(1);
}

const files = await walk(INPUT_DIR);
const total = files.length;
let processed = 0;
let skippedVideo = 0;
let skippedOther = 0;
let failed = 0;
let bytesIn = 0;
let bytesOut = 0;

console.log(`Scanning ${total} files in ${INPUT_DIR}...\n`);

for (const input of files) {
  const rel = relative(INPUT_DIR, input);
  const parts = rel.split("/");
  const eventFolder = parts[0];
  const fileName = parts.slice(1).join("/");
  const ext = extname(input).toLowerCase();
  const nameNoExt = basename(fileName, ext);

  if (IGNORE_EXTS.has(ext)) {
    skippedOther++;
    continue;
  }

  if (VIDEO_EXTS.has(ext)) {
    skippedVideo++;
    continue;
  }

  if (!IMAGE_EXTS.has(ext)) {
    skippedOther++;
    console.log(`  skip (unsupported ${ext}): ${rel}`);
    continue;
  }

  const eventSlug = slugify(eventFolder);
  const outName = `${slugify(nameNoExt)}.webp`;
  const outDir = join(OUTPUT_DIR, eventSlug);
  const outPath = join(outDir, outName);

  await mkdir(outDir, { recursive: true });

  try {
    const inStat = await stat(input);
    await processImage(input, outPath);
    const outStat = await stat(outPath);
    bytesIn += inStat.size;
    bytesOut += outStat.size;
    processed++;
    const inKb = (inStat.size / 1024).toFixed(0);
    const outKb = (outStat.size / 1024).toFixed(0);
    const pct = ((outStat.size / inStat.size) * 100).toFixed(0);
    console.log(
      `  ok  [${processed}] ${eventSlug}/${outName}  ${inKb}KB → ${outKb}KB (${pct}%)`,
    );
  } catch (err) {
    failed++;
    console.error(`  FAIL ${rel}: ${err.message}`);
  }
}

const mbIn = (bytesIn / 1024 / 1024).toFixed(1);
const mbOut = (bytesOut / 1024 / 1024).toFixed(1);
const savedPct = bytesIn === 0 ? 0 : ((1 - bytesOut / bytesIn) * 100).toFixed(0);

console.log(`
Done.
  Processed: ${processed} images (${mbIn}MB → ${mbOut}MB, -${savedPct}%)
  Skipped videos: ${skippedVideo} (precisa de ffmpeg)
  Skipped outros (AAE/etc): ${skippedOther}
  Failed: ${failed}
  Output: ${OUTPUT_DIR}
`);
