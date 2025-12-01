import React from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const { total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="page">
                <h1>Musisz być zalogowany</h1>
                <p>Aby przejść do płatności, zaloguj się.</p>
            </div>
        );
    }

    const handlePay = () => {
        alert(`Dziękujemy za zamówienie! Zapłacono: ${(total + 15).toFixed(2)} zł`);
        clearCart();
        navigate("/");
    };

    return (
        <div className="page payment-page">
            <h1>Płatność</h1>

            <div className="payment-container">
                <h2>Podsumowanie płatności</h2>

                <div className="payment-row">
                    <span>Produkty:</span>
                    <span>{total.toFixed(2)} zł</span>
                </div>

                <div className="payment-row">
                    <span>Dostawa:</span>
                    <span>15.00 zł</span>
                </div>

                <div className="payment-total">
                    <span>Razem do zapłaty:</span>
                    <strong>{(total + 15).toFixed(2)} zł</strong>
                </div>

                <h3>Metoda płatności</h3>
                <select className="payment-select">
                    <option>Karta płatnicza</option>
                    <option>BLIK</option>
                    <option>Przelew online</option>
                    <option>Płatność przy odbiorze</option>
                </select>

                <button className="checkout-btn" onClick={handlePay}>
                    Zapłać
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
