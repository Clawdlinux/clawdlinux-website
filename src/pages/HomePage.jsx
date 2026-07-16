import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Boxes, Code2, Shield, Lock, Mail, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ShaderCanvas from '../components/ShaderCanvas';

const GITHUB_ORG = 'https://github.com/Clawdlinux';

const VALUE_PROPS = [
  { icon: Shield, title: 'Regulated controls', text: 'gVisor isolation, audit trails, and policy gates for agents that touch private data.' },
  { icon: Lock, title: 'Open source first', text: 'Apache 2.0 operator core. Open specs (CC BY 4.0) and SDKs. Self-host, fork, audit. No surprise vendor lock-in.' },
  { icon: Boxes, title: 'Runtime compatible', text: 'Use the built-in AgentWorkload path or add controls around any labeled agent pods.' },
];

const CAPABILITY_PREVIEWS = [
  { to: '/products/operator', icon: Boxes, tag: 'Runtime controls', title: 'Control agents in Kubernetes', text: 'gVisor injection, Cilium policy, OPA guardrails, audit trails, and per-workload cost attribution.' },
  { to: '/products/audit', icon: Shield, tag: 'Audit', title: 'Prove what agents did', text: 'Tamper-evident action ledger, deterministic replay, and compliance-native traces.' },
];

const SIGNALS = ['Self-hostable', 'gVisor', 'Runtime-neutral', 'Air-gapped'];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.97 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const headingVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } };
const wordVariant = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const withAlpha = (hex, a) => hex + a;

/* ── Animated section divider ── */
function SectionDivider({ currentTheme }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto"
      style={{
        maxWidth: 600,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${withAlpha(currentTheme.accent.teal, '50')}, ${withAlpha(currentTheme.accent.indigo, '40')}, transparent)`,
        transformOrigin: 'center',
        marginTop: 0,
        marginBottom: 0,
      }}
    />
  );
}

export default function HomePage() {
  const { currentTheme, theme } = useTheme();
  const t = currentTheme;

  return (
    <>
      {/* ─── Hero ─── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
        style={{ padding: '168px 24px 86px' }}
      >
        {/* WebGL shader background */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <ShaderCanvas />
          {/* Fade overlay so text is readable + dissolve into next section */}
          <div className="absolute inset-0" style={{ background: theme === 'dark' ? 'rgba(5,8,15,0.45)' : 'rgba(255,255,255,0.75)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: `linear-gradient(to bottom, transparent, ${t.bg.primary})` }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ background: theme === 'dark' ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)', border: `1px solid ${theme === 'dark' ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.3)'}`, color: theme === 'dark' ? '#93c5fd' : '#1e40af', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}
              whileHover={{ y: -1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme === 'dark' ? '#60a5fa' : '#2563eb' }} />
              Clawdlinux · Regulated AI Agent Controls
            </motion.div>
          </motion.div>

          <motion.h1 variants={headingVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="flex flex-wrap justify-center gap-x-3 mb-2">
              {['Control', 'AI', 'agents'].map((w) => (<motion.span key={w} variants={wordVariant} style={{ color: t.text.primary }}>{w}</motion.span>))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3">
              {['inside'].map((w) => (<motion.span key={w} variants={wordVariant} style={{ color: t.text.primary }}>{w}</motion.span>))}
              <motion.span variants={wordVariant} className="text-gradient">Kubernetes.</motion.span>
            </div>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: t.text.secondary, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
            Add isolation, audit, and cost controls to agents in your cluster. Works with any Kubernetes-native agent runtime.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-3 justify-center flex-wrap mb-10">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563EB 100%)', color: '#fff', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
                Explore capabilities <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a href={GITHUB_ORG} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.05)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(15,23,42,0.15)'}`, color: t.text.primary, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                <Github size={16} /> GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants} className="flex justify-center flex-wrap gap-2.5">
            {SIGNALS.map((s) => (<motion.span key={s} variants={itemVariants} className="px-3.5 py-1.5 rounded-full text-xs font-medium" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.04)', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.1)'}`, color: t.text.tertiary, fontFamily: "'IBM Plex Mono', monospace" }}>{s}</motion.span>))}
          </motion.div>
        </div>

        <style>{`
          .text-gradient { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        `}</style>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2 }} style={{ color: t.text.muted }}>
          <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>scroll to explore</span>
          <motion.div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${t.text.muted}, transparent)` }} animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </motion.section>

      {/* ── Divider: Hero → Values ── */}
      <SectionDivider currentTheme={t} />

      {/* ─── Value Props ─── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="relative py-24 px-6"
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        {/* Section glow accent */}
        <motion.div
          className="absolute pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === 'dark' ? 0.3 : 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${withAlpha(t.accent.teal, '18')} 0%, transparent 70%)`, filter: 'blur(40px)' }}
        />
        <div className="relative z-10 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}>
          {VALUE_PROPS.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={itemVariants}
                custom={i}
                whileHover={{ y: -6, borderColor: withAlpha(t.accent.teal, '66'), boxShadow: theme === 'dark' ? `0 24px 60px rgba(0,0,0,0.4), 0 0 30px ${withAlpha(t.accent.teal, '10')}` : '0 24px 50px rgba(15,23,42,0.12)' }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-7 group"
                style={{ background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : withAlpha(t.bg.secondary, 'F2'), border: `1px solid ${t.border.light}`, backdropFilter: 'blur(12px)', boxShadow: theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.28)' : '0 20px 45px rgba(15,23,42,0.08)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: withAlpha(t.accent.teal, theme === 'dark' ? '1A' : '14'), border: `1px solid ${withAlpha(t.accent.teal, '33')}` }}>
                  <Icon size={20} style={{ color: t.accent.teal }} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: t.text.tertiary }}>{v.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── Divider: Values → Capabilities ── */}
      <SectionDivider currentTheme={t} />

      {/* ─── Capabilities Preview ─── */}
      <section className="relative px-6 py-24" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section glow accent */}
        <motion.div
          className="absolute pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: theme === 'dark' ? 0.25 : 0.12 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ top: '-5%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${withAlpha(t.accent.indigo, '14')} 0%, transparent 70%)`, filter: 'blur(40px)' }}
        />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={containerVariants} className="relative z-10 text-center mb-14">
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: withAlpha(t.accent.teal, '14'), border: `1px solid ${withAlpha(t.accent.teal, '33')}`, color: theme === 'dark' ? t.accent.teal : '#1e40af', fontFamily: "'IBM Plex Mono', monospace" }}>
              What We Build <Sparkles size={14} />
            </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary }}>
            One{' '}<span style={{ background: `linear-gradient(135deg, ${t.accent.teal}, ${t.accent.indigo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>open-source</span>{' '}system.
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={containerVariants} className="relative z-10 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))' }}>
          {CAPABILITY_PREVIEWS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.to} variants={itemVariants} whileHover={{ y: -6, boxShadow: theme === 'dark' ? `0 28px 70px rgba(0,0,0,0.45), 0 0 40px ${withAlpha(t.accent.teal, '0C')}` : '0 28px 60px rgba(15,23,42,0.14)' }} transition={{ duration: 0.3 }}>
                <Link to={p.to} className="block h-full rounded-2xl p-7 group" style={{ background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : withAlpha(t.bg.secondary, 'F2'), border: `1px solid ${t.border.light}`, backdropFilter: 'blur(12px)', boxShadow: theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.28)' : '0 20px 45px rgba(15,23,42,0.08)', textDecoration: 'none', color: 'inherit' }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: withAlpha(t.accent.teal, theme === 'dark' ? '1A' : '14'), border: `1px solid ${withAlpha(t.accent.teal, '33')}` }}>
                      <Icon size={18} style={{ color: t.accent.teal }} strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ color: theme === 'dark' ? t.accent.teal : '#1e40af', background: withAlpha(t.accent.teal, theme === 'dark' ? '14' : '10'), border: `1px solid ${withAlpha(t.accent.teal, '33')}`, fontFamily: "'IBM Plex Mono', monospace" }}>{p.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary, lineHeight: 1.2 }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: t.text.tertiary }}>{p.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5" style={{ color: t.accent.teal, fontFamily: "'IBM Plex Mono', monospace" }}>Explore capability <ArrowRight size={14} /></span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Divider: Capabilities → CTA ── */}
      <SectionDivider currentTheme={t} />

      {/* ─── CTA ─── */}
      <section id="cta" className="relative px-6 py-24 pb-36" style={{ maxWidth: 1100, margin: '0 auto', scrollMarginTop: 120 }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}
          className="relative overflow-hidden rounded-2xl"
          style={{ background: theme === 'dark' ? withAlpha(t.bg.secondary, 'CC') : withAlpha(t.bg.secondary, 'F2'), border: `1px solid ${t.border.light}`, backdropFilter: 'blur(12px)', boxShadow: theme === 'dark' ? '0 24px 80px rgba(0,0,0,0.35)' : '0 24px 60px rgba(15,23,42,0.10)', padding: 'clamp(30px, 5vw, 52px)' }}
        >
          <motion.div aria-hidden="true" animate={{ x: ['-18%', '18%', '-18%'] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute pointer-events-none" style={{ inset: -80, background: `linear-gradient(115deg, transparent 0%, ${withAlpha(t.accent.teal, '14')} 34%, ${withAlpha(t.accent.indigo, '12')} 56%, transparent 100%)` }} />
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: withAlpha(t.accent.teal, theme === 'dark' ? '14' : '10'), border: `1px solid ${withAlpha(t.accent.teal, '40')}`, color: theme === 'dark' ? t.accent.teal : '#1e40af', fontFamily: "'IBM Plex Mono', monospace" }}>
                <Sparkles size={13} strokeWidth={1.75} /> Production Pilot
              </div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: t.text.primary, maxWidth: 760 }}>
              Put regulated controls around your agents.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: t.text.tertiary, lineHeight: 1.65, maxWidth: 760 }}>
              Evaluate Clawdlinux against a real regulated workload. Start with the smallest useful capability set.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a href="https://forms.gle/hPQwrtin2gYCeNDy5" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold" style={{ background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`, color: '#03231d', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
                  <Mail size={16} /> Contact
                </a>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link to="/products" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: theme === 'dark' ? withAlpha(t.bg.secondary, 'D9') : withAlpha(t.bg.secondary, 'F2'), border: `1px solid ${t.border.light}`, color: t.text.primary, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
                  Capabilities <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
