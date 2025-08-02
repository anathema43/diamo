import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';
import { saveRedirectPath } from '../utils/redirectUtils';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    // Save the current path to redirect back after login
    saveRedirectPath(location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
}