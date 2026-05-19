import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Operator', to: '/products/operator' },
  { label: 'ACL', to: '/products/acl' },
  { label: 'Audit', to: '/products/audit' },
];

const GITHUB_ORG_URL = 'https://github.com/Clawdlinux';
const DISCORD_URL = 'https://discord.gg/XtxRdBzZcK';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { currentTheme } = useTheme();

  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      setScrolled(y > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      }}
    >
      {/* Glass background layer */}
      <motion.div
        className="absolute inset-0 transition-colors duration-300"
        style={{ 
          opacity: bgOpacity,
          backgroundColor: currentTheme.bg.primary,
          borderBottom: `1px solid ${currentTheme.border.light}`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            style={{ textDecoration: 'none' }}
          >
            <div className="relative">
              <img
                src="/ninevigil-logo.svg"
                alt="NineVigil"
                className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12 rounded-lg"
              />
            </div>
            <span
              className="font-semibold text-lg tracking-tight transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: currentTheme.text.primary }}
            >
              Clawd<span style={{ color: currentTheme.accent.teal }}>linux</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: currentTheme.text.secondary,
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = currentTheme.text.primary;
                  e.currentTarget.style.backgroundColor = `${currentTheme.bg.secondary}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = currentTheme.text.secondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: currentTheme.text.secondary,
                border: `1px solid ${currentTheme.border.medium}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#5865F2';
                e.currentTarget.style.borderColor = '#5865F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.text.secondary;
                e.currentTarget.style.borderColor = currentTheme.border.medium;
              }}
            >
              <span>Discord</span>
            </a>
            <a
              href={GITHUB_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: `linear-gradient(135deg, ${currentTheme.accent.teal} 0%, #2563EB 100%)`,
                color: '#03231d',
              }}
            >
              <Star className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <ThemeToggle />
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-lg transition-all duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{ color: currentTheme.text.secondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.text.primary;
              e.currentTarget.style.backgroundColor = `${currentTheme.bg.secondary}80`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = currentTheme.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
          <div
            className="relative overflow-hidden transition-colors duration-300 px-4 py-4 flex flex-col gap-1"
            style={{
              backgroundColor: `${currentTheme.bg.primary}F2`,
              borderTopColor: currentTheme.border.light,
              borderTopWidth: '1px',
              borderBottomColor: currentTheme.border.light,
              borderBottomWidth: '1px'
            }}
          >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: currentTheme.text.secondary,
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = currentTheme.text.primary;
                  e.currentTarget.style.backgroundColor = `${currentTheme.bg.secondary}80`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = currentTheme.text.secondary;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
              <span>{link.label}</span>
            </Link>
          ))}

          <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTopWidth: '1px', borderTopColor: currentTheme.border.light }}>
            <a
              href={GITHUB_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:brightness-110"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: `linear-gradient(135deg, ${currentTheme.accent.teal} 0%, #2563EB 100%)`,
                color: '#03231d',
              }}
            >
              <Star className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
