

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Calendar, CreditCard } from "lucide-react";

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
}

interface RaceRegistrations {
  "5k": number;
  "10k": number;
  "half-marathon": number;
}

interface BookingSummaryProps {
  selectedRaces: string[];
  participants: ParticipantData[];
  pricing: {
    subtotal: number;
    gst: number;
    serviceFee: number;
    total: number;
  };
  raceRegistrations: RaceRegistrations;
}

const raceDetails = {
  "5k": { name: "5K Fun Run", price: 699 },
  "10k": { name: "10K Challenge", price: 1299 },
  "half-marathon": { name: "Half Marathon", price: 1999 }
};

const BookingSummary = ({ selectedRaces, participants, pricing, raceRegistrations }: BookingSummaryProps) => {
  const getTotalRegistrations = () => {
    return Object.values(raceRegistrations).reduce((sum, count) => sum + count, 0);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="bg-gradient-to-r from-mountain-green to-mountain-blue text-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Selected Races */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Race Registrations ({getTotalRegistrations()})
          </h4>
          {selectedRaces.length > 0 ? (
            <div className="space-y-2">
              {Object.entries(raceRegistrations)
                .filter(([_, count]) => count > 0)
                .map(([raceId, count]) => {
                  const race = raceDetails[raceId as keyof typeof raceDetails];
                  return (
                    <div key={raceId} className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span>{race.name}</span>
                        <span className="text-xs text-muted-foreground">{count} registration{count > 1 ? 's' : ''}</span>
                      </div>
                      <Badge variant="secondary">₹{(race.price * count).toLocaleString()}</Badge>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No registrations selected</p>
          )}
        </div>

        <Separator />

        {/* Participants */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Participants ({participants.length})
          </h4>
          {participants.length > 0 ? (
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div key={participant.id} className="text-sm">
                  <div className="font-medium">
                    {participant.fullName || `Participant ${index + 1}`}
                  </div>
                  {participant.age && participant.gender && (
                    <div className="text-muted-foreground">
                      {participant.age} years, {participant.gender}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No participants added</p>
          )}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        {selectedRaces.length > 0 && participants.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Cost Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{pricing.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{pricing.gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee (2.36%):</span>
                <span>₹{pricing.serviceFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  ₹{pricing.total.toLocaleString()}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {selectedRaces.length === 0 || participants.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Select race registrations to see pricing and add participants
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default BookingSummary;

