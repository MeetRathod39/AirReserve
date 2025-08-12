import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DealsPage.css";
import Mumbai from "./Mumbai.jpg"
import Delhi from "./Delhi.jpg"
import Bng from "./Bengaluru.jpg"
import Goa from "./Gooa.jpg"
import Jaipur from "./Jaipur.jpg"
import Kkl from "./kolkata.jpg"
import Hyd from "./Hyderabad.jpg"
import Ahmd from "./Ahmd.jpg"
import Pune from "./Pune.jpg"

const indianDeals = [
  {
    destination: "Mumbai",
    price: "₹5,999",
    discount: "15% Off",
    airline: "IndiGo",
    image: Mumbai,
    dates: "Sep - Nov 2025",
    tags: ["Direct", "Flexible Date"],
  },
  {
    destination: "Delhi",
    price: "₹4,799",
    discount: "10% Off",
    airline: "Air India",
    image: Delhi,
    dates: "Aug - Oct 2025",
    tags: ["Early Bird", "5-star"],
  },
  {
    destination: "Chennai",
    price: "₹6,499",
    discount: "12% Off",
    airline: "SpiceJet",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600",
    dates: "All Year",
    tags: ["Popular", "Weekend"],
  },
  {
    destination: "Bengaluru",
    price: "₹4,399",
    discount: "18% Off",
    airline: "Vistara",
    image: Bng,
    dates: "Oct - Dec 2025",
    tags: ["Luxury", "Direct"],
  },
  {
    destination: "Goa",
    price: "₹7,999",
    discount: "25% Off",
    airline: "AirAsia",
    image: Goa,
    dates: "Nov - Jan 2026",
    tags: ["Beach", "Holiday", "Family"],
  },
  {
    destination: "Kolkata",
    price: "₹5,299",
    discount: "14% Off",
    airline: "IndiGo",
    image: Kkl,
    dates: "Dec - Feb 2026",
    tags: ["Winter", "Cultural"],
  },
  {
    destination: "Hyderabad",
    price: "₹4,700",
    discount: "11% Off",
    airline: "Air India",
    image: Hyd,
    dates: "All Year",
    tags: ["City", "Business"],
  },
  {
    destination: "Jaipur",
    price: "₹5,100",
    discount: "10% Off",
    airline: "SpiceJet",
    image: Jaipur,
    dates: "Sep - Nov 2025",
    tags: ["Heritage", "Tourism"],
  },
  {
    destination: "Pune",
    price: "₹4,200",
    discount: "8% Off",
    airline: "Vistara",
    image: Pune,
    dates: "Oct - Dec 2025",
    tags: ["Business", "Direct"],
  },
  {
    destination: "Ahmedabad",
    price: "₹3,899",
    discount: "9% Off",
    airline: "AirAsia",
    image: Ahmd,
    dates: "Nov - Jan 2026",
    tags: ["Direct", "Shopping"],
  },
];

const ITEMS_PER_PAGE = 4;

const DealsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(indianDeals.length / ITEMS_PER_PAGE);

  // Calculate current page's deals
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDeals = indianDeals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Navigate to payment page passing flight data
  const handleBookNow = (deal) => {
    const flight = {
      from: "Current Location", // Customize if needed
      to: deal.destination,
      airline: deal.airline,
      price: Number(deal.price.replace(/[^0-9]/g, '')),
      departureDate: new Date().toISOString(),
      seatsRemaining: 10, // Example static seat count
    };
    navigate("/payment", { state: { flight } });
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <div className="deals-page">
      <nav className="deals-navbar">
        <div className="logo">
          <Link to="/">FlightBooker</Link>
        </div>
      </nav>

      <header className="deals-header">
        <h1>🔥 Hot Indian Flight Deals</h1>
        <p>Grab exclusive flight deals handpicked for you. Limited-time offers!</p>
      </header>

      <section className="deals-list" role="list">
        {currentDeals.map((deal, idx) => (
          <article
            className="deal-card"
            key={idx}
            tabIndex={0}
            aria-label={`Flight deal to ${deal.destination} with ${deal.airline} priced at ${deal.price}`}
            role="listitem"
          >
            <div className="deal-img-wrapper">
              <img
                src={deal.image}
                alt={`View of ${deal.destination}`}
                className="deal-img"
                loading="lazy"
              />
            </div>
            <div className="deal-details">
              <h2>
                {deal.destination}{" "}
                <span className="deal-airline">({deal.airline})</span>
              </h2>

              <div className="deal-price-row">
                <span className="deal-price">{deal.price}</span>
                <span className="deal-discount">{deal.discount}</span>
              </div>

              <div className="deal-dates">{deal.dates}</div>

              <div className="deal-tags" aria-label="Deal features">
                {deal.tags.map((tag) => (
                  <span className="deal-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="book-btn"
                onClick={() => handleBookNow(deal)}
                aria-label={`Book flight to ${deal.destination} with ${deal.airline} at price ${deal.price}`}
              >
                Book Now
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <nav
        className="pagination"
        aria-label="Pagination for deals"
      >
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="pagination-btn"
        >
          &laquo; Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="pagination-btn"
        >
          Next &raquo;
        </button>
      </nav>

      <section className="deals-cta">
        <h2>Don’t miss your next adventure!</h2>
        <Link to="/" className="back-home-btn" aria-label="Back to Home">
          Back to Home
        </Link>
      </section>

      <footer>
        <p>&copy; 2025 FlightBooker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DealsPage;
