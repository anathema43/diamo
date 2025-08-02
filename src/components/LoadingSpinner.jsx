import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-organic-background" role="status" aria-live="polite">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-organic-primary mx-auto mb-4" aria-hidden="true"></div>
        <p className="text-organic-text" id="loading-message">Loading...</p>
        <span className="sr-only">Please wait while content is loading</span>
      </div>
    </div>
  );
}