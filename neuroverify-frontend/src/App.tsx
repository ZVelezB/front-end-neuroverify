import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import EvaluatorDashboard from "./pages/EvaluatorDashboard";
import EvaluatedScreen from "./pages/EvaluatedScreen";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="evaluator">
              <EvaluatorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session"
          element={
            <ProtectedRoute role="evaluated">
              <EvaluatedScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
