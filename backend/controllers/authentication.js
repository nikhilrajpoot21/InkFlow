const User  = require('../Models/user.js');
const bcrypt = require('bcrypt')

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Successful login
    return res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });

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
