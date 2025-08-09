import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("🚀 Razorpay Payment Function Called");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("📦 Request body:", JSON.stringify(body, null, 2));

    const { teamData, amount } = body;

    if (!teamData || !amount) {
      console.error("❌ Missing required fields:", { teamData: !!teamData, amount: !!amount });
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields: teamData and amount are required" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get Razorpay credentials
    const keyId = Deno.env.get('RAZORPAY_KEY_ID');
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    console.log("🔐 Razorpay credentials check:", {
      keyId: keyId ? 'SET' : 'NOT SET',
      keySecret: keySecret ? 'SET' : 'NOT SET'
    });

    if (!keyId || !keySecret) {
      console.error("❌ Razorpay credentials missing");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Payment gateway configuration error - missing credentials" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate order ID
    const orderId = `order_${Date.now()}`;
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("💾 Inserting team registration data");

    // Insert team registration data
    const { data: insertData, error: insertError } = await supabase
      .from('team_registrations')
      .insert({
        team_name: teamData.teamName,
        captain_name: teamData.captainName,
        captain_phone: teamData.captainPhone,
        captain_email: teamData.captainEmail,
        team_size: teamData.teamSize,
        players: teamData.players,
        jersey_color: teamData.jerseyColor,
        special_requests: teamData.specialRequests,
        transaction_id: orderId,
        amount: amount,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Database insertion error:", insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to save registration data" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log("✅ Team registration saved:", insertData);

    // Create Razorpay order
    const orderData = {
      amount: amount * 1, // Convert to paise
      currency: 'INR',
      receipt: orderId,
      notes: {
        team_name: teamData.teamName,
        captain_name: teamData.captainName,
        captain_email: teamData.captainEmail
      }
    };

    console.log("💳 Creating Razorpay order:", JSON.stringify(orderData, null, 2));

    // Create basic auth header
    const credentials = btoa(`${keyId}:${keySecret}`);
    
    try {
      const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      console.log("📱 Razorpay response status:", razorpayResponse.status);
      
      if (!razorpayResponse.ok) {
        const errorText = await razorpayResponse.text();
        console.error("❌ Razorpay API error:", errorText);
        throw new Error(`Razorpay API error: ${razorpayResponse.status} - ${errorText}`);
      }

      const razorpayData = await razorpayResponse.json();
      console.log("✅ Razorpay order created:", JSON.stringify(razorpayData, null, 2));

      // Update order ID in database
      await supabase
        .from('team_registrations')
        .update({ payment_id: razorpayData.id })
        .eq('transaction_id', orderId);

      return new Response(
        JSON.stringify({
          success: true,
          orderId: razorpayData.id,
          amount: razorpayData.amount,
          currency: razorpayData.currency,
          keyId: keyId,
          teamData: teamData
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );

    } catch (razorpayError) {
      console.error("❌ Razorpay request failed:", razorpayError);
      throw razorpayError;
    }

  } catch (error) {
    console.error('❌ Error in razorpay-payment function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
