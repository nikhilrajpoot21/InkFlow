const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/post');
const app = express();
const connectDB = require('./db');

connectDB();

app.use(cors({
  origin: function(origin, callback) {
    console.log('=== CORS DEBUG ===');
    console.log('Request origin:', origin);
    console.log('Origin type:', typeof origin);
    console.log('Origin length:', origin ? origin.length : 'null');
    console.log('==================');
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'https://inkflow24x.netlify.app',
      'https://inkflow24x.netlify.app/'
    ];
    
    // Check if origin is allowed
    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      return callback(null, true);
    }
    
    // If not allowed, log and reject
    console.log('Origin BLOCKED:', origin);
    console.log('Available origins:', allowedOrigins);
    return callback(new Error('CORS not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes)

module.exports = app;