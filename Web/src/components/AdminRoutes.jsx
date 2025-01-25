import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const isAdmin = localStorage.getItem('admin') === 'true';

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;