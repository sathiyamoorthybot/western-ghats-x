import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Shield, Trophy } from "lucide-react";

interface Profile {
  id?: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  emergency_contact: string | null;
  emergency_phone: string | null;
}

interface CricketRegistration {
  id: string;
  team_name: string;
  captain_name: string;
  captain_email: string;
  captain_phone: string;
  payment_status: string;
  entry_fee: number;
  created_at: string;
  players: any[];
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cricketRegistrations, setCricketRegistrations] = useState<CricketRegistration[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    emergency_contact: "",
    emergency_phone: ""
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchCricketRegistrations();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles' as any)
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile(data as any);
        setFormData({
          full_name: (data as any).full_name || "",
          email: (data as any).email || user?.email || "",
          phone: (data as any).phone || "",
          address: (data as any).address || "",
          emergency_contact: (data as any).emergency_contact || "",
          emergency_phone: (data as any).emergency_phone || ""
        });
      } else {
        // Create a new profile if one doesn't exist
        setFormData({
          full_name: "",
          email: user?.email || "",
          phone: "",
          address: "",
          emergency_contact: "",
          emergency_phone: ""
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCricketRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('cricket_tournaments' as any)
        .select('*')
        .eq('captain_email', user?.email)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Map the data to match our interface
      const mappedData = data?.map((item: any) => ({
        id: item.id,
        team_name: item.team_name,
        captain_name: item.captain_name,
        captain_email: item.captain_email,
        captain_phone: item.captain_phone,
        payment_status: item.payment_status,
        entry_fee: item.entry_fee,
        created_at: item.created_at,
        players: Array.isArray(item.players) ? item.players : []
      })) || [];

      setCricketRegistrations(mappedData);
    } catch (error: any) {
      console.error('Error fetching cricket registrations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const profileData = {
        user_id: user?.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        emergency_contact: formData.emergency_contact,
        emergency_phone: formData.emergency_phone
      };

      let result;
      if (profile) {
        result = await supabase
          .from('profiles' as any)
          .update(profileData)
          .eq('user_id', user?.id)
          .select()
          .maybeSingle();
      } else {
        result = await supabase
          .from('profiles' as any)
          .insert(profileData)
          .select()
          .maybeSingle();
      }

      if (result.error) throw result.error;

      setProfile(result.data as any);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Loading profile...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Information Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-green-700">
              <User className="h-6 w-6" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_contact">Emergency Contact Name</Label>
                    <Input
                      id="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergency_phone">Emergency Contact Phone</Label>
                    <Input
                      id="emergency_phone"
                      value={formData.emergency_phone}
                      onChange={(e) => handleInputChange('emergency_phone', e.target.value)}
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{profile?.full_name || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{profile?.email || user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{profile?.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{profile?.address || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <p className="font-medium">{profile?.emergency_contact || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Emergency Phone</p>
                      <p className="font-medium">{profile?.emergency_phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cricket Tournament Registrations */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-green-700">
              <Trophy className="h-6 w-6" />
              Cricket Tournament Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cricketRegistrations.length > 0 ? (
              <div className="space-y-4">
                {cricketRegistrations.map((registration) => (
                  <div key={registration.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{registration.team_name}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${
                        registration.payment_status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registration.payment_status === 'completed' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Captain:</p>
                        <p className="font-medium">{registration.captain_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phone:</p>
                        <p className="font-medium">{registration.captain_phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Entry Fee:</p>
                        <p className="font-medium">₹{registration.entry_fee}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Registered On:</p>
                        <p className="font-medium">{new Date(registration.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600 text-sm">Players: {registration.players.length}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No cricket tournament registrations found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;