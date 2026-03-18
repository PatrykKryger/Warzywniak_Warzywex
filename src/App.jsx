import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Home as HomeIcon, Tag, Leaf, Info, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProduktyPage from './pages/Produkty.jsx';
import PromocjePage from './pages/Promocje.jsx';
import ONasPage from './pages/ONas.jsx';
import UserSupportPage from './pages/UserSupport.jsx';
import AccountPage from './pages/Account.jsx';
import CartPage from './pages/Cart.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import ZiolexApp from './pages/zioles/ZiolexApp.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AuthModal from './components/AuthModal.jsx';
import Footer from './components/layout/Footer.jsx';
import PaymentPage from './pages/Payment.jsx';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useAuth();

  // Check if we're on Ziolex route
  const isZiolex = window.location.pathname === '/zioles';
  const isEmployee = user?.role === 'employee';

  // Redirect to admin panel when employee logs in
  useEffect(() => {
    if (isEmployee) {
      setCurrentPage('admin');
    }
  }, [isEmployee]);

  // Restrict employee navigation
  useEffect(() => {
    if (isEmployee && (currentPage === 'produkty' || currentPage === 'promocje')) {
      setCurrentPage('admin');
    }
  }, [isEmployee, currentPage]);

  const renderPage = () => {
    if (isZiolex) {
      return <ZiolexApp />;
    }

    // If someone is logged in as employee, only show admin panel
    if (isEmployee) {
      return <AdminPanel />;
    }

    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'produkty': return <ProduktyPage />;
      case 'promocje': return <PromocjePage />;
      case 'o-nas': return <ONasPage />;
      case 'wsparcie': return <UserSupportPage />;
<<<<<<< HEAD:vite-project/src/App.jsx
      case 'konto': return <AccountPage />;
      case 'koszyk': return <CartPage setCurrentPage={setCurrentPage} />;
      case 'admin': return <AdminPanel />;
=======
      case 'koszyk': return <CartPage setCurrentPage={setCurrentPage} />;
      case 'payment': return <PaymentPage />;
>>>>>>> 30d5d3d4ab126a5a04bafdfa80ff7feef8a18d33:src/App.jsx
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      {!isZiolex && <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main className="main-content">
        {renderPage()}
      </main>
      {!isZiolex && <Footer />}
      <AuthModal />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App