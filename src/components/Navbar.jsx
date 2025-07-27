import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { UserCircleIcon, Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { currentUser, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    closeMobileMenu();
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
          <Link to="/" className="hover:text-himalaya-light transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-himalaya-light transition-colors">Shop</Link>
          <Link to="/cart" className="relative hover:text-himalaya-light transition-colors">
            <div className="flex items-center gap-1">
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
          {currentUser ? (
            <>
              <Link to="/account" className="hover:text-himalaya-light transition-colors">
                <UserCircleIcon className="w-7 h-7" />
              </Link>
              <button
                className="px-4 py-2 bg-white text-himalaya-dark rounded hover:bg-gray-100 transition-colors font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-himalaya-light transition-colors">Login</Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-white text-himalaya-dark rounded hover:bg-gray-100 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Cart Icon */}
        <div className="md:hidden">
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
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
                  <div className="flex items-center justify-between">
                    <span>Cart</span>
                    {totalItems > 0 && (
                      <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                        {totalItems}
                      </span>
                    )}
                  </div>
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
                      onClick={handleLogout}
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
                      Sign Up
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