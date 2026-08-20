import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
