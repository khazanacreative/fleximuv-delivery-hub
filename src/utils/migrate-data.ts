
import { supabase } from "@/integrations/supabase/client";

export const migrateData = async () => {
  try {
    console.log('Calling database function to initialize demo users');
    
    // Using explicit type annotation to fix the infinite type instantiation error
    const { data, error } = await supabase.rpc('initialize_demo_users') as {
      data: any;
      error: any;
    };
    
    if (error) {
      console.error('Error initializing demo users:', error);
      return { success: false, message: error.message };
    }
    
    console.log('Demo users initialized successfully:', data);
    
    // Let's make sure the admin user exists by explicitly checking
    const { data: adminCheck, error: adminError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@fleximov.com')
      .maybeSingle() as { data: any; error: any };
      
    if (adminError) {
      console.error('Error checking admin user:', adminError);
    } else if (!adminCheck) {
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
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@fleximov.com',
      password: 'password123',
      email_confirm: true,
    }) as { data: any; error: any };
    
    if (authError && authError.message !== 'User already registered') {
      console.error('Error creating admin auth user:', authError);
      return;
    }
    
    const userId = authUser?.user?.id;
    
    if (!userId) {
      console.log('No user ID available, attempting to find existing admin');
      // Check profiles table for admin instead of users table
      const { data: existingAdmin } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .maybeSingle() as { data: any; error: any };
        
      if (!existingAdmin?.id) {
        console.error('Could not find or create admin user');
        return;
      }
    }
    
    // Ensure profile exists with admin role
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: 'Bambang Supratman',
        role: 'admin',
        status: 'active',
      }) as { data: any; error: any };
      
    if (profileError) {
      console.error('Error creating admin profile:', profileError);
    }
    
  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
};
