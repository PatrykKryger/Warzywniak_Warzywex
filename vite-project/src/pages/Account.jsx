import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Package, RefreshCcw, User, CreditCard, ShoppingBag } from 'lucide-react';

const AccountPage = () => {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [returns, setReturns] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const userKey = useMemo(() => {
    if (!user?.email) return null;
    return user.email;
  }, [user]);

  useEffect(() => {
    if (!userKey) return;
    const loadedOrders = JSON.parse(localStorage.getItem(`orders_${userKey}`) || '[]');
    const loadedReturns = JSON.parse(localStorage.getItem(`returns_${userKey}`) || '[]');
    setOrders(loadedOrders);
    setReturns(loadedReturns);

    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
      });
    }
  }, [userKey, user]);

  const saveReturns = (nextReturns) => {
    if (!userKey) return;
    localStorage.setItem(`returns_${userKey}`, JSON.stringify(nextReturns));
    setReturns(nextReturns);
  };

  const handleSubmitReturn = (e) => {
    e.preventDefault();

    if (!selectedOrderId || !returnReason.trim()) {
      alert('Proszę wybrać zamówienie i podać powód zwrotu.');
      return;
    }

    const order = orders.find(o => o.id === selectedOrderId);
    if (!order) {
      alert('Nie odnaleziono wybranego zamówienia.');
      return;
    }

    const newReturn = {
      id: `RT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      orderId: order.id,
      createdAt: new Date().toISOString(),
      status: 'W oczekiwaniu',
      reason: returnReason.trim(),
      orderTotal: order.total,
    };

    saveReturns([newReturn, ...returns]);
    setReturnReason('');
    setSelectedOrderId('');
  };

  if (!user) {
    return (
      <div className="page">
        <div className="empty-cart">
          <User size={64} />
          <h2>Nie jesteś zalogowany</h2>
          <p>Zaloguj się, aby zobaczyć swoje konto, zamówienia i zwroty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page account-page">
      <div className="account-header">
        <h1>Moje konto</h1>
        <p>Witaj, {user.name}. Poniżej znajdziesz informacje o Twoim profilu i zamówieniach.</p>
      </div>

      <div className="account-grid">
        <section className="account-card">
          <h2>Twoje dane</h2>
          <div className="profile-form">
            <div className="form-row">
              <label htmlFor="profileName">Imię i nazwisko</label>
              <input
                id="profileName"
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="form-row">
              <label htmlFor="profileEmail">Email</label>
              <input
                id="profileEmail"
                type="email"
                value={user.email}
                disabled
              />
            </div>

            <div className="form-row">
              <label htmlFor="profilePhone">Telefon</label>
              <input
                id="profilePhone"
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <div className="form-row">
              <label htmlFor="profileAddress">Adres</label>
              <input
                id="profileAddress"
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>

            <div className="form-row">
              <label htmlFor="profileCity">Miasto</label>
              <input
                id="profileCity"
                type="text"
                value={profileForm.city}
                onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>

            <div className="form-row">
              <label htmlFor="profilePostal">Kod pocztowy</label>
              <input
                id="profilePostal"
                type="text"
                value={profileForm.postalCode}
                onChange={(e) => setProfileForm(prev => ({ ...prev, postalCode: e.target.value }))}
              />
            </div>

            <button
              className="checkout-btn"
              type="button"
              onClick={() => {
                updateUser(profileForm);
                setProfileSaved(true);
                setTimeout(() => setProfileSaved(false), 3000);
              }}
            >
              Zapisz dane
            </button>

            {profileSaved && (
              <p className="profile-saved">Dane zostały zapisane.</p>
            )}
          </div>
        </section>

        <section className="account-card">
          <h2>Zamówienia</h2>
          {orders.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Nie złożyłeś jeszcze żadnego zamówienia.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div className="order-id">
                      <Package size={18} />
                      <span>{order.id}</span>
                    </div>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <div className="order-details">
                    <p>Data: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>Kwota: {order.total.toFixed(2)} zł</p>
                    <p>Produkty: {order.items.length}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="account-card">
          <h2>Zwroty</h2>
          <form className="return-form" onSubmit={handleSubmitReturn}>
            <div className="form-group">
              <label htmlFor="orderSelect">Wybierz zamówienie</label>
              <select
                id="orderSelect"
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
              >
                <option value="">-- Wybierz zamówienie --</option>
                {orders.map(order => (
                  <option key={order.id} value={order.id}>
                    {order.id} - {new Date(order.createdAt).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="returnReason">Powód zwrotu</label>
              <textarea
                id="returnReason"
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                placeholder="Opisz powód zwrotu"
              />
            </div>
            <button type="submit" className="checkout-btn">
              <RefreshCcw size={18} />
              Zgłoś zwrot
            </button>
          </form>

          {returns.length > 0 && (
            <div className="returns-list">
              <h3>Twoje zgłoszenia zwrotów</h3>
              {returns.map(ret => (
                <div key={ret.id} className="return-item">
                  <div className="return-header">
                    <span className="return-id">{ret.id}</span>
                    <span className="return-status">{ret.status}</span>
                  </div>
                  <div className="return-details">
                    <p>Zamówienie: {ret.orderId}</p>
                    <p>Kwota: {ret.orderTotal.toFixed(2)} zł</p>
                    <p>Data: {new Date(ret.createdAt).toLocaleString()}</p>
                    <p>Powód: {ret.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="account-footer">
        <p>Masz pytania? Skontaktuj się z nami na <a href="mailto:info@warzywex.pl">info@warzywex.pl</a>.</p>
      </div>
    </div>
  );
};

export default AccountPage;
