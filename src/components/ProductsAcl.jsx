import { motion } from 'framer-motion';
import {
  Boxes,
  Shield,
  ArrowRight,
  CheckCircle2,
  Github,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
const OPERATOR_GITHUB = 'https://github.com/Clawdlinux/agentic-operator-core';

const CAPABILITIES = [
  {
    badge: 'CORE CAPABILITY',
    icon: Boxes,
    name: 'Runtime governance',
    tag: 'Control agents in Kubernetes',
    summary:
      'Regulated control layer for agent workloads. gVisor injection, Cilium policy, OPA guardrails, audit trails, and per-tenant budgets.',
    highlights: [
      { icon: CheckCircle2, text: 'AgentWorkload path plus external pod compatibility' },
      { icon: CheckCircle2, text: 'Cilium FQDN egress + OPA admission' },
      { icon: CheckCircle2, text: 'Tamper-evident audit chain' },
      { icon: CheckCircle2, text: 'Per-workload OpenMeter cost attribution' },
    ],
    cta: { label: 'Runtime code on GitHub', href: OPERATOR_GITHUB },
    accentKey: 'teal',
  },
  {
    badge: 'CORE CAPABILITY',
    icon: Shield,
    name: 'Audit and evidence',
    tag: 'Prove what agents did',
    summary:
      'Tamper-evident action ledger with an offline verifier, deterministic replay of any agent decision, and OpenTelemetry GenAI traces for cost and failure analysis.',
    highlights: [
      { icon: CheckCircle2, text: 'Hash-chained audit log plus audit-verify binary' },
      { icon: CheckCircle2, text: 'Deterministic replay of historical decisions' },
      { icon: CheckCircle2, text: 'OpenTelemetry GenAI spans, cost and latency rollups' },
      { icon: CheckCircle2, text: 'Air-gapped, offline-verifiable evidence' },
    ],
    cta: { label: 'Operator on GitHub', href: OPERATOR_GITHUB },
    accentKey: 'teal',
  },
];

const SHARED_THESIS = [
  {
    title: 'One audience',
    detail:
      'Platform teams shipping agents into regulated environments — finance, healthcare, government, sovereign cloud.',
  },
  {
    title: 'One thesis',
    detail:
      'Agents need controls existing platform tools were not built to prove.',
  },
  {
    title: 'One system',
    detail:
      'Runtime governance and a tamper-evident audit ledger enforce controls around agent execution.',
  },
];

export default function ProductsAcl() {
  const { currentTheme } = useTheme();
  const t = currentTheme;

  return (
    <section
      id="products"
      style={{
        padding: '100px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 56 }}
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
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: t.accent.teal,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'IBM Plex Mono, monospace',
            }}
          >
            ONE PRODUCT · COMPOSABLE CAPABILITIES
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: t.text.primary,
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}
        >
          One Clawdlinux system.
          <br />
          <span style={{ color: t.accent.teal }}>Capabilities that work together.</span>
        </h2>
        <p
          style={{
            fontSize: 18,
            color: t.text.secondary,
            maxWidth: 720,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Clawdlinux combines runtime governance and tamper-evident audit for
          production AI agents in regulated environments.
        </p>
      </motion.div>

      {/* Capability cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 24,
          marginBottom: 64,
        }}
      >
        {CAPABILITIES.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.a
              key={p.name}
              href={p.cta.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 28px',
                borderRadius: 16,
                background: t.bg.card,
                border: `1px solid ${t.border.default}`,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: `${t.accent.teal}15`,
                  color: t.accent.teal,
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: 0.5,
                  marginBottom: 20,
                }}
              >
                {p.badge}
              </div>

              {/* Icon + name */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${t.accent.teal}20`,
                  }}
                >
                  <Icon size={22} style={{ color: t.accent.teal }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 22,
                      fontWeight: 700,
                      color: t.text.primary,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.name}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontSize: 14,
                  color: t.text.secondary,
                  fontFamily: 'IBM Plex Mono, monospace',
                  margin: '0 0 16px',
                }}
              >
                {p.tag}
              </p>

              <p
                style={{
                  fontSize: 15,
                  color: t.text.secondary,
                  lineHeight: 1.65,
                  margin: '0 0 24px',
                }}
              >
                {p.summary}
              </p>

              {/* Highlights */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {p.highlights.map((h) => {
                  const HIcon = h.icon;
                  return (
                    <li
                      key={h.text}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14,
                        color: t.text.primary,
                        lineHeight: 1.5,
                      }}
                    >
                      <HIcon
                        size={16}
                        style={{
                          color: t.accent.teal,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <span>{h.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              <div
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: t.accent.teal,
                  fontFamily: 'IBM Plex Mono, monospace',
                }}
              >
                <Github size={16} />
                {p.cta.label}
                <ArrowRight size={14} />
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Shared thesis row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          padding: '32px',
          borderRadius: 16,
          background: t.bg.card,
          border: `1px solid ${t.border.default}`,
        }}
      >
        {SHARED_THESIS.map((s) => (
          <div key={s.title}>
            <h4
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: t.accent.teal,
                margin: '0 0 8px',
              }}
            >
              {s.title}
            </h4>
            <p
              style={{
                fontSize: 14,
                color: t.text.secondary,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {s.detail}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
