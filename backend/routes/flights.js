const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Flight = require('../models/Flight');

// GET /flights - Fetch flights with optional filters for from, to, departureDate, passengers
router.get('/', async (req, res) => {
  try {
    const query = {};

    if (req.query.from && req.query.from.trim() !== '') {
      // Partial case-insensitive match on 'from'
      query.from = new RegExp(req.query.from.trim(), 'i');
    }

    if (req.query.to && req.query.to.trim() !== '') {
      // Partial case-insensitive match on 'to'
      query.to = new RegExp(req.query.to.trim(), 'i');
    }

    if (req.query.departureDate && req.query.departureDate.trim() !== '') {
      const start = new Date(req.query.departureDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(req.query.departureDate);
      end.setHours(23, 59, 59, 999);

      query.departureDate = { $gte: start, $lte: end };
    }

    if (req.query.passengers) {
      const passengers = parseInt(req.query.passengers, 10);
      if (!isNaN(passengers) && passengers > 0) {
        query.seatsRemaining = { $gte: passengers };
      }
    }

    const flights = await Flight.find(query).exec();
    res.json(flights);
  } catch (err) {
    console.error('Error fetching flights:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /flights - Create new flight (admin use)
router.post('/', async (req, res) => {
  try {
    const {
      from,
      to,
      departureDate,
      price,
      airline,
      seatsRemaining,
    } = req.body;

    const flight = new Flight({
      from,
      to,
      departureDate,
      price,
      airline,
      flightNumber,
      seatsRemaining,
    });

    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    console.error('Error creating flight:', err);
    res.status(400).json({ error: 'Invalid flight data' });
  }
});

// POST /flights/book - Book tickets and decrement seatsRemaining atomically
router.post('/book', async (req, res) => {
  const { flightId, numberOfTickets } = req.body;

  if (!mongoose.Types.ObjectId.isValid(flightId)) {
    return res.status(400).json({ error: 'Invalid flight ID' });
  }

  if (!numberOfTickets || numberOfTickets < 1) {
    return res.status(400).json({ error: 'Please specify a valid number of tickets' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const flight = await Flight.findById(flightId).session(session);

    if (!flight) {
      throw new Error('Flight not found');
    }

    if (flight.seatsRemaining < numberOfTickets) {
      throw new Error('Not enough seats available');
    }

    flight.seatsRemaining -= numberOfTickets;
    await flight.save({ session });

    // You can create booking records or handle payment here

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Booking confirmed',
      flightId: flight._id,
      seatsLeft: flight.seatsRemaining,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Booking error:', error.message);
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
