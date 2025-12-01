import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingCart, User, Home, Tag, Leaf, Info, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';


const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert('Zaloguj się, aby sfinalizować zakup');
      return;
    }
    alert(`Dziękujemy za zamówienie! Wartość: ${total.toFixed(2)} zł`);
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-cart">
          <ShoppingCart size={64} />
          <h2>Twój koszyk jest pusty</h2>
          <p>Dodaj produkty, aby kontynuować zakupy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Koszyk</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">{item.image}</div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{item.price.toFixed(2)} zł / szt.</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="cart-item-total">
                {(item.price * item.quantity).toFixed(2)} zł
              </div>
              <button 
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Podsumowanie</h2>
          <div className="summary-row">
            <span>Produkty:</span>
            <span>{total.toFixed(2)} zł</span>
          </div>
          <div className="summary-row">
            <span>Dostawa:</span>
            <span>15.00 zł</span>
          </div>
          <div className="summary-total">
            <span>Razem:</span>
            <span>{(total + 15).toFixed(2)} zł</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Finalizuj zamówienie
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;