import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { getAndClearRedirectPath, determineRedirectPath } from "../utils/redirectUtils";

export default function Signup() {
  const { signup } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signup(email, password, name);
      
      // Navigate after auth state stabilizes
      setTimeout(() => {
        const { userProfile } = useAuthStore.getState();
        const savedRedirectPath = getAndClearRedirectPath();
        const redirectPath = determineRedirectPath(userProfile, savedRedirectPath);
        navigate(redirectPath, { replace: true });
      }, 100);
      
    } catch (error) {
      console.error("Signup error:", error);
      
      // Provide user-friendly error messages
      let errorMessage = "Signup failed. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists. Please try logging in instead.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Email/password accounts are not enabled. Please contact support.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-himalaya-light to-blue-200">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input 
          className="w-full border rounded p-2 mb-3" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          type="text" 
          placeholder="Full Name" 
          required 
          disabled={loading}
        />
        <input 
          className="w-full border rounded p-2 mb-3" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          type="email" 
          placeholder="Email" 
          required 
          disabled={loading}
        />
        <input 
          className="w-full border rounded p-2 mb-4" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          type="password" 
          placeholder="Password (min 6 chars)" 
          required 
          disabled={loading}
        />
        <button 
          className="w-full bg-organic-primary text-white py-2 rounded hover:opacity-90 transition-all disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-himalaya underline">Login</Link>
        </div>
      </form>
    </div>
  );
}