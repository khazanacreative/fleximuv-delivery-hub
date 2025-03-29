
import { useAuth } from '@/hooks/use-auth';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions, getUserRoleDescription } from '@/utils/permissions';

export const usePermissions = () => {
  const { user } = useAuth();

  // Debug the user object to understand what's coming in
  console.log("User in permissions hook:", user);

  return {
    // Check if user has a specific permission
    can: (permission: Permission) => hasPermission(user, permission),
    
    // Check if user has any of the specified permissions
    canAny: (permissions: Permission[]) => hasAnyPermission(user, permissions),
    
    // Check if user has all of the specified permissions
    canAll: (permissions: Permission[]) => hasAllPermissions(user, permissions),
    
    // Get user role description
    roleDescription: getUserRoleDescription(user),
    
    // Flag for easier role checks - making these explicit and clearer
    isAdmin: user?.role === 'admin',
    isPartner: user?.role === 'partner',
    isFleetPartner: user?.role === 'partner' && user?.hasDrivers === true,
    isBusinessPartner: user?.role === 'partner' && user?.hasDrivers !== true,
    isDriver: user?.role === 'driver',
    isIndependentCourier: user?.role === 'driver' && user?.partnerType === 'courier',
    isCustomer: user?.role === 'customer',
  };
};
