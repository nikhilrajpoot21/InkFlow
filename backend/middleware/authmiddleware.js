// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('authMiddleware: Token received', {
    token: token?.substring(0, 20) + '...',
    headers: req.headers.authorization,
    path: req.path,
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
  });
  if (!token) {
    console.log('authMiddleware: No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    console.log('authMiddleware: Verifying with JWT_SECRET', process.env.JWT_SECRET?.substring(0, 8) + '...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('authMiddleware: Token decoded', {
      userID: decoded.userID,
      iat: new Date(decoded.iat * 1000).toISOString(),
      exp: new Date(decoded.exp * 1000).toISOString(),
      serverTime: new Date().toISOString(),
    });
    req.user = { id: decoded.userID };
    next();
  } catch (err) {
    console.error('authMiddleware: Token verification failed', {
      error: err.message,
      token: token?.substring(0, 20) + '...',
      timestamp: new Date().toISOString(),
    });
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;