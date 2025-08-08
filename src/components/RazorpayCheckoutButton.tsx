import React from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RazorpayProps {
  amount: number;
  teamData?: any;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayCheckoutButton: React.FC<RazorpayProps> = ({ amount, teamData }) => {
  const { toast } = useToast();
  
  // Calculate service fee (2.35%)
  const serviceFee = Math.round(amount * 0.0235);
  const totalAmount = amount + serviceFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error('Failed to load Razorpay SDK');
        }
      }

      const { data, error } = await supabase.functions.invoke('razorpay-payment', {
        body: {
          teamData: teamData || {
            teamName: "Sample Team",
            captainName: "Captain",
            captainPhone: "1234567890",
            captainEmail: "captain@example.com",
            teamSize: 11,
            players: [],
            jerseyColor: "Blue"
          },
          amount: totalAmount
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (data && data.success) {
        console.log('Razorpay order created:', data);
        
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: 'Cricket Tournament Registration',
          description: `Team: ${data.teamData.teamName}`,
          order_id: data.orderId,
          handler: async function (response: any) {
            try {
              const { data: verifyData, error: verifyError } = await supabase.functions.invoke('razorpay-verify', {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                }
              });

              if (verifyError || !verifyData.success) {
                throw new Error('Payment verification failed');
              }

              toast({
                title: "Payment Successful!",
                description: "Your team registration has been completed.",
                variant: "default"
              });

              // Redirect to success page
              window.location.href = `/payment-success?paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`;

            } catch (verifyError) {
              console.error('Payment verification error:', verifyError);
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support with your payment ID.",
                variant: "destructive"
              });
            }
          },
          prefill: {
            name: data.teamData.captainName,
            email: data.teamData.captainEmail,
            contact: data.teamData.captainPhone
          },
          theme: {
            color: '#3B82F6'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        
      } else {
        throw new Error(data?.error || 'Payment initiation failed');
      }

    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Registration Fee:</span>
          <span>₹{amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee (2.35%):</span>
          <span>₹{serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-1">
          <span>Total Amount:</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>
      <button 
        onClick={initiatePayment} 
        className="w-full bg-gradient-to-r from-mountain-green to-mountain-blue px-6 py-3 text-white rounded-lg font-semibold transition-colors"
      >
        Pay with Razorpay - ₹{totalAmount.toLocaleString()}
      </button>
    </div>
  );
};

export default RazorpayCheckoutButton;
