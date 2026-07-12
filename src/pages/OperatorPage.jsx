import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Positioning from '../components/Positioning';
import Comparison from '../components/Comparison';
import Architecture from '../components/Architecture';
import Features from '../components/Features';
import OpenSource from '../components/OpenSource';
import Waitlist from '../components/Waitlist';

export default function OperatorPage() {
  const { currentTheme } = useTheme();
  const t = currentTheme;

  return (
    <div style={{ paddingTop: 80 }}>
      {/* Back-to-products breadcrumb */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '12px 24px 0',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
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
            Products / Operator
          </Link>
        </motion.div>
      </div>

      <section id="home"><Hero /></section>
      <StatsBar />
      <Positioning />
      <Comparison />
      <section id="architecture"><Architecture /></section>
      <section id="features"><Features /></section>
      <section id="open-source"><OpenSource /></section>
      <Waitlist />
    </div>
  );
}
