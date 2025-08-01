import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Users, Trophy, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Player {
  name: string;
  age: string;
  [key: string]: any;
}

interface TeamData {
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  teamJerseyUrl?: string;
  players: Player[];
}

const CricketTournament: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [teamData, setTeamData] = useState<TeamData>({
    teamName: "",
    captainName: "",
    captainPhone: "",
    captainEmail: "",
    teamJerseyUrl: "",
    players: Array(9).fill(null).map(() => ({ name: "", age: "", phone: "" }))
  });

  const handleInputChange = (field: keyof TeamData, value: string) => {
    setTeamData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlayerChange = (index: number, field: keyof Player, value: string) => {
    setTeamData(prev => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === index ? { ...player, [field]: value } : player
      )
    }));
  };

  const validateForm = () => {
    if (!teamData.teamName.trim()) {
      toast({ title: "Error", description: "Team name is required", variant: "destructive" });
      return false;
    }
    if (!teamData.captainName.trim()) {
      toast({ title: "Error", description: "Captain name is required", variant: "destructive" });
      return false;
    }
    if (!teamData.captainPhone.trim() || teamData.captainPhone.length !== 10) {
      toast({ title: "Error", description: "Valid 10-digit phone number is required", variant: "destructive" });
      return false;
    }
    if (!teamData.captainEmail.trim() || !teamData.captainEmail.includes('@')) {
      toast({ title: "Error", description: "Valid email is required", variant: "destructive" });
      return false;
    }

    for (let i = 0; i < 9; i++) {
      const player = teamData.players[i];
      const playerType = i < 7 ? "Playing XI" : "Substitute";

      if (!player.name.trim()) {
        toast({ title: "Error", description: `${playerType} Player ${i + 1} name is required`, variant: "destructive" });
        return false;
      }
      if (!player.age.trim() || isNaN(Number(player.age)) || Number(player.age) < 16) {
        toast({ title: "Error", description: `${playerType} Player ${i + 1} must be at least 16 years old`, variant: "destructive" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const adminEmailData = {
        _subject: "New Cricket Tournament Registration",
        _template: "table",
        _next: window.location.origin + "/payment-success",
        team_name: teamData.teamName,
        captain_name: teamData.captainName,
        captain_phone: teamData.captainPhone,
        captain_email: teamData.captainEmail,
        players: JSON.stringify(teamData.players),
        amount: "₹2,000"
      };

      const userEmailData = {
        _subject: "Cricket Tournament Registration Confirmation",
        _template: "table",
        _next: window.location.origin + "/payment-success",
        team_name: teamData.teamName,
        captain_name: teamData.captainName,
        message: "Thank you for registering! Please complete payment to confirm your registration."
      };

      await Promise.all([
        fetch("https://formsubmit.co/admin@westernghats-x.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminEmailData)
        }),
        fetch(`https://formsubmit.co/${teamData.captainEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userEmailData)
        })
      ]);

      setRegistered(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register team. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const initiateRazorpayPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          teamData,
          amount: 2000
        }
      });

      if (error) throw error;

      if (data && data.success) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const options = {
            key: data.keyId,
            amount: data.amount,
            currency: data.currency,
            name: 'Cricket Tournament Registration',
            description: `Team: ${teamData.teamName}`,
            order_id: data.orderId,
            handler: async function (response: any) {
              const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                }
              });

              if (verifyError || !verifyData.success) {
                toast({ title: "Payment Verification Failed", description: "Please contact support.", variant: "destructive" });
                return;
              }

              toast({ title: "Payment Successful!", description: "Your team registration is confirmed." });
              navigate(`/payment-success?paymentId=${response.razorpay_payment_id}&orderId=${response.razorpay_order_id}`);
            },
            prefill: {
              name: teamData.captainName,
              email: teamData.captainEmail,
              contact: teamData.captainPhone
            },
            theme: { color: '#3B82F6' }
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      }
    } catch (error: any) {
      toast({ title: "Payment Failed", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-3xl text-green-700">Cricket Tournament 2025</CardTitle>
            </div>
            <p className="text-gray-600">
              Team registration only. Guest registrations are not available.
              <br />
              <strong className="text-green-700">Entry Fee: ₹2,000 per team</strong>
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Team and Player Details Sections remain unchanged */}
          <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Team Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Team Name:</p>
                    <p className="font-medium">{teamData.teamName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Captain:</p>
                    <p className="font-medium">{teamData.captainName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-medium">{teamData.captainPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium">{teamData.captainEmail}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Payment Details</h3>
                <div className="flex justify-between items-center">
                  <span>Entry Fee:</span>
                  <span className="text-2xl font-bold text-blue-600">₹2,000</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setCurrentStep(2)}
                >
                  Back to Edit
                </Button>
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={initiateRazorpayPayment}
                >
                  Pay with Razorpay
                </Button>
              </div>
            </CardContent>

            {/* ... insert all other form fields here ... */}

            {/* Submit or Payment */}
            <div className="text-center pt-4">
              {registered ? (
                <>
                  <p className="text-green-600 text-lg font-semibold mb-4">
                    ✅ Registration Successful! Proceed to Payment.
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg"
                    onClick={initiateRazorpayPayment}
                  >
                    Pay ₹2,000 with Razorpay
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 text-lg"
                >
                  {isSubmitting ? "Registering..." : "Register Team & Proceed to Payment"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CricketTournament;
