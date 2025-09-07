const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/post');
const app = express();
const connectDB = require('./db');

connectDB();

const allowedOrigins = [
  'http://localhost:3000',              
  'https://inkflow84x.netlify.app'    
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes)

module.exports = app;