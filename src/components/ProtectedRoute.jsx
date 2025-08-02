import React from 'react';
import { useAuthStore } from '../store/authStore';
import LoadingSpinner from './LoadingSpinner';
import { saveRedirectPath } from '../utils/redirectUtils';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    saveRedirectPath(window.location.pathname);
    return <Navigate to="/login" replace />;