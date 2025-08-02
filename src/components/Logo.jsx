import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'default', linkTo = '/' }) {
  // Your uploaded logo as SVG
  const logoSvg = (
    <div className={`flex items-center ${className}`}>
      {/* Your Logo SVG */}
      <svg 
        viewBox="0 0 200 60" 
        className="h-10 w-auto mr-3"
        aria-hidden="true"
      >
        {/* Mountain silhouette */}
        <path 
          d="M20 45 L35 25 L50 45 Z" 
          fill="currentColor" 
          opacity="0.8"
        />
        <path 
          d="M45 45 L60 20 L75 45 Z" 
          fill="currentColor" 
          opacity="0.9"
        />
        <path 
          d="M70 45 L85 30 L100 45 Z" 
          fill="currentColor" 
          opacity="0.7"
        />
        
        {/* Tea leaf accent */}
        <ellipse cx="60" cy="25" rx="3" ry="6" fill="currentColor" opacity="0.6" transform="rotate(15 60 25)" />
        <path d="M60 22 Q65 20 62 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>
      
      {/* Brand Text */}
      <span className="font-brand text-2xl font-bold tracking-wide">
        Darjeeling Souls
      </span>
    </div>
  );

  // Icon-only variant for favicon and small spaces
  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 60 60" 
        className={`fill-current ${className}`}
        aria-labelledby="logo-icon-title"
        role="img"
      >
        <title id="logo-icon-title">Darjeeling Souls</title>
        <path 
          d="M10 45 L20 25 L30 45 Z" 
          fill="currentColor" 
          opacity="0.8"
        />
        <path 
          d="M25 45 L35 20 L45 45 Z" 
          fill="currentColor" 
          opacity="0.9"
        />
        <path 
          d="M40 45 L50 30 L60 45 Z" 
          fill="currentColor" 
          opacity="0.7"
        />
        <ellipse cx="35" cy="25" rx="2" ry="4" fill="currentColor" opacity="0.6" transform="rotate(15 35 25)" />
      </svg>
    );
  }

  // Large variant for hero sections
  if (variant === 'large') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <svg 
          viewBox="0 0 200 60" 
          className="h-16 w-auto mb-4"
          aria-hidden="true"
        >
          <path 
            d="M20 45 L35 25 L50 45 Z" 
            fill="currentColor" 
            opacity="0.8"
          />
          <path 
            d="M45 45 L60 20 L75 45 Z" 
            fill="currentColor" 
            opacity="0.9"
          />
          <path 
            d="M70 45 L85 30 L100 45 Z" 
            fill="currentColor" 
            opacity="0.7"
          />
          <ellipse cx="60" cy="25" rx="3" ry="6" fill="currentColor" opacity="0.6" transform="rotate(15 60 25)" />
          <path d="M60 22 Q65 20 62 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
        <span className="font-brand text-4xl font-bold tracking-wide">
          Darjeeling Souls
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
        aria-label="Darjeeling Souls - Go to homepage"
      >
        {logoSvg}
      </Link>
    );
  }

  return logoSvg;
}