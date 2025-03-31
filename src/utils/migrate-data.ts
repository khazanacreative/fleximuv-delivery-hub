
import { supabase } from "@/integrations/supabase/client";

export const migrateData = async () => {
  try {
    console.log('Calling database function to initialize demo users');
    
    // Cast to any to avoid deep type instantiation issues
    const result: any = await supabase.rpc('initialize_demo_users');
    const { data, error } = result;
    
    if (error) {
      console.error('Error initializing demo users:', error);
      return { success: false, message: error.message };
    }
    
    console.log('Demo users initialized successfully:', data);
    
    // Let's make sure the admin user exists by explicitly checking
    // Again using any type to prevent excessive type recursion
    const adminResult: any = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@fleximov.com')
      .maybeSingle();
      
    if (adminResult.error) {
      console.error('Error checking admin user:', adminResult.error);
    } else if (!adminResult.data) {
      console.log('Admin user not found, creating explicitly');
      // Try to create admin user explicitly if missing
      await createAdminUser();
    }
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error calling database function:', error);
    return { success: false, message: error.message };
  }
};

// Helper function to explicitly create admin user if needed
const createAdminUser = async () => {
  try {
    // First attempt to create the auth user
    const authResult: any = await supabase.auth.admin.createUser({
      email: 'admin@fleximov.com',
      password: 'password123',
      email_confirm: true,
    });
    
    const userId = authResult.data?.user?.id;
    
    if (!userId) {
      console.log('No user ID available, attempting to find existing admin');
      // Check profiles table for admin instead of users table
      const existingAdminResult: any = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .maybeSingle();
        
      if (!existingAdminResult.data?.id) {
        console.error('Could not find or create admin user');
        return;
      }
    }
    
    // Ensure profile exists with admin role
    const profileResult: any = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: 'Bambang Supratman',
        role: 'admin',
        status: 'active',
      });
      
    if (profileResult.error) {
      console.error('Error creating admin profile:', profileResult.error);
    }
    
  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
};
