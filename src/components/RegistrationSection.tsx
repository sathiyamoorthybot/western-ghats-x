import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Plus, CreditCard } from "lucide-react";
import ParticipantForm from "./ParticipantForm";
import BookingSummary from "./BookingSummary";

interface ParticipantData {
  id: string;
  fullName: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  tshirtSize: string;
  bloodGroup: string;
  emergencyContact: string;
  emergencyPhone: string;
  raceType: string;
}

interface RaceRegistrations {
  "5k": number;
  "10k": number;
  "half-marathon": number;
}

interface RegistrationData {
  raceRegistrations: RaceRegistrations;
  participants: ParticipantData[];
  consent: boolean;
}

const raceDetails = {
  "5k": { name: "5K Fun Run", price: 699 },
  "10k": { name: "10K Challenge", price: 1299 },
  "half-marathon": { name: "Half Marathon", price: 1999 }
};

const createEmptyParticipant = (raceType: string = ""): ParticipantData => ({
  id: Math.random().toString(36).substr(2, 9),
  fullName: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  tshirtSize: "",
  bloodGroup: "",
  emergencyContact: "",
  emergencyPhone: "",
  raceType: raceType,
});

const RegistrationSection = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    raceRegistrations: {
      "5k": 0,
      "10k": 0,
      "half-marathon": 0
    },
    participants: [createEmptyParticipant()],
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getTotalRegistrations = () => {
    return Object.values(registrationData.raceRegistrations).reduce((sum, count) => sum + count, 0);
  };

  const getSelectedRaces = () => {
    return Object.entries(registrationData.raceRegistrations)
      .filter(([_, count]) => count > 0)
      .map(([raceId, _]) => raceId);
  };

  const calculateTotal = () => {
    const totalPrice = Object.entries(registrationData.raceRegistrations).reduce((total, [raceId, count]) => {
      const race = raceDetails[raceId as keyof typeof raceDetails];
      return total + (race.price * count);
    }, 0);
    
    const subtotal = totalPrice;
    const gst = Math.round(subtotal * 0.18);
    const serviceFee = Math.round(subtotal * 0.0236);
    
    return { 
      subtotal, 
      gst, 
      serviceFee, 
      total: subtotal + gst + serviceFee 
    };
  };

  const assignRaceTypesToParticipants = (raceRegistrations: RaceRegistrations) => {
    const participantRaceTypes: string[] = [];
    
    // Create an array of race types based on registration counts
    Object.entries(raceRegistrations).forEach(([raceId, count]) => {
      for (let i = 0; i < count; i++) {
        participantRaceTypes.push(raceId);
      }
    });
    
    return participantRaceTypes;
  };

  const handleRaceRegistrationChange = (raceId: keyof RaceRegistrations, count: number) => {
    setRegistrationData(prev => {
      const newRaceRegistrations = {
        ...prev.raceRegistrations,
        [raceId]: count
      };
      
      const totalRegistrations = Object.values(newRaceRegistrations).reduce((sum, regCount) => sum + regCount, 0);
      const participantRaceTypes = assignRaceTypesToParticipants(newRaceRegistrations);
      
      // Adjust participants based on total registrations
      let newParticipants = [...prev.participants];
      
      if (totalRegistrations > newParticipants.length) {
        // Add more participants
        const participantsToAdd = totalRegistrations - newParticipants.length;
        for (let i = 0; i < participantsToAdd; i++) {
          const participantIndex = newParticipants.length + i;
          const raceType = participantRaceTypes[participantIndex] || "";
          newParticipants.push(createEmptyParticipant(raceType));
        }
      } else if (totalRegistrations < newParticipants.length && totalRegistrations > 0) {
        // Remove excess participants
        newParticipants = newParticipants.slice(0, totalRegistrations);
      } else if (totalRegistrations === 0) {
        // Keep at least one participant when no races selected
        newParticipants = [createEmptyParticipant()];
      }
      
      // Update race types for existing participants
      newParticipants = newParticipants.map((participant, index) => ({
        ...participant,
        raceType: participantRaceTypes[index] || ""
      }));
      
      return {
        ...prev,
        raceRegistrations: newRaceRegistrations,
        participants: newParticipants
      };
    });
  };

  const updateParticipant = (participantId: string, field: keyof ParticipantData, value: string) => {
    // Don't allow race type updates since it's now read-only
    if (field === "raceType") return;
    
    setRegistrationData(prev => ({
      ...prev,
      participants: prev.participants.map(p => 
        p.id === participantId ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalRegistrations = getTotalRegistrations();
    if (totalRegistrations === 0) {
      toast({
        title: "Select Race Registrations",
        description: "Please select at least one registration for any race category.",
        variant: "destructive",
      });
      return;
    }

    if (!registrationData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to checkout with payment details
      const pricing = calculateTotal();
      navigate(`/checkout?amount=${pricing.total}&registrations=${totalRegistrations}`);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const totalRegistrations = getTotalRegistrations();
    return totalRegistrations > 0 &&
           registrationData.participants.slice(0, totalRegistrations).every(p => 
             p.fullName && p.age && p.gender && p.phone && 
             p.email && p.tshirtSize && p.bloodGroup && 
             p.emergencyContact && p.emergencyPhone && p.raceType
           ) &&
           registrationData.consent;
  };

  const pricing = calculateTotal();
  const totalRegistrations = getTotalRegistrations();

  return (
    <section id="registration" className="py-16 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Start Your <span className="text-mountain-blue">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Register now to secure your spot in the Kattanji Hills Marathon 2025
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Registration Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-mountain">
              <CardHeader className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Race Registration
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Race Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Select Race Categories & Registrations</h3>
                    <div className="grid md:grid-cols-1 gap-4">
                      {Object.entries(raceDetails).map(([raceId, race]) => (
                        <div key={raceId} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <Label className="font-medium">{race.name}</Label>
                            <p className="text-sm text-muted-foreground">₹{race.price} per registration</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`${raceId}-count`} className="text-sm">Registrations:</Label>
                            <Select
                              value={registrationData.raceRegistrations[raceId as keyof RaceRegistrations].toString()}
                              onValueChange={(value) => handleRaceRegistrationChange(raceId as keyof RaceRegistrations, parseInt(value))}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))}
                    </div>
                    {totalRegistrations > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Total registrations: {totalRegistrations} - Please fill details for {totalRegistrations} participant{totalRegistrations > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Participants Section */}
                  {totalRegistrations > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Participant Details</h3>
                      {registrationData.participants.slice(0, totalRegistrations).map((participant, index) => (
                        <ParticipantForm
                          key={participant.id}
                          participant={participant}
                          index={index}
                          onUpdate={updateParticipant}
                          onRemove={() => {}} // Not needed since participants are auto-managed
                          canRemove={false} // Participants are auto-managed based on registrations
                        />
                      ))}
                    </div>
                  )}

                  {/* Consent */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={registrationData.consent}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, consent: e.target.checked }))}
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I agree to the terms and conditions, understand the risks involved in participating in this marathon, 
                      and consent to emergency medical treatment if needed. I confirm that all participants are physically fit to participate.
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-mountain-green to-primary-hover text-white py-3 text-lg font-semibold hover:shadow-button transition-all duration-300 disabled:opacity-50"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Processing..." : `Pay ₹${pricing.total.toLocaleString()} & Register`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <BookingSummary
              selectedRaces={getSelectedRaces()}
              participants={registrationData.participants.slice(0, totalRegistrations)}
              pricing={pricing}
              raceRegistrations={registrationData.raceRegistrations}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
