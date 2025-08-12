import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmation.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, paymentData } = location.state || {};

  if (!flight || !paymentData) {
    // If accessed directly, fallback
    return (
      <div className="confirmation-container">
        <h2>No booking found.</h2>
        <button className="confirmation-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-hero">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#22C55E"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" fill="#E8FFF0" />
            <path
              d="M12.354 5.146a.5.5 0 0 0-.708 0L7.5 9.293 5.854 7.646a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708z"
              fill="#22C55E"
            />
          </svg>
          <h1>Booking Confirmed!</h1>
          <p className="confirmation-message">
            Your flight has been booked successfully.
          </p>
        </div>
        <div className="flight-details">
          <h2>Flight Details</h2>
          <p>
            <b>{flight.airline}</b>: {flight.from} → {flight.to}
          </p>
          <p>Date: {new Date(flight.departureDate).toLocaleDateString()}</p>
          <p>Price: ₹{flight.price.toLocaleString()}</p>
          <p>
            Seats Remaining:&nbsp;
            <span style={{ color: "#2563eb", fontWeight: "bold" }}>
              {flight.seatsRemaining}
            </span>
          </p>
        </div>
        <div className="payment-details">
          <h2>Payment</h2>
          <p>
            <b>Method:</b> {paymentData.method}
          </p>
          {paymentData.method === "Card" && (
            <>
              <p>
                <b>Cardholder:</b> {paymentData.cardholder}
              </p>
              <p>
                <b>Card:</b> {paymentData.cardNumber}
              </p>
            </>
          )}
        </div>
        <div className="confirmation-actions">
          <button
            className="confirmation-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="confirmation-btn secondary"
            onClick={() => alert("Feature coming soon!")}
          >
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
