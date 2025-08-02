import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { UserCircleIcon, Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { currentUser, userProfile, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();

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
      <nav className="flex items-center justify-between bg-organic-text p-4 text-organic-white shadow-md relative">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-organic-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          data-cy="mobile-menu-button"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-organic-white" aria-hidden="true" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-organic-white" aria-hidden="true" />
          )}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-wide hover:text-organic-primary transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded" aria-label="Nyano - Go to homepage" data-cy="logo">
          <span className="font-display text-2xl text-nyano-brown">Nyano</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center" role="navigation" aria-label="Main navigation" data-cy="desktop-nav">
          <Link to="/" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-home">Home</Link>
          <Link to="/shop" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-shop">Shop</Link>
          <Link to="/artisans" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-artisans">Artisans</Link>
          <Link to="/about" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-about">About</Link>
          <Link to="/contact" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-contact">Contact</Link>
          
          {/* Admin Link - Only show for admin users */}
          {userProfile && userProfile.role === 'admin' && (
            <Link to="/admin" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-admin">Admin</Link>
          )}
          
          {/* Wishlist Link */}
          {currentUser && (
            <Link to="/wishlist" className="relative text-organic-white hover:text-organic-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded p-2" aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ''}`} data-cy="nav-wishlist">
              <div className="flex items-center gap-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center shadow-md" data-cy="wishlist-count" aria-label={`${wishlistCount} items in wishlist`}>
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>
          )}
          
          <Link to="/cart" className="relative text-organic-white hover:text-organic-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded p-2" aria-label={`Shopping cart${totalItems > 0 ? ` (${totalItems} items)` : ''}`} data-cy="nav-cart">
            <div className="flex items-center gap-1">
              <ShoppingCartIcon className="w-6 h-6 text-organic-white" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center shadow-md" data-cy="cart-count" aria-label={`${totalItems} items in cart`}>
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
          {currentUser ? (
            <>
              <Link to="/account" className="text-organic-white hover:text-organic-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded p-1" aria-label="My account" data-cy="nav-account">
                <UserCircleIcon className="w-7 h-7 text-organic-white" aria-hidden="true" />
              </Link>
              <button
                className="px-4 py-2 bg-organic-white text-organic-text rounded-md hover:bg-organic-primary hover:text-organic-white transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-organic-primary focus:ring-offset-2"
                onClick={handleLogout}
                aria-label="Sign out of your account"
                data-cy="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-organic-white hover:text-organic-primary transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1" data-cy="nav-login">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-organic-white text-organic-text rounded-md hover:bg-organic-primary hover:text-organic-white transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-organic-primary focus:ring-offset-2" data-cy="nav-register">Register</Link>
            </>
          )}
        </nav>
      </nav>
    </>
  );
}