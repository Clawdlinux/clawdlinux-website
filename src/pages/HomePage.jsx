import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Boxes, Code2, Shield, Lock, Mail, Sparkles } from 'lucide-react';
import ParticleNetwork from '../utils/particleNetwork';
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

const PRODUCT_PREVIEWS = [
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
    title: 'Feed agents 90\u0025 fewer tokens',
    text: 'Compact agent-native representation format. Three translators ship today: Kubernetes (132\u00d7), OpenAPI (68\u00d7), Postgres (3.5\u00d7).',
  },
];

const SIGNALS = ['Apache 2.0', 'Zero egress', 'Kubernetes CRDs', 'Agent-native data'];

/* ── Motion variants matching Hero.jsx / OpenSource.jsx ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const headingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const withAlpha = (hex, alpha) => `${hex}${alpha}`;

export default function HomePage() {
  const { currentTheme, theme } = useTheme();
  const t = currentTheme;
  const canvasRef = useRef(null);
  const networkRef = useRef(null);

  // Particle canvas (same as Hero.jsx)
  useEffect(() => {
    if (!canvasRef.current) return;
    const network = new ParticleNetwork(canvasRef.current, {
      count: 80,
      maxDistance: 150,
      speed: 0.3,
    });
    networkRef.current = network;
    network.start();
    return () => network.stop();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ background: t.bg.primary, padding: '168px 24px 86px' }}
      >
        {/* Particle canvas (same as Hero.jsx) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Animated grid background (matches Hero.jsx orb pattern) */}
        <motion.div
          aria-hidden="true"
          animate={{ backgroundPosition: ['0px 0px', '42px 42px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: theme === 'dark' ? 0.28 : 0.18,
            backgroundImage: `linear-gradient(${withAlpha(t.accent.teal, '18')} 1px, transparent 1px), linear-gradient(90deg, ${withAlpha(t.accent.indigo, '14')} 1px, transparent 1px)`,
            backgroundSize: '42px 42px',
            maskImage: 'linear-gradient(to bottom, black 0%, black 58%, transparent 100%)',
          }}
        />

        {/* Decorative gradient orbs (from Hero.jsx) */}
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${withAlpha(t.accent.teal, theme === 'dark' ? '1F' : '14')} 0%, transparent 70%)`,
            animation: 'orbFloat 8s ease-in-out infinite',
            zIndex: 1,
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${withAlpha(t.accent.indigo, theme === 'dark' ? '1A' : '12')} 0%, transparent 70%)`,
            animation: 'orbFloat 10s ease-in-out infinite reverse',
            zIndex: 1,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow chip */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: withAlpha(t.accent.teal, theme === 'dark' ? '14' : '10'),
                border: `1px solid ${withAlpha(t.accent.teal, '40')}`,
                color: theme === 'dark' ? t.accent.teal : '#1e40af',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
              whileHover={{ y: -1 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: t.accent.teal }}
              />
              Clawdlinux · Production AI Agent Infrastructure
            </motion.div>
          </motion.div>

          {/* Word-by-word animated heading (matches Hero.jsx headingVariants) */}
          <motion.h1
            variants={headingVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <div className="flex flex-wrap justify-center gap-x-3 mb-2">
              {['Open-source', 'rails'].map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariant}
                  style={{ color: t.text.primary }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3">
              {['for', 'agents', 'that'].map((word) => (
                <motion.span key={word} variants={wordVariant} style={{ color: t.text.primary }}>
                  {word}
                </motion.span>
              ))}
              <motion.span variants={wordVariant} className="text-gradient">
                ship.
              </motion.span>
            </div>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            style={{
              color: t.text.tertiary,
              lineHeight: 1.65,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Open-source infrastructure for AI agents in regulated environments.
            One operator to run them on Kubernetes. One language to feed them
            90% fewer tokens. Both Apache 2.0, both production today.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 justify-center flex-wrap mb-10"
          >
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`,
                  color: '#03231d',
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: 'none',
                }}
              >
                See the products
                <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a
                href={GITHUB_ORG}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: theme === 'dark' ? withAlpha(t.bg.secondary, 'D9') : withAlpha(t.bg.secondary, 'F2'),
                  border: `1px solid ${t.border.light}`,
                  color: t.text.primary,
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: 'none',
                }}
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Signal pills */}
          <motion.div
            variants={containerVariants}
            className="flex justify-center flex-wrap gap-2.5"
          >
            {SIGNALS.map((signal) => (
              <motion.span
                key={signal}
                variants={itemVariants}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: theme === 'dark' ? withAlpha(t.bg.secondary, 'B3') : withAlpha(t.bg.secondary, 'E6'),
                  border: `1px solid ${t.border.light}`,
                  color: t.text.secondary,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {signal}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Keyframe for orb animation (same as Hero.jsx) */}
        <style>{`
          @keyframes orbFloat {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
          }
          .text-gradient {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>

        {/* Scroll indicator (from Hero.jsx) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          style={{ color: t.text.muted }}
        >
          <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            scroll to explore
          </span>
          <motion.div
            className="w-px h-8"
            style={{
              background: `linear-gradient(to bottom, ${t.text.muted}, transparent)`,
            }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.section>

      {/* ─── Value Props ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-12 px-6"
        style={{ maxWidth: 1100, margin: '0 auto', paddingBottom: 116 }}
      >
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}>
          {VALUE_PROPS.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: withAlpha(t.accent.teal, '66') }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-7 transition-all duration-300 group"
                style={{
                  background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : withAlpha(t.bg.secondary, 'F2'),
                  border: `1px solid ${t.border.light}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.28)' : '0 20px 45px rgba(15,23,42,0.08)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: withAlpha(t.accent.teal, theme === 'dark' ? '1A' : '14'),
                    border: `1px solid ${withAlpha(t.accent.teal, '33')}`,
                  }}
                >
                  <Icon size={20} style={{ color: t.accent.teal }} strokeWidth={1.75} />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: t.text.tertiary }}
                >
                  {v.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ─── Products Preview ─── */}
      <section className="px-6 pb-28" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                background: withAlpha(t.accent.teal, '14'),
                border: `1px solid ${withAlpha(t.accent.teal, '33')}`,
                color: theme === 'dark' ? t.accent.teal : '#1e40af',
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              What We Build
              <Sparkles size={14} />
            </div>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary }}
          >
            Two{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${t.accent.teal}, ${t.accent.indigo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              open-source
            </span>{' '}
            products.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))' }}
        >
          {PRODUCT_PREVIEWS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.to}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  to={p.to}
                  className="block h-full rounded-2xl p-7 transition-all duration-300 group"
                  style={{
                    background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : withAlpha(t.bg.secondary, 'F2'),
                    border: `1px solid ${t.border.light}`,
                    backdropFilter: 'blur(12px)',
                    boxShadow: theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.28)' : '0 20px 45px rgba(15,23,42,0.08)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {/* Hover glow (matches Products.jsx AddOnCard) */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${withAlpha(t.accent.teal, '10')} 0%, transparent 70%)`,
                    }}
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: withAlpha(t.accent.teal, theme === 'dark' ? '1A' : '14'),
                          border: `1px solid ${withAlpha(t.accent.teal, '33')}`,
                        }}
                      >
                        <Icon size={18} style={{ color: t.accent.teal }} strokeWidth={1.75} />
                      </div>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          color: theme === 'dark' ? t.accent.teal : '#1e40af',
                          background: withAlpha(t.accent.teal, theme === 'dark' ? '14' : '10'),
                          border: `1px solid ${withAlpha(t.accent.teal, '33')}`,
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary, lineHeight: 1.2 }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: t.text.tertiary }}
                    >
                      {p.text}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                      style={{
                        color: t.accent.teal,
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section
        id="cta"
        className="px-6 pb-36"
        style={{ maxWidth: 1100, margin: '0 auto', scrollMarginTop: 120 }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : withAlpha(t.bg.secondary, 'F2'),
            border: `1px solid ${t.border.light}`,
            backdropFilter: 'blur(12px)',
            boxShadow: theme === 'dark' ? '0 24px 80px rgba(0,0,0,0.35)' : '0 24px 60px rgba(15,23,42,0.10)',
            padding: 'clamp(30px, 5vw, 52px)',
          }}
        >
          {/* Subtle shifting gradient overlay */}
          <motion.div
            aria-hidden="true"
            animate={{ x: ['-18%', '18%', '-18%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute pointer-events-none"
            style={{
              inset: -80,
              background: `linear-gradient(115deg, transparent 0%, ${withAlpha(t.accent.teal, '12')} 34%, ${withAlpha(t.accent.indigo, '10')} 56%, transparent 100%)`,
            }}
          />

          <div className="relative z-10">
            <motion.div variants={itemVariants} className="mb-5">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: withAlpha(t.accent.teal, theme === 'dark' ? '14' : '10'),
                  border: `1px solid ${withAlpha(t.accent.teal, '40')}`,
                  color: theme === 'dark' ? t.accent.teal : '#1e40af',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                <Sparkles size={13} strokeWidth={1.75} />
                Production Pilot
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: t.text.primary,
                maxWidth: 760,
              }}
            >
              Put agent infrastructure in your cluster.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg mb-8"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: t.text.tertiary,
                lineHeight: 1.65,
                maxWidth: 760,
              }}
            >
              Evaluate NineVigil Operator, ACL, or both against a real regulated workload.
              We will help you pick the smallest useful pilot and keep it self-hosted from day one.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="mailto:007ssancheti@gmail.com?subject=Clawdlinux%20production%20pilot"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`,
                    color: '#03231d',
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: 'none',
                  }}
                >
                  <Mail size={16} />
                  Contact
                </a>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    background: theme === 'dark' ? withAlpha(t.bg.secondary, 'D9') : withAlpha(t.bg.secondary, 'F2'),
                    border: `1px solid ${t.border.light}`,
                    color: t.text.primary,
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: 'none',
                  }}
                >
                  Products
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
