import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LegacyHashRedirect from './components/LegacyHashRedirect';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import OperatorPage from './pages/OperatorPage';
import AgentGatePage from './pages/AgentGatePage';
import AuditPage from './pages/AuditPage';
import BrandStudioPage from './pages/BrandStudioPage';
import NotFoundPage from './pages/NotFoundPage';
import { canonicalURL, normalizePathname, PAGE_METADATA, PAGE_STRUCTURED_DATA } from './seo';

function RouteMetadata({ pathname }) {
  const normalizedPathname = normalizePathname(pathname);
  const metadata = PAGE_METADATA[normalizedPathname] ?? PAGE_METADATA['/'];
  const pageURL = canonicalURL(normalizedPathname);

  useEffect(() => {
    document.title = metadata.title;

    const updateMeta = (selector, content) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('content', content);
    };

    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageURL);
    updateMeta('meta[name="title"]', metadata.title);
    updateMeta('meta[name="description"]', metadata.description);
    updateMeta('meta[property="og:url"]', pageURL);
    updateMeta('meta[property="og:title"]', metadata.title);
    updateMeta('meta[property="og:description"]', metadata.description);
    updateMeta('meta[name="twitter:url"]', pageURL);
    updateMeta('meta[name="twitter:title"]', metadata.title);
    updateMeta('meta[name="twitter:description"]', metadata.description);
    document.querySelector('script[data-route-schema]')?.replaceChildren(
      document.createTextNode(JSON.stringify(PAGE_STRUCTURED_DATA[normalizedPathname] ?? PAGE_STRUCTURED_DATA['/'])),
    );
  }, [pageURL, metadata, normalizedPathname]);

  return null;
}

export default function App() {
  const { currentTheme } = useTheme();
  const location = useLocation();
  const isBrandStudio = import.meta.env.DEV && location.pathname === '/brand-studio';

  return (
    <div
      style={{
        background: currentTheme.bg.primary,
        minHeight: '100vh',
        cursor: 'default',
        scrollBehavior: 'smooth',
        transition: 'background-color 300ms ease-in-out',
      }}
    >
      {!isBrandStudio && <Navigation />}
      {!isBrandStudio && <LegacyHashRedirect />}

      <main>
        <RouteMetadata pathname={location.pathname} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/operator" element={<OperatorPage />} />
          <Route path="/products/agentgate" element={<AgentGatePage />} />
          <Route path="/products/audit" element={<AuditPage />} />
          {import.meta.env.DEV && <Route path="/brand-studio" element={<BrandStudioPage />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isBrandStudio && <Footer />}
    </div>
  );
}
