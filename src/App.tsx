// src/providers/auth-provider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  supabase: SupabaseClient;
  userMetadata: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const user = useUser();
  const supabase = useSupabaseClient();
  const [userMetadata, setUserMetadata] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setUserMetadata(user.user_metadata); // Load from Supabase Auth
    } else {
      setUserMetadata(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ session, user, supabase, userMetadata }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
