import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingCart, User, Home, Tag, Leaf, Info, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
  

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'produkty', label: 'PRODUKTY', icon: Leaf },
    { id: 'promocje', label: 'PROMOCJE', icon: Tag },
    { id: 'o-nas', label: 'O NAS', icon: Info },
  ];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Leaf size={32} />
          <span>Warzywex</span>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(item.id);
                setIsMobileMenuOpen(false);
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button className="nav-btn" onClick={logout}>Wyloguj</button>
            </div>
          ) : (
            <button className="nav-btn" onClick={() => setIsAuthModalOpen(true)}>
              <User size={18} />
              KONTO
            </button>
          )}
          <button 
            className="cart-btn" 
            onClick={() => setCurrentPage('koszyk')}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;