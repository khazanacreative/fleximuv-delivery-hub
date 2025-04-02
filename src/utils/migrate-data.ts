
import { supabase } from "@/integrations/supabase/client";

export const migrateData = async () => {
  try {
    console.log('Calling database function to initialize demo users');
    
    // Use unknown type to break the type inference chain
    const response = await supabase.rpc('initialize_demo_users') as unknown as {
      data: any;
      error: { message: string } | null;
    };
    
    if (response.error) {
      console.error('Error initializing demo users:', response.error);
      return { success: false, message: response.error.message };
    }
    
    console.log('Demo users initialized successfully:', response.data);
    
    // Let's make sure the admin user exists by explicitly checking
    // Break the type reference chain with unknown
    const adminResponse = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@fleximov.com')
      .maybeSingle() as unknown as {
        data: any | null;
        error: { message: string } | null;
      };
      
    if (adminResponse.error) {
      console.error('Error checking admin user:', adminResponse.error);
    } else if (!adminResponse.data) {
      console.log('Admin user not found, creating explicitly');
      // Try to create admin user explicitly if missing
      await createAdminUser();
    }
    
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error calling database function:', error);
    return { success: false, message: error.message };
  }
};

// Helper function to explicitly create admin user if needed
const createAdminUser = async () => {
  try {
    // First attempt to create the auth user
    const authResponse = await supabase.auth.admin.createUser({
      email: 'admin@fleximov.com',
      password: 'password123',
      email_confirm: true,
    }) as unknown as {
      data: { user?: { id?: string } };
      error: any;
    };
    
    const userId = authResponse.data?.user?.id;
    
    if (!userId) {
      console.log('No user ID available, attempting to find existing admin');
      // Check profiles table for admin instead of users table
      const existingAdminResponse = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .maybeSingle() as unknown as {
          data: { id?: string } | null;
          error: any;
        };
        
      if (!existingAdminResponse.data?.id) {
        console.error('Could not find or create admin user');
        return;
      }
    }
    
    // Ensure profile exists with admin role
    const profileResponse = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: 'Bambang Supratman',
        role: 'admin',
        status: 'active',
      }) as unknown as {
        error: any;
      };
      
    if (profileResponse.error) {
      console.error('Error creating admin profile:', profileResponse.error);
    }
    
  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
};
