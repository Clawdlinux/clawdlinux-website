import { getBrandPalette } from './brandTokens';

/**
 * Canonical Clawdlinux logo.
 *
 * Mark: a sealed containment boundary (three concentric rings) with one
 * aligned opening on the right. The opening is the single declared egress
 * gate, marked by one directional notch. This maps directly to the product:
 * everything inside the boundary is isolated, and only one declared path
 * leaves it.
 *
 * variant "wordmark" renders the mark plus the clawdlinux logotype.
 * variant "mark" renders the sealed-boundary glyph alone (favicon, avatar).
 */
export default function ClawdlinuxLogo({
  variant = 'wordmark',
  mode = 'dark',
  height = 72,
  title = 'Clawdlinux',
}) {
  const palette = getBrandPalette(mode);
  const isMark = variant === 'mark';
  const viewWidth = isMark ? 88 : 360;

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${viewWidth} 96`}
      height={height}
      style={{ width: 'auto', maxWidth: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* Sealed boundary: three nested C-brackets, all opening at one gate. */}
      <g fill="none" stroke={palette.accent} strokeLinecap="round">
        <path d="M72 18H41C22 18 10 31 10 48S22 78 41 78H72" strokeWidth="8" />
        <path d="M65 31H43C33 31 26 38 26 48S33 65 43 65H65" strokeWidth="6" opacity="0.72" />
        <path d="M58 43H46C42 43 40 45 40 48S42 53 46 53H58" strokeWidth="4" opacity="0.46" />
      </g>

      {/* One declared egress: a single directional gate at the opening. */}
      <path d="M69 13L79 18L69 23Z" fill={palette.accent} />

      {!isMark && (
        <g
          fontFamily="'Space Grotesk', sans-serif"
          fontSize="54"
          fontWeight="700"
          letterSpacing="-2.4"
        >
          <text x="88" y="68" fill={palette.primary}>clawd</text>
          <text x="226" y="68" fill={palette.accent}>linux</text>
        </g>
      )}
    </svg>
  );
}
