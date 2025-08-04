import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("🔍 Verify Razorpay Payment Function Called");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("📦 Request body:", JSON.stringify(body, null, 2));
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("❌ Missing payment verification data");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing payment verification data' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get Razorpay credentials
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!keySecret) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment gateway configuration error' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(keySecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(text)
    );
    
    const expectedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    console.log("🔐 Signature verification:", {
      expected: expectedSignature,
      received: razorpay_signature,
      match: expectedSignature === razorpay_signature
    });

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Invalid payment signature");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid payment signature' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update payment status in database
    const { data, error } = await supabase
      .from('cricket_tournaments')
      .update({ 
        payment_status: 'completed',
        transaction_id: razorpay_payment_id,
        updated_at: new Date().toISOString()
      })
      .eq('payment_id', razorpay_order_id)
      .select()
      .single();

    if (error) {
      console.error("❌ Database update error:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to update payment status' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log("✅ Payment verified and database updated:", data);

    // Send confirmation email
    try {
      console.log("📧 Sending registration email with data:", {
        teamName: data.team_name,
        captainName: data.captain_name,
        captainEmail: data.captain_email,
        playersCount: data.players?.length || 0
      });
      
      const emailResult = await supabase.functions.invoke('send-cricket-registration-email', {
        body: {
          teamData: {
            teamName: data.team_name,
            captainName: data.captain_name,
            captainPhone: data.captain_phone,
            captainEmail: data.captain_email,
            players: data.players || []
          },
          paymentStatus: 'completed',
          registrationId: data.id,
          paymentAmount: data.entry_fee
        }
      });
      
      if (emailResult.error) {
        console.error("❌ Email function error:", emailResult.error);
      } else {
        console.log("✅ Email sent successfully:", emailResult.data);
      }
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        teamData: data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in verify-razorpay-payment function:', error);
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