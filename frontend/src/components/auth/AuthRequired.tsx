
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStatus } from "@/hooks/useAuthStatus";

interface AuthRequiredProps {
  children: ReactNode;
}

const AuthRequired = ({ children }: AuthRequiredProps) => {
  const location = useLocation();
  const { isLoggedIn, isLoading } = useAuthStatus();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthRequired;
