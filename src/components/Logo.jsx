import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'default', linkTo = '/' }) {
  // Improved SVG logo with better text rendering
  const logoSvg = (
    <div className={`flex items-center ${className}`}>
      {/* Mountain Icon */}
      <svg 
        viewBox="0 0 40 40" 
        className="w-8 h-8 mr-3 fill-current"
        aria-hidden="true"
      >
        <path 
          d="M8 32 L20 12 L32 32 Z" 
          fill="currentColor" 
          opacity="0.8"
        />
        <path 
          d="M12 32 L20 20 L28 32 Z" 
          fill="currentColor" 
          opacity="0.6"
        />
        <circle cx="20" cy="16" r="2" fill="currentColor" opacity="0.9" />
      </svg>
      
      {/* Brand Text */}
      <span className="font-brand text-2xl font-bold tracking-wide">
        Darjeeling Souls
      </span>
    </div>
  );

  // Icon-only variant
  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 40 40" 
        className={`fill-current ${className}`}
        aria-labelledby="logo-icon-title"
        role="img"
      >
        <title id="logo-icon-title">Darjeeling Souls</title>
        <path 
          d="M8 32 L20 12 L32 32 Z" 
          fill="currentColor" 
          opacity="0.8"
        />
        <path 
          d="M12 32 L20 20 L28 32 Z" 
          fill="currentColor" 
          opacity="0.6"
        />
        <circle cx="20" cy="16" r="2" fill="currentColor" opacity="0.9" />
      </svg>
    );
  }

  // With link wrapper
  if (linkTo) {
    return (
      <Link 
        to={linkTo} 
        className="inline-block hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-current focus:ring-opacity-50 rounded"
        aria-label="Darjeeling Souls - Go to homepage"
      >
        {logoSvg}
      </Link>
    );
  }

  return logoSvg;
}