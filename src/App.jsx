import { Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import OperatorPage from './pages/OperatorPage';
import AclPage from './pages/AclPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { currentTheme } = useTheme();

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
      <Navigation />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/operator" element={<OperatorPage />} />
          <Route path="/products/acl" element={<AclPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
