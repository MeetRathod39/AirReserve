import React, { useState } from "react";
import "./contactus.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would actually send email or store ticket
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>Contact FlightBooker</h1>
        <p>Have a question, feedback, or need help? We’re here for you 24/7.</p>
      </div>
      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Message
            <textarea
              placeholder="Type your message here..."
              name="message"
              required
              value={form.message}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Send Message</button>
          {submitted && (
            <div className="contact-success">
                !!Thank you for contacting us! We'll get back to you soon.!!
            </div>
          )}
        </form>
        <aside className="contact-info">
          <h3>Our Contact Info</h3>
          <p><b>Email:</b> support@flightbooker.com</p>
          <p><b>Call Us:</b> 1800-123-4567</p>
          <div className="contact-socials">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ContactUs;
