import React from 'react';
import { Navigate } from 'react-router-dom';
import useLocalStorage from '../hoooks/useLocalStorage';


const ProtectedRoute = ({ children, role, redirectTo }) => {
  const [currentUser] = useLocalStorage("currentUser", null);

  if (!currentUser || currentUser.role !== role) {
    return <Navigate to={redirectTo} />;
  }
  return children; 
};

export default ProtectedRoute;
