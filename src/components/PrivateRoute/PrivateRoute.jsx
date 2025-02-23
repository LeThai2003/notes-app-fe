import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../../pages/Home/Home';

const PrivateRoute = () => {

  const token = localStorage.getItem("token");

  return token ? <Outlet/> : <Navigate to="/login" />;
}

export default PrivateRoute
