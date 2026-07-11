import { getBrandPalette } from './brandTokens';

export default function SealCLogo({ mode = 'dark', compact = false, height = 72, title = 'Clawdlinux' }) {
  const palette = getBrandPalette(mode);
  const width = compact ? 80 : 360;

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${width} 96`}
      height={height}
      style={{ width: 'auto', maxWidth: '100%' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill="none" stroke={palette.accent} strokeLinecap="round">
        <path d="M72 18H41C22 18 10 31 10 48S22 78 41 78H72" strokeWidth="8" />
        <path d="M65 31H43C33 31 26 38 26 48S33 65 43 65H65" strokeWidth="6" opacity="0.72" />
        <path d="M58 43H46C42 43 40 45 40 48S42 53 46 53H58" strokeWidth="4" opacity="0.46" />
      </g>
      <path d="M69 13L79 18L69 23Z" fill={palette.accent} />

      {!compact && (
        <g fontFamily="'Space Grotesk', sans-serif" fontSize="54" fontWeight="700" letterSpacing="-2.4">
          <text x="88" y="68" fill={palette.primary}>clawd</text>
          <text x="226" y="68" fill={palette.accent}>linux</text>
        </g>
      )}
    </svg>
  );
}