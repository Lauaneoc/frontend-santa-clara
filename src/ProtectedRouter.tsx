import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./@shared/contexts/Auth/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
