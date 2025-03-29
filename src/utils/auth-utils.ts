
import { Session } from '@supabase/supabase-js';
import { User } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export const fetchUserProfile = async (userId: string, session: Session | null): Promise<User | null> => {
  try {
    console.log('Fetching profile for user ID:', userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error.message);
      return null;
    }
    
    if (!data) {
      console.warn('No profile found for user ID:', userId);
      return null;
    }
    
    console.log('Profile data retrieved:', data);
    
    // Convert from database format to application format
    const user: User = {
      id: data.id,
      name: data.full_name || '',
      email: session?.user?.email || '',
      phone: data.phone || '',
      role: data.role as any || 'guest',
      avatar: data.avatar_url || '',
      createdAt: new Date(data.created_at || Date.now()),
      balance: data.balance || 0,
      partnerType: data.partner_type as any || undefined,
      status: data.status as any || 'inactive',
      hasDrivers: data.has_drivers || false,
      canEditOrders: data.can_edit_orders || false
    };
    
    return user;
  } catch (error) {
    console.error('Exception in fetchUserProfile:', error);
    return null;
  }
};
