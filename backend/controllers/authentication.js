// authentication.js
const User = require('../Models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('loginUser: User not found', { email });
      return res.status(401).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('loginUser: Invalid credentials', { email });
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('loginUser: Generating token', {
      userID: user._id,
      email,
      JWT_SECRET: process.env.JWT_SECRET?.substring(0, 8) + '...',
      serverTime: new Date().toISOString(),
    });
    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email }, token });
  } catch (err) {
    console.error('loginUser: Error', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.signUpUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log('signUpUser: User created', { email });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('signUpUser: Error', error.message);
    return res.status(500).json({ error: error.message });
  }
};