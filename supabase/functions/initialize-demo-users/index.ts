
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define headers with CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
};

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    console.log("Initializing demo users with URL:", supabaseUrl);
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase URL or service role key");
    }

    // Get the Supabase client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Define our demo users
    const demoUsers = [
      {
        email: "admin@fleximov.com",
        password: "password123",
        userData: {
          full_name: "Bambang Supratman",
          role: "admin",
          status: "active",
        },
      },
      {
        email: "fleet@partner.com",
        password: "password123",
        userData: {
          full_name: "Joko Widodo",
          role: "partner",
          partner_type: "fleet",
          has_drivers: true,
          status: "active",
        },
      },
      {
        email: "courier@partner.com",
        password: "password123",
        userData: {
          full_name: "Agus Santoso",
          role: "partner",
          partner_type: "courier",
          status: "active",
        },
      },
      {
        email: "business@partner.com",
        password: "password123",
        userData: {
          full_name: "Siti Rahayu",
          role: "partner",
          partner_type: "business",
          status: "active",
        },
      },
      {
        email: "driver@fleximov.com",
        password: "password123",
        userData: {
          full_name: "Budi Setiawan",
          role: "driver",
          status: "active",
        },
      },
    ];

    const results: any[] = [];

    // Create demo users one by one
    for (const user of demoUsers) {
      console.log(`Processing user: ${user.email}`);
      
      // First check if the email exists
      const { data: existingUsers, error: existingUserError } = await supabaseAdmin.auth.admin.listUsers();
      
      if (existingUserError) {
        console.error(`Error checking users:`, existingUserError);
        results.push({
          email: user.email,
          success: false,
          error: existingUserError.message,
        });
        continue;
      }
      
      // Find matching user by email
      const existingUser = existingUsers.users.find(u => u.email === user.email);
      
      if (existingUser) {
        // User exists, update password
        console.log(`User ${user.email} exists, updating password`);
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          existingUser.id,
          { password: user.password, email_confirm: true }
        );
        
        if (updateError) {
          console.error(`Error updating user ${user.email}:`, updateError);
          results.push({
            email: user.email,
            success: false,
            error: updateError.message,
            operation: "update_failed",
          });
          continue;
        }
        
        // Update profile data
        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .update({
            ...user.userData,
            phone: existingUser.phone || "0812345678" + Math.floor(Math.random() * 99),
            balance: Math.floor(Math.random() * 1000) * 1000,
          })
          .eq("id", existingUser.id);
        
        if (profileError) {
          console.error(`Error updating profile for ${user.email}:`, profileError);
        }
        
        results.push({
          email: user.email,
          success: !profileError,
          error: profileError?.message,
          operation: "updated",
        });
      } else {
        // Create the user in auth
        console.log(`Creating new user: ${user.email}`);
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          user_metadata: user.userData,
          email_confirm: true,
        });

        if (authError) {
          console.error(`Error creating user ${user.email}:`, authError);
          results.push({
            email: user.email,
            success: false,
            error: authError.message,
            operation: "create_failed",
          });
          continue;
        }

        const userId = authData.user.id;
        console.log(`Created user with ID: ${userId}`);
        
        // Update the profile with additional data
        const { error: profileError } = await supabaseAdmin
          .from("profiles")
          .update({
            ...user.userData,
            phone: "0812345678" + Math.floor(Math.random() * 99),
            balance: Math.floor(Math.random() * 1000) * 1000,
          })
          .eq("id", userId);

        if (profileError) {
          console.error(`Error updating profile for ${user.email}:`, profileError);
        }

        results.push({
          email: user.email,
          success: !profileError,
          error: profileError?.message,
          operation: "created",
          userId,
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Demo users setup completed",
      results
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in initialize-demo-users function:", error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
