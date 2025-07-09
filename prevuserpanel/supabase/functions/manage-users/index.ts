import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { action, payload } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    if (action === "listUsers") {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      return new Response(JSON.stringify({ users: data.users }), {
        headers: corsHeaders
      });
    }

    if (action === "updateUser") {
      const { userId, user_metadata, email } = payload;
      const { data, error } = await supabase.auth.admin.updateUserById(userId, {
        email,
        user_metadata,
      });
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: corsHeaders });
    }

    if (action === "deleteUser") {
      const { userId } = payload;
      const { data, error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: "Invalid action specified." }), {
      status: 400,
      headers: corsHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
