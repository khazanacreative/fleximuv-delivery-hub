
import { ReactNode } from 'react';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/use-auth';

interface RoleGateProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

/**
 * Komponen untuk membatasi akses berdasarkan peran pengguna
 */
const RoleGate = ({ children, allowedRoles, fallback }: RoleGateProps) => {
  const { user } = useAuth();
  
  if (!user) return fallback || null;
  
  const hasPermission = allowedRoles.includes(user.role);
  
  if (!hasPermission) return fallback || null;
  
  return <>{children}</>;
};

export default RoleGate;
