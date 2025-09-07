const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/post');
const app = express();
const connectDB = require('./db');

connectDB();

const allowedOrigins = [
  'http://localhost:3000',              
  'https://inkflow24x.netlify.app',
  'https://inkflow24x.netlify.app/'  
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log('Blocked CORS for origin:', origin);
      return callback(new Error('CORS not allowed'), false);
    }
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes)

module.exports = app;