import { Resvg } from "@resvg/resvg-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";

// ---- Shared artwork (matches components/brand/logo.tsx) ----
const grad = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FF8A4B"/>
  <stop offset="1" stop-color="#FF5A1F"/>
</linearGradient>`;

const sprout = `
  <rect x="4" y="4" width="56" height="56" rx="17" fill="url(#g)"/>
  <rect x="4" y="4" width="56" height="28" rx="17" fill="#ffffff" fill-opacity="0.10"/>
  <path d="M32 50 C 32 42 31 35 31 29" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <path d="M31 35 C 24.5 35.5 18 32 16.4 23.2 C 24.7 22.2 30.6 26.3 31 35 Z" fill="#ffffff"/>
  <path d="M31 31 C 37.6 31 44.7 27.4 46.2 18.4 C 38 17.4 31.6 22 31 31 Z" fill="#ffffff" fill-opacity="0.9"/>`;

const markGroup = (scale, tx, ty) =>
  `<g transform="translate(${tx},${ty}) scale(${scale})">${sprout}</g>`;

// Icon-only (transparent)
const svgMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${grad}</defs>${sprout}</svg>`;

// Icon on a padded background (for app/social icons that want a filled square)
const svgMarkPadded = (bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${bg}"/>${`<defs>${grad}</defs>`}${markGroup(0.82, 5.8, 5.8)}</svg>`;

// Full lockup: mark + wordmark
const svgLockup = (freshColor) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 120">
  <defs>${grad}</defs>
  ${markGroup(1.5, 8, 12)}
  <text x="120" y="76" font-family="Segoe UI, Arial, sans-serif" font-size="56" font-weight="700" letter-spacing="-1.5">
    <tspan fill="${freshColor}">Fresh</tspan><tspan fill="#FF6B35">Harvest</tspan>
  </text>
</svg>`;

const fontOpts = {
  loadSystemFonts: true,
  fontDirs: ["C:/Windows/Fonts"],
  defaultFontFamily: "Segoe UI",
};

function render(svg, width, bg = "rgba(0,0,0,0)") {
  const r = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    background: bg,
    font: fontOpts,
  });
  return r.render().asPng();
}

const outDirs = [
  join(process.cwd(), "public", "brand"),
  join(os.homedir(), "Downloads", "FreshHarvest-Logo"),
];
outDirs.forEach((d) => mkdirSync(d, { recursive: true }));

const jobs = [
  { name: "logo-icon.svg", data: svgMark, raw: true },
  { name: "logo-light.svg", data: svgLockup("#2D2D2D"), raw: true },
  { name: "logo-dark.svg", data: svgLockup("#FFFFFF"), raw: true },

  { name: "logo-icon.png", data: render(svgMark, 1024) },
  { name: "logo-icon-512.png", data: render(svgMark, 512) },
  { name: "logo-light.png", data: render(svgLockup("#2D2D2D"), 1100) },
  { name: "logo-dark.png", data: render(svgLockup("#FFFFFF"), 1100) },
  { name: "logo-on-white.png", data: render(svgMarkPadded("#FFFFFF"), 512) },
  { name: "logo-on-dark.png", data: render(svgMarkPadded("#1A1512"), 512) },
];

for (const job of jobs) {
  for (const dir of outDirs) {
    writeFileSync(join(dir, job.name), job.raw ? job.data : job.data);
  }
}

// Favicons for Next.js (app/icon.png + app/apple-icon.png)
const appDir = join(process.cwd(), "app");
writeFileSync(join(appDir, "icon.png"), render(svgMarkPadded("#FF6B35"), 256));
writeFileSync(join(appDir, "apple-icon.png"), render(svgMarkPadded("#FF6B35"), 180));

console.log("✓ Logo assets written to:");
outDirs.forEach((d) => console.log("  - " + d));
console.log("  - app/icon.png, app/apple-icon.png (favicons)");
