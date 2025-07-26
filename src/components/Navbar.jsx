import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import CartIcon from "./CartIcon";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const { currentUser, logout } = useAuthStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between bg-himalaya-dark p-4 text-white shadow-md">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
        <span role="img" aria-label="mountain">🏔️</span> Ramro
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="relative">
          <CartIcon count={cart.reduce((a, b) => a + b.quantity, 0)} />
        </Link>
        {currentUser ? (
          <>
            <Link to="/account">
              <UserCircleIcon className="w-7 h-7 inline" />
            </Link>
            <button
              className="ml-2 px-3 py-1 bg-white text-himalaya-dark rounded hover:bg-blue-100"
              onClick={() => { logout(); navigate("/login"); }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
