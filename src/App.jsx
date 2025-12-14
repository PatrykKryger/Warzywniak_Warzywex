import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingCart, User, Home as HomeIcon, Tag, Leaf, Info, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProduktyPage from './pages/Produkty.jsx';
import PromocjePage from './pages/Promocje.jsx';
import ONasPage from './pages/ONas.jsx';
import UserSupportPage from './pages/UserSupport.jsx';
import CartPage from './pages/Cart.jsx';
import { CartProvider, useCart } from './context/CartContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AuthModal from './components/AuthModal.jsx';
import Footer from './components/layout/Footer.jsx';
import PaymentPage from './pages/Payment.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'produkty': return <ProduktyPage />;
      case 'promocje': return <PromocjePage />;
      case 'o-nas': return <ONasPage />;
      case 'wsparcie': return <UserSupportPage />;
      case 'koszyk': return <CartPage setCurrentPage={setCurrentPage} />;
      case 'payment': return <PaymentPage />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="main-content">
            {renderPage()}
          </main>
          <Footer />
          <AuthModal />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App