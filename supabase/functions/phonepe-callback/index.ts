import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Parse callback data from PhonePe
    const callbackData = await req.json();
    const { transactionId, code, merchantId } = callbackData;

    // Verify payment status with PhonePe
    const clientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
    const stringToHash = `/pg/v1/status/${merchantId}/${transactionId}` + clientSecret;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const checksum = hashArray.map(b => b.toString(16).padStart(2, '0')).join('') + "###1";

    const statusResponse = await fetch(
      `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": merchantId
        }
      }
    );

    const statusData = await statusResponse.json();

    // Update payment status in database
    let paymentStatus = 'failed';
    if (statusData.success && statusData.code === 'PAYMENT_SUCCESS') {
      paymentStatus = 'completed';
    }

    await supabaseService
      .from('cricket_teams')
      .update({ 
        payment_status: paymentStatus,
        updated_at: new Date().toISOString()
      })
      .eq('transaction_id', transactionId);

    // If payment successful, send confirmation email
    if (paymentStatus === 'completed') {
      // Get team details for email
      const { data: teamData } = await supabaseService
        .from('cricket_teams')
        .select('*')
        .eq('transaction_id', transactionId)
        .single();

      if (teamData) {
        // Send confirmation email (you can implement this later)
        console.log(`Payment successful for team: ${teamData.team_name}`);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      status: paymentStatus
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Callback processing error:", error);
    return new Response(JSON.stringify({ 
      error: "Callback processing failed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});