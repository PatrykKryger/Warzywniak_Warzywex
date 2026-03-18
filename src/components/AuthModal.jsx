import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isEmployee, setIsEmployee] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = () => {
    setError('');

    if (isLogin) {
      if (login(formData.email, formData.password, isEmployee)) {
        setIsAuthModalOpen(false);
        setFormData({ name: '', email: '', password: '' });
        setIsEmployee(false);
      } else {
        setError(isEmployee ? 'Nieprawidłowe dane pracownika' : 'Nieprawidłowy email lub hasło');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Wypełnij wszystkie pola');
        return;
      }
      if (register(formData.name, formData.email, formData.password, isEmployee)) {
        setError('');
        alert(isEmployee ? 'Rejestracja pracownika udana!' : 'Rejestracja udana! Możesz się teraz zalogować.');
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '' });
        setIsEmployee(false);
      } else {
        setError('Użytkownik o tym emailu już istnieje');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsAuthModalOpen(false)}>
          <X size={24} />
        </button>

        <h2>{isLogin ? (isEmployee ? 'Zaloguj się jako pracownik' : 'Zaloguj się') : (isEmployee ? 'Zarejestruj pracownika' : 'Zarejestruj się')}</h2>

        <div className="auth-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Imię i nazwisko"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="auth-input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            className="auth-input"
            required
          />

          <div className="employee-toggle">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isEmployee}
                onChange={e => setIsEmployee(e.target.checked)}
              />
              <span className="checkmark"></span>
              {!isEmployee 
                ? (isLogin ? 'Zaloguj się jako pracownik' : 'Zarejestruj jako pracownik')
                : (isLogin ? 'Zaloguj się jako klient' : 'Zarejestruj się jako klient')
              }
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button onClick={handleSubmit} className="auth-submit-btn">
            {isLogin ? (isEmployee ? 'Zaloguj się jako pracownik' : 'Zaloguj się') : (isEmployee ? 'Zarejestruj pracownika' : 'Zarejestruj się')}
          </button>
        </div>

        <button 
          className="toggle-auth-btn"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
        >
          {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
