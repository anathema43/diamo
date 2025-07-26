import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr("Invalid credentials.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-himalaya-light to-blue-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {err && <p className="text-red-600 mb-2">{err}</p>}
        <input className="w-full border rounded p-2 mb-3" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input className="w-full border rounded p-2 mb-4" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button className="w-full bg-himalaya text-white py-2 rounded hover:bg-himalaya-dark" type="submit">Login</button>
        <div className="mt-4 text-center">
          Don’t have an account? <Link to="/signup" className="text-himalaya underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
