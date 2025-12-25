import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  isAdmin?: boolean;
}

const ADMIN_EMAIL = 'sikatipierre@gmail.com'; // IMPORTANT: REMPLACEZ PAR VOTRE EMAIL ADMIN

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally render a loading spinner or placeholder
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user.email !== ADMIN_EMAIL) {
    // Logged in but not admin, redirect to dashboard or home
    // For now, let's redirect to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // User is logged in and (if isAdmin is true) is an admin, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
