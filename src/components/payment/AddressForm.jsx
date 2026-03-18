import { useState } from "react";

const AddressForm = ({ onNext }) => {
    const [formData, setFormData] = useState({
        city: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
        postalCode: "",
    });

    const [hasError, setHasError] = useState(false);

    const handleChange = (e) => {
        const { placeholder, value } = e.target;

        switch (placeholder) {
            case "Miasto":
                setFormData({ ...formData, city: value });
                break;
            case "Ulica":
                setFormData({ ...formData, street: value });
                break;
            case "Nr domu":
                setFormData({ ...formData, houseNumber: value });
                break;
            case "Nr mieszkania":
                setFormData({ ...formData, apartmentNumber: value });
                break;
            case "Kod pocztowy":
                setFormData({ ...formData, postalCode: value });
                break;
        }
    };

    const validate = () => {
        const postalRegex = /^\d{2}-\d{3}$/;

        if (
            !formData.city.trim() ||
            !formData.street.trim() ||
            !formData.houseNumber.trim() ||
            !formData.apartmentNumber.trim() ||
            !postalRegex.test(formData.postalCode)
        ) {
            setHasError(true);
            return false;
        }

        setHasError(false);
        return true;
    };

    const handleNext = () => {
        if (validate()) {
            console.log("Adres do wysyłki:", formData);
            onNext();
        }
    };

    return (
        <form className="auth-form">
            <h2>Adres dostawy</h2>

            <input className="auth-input" type="text" placeholder="Miasto" value={formData.city} onChange={handleChange}/>
            <input className="auth-input" type="text" placeholder="Ulica" value={formData.street} onChange={handleChange}
            />

            <div style={{ display: "flex", gap: "1rem" }}>
                <input className="auth-input" type="text" placeholder="Nr domu" value={formData.houseNumber} onChange={handleChange}/>
                <input className="auth-input" type="text" placeholder="Nr mieszkania" value={formData.apartmentNumber} onChange={handleChange}/>
            </div>

            <input className="auth-input" type="text" placeholder="Kod pocztowy" value={formData.postalCode} onChange={handleChange}/>

            {hasError && (
                <span style={{ color: "red", marginTop: "0.5rem" }}>Proszę poprawnie uzupełnić wszystkie pola</span>
            )}

            <button type="button" className="toggle-auth-btn" onClick={handleNext} style={{ marginTop: "1rem" }}>Dalej</button>
        </form>
    );
};

export default AddressForm;
