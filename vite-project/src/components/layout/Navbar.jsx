import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingCart, User, Home, Tag, Leaf, Info, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
  

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseNav = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'produkty', label: 'PRODUKTY', icon: Leaf },
    { id: 'promocje', label: 'PROMOCJE', icon: Tag },
    { id: 'o-nas', label: 'O NAS', icon: Info },
  ];

  let navItems = baseNav;

  if (user) {
    if (user.role === 'employee') {
      navItems = [
        { id: 'admin', label: 'PANEL PRACOWNIKA', icon: User },
      ];
    } else {
      navItems = [...baseNav];
      navItems.push({ id: 'konto', label: 'KONTO', icon: User });
      navItems.push({ id: 'wsparcie', label: 'WSPARCIE', icon: Info });
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button 
          className="nav-logo"
          onClick={() => handleNavClick('home')}
        >
          <Leaf size={32} />
          <span>Warzywex</span>
        </button>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <button className="nav-btn logout-btn" onClick={logout}>Wyloguj</button>
            </div>
          ) : (
            <button className="nav-btn login-btn" onClick={() => setIsAuthModalOpen(true)}>
              <User size={18} />
              KONTO
            </button>
          )}
          <button 
            className="cart-btn" 
            onClick={() => handleNavClick('koszyk')}
            aria-label="Koszyk"
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