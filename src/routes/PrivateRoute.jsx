import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
