
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Award, Calendar, MapPin, Edit, Save, Clock } from "lucide-react";

type SupabaseProfile = {
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  address?: string | null;
  emergency_contact?: string | null;
  emergency_phone?: string | null;
  created_at?: string;
  updated_at?: string;
};

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  useEffect(() => {
    if (user) {
      // Load user profile data
      const loadProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single<SupabaseProfile>();

        if (data) {
          setUserInfo({
            name: data.full_name || user.email?.split('@')[0] || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            address: data.address || "",
            emergencyContact: data.emergency_contact || "",
            emergencyPhone: data.emergency_phone || ""
          });
        }
      };
      
      loadProfile();
    }
  }, [user]);
  
  const [editableInfo, setEditableInfo] = useState({ ...userInfo });
  
  const upcomingEvents = [
    {
      id: 1,
      name: "Kattanji Hills Marathon 2025",
      date: "March 15, 2025",
      category: "Half Marathon",
      bib: "KHM-2025-1234"
    }
  ];
  
  const pastEvents = [
    {
      id: 1,
      name: "Coimbatore City Run",
      date: "November 12, 2024",
      category: "10K Challenge",
      position: "156/1023"
    },
    {
      id: 2,
      name: "Western Ghats Trail Run",
      date: "August 24, 2024",
      category: "5K Fun Run",
      position: "42/512"
    }
  ];
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditableInfo({ ...userInfo });
  };
  
  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: editableInfo.name,
          email: editableInfo.email,
          phone: editableInfo.phone,
          address: editableInfo.address,
          emergency_contact: editableInfo.emergencyContact,
          emergency_phone: editableInfo.emergencyPhone
        });

      if (error) throw error;

      setUserInfo({ ...editableInfo });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-8 flex flex-col md:flex-row items-center md:items-end gap-6">
            <Avatar className="w-24 h-24 border-4 border-card">
              <AvatarImage src="https://source.unsplash.com/random/200x200/?portrait" />
              <AvatarFallback className="text-3xl">RS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {userInfo.name}
              </h1>
              <p className="text-muted-foreground">Sports Profile</p>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="events">My Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Personal Information</CardTitle>
                      <CardDescription>Your contact and personal details</CardDescription>
                    </div>
                    {!isEditing && (
                      <Button variant="outline" size="sm" onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={editableInfo.name} 
                            onChange={(e) => setEditableInfo({...editableInfo, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={editableInfo.email} 
                            onChange={(e) => setEditableInfo({...editableInfo, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={editableInfo.phone} 
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setEditableInfo({...editableInfo, phone: value});
                            }}
                            placeholder="10 digit phone number"
                            maxLength={10}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            value={editableInfo.address} 
                            onChange={(e) => setEditableInfo({...editableInfo, address: e.target.value})}
                          />
                        </div>
                        <div className="pt-4 flex justify-end gap-2">
                          <Button variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{userInfo.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{userInfo.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{userInfo.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <p className="font-medium">{userInfo.address}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                {/* Emergency Contact */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">Emergency Contact</CardTitle>
                    <CardDescription>Who to contact in case of emergency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">Contact Name</Label>
                          <Input 
                            id="emergencyContact" 
                            value={editableInfo.emergencyContact} 
                            onChange={(e) => setEditableInfo({...editableInfo, emergencyContact: e.target.value})}
                          />
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="emergencyPhone">Contact Phone</Label>
                           <Input 
                             id="emergencyPhone" 
                             value={editableInfo.emergencyPhone} 
                             onChange={(e) => {
                               const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                               setEditableInfo({...editableInfo, emergencyPhone: value});
                             }}
                             placeholder="10 digit phone number"
                             maxLength={10}
                           />
                         </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Contact Name</p>
                            <p className="font-medium">{userInfo.emergencyContact}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Contact Phone</p>
                            <p className="font-medium">{userInfo.emergencyPhone}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-mountain-green/10 to-mountain-blue/10">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Upcoming Events
                    </CardTitle>
                    <CardDescription>Your registered future events</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-6">
                        {upcomingEvents.map(event => (
                          <div key={event.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-lg">{event.name}</h3>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                {event.category}
                              </span>
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Award className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>BIB Number: {event.bib}</span>
                              </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-border">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>Event countdown: 247 days</span>
                                </div>
                                <Button variant="outline" size="sm">View Details</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No upcoming events</p>
                        <Button variant="link" className="mt-2">
                          Register for an event
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Past Events */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Past Events
                    </CardTitle>
                    <CardDescription>Your previous race history</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {pastEvents.length > 0 ? (
                      <div className="space-y-4">
                        {pastEvents.map(event => (
                          <div key={event.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{event.name}</h3>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary">
                                {event.category}
                              </span>
                            </div>
                            <div className="mt-2 space-y-2 text-sm">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Award className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>Position: {event.position}</span>
                              </div>
                            </div>
                            <div className="mt-4 text-right">
                              <Button variant="ghost" size="sm">View Certificate</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No past events</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
