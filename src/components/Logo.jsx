import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', variant = 'default', linkTo = '/' }) {
  // Logo with fallback support
  const logoElement = (
    <div className={`flex items-center ${className}`}>
      {/* Darjeeling Soul Logo with fallback */}
      <picture className="h-10 w-auto mr-3 flex-shrink-0">
        <source srcSet="/logo.webp" type="image/webp" />
        <source srcSet="/logo copy.jpg" type="image/jpeg" />
        <img
          src="/logo copy.jpg"
          alt="Darjeeling Soul Logo"
          className="h-10 w-auto object-contain"
          onError={(e) => {
            console.error('Logo failed to load:', e.target.src);
            // Try alternative fallback
            if (!e.target.src.includes('placeholder')) {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzM5MzUzMSIvPgo8dGV4dCB4PSIyMCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EUzwvdGV4dD4KPHN2Zz4=';
            }
          }}
        />
      </picture>
      
      {/* Brand Text */}
      <span className="font-brand text-2xl font-bold tracking-wide">
        Darjeeling Soul
      </span>
    </div>
  );

  // Icon-only variant for favicon and small spaces
  if (variant === 'icon') {
    return (
      <picture className={`h-8 w-auto ${className}`}>
        <source srcSet="/logo.webp" type="image/webp" />
        <source srcSet="/logo copy.jpg" type="image/jpeg" />
        <img
          src="/logo copy.jpg"
          alt="Darjeeling Soul"
          className="h-8 w-auto object-contain"
          onError={(e) => {
            if (!e.target.src.includes('placeholder')) {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzM5MzUzMSIvPgo8dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EUzwvdGV4dD4KPHN2Zz4=';
            }
          }}
        />
      </picture>
    );
  }

  // Large variant for hero sections
  if (variant === 'large') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <picture className="h-20 w-auto mb-4">
          <source srcSet="/logo.webp" type="image/webp" />
          <source srcSet="/logo copy.jpg" type="image/jpeg" />
          <img
            src="/logo copy.jpg"
            alt="Darjeeling Soul Logo"
            className="h-20 w-auto object-contain"
            onError={(e) => {
              if (!e.target.src.includes('placeholder')) {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiMzOTM1MzEiLz4KPHRleHQgeD0iNDAiIHk9IjQ4IiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RFM8L3RleHQ+Cjwvc3ZnPg==';
              }
            }}
          />
        </picture>
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
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}