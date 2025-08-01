import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("🚀 Create Razorpay Order Function Called");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("📦 Request body:", JSON.stringify(body, null, 2));
    
    const { teamData, amount } = body;

    if (!teamData || !amount) {
      console.error("❌ Missing teamData or amount");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing teamData or amount' 
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

    if (!keyId || !keySecret) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment gateway not configured' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create team registration entry
    const { data: registration, error: dbError } = await supabase
      .from('cricket_tournaments')
      .insert({
        team_name: teamData.teamName,
        captain_name: teamData.captainName,
        captain_phone: teamData.captainPhone,
        captain_email: teamData.captainEmail,
        team_jersey_url: teamData.teamJerseyUrl || null,
        players: teamData.players,
        entry_fee: amount,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error("❌ Database error:", dbError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to save registration data' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Razorpay order
    const auth = btoa(`${keyId}:${keySecret}`);
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: registration.id,
      notes: {
        team_name: teamData.teamName,
        captain_name: teamData.captainName,
        registration_id: registration.id
      }
    };

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("❌ Razorpay API error:", errorText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to create payment order' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const razorpayOrder = await razorpayResponse.json();
    console.log("✅ Razorpay order created:", razorpayOrder);

    // Update registration with payment_id
    await supabase
      .from('cricket_tournaments')
      .update({ payment_id: razorpayOrder.id })
      .eq('id', registration.id);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: keyId,
        registrationId: registration.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in create-razorpay-order function:', error);
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