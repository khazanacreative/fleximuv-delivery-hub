
import { supabase } from "@/integrations/supabase/client";

export const migrateData = async () => {
  try {
    console.log('Calling database function to initialize demo users');
    
    // Break type inference chain completely with any type
    const { data, error } = await supabase.rpc('initialize_demo_users') as any;
    
    if (error) {
      console.error('Error initializing demo users:', error);
      return { success: false, message: error.message };
    }
    
    console.log('Demo users initialized successfully:', data);
    
    // Let's make sure the admin user exists by explicitly checking
    // Use any to prevent type issues and break the chain before maybeSingle()
    const adminCheck = await (supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@fleximov.com') as any)
      .maybeSingle();
      
    if (adminCheck.error) {
      console.error('Error checking admin user:', adminCheck.error);
    } else if (!adminCheck.data) {
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
    const authResult = await supabase.auth.admin.createUser({
      email: 'admin@fleximov.com',
      password: 'password123',
      email_confirm: true,
    }) as any;
    
    const userId = authResult.data?.user?.id;
    
    if (!userId) {
      console.log('No user ID available, attempting to find existing admin');
      // Check profiles table for admin instead of users table
      // Use any to break the type chain before maybeSingle() call
      const existingAdmin = await (supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin') as any)
        .maybeSingle();
        
      if (!existingAdmin.data?.id) {
        console.error('Could not find or create admin user');
        return;
      }
    }
    
    // Ensure profile exists with admin role
    const profileResult = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: 'Bambang Supratman',
        role: 'admin',
        status: 'active',
      }) as any;
      
    if (profileResult.error) {
      console.error('Error creating admin profile:', profileResult.error);
    }
    
  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
};
