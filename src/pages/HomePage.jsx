import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Boxes, Code2, Shield, Lock, Mail, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ShaderCanvas from '../components/ShaderCanvas';

const GITHUB_ORG = 'https://github.com/Clawdlinux';

const VALUE_PROPS = [
  { icon: Shield, title: 'Air-gapped by default', text: 'Built for FedRAMP, HIPAA, and sovereign-cloud environments. Zero egress unless you allow it.' },
  { icon: Lock, title: 'Open source first', text: 'Apache 2.0 cores. CC BY 4.0 specs. Self-host, fork, audit. No surprise vendor lock-in.' },
  { icon: Boxes, title: 'Two products, one stack', text: 'The operational layer (Operator) and the data layer (ACL) for production agents.' },
];

const PRODUCT_PREVIEWS = [
  { to: '/products/operator', icon: Boxes, tag: 'Operator', title: 'Run agents in Kubernetes', text: 'Zero-egress, FedRAMP-ready operator. AgentWorkload CRDs, Cilium policy, Argo DAGs, per-tenant cost attribution.' },
  { to: '/products/acl', icon: Code2, tag: 'ACL', title: 'Feed agents 90% fewer tokens', text: 'Compact agent-native representation format. Three translators ship today: Kubernetes (132\u00d7), OpenAPI (68\u00d7), Postgres (3.5\u00d7).' },
];

const SIGNALS = ['Apache 2.0', 'Zero egress', 'Kubernetes CRDs', 'Agent-native data'];

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
          <div className="absolute inset-0" style={{ background: theme === 'dark' ? 'rgba(5,8,15,0.45)' : 'rgba(255,255,255,0.55)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-56" style={{ background: `linear-gradient(to bottom, transparent, ${t.bg.primary})` }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#93c5fd', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}
              whileHover={{ y: -1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#60a5fa' }} />
              Clawdlinux · Production AI Agent Infrastructure
            </motion.div>
          </motion.div>

          <motion.h1 variants={headingVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <div className="flex flex-wrap justify-center gap-x-3 mb-2">
              {['Open-source', 'rails'].map((w) => (<motion.span key={w} variants={wordVariant} style={{ color: '#e2e8f0' }}>{w}</motion.span>))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3">
              {['for', 'agents', 'that'].map((w) => (<motion.span key={w} variants={wordVariant} style={{ color: '#e2e8f0' }}>{w}</motion.span>))}
              <motion.span variants={wordVariant} className="text-gradient">ship.</motion.span>
            </div>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: 'rgba(203,213,225,0.9)', lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
            Open-source infrastructure for AI agents in regulated environments. One operator to run them on Kubernetes. One language to feed them 90% fewer tokens. Both Apache 2.0, both production today.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-3 justify-center flex-wrap mb-10">
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563EB 100%)', color: '#fff', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
                See the products <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a href={GITHUB_ORG} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#e2e8f0', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                <Github size={16} /> GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants} className="flex justify-center flex-wrap gap-2.5">
            {SIGNALS.map((s) => (<motion.span key={s} variants={itemVariants} className="px-3.5 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(203,213,225,0.8)', fontFamily: "'IBM Plex Mono', monospace" }}>{s}</motion.span>))}
          </motion.div>
        </div>

        <style>{`
          .text-gradient { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        `}</style>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2 }} style={{ color: 'rgba(148,163,184,0.7)' }}>
          <span className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>scroll to explore</span>
          <motion.div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(148,163,184,0.5), transparent)' }} animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
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

      {/* ── Divider: Values → Products ── */}
      <SectionDivider currentTheme={t} />

      {/* ─── Products Preview ─── */}
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
            Two{' '}<span style={{ background: `linear-gradient(135deg, ${t.accent.teal}, ${t.accent.indigo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>open-source</span>{' '}products.
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={containerVariants} className="relative z-10 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))' }}>
          {PRODUCT_PREVIEWS.map((p) => {
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
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5" style={{ color: t.accent.teal, fontFamily: "'IBM Plex Mono', monospace" }}>Read more <ArrowRight size={14} /></span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Divider: Products → CTA ── */}
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
              Put agent infrastructure in your cluster.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: t.text.tertiary, lineHeight: 1.65, maxWidth: 760 }}>
              Evaluate NineVigil Operator, ACL, or both against a real regulated workload. We will help you pick the smallest useful pilot and keep it self-hosted from day one.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a href="mailto:007ssancheti@gmail.com?subject=Clawdlinux%20production%20pilot" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold" style={{ background: `linear-gradient(135deg, ${t.accent.teal} 0%, #2563EB 100%)`, color: '#03231d', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
                  <Mail size={16} /> Contact
                </a>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link to="/products" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold" style={{ background: theme === 'dark' ? withAlpha(t.bg.secondary, 'D9') : withAlpha(t.bg.secondary, 'F2'), border: `1px solid ${t.border.light}`, color: t.text.primary, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
                  Products <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
