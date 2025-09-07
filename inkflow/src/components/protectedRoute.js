// protectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('ProtectedRoute: Token check', {
    tokenExists: !!token,
    tokenValue: token,
    location: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  // Basic JWT format validation (3 parts: header.payload.signature)
  const isValidTokenFormat = token && typeof token === 'string' && token.split('.').length === 3;

  if (!token || !isValidTokenFormat) {
    console.log('ProtectedRoute: Invalid or no token, redirecting to /');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;