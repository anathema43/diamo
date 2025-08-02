import React from 'react';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    // Save current path for redirect after login
    sessionStorage.setItem('redirectPath', window.location.pathname);
    saveRedirectPath(window.location.pathname);
    return React.createElement(Navigate, { to: "/login", replace: true });
  }
}