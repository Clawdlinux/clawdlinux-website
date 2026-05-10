import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Boxes, Code2, Shield, Lock } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const GITHUB_ORG = 'https://github.com/Clawdlinux';

const VALUE_PROPS = [
  {
    icon: Shield,
    title: 'Air-gapped by default',
    text: 'Built for FedRAMP, HIPAA, and sovereign-cloud environments. Zero egress unless you allow it.',
  },
  {
    icon: Lock,
    title: 'Open source first',
    text: 'Apache 2.0 cores. CC BY 4.0 specs. Self-host, fork, audit. No surprise vendor lock-in.',
  },
  {
    icon: Boxes,
    title: 'Two products, one stack',
    text: 'The operational layer (Operator) and the data layer (ACL) for production agents.',
  },
];

export default function HomePage() {
  const { currentTheme } = useTheme();
  const t = currentTheme;

  return (
    <>
      {/* Compact hero */}
      <section
        style={{
          minHeight: '78vh',
          padding: '160px 24px 80px',
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 20,
              background: `${t.accent.teal}15`,
              border: `1px solid ${t.accent.teal}30`,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                color: t.accent.teal,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'IBM Plex Mono, monospace',
                letterSpacing: 0.5,
              }}
            >
              CLAWDLINUX · INFRASTRUCTURE FOR PRODUCTION AI AGENTS
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              color: t.text.primary,
              margin: '0 0 24px',
              lineHeight: 1.05,
              letterSpacing: '-0.02px',
            }}
          >
            We build the rails for{' '}
            <span style={{ color: t.accent.teal }}>agents that ship</span>.
          </h1>

          <p
            style={{
              fontSize: 'clamp(17px, 2vw, 21px)',
              color: t.text.secondary,
              maxWidth: 720,
              margin: '0 auto 40px',
              lineHeight: 1.55,
            }}
          >
            Open-source infrastructure for AI agents in regulated environments.
            One operator to run them on Kubernetes. One language to feed them
            90% fewer tokens. Both Apache 2.0, both production today.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 10,
                background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`,
                color: '#03231d',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none',
                transition: 'filter 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1.0)')}
            >
              See the products
              <ArrowRight size={16} />
            </Link>
            <a
              href={GITHUB_ORG}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 10,
                background: t.bg.card,
                border: `1px solid ${t.border.default}`,
                color: t.text.primary,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none',
              }}
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Three short value props */}
      <section
        style={{
          padding: '64px 24px 120px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {VALUE_PROPS.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  padding: '28px 24px',
                  borderRadius: 14,
                  background: t.bg.card,
                  border: `1px solid ${t.border.default}`,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${t.accent.teal}20`,
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} style={{ color: t.accent.teal }} />
                </div>
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 19,
                    fontWeight: 700,
                    color: t.text.primary,
                    margin: '0 0 10px',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    color: t.text.secondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {v.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Mini products preview */}
      <section
        style={{
          padding: '0 24px 120px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <p
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 12,
              fontWeight: 600,
              color: t.accent.teal,
              letterSpacing: 1,
              margin: '0 0 12px',
            }}
          >
            WHAT WE BUILD
          </p>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: t.text.primary,
              margin: 0,
            }}
          >
            Two open-source products.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: 20,
          }}
        >
          {[
            {
              to: '/products/operator',
              icon: Boxes,
              tag: 'Operator',
              title: 'Run agents in Kubernetes',
              text: 'Zero-egress, FedRAMP-ready operator. AgentWorkload CRDs, Cilium policy, Argo DAGs, per-tenant cost attribution.',
            },
            {
              to: '/products/acl',
              icon: Code2,
              tag: 'ACL',
              title: 'Feed agents 90% fewer tokens',
              text: 'Compact agent-native representation format. Three translators ship today: Kubernetes (132×), OpenAPI (68×), Postgres (3.5×).',
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.to}
                to={p.to}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                  borderRadius: 14,
                  background: t.bg.card,
                  border: `1px solid ${t.border.default}`,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = `${t.accent.teal}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = t.border.default;
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${t.accent.teal}20`,
                    }}
                  >
                    <Icon size={18} style={{ color: t.accent.teal }} />
                  </div>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 6,
                      background: `${t.accent.teal}15`,
                      color: t.accent.teal,
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 22,
                    fontWeight: 700,
                    color: t.text.primary,
                    margin: '0 0 10px',
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: t.text.secondary,
                    lineHeight: 1.6,
                    margin: '0 0 18px',
                  }}
                >
                  {p.text}
                </p>
                <span
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: t.accent.teal,
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}
                >
                  Read more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
