<<<<<<< HEAD:vite-project/src/pages/Payment.jsx
import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const Payment = ({ total, onSubmit }) => {
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      processedValue = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    // Format expiry date (MM/YY)
    if (name === 'expiryDate') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
      if (processedValue.length >= 2) {
        processedValue = processedValue.slice(0, 2) + '/' + processedValue.slice(2);
      }
    }

    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
      onSubmit(formData);
    }
  };

  return (
    <div className="page payment-page">
      <div className="payment-container">
        <div className="payment-form-section">
          <h1>Formularz Płatności</h1>
          <p className="payment-subtitle">Bezpieczna transakcja za pośrednictwem Warzywex</p>

          <form onSubmit={handleSubmit} className="payment-form">
            {/* Informacje osobowe */}
            <fieldset className="form-section">
              <legend>Dane Osobowe</legend>
              <div className="form-group">
                <label htmlFor="fullName">Imię i Nazwisko</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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
              
              <div className="card-preview">
                <div className="card-chip"></div>
                <div className="card-number-display">
                  {formData.cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="card-info">
                  <div className="card-name">
                    {formData.fullName || 'Imię Nazwisko'}
                  </div>
                  <div className="card-expiry">
                    {formData.expiryDate || 'MM/YY'}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Numer Karty</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
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

            <button type="submit" className="payment-submit-btn">
              Zapłać {total.toFixed(2)} zł
            </button>
          </form>
        </div>

        <div className="payment-summary-section">
          <h2>Podsumowanie Zamówienia</h2>
          <div className="summary-box">
            <p className="summary-label">Razem do zapłaty:</p>
            <p className="summary-amount">{total.toFixed(2)} zł</p>
            <div className="summary-divider"></div>
            <p className="summary-note">
              <Lock size={14} />
              Twoja transakcja jest w pełni bezpieczna
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
=======
import { useState } from "react";
import AddressForm from "../components/payment/AddressForm.jsx";
import PaymentForm from "../components/payment/PaymentForm.jsx";
import Acknowledgment from "../components/payment/Acknowledgment.jsx";

const PaymentPage = () => {
    const [step, setStep] = useState("address"); // address, payment, acknowledgment

    const goToPayment = () => setStep("payment");
    const goToAcknowledgment = () => setStep("acknowledgment");
    const goBackToAddress = () => setStep("address");

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            {step === "address" && <AddressForm onNext={goToPayment} />}
            {step === "payment" && (
                <PaymentForm
                    onBack={goBackToAddress}
                    onPaymentComplete={goToAcknowledgment}
                />
            )}
            {step === "acknowledgment" && <Acknowledgment />}
        </div>
    );
};

export default PaymentPage;
>>>>>>> 30d5d3d4ab126a5a04bafdfa80ff7feef8a18d33:src/pages/Payment.jsx
