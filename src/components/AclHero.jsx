import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight, BookOpen, TrendingDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ACL_GITHUB = 'https://github.com/Clawdlinux/agent-native-format';
const ACL_SPEC = 'https://github.com/Clawdlinux/agent-native-format/blob/main/FORMAT.md';

/* ── The raw → ACL compression demo ── */
const RAW_JSON = `{
  "kind": "PodList",
  "items": [
    {
      "metadata": { "name": "api-7f4b8c-x7w9" },
      "status": {
        "phase": "Running",
        "containerStatuses": [{
          "ready": true,
          "restartCount": 0
        }]
      },
      "spec": { "nodeName": "node-2" }
    }
  ]
}`;

const ACL_OUTPUT = `@ns payments
@source clawdlinux/k8s-translator:0.1.0

pods 5
  api-7f4b8c-x7w9  ready=1/1 node=node-2
  api-7f4b8c-9k2p  ready=1/1 node=node-1
  worker-3a2-h5g   ready=1/1 node=node-2
  worker-3a2-zq4   ready=0/1 node=node-1
  redis-0          ready=1/1 node=node-3

actions
  scale|rollout|restart|describe|logs`;

const STATS = [
  { label: 'Raw tokens', value: '19,043', sub: 'kubectl JSON' },
  { label: 'ANF tokens', value: '145', sub: 'same namespace' },
  { label: 'Reduction', value: '132×', sub: 'smaller' },
];

const headingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
};

const withAlpha = (hex, a) => hex + a;

/* Typing effect for the ACL output */
function TypingText({ text, speed = 25, onDone }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { clearInterval(id); onDone?.(); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);
  return <>{displayed}</>;
}

/* Animated token counter */
function TokenCounter({ from, to, duration = 1500, active }) {
  const [value, setValue] = useState(active ? to : from);

  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const next = Math.round(from + (to - from) * eased);
      setValue(next);
      if (elapsed >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [from, to, duration, active]);
  return <>{value.toLocaleString()}</>;
}

export default function AclHero() {
  const { currentTheme, theme } = useTheme();
  const t = currentTheme;
  const [phase, setPhase] = useState('raw'); // raw → encoding → acl
  const timerRef = useRef(null);

  useEffect(() => {
    const run = () => {
      setPhase('raw');
      timerRef.current = setTimeout(() => setPhase('encoding'), 2200);
    };
    run();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleEncodingDone = () => setPhase('acl');

  const darkBg = '#0a0e1a';
  const lightBg = '#f8fafc';
  const termBg = theme === 'dark' ? darkBg : lightBg;

  return (
    <section
      id="acl-hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 lg:pt-18"
      style={{ background: t.bg.primary }}
    >
      {/* Decorative gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${withAlpha(t.accent.indigo, theme === 'dark' ? '1A' : '0C')} 0%, transparent 70%)`,
          animation: 'orbFloat 9s ease-in-out infinite',
          zIndex: 1,
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${withAlpha(t.accent.teal, theme === 'dark' ? '14' : '0A')} 0%, transparent 70%)`,
          animation: 'orbFloat 11s ease-in-out infinite reverse',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -1 }}
          style={{
            background: withAlpha(t.accent.teal, theme === 'dark' ? '14' : '10'),
            border: `1px solid ${withAlpha(t.accent.teal, '40')}`,
            color: theme === 'dark' ? t.accent.teal : '#1e40af',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: t.accent.teal }} />
          Agent Native Format · v0.1
        </motion.div>

        {/* Animated heading */}
        <motion.div className="mb-6" variants={headingVariants} initial="hidden" animate="visible">
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <div className="flex flex-wrap justify-center gap-x-3 mb-2">
              {['Feed', 'agents'].map((w) => (
                <motion.span key={w} variants={wordVariant} style={{ color: t.text.primary }}>{w}</motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3">
              <motion.span variants={wordVariant}>
                <span
                  style={{
                    background: `linear-gradient(135deg, ${t.accent.teal}, ${t.accent.indigo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  90% fewer
                </span>
              </motion.span>
              <motion.span variants={wordVariant} style={{ color: t.text.primary }}>tokens.</motion.span>
            </div>
          </h1>
        </motion.div>

        {/* Rotating stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex justify-center gap-6 sm:gap-10 mb-10"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="text-center"
            >
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.accent.teal }}
              >
                {s.value}
              </div>
              <div className="text-xs mt-1" style={{ color: t.text.tertiary, fontFamily: "'IBM Plex Mono', monospace" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
        >
          <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href={ACL_GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold"
              style={{
                background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`,
                color: '#03231d',
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: 'none',
              }}
            >
              <Github size={16} /> Code on GitHub
            </a>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <a
              href={ACL_SPEC}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold"
              style={{
                background: theme === 'dark' ? withAlpha(t.bg.secondary, 'D9') : withAlpha(t.bg.secondary, 'F2'),
                border: `1px solid ${t.border.light}`,
                color: t.text.primary,
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: 'none',
              }}
            >
              <BookOpen size={16} /> Read the spec
            </a>
          </motion.div>
        </motion.div>

        {/* ── Live encoding terminal ── */}
        <motion.div
          className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            border: `1px solid ${t.border.light}`,
            boxShadow: theme === 'dark' ? '0 24px 80px rgba(0,0,0,0.55)' : '0 24px 60px rgba(15,23,42,0.16)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: t.bg.secondary, borderBottom: `1px solid ${t.border.light}` }}
          >
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span
              className="ml-3 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: t.text.muted }}
            >
              acl encode kubernetes — live demo
            </span>
            {/* Token badge */}
            <div className="ml-auto flex items-center gap-1.5">
              <TrendingDown size={12} style={{ color: t.accent.teal }} />
              <span
                className="text-xs font-semibold"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: t.accent.teal }}
              >
                <TokenCounter from={19043} to={phase === 'raw' ? 19043 : 145} duration={1800} active={phase !== 'raw'} /> tokens
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            className="px-5 py-4 min-h-[280px] text-sm leading-relaxed"
            style={{ fontFamily: "'IBM Plex Mono', monospace", background: termBg }}
          >
            <AnimatePresence mode="wait">
              {phase === 'raw' && (
                <motion.div
                  key="raw"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mb-2" style={{ color: t.text.muted }}>
                    <span style={{ color: t.accent.teal }}>$ </span>
                    kubectl get pods -n payments -o json | head -20
                  </div>
                  <pre className="whitespace-pre-wrap m-0" style={{ color: t.text.secondary }}>
                    {RAW_JSON}
                  </pre>
                  <div className="mt-3 text-xs" style={{ color: t.text.muted }}>
                    ↑ 19,043 tokens · $0.0037/call
                  </div>
                </motion.div>
              )}

              {(phase === 'encoding' || phase === 'acl') && (
                <motion.div
                  key="acl"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-2" style={{ color: t.text.muted }}>
                    <span style={{ color: t.accent.teal }}>$ </span>
                    acl encode kubernetes --namespace payments
                  </div>
                  <pre className="whitespace-pre-wrap m-0" style={{ color: t.accent.teal }}>
                    {phase === 'encoding'
                      ? <TypingText text={ACL_OUTPUT} speed={18} onDone={handleEncodingDone} />
                      : ACL_OUTPUT
                    }
                    {phase === 'encoding' && (
                      <span className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse" style={{ background: t.accent.teal }} />
                    )}
                  </pre>
                  {phase === 'acl' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-xs"
                      style={{ color: t.accent.teal }}
                    >
                      ✓ 145 tokens · $0.00037/call · 132× smaller
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        style={{ color: t.text.muted }}
      >
        <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>scroll to explore</span>
        <motion.div
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, ${t.text.muted}, transparent)` }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
