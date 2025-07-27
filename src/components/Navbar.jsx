import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import CartIcon from "./CartIcon";
import { UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const { currentUser, logout } = useAuthStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-himalaya-dark p-4 text-white shadow-md relative">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-himalaya"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
          <span role="img" aria-label="mountain">🏔️</span> Ramro
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/shop" className="hover:underline">Shop</Link>
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

        {/* Mobile Cart Icon */}
        <div className="md:hidden">
          <Link to="/cart" className="relative">
            <CartIcon count={cart.reduce((a, b) => a + b.quantity, 0)} />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobileMenu}>
          <div className="fixed left-0 top-0 h-full w-64 bg-himalaya-dark text-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold">Menu</span>
                <button onClick={closeMobileMenu} className="p-2">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <Link 
                  to="/" 
                  className="block py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className="block py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  Shop
                </Link>
                <Link 
                  to="/cart" 
                  className="block py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                  onClick={closeMobileMenu}
                >
                  Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
                </Link>
                
                <hr className="border-himalaya my-4" />
                
                {currentUser ? (
                  <>
                    <Link 
                      to="/account" 
                      className="block py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className="w-5 h-5" />
                        Account
                      </div>
                    </Link>
                    <button
                      className="w-full text-left py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                      onClick={() => { 
                        logout(); 
                        navigate("/login"); 
                        closeMobileMenu(); 
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block py-3 px-4 hover:bg-himalaya rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}