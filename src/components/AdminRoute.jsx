import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';
import { saveRedirectPath } from '../utils/redirectUtils';

export default function AdminRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuthStore();
  const location = useLocation();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    // Save the current path to redirect back after login
    saveRedirectPath(location.pathname);
    // Save the current path to redirect back after login
    sessionStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" replace />;
  }

  // Server-side role verification - check user role from Firestore
  const isAdmin = userProfile?.role === 'admin';
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-organic-background">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-organic-text mb-6">You don't have permission to access this area.</p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return children;
}