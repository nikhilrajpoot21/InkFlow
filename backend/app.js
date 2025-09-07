const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/post');
const app = express();
const connectDB = require('./db');

connectDB();

// app.js
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS: Request origin', { origin, timestamp: new Date().toISOString() });
    const allowedOrigins = ['http://localhost:3000', 'https://inkflow24x.netlify.app'];
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('CORS: Origin allowed', origin);
      return callback(null, true);
    }
    console.log('CORS: Origin blocked', { origin, allowed: allowedOrigins });
    return callback(new Error('CORS not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200,
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes)

module.exports = app;