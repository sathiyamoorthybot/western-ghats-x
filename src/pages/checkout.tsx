import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamName: searchParams.get('teamName') || '',
    captainName: searchParams.get('captainName') || '',
    phone: searchParams.get('phone') || '',
    email: searchParams.get('email') || user?.email || '',
    eventType: searchParams.get('eventType') || 'cricket'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhonePePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to proceed with payment",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Validate form
    if (!formData.teamName || !formData.captainName || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Phone number must be exactly 10 digits",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Call PhonePe payment initiation edge function
      const { data, error } = await supabase.functions.invoke('create-phonepe-payment', {
        body: {
          teamName: formData.teamName,
          captainName: formData.captainName,
          phone: formData.phone,
          email: formData.email,
          eventType: formData.eventType,
          amount: 2000 // ₹2,000
        }
      });

      if (error) {
        throw error;
      }

      if (data?.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('No redirect URL received from payment gateway');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast({
        title: "Payment Failed",
        description: "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Team Registration Checkout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <Label htmlFor="captainName">Captain Name *</Label>
                <Input
                  id="captainName"
                  name="captainName"
                  value={formData.captainName}
                  onChange={handleInputChange}
                  placeholder="Enter captain name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Registration Summary</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Event:</strong> Saravanampatti Blasters League</p>
                <p><strong>Registration Fee:</strong> ₹2,000</p>
                <p><strong>Payment Method:</strong> PhonePe</p>
              </div>
            </div>

            <Button 
              onClick={handlePhonePePayment}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Processing..." : "Pay ₹2,000 with PhonePe"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By proceeding with payment, you agree to our terms and conditions. 
              Your payment is secured by PhonePe.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
