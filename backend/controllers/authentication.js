const User  = require('../Models/user.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({userID: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } ,token});

  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.signUpUser = async (req,res) => {
try  {
  const {name,username,email,password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    username,
    email,
    password:hashedPassword,
  })
  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
}catch (error) {
    res.status(500).json({ error: error.message });
  }
}
