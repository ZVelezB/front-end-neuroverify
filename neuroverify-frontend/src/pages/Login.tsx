import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const FAKE_AUTH = (import.meta.env.VITE_FAKE_AUTH ?? "false") === "true";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const devLogin = (role: "evaluator" | "evaluated") => {
    const user = {
      id: crypto.randomUUID(),
      email: email || (role === "evaluator" ? "evaluator@example.com" : "participant@example.com"),
      name: name || (role === "evaluator" ? "Dr. Evaluator" : "Participant"),
      role
    } as const;

    // Store mock session
    localStorage.setItem("dev_user", JSON.stringify(user));
    setUser(user);
    setToken("dev-token"); // so axios still attaches something if needed

    navigate(role === "evaluator" ? "/dashboard" : "/session", { replace: true });
  };

  const showDev = FAKE_AUTH;

  const startGoogle = () => {
    // keep the button for future, but hide by default when FAKE_AUTH=true
    const GOOGLE_URL = import.meta.env.VITE_AUTH_GOOGLE_URL as string;
    const CALLBACK = new URL(import.meta.env.VITE_AUTH_CALLBACK_PATH as string, window.location.origin).toString();
    const url = new URL(GOOGLE_URL);
    url.searchParams.set("redirect_uri", CALLBACK);
    window.location.href = url.toString();
  };

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-navy">NeuroVerify</h1>
        <p className="mt-2 text-gray-600">Understand fake news effects through EEG.</p>

        {showDev ? (
          <>
            <div className="mt-6 space-y-3">
              <label className="block">
                <span className="text-sm text-gray-600">Name (optional)</span>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-neuroBlue"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-600">Email (optional)</span>
                <input
                  className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-neuroBlue"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => devLogin("evaluator")}
                className="w-full rounded-xl border px-4 py-3 font-medium hover:bg-gray-50"
              >
                Continue as Evaluator
              </button>
              <button
                onClick={() => devLogin("evaluated")}
                className="w-full rounded-xl border px-4 py-3 font-medium hover:bg-gray-50"
              >
                Continue as Evaluated
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Dev mode is active (<code>VITE_FAKE_AUTH=true</code>). No Google sign-in required.
            </p>
          </>
        ) : (
          <>
            <button
              onClick={startGoogle}
              className="mt-6 w-full rounded-xl border px-4 py-3 font-medium hover:bg-gray-50"
            >
              Sign in with Google
            </button>
            <p className="mt-4 text-xs text-gray-500">By continuing you agree to the consent & privacy terms.</p>
          </>
        )}
      </div>
    </main>
  );
}
