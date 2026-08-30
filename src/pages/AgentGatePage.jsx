import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  KeyRound,
  Link2,
  ShieldCheck,
  Clipboard,
  Check,
  Tag,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import DesignPartnerCTA from '../components/DesignPartnerCTA';

const REPO_URL = 'https://github.com/Clawdlinux/agentgate';
const RELEASE_URL = 'https://github.com/Clawdlinux/agentgate/releases/latest';
const RELEASES_URL = 'https://github.com/Clawdlinux/agentgate/releases';
const INSTALL_COMMAND = 'docker run ghcr.io/clawdlinux/agentgate:latest';

const POINTS = [
  {
    icon: KeyRound,
    title: 'Attenuated delegation.',
    body: 'Biscuit tokens bound to a specific agent, principal, service and action, verified before anything touches the vault or the upstream API.',
  },
  {
    icon: Link2,
    title: 'Signed receipts.',
    body: 'Every action attempt commits one hash-chained, Ed25519-signed receipt before the response is returned. Gap-free by construction.',
  },
  {
    icon: ShieldCheck,
    title: 'Offline verification.',
    body: 'agentgate-verify checks a chain against a pinned trust file with no network call and no shared secret. Static binary, runs anywhere.',
  },
];

const CONNECTORS = ['GitHub', 'Slack', 'Google Workspace', 'Stripe', 'Calendly'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const withAlpha = (hex, alpha) => `${hex}${alpha}`;

function InstallBlock({ t, theme }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = INSTALL_COMMAND;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        borderRadius: 14,
        background: theme === 'dark' ? withAlpha('#0a0e1a', 'F0') : '#0f172a',
        border: `1px solid ${withAlpha(t.accent.teal, '30')}`,
        padding: '20px 22px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <code
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            color: '#e2e8f0',
            overflowWrap: 'anywhere',
            flex: '1 1 260px',
          }}
        >
          $ {INSTALL_COMMAND}
        </code>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 8,
            border: `1px solid ${withAlpha(t.accent.teal, '40')}`,
            background: withAlpha(t.accent.teal, '14'),
            color: t.accent.teal,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p style={{ fontSize: 13, color: '#94a3b8', margin: '14px 0 0', fontFamily: "'DM Sans', sans-serif" }}>
        Binaries for linux, macOS and Windows on the{' '}
        <a href={RELEASES_URL} target="_blank" rel="noreferrer" style={{ color: t.accent.teal }}>
          releases page
        </a>.
      </p>
    </div>
  );
}

export default function AgentGatePage() {
  const { currentTheme, theme } = useTheme();
  const t = currentTheme;

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Back-to-products breadcrumb */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px 0' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: t.text.secondary,
              fontFamily: "'IBM Plex Mono', monospace",
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = t.accent.teal)}
            onMouseLeave={(e) => (e.currentTarget.style.color = t.text.secondary)}
          >
            <ArrowLeft size={14} />
            Capabilities / AgentGate
          </Link>
        </motion.div>
      </div>

      {/* Hero */}
      <section style={{ padding: '72px 24px 48px' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}
        >
          <motion.span
            variants={itemVariants}
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 20,
              background: withAlpha(t.accent.teal, '15'),
              border: `1px solid ${withAlpha(t.accent.teal, '30')}`,
              color: t.accent.teal,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'IBM Plex Mono', monospace",
              marginBottom: 24,
            }}
          >
            AGENTGATE
          </motion.span>

          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: t.text.primary,
              margin: '0 0 24px',
            }}
          >
            Agents never see your tokens.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: t.text.secondary,
              maxWidth: 700,
              margin: '0 auto 36px',
            }}
          >
            A thin API gateway that lets AI agents call SaaS APIs on behalf of
            users. It handles OAuth, encrypted token storage and request
            proxying. Every action produces a signed, gap-free receipt that
            anyone can verify offline, without our key.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}
          >
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
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
              <Github size={16} />
              View on GitHub
            </a>
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 10,
                border: `1px solid ${t.border.medium}`,
                color: t.text.primary,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Tag size={16} />
              v0.1.1 release
            </a>
          </motion.div>

          <motion.div variants={itemVariants} style={{ maxWidth: 640, margin: '0 auto' }}>
            <InstallBlock t={t} theme={theme} />
          </motion.div>
        </motion.div>
      </section>

      {/* Three points */}
      <section style={{ padding: '48px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 24,
            marginBottom: 56,
          }}
        >
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={itemVariants}
                style={{
                  padding: '28px 24px',
                  borderRadius: 16,
                  background: t.bg.secondary,
                  border: `1px solid ${t.border.light}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: withAlpha(t.accent.teal, '18'),
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} style={{ color: t.accent.teal }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: t.text.primary,
                    margin: '0 0 10px',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: t.text.secondary, margin: 0 }}>
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Connectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
              color: t.text.tertiary,
              fontFamily: "'IBM Plex Mono', monospace",
              marginBottom: 16,
            }}
          >
            Connectors
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {CONNECTORS.map((c) => (
              <span
                key={c}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  background: t.bg.secondary,
                  border: `1px solid ${t.border.light}`,
                  fontSize: 13,
                  color: t.text.primary,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <DesignPartnerCTA />
    </div>
  );
}
