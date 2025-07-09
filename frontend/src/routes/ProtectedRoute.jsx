
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken'); // Use your token key
    if (!token) return false;
    
    // Optional: Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        // Token expired, remove it
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        return false;
      }
      
      return true;
    } catch (error) {
      // Invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return false;
    }
  };

  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;