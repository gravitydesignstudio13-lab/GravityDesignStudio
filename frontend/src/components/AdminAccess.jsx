import React from "react";
import { Navigate } from "react-router-dom";

const AdminAccess = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminAccess;