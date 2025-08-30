const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const app = express();
const connectDB = require('./db');

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

app.use('/api',authRoutes);

module.exports = app;