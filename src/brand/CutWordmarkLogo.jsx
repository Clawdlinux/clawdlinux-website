import { useId } from 'react';
import { getBrandPalette } from './brandTokens';

export default function CutWordmarkLogo({ mode = 'dark', compact = false, height = 72, title = 'Clawdlinux' }) {
  const palette = getBrandPalette(mode);
  const maskId = `cut-wordmark-${useId().replaceAll(':', '')}`;
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
      <defs>
        <mask id={maskId}>
          <rect width="360" height="96" fill="black" />
          <text x="8" y="68" fill="white" fontFamily="'Space Grotesk', sans-serif" fontSize="58" fontWeight="700" letterSpacing="-2.8">
            {compact ? 'c' : 'clawdlinux'}
          </text>
          <g fill="black" transform="rotate(-18 34 48)">
            <rect x="18" y="25" width="7" height="28" rx="2" />
            <rect x="29" y="20" width="7" height="31" rx="2" />
            <rect x="40" y="17" width="7" height="34" rx="2" />
          </g>
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <rect width="212" height="96" fill={palette.primary} />
        <rect x="212" width="148" height="96" fill={palette.accent} />
      </g>

      {!compact && (
        <path d="M154 22L166 12L159 34" fill={palette.accent} opacity="0.95" />
      )}
    </svg>
  );
}