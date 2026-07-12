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
// opentype.js corrupts the scaled toPathData for some glyphs (emits NaN), which
// makes the renderer silently drop the glyph. The raw font-unit glyph path is
// clean, so we emit each glyph from its raw path with a scale+flip transform.
function glyphRun(font, text, fontSize, letterSpacing) {
  const scale = fontSize / font.unitsPerEm;
  let cx = 0;
  const paths = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    paths.push({ d: glyph.path.toPathData(1), x: cx, k: scale });
    cx += glyph.advanceWidth * scale + letterSpacing;
  }
  return { paths, width: cx };
}

function textGroup(run, fill, tx, ty) {
  const inner = run.paths
    .map(
      (p) =>
        `<path transform="translate(${p.x.toFixed(2)} 0) scale(${p.k.toFixed(5)} ${(-p.k).toFixed(5)})" d="${p.d}" />`,
    )
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

// ── Community stickers: distinct sarcastic scenes ──
// Each scene matches its slogan (ship it, curfew, sandbox). Shared frame:
// dark badge, two-line caption, wordmark bottom-right.
function softHalo(id, cx, cy, r, color) {
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="${color}" stop-opacity="0.28" /><stop offset="100%" stop-color="${color}" stop-opacity="0" /></radialGradient>`;
}

function groundShadow(cx, cy, rx) {
  return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.22).toFixed(1)}" fill="#000000" opacity="0.28" />`;
}

// Mascot robot with a screen-visor face, expression, and posable arms.
function agentRobot(tx, ty, s, body, accent, opts = {}) {
  const belly = '#a7b3c6';
  const visor = '#0e1a30';
  const ink = '#12203a';
  const expr = opts.expr || 'smile';
  const arms = opts.arms || 'rest';
  const mouths = {
    smile: `<path d="M-9 -57 Q0 -49 9 -57" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" />`,
    grin: `<path d="M-11 -59 Q0 -47 11 -59 Z" fill="${ink}" />`,
    flat: `<path d="M-8 -55 L8 -55" stroke="${ink}" stroke-width="4" stroke-linecap="round" />`,
    sleepy: `<path d="M-7 -55 Q0 -51 7 -55" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round" />`,
    dead: `<ellipse cx="0" cy="-55" rx="4.5" ry="5.5" fill="${ink}" />`,
  };
  const armSets = {
    rest: `<path d="M-46 -16 q-18 6 -20 24" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round" /><path d="M46 -16 q18 6 20 24" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round" />`,
    up: `<path d="M-44 -20 q-22 -8 -28 -30" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round" /><path d="M44 -20 q22 -8 28 -30" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round" />`,
    grip: `<path d="M-40 -22 q-10 -20 -8 -42" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round" /><path d="M40 -22 q10 -20 8 -42" fill="none" stroke="${body}" stroke-width="16" stroke-linecap="round" />`,
  };
  const eyeOpen = expr === 'sleepy'
    ? `<path d="M-20 -83 q5 4 10 0" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" /><path d="M10 -83 q5 4 10 0" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round" />`
    : expr === 'dead'
    ? `<path d="M-20 -88 L-10 -78 M-20 -78 L-10 -88" stroke="${accent}" stroke-width="4" stroke-linecap="round" /><path d="M10 -88 L20 -78 M10 -78 L20 -88" stroke="${accent}" stroke-width="4" stroke-linecap="round" />`
    : `<circle cx="-15" cy="-83" r="6.5" fill="${accent}" /><circle cx="15" cy="-83" r="6.5" fill="${accent}" /><circle cx="-13" cy="-85" r="2.4" fill="#ffffff" /><circle cx="17" cy="-85" r="2.4" fill="#ffffff" />`;
  const svg = `<g transform="translate(${tx} ${ty}) scale(${s})">
    ${armSets[arms]}
    <rect x="-46" y="-46" width="92" height="70" rx="20" fill="${body}" />
    <rect x="-30" y="-34" width="60" height="46" rx="12" fill="${belly}" opacity="0.5" />
    <path d="M24 -22 A15 15 0 1 0 24 8" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" />
    <path d="M-20 24 L-24 50" stroke="${body}" stroke-width="16" stroke-linecap="round" />
    <path d="M20 24 L28 48" stroke="${body}" stroke-width="16" stroke-linecap="round" />
    <line x1="0" y1="-106" x2="0" y2="-130" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" />
    <circle cx="0" cy="-134" r="8" fill="${accent}" />
    <rect x="-40" y="-108" width="80" height="62" rx="19" fill="${body}" />
    <rect x="-28" y="-98" width="56" height="30" rx="13" fill="${visor}" />
    ${eyeOpen}
    <circle cx="-27" cy="-60" r="6" fill="${accent}" opacity="0.3" />
    <circle cx="27" cy="-60" r="6" fill="${accent}" opacity="0.3" />
    ${mouths[expr]}
  </g>`;
  return { svg, collar: { x: tx, y: ty - 106 * s } };
}

function stickerFrame(size, l1, l2, scene) {
  const p = PALETTES.dark;
  const rx = Math.round(size * 0.16);
  const capFs = Math.round(size * 0.07);
  const cap1 = glyphRun(spaceGrotesk, l1, capFs, -1);
  const cap2 = glyphRun(spaceGrotesk, l2, capFs, -1);
  const wmScale = (size * 0.32) / 360;
  const wmX = size - size * 0.045 - 360 * wmScale;
  const wmY = size - size * 0.045 - 96 * wmScale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${rx}" fill="${p.background}" />
  <rect x="7" y="7" width="${size - 14}" height="${size - 14}" rx="${rx - 7}" fill="none" stroke="${p.accent}" stroke-opacity="0.22" stroke-width="4" />
  ${textGroup(cap1, p.primary, (size - cap1.width) / 2, size * 0.155)}
  ${textGroup(cap2, p.accent, (size - cap2.width) / 2, size * 0.245)}
  ${scene}
  <g transform="translate(${wmX.toFixed(1)} ${wmY.toFixed(1)}) scale(${wmScale})">${wordmarkInner('dark')}</g>
</svg>`;
}

function sparkles(pts, color) {
  return pts.map(([x, y, r]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}" />`).join('');
}

// Scene 1: ship it. A rocket carrying the governed agent; incident crossed out.
function rocket(cx, cy, s) {
  const a = PALETTES.dark.accent;
  const body = '#e2e8f0';
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M-20 66 Q0 150 20 66 Q0 92 -20 66 Z" fill="#fbbf24" />
    <path d="M-11 68 Q0 118 11 68 Q0 86 -11 68 Z" fill="#f59e0b" />
    <path d="M0 -96 C36 -58 34 24 24 64 L-24 64 C-34 24 -36 -58 0 -96 Z" fill="${body}" />
    <path d="M0 -96 C18 -78 26 -52 29 -34 L-29 -34 C-26 -52 -18 -78 0 -96 Z" fill="${a}" />
    <path d="M-24 26 L-50 72 L-24 60 Z" fill="${a}" />
    <path d="M24 26 L50 72 L24 60 Z" fill="${a}" />
    <circle cx="0" cy="-6" r="21" fill="#0e1a30" />
    <circle cx="0" cy="-6" r="21" fill="none" stroke="${a}" stroke-width="4" />
    <circle cx="-7" cy="-8" r="5" fill="${a}" />
    <circle cx="7" cy="-8" r="5" fill="${a}" />
    <circle cx="-5.5" cy="-9.5" r="1.7" fill="#ffffff" />
    <circle cx="8.5" cy="-9.5" r="1.7" fill="#ffffff" />
    <path d="M-6 2 Q0 8 6 2" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round" />
    <path d="M0 26 l15 5 v11 c0 11 -9 17 -15 20 c-6 -3 -15 -9 -15 -20 v-11 Z" fill="${a}" />
    <path d="M-6 42 l4 4 l9 -10" fill="none" stroke="#05080f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>`;
}

function noIncident(cx, cy, s) {
  const g = '#94a3b8';
  const r = '#ef4444';
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M-13 4 C-13 -11 -7 -18 0 -18 C7 -18 13 -11 13 4 L17 10 L-17 10 Z" fill="${g}" />
    <circle cx="0" cy="-19" r="3" fill="${g}" />
    <path d="M-5 10 a5 5 0 0 0 10 0" fill="${g}" />
    <circle cx="0" cy="-4" r="29" fill="none" stroke="${r}" stroke-width="6" />
    <line x1="-20" y1="17" x2="20" y2="-25" stroke="${r}" stroke-width="6" stroke-linecap="round" />
  </g>`;
}

function shipStickerSVG(size) {
  const a = PALETTES.dark.accent;
  const scene =
    `<defs>${softHalo('shipHalo', size * 0.57, size * 0.5, size * 0.34, a)}</defs>` +
    `<circle cx="${(size * 0.57).toFixed(1)}" cy="${(size * 0.5).toFixed(1)}" r="${(size * 0.34).toFixed(1)}" fill="url(#shipHalo)" />` +
    sparkles(
      [
        [size * 0.3, size * 0.44, 4],
        [size * 0.78, size * 0.4, 5],
        [size * 0.82, size * 0.58, 3],
        [size * 0.7, size * 0.72, 3],
      ],
      a,
    ) +
    rocket(size * 0.57, size * 0.55, size / 440) +
    noIncident(size * 0.26, size * 0.66, size / 620);
  return stickerFrame(size, 'SHIP AGENTS,', 'NOT INCIDENTS', scene);
}

// Scene 2: curfew. The governed agent stays behind bars at night; clock + moon.
function crescentMoon(cx, cy, r, color, bg) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" /><circle cx="${(cx + r * 0.5).toFixed(1)}" cy="${(cy - r * 0.28).toFixed(1)}" r="${(r * 0.86).toFixed(1)}" fill="${bg}" />`;
}

function clockFace(cx, cy, r, color, accent) {
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const ang = (i * Math.PI) / 6;
    const x1 = cx + Math.cos(ang) * (r - 6);
    const y1 = cy + Math.sin(ang) * (r - 6);
    const x2 = cx + Math.cos(ang) * r;
    const y2 = cy + Math.sin(ang) * r;
    ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="3" />`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="5" />${ticks}<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${(cy - r * 0.5).toFixed(1)}" stroke="${accent}" stroke-width="5" stroke-linecap="round" /><line x1="${cx}" y1="${cy}" x2="${(cx + r * 0.6).toFixed(1)}" y2="${(cy - r * 0.18).toFixed(1)}" stroke="${accent}" stroke-width="5" stroke-linecap="round" /><circle cx="${cx}" cy="${cy}" r="4" fill="${accent}" />`;
}

function curfewStickerSVG(size) {
  const p = PALETTES.dark;
  const rs = size / 520;
  const cx = size * 0.5;
  const groundY = size * 0.72;
  const bot = agentRobot(cx, groundY, rs, '#8a97ad', p.accent, { expr: 'sleepy', arms: 'grip' });
  const bx0 = cx - size * 0.14;
  const bx1 = cx + size * 0.14;
  const bTop = size * 0.46;
  const bBot = size * 0.79;
  let bars = `<line x1="${bx0.toFixed(1)}" y1="${bTop}" x2="${bx1.toFixed(1)}" y2="${bTop}" stroke="#5b6675" stroke-width="7" stroke-linecap="round" /><line x1="${bx0.toFixed(1)}" y1="${bBot}" x2="${bx1.toFixed(1)}" y2="${bBot}" stroke="#5b6675" stroke-width="7" stroke-linecap="round" />`;
  for (let x = bx0; x <= bx1 + 1; x += size * 0.056) {
    bars += `<line x1="${x.toFixed(1)}" y1="${bTop}" x2="${x.toFixed(1)}" y2="${bBot}" stroke="#5b6675" stroke-width="7" stroke-linecap="round" />`;
  }
  const zzzRun = glyphRun(spaceGrotesk, 'z z', Math.round(size * 0.03), 1);
  const zzz = textGroup(zzzRun, '#94a3b8', cx + size * 0.11, size * 0.5);
  const scene =
    `<defs>${softHalo('curfewHalo', cx, size * 0.62, size * 0.3, p.accent)}</defs>` +
    `<circle cx="${cx.toFixed(1)}" cy="${(size * 0.62).toFixed(1)}" r="${(size * 0.3).toFixed(1)}" fill="url(#curfewHalo)" />` +
    crescentMoon(size * 0.23, size * 0.39, size * 0.052, '#e2e8f0', p.background) +
    sparkles([[size * 0.32, size * 0.33, 3], [size * 0.69, size * 0.33, 4], [size * 0.82, size * 0.45, 3]], '#e2e8f0') +
    groundShadow(cx, groundY + 54 * rs, size * 0.12) +
    bot.svg +
    bars +
    zzz +
    clockFace(size * 0.77, size * 0.4, size * 0.056, '#94a3b8', p.accent);
  return stickerFrame(size, 'MY AGENT HAS', 'A CURFEW', scene);
}

// Scene 3: sandbox. The governed agent plays in a literal sandpit.
function sandboxStickerSVG(size) {
  const p = PALETTES.dark;
  const rs = size / 500;
  const cx = size * 0.5;
  const sandTop = size * 0.6;
  const bot = agentRobot(cx, sandTop - 4 * rs, rs, '#8a97ad', p.accent, { expr: 'grin', arms: 'up' });
  const sand = '#d6b98c';
  const sandDark = '#b8965f';
  const halo = `<defs>${softHalo('sandHalo', cx, size * 0.46, size * 0.3, p.accent)}</defs><circle cx="${cx.toFixed(1)}" cy="${(size * 0.46).toFixed(1)}" r="${(size * 0.3).toFixed(1)}" fill="url(#sandHalo)" />`;
  const backRim = `<ellipse cx="${cx}" cy="${sandTop.toFixed(1)}" rx="${(size * 0.25).toFixed(1)}" ry="${(size * 0.05).toFixed(1)}" fill="${sandDark}" />`;
  const front = `<path d="M${(size * 0.25).toFixed(1)} ${(size * 0.82).toFixed(1)} L${(size * 0.3).toFixed(1)} ${sandTop.toFixed(1)} L${(size * 0.7).toFixed(1)} ${sandTop.toFixed(1)} L${(size * 0.75).toFixed(1)} ${(size * 0.82).toFixed(1)} Z" fill="${sand}" stroke="${sandDark}" stroke-width="4" stroke-linejoin="round" />`;
  const castle = `<g transform="translate(${(size * 0.58).toFixed(1)} ${(size * 0.7).toFixed(1)})"><rect x="0" y="0" width="46" height="34" rx="3" fill="${sandDark}" /><rect x="-3" y="-12" width="14" height="14" fill="${sandDark}" /><rect x="16" y="-16" width="14" height="18" fill="${sandDark}" /><rect x="35" y="-12" width="14" height="14" fill="${sandDark}" /><path d="M23 -16 l0 -12 l10 5 Z" fill="${p.accent}" /></g>`;
  const bucket = `<g transform="translate(${(size * 0.33).toFixed(1)} ${(size * 0.72).toFixed(1)})"><path d="M0 2 L30 2 L26 32 L4 32 Z" fill="${p.accent}" /><path d="M0 2 a15 5 0 0 1 30 0" fill="#1d4ed8" /><path d="M2 -2 a13 9 0 0 1 26 0" fill="none" stroke="#1d4ed8" stroke-width="3" /></g>`;
  const scene = halo + backRim + bot.svg + front + castle + bucket;
  return stickerFrame(size, 'IT WORKED IN', 'THE SANDBOX', scene);
}

// Scene 4: token limit. The agent is maxed out; context meter pegged at 100%.
function tokenLimitStickerSVG(size) {
  const p = PALETTES.dark;
  const rs = size / 520;
  const cx = size * 0.5;
  const groundY = size * 0.76;
  const bot = agentRobot(cx, groundY, rs, '#8a97ad', p.accent, { expr: 'dead', arms: 'rest' });
  // context meter, pegged full with an overflow tick
  const mw = size * 0.42;
  const mh = size * 0.05;
  const mx = cx - mw / 2;
  const my = size * 0.44;
  const label = glyphRun(spaceGrotesk, 'context', Math.round(size * 0.026), 0);
  const meter =
    textGroup(label, '#94a3b8', mx, my - size * 0.018) +
    `<rect x="${mx.toFixed(1)}" y="${my.toFixed(1)}" width="${mw.toFixed(1)}" height="${mh.toFixed(1)}" rx="${(mh / 2).toFixed(1)}" fill="#1e293b" stroke="#334155" stroke-width="2" />` +
    `<rect x="${mx.toFixed(1)}" y="${my.toFixed(1)}" width="${mw.toFixed(1)}" height="${mh.toFixed(1)}" rx="${(mh / 2).toFixed(1)}" fill="#ef4444" />` +
    `<rect x="${(mx + mw + 8).toFixed(1)}" y="${(my + mh * 0.15).toFixed(1)}" width="${(mh * 0.7).toFixed(1)}" height="${(mh * 0.7).toFixed(1)}" rx="3" fill="#ef4444" opacity="0.8" />` +
    `<rect x="${(mx + mw + 8 + mh).toFixed(1)}" y="${(my + mh * 0.15).toFixed(1)}" width="${(mh * 0.55).toFixed(1)}" height="${(mh * 0.7).toFixed(1)}" rx="3" fill="#ef4444" opacity="0.5" />`;
  const sweat = `<path transform="translate(${(cx + 46 * rs).toFixed(1)} ${(groundY - 118 * rs).toFixed(1)})" d="M0 0 c7 10 7 17 0 17 c-7 0 -7 -7 0 -17 Z" fill="${p.accent}" />`;
  const scene =
    `<defs>${softHalo('tokHalo', cx, size * 0.62, size * 0.3, '#ef4444')}</defs>` +
    `<circle cx="${cx.toFixed(1)}" cy="${(size * 0.62).toFixed(1)}" r="${(size * 0.3).toFixed(1)}" fill="url(#tokHalo)" />` +
    meter +
    groundShadow(cx, groundY + 54 * rs, size * 0.12) +
    bot.svg +
    sweat;
  return stickerFrame(size, 'I HIT THE', 'TOKEN LIMIT', scene);
}

// ── Emit ──
async function png(svg, out, width, density = 384) {
  const buf = Buffer.from(svg);
  await sharp(buf, { density }).resize({ width }).png().toFile(out);
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

  // Community stickers (sarcastic, dev-friendly scenes)
  const stickers = [
    ['sticker-ship-agents', shipStickerSVG(1024)],
    ['sticker-curfew', curfewStickerSVG(1024)],
    ['sticker-sandbox', sandboxStickerSVG(1024)],
    ['sticker-token-limit', tokenLimitStickerSVG(1024)],
  ];
  for (const [name, svg] of stickers) {
    await png(svg, join(brandDir, `${name}-1024.png`), 1024);
    svgFile(svg, join(brandDir, `${name}.svg`));
  }

  // Print-ready set for a booth/printer (set PRINT_DIR to an output folder).
  // Example: PRINT_DIR=~/Downloads/clawdlinux-print node scripts/export-brand.mjs
  const printDir = process.env.PRINT_DIR;
  if (printDir) {
    mkdirSync(printDir, { recursive: true });
    const kit = [
      ...stickers,
      ['sticker-badge', stickerSVG(1024)],
      ['sticker-mark-diecut', stickerMarkSVG(1024)],
    ];
    for (const [name, svg] of kit) {
      svgFile(svg, join(printDir, `${name}.svg`));
      await png(svg, join(printDir, `${name}-2048.png`), 2048);
    }
    svgFile(standeeSVG(1200, 2400), join(printDir, 'standee.svg'));
    await png(standeeSVG(1200, 2400), join(printDir, 'standee-2400.png'), 2400, 220);
    svgFile(wordmarkSVG('dark'), join(printDir, 'wordmark-dark.svg'));
    svgFile(wordmarkSVG('mono'), join(printDir, 'wordmark-mono.svg'));
    console.log(`\nprint kit written to ${printDir}`);
  }

  console.log('\ndone');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
