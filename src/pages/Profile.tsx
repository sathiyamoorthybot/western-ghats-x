import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const [editableInfo, setEditableInfo] = useState(userInfo);

  useEffect(() => {
    if (user) {
      const metadata = user.user_metadata || {};
      setUserInfo({
        name: metadata.full_name || "",
        email: user.email || "",
        phone: metadata.phone || "",
        address: metadata.address || "",
        emergencyContact: metadata.emergencyContact || "",
        emergencyPhone: metadata.emergencyPhone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    setEditableInfo(userInfo);
  }, [userInfo]);

  const handleChange = (field: string, value: string) => {
    setEditableInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const { name, phone, address, emergencyContact, emergencyPhone } = editableInfo;

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: name,
        phone,
        address,
        emergencyContact,
        emergencyPhone,
      },
    });

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
      setUserInfo(editableInfo);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={editableInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={editableInfo.email}
            disabled
          />
          <Input
            type="text"
            placeholder="Phone"
            value={editableInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Address"
            value={editableInfo.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Emergency Contact"
            value={editableInfo.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Emergency Phone"
            value={editableInfo.emergencyPhone}
            onChange={(e) => handleChange("emergencyPhone", e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
