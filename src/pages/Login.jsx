// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getAndClearRedirectPath, determineRedirectPath } from "../utils/redirectUtils";
import Logo from "../components/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    
    if (!validateForm()) {
      return;
    }
    
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
    <div className="min-h-screen flex items-center justify-center bg-himalaya-light" role="main">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <Logo className="text-nyano-terracotta justify-center" variant="default" linkTo="/" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-himalaya-dark text-center">Sign In to Darjeeling Souls</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg border border-red-200" role="alert" aria-live="assertive">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-himalaya-dark font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={validationErrors.email ? 'true' : 'false'}
              aria-describedby={validationErrors.email ? 'email-error' : undefined}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-himalaya transition-colors ${
                validationErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              data-cy="login-email"
            />
            {validationErrors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-himalaya-dark font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-required="true"
              aria-invalid={validationErrors.password ? 'true' : 'false'}
              aria-describedby={validationErrors.password ? 'password-error' : undefined}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-himalaya transition-colors ${
                validationErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              data-cy="login-password"
            />
            {validationErrors.password && (
              <p id="password-error" className="text-red-600 text-sm mt-1" role="alert">
                {validationErrors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-organic-primary hover:opacity-90 text-white font-semibold rounded py-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-organic-primary focus:ring-offset-2"
            aria-describedby={loading ? 'loading-status' : undefined}
            data-cy="login-submit"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          {loading && (
            <p id="loading-status" className="sr-only" aria-live="polite">
              Signing you in, please wait...
            </p>
          )}
        </form>
        <div className="mt-4 text-center text-himalaya-dark">
          New here?{" "}
          <Link to="/signup" className="underline hover:text-himalaya-dark focus:outline-none focus:ring-2 focus:ring-himalaya focus:ring-offset-2 rounded">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
