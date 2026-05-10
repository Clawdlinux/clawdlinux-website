import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Old single-page anchors that now live on /products/operator
const LEGACY_OPERATOR_HASHES = new Set([
  '#positioning',
  '#comparison',
  '#architecture',
  '#features',
  '#open-source',
  '#waitlist',
  '#home',
]);

export default function LegacyHashRedirect() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/' && hash && LEGACY_OPERATOR_HASHES.has(hash)) {
      // Preserve the hash so the operator page can scroll to the right section.
      navigate(`/products/operator${hash}`, { replace: true });
    }
  }, [pathname, hash, navigate]);

  useEffect(() => {
    if (!hash || (pathname === '/' && LEGACY_OPERATOR_HASHES.has(hash))) {
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    const scrollToHash = () => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    const timeout = window.setTimeout(scrollToHash, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
}
