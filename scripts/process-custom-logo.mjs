import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";

const SRC = join(os.homedir(), "Downloads", "ChatGPT Image Jun 2, 2026, 04_32_43 PM.png");
const outDir = join(process.cwd(), "public", "brand");
mkdirSync(outDir, { recursive: true });

const meta = await sharp(SRC).metadata(); // 1536 x 1024

// Manual crop fractions of the source (logo is centred).
const fx = 0.15, fy = 0.30, fw = 0.73, fh = 0.37;
const left = Math.round(meta.width * fx);
const top = Math.round(meta.height * fy);
const width = Math.round(meta.width * fw);
const height = Math.round(meta.height * fh);
const pad = 28;

await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .extract({ left, top, width, height })
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" })
  .png()
  .toFile(join(outDir, "logo-custom.png"));

const f = await sharp(join(outDir, "logo-custom.png")).metadata();
console.log(`full crop @ ${left},${top} ${width}x${height}  -> ${f.width}x${f.height} aspect ${(f.width / f.height).toFixed(2)}`);

// --- Emblem (sun + leaf) crop -> square mark for favicon ---
const mLeft = Math.round(meta.width * 0.150);
const mTop = Math.round(meta.height * 0.30);
const mW = Math.round(meta.width * 0.153);
const mH = Math.round(meta.height * 0.265);
const side = Math.max(mW, mH) + 36;

const markBuf = await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .extract({ left: mLeft, top: mTop, width: mW, height: mH })
  .toBuffer();

// center the emblem on a square white canvas
await sharp({
  create: { width: side, height: side, channels: 4, background: "#ffffff" },
})
  .composite([{ input: markBuf, gravity: "center" }])
  .png()
  .toFile(join(outDir, "logo-mark-custom.png"));

console.log(`mark crop @ ${mLeft},${mTop} ${mW}x${mH} -> ${side}x${side}`);

// Favicons (rounded square tile look via white bg)
const appDir = join(process.cwd(), "app");
const markSquare = await sharp(join(outDir, "logo-mark-custom.png")).toBuffer();
await sharp(markSquare).resize(256, 256).png().toFile(join(appDir, "icon.png"));
await sharp(markSquare).resize(180, 180).png().toFile(join(appDir, "apple-icon.png"));
console.log("favicons updated: app/icon.png, app/apple-icon.png");
