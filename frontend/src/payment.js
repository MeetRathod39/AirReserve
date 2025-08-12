import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css'; // Import your CSS here

const PaymentOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;

  // Payment method state: null | 'google' | 'card'
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Loading and error states
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  // Card payment field states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Redirect if no flight selected
  if (!flight) {
    return (
      <div className="payment-options-container" style={{textAlign: 'center', marginTop: '3rem'}}>
        <p>No flight selected. Please go back and choose a flight.</p>
      </div>
    );
  }

  // Handle Google Pay simulation
  const handleGPay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      alert(`Payment successful via Google Pay for flight ${flight.from} → ${flight.to}`);
      navigate('/confirmation', { state: { flight, paymentData: { method: 'Google Pay' } } });
    }, 1500);
  };

  // Handle Card Payment submission and validation
  const handleCardPayment = (e) => {
    e.preventDefault();
    setError(null);

    if (!cardName.trim()) {
      setError('Please enter the cardholder name.');
      return;
    }
    if (!cardNumber.match(/^\d{16}$/)) {
      setError('Please enter a valid 16-digit card number.');
      return;
    }
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setError('Expiry date must be in MM/YY format.');
      return;
    }
    if (!cvv.match(/^\d{3,4}$/)) {
      setError('Please enter a valid 3 or 4 digit CVV.');
      return;
    }

    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      alert(`Payment successful via Card for flight ${flight.from} → ${flight.to}`);
      const maskedCard = `**** **** **** ${cardNumber.slice(-4)}`;
      navigate('/confirmation', {
        state: { flight, paymentData: { method: 'Card', cardholder: cardName.trim(), cardNumber: maskedCard } }
      });
    }, 2000);
  };

  // Render payment method selection screen
if (!paymentMethod) {
  return (
    <div className="payment-options-container">
      <h2 className="payment-title">Select Payment Method</h2>
      <div className="payment-radio-group">

        <label className={`payment-radio-card ${paymentMethod === 'google' ? 'checked' : ''}`}>
          <div className="payment-radio-inner">
            <div className="payment-radio-head">
              {/* Google Pay Icon SVG */}
              <svg
                className="payment-radio-icon"
                aria-hidden="true"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 ..." clipRule="evenodd" />
                {/* Use full SVG path for Google Pay */}
              </svg>
              <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
              </svg>Pay</span>
            </div>
            <h2 className="payment-radio-title">Google Pay</h2>
          </div>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'google'}
            onChange={() => setPaymentMethod('google')}
            className="payment-radio-input"
            disabled={paying}
          />
          <div className="payment-radio-highlight" />
        </label>

        <label className={`payment-radio-card ${paymentMethod === 'card' ? 'checked' : ''}`}>
          <div className="payment-radio-inner">
            <div className="payment-radio-head">
              {/* Visa Icon SVG */}
              <svg
                className="payment-radio-icon"
                aria-hidden="true"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 48 48"
              >
                <rect x="4" y="12" width="40" height="24" rx="4" fill="#f1f2f7" stroke="#53669e" strokeWidth="2"/>
                <text x="24" y="30" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#2563eb">VISA</text>
              </svg>
              <span>Pay</span>
            </div>
            <h2 className="payment-radio-title">Visa Card</h2>
          </div>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
            className="payment-radio-input"
            disabled={paying}
          />
          <div className="payment-radio-highlight" />
        </label>

      </div>
    </div>
  );
}

  // Render Card Payment form if Visa selected
  return (
    <div className="card-form-container">
      <h2 className="payment-title">Card Payment</h2>

      <div className="flight-summary">
        <p><strong><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-airplane-fill" viewBox="0 0 16 16">
        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849"/>
        </svg>{flight.airline}</strong></p>
        <p>{flight.from} → {flight.to}</p>
        <p>{new Date(flight.departureDate).toLocaleDateString()}</p>
        <p>Price: ₹{flight.price.toLocaleString()}</p>
      </div>

      <form
        onSubmit={handleCardPayment}
        noValidate
        autoComplete="off"
        className="card-form-input-group"
      >
        <label className="label name-label" htmlFor="cardName">
          <span className="title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755"/>
          </svg>Full Name</span>
          <input
            id="cardName"
            type="text"
            placeholder="Full Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            disabled={paying}
            required
            autoComplete="cc-name"
            className="card-input name-input"
          />
        </label>

        <label className="label" htmlFor="cardNumber">
          <span className="title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-postcard" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5M10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM13 8h-2V6h2z"/>
            </svg>Card Number</span>
          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
            disabled={paying}
            inputMode="numeric"
            className="card-input number-input"
            required
            autoComplete="cc-number"
          />
        </label>

        <div className="card-form-row card-form-input-group">
          <label className="label" htmlFor="expiry">
            <span className="title">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x" viewBox="0 0 16 16">
              <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
              </svg>Expiry (MM/YY)</span>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value.replace(/[^\d/]/g, ''))}
              disabled={paying}
              inputMode="numeric"
              className="card-input expiry-input"
              required
              autoComplete="cc-exp"
            />
          </label>

          <label className="label" htmlFor="cvv">
            <span className="title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
            </svg>CVV</span>
            <input
              id="cvv"
              type="password"
              placeholder="123"
              maxLength="4"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              disabled={paying}
              inputMode="numeric"
              className="card-input cvv-input"
              required
              autoComplete="cc-csc"
            />
          </label>
        </div>

        {error && <p className="payment-error" style={{ color: '#f87171' }}>{error}</p>}

        <button
          type="submit"
          disabled={paying}
          className="checkout-btn"
        >
          {paying ? 'Processing...' : `Pay ₹${flight.price.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentOptions;
