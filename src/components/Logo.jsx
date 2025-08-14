import React from 'react';
import { Link } from 'react-router-dom';
import LogoSvg from '../assets/logo.svg?react';

export default function Logo({ 
  className = '', 
  variant = 'default', 
  linkTo = '/', 
  showText = true 
}) {
  // Base logo component with SVG
  const LogoComponent = ({ size = 'default', textClass = '' }) => {
    const sizeClasses = {
      small: 'h-8 w-auto',
      default: 'h-10 w-auto',
      large: 'h-16 w-auto',
      hero: 'h-20 w-auto'
    };

    return (
      <div className={`flex items-center ${className}`}>
        {/* SVG Logo with enhanced styling */}
        <div className="relative">
          <LogoSvg 
            className={`${sizeClasses[size]} text-current transition-all duration-300 filter drop-shadow-sm hover:drop-shadow-md`}
            aria-label="Darjeeling Soul Logo"
          />
          {/* Subtle glow effect for dark backgrounds */}
          <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300">
            <LogoSvg 
              className={`${sizeClasses[size]} text-current blur-sm`}
              aria-hidden="true"
            />
          </div>
        </div>
        
        {/* Brand text with enhanced typography */}
        {showText && (
          <div className={`ml-3 ${textClass}`}>
            <div className="font-display text-current font-bold tracking-wide leading-tight">
              <span className="block text-lg">Darjeeling</span>
              <span className="block text-sm opacity-80 -mt-1">Soul</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Icon-only variant
  if (variant === 'icon') {
    return (
      <div className={className}>
        <LogoSvg 
          className="h-8 w-auto text-current transition-all duration-300 filter drop-shadow-sm hover:drop-shadow-md"
          aria-label="Darjeeling Soul"
        />
      </div>
    );
  }

  // Large variant for hero sections
  if (variant === 'large') {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative inline-block mb-4">
          <LogoSvg 
            className="h-20 w-auto text-current transition-all duration-300 filter drop-shadow-lg"
            aria-label="Darjeeling Soul Logo"
          />
          {/* Enhanced glow effect for hero */}
          <div className="absolute inset-0 opacity-30 animate-pulse">
            <LogoSvg 
              className="h-20 w-auto text-current blur-md"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="font-display text-current">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-2">
            Darjeeling Soul
          </h1>
          <p className="text-lg opacity-90 font-light tracking-wider">
            Authentic Hill Crafts
          </p>
        </div>
      </div>
    );
  }

  // Hero variant with special effects
  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <div className="relative inline-block mb-6">
          {/* Main logo with enhanced effects */}
          <LogoSvg 
            className="h-24 w-auto text-current transition-all duration-500 filter drop-shadow-2xl animate-float"
            aria-label="Darjeeling Soul Logo"
          />
          {/* Animated glow effect */}
          <div className="absolute inset-0 opacity-40 animate-glow">
            <LogoSvg 
              className="h-24 w-auto text-current blur-lg"
              aria-hidden="true"
            />
          </div>
          {/* Subtle pulse effect */}
          <div className="absolute inset-0 opacity-20 animate-pulse">
            <LogoSvg 
              className="h-24 w-auto text-current blur-sm"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="font-display text-current">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-4 animate-fade-in-up">
            Darjeeling Soul
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light tracking-wider animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Authentic Handcrafted Goods from the Heart of the Hills
          </p>
        </div>
      </div>
    );
  }

  // Default variant with link wrapper
  const logoElement = <LogoComponent size={variant} textClass="" />;

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className="inline-block hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-current focus:ring-opacity-50 rounded-lg p-1"
        aria-label="Darjeeling Soul - Go to homepage"
      >
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}