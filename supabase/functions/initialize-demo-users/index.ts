
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
    // Get the Supabase client
    const authHeader = req.headers.get("Authorization") || "";
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

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
      console.log(`Creating/updating user: ${user.email}`);
      
      // Check if user exists
      const { data: existingUsers } = await supabaseClient
        .from('profiles')
        .select('id')
        .eq('full_name', user.userData.full_name)
        .limit(1);
      
      let userId;
      
      // If user doesn't exist, create it
      if (!existingUsers || existingUsers.length === 0) {
        // Create the user in auth
        const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
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
          });
          continue;
        }

        userId = authData.user.id;
        
        // Update the profile with additional data
        const { error: profileError } = await supabaseClient
          .from("profiles")
          .update({
            ...user.userData,
            phone: "0812345678" + Math.floor(Math.random() * 99),
            balance: Math.floor(Math.random() * 1000) * 1000,
          })
          .eq("id", userId);

        results.push({
          email: user.email,
          success: !profileError,
          error: profileError?.message,
          operation: "created",
        });
      } else {
        userId = existingUsers[0].id;
        
        // User exists, update password
        const { error: updateError } = await supabaseClient.auth.admin.updateUserById(
          userId,
          { password: user.password, email_confirm: true }
        );
        
        results.push({
          email: user.email,
          success: !updateError,
          error: updateError?.message,
          operation: "updated",
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
