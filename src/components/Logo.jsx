import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'default', linkTo = '/' }) {
  const logoSvg = (
    <svg 
      viewBox="0 0 200 60" 
      className={`fill-current ${className}`}
      aria-labelledby="logo-title"
      role="img"
    >
      <title id="logo-title">Darjeeling Souls</title>
      <text 
        x="10" 
        y="35" 
        className="font-display text-2xl font-bold"
        fill="currentColor"
      >
        Darjeeling Souls
      </text>
      <circle cx="180" cy="30" r="8" fill="currentColor" opacity="0.7" />
      <path 
        d="M170 25 Q175 20 180 25 Q185 30 180 35 Q175 40 170 35 Q165 30 170 25" 
        fill="currentColor" 
        opacity="0.5"
      />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 40 40" 
        className={`fill-current ${className}`}
        aria-labelledby="logo-icon-title"
        role="img"
      >
        <title id="logo-icon-title">Darjeeling Souls Icon</title>
        <circle cx="20" cy="20" r="16" fill="currentColor" opacity="0.7" />
        <path 
          d="M10 15 Q15 10 20 15 Q25 20 20 25 Q15 30 10 25 Q5 20 10 15" 
          fill="currentColor" 
          opacity="0.5"
        />
      </svg>
    );
  }

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