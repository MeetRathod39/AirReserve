const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/myMeet';
const PORT = 4000;
const CORS_ORIGIN = 'http://localhost:3000';

const app = express();

// Middleware
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json());

// Authentication routes (if any)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Flight routes
const flightRoutes = require('./routes/flights');
app.use('/api/flights', flightRoutes);

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB Connection Error:', err));

// Export config if you like (optional)
module.exports = { MONGODB_URI, PORT, CORS_ORIGIN };
