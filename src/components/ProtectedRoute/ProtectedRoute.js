import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({ loggedIn, children }) => {
  if (loggedIn === null) {
    return (
      <><Preloader /></>
    )
  }
  return loggedIn ? children : <Navigate to='/' />
}

export default ProtectedRoute;
