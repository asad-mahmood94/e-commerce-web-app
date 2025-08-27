// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  // If no user logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin and user is not admin → redirect to home (or error page)
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Otherwise → allow access
  return children;
}