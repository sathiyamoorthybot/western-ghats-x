import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  teamName: string;
  captainName: string;
  phone: string;
  email: string;
  eventType: string;
  amount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client for user authentication
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  // Create Supabase client with service role for database operations
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) throw new Error("Authentication failed");

    const { teamName, captainName, phone, email, eventType, amount }: PaymentRequest = await req.json();

    // Generate unique transaction ID
    const merchantTransactionId = `${eventType.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // PhonePe credentials from environment variables
    const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID");
    const clientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
    
    if (!merchantId || !clientSecret) {
      throw new Error("PhonePe credentials not configured");
    }

    // Create payment payload
    const paymentPayload = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: user.id,
      amount: amount * 100, // Amount in paise
      redirectUrl: `${req.headers.get("origin")}/payment-success?txnId=${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `${Deno.env.get("SUPABASE_URL")}/functions/v1/phonepe-callback`,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    // Encode payload to base64
    const encodedPayload = btoa(JSON.stringify(paymentPayload));
    
    // Create checksum: SHA256(encodedPayload + "/pg/v1/pay" + clientSecret)
    const stringToHash = encodedPayload + "/pg/v1/pay" + clientSecret;
    const encoder = new TextEncoder();
    const data = encoder.encode(stringToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const checksum = hashArray.map(b => b.toString(16).padStart(2, '0')).join('') + "###1";

    // Store payment record in database
    await supabaseService.from('cricket_teams').insert({
      user_id: user.id,
      team_name: teamName,
      captain_name: captainName,
      captain_phone: phone,
      event_id: eventType === 'cricket' ? 'cricket-tournament-id' : 'other-event-id',
      transaction_id: merchantTransactionId,
      payment_status: 'pending',
      payment_method: 'phonepe',
      registration_fee: amount
    });

    // Make request to PhonePe API
    const phonePeResponse = await fetch("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum
      },
      body: JSON.stringify({
        request: encodedPayload
      })
    });

    const phonePeData = await phonePeResponse.json();

    if (phonePeData.success && phonePeData.data?.instrumentResponse?.redirectInfo?.url) {
      return new Response(JSON.stringify({
        success: true,
        redirectUrl: phonePeData.data.instrumentResponse.redirectInfo.url,
        transactionId: merchantTransactionId
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      throw new Error("PhonePe payment initiation failed");
    }

  } catch (error) {
    console.error("Payment initiation error:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Payment initiation failed" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});