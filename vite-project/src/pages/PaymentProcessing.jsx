import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

const PaymentProcessing = ({ onProcessingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onProcessingComplete();
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onProcessingComplete]);

  return (
    <div className="page processing-page">
      <div className="processing-container">
        <div className="processing-animation">
          <Loader size={80} className="processing-spinner" />
        </div>
        
        <h1>Przetwarzanie Płatności</h1>
        <p>Prosimy czekać, przetwarzamy Twoją transakcję...</p>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <p className="progress-text">{Math.round(progress)}%</p>
        
        <div className="processing-info">
          <p>✓ Dane karty są bezpieczne</p>
          <p>✓ Transakcja jest szyfrowana</p>
          <p>✓ Wszystko przebiega normalnie</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
