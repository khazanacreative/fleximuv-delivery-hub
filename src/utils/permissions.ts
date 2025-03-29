
import { User, UserRole } from "@/types";

// Define permission types
export type Permission = 
  | 'view_all_partners'
  | 'view_partner_profile'
  | 'view_all_orders'
  | 'view_own_orders'
  | 'create_orders'
  | 'manage_all_drivers'
  | 'manage_own_drivers'
  | 'view_all_drivers'
  | 'view_own_drivers'
  | 'view_courier_options'
  | 'assign_drivers'
  | 'accept_orders'
  | 'cancel_orders'
  | 'edit_orders'
  | 'set_pricing';

// Function to check if user has specific permission
export const hasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  
  // Admin has all permissions
  if (user.role === 'admin') return true;
  
  // Partner with drivers (fleet)
  if (user.role === 'partner' && user.hasDrivers === true) {
    switch(permission) {
      case 'view_partner_profile':
      case 'view_all_orders':
      case 'create_orders':
      case 'manage_own_drivers':
      case 'view_own_drivers':
      case 'assign_drivers':
      case 'accept_orders':
      case 'cancel_orders':
      case 'edit_orders':
      case 'set_pricing':
        return true;
      default:
        return false;
    }
  }
  
  // Partner without drivers (business partner)
  if (user.role === 'partner' && !user.hasDrivers) {
    switch(permission) {
      case 'view_partner_profile':
      case 'view_courier_options':
      case 'create_orders':
      case 'view_own_orders':
      case 'cancel_orders':
      case 'edit_orders':
        return true;
      default:
        return false;
    }
  }
  
  // Independent courier (driver who works independently)
  if (user.role === 'driver' && user.partnerType === 'courier') {
    switch(permission) {
      case 'view_all_orders':
      case 'manage_own_drivers':
      case 'view_own_drivers':
      case 'accept_orders':
      case 'create_orders':
        return true;
      default:
        return false;
    }
  }
  
  // Regular driver
  if (user.role === 'driver') {
    switch(permission) {
      case 'view_own_orders':
      case 'accept_orders':
        return true;
      default:
        return false;
    }
  }
  
  // Customer
  if (user.role === 'customer') {
    switch(permission) {
      case 'view_own_orders':
      case 'create_orders':
      case 'view_courier_options':
      case 'cancel_orders': // Customers can cancel their own orders
        return true;
      default:
        return false;
    }
  }
  
  return false;
};

// Check multiple permissions at once
export const hasAnyPermission = (user: User | null, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(user, permission));
};

// Check if user has all permissions in the list
export const hasAllPermissions = (user: User | null, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(user, permission));
};

// Get description of user's role and capabilities
export const getUserRoleDescription = (user: User | null): string => {
  if (!user) return '';
  
  switch(user.role) {
    case 'admin':
      return 'Administrator with full system access';
    case 'partner':
      return user.hasDrivers 
        ? 'Fleet partner with delivery vehicles' 
        : 'Business partner without delivery fleet';
    case 'driver':
      return user.partnerType === 'courier' 
        ? 'Independent courier service' 
        : 'Driver assigned to a partner';
    case 'customer':
      return 'Customer account';
    default:
      return '';
  }
};
