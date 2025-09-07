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
  if (!token) {
    console.log('ProtectedRoute: No token, redirecting to /');
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;