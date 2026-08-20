import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Plain external link, not embedded: the Calendly widget is a third-party
// script and this product's whole pitch is not leaking access or loading
// trackers on a security page.
const CALENDLY_URL = 'https://calendly.com/007ssancheti';

const withAlpha = (hex, alpha) => `${hex}${alpha}`;

export default function DesignPartnerCTA() {
  const { currentTheme, theme } = useTheme();
  const t = currentTheme;

  return (
    <section
      style={{ background: t.bg.primary }}
      className="py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto rounded-2xl"
        style={{
          padding: '40px 36px',
          background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : t.bg.secondary,
          border: `1px solid ${withAlpha(t.accent.teal, '30')}`,
        }}
      >
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: t.text.primary,
            margin: '0 0 16px',
          }}
        >
          We are looking for design partners.
        </h3>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: t.text.secondary, margin: '0 0 14px' }}>
          Clawdlinux is early. We are not selling a licence yet. We are looking
          for teams running agents against real systems who will tell us where
          this breaks.
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: t.text.secondary, margin: '0 0 14px' }}>
          You get direct access to the people building it and influence over
          what ships next. We get the thing we actually need, which is the
          truth about your constraints.
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: t.text.secondary, margin: '0 0 24px' }}>
          If your agents touch production, or personal data, or anything an
          auditor will ask about later, book twenty minutes.
        </p>

        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 22px',
            borderRadius: 10,
            background: t.accent.teal,
            color: theme === 'dark' ? '#05080f' : '#ffffff',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Book a call
          <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}
