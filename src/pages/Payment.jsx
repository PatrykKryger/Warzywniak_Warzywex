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
