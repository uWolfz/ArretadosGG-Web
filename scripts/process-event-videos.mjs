// Converte vídeos brutos de evento (.MOV/.MP4) em MP4 otimizado pra web
// e extrai poster .webp. Usa ffmpeg do PATH.
//
// Flags (CLI args):
//   --match=<substring>   processa só arquivos cujo basename contenha a substring
//   --limit=<n>           processa no máx n arquivos (após o --match)
//   --duration=<n>        corta pros primeiros n segundos (loop de hero/card)
//   --crf=<n>             override do CRF do H.264 (default 26)
//   --max-dim=<n>         maior dimensão em px (default 1280, i.e. ~720p)
//   --with-webm           adiciona encoding VP9/WebM (default: só MP4)
//   --force               re-encoda mesmo se já existir saída
//
// Saída:
//   public/eventos-web/{event-slug}/{slug}.mp4           H.264, muted, faststart
//   public/eventos-web/{event-slug}/{slug}.webm          opcional, VP9
//   public/eventos-web/{event-slug}/{slug}-poster.webp   frame @ 1s pra poster
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, mkdir, stat, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const execFileP = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const INPUT_DIR = resolve(root, "public/eventos");
const OUTPUT_DIR = resolve(root, "public/eventos-web");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

const MAX_DIM = Number(args["max-dim"] ?? 1280);    // cap na maior dimensão (h/v agnóstico)
const MAX_FPS = 30;
const H264_CRF = Number(args.crf ?? 26);
const VP9_CRF = 34;
const DURATION = args.duration ? Number(args.duration) : null;
const POSTER_SECOND = 1;
const POSTER_MAX_WIDTH = 2000;
const POSTER_QUALITY = 82;
const WITH_WEBM = Boolean(args["with-webm"]);

const VIDEO_EXTS = new Set([".mov", ".mp4", ".m4v"]);

// Fit dentro de uma caixa MAX_DIM × MAX_DIM, preservando aspect ratio, dimensões pares.
// Funciona pra horizontal e vertical sem caso especial.
const SCALE_FILTER = `scale=w=${MAX_DIM}:h=${MAX_DIM}:force_original_aspect_ratio=decrease:force_divisible_by=2`;

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

async function run(cmd, argv) {
  try {
    await execFileP(cmd, argv, { maxBuffer: 1024 * 1024 * 64 });
  } catch (err) {
    const stderr = err.stderr?.toString?.() ?? "";
    throw new Error(`${cmd} failed: ${stderr.split("\n").slice(-5).join("\n") || err.message}`);
  }
}

function trimFlags() {
  return DURATION ? ["-t", String(DURATION)] : [];
}

async function encodeH264(input, output) {
  await run("ffmpeg", [
    "-y",
    "-i", input,
    ...trimFlags(),
    "-vf", SCALE_FILTER,
    "-r", String(MAX_FPS),
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", String(H264_CRF),
    "-profile:v", "high",
    "-level", "4.1",
    "-pix_fmt", "yuv420p",
    "-an",
    "-movflags", "+faststart",
    output,
  ]);
}

async function encodeVp9(input, output) {
  await run("ffmpeg", [
    "-y",
    "-i", input,
    ...trimFlags(),
    "-vf", SCALE_FILTER,
    "-r", String(MAX_FPS),
    "-c:v", "libvpx-vp9",
    "-crf", String(VP9_CRF),
    "-b:v", "0",
    "-deadline", "good",
    "-cpu-used", "2",
    "-pix_fmt", "yuv420p",
    "-an",
    output,
  ]);
}

async function extractPoster(input, output) {
  // ffmpeg do brew não traz libwebp built-in — extrai PNG e converte via sharp.
  const tmp = `${output}.tmp.png`;
  await run("ffmpeg", [
    "-y",
    "-ss", String(POSTER_SECOND),
    "-i", input,
    "-frames:v", "1",
    "-vf", `scale='min(${POSTER_MAX_WIDTH},iw)':-2`,
    tmp,
  ]);
  await sharp(tmp).webp({ quality: POSTER_QUALITY }).toFile(output);
  await rm(tmp);
}

if (!existsSync(INPUT_DIR)) {
  console.error(`Input dir not found: ${INPUT_DIR}`);
  process.exit(1);
}

try {
  await run("ffmpeg", ["-version"]);
} catch {
  console.error("ffmpeg not found in PATH. Install with: brew install ffmpeg");
  process.exit(1);
}

const allFiles = await walk(INPUT_DIR);
let videos = allFiles.filter((p) => VIDEO_EXTS.has(extname(p).toLowerCase()));

if (args.match) {
  const needle = String(args.match).toLowerCase();
  videos = videos.filter((p) => basename(p).toLowerCase().includes(needle));
}
if (args.limit) {
  videos = videos.slice(0, Number(args.limit));
}

const total = videos.length;
let done = 0;
let failed = 0;
let bytesIn = 0;
let bytesOut = 0;

console.log(
  `ffmpeg pipeline · ${total} video(s) · crf=${H264_CRF} · max-dim=${MAX_DIM}` +
    (DURATION ? ` · cut=${DURATION}s` : "") +
    (WITH_WEBM ? " · +webm" : "") +
    `\n`,
);

for (const input of videos) {
  const rel = relative(INPUT_DIR, input);
  const parts = rel.split("/");
  const eventFolder = parts[0];
  const nameNoExt = basename(rel, extname(rel));
  const eventSlug = slugify(eventFolder);
  const slug = slugify(nameNoExt);

  const outDir = join(OUTPUT_DIR, eventSlug);
  const mp4Path = join(outDir, `${slug}.mp4`);
  const webmPath = join(outDir, `${slug}.webm`);
  const posterPath = join(outDir, `${slug}-poster.webp`);

  await mkdir(outDir, { recursive: true });

  const t0 = Date.now();
  try {
    const inStat = await stat(input);
    bytesIn += inStat.size;

    if (args.force || !existsSync(mp4Path)) {
      process.stdout.write(`  [${done + 1}/${total}] ${eventSlug}/${slug}  mp4...`);
      await encodeH264(input, mp4Path);
    } else {
      process.stdout.write(`  [${done + 1}/${total}] ${eventSlug}/${slug}  mp4 ✓ (cached)`);
    }

    if (WITH_WEBM) {
      if (args.force || !existsSync(webmPath)) {
        process.stdout.write(" webm...");
        await encodeVp9(input, webmPath);
      } else {
        process.stdout.write(" webm ✓");
      }
    }

    if (args.force || !existsSync(posterPath)) {
      process.stdout.write(" poster...");
      await extractPoster(input, posterPath);
    } else {
      process.stdout.write(" poster ✓");
    }

    const mp4Stat = await stat(mp4Path);
    const webmStat = WITH_WEBM ? await stat(webmPath) : null;
    const posterStat = await stat(posterPath);
    bytesOut += mp4Stat.size + (webmStat?.size ?? 0) + posterStat.size;

    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    const inMb = (inStat.size / 1024 / 1024).toFixed(1);
    const mp4Mb = (mp4Stat.size / 1024 / 1024).toFixed(1);
    const webmMb = webmStat ? (webmStat.size / 1024 / 1024).toFixed(1) : "—";
    const posterKb = (posterStat.size / 1024).toFixed(0);
    console.log(
      `\n    in ${inMb}MB → mp4 ${mp4Mb}MB · webm ${webmMb}MB · poster ${posterKb}KB  (${secs}s)`,
    );
    done++;
  } catch (err) {
    failed++;
    console.log(`\n    FAIL: ${err.message}`);
  }
}

const mbIn = (bytesIn / 1024 / 1024).toFixed(1);
const mbOut = (bytesOut / 1024 / 1024).toFixed(1);
const savedPct = bytesIn === 0 ? 0 : ((1 - bytesOut / bytesIn) * 100).toFixed(0);

console.log(`
Done.
  Processed: ${done} video(s) (${mbIn}MB → ${mbOut}MB, -${savedPct}%)
  Failed: ${failed}
  Output: ${OUTPUT_DIR}
`);
