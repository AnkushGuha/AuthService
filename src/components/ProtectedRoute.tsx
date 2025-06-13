import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to landing page
    const landingUrl = process.env.NODE_ENV === 'production' 
      ? 'https://flowgen-arc.vercel.app'
      : 'http://localhost:5173';
    
    window.location.href = landingUrl;
    return null;
  }

  return <>{children}</>;
}