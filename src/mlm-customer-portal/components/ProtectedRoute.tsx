import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CustomerAuthService } from "../api-services/auth-service";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = CustomerAuthService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login page with the current location as state
    // so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
