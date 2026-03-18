import { useState } from "react";

const PaymentForm = ({ onBack, onPaymentComplete }) => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardData, setCardData] = useState({
        firstName: "",
        lastName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const [blikCode, setBlikCode] = useState("");
    const [error, setError] = useState("");

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    const handlePay = () => {
        if (paymentMethod === "card") {
            if (
                !cardData.firstName.trim() ||
                !cardData.lastName.trim() ||
                !cardData.cardNumber.trim() ||
                !cardData.expiry.trim() ||
                !cardData.cvv.trim()
            ) {
                setError("Proszę poprawnie uzupełnić wszystkie pola");
                return;
            }
        } else if (paymentMethod === "blik") {
            if (!/^\d{6}$/.test(blikCode)) {
                setError("Proszę wpisać 6-cyfrowy kod BLIK");
                return;
            }
        } else {
            setError("Wybierz metodę płatności");
            return;
        }

        setError("");
        onPaymentComplete();
    };

    return (
        <div className="auth-form" id="pay">
            <h2>Wybierz metodę płatności</h2>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")}/>
                <img src="/src/assets/images/visa.png" alt="Visa" style={{ width: 40 }} />Karta płatnicza
            </label>

            {paymentMethod === "card" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <input className="auth-input"
                            type="text" name="firstName" placeholder="Imię" value={cardData.firstName} onChange={handleCardChange}/>
                        <input className="auth-input" type="text" name="lastName" placeholder="Nazwisko" value={cardData.lastName} onChange={handleCardChange}/>
                    </div>
                    <input className="auth-input" type="text" name="cardNumber" placeholder="Numer karty" value={cardData.cardNumber} onChange={handleCardChange}/>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <input className="auth-input" type="text" name="expiry" placeholder="MM/RR" value={cardData.expiry} onChange={handleCardChange}/>
                        <input className="auth-input" type="text" name="cvv" placeholder="CVV" value={cardData.cvv} onChange={handleCardChange}/>
                    </div>
                </div>
            )}

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
                <input type="radio" name="payment" value="blik" checked={paymentMethod === "blik"} onChange={() => setPaymentMethod("blik")}/>
                <img src="/src/assets/images/blik.png" alt="BLIK" style={{ width: 40 }} />
                BLIK
            </label>

            {paymentMethod === "blik" && (
                <input className="auth-input" type="text" placeholder="6-cyfrowy kod BLIK" value={blikCode} onChange={(e) => setBlikCode(e.target.value)} style={{ marginTop: "0.5rem" }}/>
            )}

            {error && <span style={{ color: "red", marginTop: "0.5rem" }}>{error}</span>}

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" className="toggle-auth-btn" onClick={onBack}>Powrót</button>
                <button type="button" className="toggle-auth-btn" onClick={handlePay}>Zapłać</button>
            </div>
        </div>
    );
};

export default PaymentForm;
