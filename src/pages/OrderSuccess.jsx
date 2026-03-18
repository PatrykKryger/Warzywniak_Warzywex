import React, { useEffect } from 'react';
import { CheckCircle, Package, Home, Leaf } from 'lucide-react';

const OrderSuccess = ({ setCurrentPage, order }) => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page success-page">
      <div className="success-container">
        <div className="success-icon">
          <CheckCircle size={100} />
        </div>

        <h1>Dziękujemy za zamówienie!</h1>
        
        <div className="success-content">
          <div className="success-message">
            <p className="main-text">
              Twoje zamówienie zostało przyjęte i przetwarzane.
            </p>
            <p className="sub-text">
              Zaraz otrzymasz wiadomość na adres e-mail z potwierdzeniem zamówienia i numerem śledzenia.
            </p>
          </div>

          <div className="success-details">
            <div className="detail-item">
              <Package size={24} />
              <div>
                <h3>Zamówienie Potwierdzone</h3>
                <p>Numer zamówienia: {order?.id || 'BRAK'}</p>
                {order?.createdAt && (
                  <p className="order-date">Data: {new Date(order.createdAt).toLocaleString()}</p>
                )}
                {order?.total != null && (
                  <p className="order-total">Wartość: {order.total.toFixed(2)} zł</p>
                )}
              </div>
            </div>

            <div className="detail-item">
              <Leaf size={24} />
              <div>
                <h3>Świeże Produkty Warzywex</h3>
                <p>Twoje produkty zostaną wysłane w ciągu 24 godzin</p>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button 
              className="btn-secondary"
              onClick={() => setCurrentPage('produkty')}
            >
              <Leaf size={18} />
              Kontynuuj Zakupy
            </button>
          </div>

          <div className="success-footer">
            <p>Śledź swoje zamówienie: <strong>Twoje Konto → Zamówienia</strong></p>
            <p className="contact-text">
              Masz pytania? Skontaktuj się z nami na: 
              <a href="mailto:info@warzywex.pl"> info@warzywex.pl</a>
            </p>
          </div>
        </div>

        <div className="confetti" id="confetti"></div>
      </div>
    </div>
  );
};

export default OrderSuccess;
