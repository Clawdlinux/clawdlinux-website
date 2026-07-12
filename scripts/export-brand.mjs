/**
 * Clawdlinux brand asset generator.
 *
 * Single source of truth for every rendered brand asset. Reads the canonical
 * Seal-C mark geometry plus outlined wordmark/tagline text, then emits SVG
 * sources and PNG exports for the website, GitHub, stickers, and standees.
 *
 * Text is converted to vector paths with opentype.js so PNG rasterization is
 * font-independent and crisp at any size. Run: node scripts/export-brand.mjs
 */
import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';
import QRCode from 'qrcode';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const brandDir = join(pub, 'brand');

// Waitlist / early-access signup embedded as a QR on print assets.
const WAITLIST_URL = 'https://forms.gle/hPQwrtin2gYCeNDy5';

const loadFont = (p) => {
  const b = readFileSync(join(root, p));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const spaceGrotesk = loadFont('scripts/fonts/SpaceGrotesk-Bold.ttf');
const dmSans = loadFont('scripts/fonts/DMSans-Medium.ttf');

// ── Palette (mirrors src/brand/brandTokens.js) ──
const PALETTES = {
  dark: { background: '#05080f', primary: '#e2e8f0', accent: '#60a5fa' },
  light: { background: '#f8fafc', primary: '#172033', accent: '#2563eb' },
  mono: { background: '#ffffff', primary: '#0a0a0a', accent: '#0a0a0a' },
};

// ── Canonical mark geometry (mirrors src/brand/ClawdlinuxLogo.jsx) ──
// Three nested C-brackets opening at one right-side gate, egress notch top-right.
function markGroup(accent) {
  return `
  <g fill="none" stroke="${accent}" stroke-linecap="round">
    <path d="M72 18H41C22 18 10 31 10 48S22 78 41 78H72" stroke-width="8" />
    <path d="M65 31H43C33 31 26 38 26 48S33 65 43 65H65" stroke-width="6" opacity="0.72" />
    <path d="M58 43H46C42 43 40 45 40 48S42 53 46 53H58" stroke-width="4" opacity="0.46" />
  </g>
  <path d="M69 13L79 18L69 23Z" fill="${accent}" />`;
}

// Seal-C art bounding-box centre, used to centre the mark on any canvas.
const ART_CX = 44.5;
const ART_CY = 45.5;
function placeMark(accent, cx, cy, scale) {
  return `<g transform="translate(${(cx - ART_CX * scale).toFixed(2)} ${(cy - ART_CY * scale).toFixed(2)}) scale(${scale})">${markGroup(accent)}</g>`;
}

// ── Text outlining ──
// opentype.js emits NaN when path coordinates are accumulated across glyphs,
// so each glyph is rendered at the origin and positioned with its own
// translate transform. width is the advance total for centering.
function glyphRun(font, text, fontSize, letterSpacing) {
  const scale = fontSize / font.unitsPerEm;
  let cx = 0;
  const paths = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    paths.push({ d: glyph.getPath(0, 0, fontSize).toPathData(3), x: cx });
    cx += glyph.advanceWidth * scale + letterSpacing;
  }
  return { paths, width: cx };
}

function textGroup(run, fill, tx, ty) {
  const inner = run.paths
    .map((p) => `<path transform="translate(${p.x.toFixed(2)} 0)" d="${p.d}" />`)
    .join('');
  return `<g fill="${fill}" transform="translate(${tx} ${ty})">${inner}</g>`;
}

// Horizontally centred line of outlined text.
function centerText(font, text, fontSize, letterSpacing, fill, w, y) {
  const run = glyphRun(font, text, fontSize, letterSpacing);
  return textGroup(run, fill, (w - run.width) / 2, y);
}

// Centred bullet line: accent dot + label.
function bulletLine(text, fontSize, fill, dotColor, w, y) {
  const run = glyphRun(dmSans, text, fontSize, 0);
  const r = fontSize * 0.16;
  const gap = fontSize * 0.7;
  const total = r * 2 + gap + run.width;
  const startX = (w - total) / 2;
  return `<circle cx="${(startX + r).toFixed(2)}" cy="${(y - fontSize * 0.32).toFixed(2)}" r="${r.toFixed(2)}" fill="${dotColor}" />${textGroup(run, fill, startX + r * 2 + gap, y)}`;
}

// QR code rendered as crisp vector modules on a rounded light card.
function qrCard(text, x, y, size, opts = {}) {
  const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  const data = qr.modules.data;
  const quiet = opts.quiet ?? 3;
  const total = n + quiet * 2;
  const cell = size / total;
  const fg = opts.fg ?? '#05080f';
  const bg = opts.bg ?? '#ffffff';
  const pad = opts.pad ?? size * 0.06;
  const cardSize = size + pad * 2;
  const radius = opts.radius ?? cardSize * 0.08;
  let rects = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (data[r * n + c]) {
        const mx = x + pad + (c + quiet) * cell;
        const my = y + pad + (r + quiet) * cell;
        rects += `<rect x="${mx.toFixed(2)}" y="${my.toFixed(2)}" width="${(cell + 0.4).toFixed(2)}" height="${(cell + 0.4).toFixed(2)}" fill="${fg}" />`;
      }
    }
  }
  return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cardSize.toFixed(2)}" height="${cardSize.toFixed(2)}" rx="${radius.toFixed(2)}" fill="${bg}" />${rects}`;
}

// ── Wordmark lockup: mark + "clawd"(primary) + "linux"(accent) ──
// Matches the component: baseline y=68, clawd@88, linux@226, 54px, tracking -2.4
function wordmarkInner(mode) {
  const p = PALETTES[mode];
  const clawd = glyphRun(spaceGrotesk, 'clawd', 54, -2.4);
  const linux = glyphRun(spaceGrotesk, 'linux', 54, -2.4);
  return `${markGroup(p.accent)}
  ${textGroup(clawd, p.primary, 88, 68)}
  ${textGroup(linux, p.accent, 226, 68)}`;
}

function markSVG(mode) {
  const p = PALETTES[mode];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 96" width="88" height="96" role="img" aria-label="Clawdlinux">
  <title>Clawdlinux</title>${markGroup(p.accent)}
</svg>`;
}

function wordmarkSVG(mode) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 96" width="360" height="96" role="img" aria-label="Clawdlinux">
  <title>Clawdlinux</title>
  ${wordmarkInner(mode)}
</svg>`;
}

// ── Rounded dark badge tile with the mark (favicon / avatar) ──
function badgeSVG(size) {
  const p = PALETTES.dark;
  const rx = Math.round(size * 0.22);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="${p.background}" />
  ${placeMark(p.accent, size / 2, size / 2, (size * 0.6) / 96)}
</svg>`;
}

// ── Landscape canvas: og-image / social-preview ──
function canvasSVG(w, h) {
  const p = PALETTES.dark;
  const inner = wordmarkInner('dark');
  const scale = (w * 0.52) / 360;
  const lockW = 360 * scale;
  const lockH = 96 * scale;
  const tx = (w - lockW) / 2;
  const ty = h / 2 - lockH / 2 - h * 0.05;
  const tag = glyphRun(dmSans, 'governance for AI agents on Kubernetes', Math.round(h * 0.045), 0);
  const tagX = (w - tag.width) / 2;
  const tagY = ty + lockH + h * 0.11;
  const featY = tagY + h * 0.135;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="60%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${p.background}" />
  <rect width="${w}" height="${h}" fill="url(#glow)" />
  <g transform="translate(${tx} ${ty}) scale(${scale})">${inner}</g>
  ${textGroup(tag, '#94a3b8', tagX, tagY)}
  ${centerText(dmSans, 'Auditable events  \u00b7  One brain for your company  \u00b7  Single shareable context soon', Math.round(h * 0.03), 0, '#64748b', w, featY)}
</svg>`;
}

// ── Square badge sticker: tile + mark + wordmark ──
function stickerSVG(size) {
  const p = PALETTES.dark;
  const rx = Math.round(size * 0.18);
  const markScale = (size * 0.44) / 96;
  const markW = 96 * markScale;
  const mtx = (size - markW) / 2;
  const mty = size * 0.16;
  const word = glyphRun(spaceGrotesk, 'clawdlinux', Math.round(size * 0.11), -size * 0.006);
  const wtx = (size - word.width) / 2;
  const wty = size * 0.82;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="${p.background}" />
  <rect x="6" y="6" width="${size - 12}" height="${size - 12}" rx="${rx - 6}" fill="none" stroke="${p.accent}" stroke-opacity="0.25" stroke-width="4" />
  <g transform="translate(${mtx} ${mty}) scale(${markScale})">${markGroup(p.accent)}</g>
  ${textGroup(word, p.primary, wtx, wty)}
</svg>`;
}

// ── Transparent die-cut sticker: mark only ──
function stickerMarkSVG(size) {
  const s = size / 96;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <g transform="scale(${s})">${markGroup('#60a5fa')}</g>
</svg>`;
}

// ── Portrait standee: single wordmark lockup + tagline + features + QR + url ──
function standeeSVG(w, h) {
  const p = PALETTES.dark;
  const wordScale = (w * 0.82) / 360;
  const lockW = 360 * wordScale;
  const wtx = (w - lockW) / 2;
  const wty = h * 0.2;
  const fFs = Math.round(w * 0.033);
  const qrModule = w * 0.34;
  const qrPad = qrModule * 0.06;
  const qrCardW = qrModule + qrPad * 2;
  const qrX = (w - qrCardW) / 2;
  const qrY = h * 0.635;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <radialGradient id="g2" cx="50%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.2" />
      <stop offset="100%" stop-color="${p.accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${p.background}" />
  <rect width="${w}" height="${h}" fill="url(#g2)" />
  ${centerText(spaceGrotesk, 'OPEN SOURCE   \u00b7   APACHE 2.0', Math.round(w * 0.024), 6, p.accent, w, h * 0.11)}
  <g transform="translate(${wtx} ${wty}) scale(${wordScale})">${wordmarkInner('dark')}</g>
  ${centerText(dmSans, 'governance for AI agents on Kubernetes', Math.round(w * 0.038), 0, '#94a3b8', w, h * 0.34)}
  <rect x="${(w / 2 - 150).toFixed(2)}" y="${(h * 0.385).toFixed(2)}" width="300" height="2" fill="${p.accent}" opacity="0.35" />
  ${bulletLine('Auditable events for every agent action', fFs, '#cbd5e1', p.accent, w, h * 0.45)}
  ${bulletLine('One brain for your entire company', fFs, '#cbd5e1', p.accent, w, h * 0.48)}
  ${bulletLine('Coming soon: single shareable context', fFs, '#cbd5e1', p.accent, w, h * 0.51)}
  ${centerText(spaceGrotesk, 'Scan to onboard as a pilot', Math.round(w * 0.036), -0.5, p.accent, w, h * 0.6)}
  ${qrCard(WAITLIST_URL, qrX, qrY, qrModule)}
  ${centerText(dmSans, 'Now onboarding pilot customers', Math.round(w * 0.026), 0, '#94a3b8', w, h * 0.87)}
  ${centerText(spaceGrotesk, 'clawdlinux.org', Math.round(w * 0.05), -1, p.accent, w, h * 0.93)}
</svg>`;
}

// ── Emit ──
async function png(svg, out, width) {
  const buf = Buffer.from(svg);
  await sharp(buf, { density: 384 }).resize({ width }).png().toFile(out);
  console.log('png  ', out.replace(root + '/', ''), `${width}px`);
}
function svgFile(svg, out) {
  writeFileSync(out, svg + '\n');
  console.log('svg  ', out.replace(root + '/', ''));
}

async function main() {
  rmSync(brandDir, { recursive: true, force: true });
  mkdirSync(brandDir, { recursive: true });

  // Canonical SVG sources (all three modes)
  for (const mode of ['dark', 'light', 'mono']) {
    svgFile(markSVG(mode), join(brandDir, `clawdlinux-mark-${mode}.svg`));
    svgFile(wordmarkSVG(mode), join(brandDir, `clawdlinux-wordmark-${mode}.svg`));
  }

  // Website primary logo + favicons (public/)
  svgFile(wordmarkSVG('dark'), join(pub, 'logo.svg'));
  await png(badgeSVG(512), join(pub, 'favicon-32.png'), 32);
  await png(badgeSVG(512), join(pub, 'favicon-192.png'), 192);
  await png(badgeSVG(512), join(pub, 'favicon-512.png'), 512);
  await png(badgeSVG(512), join(pub, 'apple-touch-icon.png'), 180);
  await png(canvasSVG(1200, 630), join(pub, 'og-image.png'), 1200);

  // GitHub + share assets (public/brand/)
  await png(canvasSVG(1280, 640), join(brandDir, 'github-social-preview.png'), 1280);
  await png(badgeSVG(512), join(brandDir, 'github-avatar-512.png'), 512);

  // Stickers
  await png(stickerSVG(1024), join(brandDir, 'sticker-badge-1024.png'), 1024);
  await png(stickerMarkSVG(1024), join(brandDir, 'sticker-mark-1024.png'), 1024);

  // Standee (portrait, print-friendly resolution)
  await png(standeeSVG(1200, 2400), join(brandDir, 'standee-1200x2400.png'), 1200);

  console.log('\ndone');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
