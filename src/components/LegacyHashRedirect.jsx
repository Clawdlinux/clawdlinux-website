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

  return null;
}
