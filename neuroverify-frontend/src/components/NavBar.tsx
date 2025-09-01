import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function NavBar() {
  const { user, logout } = useAuth();
  const loc = useLocation();

  // Hide on login/callback and participant screen, or when unauthenticated
  if (!user || loc.pathname.startsWith("/login") || loc.pathname.startsWith("/auth") || loc.pathname === "/session") {
    return null;
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="text-navy font-semibold">NeuroVerify</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={logout} className="rounded-lg border px-3 py-1.5 hover:bg-gray-50">Logout</button>
        </nav>
      </div>
    </header>
  );
}
