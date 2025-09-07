// protectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('ProtectedRoute: Token found:', !!token, 'Token:', token);
  if (!token) {
    console.log('ProtectedRoute: No token, redirecting to /');
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;