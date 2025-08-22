import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Trophy, CheckCircle, XCircle, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RegistrationConfirmDialog from "@/components/RegistrationConfirmDialog";

// ---- Types ----
interface Player {
  name: string;
  age: string;
  phone: string;
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

// ---- Razorpay typing (optional) ----
declare global {
  interface Window {
    Razorpay: any;
  }
}

// ---- Pricing constants ----
const ENTRY_FEE = 2299;            // ₹2,299 per team
const PLATFORM_FEE_PERCENT = 2.35; // 2.35%

// ---- Coupon constants ----
const validCoupons: Record<string, number> = {
  SBL100: 100,   // flat ₹100
  SBL10: 0.1,    // 10%
  EARLY20: 0.2,  // 20%
  SAVE50: 50,    // flat ₹50
};

// ---- Helper: load Razorpay script once ----
const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Success Message Component
const PaymentSuccessMessage = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
      <div className="bg-green-500 p-6 text-center">
        <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
      </div>
      <div className="p-6 text-center">
        <p className="text-gray-700 mb-6">
          Your team registration has been confirmed. You will receive a confirmation email shortly.
        </p>
        <Button 
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
        >
          Continue
        </Button>
      </div>
    </div>
  </div>
);

// Failure Message Component  
const PaymentFailureMessage = ({ onClose, message }: { onClose: () => void; message: string }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
      <div className="bg-red-500 p-6 text-center">
        <XCircle className="h-16 w-16 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Payment Failed</h2>
      </div>
      <div className="p-6 text-center">
        <p className="text-gray-700 mb-6">
          {message || "Your payment could not be processed. Please try again."}
        </p>
        <Button 
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2"
        >
          Try Again
        </Button>
      </div>
    </div>
  </div>
);

const CricketTournament: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const [teamData, setTeamData] = useState<TeamData>({
    teamName: "",
    captainName: "",
    captainPhone: "",
    captainEmail: "",
    teamJerseyUrl: "",
    players: Array(9)
      .fill(null)
      .map(() => ({ name: "", age: "", phone: "" })),
  });

  const handleInputChange = (field: keyof TeamData, value: string) => {
    setTeamData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlayerChange = (index: number, field: keyof Player, value: string) => {
    setTeamData((prev) => ({
      ...prev,
      players: prev.players.map((player, i) =>
        i === index ? { ...player, [field]: value } : player
      ),
    }));
  };

  // Apply coupon function
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      toast({
        title: "Enter Coupon Code",
        description: "Please enter a coupon code.",
        variant: "destructive",
      });
      return;
    }

    if (validCoupons[code]) {
      let discountAmount = 0;
      if (validCoupons[code] < 1) {
        // Percentage discount
        discountAmount = Math.round(ENTRY_FEE * validCoupons[code]);
      } else {
        // Flat discount
        discountAmount = validCoupons[code];
      }
      
      setDiscount(discountAmount);
      setCouponApplied(true);
      
      toast({
        title: "Coupon Applied! 🎉",
        description: `You saved ₹${discountAmount}`,
        variant: "default",
      });
    } else {
      setDiscount(0);
      setCouponApplied(false);
      toast({
        title: "Invalid Coupon",
        description: "Please check the coupon code and try again.",
        variant: "destructive",
      });
    }
  };

  // Remove coupon function
  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponApplied(false);
    toast({
      title: "Coupon Removed",
      description: "Coupon discount has been removed.",
      variant: "default",
    });
  };





  
// Constants
const ENTRY_FEE = 1500; // Example: change to your real fee
const PLATFORM_FEE_PERCENT = 5; // Example: change if needed

// Calculate amounts
const calculateFinalAmount = () => {
  const discountedAmount = Math.max(ENTRY_FEE - discount, 0);
  const platformFee = Math.round((discountedAmount * PLATFORM_FEE_PERCENT) / 100);
  return discountedAmount + platformFee;
};

// Helpers (optional, for reusability)
const getDiscountedAmount = () => Math.max(ENTRY_FEE - discount, 0);
const getPlatformFee = () => Math.round((getDiscountedAmount() * PLATFORM_FEE_PERCENT) / 100);
const getTotalAmount = () => getDiscountedAmount() + getPlatformFee();







  
  const validateForm = () => {
    const showError = (message: string, fieldId?: string) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
        duration: 2500,
      });

      if (fieldId) {
        const el = document.getElementById(fieldId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
              (el as HTMLInputElement | HTMLTextAreaElement).focus({ preventScroll: true });
            }
          }, 300);
        }
      }

      if (navigator.vibrate) navigator.vibrate(60);
    };

    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    const agePattern = /^\d+$/;

    // Team details
    if (!teamData.teamName.trim()) return showError("Team name required", "teamName"), false;
    if (!teamData.captainName.trim()) return showError("Captain name required", "captainName"), false;
    if (!phonePattern.test(teamData.captainPhone.trim()))
      return showError("Captain phone must be 10 digits", "captainPhone"), false;
    if (!emailPattern.test(teamData.captainEmail.trim()))
      return showError("Valid captain email required", "captainEmail"), false;

    // Players (7 + 2 subs)
    for (let i = 0; i < 9; i++) {
      const p = teamData.players[i];
      const type = i < 7 ? "P" : "S";
      const idx = i + 1;

      if (!p.name.trim()) return showError(`${type}${idx}: Name required`, `playerName-${i}`), false;

      if (!agePattern.test(p.age.trim()) || Number(p.age) < 16) {
        return showError(`${type}${idx}: Age must be ≥ 16`, `playerAge-${i}`), false;
      }

      if (!phonePattern.test(p.phone.trim()))
        return showError(`${type}${idx}: Phone must be 10 digits`, `playerPhone-${i}`), false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting || registered || submissionAttempted) return;

    setSubmissionAttempted(true);
    setIsSubmitting(true);

    try {
      const finalAmount = calculateFinalAmount();
      
      const { data, error } = await supabase
        .from("cricket_tournaments" as any)
        .insert({
          team_name: teamData.teamName.trim(),
          captain_name: teamData.captainName.trim(),
          captain_phone: teamData.captainPhone.trim(),
          captain_email: teamData.captainEmail.trim(),
          players: teamData.players,
          entry_fee: ENTRY_FEE,
          discount_amount: discount,
          coupon_code: couponApplied ? couponCode.toUpperCase() : null,
          final_amount: finalAmount,
          payment_status: "pending",
          user_id: user?.id || null,
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
        variant: "default",
      });
    } catch (error: any) {
      setSubmissionAttempted(false);
      toast({
        title: "Registration Failed",
        description: error?.message || "Failed to register team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const initiateRazorpayPayment = async () => {
    try {
      setShowConfirmDialog(false);

      const finalAmount = calculateFinalAmount();
      const amountInPaise = finalAmount * 100; // Convert to paise

      if (!registrationId) {
        toast({
          title: "Missing registration",
          description: "Please submit the form again.",
          variant: "destructive",
        });
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        setFailureMessage("Unable to load payment system. Please check your internet connection and try again.");
        setShowFailureMessage(true);
        return;
      }

      // Create order on server
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { teamData, amount: amountInPaise, registrationId, discount, couponCode: couponApplied ? couponCode : null },
      });

      if (error) throw new Error(error.message || "Order creation failed");
      if (!data?.success || !data?.orderId || !data?.amount || !data?.currency || !data?.keyId) {
        throw new Error("Invalid order response from server");
      }

      const options = {
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount, // in paise
        currency: data.currency, // "INR"
        name: "Cricket Tournament Registration",
        description: `Team: ${teamData.teamName}${couponApplied ? ` (Coupon: ${couponCode})` : ''}`,
        notes: {
          registration_id: String(registrationId),
          team_name: teamData.teamName,
          captain_phone: teamData.captainPhone,
          discount_amount: String(discount),
          coupon_code: couponApplied ? couponCode : '',
        },
        prefill: {
          name: teamData.captainName,
          email: teamData.captainEmail,
          contact: teamData.captainPhone,
        },
        theme: { color: "#3B82F6" },
        handler: async (response: any) => {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              "verify-razorpay-payment",
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              }
            );

            if (verifyError) throw new Error(verifyError.message || "Verification failed");
            if (!verifyData?.success)
              throw new Error(verifyData?.message || "Signature verification failed");

            // Send confirmation email
            await supabase.functions.invoke("send-cricket-registration-email", {
              body: {
                teamData,
                paymentStatus: "completed",
                registrationId,
                paymentAmount: finalAmount,
                discount,
                couponCode: couponApplied ? couponCode : null,
              },
            });

            // Show success message
            setShowSuccessMessage(true);

          } catch (e: any) {
            setFailureMessage("Payment was successful but there was an issue with confirmation. Please contact support if you don't receive your confirmation email.");
            setShowFailureMessage(true);
          }
        },
        modal: {
          ondismiss: () => {
            // Optional: capture abandoned checkout
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async (resp: any) => {
        try {
          await supabase.functions.invoke("send-cricket-registration-email", {
            body: {
              teamData,
              paymentStatus: "failed",
              registrationId,
              paymentAmount: finalAmount,
              failureReason: resp?.error?.description || "Payment failed",
              discount,
              couponCode: couponApplied ? couponCode : null,
            },
          });
        } catch (_) {}
        
        setFailureMessage(resp?.error?.description || "Your payment could not be completed. Please try again.");
        setShowFailureMessage(true);
      });

      rzp.open();
    } catch (error: any) {
      setFailureMessage(error?.message || "Something went wrong starting the payment. Please try again.");
      setShowFailureMessage(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-4 sm:pt-8 md:pt-16 pb-4 px-2 sm:px-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
              <CardTitle className="text-xl sm:text-2xl md:text-3xl text-green-700">SBL - Edition 1</CardTitle>
            </div>
            <div className="text-sm sm:text-base text-gray-600 space-y-2">
              <p>Team registration only. Guest registrations are not available.</p>
              <p className="text-green-700 font-semibold text-base sm:text-lg">Entry Fee: ₹2,299 per team</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6 pb-6 sm:pb-8">
            {/* Team Details */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Team Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2 md:col-span-1">
                  <Label htmlFor="teamName" className="text-sm font-medium">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={teamData.teamName}
                    onChange={(e) => handleInputChange("teamName", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <Label htmlFor="captainName" className="text-sm font-medium">Captain Name *</Label>
                  <Input
                    id="captainName"
                    value={teamData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <Label htmlFor="captainPhone" className="text-sm font-medium">Captain Phone *</Label>
                  <Input
                    id="captainPhone"
                    value={teamData.captainPhone}
                    onChange={(e) =>
                      handleInputChange(
                        "captainPhone",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    maxLength={10}
                    placeholder="10-digit phone number"
                    required
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <Label htmlFor="captainEmail" className="text-sm font-medium">Captain Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={teamData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Players */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Players (7 + 2 Subs)</h3>
              <div className="space-y-4">
                {teamData.players.map((player, index) => (
                  <div key={index} className="border p-3 sm:p-4 rounded-md bg-gray-50">
                    <h4 className="font-medium mb-3 text-sm sm:text-base">
                      Player {index + 1} ({index < 7 ? "Playing VII" : "Substitute"})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <div className="sm:col-span-3 md:col-span-1">
                        <Label htmlFor={`playerName-${index}`} className="text-sm font-medium">Name *</Label>
                        <Input
                          id={`playerName-${index}`}
                          value={player.name}
                          onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`playerAge-${index}`} className="text-sm font-medium">Age *</Label>
                        <Input
                          id={`playerAge-${index}`}
                          type="number"
                          value={player.age}
                          min={16}
                          onChange={(e) => handlePlayerChange(index, "age", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2 md:col-span-1">
                        <Label htmlFor={`playerPhone-${index}`} className="text-sm font-medium">Phone Number *</Label>
                        <Input
                          id={`playerPhone-${index}`}
                          value={player.phone}
                          onChange={(e) =>
                            handlePlayerChange(
                              index,
                              "phone",
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          maxLength={10}
                          placeholder="10-digit phone number"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="border p-4 rounded-md bg-blue-50">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
                Have a Coupon Code?
              </h3>
              
              {!couponApplied ? (
                <div className="flex gap-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="flex-1"
                  />
                  <Button 
                    onClick={applyCoupon}
                    disabled={!couponCode.trim()}
                    variant="outline"
                    className="px-4"
                  >
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="bg-green-100 p-3 rounded-md border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">Coupon Applied: {couponCode}</p>
                      <p className="text-sm text-green-600">You saved ₹{discount}</p>
                    </div>
                    <Button 
                      onClick={removeCoupon}
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="border p-4 rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-3">Price Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Entry Fee</span>
                  <span>₹{ENTRY_FEE}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({couponCode})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Platform Fee ({PLATFORM_FEE_PERCENT}%)</span>
                  <span>₹{Math.round(((ENTRY_FEE - discount) * PLATFORM_FEE_PERCENT) / 100)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>₹{calculateFinalAmount()}</span>
                </div>
              </div>
            </div>

            {/* Final Actions */}
            <div className="text-center pt-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || registered || submissionAttempted}
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                style={{
                  pointerEvents:
                    isSubmitting || registered || submissionAttempted ? "none" : "auto",
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">⏳</span>
                    Registering...
                  </div>
                ) : registered ? (
                  "Registration Complete"
                ) : (
                  `Proceed to Payment (₹${calculateFinalAmount()})`
                )}
              </Button>
              {isSubmitting && (
                <p className="text-xs sm:text-sm text-gray-600 mt-2 px-4">
                  Please wait, processing your registration...
                </p>
              )}
            </div>

            {/* Registration Confirmation Dialog */}
            <RegistrationConfirmDialog
              isOpen={showConfirmDialog}
              onClose={() => setShowConfirmDialog(false)}
              teamData={teamData}
              onProceedToPayment={initiateRazorpayPayment}
            />

            {/* Success Message */}
            {showSuccessMessage && (
              <PaymentSuccessMessage onClose={() => setShowSuccessMessage(false)} />
            )}

            {/* Failure Message */}
            {showFailureMessage && (
              <PaymentFailureMessage 
                onClose={() => setShowFailureMessage(false)}
                message={failureMessage}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CricketTournament;
