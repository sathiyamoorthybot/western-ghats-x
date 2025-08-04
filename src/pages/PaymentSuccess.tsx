import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [teamDetails, setTeamDetails] = useState<any>(null);

  const transactionId = searchParams.get('txnId');

  useEffect(() => {
    if (transactionId) {
      verifyPayment();
    } else {
      setVerifying(false);
      setPaymentStatus('failed');
    }
  }, [transactionId]);

  const verifyPayment = async () => {
    try {
      // Check payment status in database
      const { data, error } = await supabase
        .from('cricket_tournaments')
        .select('*')
        .eq('transaction_id', transactionId)
        .single();

      if (error || !data) {
        setPaymentStatus('failed');
        return;
      }

      setTeamDetails(data);

      if (data.payment_status === 'completed') {
        setPaymentStatus('success');
        toast({
          title: "Payment Successful!",
          description: "Your team registration has been confirmed.",
        });
      } else if (data.payment_status === 'failed') {
        setPaymentStatus('failed');
      } else {
        // Still pending, you might want to poll or wait
        setPaymentStatus('pending');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('failed');
    } finally {
      setVerifying(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {paymentStatus === 'success' ? (
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          )}
          <CardTitle className="text-2xl">
            {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentStatus === 'success' && teamDetails ? (
            <div className="space-y-3">
              <p className="text-center text-muted-foreground">
                Your team registration has been confirmed successfully.
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Registration Details:</h3>
                <p><strong>Team:</strong> {teamDetails.team_name}</p>
                <p><strong>Captain:</strong> {teamDetails.captain_name}</p>
                <p><strong>Transaction ID:</strong> {transactionId}</p>
                <p><strong>Amount:</strong> ₹{teamDetails.entry_fee}</p>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                You will receive a confirmation email shortly with your registration details.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-muted-foreground">
                We couldn't process your payment. Please try again or contact support.
              </p>
              {transactionId && (
                <p className="text-xs text-center text-muted-foreground">
                  Transaction ID: {transactionId}
                </p>
              )}
            </div>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleGoHome}
            >
              Go Home
            </Button>
            {paymentStatus === 'success' && (
              <Button 
                className="flex-1"
                onClick={handleGoToProfile}
              >
                View Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;