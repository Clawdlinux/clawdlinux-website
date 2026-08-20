import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  ShieldCheck,
  FileLock2,
  Repeat,
  GitBranch,
  Database,
  Network,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import DesignPartnerCTA from '../components/DesignPartnerCTA';

const REPO_URL = 'https://github.com/Clawdlinux/agentic-operator-core';
const HELM_PATH = `${REPO_URL}/tree/main/charts/charts/clawdlinux-observability`;
const AUDIT_LOG_PATH = `${REPO_URL}/tree/main/pkg/audit`;
const ANALYZER_PATH = `${REPO_URL}/tree/main/agents/audit_analyzer`;

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Audit integrity primitives',
    body:
      'The audit package provides ordered hash-chain entries, HMAC integrity, JSONL records, and an offline verifier. Same-run signed artifact capture is not connected yet.',
    cta: { label: 'Audit log spec', href: AUDIT_LOG_PATH },
  },
  {
    icon: Repeat,
    title: 'Replay design target',
    body:
      'Deterministic replay remains target work. Current code verifies existing JSONL chains but does not reproduce historical agent decisions.',
    cta: { label: 'Project roadmap', href: `${REPO_URL}/blob/main/ROADMAP.md` },
  },
  {
    icon: FileLock2,
    title: 'Trace schema assets',
    body:
      'The repository includes OpenTelemetry GenAI semantic-convention assets plus clawd.* extensions for AgentWorkload and node attribution.',
    cta: { label: 'Span schema', href: `${REPO_URL}/tree/main/pkg/otel/genai` },
  },
  {
    icon: GitBranch,
    title: 'Failure analysis assets',
    body:
      'Analyzer assets group failing traces for investigation. Operators must validate deployment, model configuration, and data paths in their cluster.',
    cta: { label: 'Analyzer source', href: ANALYZER_PATH },
  },
];

const STACK = [
  { name: 'OpenTelemetry Collector', role: 'OTLP receiver, tail sampling, secret redaction' },
  { name: 'Grafana Tempo', role: 'Distributed trace store' },
  { name: 'Prometheus', role: 'Metrics store; cost & latency rollups' },
  { name: 'Grafana', role: 'Curated dashboards: cost, tool cache, tool failures, LangGraph latency' },
  { name: 'ClickHouse', role: 'Analytical trace and audit queries' },
  { name: 'Qdrant', role: 'Vector store for clustering and similarity search' },
];

const EVIDENCE_USE_CASES = [
  { tag: 'Integrity review', body: 'Recompute a JSONL chain and its HMAC values without trusting the running cluster.' },
  { tag: 'Incident review', body: 'Inspect recorded sequence, timestamps, actors, actions, and payload hashes.' },
  { tag: 'Control mapping', body: 'Map exported evidence to your own controls without treating the software as a certification.' },
  { tag: 'Release gates', body: 'Track same-run capture, deterministic replay, and full air-gap installation proof as explicit gates.' },
];

export default function AuditPage() {
  const { currentTheme: t } = useTheme();

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px 0' }}>
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: t.text.secondary,
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          <ArrowLeft size={16} /> All capabilities
        </Link>
      </div>

      {/* Hero */}
      <section
        style={{
          padding: '48px 24px 64px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 999,
              background: t.bg.secondary,
              border: `1px solid ${t.border.light}`,
              color: t.text.secondary,
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Apache 2.0 · self-managed · offline verifier
          </div>
          <h1
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              color: t.text.primary,
            }}
          >
            Verify an audit chain.
            <br />
            <span style={{ color: t.accent.primary }}>Inspect the records offline.</span>
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.55,
              color: t.text.secondary,
              maxWidth: 760,
            }}
          >
            Clawdlinux Audit provides hash-chain, HMAC, and JSONL verifier primitives.
            Same-run signed artifact capture is not connected. Deterministic replay remains
            target work. Self-managed deployment and offline licensing are available, while
            full air-gap installation proof remains a release gate.
          </p>

          <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={HELM_PATH}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 8,
                background: t.accent.primary,
                color: t.bg.primary,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Database size={16} /> Helm subchart
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 8,
                background: t.bg.secondary,
                color: t.text.primary,
                border: `1px solid ${t.border.light}`,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <Github size={16} /> View source
            </a>
          </div>
        </motion.div>
      </section>

      {/* Pillars grid */}
      <section
        style={{
          padding: '24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: t.text.primary,
            margin: '0 0 24px',
            letterSpacing: '-0.01em',
          }}
        >
          Current audit building blocks.
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {PILLARS.map(({ icon: Icon, title, body, cta }) => (
            <div
              key={title}
              style={{
                padding: 24,
                borderRadius: 12,
                background: t.bg.secondary,
                border: `1px solid ${t.border.light}`,
              }}
            >
              <Icon size={28} color={t.accent.primary} />
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: '12px 0 8px',
                  color: t.text.primary,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: t.text.secondary,
                }}
              >
                {body}
              </p>
              <a
                href={cta.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  color: t.accent.primary,
                  textDecoration: 'none',
                }}
              >
                {cta.label} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Bundled OSS stack */}
      <section
        style={{
          padding: '64px 24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: t.text.primary,
            margin: '0 0 8px',
          }}
        >
          Built on the open-source stack you already trust.
        </h2>
        <p
          style={{
            color: t.text.secondary,
            fontSize: 15,
            margin: '0 0 24px',
            maxWidth: 720,
          }}
        >
          The bundle ships as a single Helm subchart. Lite mode runs in &lt;2 GiB on a kind
          cluster. Full mode adds storage and query services; validate sizing in your cluster.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 12,
          }}
        >
          {STACK.map(({ name, role }) => (
            <div
              key={name}
              style={{
                padding: 16,
                borderRadius: 8,
                background: t.bg.secondary,
                border: `1px solid ${t.border.light}`,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.text.primary,
                  marginBottom: 4,
                }}
              >
                {name}
              </div>
              <div style={{ fontSize: 13, color: t.text.secondary }}>{role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance targets */}
      <section
        style={{
          padding: '24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: t.text.primary,
            margin: '0 0 8px',
          }}
        >
          Evidence building blocks.
        </h2>
        <p
          style={{
            color: t.text.secondary,
            fontSize: 15,
            margin: '0 0 24px',
            maxWidth: 720,
          }}
        >
          These primitives can support your evidence process. They do not certify compliance
          with any law, standard, or control framework.
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          {EVIDENCE_USE_CASES.map(({ tag, body }) => (
            <div
              key={tag}
              style={{
                padding: 16,
                borderRadius: 8,
                background: t.bg.secondary,
                border: `1px solid ${t.border.light}`,
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  padding: '4px 10px',
                  borderRadius: 999,
                  background: t.accent.primary,
                  color: t.bg.primary,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                {tag}
              </div>
              <div style={{ fontSize: 14, color: t.text.secondary, lineHeight: 1.55 }}>
                {body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quickstart */}
      <section
        style={{
          padding: '64px 24px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: t.text.primary,
            margin: '0 0 16px',
          }}
        >
          15-minute install.
        </h2>
        <pre
          style={{
            padding: 20,
            borderRadius: 12,
            background: t.bg.secondary,
            border: `1px solid ${t.border.light}`,
            color: t.text.primary,
            fontSize: 13,
            lineHeight: 1.6,
            overflow: 'auto',
            margin: 0,
          }}
        >{`# 1. Install the umbrella chart with observability enabled
helm install clawd ./charts \\
  --namespace agentic-system --create-namespace \\
  --set clawdlinuxObservability.enabled=true \\
  --set license.key=$CLAWD_LICENSE_KEY

# 2. Point your AgentWorkload pods at the collector
export OTEL_EXPORTER_OTLP_ENDPOINT=clawd-clawdlinux-observability-otel-collector:4317

# 3. Verify an exported JSONL audit log
./bin/audit-verify --source jsonl --path ./ledger.jsonl \
  --key $CLAWD_AUDIT_KID=$CLAWD_AUDIT_KEY_B64

# 4. Open Grafana
kubectl port-forward svc/clawd-clawdlinux-observability-grafana 3000 &
open http://localhost:3000`}</pre>
      </section>

      {/* CTA footer */}
      <section
        style={{
          padding: '48px 24px 96px',
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: t.text.primary,
              margin: 0,
            }}
          >
            Evaluate the audit primitives with your compliance team.
          </h3>
          <p style={{ color: t.text.secondary, fontSize: 15, marginTop: 8 }}>
            Pilot scope can validate exported records and offline verification. It does not
            include deterministic replay or claim compliance certification.
          </p>
        </div>
        <a
          href="https://github.com/Clawdlinux/agentic-operator-core/issues"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            borderRadius: 8,
            background: t.accent.primary,
            color: t.bg.primary,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          <Network size={16} /> Talk to us
        </a>
      </section>
      <DesignPartnerCTA />
    </div>
  );
}
