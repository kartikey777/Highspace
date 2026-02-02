import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminContentProvider } from './context/AdminContentContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <AdminContentProvider>
      <CartProvider>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path=":sectionId" element={<SectionPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </AdminContentProvider>
  );
}

export default App;
