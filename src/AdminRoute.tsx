import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute: React.FC = () => {
  const token = localStorage.getItem("token"); // Check if the token exists

  // If the token is missing, redirect to the landing page
  if (!token) {
    console.warn("Unauthorized access to admin panel.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
