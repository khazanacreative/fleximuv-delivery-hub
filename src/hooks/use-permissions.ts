
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
    
    // Flag for easier role checks
    isAdmin: user?.role === 'admin',
    isPartner: user?.role === 'partner',
    isFleetPartner: user?.role === 'partner' && user?.partnerType === 'fleet',
    isIndependentCourier: user?.role === 'partner' && user?.partnerType === 'courier',
    isBusinessPartner: user?.role === 'partner' && user?.partnerType === 'business',
    isDriver: user?.role === 'driver',
    isCustomer: user?.role === 'customer',
    isGuest: user?.role === 'guest',
    
    // Check if a user can manage drivers (admin, fleet partner, or independent courier)
    canManageDrivers: user?.role === 'admin' || 
                      (user?.role === 'partner' && user?.partnerType === 'fleet') ||
                      (user?.role === 'partner' && user?.partnerType === 'courier'),
                      
    // Check if user can see independent couriers (admin, business partner, fleet partner)
    canSeeIndependentCouriers: user?.role === 'admin' || 
                               (user?.role === 'partner' && user?.partnerType === 'business') ||
                               (user?.role === 'partner' && user?.partnerType === 'fleet'),
                               
    // Check if user can edit partner details (admin only)
    canEditPartnerDetails: user?.role === 'admin',
    
    // Check if user can view partner details (admin, partner themselves)
    canViewPartnerDetails: user?.role === 'admin' || user?.role === 'partner',
    
    // Check if user can edit orders (admin, partner who created the order, or assigned driver)
    canEditOrders: user?.role === 'admin' || 
                   user?.role === 'partner' ||
                   (user?.role === 'driver' && user?.canEditOrders === true),
  };
};
