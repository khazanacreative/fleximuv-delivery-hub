
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser, UserRole, PartnerType } from '@/types';
import { Session } from '@supabase/supabase-js';

export const fetchUserProfile = async (userId: string, session: Session | null): Promise<AppUser | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (data) {
      // Validate role is a valid UserRole
      const role = validateUserRole(data.role);
      
      // Validate partnerType is a valid PartnerType (if provided)
      const partnerType = data.partner_type ? validatePartnerType(data.partner_type) : undefined;
      
      // Validate status is a valid status
      const status = validateUserStatus(data.status);
      
      return {
        id: data.id,
        name: data.full_name || '',
        email: session?.user?.email || '',
        phone: data.phone || '',
        role,
        avatar: data.avatar_url,
        createdAt: new Date(data.created_at),
        balance: data.balance || 0,
        partnerType,
        status,
        hasDrivers: data.has_drivers,
        canEditOrders: data.can_edit_orders,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
};

// Helper functions to validate types
function validateUserRole(role: string | null | undefined): UserRole {
  const validRoles: UserRole[] = ['admin', 'partner', 'driver', 'customer', 'guest'];
  
  if (role && validRoles.includes(role as UserRole)) {
    return role as UserRole;
  }
  
  // Default to 'customer' if invalid role
  console.warn(`Invalid user role: ${role}, defaulting to 'customer'`);
  return 'customer';
}

function validatePartnerType(partnerType: string | null | undefined): PartnerType {
  const validPartnerTypes: PartnerType[] = ['fleet', 'courier', 'business'];
  
  if (partnerType && validPartnerTypes.includes(partnerType as PartnerType)) {
    return partnerType as PartnerType;
  }
  
  // Return undefined if invalid partner type
  console.warn(`Invalid partner type: ${partnerType}, removing from user object`);
  return undefined as any;
}

function validateUserStatus(status: string | null | undefined): 'active' | 'inactive' | 'suspended' {
  const validStatuses = ['active', 'inactive', 'suspended'];
  
  if (status && validStatuses.includes(status)) {
    return status as 'active' | 'inactive' | 'suspended';
  }
  
  // Default to 'active' if invalid status
  console.warn(`Invalid user status: ${status}, defaulting to 'active'`);
  return 'active';
}
