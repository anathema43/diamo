// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getAndClearRedirectPath, determineRedirectPath } from "../utils/redirectUtils";
import { getAndClearRedirectPath, determineRedirectPath } from "../utils/redirectUtils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await login(email, password);
      
      // Navigate after auth state stabilizes
      setTimeout(() => {
        const { userProfile } = useAuthStore.getState();
        const savedRedirectPath = getAndClearRedirectPath();
        const redirectPath = determineRedirectPath(userProfile, savedRedirectPath);
        navigate(redirectPath, { replace: true });
      }, 100);
      
    } catch (error) {
      console.error("Login error:", error);
      
      // Provide user-friendly error messages
      let errorMessage = "Login failed. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled. Please contact support.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-himalaya-light">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-himalaya-dark text-center">Login to Ramro</h1>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-himalaya-dark font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-himalaya"
              data-cy="login-email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-himalaya-dark font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-himalaya"
              data-cy="login-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-organic-primary hover:opacity-90 text-white font-semibold rounded py-2 transition"
            data-cy="login-submit"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center text-himalaya-dark">
          New here?{" "}
          <Link to="/signup" className="underline hover:text-himalaya-dark">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
