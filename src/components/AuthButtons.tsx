import { Button } from "@/components/ui/button";
import { User, UserPlus, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const AuthButtons = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/profile">
          <Button variant="ghost" size="sm" className="text-foreground hover:bg-white/20">
            <User className="w-4 h-4" />
            <span className="ml-2 hidden sm:inline">Profile</span>
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="text-foreground hover:bg-white/20"
        >
          <LogOut className="w-4 h-4" />
          <span className="ml-2 hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="ghost" size="sm" className="text-foreground hover:bg-white/20">
          <User className="w-4 h-4" />
          <span className="ml-2 hidden sm:inline">Login</span>
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover text-white hover:shadow-md transition-all duration-300">
          <UserPlus className="w-4 h-4" />
          <span className="ml-2 hidden sm:inline">Sign Up</span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthButtons;