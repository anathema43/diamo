import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'default', linkTo = '/' }) {
  // Your Darjeeling Soul logo
  const logoSvg = (
    <div className={`flex items-center ${className}`}>
      {/* Darjeeling Soul Logo */}
      <img
        src="/logo.webp"
        alt="Darjeeling Soul Logo"
        className="h-10 w-auto mr-3"
      />
      
      {/* Brand Text */}
      <span className="font-brand text-2xl font-bold tracking-wide">
        Darjeeling Soul
      </span>
    </div>
  );

  // Icon-only variant for favicon and small spaces
  if (variant === 'icon') {
    return (
      <img
        src="/logo.webp"
        alt="Darjeeling Soul"
        className={`h-8 w-auto ${className}`}
      />
    );
  }

  // Large variant for hero sections
  if (variant === 'large') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src="/logo.webp"
          alt="Darjeeling Soul Logo"
          className="h-20 w-auto mb-4"
        />
        <span className="font-brand text-4xl font-bold tracking-wide">
          Darjeeling Soul
        </span>
      </div>
    );
  }

  // With link wrapper
  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className="inline-block hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-opacity-50 rounded"
        aria-label="Darjeeling Soul - Go to homepage"
      >
        {logoSvg}
      </Link>
    );
  }

  return logoSvg;
}