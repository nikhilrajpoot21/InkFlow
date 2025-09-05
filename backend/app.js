const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/post');
const app = express();
const connectDB = require('./db');

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes)

module.exports = app;