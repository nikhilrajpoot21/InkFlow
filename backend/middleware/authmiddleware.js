// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('authMiddleware: Token received', {
    token,
    headers: req.headers.authorization,
    path: req.path,
    timestamp: new Date().toISOString(),
  });
  if (!token) {
    console.log('authMiddleware: No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('authMiddleware: Token decoded', decoded);
    req.user = { id: decoded.userID };
    next();
  } catch (err) {
    console.error('authMiddleware: Token verification failed', {
      error: err.message,
      token,
      timestamp: new Date().toISOString(),
    });
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;