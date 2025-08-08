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
import RegistrationConfirmDialog from "@/components/RegistrationConfirmDialog";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

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
      // Save to Supabase cricket_tournaments table
      const { data, error } = await supabase
        .from('cricket_tournaments' as any)
        .insert({
          team_name: teamData.teamName,
          captain_name: teamData.captainName,
          captain_phone: teamData.captainPhone,
          captain_email: teamData.captainEmail,
          players: teamData.players,
          entry_fee: 2299,
          payment_status: 'pending',
          user_id: user?.id || null
        })
        .select()
        .single();

      if (error) throw error;

      setRegistrationId((data as any)?.id);
      setRegistered(true);
      setShowConfirmDialog(true);

      toast({
        title: "Registration Successful!",
        description: "Your team has been registered. Please proceed to payment.",
        variant: "default"
      });

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
      setShowConfirmDialog(false);
      
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: { teamData, amount: 2299, registrationId }
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

              // Send email notifications after successful payment
              await supabase.functions.invoke('send-cricket-registration-email', {
                body: {
                  teamData,
                  paymentStatus: 'completed',
                  registrationId,
                  paymentAmount: 2299 + Math.round(2299 * 0.0235) // Base amount + platform fee
                }
              });

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-12 pb-4 px-4 md:p-10">

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <CardTitle className="text-3xl text-green-700">SBL - Edition 1</CardTitle>
            </div>
            <p className="text-gray-600">
              Team registration only. Guest registrations are not available.
              <br />
              <strong className="text-green-700">Entry Fee: ₹2,299 per team</strong>
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Team Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Team Name *</Label>
                  <Input value={teamData.teamName} onChange={(e) => handleInputChange('teamName', e.target.value)} required />
                </div>
                <div>
                  <Label>Captain Name *</Label>
                  <Input value={teamData.captainName} onChange={(e) => handleInputChange('captainName', e.target.value)} required />
                </div>
                <div>
                  <Label>Captain Phone *</Label>
                  <Input value={teamData.captainPhone} onChange={(e) => handleInputChange('captainPhone', e.target.value.replace(/\D/g, '').slice(0, 10))} maxLength={10} required />
                </div>
                <div>
                  <Label>Captain Email *</Label>
                  <Input type="email" value={teamData.captainEmail} onChange={(e) => handleInputChange('captainEmail', e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Players */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Players (7 + 2 Subs)</h3>
              {teamData.players.map((player, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50 mb-4">
                  <h4 className="font-medium mb-3">Player {index + 1} ({index < 7 ? "Playing XI" : "Substitute"})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name *</Label>
                      <Input value={player.name} onChange={(e) => handlePlayerChange(index, 'name', e.target.value)} required />
                    </div>
                    <div>
                      <Label>Age *</Label>
                      <Input type="number" value={player.age} min={16} onChange={(e) => handlePlayerChange(index, 'age', e.target.value)} required />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Actions */}
            <div className="text-center pt-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || registered}
                className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white font-semibold px-8 py-3 text-lg"
              >
                {isSubmitting ? "Registering..." : registered ? "Registration Complete" : "Register Team & Proceed to Payment"}
              </Button>
            </div>
            
            {/* Registration Confirmation Dialog */}
            <RegistrationConfirmDialog
              isOpen={showConfirmDialog}
              onClose={() => setShowConfirmDialog(false)}
              teamData={teamData}
              onProceedToPayment={initiateRazorpayPayment}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CricketTournament;
