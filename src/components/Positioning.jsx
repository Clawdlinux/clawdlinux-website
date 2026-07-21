import { motion } from 'framer-motion';
import { Layers, Shield, DollarSign, Zap, ArrowRight, Clock } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const PILLARS = [
  {
    icon: Shield,
    title: 'Self-Managed and Offline-Licensed',
    desc: 'NetworkPolicy objects and gVisor mutation are generated in cluster. Enforcement requires a compatible CNI and runsc. Full air-gap installation proof remains a release gate.',
    stat: 'No license callback',
  },
  {
    icon: DollarSign,
    title: 'Agent FinOps',
    desc: 'The CostReporter interface supports usage and estimated-cost integrations. The default reporter is no-op, and the in-memory reporter is for local evaluation.',
    stat: 'Pluggable reporter',
  },
  {
    icon: Layers,
    title: 'K8s-Native CRDs',
    desc: 'AgentWorkload, AgentCard, Tenant — first-class Kubernetes resources. Deploy agents with kubectl apply. Scale with HPA. Monitor with Prometheus.',
    stat: '3 CRDs',
  },
  {
    icon: Zap,
    title: 'Runtime Adapters',
    desc: 'Registered adapters cover Argo DAGs, bring-your-own pods, and kagent. Governance-label parity is still being completed across every path.',
    stat: '3 registered',
  },
];

const TIMELINE = [
  {
    phase: 'Now',
    title: 'Every company needs agents',
    detail: 'LLMs can reason. Tools exist. Deploying autonomous agents with isolation, governance, and cost control still needs cluster-level integration.',
  },
  {
    phase: 'Problem',
    title: 'Controls sit below the framework',
    detail: 'Agent frameworks focus on agent logic. Governance must still be applied at the pod, network, policy, and evidence layers.',
  },
  {
    phase: 'Solution',
    title: 'Governance around agent runtimes',
    detail: 'Clawdlinux is a runtime-agnostic, in-cluster governance and evidence plane. Runtime selection stays behind registered adapters.',
  },
  {
    phase: 'Moat',
    title: 'In-cluster governance and evidence',
    detail: 'Direct actions use an in-process Go evaluator. Rego assets exist, but real OPA execution is not yet proven. Offline licensing supports self-managed deployments.',
  },
];

export default function Positioning() {
  const { currentTheme } = useTheme();
  const t = currentTheme;

  return (
    <section
      id="positioning"
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
        style={{ textAlign: 'center', marginBottom: 64 }}
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
          <Clock size={14} style={{ color: t.accent.teal }} />
          <span style={{ color: t.accent.teal, fontSize: 13, fontWeight: 600, fontFamily: 'IBM Plex Mono' }}>
            WHY NOW
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
          The operational layer
          <br />
          <span style={{ color: t.accent.teal }}>agents are missing</span>
        </h2>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 17,
            color: t.text.secondary,
            maxWidth: 640,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Agent runtimes focus on execution. Clawdlinux adds workload, policy, cost, and evidence
          components without becoming the runtime.
        </p>
      </motion.div>

      {/* Four pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          marginBottom: 80,
        }}
      >
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              padding: 28,
              borderRadius: 14,
              background: t.bg.secondary,
              border: `1px solid ${t.border}`,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `${t.accent.teal}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <p.icon size={22} style={{ color: t.accent.teal }} />
            </div>
            <div
              style={{
                fontFamily: 'IBM Plex Mono',
                fontSize: 12,
                color: t.accent.teal,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {p.stat}
            </div>
            <h3
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 19,
                fontWeight: 700,
                color: t.text.primary,
                margin: '0 0 8px',
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                color: t.text.secondary,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Why now timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 700,
            color: t.text.primary,
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          The window is open — but closing
        </h3>

        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{
                display: 'flex',
                gap: 20,
                marginBottom: 32,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flexShrink: 0, paddingTop: 4 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: t.accent.teal,
                    boxShadow: `0 0 12px ${t.accent.teal}40`,
                  }}
                />
                {i < TIMELINE.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 48,
                      background: `${t.accent.teal}30`,
                      margin: '4px auto 0',
                    }}
                  />
                )}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 11,
                    fontWeight: 600,
                    color: t.accent.teal,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  {item.phase}
                </div>
                <h4
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 17,
                    fontWeight: 700,
                    color: t.text.primary,
                    margin: '0 0 6px',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14,
                    color: t.text.secondary,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: 48 }}
      >
        <a
          href="https://github.com/Clawdlinux/agentic-operator-core"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 32px',
            borderRadius: 10,
            background: t.accent.teal,
            color: '#000',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            transition: 'transform 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Explore on GitHub <ArrowRight size={16} />
        </a>
        <p
          style={{
            marginTop: 12,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            color: t.accent.teal,
          }}
        >
          Assisted pilots are available for regulated workload evaluations.
        </p>
      </motion.div>
    </section>
  );
}
