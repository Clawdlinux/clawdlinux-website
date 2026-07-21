import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  Cpu,
  FileCode,
  Users,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Trust() {
  const { currentTheme, theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const withAlpha = (hex, alpha) => `${hex}${alpha}`;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: 'easeOut',
      },
    },
  };

  const trustSignals = [
    {
      icon: Shield,
      title: 'Runtime Adapters',
      metric: '3',
      badge: 'Registered',
      description: 'Argo, pod, and kagent behind one runtime registry',
      color: 'from-blue-500/20 to-blue-500/5',
      accentColor: '#6366f1',
    },
    {
      icon: FileCode,
      title: 'Open Source',
      metric: 'Apache 2.0',
      badge: 'Licensed',
      description: 'Auditable operator core with an OSI-approved license',
      color: 'from-blue-500/20 to-blue-500/5',
      accentColor: '#3B82F6',
    },
    {
      icon: Cpu,
      title: 'Enforcement Model',
      metric: 'Cluster',
      badge: 'CNI + runsc',
      description: 'Generated controls rely on cluster enforcement',
      color: 'from-indigo-500/20 to-indigo-500/5',
      accentColor: '#6366f1',
    },
    {
      icon: Users,
      title: 'Audit Primitives',
      metric: 'Hash + HMAC',
      badge: 'JSONL',
      description: 'Offline verification for exported audit records',
      color: 'from-blue-500/20 to-blue-500/5',
      accentColor: '#3B82F6',
    },
    {
      icon: AlertCircle,
      title: 'Offline Licensing',
      metric: 'Self-Managed',
      badge: 'No Callback',
      description: 'Full air-gap installation proof remains a release gate',
      color: 'from-blue-500/20 to-blue-500/5',
      accentColor: '#6366f1',
    },
  ];

  return (
    <section
      id="trust"
      className="relative w-full py-20 px-4 sm:px-8 lg:px-12 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg.primary }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${currentTheme.accent.teal}, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: currentTheme.text.primary }}>
            Built for verifiable agent operations
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: currentTheme.text.tertiary }}>
            Current implementation boundaries, stated without certification or adoption claims
          </p>
        </motion.div>

        {/* Trust Signals Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {trustSignals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                <div
                  className={`relative h-full p-6 rounded-lg border transition-all duration-300 overflow-hidden bg-gradient-to-br ${signal.color}`}
                  style={{
                    borderColor: withAlpha(signal.accentColor, '33'),
                    backgroundColor:
                      theme === 'dark'
                        ? withAlpha(currentTheme.bg.secondary, 'CC')
                        : withAlpha(currentTheme.bg.secondary, 'E6'),
                  }}
                >
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${signal.accentColor}15, transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-20 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-4 inline-flex">
                      <Icon
                        size={20}
                        style={{ color: signal.accentColor }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold mb-2" style={{ color: currentTheme.text.primary }}>
                      {signal.title}
                    </h3>

                    {/* Metric + Badge */}
                    <div className="mb-4 flex items-baseline gap-2">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: signal.accentColor }}
                      >
                        {signal.metric}
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded border"
                        style={{
                          color: signal.accentColor,
                          borderColor: signal.accentColor,
                          backgroundColor: `${signal.accentColor}10`,
                        }}
                      >
                        {signal.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs" style={{ color: currentTheme.text.tertiary }}>
                      {signal.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional Footer Subtext */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-sm" style={{ color: currentTheme.text.muted }}>
            Open-source core · Self-managed deployment · Offline licensing available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
