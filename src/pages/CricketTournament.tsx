import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Trophy, Users, IndianRupee, Camera, Upload, CheckCircle, Clock3, ExternalLink } from "lucide-react";
import { initiatePhonePePayment } from "@/services/phonePeService";

interface Player {
  name: string;
  age: string;
  phone: string;
  photo: File | null;
}

const CricketTournament = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [teamName, setTeamName] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [teamJersey, setTeamJersey] = useState<File | null>(null);
  const [players, setPlayers] = useState<Player[]>(Array(9).fill(null).map(() => ({
    name: "",
    age: "",
    phone: "",
    photo: null
  })));

  // Payment state
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');

  // Payment details
  const registrationFee = 2000;

  const handlePlayerChange = (index: number, field: keyof Player, value: string | File) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value
    };
    setPlayers(updatedPlayers);
  };

  const handlePhotoUpload = (index: number, file: File | null) => {
    handlePlayerChange(index, 'photo', file);
  };

  const handleJerseyUpload = (file: File | null) => {
    setTeamJersey(file);
  };

  // Form validation
  const validateForm = () => {
    if (!teamName || !captainName || !captainPhone || !captainEmail || !teamJersey) {
      toast({
        title: "Missing Information",
        description: "Please fill in all team details and upload team jersey.",
        variant: "destructive"
      });
      return false;
    }

    const incompletePlayers = players.filter(player => !player.name || !player.age || !player.phone);
    if (incompletePlayers.length > 0) {
      toast({
        title: "Incomplete Player Details",
        description: "Please fill in all details for all 9 players.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsPaymentDialogOpen(true);
      setPaymentStatus('pending');
    }
  };

  // PhonePe Payment Integration
  const handlePhonePePayment = async () => {
    setIsProcessingPayment(true);
    setPaymentStatus('processing');

    try {
      const paymentData = {
        teamName: teamName,
        captainName: captainName,
        phone: captainPhone,
        email: captainEmail,
        eventType: 'cricket',
        amount: registrationFee
      };

      const result = await initiatePhonePePayment(paymentData);
      
      if (result.success && result.redirectUrl) {
        // Redirect to PhonePe payment page
        window.location.href = result.redirectUrl;
      } else {
        throw new Error('Failed to initiate payment');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessingPayment(false);
      setPaymentStatus('failed');
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Payment confirmation for manual fallback
  const handlePaymentConfirmation = () => {
    setPaymentStatus('completed');
    toast({
      title: "Registration Submitted!",
      description: "Your team registration has been submitted. We'll verify your payment and contact you soon.",
    });
    setIsPaymentDialogOpen(false);
    
    // Reset form after successful submission
    setTimeout(() => {
      setTeamName("");
      setCaptainName("");
      setCaptainPhone("");
      setCaptainEmail("");
      setTeamJersey(null);
      setPlayers(Array(9).fill(null).map(() => ({
        name: "",
        age: "",
        phone: "",
        photo: null
      })));
      setPaymentStatus('pending');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🏏 Cricket Tournament
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-mountain-green to-mountain-blue bg-clip-text text-transparent">
              Saravanampatti Blasters League
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              ⚡ A One-Day Turf Cricket Showdown | August 31, 2025
            </p>
            <p className="text-lg">
              📣 Get Ready for a Power-Packed Cricket Festival in Saravanampatti!
            </p>
          </div>

          {/* Registration Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-mountain-green" />
                Team Registration
              </CardTitle>
              <CardDescription>
                Team registration only. Guest registrations are not available for this tournament.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Team Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Team Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input id="teamName" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Enter your team name" required />
                    </div>
                    <div>
                      <Label htmlFor="captainName">Captain Name *</Label>
                      <Input id="captainName" value={captainName} onChange={e => setCaptainName(e.target.value)} placeholder="Enter captain's name" required />
                    </div>
                    <div>
                      <Label htmlFor="captainPhone">Captain Phone *</Label>
                      <Input id="captainPhone" value={captainPhone} onChange={e => setCaptainPhone(e.target.value)} placeholder="Enter captain's phone number" required />
                    </div>
                    <div>
                      <Label htmlFor="captainEmail">Captain Email *</Label>
                      <Input id="captainEmail" type="email" value={captainEmail} onChange={e => setCaptainEmail(e.target.value)} placeholder="Enter captain's email" required />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="teamJersey">Team Jersey Design *</Label>
                      <div className="mt-1">
                        <input type="file" id="teamJersey" accept="image/*" onChange={e => handleJerseyUpload(e.target.files?.[0] || null)} className="hidden" required />
                        <label htmlFor="teamJersey" className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-mountain-green transition-colors">
                          {teamJersey ? (
                            <span className="text-sm text-mountain-green">Jersey uploaded ✓</span>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                              <span className="text-sm text-gray-500">Upload Jersey Design</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Player Details (7 Players + 2 Substitutes)</h3>
                  <div className="space-y-6">
                    {players.map((player, index) => (
                      <Card key={index} className="p-4">
                        <h4 className="font-medium mb-3">
                          Player {index + 1} {index < 7 ? "(Playing XI)" : "(Substitute)"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor={`player${index}Name`}>Name *</Label>
                            <Input id={`player${index}Name`} value={player.name} onChange={e => handlePlayerChange(index, 'name', e.target.value)} placeholder="Player name" required />
                          </div>
                          <div>
                            <Label htmlFor={`player${index}Age`}>Age *</Label>
                            <Input id={`player${index}Age`} type="number" value={player.age} onChange={e => handlePlayerChange(index, 'age', e.target.value)} placeholder="Age" required />
                          </div>
                          <div>
                            <Label htmlFor={`player${index}Phone`}>Phone *</Label>
                            <Input id={`player${index}Phone`} value={player.phone} onChange={e => handlePlayerChange(index, 'phone', e.target.value)} placeholder="Phone number" required />
                          </div>
                          <div>
                            <Label htmlFor={`player${index}Photo`}>Photo</Label>
                            <input type="file" id={`player${index}Photo`} accept="image/*" onChange={e => handlePhotoUpload(index, e.target.files?.[0] || null)} className="hidden" />
                            <label htmlFor={`player${index}Photo`} className="flex items-center justify-center w-full h-10 border border-gray-300 rounded-md cursor-pointer hover:border-mountain-green transition-colors">
                              {player.photo ? (
                                <span className="text-xs text-mountain-green">Photo uploaded ✓</span>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Camera className="w-4 h-4 text-gray-400" />
                                  <span className="text-xs text-gray-500">Upload</span>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Players must report 30 minutes before their scheduled match</li>
                    <li>• Team list & fixtures will be shared 1 day before the tournament</li>
                    <li>• Team jersey is mandatory for all players</li>
                    <li>• Entry fee: ₹2,000 per team</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white px-8 py-3 text-lg font-semibold hover:shadow-button transition-all duration-300"
                    disabled={isProcessingPayment}
                  >
                    <IndianRupee className="w-5 h-5 mr-2" />
                    Register Team - Pay ₹2,000
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Why Join Section */}
          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle>🎯 Why Join?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Action-packed one-day turf cricket</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Bragging rights & exclusive trophies</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Umpired matches, live scoring & fair play</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />

      {/* PhonePe Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-mountain-green" />
              Complete Payment
            </DialogTitle>
            <DialogDescription>
              Pay ₹2,000 for team registration: {teamName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Payment Status */}
            {paymentStatus === 'processing' && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock3 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <p className="font-medium text-blue-900">Processing Payment...</p>
                  <p className="text-sm text-blue-700">Redirecting to PhonePe...</p>
                </div>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Registration Submitted!</p>
                  <p className="text-sm text-green-700">We'll verify your payment and contact you</p>
                </div>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                <ExternalLink className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Payment Failed</p>
                  <p className="text-sm text-red-700">Please try again or contact support</p>
                </div>
              </div>
            )}

            {/* PhonePe Payment Button */}
            {paymentStatus === 'pending' && (
              <div className="text-center space-y-4">
                <Button 
                  onClick={handlePhonePePayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  {isProcessingPayment ? (
                    <>
                      <Clock3 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Pay with PhonePe
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  You will be redirected to PhonePe to complete the payment securely
                </p>
              </div>
            )}

            {/* Manual Payment Confirmation (fallback) */}
            {paymentStatus === 'failed' && (
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have completed the payment manually, click confirm below:
                </p>
                <Button 
                  onClick={handlePaymentConfirmation}
                  variant="outline"
                  className="w-full"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I have completed the payment
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CricketTournament;