import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function NotFoundPage() {
  const { currentTheme } = useTheme();
  const t = currentTheme;
  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '160px 24px 80px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: t.accent.teal, margin: '0 0 12px' }}>
        404
      </p>
      <h1
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          color: t.text.primary,
          margin: '0 0 16px',
        }}
      >
        Page not found
      </h1>
      <p style={{ color: t.text.secondary, fontSize: 16, margin: '0 0 28px' }}>
        That route doesn&rsquo;t exist (yet).
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 22px',
          borderRadius: 10,
          background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`,
          color: '#03231d',
          fontWeight: 700,
          textDecoration: 'none',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        Back to clawdlinux.org
      </Link>
    </section>
  );
}
