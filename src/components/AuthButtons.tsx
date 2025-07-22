import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const AuthButtons = () => {
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