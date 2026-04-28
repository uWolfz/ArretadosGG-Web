import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const input = resolve(
  root,
  "public/Logos - Institucional/Logo completa - Arretados.png",
);
const output = resolve(
  root,
  "public/Logos - Institucional/Logo completa - Arretados - sem-fundo.png",
);

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const bgR = data[0];
const bgG = data[1];
const bgB = data[2];
console.log(`Detected background RGB: ${bgR}, ${bgG}, ${bgB}`);

// Sample corners
const samplePixel = (x, y) => {
  const i = (y * info.width + x) * 4;
  return [data[i], data[i + 1], data[i + 2]];
};
console.log("Top-left:", samplePixel(0, 0));
console.log("Top-right:", samplePixel(info.width - 1, 0));
console.log("Bottom-left:", samplePixel(0, info.height - 1));
console.log("Bottom-right:", samplePixel(info.width - 1, info.height - 1));
console.log("Center:", samplePixel(info.width / 2 | 0, info.height / 2 | 0));

// Scan min(minCh) along extreme edges
const minOnEdge = (axis) => {
  let minVal = 255;
  let atIdx = -1;
  if (axis === "top") {
    for (let x = 0; x < info.width; x++) {
      const [r, g, b] = samplePixel(x, 0);
      const m = Math.min(r, g, b);
      if (m < minVal) {
        minVal = m;
        atIdx = x;
      }
    }
  }
  if (axis === "bottom") {
    for (let x = 0; x < info.width; x++) {
      const [r, g, b] = samplePixel(x, info.height - 1);
      const m = Math.min(r, g, b);
      if (m < minVal) {
        minVal = m;
        atIdx = x;
      }
    }
  }
  if (axis === "left") {
    for (let y = 0; y < info.height; y++) {
      const [r, g, b] = samplePixel(0, y);
      const m = Math.min(r, g, b);
      if (m < minVal) {
        minVal = m;
        atIdx = y;
      }
    }
  }
  if (axis === "right") {
    for (let y = 0; y < info.height; y++) {
      const [r, g, b] = samplePixel(info.width - 1, y);
      const m = Math.min(r, g, b);
      if (m < minVal) {
        minVal = m;
        atIdx = y;
      }
    }
  }
  return { minVal, atIdx };
};
console.log("Min on top edge:", minOnEdge("top"));
console.log("Min on bottom edge:", minOnEdge("bottom"));
console.log("Min on left edge:", minOnEdge("left"));
console.log("Min on right edge:", minOnEdge("right"));

const opaqueBelow = 100;
const transparentAbove = 170;
for (let i = 0; i < data.length; i += 4) {
  const minCh = Math.min(data[i], data[i + 1], data[i + 2]);
  let alpha;
  if (minCh >= transparentAbove) {
    alpha = 0;
  } else if (minCh <= opaqueBelow) {
    alpha = 255;
  } else {
    alpha = Math.round(
      ((transparentAbove - minCh) / (transparentAbove - opaqueBelow)) * 255,
    );
  }
  data[i + 3] = alpha;
}

let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] > 0) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;
console.log(
  `Crop bbox: ${minX},${minY} → ${maxX},${maxY} (${cropWidth}×${cropHeight})`,
);

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
  .png()
  .toFile(output);

console.log(`Saved: ${output}`);
