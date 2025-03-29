
import { supabase } from '@/integrations/supabase/client';
import { User as AppUser } from '@/types';
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
      return {
        id: data.id,
        name: data.full_name || '',
        email: session?.user?.email || '',
        phone: data.phone || '',
        role: data.role,
        avatar: data.avatar_url,
        createdAt: new Date(data.created_at),
        balance: data.balance || 0,
        partnerType: data.partner_type,
        status: data.status,
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
