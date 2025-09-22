import { usePermissions } from '@/hooks/usePermissions';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPage: string;
}

export function ProtectedRoute({ children, requiredPage }: ProtectedRouteProps) {
  const { canViewPage } = usePermissions();

  if (!canViewPage(requiredPage)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}