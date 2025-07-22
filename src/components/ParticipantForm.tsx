import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Phone, Mail, Users, Trash2, Droplet, Trophy } from "lucide-react";

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

interface ParticipantFormProps {
  participant: ParticipantData;
  index: number;
  onUpdate: (participantId: string, field: keyof ParticipantData, value: string) => void;
  onRemove: (participantId: string) => void;
  canRemove: boolean;
}

const raceTypeLabels = {
  "5k": "5K Fun Run",
  "10k": "10K Challenge",
  "half-marathon": "Half Marathon"
};

const ParticipantForm = ({ participant, index, onUpdate, onRemove, canRemove }: ParticipantFormProps) => {
  const getRaceTypeLabel = (raceType: string) => {
    return raceTypeLabels[raceType as keyof typeof raceTypeLabels] || raceType;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium">Participant {index + 1}</h4>
        {canRemove && (
          <Button
            type="button"
            onClick={() => onRemove(participant.id)}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`fullName-${participant.id}`}>Full Name *</Label>
          <Input
            id={`fullName-${participant.id}`}
            value={participant.fullName}
            onChange={(e) => onUpdate(participant.id, "fullName", e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`raceType-${participant.id}`} className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Race Type
          </Label>
          <Input
            id={`raceType-${participant.id}`}
            value={getRaceTypeLabel(participant.raceType)}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`age-${participant.id}`}>Age *</Label>
          <Input
            id={`age-${participant.id}`}
            type="number"
            value={participant.age}
            onChange={(e) => onUpdate(participant.id, "age", e.target.value)}
            placeholder="Your age"
            min="16"
            max="80"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`gender-${participant.id}`}>Gender *</Label>
          <Select value={participant.gender} onValueChange={(value) => onUpdate(participant.id, "gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`bloodGroup-${participant.id}`} className="flex items-center gap-2">
            <Droplet className="w-4 h-4" />
            Blood Group *
          </Label>
          <Select value={participant.bloodGroup} onValueChange={(value) => onUpdate(participant.id, "bloodGroup", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`tshirtSize-${participant.id}`}>T-shirt Size *</Label>
          <Select value={participant.tshirtSize} onValueChange={(value) => onUpdate(participant.id, "tshirtSize", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xs">XS</SelectItem>
              <SelectItem value="s">S</SelectItem>
              <SelectItem value="m">M</SelectItem>
              <SelectItem value="l">L</SelectItem>
              <SelectItem value="xl">XL</SelectItem>
              <SelectItem value="xxl">XXL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`phone-${participant.id}`} className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number *
          </Label>
          <Input
            id={`phone-${participant.id}`}
            type="tel"
            value={participant.phone}
            onChange={(e) => onUpdate(participant.id, "phone", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`email-${participant.id}`} className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id={`email-${participant.id}`}
            type="email"
            value={participant.email}
            onChange={(e) => onUpdate(participant.id, "email", e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`emergencyContact-${participant.id}`} className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Emergency Contact Name *
          </Label>
          <Input
            id={`emergencyContact-${participant.id}`}
            value={participant.emergencyContact}
            onChange={(e) => onUpdate(participant.id, "emergencyContact", e.target.value)}
            placeholder="Emergency contact name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`emergencyPhone-${participant.id}`}>Emergency Contact Phone *</Label>
          <Input
            id={`emergencyPhone-${participant.id}`}
            type="tel"
            value={participant.emergencyPhone}
            onChange={(e) => onUpdate(participant.id, "emergencyPhone", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>
      </div>
    </Card>
  );
};

export default ParticipantForm;
