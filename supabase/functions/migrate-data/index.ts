
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
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Define our mock users
    const mockUsers = [
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
      {
        email: "customer@example.com",
        password: "password123",
        userData: {
          full_name: "Dewi Putri",
          role: "customer",
          status: "active",
        },
      },
    ];

    const results: any[] = [];

    // Check if admin data already exists
    const { data: existingAdmin } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("role", "admin");

    if (existingAdmin && existingAdmin.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        message: "Data migration already performed"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Create our test users
    for (const user of mockUsers) {
      // Create the user in auth
      const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
        email: user.email,
        password: user.password,
        user_metadata: user.userData,
        email_confirm: true,
      });

      if (authError) {
        results.push({
          email: user.email,
          success: false,
          error: authError.message,
        });
        continue;
      }

      // Update the profile with additional data
      const { error: profileError } = await supabaseClient
        .from("profiles")
        .update({
          ...user.userData,
          phone: "0812345678" + Math.floor(Math.random() * 99),
          balance: Math.floor(Math.random() * 1000) * 1000,
        })
        .eq("id", authData.user.id);

      results.push({
        email: user.email,
        success: !profileError,
        error: profileError?.message,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Data migration completed",
      results
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
