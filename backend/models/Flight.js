const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
  {
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    departureDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    airline: { type: String, required: true, trim: true },

    // Optional additional fields
    flightNumber: { type: String, trim: true },
    seatsRemaining: { type: Number, default: 0, min: 0 },
    arrivalDate: { type: Date }, // Optional separate arrival date/time
    durationMinutes: { type: Number, min: 0 }, // Flight duration in minutes
  },
  { timestamps: true }
);

// Compound index for efficient queries by from, to & date
flightSchema.index({ from: 1, to: 1, departureDate: 1 });

module.exports = mongoose.model('Flight', flightSchema);
