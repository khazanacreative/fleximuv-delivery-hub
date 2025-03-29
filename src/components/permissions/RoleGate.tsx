
import { ReactNode } from 'react';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permissions';

interface RoleGateProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

/**
 * Component to restrict access based on user role or permissions
 */
const RoleGate = ({ 
  children, 
  allowedRoles, 
  permissions, 
  requireAll = false,
  fallback 
}: RoleGateProps) => {
  const { user } = useAuth();
  const { isAdmin, isFleetPartner, isIndependentCourier } = usePermissions();
  
  if (!user) return fallback || null;
  
  // Role-based access check
  const hasRoleAccess = allowedRoles 
    ? allowedRoles.includes(user.role)
    : true;
  
  // Permission-based access check
  let hasPermissionAccess = true;
  if (permissions && permissions.length > 0) {
    hasPermissionAccess = requireAll 
      ? hasAllPermissions(user, permissions)
      : hasAnyPermission(user, permissions);
  }
  
  // Access is granted if both role and permission checks pass
  const hasAccess = hasRoleAccess && hasPermissionAccess;
  
  if (!hasAccess) return fallback || null;
  
  return <>{children}</>;
};

export default RoleGate;
