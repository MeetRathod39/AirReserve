import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Kkl from "./kolkata.jpg"
import Ahmd from "./Ahmd.jpg"
import Pune from "./Pune.jpg"
import Delhi from "./Delhi.jpg"

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Search state
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchPassengers, setSearchPassengers] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const popularDestinations = [
  {
    city: "Kolkata",
    price: "₹5,299",
    flight: "IndiGo",
    image: Kkl,
  },
    {
    city: "Pune",
    price: "₹4,200",
    flight: "Vistara",
    image: Pune,
  },
  {
    city: "Ahmedabad",
    price: "₹3,899",
    flight: "AirAsia",
    image: Ahmd,
  },
  {
    city: "Delhi",
    price: "₹4,799",
    flight: "Air India",
    image: Delhi,
  },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Flight search
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);

    const queryParams = new URLSearchParams();
    if (searchFrom.trim()) queryParams.append("from", searchFrom.trim());
    if (searchTo.trim()) queryParams.append("to", searchTo.trim());
    if (searchDate) queryParams.append("departureDate", searchDate);

    try {
      const response = await fetch(
        `http://localhost:4000/api/flights?${queryParams.toString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch flights");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching flights:", error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><Link to="/">FlightBooker</Link></div>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="profile-name">
                Hello, {user.name} ({user.email})
              </span>
              <button onClick={handleLogout} className="nav-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/signup" className="nav-btn nav-btn-signup">Sign Up</Link>
              <Link to="/contact" className="nav-btn">ContactUs</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero + Search */}
      <section className="hero">
        <div className="overlay">
          <h1>Fly Smarter, Fly Faster</h1>
          <p>Book affordable flights across the globe in seconds.</p>
          <form className="flight-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="From (City or Airport)"
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="To (City or Airport)"
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              autoComplete="off"
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Passengers"
              value={searchPassengers}
              onChange={(e) => setSearchPassengers(e.target.value)}
            />
            <button type="submit" disabled={searching}>
              {searching ? "Searching..." : "Search Flights"}
            </button>
          </form>

          {/* ==== ATTRACTIVE SEARCH RESULTS ==== */}
          {searchResults.length > 0 && (
            <section className="search-results">
              <h3>Search Results</h3>
              <p>
                Showing {searchResults.length} flight
                {searchResults.length > 1 ? "s" : ""} matching your criteria.
              </p>
              <ul>
                {searchResults.map((flight) => (
                  <li key={flight._id} className="flight-card">
                    <div className="flight-info">
                      <div className="flight-route">
                        <span className="city">{flight.from}</span>
                        <span className="arrow">→</span>
                        <span className="city">{flight.to}</span>
                      </div>
                      <div className="flight-date">
                        {new Date(flight.departureDate).toLocaleDateString()}
                      </div>
                      <div className="flight-airline-price">
                        <span className="airline">{flight.airline}</span> &mdash;&nbsp;
                        <span className="price">₹{flight.price.toLocaleString()}</span>
                      </div>
                      <div className="flight-seats">
                        {flight.seatsRemaining} seat
                        {flight.seatsRemaining !== 1 ? "s" : ""} left
                      </div>
                    </div>
                    <button
                      className="book-now-btn"
                      onClick={() => navigate("/payment", { state: { flight } })}
                    >
                      Book Now
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!searching &&
            searchResults.length === 0 &&
            (searchFrom || searchTo || searchDate) && (
              <p>No flights found matching your criteria.</p>
            )}
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <h2>Why Book With Us?</h2>
        <div className="benefits-cards">
          <div className="card">
            <span role="img" aria-label="Discount">💸</span>
            <h3>Best Prices</h3>
            <p>Find unbeatable deals from leading airlines.</p>
          </div>
          <div className="card">
            <span role="img" aria-label="Support">🛎️</span>
            <h3>24/7 Support</h3>
            <p>Our team is here for you, anytime, anywhere.</p>
          </div>
          <div className="card">
            <span role="img" aria-label="Easy Booking">🛫</span>
            <h3>Easy Booking</h3>
            <p>Simple, fast & secure booking process.</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          {popularDestinations.map((dest, index) => (
            <div className="dest-card" key={index}>
              <img src={dest.image} alt={dest.city} className="dest-image" />
              <h3 className="dest-name">{dest.city}</h3>
              <div className="dest-overlay">
                <p className="dest-price">{dest.price}</p>
                <p className="dest-flight">{dest.flight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
        <section className="cta-section">
              <h2>Ready to Take Off?</h2>
              <p>Join thousands of happy travelers on your next journey.</p>

              <button
                onClick={() => {
                  if (user) {
                    navigate("/Deals");
                  } else {
                    alert("Please login or sign up to access exclusive offers!");
                  }
                }}
                className="button"
                style={{ "--clr": "#20b7ff", cursor: "pointer" }}
                type="button"
              >
                Browse Deals
                <span className="button__icon-wrapper">
                  <svg
                    className="button__icon-svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path d="M6 13L10 17L14 13" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 17V3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <svg
                    className="button__icon-svg button__icon-svg--copy"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path d="M6 13L10 17L14 13" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 17V3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </button>
         </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 FlightBooker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
