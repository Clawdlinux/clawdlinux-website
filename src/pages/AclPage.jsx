import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Github,
  TrendingDown,
  CheckCircle2,
  Code2,
  Terminal,
  Gauge,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import AclHero from '../components/AclHero';

const ACL_GITHUB = 'https://github.com/Clawdlinux/ninevigil-acp';
const ACL_SPEC = 'https://github.com/Clawdlinux/ninevigil-acp/blob/main/docs/acl-spec.md';
const ACL_QUICKSTART = 'https://github.com/Clawdlinux/ninevigil-acp/blob/main/docs/quickstart.md';
const ACL_BENCH = 'https://github.com/Clawdlinux/ninevigil-acp/blob/main/benchmark/agent_accuracy/results/2026-05-09-094833/summary.md';
const ACP_FRONTIER_BENCH = 'https://github.com/Clawdlinux/ninevigil-acp/tree/main/benchmark/frontier';
const BFCL_URL = 'https://gorilla.cs.berkeley.edu/leaderboard.html';

const COMPRESSION_ROWS = [
  { src: 'Kubernetes', fixture: 'live kind cluster (5 pods, 2 deploys, 2 svcs)', raw: '19,043', acl: '145', x: '132×' },
  { src: 'OpenAPI', fixture: 'GitHub v3 spec (1,145 endpoints)', raw: '~3M', acl: '~44K', x: '68×' },
  { src: 'Kubernetes', fixture: 'bundled state.acl fixture', raw: '3,671', acl: '260', x: '14.1×' },
  { src: 'OpenAPI', fixture: 'Swagger Petstore (4 endpoints)', raw: '1,492', acl: '201', x: '7.4×' },
  { src: 'Postgres', fixture: 'realistic 30-table pg_dump -s', raw: '~5,500', acl: '~1,600', x: '3.5×' },
];

const ACCURACY_ROWS = [
  { metric: 'Fact-extraction accuracy', raw: '93.3% (90.6–95.3)', acl: '93.3% (90.6–95.3)', delta: '+0.0pp' },
  { metric: 'Decision accuracy', raw: '83.3% (79.1–86.8)', acl: '75.0% (70.3–79.2)', delta: '−8.3pp' },
  { metric: 'Mean prompt tokens', raw: '4,553', acl: '446', delta: '−90%' },
  { metric: 'Cost per call', raw: '$0.0037', acl: '$0.00037', delta: '−89%' },
];

const SHIPPED = [
  'ACL v0.1 wire-format spec (CC BY 4.0)',
  'Go reference encoder/decoder, round-trip stable + fuzzed',
  'Three translators: Kubernetes, OpenAPI, Postgres',
  'acl CLI — encode / decode / tokens / version (15MB distroless)',
  'Pure-Python acp-acl decoder, optional tiktoken extra',
  '1,620-trial agent-accuracy benchmark, fully reproducible',
];

const FRONTIER_ROWS = [
  { tier: 'Open standard', plan: 'BFCL function-calling tasks mapped into MCP tools/list and ACP manifests' },
  { tier: '1M+ context', plan: 'Long-context model family to test whether bigger windows remove or only hide tool overhead' },
  { tier: 'Medium frontier', plan: 'Sonnet and available GPT-5.x medium-class IDs, pinned per run' },
  { tier: 'Heavy frontier', plan: 'Opus and strongest available GPT-5.x / Gemini-class IDs, pinned per run' },
];

const ACL_DOC_EXAMPLE = `@ns payments
@source aclk8s/v0.1

pods 5
  api-7f4b8c-x7w9 ready=1/1 node=node-2
  api-7f4b8c-9k2p ready=1/1 node=node-1
  worker-3a2-h5g  ready=1/1 node=node-2
  worker-3a2-zq4  ready=0/1 node=node-1 reason=ImagePullBackOff
  redis-0         ready=1/1 node=node-3 sts=redis

deployments 2
  api    replicas=2/2 image=ghcr.io/acme/api:v3.4
  worker replicas=2/2 image=ghcr.io/acme/worker:v1.2

services 2
  api   type=ClusterIP port=8080
  redis type=ClusterIP port=6379

actions
  scale|rollout|restart|describe|logs`;

export default function AclPage() {
  const { currentTheme } = useTheme();
  const t = currentTheme;

  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px 0' }}>
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: t.text.secondary,
            fontFamily: 'IBM Plex Mono, monospace',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = t.accent.teal)}
          onMouseLeave={(e) => (e.currentTarget.style.color = t.text.secondary)}
        >
          <ArrowLeft size={14} />
          Products / ACL — Agent Context Language
        </Link>
      </div>

      <AclHero />

      {/* Compression table */}
      <section style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: t.text.primary, margin: '0 0 20px' }}>
            Compression on real fixtures
          </h2>
          <div style={{ overflow: 'auto', borderRadius: 12, border: `1px solid ${t.border.default}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'IBM Plex Mono, monospace' }}>
              <thead>
                <tr style={{ background: t.bg.card }}>
                  <th style={th(t)}>Source</th>
                  <th style={th(t)}>Fixture</th>
                  <th style={{ ...th(t), textAlign: 'right' }}>Raw</th>
                  <th style={{ ...th(t), textAlign: 'right' }}>ACL</th>
                  <th style={{ ...th(t), textAlign: 'right' }}>Reduction</th>
                </tr>
              </thead>
              <tbody>
                {COMPRESSION_ROWS.map((r) => (
                  <tr key={r.fixture} style={{ borderTop: `1px solid ${t.border.default}` }}>
                    <td style={td(t)}>{r.src}</td>
                    <td style={{ ...td(t), color: t.text.secondary }}>{r.fixture}</td>
                    <td style={{ ...td(t), textAlign: 'right' }}>{r.raw}</td>
                    <td style={{ ...td(t), textAlign: 'right' }}>{r.acl}</td>
                    <td style={{ ...td(t), textAlign: 'right', color: t.accent.teal, fontWeight: 700 }}>{r.x}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: t.text.secondary, margin: '12px 0 0' }}>
            Token counts via tiktoken/cl100k_base. Live K8s number from{' '}
            <code style={{ color: t.text.primary }}>scripts/test-aclk8s-kind.sh</code>; OpenAPI fixtures and{' '}
            <code style={{ color: t.text.primary }}>acl</code> CLI in the repo.
          </p>
        </motion.div>
      </section>

      {/* Accuracy table */}
      <section style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: t.text.primary, margin: '0 0 8px' }}>
            Agent accuracy preserved
          </h2>
          <p style={{ fontSize: 14, color: t.text.secondary, margin: '0 0 20px' }}>
            n=1,620 trials on Claude Haiku 4.5, with Wilson 95% confidence intervals
          </p>
          <div style={{ overflow: 'auto', borderRadius: 12, border: `1px solid ${t.border.default}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'IBM Plex Mono, monospace' }}>
              <thead>
                <tr style={{ background: t.bg.card }}>
                  <th style={th(t)}>Metric</th>
                  <th style={th(t)}>Raw kubectl JSON</th>
                  <th style={th(t)}>ACL</th>
                  <th style={{ ...th(t), textAlign: 'right' }}>Δ</th>
                </tr>
              </thead>
              <tbody>
                {ACCURACY_ROWS.map((r, i) => (
                  <tr key={r.metric} style={{ borderTop: `1px solid ${t.border.default}` }}>
                    <td style={td(t)}>{r.metric}</td>
                    <td style={td(t)}>{r.raw}</td>
                    <td style={td(t)}>{r.acl}</td>
                    <td style={{ ...td(t), textAlign: 'right', color: i >= 2 ? t.accent.teal : t.text.primary, fontWeight: i >= 2 ? 700 : 500 }}>
                      {r.delta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: t.text.secondary, margin: '14px 0 0', lineHeight: 1.6 }}>
            Same fact-extraction accuracy at one-tenth the prompt tokens.
            Decision accuracy is 8.3pp lower at n=360 each — attributable to ACL
            surfacing different signals more prominently, a design tradeoff
            documented in the{' '}
            <a href={ACL_BENCH} target="_blank" rel="noreferrer" style={{ color: t.accent.teal }}>
              full benchmark summary
            </a>.
          </p>
        </motion.div>
      </section>

      {/* What an ACL document looks like */}
      <section style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: t.text.primary, margin: '0 0 8px' }}>
            What the agent actually sees
          </h2>
          <p style={{ fontSize: 14, color: t.text.secondary, margin: '0 0 20px' }}>
            A real ACL document for a 5-pod K8s namespace — 145 tokens, 132× smaller than the kubectl JSON equivalent.
          </p>
          <pre
            style={{
              padding: '24px',
              borderRadius: 12,
              background: t.bg.card,
              border: `1px solid ${t.border.default}`,
              fontSize: 13.5,
              fontFamily: 'IBM Plex Mono, monospace',
              lineHeight: 1.6,
              color: t.text.primary,
              overflow: 'auto',
              margin: 0,
            }}
          >
            <code>{ACL_DOC_EXAMPLE}</code>
          </pre>
        </motion.div>
      </section>

      {/* Try it CLI */}
      <section style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: t.text.primary, margin: '0 0 8px' }}>
            <Terminal size={24} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8, color: t.accent.teal }} />
            Try it in 30 seconds
          </h2>
          <pre
            style={{
              padding: '24px',
              borderRadius: 12,
              background: t.bg.card,
              border: `1px solid ${t.border.default}`,
              fontSize: 13.5,
              fontFamily: 'IBM Plex Mono, monospace',
              lineHeight: 1.6,
              color: t.text.primary,
              overflow: 'auto',
              margin: 0,
            }}
          >
            <code>{`git clone https://github.com/Clawdlinux/ninevigil-acp
cd ninevigil-acp
make build-acl

# Compress a real OpenAPI spec
bin/acl tokens pkg/aclhttp/testdata/petstore.json
# tokens:   1492  (cl100k_base)

bin/acl encode openapi pkg/aclhttp/testdata/petstore.json | bin/acl tokens -
# tokens:   201   (cl100k_base)`}</code>
          </pre>
        </motion.div>
      </section>

      {/* What ships today */}
      <section style={{ padding: '20px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: t.text.primary, margin: '0 0 20px' }}>
            <Code2 size={24} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8, color: t.accent.teal }} />
            What ships today
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
            {SHIPPED.map((s) => (
              <li
                key={s}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: t.bg.card,
                  border: `1px solid ${t.border.default}`,
                  fontSize: 15,
                  color: t.text.primary,
                  lineHeight: 1.5,
                }}
              >
                <CheckCircle2 size={18} style={{ color: t.accent.teal, flexShrink: 0, marginTop: 2 }} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Frontier benchmark plan */}
      <section style={{ padding: '20px 24px 120px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, color: t.text.primary, margin: '0 0 8px' }}>
            <Gauge size={24} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8, color: t.accent.teal }} />
            Frontier benchmark track
          </h2>
          <p style={{ fontSize: 14, color: t.text.secondary, margin: '0 0 20px', lineHeight: 1.6 }}>
            The current published numbers are deterministic token-overhead measurements. The next public run uses{' '}
            <a href={BFCL_URL} target="_blank" rel="noreferrer" style={{ color: t.accent.teal }}>
              BFCL
            </a>{' '}
            as the open function-calling standard and pins exact frontier model IDs before any model-specific claims are made.
          </p>
          <div style={{ overflow: 'auto', borderRadius: 12, border: `1px solid ${t.border.default}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'IBM Plex Mono, monospace' }}>
              <thead>
                <tr style={{ background: t.bg.card }}>
                  <th style={th(t)}>Track</th>
                  <th style={th(t)}>What it tests</th>
                </tr>
              </thead>
              <tbody>
                {FRONTIER_ROWS.map((r) => (
                  <tr key={r.tier} style={{ borderTop: `1px solid ${t.border.default}` }}>
                    <td style={{ ...td(t), color: t.accent.teal, fontWeight: 700 }}>{r.tier}</td>
                    <td style={{ ...td(t), color: t.text.secondary }}>{r.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: t.text.secondary, margin: '14px 0 0', lineHeight: 1.6 }}>
            Benchmark plan and result artifact rules live in{' '}
            <a href={ACP_FRONTIER_BENCH} target="_blank" rel="noreferrer" style={{ color: t.accent.teal }}>
              benchmark/frontier
            </a>. Model aliases are not normalized into claims; each run records the exact provider ID used.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

function th(t) {
  return {
    padding: '12px 14px',
    textAlign: 'left',
    fontWeight: 700,
    color: t.text.primary,
    fontSize: 12,
    letterSpacing: 0.5,
  };
}

function td(t) {
  return {
    padding: '12px 14px',
    color: t.text.primary,
  };
}
