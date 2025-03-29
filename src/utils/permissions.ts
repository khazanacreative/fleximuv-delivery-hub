
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
  | 'set_pricing'
  | 'add_service_types'
  | 'view_shared_order';

// Function to check if user has specific permission
export const hasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  
  // Admin has all permissions
  if (user.role === 'admin') return true;
  
  // Partner with fleet (can manage drivers and add services)
  if (user.role === 'partner' && user.partnerType === 'fleet') {
    switch(permission) {
      case 'view_partner_profile':
      case 'view_all_orders':
      case 'view_own_orders':
      case 'create_orders':
      case 'manage_own_drivers':
      case 'view_own_drivers':
      case 'assign_drivers':
      case 'accept_orders':
      case 'cancel_orders':
      case 'edit_orders':
      case 'set_pricing':
      case 'add_service_types':
      case 'view_courier_options':
        return true;
      default:
        return false;
    }
  }
  
  // Independent courier (can manage own drivers including self)
  if (user.role === 'partner' && user.partnerType === 'courier') {
    switch(permission) {
      case 'view_partner_profile':
      case 'view_own_orders':
      case 'create_orders':
      case 'manage_own_drivers':
      case 'view_own_drivers':
      case 'accept_orders':
      case 'cancel_orders':
      case 'edit_orders':
      case 'add_service_types':
        return true;
      default:
        return false;
    }
  }
  
  // Business partner (no drivers, can only make orders)
  if (user.role === 'partner' && user.partnerType === 'business') {
    switch(permission) {
      case 'view_partner_profile':
      case 'view_own_orders':
      case 'create_orders':
      case 'view_courier_options':
      case 'cancel_orders':
      case 'edit_orders':
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
      case 'cancel_orders':
        return true;
      default:
        return false;
    }
  }
  
  // Guest user (can only view shared orders)
  if (user.role === 'guest') {
    switch(permission) {
      case 'view_shared_order':
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
      if (user.partnerType === 'fleet') {
        return 'Fleet partner with delivery vehicles';
      } else if (user.partnerType === 'courier') {
        return 'Independent courier service';
      } else {
        return 'Business partner without delivery fleet';
      }
    case 'driver':
      return 'Driver assigned to a partner';
    case 'customer':
      return 'Customer account';
    case 'guest':
      return 'Guest access (limited to shared orders)';
    default:
      return '';
  }
};
