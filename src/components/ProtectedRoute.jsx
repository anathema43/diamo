import React from 'react';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';
import { saveRedirectPath } from '../utils/redirectUtils';
export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }
    return <Navigate to="/login" replace />;
  }

  return children;
}