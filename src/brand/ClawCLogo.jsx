import { getBrandPalette } from './brandTokens';

export default function ClawCLogo({ mode = 'dark', compact = false, height = 72, title = 'Clawdlinux' }) {
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
      <g fill={palette.accent}>
        <path d="M8 42C13 21 32 9 54 12C64 13 72 17 78 24C64 20 51 21 41 27C31 32 24 39 21 47L8 42Z" />
        <path d="M6 53C8 39 19 29 33 26C42 24 50 25 58 29C48 31 40 36 35 43C31 49 30 55 31 61L12 67C7 63 5 58 6 53Z" />
        <path d="M12 72C20 80 32 84 45 82C57 80 67 73 74 64C68 80 53 90 37 89C26 88 17 83 11 76L12 72Z" />
      </g>

      {!compact && (
        <g fontFamily="'Space Grotesk', sans-serif" fontSize="54" fontWeight="700" letterSpacing="-2.4">
          <text x="88" y="68" fill={palette.primary}>lawd</text>
          <text x="211" y="68" fill={palette.accent}>linux</text>
        </g>
      )}
    </svg>
  );
}