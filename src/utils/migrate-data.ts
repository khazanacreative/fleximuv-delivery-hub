
import { supabase } from "@/integrations/supabase/client";

export const migrateData = async () => {
  try {
    console.log('Calling database function to initialize demo users');
    
    // Use a simple explicit type instead of letting TypeScript infer complex types
    const result = await supabase.rpc('initialize_demo_users');
    const data = result.data;
    const error = result.error;
    
    if (error) {
      console.error('Error initializing demo users:', error);
      return { success: false, message: error.message };
    }
    
    console.log('Demo users initialized successfully:', data);
    
    // Let's make sure the admin user exists by explicitly checking
    // Break the inference chain by using a simpler approach without chaining
    const { data: adminData, error: adminError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@fleximov.com')
      .limit(1)
      .single();
      
    if (adminError && adminError.code !== 'PGRST116') {
      console.error('Error checking admin user:', adminError);
    } else if (!adminData) {
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
    });
    
    const userId = authResult.data?.user?.id;
    
    if (!userId) {
      console.log('No user ID available, attempting to find existing admin');
      // Check profiles table for admin instead of users table
      // Avoid complex type inference by using a simpler approach
      const { data: existingAdmin, error: existingAdminError } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1)
        .single();
        
      if (existingAdminError && existingAdminError.code !== 'PGRST116') {
        console.error('Error finding admin:', existingAdminError);
        return;
      }
      
      if (!existingAdmin?.id) {
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
      });
      
    if (profileResult.error) {
      console.error('Error creating admin profile:', profileResult.error);
    }
    
  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
};
