import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute: React.FC<{ role?: "evaluator" | "evaluated"; children: React.ReactNode }> = ({ role, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    // Redirect by role
    return <Navigate to={user.role === "evaluator" ? "/dashboard" : "/session"} replace />;
  }

  return children;
};
