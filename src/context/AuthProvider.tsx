// src/providers/auth-provider.tsx
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession(); // Uses @supabase/auth-helpers-react
  const [user, setUser] = useState(session?.user ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(session?.user ?? null);
    setLoading(false);
  }, [session]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
