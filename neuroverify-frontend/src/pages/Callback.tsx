import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { getMe } from "../api/auth";

export default function Callback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const run = async () => {
      // Accept both styles:
      // 1) Backend redirected with ?token=...
      const token = params.get("token");

      // 2) Backend stored HTTP-only cookie (no token in URL)
      if (token) setToken(token);

      // Fetch role and redirect accordingly
      try {
        const me = await getMe();
        if (me.user.role === "evaluator") navigate("/dashboard", { replace: true });
        else navigate("/session", { replace: true });
      } catch {
        navigate("/login", { replace: true });
      }
    };
    run();
  }, []);

  return <div className="p-6">Completing sign-in…</div>;
}
