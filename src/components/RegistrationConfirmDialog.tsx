import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Mail, Phone, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // <-- your supabase client

interface Player {
  name: string;
  age: string;
  phone: string;
}

interface TeamData {
  teamName: string;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  players: Player[];
}

interface RegistrationConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teamData: TeamData;
}

const RegistrationConfirmDialog: React.FC<RegistrationConfirmDialogProps> = ({
  isOpen,
  onClose,
  teamData,
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const ENTRY_FEE = 2299;
  const SERVICE_FEE = 54;
  const TOTAL = ENTRY_FEE + SERVICE_FEE;

  const handleProceedToPayment = async () => {
    if (isProcessingPayment) return;
    setIsProcessingPayment(true);

    try {
      // 1️⃣ Save team data in Supabase with payment_status=pending
      const { data, error } = await supabase
        .from("cricket_tournaments")
        .insert({
          team_name: teamData.teamName.trim(),
          captain_name: teamData.captainName.trim(),
          captain_phone: teamData.captainPhone.trim(),
          captain_email: teamData.captainEmail.trim(),
          players: teamData.players,
          entry_fee: ENTRY_FEE,
          final_amount: TOTAL,
          payment_status: "pending",
        })
        .select()
        .single();

      if (error) throw error;

      // 2️⃣ Ask backend to create Razorpay order
      const orderRes = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: TOTAL * 100, receipt: data.id }), // amount in paise
      });

      const { orderId } = await orderRes.json();

      // 3️⃣ Load Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env
        amount: TOTAL * 100,
        currency: "INR",
        name: "Western Ghats X",
        description: "Cricket Tournament Registration",
        order_id: orderId,
        handler: async function (response: any) {
          // 4️⃣ Update payment_status in Supabase
          await supabase
            .from("cricket_tournaments")
            .update({ payment_status: "success", razorpay_payment_id: response.razorpay_payment_id })
            .eq("id", data.id);

          alert("✅ Payment Successful!");
          onClose();
        },
        prefill: {
          name: teamData.captainName,
          email: teamData.captainEmail,
          contact: teamData.captainPhone,
        },
        theme: { color: "#10b981" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("❌ Something went wrong. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={isProcessingPayment ? () => {} : onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-700">Registration Summary</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Team Details */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Team</p><p>{teamData.teamName}</p></div>
                <div><p className="text-sm text-gray-500">Captain</p><p>{teamData.captainName}</p></div>
                <div><p className="text-sm text-gray-500">Phone</p><p>{teamData.captainPhone}</p></div>
                <div><p className="text-sm text-gray-500">Email</p><p>{teamData.captainEmail}</p></div>
              </div>
            </CardContent>
          </Card>

          {/* Players */}
          <Card>
            <CardContent className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Players</h3>
              {teamData.players.map((p, i) => (
                <div key={i} className="flex justify-between border-b py-2">
                  <span>{i + 1}. {p.name} ({p.age} yrs)</span>
                  <span>{p.phone}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="border-green-200 bg-green-50">
            <CardContent>
              <h3 className="text-lg font-semibold text-green-700 mb-2">Payment Details</h3>
              <p>₹{ENTRY_FEE} + Fee ₹{SERVICE_FEE} = <b>₹{TOTAL}</b></p>
              <p className="text-sm text-gray-600 mt-1">Processed securely with Razorpay</p>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isProcessingPayment} className="flex-1">
              Edit Details
            </Button>
            <Button 
              onClick={handleProceedToPayment} 
              className="flex-1 bg-gradient-to-r from-green-600 to-green-400"
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? "Processing..." : `Proceed to Payment (₹${TOTAL})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationConfirmDialog;
