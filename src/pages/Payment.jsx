import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, Zap, Check } from 'lucide-react';
import { validateDiscountCode } from '../utils/productStorage.js';

const Payment = ({ total = 0, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [errors, setErrors] = useState({});
  const [cardFocused, setCardFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    if (name === 'expiryDate') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
      if (processedValue.length >= 2) {
        processedValue = processedValue.slice(0, 2) + '/' + processedValue.slice(2);
      }
    }

    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleApplyDiscount = () => {
    setDiscountError('');
    const result = validateDiscountCode(discountCode);
    if (result) {
      setAppliedDiscount(result);
    } else {
      setDiscountError('Nieprawidłowy kod rabatowy');
    }
  };

  const calculateDiscountedTotal = () => {
    if (appliedDiscount) {
      return total * (1 - appliedDiscount.discount);
    }
    return total;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Imię i nazwisko jest wymagane';
    if (!formData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Numer karty jest wymagany';
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Numer karty musi mieć 16 cyfr';
    if (!formData.expiryDate) newErrors.expiryDate = 'Data wygaśnięcia jest wymagana';
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Format: MM/YY';
    if (!formData.cvv) newErrors.cvv = 'CVV jest wymagany';
    if (formData.cvv.length < 3) newErrors.cvv = 'CVV musi mieć 3-4 cyfry';
    if (!formData.email.trim()) newErrors.email = 'Email jest wymagany';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Wpisz prawidłowy email';
    if (!formData.address.trim()) newErrors.address = 'Adres jest wymagany';
    if (!formData.city.trim()) newErrors.city = 'Miasto jest wymagane';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Kod pocztowy jest wymagany';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        discountCode: appliedDiscount ? discountCode : null,
        discountAmount: appliedDiscount ? total * appliedDiscount.discount : 0,
        finalTotal: calculateDiscountedTotal()
      });
    }
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'Amex';
    return 'Card';
  };

  return (
    <div className="page payment-page">
      <div className="payment-container">
        <div className="payment-form-section">
          <h1>Bezpieczna Płatność</h1>
          <p className="payment-subtitle">Potwierdź swoją kartę kredytową</p>

          {/* CREDIT CARD TEMPLATE */}
          <div className="credit-card-template" style={{
            background: formData.cardNumber.replace(/\s/g, '').startsWith('4') ? 
              'linear-gradient(135deg, #2d5016 0%, #3a6b1f 100%)' : 
              'linear-gradient(135deg, #1a472a 0%, #2d5016 100%)',
          }}>
            <div className="card-header">
              <div className="card-type">{getCardType(formData.cardNumber)}</div>
              <div className="card-chip"></div>
            </div>

            <div className="card-number-section">
              <label>Numer Karty</label>
              <div className="card-number">
                {formData.cardNumber || '•••• •••• •••• ••••'}
              </div>
            </div>

            <div className="card-bottom">
              <div className="cardholder">
                <label>Posiadacz Karty</label>
                <div>{formData.fullName || 'IMIĘ NAZWISKO'}</div>
              </div>
              <div className="card-expiry">
                <label>Ważna Do</label>
                <div>{formData.expiryDate || 'MM/YY'}</div>
              </div>
              <div className="card-cvv">
                <label>CVV</label>
                <div>•••</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {/* Informacje osobowe */}
            <fieldset className="form-section">
              <legend>📋 Dane Osobowe</legend>
              <div className="form-group">
                <label htmlFor="fullName">Imię i Nazwisko</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setCardFocused('fullName')}
                  placeholder="Jan Kowalski"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jan@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </fieldset>

            {/* Dane karty */}
            <fieldset className="form-section">
              <legend className="card-legend">
                <CreditCard size={20} />
                Dane Karty Kredytowej
              </legend>

              <div className="form-group">
                <label htmlFor="cardNumber">Numer Karty</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  onFocus={() => setCardFocused('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">
                    <Calendar size={16} />
                    Data Wygaśnięcia
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    onFocus={() => setCardFocused('expiryDate')}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={errors.expiryDate ? 'error' : ''}
                  />
                  {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">
                    <Lock size={16} />
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    onFocus={() => setCardFocused('cvv')}
                    placeholder="•••"
                    maxLength="4"
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
            </fieldset>

            {/* Adres dostawy */}
            <fieldset className="form-section">
              <legend>Adres Dostawy</legend>
              
              <div className="form-group">
                <label htmlFor="address">Ulica i Numer</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="ul. Główna 123"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Miasto</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Warszawa"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode">Kod Pocztowy</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="00-000"
                    className={errors.postalCode ? 'error' : ''}
                  />
                  {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                </div>
              </div>
            </fieldset>

            {/* Kod rabatowy */}
            <fieldset className="form-section">
              <legend>Kod Rabatowy (Opcjonalnie)</legend>
              <div className="discount-section">
                <div className="discount-input-group">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="Wpisz kod rabatowy"
                    className={discountError ? 'error' : appliedDiscount ? 'success' : ''}
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="discount-btn"
                  >
                    <Zap size={18} />
                    Zastosuj
                  </button>
                </div>
                {discountError && <span className="error-text">{discountError}</span>}
                {appliedDiscount && (
                  <div className="discount-applied">
                    <Check size={18} />
                    <span>{appliedDiscount.description}</span>
                  </div>
                )}
                <p className="discount-hint">💡 Dostępne kody: WELCOME10, SUMMER20, VEGAN15, SPRING25, OWOCE30</p>
              </div>
            </fieldset>

            <button type="submit" className="payment-submit-btn">
              Zapłać {calculateDiscountedTotal().toFixed(2)} zł
            </button>
          </form>
        </div>

        {/* Podsumowanie */}
        <div className="payment-summary-section">
          <h2>Podsumowanie Zamówienia</h2>
          <div className="summary-box">
            <div className="summary-row">
              <span>Produkty:</span>
              <span>{total.toFixed(2)} zł</span>
            </div>
            <div className="summary-row">
              <span>Dostawa:</span>
              <span>15.00 zł</span>
            </div>
            {appliedDiscount && (
              <div className="summary-row discount-row">
                <span>Rabat ({Math.round(appliedDiscount.discount * 100)}%):</span>
                <span>-{((total + 15) * appliedDiscount.discount).toFixed(2)} zł</span>
              </div>
            )}
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Razem:</span>
              <span>{(calculateDiscountedTotal() + 15).toFixed(2)} zł</span>
            </div>
            <p className="summary-note">
              <Lock size={14} />
              ✅ Twoja transakcja jest w pełni bezpieczna
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;